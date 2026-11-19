import type { PatternSource } from './authoring';

// HSK 4 · Unit 7 (unit 19) · 社会 Society — Formal prepositions & passives (provisional).

const PPV = { kind: 'before', a: 'PP', b: 'V', code: 'ORDER.PLACE_AFTER_VERB' } as const;

export const patternsU19: PatternSource[] = [
  {
    id: 'G4-37', unit: 19, title: '受到 + (… 的) N (receive, be met with)', titleZh: '受到…',
    summary: '受到 + 欢迎 / 影响 / 批评 / 表扬 … says the subject received this treatment.',
    explanationMd: `
**Form:** Subject + **受到**(了) + (someone 的) + abstract noun.

这个节目受到了大家的欢迎 — "this programme was well received by everyone".

- A passive meaning without 被: the subject *receives* 欢迎, 影响, 批评, 表扬, 支持, 重视, 教育, 污染…
- The person giving it comes before 的: 受到了老师的表扬.
- Don't confuse with **收到** (receive a letter, an email — a physical thing).`,
    formula: ['S', 'V', 'O'],
    constraints: [],
    requires: ['G3-65'],
    contrasts: ['G3-65'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'LEX.COLLOCATION'],
    examples: [
      ['这/S 个 节目 *受到*/V 了/ASP 大家/O 的 欢迎 。', 'This programme was well received by everyone.'],
      ['他/S *受到*/V 了/ASP 老师/O 的 表扬 。', 'He was praised by the teacher.'],
      ['城市/S 的 发展 *受到*/V 了/ASP 交通/O 的 影响 。', "The city's development was affected by transport."],
    ],
    instances: [
      ['这/S 个 规定 *受到*/V 了/ASP 很/O 多 人 的 支持 。', 'This rule had a lot of support.'],
      ['志愿者/S *受到*/V 了/ASP 居民/O 的 欢迎 。', 'The volunteers were welcomed by residents.'],
      ['这/S 件 事情 *受到*/V 了/ASP 政府/O 的 重视 。', 'The government took this matter seriously.'],
      ['那/S 个 记者 *受到*/V 了/ASP 批评/O 。', 'That journalist was criticised.'],
      ['孩子/S 很/ADV 容易/ADV *受到*/V 父母/O 的 影响 。', 'Children are easily influenced by their parents.'],
      ['这/S 次 事故 *受到*/V 了/ASP 很/O 多 人 的 注意 。', 'The accident attracted a lot of attention.'],
      ['这/S 本 小说 *受到*/V 了/ASP 年轻人/O 的 喜欢 。', 'This novel is popular with young people.'],
      ['他/S 的 建议 *受到*/V 了/ASP 经理/O 的 重视 。', 'The manager took his suggestion seriously.'],
      ['我们/S 的 生活 *受到*/V 了/ASP 科技/O 的 影响 。', 'Our lives have been shaped by technology.'],
      ['这/S 个 电视台 的 节目 *受到*/V 了/ASP 大家/O 的 喜欢 。', "This TV station's programmes are popular."],
      ['她/S *受到*/V 了/ASP 很/O 多 鼓励 。', 'She received a lot of encouragement.'],
      ['这儿/S 的 环境 *受到*/V 了/ASP 污染/O 。', 'The environment here has been polluted.'],
      ['那/S 个 公司 *受到*/V 了/ASP 很/O 多 批评 。', 'That company has come in for a lot of criticism.'],
      ['这/S 个 报道 *受到*/V 了/ASP 普通/O 居民 的 支持 。', 'This report was backed by ordinary residents.'],
      ['学生/S 应该/MOD *受到*/V 好/O 的 教育 。', 'Students should get a good education.'],
    ],
    cloze: {
      blank: ['受到'],
      distractors: [
        ['收到', 'LEX.NEAR_SYNONYM', '收到 is for physical things (a letter, an email); for welcome, praise or influence use 受到.'],
        ['让', 'LEX.COLLOCATION', '让 needs a person and a verb after it: 让他高兴.'],
      ],
    },
  },
  {
    id: 'G4-38', unit: 19, title: '由 (by — who is responsible)', titleZh: '“由”：负责者',
    summary: 'X 由 Y + V: the task X is done or decided by Y.',
    explanationMd: `
**Form:** Task / thing + **由** + person / organisation + verb.

这件事情由我负责 — "I'm responsible for this".

- 由 introduces **who is in charge** of doing it; the verb is usually 负责, 组织, 举办, 决定, 管理, 安排, 完成…
- It is neutral, not "something bad happened" like many 被 sentences.
- Like other prepositional phrases, 由 + person goes **before the verb**.`,
    formula: ['S', 'PP', 'V', 'O'],
    constraints: [PPV],
    requires: ['G3-66'],
    contrasts: ['G3-65'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'BEI.AGENT_ROLE'],
    examples: [
      ['这/S 件 事情 *由*/PP 我 负责/V 。', "I'm responsible for this."],
      ['会议/S *由*/PP 经理 组织/V 。', 'The meeting is organised by the manager.'],
      ['这/S 个 节目 *由*/PP 电视台 举办/V 。', 'This programme is hosted by the TV station.'],
    ],
    instances: [
      ['这/S 次 活动 *由*/PP 志愿者 组织/V 。', 'This event is organised by volunteers.'],
      ['这/S 个 公园 *由*/PP 政府 管理/V 。', 'This park is run by the government.'],
      ['你们/S 的 工作 *由*/PP 他 安排/V 。', 'He will arrange your work.'],
      ['这/S 篇 报道 *由*/PP 两 位 记者 完成/V 。', 'This report was written by two journalists.'],
      ['比赛/S *由*/PP 我们 学校 举行/V 。', 'The competition is held by our school.'],
      ['这/S 个 规定 *由*/PP 大家 一起 决定/V 。', 'This rule is decided by everyone together.'],
      ['房租/S *由*/PP 公司 提供/V 。', 'The rent is covered by the company.'],
      ['这/S 个 任务 *由*/PP 你 完成/V 。', 'You will complete this task.'],
      ['孩子/S *由*/PP 奶奶 照顾/V 。', 'The children are looked after by Grandma.'],
      ['晚饭/S *由*/PP 爸爸 做/V 。', 'Dinner is cooked by Dad.'],
      ['这/S 个 调查 *由*/PP 大学 的 教授 负责/V 。', 'The survey is led by a university professor.'],
      ['大家/S 的 问题 *由*/PP 经理 回答/V 。', "The manager will answer everyone's questions."],
      ['新闻/S *由*/PP 他 报道/V 。', 'He reports the news.'],
      ['这/S 个 城市 的 交通 *由*/PP 警察 管理/V 。', "The city's traffic is managed by the police."],
      ['每/S 个 人 的 工资 *由*/PP 公司 决定/V 。', "Everyone's salary is set by the company."],
    ],
    cloze: {
      blank: ['由'],
      distractors: [
        ['被', 'BEI.AGENT_ROLE', '被 says something was done TO the subject and needs a result; who is in charge of a task is 由.'],
        ['对', 'LEX.NEAR_SYNONYM', '对 means "to / towards".'],
      ],
    },
  },
  {
    id: 'G4-39', unit: 19, title: '被 … 给 V / 给 V (spoken passive)', titleZh: '被…给… / 给（被动）',
    summary: 'In speech, 给 can be added before the verb in a 被 sentence, or replace 被 altogether.',
    explanationMd: `
**Forms:**
- Subject + **被** + doer + **给** + V + result: 我的钱包被小偷给偷走了。
- Subject + **给** + doer + V + result: 杯子给弟弟打破了。

给 adds a spoken, often complaining tone. All the 被 rules still apply: the verb needs a result (走, 坏, 了…), and 没 / 又 / 已经 go before 被 / 给.`,
    formula: ['S', 'BA', 'V', 'C', 'SF'],
    constraints: [{ kind: 'before', a: 'BA', b: 'V', code: 'BA.ORDER' }],
    requires: ['G3-65', 'G3-67'],
    contrasts: ['G3-67'],
    errorCodes: ['BA.ORDER', 'BEI.MISSING_OTHER', 'BEI.AGENT_ROLE'],
    examples: [
      ['我/S 的 钱包 被/BA 小偷 *给* 偷/V 走/C 了/SF 。', 'My wallet got nicked by a thief.'],
      ['杯子/S *给*/BA 弟弟 打破/V 了/SF 。', 'The cup got broken by my little brother.'],
      ['我/S 的 密码 被/BA 人 *给* 改/V 了/SF 。', 'Someone changed my password.'],
    ],
    instances: [
      ['他/S 的 自行车 被/BA 人 *给* 骑/V 走/C 了/SF 。', 'Somebody rode off on his bike.'],
      ['我/S 的 手机 *给*/BA 弟弟 弄/V 坏/C 了/SF 。', 'My phone got broken by my brother.'],
      ['那/S 个 小偷 被/BA 警察 *给* 抓/V 住/C 了/SF 。', 'That thief got caught by the police.'],
      ['蛋糕/S 被/BA 孩子 *给* 吃/V 光/C 了/SF 。', 'The kids polished off the cake.'],
      ['我/S 的 短信 被/BA 妈妈 *给* 看/V 到/C 了/SF 。', 'Mum saw my text message.'],
      ['衣服/S *给*/BA 雨 弄/V 湿/C 了/SF 。', 'The clothes got soaked by the rain.'],
      ['门/S 被/BA 风 *给* 吹/V 开/C 了/SF 。', 'The door was blown open by the wind.'],
      ['我/S 的 计划 被/BA 他 *给* 改变/V 了/SF 。', 'He went and changed my plan.'],
      ['电脑/S *给*/BA 我 弄/V 坏/C 了/SF 。', 'I went and broke the computer.'],
      ['他/S 被/BA 车 *给* 撞/V 了/SF 。', 'He got hit by a car.'],
      ['我/S 的 位置 被/BA 别人 *给* 坐/V 了/SF 。', 'Someone took my seat.'],
      ['书/S 被/BA 同学 *给* 借/V 走/C 了/SF 。', 'A classmate went off with the book.'],
      ['那/S 个 消息 被/BA 记者 *给* 报道/V 出来/C 了/SF 。', 'The news was broken by a journalist.'],
      ['我/S 的 帽子 *给*/BA 风 刮/V 走/C 了/SF 。', 'My hat got blown away.'],
      ['他/S 被/BA 老板 *给* 批评/V 了/SF 。', 'He got told off by the boss.'],
    ],
    decoys: [['把', 'BEI.AGENT_ROLE', '把 would make the subject the doer; here the subject is affected.']],
  },
  {
    id: 'G4-40', unit: 19, title: '对于 (regarding) / 至于 (as for)', titleZh: '“对于”和“至于”',
    summary: '对于 X introduces the topic being dealt with; 至于 X switches to a new, related point.',
    explanationMd: `
- **对于** + topic，comment — "regarding / with respect to": 对于这个问题，大家的看法不一样。 More formal than 对 (which can usually replace it).
- **至于** + new topic，comment — "as for …": 我去，至于他去不去，我不知道。 It always comes **after** a first point and turns to another one.

Both go at the start of their clause, followed by a comma.`,
    formula: ['PP', 'P', 'S', 'V', 'O'],
    constraints: [],
    requires: ['G3-87', 'G3-88'],
    contrasts: ['G3-88'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*对于*/PP 这 个 问题 ， 大家/S 的 看法 不/ADV 一样/V 。', 'People see this question differently.'],
      ['*对于*/PP 年轻人 来说 ， 机会/S 很/ADV 多/V 。', 'For young people, there are lots of opportunities.'],
      ['我/S 去/V ， *至于*/PP 他 去 不 去 ， 我/S 不/ADV 知道/V 。', "I'm going; as for whether he is, I don't know."],
    ],
    instances: [
      ['*对于*/PP 这 个 规定 ， 居民/S 有/V 很/O 多 意见 。', 'Residents have a lot to say about this rule.'],
      ['*对于*/PP 交通 问题 ， 政府/S 很/ADV 重视/V 。', 'The government takes the traffic problem seriously.'],
      ['这/S 个 计划 不错/V ， *至于*/PP 钱 的 问题 ， 我们/S 以后/T 再/ADV 讨论/V 。', "The plan's good; as for money, we'll discuss it later."],
      ['*对于*/PP 这 次 事故 ， 记者/S 做/V 了/ASP 报道/O 。', 'Journalists reported on the accident.'],
      ['*对于*/PP 学生 来说 ， 教育/S 最/ADV 重要/V 。', 'For students, education matters most.'],
      ['我/S 只@zhi3/ADV 负责/V 招聘/O ， *至于*/PP 工资 ， 你/S 要/MOD 问/V 经理/O 。', "I only handle recruitment — as for pay, ask the manager."],
      ['*对于*/PP 老人 ， 我们/S 应该/MOD 多/ADV 关心/V 。', 'We should look out for the elderly.'],
      ['*对于*/PP 这 个 现象 ， 大家/S 都/ADV 很/ADV 吃惊/V 。', 'Everyone was surprised by this phenomenon.'],
      ['比赛/S 在/V 星期/O 六 ， *至于*/PP 地点 ， 我们/S 明天/T 通知/V 你/O 。', "The match is on Saturday; as for the venue, we'll let you know tomorrow."],
      ['*对于*/PP 法律 ， 每/S 个 人 都/ADV 要/MOD 遵守/V 。', 'Everyone must obey the law.'],
      ['*对于*/PP 他 的 建议 ， 经理/S 表示/V 同意/O 。', 'The manager agreed to his suggestion.'],
      ['我/S 想/MOD 学/V 汉语/O ， *至于*/PP 学 多 久 ， 我/S 还/ADV 没/ADV 想/V 好/C 。', "I want to learn Chinese; as for how long, I haven't decided."],
      ['*对于*/PP 这 些 数字 ， 我/S 不/ADV 太/ADV 相信/V 。', "I don't really trust these figures."],
      ['*对于*/PP 公共 的 东西 ， 大家/S 都/ADV 要/MOD 保护/V 。', 'We should all look after public property.'],
      ['旅行/TOP 我/S 很/ADV 想/MOD 去/V ， *至于*/PP 去 哪儿 ， 你/S 决定/V 吧/SF 。', "I'd love to travel; as for where, you decide."],
    ],
  },
  {
    id: 'G4-41', unit: 19, title: '根据 / 按照 (according to, following)', titleZh: '“根据”和“按照”',
    summary: '根据 X = based on X (a source or basis); 按照 X = following X (a rule, plan or instruction).',
    explanationMd: `
- **根据** + source / basis: 根据调查, 根据新闻报道, 根据他的经验 — the conclusion is *based on* it.
- **按照** + rule / plan / instruction: 按照规定, 按照计划, 按照老师说的 — the action *follows* it.

Both come before the verb (or at the start of the sentence with a comma). They often overlap; use 根据 for information, 按照 for instructions.`,
    formula: ['PP', 'P', 'S', 'V'],
    constraints: [PPV],
    requires: ['G3-88'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*根据*/PP 调查 ， 年轻人/S 每/T 天 都 上网/V 。', 'According to the survey, young people go online every day.'],
      ['请/MOD 大家/S *按照*/PP 规定 排队/V 。', 'Everyone please queue as the rules say.'],
      ['*根据*/PP 天气 情况 ， 比赛/S 推迟/V 了/SF 。', 'Because of the weather situation, the match was postponed.'],
    ],
    instances: [
      ['*按照*/PP 计划 ， 我们/S 明天/T 出发/V 。', 'According to plan, we leave tomorrow.'],
      ['*根据*/PP 新闻 报道 ， 城市/S 的 人口 增长/V 了/SF 。', 'According to news reports, the city’s population has grown.'],
      ['你/S 要/MOD *按照*/PP 老师 说 的 做/V 。', 'Do as the teacher says.'],
      ['*根据*/PP 法律 ， 这儿/S 禁止/V 抽烟/O 。', 'By law, smoking is banned here.'],
      ['我们/S *根据*/PP 大家 的 意见 改/V 了/ASP 计划/O 。', 'We changed the plan based on everyone’s views.'],
      ['*按照*/PP 中国 的 习惯 ， 春节/T 要/MOD 吃/V 饺子/O 。', 'By Chinese custom, you eat dumplings at Spring Festival.'],
      ['*根据*/PP 这 些 数字 ， 我们/S 可以/MOD 看/V 出来/C 很/O 多 问题 。', 'From these figures we can spot many problems.'],
      ['请/MOD *按照*/PP 时间 到/V 这儿/O 。', 'Please arrive here on time.'],
      ['*根据*/PP 规定 ， 学生/S 不/ADV 能/MOD 在/PP 教室 里 吃/V 东西/O 。', "Under the rules, students can't eat in the classroom."],
      ['他/S *按照*/PP 地图 找/V 到/C 了/ASP 酒店/O 。', 'He found the hotel by following the map.'],
      ['*根据*/PP 调查 ， 居民/S 对/PP 公园 很/ADV 满意/V 。', 'According to the survey, residents are happy with the park.'],
      ['我们/S *按照*/PP 要求 完成/V 了/ASP 任务/O 。', 'We completed the task as required.'],
      ['*根据*/PP 他 的 经验 ， 这/S 种 现象 很/ADV 普遍/V 。', 'In his experience, this is very common.'],
      ['你/S 可以/MOD *根据*/PP 自己 的 情况 选择/V 。', 'You can choose according to your own situation.'],
      ['*按照*/PP 通知 ， 会议/S 下午/T 三 点 开始/V 。', 'According to the notice, the meeting starts at three.'],
    ],
    cloze: {
      blank: ['根据', '按照'],
      distractors: [
        ['关于', 'LEX.NEAR_SYNONYM', '关于 means "about (a topic)"; "according to / following" is 根据 / 按照.'],
        ['对', 'LEX.NEAR_SYNONYM', '对 means "to / towards".'],
      ],
    },
  },
  {
    id: 'G4-42', unit: 19, title: '作为 (as, in the role of)', titleZh: '作为',
    summary: '作为 + role says in what capacity someone acts or is judged.',
    explanationMd: `
**Form:** **作为** + role，Subject + V … · or Subject + **作为** + role + V.

作为学生，你应该认真学习 — "as a student, you should study hard".

- The role is a noun: 学生, 父母, 记者, 代表, 朋友, 志愿者…
- It often introduces a duty: 作为 X，(你)应该 / 要 / 必须 …
- Compare **因为** (a reason) — 作为 names a role, not a cause.`,
    formula: ['PP', 'P', 'S', 'V', 'O'],
    constraints: [PPV],
    requires: ['G3-87'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*作为*/PP 学生 ， 你/S 应该/MOD 认真/ADV 学习/V 。', 'As a student, you should study hard.'],
      ['*作为*/PP 一 个 记者 ， 他/S 每/T 天 都 要 写/V 报道/O 。', 'As a journalist, he has to write reports every day.'],
      ['我/S *作为*/PP 志愿者 参加/V 了/ASP 这/O 次 活动 。', 'I took part in this event as a volunteer.'],
    ],
    instances: [
      ['*作为*/PP 父母 ， 我们/S 要/MOD 关心/V 孩子/O 。', 'As parents, we must look after our children.'],
      ['*作为*/PP 居民 ， 我们/S 应该/MOD 遵守/V 规定/O 。', 'As residents, we should follow the rules.'],
      ['她/S *作为*/PP 代表 参加/V 了/ASP 会议/O 。', 'She attended the meeting as a representative.'],
      ['*作为*/PP 经理 ， 他/S 要/MOD 负责/V 很/O 多 事情 。', 'As manager, he is responsible for many things.'],
      ['*作为*/PP 朋友 ， 我/S 一定/ADV 会/MOD 支持/V 你/O 。', "As your friend, I'll definitely support you."],
      ['这/TOP 张 照片 我/S *作为*/PP 礼物 送/V 给/C 你 。', "I'm giving you this photo as a present."],
      ['*作为*/PP 一 个 普通 人 ， 我/S 也/ADV 想/MOD 帮助/V 别人/O 。', 'As an ordinary person, I want to help others too.'],
      ['*作为*/PP 中国 人 ， 他/S 很/ADV 了解/V 中国/O 文化 。', 'As a Chinese person, he knows Chinese culture well.'],
      ['*作为*/PP 老师 ， 她/S 很/ADV 有/V 耐心/O 。', 'As a teacher, she is very patient.'],
      ['我/S *作为*/PP 游客 来/V 过/ASP 这儿/O 。', "I've been here before as a tourist."],
      ['*作为*/PP 年轻人 ， 我们/S 要/MOD 积极/ADV 参加/V 社会/O 活动 。', 'As young people, we should take an active part in society.'],
      ['*作为*/PP 司机 ， 你/S 必须/MOD 注意/V 安全/O 。', 'As a driver, you must pay attention to safety.'],
      ['*作为*/PP 一 个 好 记者 ， 报道/S 必须/MOD 真实/V 。', "A good journalist's reports must be true."],
      ['*作为*/PP 第一 次 来 的 人 ， 我/S 觉得/V 这儿/O 很 漂亮 。', "As a first-time visitor, I think it's beautiful here."],
      ['*作为*/PP 政府 ， 应该/MOD 重视/V 人口/O 问题 。', 'The government ought to take the population issue seriously.'],
    ],
    cloze: {
      blank: ['作为'],
      distractors: [
        ['因为', 'LEX.NEAR_SYNONYM', '因为 gives a reason; 作为 + role = "as (a …)".'],
        ['关于', 'LEX.NEAR_SYNONYM', '关于 means "about (a topic)".'],
      ],
    },
  },
];
