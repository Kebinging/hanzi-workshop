import { describe, expect, it } from 'vitest';
import { content } from '../content';
import type { DrillRecord, ErrorLog, ReviewLog } from '../state/types';
import { DAY } from '../srs/fsrs';
import { rng } from '../lib/rng';
import { drillRelief, triggeredCodes, weaknessAt, TAU } from './weakness';
import { buildDrill, buildTwin, DRILL_SIZE } from './drill';
import { buildSlot } from '../exercises/grammar';
import { newCard } from '../srs/fsrs';

const NOW = Date.UTC(2026, 10, 20);
const allWords = new Set(content.vocab.map((w) => w.id));
const err = (code: string, instanceId: string, ts = NOW, itemIds = ['G3-01']): ErrorLog =>
  ({ ts, attemptId: 'a', exerciseKind: 'slot_builder', instanceId, codes: [code], itemIds, learnerAnswer: '', expected: '' });
const rev = (cardId: string, ts: number, rating: 1 | 2 | 3 | 4 = 3): ReviewLog =>
  ({ cardId, ts, rating, stateBefore: 2, stabilityBefore: 5, difficultyBefore: 5, elapsedDays: 1, exerciseKind: 'slot_builder', instanceId: 'x', latencyMs: 1, peeks: 0 });

describe('weakness scoring (spec 4.4)', () => {
  it('sums decayed errors and counts distinct instances', () => {
    const w = weaknessAt([err('ASPECT.LE_MISUSE', 'a'), err('ASPECT.LE_MISUSE', 'b'), err('ASPECT.LE_MISUSE', 'b', NOW - TAU)], [], [], content, NOW).get('ASPECT.LE_MISUSE')!;
    expect(w.score).toBeCloseTo(2 + Math.exp(-1), 5);
    expect(w.instances).toBe(2);
  });

  it('correct answers on related patterns lower the score', () => {
    const errors = [err('ASPECT.LE_MISUSE', 'a'), err('ASPECT.LE_MISUSE', 'b')];
    const w = weaknessAt(errors, [rev('gram.form:G3-01', NOW), rev('gram.form:G3-01', NOW)], [], content, NOW).get('ASPECT.LE_MISUSE')!;
    expect(w.score).toBeCloseTo(1, 5);
  });

  it('triggers at score >= 3 with >= 3 instances, max 2, not twice within 2 days', () => {
    const errors = [
      ...['a', 'b', 'c'].map((i) => err('ORDER.TIME_AFTER_VERB', i)),
      ...['a', 'b'].map((i) => err('COMP.PLACEMENT', i)), err('COMP.PLACEMENT', 'a'),
      ...['a', 'b', 'c', 'd'].map((i) => err('LEX.MEANING', i)),
    ];
    const scores = weaknessAt(errors, [], [], content, NOW);
    expect(triggeredCodes(scores, [], NOW).map((w) => w.code)).toEqual(['ORDER.TIME_AFTER_VERB']);
    const recent: DrillRecord = { code: 'ORDER.TIME_AFTER_VERB', ts: NOW - DAY, kind: 'drill', correct: 2, total: 5, relief: 0 };
    expect(triggeredCodes(scores, [recent], NOW)).toEqual([]);
    expect(triggeredCodes(scores, [{ ...recent, ts: NOW - 3 * DAY }], NOW)).toHaveLength(1);
  });

  it('a successful drill halves the score; a failed one does not', () => {
    expect(drillRelief(4, 4, 5)).toBe(2);
    expect(drillRelief(4, 2, 5)).toBe(0);
    const errors = ['a', 'b', 'c', 'd'].map((i) => err('ORDER.TIME_AFTER_VERB', i));
    const relief: DrillRecord = { code: 'ORDER.TIME_AFTER_VERB', ts: NOW, kind: 'drill', correct: 5, total: 5, relief: 2 };
    expect(weaknessAt(errors, [], [relief], content, NOW).get('ORDER.TIME_AFTER_VERB')!.score).toBeCloseTo(2, 5);
  });
});

describe('micro-drills', () => {
  it('builds 5 gated items of >= 2 types that avoid the failed sentences', () => {
    const avoid = new Set(['G3-08:ex1', 'G3-08:in1']);
    const drill = buildDrill('LEX.NEAR_SYNONYM', ['G3-08'], avoid, content, allWords, new Map(), rng(1), NOW);
    expect(drill).toHaveLength(DRILL_SIZE);
    expect(new Set(drill.map((d) => d.kind)).size).toBeGreaterThanOrEqual(2);
    expect(drill.some((d) => avoid.has(d.instanceId))).toBe(false);
  });

  it('builds look-alike drills for orthography codes', () => {
    const drill = buildDrill('ORTHO.LOOKALIKE', ['己', '已'], new Set(), content, allWords, new Map(), rng(2), NOW);
    expect(drill.length).toBeGreaterThan(0);
    expect(drill.every((d) => d.kind === 'lookalike')).toBe(true);
  });

  it('returns nothing when no content passes the gate', () => {
    expect(buildDrill('ORDER.TIME_AFTER_VERB', [], new Set(), content, new Set(), new Map(), rng(3), NOW)).toEqual([]);
  });

  it('a twin is a different sentence of the same pattern and type', () => {
    const p = content.grammarById.get('G3-06')!;
    const ex = buildSlot(newCard('gram.form', p.id, 'curriculum', NOW), p, allWords, rng(4))!;
    const twin = buildTwin(ex, content, allWords, new Map(), rng(5), NOW)!;
    expect(twin.kind).toBe('slot');
    expect(twin.instanceId).not.toBe(ex.instanceId);
  });
});
