import type { PatternSource } from './authoring';

// HSK 4 · Unit 12 (unit 24) · 展望 Looking ahead — Discourse markers (provisional).

const ADV_POS = { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' } as const;

export const patternsU24: PatternSource[] = [
  {
    id: 'G4-67', unit: 24, title: '据说 / 听说 (it is said; I hear)', titleZh: '“据说”和“听说”',
    summary: '据说 reports what is generally said (no named source); 听说 reports what the speaker has heard.',
    explanationMd: `
- **据说** + clause — "it is said, reportedly": 据说，这个机器人会说汉语。 Usually at the very start, often with a comma. No subject before it.
- **听说** + clause — "I hear / I've heard": 我听说他找到了新工作。 The subject (我, 你…) can come first, or be left out.

Both introduce second-hand information the speaker hasn't checked.`,
    formula: ['ADV', 'P', 'S', 'V', 'O'],
    constraints: [],
    requires: ['G3-87'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*据说*/ADV ， 这/S 个 机器人 会/MOD 说/V 汉语/O 。', 'Apparently this robot can speak Chinese.'],
      ['*听说*/ADV 你/S 要/MOD 退休/V 了/SF ？', "I hear you're retiring?"],
      ['我/S *听说*/V 他/O 找 到 了 新 工作 。', "I've heard he found a new job."],
    ],
    instances: [
      ['*据说*/ADV ， 将来/T 很/S 多 工作 都/ADV 会/MOD 由/PP 机器人 来 做/V 。', 'They say robots will do many jobs in future.'],
      ['*听说*/ADV 这/S 个 技术 很/ADV 新/V 。', 'I hear this technology is very new.'],
      ['*据说*/ADV ， 这/S 家 公司 有/V 一/O 千 多 个 人 。', 'This company reportedly has over a thousand staff.'],
      ['我/S *听说*/V 你/O 搬家 了 。', "I hear you've moved house."],
      ['*据说*/ADV ， 网络/S 让/V 人/O 越来越 忙 。', 'It is said the internet makes people busier and busier.'],
      ['*听说*/ADV 明天/T 要/MOD 下雨/V 。', "I hear it's going to rain tomorrow."],
      ['*据说*/ADV ， 他/S 是/V 一/O 个 很 有名 的 作家 。', "He's said to be a famous writer."],
      ['你/S *听说*/V 他/O 要 出国 了 吗/SF ？', 'Have you heard he is going abroad?'],
      ['*据说*/ADV ， 这/S 个 城市 以前 是/V 一/O 个 农村 。', 'This city was supposedly once a village.'],
      ['我/S *听说*/V 这儿/O 的 房租 涨 了 。', "I hear the rent here has gone up."],
      ['*据说*/ADV ， 这/S 个 方法 很/ADV 有/V 效果/O 。', 'This method is said to be effective.'],
      ['*听说*/ADV 他/S 退休/V 以后 去/V 了/ASP 农村/O 。', 'I heard he moved to the countryside after retiring.'],
      ['*据说*/ADV ， 人生/S 最 重要 的 是/V 健康/O 。', "They say health is what matters most in life."],
      ['我/S *听说*/V 你/O 的 愿望 实现 了 。', "I hear your wish came true."],
      ['*据说*/ADV ， 这/S 种 机器人 一/T 天 能/MOD 工作/V %二十四/C 个 小时 。', 'Reportedly this robot can work 24 hours a day.'],
    ],
  },
  {
    id: 'G4-68', unit: 24, title: '可见 (which shows that …)', titleZh: '可见',
    summary: '可见 draws a conclusion from the evidence just given.',
    explanationMd: `
**Form:** evidence，**可见** + conclusion.

他每天都练习，可见他很努力 — "he practises every day, which shows how hard-working he is".

- 可见 starts the second clause and needs **evidence** in the first.
- Compare **所以** (a result) and **于是** (what happened next): 可见 is a *reasoned judgement*.`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G3-83'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S 每/T 天 都/ADV 练习/V ， *可见*/CONJ2 他/S 很/ADV 努力/V 。', 'He practises every day — clearly he works hard.'],
      ['这么/S 多 人 来/V 看 ， *可见*/CONJ2 这/S 个 演出 很/ADV 有名/V 。', 'So many people came — the show must be famous.'],
      ['他/S 连/PP 饭 都/ADV 没/ADV 吃/V ， *可见*/CONJ2 他/S 很/ADV 忙/V 。', "He didn't even eat — he must be really busy."],
    ],
    instances: [
      ['房租/S 一 年 比 一 年 贵 ， *可见*/CONJ2 这儿/S 的 房子 很/ADV 少/V 。', 'Rents rise every year, which shows housing here is scarce.'],
      ['他/S 第一 次 就 成功/V 了/SF ， *可见*/CONJ2 他/S 准备/V 得/C 很 好 。', 'He succeeded first time — clearly he prepared well.'],
      ['大家/S 都/ADV 来/V 了/SF ， *可见*/CONJ2 这/S 个 会议 很/ADV 重要/V 。', 'Everyone came, so this meeting must be important.'],
      ['她/S 笑/V 了/SF ， *可见*/CONJ2 她/S 已经/ADV 不/ADV 生气/V 了/SF 。', "She smiled — so she's not angry any more."],
      ['机器人/S 越来越/ADV 多/V ， *可见*/CONJ2 技术/S 发展/V 得/C 很 快 。', 'There are more and more robots, which shows how fast technology is moving.'],
      ['这/S 本 书 卖/V 得/C 很 好 ， *可见*/CONJ2 大家/S 都/ADV 喜欢/V 。', 'This book sells well, so people clearly like it.'],
      ['他/S 每/T 天 都/ADV 加班/V ， *可见*/CONJ2 工作/S 的 压力 很/ADV 大/V 。', 'He works late every day — the pressure must be huge.'],
      ['他们/S 吵架/V 了/SF ， *可见*/CONJ2 他们/S 的 关系 不/ADV 太/ADV 好/V 。', "They argued, so their relationship can't be great."],
      ['这么/S 多 年轻人 申请/V ， *可见*/CONJ2 这/S 个 工作 很/ADV 好/V 。', 'So many young people applied — it must be a good job.'],
      ['他/S 什么/O 都 知道 ， *可见*/CONJ2 他/S 的 经验 很/ADV 多/V 。', 'He knows everything, which shows how experienced he is.'],
      ['网上/S 到处 都 是 这 个 消息 ， *可见*/CONJ2 大家/S 都/ADV 很/ADV 关心/V 。', 'This news is all over the internet, so people clearly care.'],
      ['他/S 退休/V 以后 还 在 学习 ， *可见*/CONJ2 他/S 很/ADV 珍惜/V 时间/O 。', 'He is still studying after retiring — clearly he values his time.'],
      ['她/S 很 快 就 回答/V 出来/C 了/SF ， *可见*/CONJ2 她/S 很/ADV 聪明/V 。', 'She answered right away — she must be clever.'],
      ['孩子/S 一直/ADV 在/ADV 笑/V ， *可见*/CONJ2 他/S 很/ADV 开心/V 。', 'The child keeps laughing — clearly he is happy.'],
      ['这/S 个 问题 讨论/V 了/ASP 三/C 天 ， *可见*/CONJ2 它/S 很/ADV 复杂/V 。', 'This issue took three days to discuss, so it must be complicated.'],
    ],
    cloze: {
      blank: ['可见'],
      distractors: [
        ['然而', 'LEX.NEAR_SYNONYM', '然而 introduces a contrast; 可见 draws a conclusion from evidence.'],
        ['于是', 'LEX.NEAR_SYNONYM', '于是 tells what happened next, not what the evidence shows.'],
      ],
    },
  },
  {
    id: 'G4-69', unit: 24, title: '总之 / 总的来说 (in short; all in all)', titleZh: '“总之”和“总的来说”',
    summary: '总之 / 总的来说 sum up what came before in one final statement.',
    explanationMd: `
**Form:** (points …)，**总之 / 总的来说**，conclusion.

- **总之** "in short, anyway": sums up or cuts a discussion short — 总之，我不同意。
- **总的来说** "on the whole, overall": a balanced summary — 总的来说，这次旅行很顺利。

Both open the final clause and are usually followed by a comma.`,
    formula: ['CONJ1', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G4-24'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*总之*/CONJ1 ， 我们/S 要/MOD 努力/V 。', 'In short, we need to work hard.'],
      ['*总的来说*/CONJ1 ， 这/S 次 旅行 很/ADV 顺利/V 。', 'All in all, the trip went smoothly.'],
      ['有的/S 人 喜欢/V ， 有的/S 人 不/ADV 喜欢/V ， *总之*/CONJ1 大家/S 的 看法 不/ADV 一样/V 。', "Some like it, some don't — in short, opinions differ."],
    ],
    instances: [
      ['*总的来说*/CONJ1 ， 我/S 对/PP 这 个 结果 很/ADV 满意/V 。', "Overall, I'm happy with the result."],
      ['*总之*/CONJ1 ， 健康/S 是/V 最/O 重要 的 。', 'In short, health comes first.'],
      ['*总的来说*/CONJ1 ， 网络/S 让/V 生活/O 更 方便 了 。', 'On the whole, the internet has made life easier.'],
      ['他/S 很/ADV 聪明/V ， 也/ADV 很/ADV 努力/V ， *总之*/CONJ1 是/V 一/O 个 很 好 的 学生 。', "He's clever and hard-working — in short, a very good student."],
      ['*总的来说*/CONJ1 ， 这/S 个 计划 不错/V 。', "All in all, it's not a bad plan."],
      ['*总之*/CONJ1 ， 我们/S 要/MOD 珍惜/V 现在/O 的 生活 。', 'In short, we should treasure the life we have.'],
      ['*总的来说*/CONJ1 ， 这/S 次 合作 很/ADV 成功/V 。', 'Overall, this collaboration was a success.'],
      ['*总之*/CONJ1 ， 你/S 别/ADV 放弃/V 。', "Whatever happens, don't give up."],
      ['*总的来说*/CONJ1 ， 城市/S 的 变化 很/ADV 大/V 。', 'On the whole, the city has changed a lot.'],
      ['*总之*/CONJ1 ， 我/S 不/ADV 同意/V 。', "Anyway, I don't agree."],
      ['*总的来说*/CONJ1 ， 技术/S 的 发展 有/V 很/O 多 好处 。', 'All in all, technological progress has many benefits.'],
      ['*总之*/CONJ1 ， 有/V 信心/O 就/ADV 能/MOD 成功/V 。', 'In short, with confidence you can succeed.'],
      ['*总的来说*/CONJ1 ， 他/S 的 人生 很/ADV 幸福/V 。', 'All in all, he has had a happy life.'],
      ['*总之*/CONJ1 ， 这/S 件 事情 以后 再/ADV 说/V 。', "Anyway, let's talk about it later."],
      ['*总的来说*/CONJ1 ， 这/S 个 结论 是/V 对/O 的 。', 'On the whole, this conclusion is correct.'],
    ],
    cloze: {
      blank: ['总之'],
      distractors: [
        ['然后', 'LEX.NEAR_SYNONYM', '然后 is the next step; 总之 sums everything up.'],
        ['比如', 'LEX.NEAR_SYNONYM', '比如 introduces an example, not a summary.'],
      ],
    },
  },
  {
    id: 'G4-70', unit: 24, title: '另外 / 此外 (in addition, besides)', titleZh: '“另外”和“此外”',
    summary: '另外 / 此外 add a further point; 此外 is more formal.',
    explanationMd: `
**Form:** point 1，**另外 / 此外**，(还 / 也) + point 2.

我买了水果，另外还买了一些蔬菜 — "I bought fruit, and some vegetables as well".

- The second point often has **还** or **也**.
- 另外 can also start a new sentence: 另外，请大家带好护照。
- 此外 is written style, usually followed by a comma.`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G3-11'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S 买/V 了/ASP 水果/O ， *另外*/CONJ2 还/ADV 买/V 了/ASP 一/O 些 蔬菜 。', 'I bought fruit, and some vegetables too.'],
      ['这/S 个 工作 的 工资 很/ADV 高/V ， *此外*/CONJ2 ， 还/ADV 有/V 奖金/O 。', 'This job pays well, and there is a bonus too.'],
      ['*另外*/CONJ2 ， 请/MOD 大家/S 带/V 好/C 护照/O 。', "Also, please don't forget your passports."],
    ],
    instances: [
      ['他/S 会/MOD 说/V 英语/O ， *另外*/CONJ2 还/ADV 会/MOD 说/V 汉语/O 。', 'He speaks English, and Chinese as well.'],
      ['这/S 个 机器人 能/MOD 做/V 饭/O ， *此外*/CONJ2 ， 还/ADV 能/MOD 打扫/V 房间/O 。', 'This robot can cook, and it can also clean.'],
      ['*另外*/CONJ2 ， 我/S 还/ADV 想/MOD 问/V 一/O 个 问题 。', "I'd also like to ask a question."],
      ['我们/S 要/MOD 合作/V ， *此外*/CONJ2 ， 也/ADV 要/MOD 竞争/V 。', 'We need to cooperate — and compete as well.'],
      ['他/S 有/V 两/O 个 孩子 ， *另外*/CONJ2 还/ADV 养/V 了/ASP 一/O 只 猫 。', 'He has two children, and a cat too.'],
      ['这儿/S 的 环境 很/ADV 好/V ， *此外*/CONJ2 ， 交通/S 也/ADV 很/ADV 方便/V 。', 'The environment here is good, and transport is convenient too.'],
      ['*另外*/CONJ2 ， 别/ADV 忘/V 了/ASP 带/V 钥匙/O 。', "And don't forget your keys."],
      ['退休/T 以后 ， 他/S 每/T 天 散步/V ， *另外*/CONJ2 还/ADV 学/V 书法/O 。', 'Since retiring he walks every day and studies calligraphy too.'],
      ['这/S 个 网站 的 信息 很/ADV 多/V ， *此外*/CONJ2 ， 还/ADV 是/V 免费/O 的 。', 'This website has lots of information, and it is free too.'],
      ['我/S 打算/MOD 学/V 技术/O ， *另外*/CONJ2 也/ADV 想/MOD 学/V 外语/O 。', 'I plan to learn a skill, and a foreign language too.'],
      ['他/S 建立/V 了/ASP 一/O 家 公司 ， *此外*/CONJ2 ， 还/ADV 写/V 了/ASP 两/O 本 书 。', 'He founded a company and also wrote two books.'],
      ['*另外*/CONJ2 ， 我/S 想/MOD 提出/V 一/O 个 建议 。', "I'd also like to make a suggestion."],
      ['我们/S 需要/V 勇气/O ， *此外*/CONJ2 ， 还/ADV 需要/V 信心/O 。', 'We need courage — and confidence too.'],
      ['搬家/T 以后 ， 房子/S 大/V 了/SF ， *另外*/CONJ2 离/PP 公司 也 近/V 了/SF 。', 'Since moving, the flat is bigger and nearer to work too.'],
      ['这/S 次 会议 讨论/V 了/ASP 合作/O ， *此外*/CONJ2 ， 还/ADV 讨论/V 了/ASP 竞争/O 的 问题 。', 'The meeting discussed cooperation, and competition too.'],
    ],
    cloze: {
      blank: ['另外', '此外'],
      distractors: [
        ['可见', 'LEX.NEAR_SYNONYM', '可见 draws a conclusion; adding a point is 另外 / 此外.'],
        ['总之', 'LEX.NEAR_SYNONYM', '总之 sums up; it doesn’t add a new point.'],
      ],
    },
  },
  {
    id: 'G4-71', unit: 24, title: '甚至 (even, so far as to)', titleZh: '甚至',
    summary: '甚至 introduces the most extreme case in a series.',
    explanationMd: `
**Form:** statement，**甚至** + more extreme case (+ 也 / 都).

这个机器人会说汉语，甚至会写诗 — "this robot speaks Chinese — it can even write poems".

- 甚至 goes before the verb or before the extreme noun: 甚至老人也喜欢上网.
- With a noun subject it's often followed by 也 / 都 (like 连…都).`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G3-72'],
    contrasts: ['G3-72'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S 很/ADV 忙/V ， *甚至*/ADV 没有/V 时间/O 吃 饭 。', "He's so busy he doesn't even have time to eat."],
      ['这/S 个 机器人 会/MOD 说/V 汉语/O ， *甚至*/ADV 会/MOD 写/V 诗/O 。', 'This robot speaks Chinese — it can even write poems.'],
      ['很/S 多 人 都/ADV 喜欢/V 上网/V ， *甚至*/ADV 老人/S 也/ADV 喜欢/V 。', 'Lots of people love the internet — even the elderly.'],
    ],
    instances: [
      ['他/S 太/ADV 累/V 了/SF ， *甚至*/ADV 站/V 不 起来 。', "He's so tired he can't even stand up."],
      ['她/S 去/V 过/ASP 很/O 多 国家 ， *甚至*/ADV 去/V 过/ASP 沙漠/O 。', "She's been to lots of countries — even to the desert."],
      ['这/S 个 问题 很/ADV 难/V ， *甚至*/ADV 老师/S 也/ADV 不/ADV 会/MOD 。', 'This question is so hard even the teacher can’t do it.'],
      ['他/S 很/ADV 喜欢/V 京剧/O ， *甚至*/ADV 自己/S 也/ADV 会/MOD 唱/V 。', 'He loves Peking opera — he can even sing it himself.'],
      ['技术/S 发展/V 得/C 很 快 ， *甚至*/ADV 机器人/S 也/ADV 能/MOD 做/V 饭/O 了 。', 'Technology is moving so fast that even robots can cook.'],
      ['我/S 很/ADV 想念/V 家/O ， *甚至*/ADV 想/MOD 回国/V 。', "I miss home so much I've even thought of going back."],
      ['他/S 退休/V 以后 很 忙 ， *甚至*/ADV 比/PP 以前 还 忙/V 。', "He's busy since retiring — even busier than before."],
      ['她/S 很/ADV 节约/V ， *甚至*/ADV 不/ADV 买/V 新/O 衣服 。', "She's so thrifty she doesn't even buy new clothes."],
      ['这儿/S 的 冬天 很/ADV 冷/V ， *甚至*/ADV 河/S 水 也/ADV 冻/V 了/SF 。', 'Winters here are so cold that even the river freezes.'],
      ['他/S 一辈子/T 都/ADV 在/ADV 工作/V ， *甚至*/ADV 周末/T 也/ADV 不/ADV 休息/V 。', "He worked all his life — he didn't even rest at weekends."],
      ['网络/S 改变/V 了/ASP 生活/O ， *甚至*/ADV 改变/V 了/ASP 人/O 的 习惯 。', "The internet has changed life — it's even changed people's habits."],
      ['我/S 忘/V 了/ASP 他/O 的 名字 ， *甚至*/ADV 忘/V 了/ASP 他/O 的 样子 。', "I've forgotten his name, even what he looks like."],
      ['很/S 多 人 都/ADV 不/ADV 知道/V 这/O 件 事情 ， *甚至*/ADV 他/S 父母 也/ADV 不/ADV 知道/V 。', "Lots of people don't know about this — not even his parents."],
      ['他/S 很/ADV 有/V 勇气/O ， *甚至*/ADV 敢/MOD 一 个 人 去/V 森林/O 。', "He's so brave he even dares go into the forest alone."],
      ['他/S 学/V 得/C 很 快 ， *甚至*/ADV 比/PP 老师 还 好/V 。', 'He learns so fast that he is even better than the teacher.'],
    ],
    cloze: {
      blank: ['甚至'],
      distractors: [
        ['可见', 'LEX.NEAR_SYNONYM', '可见 draws a conclusion; 甚至 adds the most extreme case ("even").'],
        ['总之', 'LEX.NEAR_SYNONYM', '总之 sums up; it can’t add an extreme case.'],
      ],
    },
  },
  {
    id: 'G4-72', unit: 24, title: '并且 (and also) / 而 (whereas)', titleZh: '“并且”和“而”',
    summary: '并且 joins two actions or qualities of the same subject; 而 contrasts two subjects.',
    explanationMd: `
- **并且** "and, moreover" — adds a second action or quality, usually of the **same** subject: 他提出了问题，并且解决了问题。
- **而** "whereas, while" — sets two **different** subjects side by side: 哥哥喜欢运动，而弟弟喜欢看书。

Both are a little formal. In speech, 并且 ≈ 而且, and 而 ≈ 可是 / 但是.`,
    formula: ['S', 'V', 'P', 'CONJ2', 'V'],
    constraints: [],
    requires: ['G3-82', 'G4-59'],
    contrasts: ['G3-82', 'G4-59'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S 提出/V 了/ASP 问题/O ， *并且*/CONJ2 解决/V 了/ASP 问题/O 。', 'He raised the problem and solved it too.'],
      ['哥哥/S 喜欢/V 运动/O ， *而*/CONJ2 弟弟/S 喜欢/V 看/V 书/O 。', 'The older brother likes sport, whereas the younger likes reading.'],
      ['这/S 个 计划 很/ADV 好/V ， *并且*/CONJ2 很/ADV 实际/V 。', 'This plan is good, and practical too.'],
    ],
    instances: [
      ['我们/S 要/MOD 合作/V ， *并且*/CONJ2 要/MOD 互相/ADV 帮助/V 。', 'We need to cooperate and help each other.'],
      ['城市/S 很/ADV 热闹/V ， *而*/CONJ2 农村/S 很/ADV 安静/V 。', 'The city is lively, whereas the countryside is quiet.'],
      ['他/S 完成/V 了/ASP 任务/O ， *并且*/CONJ2 完成/V 得/C 很 好 。', 'He finished the task, and did it well.'],
      ['北方/S 的 冬天 很/ADV 冷/V ， *而*/CONJ2 南方/S 很/ADV 暖和/V 。', 'Winters in the north are cold, while the south is mild.'],
      ['她/S 建立/V 了/ASP 一/O 家 公司 ， *并且*/CONJ2 成功/V 了/SF 。', 'She set up a company and made a success of it.'],
      ['有的/S 人 喜欢/V 竞争/O ， *而*/CONJ2 有的/S 人 喜欢/V 合作/O 。', 'Some people like competing, whereas others like cooperating.'],
      ['这/S 个 方法 很/ADV 简单/V ， *并且*/CONJ2 很/ADV 有/V 效果/O 。', 'This method is simple and effective.'],
      ['他/S 很/ADV 乐观/V ， *而*/CONJ2 他/S 妻子 很/ADV 悲观/V 。', "He's optimistic, whereas his wife is pessimistic."],
      ['我们/S 讨论/V 了/ASP 这/O 个 结论 ， *并且*/CONJ2 都/ADV 同意/V 了/SF 。', 'We discussed the conclusion and all agreed with it.'],
      ['年轻人/S 喜欢/V 上网/O ， *而*/CONJ2 老人/S 喜欢/V 看/V 报纸/O 。', 'Young people like going online, whereas older people like newspapers.'],
      ['他/S 每/T 天 锻炼/V ， *并且*/CONJ2 坚持/V 了/ASP 十/C 年 。', "He exercises every day, and he's kept it up for ten years."],
      ['以前/T 生活/S 很/ADV 简单/V ， *而*/CONJ2 现在/T 很/ADV 复杂/V 。', 'Life used to be simple, whereas now it is complicated.'],
      ['机器人/S 能/MOD 工作/V ， *并且*/CONJ2 不/ADV 会/MOD 累/V 。', 'Robots can work, and they never get tired.'],
      ['我/S 想/MOD 出国/V ， *而*/CONJ2 我/S 父母 想/MOD 让/V 我/O 留 在 这儿 。', 'I want to go abroad, whereas my parents want me to stay.'],
      ['他/S 找/V 到/C 了/ASP 工作/O ， *并且*/CONJ2 搬/V 了/ASP 家/O 。', 'He found a job and moved house.'],
    ],
  },
];
