import type { ExerciseKind, Rating } from '../state/types';

export interface AttemptSignals {
  correct: boolean;
  dontKnow?: boolean;
  wrongTries?: number;   // wrong placements before success (tile exercises)
  usedHint?: boolean;
  peekedTarget?: boolean;
  latencyMs: number;
  reps: number;          // card reps before this attempt
}

export interface LatencyBounds { fastMs: number; slowMs: number }

export const DEFAULT_LATENCY: Record<ExerciseKind, LatencyBounds> = {
  recognition: { fastMs: 2500, slowMs: 8000 },
  lookalike: { fastMs: 2500, slowMs: 8000 },
  cloze: { fastMs: 5000, slowMs: 15000 },
  minimal_pair: { fastMs: 5000, slowMs: 15000 },
  slot_builder: { fastMs: 10000, slowMs: 40000 },
  transform: { fastMs: 15000, slowMs: 60000 },
  reading: { fastMs: 15000, slowMs: 60000 },
};

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** Adapt bounds to the learner's rolling median (spec 1.4.3), clamped to 0.5x-1.5x the defaults. */
export function adaptiveBounds(kind: ExerciseKind, recentLatencies: number[]): LatencyBounds {
  const d = DEFAULT_LATENCY[kind];
  if (recentLatencies.length < 10) return d;
  const sorted = [...recentLatencies].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  return {
    fastMs: clamp(median * 0.6, d.fastMs * 0.5, d.fastMs * 1.5),
    slowMs: clamp(median * 1.8, d.slowMs * 0.5, d.slowMs * 1.5),
  };
}

/** Automatic rating from behaviour (spec 1.4.3). */
export function rateAttempt(s: AttemptSignals, b: LatencyBounds): Rating {
  const wrong = s.wrongTries ?? 0;
  if (!s.correct || s.dontKnow || wrong >= 2) return 1;
  if (s.usedHint || s.peekedTarget || wrong === 1 || s.latencyMs > b.slowMs) return 2;
  if (s.latencyMs < b.fastMs && s.reps >= 2) return 4;
  return 3;
}
