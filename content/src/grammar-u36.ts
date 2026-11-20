import type { PatternSource } from './authoring';

// HSK 5 · Unit 12 (unit 36) · 社会未来 Society — Discourse connectives (provisional).

const ADV_POS = { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' } as const;

export const patternsU36: PatternSource[] = [
  {
    id: 'G5-67', unit: 36, title: '尽管如此 (even so, nevertheless)', titleZh: '尽管如此',
    summary: 'Accepts what was just said, then continues in spite of it.',
    explanationMd: `
**Form:** A。/，**尽管如此**，B (还是 / 也 …).

工作很累，尽管如此，他还是很开心 — "the work is tiring; even so, he's happy".

- 如此 = 这样: "even though it is so".
- A one-word version of 尽管…还是 (G4-10) that links two sentences.`,
    formula: ['S', 'V', 'P', 'CONJ2', 'P', 'S', 'ADV', 'V'],
    constraints: [],
    requires: ['G4-10'],
    contrasts: ['G4-10', 'G5-68'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['工作/S 很/ADV 累/V ， *尽管如此*/CONJ2 ， 他/S 还是/ADV 很/ADV 开心/V 。', "The work is tiring; even so, he's happy."],
      ['困难/S 很/ADV 多/V ， *尽管如此*/CONJ2 ， 我们/S 还是/ADV 有/V 信心/O 。', "There are many difficulties; even so, we're confident."],
      ['这/S 个 政策 有/V 很/O 多 问题 ， *尽管如此*/CONJ2 ， 大家/S 还是/ADV 支持/V 。', 'The policy has many problems; nevertheless, people support it.'],
    ],
    instances: [
      ['改革/S 很/ADV 难/V ， *尽管如此*/CONJ2 ， 我们/S 还是/ADV 要/MOD 坚持/V 。', 'Reform is hard; even so, we must keep going.'],
      ['差距/S 还/ADV 很/ADV 大/V ， *尽管如此*/CONJ2 ， 生活/S 已经/ADV 好/V 多/C 了 。', 'The gap is still big; even so, life is much better.'],
      ['他/S 失败/V 了/ASP 很/C 多 次 ， *尽管如此*/CONJ2 ， 他/S 没有/ADV 放弃/V 。', "He failed many times; even so, he didn't give up."],
      ['前景/S 不/ADV 清楚/V ， *尽管如此*/CONJ2 ， 大家/S 还是/ADV 有/V 信心/O 。', 'The prospects are unclear; even so, everyone is confident.'],
      ['现代化/S 带 来 了 很 多 问题 ， *尽管如此*/CONJ2 ， 它/S 也/ADV 让/V 生活/O 更 方便 。', 'Modernisation has brought problems; even so, it has made life easier.'],
      ['就业/S 很/ADV 难/V ， *尽管如此*/CONJ2 ， 他/S 还是/ADV 找/V 到/C 了/ASP 工作/O 。', 'Jobs are hard to find; even so, he found one.'],
      ['代价/S 很/ADV 大/V ， *尽管如此*/CONJ2 ， 我们/S 还是/ADV 要/MOD 做/V 。', 'The cost is high; even so, we must do it.'],
      ['虚拟/S 世界 很 有意思 ， *尽管如此*/CONJ2 ， 我们/S 还是/ADV 要/MOD 面对/V 现实/O 。', 'The virtual world is fun; even so, we must face reality.'],
      ['城市化/S 很/ADV 快/V ， *尽管如此*/CONJ2 ， 农村/S 还是/ADV 很/ADV 重要/V 。', 'Urbanisation is fast; even so, the countryside still matters.'],
      ['他/S 很/ADV 忙/V ， *尽管如此*/CONJ2 ， 他/S 每/T 个 周末 都 去/V 慈善/O 机构 帮忙 。', "He's very busy; even so, he helps at a charity every weekend."],
      ['天气/S 很/ADV 冷/V ， *尽管如此*/CONJ2 ， 很/S 多 人 还是/ADV 来/V 捐款/V 。', 'It was cold; even so, many people came to donate.'],
      ['这/S 个 政策 有/V 缺点/O ， *尽管如此*/CONJ2 ， 它/S 还是/ADV 有/V 很/O 多 好处 。', 'The policy has flaws; even so, it has many benefits.'],
      ['以后/S 的 事情 是/V 未知/O 的 ， *尽管如此*/CONJ2 ， 我们/S 还是/ADV 要/MOD 去/V 探索/V 。', 'The future is unknown; even so, we must explore it.'],
      ['冲突/S 很/ADV 多/V ， *尽管如此*/CONJ2 ， 社会/S 还是/ADV 很/ADV 稳定/V 。', 'There are many conflicts; even so, society is stable.'],
      ['房价/S 很/ADV 高/V ， *尽管如此*/CONJ2 ， 很/S 多 年轻 人 还是/ADV 想/MOD 留/V 在/C 城市/O 。', 'Housing is expensive; even so, many young people want to stay in the city.'],
    ],
    cloze: {
      blank: ['尽管如此'],
      distractors: [
        ['因此', 'LEX.NEAR_SYNONYM', '因此 = therefore; the second part goes against the first → 尽管如此.'],
        ['所以', 'LEX.NEAR_SYNONYM', '所以 gives a result, not a concession.'],
      ],
    },
  },
  {
    id: 'G5-68', unit: 36, title: '相反 (on the contrary)', titleZh: '相反',
    summary: 'After a negative statement, 相反 introduces the opposite that is true.',
    explanationMd: `
**Form:** 不 / 没有 A，**相反**，B.

他没有生气，相反，他很高兴 — "he wasn't angry; on the contrary, he was pleased".

- The first clause usually denies something; 相反 brings the real situation.
- As an adjective: 意见相反 (opposite opinions).`,
    formula: ['S', 'ADV', 'V', 'P', 'CONJ2', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G4-59'],
    contrasts: ['G4-59', 'G5-67'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S 没有/ADV 生气/V ， *相反*/CONJ2 ， 他/S 很/ADV 高兴/V 。', "He wasn't angry; on the contrary, he was pleased."],
      ['困难/S 没有/ADV 让/V 他/O 放弃 ， *相反*/CONJ2 ， 他/S 更/ADV 努力/V 了/SF 。', "Difficulties didn't make him give up; on the contrary, he worked harder."],
      ['机器/S 没有/ADV 减少/V 工作/O ， *相反*/CONJ2 ， 工作/S 更/ADV 多/V 了/SF 。', "Machines haven't reduced work; on the contrary, there's more of it."],
    ],
    instances: [
      ['价格/S 没有/ADV 降低/V ， *相反*/CONJ2 ， 更/ADV 贵/V 了/SF 。', "Prices haven't fallen; on the contrary, they've gone up."],
      ['老龄化/S 不/ADV 是/V 坏/O 事情 ， *相反*/CONJ2 ， 它/S 也/ADV 带/V 来/C 了 新 的 机会/O 。', 'Ageing is not just bad; on the contrary, it brings new opportunities.'],
      ['他/S 没有/ADV 失去/V 信心/O ， *相反*/CONJ2 ， 他/S 更/ADV 有/V 信心/O 了 。', "He didn't lose confidence; on the contrary, he gained more."],
      ['这/S 个 政策 没有/ADV 让/V 差距/O 变 小 ， *相反*/CONJ2 ， 差距/S 更/ADV 大/V 了/SF 。', "The policy didn't narrow the gap; on the contrary, it widened."],
      ['全球化/S 没有/ADV 让/V 文化/O 变 少 ， *相反*/CONJ2 ， 交往/S 更/ADV 多/V 了/SF 。', "Globalisation hasn't reduced culture; on the contrary, contact has grown."],
      ['休息/S 不/ADV 是/V 浪费/O 时间 ， *相反*/CONJ2 ， 它/S 能/MOD 让/V 你/O 更 快乐 。', "Rest isn't a waste of time; on the contrary, it makes you happier."],
      ['他/S 不/ADV 怕/V 困难/O ， *相反*/CONJ2 ， 他/S 喜欢/V 探索/V 未知/O 的 东西 。', "He isn't afraid of difficulty; on the contrary, he likes exploring the unknown."],
      ['城市/S 没有/ADV 变/V 得/C 更 拥挤 ， *相反*/CONJ2 ， 交通/S 更/ADV 方便/V 了/SF 。', "The city hasn't got more crowded; on the contrary, transport is easier."],
      ['捐款/S 没有/ADV 减少/V ， *相反*/CONJ2 ， 比/PP 去年 多/V 了/ASP 很/C 多 。', "Donations haven't fallen; on the contrary, they're well up on last year."],
      ['虚拟/S 世界 不/ADV 是/V 现实/O ， *相反*/CONJ2 ， 我们/S 更/ADV 需要/V 面对/V 现实/O 。', "The virtual world isn't reality; on the contrary, we need to face reality more."],
      ['他/S 没有/ADV 离开/V 家乡/O ， *相反*/CONJ2 ， 他/S 回/V 去/C 帮助/V 了/ASP 很/O 多 人 。', "He didn't leave his home town; on the contrary, he went back and helped many people."],
      ['改革/S 没有/ADV 让/V 社会/O 不 稳定 ， *相反*/CONJ2 ， 社会/S 更/ADV 和谐/V 了/SF 。', "Reform didn't destabilise society; on the contrary, it's more harmonious."],
      ['老/S 人 没有/ADV 被/BA 忘记/V ， *相反*/CONJ2 ， 社会/S 更/ADV 关爱/V 他们/O 了 。', "Old people haven't been forgotten; on the contrary, society cares for them more."],
      ['我/S 不/ADV 反对/V ， *相反*/CONJ2 ， 我/S 很/ADV 支持/V 。', "I'm not against it; on the contrary, I fully support it."],
      ['数字化/S 没有/ADV 让/V 生活/O 更 难 ， *相反*/CONJ2 ， 生活/S 更/ADV 方便/V 了/SF 。', "Digitalisation hasn't made life harder; on the contrary, it's easier."],
    ],
    cloze: {
      blank: ['相反'],
      distractors: [
        ['而且', 'LEX.NEAR_SYNONYM', '而且 adds in the same direction; after a denial, the opposite truth takes 相反.'],
        ['况且', 'LEX.NEAR_SYNONYM', '况且 adds another reason.'],
      ],
    },
  },
  {
    id: 'G5-69', unit: 36, title: '再说 (besides, what\'s more)', titleZh: '再说',
    summary: 'Spoken 再说 adds one more reason to support what you just said.',
    explanationMd: `
**Form:** reason 1，**再说** + reason 2.

时间太晚了，再说我也很累 — "it's too late, and besides, I'm tired".

- Spoken partner of 况且 (G5-36).
- As a verb phrase, 以后再说 = "we'll see later".`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'ADV', 'V'],
    constraints: [],
    requires: ['G5-36'],
    contrasts: ['G5-36', 'G4-70'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['时间/S 太/ADV 晚/V 了/SF ， *再说*/CONJ2 我/S 也/ADV 很/ADV 累/V 。', "It's too late, and besides, I'm tired."],
      ['我/S 不/ADV 想/MOD 去/V ， *再说*/CONJ2 外面/S 还/ADV 下/V 雨/O 。', "I don't want to go — besides, it's raining."],
      ['这/S 个 房子 太/ADV 贵/V 了/SF ， *再说*/CONJ2 离/PP 公司 也/ADV 很/ADV 远/V 。', "This flat is too expensive, and it's far from work too."],
    ],
    instances: [
      ['我/S 不/ADV 买/V 了/SF ， *再说*/CONJ2 我/S 也/ADV 没有/V 钱/O 。', "I won't buy it — besides, I have no money."],
      ['你/S 别/ADV 担心/V ， *再说*/CONJ2 他/S 已经/ADV 长大/V 了/SF 。', "Don't worry — besides, he's grown up now."],
      ['这/S 个 工作 很/ADV 稳定/V ， *再说*/CONJ2 福利/S 也/ADV 很/ADV 好/V 。', 'The job is stable, and the benefits are good too.'],
      ['捐款/S 不/ADV 难/V ， *再说*/CONJ2 这/S 是/V 帮助/V 别人/O 。', "Donating isn't hard — and it helps others."],
      ['我们/S 打车/V 吧/SF ， *再说*/CONJ2 也/ADV 不/ADV 贵/V 。', "Let's take a taxi — it's not expensive anyway."],
      ['他/S 不/ADV 会/MOD 来/V 了/SF ， *再说*/CONJ2 他/S 也/ADV 不/ADV 知道/V 地址/O 。', "He won't come — besides, he doesn't know the address."],
      ['我们/S 要/MOD 看/V 长远/O ， *再说*/CONJ2 短期/S 的 利润 不/ADV 重要/V 。', "We need to take the long view; besides, short-term profit doesn't matter."],
      ['你/S 去/V 吧/SF ， *再说*/CONJ2 你/S 已经/ADV 承诺/V 了/SF 。', "Go on — besides, you promised."],
      ['我/S 不/ADV 想/MOD 搬/V 家/O ， *再说*/CONJ2 这儿/S 的 邻居 都/ADV 很/ADV 好/V 。', "I don't want to move — besides, the neighbours here are lovely."],
      ['先/ADV 休息/V 一下/C 吧/SF ， *再说*/CONJ2 时间/S 还/ADV 早/V 。', "Have a rest first — it's still early anyway."],
      ['这/S 件 衣服 不/ADV 好看/V ， *再说*/CONJ2 也/ADV 太/ADV 贵/V 了/SF 。', "This isn't nice, and it's too expensive besides."],
      ['他/S 应该/MOD 帮/V 你/O ， *再说*/CONJ2 你们/S 是/V 朋友/O 。', "He should help you — you're friends, after all."],
      ['养老/S 很/ADV 重要/V ， *再说*/CONJ2 每/S 个 人 都 会 老/V 。', 'Elderly care matters — besides, everyone gets old.'],
      ['我/S 不/ADV 用/V 虚拟/O 的 东西 ， *再说*/CONJ2 我/S 也/ADV 不/ADV 太/ADV 懂/V 。', "I don't use virtual stuff — besides, I don't really understand it."],
      ['别/ADV 吵架/V 了/SF ， *再说*/CONJ2 吵架/S 也/ADV 没有/V 用/O 。', "Stop arguing — it doesn't help anyway."],
    ],
    cloze: {
      blank: ['再说'],
      distractors: [
        ['所以', 'LEX.NEAR_SYNONYM', '所以 gives a result; adding another reason is 再说.'],
        ['然后', 'LEX.NEAR_SYNONYM', '然后 = and then (time order).'],
      ],
    },
  },
  {
    id: 'G5-70', unit: 36, title: '反正 (anyway, in any case)', titleZh: '反正',
    summary: '反正 = whatever happens, the situation stays the same.',
    explanationMd: `
**Form:** **反正** + fact that does not change (，so …).

你别着急，反正时间还早 — "don't rush — it's early anyway".

- Often after 不管 / 无论 (G4-08): 不管你怎么说，反正我不同意.
- Can go before or after the subject.`,
    formula: ['ADV', 'S', 'ADV', 'V'],
    constraints: [],
    requires: ['G4-08'],
    contrasts: ['G4-08'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['你/S 别/ADV 着急/V ， *反正*/ADV 时间/S 还/ADV 早/V 。', "Don't rush — it's early anyway."],
      ['你/S 去 不 去 都 可以 ， *反正*/ADV 我/S 要/MOD 去/V 。', "Come or not, as you like — I'm going anyway."],
      ['*反正*/ADV 也/ADV 晚/V 了/SF ， 我们/S 慢慢@man=màn_màn/ADV 走/V 吧/SF 。', "We're too late anyway, so let's take our time."],
    ],
    instances: [
      ['不管/CONJ1 你 怎么 说 ， *反正*/ADV 我/S 不/ADV 同意/V 。', "Whatever you say, I don't agree."],
      ['*反正*/ADV 是/V 周末/O ， 我们/S 去/V 玩/V 吧/SF 。', "It's the weekend anyway — let's go out."],
      ['你/S 拿/V 走/C 吧/SF ， *反正*/ADV 我/S 不/ADV 用/V 。', "Take it — I don't use it anyway."],
      ['*反正*/ADV 下/V 雨/O 了 ， 我们/S 就/ADV 在/PP 家 看/V 电影/O 吧/SF 。', "It's raining anyway, so let's watch a film at home."],
      ['你/S 慢慢@man=màn_màn/ADV 做/V ， *反正*/ADV 不/ADV 着急/V 。', "Take your time — there's no hurry anyway."],
      ['他/S 来 不 来 都 一样 ， *反正*/ADV 我们/S 已经/ADV 决定/V 了/SF 。', "It makes no difference if he comes — we've already decided."],
      ['*反正*/ADV 你/S 也/ADV 没有/V 事情/O ， 帮/V 我/O 一下 吧 。', "You've got nothing on anyway — give me a hand."],
      ['*反正*/ADV 要/MOD 面对/V ， 不如/ADV 早/ADV 一点儿 面对/V 。', "You'll have to face it anyway, so better face it sooner."],
      ['他/S 说/V 什么/O 都 可以 ， *反正*/ADV 我/S 不/ADV 相信/V 。', "He can say what he likes — I don't believe him anyway."],
      ['*反正*/ADV 现在/T 不/ADV 忙/V ， 我/S 跟/PP 你 一起 去/V 吧/SF 。', "I'm not busy anyway — I'll come with you."],
      ['你/S 想/MOD 怎么 做 就 怎么 做 ， *反正*/ADV 后果/S 是/V 你/O 的 。', "Do as you like — the consequences are yours anyway."],
      ['*反正*/ADV 是/V 免费/O 的 ， 你/S 试/V 一下/C 吧/SF 。', "It's free anyway — give it a try."],
      ['*反正*/ADV 我/S 有/V 时间/O ， 我/S 送/V 你/O 回 家 。', "I've got time anyway — I'll take you home."],
      ['我/S 不/ADV 去/V 了/SF ， *反正*/ADV 也/ADV 赶/V 不/C 上 了 。', "I'm not going — I won't make it anyway."],
      ['别/ADV 想/V 了/SF ， *反正*/ADV 以后/T 会/MOD 好/V 的/SF 。', "Stop worrying — it'll be fine in the end anyway."],
    ],
    cloze: {
      blank: ['反正'],
      distractors: [
        ['相反', 'LEX.NEAR_SYNONYM', '相反 = on the contrary.'],
        ['果然', 'LEX.NEAR_SYNONYM', '果然 = as expected.'],
      ],
    },
  },
  {
    id: 'G5-71', unit: 36, title: '至今 (to this day, so far)', titleZh: '至今',
    summary: '至今 = up to now; often with 还 / 仍 + (没有).',
    explanationMd: `
**Form:** Subject + **至今** + (还 / 已经) + verb phrase.

这个问题至今还没有解决 — "this problem still hasn't been solved".

- More formal than 到现在.
- 至今已经 + duration: 至今已经有很多年的历史.`,
    formula: ['S', 'ADV', 'ADV', 'V'],
    constraints: [ADV_POS],
    requires: ['G3-11'],
    contrasts: ['G4-06'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['这/S 个 问题 *至今*/ADV 还/ADV 没有/ADV 解决/V 。', "This problem still hasn't been solved."],
      ['那/S 次 旅行 我/S *至今*/ADV 还/ADV 记得/V 。', 'I still remember that trip.'],
      ['这/S 种 观念 *至今*/ADV 还/ADV 影响/V 着/ASP 很/O 多 人 。', 'This idea still influences many people today.'],
    ],
    instances: [
      ['他/S 的 思想 *至今*/ADV 还/ADV 很/ADV 有/V 影响/O 。', 'His ideas are still influential today.'],
      ['这/S 个 传统 *至今*/ADV 没有/ADV 改变/V 。', 'This tradition has not changed to this day.'],
      ['我/S *至今*/ADV 还/ADV 没有/ADV 收/V 到/C 他/O 的 信 。', "I still haven't received his letter."],
      ['这/S 个 城市 *至今*/ADV 已经/ADV 有/V 很/O 多 年 的 历史 。', 'This city has a long history.'],
      ['他/S 的 承诺 *至今*/ADV 还/ADV 没有/ADV 实现/V 。', 'His promise has still not been kept.'],
      ['这/S 个 可能性 *至今*/ADV 还/ADV 没有/ADV 被/BA 证明/V 。', 'This possibility has not been proven so far.'],
      ['人类/S *至今*/ADV 还/ADV 没有/ADV 去/V 过/ASP 别/O 的 星球 。', 'Humankind has still not been to another planet.'],
      ['那/S 次 冲突 的 后果 *至今*/ADV 还/ADV 很/ADV 严重/V 。', 'The consequences of that conflict are still serious.'],
      ['这/S 种 政策 *至今*/ADV 还/ADV 在/ADV 持续/V 。', 'This policy continues to this day.'],
      ['我/S *至今*/ADV 还/ADV 不/ADV 明白/V 他/O 为什么 走 。', "I still don't understand why he left."],
      ['他/S *至今*/ADV 还/ADV 住/V 在/C 那/O 个 小区 。', 'He still lives on that estate.'],
      ['这/S 个 慈善 机构 *至今*/ADV 已经/ADV 救助/V 了/ASP 很/O 多 人 。', 'This charity has helped many people so far.'],
      ['这/S 本 书 *至今*/ADV 还/ADV 有/V 很/O 多 读者 。', 'This book still has many readers.'],
      ['他/S 的 话 我/S *至今*/ADV 还/ADV 记得/V 。', 'I still remember what he said.'],
      ['养老/S 问题 *至今*/ADV 还/ADV 没有/V 很/O 好 的 办法 。', 'There is still no good solution to elderly care.'],
    ],
    cloze: {
      blank: ['至今'],
      distractors: [
        ['从来', 'LEX.NEAR_SYNONYM', '从来 = ever / never; "to this day" is 至今.'],
        ['以前', 'LEX.NEAR_SYNONYM', '以前 = before.'],
      ],
    },
  },
  {
    id: 'G5-72', unit: 36, title: '不料 (unexpectedly, to one\'s surprise)', titleZh: '不料',
    summary: 'After a plan or expectation, 不料 introduces what actually (and surprisingly) happened.',
    explanationMd: `
**Form:** plan / expectation，**不料** + what happened.

我本来想出去，不料下起了大雨 — "I meant to go out, but unexpectedly it poured".

- Written partner of 没想到 and 谁知道 (G5-59).
- 不料 opens the second clause; what follows is usually unwelcome.`,
    formula: ['S', 'ADV', 'MOD', 'V', 'P', 'CONJ2', 'V'],
    constraints: [],
    requires: ['G4-01'],
    contrasts: ['G5-59', 'G4-01'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S 本来/ADV 想/MOD 出去/V ， *不料*/CONJ2 下/V 起/C 了 大 雨/O 。', 'I meant to go out, but unexpectedly it poured.'],
      ['他/S 觉得/V 很/O 容易 ， *不料*/CONJ2 遇到/V 了/ASP 很/O 多 困难 。', 'He thought it would be easy, but ran into many problems.'],
      ['我们/S 刚/ADV 要/MOD 出发/V ， *不料*/CONJ2 车/S 坏/V 了/SF 。', 'We were just about to leave when the car broke down.'],
    ],
    instances: [
      ['他/S 想/MOD 帮忙/V ， *不料*/CONJ2 反而/ADV 让/V 事情/O 更 复杂 了 。', 'He meant to help, but only made things more complicated.'],
      ['大家/S 觉得/V 他/O 会 赢 ， *不料*/CONJ2 他/S 输/V 了/SF 。', 'Everyone thought he would win, but he lost.'],
      ['我/S 去/V 找/V 他/O ， *不料*/CONJ2 他/S 已经/ADV 搬/V 走/C 了/SF 。', 'I went to see him, but he had already moved out.'],
      ['公司/S 想/MOD 转型/V ， *不料*/CONJ2 遇到/V 了/ASP 很/O 大 的 困难 。', 'The company wanted to change course, but hit big problems.'],
      ['我/S 预测/V 明天/O 会 晴 ， *不料*/CONJ2 下/V 了/ASP 一/O 天 雨 。', 'I predicted sun, but it rained all day.'],
      ['他/S 本来/ADV 很/ADV 健康/V ， *不料*/CONJ2 突然/ADV 生病/V 了/SF 。', 'He had been healthy, but suddenly fell ill.'],
      ['我们/S 准备/V 了/ASP 很/O 久 ， *不料*/CONJ2 活动/S 没有/ADV 举行/V 。', 'We prepared for ages, but the event never took place.'],
      ['她/S 觉得/V 没/O 人 来 ， *不料*/CONJ2 来/V 了/ASP 很/O 多 人 。', 'She thought no one would come, but lots of people did.'],
      ['政策/S 本来/ADV 是/V 好/O 的 ， *不料*/CONJ2 带/V 来/C 了 很 多 问题/O 。', 'The policy was well meant, but it caused many problems.'],
      ['我/S 想/MOD 早/ADV 一点儿 到/V ， *不料*/CONJ2 路/S 上 堵/V 车/O 。', 'I wanted to arrive early, but there was a traffic jam.'],
      ['他/S 打/V 开/C 门/O ， *不料*/CONJ2 看/V 见/C 了 一/O 只 小 狗 。', 'He opened the door and, to his surprise, saw a puppy.'],
      ['我/S 觉得/V 这/O 是 短期 的 ， *不料*/CONJ2 持续/V 了/ASP 很/C 多 年 。', 'I thought it was short-term, but it went on for years.'],
      ['他们/S 本来/ADV 很/ADV 和谐/V ， *不料*/CONJ2 突然/ADV 发生/V 了/ASP 冲突/O 。', 'They had got on well, but suddenly a conflict broke out.'],
      ['我/S 觉得/V 他/O 不 会 来 ， *不料*/CONJ2 他/S 很/ADV 早/ADV 就/ADV 到/V 了/SF 。', "I thought he wouldn't come, but he arrived early."],
      ['我/S 想/MOD 存/V 钱/O ， *不料*/CONJ2 花/V 得/C 更 多 了 。', 'I meant to save money, but ended up spending more.'],
    ],
    cloze: {
      blank: ['不料'],
      distractors: [
        ['果然', 'LEX.NEAR_SYNONYM', '果然 = as expected; a surprise is 不料.'],
        ['于是', 'LEX.NEAR_SYNONYM', '于是 = so, and then.'],
      ],
    },
  },
];
