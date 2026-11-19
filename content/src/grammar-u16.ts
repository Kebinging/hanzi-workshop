import type { PatternSource } from './authoring';

// HSK 4 · Unit 4 (unit 16) · 学习方法 How to learn — Means, cause & sequence (provisional).

export const patternsU16: PatternSource[] = [
  {
    id: 'G4-19', unit: 16, title: '通过 (by means of, through)', titleZh: '通过',
    summary: '通过 + means names how a result was reached; it goes before the verb, often at the start.',
    explanationMd: `
**Form:** **通过** + means，Subject + V … · or Subject + **通过** + means + V.

通过这次讲座，我了解了很多知识 — "through this lecture I learned a lot".

- 通过 introduces the **channel or method**: a person, a website, practice, a test.
- Like other prepositional phrases it goes **before the verb**, never after it.
- Compare **为了** (purpose: "in order to") — 通过 is the *means*, 为了 is the *goal*.`,
    formula: ['PP', 'P', 'S', 'V', 'O'],
    constraints: [{ kind: 'before', a: 'PP', b: 'V', code: 'ORDER.PLACE_AFTER_VERB' }],
    requires: ['G3-86'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*通过*/PP 这 次 讲座 ， 我/S 了解/V 了/ASP 很/O 多 知识 。', 'I learned a lot through this lecture.'],
      ['他/S *通过*/PP 网站 找/V 到/C 了/ASP 工作/O 。', 'He found a job through a website.'],
      ['*通过*/PP 朋友 的 介绍 ， 我们/S 认识/V 了/SF 。', 'We met through a friend.'],
    ],
    instances: [
      ['*通过*/PP 练习 ， 他/S 掌握/V 了/ASP 这/O 个 语法 。', 'Through practice he mastered this grammar point.'],
      ['我/S *通过*/PP 互联网 学习/V 汉语/O 。', 'I learn Chinese online.'],
      ['*通过*/PP 这 篇 文章 ， 我/S 明白/V 了/ASP 作者/O 的 观点 。', "This article helped me understand the author's view."],
      ['她/S *通过*/PP 考试 证明/V 了/ASP 自己/O 的 能力 。', 'She proved her ability through the exam.'],
      ['*通过*/PP 比较 ， 我们/S 发现/V 了/ASP 两/O 个 语法 的 区别 。', 'By comparing them we found the difference between the two structures.'],
      ['我们/S *通过*/PP 电子邮件 联系/V 。', 'We keep in touch by email.'],
      ['*通过*/PP 这 个 例子 ， 老师/S 说明/V 了/ASP 这/O 个 词语 的 意思 。', 'The teacher used this example to explain the meaning of the expression.'],
      ['他/S *通过*/PP 努力 考/V 上/C 了 大学/O 。', 'He got into university through hard work.'],
      ['*通过*/PP 这 个 课程 ， 学生/S 可以/MOD 提高/V 表达/O 能力 。', 'This course lets students improve how they express themselves.'],
      ['我/S *通过*/PP 看 电影 练习/V 听力/O 。', 'I practise listening by watching films.'],
      ['*通过*/PP 总结 ， 我/S 找/V 到/C 了/ASP 学习/O 的 规律 。', 'By summing up, I found a pattern in my learning.'],
      ['我们/S 可以/MOD *通过*/PP 拼音 学习/V 发音/O 。', 'We can learn pronunciation through pinyin.'],
      ['*通过*/PP 沟通 ， 他们/S 解决/V 了/ASP 问题/O 。', 'They solved the problem by talking it through.'],
      ['她/S *通过*/PP 重复 记/V 住/C 了/ASP 生词/O 。', 'She memorised the new words by repetition.'],
      ['*通过*/PP 这 个 学期 的 学习 ， 他/S 进步/V 了/ASP 很/C 多 。', "He's made great progress through this term's study."],
    ],
    cloze: {
      blank: ['通过'],
      distractors: [
        ['为了', 'LEX.NEAR_SYNONYM', '为了 gives a purpose ("in order to"); the means or channel is 通过.'],
        ['对', 'LEX.NEAR_SYNONYM', '对 means "to / towards"; the means or channel is 通过.'],
      ],
    },
  },
  {
    id: 'G4-20', unit: 16, title: '由于 … (因此) … (due to; therefore)', titleZh: '由于…因此…',
    summary: '由于 gives a cause in a formal register; 因此 introduces the result.',
    explanationMd: `
**Form:** **由于** + cause，(**因此 / 所以**) + result.

由于时间不够，因此讲座推迟了 — "owing to lack of time, the lecture was postponed".

- 由于 ≈ 因为 but more written; 因此 ≈ 所以.
- 由于 can stand alone: 由于基础不好，他学得很慢。
- Unlike 因为, 由于 does **not** go in the second clause: ✗ 他学得很慢，由于基础不好.`,
    formula: ['CONJ1', 'S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [{ kind: 'pair', a: '由于', b: '因此', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G3-83'],
    contrasts: ['G3-83', 'G4-21'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*由于*/CONJ1 他/S 很/ADV 努力/V ， *因此*/CONJ2 进步/V 很/ADV 快/V 。', 'Because he works hard, he has progressed quickly.'],
      ['*由于*/CONJ1 时间/S 不/ADV 够/V ， *因此*/CONJ2 讲座/S 推迟/V 了/SF 。', 'Owing to lack of time, the lecture was postponed.'],
      ['*由于*/CONJ1 基础/S 不/ADV 好/V ， 他/S 学/V 得/C 很 慢 。', 'His foundations are weak, so he learns slowly.'],
    ],
    instances: [
      ['*由于*/CONJ1 他/S 不/ADV 专心/V ， *因此*/CONJ2 考试/S 没/ADV 及格/V 。', "He didn't concentrate, so he failed the exam."],
      ['*由于*/CONJ1 下/V 大 雨 ， *因此*/CONJ2 比赛/S 推迟/V 了/SF 。', 'Because of the heavy rain, the match was postponed.'],
      ['*由于*/CONJ1 语法/S 很/ADV 难/V ， *因此*/CONJ2 很/S 多 学生 觉得/V 汉语/O 不 容易 。', 'Because the grammar is hard, many students find Chinese difficult.'],
      ['*由于*/CONJ1 方法/S 正确/V ， *因此*/CONJ2 效果/S 很/ADV 好/V 。', 'Because the method is right, the results are good.'],
      ['*由于*/CONJ1 他/S 每/T 天 都/ADV 复习/V ， *因此*/CONJ2 记/V 得/C 很 清楚 。', 'Because he revises every day, he remembers it clearly.'],
      ['*由于*/CONJ1 文章/S 太/ADV 长/V 了/SF ， *因此*/CONJ2 我/S 没/ADV 看/V 完/C 。', "The article was too long, so I didn't finish it."],
      ['*由于*/CONJ1 他/S 很/ADV 会/MOD 表达/V ， *因此*/CONJ2 大家/S 都/ADV 明白/V 了/SF 。', 'Because he expresses himself so well, everyone understood.'],
      ['*由于*/CONJ1 没有/V 例子/O ， *因此*/CONJ2 学生/S 不/ADV 太/ADV 明白/V 。', "There were no examples, so the students didn't really understand."],
      ['*由于*/CONJ1 教授/S 生病/V 了/SF ， *因此*/CONJ2 讲座/S 推迟/V 到/C 下 周 了 。', "Because the professor is ill, the lecture has been put off until next week."],
      ['*由于*/CONJ1 互联网/S 很/ADV 方便/V ， *因此*/CONJ2 很/S 多 人 在/PP 网上 学习/V 。', 'Because the internet is convenient, many people study online.'],
      ['*由于*/CONJ1 他/S 不/ADV 懂/V 拼音/O ， *因此*/CONJ2 发音/S 不/ADV 准确/V 。', "He doesn't know pinyin, so his pronunciation isn't accurate."],
      ['*由于*/CONJ1 这/S 个 学期 课程 很/ADV 多/V ， *因此*/CONJ2 大家/S 的 压力 很/ADV 大/V 。', "There are lots of courses this term, so everyone is under pressure."],
      ['*由于*/CONJ1 天气/S 不/ADV 好/V ， *因此*/CONJ2 我们/S 在/PP 家 上课/V 。', 'Because of the bad weather, we had our lesson at home.'],
      ['*由于*/CONJ1 沟通/S 有/V 问题/O ， *因此*/CONJ2 有/V 了/ASP 误会/O 。', "Because of poor communication, there was a misunderstanding."],
      ['*由于*/CONJ1 他/S 很/ADV 粗心/V ， *因此*/CONJ2 填空/S 题 错/V 了 很/C 多 。', 'Because he was careless, he got many of the gap-fill questions wrong.'],
    ],
    cloze: {
      blank: ['因此'],
      distractors: [
        ['但是', 'LEX.NEAR_SYNONYM', '但是 marks a contrast; 由于 … 因此 is cause → result.'],
        ['否则', 'LEX.NEAR_SYNONYM', '否则 means "otherwise"; after a cause, the result is introduced by 因此.'],
      ],
    },
  },
  {
    id: 'G4-21', unit: 16, title: '于是 (so, and then)', titleZh: '于是',
    summary: '于是 links two events: the second happened because of, and right after, the first.',
    explanationMd: `
**Form:** event / situation，**于是** + (Subject) + what happened next.

我不懂这个词语，于是去问老师 — "I didn't understand the expression, so I went and asked the teacher".

- 于是 is for **narrating real events**: both parts have already happened (or are being told as a story).
- It can't give advice or talk about the future: ✗ 你累了，于是休息吧 → 你累了，就休息吧.
- Compare **所以** (any result) and **然后** (just the next step, no cause).`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G3-90'],
    contrasts: ['G3-90', 'G4-20'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S 想/MOD 学/V 中文/O ， *于是*/CONJ2 去/V 了/ASP 北京/O 。', 'He wanted to learn Chinese, so off he went to Beijing.'],
      ['我/S 不/ADV 懂/V 这/O 个 词语 ， *于是*/CONJ2 去/V 问/V 老师/O 。', "I didn't understand the expression, so I went and asked the teacher."],
      ['外面/S 下雨/V 了/SF ， *于是*/CONJ2 我们/S 在/PP 家 看/V 电影/O 。', 'It started raining, so we watched a film at home.'],
    ],
    instances: [
      ['他/S 听/V 了/ASP 那/O 个 讲座 ， *于是*/CONJ2 对/PP 历史 有/V 了/ASP 兴趣/O 。', 'He went to that lecture and became interested in history.'],
      ['她/S 觉得/V 这/O 个 方法 很 好 ， *于是*/CONJ2 每/T 天 都/ADV 用/V 。', 'She found the method good, so she used it every day.'],
      ['我/S 找/V 不 到 资料/O ， *于是*/CONJ2 去/V 了/ASP 图书馆/O 。', "I couldn't find the material, so I went to the library."],
      ['他/S 的 数学 不/ADV 好/V ， *于是*/CONJ2 父母/S 给/PP 他 找/V 了/ASP 一/O 个 老师 。', 'He was weak at maths, so his parents found him a tutor.'],
      ['我/S 还/ADV 不/ADV 明白/V ， *于是*/CONJ2 他/S 又/ADV 解释/V 了/ASP 一/C 遍 。', "I still didn't understand, so he explained it again."],
      ['我/S 发现/V 自己/O 的 发音 不 准确 ， *于是*/CONJ2 开始/V 练习/V 拼音/O 。', 'I noticed my pronunciation was off, so I started practising pinyin.'],
      ['天/S 黑/V 了/SF ， *于是*/CONJ2 大家/S 都/ADV 回/V 家/O 了/SF 。', 'It got dark, so everyone went home.'],
      ['她/S 很/ADV 喜欢/V 这/O 位 作者 ， *于是*/CONJ2 买/V 了/ASP 他/O 的 书 。', 'She liked this author a lot, so she bought his book.'],
      ['考试/S 及格/V 了/SF ， *于是*/CONJ2 他/S 请/V 朋友/O 吃/V 饭/O 。', 'He passed the exam, so he took his friends out for a meal.'],
      ['我/S 很/ADV 累/V ， *于是*/CONJ2 先/ADV 睡/V 了/ASP 一会儿/C 。', 'I was tired, so I had a short sleep first.'],
      ['他/S 不/ADV 同意/V 我/O 的 观点 ， *于是*/CONJ2 我们/S 讨论/V 了/ASP 很/C 久 。', "He didn't agree with me, so we talked it over for a long time."],
      ['网站/S 上 的 课程 是/V 免费/O 的 ， *于是*/CONJ2 我/S 报名/V 了/SF 。', 'The course on the website was free, so I signed up.'],
      ['她/S 想/MOD 提高/V 口语/O ， *于是*/CONJ2 每/T 天 跟/PP 中国 朋友 聊天/V 。', 'She wanted better spoken Chinese, so she chatted with Chinese friends every day.'],
      ['我/S 忘记/V 了/ASP 这/O 个 字 ， *于是*/CONJ2 打开/V 了/ASP 词典/O 。', 'I forgot the character, so I opened the dictionary.'],
      ['他/S 想/MOD 当/V 教授/O ， *于是*/CONJ2 决定/V 读/V 博士/O 。', 'He wanted to become a professor, so he decided to do a PhD.'],
    ],
    cloze: {
      blank: ['于是'],
      distractors: [
        ['但是', 'LEX.NEAR_SYNONYM', '但是 marks a contrast; 于是 tells what happened next as a result.'],
        ['因为', 'LEX.NEAR_SYNONYM', '因为 gives a reason; it can’t introduce the next event.'],
      ],
    },
  },
  {
    id: 'G4-22', unit: 16, title: '既 … 又 / 也 … (both … and …)', titleZh: '既…又／也…',
    summary: '既 A 又 B / 既 A 也 B joins two qualities or actions of the same subject.',
    explanationMd: `
**Form:** Subject + **既** + A + **又 / 也** + B.

这个方法既简单又有效果 — "this method is both simple and effective".

- Like 又…又 (G3-85) but more formal. 既…也 often joins verb phrases: 既要多听，也要多说.
- Both halves follow the **same subject**, and 既 / 又 / 也 sit right before their verb or adjective.
- ✗ 既…就 / 既…才.`,
    formula: ['S', 'ADV', 'V', 'ADV', 'V'],
    constraints: [
      { kind: 'pair', a: '既', b: '又', code: 'CONJ.PAIR_MISMATCH' },
      { kind: 'pair', a: '既', b: '也', code: 'CONJ.PAIR_MISMATCH' },
    ],
    requires: ['G3-85'],
    contrasts: ['G3-85'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['这/S 个 方法 *既*/ADV 简单/V *又*/ADV 有/V 效果/O 。', 'This method is both simple and effective.'],
      ['他/S *既*/ADV 是/V 教授/O ， *也*/ADV 是/V 我/O 的 朋友 。', "He's both a professor and my friend."],
      ['学/S 语言 *既*/ADV 要/MOD 多/ADV 听/V ， *也*/ADV 要/MOD 多/ADV 说/V 。', 'Learning a language means both listening and speaking a lot.'],
    ],
    instances: [
      ['这/S 篇 文章 *既*/ADV 有意思/V *又*/ADV 容易/V 懂 。', 'This article is interesting and easy to understand.'],
      ['她/S *既*/ADV 会/MOD 说/V 汉语/O ， *又*/ADV 会/MOD 说/V 英语/O 。', 'She speaks both Chinese and English.'],
      ['这/S 个 网站 *既*/ADV 方便/V *又*/ADV 免费/V 。', 'This website is both convenient and free.'],
      ['学习/S *既*/ADV 需要/V 方法/O ， *也*/ADV 需要/V 时间/O 。', 'Studying takes both method and time.'],
      ['他/S *既*/ADV 聪明/V *又*/ADV 专心/V 。', "He's clever and focused."],
      ['这/S 本 书 *既*/ADV 有/V 知识/O ， *又*/ADV 有/V 很/O 多 例子 。', 'This book has both knowledge and lots of examples.'],
      ['我们/S *既*/ADV 要/MOD 打/V 好/C 基础/O ， *也*/ADV 要/MOD 多/ADV 练习/V 。', 'We need both solid foundations and lots of practice.'],
      ['这儿/S *既*/ADV 安静/V *又*/ADV 干净/V 。', "It's quiet and clean here."],
      ['老师/S 的 解释 *既*/ADV 清楚/V *又*/ADV 简单/V 。', "The teacher's explanation is clear and simple."],
      ['数学/S *既*/ADV 难/V *又*/ADV 有意思/V 。', 'Maths is both hard and interesting.'],
      ['他/S *既*/ADV 不/ADV 迟到/V ， *也*/ADV 不/ADV 请假/V 。', 'He is never late and never takes time off.'],
      ['这/S 个 讲座 *既*/ADV 有/V 观点/O ， *又*/ADV 有/V 例子/O 。', 'This lecture has both a point of view and examples.'],
      ['学/S 汉字 *既*/ADV 要/MOD 记/V 意思/O ， *也*/ADV 要/MOD 记/V 拼音/O 。', 'With characters, you need to learn both the meaning and the pinyin.'],
      ['她/S *既*/ADV 认真/V *又*/ADV 耐心/V 。', "She's both conscientious and patient."],
      ['用/S 互联网 学习 *既*/ADV 方便/V *又*/ADV 便宜/V 。', 'Learning online is both convenient and cheap.'],
    ],
    cloze: {
      blank: ['又', '也'],
      distractors: [
        ['就', 'CONJ.PAIR_MISMATCH', '既 pairs with 又 or 也, not 就.'],
        ['才', 'CONJ.PAIR_MISMATCH', '既 pairs with 又 or 也, not 才.'],
      ],
    },
  },
  {
    id: 'G4-23', unit: 16, title: '一方面 … 另一方面 … (on the one hand … on the other)', titleZh: '一方面…另一方面…',
    summary: '一方面 … 另一方面 … presents two sides or two reasons of one matter.',
    explanationMd: `
**Form:** **一方面** + A，**另一方面** + B.

一方面我想出国，另一方面我又不想离开父母 — "on the one hand I want to go abroad, on the other I don't want to leave my parents".

- A and B can be two reasons that add up, or two pulls in opposite directions.
- The second half often has **也 / 又 / 还**.
- 另 = "another": 另一方面 is fixed.`,
    formula: ['CONJ1', 'S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G3-82'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['一/CONJ1 *方面* 我/S 想/MOD 出国/V ， *另*/CONJ2 一 方面 我/S 又/ADV 不/ADV 想/MOD 离开/V 父母/O 。', "On the one hand I want to go abroad; on the other, I don't want to leave my parents."],
      ['学/S 语言 ， 一/CONJ1 *方面* 要/MOD 多/ADV 练习/V ， *另*/CONJ2 一 方面 要/MOD 找/V 好/O 的 方法 。', 'Learning a language takes lots of practice on the one hand and a good method on the other.'],
      ['一/CONJ1 *方面* 他/S 很/ADV 忙/V ， *另*/CONJ2 一 方面 他/S 也/ADV 不/ADV 太/ADV 想/MOD 去/V 。', "For one thing he's busy; for another, he doesn't really want to go."],
    ],
    instances: [
      ['一/CONJ1 *方面* 这/S 个 课程 很/ADV 有意思/V ， *另*/CONJ2 一 方面 它/S 也/ADV 很/ADV 实际/V 。', 'This course is interesting, and it is also practical.'],
      ['一/CONJ1 *方面* 我/S 想/MOD 读/V 博士/O ， *另*/CONJ2 一 方面 我/S 也/ADV 想/MOD 工作/V 。', 'On the one hand I want to do a PhD; on the other, I want to work.'],
      ['一/CONJ1 *方面* 互联网/S 很/ADV 方便/V ， *另*/CONJ2 一 方面 也/ADV 有/V 很/O 多 坏处 。', 'The internet is convenient, but it also has many downsides.'],
      ['一/CONJ1 *方面* 要/MOD 打/V 好/C 基础/O ， *另*/CONJ2 一 方面 要/MOD 多/ADV 用/V 。', 'You need solid foundations on the one hand and lots of use on the other.'],
      ['一/CONJ1 *方面* 他/S 的 发音 很/ADV 准确/V ， *另*/CONJ2 一 方面 他/S 的 语法 也/ADV 很/ADV 好/V 。', 'His pronunciation is accurate, and his grammar is good too.'],
      ['一/CONJ1 *方面* 工资/S 不/ADV 高/V ， *另*/CONJ2 一 方面 压力/S 也/ADV 很/ADV 大/V 。', "The pay isn't high, and the pressure is great as well."],
      ['一/CONJ1 *方面* 我们/S 要/MOD 尊重/V 别人/O ， *另*/CONJ2 一 方面 也/ADV 要/MOD 表达/V 自己/O 的 观点 。', 'We need to respect others, but also to express our own views.'],
      ['一/CONJ1 *方面* 她/S 喜欢/V 数学/O ， *另*/CONJ2 一 方面 她/S 也/ADV 喜欢/V 历史/O 。', 'She likes maths, and history as well.'],
      ['一/CONJ1 *方面* 是/V 因为/O 时间 不 够 ， *另*/CONJ2 一 方面 是/V 因为/O 方法 不 对 。', "Partly it's lack of time, partly it's the wrong method."],
      ['一/CONJ1 *方面* 你/S 要/MOD 专心/V ， *另*/CONJ2 一 方面 你/S 要/MOD 注意/V 休息/O 。', 'You need to concentrate, but you also need to rest.'],
      ['一/CONJ1 *方面* 这/S 本 书 的 知识 很/ADV 多/V ， *另*/CONJ2 一 方面 例子/S 也/ADV 很/ADV 有意思/V 。', 'This book is full of knowledge, and the examples are interesting too.'],
      ['一/CONJ1 *方面* 我/S 想/MOD 提高/V 口语/O ， *另*/CONJ2 一 方面 我/S 也/ADV 想/MOD 交/V 朋友/O 。', 'I want to improve my spoken Chinese, and to make friends as well.'],
      ['一/CONJ1 *方面* 父母/S 支持/V 他/O ， *另*/CONJ2 一 方面 老师/S 也/ADV 鼓励/V 他/O 。', 'His parents support him, and his teacher encourages him too.'],
      ['一/CONJ1 *方面* 天气/S 不/ADV 好/V ， *另*/CONJ2 一 方面 我/S 也/ADV 很/ADV 累/V 。', "The weather's bad, and I'm tired as well."],
      ['一/CONJ1 *方面* 他/S 不/ADV 懂/V 拼音/O ， *另*/CONJ2 一 方面 他/S 也/ADV 很/ADV 少/ADV 练习/V 。', "He doesn't know pinyin, and he rarely practises either."],
    ],
  },
  {
    id: 'G4-24', unit: 16, title: '首先 … 其次 … 最后 … (first, next, finally)', titleZh: '首先…其次…最后…',
    summary: '首先 / 其次 / 最后 order the steps or points of an explanation.',
    explanationMd: `
**Form:** **首先** + step 1，**其次** + step 2，(**最后** + last step).

首先要预习生词，其次要读课文，最后做练习 — "first prepare the new words, next read the text, and finally do the exercises".

- These are **discourse words**: they order points in a talk or a piece of writing.
- 首先 can be followed by a comma: 首先，我们要…
- Compare 先…然后 (G3-09), which narrates actions; 首先…其次 also ranks *points*.`,
    formula: ['CONJ1', 'V', 'P', 'CONJ2', 'V'],
    constraints: [{ kind: 'pair', a: '首先', b: '其次', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G3-09'],
    contrasts: ['G3-09'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*首先*/CONJ1 要/MOD 预习/V 生词/O ， *其次*/CONJ2 要/MOD 读/V 课文/O ， *最后*/CONJ2 做/V 练习/O 。', 'First prepare the new words, next read the text, and finally do the exercises.'],
      ['*首先*/CONJ1 ， 我们/S 要/MOD 打/V 好/C 基础/O 。', 'First of all, we need solid foundations.'],
      ['*首先*/CONJ1 我/S 想/MOD 谢谢/V 大家/O ， *其次*/CONJ2 我/S 想/MOD 介绍/V 一下/C 我们/O 的 课程 。', "First I'd like to thank everyone; next I'd like to introduce our course."],
    ],
    instances: [
      ['*首先*/CONJ1 要/MOD 听/V 懂/C ， *其次*/CONJ2 要/MOD 会/MOD 说/V 。', 'First you need to understand, then to speak.'],
      ['*首先*/CONJ1 请/MOD 大家/S 看/V 第一/O 页 ， *其次*/CONJ2 看/V 例子/O 。', 'Everyone, first look at page one, then at the examples.'],
      ['写/S 文章 *首先*/CONJ1 要/MOD 有/V 观点/O ， *其次*/CONJ2 要/MOD 有/V 例子/O 。', 'An essay needs a point of view first, and then examples.'],
      ['*首先*/CONJ1 他/S 去/V 了/ASP 银行/O ， *然后*/CONJ2 去/V 了/ASP 超市/O ， *最后*/CONJ2 回/V 了/ASP 家/O 。', 'First he went to the bank, then the supermarket, and finally home.'],
      ['*首先*/CONJ1 我们/S 要/MOD 总结/V 一下/C ， *其次*/CONJ2 讨论/V 问题/O 。', "First let's sum up, then discuss the problems."],
      ['学/S 汉字 *首先*/CONJ1 要/MOD 记/V 意思/O ， *其次*/CONJ2 是/V 拼音/O 。', 'With characters, the meaning comes first and the pinyin second.'],
      ['*首先*/CONJ1 方法/S 要/MOD 正确/V ， *其次*/CONJ2 要/MOD 坚持/V 。', 'First, the method must be right; second, you must keep at it.'],
      ['*首先*/CONJ1 请/MOD 你/S 介绍/V 一下/C 自己/O ， *其次*/CONJ2 说/V 一下/C 你/O 的 专业 。', 'First introduce yourself, then tell us about your major.'],
      ['*首先*/CONJ1 要/MOD 选/V 好/C 课程/O ， *其次*/CONJ2 要/MOD 按时/ADV 上课/V 。', 'First choose your courses well, then go to class on time.'],
      ['*首先*/CONJ1 你/S 要/MOD 读/V 懂/C 题目/O ， *其次*/CONJ2 再/ADV 写/V 答案/O 。', 'First make sure you understand the question, then write the answer.'],
      ['*首先*/CONJ1 我/S 要/MOD 说明/V 一下/C 考试/O 的 规定 ， *其次*/CONJ2 介绍/V 一下/C 时间/O 。', "First I'll explain the exam rules, then the timing."],
      ['*首先*/CONJ1 他/S 解释/V 了/ASP 语法/O ， *其次*/CONJ2 给/V 我们/O 几 个 例子 。', 'First he explained the grammar, then gave us some examples.'],
      ['*首先*/CONJ1 要/MOD 有/V 目标/O ， *其次*/CONJ2 要/MOD 有/V 计划/O ， *最后*/CONJ2 要/MOD 坚持/V 。', 'First you need a goal, then a plan, and finally persistence.'],
      ['*首先*/CONJ1 我们/S 复习/V 一下/C 上 次 的 内容/O ， *其次*/CONJ2 学习/V 新/O 的 课文 。', "First we'll go over last time's material, then learn the new text."],
      ['*首先*/CONJ1 你/S 要/MOD 相信/V 自己/O ， *其次*/CONJ2 要/MOD 多/ADV 跟/PP 别人 沟通/V 。', 'First believe in yourself, then talk to others more.'],
    ],
    cloze: {
      blank: ['其次'],
      distractors: [
        ['于是', 'LEX.NEAR_SYNONYM', '于是 tells what happened next as a result; in a list of steps or points use 其次.'],
        ['否则', 'LEX.NEAR_SYNONYM', '否则 means "otherwise"; it can’t number a point.'],
      ],
    },
  },
];
