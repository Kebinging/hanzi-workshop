import type { PatternSource, PassageSrc, PairSrc, SentenceSrc } from './authoring';
import { patternsU13 } from './grammar-u13';
import { patternsU14 } from './grammar-u14';
import { patternsU15 } from './grammar-u15';
import { patternsU16 } from './grammar-u16';
import { patternsU17 } from './grammar-u17';
import { patternsU18 } from './grammar-u18';
import { patternsU19 } from './grammar-u19';
import { patternsU20 } from './grammar-u20';
import { patternsU21 } from './grammar-u21';
import { patternsU22 } from './grammar-u22';
import { patternsU23 } from './grammar-u23';
import { patternsU24 } from './grammar-u24';
import { passagesU13to16 } from './passages-u13-16';
import { pairsU13to16 } from './pairs-u13-16';
import { examplesU13to16 } from './examples-u13-16';
import { passagesU17to20 } from './passages-u17-20';
import { pairsU17to20 } from './pairs-u17-20';
import { examplesU17to20 } from './examples-u17-20';
import { passagesU21to24 } from './passages-u21-24';
import { pairsU21to24 } from './pairs-u21-24';
import { examplesU21to24 } from './examples-u21-24';

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
  patterns: [...patternsU13, ...patternsU14, ...patternsU15, ...patternsU16, ...patternsU17, ...patternsU18, ...patternsU19, ...patternsU20, ...patternsU21, ...patternsU22, ...patternsU23, ...patternsU24],
  extras: {},
  examples: { ...examplesU13to16, ...examplesU17to20, ...examplesU21to24 },
  pairs: [...pairsU13to16, ...pairsU17to20, ...pairsU21to24],
  passages: [...passagesU13to16, ...passagesU17to20, ...passagesU21to24],
};
