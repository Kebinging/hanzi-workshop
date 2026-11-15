/** Grammar exercise builders (spec 3.1–3.4) plus the HSK 1–2 judgement drill. */
import type { Content } from '../content';
import type {
  AnnotatedSentence, ClozeItem, GrammarCluster, GrammarPattern, MinimalPairItem, SlotCode, TransformItem,
} from '../content/types';
import type { FSRSCardState } from '../state/types';
import { sentencePasses } from '../gate/coverage';
import { type Rng, shuffle } from '../lib/rng';
import { decoyTile, finalPunct, tilesOf, type Tile } from './grade';

/** Free rail (no slot frame) once the pattern's form is this stable (spec 3.1). */
export const FREE_RAIL_DAYS = 30;

export interface SlotExercise {
  kind: 'slot';
  cardId: string;
  pattern: GrammarPattern;
  sentence: AnnotatedSentence;
  canonical: Tile[];
  bank: Tile[];          // shuffled tiles incl. decoys
  punct: string;
  freeRail: boolean;
  instanceId: string;
}

export interface TransformExercise extends Omit<SlotExercise, 'kind'> {
  kind: 'transform';
  item: TransformItem;
}

export interface PairExercise {
  kind: 'pair';
  cardId: string;
  pattern: GrammarPattern;
  item: MinimalPairItem;
  options: MinimalPairItem['options'];
  instanceId: string;
}

export interface ClozeExercise {
  kind: 'cloze';
  cardId: string;
  pattern: GrammarPattern;
  item: ClozeItem;
  options: ClozeItem['options'];
  instanceId: string;
}

export interface JudgementExercise {
  kind: 'judgement';
  cardId: string;
  cluster: GrammarCluster;
  options: string[];
  answer: number;
  why: string;
  instanceId: string;
}

export type GrammarExercise = SlotExercise | TransformExercise | PairExercise | ClozeExercise | JudgementExercise;

const passes = (s: AnnotatedSentence, pool: ReadonlySet<string>) => sentencePasses(s.tokens, pool);

function pickFresh<T extends { id: string }>(items: T[], card: FSRSCardState, r: Rng): T | undefined {
  const fresh = items.filter((x) => !card.recentInstanceIds.includes(x.id));
  return shuffle(fresh.length ? fresh : items, r)[0];
}

/** Sentences of a pattern usable right now: authored first, generated only when authored ones are exhausted. */
export function playableSentences(p: GrammarPattern, pool: ReadonlySet<string>, card?: FSRSCardState): AnnotatedSentence[] {
  const authored = [...p.examples, ...p.instanceBank].filter((s) => passes(s, pool));
  const fresh = card ? authored.filter((s) => !card.recentInstanceIds.includes(s.id)) : authored;
  if (fresh.length) return authored;
  return [...authored, ...(p.generated ?? []).filter((s) => passes(s, pool))];
}

function decoySlot(canonical: Tile[], t: string): SlotCode {
  if (['了', '过', '着'].includes(t)) return 'ASP';
  return canonical.find((x) => x.slot === 'ADV')?.slot ?? 'ADV';
}

function railFor(sentence: AnnotatedSentence, decoys: GrammarPattern['decoys'], r: Rng) {
  const canonical = tilesOf(sentence);
  const present = new Set(sentence.tokens.map((t) => t.t));
  const usable = shuffle(decoys.filter((d) => !present.has(d.t)), r).slice(0, 1);
  const bank = shuffle([...canonical, ...usable.map((d, i) => decoyTile(d, i, decoySlot(canonical, d.t)))], r);
  return { canonical, bank, punct: finalPunct(sentence) };
}

export function buildSlot(card: FSRSCardState, p: GrammarPattern, pool: ReadonlySet<string>, r: Rng): SlotExercise | null {
  const sentence = pickFresh(playableSentences(p, pool, card), card, r);
  if (!sentence) return null;
  return {
    kind: 'slot', cardId: card.id, pattern: p, sentence, ...railFor(sentence, p.decoys, r),
    freeRail: card.state === 2 && card.stability >= FREE_RAIL_DAYS, instanceId: sentence.id,
  };
}

export function playableTransforms(content: Content, p: GrammarPattern, pool: ReadonlySet<string>): TransformItem[] {
  return content.bundle.transforms.filter((t) => t.patternId === p.id && passes(t.answer, pool) && t.inputs.every((i) => passes(i, pool)));
}

