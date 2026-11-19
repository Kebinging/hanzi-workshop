import { useEffect, useMemo, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { content } from '../content';
import type { ReadingPassage, Token, TokenRange, VocabItem } from '../content/types';
import type { FSRSCardState } from '../state/types';
import { db } from '../db/db';
import { gradeQuestion, passageStatus, queueBlockingWords, readingPool, xrayLayout } from '../reading/reading';
import { displayLevelFor } from '../ui/displayLevel';
import { WordRuby } from '../ui/Hanzi';
import { PeekSheet } from '../ui/PeekSheet';
import { Button, Card, Page, TopBar } from '../ui/kit';
import { logFreePeek } from '../srs/controller';
import { rng, shuffle } from '../lib/rng';

const GENRE: Record<ReadingPassage['genre'], string> = {
  diary: 'Diary', chat: 'Message', notice: 'Notice', story: 'Story', dialogue: 'Dialogue', explanation: 'Explanation',
};

function useReadingData() {
  return useLiveQuery(async () => {
    const now = Date.now();
    const [cards, records] = await Promise.all([db.cards.toArray(), db.reading.toArray()]);
    return { cards, records, pool: readingPool(cards, content, now), now };
  }, []);
}

// ---------------- List ----------------

export function ReadingListView({ onBack, onOpen }: { onBack: () => void; onOpen: (id: string) => void }) {
  const data = useReadingData();
  if (!data) return null;
  const units = [...new Set(content.bundle.passages.map((p) => p.unit))].sort((a, b) => a - b);
  return (
    <div className="min-h-dvh">
      <TopBar title="Reading" onBack={onBack} />
      <Page>
        <p className="mb-4 text-sm text-ink-3">A passage opens once you know at least 95% of its words.</p>
        <div className="space-y-5">
          {units.map((u) => (
            <section key={u}>
              <h2 className="mb-2 text-sm font-semibold text-ink-3">{content.unitLabel(u)}</h2>
              <div className="space-y-2">
                {content.bundle.passages.filter((p) => p.unit === u).map((p) => {
                  const st = passageStatus(p, data.pool);
                  const done = data.records.filter((r) => r.passageId === p.id);
                  const best = done.reduce((m, r) => Math.max(m, r.correct / r.total), 0);
                  const clean = done.some((r) => !r.usedXray);
                  return (
                    <button key={p.id} type="button" onClick={() => onOpen(p.id)} className="w-full text-left">
                      <Card className={st.locked ? 'opacity-75' : ''}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-xs text-ink-3">{p.review ? 'Review' : GENRE[p.genre]} · {p.charCount} characters</div>
                            <div className="han text-lg font-semibold">{p.title}</div>
                            <div className="text-sm text-ink-3">{p.titleEn}</div>
                          </div>
                          <div className="shrink-0 text-right text-xs">
                            {st.locked
                              ? <span className="rounded-full bg-surface-2 px-2 py-0.5 text-ink-3">🔒 {st.needed} word{st.needed === 1 ? '' : 's'} to go</span>
                              : done.length
                                ? <span className="rounded-full bg-good-soft px-2 py-0.5 text-good">{Math.round(best * 100)}%{clean ? ' · read clean' : ''}</span>
                                : <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">Ready</span>}
                          </div>
                        </div>
                      </Card>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </Page>
    </div>
  );
}

// ---------------- Reader ----------------

function inRange(ranges: TokenRange[], p: number, i: number) {
  return ranges.some((r) => r.paragraph === p && i >= r.start && i < r.end);
}

function TokenLine({ tokens, cards, pool, now, onTap, inert = false }: {
  tokens: Token[]; cards: Map<string, FSRSCardState>; pool: ReadonlySet<string>; now: number;
  onTap: (w: VocabItem | undefined, t: Token, level: string) => void; inert?: boolean;
}) {
  return (
    <span className="han">
      {tokens.map((t, i) => {
        const word = t.ref ? content.vocabById.get(t.ref) : undefined;
        if (t.kind === 'punct') return <span key={i}>{t.t}</span>;
        const level = displayLevelFor(t, word, word ? cards.get(`word.recog:${word.id}`) : undefined, pool, now);
        if (inert) return <WordRuby key={i} hanzi={t.t} pinyin={t.pinyin ?? word?.pinyin} showPinyin={level !== 'L2_BARE'} />;
        return (
          <button key={i} type="button" className="inline rounded active:bg-surface-2" onClick={() => onTap(word, t, level)}>
            <WordRuby hanzi={t.t} pinyin={t.pinyin ?? word?.pinyin} showPinyin={level !== 'L2_BARE'} />
          </button>
        );
      })}
    </span>
  );
}

export function ReaderView({ passageId, onBack }: { passageId: string; onBack: () => void }) {
  const passage = content.bundle.passages.find((p) => p.id === passageId);
  const data = useReadingData();
  const [xray, setXray] = useState(false);
  const usedXray = useRef(false);
  const [qi, setQi] = useState(-1);                 // -1 = reading, then question index
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [peek, setPeek] = useState<{ word?: VocabItem; name?: Token } | null>(null);
  const [queued, setQueued] = useState(false);
  const firstEvidence = useRef<HTMLSpanElement | null>(null);
  const [visit] = useState(() => Date.now());

  const cardMap = useMemo(() => new Map((data?.cards ?? []).map((c) => [c.id, c])), [data]);
  useEffect(() => { if (xray) usedXray.current = true; }, [xray]);
  useEffect(() => { if (checked !== null) firstEvidence.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, [checked]);

  if (!passage) return <Page><p>Passage not found.</p></Page>;
  if (!data) return null;
  const status = passageStatus(passage, data.pool);
  const now = data.now;

  if (status.locked) {
    const ids = status.blocking.slice(0, Math.max(status.needed, 6));
    return (
      <div className="min-h-dvh">
        <TopBar title={passage.title} onBack={onBack} />
        <Page>
          <Card className="space-y-3">
            <p className="text-lg">🔒 Learn {status.needed} more word{status.needed === 1 ? '' : 's'} to unlock this passage.</p>
            <p className="text-sm text-ink-3">You know {Math.round(status.ratio * 100)}% of its words; it opens at 95%.</p>
            <div className="flex flex-wrap gap-2">
              {ids.map((id) => {
                const w = content.vocabById.get(id)!;
                return <span key={id} className="rounded-lg bg-surface-2 px-2 py-1"><span className="han text-lg">{w.hanzi}</span> <span className="text-xs text-ink-3">{w.senses[0].gloss}</span></span>;
              })}
            </div>
            <Button disabled={queued} onClick={async () => {
              await db.cards.bulkPut(queueBlockingWords(ids, cardMap, Date.now()));
              setQueued(true);
            }}>{queued ? 'Queued — they’ll come up in your next session' : 'Queue these words'}</Button>
          </Card>
        </Page>
      </div>
    );
  }

  const q = qi >= 0 ? passage.questions[qi] : undefined;
  // Display order is shuffled per visit so the answer position can't be learned.
  const order = q ? shuffle(q.options.map((_, i) => i), rng(`${q.id}:${visit}`)) : [];
  const evidence = checked !== null && q ? q.evidence : [];
  let evidenceSeen = false;
  const onTap = (w: VocabItem | undefined, t: Token, level: string) => {
    if (t.kind === 'name') { setPeek({ name: t }); return; }
    if (!w) return;
    void logFreePeek({ wordId: w.id, level: level as never });
    setPeek({ word: w });
  };

  const check = async () => {
    if (!q) return;
    const ok = gradeQuestion(q, picked);
    setChecked(ok);
    setResults([...results, ok]);
    if (!ok) {
      await db.errors.add({
        ts: Date.now(), attemptId: `${passage.id}:${Date.now()}`, exerciseKind: 'reading', instanceId: q.id,
        codes: [`READ.${q.type.toUpperCase()}`], itemIds: [passage.id], learnerAnswer: picked.join(','), expected: q.answer.join(','),
      });
    }
  };
  const nextQ = async () => {
    setChecked(null);
    setPicked([]);
    if (qi + 1 < passage.questions.length) { setQi(qi + 1); return; }
    await db.reading.add({ passageId: passage.id, ts: Date.now(), correct: results.filter(Boolean).length, total: results.length, usedXray: usedXray.current });
    setQi(passage.questions.length);
  };

  const finished = qi >= passage.questions.length;
  const score = results.filter(Boolean).length;

  return (
    <div className="min-h-dvh">
      <TopBar title={passage.title} onBack={onBack} right={
        <button type="button" onClick={() => setXray(!xray)} aria-pressed={xray}
          className={`mr-2 min-h-10 rounded-full px-3 text-sm font-medium ${xray ? 'bg-accent text-accent-ink' : 'bg-surface-2 text-ink-2'}`}>X-ray</button>
      } />
      <Page>
        <div className="mb-1 text-xs text-ink-3">{passage.review ? 'Review passage' : GENRE[passage.genre]} · {passage.titleEn}</div>
        {xray && (
          <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-3">
            <span className="xr-clause-odd px-1">clause</span><span className="xr-sub">subordinate</span>
            <span className="xr-ul-time">time</span><span className="xr-ul-place">place/compare</span><span className="xr-ul-complement">complement</span><span className="xr-ul-ba">把 / 被</span>
            <span className="xr-topic">topic ▸</span><span>⌜modifier⌝ <b>head</b></span><span className="xr-pair-1">paired words</span>
          </div>
        )}
        <article lang="zh-CN" className="hz space-y-3 leading-[2.3]">
          {passage.paragraphs.map((para, pi) => {
            const lay = xrayLayout(para.tokens, para.chunks);
            return (
              <p key={pi}>
                {lay.map((x, i) => {
                  if (x.token.kind === 'punct' && i > 0) return null; // rendered with the previous token
                  const trailing: string[] = [];
                  for (let j = i + 1; j < lay.length && lay[j].token.kind === 'punct'; j++) trailing.push(lay[j].token.t);
                  const ev = inRange(evidence, pi, i);
                  const cls = [
                    xray && x.clause % 2 === 1 ? 'xr-clause-odd' : '',
                    xray && x.underline ? `xr-ul-${x.underline}` : '',
                    xray && x.subordinate ? 'xr-sub' : '',
                    xray && x.topic ? 'xr-topic' : '',
                    xray && x.head ? 'xr-head' : '',
                    xray && x.pairId ? `xr-pair-${((Number(x.pairId) - 1) % 3) + 1}` : '',
                    ev ? 'xr-evidence' : '',
                  ].join(' ');
                  const refHere = ev && !evidenceSeen ? (evidenceSeen = true) : false;
                  return (
                    <span key={i} className="whitespace-nowrap">
                      <span className={cls} ref={refHere ? firstEvidence : undefined}>
                        {xray && x.modStart && <span className="xr-mark">⌜</span>}
                        <TokenLine tokens={[x.token]} cards={cardMap} pool={data.pool} now={now} onTap={onTap} />
                        {xray && x.modEnd && <span className="xr-mark">⌝</span>}
                        {xray && x.topicEnd && <span className="xr-mark">▸</span>}
                      </span>
                      {trailing.length > 0 && <span className="han">{trailing.join('')}</span>}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </article>

        <div className="mt-6">
          {qi === -1 && (
            <Button className="w-full" onClick={() => setQi(0)}>Questions ({passage.questions.length})</Button>
          )}
          {q && (
            <Card className="space-y-3">
              <div className="text-xs text-ink-3">Question {qi + 1} of {passage.questions.length}{q.type === 'sequence' ? ' · tap in order' : ''}</div>
              <div className="hz"><TokenLine tokens={q.stem} cards={cardMap} pool={data.pool} now={now} onTap={onTap} /></div>
              <div className="grid gap-2">
                {order.map((i) => {
                  const o = q.options[i];
                  const pos = picked.indexOf(i);
                  const isRight = q.type === 'sequence' ? false : q.answer[0] === i;
                  const state = checked === null
                    ? (pos >= 0 ? 'border-accent bg-accent-soft' : 'border-line bg-surface')
                    : q.type !== 'sequence' && isRight ? 'border-good bg-good-soft'
                      : pos >= 0 && !checked ? 'border-bad bg-bad-soft' : 'border-line bg-surface';
                  return (
                    <button key={i} type="button" disabled={checked !== null}
                      onClick={() => {
                        if (q.type === 'sequence') setPicked(pos >= 0 ? picked.filter((x) => x !== i) : [...picked, i]);
                        else setPicked([i]);
                      }}
                      className={`flex min-h-12 items-center gap-2 rounded-xl border-[1.5px] px-3 py-2 text-left ${state}`}>
                      {q.type === 'sequence' && <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs">{pos >= 0 ? pos + 1 : ''}</span>}
                      <span className="han text-lg"><TokenLine tokens={o} cards={cardMap} pool={data.pool} now={now} onTap={() => undefined} inert /></span>
                    </button>
                  );
                })}
              </div>
              {checked === null ? (
                <Button className="w-full" disabled={picked.length !== (q.type === 'sequence' ? q.options.length : 1)} onClick={() => void check()}>Check</Button>
              ) : (
                <>
                  <p className={`text-sm ${checked ? 'text-good' : 'text-bad'}`}>
                    <b>{checked ? 'Right.' : 'Not quite.'}</b> {q.why}
                    {q.type === 'sequence' && !checked && <> Order: {q.answer.map((i) => q.options[i].map((t) => t.t).join('')).join(' → ')}</>}
                  </p>
                  <p className="text-xs text-ink-3">The highlighted words in the passage are the evidence.</p>
                  <Button className="w-full" onClick={() => void nextQ()}>{qi + 1 < passage.questions.length ? 'Next question' : 'Finish'}</Button>
                </>
              )}
            </Card>
          )}
          {finished && (
            <Card className="space-y-2 text-center">
              <div className="text-3xl font-semibold tabular-nums">{score} / {passage.questions.length}</div>
              <p className="text-sm text-ink-3">{usedXray.current ? 'You used X-ray this time — try reading it clean next time.' : 'Read clean — no X-ray needed.'}</p>
              <Button className="w-full" onClick={onBack}>Back to reading</Button>
            </Card>
          )}
        </div>
      </Page>
      {peek && (
        <PeekSheet word={peek.word} name={peek.name} card={peek.word ? cardMap.get(`word.recog:${peek.word.id}`) : undefined} now={now} onClose={() => setPeek(null)} />
      )}
    </div>
  );
}
