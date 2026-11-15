// Static content types (read-only bundles). Mirrors docs/SPEC.md §5.3.

export type HskLevel = 1 | 2 | 3 | 4 | 5;
export type POS =
  | 'n' | 'v' | 'adj' | 'adv' | 'prep' | 'conj' | 'mw' | 'pron'
  | 'num' | 'part' | 'aux' | 'loc' | 'intj' | 'vsep';
export type SlotCode =
  | 'TOP' | 'S' | 'T' | 'ADV' | 'MOD' | 'PP' | 'BA'
  | 'V' | 'ASP' | 'C' | 'O' | 'SF' | 'CONJ1' | 'CONJ2';

export interface Sense {
  id: string;
  gloss: string;
  pos: POS;
  note?: string;
}

export interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;      // tone marks, syllables space-separated
  pinyinNum: string;   // "fang4 jia4"; neutral tone = 5
  hsk: HskLevel;
  unit?: number;
  band?: number;       // 1..10, HSK 1–2 diagnostic band
  senses: Sense[];
  chars: string[];
  separable?: { splitAfter: number };
  semantic: string[];
  confusableWith?: string[];
  provisional?: boolean;
}

export interface CharItem {
  id: string;          // the character itself
  pinyin: string[];
  hsk: HskLevel;
  radical: { char: string; meaning: string };
  decomposition: string; // IDS, or the char itself if atomic
  components: { char: string; meaning?: string }[];
  firstWord: string;
  confusableSet?: string;
  diffHint?: string;
}

export type OrderConstraint =
  | { kind: 'before'; a: SlotCode; b: SlotCode; code: string }
  | { kind: 'adjacent'; a: SlotCode; b: SlotCode; code: string }
  | { kind: 'required'; slot: SlotCode; code: string }
  | { kind: 'forbidden'; slot: SlotCode; when?: string; code: string }
  | { kind: 'pair'; a: string; b: string; code: string };

export type TokenKind = 'word' | 'target' | 'name' | 'num' | 'punct' | 'gloss';

export interface Token {
  t: string;
  ref?: string;
  kind: TokenKind;
  slot?: SlotCode;
  chunk?: number;
  glossEn?: string;    // for kind 'gloss' / 'name'
  pinyin?: string;     // for kind 'name' / 'gloss'
}

export interface ChunkAnnotation {
  start: number;
  end: number;
  type: 'clause' | 'subordinate' | 'topic' | 'comment' | 'complement'
    | 'ba' | 'bei' | 'time' | 'place' | 'modifier' | 'pair';
  pairId?: string;
  patternId?: string;
}

export interface AnnotatedSentence {
  id: string;
  tokens: Token[];
  en: string;
  zhParaphrase?: string;
  chunks?: ChunkAnnotation[];
  patternIds: string[];
  source: 'authored' | 'generated';
}

export interface GrammarPattern {
  id: string;
  hsk: HskLevel;
  unit?: number;
  title: string;
  titleZh: string;
  summary: string;
  explanationMd: string;
  formula: SlotCode[];
  constraints: OrderConstraint[];
  requires: string[];
  contrasts?: string[];
  errorCodes: string[];
  examples: AnnotatedSentence[];
  instanceBank: AnnotatedSentence[];
  provisional?: boolean;
}

/** HSK 1–2 grammar diagnostic cluster with sentence-judgement items (M1 format). */
export interface GrammarCluster {
  id: string;          // "G12-01"
  title: string;
  summary: string;
  items: { options: string[]; answer: number; why: string }[];
}

export interface ConfusableSet {
  id: string;
  kind: 'lookalike' | 'homophone' | 'antonym_form';
  chars: string[];
  hints: Record<string, string>;
}

export interface UnitInfo {
  unit: number;
  hsk: HskLevel;
  title: string;
  titleZh: string;
  theme: string;
  patternIds: string[];
  available: boolean;  // content shipped in this build
}

export interface Syllabus {
  version: string;
  levels: { level: HskLevel; cumulativeWords: number; cumulativeChars: number; grammarPoints: number }[];
  units: UnitInfo[];
}

export interface ContentBundle {
  syllabus: Syllabus;
  vocab: VocabItem[];
  chars: CharItem[];
  grammar: GrammarPattern[];
  vocabExamples: AnnotatedSentence[];
  clusters: GrammarCluster[];
  confusables: ConfusableSet[];
}
