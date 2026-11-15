import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { content } from '../content';
import { computeStats } from './stats';
import { DAY } from '../srs/fsrs';
import { Bar, Card, Page, TopBar } from '../ui/kit';
import { errorInfo } from '../ui/grammarKit';
import { TRIGGER_ITEMS, TRIGGER_SCORE, triggeredCodes, weaknessAt, weaknessSeries } from '../errors/weakness';

export function ProgressView({ onBack }: { onBack: () => void }) {
  const data = useLiveQuery(async () => {
    const now = Date.now();
    const [cards, reviews, errors, drills, reading, diag] = await Promise.all([
      db.cards.toArray(), db.reviews.toArray(), db.errors.toArray(), db.drills.toArray(), db.reading.toArray(), db.diagnostic.get('latest'),
    ]);
    const all = weaknessAt(errors, reviews, drills, content, now);
    const dueDrills = new Set(triggeredCodes(all, drills, now).map((w) => w.code));
    const scores = [...all.values()]
      .filter((w) => w.score >= 0.3)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((w) => ({ ...w, due: dueDrills.has(w.code), series: weaknessSeries(w.code, errors, reviews, drills, content, now) }));
    const passagesRead = new Set(reading.map((r) => r.passageId)).size;
    const clean = new Set(reading.filter((r) => !r.usedXray).map((r) => r.passageId)).size;
    return {
      stats: computeStats(cards, reviews, content, now), scores, diag, passagesRead, clean,
      reviews30: reviews.filter((r) => r.ts > now - 30 * DAY).length,
    };
  }, []);
  if (!data) return null;
  const { stats, scores, diag } = data;
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
            <Row label="Passages read" value={data.passagesRead} max={content.bundle.passages.length} />
            <p className="mt-2 text-xs text-ink-3">
              Counts only what your review history says you'd recall today. Grammar mastery needs building and choosing stable for 21+ days.
              {data.clean > 0 && ` ${data.clean} passage${data.clean === 1 ? '' : 's'} read without X-ray.`}
            </p>
          </Card>

          <Card>
            <h2 className="mb-1 font-semibold">Weakness map</h2>
            <p className="mb-3 text-xs text-ink-3">Recent mistakes by type, fading over about 10 days. A focus drill starts when a type reaches {TRIGGER_SCORE} across {TRIGGER_ITEMS}+ different sentences.</p>
            {scores.length === 0 ? <p className="text-sm text-ink-3">Nothing stands out right now.</p> : (
              <ul className="space-y-3">
                {scores.map((w) => {
                  const due = w.due;
                  return (
                    <li key={w.code}>
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="min-w-0 truncate">{errorInfo(w.code)?.title ?? w.code}</span>
                        <span className="flex shrink-0 items-center gap-2">
                          {due && <span className="rounded-full bg-warn-soft px-2 py-0.5 text-[11px] text-warn">drill next session</span>}
                          <Sparkline values={w.series} />
                          <span className="w-8 text-right tabular-nums text-ink-3">{w.score.toFixed(1)}</span>
                        </span>
                      </div>
                      <Bar value={Math.min(w.score, 5)} max={5} className="mt-1" />
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>

          <Card>
            <h2 className="mb-2 font-semibold">True retention (30 days)</h2>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div><div className="text-2xl font-semibold">{pct(stats.retention30d.lexical)}</div><div className="text-xs text-ink-3">words · target 90%</div></div>
              <div><div className="text-2xl font-semibold">{pct(stats.retention30d.syntactic)}</div><div className="text-xs text-ink-3">grammar · target 88%</div></div>
            </div>
            <p className="mt-2 text-xs text-ink-3">{data.reviews30} answers in the last 30 days. Shown once there are 10+ mature reviews.</p>
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

/** 30-day trend of a weakness score. */
function Sparkline({ values }: { values: number[] }) {
  const w = 60;
  const h = 18;
  const max = Math.max(1, ...values);
  const pts = values.map((v, i) => `${(i / Math.max(1, values.length - 1)) * w},${h - (v / max) * (h - 2) - 1}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-label="30-day trend" className="text-ink-3">
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
