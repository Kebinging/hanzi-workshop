import type { OrderConstraint, SlotCode } from '../../src/content/types';

/**
 * Compact authoring format for a grammar pattern.
 * Sentences: tokens separated by spaces. Prefixes:
 *   *x*  target token      %x  number (exempt from coverage)
 *   #x=pīnyīn=gloss  name  ~x=pīnyīn=gloss  pre-glossed off-syllabus word
 *   x@id explicit vocab id (homographs)
 */
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
  examples: [string, string][];
  instances: [string, string][];
}
