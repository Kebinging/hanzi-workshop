import type { PairSrc } from './authoring';

// Contrastive minimal pairs, HSK 5 units 25–28 (spec 3.2). "___" marks each gap.
export const pairsU25to28: PairSrc[] = [
  {
    contrast: '果然 vs 竟然', patternIds: ['G5-01'],
    items: [
      { context: '大家 都 说 他 能 赢 ， 他 ___ 赢 了 。', en: 'Everyone said he would win, and sure enough he did.', options: [
        ['果然', true, 'Just as expected → 果然.'],
        ['竟然', false, '竟然 marks a surprise; this was expected.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '谁 都 觉得 他 会 赢 ， 可是 他 ___ 输 了 。', en: 'Everyone thought he would win, but he actually lost.', options: [
        ['竟然', true, 'Contrary to expectation → 竟然.'],
        ['果然', false, '果然 confirms an expectation; this was a surprise.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '万一 / 未必 / 难免', patternIds: ['G5-02', 'G5-03', 'G5-05'],
    items: [
      { context: '带 上 伞 吧 ， ___ 下雨 呢 。', en: 'Take an umbrella, in case it rains.', options: [
        ['万一', true, 'An unlikely possibility → 万一.'],
        ['既然', false, '既然 states a known fact; here it is only a possibility.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '贵 的 东西 ___ 好 。', en: "Expensive things aren't necessarily good.", options: [
        ['未必', true, 'Not necessarily → 未必.'],
        ['一定', false, 'The point is "not necessarily", not "definitely".', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '刚 开始 工作 ， ___ 会 有 失误 。', en: "When you've just started, mistakes are bound to happen.", options: [
        ['难免', true, 'Bound to happen → 难免.'],
        ['难怪', false, '难怪 = no wonder.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '要不是 vs 要是', patternIds: ['G5-08'],
    items: [
      { context: '___ 你 帮忙 ， 我 早 就 放弃 了 。', en: "If it hadn't been for your help, I'd have given up long ago.", options: [
        ['要不是', true, 'The help really happened → 要不是.'],
        ['要是', false, '要是 = if; here the help really happened.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '___ 你 有 时间 ， 就 来 我 家 吧 。', en: 'If you have time, come to my place.', options: [
        ['要是', true, 'A simple condition → 要是.'],
        ['要不是', false, '要不是 = if it weren’t for (something real).', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '哪怕 / 一旦', patternIds: ['G5-07', 'G5-10'],
    items: [
      { context: '___ 工作 再 忙 ， 我 也 会 陪 孩子 。', en: "However busy work is, I'll still spend time with my child.", options: [
        ['哪怕', true, '"Even if" + 也 → 哪怕.'],
        ['既然', false, '既然 pairs with 就.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '___ 结婚 ， 就 要 承担 责任 。', en: "Once you're married, you have to take on responsibility.", options: [
        ['一旦', true, 'Once … then → 一旦 … 就.'],
        ['虽然', false, '虽然 introduces a contrast with 但是.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
  {
    contrast: '以便 vs 以免', patternIds: ['G5-13', 'G5-14'],
    items: [
      { context: '请 留 下 电话 号码 ， ___ 我们 联系 你 。', en: 'Please leave your number so that we can contact you.', options: [
        ['以便', true, 'A goal to reach → 以便.'],
        ['以免', false, '以免 = so as not to; contacting you is the goal.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '出门 带 伞 ， ___ 衣服 被 雨 弄 湿 。', en: "Take an umbrella so your clothes don't get wet.", options: [
        ['以免', true, 'Something to avoid → 以免.'],
        ['以便', false, '以便 introduces a goal, not something to avoid.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '因而 vs 然而', patternIds: ['G5-16'],
    items: [
      { context: '物价 上升 了 ， ___ 大家 减少 了 消费 。', en: 'Prices went up, so people spent less.', options: [
        ['因而', true, 'Consequence → 因而.'],
        ['然而', false, '然而 = however.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '舍不得 / 恨不得 / 说不定', patternIds: ['G5-19', 'G5-20', 'G5-22'],
    items: [
      { context: '这 件 衣服 太 漂亮 了 ， 我 ___ 穿 。', en: "This is too lovely — I can't bring myself to wear it.", options: [
        ['舍不得', true, "Can't bear to → 舍不得."],
        ['不得不', false, '不得不 = forced to.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '我 太 累 了 ， ___ 马上 睡觉 。', en: "I'm so tired I wish I could sleep right now.", options: [
        ['恨不得', true, 'An impatient wish → 恨不得.'],
        ['舍不得', false, "舍不得 = can't bear to part with something.", 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '多 运动 ， ___ 就 不 失眠 了 。', en: "Exercise more — maybe you'll stop having trouble sleeping.", options: [
        ['说不定', true, 'A possibility → 说不定.'],
        ['不见得', false, '不见得 doubts a claim; here it is a hopeful possibility.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '不由得 vs 不得不', patternIds: ['G5-23'],
    items: [
      { context: '听 到 这 个 消息 ， 她 ___ 哭 了 。', en: "Hearing the news, she couldn't help crying.", options: [
        ['不由得', true, 'An involuntary reaction → 不由得.'],
        ['不得不', false, '不得不 = forced by circumstances.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '车 坏 了 ， 我们 ___ 走 回去 。', en: 'The car broke down, so we had to walk back.', options: [
        ['不得不', true, 'Forced by circumstances → 不得不.'],
        ['不由得', false, '不由得 is an involuntary feeling, not being forced.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
];
