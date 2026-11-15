/**
 * Tiles and the constraint-based order grader (spec 3.1).
 * A sentence's tokens are grouped into tiles by their authored `chunk`. The learner's tile order
 * is accepted if it reproduces the canonical text, an authored alternative, or a canonical order
 * with an adjacent Subject/Time swap. Otherwise every canonical tile pair the learner inverted is
 * mapped to an error code through the slot rules below.
 */
import type { AnnotatedSentence, Decoy, GrammarPattern, SlotCode, Token } from '../content/types';

export interface Tile {
  id: string;
  text: string;
  slot: SlotCode;
  tokens: Token[];
  decoy?: Decoy;
}

export function tilesOf(s: AnnotatedSentence): Tile[] {
  const out: Tile[] = [];
  for (const t of s.tokens) {
    if (t.chunk === undefined) continue;
    let tile = out.find((x) => x.id === `t${t.chunk}`);
    if (!tile) {
      tile = { id: `t${t.chunk}`, text: '', slot: t.slot ?? 'V', tokens: [] };
      out.push(tile);
    }
    tile.text += t.t;
    tile.tokens.push(t);
  }
  return out;
}

export function decoyTile(d: Decoy, i: number, slot: SlotCode): Tile {
  return { id: `d${i}`, text: d.t, slot, tokens: [{ t: d.t, ref: d.ref, kind: 'word' }], decoy: d };
}

/** Trailing sentence punctuation (。？！), shown fixed at the end of the rail. */
export function finalPunct(s: AnnotatedSentence): string {
  const last = s.tokens[s.tokens.length - 1];
  return last && last.kind === 'punct' && last.chunk === undefined ? last.t : '';
}

const ASPECT_CODE: Record<string, string> = { 了: 'ASPECT.LE_MISUSE', 过: 'ASPECT.GUO_MISUSE', 着: 'ASPECT.ZHE_MISUSE' };

/** "A>B": a canonical tile in slot A preceding one in slot B, inverted by the learner. */
const RULES: Record<string, string> = {
  'T>V': 'ORDER.TIME_AFTER_VERB', 'T>O': 'ORDER.TIME_AFTER_VERB', 'T>C': 'ORDER.TIME_AFTER_VERB',
  'PP>V': 'ORDER.PLACE_AFTER_VERB', 'PP>O': 'ORDER.PLACE_AFTER_VERB',
  'S>ADV': 'ORDER.ADVERB_POSITION', 'ADV>V': 'ORDER.ADVERB_POSITION', 'ADV>PP': 'ORDER.ADVERB_POSITION',
  'ADV>MOD': 'ORDER.ADVERB_POSITION', 'T>ADV': 'ORDER.ADVERB_POSITION', 'ADV>O': 'ORDER.ADVERB_POSITION',
  'ADV>ADV': 'ORDER.MULTI_ADVERB',
  'S>MOD': 'ORDER.MODAL_POSITION', 'MOD>V': 'ORDER.MODAL_POSITION', 'MOD>PP': 'ORDER.MODAL_POSITION',
  'S>V': 'ORDER.SUBJECT', 'TOP>S': 'ORDER.TOPIC', 'TOP>V': 'ORDER.TOPIC',
  'V>O': 'ORDER.OBJECT',
  'V>C': 'COMP.PLACEMENT', 'C>O': 'COMP.PLACEMENT', 'O>C': 'COMP.PLACEMENT',
  'S>PP': 'ORDER.COMPARISON',
};

export interface OrderGrade {
  correct: boolean;
  /** Codes, most specific first (decoys, pattern constraints, slot rules). */
  codes: string[];
  /** Tile ids involved in each violation, for highlighting. */
  marked: string[];
}

const textOf = (tiles: Tile[]) => tiles.map((t) => t.text).join('');

/** Accepted surface strings for a canonical tile order. */
export function acceptedTexts(canonical: Tile[], alts: string[] = []): Set<string> {
  const out = new Set<string>([textOf(canonical), ...alts]);
  for (let i = 0; i + 1 < canonical.length; i++) {
    const a = canonical[i].slot;
    const b = canonical[i + 1].slot;
    if ((a === 'S' && b === 'T') || (a === 'T' && b === 'S')) {
      const swapped = [...canonical];
      [swapped[i], swapped[i + 1]] = [swapped[i + 1], swapped[i]];
      out.add(textOf(swapped));
    }
  }
  return out;
}

export function gradeOrder(canonical: Tile[], answer: Tile[], pattern?: GrammarPattern, alts: string[] = []): OrderGrade {
  if (acceptedTexts(canonical, alts).has(textOf(answer))) return { correct: true, codes: [], marked: [] };

  const codes: string[] = [];
  const marked = new Set<string>();
  const add = (code: string, ...ids: string[]) => {
    if (!codes.includes(code)) codes.push(code);
    ids.forEach((i) => marked.add(i));
  };

  // 1. Decoys used.
  for (const t of answer) if (t.decoy) add(t.decoy.code, t.id);

  // 2. Pattern-level constraints.
  const pos = new Map(answer.map((t, i) => [t.id, i]));
  const ansText = textOf(answer);
  for (const c of pattern?.constraints ?? []) {
    if (c.kind === 'pair') {
      const ia = ansText.indexOf(c.a);
      const ib = ansText.indexOf(c.b);
      if (ia >= 0 && ib >= 0 && ib < ia) {
        add(c.code, ...answer.filter((t) => t.text.includes(c.a) || t.text.includes(c.b)).map((t) => t.id));
      }
    } else if (c.kind === 'before') {
      for (const x of canonical) for (const y of canonical) {
        if (x.slot !== c.a || y.slot !== c.b || x === y) continue;
        const px = pos.get(x.id);
        const py = pos.get(y.id);
        if (px !== undefined && py !== undefined && py < px && canonical.indexOf(x) < canonical.indexOf(y)) add(c.code, x.id, y.id);
      }
    }
  }

  // 3. Slot rules over every inverted canonical pair.
  for (let i = 0; i < canonical.length; i++) {
    for (let j = i + 1; j < canonical.length; j++) {
      const a = canonical[i];
      const b = canonical[j];
      const pa = pos.get(a.id);
      const pb = pos.get(b.id);
      if (pa === undefined || pb === undefined || pb > pa) continue;
      if (a.slot === 'P' || b.slot === 'P') continue;
      let code: string | undefined;
      if (b.slot === 'ASP' || a.slot === 'ASP') code = ASPECT_CODE[(a.slot === 'ASP' ? a : b).text];
      else if (b.slot === 'SF') code = b.text === '了' ? 'ASPECT.LE_MISUSE' : 'ORDER.GENERAL';
      else code = RULES[`${a.slot}>${b.slot}`];
      add(code ?? 'ORDER.GENERAL', a.id, b.id);
    }
  }

  // 4. Aspect particle no longer directly after its verb.
  for (let i = 0; i + 1 < canonical.length; i++) {
    const v = canonical[i];
    const asp = canonical[i + 1];
    if (v.slot !== 'V' || asp.slot !== 'ASP') continue;
    const pv = pos.get(v.id);
    const pa = pos.get(asp.id);
    if (pv !== undefined && pa !== undefined && pa !== pv + 1) add(ASPECT_CODE[asp.text] ?? 'ASPECT.LE_MISUSE', v.id, asp.id);
  }

  if (!codes.length) add('ORDER.GENERAL');
  return { correct: false, codes, marked: [...marked] };
}
