import { describe, expect, it } from 'vitest';
import { rateAttempt, adaptiveBounds, DEFAULT_LATENCY } from './rating';
import { DAY, forgettingCurve, newCard, retrievability, review, seededReviewCard } from './fsrs';
import { interleave, missingCards, planSession, requeueOffset, unlockedUnits } from './session';
import { content } from '../content';
import { DEFAULT_SETTINGS, type FSRSCardState } from '../state/types';
import { buildExposurePool } from '../gate/pool';

const B = DEFAULT_LATENCY.recognition;
const NOW = Date.UTC(2026, 10, 15, 10);

describe('rateAttempt (spec 1.4.3)', () => {
  it('wrong, dont-know or 2+ wrong tries -> Again', () => {
    expect(rateAttempt({ correct: false, latencyMs: 1000, reps: 3 }, B)).toBe(1);
    expect(rateAttempt({ correct: true, dontKnow: true, latencyMs: 1000, reps: 3 }, B)).toBe(1);
    expect(rateAttempt({ correct: true, wrongTries: 2, latencyMs: 1000, reps: 3 }, B)).toBe(1);
  });
  it('hint, peek, one wrong try or slow -> Hard', () => {
    expect(rateAttempt({ correct: true, usedHint: true, latencyMs: 3000, reps: 3 }, B)).toBe(2);
    expect(rateAttempt({ correct: true, peekedTarget: true, latencyMs: 3000, reps: 3 }, B)).toBe(2);
    expect(rateAttempt({ correct: true, wrongTries: 1, latencyMs: 3000, reps: 3 }, B)).toBe(2);
    expect(rateAttempt({ correct: true, latencyMs: B.slowMs + 1, reps: 3 }, B)).toBe(2);
  });
  it('fast first-try -> Easy only after 2 reps', () => {
    expect(rateAttempt({ correct: true, latencyMs: 1000, reps: 2 }, B)).toBe(4);
    expect(rateAttempt({ correct: true, latencyMs: 1000, reps: 1 }, B)).toBe(3);
    expect(rateAttempt({ correct: true, latencyMs: 4000, reps: 5 }, B)).toBe(3);
  });
  it('adaptive bounds stay within 0.5x-1.5x of defaults', () => {
    const b = adaptiveBounds('recognition', Array(20).fill(100_000));
    expect(b.slowMs).toBe(B.slowMs * 1.5);
    expect(adaptiveBounds('recognition', [1, 2])).toEqual(B);
  });
});

describe('FSRS wrapper', () => {
  it('forgetting curve gives R = 0.9 at t = S', () => {
    expect(forgettingCurve(10, 10)).toBeCloseTo(0.9, 5);
    expect(forgettingCurve(0, 10)).toBe(1);
  });
  it('reviewing a new card moves it into learning and logs it', () => {
    const c = newCard('word.recog', 'w_gang', 'curriculum', NOW);
    const { card, log } = review(c, 3, NOW, DEFAULT_SETTINGS, { exerciseKind: 'recognition', instanceId: 'x', latencyMs: 2000, peeks: 0 });
    expect(card.state).toBe(1);
    expect(card.reps).toBe(1);
    expect(card.introducedAt).toBe(NOW);
    expect(log.stateBefore).toBe(0);
    expect(card.recentInstanceIds).toEqual(['x']);
  });
  it('seeded review cards have the requested stability and due date', () => {
    const c = seededReviewCard('word.recog', 'w_ai', 'diagnostic', NOW, 30, 12);
    expect(c.state).toBe(2);
    expect(c.due).toBe(NOW + 12 * DAY);
    expect(retrievability(c, NOW + 30 * DAY)).toBeCloseTo(0.9, 5);
  });
});

describe('exposure pool (spec 1.1.2)', () => {
  it('includes high-R words and unlapsed diagnostic words, excludes new', () => {
    const fresh = seededReviewCard('word.recog', 'a', 'curriculum', NOW, 10, 5);
    const old = { ...seededReviewCard('word.recog', 'b', 'curriculum', NOW - 60 * DAY, 2, 1) };
    const diag = { ...seededReviewCard('word.recog', 'c', 'diagnostic', NOW - 60 * DAY, 2, 1) };
    const n = newCard('word.recog', 'd', 'bridge', NOW);
    const pool = buildExposurePool([fresh, old, diag, n], NOW);
    expect([...pool].sort()).toEqual(['a', 'c']);
  });
});

