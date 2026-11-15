import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { WorkshopDB } from './db';
import { createBackup, restoreBackup, validateBackup } from './backup';
import { newCard, seededReviewCard } from '../srs/fsrs';

const NOW = Date.UTC(2026, 10, 15, 10);

describe('backup round-trip (spec 5.6)', () => {
  it('export -> wipe -> import restores identical state, with a snapshot kept', async () => {
    const d = new WorkshopDB('test-backup');
    await d.cards.bulkPut([newCard('word.recog', 'w_gang', 'curriculum', NOW), seededReviewCard('word.recog', 'w_ai', 'diagnostic', NOW, 30, 10)]);
    await d.reviews.add({ cardId: 'word.recog:w_ai', ts: NOW, rating: 3, stateBefore: 2, stabilityBefore: 30, difficultyBefore: 4, elapsedDays: 1, exerciseKind: 'recognition', instanceId: 'x', latencyMs: 2000, peeks: 0 });
    const file = await createBackup('v1', d, NOW);
    const before = JSON.stringify(file.tables);

    await d.cards.clear();
    await d.reviews.clear();
    await d.cards.add(newCard('word.recog', 'junk', 'bridge', NOW));

    const v = await validateBackup(JSON.parse(JSON.stringify(file)));
    expect(v.ok).toBe(true);
    if (!v.ok) return;
    expect(v.summary.cards).toBe(2);
    await restoreBackup(v.file, d, NOW + 1);
    const after = await createBackup('v1', d, NOW);
    expect(JSON.stringify(after.tables)).toBe(before);
    expect(await d.snapshots.count()).toBe(1);
  });

  it('rejects tampered or foreign files', async () => {
    const d = new WorkshopDB('test-backup-2');
    const file = await createBackup('v1', d, NOW);
    const tampered = { ...file, tables: { ...file.tables, cards: [newCard('word.recog', 'x', 'bridge', NOW)] } };
    expect((await validateBackup(tampered)).ok).toBe(false);
    expect((await validateBackup({ hello: 1 })).ok).toBe(false);
  });
});

describe('merge and undo (spec 5.6)', () => {
  it('merge keeps the most recently reviewed card and unions logs', async () => {
    const { mergeTables } = await import('./backup');
    const d = new WorkshopDB('test-merge');
    const older = { ...seededReviewCard('word.recog', 'w_ai', 'diagnostic', NOW - 1000, 30, 10) };
    const newer = { ...seededReviewCard('word.recog', 'w_ai', 'diagnostic', NOW, 40, 20) };
    const onlyThere = newCard('word.recog', 'w_gang', 'curriculum', NOW);
    await d.cards.put(older);
    await d.reviews.add({ cardId: older.id, ts: NOW - 1000, rating: 3, stateBefore: 2, stabilityBefore: 1, difficultyBefore: 5, elapsedDays: 1, exerciseKind: 'recognition', instanceId: 'a', latencyMs: 1, peeks: 0 });
    const mine = (await createBackup('v', d, NOW)).tables;
    const theirs = { ...mine, cards: [newer, onlyThere], reviews: [
      { ...mine.reviews[0] },
      { cardId: newer.id, ts: NOW, rating: 4 as const, stateBefore: 2 as const, stabilityBefore: 30, difficultyBefore: 4, elapsedDays: 1, exerciseKind: 'recognition' as const, instanceId: 'b', latencyMs: 1, peeks: 0 },
    ] };
    const merged = mergeTables(mine, theirs);
    expect(merged.cards.find((c) => c.id === older.id)!.stability).toBe(40);
    expect(merged.cards).toHaveLength(2);
    expect(merged.reviews).toHaveLength(2);
  });

  it('an import can be undone from its snapshot', async () => {
    const { listSnapshots, restoreSnapshot } = await import('./backup');
    const d = new WorkshopDB('test-undo');
    await d.cards.put(newCard('word.recog', 'w_keep', 'curriculum', NOW));
    const other = new WorkshopDB('test-undo-src');
    await other.cards.put(newCard('word.recog', 'w_other', 'curriculum', NOW));
    await restoreBackup(await createBackup('v', other, NOW), d, NOW + 1);
    expect((await d.cards.toArray()).map((c) => c.itemId)).toEqual(['w_other']);
    const [snap] = await listSnapshots(d);
    await restoreSnapshot(snap.id, d, NOW + 2);
    expect((await d.cards.toArray()).map((c) => c.itemId)).toEqual(['w_keep']);
  });
});
