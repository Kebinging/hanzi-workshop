import type { OrderConstraint, SlotCode, TransformSubtype } from '../../src/content/types';

/**
 * Compact authoring format.
 *
 * Sentences: tokens separated by spaces. Token prefixes:
 *   *x*  target token      %x  number (exempt from coverage)
 *   #x=pīnyīn=gloss  name  ~x=pīnyīn=gloss  pre-glossed off-syllabus word
 *   x@id explicit vocab id (homographs)
 * Slot suffix: x/SLOT starts a new tile in that slot; tokens without a suffix join the
 * previous tile. Mid-sentence "，" is automatically its own tile (slot P); final 。？！ is fixed.
 */
export type Distractor = [t: string, code: string, why: string];

export interface SentenceExtras {
  alts?: string[];        // other accepted orders, plain text without spaces/punctuation
  x?: Distractor[];       // extra cloze distractors valid only for this sentence
}

export type SentenceSrc = [zh: string, en: string] | [zh: string, en: string, extras: SentenceExtras];

export interface TransformSrc {
  subtype: TransformSubtype;
  inputs: string[];
  chip: string;
  answer: string;
  en: string;
  decoys?: Distractor[];
}

export interface PatternSource {
  id: string;
  unit: number;
  title: string;
  titleZh: string;
  summary: string;
  explanationMd: string;
  formula: SlotCode[];
  constraints: OrderConstraint[];
  requires: string[];
  contrasts?: string[];
  errorCodes: string[];
  examples: SentenceSrc[];
  instances: SentenceSrc[];
  /** Wrong tiles offered in Slot Builder (only those not already in the sentence are used). */
  decoys?: Distractor[];
  /** Cloze: which target tokens may be blanked, and distractors wrong in every such sentence. */
  cloze?: { blank: string[]; distractors: Distractor[] };
  transforms?: TransformSrc[];
}

/** Minimal-pair source: "___" marks each gap; option parts are joined with "|". */
export interface PairSrc {
  contrast: string;
  patternIds: string[];
  items: { context: string; en: string; options: [parts: string, correct: boolean, why: string, code?: string][] }[];
}
