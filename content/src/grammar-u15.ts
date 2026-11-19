import type { PatternSource } from './authoring';

// HSK 4 · Unit 3 (unit 15) · 选择 Choices — Preference & comparison II (provisional).

const CMP = { kind: 'before', a: 'PP', b: 'V', code: 'ORDER.COMPARISON' } as const;

export const patternsU15: PatternSource[] = [
  {
    id: 'G4-13', unit: 15, title: '与其 A，不如 B (rather than A, better B)', titleZh: '与其…不如…',
    summary: '与其 A 不如 B weighs two options and picks the second.',
    explanationMd: `
**Form:** **与其** + option A，**不如** + option B.

与其坐出租车，不如坐地铁 — "rather than take a taxi, you'd be better off taking the metro". The speaker rejects A and recommends B.

- Both clauses are usually verb phrases; subjects are often left out.
- The preferred option always comes **second**, after 不如.
- Compare **宁可…也不** (G4-14): "I'd rather (put up with) A than B".`,
    formula: ['CONJ1', 'V', 'P', 'CONJ2', 'V'],
    constraints: [{ kind: 'pair', a: '与其', b: '不如', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G3-80'],
    contrasts: ['G4-14'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['*与其*/CONJ1 在/PP 家 等/V ， *不如*/CONJ2 出去/V 找/V 他/O 。', 'Rather than waiting at home, better to go out and look for him.'],
      ['*与其*/CONJ1 坐/V 出租车/O ， *不如*/CONJ2 坐/V 地铁/O 。', "You'd be better off taking the metro than a taxi."],
      ['*与其*/CONJ1 后悔/V ， *不如*/CONJ2 现在/T 就/ADV 开始/V 。', 'Better to start now than regret it later.'],
    ],
    instances: [
      ['*与其*/CONJ1 买/V 新/O 的 ， *不如*/CONJ2 修/V 一下/C 旧/O 的 。', 'Better to fix the old one than buy a new one.'],
      ['*与其*/CONJ1 租/V 房子/O ， *不如*/CONJ2 买/V 房子/O 。', "You'd do better to buy a flat than rent."],
      ['*与其*/CONJ1 浪费/V 时间/O ， *不如*/CONJ2 去/V 图书馆/O 看/V 书/O 。', 'Rather than waste time, go and read in the library.'],
      ['*与其*/CONJ1 一直/ADV 犹豫/V ， *不如*/CONJ2 先/ADV 试/V 一下/C 。', 'Instead of dithering, just give it a try.'],
      ['*与其*/CONJ1 你/S 去/V ， *不如*/CONJ2 我/S 去/V 。', "It'd be better if I went rather than you."],
      ['*与其*/CONJ1 出国/V 读/V 研究生/O ， *不如*/CONJ2 先/ADV 工作/V 两/C 年 。', "Rather than going abroad for a master's, better to work for two years first."],
      ['*与其*/CONJ1 打/V 电话/O ， *不如*/CONJ2 发/V 电子邮件/O 。', 'An email would be better than a phone call.'],
      ['*与其*/CONJ1 生气/V ， *不如*/CONJ2 好好@hao=hǎo_hǎo/ADV 想/V 一下/C 办法/O 。', 'Instead of getting angry, think of a solution.'],
      ['*与其*/CONJ1 花/V 钱/O 买/V 衣服/O ， *不如*/CONJ2 去/V 旅游/O 。', 'Better to spend the money on a trip than on clothes.'],
      ['*与其*/CONJ1 在/PP 这儿 排队/V ， *不如*/CONJ2 明天/T 再/ADV 来/V 。', 'Rather than queueing here, better to come back tomorrow.'],
      ['*与其*/CONJ1 问/V 别人/O ， *不如*/CONJ2 自己/S 判断/V 。', 'Better to judge for yourself than ask others.'],
      ['*与其*/CONJ1 选/V 贵/O 的 ， *不如*/CONJ2 选/V 适合/O 自己 的 。', "Rather than choose the expensive one, choose the one that suits you."],
      ['*与其*/CONJ1 晚上/T 加班/V ， *不如*/CONJ2 早上/T 早/ADV 一点儿 来/V 。', 'Better to come in earlier than to stay late.'],
      ['*与其*/CONJ1 开车/V ， *不如*/CONJ2 骑/V 自行车/O 。', 'Cycling would be better than driving.'],
      ['*与其*/CONJ1 担心/V ， *不如*/CONJ2 做/V 好/C 准备/O 。', 'Rather than worry, get yourself prepared.'],
    ],
    cloze: {
      blank: ['不如'],
      distractors: [
        ['而且', 'CONJ.PAIR_MISMATCH', '与其 pairs with 不如 ("rather than A, better B"); 而且 just adds a point.'],
        ['所以', 'CONJ.PAIR_MISMATCH', '所以 gives a result; after 与其 the preferred option is introduced by 不如.'],
      ],
    },
  },
  {
    id: 'G4-14', unit: 15, title: '宁可 A，也不 B (would rather A than B)', titleZh: '宁可…也不…',
    summary: '宁可 accepts something unpleasant (A) to avoid B: 宁可 A，也不 B (or 也要 C).',
    explanationMd: `
**Form:** Subject + **宁可** + A，**也不** + B  ·  or  宁可 A，**也要** + C.

我宁可走路，也不坐他的车 — "I'd rather walk than ride in his car". A is a sacrifice the speaker is willing to make.

- 也 goes after the (often unstated) second subject, before 不 / 要.
- With **也要**: 我宁可少睡一点儿，也要完成作业 — "I'll sleep less if that's what it takes to finish".
- Compare **与其…不如** (G4-13): weighing options, not sacrificing.`,
    formula: ['S', 'ADV', 'V', 'P', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '宁可', b: '也', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G4-13'],
    contrasts: ['G4-13'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['我/S *宁可*/ADV 走/V 路/O ， *也*/ADV 不/ADV 坐/V 他/O 的 车 。', "I'd rather walk than ride in his car."],
      ['他/S *宁可*/ADV 加班/V ， *也*/ADV 不/ADV 想/MOD 把/BA 工作 留/V 到/C 明天 。', "He'd rather stay late than leave the work till tomorrow."],
      ['我/S *宁可*/ADV 少/ADV 睡/V 一点儿/C ， *也*/ADV 要/MOD 完成/V 作业/O 。', "I'll sleep less if that's what it takes to finish my homework."],
    ],
    instances: [
      ['她/S *宁可*/ADV 一 个 人 去/V ， *也*/ADV 不/ADV 跟/PP 他 去/V 。', "She'd rather go alone than with him."],
      ['我/S *宁可*/ADV 多/ADV 花/V 一点儿/O 钱 ， *也*/ADV 要/MOD 买/V 好/O 的 。', "I'd rather pay a bit more and get a good one."],
      ['他/S *宁可*/ADV 不/ADV 吃/V 饭/O ， *也*/ADV 不/ADV 浪费/V 时间/O 。', "He'd rather skip a meal than waste time."],
      ['我/S *宁可*/ADV 在/PP 家 休息/V ， *也*/ADV 不/ADV 去/V 那/O 个 聚会 。', "I'd rather rest at home than go to that party."],
      ['我/S *宁可*/ADV 多/ADV 等/V 一会儿/C ， *也*/ADV 不/ADV 坐/V 出租车/O 。', "I'd rather wait a bit longer than take a taxi."],
      ['她/S *宁可*/ADV 租/V 小/O 一点儿 的 房子 ， *也*/ADV 不/ADV 想/MOD 离/PP 公司 太 远/V 。', "She'd rather rent a smaller flat than live far from work."],
      ['我/S *宁可*/ADV 自己/S 做/V ， *也*/ADV 不/ADV 想/MOD 让/V 别人/O 帮忙/V 。', "I'd rather do it myself than have others help."],
      ['他/S *宁可*/ADV 辞职/V ， *也*/ADV 不/ADV 做/V 不 喜欢 的 工作/O 。', "He'd rather quit than do a job he doesn't like."],
      ['我/S *宁可*/ADV 早/ADV 一点儿 起床/V ， *也*/ADV 不/ADV 想/MOD 迟到/V 。', "I'd rather get up early than be late."],
      ['他/S *宁可*/ADV 输/V ， *也*/ADV 不/ADV 放弃/V 。', "He'd rather lose than give up."],
      ['我/S *宁可*/ADV 相信/V 他/O ， *也*/ADV 不/ADV 相信/V 这/O 种 新闻 。', "I'd rather believe him than this kind of news."],
      ['她/S *宁可*/ADV 自己/S 累/V 一点儿/C ， *也*/ADV 要/MOD 照顾/V 好/C 孩子/O 。', "She'll wear herself out if that's what it takes to look after the children."],
      ['我/S *宁可*/ADV 慢/ADV 一点儿 ， *也*/ADV 不/ADV 想/MOD 出/V 错/O 。', "I'd rather go slowly than make mistakes."],
      ['他/S *宁可*/ADV 走/V 远/O 一点儿 的 路 ， *也*/ADV 要/MOD 去/V 那/O 家 饭馆 。', "He'll walk further rather than miss that restaurant."],
      ['我/S *宁可*/ADV 晚/ADV 一点儿 出国/V ， *也*/ADV 要/MOD 先/ADV 把/BA 汉语 学/V 好/C 。', "I'd rather go abroad later and get my Chinese right first."],
    ],
    decoys: [['就', 'CONJ.PAIR_MISMATCH', '宁可 pairs with 也 (也不 / 也要), not 就.']],
    cloze: {
      blank: ['宁可'],
      distractors: [
        ['与其', 'CONJ.PAIR_MISMATCH', '与其 pairs with 不如, not 也.'],
        ['只要', 'CONJ.CONDITION_LOGIC', '只要 "as long as" pairs with 就.'],
      ],
    },
  },
  {
    id: 'G4-15', unit: 15, title: 'A 不如 B (+ Adj) (A is not as good as B)', titleZh: '“不如”比较句',
    summary: 'A 不如 B says A falls short of B — on its own, or with the quality after B.',
    explanationMd: `
**Form:** A + **不如** + B (+ Adj).

坐出租车不如坐地铁快 — "a taxi isn't as quick as the metro". Without an adjective, 不如 means "isn't as good as": 我的汉语不如他.

- Very close to **A 没有 B + Adj** (G3-19); 不如 sounds a little more written.
- The adjective is a *positive* quality: 不如他高, not ✗ 不如他矮.
- Don't add 很/非常: ✗ 不如他很快.`,
    formula: ['S', 'PP', 'V'],
    constraints: [CMP],
    requires: ['G3-19'],
    contrasts: ['G3-19', 'G3-17'],
    errorCodes: ['ORDER.COMPARISON', 'COMP.NEG_COMPARISON'],
    examples: [
      ['坐/S 出租车 *不如*/PP 坐 地铁 快/V 。', "A taxi isn't as quick as the metro."],
      ['我/S 的 汉语 *不如*/PP 他 好/V 。', "My Chinese isn't as good as his."],
      ['今天/S *不如*/PP 昨天 暖和/V 。', "Today isn't as warm as yesterday."],
    ],
    instances: [
      ['这/S 家 饭馆 的 菜 *不如*/PP 以前 好吃/V 了/SF 。', "This restaurant's food isn't as good as it used to be."],
      ['我/S 的 经验 *不如*/PP 你 多/V 。', "I don't have as much experience as you."],
      ['他/S 的 普通话 *不如*/PP 他 妹妹 标准/V 。', "His Mandarin isn't as standard as his sister's."],
      ['网上/S 的 东西 *不如*/PP 商店 里 的 好/V 。', "Things online aren't as good as in the shops."],
      ['这/S 个 房子 *不如*/PP 那 个 方便/V 。', "This flat isn't as convenient as that one."],
      ['一/S 个 人 去 *不如*/PP 大家 一起 去 有意思/V 。', "Going alone isn't as fun as all going together."],
      ['看/S 电视 *不如*/PP 看 书 有意思/V 。', "TV isn't as interesting as reading."],
      ['这/S 次 考试 的 成绩 *不如*/PP 上 次 好/V 。', "My result this time isn't as good as last time."],
      ['我/S 做 的 菜 *不如*/PP 妈妈 做 的 好吃/V 。', "My cooking isn't as good as Mum's."],
      ['这/S 种 方法 *不如*/PP 那 种 简单/V 。', "This method isn't as simple as that one."],
      ['北方/S 的 冬天 *不如*/PP 南方 暖和/V 。', "Winters in the north aren't as mild as in the south."],
      ['这/S 张 照片 *不如*/PP 那 张 漂亮/V 。', "This photo isn't as nice as that one."],
      ['他/S 的 理由 *不如*/PP 你 的 好/V 。', "His reason isn't as good as yours."],
      ['旧/S 电脑 *不如*/PP 新 的 快/V 。', "The old computer isn't as fast as the new one."],
      ['这/S 个 工作 的 工资 *不如*/PP 那 个 高/V 。', "This job doesn't pay as well as that one."],
    ],
    decoys: [['很', 'COMP.DEGREE_IN_BI', 'No 很 / 非常 in a comparison: 不如他快.']],
    cloze: {
      blank: ['不如'],
      distractors: [
        ['比', 'COMP.NEG_COMPARISON', '比 would say A is MORE …; "not as … as" is 不如 / 没有.'],
        ['跟', 'COMP.BI_YIYANG', '跟 needs 一样 to compare; "not as … as" is 不如.'],
      ],
    },
  },
  {
    id: 'G4-16', unit: 15, title: '跟 … 相比 / 和 … 比起来 (compared with)', titleZh: '跟…相比／和…比起来',
    summary: '跟 X 相比 / 和 X 比起来 sets up the point of comparison at the start of the sentence.',
    explanationMd: `
**Form:** **跟 / 和** + X + **相比 / 比起来**，main clause.

跟去年相比，房租贵多了 — "compared with last year, rent is much higher".

- The frame goes **first**, followed by a comma.
- The main clause uses a comparative: 更 + Adj, Adj + 一点儿 / 多了 / 得多.
- 相比 is more written; 比起来 is everyday speech.`,
    formula: ['PP', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G3-17'],
    errorCodes: ['ORDER.COMPARISON', 'COMP.DEGREE_IN_BI'],
    examples: [
      ['*跟*/PP 去年 *相比* ， 房租/S 贵/V 多/C 了 。', 'Compared with last year, rent is much higher.'],
      ['*和*/PP 城市 *比* *起来* ， 农村/S 安静/V 多/C 了 。', "Compared with the city, the countryside is much quieter."],
      ['*跟*/PP 别人 *相比* ， 他/S 的 优点 很/ADV 明显/V 。', "Compared with others, his strengths are obvious."],
    ],
    instances: [
      ['*跟*/PP 以前 *相比* ， 他/S 的 汉语 好/V 多/C 了 。', 'His Chinese is much better than before.'],
      ['*和*/PP 坐 飞机 *比* *起来* ， 坐/S 火车 便宜/V 一点儿/C 。', 'The train is a bit cheaper than flying.'],
      ['*跟*/PP 你 *相比* ， 我/S 的 经验 少/V 多/C 了 。', 'Compared with you, I have far less experience.'],
      ['*和*/PP 去年 *比* *起来* ， 这/S 个 冬天 暖和/V 一点儿/C 。', 'This winter is a bit milder than last year.'],
      ['*跟*/PP 大 城市 *相比* ， 这儿/S 的 房租 便宜/V 得/C 多 。', 'Rent here is far cheaper than in big cities.'],
      ['*和*/PP 他 哥哥 *比* *起来* ， 他/S 更/ADV 幽默/V 。', "He's funnier than his older brother."],
      ['*跟*/PP 其他 学校 *相比* ， 这儿/S 的 条件 更/ADV 好/V 。', 'Conditions here are better than at other schools.'],
      ['*和*/PP 网上 *比* *起来* ， 商店/S 里 的 东西 贵/V 一点儿/C 。', 'Things in the shops are a bit dearer than online.'],
      ['*跟*/PP 优点 *相比* ， 缺点/S 并/ADV 不/ADV 重要/V 。', "Compared with the strengths, the weaknesses don't really matter."],
      ['*和*/PP 早上 *比* *起来* ， 晚上/S 地铁 上 的 人 少/V 一点儿/C 。', "There are fewer people on the metro in the evening than in the morning."],
      ['*跟*/PP 第一 次 *相比* ， 这/S 次 面试 轻松/V 多/C 了 。', 'This interview was much easier than the first.'],
      ['*和*/PP 米饭 *比* *起来* ， 我/S 更/ADV 喜欢/V 面条/O 。', 'I prefer noodles to rice.'],
      ['*跟*/PP 北方 *相比* ， 南方/S 的 夏天 更/ADV 热/V 。', 'Summers in the south are hotter than in the north.'],
      ['*和*/PP 他 *比* *起来* ， 我/S 的 普通话 不/ADV 太/ADV 标准/V 。', "My Mandarin isn't as standard as his."],
      ['*跟*/PP 十 年 以前 *相比* ， 这/S 个 城市 大/V 多/C 了 。', 'The city is much bigger than ten years ago.'],
    ],
    decoys: [['很', 'COMP.DEGREE_IN_BI', 'After a comparison frame, use 更 / 多了 / 一点儿, not 很.']],
  },
  {
    id: 'G4-17', unit: 15, title: '一 + M + 比 + 一 + M (each … more than the last)', titleZh: '一天比一天…',
    summary: '一天比一天 / 一个比一个 + Adj: steadily more, or each one more than the last.',
    explanationMd: `
**Form:** Subject + **一 M 比一 M** + Adj.

- With time words it's **gradual change**: 天气一天比一天冷 — "it's getting colder by the day".
- With other measures it compares **members of a group**: 孩子一个比一个聪明 — "each child is cleverer than the last".

No 很 / 更 before the adjective; the frame already means "more".`,
    formula: ['S', 'ADV', 'V'],
    constraints: [{ kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' }],
    requires: ['G3-21'],
    contrasts: ['G3-21'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'COMP.DEGREE_IN_BI'],
    examples: [
      ['天气/S *一*/ADV 天 *比* 一 天 冷/V 。', "It's getting colder by the day."],
      ['他/S 的 汉语 *一*/ADV 年 *比* 一 年 好/V 。', 'His Chinese gets better every year.'],
      ['孩子/S *一*/ADV 个 *比* 一 个 聪明/V 。', 'Each child is cleverer than the last.'],
    ],
    instances: [
      ['房租/S *一*/ADV 年 *比* 一 年 贵/V 。', 'Rent goes up every year.'],
      ['这儿/S 的 顾客 *一*/ADV 天 *比* 一 天 多/V 。', 'There are more customers here every day.'],
      ['他/S 的 压力 *一*/ADV 天 *比* 一 天 大/V 。', 'The pressure on him grows day by day.'],
      ['这/S 些 问题 *一*/ADV 个 *比* 一 个 难/V 。', 'Each of these questions is harder than the last.'],
      ['她/S 画 的 画儿 *一*/ADV 张 *比* 一 张 漂亮/V 。', 'Each of her pictures is prettier than the one before.'],
      ['他们/S 的 关系 *一*/ADV 天 *比* 一 天 好/V 。', 'Their relationship gets better by the day.'],
      ['商店/S 里 的 衣服 *一*/ADV 件 *比* 一 件 贵/V 。', 'Each item of clothing in the shop is dearer than the last.'],
      ['我们/S 的 生活 *一*/ADV 年 *比* 一 年 好/V 。', 'Our life gets better every year.'],
      ['他/S 写 的 字 *一*/ADV 次 *比* 一 次 整齐/V 。', 'His handwriting gets neater each time.'],
      ['天/S *一*/ADV 天 *比* 一 天 长/V 了/SF 。', 'The days are getting longer.'],
      ['这/S 几 个 学生 *一*/ADV 个 *比* 一 个 优秀/V 。', 'These students are each more outstanding than the last.'],
      ['雨/S *一*/ADV 天 *比* 一 天 大/V 。', 'The rain gets heavier every day.'],
      ['他/S 的 成绩 *一*/ADV 次 *比* 一 次 好/V 。', 'His results improve every time.'],
      ['这/S 条 路 上 的 车 *一*/ADV 年 *比* 一 年 多/V 。', 'There are more cars on this road every year.'],
      ['菜/S 的 价格 *一*/ADV 天 *比* 一 天 高/V 。', 'Food prices rise day by day.'],
    ],
    decoys: [['更', 'COMP.DEGREE_IN_BI', '一天比一天 already means "more"; no 更 / 很 before the adjective.']],
  },
  {
    id: 'G4-18', unit: 15, title: 'A 比 B 还 + Adj (even more … than)', titleZh: '比…还…',
    summary: '还 after 比 B says A goes even further than B, which is already high on that scale.',
    explanationMd: `
**Form:** A + **比** + B + **还 / 更** + Adj.

弟弟比哥哥还高 — "the younger brother is even taller than the older one" (who is already tall).

- 还 adds surprise: B was the benchmark. 更 is a neutral "more".
- ✗ 很 / 非常 / 太 never go inside a 比 sentence.
- 还 / 更 sit **after 比 B**, right before the adjective.`,
    formula: ['S', 'PP', 'ADV', 'V'],
    constraints: [CMP],
    requires: ['G3-17'],
    contrasts: ['G3-17'],
    errorCodes: ['ORDER.COMPARISON', 'COMP.DEGREE_IN_BI'],
    examples: [
      ['弟弟/S 比/PP 哥哥 *还*/ADV 高/V 。', 'The younger brother is even taller than the older one.'],
      ['今天/S 比/PP 昨天 *还*/ADV 冷/V 。', 'Today is even colder than yesterday.'],
      ['这/S 个 问题 比/PP 那 个 *还*/ADV 复杂/V 。', 'This problem is even more complicated than that one.'],
    ],
    instances: [
      ['这儿/S 的 房租 比/PP 北京 *还*/ADV 贵/V 。', 'Rent here is even higher than in Beijing.'],
      ['他/S 比/PP 我 *还*/ADV 着急/V 。', "He's even more anxious than I am."],
      ['这/S 个 办法 比/PP 以前 的 *还*/ADV 简单/V 。', 'This method is even simpler than the old one.'],
      ['她/S 的 普通话 比/PP 老师 的 *还*/ADV 标准/V 。', "Her Mandarin is even more standard than the teacher's."],
      ['坐/S 公共汽车 比/PP 走 路 *还*/ADV 慢/V 。', 'The bus is even slower than walking.'],
      ['孩子/S 比/PP 父母 *还*/ADV 懂/V 手机/O 。', 'Kids know phones even better than their parents.'],
      ['这/S 次 考试 比/PP 上 次 *还*/ADV 难/V 。', 'This exam was even harder than the last.'],
      ['他/S 的 理由 比/PP 你 的 *还*/ADV 奇怪/V 。', 'His reason is even stranger than yours.'],
      ['网上/S 的 价格 比/PP 商店 *还*/ADV 便宜/V 。', 'Prices online are even lower than in the shops.'],
      ['这/S 个 缺点 比/PP 那 个 *还*/ADV 明显/V 。', 'This weakness is even more obvious than that one.'],
      ['我/S 比/PP 你 *还*/ADV 后悔/V 。', 'I regret it even more than you do.'],
      ['妹妹/S 比/PP 姐姐 *还*/ADV 会/MOD 说话/V 。', 'The younger sister is even better with words than the older one.'],
      ['这/S 件 衣服 比/PP 那 件 *还*/ADV 适合/V 你/O 。', 'This one suits you even better than that one.'],
      ['这/S 个 夏天 比/PP 去年 *还*/ADV 热/V 。', 'This summer is even hotter than last year.'],
      ['博士/S 的 压力 比/PP 硕士 *还*/ADV 大/V 。', "A PhD is even more stressful than a master's."],
    ],
    decoys: [['很', 'COMP.DEGREE_IN_BI', '很 can’t go inside a 比 sentence; use 还 or 更.']],
    cloze: {
      blank: ['还'],
      distractors: [
        ['很', 'COMP.DEGREE_IN_BI', '很 can’t go inside a 比 sentence; use 还 or 更.'],
        ['非常', 'COMP.DEGREE_IN_BI', '非常 can’t go inside a 比 sentence; use 还 or 更.'],
      ],
    },
  },
];
