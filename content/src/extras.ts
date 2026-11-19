import type { SentenceSrc } from './authoring';
import { extrasU01to04 } from './extras-u01-04';
import { extrasU05to08 } from './extras-u05-08';
import { extrasU09to12 } from './extras-u09-12';

/** Extra practice sentences per pattern (same syntax as PatternSource.instances). */
export const extraInstances: Record<string, SentenceSrc[]> = { ...extrasU01to04, ...extrasU05to08, ...extrasU09to12 };
