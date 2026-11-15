/** Reading passages: lock state (gate G5), grading, X-ray layout, unlock queueing. */
import type { Content } from '../content';
import type { ChunkAnnotation, PassageQuestion, ReadingPassage, Token } from '../content/types';
import type { FSRSCardState } from '../state/types';
import { checkCoverage } from '../gate/coverage';
import { buildExposurePool } from '../gate/pool';
import { newCard } from '../srs/fsrs';
import { unlockedUnits } from '../srs/session';

export const PASSAGE_THRESHOLD = 0.95;
export const QUEUE_PRIORITY = 1_000_000;

/** Exposure pool including rule 3: words of completed units (those whose next unit is unlocked). */
export function readingPool(cards: FSRSCardState[], content: Content, now: number): Set<string> {
  const base = buildExposurePool(cards, now);
  const units = unlockedUnits(cards, content, base);
  const completed = new Set(units.slice(0, -1).flatMap((u) => content.unitWords(u).map((w) => w.id)));
  return buildExposurePool(cards, now, completed);
}

export interface PassageStatus {
  locked: boolean;
  ratio: number;
  /** Word ids blocking the gate, most frequent first. */
  blocking: string[];
  /** How many of them must be learned to reach the threshold. */
  needed: number;
}

export function passageStatus(p: ReadingPassage, pool: ReadonlySet<string>): PassageStatus {
  const tokens = p.paragraphs.flatMap((x) => x.tokens);
  const cov = checkCoverage(tokens, pool);
  const freq = new Map<string, number>();
  for (const t of tokens) if (t.ref && cov.unknown.includes(t.ref)) freq.set(t.ref, (freq.get(t.ref) ?? 0) + 1);
  const blocking = [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
  // Greedy: how many of the most frequent blockers must be learned to pass.
  let known = Math.round(cov.ratio * cov.counted);
  let needed = 0;
  for (const id of blocking) {
    if (known / Math.max(1, cov.counted) >= PASSAGE_THRESHOLD) break;
    known += freq.get(id)!;
    needed++;
  }
  return { locked: cov.ratio < PASSAGE_THRESHOLD, ratio: cov.ratio, blocking, needed };
}

export function gradeQuestion(q: PassageQuestion, answer: number[]): boolean {
  return answer.length === q.answer.length && answer.every((a, i) => a === q.answer[i]);
}

/**
 * Cards to write so the blocking words come up next (spec 1.1.3 G5):
 * new cards jump to the front, learned-but-faded ones become due now.
 */
export function queueBlockingWords(ids: string[], cards: Map<string, FSRSCardState>, now: number): FSRSCardState[] {
  return ids.map((id) => {
    const c = cards.get(`word.recog:${id}`);
    if (!c) return newCard('word.recog', id, 'curriculum', now, QUEUE_PRIORITY);
    if (c.state === 0) return { ...c, priority: QUEUE_PRIORITY };
    return { ...c, due: Math.min(c.due, now) };
  });
}

// ---------------- X-ray layout ----------------

export interface XrayToken {
  token: Token;
  clause: number;
  underline?: 'complement' | 'time' | 'place' | 'ba' | 'bei';
  subordinate: boolean;
  topic: boolean;
  topicEnd: boolean;
  modStart: boolean;
  modEnd: boolean;
  head: boolean;
  pairId?: string;
}

export function xrayLayout(tokens: Token[], chunks: ChunkAnnotation[]): XrayToken[] {
  const out: XrayToken[] = tokens.map((token) => ({
    token, clause: 0, subordinate: false, topic: false, topicEnd: false, modStart: false, modEnd: false, head: false,
  }));
  let clauseNo = 0;
  for (const c of chunks.filter((x) => x.type === 'clause').sort((a, b) => a.start - b.start)) {
    for (let i = c.start; i < c.end; i++) out[i].clause = clauseNo;
    clauseNo++;
  }
  for (const c of chunks) {
    const span = out.slice(c.start, c.end);
    switch (c.type) {
      case 'complement': case 'time': case 'place': case 'ba': case 'bei':
        span.forEach((x) => { x.underline ??= c.type as XrayToken['underline']; });
        break;
      case 'subordinate': span.forEach((x) => { x.subordinate = true; }); break;
      case 'topic':
        span.forEach((x) => { x.topic = true; });
        if (span.length) span[span.length - 1].topicEnd = true;
        break;
      case 'modifier':
        if (span.length) { span[0].modStart = true; span[span.length - 1].modEnd = true; }
        // The head noun is the first word token after the modifier.
        for (let i = c.end; i < out.length; i++) {
          if (out[i].token.kind === 'punct') break;
          out[i].head = true;
          break;
        }
        break;
      case 'pair': span.forEach((x) => { x.pairId = c.pairId; }); break;
      default: break;
    }
  }
  return out;
}
