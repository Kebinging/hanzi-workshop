import type { FSRSCardState } from '../state/types';
import { retrievability } from '../srs/fsrs';

export const R_KNOWN = 0.85;

/**
 * Exposure pool (spec 1.1.2): word ids the coverage gate treats as known.
 * `completedUnitWords`: word ids of completed units (rule 3).
 */
export function buildExposurePool(
  cards: FSRSCardState[], now: number, completedUnitWords: ReadonlySet<string> = new Set(),
): Set<string> {
  const pool = new Set<string>();
  for (const c of cards) {
    if (c.facet !== 'word.recog' || c.suspended) continue;
    if (retrievability(c, now) >= R_KNOWN) pool.add(c.itemId);
    else if (c.origin === 'diagnostic' && c.lapses === 0 && c.state === 2) pool.add(c.itemId);
    else if (completedUnitWords.has(c.itemId) && c.state === 2) pool.add(c.itemId);
  }
  return pool;
}

/** A Review card whose retrievability has dipped below R_KNOWN: show pinyin again (spec 1.3.2). */
export function isDippedWord(c: FSRSCardState | undefined, now: number): boolean {
  return !!c && c.state === 2 && retrievability(c, now) < R_KNOWN;
}
