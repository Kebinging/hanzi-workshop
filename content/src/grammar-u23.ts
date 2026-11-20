import type { PatternSource } from './authoring';

// HSK 4 · Unit 11 (unit 23) · 文化 Culture — Emphasis (provisional).

const ADV_POS = { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' } as const;

export const patternsU23: PatternSource[] = [
  {
    id: 'G4-61', unit: 23, title: '是 + Adj / V + 的 (assertion)', titleZh: '“是…的”：表示肯定',
    summary: '是 … 的 around a comment states it firmly, as the speaker\'s considered view.',
    explanationMd: `
**Form:** Subject + **是** + (很) Adj / V phrase + **的**.

中国的文化是很丰富的 — "Chinese culture really is rich".

- Different from 是…的 for focus (G3-71), which picks out *when / where / how* a past event happened. Here 是…的 just makes a judgement sound firm and reasoned.
- Remove 是 and 的 and the sentence is still correct, only weaker.
- Common with 会…的 / 能…的 for confident predictions: 我是不会忘记的.`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [],
    requires: ['G3-71'],
    contrasts: ['G3-71'],
    errorCodes: ['ASPECT.LE_MISUSE'],
    examples: [
      ['这/S 个 办法 *是*/ADV 很/ADV 好/V *的*/SF 。', 'This method really is good.'],
      ['中国/S 的 文化 *是*/ADV 很/ADV 丰富/V *的*/SF 。', 'Chinese culture really is rich.'],
      ['学/S 书法 *是*/ADV 不/ADV 容易/V *的*/SF 。', "Learning calligraphy is not easy, that's for sure."],
    ],
    instances: [
      ['他/S 的 作品 *是*/ADV 很/ADV 有名/V *的*/SF 。', 'His work is genuinely famous.'],
      ['这/S 个 传统 *是*/ADV 很/ADV 有/V 意义/O *的*/SF 。', 'This tradition is truly meaningful.'],
      ['京剧/S *是*/ADV 很/ADV 难/V 懂 *的*/SF 。', 'Peking opera really is hard to follow.'],
      ['你/S 的 看法 *是*/ADV 对/V *的*/SF 。', 'Your view is right.'],
      ['这/S 种 风俗 *是*/ADV 很/ADV 普遍/V *的*/SF 。', 'This custom is indeed widespread.'],
      ['学/S 一 门 艺术 *是*/ADV 需要/V 时间/O *的*/SF 。', 'Learning an art does take time.'],
      ['这/S 个 博物馆 *是*/ADV 很/ADV 值得/V 参观 *的*/SF 。', 'This museum is well worth a visit.'],
      ['他们/S 的 表演 *是*/ADV 非常/ADV 精彩/V *的*/SF 。', 'Their performance really is superb.'],
      ['保留/S 传统 *是*/ADV 很/ADV 重要/V *的*/SF 。', 'Keeping traditions alive really matters.'],
      ['这/S 些 建筑 *是*/ADV 很/ADV 有/V 特色/O *的*/SF 。', 'These buildings really are distinctive.'],
      ['我/S *是*/ADV 不/ADV 会/MOD 忘记/V *的*/SF 。', 'I will never forget, I promise.'],
      ['她/S *是*/ADV 很/ADV 会/MOD 弹/V 钢琴/O *的*/SF 。', 'She really can play the piano.'],
      ['中秋节/S 的 月饼 *是*/ADV 很/ADV 好吃/V *的*/SF 。', 'Mid-Autumn mooncakes really are delicious.'],
      ['这/S 句 成语 *是*/ADV 很/ADV 有名/V *的*/SF 。', 'This idiom is well known.'],
      ['观众/S *是*/ADV 很/ADV 喜欢/V 这/O 个 演员 *的*/SF 。', 'Audiences really do love this actor.'],
    ],
    cloze: {
      blank: ['的'],
      distractors: [
        ['了', 'ASPECT.LE_MISUSE', '了 announces a change; the assertion frame 是 … 的 ends in 的.'],
        ['吗', 'LEX.MEANING', '吗 would turn the statement into a question.'],
      ],
    },
  },
  {
    id: 'G4-62', unit: 23, title: 'Double negatives: 没有…不 / 不能不 (everyone; must)', titleZh: '双重否定',
    summary: 'Two negatives make a strong positive: 没有人不知道 = everyone knows; 不能不去 = must go.',
    explanationMd: `
- **没有** + someone / something + **不** + V — "there's no one who doesn't …" = everyone: 没有人不知道他。
- **不能不 / 不会不** + V — "can't not" = must / will certainly: 这个电影你不能不看。
- **没有…不…的**: 当地人没有不知道的 — "there isn't a local who doesn't know".

The double negative is *stronger* than the plain positive.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [],
    requires: ['G3-77'],
    errorCodes: ['ORDER.GENERAL', 'ASPECT.NEG_BU_MEI'],
    examples: [
      ['*没有*/V 人/O *不*/ADV 知道/V 他/O 。', 'Everybody knows him.'],
      ['春节/T 的 时候 ， 我们/S *不*/ADV 能/MOD *不*/ADV 吃/V 饺子/O 。', 'At Spring Festival we simply must eat dumplings.'],
      ['这/TOP 个 电影 你/S *不*/ADV 能/MOD *不*/ADV 看/V 。', 'You have to see this film.'],
    ],
    instances: [
      ['*没有*/V 人/O *不*/ADV 喜欢/V 他/O 的 作品 。', 'Everyone loves his work.'],
      ['你/S *不*/ADV 能/MOD *不*/ADV 去/V 。', 'You have to go.'],
      ['这儿/S *没有*/V 一/O 个 人 *不*/ADV 认识/V 他/O 。', 'There is not a single person here who does not know him.'],
      ['*没有*/V 一/O 个 观众 *不*/ADV 感动/V 。', 'Every single member of the audience was moved.'],
      ['他/S 说 得 这么 好 ， 我/S *不*/ADV 能/MOD *不*/ADV 同意/V 。', "He put it so well, I can't help but agree."],
      ['*没有*/V 人/O *不*/ADV 想/MOD 去/V 这/O 个 博物馆 。', 'Everyone wants to visit this museum.'],
      ['这/TOP 种 风俗 ， 当地/S 人 *没有*/V *不*/ADV 知道/V 的/SF 。', 'Every local knows this custom.'],
      ['这么/TOP 好 的 机会 ， 你/S *不*/ADV 能/MOD *不*/ADV 参加/V 。', "With a chance like this, you've got to take part."],
      ['*没有*/V 一/O 个 孩子 *不*/ADV 喜欢/V 烟花/O 。', 'Every child loves fireworks.'],
      ['他/S *不*/ADV 会/MOD *不*/ADV 来/V 的/SF 。', "He'll definitely come."],
      ['这/TOP 个 成语 ， 中国/S 人 *没有*/V *不*/ADV 会/MOD 的/SF 。', 'Every Chinese person knows this idiom.'],
      ['你/S 来/V 了 北京/O ， *不*/ADV 能/MOD *不*/ADV 吃/V 烤鸭/O 。', "If you come to Beijing, you can't miss the roast duck."],
      ['这/TOP 次 演出 ， *没有*/V 人/O *不*/ADV 说/V 好/O 。', 'Everyone said the show was good.'],
      ['作为/PP 学生 ， 我/S *不*/ADV 能/MOD *不*/ADV 努力/V 。', 'As a student, I have to work hard.'],
      ['*没有*/V 一/O 个 人 *不*/ADV 想念/V 家/O 。', 'There is nobody who does not miss home.'],
    ],
  },
  {
    id: 'G4-63', unit: 23, title: '连 + V + 都 / 也 + 没 / 不 + V (didn\'t even …)', titleZh: '连…都没…',
    summary: '连 V 都没 V repeats the verb to stress that not even the smallest step was taken.',
    explanationMd: `
**Form:** Subject + **连** + V + **都 / 也** + 没 / 不 + V (+ …).

他连看都没看就走了 — "he left without so much as a glance".

- The **same verb** appears twice: after 连 and after 没 / 不.
- 没 for what didn't happen; 不 for what someone won't do: 她连听都不想听.
- Builds on 连…都 (G3-72) — there the thing after 连 was a noun.`,
    formula: ['S', 'PP', 'ADV', 'ADV', 'V'],
    constraints: [
      { kind: 'pair', a: '连', b: '都', code: 'CONJ.PAIR_MISMATCH' },
      { kind: 'before', a: 'PP', b: 'V', code: 'ORDER.ADVERB_POSITION' },
    ],
    requires: ['G3-72'],
    contrasts: ['G3-72'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['他/S *连*/PP 看 *都*/ADV 没/ADV 看/V 就/ADV 走/V 了/SF 。', 'He left without even looking.'],
      ['我/S *连*/PP 想 *都*/ADV 没/ADV 想/V 就/ADV 答应/V 了/SF 。', 'I agreed without even thinking.'],
      ['她/S *连*/PP 听 *都*/ADV 不/ADV 想/MOD 听/V 。', "She doesn't even want to listen."],
    ],
    instances: [
      ['这/TOP 个 博物馆 我/S *连*/PP 去 *都*/ADV 没/ADV 去/V 过/ASP 。', "I've never even been to this museum."],
      ['他/S *连*/PP 问 *都*/ADV 没/ADV 问/V ， 就/ADV 拿/V 走/C 了/SF 。', 'He took it without even asking.'],
      ['我/S *连*/PP 吃 *都*/ADV 没/ADV 吃/V 过/ASP 月饼/O 。', "I've never even tasted a mooncake."],
      ['那/TOP 个 演员 ， 我/S *连*/PP 听 *都*/ADV 没/ADV 听/V 说 过 。', "I've never even heard of that actor."],
      ['他/S 太/ADV 累/V 了/SF ， *连*/PP 动 *都*/ADV 不/ADV 想/MOD 动/V 。', "He's so tired he doesn't even want to move."],
      ['这/TOP 本 书 我/S *连*/PP 看 *都*/ADV 没/ADV 看/V 完/C 。', "I haven't even finished reading this book."],
      ['她/S *连*/PP 试 *都*/ADV 没/ADV 试/V 就/ADV 买/V 了/SF 。', 'She bought it without even trying it on.'],
      ['他/S 生气/V 了/SF ， *连*/PP 说 *都*/ADV 不/ADV 想/MOD 说/V 。', "He's angry and won't even talk."],
      ['你/S *连*/PP 吃 *都*/ADV 没/ADV 吃/V ， 怎么/ADV 知道/V 不 好吃 ？', "You haven't even tasted it — how do you know it's not nice?"],
      ['我/S *连*/PP 想 *都*/ADV 不/ADV 敢/MOD 想/V 。', "I don't even dare think about it."],
      ['他/S *连*/PP 看 *都*/ADV 不/ADV 看/V 我/O 。', "He won't even look at me."],
      ['我/S *连*/PP 坐 *都*/ADV 没/ADV 坐/V ， 就/ADV 走/V 了/SF 。', 'I left without even sitting down.'],
      ['这/TOP 个 字 我/S *连*/PP 见 *都*/ADV 没/ADV 见/V 过/ASP 。', "I've never even seen this character."],
      ['他/S *连*/PP 准备 *都*/ADV 没/ADV 准备/V 就/ADV 去/V 演出/V 了/SF 。', 'He went on stage without any preparation.'],
      ['她/S *连*/PP 问 *都*/ADV 不/ADV 问/V 就/ADV 拒绝/V 了/SF 。', 'She refused without even asking.'],
    ],
    cloze: {
      blank: ['都'],
      distractors: [
        ['就', 'CONJ.PAIR_MISMATCH', '连 pairs with 都 / 也, not 就.'],
        ['才', 'CONJ.PAIR_MISMATCH', '连 pairs with 都 / 也, not 才.'],
      ],
    },
  },
  {
    id: 'G4-64', unit: 23, title: '一点儿 + 也 / 都 + 不 + Adj (not … at all)', titleZh: '一点儿也不…',
    summary: '一点儿也不 / 一点儿都不 + Adj (or 没 + V) = not in the slightest.',
    explanationMd: `
**Form:** Subject + **一点儿 + 也 / 都 + 不** + Adj · or **一点儿 + 也 / 都 + 没** + V.

这个演出一点儿也不无聊 — "this show isn't boring in the slightest".

- 一点儿 here goes **before** the negative, unlike 慢一点儿 (after the adjective).
- Compare G3-77 (一 + M + N + 也不), which counts things: 一个人也没有.`,
    formula: ['S', 'ADV', 'ADV', 'V'],
    constraints: [ADV_POS],
    requires: ['G3-77', 'G3-23'],
    contrasts: ['G3-23', 'G3-77'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'CONJ.MISSING_PARTNER'],
    examples: [
      ['这/S 个 演出 *一点儿*/ADV *也* 不/ADV 无聊/V 。', "This show isn't boring in the slightest."],
      ['我/S *一点儿*/ADV *都* 不/ADV 累/V 。', "I'm not tired at all."],
      ['京剧/S *一点儿*/ADV *也* 不/ADV 难/V 懂 。', 'Peking opera is not hard to follow at all.'],
    ],
    instances: [
      ['这/S 种 茶叶 *一点儿*/ADV *也* 不/ADV 贵/V 。', "This tea isn't expensive at all."],
      ['他/S *一点儿*/ADV *都* 不/ADV 害怕/V 。', "He's not scared in the least."],
      ['这儿/S 的 冬天 *一点儿*/ADV *也* 不/ADV 冷/V 。', "Winters here aren't cold at all."],
      ['学/S 书法 *一点儿*/ADV *也* 不/ADV 简单/V 。', 'Calligraphy is not at all simple.'],
      ['我/S *一点儿*/ADV *都* 不/ADV 后悔/V 。', "I don't regret it one bit."],
      ['这/S 个 博物馆 *一点儿*/ADV *也* 不/ADV 大/V 。', "This museum isn't big at all."],
      ['她/S *一点儿*/ADV *都* 没/ADV 变/V 。', "She hasn't changed a bit."],
      ['月饼/S *一点儿*/ADV *也* 不/ADV 好吃/V 。', "Mooncakes aren't nice at all."],
      ['我/S *一点儿*/ADV *也* 不/ADV 想/MOD 去/V 。', "I don't want to go at all."],
      ['这/S 个 故事 *一点儿*/ADV *都* 不/ADV 有意思/V 。', "This story isn't interesting at all."],
      ['他/S 的 汉语 *一点儿*/ADV *也* 不/ADV 差/V 。', 'His Chinese is not bad at all.'],
      ['这/S 件 事情 *一点儿*/ADV *都* 不/ADV 奇怪/V 。', "There's nothing strange about this at all."],
      ['舞台/S 上 的 演员 *一点儿*/ADV *也* 不/ADV 紧张/V 。', 'The actors on stage are not nervous at all.'],
      ['这/S 个 风俗 现在 *一点儿*/ADV *都* 不/ADV 流行/V 了/SF 。', 'This custom has gone completely out of fashion.'],
      ['我/S 对/PP 京剧 *一点儿*/ADV *也* 不/ADV 了解/V 。', "I know nothing at all about Peking opera."],
    ],
    cloze: {
      blank: ['也', '都'],
      distractors: [
        ['就', 'CONJ.PAIR_MISMATCH', '一点儿 + 也 / 都 + 不 = not at all; 就 doesn’t fit.'],
        ['还', 'LEX.COLLOCATION', '一点儿 needs 也 / 都 before the negative.'],
      ],
    },
  },
  {
    id: 'G4-65', unit: 23, title: '再 + Adj / V，也 … (however …, still …)', titleZh: '再…也…',
    summary: '再 + Adj / V in the first clause means "no matter how …"; 也 says the result doesn\'t change.',
    explanationMd: `
**Form:** (Subject) + **再** + Adj / V，(Subject) + **也** + …

你再忙，也要吃饭 — "however busy you are, you still have to eat".

- 再 here isn't "again": it pushes the degree as high as you like.
- Often 再 + 怎么 + V: 你再怎么解释，他也不相信.
- Close to 无论多么 … 都 (G4-08), but shorter and more spoken.`,
    formula: ['S', 'ADV', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '再', b: '也', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G4-08'],
    contrasts: ['G4-08', 'G3-10'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['你/S *再*/ADV 忙/V ， *也*/ADV 要/MOD 吃/V 饭/O 。', 'However busy you are, you still have to eat.'],
      ['天气/S *再*/ADV 冷/V ， 他/S *也*/ADV 去/V 锻炼/V 。', 'However cold it is, he still goes to exercise.'],
      ['这/S 个 字 *再*/ADV 难/V ， 我/S *也*/ADV 要/MOD 学/V 会/C 。', "However hard this character is, I'm going to learn it."],
    ],
    instances: [
      ['东西/S *再*/ADV 贵/V ， 她/S *也*/ADV 要/MOD 买/V 。', 'However expensive it is, she will buy it.'],
      ['你/S *再*/ADV 怎么/ADV 解释/V ， 他/S *也*/ADV 不/ADV 相信/V 。', "However you explain it, he won't believe you."],
      ['路/S *再*/ADV 远/V ， 我/S *也*/ADV 要/MOD 去/V 看/V 那/O 个 演出 。', "However far it is, I'm going to see that show."],
      ['工作/S *再*/ADV 累/V ， 他/S *也*/ADV 不/ADV 抱怨/V 。', 'However tiring the work is, he never complains.'],
      ['你/S *再*/ADV 生气/V ， *也*/ADV 不/ADV 能/MOD 骂/V 人/O 。', "However angry you are, you can't swear at people."],
      ['门票/S *再*/ADV 贵/V ， 这/S 个 演出 *也*/ADV 值得/V 看/V 。', 'However expensive the tickets are, this show is worth seeing.'],
      ['时间/S *再*/ADV 晚/V ， 我/S *也*/ADV 等/V 你/O 。', "However late it gets, I'll wait for you."],
      ['你/S *再*/ADV 有/V 钱/O ， *也*/ADV 不/ADV 能/MOD 浪费/V 。', "However rich you are, you shouldn't waste money."],
      ['困难/S *再*/ADV 多/V ， 我们/S *也*/ADV 不/ADV 放弃/V 。', "However many difficulties there are, we won't give up."],
      ['他/S *再*/ADV 怎么/ADV 练习/V ， 钢琴/S *也*/ADV 弹/V 不 好 。', 'However much he practises, he still plays the piano badly.'],
      ['天/S *再*/ADV 黑/V ， 他/S *也*/ADV 要/MOD 回/V 家/O 。', "However dark it gets, he's going home."],
      ['风俗/S *再*/ADV 奇怪/V ， 我们/S *也*/ADV 要/MOD 尊重/V 。', 'However strange a custom is, we should respect it.'],
      ['菜/S *再*/ADV 辣/V ， 他/S *也*/ADV 能/MOD 吃/V 。', 'However spicy the food, he can eat it.'],
      ['你/S *再*/ADV 忙/V ， *也*/ADV 要/MOD 给/PP 父母 打/V 电话/O 。', 'However busy you are, ring your parents.'],
      ['雨/S *再*/ADV 大/V ， 比赛/S *也*/ADV 要/MOD 举行/V 。', 'However hard it rains, the match will go ahead.'],
    ],
    cloze: {
      blank: ['也'],
      distractors: [
        ['就', 'CONJ.PAIR_MISMATCH', '再 + Adj …，也 … = however …, still …; 就 doesn’t fit.'],
        ['才', 'CONJ.PAIR_MISMATCH', '再 + Adj …，也 …; 才 doesn’t fit.'],
      ],
    },
  },
  {
    id: 'G4-66', unit: 23, title: 'Emphatic 就 (precisely, just)', titleZh: '“就”：强调',
    summary: '就 before 是 / a verb stresses "precisely this, and nothing else" or a stubborn will.',
    explanationMd: `
- **就是**: precisely, exactly — 他就是我们的老师 ("he's the very teacher I mean"); 这就是京剧 ("so *this* is Peking opera").
- **就在**: right there — 博物馆就在前面.
- **就 + V** for insistence: 我就不去！ ("I'm just not going!"), 我就喜欢这个.

Don't confuse it with 就 = "then / as early as" (G3-08, G3-16).`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G3-08'],
    contrasts: ['G3-08'],
    errorCodes: ['ORDER.ADVERB_POSITION'],
    examples: [
      ['他/S *就*/ADV 是/V 我们/O 的 老师 。', "He's the very teacher I mean."],
      ['我/S *就*/ADV 不/ADV 去/V ！', "I'm just not going!"],
      ['博物馆/S *就*/ADV 在/V 前面/O 。', 'The museum is right up ahead.'],
    ],
    instances: [
      ['这/S *就*/ADV 是/V 京剧/O 。', 'So this is Peking opera.'],
      ['这儿/S *就*/ADV 是/V 我/O 的 老家 。', 'This is my home town.'],
      ['我/S *就*/ADV 喜欢/V 这/O 个 演员 。', 'This is the actor I like.'],
      ['你/S 说 的 那 个 人 *就*/ADV 是/V 他/O 。', "He's the very person you mentioned."],
      ['那/S 个 画家 *就*/ADV 住/V 在/C 这儿 。', 'That painter lives right here.'],
      ['明天/S *就*/ADV 是/V 中秋节/O 了 。', "Tomorrow is the Mid-Autumn Festival."],
      ['我/S *就*/ADV 知道/V 你/O 会 来 。', 'I just knew you would come.'],
      ['这/S *就*/ADV 是/V 我/O 想 买 的 书 。', "This is exactly the book I wanted to buy."],
      ['他/S *就*/ADV 不/ADV 喜欢/V 吃/V 月饼/O 。', "He just doesn't like mooncakes."],
      ['问题/S *就*/ADV 在/V 这儿/O 。', "That's exactly where the problem lies."],
      ['图书馆/S *就*/ADV 在/V 学校/O 旁边 。', 'The library is right next to the school.'],
      ['我/S *就*/ADV 要/V 这/O 个 。', 'I want this one and no other.'],
      ['这/S *就*/ADV 是/V 中国/O 的 传统 文化 。', 'This is what Chinese traditional culture is.'],
      ['那/S 天 *就*/ADV 是/V 我/O 的 生日 。', 'That day was my birthday, in fact.'],
      ['这/S *就*/ADV 是/V 我/O 最 喜欢 的 诗 。', 'This is my very favourite poem.'],
    ],
  },
];
