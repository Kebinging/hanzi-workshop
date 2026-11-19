import type { PatternSource, PassageSrc, PairSrc, SentenceSrc } from './authoring';
import { patternsU13 } from './grammar-u13';
import { patternsU14 } from './grammar-u14';
import { patternsU15 } from './grammar-u15';
import { patternsU16 } from './grammar-u16';
import { passagesU13to16 } from './passages-u13-16';
import { pairsU13to16 } from './pairs-u13-16';
import { examplesU13to16 } from './examples-u13-16';

// HSK 4 course (spec 2.4): units 13–24. Each unit's files are registered here.

export const hsk4: {
  patterns: PatternSource[];
  /** Extra practice sentences by pattern id. */
  extras: Record<string, SentenceSrc[]>;
  /** Vocabulary example sentences by unit. */
  examples: Record<number, [string, string][]>;
  pairs: PairSrc[];
  passages: PassageSrc[];
} = {
  patterns: [...patternsU13, ...patternsU14, ...patternsU15, ...patternsU16],
  extras: {},
  examples: { ...examplesU13to16 },
  pairs: [...pairsU13to16],
  passages: [...passagesU13to16],
};
