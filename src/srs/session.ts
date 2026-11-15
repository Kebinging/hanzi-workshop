/** Session planning (spec 1.5). Pure functions over card state. */
import type { Content } from '../content';
import type { FSRSCardState, Settings } from '../state/types';
import { DAY, newCard, retrievability } from './fsrs';

export type ExerciseFor = 'recognition' | 'lookalike';

export interface QueueItem {
  cardId: string;
  mode: 'review' | 'new';
  exercise: ExerciseFor;
}

export interface SessionPlan {
  items: QueueItem[];
  dueCount: number;
  newCount: number;
  withheldNew: boolean;
  withheldReason?: string;
}

export interface PlanInput {
  cards: FSRSCardState[];
  now: number;
  settings: Settings;
  introducedToday: { words: number; chars: number };
  againRate7d: number;
  mode: 'normal' | 'flight';
  content: Content;
}

export const MAX_BRIDGE_PER_DAY = 8;
export const MAX_NEW_CHARS_PER_DAY = 3;
const OVERLOAD_DUE = 150;
const OVERLOAD_AGAIN = 0.25;
const REVIEW_CAP = { normal: 100, flight: 400 };

/** Facets that have an exercise type in this build. */
export function exerciseFor(c: FSRSCardState): ExerciseFor | null {
  if (c.facet === 'word.recog') return 'recognition';
  if (c.facet === 'char.form') return 'lookalike';
  return null;
}

export function planSession(p: PlanInput): SessionPlan {
  const { cards, now, settings, mode } = p;
  const horizon = mode === 'flight' ? now + 3 * DAY : now;
  const due = cards
    .filter((c) => !c.suspended && c.state !== 0 && c.due <= horizon && exerciseFor(c))
    .sort((a, b) => retrievability(a, now) - retrievability(b, now) || a.due - b.due)
    .slice(0, REVIEW_CAP[mode]);

  let withheldReason: string | undefined;
  const allDue = cards.filter((c) => !c.suspended && c.state !== 0 && c.due <= now && exerciseFor(c)).length;
  if (allDue > OVERLOAD_DUE) withheldReason = `${allDue} reviews are due — clearing those first.`;
  else if (p.againRate7d > OVERLOAD_AGAIN) withheldReason = `You've missed ${Math.round(p.againRate7d * 100)}% of reviews this week — consolidating before adding more.`;

  const fresh: FSRSCardState[] = [];
  if (!withheldReason) {
    let budget = Math.max(0, settings.newWordsPerDay - p.introducedToday.words);
    const newWords = cards.filter((c) => c.state === 0 && !c.suspended && c.facet === 'word.recog');
    const bridge = newWords.filter((c) => c.origin === 'bridge').sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    const curriculum = newWords.filter((c) => c.origin !== 'bridge').sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    const bridgeTake = bridge.slice(0, Math.min(MAX_BRIDGE_PER_DAY, budget));
    budget -= bridgeTake.length;
    fresh.push(...bridgeTake, ...curriculum.slice(0, budget));
    const charBudget = Math.max(0, MAX_NEW_CHARS_PER_DAY - p.introducedToday.chars);
    fresh.push(...cards.filter((c) => c.state === 0 && !c.suspended && c.facet === 'char.form').slice(0, charBudget));
  }

  const reviews: QueueItem[] = due.map((c) => ({ cardId: c.id, mode: 'review', exercise: exerciseFor(c)! }));
  const news: QueueItem[] = fresh.map((c) => ({ cardId: c.id, mode: 'new', exercise: exerciseFor(c)! }));
  return {
    items: separateConfusables(interleave(reviews, news, 3), p),
    dueCount: due.length,
    newCount: news.length,
    withheldNew: !!withheldReason,
    withheldReason,
  };
}

/** One new item after every `every` reviews; leftovers appended. */
export function interleave<T>(reviews: T[], news: T[], every: number): T[] {
  const out: T[] = [];
  let ri = 0;
  let ni = 0;
  while (ri < reviews.length || ni < news.length) {
    for (let k = 0; k < every && ri < reviews.length; k++) out.push(reviews[ri++]);
    if (ni < news.length) out.push(news[ni++]);
  }
  return out;
}

/** Never two look-alike drills on the same confusable set back to back (spec 1.5.2). */
function separateConfusables(items: QueueItem[], p: PlanInput): QueueItem[] {
  const setOf = (q: QueueItem) =>
    q.exercise === 'lookalike' ? p.content.confusableSetOf(q.cardId.split(':')[1])?.id : undefined;
  const out = [...items];
  for (let i = 1; i < out.length; i++) {
    const s = setOf(out[i]);
    if (!s || s !== setOf(out[i - 1])) continue;
    const j = out.findIndex((q, k) => k > i && setOf(q) !== s);
    if (j > 0) [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Cards that should exist but don't yet:
 *  - word.recog for every word of `unit` (curriculum), priority = how many unit sentences use it
 *  - char.form for look-alike characters once a word containing them is known
 */
export function missingCards(
  cards: FSRSCardState[], content: Content, unit: number, pool: ReadonlySet<string>, now: number,
): FSRSCardState[] {
  const have = new Set(cards.map((c) => c.id));
  const out: FSRSCardState[] = [];
  for (const w of content.unitWords(unit)) {
    const id = `word.recog:${w.id}`;
    if (!have.has(id)) out.push(newCard('word.recog', w.id, 'curriculum', now, content.unitDemand(w.id, unit)));
  }
  for (const set of content.confusables) {
    for (const ch of set.chars) {
      const id = `char.form:${ch}`;
      if (have.has(id) || out.some((c) => c.id === id)) continue;
      const knownWord = (content.wordsByChar.get(ch) ?? []).some((w) => pool.has(w.id));
      if (knownWord) out.push(newCard('char.form', ch, 'curriculum', now));
    }
  }
  return out;
}

/** Re-insert position for a card that comes due again within this session (learning steps). */
export function requeueOffset(dueInMs: number): number | null {
  if (dueInMs > 20 * 60_000) return null;
  return dueInMs <= 90_000 ? 3 : 8;
}
