/** Exercise builders for M1: word recognition and look-alike character discrimination. */
import type { Content } from '../content';
import type { AnnotatedSentence, ConfusableSet, VocabItem } from '../content/types';
import type { FSRSCardState } from '../state/types';
import { sentencePasses } from '../gate/coverage';
import { type Rng, shuffle } from '../lib/rng';
import { buildMeaningQuestion, type MeaningQuestion } from './options';

export interface RecognitionExercise {
  kind: 'recognition';
  cardId: string;
  word: VocabItem;
  isNew: boolean;
  context?: AnnotatedSentence;
  question: MeaningQuestion;
  instanceId: string;
}

export interface LookalikeExercise {
  kind: 'lookalike';
  cardId: string;
  char: string;
  set: ConfusableSet;
  word: VocabItem;
  blankIndex: number;
  options: string[];
  answer: number;
  instanceId: string;
}

/** A context sentence that passes the coverage gate with the tested word exempt, avoiding recent instances. */
export function pickContext(
  word: VocabItem, card: FSRSCardState, content: Content, pool: ReadonlySet<string>, r: Rng,
): AnnotatedSentence | undefined {
  const exempt = new Set([word.id]);
  const ok = (content.sentencesByWord.get(word.id) ?? []).filter((s) => sentencePasses(s.tokens, pool, exempt));
  if (!ok.length) return undefined;
  const fresh = ok.filter((s) => !card.recentInstanceIds.includes(s.id));
  return shuffle(fresh.length ? fresh : ok, r)[0];
}

export function buildRecognition(
  card: FSRSCardState, content: Content, pool: ReadonlySet<string>, isNew: boolean, r: Rng,
): RecognitionExercise {
  const word = content.vocabById.get(card.itemId)!;
  const context = pickContext(word, card, content, pool, r);
  const poolWords = [...pool].map((id) => content.vocabById.get(id)!).filter(Boolean);
  const candidates = poolWords.length >= 30 ? poolWords : content.foundation;
  return {
    kind: 'recognition', cardId: card.id, word, isNew, context,
    question: buildMeaningQuestion(word, candidates, content, r),
    instanceId: context?.id ?? `iso:${word.id}`,
  };
}

export function buildLookalike(
  card: FSRSCardState, content: Content, pool: ReadonlySet<string>, r: Rng,
): LookalikeExercise | null {
  const char = card.itemId;
  const set = content.confusableSetOf(char);
  if (!set) return null;
  const words = content.wordsByChar.get(char) ?? [];
  const known = words.filter((w) => pool.has(w.id));
  const fresh = (known.length ? known : words).filter((w) => !card.recentInstanceIds.includes(`la:${w.id}`));
  const word = shuffle(fresh.length ? fresh : known.length ? known : words, r)[0];
  if (!word) return null;
  const options = shuffle(set.chars, r);
  return {
    kind: 'lookalike', cardId: card.id, char, set, word,
    blankIndex: word.chars.indexOf(char), options, answer: options.indexOf(char), instanceId: `la:${word.id}`,
  };
}

/** Error code for a wrong look-alike pick (spec 4.1). */
export function lookalikeErrorCode(set: ConfusableSet): string {
  if (set.kind === 'homophone') return 'ORTHO.HOMOPHONE';
  if (set.kind === 'antonym_form') return 'ORTHO.ANTONYM_FORM';
  return 'ORTHO.LOOKALIKE';
}
