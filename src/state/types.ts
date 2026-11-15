// Persisted user-state types (Dexie). Mirrors docs/SPEC.md §5.3.

export type Track = 'lexical' | 'syntactic';
export type Facet = 'word.recog' | 'word.produce' | 'char.form' | 'gram.form' | 'gram.use';
export type Rating = 1 | 2 | 3 | 4; // Again, Hard, Good, Easy
export type CardStateCode = 0 | 1 | 2 | 3; // New, Learning, Review, Relearning
export type ExerciseKind =
  | 'slot_builder' | 'minimal_pair' | 'transform' | 'cloze' | 'reading' | 'recognition' | 'lookalike';
export type DisplayLevel = 'L0_FULL' | 'L1_PINYIN' | 'L2_BARE';

export interface FSRSCardState {
  id: string;            // `${facet}:${itemId}`
  itemId: string;
  track: Track;
  facet: Facet;
  origin: 'curriculum' | 'bridge' | 'diagnostic' | 'remedial';
  due: number;
  stability: number;
  difficulty: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: CardStateCode;
  last_review?: number;
  recentInstanceIds: string[];
  suspended?: boolean;
  priority?: number;     // bridge priority (higher = sooner)
  introducedAt?: number; // first real review
}

export interface ReviewLog {
  id?: number;
  cardId: string;
  ts: number;
  rating: Rating;
  stateBefore: CardStateCode;
  stabilityBefore: number;
  difficultyBefore: number;
  elapsedDays: number;
  exerciseKind: ExerciseKind;
  instanceId: string;
  latencyMs: number;
  peeks: number;
}

export interface ErrorLog {
  id?: number;
  ts: number;
  attemptId: string;
  exerciseKind: ExerciseKind;
  instanceId: string;
  codes: string[];
  itemIds: string[];
  learnerAnswer: string;
  expected: string;
  remediated?: boolean;
}

export interface PeekEvent {
  id?: number;
  ts: number;
  wordId: string;
  displayLevel: DisplayLevel;
  inGradedExercise: boolean;
}

export interface WeaknessState {
  code: string;
  score: number;
  updatedAt: number;
  itemIds: string[];
  lastDrillAt?: number;
}

export type BandOutcome = 'passed' | 'failed' | 'uncertain' | 'assumed' | 'untested';

export interface DiagnosticResult {
  id: 'latest';
  ts: number;
  bandOutcomes: Record<number, BandOutcome>;
  grammarClusters: Record<string, 'known' | 'weak'>;
  knownWords: number;
  bridgeWords: number;
}

export interface Settings {
  id: 'singleton';
  newWordsPerDay: number;
  newGrammarPerDay: number;
  retention: { lexical: number; syntactic: number };
  hanziSizePx: number;
  xrayDefault: boolean;
  lastBackupAt?: number;
  backupReminderDays: number;
  contentVersion: string;
  theme: 'system' | 'light' | 'dark';
}

export interface SessionRecord {
  id?: number;
  startedAt: number;
  endedAt?: number;
  mode: 'normal' | 'flight';
  reviewed: number;
  introduced: number;
  again: number;
}

export interface Snapshot {
  id?: number;
  ts: number;
  reason: string;
  payload: string; // serialised BackupFile
}

export const DEFAULT_SETTINGS: Settings = {
  id: 'singleton',
  newWordsPerDay: 12,
  newGrammarPerDay: 1,
  retention: { lexical: 0.9, syntactic: 0.88 },
  hanziSizePx: 22,
  xrayDefault: false,
  backupReminderDays: 7,
  contentVersion: '',
  theme: 'system',
};
