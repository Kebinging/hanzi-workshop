/** Session runtime: glues the pure planner/builders to Dexie. */
import type { Content } from '../content';
import type { DisplayLevel, ErrorLog, ExerciseKind, FSRSCardState, PeekEvent, Rating, Settings } from '../state/types';
import { db, getSettings, type WorkshopDB } from '../db/db';
import { buildExposurePool } from '../gate/pool';
import { rng } from '../lib/rng';
import { DAY, review } from './fsrs';
import { adaptiveBounds, rateAttempt, type LatencyBounds } from './rating';
import { missingCards, planSession, requeueOffset, unlockedUnits, type QueueItem, type SessionPlan } from './session';
import {
  buildLookalike, buildRecognition, lookalikeErrorCode, type LookalikeExercise, type RecognitionExercise,
} from '../exercises/build';
import { buildGrammar, grammarPlayable, hasUseItems, type GrammarExercise } from '../exercises/grammar';
import { buildDrill, buildTwin } from '../errors/drill';
import { drillRelief, triggeredCodes, weaknessAt, TWIN_RELIEF } from '../errors/weakness';

export type Exercise = RecognitionExercise | LookalikeExercise | GrammarExercise;

/** Exercise kind recorded in review logs / latency bounds for each exercise. */
export function kindOf(ex: Exercise): ExerciseKind {
  switch (ex.kind) {
    case 'slot': return 'slot_builder';
    case 'pair': return 'minimal_pair';
    case 'judgement': return 'minimal_pair';
    default: return ex.kind;
  }
}

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
  /** Prebuilt drill / twin exercises keyed by QueueItem.extraKey. */
  extras: Map<string, Exercise>;
  drillScores: Map<string, { correct: number; total: number }>;
  twinSeq: number;
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
  const pool = buildExposurePool(cards, now);
  const created = missingCards(cards, content, unlockedUnits(cards, content, pool), pool, now, (id) => hasUseItems(content, id));
  if (created.length) await d.cards.bulkPut(created);
  return created.length;
}

export async function startSession(content: Content, mode: 'normal' | 'flight', now = Date.now(), d: WorkshopDB = db): Promise<LiveSession> {
  const settings = await getSettings(d);
  let cards = await d.cards.toArray();
  let pool = buildExposurePool(cards, now);

  const created = missingCards(cards, content, unlockedUnits(cards, content, pool), pool, now, (id) => hasUseItems(content, id));
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
    grammar: cards.filter((c) => c.facet === 'gram.form' && !c.itemId.startsWith('G12-') && (c.introducedAt ?? 0) >= dayStart).length,
    bridgeGrammar: cards.filter((c) => c.facet === 'gram.form' && c.itemId.startsWith('G12-') && (c.introducedAt ?? 0) >= dayStart).length,
    grammarUse: cards.filter((c) => c.facet === 'gram.use' && (c.introducedAt ?? 0) >= dayStart).length,
  };
  const week = await d.reviews.where('ts').above(now - 7 * DAY).toArray();
  const againRate7d = week.length >= 20 ? week.filter((r) => r.rating === 1).length / week.length : 0;

  const playable = (c: FSRSCardState) => (c.facet.startsWith('gram.') ? grammarPlayable(c, content, pool) : true);
  const plan = planSession({ cards, now, settings, introducedToday, againRate7d, mode, content, playable });
  // Gate G4: a due grammar card with no gated sentence today is deferred by a day.
  if (plan.deferred.length) {
    const moved = plan.deferred.map((id) => ({ ...cards.find((c) => c.id === id)!, due: now + DAY }));
    await d.cards.bulkPut(moved);
    const m = new Map(moved.map((c) => [c.id, c]));
    cards = cards.map((c) => m.get(c.id) ?? c);
  }
  const bounds: LiveSession['bounds'] = {};
  for (const kind of ['recognition', 'lookalike', 'slot_builder', 'transform', 'minimal_pair', 'cloze'] as const) {
    const recent = week.filter((r) => r.exerciseKind === kind).slice(-50).map((r) => r.latencyMs);
    bounds[kind] = adaptiveBounds(kind, recent);
  }
  // Remedial micro-drills (spec 4.4): up to 2 triggered error codes, 5 items each, at the start.
  const cardMap = new Map(cards.map((c) => [c.id, c]));
  const [errorsAll, reviewsAll, drillsAll] = await Promise.all([d.errors.toArray(), d.reviews.toArray(), d.drills.toArray()]);
  const extras = new Map<string, Exercise>();
  const drillItems: QueueItem[] = [];
  for (const w of triggeredCodes(weaknessAt(errorsAll, reviewsAll, drillsAll, content, now), drillsAll, now)) {
    const avoid = new Set(errorsAll.filter((e) => e.codes.includes(w.code)).map((e) => e.instanceId));
    const exs = buildDrill(w.code, w.itemIds, avoid, content, pool, cardMap, rng(`drill:${w.code}:${now}`), now);
    if (exs.length < 3) continue;
    exs.forEach((ex, i) => {
      const key = `drill:${w.code}:${i}`;
      extras.set(key, ex);
      drillItems.push({
        cardId: ex.cardId, mode: 'review', exercise: ex.kind === 'lookalike' ? 'lookalike' : 'grammar',
        extraKey: key, drill: { code: w.code, index: i, total: exs.length },
      });
    });
  }

  const sessionId = (await d.sessions.add({ startedAt: now, mode, reviewed: 0, introduced: 0, again: 0 })) as number;
  return {
    sessionId, mode, startedAt: now, plan, queue: [...drillItems, ...plan.items], index: 0, pool,
    cards: cardMap, settings, bounds,
    stats: { reviewed: 0, introduced: 0, again: 0, correct: 0 }, strengthened: [], weakened: [],
    extras, drillScores: new Map(), twinSeq: 0,
  };
}

