/** Session runtime: glues the pure planner/builders to Dexie. */
import type { Content } from '../content';
import type { DisplayLevel, ErrorLog, ExerciseKind, FSRSCardState, PeekEvent, Rating, Settings } from '../state/types';
import { db, getSettings, type WorkshopDB } from '../db/db';
import { buildExposurePool } from '../gate/pool';
import { rng } from '../lib/rng';
import { DAY, review } from './fsrs';
import { adaptiveBounds, rateAttempt, type LatencyBounds } from './rating';
import { missingCards, planSession, requeueOffset, type QueueItem, type SessionPlan } from './session';
import {
  buildLookalike, buildRecognition, lookalikeErrorCode, type Exercise, type LookalikeExercise, type RecognitionExercise,
} from '../exercises/build';

export const CURRENT_UNIT = 1;

export interface LiveSession {
  sessionId: number;
  mode: 'normal' | 'flight';
  startedAt: number;
  plan: SessionPlan;
  queue: QueueItem[];
  index: number;
  pool: Set<string>;
  cards: Map<string, FSRSCardState>;
  settings: Settings;
  bounds: Partial<Record<ExerciseKind, LatencyBounds>>;
  stats: { reviewed: number; introduced: number; again: number; correct: number };
  strengthened: string[];
  weakened: string[];
}

export interface PeekRecord { wordId: string; level: DisplayLevel }

export function startOfDay(now: number): number {
  const d = new Date(now);
  d.setHours(4, 0, 0, 0); // day rolls over at 04:00 so late-night study counts as "today"
  if (d.getTime() > now) d.setDate(d.getDate() - 1);
  return d.getTime();
}

/** Create any missing curriculum / look-alike cards (idempotent). */
export async function ensureCards(content: Content, now = Date.now(), d: WorkshopDB = db): Promise<number> {
  const cards = await d.cards.toArray();
  const created = missingCards(cards, content, CURRENT_UNIT, buildExposurePool(cards, now), now);
  if (created.length) await d.cards.bulkPut(created);
  return created.length;
}

export async function startSession(content: Content, mode: 'normal' | 'flight', now = Date.now(), d: WorkshopDB = db): Promise<LiveSession> {
  const settings = await getSettings(d);
  let cards = await d.cards.toArray();
  let pool = buildExposurePool(cards, now);

  const created = missingCards(cards, content, CURRENT_UNIT, pool, now);
  if (created.length) {
    await d.cards.bulkPut(created);
    cards = [...cards, ...created];
  }

  // Peek rule 2 (spec 1.3.3): >= 2 bare-word peeks within 14 days since the last review -> due now.
  const peeks = await d.peeks.where('ts').above(now - 14 * DAY).toArray();
  const forced: FSRSCardState[] = [];
  for (const c of cards) {
    if (c.facet !== 'word.recog' || c.state !== 2 || c.due <= now) continue;
    const n = peeks.filter((p) => p.wordId === c.itemId && p.displayLevel === 'L2_BARE' && p.ts > (c.last_review ?? 0)).length;
    if (n >= 2) forced.push({ ...c, due: now });
  }
  if (forced.length) {
    await d.cards.bulkPut(forced);
    const byId = new Map(forced.map((c) => [c.id, c]));
    cards = cards.map((c) => byId.get(c.id) ?? c);
  }
  pool = buildExposurePool(cards, now);

  const dayStart = startOfDay(now);
  const introducedToday = {
    words: cards.filter((c) => c.facet === 'word.recog' && (c.introducedAt ?? 0) >= dayStart).length,
    chars: cards.filter((c) => c.facet === 'char.form' && (c.introducedAt ?? 0) >= dayStart).length,
  };
  const week = await d.reviews.where('ts').above(now - 7 * DAY).toArray();
  const againRate7d = week.length >= 20 ? week.filter((r) => r.rating === 1).length / week.length : 0;

  const plan = planSession({ cards, now, settings, introducedToday, againRate7d, mode, content });
  const bounds: LiveSession['bounds'] = {};
  for (const kind of ['recognition', 'lookalike'] as const) {
    const recent = week.filter((r) => r.exerciseKind === kind).slice(-50).map((r) => r.latencyMs);
    bounds[kind] = adaptiveBounds(kind, recent);
  }
  const sessionId = (await d.sessions.add({ startedAt: now, mode, reviewed: 0, introduced: 0, again: 0 })) as number;
  return {
    sessionId, mode, startedAt: now, plan, queue: [...plan.items], index: 0, pool,
    cards: new Map(cards.map((c) => [c.id, c])), settings, bounds,
    stats: { reviewed: 0, introduced: 0, again: 0, correct: 0 }, strengthened: [], weakened: [],
  };
}

export function currentItem(s: LiveSession): QueueItem | undefined {
  return s.queue[s.index];
}

/** Build the exercise for the current queue item, skipping items that can't be built. */
export function buildCurrent(s: LiveSession, content: Content): Exercise | null {
  while (s.index < s.queue.length) {
    const item = s.queue[s.index];
    const card = s.cards.get(item.cardId);
    // Flight mode: stop introducing new items after 30 minutes (spec 1.5.1).
    if (item.mode === 'new' && s.mode === 'flight' && Date.now() - s.startedAt > 30 * 60_000) { s.index++; continue; }
    const r = rng(`${item.cardId}:${card?.reps ?? 0}:${s.index}`);
    if (card) {
      if (item.exercise === 'recognition') return buildRecognition(card, content, s.pool, item.mode === 'new' || card.state === 0, r);
      const la = buildLookalike(card, content, s.pool, r);
      if (la) return la;
    }
    s.index++;
  }
  return null;
}

