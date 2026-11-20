import type { PatternSource } from './authoring';

// HSK 5 · Unit 5 (unit 29) · 科学技术 Science — Formal prepositions II (provisional).

const PPV = { kind: 'before', a: 'PP', b: 'V', code: 'ORDER.PLACE_AFTER_VERB' } as const;
const BAV = { kind: 'before', a: 'BA', b: 'V', code: 'BA.ORDER' } as const;

export const patternsU29: PatternSource[] = [
  {
    id: 'G5-25', unit: 29, title: '以 A 为 B (take A as B)', titleZh: '以…为…',
    summary: '以 A 为 B (written): treat A as the B — the centre, the goal, the basis, the example.',
    explanationMd: `
**Form:** Subject + **以** + A + **为** + B.

这个学校以学生为中心 — "this school puts students at the centre".

- 为 is pronounced **wéi** here ("to be, to serve as").
- B is usually a word like 中心, 目标, 基础, 重点, 例子, 第一.
- Written style; in speech: 把 A 当作 B (G5-26).`,
    formula: ['S', 'PP', 'V', 'O'],
    constraints: [PPV],
    requires: ['G4-42'],
    contrasts: ['G5-26'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.COLLOCATION'],
    examples: [
      ['这/S 个 学校 *以*/PP 学生 *为*/V 中心/O 。', 'This school puts students at the centre.'],
      ['他/S *以*/PP 这 位 科学家 *为*/V 目标/O 。', 'He takes this scientist as his goal.'],
      ['我们/S *以*/PP 这 个 实验 *为*/V 例子/O 。', "Let's take this experiment as an example."],
    ],
    instances: [
      ['这/S 家 公司 *以*/PP 创新 *为*/V 目标/O 。', 'This company makes innovation its goal.'],
      ['他们/S *以*/PP 数据 *为*/V 基础/O 进行/V 研究/O 。', 'They base their research on data.'],
      ['我们/S *以*/PP 这 个 理论 *为*/V 基础/O 。', 'We take this theory as our basis.'],
      ['这/S 个 软件 *以*/PP 学生 *为*/V 中心/O 。', 'This software is built around students.'],
      ['科学家/S *以*/PP 观察 *为*/V 主要/O 方法 。', 'Scientists use observation as their main method.'],
      ['这/S 本 书 *以*/PP 宇宙 *为*/V 题目/O 。', 'This book takes the universe as its subject.'],
      ['我们/S *以*/PP 安全 *为*/V 第一/O 。', 'We put safety first.'],
      ['这/S 个 系统 *以*/PP 电脑 *为*/V 中心/O 。', 'This system is centred on the computer.'],
      ['他/S *以*/PP 物理 *为*/V 专业/O 。', 'He majors in physics.'],
      ['这/S 次 讨论 *以*/PP 能源 *为*/V 重点/O 。', 'This discussion focuses on energy.'],
      ['这/S 篇 文章 *以*/PP 太空 *为*/V 题目/O 。', 'This article is about outer space.'],
      ['他们/S *以*/PP 化学 *为*/V 基础/O 研究/V 新/O 材料 。', 'They research new materials using chemistry as a basis.'],
      ['这/S 个 学校 *以*/PP 科学 *为*/V 特色/O 。', 'Science is the distinctive feature of this school.'],
      ['我/S *以*/PP 他 *为*/V 目标/O ， 努力/ADV 学习/V 。', 'I take him as my model and study hard.'],
      ['这/S 个 模型 *以*/PP 真实 的 数据 *为*/V 基础/O 。', 'This model is based on real data.'],
    ],
  },
  {
    id: 'G5-26', unit: 29, title: '把 A 当作 / 看作 B (treat / regard A as B)', titleZh: '把…当作／看作…',
    summary: '把 A 当作 B = treat A as B; 把 A 看作 B = regard A as B.',
    explanationMd: `
**Form:** Subject + **把** + A + **当作 / 看作** + B.

我把他当作好朋友 — "I treat him as a close friend".

- 当作 (dàng zuò) is about *treating*, often in practice; 看作 is about *viewing*.
- The spoken equivalent of 以…为 (G5-25).`,
    formula: ['S', 'BA', 'V', 'O'],
    constraints: [BAV],
    requires: ['G3-57'],
    contrasts: ['G5-25'],
    errorCodes: ['BA.ORDER', 'LEX.COLLOCATION'],
    examples: [
      ['我/S 把/BA 他 *当作*/V 好/O 朋友 。', 'I treat him as a close friend.'],
      ['很/S 多 人 把/BA 手机 *看作*/V 生活/O 的 一 部分 。', 'Many people see their phone as part of life.'],
      ['你/S 不/ADV 要/MOD 把/BA 失败 *当作*/V 结束/O 。', "Don't treat failure as the end."],
    ],
    instances: [
      ['他/S 把/BA 办公室 *当作*/V 自己/O 的 家 。', 'He treats the office as his home.'],
      ['科学家/S 把/BA 这 个 发现 *看作*/V 很/O 大 的 成就 。', 'Scientists regard this discovery as a great achievement.'],
      ['我/S 把/BA 学习 *当作*/V 一/O 种 爱好 。', 'I treat studying as a hobby.'],
      ['他们/S 把/BA 地球 *看作*/V 一/O 个 系统 。', 'They view the earth as a system.'],
      ['她/S 把/BA 这 次 失误 *当作*/V 一/O 次 经验 。', 'She treats this mistake as a learning experience.'],
      ['很/S 多 人 把/BA 机器人 *看作*/V 朋友/O 。', 'Many people regard robots as friends.'],
      ['不/ADV 要/MOD 把/BA 假设 *当作*/V 结论/O 。', "Don't treat a hypothesis as a conclusion."],
      ['他/S 把/BA 电脑 *当作*/V 最/O 重要 的 东西 。', 'He treats his computer as the most important thing he has.'],
      ['我们/S 把/BA 能源 问题 *看作*/V 最/O 大 的 挑战 。', 'We see energy as the biggest challenge.'],
      ['老师/S 把/BA 学生 *当作*/V 自己/O 的 孩子 。', 'The teacher treats the students like her own children.'],
      ['他/S 把/BA 这 个 模型 *看作*/V 一/O 个 重要 的 成果 。', 'He regards this model as an important result.'],
      ['她/S 把/BA 每 一 次 实验 都 *当作*/V 学习/O 的 机会 。', 'She treats every experiment as a chance to learn.'],
      ['大家/S 把/BA 他 *看作*/V 专家/O 。', 'Everyone regards him as an expert.'],
      ['我/S 把/BA 这 个 软件 *当作*/V 词典/O 用 。', 'I use this software as a dictionary.'],
      ['他们/S 把/BA 太空 *看作*/V 未来/O 。', 'They see space as the future.'],
    ],
    cloze: {
      blank: ['当作', '看作'],
      distractors: [
        ['成为', 'LEX.COLLOCATION', '成为 = become; 把 A 当作 / 看作 B = treat / regard A as B.'],
        ['觉得', 'LEX.COLLOCATION', '觉得 can’t follow 把 …; use 当作 / 看作.'],
      ],
    },
  },
  {
    id: 'G5-27', unit: 29, title: '将 (written 把)', titleZh: '“将”字句',
    summary: '将 + object + verb … works exactly like 把 in formal writing and instructions.',
    explanationMd: `
**Form:** (Subject) + **将** + object + verb + other element.

请将手机关上 — "please switch off your phone".

- Same rules as 把 (G3-57 … G3-64): the verb needs a result, direction or other element.
- Used in notices, instructions, reports and news. (将 can also mean "will" in writing — a different use.)`,
    formula: ['S', 'BA', 'V', 'C'],
    constraints: [BAV],
    requires: ['G3-58', 'G3-59'],
    contrasts: ['G3-57'],
    errorCodes: ['BA.ORDER', 'BA.BARE_VERB', 'BEI.AGENT_ROLE'],
    examples: [
      ['请/MOD *将*/BA 手机 关/V 上/C 。', 'Please switch off your phone.'],
      ['我们/S *将*/BA 数据 发/V 给/C 专家 。', 'We send the data to the experts.'],
      ['科学家/S *将*/BA 卫星 送/V 上/C 了 太空 。', 'The scientists sent the satellite into space.'],
    ],
    instances: [
      ['请/MOD *将*/BA 文件 放/V 在/C 桌子 上 。', 'Please put the documents on the desk.'],
      ['他/S *将*/BA 实验 的 结果 写/V 成/C 了 报告 。', 'He wrote up the results of the experiment as a report.'],
      ['公司/S *将*/BA 这 个 项目 交/V 给/C 了 一 位 工程师 。', 'The company handed this project to an engineer.'],
      ['请/MOD *将*/BA 设备 打开/V 。', 'Please switch on the equipment.'],
      ['他们/S *将*/BA 火箭 送/V 上/C 了 天 。', 'They launched the rocket into the sky.'],
      ['我们/S *将*/BA 这 些 资源 保护/V 起来/C 。', 'We will protect these resources.'],
      ['请/MOD *将*/BA 仪器 放/V 回/C 原来 的 地方 。', 'Please put the instruments back where they were.'],
      ['他/S *将*/BA 数据 统计/V 好/C 了/SF 。', 'He has compiled the data.'],
      ['工程师/S *将*/BA 系统 改进/V 了/ASP 一下/C 。', 'The engineer improved the system a little.'],
      ['请/MOD *将*/BA 结论 写/V 在/C 最后 。', 'Please put the conclusion at the end.'],
      ['我们/S *将*/BA 模型 做/V 好/C 了/SF 。', "We've finished the model."],
      ['他/S *将*/BA 信号 发/V 了/ASP 出去/C 。', 'He sent out the signal.'],
      ['请/MOD *将*/BA 程序 操作/V 一/C 遍 。', 'Please run through the procedure once.'],
      ['科学家/S *将*/BA 金属 分析/V 了/ASP 一下/C 。', 'The scientists analysed the metal.'],
      ['学生/S *将*/BA 观察 的 结果 记/V 下来/C 了/SF 。', 'The students recorded what they observed.'],
    ],
    cloze: {
      blank: ['将'],
      distractors: [
        ['被', 'BEI.AGENT_ROLE', '被 makes the subject the receiver; 将 (= 把) means the subject acts on the object.'],
        ['对', 'LEX.NEAR_SYNONYM', '对 = to, towards.'],
      ],
    },
  },
  {
    id: 'G5-28', unit: 29, title: 'V / Adj + 于 (at, in; than)', titleZh: '“于”：在／比',
    summary: '于 after a verb gives time or place (出生于北京); after an adjective it compares (高于去年).',
    explanationMd: `
**Two common uses (written):**
- **V + 于 + time / place** — 出生于1980年, 毕业于北京大学, 发生于上个世纪.
- **Adj + 于 + B** — "more … than B": 今天的温度高于昨天 = 今天比昨天热.

Unlike 在 / 比, the 于-phrase comes **after** the verb or adjective.`,
    formula: ['S', 'V', 'C'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-37', 'G3-17'],
    contrasts: ['G3-17'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.NEG_COMPARISON'],
    examples: [
      ['他/S 出生/V *于*/C %一九八零 年 。', 'He was born in 1980.'],
      ['今天/S 的 温度 高/V *于*/C 昨天 。', "Today's temperature is higher than yesterday's."],
      ['这/S 件 事情 发生/V *于*/C 上 个 世纪 。', 'This happened in the last century.'],
    ],
    instances: [
      ['这/S 个 数据 低/V *于*/C 去年 。', "This figure is lower than last year's."],
      ['他/S 毕业/V *于*/C 北京 大学 。', 'He graduated from Peking University.'],
      ['这/S 个 工厂 的 规模 大/V *于*/C 那 个 。', 'This factory is larger in scale than that one.'],
      ['这/S 种 金属 重/V *于*/C 水 。', 'This metal is heavier than water.'],
      ['那/S 次 事故 发生/V *于*/C 晚上 。', 'That accident happened at night.'],
      ['这/S 个 软件 适合/V *于*/C 学生 。', 'This software is suitable for students.'],
      ['这/S 位 科学家 出生/V *于*/C 农村 。', 'This scientist was born in the countryside.'],
      ['误差/S 小/V *于*/C 百分之 一 。', 'The margin of error is under one per cent.'],
      ['这/S 个 理论 产生/V *于*/C 上 个 世纪 。', 'This theory arose in the last century.'],
      ['这/S 个 星球 大/V *于*/C 地球 。', 'This planet is bigger than the earth.'],
      ['这/S 种 动物 生活/V *于*/C 森林 中 。', 'This animal lives in forests.'],
      ['他/S 的 成绩 高/V *于*/C 平均 水平 。', 'His results are above average.'],
      ['这/S 个 比例 低/V *于*/C 我们 的 估计 。', 'This proportion is lower than we estimated.'],
      ['这/S 个 发明 出现/V *于*/C %一八七六 年 。', 'This invention appeared in 1876.'],
      ['这/S 个 设备 的 价格 高/V *于*/C 那 个 。', 'This equipment costs more than that one.'],
    ],
    cloze: {
      blank: ['于'],
      distractors: [
        ['比', 'COMP.NEG_COMPARISON', '比 goes before the adjective (A 比 B 高); after it, use 于.'],
        ['从', 'LEX.NEAR_SYNONYM', '从 = from, and goes before the verb.'],
      ],
    },
  },
  {
    id: 'G5-29', unit: 29, title: '由 … 组成 (be made up of)', titleZh: '由…组成',
    summary: 'A 由 B 组成: A consists of B.',
    explanationMd: `
**Form:** Whole + **由** + parts + **组成**.

这个系统由软件和硬件组成 — "this system is made up of software and hardware".

- 由 here introduces the parts (compare 由 for responsibility, G4-38).
- Similar frames: 由…构成 (formal), 由…做成 (made out of).`,
    formula: ['S', 'PP', 'V'],
    constraints: [PPV],
    requires: ['G4-38'],
    contrasts: ['G4-38'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.COLLOCATION'],
    examples: [
      ['这/S 个 队 *由*/PP 五 个 人 *组成*/V 。', 'This team is made up of five people.'],
      ['这/S 个 系统 *由*/PP 软件 和 硬件 *组成*/V 。', 'This system consists of software and hardware.'],
      ['我们/S 班 *由*/PP %二十 个 学生 *组成*/V 。', 'Our class has twenty students.'],
    ],
    instances: [
      ['这/S 个 机器 *由*/PP 很 多 部分 *组成*/V 。', 'This machine is made up of many parts.'],
      ['电脑/S *由*/PP 硬件 和 软件 *组成*/V 。', 'A computer consists of hardware and software.'],
      ['这/S 个 部门 *由*/PP 十 个 工程师 *组成*/V 。', 'This department is made up of ten engineers.'],
      ['宇宙/S *由*/PP 很 多 星球 *组成*/V 。', 'The universe is made up of many celestial bodies.'],
      ['这/S 个 模型 *由*/PP 金属 和 塑料 *组成*/V 。', 'This model is made of metal and plastic.'],
      ['这/S 本 书 *由*/PP %十二 个 部分 *组成*/V 。', 'This book is in twelve parts.'],
      ['我们/S 家 *由*/PP 五 个 人 *组成*/V 。', 'There are five people in our family.'],
      ['这/S 个 仪器 *由*/PP 三 个 部分 *组成*/V 。', 'This instrument has three parts.'],
      ['这/S 个 城市 *由*/PP 两 个 小 城市 *组成*/V 。', 'This city was formed from two smaller ones.'],
      ['这/S 个 词 *由*/PP 两 个 汉字 *组成*/V 。', 'This word is made up of two characters.'],
      ['这/S 个 程序 *由*/PP 很 多 小 程序 *组成*/V 。', 'This program consists of many smaller programs.'],
      ['这/S 个 机构 *由*/PP 很 多 学者 *组成*/V 。', 'This institution is made up of many scholars.'],
      ['这/S 个 句子 *由*/PP 五 个 词 *组成*/V 。', 'This sentence has five words.'],
      ['这/S 个 设备 *由*/PP 电子 部分 和 金属 部分 *组成*/V 。', 'This device has electronic and metal parts.'],
      ['比赛/S 的 队 *由*/PP 学生 和 老师 *组成*/V 。', 'The team is made up of students and teachers.'],
    ],
    cloze: {
      blank: ['组成'],
      distractors: [
        ['成为', 'LEX.COLLOCATION', '成为 = become; "made up of" is 由 … 组成.'],
        ['发生', 'LEX.COLLOCATION', '发生 = happen.'],
      ],
    },
  },
  {
    id: 'G5-30', unit: 29, title: '被 / 为 … 所 + V (formal passive)', titleZh: '被／为…所…',
    summary: '为 / 被 + doer + 所 + verb is a formal passive, common in writing.',
    explanationMd: `
**Form:** Subject + **为 / 被** + doer + **所** + verb.

这个发现为科学家所重视 — "this discovery is valued by scientists".

- 为 is pronounced **wéi** here. The verb is often two syllables and needs no 了 or complement (unlike the plain 被 sentence).
- Typical verbs: 重视, 尊敬, 喜欢, 证明, 吸引, 影响, 了解.`,
    formula: ['S', 'BA', 'V'],
    constraints: [BAV],
    requires: ['G3-65'],
    contrasts: ['G3-65'],
    errorCodes: ['BA.ORDER', 'COMP.DE_WRONG'],
    examples: [
      ['这/S 个 发现 *为*/BA 科学家 *所* 重视/V 。', 'This discovery is valued by scientists.'],
      ['他/S 被/BA 大家 *所* 了解/V 。', 'He is well understood by everyone.'],
      ['这/S 个 理论 *为*/BA 很 多 人 *所* 相信/V 。', 'Many people believe this theory.'],
    ],
    instances: [
      ['他/S 的 成就 *为*/BA 大家 *所* 知道/V 。', 'His achievements are widely known.'],
      ['这/S 种 技术 被/BA 很 多 企业 *所* 用/V 。', 'This technology is used by many companies.'],
      ['这/S 位 学者 *为*/BA 学生 *所* 尊敬/V 。', 'This scholar is respected by his students.'],
      ['这/S 个 问题 被/BA 专家 *所* 重视/V 。', 'This problem is taken seriously by experts.'],
      ['这/S 些 数据 *为*/BA 研究 *所* 需要/V 。', 'This data is needed for the research.'],
      ['他/S 的 理论 被/BA 实验 *所* 证明/V 。', 'His theory was proved by experiment.'],
      ['这/S 个 软件 *为*/BA 年轻人 *所* 喜欢/V 。', 'This software is popular with young people.'],
      ['我们/S 不/ADV 要/MOD 被/BA 困难 *所* 影响/V 。', "We mustn't let difficulties affect us."],
      ['这/S 种 能源 *为*/BA 很 多 国家 *所* 重视/V 。', 'This energy source is valued by many countries.'],
      ['他/S 被/BA 这 个 发现 *所* 吸引/V 。', 'He was drawn to this discovery.'],
      ['那/S 个 实验 *为*/BA 科学家 *所* 熟悉/V 。', 'Scientists are familiar with that experiment.'],
      ['这/S 种 方法 被/BA 大家 *所* 支持/V 。', 'This method has everyone’s support.'],
      ['这/S 位 工程师 *为*/BA 同事 *所* 信任/V 。', 'This engineer is trusted by his colleagues.'],
      ['这/S 个 模型 被/BA 很 多 学者 *所* 研究/V 。', 'This model has been studied by many scholars.'],
      ['这/S 个 结论 *为*/BA 数据 *所* 证明/V 。', 'This conclusion is proved by the data.'],
    ],
    cloze: {
      blank: ['所'],
      distractors: [
        ['的', 'COMP.DE_WRONG', '的 can’t go between the doer and the verb here; the frame is 为 / 被 … 所 + V.'],
        ['地', 'COMP.DE_WRONG', '地 links an adverbial to a verb; it can’t follow the doer.'],
      ],
    },
  },
];
