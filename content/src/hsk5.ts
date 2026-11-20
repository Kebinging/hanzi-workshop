import type { PatternSource, PassageSrc, PairSrc, SentenceSrc } from './authoring';
import { patternsU25 } from './grammar-u25';
import { patternsU26 } from './grammar-u26';
import { patternsU27 } from './grammar-u27';
import { patternsU28 } from './grammar-u28';
import { patternsU29 } from './grammar-u29';
import { patternsU30 } from './grammar-u30';
import { patternsU31 } from './grammar-u31';
import { patternsU32 } from './grammar-u32';
import { patternsU33 } from './grammar-u33';
import { patternsU34 } from './grammar-u34';
import { patternsU35 } from './grammar-u35';
import { patternsU36 } from './grammar-u36';
import { passagesU29to32 } from './passages-u29-32';
import { passagesU33to36 } from './passages-u33-36';
import { passagesU25to28 } from './passages-u25-28';
import { pairsU25to28 } from './pairs-u25-28';
import { examplesU25to28 } from './examples-u25-28';
import { pairsU29to32 } from './pairs-u29-32';
import { examplesU29to32 } from './examples-u29-32';
import { pairsU33to36 } from './pairs-u33-36';
import { examplesU33to36 } from './examples-u33-36';

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
  patterns: [...patternsU25, ...patternsU26, ...patternsU27, ...patternsU28, ...patternsU29, ...patternsU30, ...patternsU31, ...patternsU32, ...patternsU33, ...patternsU34, ...patternsU35, ...patternsU36],
  extras: {},
  examples: { ...examplesU25to28, ...examplesU29to32, ...examplesU33to36 },
  pairs: [...pairsU25to28, ...pairsU29to32, ...pairsU33to36],
  passages: [...passagesU25to28, ...passagesU29to32, ...passagesU33to36],
};
