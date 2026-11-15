import { fsrs, generatorParameters, type Card, type FSRS, type Grade } from 'ts-fsrs';
import type { FSRSCardState, Rating, ReviewLog, Track, Facet, ExerciseKind, Settings } from '../state/types';

export const DAY = 86_400_000;

const MAX_INTERVAL: Record<Track, number> = { lexical: 365, syntactic: 180 };
const schedulers = new Map<string, FSRS>();

function scheduler(track: Track, retention: number): FSRS {
  const key = `${track}:${retention}`;
  let f = schedulers.get(key);
  if (!f) {
    f = fsrs(generatorParameters({ request_retention: retention, maximum_interval: MAX_INTERVAL[track], enable_fuzz: true }));
    schedulers.set(key, f);
  }
  return f;
}

const W = generatorParameters().w as readonly number[];
const DECAY = W[20];
const FACTOR = Math.pow(0.9, -1 / DECAY) - 1;

/** FSRS-6 forgetting curve: probability of recall after `elapsedDays` with stability `s`. */
export function forgettingCurve(elapsedDays: number, s: number): number {
  if (s <= 0) return 0;
  return Math.pow(1 + (FACTOR * Math.max(0, elapsedDays)) / s, -DECAY);
}

/** Current retrievability of a card (0 for New cards). */
export function retrievability(c: FSRSCardState, now: number): number {
  if (c.state === 0 || !c.last_review) return 0;
  return forgettingCurve((now - c.last_review) / DAY, c.stability);
}

export function trackOf(facet: Facet): Track {
  return facet.startsWith('gram.') ? 'syntactic' : 'lexical';
}

export function newCard(
  facet: Facet, itemId: string, origin: FSRSCardState['origin'], now: number, priority = 0,
): FSRSCardState {
  return {
    id: `${facet}:${itemId}`, itemId, facet, track: trackOf(facet), origin,
    due: now, stability: 0, difficulty: 0, scheduled_days: 0, learning_steps: 0,
    reps: 0, lapses: 0, state: 0, recentInstanceIds: [], priority,
  };
}

/** A card placed directly into Review (diagnostic seeding, §1.2.3). */
export function seededReviewCard(
  facet: Facet, itemId: string, origin: FSRSCardState['origin'], now: number,
  stabilityDays: number, dueInDays: number,
): FSRSCardState {
  return {
    ...newCard(facet, itemId, origin, now),
    state: 2, stability: stabilityDays, difficulty: 4, reps: 1,
    last_review: now, due: now + dueInDays * DAY, scheduled_days: dueInDays,
  };
}

function toCard(c: FSRSCardState): Card {
  return {
    due: new Date(c.due), stability: c.stability, difficulty: c.difficulty,
    scheduled_days: c.scheduled_days, learning_steps: c.learning_steps,
    reps: c.reps, lapses: c.lapses, state: c.state,
    last_review: c.last_review ? new Date(c.last_review) : undefined,
  } as unknown as Card;
}

export interface ReviewContext {
  exerciseKind: ExerciseKind;
  instanceId: string;
  latencyMs: number;
  peeks: number;
}

/** Apply a rating. Pure: returns the updated card and a log entry. */
export function review(
  c: FSRSCardState, rating: Rating, now: number, settings: Pick<Settings, 'retention'>, ctx: ReviewContext,
): { card: FSRSCardState; log: ReviewLog } {
  const f = scheduler(c.track, settings.retention[c.track]);
  const n = f.next(toCard(c), new Date(now), rating as unknown as Grade).card;
  const recent = [ctx.instanceId, ...c.recentInstanceIds.filter((x) => x !== ctx.instanceId)].slice(0, 5);
  const card: FSRSCardState = {
    ...c,
    due: n.due.getTime(), stability: n.stability, difficulty: n.difficulty,
    scheduled_days: n.scheduled_days, learning_steps: n.learning_steps,
    reps: n.reps, lapses: n.lapses, state: n.state as FSRSCardState['state'],
    last_review: now, recentInstanceIds: recent, introducedAt: c.introducedAt ?? now,
  };
  const log: ReviewLog = {
    cardId: c.id, ts: now, rating, stateBefore: c.state, stabilityBefore: c.stability,
    difficultyBefore: c.difficulty, elapsedDays: c.last_review ? (now - c.last_review) / DAY : 0,
    exerciseKind: ctx.exerciseKind, instanceId: ctx.instanceId, latencyMs: ctx.latencyMs, peeks: ctx.peeks,
  };
  return { card, log };
}
