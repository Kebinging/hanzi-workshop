/**
 * Build-time content validation (spec 5.4). Fails the build on errors; prints warnings.
 * Run: npm run content
 */
import { readFileSync, writeFileSync } from 'node:fs';
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
  for (const s of bundle.vocabExamples.filter((v) => Number(/^V(\d+):/.exec(v.id)?.[1]) === unit)) {
    if (!sentencePasses(s.tokens, pool)) errors.push(`${s.id}: fails coverage gate at unit ${unit}`);
  }
  if (g.examples.length < 3) errors.push(`${g.id}: needs >= 3 examples`);
  if (g.instanceBank.length < 8) errors.push(`${g.id}: needs >= 8 instances (has ${g.instanceBank.length})`);
  else if (g.instanceBank.length < 15) warnings.push(`${g.id}: ${g.instanceBank.length} instances (target 15)`);
}

// ---- Gate for pairs / transformations / cloze at their pattern's unit ----
const unitPool = (unit: number) => new Set(bundle.vocab.filter((w) => w.hsk <= 2 || (w.unit ?? 99) <= unit).map((w) => w.id));
const unitOf = (pid: string) => bundle.grammar.find((g) => g.id === pid)?.unit ?? 0;
for (const p of bundle.pairs) {
  const unit = Math.max(...p.patternIds.map(unitOf));
  if (!sentencePasses(p.context.tokens, unitPool(unit))) errors.push(`${p.id}: fails coverage gate at unit ${unit}`);
}
for (const t of bundle.transforms) {
  const pool = unitPool(unitOf(t.patternId));
  for (const s of [t.answer, ...t.inputs]) if (!sentencePasses(s.tokens, pool)) errors.push(`${s.id}: fails coverage gate`);
}
// ---- Reading passages (spec 3.5): coverage >= 95 % at the passage's unit, length, gated questions ----
for (const p of bundle.passages) {
  const pool = unitPool(p.unit);
  const tokens = p.paragraphs.flatMap((x) => x.tokens);
  const counted = tokens.filter((t) => !['punct', 'name', 'num', 'target', 'gap'].includes(t.kind));
  const known = counted.filter((t) => t.kind === 'gloss' || (t.ref && pool.has(t.ref)));
  const ratio = counted.length ? known.length / counted.length : 1;
  if (ratio < 0.95) errors.push(`${p.id}: coverage ${(ratio * 100).toFixed(1)}% < 95% at unit ${p.unit}`);
  const glosses = tokens.filter((t) => t.kind === 'gloss').length;
  if (glosses > Math.ceil(p.charCount / 100)) errors.push(`${p.id}: too many glossed words (${glosses})`);
  const isB = p.id.endsWith('-B') || p.review;
  const [lo, hi] = isB ? [180, 250] : [100, 150];
  if (p.charCount < lo || p.charCount > hi) warnings.push(`${p.id}: ${p.charCount} chars (target ${lo}–${hi})`);
  if (p.questions.length < 4) errors.push(`${p.id}: needs >= 4 questions`);
  for (const q of p.questions) {
    for (const toks of [q.stem, ...q.options]) {
      if (!sentencePasses(toks, pool)) errors.push(`${q.id}: question text uses words beyond unit ${p.unit}`);
    }
    if (!q.evidence.length) warnings.push(`${q.id}: no evidence span`);
  }
  for (const pid of p.patternIds) if (!bundle.grammar.some((g) => g.id === pid && (g.unit ?? 0) <= p.unit)) errors.push(`${p.id}: pattern ${pid} is beyond its unit`);
}

const patternsWithUse = new Set([...bundle.pairs.flatMap((p) => p.patternIds), ...bundle.cloze.map((c) => c.patternId)]);
for (const g of bundle.grammar) if (!patternsWithUse.has(g.id)) warnings.push(`${g.id}: no minimal-pair or cloze items (form-only for now)`);

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

// ---- M4 acceptance coverage report (spec 5.4 #7) → reports/coverage.md ----
{
  const all = [
    ...bundle.grammar.flatMap((g) => [...g.examples, ...g.instanceBank, ...(g.generated ?? [])]),
    ...bundle.vocabExamples, ...bundle.pairs.map((p) => p.context), ...bundle.transforms.map((t) => t.answer),
  ];
  const sentUses = new Map<string, number>();
  for (const s of all) for (const id of new Set(s.tokens.map((t) => t.ref).filter(Boolean) as string[])) sentUses.set(id, (sentUses.get(id) ?? 0) + 1);
  const passageUses = new Map<string, number>();
  for (const p of bundle.passages) for (const id of new Set(p.paragraphs.flatMap((x) => x.tokens).map((t) => t.ref).filter(Boolean) as string[])) passageUses.set(id, (passageUses.get(id) ?? 0) + 1);
  const hsk3 = bundle.vocab.filter((w) => w.hsk === 3);
  const uses = (id: string) => (sentUses.get(id) ?? 0) + (passageUses.get(id) ?? 0);
  const words3 = hsk3.filter((w) => uses(w.id) >= 3).length;
  const words1 = hsk3.filter((w) => uses(w.id) >= 1).length;
  const pat15 = bundle.grammar.filter((g) => g.instanceBank.length + (g.generated?.length ?? 0) >= 15).length;
  const inPassage = new Set(bundle.passages.flatMap((p) => p.patternIds));
  const patPassage = bundle.grammar.filter((g) => inPassage.has(g.id)).length;
  const withUse = new Set([...bundle.pairs.flatMap((p) => p.patternIds), ...bundle.cloze.map((c) => c.patternId)]);
  const lines = [
    '# Content coverage report', '',
    `Generated by \`npm run content\`. Targets from docs/SPEC.md §6 (Milestone 4 acceptance).`, '',
    '| Measure | Now | Target |', '|---|---|---|',
    `| HSK 3 words used in ≥ 3 sentences/passages | ${words3} / ${hsk3.length} | ${hsk3.length} |`,
    `| HSK 3 words used at least once | ${words1} / ${hsk3.length} | — |`,
    `| Patterns with ≥ 15 practice sentences | ${pat15} / ${bundle.grammar.length} | ${bundle.grammar.length} |`,
    `| Patterns appearing in ≥ 1 passage | ${patPassage} / ${bundle.grammar.length} | ${bundle.grammar.length} |`,
    `| Patterns with choice drills (pairs/cloze) | ${withUse.size} / ${bundle.grammar.length} | — |`,
    `| Passages | ${bundle.passages.length} | 28 |`, '',
    '## Patterns not yet in any passage', '',
    bundle.grammar.filter((g) => !inPassage.has(g.id)).map((g) => `${g.id} ${g.titleZh}`).join(', ') || '—', '',
    '## HSK 3 words not yet used anywhere', '',
    hsk3.filter((w) => uses(w.id) === 0).map((w) => w.hanzi).join(' ') || '—', '',
  ];
  writeFileSync(join(root, 'reports', 'coverage.md'), lines.join('\n'));
  console.log(`  coverage: words≥3 ${words3}/${hsk3.length}, words≥1 ${words1}/${hsk3.length}, patterns≥15 ${pat15}/${bundle.grammar.length}, patterns in passages ${patPassage}/${bundle.grammar.length}`);
}

for (const w of warnings) console.warn(`  ! ${w}`);
if (errors.length) {
  console.error(`✗ validation failed with ${errors.length} error(s):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log(`✓ content valid (${warnings.length} warning(s))`);
