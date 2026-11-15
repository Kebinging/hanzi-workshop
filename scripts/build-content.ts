/**
 * Compiles the compact authoring sources in content/src into content/dist/bundle.json.
 * Run: npm run content
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  VocabItem, CharItem, GrammarPattern, AnnotatedSentence, Token, POS, HskLevel, ContentBundle,
} from '../src/content/types';
import { toNumbered, syllabify } from '../src/content/pinyin';
import { patternsU01 } from '../content/src/grammar-u01';
import { examplesU01 } from '../content/src/examples-u01';
import { clusters } from '../content/src/clusters';
import { confusables } from '../content/src/confusables';
import { syllabus } from '../content/src/syllabus';
import type { PatternSource } from '../content/src/authoring';

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

function parseSentence(text: string, en: string, id: string, patternIds: string[]): AnnotatedSentence {
  const tokens: Token[] = text.trim().split(/\s+/).map((raw): Token => {
    if (PUNCT.test(raw)) return { t: raw, kind: 'punct' };
    if (raw.startsWith('%')) return { t: raw.slice(1), kind: 'num' };
    if (raw.startsWith('#')) {
      const [t, pinyin, glossEn] = raw.slice(1).split('=');
      return { t, kind: 'name', pinyin, glossEn };
    }
    if (raw.startsWith('~')) {
      const [t, pinyin, glossEn] = raw.slice(1).split('=');
      return { t, kind: 'gloss', pinyin, glossEn };
    }
    let kind: Token['kind'] = 'word';
    let body = raw;
    if (body.startsWith('*') && body.endsWith('*')) { kind = 'target'; body = body.slice(1, -1); }
    let [t, explicit] = body.split('@');
    if (explicit && !explicit.startsWith('w_')) explicit = `w_${explicit}`;
    let ref: string | undefined;
    if (explicit) {
      if (!byId.has(explicit)) errors.push(`${id}: unknown id ${explicit}`);
      ref = explicit;
    } else {
      const cands = byHanzi.get(t) ?? [];
      if (cands.length === 0) errors.push(`${id}: unknown word "${t}" in "${text}"`);
      else if (cands.length > 1) errors.push(`${id}: ambiguous "${t}" (${cands.map((c) => c.id).join(', ')}) — use @id`);
      ref = cands[0]?.id;
    }
    return { t, ref, kind };
  });
  return { id, tokens, en, patternIds, source: 'authored' };
}

function buildPattern(p: PatternSource): GrammarPattern {
  const mk = (list: [string, string][], kind: string) =>
    list.map(([zh, en], i) => parseSentence(zh, en, `${p.id}:${kind}${i + 1}`, [p.id]));
  return {
    id: p.id, hsk: 3, unit: p.unit, title: p.title, titleZh: p.titleZh, summary: p.summary,
    explanationMd: p.explanationMd.trim(), formula: p.formula, constraints: p.constraints,
    requires: p.requires, contrasts: p.contrasts, errorCodes: p.errorCodes,
    examples: mk(p.examples, 'ex'), instanceBank: mk(p.instances, 'in'), provisional: true,
  };
}

const grammar = patternsU01.map(buildPattern);
const vocabExamples = examplesU01.map(([zh, en], i) => parseSentence(zh, en, `V1:${i + 1}`, ['VOCAB']));

const bundle: ContentBundle = { syllabus, vocab, chars, grammar, vocabExamples, clusters, confusables };

if (errors.length) {
  console.error(`✗ ${errors.length} content error(s):\n  ` + errors.join('\n  '));
  process.exit(1);
}
mkdirSync(join(root, 'content', 'dist'), { recursive: true });
writeFileSync(join(root, 'content', 'dist', 'bundle.json'), JSON.stringify(bundle));
const pool12 = vocab.filter((w) => w.hsk <= 2).length;
console.log(`✓ bundle: ${vocab.length} words (${pool12} HSK 1–2), ${chars.length} chars, ${grammar.length} patterns, ${clusters.length} clusters`);
