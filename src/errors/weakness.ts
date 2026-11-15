/**
 * Weakness scoring (spec 4.4). Pure.
 *   score(code) = Σ errors e^(−Δt/τ)  −  0.5 · Σ correct attempts on items that can produce the code e^(−Δt/τ)
 *                 −  Σ drill/twin relief e^(−Δt/τ)        (floored at 0)
 * A code triggers a micro-drill at score ≥ 3 with ≥ 3 distinct instances involved.
 */
import type { Content } from '../content';
import type { DrillRecord, ErrorLog, ReviewLog } from '../state/types';
import { DAY } from '../srs/fsrs';

export const TAU = 10 * DAY;
export const TRIGGER_SCORE = 3;
export const TRIGGER_ITEMS = 3;
export const REDRILL_AFTER = 2 * DAY;
export const MAX_DRILLS_PER_SESSION = 2;

/** Codes that a drill can address (word-meaning gaps are handled by word reviews; reading codes have no drill content). */
export function drillable(code: string): boolean {
  return !code.startsWith('META.') && code !== 'LEX.MEANING' && !code.startsWith('READ.') && code !== 'GRAM.JUDGEMENT';
}

export interface Weakness {
  code: string;
  score: number;
  instances: number;   // distinct instances with this error (within ~3τ)
  itemIds: string[];
}

const decay = (dt: number) => Math.exp(-Math.max(0, dt) / TAU);

/** Error codes a correct answer on this card counts against. */
function codesForCard(cardId: string, content: Content): string[] {
  const [facet, itemId] = [cardId.slice(0, cardId.indexOf(':')), cardId.slice(cardId.indexOf(':') + 1)];
  if (facet === 'char.form') {
    const set = content.confusableSetOf(itemId);
    if (!set) return [];
    return [set.kind === 'homophone' ? 'ORTHO.HOMOPHONE' : set.kind === 'antonym_form' ? 'ORTHO.ANTONYM_FORM' : 'ORTHO.LOOKALIKE'];
  }
  if (facet.startsWith('gram.')) return content.grammarById.get(itemId)?.errorCodes ?? [];
  return [];
}

export function weaknessAt(
  errors: ErrorLog[], reviews: ReviewLog[], drills: DrillRecord[], content: Content, at: number,
): Map<string, Weakness> {
  const out = new Map<string, Weakness & { inst: Set<string>; items: Set<string> }>();
  const get = (code: string) => {
    let w = out.get(code);
    if (!w) { w = { code, score: 0, instances: 0, itemIds: [], inst: new Set(), items: new Set() }; out.set(code, w); }
    return w;
  };
  for (const e of errors) {
    if (e.ts > at) continue;
    const d = decay(at - e.ts);
    for (const code of e.codes) {
      const w = get(code);
      w.score += d;
      if (at - e.ts < 3 * TAU) w.inst.add(e.instanceId);
      e.itemIds.forEach((i) => w.items.add(i));
    }
  }
  for (const r of reviews) {
    if (r.ts > at || r.rating === 1) continue;
    const d = decay(at - r.ts);
    for (const code of codesForCard(r.cardId, content)) {
      const w = out.get(code);
      if (w) w.score -= 0.5 * d;
    }
  }
  for (const dr of drills) {
    if (dr.ts > at || !dr.relief) continue;
    const w = out.get(dr.code);
    if (w) w.score -= dr.relief * decay(at - dr.ts);
  }
  const result = new Map<string, Weakness>();
  for (const [code, w] of out) {
    result.set(code, { code, score: Math.max(0, w.score), instances: w.inst.size, itemIds: [...w.items] });
  }
  return result;
}

/** Codes due for a micro-drill now, strongest first. */
export function triggeredCodes(scores: Map<string, Weakness>, drills: DrillRecord[], now: number): Weakness[] {
  return [...scores.values()]
    .filter((w) => drillable(w.code) && w.score >= TRIGGER_SCORE && w.instances >= TRIGGER_ITEMS)
    .filter((w) => !drills.some((d) => d.kind === 'drill' && d.code === w.code && now - d.ts < REDRILL_AFTER))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_DRILLS_PER_SESSION);
}

/** Relief recorded when a drill finishes (≥ 4/5 halves the score; otherwise nothing). */
export function drillRelief(scoreAtEnd: number, correct: number, total: number): number {
  return total > 0 && correct / total >= 0.8 ? 0.5 * scoreAtEnd : 0;
}

export const TWIN_RELIEF = 0.5;

/** Daily score series for the weakness map sparkline. */
export function weaknessSeries(
  code: string, errors: ErrorLog[], reviews: ReviewLog[], drills: DrillRecord[], content: Content, now: number, days = 30,
): number[] {
  const out: number[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const at = now - i * DAY;
    out.push(weaknessAt(errors, reviews, drills, content, at).get(code)?.score ?? 0);
  }
  return out;
}
