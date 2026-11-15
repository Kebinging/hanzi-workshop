/**
 * Adaptive HSK 1–2 diagnostic (spec 1.2). Pure state machine: no I/O.
 *   walk    — band probing, 6 words per probe
 *   sweep   — know / don't-know self-report for words in failed bands, 20 % verified
 *   grammar — 12 clusters × 2 sentence-judgement items (+1 confirmation on a split)
 */
import type { Content } from '../content';
import type { BandOutcome, DiagnosticResult, FSRSCardState } from '../state/types';
import { buildMeaningQuestion, type MeaningQuestion } from '../exercises/options';
import { rng, sample, shuffle, randInt } from '../lib/rng';
import { newCard, seededReviewCard } from '../srs/fsrs';

export const BANDS = 10;
const PROBE_SIZE = 6;
const MAX_PROBES = 15;
const VERIFY_RATE = 0.2;

type WordResult = 'known' | 'unknown' | 'self-known' | 'self-unknown';

export interface DiagState {
  seed: string;
  phase: 'walk' | 'sweep' | 'grammar' | 'done';
  step: number;
  band: number;
  batch: string[];
  probes: number;
  bandScores: Record<number, { correct: number; total: number }>;
  outcomes: Record<number, BandOutcome>;
  words: Record<string, WordResult>;
  sweepQueue: string[];
  verifying: string | null;
  verifyStats: Record<number, { asked: number; correct: number }>;
  grammarQueue: { clusterId: string; item: number }[];
  grammarScores: Record<string, boolean[]>;
}

export type DiagItem =
  | { kind: 'lex'; wordId: string; band: number; question: MeaningQuestion; verify: boolean }
  | { kind: 'sweep'; wordId: string; band: number }
  | { kind: 'gram'; clusterId: string; item: number; options: string[]; answer: number };

export type DiagResponse =
  | { kind: 'lex'; choice: number | 'dk' }
  | { kind: 'sweep'; know: boolean }
  | { kind: 'gram'; choice: number };

const bandOf = (c: Content, id: string) => c.vocabById.get(id)?.band ?? 0;

export function startDiagnostic(content: Content, seed: string): DiagState {
  const s: DiagState = {
    seed, phase: 'walk', step: 0, band: 5, batch: [], probes: 0, bandScores: {}, outcomes: {},
    words: {}, sweepQueue: [], verifying: null, verifyStats: {}, grammarQueue: [], grammarScores: {},
  };
  for (let b = 1; b <= BANDS; b++) s.outcomes[b] = 'untested';
  newProbe(s, content);
  return s;
}

function newProbe(s: DiagState, content: Content): void {
  const r = rng(`${s.seed}:probe:${s.probes}`);
  const unseen = content.bandWords(s.band).filter((w) => !(w.id in s.words));
  s.batch = sample(unseen, PROBE_SIZE, r).map((w) => w.id);
  s.probes++;
}

export function currentItem(s: DiagState, content: Content): DiagItem | null {
  const r = rng(`${s.seed}:item:${s.step}`);
  const foundation = content.foundation;
  if (s.phase === 'walk' && s.batch.length) {
    const w = content.vocabById.get(s.batch[0])!;
    return { kind: 'lex', wordId: w.id, band: s.band, question: buildMeaningQuestion(w, foundation, content, r), verify: false };
  }
  if (s.phase === 'sweep') {
    if (s.verifying) {
      const w = content.vocabById.get(s.verifying)!;
      return { kind: 'lex', wordId: w.id, band: w.band ?? 0, question: buildMeaningQuestion(w, foundation, content, r), verify: true };
    }
    if (s.sweepQueue.length) return { kind: 'sweep', wordId: s.sweepQueue[0], band: bandOf(content, s.sweepQueue[0]) };
  }
  if (s.phase === 'grammar' && s.grammarQueue.length) {
    const { clusterId, item } = s.grammarQueue[0];
    const cl = content.clusters.find((c) => c.id === clusterId)!;
    const it = cl.items[item];
    const order = shuffle(it.options.map((_, i) => i), r);
    return { kind: 'gram', clusterId, item, options: order.map((i) => it.options[i]), answer: order.indexOf(it.answer) };
  }
  return null;
}

