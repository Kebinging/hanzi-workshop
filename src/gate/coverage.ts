import type { Token } from '../content/types';

export interface CoverageResult {
  ratio: number;       // known counted tokens / counted tokens (1 if nothing counted)
  counted: number;
  unknown: string[];   // vocab ids of unknown counted tokens (deduplicated)
}

/** Token kinds exempt from coverage (spec 1.1.1). 'gloss' is counted but always pre-glossed, so treated as known. */
const EXEMPT = new Set<Token['kind']>(['target', 'name', 'num', 'punct']);

export function checkCoverage(
  tokens: Token[], pool: ReadonlySet<string>, alsoExempt: ReadonlySet<string> = new Set(),
): CoverageResult {
  let counted = 0;
  let known = 0;
  const unknown = new Set<string>();
  for (const t of tokens) {
    if (EXEMPT.has(t.kind)) continue;
    counted++;
    if (t.kind === 'gloss' || (t.ref && (pool.has(t.ref) || alsoExempt.has(t.ref)))) known++;
    else unknown.add(t.ref ?? t.t);
  }
  return { ratio: counted === 0 ? 1 : known / counted, counted, unknown: [...unknown] };
}

/** G1 for single sentences: every non-exempt token known. */
export function sentencePasses(tokens: Token[], pool: ReadonlySet<string>, alsoExempt?: ReadonlySet<string>): boolean {
  return checkCoverage(tokens, pool, alsoExempt).ratio === 1;
}

/** G1 for passages: at least 95 %. */
export function passagePasses(tokens: Token[], pool: ReadonlySet<string>): boolean {
  return checkCoverage(tokens, pool).ratio >= 0.95;
}
