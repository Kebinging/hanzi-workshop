import { useCallback, useEffect, useRef, useState } from 'react';
import { content } from '../content';
import type { GrammarPattern, VocabItem } from '../content/types';
import {
  advance, buildCurrent, endSession, logFreePeek, presented, startSession, submitGrammar, submitLookalike, submitRecognition,
  type Exercise, type GrammarAttempt, type LiveSession, type Outcome, type PeekRecord,
} from '../srs/controller';
import type { LookalikeExercise, RecognitionExercise } from '../exercises/build';
import { GrammarExerciseView } from './GrammarExerciseView';
import { RuleCard, RuleSheet } from '../ui/grammarKit';
import { PeekSheet, WordDetail, CharBreakdown } from '../ui/PeekSheet';
import { PinyinText, SentenceView, type TokenTap } from '../ui/Hanzi';
import { Bar, Button, Card, Page, TopBar } from '../ui/kit';

interface Props { mode: 'normal' | 'flight'; onExit: () => void }

type Peek = { word?: VocabItem; name?: { t: string; pinyin?: string; glossEn?: string } } | null;

export function SessionView({ mode, onExit }: Props) {
  const [s, setS] = useState<LiveSession | null>(null);
  const [ex, setEx] = useState<Exercise | null>(null);
  const [outcome, setOutcome] = useState<(Outcome & { choice: number | 'dk' }) | null>(null);
  const [done, setDone] = useState(false);
  const [peek, setPeek] = useState<Peek>(null);
  const [rule, setRule] = useState<GrammarPattern | null>(null);
  const [, force] = useState(0);
  const peeks = useRef<PeekRecord[]>([]);
  const shownAt = useRef(0);

  const load = useCallback((live: LiveSession) => {
    const next = buildCurrent(live, content);
    peeks.current = [];
    setOutcome(null);
    setEx(next);
    shownAt.current = performance.now();
    if (!next) {
      void endSession(live);
      setDone(true);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    void startSession(content, mode).then((live) => {
      if (!alive) return;
      setS(live);
      load(live);
    });
    return () => { alive = false; };
  }, [mode, load]);

  if (!s) return <Page><p className="py-20 text-center text-ink-3">Preparing session…</p></Page>;
  if (done || !ex) return <Summary s={s} onExit={onExit} />;

  const item = s.queue[s.index];
  const isPresentation = item?.mode === 'new';
  const now = Date.now();

  const onTap = (t: TokenTap) => {
    if (t.token.kind === 'name') { setPeek({ name: t.token }); return; }
    if (!t.word) return;
    if (!outcome && ex.kind === 'recognition' && t.word.id === ex.word.id) return; // answer first
    if (!outcome && !isPresentation) peeks.current.push({ wordId: t.word.id, level: t.level });
    else void logFreePeek({ wordId: t.word.id, level: t.level });
    setPeek({ word: t.word });
  };

  const next = () => {
    if (isPresentation) presented(s);
    else advance(s);
    force((n) => n + 1);
    load(s);
  };

  const answerRecognition = async (choice: number | 'dk') => {
    if (outcome || ex.kind !== 'recognition') return;
    const latency = performance.now() - shownAt.current;
    const res = await submitRecognition(s, ex, choice, latency, peeks.current);
    setOutcome({ ...res, choice });
  };
  const answerLookalike = async (choice: number) => {
    if (outcome || ex.kind !== 'lookalike') return;
    const latency = performance.now() - shownAt.current;
    const res = await submitLookalike(s, ex, choice, latency);
    setOutcome({ ...res, choice });
  };

  const answerGrammar = async (a: Omit<GrammarAttempt, 'latencyMs'>) => {
    if (outcome || ex.kind === 'recognition' || ex.kind === 'lookalike') return;
    const latency = performance.now() - shownAt.current;
    const res = await submitGrammar(s, ex, { ...a, latencyMs: latency }, peeks.current);
    setOutcome({ ...res, choice: 0 });
  };

  const total = s.queue.length;
  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar
        title={mode === 'flight' ? 'Flight session' : 'Session'}
        onBack={() => { void endSession(s); onExit(); }}
        right={<span className="pr-3 text-sm tabular-nums text-ink-3">{Math.min(s.index + 1, total)}/{total}</span>}
      />
      <Bar value={s.index} max={total} className="rounded-none" />
      <Page>
        {isPresentation
          ? <Presentation ex={ex} s={s} now={now} onTap={onTap} />
          : ex.kind === 'recognition'
            ? <Recognition ex={ex} s={s} now={now} outcome={outcome} onAnswer={answerRecognition} onTap={onTap} />
            : ex.kind === 'lookalike'
              ? <Lookalike ex={ex} outcome={outcome} onAnswer={answerLookalike} />
              : <GrammarExerciseView key={`${s.index}:${ex.instanceId}`} ex={ex} cards={s.cards} pool={s.pool} now={now}
                  onTap={onTap} onDone={(a) => void answerGrammar(a)} onRule={setRule} resolved={!!outcome} />}
      </Page>
      {(isPresentation || outcome) && (
        <div className="fixed inset-x-0 bottom-0 border-t border-line bg-bg/95 p-4 backdrop-blur">
          <div className="mx-auto max-w-xl">
            <Button className="w-full" onClick={next}>{isPresentation ? 'Got it' : 'Continue'}</Button>
          </div>
        </div>
      )}
      {rule && <RuleSheet pattern={rule} onClose={() => setRule(null)} />}
      {peek && (
        <PeekSheet word={peek.word} name={peek.name} card={peek.word ? s.cards.get(`word.recog:${peek.word.id}`) : undefined}
          now={now} onClose={() => setPeek(null)} />
      )}
    </div>
  );
}

