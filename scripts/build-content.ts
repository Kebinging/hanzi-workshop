/**
 * Compiles the compact authoring sources in content/src into content/dist/bundle.json.
 * Run: npm run content
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  VocabItem, CharItem, GrammarPattern, AnnotatedSentence, Token, POS, HskLevel, ContentBundle, SlotCode,
  ClozeItem, MinimalPairItem, TransformItem, Decoy, ReadingPassage, ChunkAnnotation, TokenRange,
} from '../src/content/types';
import { toNumbered, syllabify } from '../src/content/pinyin';
import { patternsU01 } from '../content/src/grammar-u01';
import { patternsU02 } from '../content/src/grammar-u02';
import { patternsU03 } from '../content/src/grammar-u03';
import { pairs as pairSources } from '../content/src/pairs';
import { errors as errorInfos } from '../content/src/errors';
import { generators } from '../content/src/generators';
import { patternsU04 } from '../content/src/grammar-u04';
import { patternsU05 } from '../content/src/grammar-u05';
import { patternsU06 } from '../content/src/grammar-u06';
import { passages as passageSources } from '../content/src/passages';
import { examplesU01 } from '../content/src/examples-u01';
import { clusters } from '../content/src/clusters';
import { confusables } from '../content/src/confusables';
import { syllabus } from '../content/src/syllabus';
import type { PatternSource, SentenceSrc, Distractor } from '../content/src/authoring';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = (f: string) => join(root, 'content', 'src', f);
const errors: string[] = [];

// ---------- Vocabulary ----------
function slug(pinyin: string): string {
  return pinyin
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/ü/g, 'v').replace(/[^a-z ]/gi, '').toLowerCase().replace(/ /g, '');
}

function hash(s: string): number {
  let h = 2166136261;
  for (const c of s) { h ^= c.codePointAt(0)!; h = Math.imul(h, 16777619); }
  return h >>> 0;
}

interface RawWord { hanzi: string; pinyin: string; pos: POS; gloss: string; tier: string; idOverride?: string; file: string }

function parseVocab(file: string): RawWord[] {
  const out: RawWord[] = [];
  let tier = '';
  for (const raw of readFileSync(src(file), 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (line.startsWith('@')) { tier = line.slice(1); continue; }
    const parts = line.split('|');
    if (parts.length !== 4) { errors.push(`${file}: bad line "${line}"`); continue; }
    let [hanzi, pinyin, pos, gloss] = parts;
    let idOverride: string | undefined;
    const at = gloss.lastIndexOf('@');
    if (at >= 0) { idOverride = gloss.slice(at + 1); gloss = gloss.slice(0, at); }
    out.push({ hanzi, pinyin, pos: pos as POS, gloss, tier, idOverride, file });
  }
  return out;
}

const vocabFiles = readdirSync(join(root, 'content', 'src')).filter((f) => f.startsWith('vocab-') && f.endsWith('.txt')).sort();
const rawWords = vocabFiles.flatMap(parseVocab);
const vocab: VocabItem[] = [];
const ids = new Set<string>();
const seenHanziPos = new Set<string>();

for (const w of rawWords) {
  const key = `${w.hanzi}|${w.pinyin}`;
  if (seenHanziPos.has(key)) errors.push(`duplicate word ${w.hanzi} (${w.pinyin}) in ${w.file}`);
  seenHanziPos.add(key);
  let id = w.idOverride ?? `w_${slug(w.pinyin)}`;
  if (!w.idOverride) { let n = 2; const base = id; while (ids.has(id)) id = `${base}_${n++}`; }
  if (ids.has(id)) errors.push(`duplicate id ${id}`);
  ids.add(id);
  const sylls = syllabify(w.pinyin, w.hanzi);
  if (!sylls) errors.push(`pinyin/char count mismatch: ${w.hanzi} ${w.pinyin}`);
  const unitMatch = /^U(\d+)$/.exec(w.tier);
  const hsk: HskLevel = unitMatch ? 3 : w.tier === 'T1' ? 1 : 2;
  const item: VocabItem = {
    id,
    hanzi: w.hanzi,
    pinyin: w.pinyin,
    pinyinNum: toNumbered(w.pinyin),
    hsk,
    senses: [{ id: `${id}#1`, gloss: w.gloss, pos: w.pos }],
    chars: [...w.hanzi],
    semantic: [],
    provisional: true,
  };
  if (unitMatch) item.unit = Number(unitMatch[1]);
  if (w.pos === 'vsep') item.separable = { splitAfter: 1 };
  vocab.push(item);
}

// Diagnostic bands: tiers in order, seeded shuffle inside each tier, chunks of 50.
const tierOrder = ['T1', 'T2', 'T3'];
const pool = rawWords
  .map((w, i) => ({ w, item: vocab[i] }))
  .filter(({ w }) => tierOrder.includes(w.tier))
  .sort((a, b) => tierOrder.indexOf(a.w.tier) - tierOrder.indexOf(b.w.tier) || hash(a.item.id) - hash(b.item.id));
pool.forEach(({ item }, i) => { item.band = Math.min(10, Math.floor(i / 50) + 1); });

// ---------- Characters ----------
const radicalMeaning = new Map<string, string>();
for (const line of readFileSync(src('radicals.txt'), 'utf8').split(/\r?\n/)) {
  const l = line.trim();
  if (!l || l.startsWith('#')) continue;
  const [r, m] = l.split('|');
  radicalMeaning.set(r, m);
}
const charSrc = new Map<string, { radical: string; ids: string }>();
for (const line of readFileSync(src('chars.txt'), 'utf8').split(/\r?\n/)) {
  const l = line.trim();
  if (!l || l.startsWith('#')) continue;
  const [c, radical, ids] = l.split('|');
  if (charSrc.has(c)) errors.push(`duplicate char entry ${c}`);
  charSrc.set(c, { radical, ids: ids || c });
}

const charMap = new Map<string, CharItem>();
for (const w of vocab) {
  const sylls = syllabify(w.pinyin, w.hanzi) ?? [];
  [...w.hanzi].forEach((c, i) => {
    const s = charSrc.get(c);
    if (!s) { errors.push(`missing char data: ${c} (in ${w.hanzi})`); return; }
    const existing = charMap.get(c);
    const reading = sylls[i];
    if (existing) {
      if (reading && !existing.pinyin.includes(reading)) existing.pinyin.push(reading);
      if (w.hsk < existing.hsk) existing.hsk = w.hsk;
      return;
    }
    const rm = radicalMeaning.get(s.radical);
    if (!rm) errors.push(`missing radical meaning: ${s.radical} (for ${c})`);
    const comps = [...s.ids].filter((x) => !/[⿰-⿿]/.test(x));
    charMap.set(c, {
      id: c,
      pinyin: reading ? [reading] : [],
      hsk: w.hsk,
      radical: { char: s.radical, meaning: rm ?? '' },
      decomposition: s.ids,
      components: comps.length > 1 || comps[0] !== c
        ? comps.map((x) => ({ char: x, meaning: radicalMeaning.get(x) }))
        : [],
      firstWord: w.id,
    });
  });
}
for (const set of confusables) {
  for (const c of set.chars) {
    const ci = charMap.get(c);
    if (ci) { ci.confusableSet = set.id; ci.diffHint = set.hints[c]; }
  }
}
const chars = [...charMap.values()];

// ---------- Sentences ----------
const byHanzi = new Map<string, VocabItem[]>();
for (const w of vocab) byHanzi.set(w.hanzi, [...(byHanzi.get(w.hanzi) ?? []), w]);
const byId = new Map(vocab.map((w) => [w.id, w]));
const PUNCT = /^[。，？！、：；“”…—（）]$/;
const SLOTS = new Set<SlotCode>(['TOP', 'S', 'T', 'ADV', 'MOD', 'PP', 'BA', 'V', 'ASP', 'C', 'O', 'SF', 'CONJ1', 'CONJ2', 'P']);
const knownCodes = new Set(errorInfos.map((e) => e.code));
const checkCode = (where: string, code?: string) => { if (code && !knownCodes.has(code)) errors.push(`${where}: unknown error code ${code}`); };

function resolve(t: string, explicit: string | undefined, where: string, text: string): string | undefined {
  if (explicit) {
    const id = explicit.startsWith('w_') ? explicit : `w_${explicit}`;
    if (!byId.has(id)) errors.push(`${where}: unknown id ${id}`);
    return id;
  }
  const cands = byHanzi.get(t) ?? [];
  if (cands.length === 0) { errors.push(`${where}: unknown word "${t}" in "${text}"`); return undefined; }
  // Homographs: default to the earliest-taught reading; later readings need an explicit @id.
  const rank = (w: VocabItem) => w.hsk * 100 + (w.unit ?? 0);
  const sorted = [...cands].sort((x, y) => rank(x) - rank(y));
  if (sorted.length > 1 && rank(sorted[0]) === rank(sorted[1])) {
    errors.push(`${where}: ambiguous "${t}" (${cands.map((c) => c.id).join(', ')}) — use @id`);
  }
  return sorted[0].id;
}

function parseSentence(text: string, en: string, id: string, patternIds: string[], alts?: string[]): AnnotatedSentence {
  const hasSlots = /\/[A-Z]/.test(text);
  let chunk = -1;
  const tokens: Token[] = text.trim().split(/\s+/).map((raw0): Token => {
    let raw = raw0;
    let slot: SlotCode | undefined;
    const m = /\/([A-Z0-9]+)$/.exec(raw);
    if (m && SLOTS.has(m[1] as SlotCode)) { slot = m[1] as SlotCode; raw = raw.slice(0, -m[0].length); }
    let tok: Token;
    if (raw === '___') tok = { t: '＿＿', kind: 'gap' };
    else if (PUNCT.test(raw)) {
      tok = { t: raw, kind: 'punct' };
      if (hasSlots && raw === '，') { chunk++; tok.slot = 'P'; tok.chunk = chunk; }
      return tok;
    } else if (raw.startsWith('%')) tok = { t: raw.slice(1), kind: 'num' };
    else if (raw.startsWith('#') || raw.startsWith('~')) {
      const [t, pinyin, glossEn] = raw.slice(1).split('=');
      tok = { t, kind: raw.startsWith('#') ? 'name' : 'gloss', pinyin, glossEn: glossEn?.replace(/_/g, ' ') };
    } else {
      let kind: Token['kind'] = 'word';
      let body = raw;
      if (body.startsWith('*') && body.endsWith('*') && body.length > 2) { kind = 'target'; body = body.slice(1, -1); }
      const [t, rest] = body.split('@');
      const [explicit, pinOverride] = (rest ?? '').split('=');
      tok = { t, ref: resolve(t, explicit || undefined, id, text), kind };
      if (pinOverride) tok.pinyin = pinOverride.replace(/_/g, ' ');
    }
    if (hasSlots) {
      if (slot) { chunk++; tok.slot = slot; }
      if (chunk < 0) errors.push(`${id}: first token "${raw}" has no slot`);
      tok.chunk = chunk;
    }
    return tok;
  });
  const s: AnnotatedSentence = { id, tokens, en, patternIds, source: 'authored' };
  if (alts?.length) s.alts = alts;
  return s;
}

const plain = (s: AnnotatedSentence) => s.tokens.filter((t) => t.kind !== 'punct').map((t) => t.t).join('');

function decoy([t, code, why]: Distractor, where: string): Decoy {
  checkCode(where, code);
  const c = byHanzi.get(t);
  return { t, ref: c && c.length === 1 ? c[0].id : undefined, code, why };
}

const cloze: ClozeItem[] = [];
const transforms: TransformItem[] = [];

function buildPattern(p: PatternSource): GrammarPattern {
  const extrasOf = (s: SentenceSrc) => (s.length === 3 ? s[2] : undefined);
  const mk = (list: SentenceSrc[], kind: string) =>
    list.map((src, i) => {
      const s = parseSentence(src[0], src[1], `${p.id}:${kind}${i + 1}`, [p.id], extrasOf(src)?.alts);
      if (!s.tokens.some((t) => t.chunk !== undefined)) errors.push(`${s.id}: no slot annotations`);
      return { s, src };
    });
  const ex = mk(p.examples, 'ex');
  const inst = mk(p.instances, 'in');
  for (const code of p.errorCodes) checkCode(p.id, code);
  for (const c of p.constraints) checkCode(p.id, c.code);

  if (p.cloze) {
    for (const { s, src } of [...ex, ...inst]) {
      const idx = s.tokens.findIndex((t) => t.kind === 'target' && p.cloze!.blank.includes(t.t));
      if (idx < 0) continue;
      const answer = s.tokens[idx].t;
      const ds = [...p.cloze.distractors, ...(extrasOf(src)?.x ?? [])].filter(([t]) => t !== answer);
      ds.forEach(([, code]) => checkCode(s.id, code));
      cloze.push({
        id: `${s.id}:cz`, patternId: p.id, sentence: s, blank: idx,
        options: [{ t: answer, correct: true, why: p.summary }, ...ds.map(([t, code, why]) => ({ t, correct: false, code, why }))],
      });
    }
  }
  (p.transforms ?? []).forEach((tr, i) => {
    const id = `${p.id}:tr${i + 1}`;
    transforms.push({
      id, patternId: p.id, subtype: tr.subtype, chip: tr.chip,
      inputs: tr.inputs.map((x, j) => parseSentence(x, '', `${id}:in${j + 1}`, [p.id])),
      answer: parseSentence(tr.answer, tr.en, `${id}:ans`, [p.id]),
      decoys: (tr.decoys ?? []).map((d) => decoy(d, id)),
    });
  });
  return {
    id: p.id, hsk: 3, unit: p.unit, title: p.title, titleZh: p.titleZh, summary: p.summary,
    explanationMd: p.explanationMd.trim(), formula: p.formula, constraints: p.constraints,
    requires: p.requires, contrasts: p.contrasts, errorCodes: p.errorCodes,
    examples: ex.map((x) => x.s), instanceBank: inst.map((x) => x.s),
    decoys: (p.decoys ?? []).map((d) => decoy(d, p.id)), provisional: true,
  };
}

const grammar = [...patternsU01, ...patternsU02, ...patternsU03, ...patternsU04, ...patternsU05, ...patternsU06].map(buildPattern);
const grammarById = new Map(grammar.map((g) => [g.id, g]));
const vocabExamples = examplesU01.map(([zh, en], i) => parseSentence(zh, en, `V1:${i + 1}`, ['VOCAB']));

// ---------- Minimal pairs ----------
const pairs: MinimalPairItem[] = [];
pairSources.forEach((set, si) => {
  set.items.forEach((it, ii) => {
    const id = `MP${si + 1}-${ii + 1}`;
    const context = parseSentence(it.context, it.en, id, set.patternIds);
    const gaps = context.tokens.filter((t) => t.kind === 'gap').length;
    const options = it.options.map(([parts, correct, why, code]) => {
      checkCode(id, code);
      const ps = parts.split('|');
      if (ps.length !== gaps) errors.push(`${id}: option "${parts}" fills ${ps.length} gap(s), context has ${gaps}`);
      return { parts: ps, correct, why, code };
    });
    if (options.filter((o) => o.correct).length !== 1) errors.push(`${id}: needs exactly one correct option`);
    for (const pid of set.patternIds) if (!grammarById.has(pid)) errors.push(`${id}: unknown pattern ${pid}`);
    pairs.push({ id, contrast: set.contrast, patternIds: set.patternIds, context, options });
  });
});

// ---------- Generators: expand every combination at build time ----------
const report: string[] = ['# Generated sentence samples', '', 'Every sentence the generators can produce. Review for naturalness before shipping (spec 5.5).', ''];
for (const g of generators) {
  const pat = grammarById.get(g.patternId);
  if (!pat) { errors.push(`${g.id}: unknown pattern ${g.patternId}`); continue; }
  const names = [...g.template.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
  type Entry = (typeof g.slots)[string][number];
  const combos: Record<string, Entry>[] = [];
  const walk = (i: number, acc: Record<string, Entry>) => {
    if (i === names.length) { combos.push({ ...acc }); return; }
    for (const e of g.slots[names[i]] ?? []) {
      const tags = Object.values(acc).flatMap((x) => x.tags ?? []);
      if (e.tags && tags.length && !e.tags.some((t) => tags.includes(t))) continue;
      walk(i + 1, { ...acc, [names[i]]: e });
    }
  };
  walk(0, {});
  const out: AnnotatedSentence[] = combos.map((c, n) => {
    const zh = g.template.replace(/\{(\w+)\}/g, (_, k: string) => c[k].zh);
    let en = g.en.replace(/\{(\w+)\}/g, (_, k: string) => c[k].en);
    en = en.replace(/\{(\w+)\}/g, (_, k: string) => c[k]?.en ?? k);
    en = en.charAt(0).toUpperCase() + en.slice(1);
    const s = parseSentence(zh, en, `${g.id}:${n + 1}`, [g.patternId]);
    s.source = 'generated';
    return s;
  });
  pat.generated = out;
  report.push(`## ${g.id} → ${g.patternId} (${out.length})`, '', ...out.map((s) => `- ${plain(s)} — ${s.en}`), '');
}

// ---------- Reading passages ----------
const CHUNK_TYPES: Record<string, ChunkAnnotation['type']> = {
  sub: 'subordinate', topic: 'topic', comp: 'complement', time: 'time', place: 'place', mod: 'modifier', ba: 'ba', bei: 'bei',
};
const CLAUSE_END = /^[，。！？；：]$/;

function parseParagraph(text: string, id: string) {
  const chunks: ChunkAnnotation[] = [];
  const stack: { type: ChunkAnnotation['type']; start: number }[] = [];
  const raw: string[] = [];
  const pairMarks: { index: number; pairId: string }[] = [];
  for (const piece of text.trim().split(/\s+/)) {
    if (piece.startsWith('{')) {
      const type = CHUNK_TYPES[piece.slice(1)];
      if (!type) errors.push(`${id}: unknown chunk marker ${piece}`);
      else stack.push({ type, start: raw.length });
      continue;
    }
    if (piece === '}') {
      const open = stack.pop();
      if (!open) errors.push(`${id}: unbalanced }`);
      else chunks.push({ type: open.type, start: open.start, end: raw.length });
      continue;
    }
    const m = /\^(\d+)$/.exec(piece);
    if (m) pairMarks.push({ index: raw.length, pairId: m[1] });
    raw.push(m ? piece.slice(0, -m[0].length) : piece);
  }
  if (stack.length) errors.push(`${id}: ${stack.length} unclosed chunk(s)`);
  const s = parseSentence(raw.join(' '), '', id, []);
  for (const pm of pairMarks) chunks.push({ type: 'pair', start: pm.index, end: pm.index + 1, pairId: pm.pairId });
  // Clause spans from punctuation.
  let start = 0;
  s.tokens.forEach((t, i) => {
    if (t.kind === 'punct' && CLAUSE_END.test(t.t)) { chunks.push({ type: 'clause', start, end: i + 1 }); start = i + 1; }
  });
  if (start < s.tokens.length) chunks.push({ type: 'clause', start, end: s.tokens.length });
  return { tokens: s.tokens, chunks };
}

function findSpan(paragraphs: { tokens: Token[] }[], span: string, where: string): TokenRange | undefined {
  for (let p = 0; p < paragraphs.length; p++) {
    const toks = paragraphs[p].tokens;
    for (let i = 0; i < toks.length; i++) {
      let acc = '';
      for (let j = i; j < toks.length && acc.length < span.length; j++) {
        acc += toks[j].t;
        if (acc === span) return { paragraph: p, start: i, end: j + 1 };
      }
    }
  }
  errors.push(`${where}: evidence "${span}" not found on token boundaries`);
  return undefined;
}

const passages: ReadingPassage[] = passageSources.map((src) => {
  const paragraphs = src.paragraphs.map((t, i) => parseParagraph(t, `${src.id}:p${i + 1}`));
  const charCount = paragraphs.flatMap((p) => p.tokens).filter((t) => t.kind !== 'punct').reduce((n, t) => n + [...t.t].length, 0);
  for (const pid of src.patternIds) if (!grammarById.has(pid)) errors.push(`${src.id}: unknown pattern ${pid}`);
  const questions = src.questions.map((q, qi) => {
    const qid = `${src.id}:q${qi + 1}`;
    const answer = Array.isArray(q.answer) ? q.answer : [q.answer];
    if (q.type === 'sequence' ? answer.length !== q.options.length : answer.length !== 1 || answer[0] >= q.options.length) {
      errors.push(`${qid}: bad answer`);
    }
    return {
      id: qid, type: q.type, why: q.why, answer,
      stem: parseSentence(q.stem, '', `${qid}:stem`, []).tokens,
      options: q.options.map((o, oi) => parseSentence(o, '', `${qid}:o${oi + 1}`, []).tokens),
      evidence: q.evidence.map((e) => findSpan(paragraphs, e, qid)).filter((x): x is TokenRange => !!x),
    };
  });
  return {
    id: src.id, unit: src.unit, review: !!src.review, title: src.title, titleEn: src.titleEn, genre: src.genre,
    charCount, paragraphs, patternIds: src.patternIds, questions,
  };
});

const bundle: ContentBundle = {
  passages,
  syllabus, vocab, chars, grammar, vocabExamples, cloze, pairs, transforms,
  errors: errorInfos, generators, clusters, confusables,
};

if (errors.length) {
  console.error(`✗ ${errors.length} content error(s):\n  ` + errors.join('\n  '));
  process.exit(1);
}
mkdirSync(join(root, 'content', 'dist'), { recursive: true });
writeFileSync(join(root, 'content', 'dist', 'bundle.json'), JSON.stringify(bundle));
mkdirSync(join(root, 'reports'), { recursive: true });
writeFileSync(join(root, 'reports', 'gen-samples.md'), report.join('\n'));
const pool12 = vocab.filter((w) => w.hsk <= 2).length;
console.log(`✓ bundle: ${vocab.length} words (${pool12} HSK 1–2), ${chars.length} chars, ${grammar.length} patterns, ` +
  `${cloze.length} cloze, ${pairs.length} pairs, ${transforms.length} transforms, ` +
  `${grammar.reduce((n, g) => n + (g.generated?.length ?? 0), 0)} generated, ${clusters.length} clusters, ${passages.length} passages`);
