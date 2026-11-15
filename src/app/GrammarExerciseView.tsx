import { useMemo, useState } from 'react';
import type { GrammarPattern, Token } from '../content/types';
import type {
  ClozeExercise, GrammarExercise, JudgementExercise, PairExercise, SlotExercise, TransformExercise,
} from '../exercises/grammar';
import { gradeOrder, type Tile } from '../exercises/grade';
import type { GrammarAttempt } from '../srs/controller';
import { Card } from '../ui/kit';
import { SentenceView, type TokenTap } from '../ui/Hanzi';
import { SLOT_LABEL, SlotSentence, TileChip, errorInfo } from '../ui/grammarKit';
import type { FSRSCardState } from '../state/types';

export interface GrammarViewProps {
  ex: GrammarExercise;
  cards: Map<string, FSRSCardState>;
  pool: ReadonlySet<string>;
  now: number;
  onTap: (t: TokenTap) => void;
  onDone: (a: Omit<GrammarAttempt, 'latencyMs'>) => void;
  onRule: (p: GrammarPattern) => void;
  resolved: boolean;
}

export function GrammarExerciseView(props: GrammarViewProps) {
  const { ex } = props;
  switch (ex.kind) {
    case 'slot':
    case 'transform': return <SlotBuilder {...props} ex={ex} />;
    case 'pair': return <PairView {...props} ex={ex} />;
    case 'cloze': return <ClozeView {...props} ex={ex} />;
    case 'judgement': return <JudgementView {...props} ex={ex} />;
  }
}

function Tag({ children }: { children: string }) {
  return <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-ink-3">{children}</span>;
}

function CodeNote({ codes }: { codes: string[] }) {
  const first = codes.map(errorInfo).filter(Boolean)[0];
  if (!first) return null;
  return (
    <div className="rounded-xl bg-bad-soft p-3 text-sm text-bad">
      <div className="font-semibold">{first.title}</div>
      <div>{first.explanation}</div>
    </div>
  );
}

function RuleLink({ pattern, onRule }: { pattern: GrammarPattern; onRule: (p: GrammarPattern) => void }) {
  return (
    <button type="button" onClick={() => onRule(pattern)} className="min-h-11 text-sm font-medium text-accent underline underline-offset-4">
      Rule: {pattern.title}
    </button>
  );
}

// ---------------- Slot Builder & Transformation (spec 3.1, 3.3) ----------------