export function buildTransform(card: FSRSCardState, p: GrammarPattern, content: Content, pool: ReadonlySet<string>, r: Rng): TransformExercise | null {
  const item = pickFresh(playableTransforms(content, p, pool), card, r);
  if (!item) return null;
  return {
    kind: 'transform', cardId: card.id, pattern: p, item, sentence: item.answer,
    ...railFor(item.answer, item.decoys.length ? item.decoys : p.decoys, r),
    freeRail: card.state === 2 && card.stability >= FREE_RAIL_DAYS, instanceId: item.id,
  };
}

export function playablePairs(content: Content, p: GrammarPattern, pool: ReadonlySet<string>): MinimalPairItem[] {
  return content.bundle.pairs.filter((x) => x.patternIds.includes(p.id) && passes(x.context, pool));
}

export function buildPair(card: FSRSCardState, p: GrammarPattern, content: Content, pool: ReadonlySet<string>, r: Rng): PairExercise | null {
  const item = pickFresh(playablePairs(content, p, pool), card, r);
  if (!item) return null;
  return { kind: 'pair', cardId: card.id, pattern: p, item, options: shuffle(item.options, r), instanceId: item.id };
}

export function playableCloze(content: Content, p: GrammarPattern, pool: ReadonlySet<string>): ClozeItem[] {
  return content.bundle.cloze.filter((x) => x.patternId === p.id && passes(x.sentence, pool));
}

export function buildCloze(card: FSRSCardState, p: GrammarPattern, content: Content, pool: ReadonlySet<string>, r: Rng): ClozeExercise | null {
  const item = pickFresh(playableCloze(content, p, pool), card, r);
  if (!item) return null;
  return { kind: 'cloze', cardId: card.id, pattern: p, item, options: shuffle(item.options, r), instanceId: item.id };
}

export function buildJudgement(card: FSRSCardState, cluster: GrammarCluster, r: Rng): JudgementExercise {
  const idx = card.reps % cluster.items.length;
  const it = cluster.items[idx];
  const order = shuffle(it.options.map((_, i) => i), r);
  return {
    kind: 'judgement', cardId: card.id, cluster, options: order.map((i) => it.options[i]),
    answer: order.indexOf(it.answer), why: it.why, instanceId: `${cluster.id}:${idx}`,
  };
}

/** Does this pattern have a gram.use exercise at all? */
export function hasUseItems(content: Content, patternId: string): boolean {
  return content.bundle.pairs.some((x) => x.patternIds.includes(patternId)) || content.bundle.cloze.some((x) => x.patternId === patternId);
}

/** Pick and build the exercise for a grammar card (gram.form: slot/transform; gram.use: pair/cloze). */
export function buildGrammar(card: FSRSCardState, content: Content, pool: ReadonlySet<string>, r: Rng): GrammarExercise | null {
  if (card.itemId.startsWith('G12-')) {
    const cl = content.clusters.find((c) => c.id === card.itemId);
    return cl ? buildJudgement(card, cl, r) : null;
  }
  const p = content.grammarById.get(card.itemId);
  if (!p) return null;
  if (card.facet === 'gram.form') {
    const useTransform = card.reps % 2 === 1 && card.state !== 0;
    return (useTransform ? buildTransform(card, p, content, pool, r) : null) ?? buildSlot(card, p, pool, r) ?? buildTransform(card, p, content, pool, r);
  }
  const pairFirst = card.reps % 2 === 0;
  return pairFirst
    ? buildPair(card, p, content, pool, r) ?? buildCloze(card, p, content, pool, r)
    : buildCloze(card, p, content, pool, r) ?? buildPair(card, p, content, pool, r);
}

/** True when a grammar card can be exercised with the current exposure pool (gate G4). */
export function grammarPlayable(card: FSRSCardState, content: Content, pool: ReadonlySet<string>): boolean {
  if (card.itemId.startsWith('G12-')) return true;
  const p = content.grammarById.get(card.itemId);
  if (!p) return false;
  if (card.facet === 'gram.form') return playableSentences(p, pool).length > 0 || playableTransforms(content, p, pool).length > 0;
  return playablePairs(content, p, pool).length > 0 || playableCloze(content, p, pool).length > 0;
}
