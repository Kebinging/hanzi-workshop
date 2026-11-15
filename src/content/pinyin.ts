const TONE_MARKS: Record<string, [string, number]> = {
  ā: ['a', 1], á: ['a', 2], ǎ: ['a', 3], à: ['a', 4],
  ē: ['e', 1], é: ['e', 2], ě: ['e', 3], è: ['e', 4],
  ī: ['i', 1], í: ['i', 2], ǐ: ['i', 3], ì: ['i', 4],
  ō: ['o', 1], ó: ['o', 2], ǒ: ['o', 3], ò: ['o', 4],
  ū: ['u', 1], ú: ['u', 2], ǔ: ['u', 3], ù: ['u', 4],
  ǖ: ['ü', 1], ǘ: ['ü', 2], ǚ: ['ü', 3], ǜ: ['ü', 4],
};

/** Tone of a single tone-marked syllable: 1–4, or 5 for neutral. */
export function toneOf(syllable: string): number {
  for (const ch of syllable) {
    const m = TONE_MARKS[ch];
    if (m) return m[1];
  }
  return 5;
}

/** "fàng jià" -> "fang4 jia4" (ü -> v, neutral -> 5). */
export function toNumbered(pinyin: string): string {
  return pinyin
    .split(' ')
    .map((s) => {
      let base = '';
      for (const ch of s) base += TONE_MARKS[ch]?.[0] ?? ch;
      return base.replace(/ü/g, 'v') + toneOf(s);
    })
    .join(' ');
}

/**
 * Align space-separated syllables to characters. Handles erhua:
 * "nǎr" for 哪儿 -> ["nǎr", ""] (the 儿 carries no separate syllable).
 * Returns null if the counts can't be reconciled.
 */
export function syllabify(pinyin: string, hanzi: string): string[] | null {
  const sylls = pinyin.split(' ');
  const chars = [...hanzi];
  if (sylls.length === chars.length) return sylls;
  if (chars.length === sylls.length + 1 && chars[chars.length - 1] === '儿' && sylls[sylls.length - 1].endsWith('r')) {
    return [...sylls, ''];
  }
  return null;
}

/** Display form: syllables joined ("fàngjià"). */
export function displayPinyin(pinyin: string): string {
  return pinyin.replace(/ /g, '');
}