export function currentItem(s: LiveSession): QueueItem | undefined {
  return s.queue[s.index];
}

/** Build the exercise for the current queue item, skipping items that can't be built. */
export function buildCurrent(s: LiveSession, content: Content): Exercise | null {
  while (s.index < s.queue.length) {
    const item = s.queue[s.index];
    if (item.extraKey) {
      const ex = s.extras.get(item.extraKey);
      if (ex) return ex;
      s.index++;
      continue;
    }
    const card = s.cards.get(item.cardId);
    // Flight mode: stop introducing new items after 30 minutes (spec 1.5.1).
    if (item.mode === 'new' && s.mode === 'flight' && Date.now() - s.startedAt > 30 * 60_000) { s.index++; continue; }
    const r = rng(`${item.cardId}:${card?.reps ?? 0}:${s.index}`);
    if (card) {
      if (item.exercise === 'recognition') return buildRecognition(card, content, s.pool, item.mode === 'new' || card.state === 0, r);
      if (item.exercise === 'grammar') {
        const g = buildGrammar(card, content, s.pool, r);
        if (g) return g;
      } else {
        const la = buildLookalike(card, content, s.pool, r);
        if (la) return la;
      }
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

export interface GrammarAttempt {
  correct: boolean;
  wrongTries: number;
  codes: string[];
  learnerAnswer: string;
  expected: string;
  latencyMs: number;
  itemIds?: string[];
}

/** Grade a grammar exercise (all five types) and schedule its card. */
export async function submitGrammar(
  s: LiveSession, ex: GrammarExercise, a: GrammarAttempt, peeks: PeekRecord[] = [], now = Date.now(), d: WorkshopDB = db,
): Promise<Outcome> {
  const card = s.cards.get(ex.cardId)!;
  const kind = kindOf(ex);
  const rating = rateAttempt(
    { correct: a.correct, wrongTries: a.wrongTries, latencyMs: a.latencyMs, reps: card.reps },
    s.bounds[kind] ?? adaptiveBounds(kind, []),
  );
  if (a.codes.length) {
    await logError({
      attemptId: `${s.sessionId}:${s.index}`, exerciseKind: kind, instanceId: ex.instanceId, codes: a.codes,
      itemIds: [card.itemId, ...(a.itemIds ?? [])], learnerAnswer: a.learnerAnswer, expected: a.expected,
    }, now, d);
  }
  await applyRating(s, card, rating, now, kind, ex.instanceId, a.latencyMs, peeks.length, d);
  const label = ex.kind === 'judgement' ? ex.cluster.title : ex.pattern.titleZh;
  (rating === 1 ? s.weakened : s.strengthened).push(label);
  await handlePeeks(s, peeks, now, d);
  return { correct: a.correct, rating, codes: a.codes };
}

/**
 * Unscored attempt on a drill item or twin (spec 4.2 / 4.4): logs errors, tracks the drill score,
 * and records relief for the weakness engine. No FSRS rating.
 */
export async function submitExtra(
  s: LiveSession, ex: Exercise, content: Content, a: { correct: boolean; codes: string[]; learnerAnswer: string; expected: string },
  now = Date.now(), d: WorkshopDB = db,
): Promise<Outcome> {
  const item = s.queue[s.index];
  if (a.codes.length) {
    await logError({
      attemptId: `${s.sessionId}:${s.index}`, exerciseKind: kindOf(ex), instanceId: ex.instanceId, codes: a.codes,
      itemIds: [ex.cardId.slice(ex.cardId.indexOf(':') + 1)], learnerAnswer: a.learnerAnswer, expected: a.expected,
    }, now, d);
  }
  s.stats.reviewed++;
  if (a.correct) s.stats.correct++;
  else s.stats.again++;
  if (item?.drill) {
    const { code, index, total } = item.drill;
    const p = s.drillScores.get(code) ?? { correct: 0, total: 0 };
    p.total++;
    if (a.correct) p.correct++;
    s.drillScores.set(code, p);
    if (index === total - 1) {
      const [errs, revs, drs] = await Promise.all([d.errors.toArray(), d.reviews.toArray(), d.drills.toArray()]);
      const score = weaknessAt(errs, revs, drs, content, now).get(code)?.score ?? 0;
      await d.drills.add({ code, ts: now, kind: 'drill', correct: p.correct, total: p.total, relief: drillRelief(score, p.correct, p.total) });
    }
  } else if (item?.twinCode) {
    await d.drills.add({ code: item.twinCode, ts: now, kind: 'twin', correct: a.correct ? 1 : 0, total: 1, relief: a.correct ? TWIN_RELIEF : 0 });
  }
  return { correct: a.correct, rating: a.correct ? 3 : 1, codes: a.codes };
}

/** Queue an unscored "twin" right after the current item (spec 4.2). Returns false when none is available. */
export function addTwin(s: LiveSession, ex: GrammarExercise, code: string, content: Content): boolean {
  const twin = buildTwin(ex, content, s.pool, s.cards, rng(`twin:${ex.instanceId}:${s.twinSeq}`));
  if (!twin) return false;
  const key = `twin:${++s.twinSeq}`;
  s.extras.set(key, twin);
  s.queue.splice(s.index + 1, 0, { cardId: twin.cardId, mode: 'review', exercise: 'grammar', extraKey: key, twinCode: code });
  return true;
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
