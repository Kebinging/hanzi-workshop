import { useEffect } from 'react';
import type { CharItem, VocabItem } from '../content/types';
import type { FSRSCardState } from '../state/types';
import { content } from '../content';
import { PinyinText } from './Hanzi';
import { retrievability } from '../srs/fsrs';

const POS_LABEL: Record<string, string> = {
  n: 'noun', v: 'verb', adj: 'adjective', adv: 'adverb', prep: 'preposition', conj: 'conjunction', mw: 'measure word',
  pron: 'pronoun', num: 'number', part: 'particle', aux: 'modal verb', loc: 'location word', intj: 'interjection', vsep: 'separable verb',
};

export function CharBreakdown({ char }: { char: CharItem }) {
  const set = char.confusableSet ? content.confusableById.get(char.confusableSet) : undefined;
  return (
    <div className="flex gap-3 rounded-xl bg-surface-2 p-3">
      <div className="han text-4xl leading-none">{char.id}</div>
      <div className="min-w-0 flex-1 text-sm">
        <div className="text-ink-2">
          Radical <span className="han text-base text-ink">{char.radical.char}</span>
          {char.radical.meaning ? <span> · {char.radical.meaning}</span> : null}
        </div>
        {char.components.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-ink-2">
            {char.components.map((c, i) => (
              <span key={i}>
                <span className="han text-base text-ink">{c.char}</span>
                {c.meaning ? <span className="text-ink-3"> {c.meaning}</span> : null}
              </span>
            ))}
          </div>
        )}
        {set && (
          <div className="mt-2 rounded-lg bg-warn-soft px-2 py-1 text-warn">
            Look-alike: {set.chars.filter((c) => c !== char.id).map((c) => <span key={c} className="han mx-0.5 text-base">≠{c}</span>)}
            {char.diffHint ? <div className="text-xs">{char.diffHint}</div> : null}
          </div>
        )}
      </div>
    </div>
  );
}

export function MasteryRing({ value }: { value: number }) {
  const r = 14;
  const c = 2 * Math.PI * r;
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-label={`Recall ${Math.round(value * 100)}%`}>
      <circle cx="18" cy="18" r={r} fill="none" stroke="var(--line)" strokeWidth="4" />
      <circle cx="18" cy="18" r={r} fill="none" stroke="var(--good)" strokeWidth="4" strokeDasharray={`${c * value} ${c}`}
        transform="rotate(-90 18 18)" strokeLinecap="round" />
    </svg>
  );
}

export function WordDetail({ word, card, now }: { word: VocabItem; card?: FSRSCardState; now: number }) {
  const sense = word.senses[0];
  const r = card ? retrievability(card, now) : 0;
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="han text-5xl leading-tight">{word.hanzi}</div>
          <PinyinText pinyin={word.pinyin} className="text-xl" />
        </div>
        <div className="flex flex-col items-end gap-1 text-xs text-ink-3">
          <span className="rounded-full bg-surface-2 px-2 py-0.5">HSK {word.hsk}{word.unit ? ` · Unit ${word.unit}` : ''}</span>
          {card && card.state === 2 && <MasteryRing value={r} />}
        </div>
      </div>
      <p className="mt-2 text-lg">{sense.gloss}</p>
      <p className="text-sm text-ink-3">{POS_LABEL[sense.pos] ?? sense.pos}{word.separable ? ' — can split: e.g. 见了面' : ''}</p>
      <div className="mt-3 space-y-2">
        {[...new Set(word.chars)].map((c) => {
          const ci = content.charById.get(c);
          return ci ? <CharBreakdown key={c} char={ci} /> : null;
        })}
      </div>
    </div>
  );
}

interface PeekSheetProps {
  word?: VocabItem;
  name?: { t: string; pinyin?: string; glossEn?: string };
  card?: FSRSCardState;
  now: number;
  onClose: () => void;
}

/** Bottom sheet for tap-to-peek (spec 1.3.3). */
export function PeekSheet({ word, name, card, now, onClose }: PeekSheetProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sheet-in max-h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-surface p-5 pb-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
        {word ? <WordDetail word={word} card={card} now={now} /> : name ? (
          <div>
            <div className="han text-4xl">{name.t}</div>
            {name.pinyin && <div className="text-lg text-ink-2">{name.pinyin}</div>}
            <p className="mt-2">{name.glossEn ?? 'Name'}</p>
          </div>
        ) : null}
        <button type="button" onClick={onClose} className="mt-5 w-full rounded-xl bg-surface-2 py-3 font-medium">Close</button>
      </div>
    </div>
  );
}
