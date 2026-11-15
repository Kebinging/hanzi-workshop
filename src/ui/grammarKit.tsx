import type { AnnotatedSentence, GrammarPattern, SlotCode } from '../content/types';
import { content } from '../content';
import { tilesOf, type Tile } from '../exercises/grade';
import { finalPunct } from '../exercises/grade';

export const SLOT_LABEL: Record<SlotCode, string> = {
  TOP: 'Topic', S: 'Subject', T: 'Time', ADV: 'Adverb', MOD: 'Modal', PP: 'Prep / place', BA: '把 / 被',
  V: 'Verb', ASP: 'Aspect', C: 'Complement', O: 'Object', SF: 'Final', CONJ1: 'Connective', CONJ2: 'Connective', P: 'Pause',
};

/** Minimal markdown for authored notes: paragraphs, **bold**, "- " lists. */
export function Md({ text }: { text: string }) {
  const inline = (s: string) => s.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/).map((part, i) =>
    part.startsWith('**') ? <b key={i} className="text-ink">{part.slice(2, -2)}</b>
      : part.length > 2 && part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em>
        : <span key={i}>{part}</span>);
  return (
    <div className="space-y-2 text-ink-2">
      {text.split(/\n\n+/).map((block, i) => {
        const lines = block.split('\n');
        if (lines.every((l) => l.startsWith('- '))) {
          return <ul key={i} className="list-disc space-y-1 pl-5">{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
        }
        return <p key={i}>{lines.map((l, j) => <span key={j}>{j > 0 && <br />}{inline(l)}</span>)}</p>;
      })}
    </div>
  );
}

/** A tile chip coloured by its grammatical slot, with the slot name underneath. */
export function TileChip({ tile, showLabel = true, state, onClick, disabled }: {
  tile: Tile; showLabel?: boolean; state?: 'bad' | 'neutral'; onClick?: () => void; disabled?: boolean;
}) {
  const coloured = showLabel;
  return (
    <button
      type="button" disabled={disabled} onClick={onClick}
      className={`han no-select flex min-h-12 min-w-11 flex-col items-center justify-center rounded-xl px-3 py-1.5 text-xl leading-tight
        ${coloured ? `slot-chip slot-${tile.slot}` : 'border-[1.5px] border-line bg-surface'}
        ${state === 'bad' ? 'ring-2 ring-bad ring-offset-1 ring-offset-bg' : ''} ${onClick ? 'active:scale-95' : ''} transition`}
    >
      <span>{tile.text}</span>
      {coloured && <span className="slot-label font-sans text-[10px] font-medium leading-none">{SLOT_LABEL[tile.slot]}</span>}
    </button>
  );
}

/** A sentence rendered as coloured slot tiles (X-ray view of its structure). */
export function SlotSentence({ sentence, className = '' }: { sentence: AnnotatedSentence; className?: string }) {
  const tiles = tilesOf(sentence);
  return (
    <div className={`flex flex-wrap items-end gap-1.5 ${className}`}>
      {tiles.map((t, i) => (i === tiles.length - 1
        ? <span key={t.id} className="inline-flex items-end"><TileChip tile={t} /><span className="han pb-3 pl-0.5 text-xl">{finalPunct(sentence)}</span></span>
        : <TileChip key={t.id} tile={t} />))}
    </div>
  );
}

export function FormulaChips({ formula }: { formula: SlotCode[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {formula.map((s, i) => (
        <span key={i} className={`slot-chip slot-${s} slot-label rounded-md px-2 py-0.5 text-xs font-medium`}>{SLOT_LABEL[s]}</span>
      ))}
    </div>
  );
}

export function RuleCard({ pattern }: { pattern: GrammarPattern }) {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-xs text-ink-3">{pattern.id} · Unit {pattern.unit}</div>
        <h2 className="text-lg font-semibold">{pattern.title}</h2>
        <div className="han text-ink-3">{pattern.titleZh}</div>
      </div>
      <FormulaChips formula={pattern.formula} />
      <Md text={pattern.explanationMd} />
      <div className="space-y-3 pt-1">
        {pattern.examples.map((e) => (
          <div key={e.id}>
            <SlotSentence sentence={e} />
            <p className="mt-1 text-sm text-ink-3">{e.en}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function errorInfo(code: string) {
  return content.bundle.errors.find((e) => e.code === code);
}

/** Bottom sheet with a pattern's rule card. */
export function RuleSheet({ pattern, onClose }: { pattern: GrammarPattern; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sheet-in max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-surface p-5 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
        <RuleCard pattern={pattern} />
        <button type="button" onClick={onClose} className="mt-5 min-h-12 w-full rounded-xl bg-surface-2 font-medium">Close</button>
      </div>
    </div>
  );
}