describe('session planning (spec 1.5)', () => {
  const settings = { ...DEFAULT_SETTINGS };
  const base = { now: NOW, settings, introducedToday: { words: 0, chars: 0, grammar: 0, bridgeGrammar: 0, grammarUse: 0 }, againRate7d: 0, mode: 'normal' as const, content };

  it('interleaves one new item after every 3 reviews', () => {
    expect(interleave<number | string>([1, 2, 3, 4, 5, 6, 7], ['a', 'b'], 3)).toEqual([1, 2, 3, 'a', 4, 5, 6, 'b', 7]);
  });

  it('caps bridge words at 8 and total new at the daily budget', () => {
    const cards: FSRSCardState[] = [];
    for (let i = 0; i < 20; i++) cards.push(newCard('word.recog', `bridge${i}`, 'bridge', NOW, i));
    for (let i = 0; i < 20; i++) cards.push(newCard('word.recog', `unit${i}`, 'curriculum', NOW, i));
    const plan = planSession({ ...base, cards });
    expect(plan.newCount).toBe(12);
    expect(plan.items.filter((q) => q.cardId.includes('bridge')).length).toBe(8);
    // highest priority bridge first
    expect(plan.items[0].cardId).toBe('word.recog:bridge19');
  });

  it('withholds new items when overloaded', () => {
    const cards: FSRSCardState[] = [newCard('word.recog', 'x', 'curriculum', NOW)];
    for (let i = 0; i < 151; i++) cards.push(seededReviewCard('word.recog', `d${i}`, 'diagnostic', NOW - 40 * DAY, 30, -1));
    const plan = planSession({ ...base, cards });
    expect(plan.withheldNew).toBe(true);
    expect(plan.newCount).toBe(0);
    expect(planSession({ ...base, cards: cards.slice(0, 2), againRate7d: 0.3 }).withheldNew).toBe(true);
  });

  it('orders due reviews by lowest retrievability, grammar included, and defers unplayable cards', () => {
    const weak = seededReviewCard('word.recog', 'weak', 'diagnostic', NOW - 30 * DAY, 2, -1);
    const strong = seededReviewCard('word.recog', 'strong', 'diagnostic', NOW - 10 * DAY, 30, -1);
    const gram = seededReviewCard('gram.form', 'G12-01', 'diagnostic', NOW - 40 * DAY, 2, -1);
    const plan = planSession({ ...base, cards: [strong, gram, weak] });
    expect(plan.items.map((q) => q.cardId)).toEqual(['gram.form:G12-01', 'word.recog:weak', 'word.recog:strong']);
    const gated = planSession({ ...base, cards: [strong, gram, weak], playable: (c) => !c.facet.startsWith('gram.') });
    expect(gated.deferred).toEqual(['gram.form:G12-01']);
  });

  it('creates unit word + grammar cards and look-alike char cards once a word is known', () => {
    const pool = new Set(content.vocab.filter((w) => w.hanzi === '自己').map((w) => w.id));
    const created = missingCards([], content, [1], pool, NOW, (id) => id !== 'G3-07');
    expect(created.filter((c) => c.facet === 'word.recog').length).toBe(content.unitWords(1).length);
    expect(created.filter((c) => c.facet === 'gram.form').length).toBe(8);
    expect(created.filter((c) => c.facet === 'gram.use').length).toBe(7);
    expect(created.some((c) => c.id === 'char.form:己')).toBe(true);
  });

  it('introduces one new grammar point a day, in order, only when prerequisites are in Review', () => {
    const forms = ['G3-01', 'G3-02', 'G3-03'].map((id) => newCard('gram.form', id, 'curriculum', NOW));
    const none = planSession({ ...base, cards: forms });
    expect(none.items.filter((q) => q.exercise === 'grammar')).toEqual([]); // G12 prerequisites missing
    const reqs = ['G12-02', 'G12-07', 'G12-03'].map((id) => seededReviewCard('gram.form', id, 'diagnostic', NOW, 30, 20));
    const plan = planSession({ ...base, cards: [...forms, ...reqs] });
    expect(plan.items.filter((q) => q.mode === 'new').map((q) => q.cardId)).toEqual(['gram.form:G3-01']);
    const done = planSession({ ...base, cards: [...forms, ...reqs], introducedToday: { ...base.introducedToday, grammar: 1 } });
    expect(done.items.filter((q) => q.mode === 'new')).toEqual([]);
  });

  it('unlocks unit 2 once unit 1 grammar and words are mostly learned', () => {
    expect(unlockedUnits([], content, new Set())).toEqual([1]);
    const learned = content.unitPatterns(1).map((g) => seededReviewCard('gram.form', g.id, 'curriculum', NOW, 30, 20));
    const pool = new Set(content.unitWords(1).map((w) => w.id));
    expect(unlockedUnits(learned, content, pool)).toEqual([1, 2]);
  });

  it('re-queues cards due again within 20 minutes', () => {
    expect(requeueOffset(60_000)).toBe(3);
    expect(requeueOffset(10 * 60_000)).toBe(8);
    expect(requeueOffset(2 * DAY)).toBeNull();
  });
});
