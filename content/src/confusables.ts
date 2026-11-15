import type { ConfusableSet } from '../../src/content/types';

export const confusables: ConfusableSet[] = [
  { id: 'cf_ji_yi', kind: 'lookalike', chars: ['己', '已'], hints: { 己: '己 jǐ "self": the last stroke hook stays open — 自己.', 已: '已 yǐ "already": the stroke closes half-way up — 已经.' } },
  { id: 'cf_mai', kind: 'antonym_form', chars: ['买', '卖'], hints: { 买: '买 mǎi "buy": no 十 on top.', 卖: '卖 mài "sell": 十 on top — you add (十) goods to sell.' } },
  { id: 'cf_wu_niu', kind: 'lookalike', chars: ['午', '牛'], hints: { 午: '午 wǔ "noon": the vertical stops at the top line.', 牛: '牛 niú "cow": the vertical pokes through the top.' } },
  { id: 'cf_wen_jian', kind: 'lookalike', chars: ['问', '间'], hints: { 问: '问 wèn "ask": a mouth 口 in the door 门.', 间: '间 jiān "between/room": the sun 日 in the door 门.' } },
  { id: 'cf_xiu_ti', kind: 'lookalike', chars: ['休', '体'], hints: { 休: '休 xiū "rest": person 亻 leaning on a tree 木.', 体: '体 tǐ "body": person 亻 + 本 (root) — one extra stroke at the bottom.' } },
  { id: 'cf_zhu_wang', kind: 'lookalike', chars: ['住', '往'], hints: { 住: '住 zhù "live": person 亻 + 主.', 往: '往 wǎng "towards": double-person 彳 (walking) + 主.' } },
  { id: 'cf_ri_bai', kind: 'lookalike', chars: ['日', '白', '自'], hints: { 日: '日 rì "sun/day": a plain box with one middle stroke.', 白: '白 bái "white": 日 with a dot on top.', 自: '自 zì "self": a taller box with two middle strokes and a dot.' } },
  { id: 'cf_da_tai', kind: 'lookalike', chars: ['大', '太', '天', '夫'], hints: { 大: '大 dà "big": a person with arms out.', 太: '太 tài "too": 大 with a dot underneath.', 天: '天 tiān "sky/day": a line above 大; top line shorter.', 夫: '夫 fū "man/husband": the vertical pokes above the top line.' } },
  { id: 'cf_jin_leng', kind: 'lookalike', chars: ['今', '冷', '会'], hints: { 今: '今 jīn "now": roof 人 + 一 + a hooked stroke.', 冷: '冷 lěng "cold": ice 冫 + 令.', 会: '会 huì "can/meeting": roof 人 + 云 underneath.' } },
  { id: 'cf_zhao_wo', kind: 'lookalike', chars: ['找', '我'], hints: { 找: '找 zhǎo "look for": hand 扌 + 戈 (no left 手 shape).', 我: '我 wǒ "I": a full 手-like left part + 戈.' } },
  { id: 'cf_li', kind: 'lookalike', chars: ['历', '力', '办'], hints: { 历: '历 lì "history": 力 under a cliff 厂.', 力: '力 lì "strength": a single arm-shape.', 办: '办 bàn "do/handle": 力 with a dot on each side.' } },
  { id: 'cf_mo_wei', kind: 'lookalike', chars: ['末', '未'], hints: { 末: '末 mò "end": the TOP horizontal is longer — 周末.', 未: '未 wèi "not yet": the top horizontal is shorter.' } },
  { id: 'cf_zai_zai', kind: 'homophone', chars: ['在', '再'], hints: { 在: '在 zài "at/in; -ing" — 现在, 在家.', 再: '再 zài "again (future)" — 再见, 再来.' } },
  { id: 'cf_zuo_zuo', kind: 'homophone', chars: ['做', '作', '坐'], hints: { 做: '做 zuò "do/make" (concrete): 做饭, 做作业.', 作: '作 zuò in compounds: 工作, 作业.', 坐: '坐 zuò "sit": two people 人人 on the ground 土.' } },
  { id: 'cf_jin_jin', kind: 'homophone', chars: ['进', '近'], hints: { 进: '进 jìn "enter": 辶 + 井.', 近: '近 jìn "near": 辶 + 斤.' } },
  { id: 'cf_ji_ji', kind: 'lookalike', chars: ['机', '几'], hints: { 机: '机 jī "machine": tree 木 + 几.', 几: '几 jǐ "how many": on its own.' } },
];