function Tag({ children, tone = 'neutral' }: { children: string; tone?: 'neutral' | 'new' | 'bridge' }) {
  const cls = tone === 'new' ? 'bg-accent-soft text-accent' : tone === 'bridge' ? 'bg-warn-soft text-warn' : 'bg-surface-2 text-ink-3';
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>{children}</span>;
}

function Presentation({ ex, s, now, onTap }: { ex: Exercise; s: LiveSession; now: number; onTap: (t: TokenTap) => void }) {
  if (ex.kind === 'lookalike') {
    return (
      <div className="space-y-3">
        <Tag tone="new">New · look-alike characters</Tag>
        <p className="text-ink-2">These characters are easy to mix up. Notice the difference:</p>
        {ex.set.chars.map((c) => {
          const ci = content.charById.get(c);
          return ci ? <CharBreakdown key={c} char={ci} /> : (
            <div key={c} className="rounded-xl bg-surface-2 p-3"><span className="han text-4xl">{c}</span> <span className="text-sm text-ink-2">{ex.set.hints[c]}</span></div>
          );
        })}
      </div>
    );
  }
  if (ex.kind !== 'recognition') {
    if (ex.kind === 'judgement') return null;
    return (
      <div className="space-y-3">
        <Tag tone="new">New grammar point</Tag>
        <RuleCard pattern={ex.pattern} />
      </div>
    );
  }
  const card = s.cards.get(ex.cardId);
  return (
    <div className="space-y-4">
      <Tag tone={card?.origin === 'bridge' ? 'bridge' : 'new'}>{card?.origin === 'bridge' ? 'Foundation gap' : 'New word'}</Tag>
      <WordDetail word={ex.word} card={card} now={now} />
      {ex.context && (
        <Card>
          <SentenceView sentence={ex.context} cards={s.cards} pool={s.pool} now={now} highlightWordId={ex.word.id} onTap={onTap} />
          <p className="mt-1 text-sm text-ink-3">{ex.context.en}</p>
        </Card>
      )}
    </div>
  );
}

function Recognition({ ex, s, now, outcome, onAnswer, onTap }: {
  ex: RecognitionExercise; s: LiveSession; now: number; outcome: (Outcome & { choice: number | 'dk' }) | null;
  onAnswer: (c: number | 'dk') => void; onTap: (t: TokenTap) => void;
}) {
  const card = s.cards.get(ex.cardId);
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Tag>What does it mean?</Tag>
        {card?.origin === 'bridge' && <Tag tone="bridge">Foundation</Tag>}
      </div>
      <div className="py-2 text-center">
        <div className="han text-6xl leading-tight no-select">{ex.word.hanzi}</div>
        {outcome && <PinyinText pinyin={ex.word.pinyin} className="mt-1 block text-xl" />}
      </div>
      {ex.context && (
        <Card>
          <SentenceView sentence={ex.context} cards={s.cards} pool={s.pool} now={now} testedWordId={outcome ? undefined : ex.word.id}
            highlightWordId={ex.word.id} onTap={onTap} />
          {outcome && <p className="mt-1 text-sm text-ink-3">{ex.context.en}</p>}
        </Card>
      )}
      <div className="grid gap-2">
        {ex.question.options.map((o, i) => {
          const isAnswer = i === ex.question.answer;
          const picked = outcome?.choice === i;
          const state = !outcome ? 'bg-surface border-line' : isAnswer ? 'bg-good-soft border-good text-good' : picked ? 'bg-bad-soft border-bad text-bad' : 'bg-surface border-line opacity-60';
          return (
            <button key={i} type="button" disabled={!!outcome} onClick={() => onAnswer(i)}
              className={`min-h-12 rounded-xl border px-4 py-3 text-left text-base ${state}`}>
              {o.gloss}
              {outcome && picked && o.lookalike && !isAnswer && (
                <span className="mt-1 block text-xs">That's <span className="han">{content.vocabById.get(o.wordId)?.hanzi}</span> — a look-alike character.</span>
              )}
            </button>
          );
        })}
        {!outcome && <Button variant="ghost" onClick={() => onAnswer('dk')}>I don't know</Button>}
      </div>
      {outcome && (
        <Card className={outcome.correct ? 'border-good' : 'border-bad'}>
          <WordDetail word={ex.word} card={s.cards.get(ex.cardId)} now={now} />
        </Card>
      )}
    </div>
  );
}

