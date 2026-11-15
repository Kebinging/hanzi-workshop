/** Session planning (spec 1.5). Pure functions over card state. */
import type { Content } from '../content';
import type { FSRSCardState, Settings } from '../state/types';
import { DAY, newCard, retrievability } from './fsrs';

export type ExerciseFor = 'recognition' | 'lookalike' | 'grammar';

export interface QueueItem {
  cardId: string;
  mode: 'review' | 'new';
  exercise: ExerciseFor;
  /** Prebuilt, unscored exercise (remedial drill item or twin), looked up in LiveSession.extras. */
  extraKey?: string;
  drill?: { code: string; index: number; total: number };
  twinCode?: string;
}

export interface SessionPlan {
  items: QueueItem[];
  dueCount: number;
  newCount: number;
  withheldNew: boolean;
  withheldReason?: string;
  deferred: string[];   // due cards with no gated instance right now (G4)
}

export interface PlanInput {
  cards: FSRSCardState[];
  now: number;
  settings: Settings;
  introducedToday: { words: number; chars: number; grammar: number; bridgeGrammar: number; grammarUse: number };
  againRate7d: number;
  mode: 'normal' | 'flight';
  content: Content;
  /** Whether a card has a gated exercise available now (defaults to true). */
  playable?: (c: FSRSCardState) => boolean;
}

export const MAX_BRIDGE_PER_DAY = 8;
export const MAX_NEW_CHARS_PER_DAY = 3;
export const MAX_BRIDGE_GRAMMAR_PER_DAY = 1;
export const MAX_NEW_USE_PER_DAY = 2;
const OVERLOAD_DUE = 150;
const OVERLOAD_AGAIN = 0.25;
const REVIEW_CAP = { normal: 100, flight: 400 };

export function exerciseFor(c: FSRSCardState): ExerciseFor | null {
  if (c.facet === 'word.recog') return 'recognition';
  if (c.facet === 'char.form') return 'lookalike';
  if (c.facet === 'gram.form' || c.facet === 'gram.use') return 'grammar';
  return null;
}

const patternOrder = (id: string) => {
  const m = /^G(\d+)-(\d+)$/.exec(id);
  return m ? Number(m[1]) * 1000 + Number(m[2]) : 99_999;
};

/** Prerequisites satisfied: every required pattern/cluster has gram.form in Review (spec 1.5.2). */
export function requiresMet(patternId: string, byId: Map<string, FSRSCardState>, content: Content): boolean {
  const reqs = content.grammarById.get(patternId)?.requires ?? [];
  return reqs.every((r) => byId.get(`gram.form:${r}`)?.state === 2);
}

