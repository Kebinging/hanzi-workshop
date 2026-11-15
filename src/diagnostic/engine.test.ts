import { describe, expect, it } from 'vitest';
import { content } from '../content';
import { answer, currentItem, inferOutcomes, nextBand, seedsFromDiagnostic, startDiagnostic, type DiagState } from './engine';
import type { BandOutcome } from '../state/types';

const NOW = Date.UTC(2026, 10, 15, 10);

/** Simulated learner who knows every word in bands <= `level` and nothing above. */
function run(level: number, grammarRight = true) {
  let s: DiagState = startDiagnostic(content, 'test');
  let steps = 0;
  for (let item = currentItem(s, content); item; item = currentItem(s, content)) {
    if (++steps > 2000) throw new Error('diagnostic did not terminate');
    if (item.kind === 'lex') {
      const knows = (content.vocabById.get(item.wordId)!.band ?? 0) <= level;
      s = answer(s, content, item, { kind: 'lex', choice: knows ? item.question.answer : 'dk' });
    } else if (item.kind === 'sweep') {
      s = answer(s, content, item, { kind: 'sweep', know: (content.vocabById.get(item.wordId)!.band ?? 0) <= level });
    } else {
      s = answer(s, content, item, { kind: 'gram', choice: grammarRight ? item.answer : (item.answer + 1) % 3 });
    }
  }
  return { s, steps };
}

const outcomes = (o: Partial<Record<number, BandOutcome>>) => {
  const out: Record<number, BandOutcome> = {};
  for (let b = 1; b <= 10; b++) out[b] = o[b] ?? 'untested';
  return out;
};

describe('diagnostic walk (spec 1.2.1)', () => {
  it('pass at 5 jumps to 7; fail steps down; stops at a pass/fail boundary', () => {
    expect(nextBand({ outcomes: outcomes({ 5: 'passed' }), probes: 1, band: 5 })).toBe(7);
    expect(nextBand({ outcomes: outcomes({ 5: 'failed' }), probes: 1, band: 5 })).toBe(4);
    expect(nextBand({ outcomes: outcomes({ 5: 'passed', 7: 'failed' }), probes: 2, band: 7 })).toBe(6);
    expect(nextBand({ outcomes: outcomes({ 6: 'passed', 7: 'failed', 5: 'passed' }), probes: 3, band: 6 })).toBeNull();
    expect(nextBand({ outcomes: outcomes({ 9: 'passed' }), probes: 3, band: 9 })).toBe(10);
    expect(nextBand({ outcomes: outcomes({ 1: 'failed' }), probes: 5, band: 1 })).toBeNull();
    expect(nextBand({ outcomes: outcomes({ 5: 'passed' }), probes: 15, band: 5 })).toBeNull();
  });

  it('assumes bands below a pass are known, not those under a failure', () => {
    const o = inferOutcomes(outcomes({ 5: 'passed', 7: 'failed', 6: 'passed' }));
    expect([1, 2, 3, 4].map((b) => o[b])).toEqual(['assumed', 'assumed', 'assumed', 'assumed']);
    expect(o[8]).toBe('untested');
    const o2 = inferOutcomes(outcomes({ 3: 'failed', 5: 'passed', 4: 'failed' }));
    expect(o2[2]).toBe('untested');
  });

  it('a strong learner finishes quickly with nearly everything known', () => {
    const { s, steps } = run(10);
    const { result, cards } = seedsFromDiagnostic(s, content, NOW);
    expect(steps).toBeLessThan(80);
    expect(result.knownWords).toBe(500);
    expect(Object.values(result.grammarClusters).every((g) => g === 'known')).toBe(true);
    expect(cards.filter((c) => c.state === 2).length).toBe(500 + content.clusters.length);
  });

  it('a mid learner gets a boundary, a sweep, and bridge cards', () => {
    const { s } = run(6, false);
    const { result, cards } = seedsFromDiagnostic(s, content, NOW);
    expect(result.bandOutcomes[6]).toMatch(/passed|assumed/);
    expect(result.bandOutcomes[7]).toBe('failed');
    expect(result.knownWords).toBeGreaterThan(250);
    expect(result.bridgeWords).toBeGreaterThan(150);
    const bridge = cards.filter((c) => c.origin === 'bridge' && c.facet === 'word.recog');
    expect(bridge.every((c) => c.state === 0)).toBe(true);
    expect(Object.values(result.grammarClusters).every((g) => g === 'weak')).toBe(true);
  });
});
