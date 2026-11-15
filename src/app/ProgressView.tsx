import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { content } from '../content';
import { computeStats } from './stats';
import { DAY } from '../srs/fsrs';
import { Bar, Card, Page, TopBar } from '../ui/kit';

const CODE_LABEL: Record<string, string> = {
  'ORTHO.LOOKALIKE': 'Look-alike characters',
  'ORTHO.HOMOPHONE': 'Same-sound characters',
  'ORTHO.ANTONYM_FORM': 'Paired forms (买/卖)',
  'LEX.MEANING': 'Word meaning',
  'META.DONT_KNOW': '"I don\'t know"',
};

export function ProgressView({ onBack }: { onBack: () => void }) {
  const data = useLiveQuery(async () => {
    const now = Date.now();
    const [cards, reviews, errors, diag] = await Promise.all([
      db.cards.toArray(), db.reviews.toArray(), db.errors.where('ts').above(now - 30 * DAY).toArray(), db.diagnostic.get('latest'),
    ]);
    return { stats: computeStats(cards, reviews, content, now), errors, diag, reviews30: reviews.filter((r) => r.ts > now - 30 * DAY).length };
  }, []);
  if (!data) return null;
  const { stats, errors, diag } = data;
  const counts = new Map<string, number>();
  for (const e of errors) for (const c of e.codes) counts.set(c, (counts.get(c) ?? 0) + 1);
  const pct = (x: number | null) => (x === null ? '—' : `${Math.round(x * 100)}%`);

  return (
    <div className="min-h-dvh">
      <TopBar title="Progress" onBack={onBack} />
      <Page>
        <div className="space-y-4">
          <Card>
            <Row label="Words known" value={stats.wordsKnown} max={stats.wordsTarget} />
            <Row label="Characters recognised" value={stats.charsRecognised} max={stats.charsTarget} />
            <Row label="Grammar points mastered" value={stats.grammarMastered} max={stats.grammarTarget} />
            <p className="mt-2 text-xs text-ink-3">Counts only what your review history says you'd recall today. Grammar mastery needs both form and use stable for 21+ days (grammar drills arrive in the next update).</p>
          </Card>
          <Card>
            <h2 className="mb-2 font-semibold">True retention (30 days)</h2>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div><div className="text-2xl font-semibold">{pct(stats.retention30d.lexical)}</div><div className="text-xs text-ink-3">words · target 90%</div></div>
              <div><div className="text-2xl font-semibold">{pct(stats.retention30d.syntactic)}</div><div className="text-xs text-ink-3">grammar · target 88%</div></div>
            </div>
            <p className="mt-2 text-xs text-ink-3">{data.reviews30} answers in the last 30 days. Shown once there are 10+ mature reviews.</p>
          </Card>
          <Card>
            <h2 className="mb-2 font-semibold">Mistake types (30 days)</h2>
            {counts.size === 0 ? <p className="text-sm text-ink-3">No mistakes logged yet.</p> : (
              <ul className="space-y-1">
                {[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([code, n]) => (
                  <li key={code} className="flex justify-between text-sm"><span>{CODE_LABEL[code] ?? code}</span><span className="tabular-nums text-ink-3">{n}</span></li>
                ))}
              </ul>
            )}
          </Card>
          {diag && (
            <Card>
              <h2 className="font-semibold">Calibration</h2>
              <p className="text-sm text-ink-2">{new Date(diag.ts).toLocaleDateString()}: {diag.knownWords} known, {diag.bridgeWords} foundation gaps.</p>
            </Card>
          )}
        </div>
      </Page>
    </div>
  );
}

function Row({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm"><span>{label}</span><span className="tabular-nums text-ink-3">{value} / {max}</span></div>
      <Bar value={value} max={max} className="mt-1" />
    </div>
  );
}
