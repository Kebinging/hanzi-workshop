import type { PatternSource, PassageSrc, PairSrc, SentenceSrc } from './authoring';
import { patternsU25 } from './grammar-u25';
import { patternsU26 } from './grammar-u26';
import { patternsU27 } from './grammar-u27';
import { patternsU28 } from './grammar-u28';
import { passagesU25to28 } from './passages-u25-28';
import { pairsU25to28 } from './pairs-u25-28';
import { examplesU25to28 } from './examples-u25-28';

// HSK 5 course (spec 2.5): units 25–36. Each unit's files are registered here.

export const hsk5: {
  patterns: PatternSource[];
  /** Extra practice sentences by pattern id. */
  extras: Record<string, SentenceSrc[]>;
  /** Vocabulary example sentences by unit. */
  examples: Record<number, [string, string][]>;
  pairs: PairSrc[];
  passages: PassageSrc[];
} = {
  patterns: [...patternsU25, ...patternsU26, ...patternsU27, ...patternsU28],
  extras: {},
  examples: { ...examplesU25to28 },
  pairs: [...pairsU25to28],
  passages: [...passagesU25to28],
};
