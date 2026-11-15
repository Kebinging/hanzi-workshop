import type { Token, VocabItem } from '../content/types';
import type { DisplayLevel, FSRSCardState } from '../state/types';
import { isDippedWord } from '../gate/pool';

/** HSK 3+ words lose their pinyin once recognition stability reaches this many days. */
export const BARE_STABILITY_DAYS = 21;

/**
 * Pinyin fading rules (spec 1.3.2). `testedWordId` is the word under test in the current
 * exercise; it is always shown bare.
 */
export function displayLevelFor(
  token: Token, word: VocabItem | undefined, card: FSRSCardState | undefined,
  pool: ReadonlySet<string>, now: number, testedWordId?: string,
): DisplayLevel {
  if (token.kind === 'punct' || token.kind === 'num') return 'L2_BARE';
  if (token.kind === 'name') return 'L1_PINYIN';
  if (token.kind === 'gloss') return 'L0_FULL';
  if (!word) return 'L1_PINYIN';
  if (testedWordId && word.id === testedWordId) return 'L2_BARE';
  // New or still learning (fewer than 2 successful reviews): pinyin on.
  if (!card || card.state !== 2) return 'L1_PINYIN';
  if (isDippedWord(card, now)) return 'L1_PINYIN';
  if (word.hsk <= 2) return pool.has(word.id) ? 'L2_BARE' : 'L1_PINYIN';
  return card.stability >= BARE_STABILITY_DAYS ? 'L2_BARE' : 'L1_PINYIN';
}