function SlotBuilder({ ex, onDone, onRule, resolved, cards, pool, now, onTap }: GrammarViewProps & { ex: SlotExercise | TransformExercise }) {
  // Fixed positions: taking a tile back leaves a gap that the next tap fills.
  const [slots, setSlots] = useState<(Tile | null)[]>(() => ex.canonical.map(() => null));
  const placed = slots.filter((t): t is Tile => t !== null);
  const [tries, setTries] = useState(0);
  const [marked, setMarked] = useState<string[]>([]);
  const [codes, setCodes] = useState<string[]>([]);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const bank = ex.bank.filter((t) => !placed.includes(t));
  const full = placed.length === ex.canonical.length;
  const locked = resolved || result !== null;

  const place = (t: Tile) => {
    if (locked || full) return;
    const i = slots.indexOf(null);
    setSlots(slots.map((x, k) => (k === i ? t : x)));
    setMarked([]);
  };
  const unplace = (t: Tile) => {
    if (locked) return;
    setSlots(slots.map((x) => (x === t ? null : x)));
    setMarked([]);
  };

  const check = () => {
    const g = gradeOrder(ex.canonical, placed, ex.pattern, ex.sentence.alts);
    const allCodes = [...new Set([...codes, ...g.codes])];
    const answer = placed.map((t) => t.text).join('');
    const expected = ex.canonical.map((t) => t.text).join('');
    if (g.correct) {
      setResult('correct');
      onDone({ correct: true, wrongTries: tries, codes: allCodes, learnerAnswer: answer, expected });
    } else if (tries === 0) {
      setTries(1);
      setCodes(g.codes);
      setMarked(g.marked);
    } else {
      setResult('wrong');
      setCodes(allCodes);
      setMarked(g.marked);
      onDone({ correct: false, wrongTries: 2, codes: allCodes, learnerAnswer: answer, expected });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{ex.kind === 'transform' ? 'Transform' : 'Build the sentence'}</Tag>
        <span className="text-xs text-ink-3">{ex.pattern.title}</span>
      </div>

      {ex.kind === 'transform' ? (
        <Card className="space-y-2">
          {ex.item.inputs.map((s) => <SentenceView key={s.id} sentence={s} cards={cards} pool={pool} now={now} onTap={onTap} className="!leading-[2]" />)}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-ink-3">Use</span>
            <span className="han rounded-lg bg-accent-soft px-2 py-1 text-accent">{ex.item.chip}</span>
          </div>
          <p className="text-sm text-ink-2">“{ex.sentence.en}”</p>
        </Card>
      ) : (
        <p className="text-lg">“{ex.sentence.en}”</p>
      )}

      {/* Rail */}
      <div className="min-h-20 rounded-2xl border border-line bg-surface p-2" aria-label="Your sentence">
        <div className="flex flex-wrap items-end gap-1.5">
          {ex.canonical.map((frame, i) => {
            const t = slots[i];
            if (t) {
              return <TileChip key={t.id} tile={t} showLabel={result !== null} state={marked.includes(t.id) ? 'bad' : undefined} onClick={() => unplace(t)} disabled={locked} />;
            }
            return ex.freeRail
              ? <div key={`f${i}`} className="min-h-12 min-w-11 rounded-xl border-[1.5px] border-dashed border-line" />
              : (
                <div key={`f${i}`} className={`slot-frame slot-${frame.slot} flex min-h-12 min-w-14 flex-col items-center justify-end rounded-xl px-2 pb-1`}>
                  <span className="slot-label text-[10px] font-medium">{SLOT_LABEL[frame.slot]}</span>
                </div>
              );
          })}
          {ex.punct && <span className="han pb-3 text-xl">{ex.punct}</span>}
        </div>
        {!placed.length && <p className="px-2 pt-2 text-xs text-ink-3">Tap tiles in order. Tap a placed tile to take it back.</p>}
      </div>

      {/* Bank */}
      {!locked && (
        <div className="flex flex-wrap gap-2" aria-label="Tiles">
          {bank.map((t) => <TileChip key={t.id} tile={t} showLabel={false} onClick={() => place(t)} disabled={full} />)}
        </div>
      )}

      {tries === 1 && result === null && (
        <div className="space-y-2">
          <CodeNote codes={codes} />
          <p className="text-sm text-ink-3">Not quite — the marked tiles are involved. Tap a tile to take it back and try once more.</p>
        </div>
      )}

      {!locked && (
        <button type="button" disabled={!full} onClick={check}
          className="min-h-12 w-full rounded-xl bg-accent px-4 font-medium text-accent-ink disabled:opacity-40">
          Check
        </button>
      )}

      {result && (
        <Card className={result === 'correct' ? 'border-good' : 'border-bad'}>
          <p className={`mb-2 font-semibold ${result === 'correct' ? 'text-good' : 'text-bad'}`}>
            {result === 'correct' ? (tries ? 'Right on the second try.' : 'Correct.') : 'Here’s the natural order:'}
          </p>
          {result === 'wrong' && <div className="mb-3"><CodeNote codes={codes} /></div>}
          <SlotSentence sentence={ex.sentence} />
          <p className="mt-2 text-sm text-ink-3">{ex.pattern.summary}</p>
          <RuleLink pattern={ex.pattern} onRule={onRule} />
        </Card>
      )}
    </div>
  );
}

// ---------------- Minimal pair (spec 3.2) ----------------

function fillGaps(tokens: Token[], parts: string[] | null): Token[] {
  let k = 0;
  return tokens.map((t) => (t.kind === 'gap' ? { ...t, t: parts ? parts[k++] ?? '＿＿' : '＿＿', kind: 'target' as const } : t));
}

function PairView({ ex, onDone, onRule, cards, pool, now, onTap }: GrammarViewProps & { ex: PairExercise }) {
  const [choice, setChoice] = useState<number | null>(null);
  const correct = ex.options.findIndex((o) => o.correct);
  const shown = useMemo(() => ({ ...ex.item.context, tokens: fillGaps(ex.item.context.tokens, choice === null ? null : ex.options[correct].parts) }), [ex, choice, correct]);
  const pick = (i: number) => {
    if (choice !== null) return;
    setChoice(i);
    const o = ex.options[i];
    onDone({
      correct: o.correct, wrongTries: 0, codes: o.correct ? [] : [o.code ?? 'LEX.NEAR_SYNONYM'],
      learnerAnswer: o.parts.join('…'), expected: ex.options[correct].parts.join('…'),
    });
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2"><Tag>Which fits?</Tag><span className="han text-xs text-ink-3">{ex.item.contrast}</span></div>
      <Card>
        <SentenceView sentence={shown} cards={cards} pool={pool} now={now} onTap={onTap} />
        {choice !== null && <p className="mt-1 text-sm text-ink-3">{ex.item.context.en}</p>}
      </Card>
      <div className="grid grid-cols-2 gap-2">
        {ex.options.map((o, i) => {
          const state = choice === null ? 'border-line bg-surface' : o.correct ? 'border-good bg-good-soft' : choice === i ? 'border-bad bg-bad-soft' : 'border-line bg-surface opacity-60';
          return (
            <button key={i} type="button" disabled={choice !== null} onClick={() => pick(i)}
              className={`han min-h-14 rounded-xl border-[1.5px] px-3 text-2xl ${state}`}>{o.parts.join(' … ')}</button>
          );
        })}
      </div>
      {choice !== null && (
        <Card className="space-y-2 text-sm">
          {!ex.options[choice].correct && <p className="text-bad"><span className="han font-semibold">{ex.options[choice].parts.join('…')}</span>: {ex.options[choice].why}</p>}
          <p className="text-good"><span className="han font-semibold">{ex.options[correct].parts.join('…')}</span>: {ex.options[correct].why}</p>
          <RuleLink pattern={ex.pattern} onRule={onRule} />
        </Card>
      )}
    </div>
  );
}

// ---------------- Cloze (spec 3.4) ----------------

function ClozeView({ ex, onDone, onRule, cards, pool, now, onTap }: GrammarViewProps & { ex: ClozeExercise }) {
  const [choice, setChoice] = useState<number | null>(null);
  const correct = ex.options.findIndex((o) => o.correct);
  const shown = useMemo(() => ({
    ...ex.item.sentence,
    tokens: ex.item.sentence.tokens.map((t, i) => (i === ex.item.blank ? { ...t, t: choice === null ? '＿＿' : t.t, kind: 'target' as const, ref: undefined } : t)),
  }), [ex, choice]);
  const pick = (i: number) => {
    if (choice !== null) return;
    setChoice(i);
    const o = ex.options[i];
    onDone({ correct: o.correct, wrongTries: 0, codes: o.correct ? [] : [o.code ?? 'LEX.COLLOCATION'], learnerAnswer: o.t, expected: ex.options[correct].t });
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2"><Tag>Fill the gap</Tag><span className="text-xs text-ink-3">{ex.pattern.title}</span></div>
      <Card>
        <SentenceView sentence={shown} cards={cards} pool={pool} now={now} onTap={onTap} />
        <p className="mt-1 text-sm text-ink-3">{ex.item.sentence.en}</p>
      </Card>
      <div className="grid grid-cols-3 gap-2">
        {ex.options.map((o, i) => {
          const state = choice === null ? 'border-line bg-surface' : o.correct ? 'border-good bg-good-soft' : choice === i ? 'border-bad bg-bad-soft' : 'border-line bg-surface opacity-60';
          return <button key={i} type="button" disabled={choice !== null} onClick={() => pick(i)} className={`han min-h-14 rounded-xl border-[1.5px] text-2xl ${state}`}>{o.t}</button>;
        })}
      </div>
      {choice !== null && (
        <Card className="space-y-2 text-sm">
          {!ex.options[choice].correct && <p className="text-bad"><span className="han font-semibold">{ex.options[choice].t}</span>: {ex.options[choice].why}</p>}
          <p className="text-good"><span className="han font-semibold">{ex.options[correct].t}</span>: {ex.options[correct].why}</p>
          <RuleLink pattern={ex.pattern} onRule={onRule} />
        </Card>
      )}
    </div>
  );
}

// ---------------- HSK 1–2 foundation judgement ----------------

function JudgementView({ ex, onDone }: GrammarViewProps & { ex: JudgementExercise }) {
  const [choice, setChoice] = useState<number | null>(null);
  const pick = (i: number) => {
    if (choice !== null) return;
    setChoice(i);
    onDone({ correct: i === ex.answer, wrongTries: 0, codes: i === ex.answer ? [] : ['GRAM.JUDGEMENT'], learnerAnswer: ex.options[i], expected: ex.options[ex.answer] });
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2"><Tag>Which sentence is correct?</Tag><span className="rounded-full bg-warn-soft px-2 py-0.5 text-xs font-medium text-warn">Foundation</span></div>
      <p className="text-sm text-ink-3">{ex.cluster.title}</p>
      <div className="grid gap-2">
        {ex.options.map((o, i) => {
          const state = choice === null ? 'border-line bg-surface' : i === ex.answer ? 'border-good bg-good-soft' : choice === i ? 'border-bad bg-bad-soft' : 'border-line bg-surface opacity-60';
          return <button key={i} type="button" disabled={choice !== null} onClick={() => pick(i)} className={`han min-h-12 rounded-xl border-[1.5px] px-4 py-3 text-left text-xl ${state}`}>{o}</button>;
        })}
      </div>
      {choice !== null && <Card className="text-sm text-ink-2">{ex.why} <span className="text-ink-3">— {ex.cluster.summary}</span></Card>}
    </div>
  );
}
