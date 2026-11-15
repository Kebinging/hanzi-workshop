import { useMemo, useState } from 'react';
import { content } from '../content';
import { answer, currentItem, progress, seedsFromDiagnostic, startDiagnostic, type DiagItem, type DiagState } from '../diagnostic/engine';
import { db } from '../db/db';
import type { DiagnosticResult } from '../state/types';
import { Button, Card, Page, TopBar } from '../ui/kit';

const STORAGE_KEY = 'hw-diagnostic-progress';

function loadSaved(): DiagState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DiagState) : null;
  } catch { return null; }
}
function save(s: DiagState | null) {
  try {
    if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    else localStorage.removeItem(STORAGE_KEY);
  } catch { /* storage unavailable: progress just isn't resumable */ }
}

/** Write diagnostic seeds, never overwriting cards that already have >= 3 real reviews (spec 1.2.4). */
async function applySeeds(s: DiagState): Promise<DiagnosticResult> {
  const { cards, result } = seedsFromDiagnostic(s, content, Date.now());
  await db.transaction('rw', db.cards, db.diagnostic, async () => {
    const existing = new Map((await db.cards.toArray()).map((c) => [c.id, c]));
    await db.cards.bulkPut(cards.filter((c) => (existing.get(c.id)?.reps ?? 0) < 3));
    await db.diagnostic.put(result);
  });
  return result;
}

