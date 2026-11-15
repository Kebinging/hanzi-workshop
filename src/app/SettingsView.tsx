import { useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { getSettings, updateSettings } from '../db/db';
import {
  createBackup, deliverBackup, listSnapshots, mergeBackup, restoreBackup, restoreSnapshot, validateBackup,
  type BackupFile, type BackupSummary,
} from '../db/backup';
import { content } from '../content';
import { Button, Card, Page, TopBar } from '../ui/kit';
import type { Settings } from '../state/types';

export function SettingsView({ onBack, onRecalibrate }: { onBack: () => void; onRecalibrate: () => void }) {
  const settings = useLiveQuery(() => getSettings(), []);
  const snapshots = useLiveQuery(() => listSnapshots(), []);
  const [persisted, setPersisted] = useState<boolean | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, setPending] = useState<{ file: BackupFile; summary: BackupSummary } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void navigator.storage?.persisted?.().then(setPersisted).catch(() => setPersisted(null));
  }, []);

  if (!settings) return null;
  const set = (patch: Partial<Settings>) => void updateSettings(patch);

  const doExport = async () => {
    const file = await createBackup(content.version);
    const how = await deliverBackup(file);
    if (how !== 'cancelled') {
      await updateSettings({ lastBackupAt: file.exportedAt });
      setMsg(how === 'shared' ? 'Backup shared.' : 'Backup downloaded.');
    }
  };

  const onPick = async (f: File | undefined) => {
    if (!f) return;
    try {
      const v = await validateBackup(JSON.parse(await f.text()));
      if (!v.ok) { setMsg(v.error); return; }
      setPending({ file: v.file, summary: v.summary });
    } catch {
      setMsg('Could not read that file.');
    }
  };

  const doImport = async (mode: 'merge' | 'replace') => {
    if (!pending) return;
    if (mode === 'merge') await mergeBackup(pending.file);
    else await restoreBackup(pending.file);
    setPending(null);
    setMsg(mode === 'merge'
      ? 'Backup merged — for each item the most recent progress was kept. You can undo this below.'
      : 'Backup restored. You can undo this below.');
  };

  const undo = async (id: number) => {
    await restoreSnapshot(id);
    setMsg('Restored the data from before that import.');
  };

  return (
    <div className="min-h-dvh">
      <TopBar title="Settings" onBack={onBack} />
      <Page>
        <div className="space-y-4">
          <Card>
            <h2 className="mb-3 font-semibold">Daily pace</h2>
            <Stepper label="New words per day" value={settings.newWordsPerDay} min={4} max={30} onChange={(v) => set({ newWordsPerDay: v })} />
            <p className="mt-2 text-xs text-ink-3">Includes foundation gaps (max 8/day). New items pause automatically if reviews pile up.</p>
          </Card>

          <Card>
            <h2 className="mb-3 font-semibold">Display</h2>
            <Stepper label="Character size" value={settings.hanziSizePx} min={18} max={32} step={2} suffix="px" onChange={(v) => set({ hanziSizePx: v })} />
            <div className="mt-3 flex items-center justify-between">
              <span>Theme</span>
              <div className="flex gap-1 rounded-xl bg-surface-2 p-1">
                {(['system', 'light', 'dark'] as const).map((t) => (
                  <button key={t} type="button" onClick={() => set({ theme: t })}
                    className={`min-h-10 rounded-lg px-3 text-sm capitalize ${settings.theme === t ? 'bg-surface font-medium shadow-sm' : 'text-ink-3'}`}>{t}</button>
                ))}
              </div>
            </div>
            <p className="han mt-3 text-ink-2" style={{ fontSize: settings.hanziSizePx }}>我刚才在图书馆看书。</p>
          </Card>

          <Card>
            <h2 className="mb-1 font-semibold">Backup</h2>
            <p className="mb-3 text-sm text-ink-3">
              Everything lives only on this phone. {settings.lastBackupAt ? `Last backup: ${new Date(settings.lastBackupAt).toLocaleString()}.` : 'No backup yet.'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => void doExport()}>Export</Button>
              <Button variant="secondary" onClick={() => fileInput.current?.click()}>Import…</Button>
            </div>
            <input ref={fileInput} type="file" accept="application/json,.json" className="hidden" onChange={(e) => { void onPick(e.target.files?.[0]); e.target.value = ''; }} />
            {pending && (
              <div className="mt-3 rounded-xl bg-warn-soft p-3 text-sm text-warn">
                <p className="font-medium">Import this backup?</p>
                <p className="mt-1">{pending.summary.cards} cards · {pending.summary.reviews} reviews · exported {new Date(pending.summary.exportedAt).toLocaleString()}</p>
                <p className="mt-1 text-xs">Merge keeps the most recent progress from both; Replace swaps everything for the backup.</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <Button variant="secondary" onClick={() => setPending(null)}>Cancel</Button>
                  <Button onClick={() => void doImport('merge')}>Merge</Button>
                  <Button variant="danger" onClick={() => void doImport('replace')}>Replace</Button>
                </div>
              </div>
            )}
            {snapshots && snapshots.length > 0 && (
              <div className="mt-4 border-t border-line pt-3">
                <h3 className="mb-1 text-sm font-semibold">Undo an import</h3>
                <ul className="space-y-2">
                  {snapshots.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-ink-2">Before import on {new Date(s.ts).toLocaleString()} · {s.cards} cards</span>
                      <Button variant="secondary" className="!min-h-10 !px-3 !py-1 text-sm" onClick={() => void undo(s.id)}>Restore</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {msg && <p className="mt-3 text-sm text-ink-2" role="status">{msg}</p>}
            <p className="mt-3 text-xs text-ink-3">
              Storage protection: {persisted === null ? 'unknown' : persisted ? 'on — the browser won’t clear your data' : 'off — install the app to your home screen to enable it'}.
            </p>
          </Card>

          <Card>
            <h2 className="mb-1 font-semibold">Recalibrate</h2>
            <p className="mb-3 text-sm text-ink-3">Re-run the HSK 1–2 check. Words you've already reviewed 3+ times keep their history.</p>
            <Button variant="secondary" className="w-full" onClick={onRecalibrate}>Run calibration again</Button>
          </Card>

          <Card>
            <h2 className="mb-1 font-semibold">About</h2>
            <p className="text-sm text-ink-3">
              Content v{content.version}. Word lists, glosses, character breakdowns and grammar notes were compiled for this app and are
              marked provisional until checked against an official HSK list. Works fully offline; nothing is sent anywhere.
            </p>
          </Card>
        </div>
      </Page>
    </div>
  );
}

function Stepper({ label, value, min, max, step = 1, suffix = '', onChange }: {
  label: string; value: number; min: number; max: number; step?: number; suffix?: string; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        <button type="button" className="h-11 w-11 rounded-full bg-surface-2 text-xl disabled:opacity-40" disabled={value <= min} onClick={() => onChange(Math.max(min, value - step))} aria-label={`Decrease ${label}`}>−</button>
        <span className="w-14 text-center tabular-nums">{value}{suffix}</span>
        <button type="button" className="h-11 w-11 rounded-full bg-surface-2 text-xl disabled:opacity-40" disabled={value >= max} onClick={() => onChange(Math.min(max, value + step))} aria-label={`Increase ${label}`}>+</button>
      </div>
    </div>
  );
}
