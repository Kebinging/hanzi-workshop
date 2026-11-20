import type { PairSrc } from './authoring';

// Contrastive minimal pairs, HSK 4 units 21–24 (spec 3.2). "___" marks each gap.
export const pairsU21to24: PairSrc[] = [
  {
    contrast: '左右 vs 多 (approximation)', patternIds: ['G4-49'],
    items: [
      { context: '这 件 衣服 一 百 块 ___ 。', en: 'This costs about a hundred yuan.', options: [
        ['左右', true, '左右 follows the whole amount.'],
        ['多', false, '多 goes before the measure word: 一百多块.', 'ORDER.GENERAL'],
      ] },
      { context: '商场 里 有 %二十 ___ 家 商店 。', en: 'There are more than twenty shops in the mall.', options: [
        ['多', true, 'Round number + 多 + M.'],
        ['左右', false, '左右 goes after the measure word and noun: 二十家左右.', 'ORDER.GENERAL'],
      ] },
    ],
  },
  {
    contrast: '每 / 所有 / 一切', patternIds: ['G4-51', 'G4-52'],
    items: [
      { context: '___ 件 衣服 都 打折 。', en: 'Every item of clothing is reduced.', options: [
        ['每', true, '每 + measure word.'],
        ['所有', false, '所有 can’t take a measure word directly.', 'LEX.COLLOCATION'],
      ] },
      { context: '___ 的 商品 都 打折 。', en: 'All the goods are reduced.', options: [
        ['所有', true, '所有 + 的 + noun.'],
        ['每', false, '每 needs a measure word: 每件商品.', 'LEX.MEASURE_WORD'],
      ] },
      { context: '___ 都 准备 好 了 。', en: 'Everything is ready.', options: [
        ['一切', true, '"Everything" standing alone → 一切.'],
        ['所有', false, '所有 needs a noun after it.', 'LEX.COLLOCATION'],
      ] },
    ],
  },
  {
    contrast: '变得 vs 成为', patternIds: ['G4-55'],
    items: [
      { context: '他 ___ 了 一 个 有名 的 医生 。', en: 'He became a famous doctor.', options: [
        ['成为', true, '成为 + noun.'],
        ['变得', false, '变得 is followed by an adjective, not a noun.', 'LEX.COLLOCATION'],
      ] },
      { context: '天气 ___ 很 冷 。', en: 'The weather has turned cold.', options: [
        ['变得', true, '变得 + (很) adjective.'],
        ['成为', false, '成为 needs a noun.', 'LEX.COLLOCATION'],
      ] },
    ],
  },
  {
    contrast: '满 vs 遍', patternIds: ['G4-56'],
    items: [
      { context: '房间 里 坐 ___ 了 人 。', en: 'The room is packed with people.', options: [
        ['满', true, '"Full of" → 满.'],
        ['遍', false, '遍 means all over / every one.', 'COMP.RESULT_CHOICE'],
      ] },
      { context: '我 找 ___ 了 整个 商场 。', en: 'I searched the whole mall.', options: [
        ['遍', true, 'Searching everywhere → 找遍.'],
        ['满', false, '满 means full; searching everywhere is 找遍.', 'COMP.RESULT_CHOICE'],
      ] },
    ],
  },
  {
    contrast: '不是…而是 vs 不是…就是', patternIds: ['G4-59', 'G4-60'],
    items: [
      { context: '这 不 是 雾 ， ___ 污染 。', en: "This isn't fog — it's pollution.", options: [
        ['而是', true, '"Not A but B" → 而是.'],
        ['就是', false, '不是…就是 means "either A or B".', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '周末 他 不 是 看 书 ， ___ 睡觉 。', en: 'At weekends he either reads or sleeps.', options: [
        ['就是', true, '"Either A or B" → 不是…就是.'],
        ['而是', false, '不是…而是 rejects A; here both happen.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
  {
    contrast: '一点儿也不 + Adj', patternIds: ['G4-64'],
    items: [
      { context: '我 ___ 累 。', en: "I'm not tired at all.", options: [
        ['一点儿也不', true, '一点儿 + 也 + 不 + Adj.'],
        ['不一点儿', false, 'The order is 一点儿也不 + Adj.', 'ORDER.GENERAL'],
      ] },
    ],
  },
  {
    contrast: '再 (however) vs 又', patternIds: ['G4-65'],
    items: [
      { context: '你 ___ 忙 ， 也 要 吃 饭 。', en: 'However busy you are, you still have to eat.', options: [
        ['再', true, '再 + Adj …，也 … = however ….'],
        ['又', false, '又 means "again" or "both … and".', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '据说 vs 可见', patternIds: ['G4-67', 'G4-68'],
    items: [
      { context: '___ ， 这 个 机器人 会 说 汉语 。', en: 'Apparently this robot can speak Chinese.', options: [
        ['据说', true, 'Second-hand report → 据说.'],
        ['可见', false, '可见 draws a conclusion from evidence already given.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 每 天 都 练习 ， ___ 他 很 努力 。', en: 'He practises every day — clearly he works hard.', options: [
        ['可见', true, 'Evidence → conclusion: 可见.'],
        ['据说', false, '据说 reports hearsay; here the speaker draws a conclusion.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '另外 vs 总之', patternIds: ['G4-69', 'G4-70'],
    items: [
      { context: '___ ， 请 大家 带 好 护照 。', en: "Also, please don't forget your passports.", options: [
        ['另外', true, 'Adding a point → 另外.'],
        ['总之', false, '总之 sums up; it doesn’t add a new point.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 很 聪明 ， 也 很 努力 ， ___ 是 一 个 好 学生 。', en: "He's clever and hard-working — in short, a good student.", options: [
        ['总之', true, 'Summing up → 总之.'],
        ['另外', false, '另外 adds a point; here the clause sums up.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '并且 vs 而', patternIds: ['G4-72'],
    items: [
      { context: '哥哥 喜欢 运动 ， ___ 弟弟 喜欢 看 书 。', en: 'The older brother likes sport, whereas the younger likes reading.', options: [
        ['而', true, 'Two different subjects contrasted → 而.'],
        ['并且', false, '并且 adds to the same subject; contrast is 而.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 提出 了 问题 ， ___ 解决 了 问题 。', en: 'He raised the problem and solved it too.', options: [
        ['并且', true, 'Same subject, adding an action → 并且.'],
        ['而', false, '而 contrasts two subjects.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
];
