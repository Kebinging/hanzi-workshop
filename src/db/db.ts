import Dexie, { type EntityTable } from 'dexie';
import type {
  FSRSCardState, ReviewLog, ErrorLog, PeekEvent, WeaknessState, DiagnosticResult,
  Settings, SessionRecord, Snapshot, ReadingRecord, DrillRecord,
} from '../state/types';
import { DEFAULT_SETTINGS } from '../state/types';

export class WorkshopDB extends Dexie {
  cards!: EntityTable<FSRSCardState, 'id'>;
  reviews!: EntityTable<ReviewLog, 'id'>;
  errors!: EntityTable<ErrorLog, 'id'>;
  peeks!: EntityTable<PeekEvent, 'id'>;
  weakness!: EntityTable<WeaknessState, 'code'>;
  diagnostic!: EntityTable<DiagnosticResult, 'id'>;
  settings!: EntityTable<Settings, 'id'>;
  sessions!: EntityTable<SessionRecord, 'id'>;
  snapshots!: EntityTable<Snapshot, 'id'>;
  reading!: EntityTable<ReadingRecord, 'id'>;
  drills!: EntityTable<DrillRecord, 'id'>;

  constructor(name = 'hanzi-workshop') {
    super(name);
    this.version(1).stores({
      cards: 'id, itemId, track, facet, due, state, origin',
      reviews: '++id, cardId, ts',
      errors: '++id, ts, *codes, *itemIds',
      peeks: '++id, ts, wordId',
      weakness: 'code, score',
      diagnostic: 'id',
      settings: 'id',
      sessions: '++id, startedAt',
      snapshots: '++id, ts',
    });
    // v2 (M3): reading results and remedial drills.
    this.version(2).stores({
      reading: '++id, passageId, ts',
      drills: '++id, code, ts',
    });
  }
}

export const db = new WorkshopDB();

export async function getSettings(d: WorkshopDB = db): Promise<Settings> {
  const s = await d.settings.get('singleton');
  return { ...DEFAULT_SETTINGS, ...s, retention: { ...DEFAULT_SETTINGS.retention, ...s?.retention } };
}

export async function updateSettings(patch: Partial<Settings>, d: WorkshopDB = db): Promise<void> {
  const cur = await getSettings(d);
  await d.settings.put({ ...cur, ...patch, id: 'singleton' });
}

/** Ask the browser not to evict our storage. Installed PWAs on Android are normally granted. */
export async function requestPersistence(): Promise<boolean> {
  try {
    if (!navigator.storage?.persist) return false;
    if (await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}
