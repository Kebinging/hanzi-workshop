import { useLiveQuery } from 'dexie-react-hooks';
import { db, getSettings } from '../db/db';
import { content } from '../content';
import { computeStats } from './stats';
import { DAY } from '../srs/fsrs';
import { Bar, Button, Card, Page } from '../ui/kit';
import type { Route } from './App';

export function HomeView({ go }: { go: (r: Route) => void }) {
  const data = useLiveQuery(async () => {
    const [cards, reviews, settings, errors] = await Promise.all([
      db.cards.toArray(), db.reviews.toArray(), getSettings(), db.errors.where('ts').above(Date.now() - 30 * DAY).toArray(),
    ]);
    return { stats: computeStats(cards, reviews, content, Date.now()), settings, hasCards: cards.length > 0, errors };
  }, []);
  if (!data) return null;
  const { stats, settings } = data;
  const backupStale = data.hasCards && (!settings.lastBackupAt || Date.now() - settings.lastBackupAt > settings.backupReminderDays * DAY);
  const unit = stats.unitProgress[stats.unitProgress.length - 1];
  const unitInfo = content.bundle.syllabus.units.find((u) => u.unit === unit?.unit);

  return (
    <Page>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h1 className="han text-3xl font-semibold">汉字工坊</h1>
          <p className="text-sm text-ink-3">HSK 3 reading & grammar</p>
        </div>
        <button type="button" onClick={() => go('settings')} className="flex h-11 w-11 items-center justify-center rounded-full active:bg-surface-2" aria-label="Settings">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
        </button>
      </div>

      {backupStale && (
        <button type="button" onClick={() => go('settings')} className="mb-4 w-full rounded-xl bg-warn-soft px-4 py-3 text-left text-sm text-warn">
          {settings.lastBackupAt ? `Last backup ${Math.floor((Date.now() - settings.lastBackupAt) / DAY)} days ago.` : 'No backup yet.'} Tap to export one.
        </button>
      )}

      <Card className="mb-4">
        <div className="flex items-baseline justify-between">
          <span className="text-ink-2">Due now</span>
          <span className="text-3xl font-semibold tabular-nums">{stats.dueNow}</span>
        </div>
        <p className="mt-1 text-sm text-ink-3">
          {stats.newWaiting + stats.bridgeWaiting > 0
            ? `${stats.newWaiting} new items and ${stats.bridgeWaiting} foundation gaps waiting (up to ${settings.newWordsPerDay} words + ${settings.newGrammarPerDay} grammar point a day).`
            : 'No new items waiting.'}
        </p>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <Button onClick={() => go('session')}>Start session</Button>
          <Button variant="secondary" onClick={() => go('flight')} aria-label="Long offline session">✈ Flight</Button>
        </div>
      </Card>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <Metric label="words" value={stats.wordsKnown} max={stats.wordsTarget} />
        <Metric label="characters" value={stats.charsRecognised} max={stats.charsTarget} />
        <Metric label="grammar" value={stats.grammarMastered} max={stats.grammarTarget} />
      </div>

      {unit && unitInfo && (
        <Card className="mb-4">
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">Unit {unit.unit} · <span className="han">{unitInfo.titleZh}</span></span>
            <span className="text-sm tabular-nums text-ink-3">{unit.known}/{unit.total} words</span>
          </div>
          <p className="text-sm text-ink-3">{unitInfo.theme}</p>
          <Bar value={unit.known} max={unit.total} className="mt-2" />
        </Card>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary" onClick={() => go('progress')}>Progress</Button>
        <Button variant="secondary" onClick={() => go('grammar')}>Grammar</Button>
      </div>
    </Page>
  );
}

function Metric({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <Card className="!p-3">
      <div className="text-xl font-semibold tabular-nums">{value}<span className="text-xs font-normal text-ink-3">/{max}</span></div>
      <div className="text-xs text-ink-3">{label}</div>
      <Bar value={value} max={max} className="mt-2" />
    </Card>
  );
}
