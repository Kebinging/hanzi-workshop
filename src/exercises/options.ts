import type { Content } from '../content';
import type { VocabItem } from '../content/types';
import { type Rng, shuffle } from '../lib/rng';

export interface MeaningOption {
  wordId: string;
  gloss: string;
  lookalike: boolean; // distractor chosen because it shares a look-alike character
}

export interface MeaningQuestion {
  options: MeaningOption[];
  answer: number;
}

/** Words containing a look-alike of any of `word`'s characters (deliberate distractors, spec 3.4). */
export function lookalikeWords(word: VocabItem, content: Content): VocabItem[] {
  const out: VocabItem[] = [];
  for (const c of word.chars) {
    const set = content.confusableSetOf(c);
    if (!set) continue;
    for (const other of set.chars) {
      if (other === c) continue;
      for (const w of content.wordsByChar.get(other) ?? []) {
        if (w.id !== word.id && w.chars.length === word.chars.length && !out.includes(w)) out.push(w);
      }
    }
  }
  return out;
}

const firstGloss = (w: VocabItem) => w.senses[0].gloss;

/**
 * Four English meanings for a Hanzi word: the answer + 3 distractors.
 * Distractors come from `candidates` (normally the exposure pool, G3), preferring the same part of
 * speech, plus at most one look-alike-character word.
 */
export function buildMeaningQuestion(
  word: VocabItem, candidates: VocabItem[], content: Content, r: Rng,
): MeaningQuestion {
  const pos = word.senses[0].pos;
  const answerGloss = firstGloss(word);
  const used = new Set([answerGloss]);
  const distractors: MeaningOption[] = [];

  const look = shuffle(lookalikeWords(word, content), r)[0];
  if (look && !used.has(firstGloss(look))) {
    distractors.push({ wordId: look.id, gloss: firstGloss(look), lookalike: true });
    used.add(firstGloss(look));
  }
  const others = candidates.filter((w) => w.id !== word.id);
  const samePos = shuffle(others.filter((w) => w.senses[0].pos === pos), r);
  const rest = shuffle(others.filter((w) => w.senses[0].pos !== pos), r);
  for (const w of [...samePos, ...rest]) {
    if (distractors.length >= 3) break;
    const g = firstGloss(w);
    if (used.has(g)) continue;
    used.add(g);
    distractors.push({ wordId: w.id, gloss: g, lookalike: false });
  }
  const options = shuffle([{ wordId: word.id, gloss: answerGloss, lookalike: false }, ...distractors], r);
  return { options, answer: options.findIndex((o) => o.wordId === word.id) };
}
