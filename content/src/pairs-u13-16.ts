import type { PairSrc } from './authoring';

// Contrastive minimal pairs, HSK 4 units 13–16 (spec 3.2). "___" marks each gap.
export const pairsU13to16: PairSrc[] = [
  {
    contrast: '竟然 vs 当然', patternIds: ['G4-01'],
    items: [
      { context: '他 每 天 都 迟到 ， 今天 ___ 按时 来 了 ！', en: "He's late every day, but today he actually came on time!", options: [
        ['竟然', true, 'Nobody expected it → 竟然.'],
        ['当然', false, '当然 = of course; this was a surprise.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 帮 了 我 ， 我 ___ 要 谢谢 你 。', en: 'You helped me, so of course I must thank you.', options: [
        ['当然', true, 'Expected, natural → 当然.'],
        ['竟然', false, 'Nothing surprising here; 竟然 marks the unexpected.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '这么 简单 的 题 ， 他 ___ 做 错 了 。', en: 'Such an easy question, and he actually got it wrong.', options: [
        ['居然', true, 'Unexpected → 居然 / 竟然.'],
        ['当然', false, 'Getting an easy question wrong is not "of course".', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '难道…吗 vs 到底', patternIds: ['G4-02', 'G4-03'],
    items: [
      { context: '你 ___ 去 不 去 ？', en: 'Are you going or not?', options: [
        ['到底', true, 'A real question with V不V → 到底.'],
        ['难道', false, '难道 needs a rhetorical question ending in 吗.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 ___ 不 知道 吗 ？', en: 'Surely you know?', options: [
        ['难道', true, 'Rhetorical … 吗 → 难道.'],
        ['到底', false, '到底 can’t be used with 吗.', 'CONJ.MISSING_PARTNER'],
      ] },
      { context: '这 个 文件 ___ 是 谁 写 的 ？', en: 'Who on earth wrote this document?', options: [
        ['究竟', true, 'Pressing for the real answer to a 谁 question → 究竟 / 到底.'],
        ['难道', false, '难道 doesn’t go with a question word like 谁.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '并不 vs 不', patternIds: ['G4-04'],
    items: [
      { context: '大家 都 说 这 个 工作 很 难 ， 其实 它 ___ 难 。', en: "Everyone says this job is hard, but actually it isn't.", options: [
        ['并不', true, 'Contradicting what people assume → 并不.'],
        ['不并', false, 'The order is fixed: 并不.', 'ORDER.MULTI_ADVERB'],
      ] },
      { context: '我 ___ 说 过 这 句 话 。', en: 'I never said that.', options: [
        ['并没', true, '并没 + V过 denies an assumption about the past.'],
        ['没并', false, 'The order is fixed: 并没.', 'ORDER.MULTI_ADVERB'],
      ] },
    ],
  },
  {
    contrast: '往往 vs 常常', patternIds: ['G4-05'],
    items: [
      { context: '欢迎 你 以后 ___ 来 。', en: 'Do come often from now on.', options: [
        ['常常', true, 'Invitation / future → 常常.'],
        ['往往', false, '往往 can’t be used for the future or for requests.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 要 ___ 锻炼 身体 。', en: 'You should exercise often.', options: [
        ['常常', true, 'Advice → 常常.'],
        ['往往', false, '往往 sums up a tendency; it can’t give advice.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '曾经 vs 从来', patternIds: ['G4-06'],
    items: [
      { context: '我 ___ 没 去 过 北京 。', en: "I've never been to Beijing.", options: [
        ['从来', true, 'Never → 从来没 V过.'],
        ['曾经', false, '曾经 isn’t used with 没 to mean "never".', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 ___ 在 这儿 住 过 两 年 。', en: 'He once lived here for two years.', options: [
        ['曾经', true, 'Once, at some point in the past → 曾经.'],
        ['从来', false, '从来 needs 不 / 没 or 都.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '即使 / 既然 / 尽管', patternIds: ['G4-07', 'G4-09', 'G4-10'],
    items: [
      { context: '___ 你 已经 来 了 ， 就 多 住 几 天 吧 。', en: "Since you're here already, stay a few more days.", options: [
        ['既然', true, 'Known fact → conclusion with 就.'],
        ['即使', false, '即使 is "even if" and pairs with 也.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '___ 明天 下雨 ， 我们 也 要 去 。', en: "Even if it rains tomorrow, we're going.", options: [
        ['即使', true, 'Hypothetical "even if" + 也.'],
        ['既然', false, '既然 needs a known fact and leads to 就.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '___ 他 很 累 ， 可是 还 在 工作 。', en: "Although he's tired, he's still working.", options: [
        ['尽管', true, 'A real fact + contrast → 尽管 … 可是.'],
        ['即使', false, '即使 is hypothetical and pairs with 也, not 可是.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '无论 vs 虽然', patternIds: ['G4-08'],
    items: [
      { context: '___ 你 去 不 去 ， 我 都 去 。', en: "Whether you go or not, I'm going.", options: [
        ['无论', true, 'A choice (去不去) + 都 → 无论 / 不管.'],
        ['虽然', false, '虽然 introduces one fact and pairs with 但是.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '___ 他 很 忙 ， 但是 每 天 都 给 母亲 打 电话 。', en: "Although he's busy, he rings his mother every day.", options: [
        ['虽然', true, 'One real fact + 但是 → 虽然.'],
        ['无论', false, '无论 needs a choice or question word and pairs with 都.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
  {
    contrast: '只要…就 vs 除非…才', patternIds: ['G4-12'],
    items: [
      { context: '___ 你 道歉 ， 她 才 会 原谅 你 。', en: "She'll only forgive you if you apologise.", options: [
        ['除非', true, 'Only if → 除非 … 才.'],
        ['只要', false, '只要 pairs with 就.', 'CONJ.CONDITION_LOGIC'],
      ] },
      { context: '___ 你 道歉 ， 她 就 会 原谅 你 。', en: "As long as you apologise, she'll forgive you.", options: [
        ['只要', true, 'That is enough → 只要 … 就.'],
        ['除非', false, '除非 pairs with 才 or 否则.', 'CONJ.CONDITION_LOGIC'],
      ] },
    ],
  },
  {
    contrast: '与其…不如 vs 宁可…也不', patternIds: ['G4-13', 'G4-14'],
    items: [
      { context: '与其 坐 出租车 ， ___ 坐 地铁 。', en: "Better to take the metro than a taxi.", options: [
        ['不如', true, '与其 … 不如.'],
        ['也不', false, '也不 belongs to 宁可.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '我 宁可 走 路 ， ___ 坐 他 的 车 。', en: "I'd rather walk than ride in his car.", options: [
        ['也不', true, '宁可 … 也不.'],
        ['不如', false, '不如 belongs to 与其.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
  {
    contrast: '不如 / 比…还', patternIds: ['G4-15', 'G4-18'],
    items: [
      { context: '坐 公共汽车 ___ 坐 地铁 快 。', en: "The bus isn't as fast as the metro.", options: [
        ['不如', true, 'Not as … as → 不如.'],
        ['比', false, '比 would say the bus is faster.', 'COMP.NEG_COMPARISON'],
      ] },
      { context: '弟弟 比 哥哥 ___ 高 。', en: 'The younger brother is even taller than the older one.', options: [
        ['还', true, '比 … 还 + Adj.'],
        ['很', false, 'No 很 inside a 比 sentence.', 'COMP.DEGREE_IN_BI'],
      ] },
    ],
  },
  {
    contrast: '通过 vs 为了', patternIds: ['G4-19'],
    items: [
      { context: '我 ___ 看 电影 练习 听力 。', en: 'I practise listening by watching films.', options: [
        ['通过', true, 'The means → 通过.'],
        ['为了', false, '为了 gives a purpose, not the means.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '___ 练习 听力 ， 我 每 天 看 电影 。', en: 'I watch films every day to practise listening.', options: [
        ['为了', true, 'The goal → 为了.'],
        ['通过', false, '通过 gives the means; here the first part is the goal.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '于是 vs 但是', patternIds: ['G4-21'],
    items: [
      { context: '我 不 懂 这 个 词语 ， ___ 去 问 老师 。', en: "I didn't understand the expression, so I went and asked the teacher.", options: [
        ['于是', true, 'What happened next, as a result → 于是.'],
        ['但是', false, '但是 marks a contrast.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 累 了 ， ___ 休息 一下 吧 。', en: "You're tired — have a rest.", options: [
        ['就', true, 'Advice after a condition → 就.'],
        ['于是', false, '于是 narrates real events; it can’t give advice.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
];
