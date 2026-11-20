import type { PairSrc } from './authoring';

// Contrastive minimal pairs, HSK 5 units 29–32 (spec 3.2). "___" marks each gap.
export const pairsU29to32: PairSrc[] = [
  {
    contrast: '当作 vs 作为', patternIds: ['G5-26'],
    items: [
      { context: '他 把 我 ___ 好 朋友 。', en: 'He treats me as a good friend.', options: [
        ['当作', true, '把 A 当作 B = treat A as B.'],
        ['因为', false, '因为 gives a reason; 把 … ___ B needs 当作.', 'LEX.COLLOCATION'],
      ] },
      { context: '很 多 人 把 手机 ___ 生活 的 一 部分 。', en: 'Many people see their phone as part of life.', options: [
        ['看作', true, '把 A 看作 B = regard A as B.'],
        ['看见', false, '看见 = see (physically).', 'LEX.COLLOCATION'],
      ] },
    ],
  },
  {
    contrast: '对 … 而言 / 从 … 来看 / 在 … 看来', patternIds: ['G5-31', 'G5-32', 'G5-33'],
    items: [
      { context: '___ 学生 而言 ， 考试 很 重要 。', en: 'For students, exams are important.', options: [
        ['对', true, '对 … 而言 = as far as … is concerned.'],
        ['在', false, '在 pairs with 看来, not 而言.', 'LEX.COLLOCATION'],
      ] },
      { context: '在 我 ___ ， 这 个 办法 不错 。', en: 'In my view, this method is fine.', options: [
        ['看来', true, '在 … 看来 = in … view.'],
        ['而言', false, '而言 pairs with 对, not 在.', 'LEX.COLLOCATION'],
      ] },
      { context: '___ 数据 来 看 ， 学生 越来越 多 。', en: 'Judging from the data, there are more and more students.', options: [
        ['从', true, '从 … 来看 = judging from.'],
        ['对', false, '对 pairs with 而言, not 来看.', 'LEX.COLLOCATION'],
      ] },
    ],
  },
  {
    contrast: '况且 vs 可是', patternIds: ['G5-36'],
    items: [
      { context: '太 晚 了 ， ___ 外面 还 下雨 ， 你 别 去 了 。', en: "It's late, and besides it's raining — don't go.", options: [
        ['况且', true, 'Adds another reason in the same direction → 况且.'],
        ['可是', false, '可是 turns the argument; here the reasons add up.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '这 个 房子 很 漂亮 ， ___ 太 贵 了 。', en: 'This flat is lovely, but too expensive.', options: [
        ['可是', true, 'A turn → 可是.'],
        ['况且', false, '况且 adds a reason in the same direction; this is a contrast.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '自从 vs 从来', patternIds: ['G5-37'],
    items: [
      { context: '___ 搬 到 这儿 ， 我 每 天 都 步行 上班 。', en: "Since moving here, I've walked to work every day.", options: [
        ['自从', true, 'Since a past point → 自从.'],
        ['从来', false, '从来 = always / never, with 不 / 没.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 ___ 没有 迷路 过 。', en: 'He has never got lost.', options: [
        ['从来', true, 'Never → 从来 + 没.'],
        ['自从', false, '自从 needs a starting point after it.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '沿着 / 朝 / 按', patternIds: ['G5-39', 'G5-40', 'G5-42'],
    items: [
      { context: '我们 ___ 河 散步 。', en: 'We walk along the river.', options: [
        ['沿着', true, 'Along a path → 沿着.'],
        ['按', false, '按 = according to.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '我 的 房间 ___ 南 。', en: 'My room faces south.', options: [
        ['朝', true, 'Facing a direction → 朝.'],
        ['沿着', false, '沿着 = along; facing is 朝.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '房租 ___ 月 交 。', en: 'Rent is paid monthly.', options: [
        ['按', true, 'By a unit → 按.'],
        ['朝', false, '朝 = towards.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '总算 vs 差点儿', patternIds: ['G5-46'],
    items: [
      { context: '等 了 三 个 小时 ， 车 ___ 来 了 。', en: 'After three hours, the bus finally came.', options: [
        ['总算', true, 'It happened at last → 总算.'],
        ['差点儿', false, '差点儿 = nearly (but didn’t).', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '路 上 很 堵 ， 我 ___ 没 赶 上 飞机 。', en: 'The traffic was bad; I nearly missed the plane.', options: [
        ['差点儿', true, 'Nearly happened → 差点儿.'],
        ['总算', false, '总算 = at last; this is a near miss.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '偶然 vs 果然', patternIds: ['G5-47'],
    items: [
      { context: '我 ___ 在 街头 遇到 了 以前 的 同学 。', en: 'I ran into an old classmate in the street by chance.', options: [
        ['偶然', true, 'By chance → 偶然.'],
        ['果然', false, '果然 = as expected; this was chance.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '大家 都 说 他 会 成功 ， 他 ___ 成功 了 。', en: 'Everyone said he would succeed, and he did.', options: [
        ['果然', true, 'As expected → 果然.'],
        ['偶然', false, '偶然 = by chance; this was expected.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: 'V来V去 vs V着V着', patternIds: ['G5-43', 'G5-44'],
    items: [
      { context: '他 想 ___ 想 ___ ， 还是 决定 放弃 。', en: 'He thought it over and over and decided to give up.', options: [
        ['来|去', true, 'Over and over → V来V去.'],
        ['着|着', false, 'V着V着 sets a background for something unexpected.', 'COMP.DIRECTION'],
      ] },
      { context: '他 说 ___ 说 ___ ， 就 哭 了 。', en: 'As he was talking, he started crying.', options: [
        ['着|着', true, 'Something unexpected during the action → V着V着.'],
        ['来|去', false, 'V来V去 = repeatedly; here the crying interrupts the talking.', 'COMP.DIRECTION'],
      ] },
    ],
  },
];
