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

/**
 * Reading passage source (spec 3.5). Paragraph tokens use the sentence syntax plus X-ray markers:
 *   {sub {topic {comp {time {place {mod {ba {bei  open a chunk, } closes the latest one
 *   x^1  marks a connective as half of pair 1 (both halves get the same colour)
 * Clause boundaries are derived from punctuation automatically.
 */
export interface PassageSrc {
  id: string;
  unit: number;
  review?: boolean;
  title: string;
  titleEn: string;
  genre: 'diary' | 'chat' | 'notice' | 'story' | 'dialogue' | 'explanation';
  patternIds: string[];
  paragraphs: string[];
  questions: {
    type: 'referent' | 'inference' | 'sequence' | 'truth' | 'function' | 'gist';
    stem: string;
    options: string[];
    answer: number | number[];
    why: string;
    evidence: string[];   // text spans (no spaces) to highlight in the passage
  }[];
}

/** Minimal-pair source: "___" marks each gap; option parts are joined with "|". */
export interface PairSrc {
  contrast: string;
  patternIds: string[];
  items: { context: string; en: string; options: [parts: string, correct: boolean, why: string, code?: string][] }[];
}