export function planSession(p: PlanInput): SessionPlan {
  const { cards, now, settings, mode, content } = p;
  const playable = p.playable ?? (() => true);
  const byId = new Map(cards.map((c) => [c.id, c]));
  const horizon = mode === 'flight' ? now + 3 * DAY : now;
  const dueAll = cards.filter((c) => !c.suspended && c.state !== 0 && c.due <= horizon && exerciseFor(c));
  const deferred = dueAll.filter((c) => !playable(c)).map((c) => c.id);
  const due = dueAll
    .filter((c) => playable(c))
    .sort((a, b) => retrievability(a, now) - retrievability(b, now) || a.due - b.due)
    .slice(0, REVIEW_CAP[mode]);

  let withheldReason: string | undefined;
  const dueNow = cards.filter((c) => !c.suspended && c.state !== 0 && c.due <= now && exerciseFor(c)).length;
  if (dueNow > OVERLOAD_DUE) withheldReason = `${dueNow} reviews are due — clearing those first.`;
  else if (p.againRate7d > OVERLOAD_AGAIN) withheldReason = `You've missed ${Math.round(p.againRate7d * 100)}% of reviews this week — consolidating before adding more.`;

  const fresh: QueueItem[] = [];
  if (!withheldReason) {
    const isNew = (c: FSRSCardState) => c.state === 0 && !c.suspended;
    // Words: bridge first (max 8), then curriculum.
    let budget = Math.max(0, settings.newWordsPerDay - p.introducedToday.words);
    const newWords = cards.filter((c) => isNew(c) && c.facet === 'word.recog');
    const byPriority = (a: FSRSCardState, b: FSRSCardState) => (b.priority ?? 0) - (a.priority ?? 0);
    const bridge = newWords.filter((c) => c.origin === 'bridge').sort(byPriority);
    const curriculum = newWords.filter((c) => c.origin !== 'bridge').sort(byPriority);
    const bridgeTake = bridge.slice(0, Math.min(MAX_BRIDGE_PER_DAY, budget));
    budget -= bridgeTake.length;
    for (const c of [...bridgeTake, ...curriculum.slice(0, budget)]) fresh.push({ cardId: c.id, mode: 'new', exercise: 'recognition' });

    // Look-alike characters.
    const charBudget = Math.max(0, MAX_NEW_CHARS_PER_DAY - p.introducedToday.chars);
    for (const c of cards.filter((x) => isNew(x) && x.facet === 'char.form').slice(0, charBudget)) {
      fresh.push({ cardId: c.id, mode: 'new', exercise: 'lookalike' });
    }

    // Foundation grammar (HSK 1–2 clusters the diagnostic flagged).
    const bridgeG = Math.max(0, MAX_BRIDGE_GRAMMAR_PER_DAY - p.introducedToday.bridgeGrammar);
    const clusters = cards.filter((c) => isNew(c) && c.facet === 'gram.form' && c.itemId.startsWith('G12-')).sort(byPriority);
    for (const c of clusters.slice(0, bridgeG)) fresh.push({ cardId: c.id, mode: 'review', exercise: 'grammar' });

    // New HSK 3 grammar points: in syllabus order, prerequisites met, playable now.
    const gBudget = Math.max(0, settings.newGrammarPerDay - p.introducedToday.grammar);
    const forms = cards
      .filter((c) => isNew(c) && c.facet === 'gram.form' && !c.itemId.startsWith('G12-'))
      .filter((c) => requiresMet(c.itemId, byId, content) && playable(c))
      .sort((a, b) => patternOrder(a.itemId) - patternOrder(b.itemId));
    for (const c of forms.slice(0, gBudget)) fresh.push({ cardId: c.id, mode: 'new', exercise: 'grammar' });

    // gram.use unlocks once the form is in Review.
    const uBudget = Math.max(0, MAX_NEW_USE_PER_DAY - p.introducedToday.grammarUse);
    const uses = cards
      .filter((c) => isNew(c) && c.facet === 'gram.use' && byId.get(`gram.form:${c.itemId}`)?.state === 2 && playable(c))
      .sort((a, b) => patternOrder(a.itemId) - patternOrder(b.itemId));
    for (const c of uses.slice(0, uBudget)) fresh.push({ cardId: c.id, mode: 'review', exercise: 'grammar' });
  }

  const reviews: QueueItem[] = due.map((c) => ({ cardId: c.id, mode: 'review', exercise: exerciseFor(c)! }));
  return {
    items: separate(interleave(reviews, fresh, 3), content),
    dueCount: due.length,
    newCount: fresh.length,
    withheldNew: !!withheldReason,
    withheldReason,
    deferred,
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

/** Spacing key: same grammar pattern / same look-alike set must not be adjacent (spec 1.5.2). */
export function spacingKey(q: QueueItem, content: Content): string | undefined {
  const itemId = q.cardId.slice(q.cardId.indexOf(':') + 1);
  if (q.exercise === 'grammar') return `g:${itemId}`;
  if (q.exercise === 'lookalike') return content.confusableSetOf(itemId)?.id;
  return undefined;
}

function separate(items: QueueItem[], content: Content): QueueItem[] {
  const out = [...items];
  for (let i = 1; i < out.length; i++) {
    const k = spacingKey(out[i], content);
    if (!k || k !== spacingKey(out[i - 1], content)) continue;
    const j = out.findIndex((q, n) => n > i && spacingKey(q, content) !== k);
    if (j > 0) [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Units unlocked for new items (spec 2.1): unit 1 always; unit n+1 once unit n has >= 80 % of its
 * grammar forms in Review and >= 70 % of its words in the exposure pool.
 */
export function unlockedUnits(cards: FSRSCardState[], content: Content, pool: ReadonlySet<string>): number[] {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const units = content.bundle.syllabus.units.filter((u) => u.available).map((u) => u.unit).sort((a, b) => a - b);
  const out: number[] = [];
  for (const u of units) {
    out.push(u);
    const patterns = content.unitPatterns(u);
    const words = content.unitWords(u);
    const gDone = patterns.length ? patterns.filter((g) => byId.get(`gram.form:${g.id}`)?.state === 2).length / patterns.length : 1;
    const wDone = words.length ? words.filter((w) => pool.has(w.id)).length / words.length : 1;
    if (gDone < 0.8 || wDone < 0.7) break;
  }
  return out;
}

/**
 * Cards that should exist but don't yet:
 *  - word.recog for every word of each unlocked unit (lower units first)
 *  - gram.form (+ gram.use where use items exist) for each unlocked unit's patterns
 *  - char.form for look-alike characters once a word containing them is known
 */
export function missingCards(
  cards: FSRSCardState[], content: Content, units: number[], pool: ReadonlySet<string>, now: number,
  hasUse: (patternId: string) => boolean,
): FSRSCardState[] {
  const have = new Set(cards.map((c) => c.id));
  const out: FSRSCardState[] = [];
  const push = (c: FSRSCardState) => { if (!have.has(c.id)) { have.add(c.id); out.push(c); } };
  for (const unit of units) {
    for (const w of content.unitWords(unit)) {
      push(newCard('word.recog', w.id, 'curriculum', now, (100 - unit) * 100 + content.unitDemand(w.id, unit)));
    }
    for (const g of content.unitPatterns(unit)) {
      push(newCard('gram.form', g.id, 'curriculum', now));
      if (hasUse(g.id)) push(newCard('gram.use', g.id, 'curriculum', now));
    }
  }
  for (const set of content.confusables) {
    for (const ch of set.chars) {
      const knownWord = (content.wordsByChar.get(ch) ?? []).some((w) => pool.has(w.id));
      if (knownWord) push(newCard('char.form', ch, 'curriculum', now));
    }
  }
  return out;
}

/** Re-insert position for a card that comes due again within this session (learning steps). */
export function requeueOffset(dueInMs: number): number | null {
  if (dueInMs > 20 * 60_000) return null;
  return dueInMs <= 90_000 ? 3 : 8;
}