function Lookalike({ ex, outcome, onAnswer }: {
  ex: LookalikeExercise; outcome: (Outcome & { choice: number | 'dk' }) | null; onAnswer: (c: number) => void;
}) {
  return (
    <div className="space-y-5">
      <Tag>Which character completes the word?</Tag>
      <div className="py-2 text-center">
        <div className="han text-6xl tracking-widest no-select">
          {ex.word.chars.map((c, i) => (i === ex.blankIndex
            ? <span key={i} className={outcome ? (outcome.correct ? 'text-good' : 'text-bad') : 'text-ink-3'}>{outcome ? c : '□'}</span>
            : <span key={i}>{c}</span>))}
        </div>
        <PinyinText pinyin={ex.word.pinyin} className="mt-1 block text-xl" />
        <p className="mt-1 text-ink-2">{ex.word.senses[0].gloss}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {ex.options.map((c, i) => {
          const isAnswer = i === ex.answer;
          const picked = outcome?.choice === i;
          const state = !outcome ? 'bg-surface border-line' : isAnswer ? 'bg-good-soft border-good' : picked ? 'bg-bad-soft border-bad' : 'bg-surface border-line opacity-60';
          return (
            <button key={c} type="button" disabled={!!outcome} onClick={() => onAnswer(i)}
              className={`han flex aspect-square items-center justify-center rounded-2xl border text-5xl ${state}`}>{c}</button>
          );
        })}
      </div>
      {outcome && (
        <Card>
          <ul className="space-y-1 text-sm text-ink-2">
            {ex.set.chars.map((c) => <li key={c}>{ex.set.hints[c]}</li>)}
          </ul>
        </Card>
      )}
    </div>
  );
}

function Summary({ s, onExit }: { s: LiveSession; onExit: () => void }) {
  const { reviewed, correct, introduced, again } = s.stats;
  const uniq = (xs: string[]) => [...new Set(xs)].map((x) => content.vocabById.get(x)?.hanzi ?? x);
  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar title="Session complete" onBack={onExit} />
      <Page>
        {reviewed === 0 ? (
          <Card>
            <p className="text-lg">Nothing is due right now.</p>
            {s.plan.withheldReason && <p className="mt-2 text-sm text-ink-2">{s.plan.withheldReason}</p>}
            <p className="mt-2 text-sm text-ink-3">Your next reviews will appear when they're due — just before you'd forget them.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <Card><div className="text-2xl font-semibold tabular-nums">{reviewed}</div><div className="text-xs text-ink-3">answers</div></Card>
              <Card><div className="text-2xl font-semibold tabular-nums">{reviewed ? Math.round((correct / reviewed) * 100) : 0}%</div><div className="text-xs text-ink-3">recalled</div></Card>
              <Card><div className="text-2xl font-semibold tabular-nums">{introduced}</div><div className="text-xs text-ink-3">new items</div></Card>
            </div>
            {s.plan.withheldReason && <Card className="bg-warn-soft text-warn">{s.plan.withheldReason}</Card>}
            {s.strengthened.length > 0 && (
              <Card>
                <h2 className="mb-1 text-sm font-semibold text-good">Got stronger</h2>
                <p className="han text-xl leading-relaxed">{uniq(s.strengthened).join('　')}</p>
              </Card>
            )}
            {again > 0 && (
              <Card>
                <h2 className="mb-1 text-sm font-semibold text-bad">Needs work — scheduled again soon</h2>
                <p className="han text-xl leading-relaxed">{uniq(s.weakened).join('　')}</p>
              </Card>
            )}
          </div>
        )}
        <Button className="mt-6 w-full" onClick={onExit}>Done</Button>
      </Page>
    </div>
  );
}
