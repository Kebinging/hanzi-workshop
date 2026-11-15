import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { content } from '../content';
import { gradeQuestion, passageStatus, queueBlockingWords, xrayLayout } from './reading';
import { newCard, seededReviewCard } from '../srs/fsrs';
import { WorkshopDB } from '../db/db';
import { createBackup, validateBackup, restoreBackup, sha256 } from '../db/backup';

const NOW = Date.UTC(2026, 10, 20);
const passage = (id: string) => content.bundle.passages.find((p) => p.id === id)!;
const unitPool = (unit: number) => new Set(content.vocab.filter((w) => w.hsk <= 2 || (w.unit ?? 99) <= unit).map((w) => w.id));

describe('passages (spec 3.5)', () => {
  it('every passage is open once its unit is learned, and locked with only HSK 1–2', () => {
    for (const p of content.bundle.passages) {
      expect(passageStatus(p, unitPool(p.unit)).locked, p.id).toBe(false);
    }
    const st = passageStatus(passage('U06-B'), unitPool(0));
    expect(st.locked).toBe(true);
    expect(st.needed).toBeGreaterThan(0);
    expect(st.needed).toBeLessThanOrEqual(st.blocking.length);
  });

  it('learning the "needed" blockers is enough to unlock', () => {
    const p = passage('U04-A');
    const pool = unitPool(3);
    const st = passageStatus(p, pool);
    const after = new Set([...pool, ...st.blocking.slice(0, st.needed)]);
    expect(passageStatus(p, after).locked).toBe(false);
  });

  it('grades single-answer and sequence questions', () => {
    const q = passage('U01-A').questions[0];
    expect(gradeQuestion(q, q.answer)).toBe(true);
    expect(gradeQuestion(q, [1])).toBe(false);
    const seq = passage('U02-A').questions.find((x) => x.type === 'sequence')!;
    expect(gradeQuestion(seq, seq.answer)).toBe(true);
    expect(gradeQuestion(seq, [...seq.answer].reverse())).toBe(false);
  });

  it('every question has its evidence inside the passage', () => {
    for (const p of content.bundle.passages) {
      for (const q of p.questions) for (const e of q.evidence) {
        expect(e.end, q.id).toBeLessThanOrEqual(p.paragraphs[e.paragraph].tokens.length);
      }
    }
  });

  it('x-ray layout marks clauses, pairs, modifiers and heads', () => {
    const para = passage('U02-A').paragraphs[0];
    const lay = xrayLayout(para.tokens, para.chunks);
    expect(new Set(lay.map((x) => x.clause)).size).toBeGreaterThan(2);
    expect(lay.filter((x) => x.pairId === '1').map((x) => x.token.t)).toEqual(['一', '就']);
    const p1 = passage('U01-A').paragraphs[0];
    const l1 = xrayLayout(p1.tokens, p1.chunks);
    const head = l1.find((x) => x.head)!;
    expect(head.token.t).toBe('妹妹');
  });

  it('queueing blockers creates or boosts cards', () => {
    const existingNew = newCard('word.recog', 'w_a', 'curriculum', NOW, 1);
    const learned = seededReviewCard('word.recog', 'w_b', 'curriculum', NOW, 5, 9);
    const out = queueBlockingWords(['w_a', 'w_b', 'w_c'], new Map([[existingNew.id, existingNew], [learned.id, learned]]), NOW);
    expect(out[0].priority).toBe(1_000_000);
    expect(out[1].due).toBe(NOW);
    expect(out[2].state).toBe(0);
  });
});

describe('backup schema v2', () => {
  it('imports a v1 backup that has no reading/drill tables', async () => {
    const d = new WorkshopDB('test-v1-import');
    await d.reading.add({ passageId: 'U01-A', ts: NOW, correct: 3, total: 4, usedXray: false });
    const file = await createBackup('v', d, NOW);
    const { reading: _r, drills: _d, ...v1Tables } = file.tables;
    const v1 = { ...file, schemaVersion: 1, tables: v1Tables, checksum: await sha256(JSON.stringify(v1Tables)) };
    const v = await validateBackup(JSON.parse(JSON.stringify(v1)));
    expect(v.ok).toBe(true);
    if (!v.ok) return;
    await restoreBackup(v.file, d, NOW);
    expect(await d.reading.count()).toBe(0);
  });
});