export function answer(prev: DiagState, content: Content, item: DiagItem, res: DiagResponse): DiagState {
  const s: DiagState = structuredClone(prev);
  s.step++;
  if (item.kind === 'lex' && res.kind === 'lex') {
    const correct = res.choice !== 'dk' && res.choice === item.question.answer;
    if (item.verify) {
      const vs = (s.verifyStats[item.band] ??= { asked: 0, correct: 0 });
      vs.asked++;
      if (correct) vs.correct++;
      s.words[item.wordId] = correct ? 'known' : 'unknown';
      s.verifying = null;
      s.sweepQueue.shift();
    } else {
      s.words[item.wordId] = correct ? 'known' : 'unknown';
      const bs = (s.bandScores[s.band] ??= { correct: 0, total: 0 });
      bs.total++;
      if (correct) bs.correct++;
      s.batch.shift();
      if (!s.batch.length) afterProbe(s, content);
    }
  } else if (item.kind === 'sweep' && res.kind === 'sweep') {
    if (!res.know) {
      s.words[item.wordId] = 'self-unknown';
      s.sweepQueue.shift();
    } else if (rng(`${s.seed}:verify:${item.wordId}`)() < VERIFY_RATE) {
      s.verifying = item.wordId;
    } else {
      s.words[item.wordId] = 'self-known';
      s.sweepQueue.shift();
    }
  } else if (item.kind === 'gram' && res.kind === 'gram') {
    const scores = (s.grammarScores[item.clusterId] ??= []);
    scores.push(res.choice === item.answer);
    s.grammarQueue.shift();
    if (scores.length === 2 && scores.filter(Boolean).length === 1) {
      s.grammarQueue.unshift({ clusterId: item.clusterId, item: 2 });
    }
  }
  advancePhase(s, content);
  return s;
}

function afterProbe(s: DiagState, content: Content): void {
  const { correct, total } = s.bandScores[s.band];
  if (total <= PROBE_SIZE) {
    if (correct >= 5) s.outcomes[s.band] = 'passed';
    else if (correct <= 3) s.outcomes[s.band] = 'failed';
    else {
      s.outcomes[s.band] = 'uncertain';
      newProbe(s, content);
      return;
    }
  } else {
    s.outcomes[s.band] = correct >= 9 ? 'passed' : 'failed';
  }
  const next = nextBand(s);
  if (next === null) return;
  s.band = next;
  newProbe(s, content);
}

/** Choose the next band to probe, or null to stop (spec 1.2.1 step 3). */
export function nextBand(s: Pick<DiagState, 'outcomes' | 'probes' | 'band'>): number | null {
  if (s.probes >= MAX_PROBES) return null;
  for (let b = 1; b < BANDS; b++) {
    if (s.outcomes[b] === 'passed' && s.outcomes[b + 1] === 'failed') return null;
  }
  const untested = (b: number) => b >= 1 && b <= BANDS && s.outcomes[b] === 'untested';
  if (s.outcomes[s.band] === 'passed') {
    if (untested(s.band + 2)) return s.band + 2;
    if (untested(s.band + 1)) return s.band + 1;
    return null;
  }
  if (s.outcomes[s.band] === 'failed' && untested(s.band - 1)) return s.band - 1;
  return null;
}

/** Bands below a passed band with no failure in between are assumed known (step 4). */
export function inferOutcomes(outcomes: Record<number, BandOutcome>): Record<number, BandOutcome> {
  const out = { ...outcomes };
  for (let b = 1; b <= BANDS; b++) {
    if (out[b] !== 'untested') continue;
    for (let p = b + 1; p <= BANDS; p++) {
      if (outcomes[p] === 'failed') break;
      if (outcomes[p] === 'passed') { out[b] = 'assumed'; break; }
    }
  }
  return out;
}

