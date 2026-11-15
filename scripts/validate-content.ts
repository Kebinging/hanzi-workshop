/**
 * Build-time content validation (spec 5.4). Fails the build on errors; prints warnings.
 * Run: npm run content
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import type { ContentBundle } from '../src/content/types';
import { sentencePasses } from '../src/gate/coverage';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundle = JSON.parse(readFileSync(join(root, 'content', 'dist', 'bundle.json'), 'utf8')) as ContentBundle;
const errors: string[] = [];
const warnings: string[] = [];

// ---- Schema ----
const POS = z.enum(['n', 'v', 'adj', 'adv', 'prep', 'conj', 'mw', 'pron', 'num', 'part', 'aux', 'loc', 'intj', 'vsep']);
const Token = z.object({
  t: z.string().min(1), ref: z.string().optional(),
  kind: z.enum(['word', 'target', 'name', 'num', 'punct', 'gloss']),
  slot: z.string().optional(), chunk: z.number().optional(), glossEn: z.string().optional(), pinyin: z.string().optional(),
});
const Sentence = z.object({
  id: z.string(), tokens: z.array(Token).min(2), en: z.string().min(2),
  patternIds: z.array(z.string()).min(1), source: z.enum(['authored', 'generated']),
});
const Vocab = z.object({
  id: z.string().regex(/^w_[a-z0-9_]+$/), hanzi: z.string().min(1), pinyin: z.string().min(1),
  pinyinNum: z.string().regex(/^([a-zv]+[1-5]r?( |$))+$/), hsk: z.number().int().min(1).max(5),
  unit: z.number().int().optional(), band: z.number().int().min(1).max(10).optional(),
  senses: z.array(z.object({ id: z.string(), gloss: z.string().min(1), pos: POS })).min(1),
  chars: z.array(z.string().length(1)).min(1), semantic: z.array(z.string()),
});
const Pattern = z.object({
  id: z.string().regex(/^G\d+-\d\d$/), hsk: z.number(), title: z.string(), titleZh: z.string(), summary: z.string(),
  explanationMd: z.string().min(40), formula: z.array(z.string()).min(1), requires: z.array(z.string()),
  examples: z.array(Sentence), instanceBank: z.array(Sentence),
});

for (const [name, schema, list] of [
  ['vocab', Vocab, bundle.vocab], ['grammar', Pattern, bundle.grammar], ['sentence', Sentence, bundle.vocabExamples],
] as const) {
  (list as unknown[]).forEach((x, i) => {
    const r = (schema as z.ZodType).safeParse(x);
    if (!r.success) errors.push(`${name}[${i}] ${(x as { id?: string }).id ?? ''}: ${r.error.issues.map((e) => `${e.path.join('.')} ${e.message}`).join('; ')}`);
  });
}

// ---- Referential integrity ----
const vocabIds = new Set(bundle.vocab.map((w) => w.id));
const charIds = new Set(bundle.chars.map((c) => c.id));
for (const w of bundle.vocab) for (const c of w.chars) if (!charIds.has(c)) errors.push(`${w.id}: char ${c} has no CharItem`);
const clusterIds = new Set(bundle.clusters.map((c) => c.id));
const patternIds = new Set(bundle.grammar.map((g) => g.id));
for (const g of bundle.grammar) {
  for (const r of g.requires) if (!clusterIds.has(r) && !patternIds.has(r)) errors.push(`${g.id}: requires unknown ${r}`);
  for (const s of [...g.examples, ...g.instanceBank]) {
    for (const t of s.tokens) if (t.ref && !vocabIds.has(t.ref)) errors.push(`${s.id}: unknown ref ${t.ref}`);
    if (!s.tokens.some((t) => t.kind === 'target')) warnings.push(`${s.id}: no target token marked`);
  }
}

// ---- Gate G1 at the sentence's unit: HSK 1–2 + words of units <= unit ----
for (const g of bundle.grammar) {
  const unit = g.unit ?? 0;
  const pool = new Set(bundle.vocab.filter((w) => w.hsk <= 2 || (w.unit ?? 99) <= unit).map((w) => w.id));
  for (const s of [...g.examples, ...g.instanceBank]) {
    if (!sentencePasses(s.tokens, pool)) errors.push(`${s.id}: fails coverage gate at unit ${unit}`);
  }
  if (unit === 1) {
    for (const s of bundle.vocabExamples) if (!sentencePasses(s.tokens, pool)) errors.push(`${s.id}: fails coverage gate at unit 1`);
  }
  if (g.examples.length < 3) errors.push(`${g.id}: needs >= 3 examples`);
  if (g.instanceBank.length < 8) errors.push(`${g.id}: needs >= 8 instances (has ${g.instanceBank.length})`);
  else if (g.instanceBank.length < 15) warnings.push(`${g.id}: ${g.instanceBank.length} instances (target 15)`);
}

// ---- Diagnostic clusters ----
for (const c of bundle.clusters) {
  if (c.items.length < 3) errors.push(`${c.id}: needs 3 items (2 probes + confirmation)`);
  for (const it of c.items) {
    if (it.options.length !== 3 || it.answer < 0 || it.answer > 2) errors.push(`${c.id}: bad item`);
    if (new Set(it.options).size !== it.options.length) errors.push(`${c.id}: duplicate options`);
  }
}

// ---- Confusables ----
for (const s of bundle.confusables) {
  if (s.chars.length < 2) errors.push(`${s.id}: needs >= 2 chars`);
  if (!s.chars.some((c) => charIds.has(c))) errors.push(`${s.id}: no member appears in the vocabulary`);
  for (const c of s.chars) if (!s.hints[c]) errors.push(`${s.id}: missing hint for ${c}`);
}

// ---- Syllabus targets ----
const foundation = bundle.vocab.filter((w) => w.hsk <= 2).length;
const target = bundle.syllabus.levels.find((l) => l.level === 2)?.cumulativeWords;
if (target && foundation !== target) warnings.push(`HSK 1–2 pool has ${foundation} words; syllabus says ${target}`);
for (let b = 1; b <= 10; b++) {
  const n = bundle.vocab.filter((w) => w.band === b).length;
  if (n < 6) errors.push(`band ${b} has only ${n} words`);
}

// ---- Coverage report ----
const uses = new Map<string, number>();
for (const s of [...bundle.grammar.flatMap((g) => [...g.examples, ...g.instanceBank]), ...bundle.vocabExamples]) for (const t of s.tokens) if (t.ref) uses.set(t.ref, (uses.get(t.ref) ?? 0) + 1);
for (const u of bundle.syllabus.units.filter((x) => x.available)) {
  const words = bundle.vocab.filter((w) => w.unit === u.unit);
  const thin = words.filter((w) => (uses.get(w.id) ?? 0) < 1);
  if (thin.length) warnings.push(`unit ${u.unit}: ${thin.length}/${words.length} words not yet used in any sentence (recognition is shown in isolation)`);
}

for (const w of warnings) console.warn(`  ! ${w}`);
if (errors.length) {
  console.error(`✗ validation failed with ${errors.length} error(s):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log(`✓ content valid (${warnings.length} warning(s))`);
