import { Fragment } from 'react';
import type { AnnotatedSentence, Token, VocabItem } from '../content/types';
import type { DisplayLevel, FSRSCardState } from '../state/types';
import { displayLevelFor } from './displayLevel';
import { syllabify, toneOf } from '../content/pinyin';
import { content } from '../content';

/** Hanzi with per-syllable tone-coloured pinyin. */
export function PinyinText({ pinyin, className = '' }: { pinyin: string; className?: string }) {
  return (
    <span className={className}>
      {pinyin.split(' ').map((s, i) => (
        <span key={i} className={`tone${toneOf(s)}`}>{s}</span>
      ))}
    </span>
  );
}

/** A word rendered as ruby (pinyin over each character) or bare. */
export function WordRuby({ hanzi, pinyin, showPinyin }: { hanzi: string; pinyin?: string; showPinyin: boolean }) {
  if (!showPinyin || !pinyin) return <>{hanzi}</>;
  const sylls = syllabify(pinyin, hanzi) ?? [];
  return (
    <ruby>
      {[...hanzi].map((c, i) => (
        <Fragment key={i}>
          {c}
          <rt className={sylls[i] ? `tone${toneOf(sylls[i])}` : ''}>{sylls[i] ?? ''}</rt>
        </Fragment>
      ))}
    </ruby>
  );
}

export interface TokenTap { token: Token; word?: VocabItem; level: DisplayLevel }

interface SentenceProps {
  sentence: AnnotatedSentence;
  cards: Map<string, FSRSCardState>;
  pool: ReadonlySet<string>;
  now: number;
  testedWordId?: string;
  highlightWordId?: string;
  onTap?: (t: TokenTap) => void;
  className?: string;
}

/** A tokenised sentence with pinyin fading (spec 1.3) and tap-to-peek. */
export function SentenceView({ sentence, cards, pool, now, testedWordId, highlightWordId, onTap, className = '' }: SentenceProps) {
  return (
    <p className={`han hz leading-[2.4] no-select ${className}`}>
      {sentence.tokens.map((t, i) => {
        const word = t.ref ? content.vocabById.get(t.ref) : undefined;
        const card = word ? cards.get(`word.recog:${word.id}`) : undefined;
        const level = displayLevelFor(t, word, card, pool, now, testedWordId);
        const pinyin = word?.pinyin ?? t.pinyin;
        const highlight = highlightWordId && word?.id === highlightWordId;
        if (t.kind === 'punct') return <span key={i}>{t.t}</span>;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onTap?.({ token: t, word, level })}
            className={`inline align-baseline rounded px-[1px] ${highlight ? 'underline decoration-accent decoration-2 underline-offset-[6px]' : ''} ${t.kind === 'name' ? 'underline decoration-dotted decoration-ink-3 underline-offset-[6px]' : ''} active:bg-surface-2`}
          >
            <WordRuby hanzi={t.t} pinyin={pinyin} showPinyin={level !== 'L2_BARE'} />
            {level === 'L0_FULL' && t.glossEn ? <span className="ml-1 text-xs text-ink-3">({t.glossEn})</span> : null}
          </button>
        );
      })}
    </p>
  );
}
