/** JSON backup / restore (spec 5.6). */
import { db, type WorkshopDB } from './db';
import type {
  DiagnosticResult, DrillRecord, ErrorLog, FSRSCardState, PeekEvent, ReadingRecord, ReviewLog, SessionRecord, Settings, WeaknessState,
} from '../state/types';

export const BACKUP_FORMAT = 'hsk3-workshop-backup';
export const SCHEMA_VERSION = 2;

export interface BackupTables {
  cards: FSRSCardState[];
  reviews: ReviewLog[];
  errors: ErrorLog[];
  peeks: PeekEvent[];
  weakness: WeaknessState[];
  diagnostic: DiagnosticResult[];
  settings: Settings[];
  sessions: SessionRecord[];
  reading: ReadingRecord[];
  drills: DrillRecord[];
}

export interface BackupFile {
  format: typeof BACKUP_FORMAT;
  schemaVersion: number;
  contentVersion: string;
  exportedAt: number;
  tables: BackupTables;
  checksum: string;
}

const TABLES: (keyof BackupTables)[] = ['cards', 'reviews', 'errors', 'peeks', 'weakness', 'diagnostic', 'settings', 'sessions', 'reading', 'drills'];
/** Tables added after schema v1; an older backup simply has none of these rows. */
const V2_TABLES: (keyof BackupTables)[] = ['reading', 'drills'];

export async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function readTables(d: WorkshopDB): Promise<BackupTables> {
  const out = {} as BackupTables;
  for (const t of TABLES) (out as unknown as Record<string, unknown[]>)[t] = await d.table(t).toArray();
  return out;
}

export async function createBackup(contentVersion: string, d: WorkshopDB = db, now = Date.now()): Promise<BackupFile> {
  const tables = await readTables(d);
  return {
    format: BACKUP_FORMAT, schemaVersion: SCHEMA_VERSION, contentVersion, exportedAt: now, tables,
    checksum: await sha256(JSON.stringify(tables)),
  };
}

export interface BackupSummary { cards: number; reviews: number; lastReview?: number; exportedAt: number }

export async function validateBackup(raw: unknown): Promise<{ ok: true; file: BackupFile; summary: BackupSummary } | { ok: false; error: string }> {
  const f = raw as Partial<BackupFile>;
  if (!f || typeof f !== 'object' || f.format !== BACKUP_FORMAT) return { ok: false, error: 'This is not a Hanzi Workshop backup file.' };
  if (typeof f.schemaVersion !== 'number' || f.schemaVersion > SCHEMA_VERSION) {
    return { ok: false, error: 'This backup was made by a newer version of the app.' };
  }
  const required = f.schemaVersion >= 2 ? TABLES : TABLES.filter((t) => !V2_TABLES.includes(t));
  if (!f.tables || required.some((t) => !Array.isArray((f.tables as unknown as Record<string, unknown>)[t]))) {
    return { ok: false, error: 'The backup is missing data tables.' };
  }
  if ((await sha256(JSON.stringify(f.tables))) !== f.checksum) {
    return { ok: false, error: 'Checksum mismatch — the file is damaged or was edited.' };
  }
  // Migrate v1 backups: add the tables that didn't exist yet.
  for (const t of V2_TABLES) {
    const tables = f.tables as unknown as Record<string, unknown[]>;
    if (!Array.isArray(tables[t])) tables[t] = [];
  }
  const reviews = f.tables.reviews;
  return {
    ok: true,
    file: f as BackupFile,
    summary: {
      cards: f.tables.cards.length, reviews: reviews.length,
      lastReview: reviews.reduce<number | undefined>((m, r) => (m === undefined || r.ts > m ? r.ts : m), undefined),
      exportedAt: f.exportedAt ?? 0,
    },
  };
}

/** Replace all user data with the backup. A snapshot of the current state is kept first (last 3). */
export async function restoreBackup(file: BackupFile, d: WorkshopDB = db, now = Date.now()): Promise<void> {
  const current = await createBackup(file.contentVersion, d, now);
  await d.transaction('rw', [...TABLES.map((t) => d.table(t)), d.snapshots], async () => {
    await d.snapshots.add({ ts: now, reason: 'before-import', payload: JSON.stringify(current) });
    const old = await d.snapshots.orderBy('ts').toArray();
    for (const s of old.slice(0, Math.max(0, old.length - 3))) await d.snapshots.delete(s.id!);
    for (const t of TABLES) {
      await d.table(t).clear();
      await d.table(t).bulkPut((file.tables as unknown as Record<string, unknown[]>)[t] ?? []);
    }
  });
}

export function backupFilename(now = Date.now()): string {
  const d = new Date(now);
  const p = (n: number) => String(n).padStart(2, '0');
  return `hsk3-backup-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.json`;
}

/** Android share sheet when available (save to Files/Drive), else a plain download. */
export async function deliverBackup(file: BackupFile): Promise<'shared' | 'downloaded' | 'cancelled'> {
  const name = backupFilename(file.exportedAt);
  const blob = new Blob([JSON.stringify(file)], { type: 'application/json' });
  const shareFile = new File([blob], name, { type: 'application/json' });
  if (navigator.canShare?.({ files: [shareFile] })) {
    try {
      await navigator.share({ files: [shareFile], title: name });
      return 'shared';
    } catch (e) {
      if ((e as DOMException).name === 'AbortError') return 'cancelled';
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  return 'downloaded';
}