export function DiagnosticView({ onDone }: { onDone: () => void }) {
  const [s, setS] = useState<DiagState | null>(() => loadSaved());
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [saving, setSaving] = useState(false);
  const item = useMemo(() => (s ? currentItem(s, content) : null), [s]);

  const respond = (it: DiagItem, res: Parameters<typeof answer>[3]) => {
    if (!s) return;
    const next = answer(s, content, it, res);
    setS(next);
    save(next);
  };

  const finish = async () => {
    if (!s) return;
    setSaving(true);
    setResult(await applySeeds(s));
    save(null);
    setSaving(false);
  };

  if (result) {
    const weak = Object.entries(result.grammarClusters).filter(([, v]) => v === 'weak').map(([k]) => content.clusters.find((c) => c.id === k)?.title ?? k);
    return (
      <div className="min-h-dvh">
        <TopBar title="Calibration done" />
        <Page>
          <div className="space-y-4">
            <Card>
              <div className="text-3xl font-semibold tabular-nums">{result.knownWords}<span className="text-lg text-ink-3"> / 500</span></div>
              <p className="text-ink-2">HSK 1–2 words you already know. They'll come back for review just before you'd forget them.</p>
            </Card>
            <Card>
              <div className="text-3xl font-semibold tabular-nums">{result.bridgeWords}</div>
              <p className="text-ink-2">foundation gaps. They'll be slipped into your HSK 3 sessions — at most 8 a day, the ones Unit 1 needs first.</p>
            </Card>
            <Card>
              <h2 className="font-semibold">Grammar</h2>
              {weak.length ? (
                <>
                  <p className="text-ink-2">To shore up (drills arrive with the grammar exercises in the next update):</p>
                  <ul className="mt-1 list-disc pl-5 text-sm text-ink-2">{weak.map((w) => <li key={w}>{w}</li>)}</ul>
                </>
              ) : <p className="text-ink-2">All 12 foundation grammar areas look solid.</p>}
            </Card>
            <BandChart outcomes={result.bandOutcomes} />
            <Button className="w-full" onClick={onDone}>Start learning</Button>
          </div>
        </Page>
      </div>
    );
  }

  if (!s) {
    return (
      <div className="min-h-dvh">
        <TopBar title="Calibration" />
        <Page>
          <div className="space-y-4">
            <h2 className="han text-3xl">先看看你的基础</h2>
            <p className="text-ink-2">A quick check of the 500 HSK 1–2 words and core grammar, so the app skips what you already know and quietly fills the gaps.</p>
            <ul className="list-disc space-y-1 pl-5 text-ink-2">
              <li>About 10 minutes. You can leave and resume.</li>
              <li>No pinyin — read the characters.</li>
              <li>Use <b>I don't know</b> rather than guessing; guesses make the calibration worse.</li>
            </ul>
            <Button className="w-full" onClick={() => { const st = startDiagnostic(content, `diag-${Date.now()}`); setS(st); save(st); }}>Begin</Button>
          </div>
        </Page>
      </div>
    );
  }

  const p = progress(s);
  if (!item) {
    return (
      <div className="min-h-dvh">
        <TopBar title="Calibration" />
        <Page>
          <Card><p>All done. Saving your results…</p></Card>
          <Button className="mt-4 w-full" disabled={saving} onClick={() => void finish()}>See results</Button>
        </Page>
      </div>
    );
  }

  return (
    <div className="min-h-dvh">
      <TopBar title={p.label} right={<span className="pr-3 text-sm text-ink-3">step {s.step + 1}</span>} />
      <Page>
        <PhaseDots phase={s.phase} />
        {item.kind === 'lex' && (
          <div className="space-y-5">
            <div className="py-4 text-center han text-6xl no-select">{content.vocabById.get(item.wordId)?.hanzi}</div>
            <div className="grid gap-2">
              {item.question.options.map((o, i) => (
                <button key={`${s.step}-${i}`} type="button" onClick={() => respond(item, { kind: 'lex', choice: i })}
                  className="min-h-12 rounded-xl border border-line bg-surface px-4 py-3 text-left active:bg-surface-2">{o.gloss}</button>
              ))}
              <Button variant="ghost" onClick={() => respond(item, { kind: 'lex', choice: 'dk' })}>I don't know</Button>
            </div>
          </div>
        )}
        {item.kind === 'sweep' && (
          <div className="space-y-6">
            <p className="text-center text-sm text-ink-3">Do you know what this means? Be honest — some answers get checked.</p>
            <div className="py-4 text-center han text-6xl no-select">{content.vocabById.get(item.wordId)?.hanzi}</div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={() => respond(item, { kind: 'sweep', know: false })}>Don't know</Button>
              <Button onClick={() => respond(item, { kind: 'sweep', know: true })}>Know it</Button>
            </div>
          </div>
        )}
        {item.kind === 'gram' && (
          <div className="space-y-4">
            <p className="text-sm text-ink-3">Which sentence is correct?</p>
            <div className="grid gap-2">
              {item.options.map((o, i) => (
                <button key={`${s.step}-${i}`} type="button" onClick={() => respond(item, { kind: 'gram', choice: i })}
                  className="han min-h-12 rounded-xl border border-line bg-surface px-4 py-3 text-left text-xl active:bg-surface-2">{o}</button>
              ))}
            </div>
          </div>
        )}
      </Page>
    </div>
  );
}

function PhaseDots({ phase }: { phase: DiagState['phase'] }) {
  const phases: DiagState['phase'][] = ['walk', 'sweep', 'grammar'];
  const idx = phases.indexOf(phase);
  return (
    <div className="mb-4 flex gap-1.5" aria-hidden>
      {phases.map((ph, i) => <div key={ph} className={`h-1.5 flex-1 rounded-full ${i <= idx ? 'bg-accent' : 'bg-surface-2'}`} />)}
    </div>
  );
}

function BandChart({ outcomes }: { outcomes: Record<number, string> }) {
  const colour = (o: string) => (o === 'passed' || o === 'assumed' ? 'bg-good' : o === 'failed' ? 'bg-bad' : 'bg-line');
  return (
    <Card>
      <h2 className="mb-2 font-semibold">Vocabulary bands (easy → hard)</h2>
      <div className="flex gap-1">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((b) => (
          <div key={b} className="flex flex-1 flex-col items-center gap-1">
            <div className={`h-8 w-full rounded ${colour(outcomes[b])}`} title={outcomes[b]} />
            <span className="text-[10px] text-ink-3">{b}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-3">Green: known · Red: gaps found · Grey: not reached (treated as gaps)</p>
    </Card>
  );
}
