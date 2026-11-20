import type { PairSrc } from './authoring';

// Contrastive minimal pairs, HSK 5 units 33–36 (spec 3.2). "___" marks each gap.
export const pairsU33to36: PairSrc[] = [
  {
    contrast: '要么 … 要么 vs 不是 … 就是', patternIds: ['G5-52'],
    items: [
      { context: '你 ___ 自学 ， ___ 请 家教 ， 自己 选 吧 。', en: 'Either teach yourself or get a tutor — your choice.', options: [
        ['要么|要么', true, 'Offering a choice → 要么…要么.'],
        ['不是|就是', false, '不是…就是 describes what is always the case, not a choice to make.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '他 周末 ___ 看 书 ， ___ 睡觉 ， 从来 不 出门 。', en: 'At weekends he is always either reading or sleeping — he never goes out.', options: [
        ['不是|就是', true, 'Describing a fact that is always one or the other → 不是…就是.'],
        ['要么|要么', false, '要么…要么 offers a choice; here it describes a habit.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
  {
    contrast: '之所以 vs 所以', patternIds: ['G5-61'],
    items: [
      { context: '他 ___ 成功 ， 是 因为 他 很 努力 。', en: 'The reason he succeeded is that he worked hard.', options: [
        ['之所以', true, 'Result first, then 是因为 → 之所以.'],
        ['所以', false, '所以 follows the reason; before 是因为 use 之所以.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '他 很 努力 ， ___ 成功 了 。', en: 'He worked hard, so he succeeded.', options: [
        ['所以', true, 'Reason first, then result → 所以.'],
        ['之所以', false, '之所以 needs 是因为 after it.', 'CONJ.MISSING_PARTNER'],
      ] },
    ],
  },
  {
    contrast: '不料 vs 果然', patternIds: ['G5-59', 'G5-72'],
    items: [
      { context: '我 觉得 天气 会 很 好 ， ___ 下 起 了 暴雨 。', en: 'I thought the weather would be fine, but out of nowhere it poured.', options: [
        ['不料', true, 'Against expectation → 不料.'],
        ['果然', false, '果然 confirms what you expected.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '预报 说 有 台风 ， 台风 ___ 来 了 。', en: 'The forecast said a typhoon was coming, and sure enough it came.', options: [
        ['果然', true, 'As expected → 果然.'],
        ['不料', false, '不料 marks a surprise; this was forecast.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '怎么能 … 呢 vs 怎么样', patternIds: ['G5-57'],
    items: [
      { context: '你 怎么 能 把 垃圾 扔 在 河 里 ___ ？', en: 'How could you throw rubbish in the river?', options: [
        ['呢', true, 'Rhetorical 怎么能 … 呢.'],
        ['吧', false, '吧 makes a suggestion; the rhetorical question ends with 呢.', 'CONJ.MISSING_PARTNER'],
      ] },
      { context: '你 ___ 能 不 关心 环境 呢 ？', en: 'How can you not care about the environment?', options: [
        ['怎么', true, '怎么能 … 呢 = how could ….'],
        ['什么', false, '什么 asks "what"; "how could" is 怎么.', 'LEX.MEANING'],
      ] },
    ],
  },
  {
    contrast: '刚 … 就 vs 一 … 就', patternIds: ['G5-45'],
    items: [
      { context: '我 ___ 到 家 ， 他 就 来 了 。', en: "I'd only just got home when he arrived.", options: [
        ['刚', true, 'One past occasion, right after → 刚 … 就.'],
        ['已经', false, '已经 = already; "had only just" is 刚.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 ___ 看 书 就 想 睡觉 。', en: 'Whenever he reads, he gets sleepy.', options: [
        ['一', true, 'A habit: every time A, B → 一 … 就.'],
        ['刚', false, '刚 … 就 narrates one occasion, not a habit.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '时而 … 时而 vs 又 … 又', patternIds: ['G5-48'],
    items: [
      { context: '天气 ___ 晴 ， ___ 阴 。', en: 'The weather keeps switching between sun and cloud.', options: [
        ['时而|时而', true, 'Alternating states → 时而…时而.'],
        ['又|又', false, '又…又 = both at the same time; sun and cloud alternate.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '这 个 苹果 ___ 大 ___ 红 。', en: 'This apple is big and red.', options: [
        ['又|又', true, 'Two qualities at once → 又…又.'],
        ['时而|时而', false, '时而…时而 is for alternating states.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
];
