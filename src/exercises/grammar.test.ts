import { describe, expect, it } from 'vitest';
import { content } from '../content';
import { gradeOrder, tilesOf, decoyTile, type Tile } from './grade';
import { buildCloze, buildGrammar, buildPair, buildSlot, grammarPlayable, playableSentences } from './grammar';
import { newCard } from '../srs/fsrs';
import { rng } from '../lib/rng';

const pattern = (id: string) => content.grammarById.get(id)!;
const sentence = (id: string) => content.sentences.find((s) => s.id === id)!;
const byText = (tiles: Tile[], ...texts: string[]) => texts.map((t) => tiles.find((x) => x.text === t)!);
const allWords = new Set(content.vocab.map((w) => w.id));
const NOW = Date.UTC(2026, 10, 15);

describe('tiles', () => {
  it('groups tokens into authored tiles', () => {
    const tiles = tilesOf(sentence('G3-01:ex1')); // 我/S 买/V 了/ASP 两/O 本 书
    expect(tiles.map((t) => [t.text, t.slot])).toEqual([['我', 'S'], ['买', 'V'], ['了', 'ASP'], ['两本书', 'O']]);
  });
  it('makes a mid-sentence comma its own tile', () => {
    expect(tilesOf(sentence('G3-08:ex3')).some((t) => t.slot === 'P' && t.text === '，')).toBe(true);
  });
});

describe('gradeOrder (spec 3.1)', () => {
  const ex3 = tilesOf(sentence('G3-01:ex3')); // 昨天 我 看 了 一个电影

  it('accepts the canonical order and the Time/Subject swap', () => {
    expect(gradeOrder(ex3, ex3).correct).toBe(true);
    expect(gradeOrder(ex3, byText(ex3, '我', '昨天', '看', '了', '一个电影')).correct).toBe(true);
  });

  it('flags a time word after the verb', () => {
    const g = gradeOrder(ex3, byText(ex3, '我', '看', '了', '一个电影', '昨天'));
    expect(g.correct).toBe(false);
    expect(g.codes).toContain('ORDER.TIME_AFTER_VERB');
  });

  it('flags 了 separated from its verb', () => {
    const g = gradeOrder(ex3, byText(ex3, '昨天', '我', '了', '看', '一个电影'));
    expect(g.codes).toContain('ASPECT.LE_MISUSE');
  });

  it('flags an adverb before the subject', () => {
    const t = tilesOf(sentence('G3-06:ex2')); // 他 已经 走 了
    expect(gradeOrder(t, byText(t, '已经', '他', '走', '了')).codes).toContain('ORDER.ADVERB_POSITION');
  });

  it('reports the decoy code first when a decoy replaces a tile', () => {
    const t = tilesOf(sentence('G3-08:ex1')); // 他 七点 就 来 了
    const p = pattern('G3-08');
    const cai = decoyTile(p.decoys.find((d) => d.t === '才')!, 0, 'ADV');
    const ans = [t[0], t[1], cai, t[3], t[4]];
    const g = gradeOrder(t, ans, p);
    expect(g.codes[0]).toBe('LEX.NEAR_SYNONYM');
  });

  it('applies token-pair constraints (还 before 没)', () => {
    const t = tilesOf(sentence('G3-11:ex1')); // 他 还 没 回来
    const g = gradeOrder(t, byText(t, '他', '没', '还', '回来'), pattern('G3-11'));
    expect(g.codes).toContain('ORDER.MULTI_ADVERB');
  });

  it('flags a duration placed before the verb', () => {
    const t = tilesOf(sentence('G3-14:ex1')); // 我 学 了 两年 汉语
    const g = gradeOrder(t, byText(t, '我', '两年', '学', '了', '汉语'), pattern('G3-14'));
    expect(g.codes[0]).toBe('COMP.DURATION_POSITION');
  });

  it('flags a 比 phrase after the adjective', () => {
    const t = tilesOf(sentence('G3-17:ex2')); // 他 比我 高 一点儿
    const g = gradeOrder(t, byText(t, '他', '高', '比我', '一点儿'), pattern('G3-17'));
    expect(g.codes[0]).toBe('ORDER.COMPARISON');
  });
});

describe('every authored sentence is self-consistent', () => {
  it('canonical tiles grade as correct and every pattern has tiles', () => {
    for (const p of content.bundle.grammar) {
      for (const s of [...p.examples, ...p.instanceBank, ...(p.generated ?? [])]) {
        const t = tilesOf(s);
        expect(t.length, s.id).toBeGreaterThan(1);
        expect(gradeOrder(t, t, p).correct, s.id).toBe(true);
      }
    }
  });
  it('transform answers and cloze items are well-formed', () => {
    for (const tr of content.bundle.transforms) expect(tilesOf(tr.answer).length, tr.id).toBeGreaterThan(1);
    for (const c of content.bundle.cloze) {
      expect(c.options.filter((o) => o.correct).length, c.id).toBe(1);
      expect(c.sentence.tokens[c.blank].kind, c.id).toBe('target');
    }
  });
});

describe('builders respect the coverage gate (G1/G4)', () => {
  it('a slot exercise only uses sentences whose words are all known', () => {
    const p = pattern('G3-06');
    const card = newCard('gram.form', p.id, 'curriculum', NOW);
    expect(buildSlot(card, p, new Set(), rng(1))).toBeNull();
    expect(grammarPlayable(card, content, new Set())).toBe(false);
    const ex = buildSlot(card, p, allWords, rng(1))!;
    expect(ex.bank.length).toBeGreaterThanOrEqual(ex.canonical.length);
    expect(ex.bank.filter((t) => t.decoy).length).toBeLessThanOrEqual(1);
  });

  it('falls back to generated sentences when authored ones are recent', () => {
    const p = pattern('G3-01');
    const card = { ...newCard('gram.form', p.id, 'curriculum', NOW), recentInstanceIds: [...p.examples, ...p.instanceBank].map((s) => s.id) };
    expect(playableSentences(p, allWords, card).some((s) => s.source === 'generated')).toBe(true);
  });

  it('gram.use alternates minimal pairs and cloze', () => {
    const p = pattern('G3-06');
    const card = newCard('gram.use', p.id, 'curriculum', NOW);
    expect(buildPair(card, p, content, allWords, rng(2))).toBeNull(); // G3-06 has cloze only
    expect(buildCloze(card, p, content, allWords, rng(2))?.options.length).toBe(3);
    expect(buildGrammar(card, content, allWords, rng(2))?.kind).toBe('cloze');
    const card8 = newCard('gram.use', 'G3-08', 'curriculum', NOW);
    expect(buildGrammar(card8, content, allWords, rng(2))?.kind).toBe('pair');
  });

  it('foundation clusters use sentence judgement', () => {
    const card = newCard('gram.form', 'G12-05', 'bridge', NOW);
    const ex = buildGrammar(card, content, new Set(), rng(3));
    expect(ex?.kind).toBe('judgement');
  });
});