function advancePhase(s: DiagState, content: Content): void {
  if (s.phase === 'walk' && !s.batch.length) {
    s.outcomes = inferOutcomes(s.outcomes);
    const r = rng(`${s.seed}:sweep`);
    const failed = content.foundation.filter((w) => s.outcomes[w.band ?? 0] === 'failed' && !(w.id in s.words));
    s.sweepQueue = shuffle(failed, r).map((w) => w.id);
    s.phase = 'sweep';
  }
  if (s.phase === 'sweep' && !s.sweepQueue.length && !s.verifying) {
    s.phase = 'grammar';
    s.grammarQueue = content.clusters.flatMap((c) => [{ clusterId: c.id, item: 0 }, { clusterId: c.id, item: 1 }]);
    // Interleave so the two items of a cluster aren't adjacent.
    const r = rng(`${s.seed}:gram`);
    const firsts = shuffle(s.grammarQueue.filter((q) => q.item === 0), r);
    const seconds = shuffle(s.grammarQueue.filter((q) => q.item === 1), r);
    s.grammarQueue = [...firsts, ...seconds];
  }
  if (s.phase === 'grammar' && !s.grammarQueue.length) s.phase = 'done';
}

export function progress(s: DiagState): { phase: DiagState['phase']; label: string } {
  const labels = { walk: 'Vocabulary check', sweep: 'Quick sweep', grammar: 'Grammar check', done: 'Done' };
  return { phase: s.phase, label: labels[s.phase] };
}

export interface DiagnosticSeeds {
  cards: FSRSCardState[];
  result: DiagnosticResult;
}

/** Turn a finished diagnostic into FSRS cards (spec 1.2.3). */
export function seedsFromDiagnostic(s: DiagState, content: Content, now: number): DiagnosticSeeds {
  const r = rng(`${s.seed}:seed`);
  const outcomes = inferOutcomes(s.outcomes);
  // Self-reports in a band whose verification accuracy < 80 % are discarded.
  const distrusted = new Set(
    Object.entries(s.verifyStats).filter(([, v]) => v.asked > 0 && v.correct / v.asked < 0.8).map(([b]) => Number(b)),
  );
  const cards: FSRSCardState[] = [];
  let known = 0;
  let bridge = 0;
  for (const w of content.foundation) {
    const band = w.band ?? 0;
    let res: WordResult | undefined = s.words[w.id];
    if (!res) res = outcomes[band] === 'passed' || outcomes[band] === 'assumed' ? 'known' : 'unknown';
    if (res === 'self-known' && distrusted.has(band)) res = 'unknown';
    if (res === 'known') {
      cards.push(seededReviewCard('word.recog', w.id, 'diagnostic', now, 30, randInt(10, 40, r)));
      known++;
    } else if (res === 'self-known') {
      cards.push(seededReviewCard('word.recog', w.id, 'diagnostic', now, 10, randInt(3, 12, r)));
      known++;
    } else {
      cards.push(newCard('word.recog', w.id, 'bridge', now, content.unitDemand(w.id, 1) * 10 + (BANDS + 1 - band)));
      bridge++;
    }
  }
  const grammarClusters: Record<string, 'known' | 'weak'> = {};
  for (const cl of content.clusters) {
    const sc = s.grammarScores[cl.id] ?? [];
    const ok = sc.length >= 2 && (sc.filter(Boolean).length === 2 || (sc.length === 3 && sc[2]));
    grammarClusters[cl.id] = ok ? 'known' : 'weak';
    cards.push(ok
      ? seededReviewCard('gram.form', cl.id, 'diagnostic', now, 30, randInt(10, 40, r))
      : newCard('gram.form', cl.id, 'bridge', now, 50));
  }
  return {
    cards,
    result: { id: 'latest', ts: now, bandOutcomes: outcomes, grammarClusters, knownWords: known, bridgeWords: bridge },
  };
}
