import type { PatternSource } from './authoring';

// HSK 3 · Unit 11 · 虽然…但是 — Concession, addition, cause, purpose (provisional).

export const patternsU11: PatternSource[] = [
  {
    id: 'G3-81', unit: 11, title: '虽然 … 但是 / 可是 … (although)', titleZh: '虽然…但是／可是…',
    summary: 'Although A, (but) B: Chinese keeps both halves — 虽然很累，但是很高兴.',
    explanationMd: `
**Form:** (S) **虽然** A，**但是 / 可是** (S) B

Unlike English, Chinese normally says both "although" *and* "but": 虽然很累，**但是**很高兴.

- 虽然 can go before or after the subject: 他虽然年轻… / 虽然他很年轻…
- 但是 / 可是 always opens the second clause.
- ✗ 虽然…所以 — that's a cause-and-result pair.`,
    formula: ['CONJ1', 'S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [{ kind: 'pair', a: '虽然', b: '但是', code: 'CONJ.PAIR_MISMATCH' }, { kind: 'pair', a: '虽然', b: '可是', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G12-01'],
    contrasts: ['G3-83'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'CONJ.MISSING_PARTNER'],
    examples: [
      ['*虽然*/CONJ1 很/ADV 累/V ， *但是*/CONJ2 很/ADV 高兴/V 。', "Although I'm tired, I'm happy."],
      ['*虽然*/CONJ1 下雨/V 了/SF ， *可是*/CONJ2 我们/S 还是/ADV 去/V 了/SF 。', 'Although it rained, we still went.'],
      ['他/S *虽然*/CONJ1 是/V 外国/O 人 ， *但是*/CONJ2 汉语/S 说/V 得/C 很 好 。', "Although he's a foreigner, he speaks Chinese very well."],
    ],
    instances: [
      ['*虽然*/CONJ1 这/S 件 衣服 很/ADV 贵/V ， *但是*/CONJ2 质量/S 很/ADV 好/V 。', 'Although this is expensive, the quality is good.'],
      ['*虽然*/CONJ1 他/S 很/ADV 忙/V ， *可是*/CONJ2 每/T 天 都/ADV 锻炼/V 。', "Although he's busy, he works out every day."],
      ['*虽然*/CONJ1 汉字/S 很/ADV 难/V ， *但是*/CONJ2 很/ADV 有意思/V 。', 'Although characters are hard, they are interesting.'],
      ['*虽然*/CONJ1 外面/S 很/ADV 冷/V ， *但是*/CONJ2 房间/S 里 很/ADV 暖和/V 。', "Although it's cold outside, it's warm in the room."],
      ['*虽然*/CONJ1 堵车/V ， *可是*/CONJ2 我/S 没/ADV 迟到/V 。', "Although there was a jam, I wasn't late."],
      ['*虽然*/CONJ1 价钱/S 有点儿/ADV 贵/V ， *但是*/CONJ2 服务/S 很/ADV 好/V 。', 'Although the price is a bit high, the service is good.'],
      ['他/S *虽然*/CONJ1 年轻/V ， *但是*/CONJ2 经验/S 很/ADV 多/V 。', "Although he's young, he has a lot of experience."],
      ['*虽然*/CONJ1 这/S 个 城市 不/ADV 大/V ， *可是*/CONJ2 交通/S 很/ADV 方便/V 。', "Although this city isn't big, transport is convenient."],
    ],
    decoys: [['所以', 'CONJ.PAIR_MISMATCH', '虽然 pairs with 但是 / 可是; 所以 goes with 因为.']],
    cloze: {
      blank: ['但是', '可是'],
      distractors: [
        ['所以', 'CONJ.PAIR_MISMATCH', '所以 gives a result; after 虽然 the second half contrasts: 但是 / 可是.'],
        ['而且', 'CONJ.PAIR_MISMATCH', '而且 adds more of the same; after 虽然 you need a contrast.'],
      ],
    },
    transforms: [
      { subtype: 'combine', inputs: ['天气 很 冷 。', '我们 去 爬山 了 。'], chip: '虽然…但是', answer: '虽然/CONJ1 天气/S 很/ADV 冷/V ， 但是/CONJ2 我们/S 还是/ADV 去/V 爬山 了/SF 。', en: 'Although it was cold, we still went hiking.', decoys: [['所以', 'CONJ.PAIR_MISMATCH', '虽然 pairs with 但是.']] },
    ],
  },
  {
    id: 'G3-82', unit: 11, title: '不但 … 而且 … (not only … but also)', titleZh: '不但…而且…',
    summary: 'Not only A but also B. With one subject, it comes before 不但; with two, each clause keeps its own after the connective.',
    explanationMd: `
**Same subject:** S + **不但** A，**而且** B — 他不但会说，而且说得很好.
**Different subjects:** **不但** S₁ A，**而且** S₂ (也) B — 不但我喜欢，而且我的家人也喜欢.

✗ 不但他会说… when both halves are about him.`,
    formula: ['S', 'CONJ1', 'V', 'P', 'CONJ2', 'V'],
    constraints: [
      { kind: 'pair', a: '不但', b: '而且', code: 'CONJ.PAIR_MISMATCH' },
      { kind: 'before', a: 'S', b: 'CONJ1', code: 'CONJ.SUBJECT_POSITION' },
    ],
    requires: ['G3-81'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'CONJ.SUBJECT_POSITION'],
    examples: [
      ['他/S *不但*/CONJ1 会/MOD 说/V 汉语/O ， *而且*/CONJ2 说/V 得/C 很 好 。', 'He not only speaks Chinese, but speaks it well.'],
      ['这/S 个 饭馆 *不但*/CONJ1 便宜/V ， *而且*/CONJ2 好吃/V 。', 'This restaurant is not only cheap but also good.'],
      ['*不但*/CONJ1 我/S 喜欢/V ， *而且*/CONJ2 我/S 的 朋友 也/ADV 喜欢/V 。', 'Not only do I like it, my friends do too.'],
    ],
    instances: [
      ['她/S *不但*/CONJ1 漂亮/V ， *而且*/CONJ2 很/ADV 聪明/V 。', "She's not only pretty but also clever."],
      ['这里/S *不但*/CONJ1 空气/O 好 ， *而且*/CONJ2 交通/S 方便/V 。', 'Here the air is good and transport is convenient too.'],
      ['他/S *不但*/CONJ1 是/V 我/O 的 老师 ， *而且*/CONJ2 是/V 我/O 的 朋友 。', "He's not only my teacher but also my friend."],
      ['*不但*/CONJ1 学生/S 来/V 了/SF ， *而且*/CONJ2 老师/S 也/ADV 来/V 了/SF 。', 'Not only did the students come, the teachers came too.'],
      ['这/S 件 衣服 *不但*/CONJ1 质量/O 好 ， *而且*/CONJ2 价钱/S 也/ADV 不/ADV 贵/V 。', 'This is good quality and not expensive either.'],
      ['他/S *不但*/CONJ1 会/MOD 唱歌/V ， *而且*/CONJ2 会/MOD 跳舞/V 。', 'He can sing, and dance as well.'],
      ['骑/S 自行车 *不但*/CONJ1 节约/V 时间/O ， *而且*/CONJ2 对/PP 身体 好/V 。', 'Cycling saves time and is good for your health too.'],
      ['我/S *不但*/CONJ1 去/V 过/ASP 北京/O ， *而且*/CONJ2 去/V 过/ASP #上海=Shànghǎi=Shanghai/O 。', "I've been not only to Beijing but also to Shanghai."],
    ],
    decoys: [['但是', 'CONJ.PAIR_MISMATCH', '不但 pairs with 而且 (not only … but also), not 但是.']],
    cloze: {
      blank: ['而且'],
      distractors: [
        ['但是', 'CONJ.PAIR_MISMATCH', '但是 marks a contrast; after 不但 the second half adds more: 而且.'],
        ['所以', 'CONJ.PAIR_MISMATCH', '所以 gives a result; after 不但 you need 而且.'],
      ],
    },
  },
  {
    id: 'G3-83', unit: 11, title: '因为 … 所以 … (because … so …)', titleZh: '因为…所以…',
    summary: 'Cause then result, usually with both connectives; 因为 can also come second to add a reason.',
    explanationMd: `
**Form:** **因为** cause，**所以** result

- 因为堵车，所以我迟到了.
- Or just one: 他因为生病了，没来上课 / 我没去，因为我太累了.

Don't mix with 虽然 (although).`,
    formula: ['CONJ1', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [{ kind: 'pair', a: '因为', b: '所以', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G12-01'],
    contrasts: ['G3-81', 'G3-86'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['*因为*/CONJ1 下雨/V 了/SF ， *所以*/CONJ2 比赛/S 停/V 了/SF 。', 'Because it rained, the match was stopped.'],
      ['*因为*/CONJ1 堵车/V ， *所以*/CONJ2 我/S 迟到/V 了/SF 。', 'Because of the traffic, I was late.'],
      ['他/S *因为*/CONJ1 生病/V 了/SF ， 没/ADV 来/V 上课 。', "He didn't come to class because he was ill."],
    ],
    instances: [
      ['*因为*/CONJ1 我/S 想/MOD 了解/V 中国 文化 ， *所以*/CONJ2 我/S 来/V 中国/O 留学 。', 'Because I want to understand Chinese culture, I came to study in China.'],
      ['*因为*/CONJ1 太/ADV 晚/V 了/SF ， *所以*/CONJ2 我/S 坐/V 出租车/O 回/V 家/O 。', 'Because it was late, I took a taxi home.'],
      ['*因为*/CONJ1 价钱/S 太/ADV 贵/V 了/SF ， *所以*/CONJ2 我/S 没/ADV 买/V 。', "I didn't buy it because it was too expensive."],
      ['*因为*/CONJ1 他/S 很/ADV 热心/V ， *所以*/CONJ2 大家/S 都/ADV 喜欢/V 他/O 。', "Because he's warm-hearted, everyone likes him."],
      ['*因为*/CONJ1 明天/T 有/V 考试/O ， *所以*/CONJ2 今天/T 晚上 我/S 得@dei3/MOD 复习/V 。', "Because there's an exam tomorrow, I have to revise tonight."],
      ['我/S 没/ADV 去/V ， *因为*/CONJ1 我/S 太/ADV 累/V 了/SF 。', "I didn't go because I was too tired."],
      ['*因为*/CONJ1 路/S 上 堵车/V ， *所以*/CONJ2 他/S 来/V 晚/C 了/SF 。', 'He was late because the roads were jammed.'],
      ['*因为*/CONJ1 质量/S 不/ADV 好/V ， *所以*/CONJ2 价钱/S 很/ADV 便宜/V 。', "It's cheap because the quality is poor."],
    ],
    decoys: [['但是', 'CONJ.PAIR_MISMATCH', '因为 pairs with 所以, not 但是.']],
    cloze: {
      blank: ['所以'],
      distractors: [
        ['但是', 'CONJ.PAIR_MISMATCH', '但是 marks a contrast; a result after 因为 takes 所以.'],
        ['而且', 'CONJ.PAIR_MISMATCH', '而且 adds information; a result after 因为 takes 所以.'],
      ],
    },
  },
  {
    id: 'G3-84', unit: 11, title: '一边 … 一边 … (while doing)', titleZh: '一边…一边…',
    summary: 'Two actions at the same time, each 一边 before its own verb: 一边吃饭一边看电视.',
    explanationMd: `
**Form:** S + **一边** V₁ (O) + **一边** V₂ (O)

- 他一边吃饭一边看电视.
- 我们一边走一边聊天.

Both 一边 are adverbs — after the subject, each right before its verb. For two *qualities* use 又…又 (G3-85).`,
    formula: ['S', 'ADV', 'V', 'O', 'ADV', 'V', 'O'],
    constraints: [],
    requires: ['G12-04'],
    contrasts: ['G3-85'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['他/S *一边*/ADV 吃/V 饭/O *一边*/ADV 看/V 电视/O 。', "He watches TV while he eats."],
      ['我/S 喜欢/V *一边*/ADV 听/V 音乐/O *一边*/ADV 跑步/V 。', 'I like running while listening to music.'],
      ['我们/S *一边*/ADV 走/V *一边*/ADV 聊天/V 。', 'We chatted as we walked.'],
    ],
    instances: [
      ['她/S *一边*/ADV 唱歌/V *一边*/ADV 跳舞/V 。', 'She sings while she dances.'],
      ['别/ADV *一边*/ADV 开车/V *一边*/ADV 打/V 电话/O 。', "Don't phone while you're driving."],
      ['孩子/S *一边*/ADV 哭/V *一边*/ADV 说/V 。', 'The child talked while crying.'],
      ['他/S *一边*/ADV 工作/V *一边*/ADV 学习/V 。', 'He works and studies at the same time.'],
      ['我们/S *一边*/ADV 喝/V 茶/O *一边*/ADV 讨论/V 问题/O 。', 'We discussed the problem over tea.'],
      ['妈妈/S *一边*/ADV 做/V 饭/O *一边*/ADV 听/V 新闻/O 。', 'Mum listens to the news while she cooks.'],
      ['他/S *一边*/ADV 看/V 书/O *一边*/ADV 写/V 字/O 。', 'He writes characters while reading.'],
      ['留学生/S *一边*/ADV 学习/V 汉语/O *一边*/ADV 了解/V 中国 文化 。', 'International students learn Chinese and get to know Chinese culture at the same time.'],
    ],
    decoys: [['又', 'CONJ.PAIR_MISMATCH', 'Two actions at the same time take 一边…一边; 又…又 joins two qualities.']],
  },
  {
    id: 'G3-85', unit: 11, title: '又 … 又 … (both … and …)', titleZh: '又…又…',
    summary: 'Two qualities (or states) at once, each 又 before its adjective/verb: 又便宜又好吃.',
    explanationMd: `
**Form:** S + **又** A + **又** B

- 这里的菜**又**便宜**又**好吃 — cheap *and* tasty.
- 我今天又累又饿.

Use it for qualities or states; for two simultaneous actions use 一边…一边.`,
    formula: ['S', 'ADV', 'V', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-84'],
    contrasts: ['G3-84'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['这/S 个 饭馆 的 菜 *又*/ADV 便宜/V *又*/ADV 好吃/V 。', "This restaurant's food is cheap and tasty."],
      ['她/S *又*/ADV 漂亮/V *又*/ADV 聪明/V 。', "She's pretty and clever."],
      ['今天/T 我/S *又*/ADV 累/V *又*/ADV 饿/V 。', "Today I'm tired and hungry."],
    ],
    instances: [
      ['这/S 个 房间 *又*/ADV 大/V *又*/ADV 干净/V 。', 'This room is big and clean.'],
      ['外面/S *又*/ADV 刮风/V *又*/ADV 下雨/V 。', "It's windy and raining outside."],
      ['他/S *又*/ADV 会/MOD 唱歌/V *又*/ADV 会/MOD 跳舞/V 。', 'He can both sing and dance.'],
      ['这/S 件 衣服 *又*/ADV 贵/V *又*/ADV 不/ADV 好看/V 。', 'This is expensive and not even nice.'],
      ['这里/S 的 交通 *又*/ADV 方便/V *又*/ADV 快/V 。', 'Transport here is convenient and fast.'],
      ['孩子/S *又*/ADV 哭/V *又*/ADV 笑/V 。', 'The child was crying and laughing.'],
      ['老师/S *又*/ADV 友好/V *又*/ADV 热心/V 。', 'The teacher is friendly and warm-hearted.'],
      ['这/S 个 西瓜 *又*/ADV 大/V *又*/ADV 甜/V 。', 'This watermelon is big and sweet.'],
    ],
    decoys: [['一边', 'CONJ.PAIR_MISMATCH', '一边…一边 is for two actions at once; qualities take 又…又.']],
  },
  {
    id: 'G3-86', unit: 11, title: '为了 (in order to) vs 因为 (because)', titleZh: '“为了”和“因为”',
    summary: '为了 + a goal you are working towards; 因为 + a cause that already exists.',
    explanationMd: `
- **为了** + goal: 为了身体健康，他每天跑步 — he runs *in order to* stay healthy.
- **因为** + cause: 因为身体不好，他不能去 — *because* he's not well.

Test: is it something you *want to achieve*? → 为了. Something that *is already the case*? → 因为.`,
    formula: ['PP', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G3-83'],
    contrasts: ['G3-83'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*为了*/PP 身体 健康 ， 他/S 每/T 天 跑步/V 。', 'He runs every day to stay healthy.'],
      ['*为了*/PP 学 好 汉语 ， 我/S 来/V 中国/O 了/SF 。', 'I came to China to learn Chinese well.'],
      ['*因为*/CONJ1 身体 不 好 ， 他/S 不/ADV 能/MOD 去/V 。', "He can't go because he isn't well."],
    ],
    instances: [
      ['*为了*/PP 减肥 ， 她/S 不/ADV 吃/V 晚饭/O 。', "She skips dinner to lose weight."],
      ['*为了*/PP 节约 时间 ， 我们/S 坐/V 飞机/O 去/V 。', "We're flying to save time."],
      ['*为了*/PP 保护 环境 ， 我/S 骑/V 自行车/O 上班 。', 'I cycle to work to protect the environment.'],
      ['*为了*/PP 买 到 门票 ， 我/S 早上/T 五 点 就/ADV 去/V 排队 了/SF 。', 'To get a ticket, I went to queue at five in the morning.'],
      ['*因为*/CONJ1 堵车 ， 我/S 迟到/V 了/SF 。', 'I was late because of the traffic.'],
      ['*为了*/PP 孩子 ， 他们/S 搬/V 到/C 了/ASP 学校 附近 。', 'They moved near the school for their child.'],
      ['*因为*/CONJ1 下 大 雨 ， 比赛/S 停/V 了/SF 。', 'The match was stopped because of heavy rain.'],
      ['*为了*/PP 找 工作 ， 他/S 每/T 天 都/ADV 上网/V 。', 'He goes online every day to look for a job.'],
    ],
    decoys: [
      ['因为', 'LEX.NEAR_SYNONYM', '因为 gives a cause; a goal you are working towards takes 为了.'],
      ['为了', 'LEX.NEAR_SYNONYM', '为了 is for goals; an existing cause takes 因为.'],
    ],
  },
  {
    id: 'G3-87', unit: 11, title: '对 … 来说 (for, as far as … is concerned) / 对 (towards)', titleZh: '对…来说／对',
    summary: '对 X 来说 = from X’s point of view; 对 X + Adj = towards X / for X: 他对人很热情.',
    explanationMd: `
- **对 X 来说**，… — "for X / as far as X is concerned": 对我来说，汉字不难.
- **对 X** + adjective — attitude or effect towards X: 他对人很热情, 运动对身体很好.

Both 对-phrases go **before** the main predicate.`,
    formula: ['PP', 'P', 'S', 'V'],
    constraints: [{ kind: 'before', a: 'PP', b: 'V', code: 'ORDER.PLACE_AFTER_VERB' }],
    requires: ['G12-01'],
    contrasts: ['G3-88'],
    errorCodes: ['LEX.COLLOCATION', 'ORDER.PLACE_AFTER_VERB'],
    examples: [
      ['*对*/PP 我 *来说* ， 汉字/S 不/ADV 难/V 。', "For me, characters aren't hard."],
      ['*对*/PP 留学生 *来说* ， 了解/S 中国 文化 很/ADV 重要/V 。', 'For international students, understanding Chinese culture is important.'],
      ['他/S *对*/PP 人 很/ADV 热情/V 。', "He's warm towards people."],
    ],
    instances: [
      ['*对*/PP 老年人 *来说* ， 这/S 个 楼梯 太/ADV 高/V 了/SF 。', 'For old people, these stairs are too steep.'],
      ['*对*/PP 年轻人 *来说* ， 经验/S 很/ADV 重要/V 。', 'For young people, experience matters.'],
      ['我/S *对*/PP 中国 历史 很/ADV 有/V 兴趣/O 。', "I'm very interested in Chinese history."],
      ['运动/S *对*/PP 身体 很/ADV 好/V 。', 'Exercise is good for your health.'],
      ['*对*/PP 我 *来说* ， 周末/S 是/V 最/O 好 的 时间 。', 'For me, the weekend is the best time.'],
      ['老师/S *对*/PP 我们 很/ADV 好/V 。', 'The teacher is very good to us.'],
      ['*对*/PP 孩子 *来说* ， 玩/S 很/ADV 重要/V 。', 'For children, play is important.'],
      ['抽烟/S *对*/PP 身体 不/ADV 好/V 。', 'Smoking is bad for your health.'],
    ],
    decoys: [['关于', 'LEX.COLLOCATION', '关于 = about a topic; a point of view or attitude takes 对.']],
  },
  {
    id: 'G3-88', unit: 11, title: '关于 (about, concerning)', titleZh: '关于',
    summary: '关于 introduces the topic: 关于这个问题，… or before 的 + noun: 一本关于历史的书.',
    explanationMd: `
- At the start of a sentence: **关于**这个问题，我有一个看法.
- Inside a noun phrase: 一本**关于**中国历史**的**书.

关于 = "on the subject of". 对 is for attitudes and effects (对人很好, 对身体不好).`,
    formula: ['PP', 'P', 'S', 'V', 'O'],
    constraints: [],
    requires: ['G3-87'],
    contrasts: ['G3-87'],
    errorCodes: ['LEX.COLLOCATION'],
    examples: [
      ['*关于*/PP 这 个 问题 ， 我/S 有/V 一/O 个 看法 。', 'On this question, I have a view.'],
      ['我/S 看/V 了/ASP 一/O 本 *关于* 中国 历史 的 书 。', 'I read a book about Chinese history.'],
      ['*关于*/PP 去 哪儿 旅行 ， 大家/S 的 意见 不/ADV 一样/V 。', "People don't agree on where to travel."],
    ],
    instances: [
      ['*关于*/PP 这 次 考试 ， 老师/S 说/V 了/ASP 很/O 多 。', 'The teacher said a lot about this exam.'],
      ['这/S 是/V 一/O 本 *关于* 熊猫 的 书 。', 'This is a book about pandas.'],
      ['*关于*/PP 交通 问题 ， 我们/S 讨论/V 了/ASP 很/C 久 。', 'We discussed the traffic problem for a long time.'],
      ['他/S 写/V 了/ASP 一/O 个 *关于* 农村 的 故事 。', 'He wrote a story about the countryside.'],
      ['*关于*/PP 那 个 消息 ， 你/S 知道/V 多少/O ？', 'How much do you know about that news?'],
      ['我/S 想/MOD 看/V *关于*/O 环境 保护 的 新闻 。', "I'd like to watch news about environmental protection."],
      ['*关于*/PP 学习 办法 ， 你/S 有/V 什么/O 建议 吗/SF ？', 'Do you have any suggestions about how to study?'],
      ['这/S 个 电影 是/V *关于*/O 什么 的 ？', 'What is this film about?'],
    ],
  },
];
