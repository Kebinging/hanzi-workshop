import bundleJson from '../../content/dist/bundle.json';
import type {
  AnnotatedSentence, CharItem, ConfusableSet, ContentBundle, GrammarCluster, GrammarPattern, VocabItem,
} from './types';

/** In-memory indices over the static content bundle. */
export class Content {
  readonly bundle: ContentBundle;
  readonly vocab: VocabItem[];
  readonly vocabById = new Map<string, VocabItem>();
  readonly charById = new Map<string, CharItem>();
  readonly grammarById = new Map<string, GrammarPattern>();
  readonly clusters: GrammarCluster[];
  readonly confusables: ConfusableSet[];
  readonly confusableById = new Map<string, ConfusableSet>();
  readonly sentences: AnnotatedSentence[] = [];
  readonly sentencesByWord = new Map<string, AnnotatedSentence[]>();
  readonly wordsByChar = new Map<string, VocabItem[]>();

  constructor(bundle: ContentBundle) {
    this.bundle = bundle;
    this.vocab = bundle.vocab;
    this.clusters = bundle.clusters;
    this.confusables = bundle.confusables;
    for (const w of bundle.vocab) {
      this.vocabById.set(w.id, w);
      for (const c of new Set(w.chars)) this.wordsByChar.set(c, [...(this.wordsByChar.get(c) ?? []), w]);
    }
    for (const c of bundle.chars) this.charById.set(c.id, c);
    for (const s of bundle.confusables) this.confusableById.set(s.id, s);
    for (const g of bundle.grammar) {
      this.grammarById.set(g.id, g);
      this.sentences.push(...g.examples, ...g.instanceBank);
    }
    this.sentences.push(...(bundle.vocabExamples ?? []));
    for (const s of this.sentences) {
      for (const t of s.tokens) {
        if (!t.ref) continue;
        const list = this.sentencesByWord.get(t.ref) ?? [];
        if (!list.includes(s)) list.push(s);
        this.sentencesByWord.set(t.ref, list);
      }
    }
  }

  get version(): string { return this.bundle.syllabus.version; }

  /** HSK 1–2 foundation pool. */
  get foundation(): VocabItem[] { return this.vocab.filter((w) => w.hsk <= 2); }

  unitWords(unit: number): VocabItem[] { return this.vocab.filter((w) => w.unit === unit); }

  unitPatterns(unit: number): GrammarPattern[] { return this.bundle.grammar.filter((g) => g.unit === unit); }

  bandWords(band: number): VocabItem[] { return this.vocab.filter((w) => w.band === band); }

  /** How many sentences of a given unit use this word — bridge priority (spec 1.2.4). */
  unitDemand(wordId: string, unit: number): number {
    return (this.sentencesByWord.get(wordId) ?? []).filter((s) =>
      s.patternIds.some((p) => this.grammarById.get(p)?.unit === unit)).length;
  }

  confusableSetOf(char: string): ConfusableSet | undefined {
    const id = this.charById.get(char)?.confusableSet;
    return id ? this.confusableById.get(id) : this.confusables.find((s) => s.chars.includes(char));
  }
}

export const content = new Content(bundleJson as unknown as ContentBundle);
