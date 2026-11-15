/** Mastery metrics (spec 1.6). Pure. */
import type { Content } from '../content';
import type { FSRSCardState, ReviewLog } from '../state/types';
import { buildExposurePool } from '../gate/pool';
import { DAY } from '../srs/fsrs';
import { exerciseFor } from '../srs/session';

export interface Stats {
  wordsKnown: number;
  wordsTarget: number;
  charsRecognised: number;
  charsTarget: number;
  grammarMastered: number;
  grammarTarget: number;
  dueNow: number;
  newWaiting: number;
  bridgeWaiting: number;
  retention30d: { lexical: number | null; syntactic: number | null };
  unitProgress: { unit: number; known: number; total: number }[];
}

export function computeStats(cards: FSRSCardState[], reviews: ReviewLog[], c: Content, now: number): Stats {
  const pool = buildExposurePool(cards, now);
  const byId = new Map(cards.map((x) => [x.id, x]));
  const level3 = c.bundle.syllabus.levels.find((l) => l.level === 3);

  let charsRecognised = 0;
  for (const ch of c.bundle.chars) {
    const words = c.wordsByChar.get(ch.id) ?? [];
    const known = words.filter((w) => pool.has(w.id)).length;
    const form = byId.get(`char.form:${ch.id}`);
    if (known >= Math.min(2, words.length) || form?.state === 2) charsRecognised++;
  }

  const gramStable = (itemId: string) =>
    ['gram.form', 'gram.use'].every((f) => (byId.get(`${f}:${itemId}`)?.stability ?? 0) >= 21);
  const grammarMastered = c.bundle.grammar.filter((g) => gramStable(g.id)).length;

  const since = now - 30 * DAY;
  const ret = (track: 'lexical' | 'syntactic') => {
    const rs = reviews.filter((r) => r.ts >= since && r.stateBefore === 2 && (track === 'syntactic') === r.cardId.startsWith('gram.'));
    return rs.length < 10 ? null : rs.filter((r) => r.rating > 1).length / rs.length;
  };

  const units = c.bundle.syllabus.units.filter((u) => u.available).map((u) => {
    const words = c.unitWords(u.unit);
    return { unit: u.unit, known: words.filter((w) => pool.has(w.id)).length, total: words.length };
  });

  return {
    wordsKnown: pool.size,
    wordsTarget: level3?.cumulativeWords ?? 1000,
    charsRecognised,
    charsTarget: level3?.cumulativeChars ?? 587,
    grammarMastered,
    grammarTarget: level3?.grammarPoints ?? 96,
    dueNow: cards.filter((x) => !x.suspended && x.state !== 0 && x.due <= now && exerciseFor(x)).length,
    newWaiting: cards.filter((x) => x.state === 0 && exerciseFor(x) && x.origin !== 'bridge').length,
    bridgeWaiting: cards.filter((x) => x.state === 0 && exerciseFor(x) && x.origin === 'bridge').length,
    retention30d: { lexical: ret('lexical'), syntactic: ret('syntactic') },
    unitProgress: units,
  };
}
