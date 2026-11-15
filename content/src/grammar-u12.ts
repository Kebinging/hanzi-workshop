import type { PatternSource } from './authoring';

// HSK 3 · Unit 12 · 讲故事 — Narrative cohesion & separable verbs II (provisional).

export const patternsU12: PatternSource[] = [
  {
    id: 'G3-89', unit: 12, title: 'Separable verbs II: 放假, 洗澡, 生气, 结婚, 请假', titleZh: '离合词（二）',
    summary: 'More verb-object words that split: 放了三天假, 生他的气, 洗了个澡, 结过两次婚.',
    explanationMd: `
Like 见面 (G3-40), these are verb + object inside:

- duration / amount in the middle: 放了**三天**假, 请**两天**假
- the person affected as a possessor: 生**他的**气 (be angry with him)
- 个 for a casual "a": 洗了**个**澡
- aspect after the verb part: 结**过**婚, 洗**完**澡

✗ 生气他, ✗ 放假了三天.`,
    formula: ['S', 'V', 'ASP', 'C', 'O'],
    constraints: [
      { kind: 'before', a: 'ASP', b: 'O', code: 'SEP.ASPECT_POSITION' },
      { kind: 'before', a: 'C', b: 'O', code: 'SEP.ASPECT_POSITION' },
      { kind: 'before', a: 'V', b: 'O', code: 'SEP.OBJECT_AFTER' },
    ],
    requires: ['G3-40'],
    errorCodes: ['SEP.ASPECT_POSITION', 'SEP.OBJECT_AFTER'],
    examples: [
      ['我们/S 放/V 了/ASP 三/C 天 假@fangjia=jià/O 。', 'We had three days off.'],
      ['他/S 生@shengqi=shēng/V 我/O 的 气@shengqi=qì 了/SF 。', "He's angry with me."],
      ['我/S 洗/V 了/ASP 个/C 澡@xizao=zǎo/O 。', 'I had a shower.'],
    ],
    instances: [
      ['他们/S 结@jiehun=jié/V 了/ASP 婚@jiehun=hūn/O 。', 'They got married.'],
      ['我/S 想/MOD 请/V 两/C 天 假@qingjia=jià/O 。', "I'd like to take two days off."],
      ['你/S 别/ADV 生@shengqi=shēng/V 他/O 的 气@shengqi=qì 了/SF 。', "Don't be angry with him."],
      ['他/S 结@jiehun=jié/V 过/ASP 两/C 次 婚@jiehun=hūn/O 。', "He's been married twice."],
      ['我/S 今天/T 请/V 了/ASP 半/C 天 假@qingjia=jià/O 。', 'I took half a day off today.'],
      ['孩子/S 洗/V 完/C 澡@xizao=zǎo/O 就/ADV 睡觉/V 了/SF 。', 'The child went to bed straight after the bath.'],
      ['暑假/T 我们/S 放/V 两/C 个 月 的 假@fangjia=jià/O 。', 'We get two months off in the summer.'],
      ['我们/S 什么/T 时候 放/V 假@fangjia=jià/O ？', 'When do we get our holiday?'],
    ],
  },
  {
    id: 'G3-90', unit: 12, title: '然后 vs 后来 vs 以后', titleZh: '“然后”“后来”“以后”',
    summary: '然后 = and then (next step, any time); 后来 = later on (past stories only); 以后 = after X / in future.',
    explanationMd: `
- **然后** — next step in a sequence, past or future: 先洗手，然后吃饭.
- **后来** — "later on" in a story about the **past**, on its own: 他去年来了北京，后来又去了上海.
- **以后** — after an event (下课以后) or "in the future" (以后我想当律师).

✗ 下课后来 — 后来 can't attach to an event. ✗ 你先洗手，后来吃饭 — instructions aren't past stories.`,
    formula: ['S', 'V', 'O', 'P', 'CONJ2', 'V', 'O'],
    constraints: [],
    requires: ['G3-09'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'CONJ.PAIR_MISMATCH'],
    examples: [
      ['他/S 去年/T 来/V 了/ASP 北京/O ， *后来*/CONJ2 又/ADV 去/V 了/ASP #上海=Shànghǎi=Shanghai/O 。', 'He came to Beijing last year and later went on to Shanghai.'],
      ['下课/T *以后* ， 我们/S 去/V 吃/V 饭/O 吧/SF 。', "After class, let's go and eat."],
      ['你/S 先/ADV 洗/V 手/O ， *然后*/CONJ2 吃/V 饭/O 。', 'Wash your hands, then eat.'],
    ],
    instances: [
      ['我们/S 认识/V 了/ASP 三/C 年 ， *后来*/CONJ2 结@jiehun=jié/V 了/ASP 婚@jiehun=hūn/O 。', 'We knew each other for three years and later got married.'],
      ['毕业/T *以后* ， 他/S 去/V 了/ASP 外国/O 。', 'After graduating, he went abroad.'],
      ['我/S 先/ADV 去/V 银行/O ， *然后*/CONJ2 去/V 超市/O 。', "I'll go to the bank first, then the supermarket."],
      ['小时候/T 我/S 住/V 在/C 农村 ， *后来*/CONJ2 搬/V 到/C 了/ASP 城市 。', 'I lived in the countryside as a child and later moved to the city.'],
      ['吃/T 完 饭 *以后* ， 我们/S 去/V 散步 吧/SF 。', "After dinner, let's go for a walk."],
      ['他/S 开始/V 学/O 汉语 ， *后来*/CONJ2 就/ADV 去/V 中国/O 留学 了/SF 。', 'He started learning Chinese and later went to study in China.'],
      ['你/S 到/T 家 *以后* 给/PP 我 打/V 电话/O 。', 'Call me after you get home.'],
      ['先/ADV 看/V 菜单/O ， *然后*/CONJ2 再/ADV 决定/V 吃/O 什么 。', 'Look at the menu first, then decide what to eat.'],
    ],
  },
  {
    id: 'G3-91', unit: 12, title: '终于 / 突然 / 马上', titleZh: '“终于”“突然”“马上”',
    summary: '终于 = at last (after waiting or effort); 突然 = suddenly; 马上 = right away (often with 就…了).',
    explanationMd: `
All three go before the verb:

- **终于** — finally, after a wait or effort: 车终于来了.
- **突然** — without warning: 他突然笑起来了.
- **马上** — immediately, very soon: 我马上来, 飞机马上就要起飞了.`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [{ kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' }],
    requires: ['G3-06'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['他/S *终于*/ADV 来/V 了/SF 。', "He's finally here."],
      ['*突然*/ADV 下/V 起/C 雨 来 了/SF 。', 'Suddenly it started to rain.'],
      ['你/S 等/V 一下/C ， 我/S *马上*/ADV 来/V 。', "Wait a moment — I'm coming right away."],
    ],
    instances: [
      ['我/S 等/V 了/ASP 半天/C ， 车/S *终于*/ADV 来/V 了/SF 。', 'I waited ages, and the bus finally came.'],
      ['他/S *突然*/ADV 笑/V 起来/C 了/SF 。', 'He suddenly burst out laughing.'],
      ['飞机/S *马上*/ADV 就/ADV 要/MOD 起飞/V 了/SF 。', 'The plane is about to take off.'],
      ['我们/S *终于*/ADV 到/V 家/O 了/SF 。', "We're home at last."],
      ['灯/S *突然*/ADV 关/V 了/SF 。', 'The lights suddenly went out.'],
      ['*马上*/ADV 就/ADV 要/MOD 放假/V 了/SF 。', "The holidays are almost here."],
      ['经过/V 很/O 多 努力 ， 他/S *终于*/ADV 成功/V 了/SF 。', 'After a lot of effort, he finally succeeded.'],
      ['他/S 听/V 了/ASP 这/O 个 消息 ， *突然*/ADV 哭/V 了/SF 。', 'Hearing the news, he suddenly burst into tears.'],
    ],
  },
  {
    id: 'G3-92', unit: 12, title: 'Only and almost: 只 / 就 / 差不多 / 几乎', titleZh: '只／就／差不多／几乎',
    summary: '只 and 就 = only; 差不多 = about, roughly the same; 几乎 = almost (nearly happened or nearly all).',
    explanationMd: `
- **只** — only: 我只有十块钱.
- **就** — only (spoken, stressed): 他就吃了一个苹果.
- **差不多** — roughly, about the same: 他们差不多高; 差不多十点了.
- **几乎** — almost: 我几乎忘了 (I nearly forgot); 几乎每天都跑步.

All are adverbs before the verb (差不多 can also come before a number).`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [{ kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' }],
    requires: ['G12-01'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S *只@zhi3*/ADV 有/V 十/O 块 钱 。', 'I only have ten yuan.'],
      ['他/S *就*/ADV 吃/V 了/ASP 一/O 个 苹果 。', 'He only ate one apple.'],
      ['我/S *几乎*/ADV 每/T 天 都/ADV 跑步/V 。', 'I run almost every day.'],
    ],
    instances: [
      ['这/S 件 衣服 *只@zhi3*/ADV 要/V %五十/O 块 。', 'This piece of clothing is only fifty yuan.'],
      ['他们/S 两 个 人 *差不多*/ADV 高/V 。', "The two of them are about the same height."],
      ['我/S *几乎*/ADV 忘/V 了/SF 。', 'I almost forgot.'],
      ['教室/PP 里 *只@zhi3*/ADV 有/V 三/O 个 人 。', 'There are only three people in the classroom.'],
      ['我/S *就*/ADV 去/V 过/ASP 一/C 次 。', "I've only been once."],
      ['*差不多*/ADV 十/T 点 了/SF ， 我们/S 走/V 吧/SF 。', "It's almost ten — let's go."],
      ['他/S 的 汉语 *几乎*/ADV 跟/PP 中国 人 一样/ADV 好/V 。', 'His Chinese is almost as good as a native speaker’s.'],
      ['我/S *只@zhi3*/ADV 会/MOD 说/V 一点儿/O 汉语 。', 'I can only speak a little Chinese.'],
    ],
  },
  {
    id: 'G3-93', unit: 12, title: '好像 (seems) / 像 … 一样 (like)', titleZh: '“好像”和“像…一样”',
    summary: '好像 = it seems / as if; 像 X 一样 (+ Adj) = like X, as … as X.',
    explanationMd: `
- **好像** — "seems / looks as if", an adverb before the verb: 他好像不太高兴; 外面好像下雨了.
- **像 X 一样** — compares with X: 那个孩子像熊猫一样可爱; 今天热得像夏天一样.`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [],
    requires: ['G3-20'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S *好像*/ADV 不/ADV 太/ADV 高兴/V 。', "He doesn't seem very happy."],
      ['她/S *像*/PP 她 妈妈 *一样* 漂亮/V 。', "She's as pretty as her mum."],
      ['外面/S *好像*/ADV 下雨/V 了/SF 。', 'It seems to be raining outside.'],
    ],
    instances: [
      ['你/S *好像*/ADV 瘦/V 了/SF 。', 'You seem to have lost weight.'],
      ['他/S *像*/PP 孩子 *一样* 哭/V 了/SF 。', 'He cried like a child.'],
      ['这/TOP 个 地方 我/S *好像*/ADV 来/V 过/ASP 。', 'I seem to have been here before.'],
      ['今天/T 热/V 得/C *像* 夏天 *一样* 。', "Today it's as hot as summer."],
      ['他/S *好像*/ADV 认识/V 我/O 。', 'He seems to know me.'],
      ['那/S 个 孩子 *像*/PP 熊猫 *一样* 可爱/V 。', 'That child is as cute as a panda.'],
      ['*好像*/ADV 有/V 人/O 在 叫 你 。', 'It sounds like someone is calling you.'],
      ['他/S 说/V 汉语/O 说/V 得/C *像* 中国 人 *一样* 。', 'He speaks Chinese like a native.'],
    ],
  },
  {
    id: 'G3-94', unit: 12, title: 'V₁着 + V₂ (doing B in manner A)', titleZh: '动词＋着＋动词',
    summary: 'V₁着 shows the manner or state while doing V₂: 他笑着说, 我们走着去.',
    explanationMd: `
**Form:** S + V₁ + **着** (+ O₁) + V₂ (+ O₂)

- 他**笑着**说 — he said with a smile.
- 我们**走着**去 — we'll go on foot.
- 别**躺着**看手机 — don't look at your phone lying down.

The first verb (with 着) describes *how*; the second is the main action.`,
    formula: ['S', 'V', 'ASP', 'V', 'O'],
    constraints: [{ kind: 'adjacent', a: 'V', b: 'ASP', code: 'ASPECT.ZHE_MISUSE' }],
    requires: ['G3-04'],
    errorCodes: ['ASPECT.ZHE_MISUSE', 'ASPECT.LE_MISUSE'],
    examples: [
      ['他/S 笑/V *着*/ASP 说/V 。', 'He said with a smile.'],
      ['我们/S 走/V *着*/ASP 去/V 吧/SF 。', "Let's walk there."],
      ['她/S 哭/V *着*/ASP 跑/V 出去/C 了/SF 。', 'She ran out in tears.'],
    ],
    instances: [
      ['老师/S 站/V *着*/ASP 上课/V 。', 'The teacher teaches standing up.'],
      ['他/S 躺/V *着*/ASP 看/V 书/O 。', 'He reads lying down.'],
      ['孩子/S 跑/V *着*/ASP 去/V 学校/O 。', 'The child ran to school.'],
      ['别/ADV 躺/V *着*/ASP 看/V 手机/O 。', "Don't look at your phone lying down."],
      ['她/S 笑/V *着*/ASP 对/PP 我 说/V 谢谢/O 。', 'She thanked me with a smile.'],
      ['爷爷/S 坐/V *着*/ASP 喝/V 茶/O 。', 'Grandpa drinks his tea sitting down.'],
      ['妈妈/S 抱/V *着*/ASP 孩子/O 走/V 了/ASP 进来/C 。', 'Mum walked in holding the baby.'],
      ['我们/S 唱/V *着*/ASP 歌/O 回/V 家/O 。', 'We went home singing.'],
    ],
    decoys: [['了', 'ASPECT.LE_MISUSE', 'The first verb shows the manner of the second, so it takes 着.']],
  },
  {
    id: 'G3-95', unit: 12, title: 'Topic first: 这本书我看完了', titleZh: '话题句：宾语前置',
    summary: 'A known object can move to the front as the topic; the rest of the sentence comments on it.',
    explanationMd: `
**Form:** Topic (object) + Subject + verb phrase

- **这本书**我看完了 — this book, I've finished.
- **作业**你写完了吗？ — your homework — done?

The topic is something already known. It's very common in speech and with 都 / 也: 中国菜我都喜欢.`,
    formula: ['TOP', 'S', 'V', 'C', 'SF'],
    constraints: [{ kind: 'before', a: 'TOP', b: 'S', code: 'ORDER.TOPIC' }],
    requires: ['G3-13'],
    errorCodes: ['ORDER.TOPIC'],
    examples: [
      ['*这*/TOP 本 书 我/S 看/V 完/C 了/SF 。', "I've finished this book."],
      ['*汉字*/TOP 我/S 觉得/V 很 难 。', 'I find characters hard.'],
      ['*作业*/TOP 你/S 写/V 完/C 了/SF 吗/SF ？', 'Have you finished your homework?'],
    ],
    instances: [
      ['*那*/TOP 个 电影 我/S 看/V 过/ASP 两/C 遍 。', "I've seen that film twice."],
      ['*饭*/TOP 我/S 已经/ADV 吃/V 了/SF 。', "I've already eaten."],
      ['*这*/TOP 件 衣服 你/S 穿/V 很/ADV 好看/V 。', 'This looks good on you.'],
      ['*这*/TOP 个 问题 我们/S 明天/T 再/ADV 讨论/V 。', "We'll discuss this question tomorrow."],
      ['*钱*/TOP 我/S 已经/ADV 还@huan2/V 给/C 他 了/SF 。', "I've already paid him back."],
      ['*中国*/TOP 菜 我/S 都/ADV 喜欢/V 。', 'I like all Chinese food.'],
      ['*你*/TOP 的 意见 我/S 同意/V 。', 'I agree with your opinion.'],
      ['*那*/TOP 个 地方 我/S 一/O 次 也/ADV 没/ADV 去/V 过/ASP 。', "I've never once been to that place."],
    ],
  },
  {
    id: 'G3-96', unit: 12, title: '可是 / 但是 / 不过 (but)', titleZh: '“可是”“但是”“不过”',
    summary: 'All mean "but". 但是 is the most neutral and formal; 可是 is everyday; 不过 is softer ("though").',
    explanationMd: `
- **但是** — neutral, fine in writing.
- **可是** — everyday speech.
- **不过** — mild contrast, "though": 东西不错，不过有点儿贵.

All open the second clause. ✗ 所以 — that gives a result, not a contrast.`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G3-81'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['东西/S 不错/V ， *不过*/CONJ2 有点儿/ADV 贵/V 。', "It's nice, though a bit expensive."],
      ['我/S 很/ADV 想/MOD 去/V ， *可是*/CONJ2 没有/V 时间/O 。', "I'd love to go, but I don't have time."],
      ['这/S 个 办法 很/ADV 好/V ， *但是*/CONJ2 太/ADV 难/V 了/SF 。', "It's a good idea, but too difficult."],
    ],
    instances: [
      ['天气/S 很/ADV 冷/V ， *不过*/CONJ2 没有/V 风/O 。', "It's cold, though there's no wind."],
      ['他/S 很/ADV 聪明/V ， *可是*/CONJ2 不/ADV 太/ADV 努力/V 。', "He's clever, but not very hard-working."],
      ['这/S 个 饭馆 很/ADV 小/V ， *不过*/CONJ2 菜/S 很/ADV 好吃/V 。', 'This restaurant is small, but the food is good.'],
      ['我/S 去/V 了/ASP 他/O 家 ， *可是*/CONJ2 他/S 不/ADV 在/V 。', "I went to his house, but he wasn't in."],
      ['考试/S 很/ADV 难/V ， *但是*/CONJ2 我/S 考/V 得/C 不错 。', 'The exam was hard, but I did well.'],
      ['价钱/S 有点儿/ADV 贵/V ， *不过*/CONJ2 质量/S 很/ADV 好/V 。', 'The price is a bit high, but the quality is good.'],
      ['我/S 想/MOD 帮/V 你/O ， *可是*/CONJ2 我/S 也/ADV 不/ADV 会/MOD 。', "I'd like to help, but I can't do it either."],
      ['外面/S 下雨/V 了/SF ， *但是*/CONJ2 我们/S 还是/ADV 去/V 了/SF 。', 'It was raining, but we still went.'],
    ],
    decoys: [['所以', 'CONJ.PAIR_MISMATCH', '所以 gives a result; the second half here contrasts with the first.']],
    cloze: {
      blank: ['不过', '可是', '但是'],
      distractors: [
        ['所以', 'CONJ.PAIR_MISMATCH', '所以 gives a result; here the second half contrasts with the first.'],
        ['因为', 'CONJ.PAIR_MISMATCH', '因为 gives a reason; here the second half contrasts with the first.'],
      ],
    },
  },
];
