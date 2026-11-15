import { describe, expect, it } from 'vitest';
import { checkCoverage, passagePasses, sentencePasses } from './coverage';
import { displayLevelFor } from '../ui/displayLevel';
import type { Token, VocabItem } from '../content/types';
import { newCard, seededReviewCard, DAY } from '../srs/fsrs';

const NOW = Date.UTC(2026, 10, 15, 10);
const tok = (t: string, ref: string | undefined, kind: Token['kind'] = 'word'): Token => ({ t, ref, kind });

describe('coverage gate (spec 1.1.3)', () => {
  const s = [tok('我', 'w_wo'), tok('刚', 'w_gang', 'target'), tok('到', 'w_dao'), tok('#', undefined, 'punct'), tok('小王', undefined, 'name'), tok('5', undefined, 'num')];

  it('exempts target, name, num and punct tokens', () => {
    const r = checkCoverage(s, new Set(['w_wo', 'w_dao']));
    expect(r).toEqual({ ratio: 1, counted: 2, unknown: [] });
  });
  it('reports unknown words', () => {
    const r = checkCoverage(s, new Set(['w_wo']));
    expect(r.ratio).toBe(0.5);
    expect(r.unknown).toEqual(['w_dao']);
    expect(sentencePasses(s, new Set(['w_wo']))).toBe(false);
    expect(sentencePasses(s, new Set(['w_wo']), new Set(['w_dao']))).toBe(true);
  });
  it('passages pass at exactly 95 %', () => {
    const tokens = Array.from({ length: 20 }, (_, i) => tok('x', `w${i}`));
    const pool = new Set(tokens.slice(0, 19).map((t) => t.ref!));
    expect(passagePasses(tokens, pool)).toBe(true);
    pool.delete('w0');
    expect(passagePasses(tokens, pool)).toBe(false);
  });
  it('gloss tokens count as known', () => {
    expect(checkCoverage([tok('举行', undefined, 'gloss')], new Set()).ratio).toBe(1);
  });
});

describe('pinyin fading (spec 1.3.2)', () => {
  const w12: VocabItem = { id: 'w_ai', hanzi: '爱', pinyin: 'ài', pinyinNum: 'ai4', hsk: 1, senses: [], chars: ['爱'], semantic: [] };
  const w3: VocabItem = { ...w12, id: 'w_gang', hanzi: '刚', hsk: 3 };
  const t = tok('爱', 'w_ai');
  const pool = new Set(['w_ai', 'w_gang']);

  it('names get pinyin, glosses full, punctuation bare', () => {
    expect(displayLevelFor(tok('王', undefined, 'name'), undefined, undefined, pool, NOW)).toBe('L1_PINYIN');
    expect(displayLevelFor(tok('x', undefined, 'gloss'), undefined, undefined, pool, NOW)).toBe('L0_FULL');
    expect(displayLevelFor(tok('。', undefined, 'punct'), undefined, undefined, pool, NOW)).toBe('L2_BARE');
  });
  it('known HSK 1–2 words are bare; new words show pinyin', () => {
    expect(displayLevelFor(t, w12, seededReviewCard('word.recog', 'w_ai', 'diagnostic', NOW, 30, 10), pool, NOW)).toBe('L2_BARE');
    expect(displayLevelFor(t, w12, newCard('word.recog', 'w_ai', 'bridge', NOW), pool, NOW)).toBe('L1_PINYIN');
  });
  it('HSK 3 words fade at stability >= 21 days', () => {
    expect(displayLevelFor(t, w3, seededReviewCard('word.recog', 'w_gang', 'curriculum', NOW, 10, 5), pool, NOW)).toBe('L1_PINYIN');
    expect(displayLevelFor(t, w3, seededReviewCard('word.recog', 'w_gang', 'curriculum', NOW, 25, 5), pool, NOW)).toBe('L2_BARE');
  });
  it('a word whose recall has dipped gets pinyin back', () => {
    const dipped = seededReviewCard('word.recog', 'w_ai', 'diagnostic', NOW - 100 * DAY, 5, 1);
    expect(displayLevelFor(t, w12, dipped, pool, NOW)).toBe('L1_PINYIN');
  });
  it('the tested word is always bare', () => {
    expect(displayLevelFor(t, w12, newCard('word.recog', 'w_ai', 'bridge', NOW), pool, NOW, 'w_ai')).toBe('L2_BARE');
  });
});
