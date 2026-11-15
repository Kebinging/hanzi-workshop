import type { PatternSource, Distractor } from './authoring';

// HSK 3 · Unit 10 · 要是…就好了 — Conditions, totality, choices (provisional).

const NOT_ALL: Distractor[] = [
  ['就', 'CONJ.PAIR_MISMATCH', 'With 一…/谁/什么 meaning "not even one / any", use 都 or 也.'],
  ['才', 'CONJ.PAIR_MISMATCH', 'With 一…/谁/什么 meaning "not even one / any", use 都 or 也.'],
];

export const patternsU10: PatternSource[] = [
  {
    id: 'G3-73', unit: 10, title: '如果 / 要是 … (的话)，就 …', titleZh: '如果／要是…就…',
    summary: 'If A, then B: 如果/要是 opens the condition, 就 sits before the verb of the result.',
    explanationMd: `
**Form:** **如果 / 要是** + condition (+ **的话**)，(S) + **就** + result

- 如果明天下雨，我们**就**不去了.
- 要是你有时间的话，**就**来我家吧.

就 is an adverb: after the subject of the second clause, before its verb. 要是 is more colloquial; 的话 is optional.`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '如果', b: '就', code: 'CONJ.PAIR_MISMATCH' }, { kind: 'pair', a: '要是', b: '就', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G12-01'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['*如果*/CONJ1 明天/T 下雨/V ， 我们/S *就*/ADV 不/ADV 去/V 了/SF 。', "If it rains tomorrow, we won't go."],
      ['*要是*/CONJ1 你/S 有/V 时间/O 的话/SF ， *就*/ADV 来/V 我 家 吧/SF 。', 'If you have time, come to my place.'],
      ['*如果*/CONJ1 你/S 不/ADV 舒服/V ， *就*/ADV 回/V 家/O 休息/V 吧/SF 。', "If you're not feeling well, go home and rest."],
    ],
    instances: [
      ['*如果*/CONJ1 你/S 累/V 了/SF ， *就*/ADV 休息/V 一会儿/C 。', "If you're tired, rest a while."],
      ['*要是*/CONJ1 我/S 有/V 钱/O ， 我/S *就*/ADV 去/V 中国 旅行 。', 'If I had money, I would travel to China.'],
      ['*如果*/CONJ1 明天/T 天气/S 好/V ， 我们/S *就*/ADV 去/V 爬山 。', "If the weather's good tomorrow, we'll go hiking."],
      ['*要是*/CONJ1 你/S 不/ADV 喜欢/V ， *就*/ADV 别/ADV 买/V 了/SF 。', "If you don't like it, don't buy it."],
      ['*如果*/CONJ1 你/S 有/V 问题/O ， *就*/ADV 给/PP 我 打/V 电话/O 。', 'If you have a question, phone me.'],
      ['*要是*/CONJ1 你/S 早/ADV 一点儿 来/V 的话/SF ， *就*/ADV 能/MOD 见/V 到/C 他 了/SF 。', 'If you had come a bit earlier, you could have seen him.'],
      ['*如果*/CONJ1 你/S 想/MOD 减肥/V ， *就*/ADV 要/MOD 多/ADV 运动/V 。', 'If you want to lose weight, you need to exercise more.'],
      ['*要是*/CONJ1 你/S 不/ADV 想/MOD 出去/V ， 我们/S *就*/ADV 叫/V 外卖/O 。', "If you don't want to go out, we'll order takeaway."],
    ],
    decoys: [['才', 'CONJ.PAIR_MISMATCH', '如果 / 要是 pair with 就, not 才.']],
    cloze: {
      blank: ['如果', '要是'],
      distractors: [
        ['虽然', 'CONJ.PAIR_MISMATCH', '虽然 = although; its partner is 但是/可是, not 就.'],
        ['因为', 'CONJ.PAIR_MISMATCH', '因为 = because; it pairs with 所以, and this sentence is a condition.'],
      ],
    },
    transforms: [
      { subtype: 'condition', inputs: ['明天 下雨 。', '我们 不 去 了 。'], chip: '如果…就', answer: '如果/CONJ1 明天/T 下雨/V ， 我们/S 就/ADV 不/ADV 去/V 了/SF 。', en: "If it rains tomorrow, we won't go.", decoys: [['才', 'CONJ.PAIR_MISMATCH', '如果 pairs with 就.']] },
    ],
  },
  {
    id: 'G3-74', unit: 10, title: '只要 … 就 … (as long as)', titleZh: '只要…就…',
    summary: '只要 gives a sufficient condition — that alone is enough: 只要努力，就能学好.',
    explanationMd: `
**Form:** **只要** + condition，(S) + **就** + result

- 只要努力，就能学好 — as long as you work hard, you'll learn it well.
- 只要你来，我就很高兴 — just you coming is enough to make me happy.

只要 = "this condition is enough". Compare 只有…才 (G3-75): "only this condition will do".`,
    formula: ['CONJ1', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '只要', b: '就', code: 'CONJ.CONDITION_LOGIC' }],
    requires: ['G3-73'],
    contrasts: ['G3-75'],
    errorCodes: ['CONJ.CONDITION_LOGIC', 'CONJ.PAIR_MISMATCH'],
    examples: [
      ['*只要*/CONJ1 努力/V ， *就*/ADV 能/MOD 学/V 好/C 。', "As long as you work hard, you'll learn it well."],
      ['*只要*/CONJ1 你/S 来/V ， 我/S *就*/ADV 很/ADV 高兴/V 。', "As long as you come, I'll be happy."],
      ['*只要*/CONJ1 有/V 时间/O ， 他/S *就*/ADV 去/V 跑步 。', 'Whenever he has time, he goes running.'],
    ],
    instances: [
      ['*只要*/CONJ1 多/ADV 练习/V ， 你/S 的 口语 *就*/ADV 会/MOD 越来越 好/V 。', 'As long as you practise, your spoken Chinese will keep improving.'],
      ['*只要*/CONJ1 你/S 报名/V ， *就*/ADV 可以/MOD 参加/V 比赛/O 。', 'As long as you sign up, you can take part.'],
      ['*只要*/CONJ1 天气/S 好/V ， 我们/S *就*/ADV 去/V 爬山 。', "As long as the weather's good, we'll go hiking."],
      ['*只要*/CONJ1 坚持/V ， *就*/ADV 能/MOD 成功/V 。', "As long as you keep at it, you'll succeed."],
      ['*只要*/CONJ1 你/S 喜欢/V ， *就*/ADV 买/V 吧/SF 。', 'If you like it, just buy it.'],
      ['*只要*/CONJ1 排队/V ， *就*/ADV 能/MOD 买/V 到/C 票/O 。', "As long as you queue, you'll get a ticket."],
      ['*只要*/CONJ1 吃/V 了/ASP 药/O ， 你/S *就*/ADV 会/MOD 好/V 的/SF 。', "Just take the medicine and you'll get better."],
      ['*只要*/CONJ1 你/S 说/V 慢/C 一点儿 ， 我/S *就*/ADV 听/V 得/C 懂 。', "As long as you speak a bit slower, I can understand."],
    ],
    decoys: [['才', 'CONJ.CONDITION_LOGIC', '只要 pairs with 就; 才 goes with 只有.']],
    cloze: {
      blank: ['只要'],
      distractors: [
        ['只有', 'CONJ.CONDITION_LOGIC', '只有 (only if) pairs with 才; with 就 you need 只要.'],
        ['虽然', 'CONJ.PAIR_MISMATCH', '虽然 = although; it pairs with 但是/可是.'],
      ],
    },
  },
  {
    id: 'G3-75', unit: 10, title: '只有 … 才 … (only if)', titleZh: '只有…才…',
    summary: '只有 gives a necessary condition — nothing else will do: 只有多读，才能看懂.',
    explanationMd: `
**Form:** **只有** + condition，(S) + **才** + result

- 只有多读，**才**能看懂 — only by reading a lot can you understand.
- 只有带护照，**才**能上飞机.

只有 always pairs with **才**; 只要 always pairs with **就**.`,
    formula: ['CONJ1', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '只有', b: '才', code: 'CONJ.CONDITION_LOGIC' }],
    requires: ['G3-74', 'G3-08'],
    contrasts: ['G3-74'],
    errorCodes: ['CONJ.CONDITION_LOGIC'],
    examples: [
      ['*只有*/CONJ1 多/ADV 读/V ， *才*/ADV 能/MOD 看/V 懂/C 。', 'Only by reading a lot can you understand.'],
      ['*只有*/CONJ1 你/S 来/V ， 我/S *才*/ADV 去/V 。', "I'll only go if you come."],
      ['*只有*/CONJ1 每/T 天 锻炼/V ， 身体/S *才*/ADV 会/MOD 健康/V 。', 'Only daily exercise will keep you healthy.'],
    ],
    instances: [
      ['*只有*/CONJ1 努力/ADV 学习/V ， *才*/ADV 能/MOD 考/V 上/C 大学/O 。', 'Only by studying hard can you get into university.'],
      ['*只有*/CONJ1 带/V 护照/O ， *才*/ADV 能/MOD 上/V 飞机/O 。', 'You can only board with a passport.'],
      ['*只有*/CONJ1 排队/V ， *才*/ADV 能/MOD 买/V 到/C 门票/O 。', 'You can only get a ticket by queueing.'],
      ['*只有*/CONJ1 认真/ADV 听/V ， *才*/ADV 听/V 得/C 懂 。', 'Only by listening carefully can you understand.'],
      ['*只有*/CONJ1 多/ADV 说/V ， 口语/S *才*/ADV 会/MOD 好/V 。', 'Your spoken Chinese will only improve if you speak a lot.'],
      ['*只有*/CONJ1 你/S 同意/V ， 我们/S *才*/ADV 能/MOD 去/V 。', 'We can only go if you agree.'],
      ['*只有*/CONJ1 坚持/V 下去/C ， *才*/ADV 会/MOD 成功/V 。', 'Only by keeping at it will you succeed.'],
      ['*只有*/CONJ1 去/V 中国/O ， 你/S *才*/ADV 会/MOD 习惯/V 中国 菜 。', "You'll only get used to Chinese food by going to China."],
    ],
    decoys: [['就', 'CONJ.CONDITION_LOGIC', '只有 (only if) pairs with 才; 就 goes with 只要.']],
    cloze: {
      blank: ['只有'],
      distractors: [
        ['只要', 'CONJ.CONDITION_LOGIC', '只要 pairs with 就; with 才 you need 只有.'],
        ['如果', 'CONJ.PAIR_MISMATCH', '如果 pairs with 就, not 才.'],
      ],
    },
  },
  {
    id: 'G3-76', unit: 10, title: '除了 … 以外，还/也 (besides) vs 都 (except)', titleZh: '除了…以外',
    summary: '除了X以外，还/也… = besides X, also …; 除了X以外，都… = everyone/everything except X.',
    explanationMd: `
**除了 X 以外** is a frame before the main clause; the adverb that follows decides the meaning:

- **还 / 也** — *in addition*: 除了汉语以外，我还学英语 (I study English too).
- **都** — *excluding*: 除了他以外，我们都去了 (everyone went except him).`,
    formula: ['PP', 'P', 'S', 'ADV', 'V', 'O'],
    constraints: [{ kind: 'before', a: 'PP', b: 'V', code: 'ORDER.PLACE_AFTER_VERB' }],
    requires: ['G12-01'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['*除了*/PP 汉语 *以外* ， 我/S *还*/ADV 学/V 英语/O 。', 'Besides Chinese, I also study English.'],
      ['*除了*/PP 他 *以外* ， 我们/S *都*/ADV 去/V 了/SF 。', 'All of us went except him.'],
      ['*除了*/PP 星期 天 *以外* ， 我/S 每/T 天 *都*/ADV 上班/V 。', 'I work every day except Sunday.'],
    ],
    instances: [
      ['*除了*/PP 苹果 *以外* ， 我/S *还*/ADV 买/V 了/ASP 香蕉/O 。', 'Besides apples, I also bought bananas.'],
      ['*除了*/PP #小王=XiǎoWáng=Xiao_Wang *以外* ， 大家/S *都*/ADV 来/V 了/SF 。', 'Everyone came except Xiao Wang.'],
      ['*除了*/PP 唱歌 *以外* ， 她/S *也*/ADV 喜欢/V 跳舞/O 。', 'Besides singing, she also likes dancing.'],
      ['*除了*/PP 牛肉 *以外* ， 我/S 什么/O *都*/ADV 吃/V 。', 'I eat everything except beef.'],
      ['*除了*/PP 周末 *以外* ， 他/S *都*/ADV 很/ADV 忙/V 。', "He's busy every day except at weekends."],
      ['*除了*/PP 果汁 *以外* ， 我们/S *还*/ADV 有/V 茶/O 和 咖啡 。', 'Besides juice, we also have tea and coffee.'],
      ['*除了*/PP 这 个 题 *以外* ， 其他/TOP 的 我/S *都*/ADV 会/V 。', 'I can do all the others except this question.'],
      ['*除了*/PP 跑步 *以外* ， 我/S *还*/ADV 去/V 游泳 。', 'Besides running, I also go swimming.'],
    ],
  },
  {
    id: 'G3-77', unit: 10, title: '一 + M + N + 也/都 + 不/没 (not a single one)', titleZh: '一…也／都不（没）',
    summary: '"Not one": 一 + measure word + noun, then 也/都 + negative: 教室里一个人也没有.',
    explanationMd: `
**Form:** 一 + measure word (+ noun) + **也 / 都** + 不 / 没 + V

- 教室里**一个人也没有** — not a single person in the classroom.
- 他**一句话也没说** — he didn't say a word.

The 一-phrase comes **before** the verb, usually with a negative.`,
    formula: ['S', 'O', 'ADV', 'V'],
    constraints: [{ kind: 'before', a: 'O', b: 'V', code: 'ORDER.OBJECT' }],
    requires: ['G12-07', 'G12-08'],
    contrasts: ['G3-78'],
    errorCodes: ['ORDER.OBJECT', 'CONJ.PAIR_MISMATCH'],
    examples: [
      ['教室/PP 里 *一*/O 个 人 *也*/ADV 没有/V 。', "There isn't a single person in the classroom."],
      ['我/S *一*/O 分 钱 *都*/ADV 没有/V 。', "I haven't got a single cent."],
      ['他/S *一*/O 句 话 *也*/ADV 没/ADV 说/V 。', "He didn't say a word."],
    ],
    instances: [
      ['冰箱/PP 里 *一*/O 个 鸡蛋 *也*/ADV 没有/V 了/SF 。', "There isn't a single egg left in the fridge."],
      ['我/S *一*/O 次 *也*/ADV 没/ADV 去/V 过/ASP 。', "I haven't been even once."],
      ['他/S *一*/O 个 朋友 *都*/ADV 没有/V 。', "He hasn't got a single friend."],
      ['我/S *一*/O 口 *也*/ADV 不/ADV 想/MOD 吃/V 。', "I don't want to eat a single bite."],
      ['今天/T 我/S *一*/O 个 小时 *也*/ADV 没/ADV 睡/V 。', "I haven't slept a single hour today."],
      ['这/TOP 些 生词 他/S *一*/O 个 *都*/ADV 不/ADV 认识/V 。', "He doesn't know a single one of these new words."],
      ['路/PP 上 *一*/O 辆 车 *也*/ADV 没有/V 。', "There's not a single car on the road."],
      ['他/S *一*/O 杯 酒 *也*/ADV 不/ADV 喝/V 。', "He doesn't drink a single glass of alcohol."],
    ],
    cloze: { blank: ['也', '都'], distractors: NOT_ALL },
  },
  {
    id: 'G3-78', unit: 10, title: '谁 / 什么 / 哪儿 + 都/也 (everyone, anything)', titleZh: '疑问代词的任指用法',
    summary: 'A question word + 都/也 means "every-/any-": 他什么都不吃, 谁都喜欢熊猫.',
    explanationMd: `
**Form:** question word + **都 / 也** + verb phrase

- 谁**都**喜欢熊猫 — everyone likes pandas.
- 他什么**都**不吃 — he doesn't eat anything.
- 我哪儿**都**不想去 — I don't want to go anywhere.

The question word goes **before** 都/也 and the verb — even when it's the object.`,
    formula: ['S', 'O', 'ADV', 'V'],
    constraints: [{ kind: 'before', a: 'O', b: 'ADV', code: 'ORDER.OBJECT' }],
    requires: ['G3-77'],
    contrasts: ['G3-77'],
    errorCodes: ['ORDER.OBJECT', 'CONJ.PAIR_MISMATCH'],
    examples: [
      ['他/S *什么*/O *都*/ADV 不/ADV 吃/V 。', "He doesn't eat anything."],
      ['*谁*/S *都*/ADV 喜欢/V 熊猫/O 。', 'Everyone likes pandas.'],
      ['我/S *哪儿*/O *都*/ADV 不/ADV 想/MOD 去/V 。', "I don't want to go anywhere."],
    ],
    instances: [
      ['这/TOP 个 问题 *谁*/S *也*/ADV 不/ADV 知道/V 。', 'Nobody knows the answer to this.'],
      ['周末/T 我/S *什么*/O *也*/ADV 没/ADV 做/V 。', "I didn't do anything at the weekend."],
      ['你/S *什么*/T 时候 来/V *都*/ADV 可以/MOD 。', 'You can come any time.'],
      ['他/S *哪儿*/O *都*/ADV 去/V 过/ASP 。', "He's been everywhere."],
      ['*谁*/S *都*/ADV 可以/MOD 报名/V 。', 'Anyone can sign up.'],
      ['我/S *怎么*/ADV 找/V *都*/ADV 找/V 不/C 到 。', "However hard I look, I can't find it."],
      ['这/TOP 个 饭馆 的 菜 我/S *什么*/O *都*/ADV 喜欢/V 。', 'I like everything at this restaurant.'],
      ['他/S *谁*/O *都*/ADV 不/ADV 认识/V 。', "He doesn't know anyone."],
    ],
    decoys: [NOT_ALL[0]],
    cloze: { blank: ['都', '也'], distractors: NOT_ALL },
  },
  {
    id: 'G3-79', unit: 10, title: 'Rhetorical 不是 … 吗？', titleZh: '反问句：不是…吗？',
    summary: '不是…吗？ isn’t a real question — it means "but surely …!": 你不是去过北京吗？',
    explanationMd: `
**Form:** S + **不是** + statement + **吗**？

The speaker believes the statement is true and is surprised or reminding you:
- 你不是去过北京吗？ — but you've been to Beijing, haven't you?
- 这不是你的书吗？ — isn't this your book?

不是 goes after the subject, before the rest of the predicate.`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [{ kind: 'pair', a: '不', b: '吗', code: 'CONJ.MISSING_PARTNER' }],
    requires: ['G12-10'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'CONJ.MISSING_PARTNER'],
    examples: [
      ['你/S *不*/ADV *是* 去/V 过 北京 *吗*/SF ？', "Haven't you been to Beijing?"],
      ['他/S *不*/ADV *是* 你/O 的 朋友 *吗*/SF ？', "Isn't he your friend?"],
      ['你/S *不*/ADV *是* 会/V 说 汉语 *吗*/SF ？', "Can't you speak Chinese?"],
    ],
    instances: [
      ['这/S *不*/ADV *是* 你/O 的 书 *吗*/SF ？', "Isn't this your book?"],
      ['你/S *不*/ADV *是* 已经/V 吃 了 *吗*/SF ？', "Haven't you already eaten?"],
      ['他/S *不*/ADV *是* 去/V 中国 留学 了 *吗*/SF ？', "Didn't he go to study in China?"],
      ['你/S 昨天/T *不*/ADV *是* 说/V 要 来 *吗*/SF ？', "Didn't you say yesterday you'd come?"],
      ['你/S *不*/ADV *是* 喜欢/V 吃 辣 的 *吗*/SF ？', "Don't you like spicy food?"],
      ['我们/S *不*/ADV *是* 见/V 过 *吗*/SF ？', "Haven't we met before?"],
      ['这/S 个 节目 *不*/ADV *是* 很/V 有意思 *吗*/SF ？', "Isn't this programme interesting?"],
      ['你/S *不*/ADV *是* 有/V 护照 *吗*/SF ？', "Don't you have a passport?"],
    ],
  },
  {
    id: 'G3-80', unit: 10, title: '还是 (or, in questions) vs 或者 (or, in statements)', titleZh: '“还是”和“或者”',
    summary: 'Asking someone to choose → 还是; stating that either is fine → 或者.',
    explanationMd: `
- **还是** — in a question offering a choice: 你喝茶**还是**咖啡？
- **或者** — in a statement: 茶**或者**咖啡都可以.

Quick test: is there a question mark asking "which one"? → 还是.`,
    formula: ['S', 'V', 'O'],
    constraints: [],
    requires: ['G12-10'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['你/S 喝/V 茶/O *还是* 咖啡 ？', 'Would you like tea or coffee?'],
      ['我/S 喝/V 茶/O *或者* 咖啡 都/ADV 可以/MOD 。', "Tea or coffee — either is fine."],
      ['你/S 想/MOD 去/V 北京/O *还是* #上海=Shànghǎi=Shanghai ？', 'Do you want to go to Beijing or Shanghai?'],
    ],
    instances: [
      ['我们/S 坐/V 地铁/O *还是* 公共汽车 ？', 'Shall we take the metro or the bus?'],
      ['周末/T 我/S 去/V 爬山/O *或者* 游泳 。', 'At the weekend I go hiking or swimming.'],
      ['你/S 要/MOD 牛肉/O *还是* 鸡肉 ？', 'Would you like beef or chicken?'],
      ['你/S 可以/MOD 坐/V 地铁/O *或者* 公共汽车 。', 'You can take the metro or the bus.'],
      ['你/S 是/V 学生/O *还是* 老师 ？', 'Are you a student or a teacher?'],
      ['我/S 想/MOD 学/V 汉语/O *或者* 英语 。', "I'd like to study Chinese or English."],
      ['这/S 件 衣服 是/V 红/O 的 *还是* 白 的 ？', 'Is this piece of clothing red or white?'],
      ['星期/TOP 六 *或者* 星期 天 我/S 都/ADV 有/V 时间/O 。', "I'm free on Saturday or Sunday."],
    ],
    decoys: [
      ['或者', 'LEX.NEAR_SYNONYM', 'In a question asking which one, "or" is 还是.'],
      ['还是', 'LEX.NEAR_SYNONYM', 'In a statement, "or" is 或者.'],
    ],
    cloze: {
      blank: ['还是', '或者'],
      distractors: [
        ['还是', 'LEX.NEAR_SYNONYM', '还是 is "or" in a question that asks someone to choose.'],
        ['或者', 'LEX.NEAR_SYNONYM', '或者 is "or" in a statement.'],
      ],
    },
  },
];
