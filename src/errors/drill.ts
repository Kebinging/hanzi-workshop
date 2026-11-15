/**
 * Remedial micro-drills (spec 4.4) and "try a twin" (spec 4.2).
 * A drill is 5 gated items targeting one error code, using different sentences from the ones
 * the learner got wrong, mixing at least two exercise types when the content allows.
 */
import type { Content } from '../content';
import type { FSRSCardState } from '../state/types';
import { sentencePasses } from '../gate/coverage';
import { newCard } from '../srs/fsrs';
import { type Rng, shuffle } from '../lib/rng';
import { buildLookalike, type LookalikeExercise } from '../exercises/build';
import {
  buildCloze, buildPair, buildSlot, buildTransform, playableSentences,
  type ClozeExercise, type GrammarExercise, type PairExercise, type SlotExercise,
} from '../exercises/grammar';
import { decoyTile, finalPunct, tilesOf } from '../exercises/grade';

export const DRILL_SIZE = 5;
export type DrillExercise = GrammarExercise | LookalikeExercise;

const cardFor = (cards: Map<string, FSRSCardState>, facet: FSRSCardState['facet'], itemId: string, now: number) =>
  cards.get(`${facet}:${itemId}`) ?? newCard(facet, itemId, 'remedial', now);

export function buildDrill(
  code: string, involvedItemIds: string[], avoidInstanceIds: Set<string>, content: Content,
  pool: ReadonlySet<string>, cards: Map<string, FSRSCardState>, r: Rng, now = Date.now(),
): DrillExercise[] {
  // Orthography: look-alike drills for the characters involved.
  if (code.startsWith('ORTHO.')) {
    const chars = [...new Set(involvedItemIds.filter((id) => [...id].length === 1 && content.confusableSetOf(id)))];
    const out: LookalikeExercise[] = [];
    for (let i = 0; i < DRILL_SIZE * 3 && out.length < DRILL_SIZE && chars.length; i++) {
      const ex = buildLookalike(cardFor(cards, 'char.form', chars[i % chars.length], now), content, pool, r);
      if (ex && !out.some((o) => o.instanceId === ex.instanceId && o.char === ex.char)) out.push(ex);
    }
    return out;
  }

  // Grammar: sentences / items whose rules or distractors carry this code.
  const fresh = <T extends { id: string }>(xs: T[]) => xs.filter((x) => !avoidInstanceIds.has(x.id));
  const pairs: PairExercise[] = fresh(content.bundle.pairs.filter((p) => p.options.some((o) => o.code === code) && sentencePasses(p.context.tokens, pool)))
    .map((item) => {
      const pattern = content.grammarById.get(item.patternIds[0])!;
      return { kind: 'pair' as const, cardId: `gram.use:${pattern.id}`, pattern, item, options: shuffle(item.options, r), instanceId: item.id };
    });
  const cloze: ClozeExercise[] = fresh(content.bundle.cloze.filter((c) => c.options.some((o) => o.code === code) && sentencePasses(c.sentence.tokens, pool)))
    .map((item) => ({
      kind: 'cloze' as const, cardId: `gram.use:${item.patternId}`, pattern: content.grammarById.get(item.patternId)!,
      item, options: shuffle(item.options, r), instanceId: item.id,
    }));
  const patterns = content.bundle.grammar.filter((g) =>
    g.errorCodes.includes(code) || g.decoys.some((d) => d.code === code) || g.constraints.some((c) => c.code === code));
  const slots: SlotExercise[] = [];
  for (const p of patterns) {
    const decoys = p.decoys.filter((d) => d.code === code);
    for (const s of fresh(playableSentences(p, pool))) {
      const canonical = tilesOf(s);
      const present = new Set(s.tokens.map((t) => t.t));
      const d = decoys.find((x) => !present.has(x.t));
      const bank = shuffle([...canonical, ...(d ? [decoyTile(d, 0, canonical.find((t) => t.slot === 'ADV')?.slot ?? 'ADV')] : [])], r);
      slots.push({
        kind: 'slot', cardId: `gram.form:${p.id}`, pattern: p, sentence: s, canonical, bank,
        punct: finalPunct(s), freeRail: false, instanceId: s.id,
      });
    }
  }
  // Mix: up to 2 slot items, then fill from pairs/cloze; ensure >= 2 types when possible.
  const choice = [...shuffle(slots, r).slice(0, 2), ...shuffle([...pairs, ...cloze], r)];
  const out: DrillExercise[] = [];
  for (const ex of choice) {
    if (out.length >= DRILL_SIZE) break;
    out.push(ex);
  }
  for (const ex of shuffle(slots, r).slice(2)) {
    if (out.length >= DRILL_SIZE) break;
    out.push(ex);
  }
  return shuffle(out, r);
}

/** Another instance of the same exercise type for the same pattern, not FSRS-rated (spec 4.2). */
export function buildTwin(
  ex: GrammarExercise, content: Content, pool: ReadonlySet<string>, cards: Map<string, FSRSCardState>, r: Rng, now = Date.now(),
): GrammarExercise | null {
  if (ex.kind === 'judgement') return null;
  const card = { ...cardFor(cards, ex.kind === 'pair' || ex.kind === 'cloze' ? 'gram.use' : 'gram.form', ex.pattern.id, now) };
  card.recentInstanceIds = [ex.instanceId, ...card.recentInstanceIds];
  const build = {
    slot: () => buildSlot(card, ex.pattern, pool, r),
    transform: () => buildTransform(card, ex.pattern, content, pool, r) ?? buildSlot(card, ex.pattern, pool, r),
    pair: () => buildPair(card, ex.pattern, content, pool, r) ?? buildCloze(card, ex.pattern, content, pool, r),
    cloze: () => buildCloze(card, ex.pattern, content, pool, r) ?? buildPair(card, ex.pattern, content, pool, r),
  }[ex.kind];
  const twin = build();
  return twin && twin.instanceId !== ex.instanceId ? twin : null;
}