/** After a new item's presentation: queue its first real test a few cards later. */
export function presented(s: LiveSession): void {
  const item = s.queue[s.index];
  s.queue.splice(Math.min(s.queue.length, s.index + 4), 0, { ...item, mode: 'review' });
  s.index++;
}

async function applyRating(
  s: LiveSession, card: FSRSCardState, rating: Rating, now: number, kind: ExerciseKind,
  instanceId: string, latencyMs: number, peeks: number, d: WorkshopDB,
): Promise<FSRSCardState> {
  const wasNew = card.state === 0;
  const { card: next, log } = review(card, rating, now, s.settings, { exerciseKind: kind, instanceId, latencyMs, peeks });
  await d.transaction('rw', d.cards, d.reviews, async () => {
    await d.cards.put(next);
    await d.reviews.add(log);
  });
  s.cards.set(next.id, next);
  s.stats.reviewed++;
  if (wasNew) s.stats.introduced++;
  if (rating === 1) s.stats.again++;
  else s.stats.correct++;
  const offset = requeueOffset(next.due - now);
  if (offset !== null) {
    s.queue.splice(Math.min(s.queue.length, s.index + 1 + offset), 0, { cardId: next.id, mode: 'review', exercise: s.queue[s.index].exercise });
  }
  return next;
}

async function logError(e: Omit<ErrorLog, 'id' | 'ts'>, now: number, d: WorkshopDB) {
  await d.errors.add({ ...e, ts: now });
}

export interface Outcome { correct: boolean; rating: Rating; codes: string[] }

export async function submitRecognition(
  s: LiveSession, ex: RecognitionExercise, choice: number | 'dk', latencyMs: number, peeks: PeekRecord[],
  now = Date.now(), d: WorkshopDB = db,
): Promise<Outcome> {
  const card = s.cards.get(ex.cardId)!;
  const correct = choice !== 'dk' && choice === ex.question.answer;
  const rating = rateAttempt(
    { correct, dontKnow: choice === 'dk', latencyMs, reps: card.reps },
    s.bounds.recognition ?? adaptiveBounds('recognition', []),
  );
  const codes: string[] = [];
  if (!correct) {
    const picked = choice === 'dk' ? undefined : ex.question.options[choice];
    codes.push(choice === 'dk' ? 'META.DONT_KNOW' : picked?.lookalike ? 'ORTHO.LOOKALIKE' : 'LEX.MEANING');
    await logError({
      attemptId: `${s.sessionId}:${s.index}`, exerciseKind: 'recognition', instanceId: ex.instanceId, codes,
      itemIds: [ex.word.id, ...(picked ? [picked.wordId] : [])],
      learnerAnswer: picked?.gloss ?? "I don't know", expected: ex.word.senses[0].gloss,
    }, now, d);
  }
  await applyRating(s, card, rating, now, 'recognition', ex.instanceId, latencyMs, peeks.length, d);
  (rating === 1 ? s.weakened : s.strengthened).push(ex.word.hanzi);
  await handlePeeks(s, peeks, now, d);
  return { correct, rating, codes };
}

export async function submitLookalike(
  s: LiveSession, ex: LookalikeExercise, choice: number, latencyMs: number, now = Date.now(), d: WorkshopDB = db,
): Promise<Outcome> {
  const card = s.cards.get(ex.cardId)!;
  const correct = choice === ex.answer;
  const rating = rateAttempt({ correct, latencyMs, reps: card.reps }, s.bounds.lookalike ?? adaptiveBounds('lookalike', []));
  const codes: string[] = [];
  if (!correct) {
    codes.push(lookalikeErrorCode(ex.set));
    await logError({
      attemptId: `${s.sessionId}:${s.index}`, exerciseKind: 'lookalike', instanceId: ex.instanceId, codes,
      itemIds: [ex.char, ex.options[choice]], learnerAnswer: ex.options[choice], expected: ex.char,
    }, now, d);
  }
  await applyRating(s, card, rating, now, 'lookalike', ex.instanceId, latencyMs, 0, d);
  (rating === 1 ? s.weakened : s.strengthened).push(ex.char);
  return { correct, rating, codes };
}

/** Peek rule 1 (spec 1.3.3): peeking a bare word whose card is due within 3 days rates it Again now. */
async function handlePeeks(s: LiveSession, peeks: PeekRecord[], now: number, d: WorkshopDB) {
  if (!peeks.length) return;
  const events: PeekEvent[] = peeks.map((p) => ({ ts: now, wordId: p.wordId, displayLevel: p.level, inGradedExercise: true }));
  await d.peeks.bulkAdd(events);
  const seen = new Set<string>();
  for (const p of peeks) {
    if (p.level !== 'L2_BARE' || seen.has(p.wordId)) continue;
    seen.add(p.wordId);
    const c = s.cards.get(`word.recog:${p.wordId}`);
    if (c && c.state === 2 && c.due - now <= 3 * DAY) {
      const { card, log } = review(c, 1, now, s.settings, { exerciseKind: 'recognition', instanceId: 'peek', latencyMs: 0, peeks: 1 });
      await d.cards.put(card);
      await d.reviews.add(log);
      s.cards.set(card.id, card);
      s.weakened.push(p.wordId);
    }
  }
}

/** Log a peek outside a graded exercise (e.g. browsing a presentation card). */
export async function logFreePeek(p: PeekRecord, now = Date.now(), d: WorkshopDB = db) {
  await d.peeks.add({ ts: now, wordId: p.wordId, displayLevel: p.level, inGradedExercise: false });
}

export function advance(s: LiveSession): void {
  s.index++;
}

export async function endSession(s: LiveSession, now = Date.now(), d: WorkshopDB = db): Promise<void> {
  await d.sessions.update(s.sessionId, {
    endedAt: now, reviewed: s.stats.reviewed, introduced: s.stats.introduced, again: s.stats.again,
  });
}
