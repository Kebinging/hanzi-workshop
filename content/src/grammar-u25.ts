import type { PatternSource } from './authoring';

// HSK 5 · Unit 1 (unit 25) · 职业发展 Career — Stance adverbs II (provisional).

const ADV_POS = { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' } as const;

export const patternsU25: PatternSource[] = [
  {
    id: 'G5-01', unit: 25, title: '果然 (sure enough, as expected)', titleZh: '果然',
    summary: '果然 confirms that what was expected or predicted really happened.',
    explanationMd: `
**Form:** (expectation)，Subject + **果然** + verb phrase.

天气预报说有雨，下午果然下雨了 — "the forecast said rain, and sure enough it rained".

- The opposite of **竟然 / 居然** (G4-01), which mark a *surprise*.
- 果然 goes after the subject, before the verb.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G4-01'],
    contrasts: ['G4-01'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['新闻/S 说/V 有/O 雨 ， 下午/T *果然*/ADV 下雨/V 了/SF 。', 'The news said rain, and sure enough it rained in the afternoon.'],
      ['大家/S 都 说 他 能 升职 ， 他/S *果然*/ADV 升职/V 了/SF 。', 'Everyone said he would be promoted, and he was.'],
      ['这/S 个 方案 *果然*/ADV 有/V 效果/O 。', 'This plan worked, just as expected.'],
    ],
    instances: [
      ['经理/S 说 新 员工 很 勤奋 ， 他/S *果然*/ADV 每/T 天 都 第一 个 到/V 。', 'The manager said the new employee was hard-working, and sure enough he is first in every day.'],
      ['我/S 担心 会 堵车 ， 路/S 上 *果然*/ADV 堵车/V 了/ASP 很/C 久 。', 'I was worried about traffic, and sure enough we were stuck for ages.'],
      ['他/S 准备 得 很 好 ， 谈判/S *果然*/ADV 很/ADV 顺利/V 。', 'He prepared well, and the negotiation went smoothly as expected.'],
      ['这/S 个 项目 *果然*/ADV 成功/V 了/SF 。', 'The project succeeded, just as expected.'],
      ['我/S 早 就 想 到 了 ， 客户/S *果然*/ADV 不/ADV 满意/V 。', 'I saw it coming — sure enough, the client is unhappy.'],
      ['公司/S 改善/V 了/ASP 待遇/O ， 员工/S *果然*/ADV 更/ADV 努力/V 了/SF 。', 'The company improved pay and conditions, and the staff duly worked harder.'],
      ['她/S *果然*/ADV 被/BA 录取/V 了/SF 。', 'She was accepted, as expected.'],
      ['大家/S 都 说 这 个 工程师 很 有 本领 ， 他/S *果然*/ADV 很/ADV 快/ADV 就/ADV 解决/V 了/ASP 问题/O 。', 'Everyone said the engineer was skilled, and sure enough he solved the problem quickly.'],
      ['他/S 不/ADV 踏实/V ， *果然*/ADV 又/ADV 出/V 了/ASP 失误/O 。', "He isn't steady, and sure enough he slipped up again."],
      ['新/S 制度 *果然*/ADV 提高/V 了/ASP 效率/O 。', 'The new system did improve efficiency, as expected.'],
      ['这/S 个 主任 *果然*/ADV 很/ADV 有/V 经验/O 。', 'This director really is experienced, just as people said.'],
      ['秘书/S 说 会议 会 推迟 ， 会议/S *果然*/ADV 推迟/V 了/SF 。', 'The secretary said the meeting would be put off, and it was.'],
      ['他/S 很/ADV 勤奋/V ， *果然*/ADV 有/V 了/ASP 很/O 大 的 成就 。', 'He is diligent, and as expected he has achieved a great deal.'],
      ['我们/S 换/V 了/ASP 设计/O ， 客户/S *果然*/ADV 很/ADV 喜欢/V 。', 'We changed the design, and sure enough the client loved it.'],
      ['她/S 的 表现 *果然*/ADV 不错/V 。', 'Her performance was good, just as expected.'],
    ],
    cloze: {
      blank: ['果然'],
      distractors: [
        ['竟然', 'LEX.NEAR_SYNONYM', '竟然 marks a surprise; 果然 confirms an expectation.'],
        ['居然', 'LEX.NEAR_SYNONYM', '居然 marks a surprise; 果然 = sure enough.'],
      ],
    },
  },
  {
    id: 'G5-02', unit: 25, title: '万一 (in case, if by any chance)', titleZh: '万一',
    summary: '万一 introduces an unlikely, usually unwelcome possibility.',
    explanationMd: `
**Form:** **万一** + unlikely event，consequence / advice · or advice，**万一** + event + **呢**.

带上伞吧，万一下雨呢 — "take an umbrella, in case it rains".

- Literally "one in ten thousand": the event is unlikely but worth preparing for.
- Compare **如果** (neutral if) and **要是** (spoken if).`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G3-73'],
    contrasts: ['G3-73'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*万一*/CONJ1 下雨/V ， 我们/S 就/ADV 不/ADV 去/V 了/SF 。', "If by any chance it rains, we won't go."],
      ['带/V 上/C 伞/O 吧/SF ， *万一*/CONJ1 下雨/V 呢/SF 。', 'Take an umbrella in case it rains.'],
      ['*万一*/CONJ1 他/S 不/ADV 同意/V ， 你/S 怎么/ADV 办/V ？', "What will you do if he doesn't agree?"],
    ],
    instances: [
      ['*万一*/CONJ1 谈判/S 失败/V 了/SF ， 我们/S 还/ADV 有/V 另/O 一 个 方案 。', "If the negotiation fails, we have another plan."],
      ['你/S 多/ADV 带/V 一点儿/O 钱 ， *万一*/CONJ1 不/ADV 够/V 呢/SF 。', "Take a bit more money in case it isn't enough."],
      ['*万一*/CONJ1 失业/V 了/SF ， 你/S 有/V 足够/O 的 钱 吗/SF ？', 'Do you have enough money in case you lose your job?'],
      ['*万一*/CONJ1 客户/S 不/ADV 满意/V ， 我们/S 就/ADV 改进/V 。', "If the client isn't happy, we'll improve it."],
      ['你/S 把/BA 合同 再 检查/V 一/C 遍 ， *万一*/CONJ1 有/V 错/O 呢/SF 。', 'Check the contract again, in case there are mistakes.'],
      ['*万一*/CONJ1 我/S 迟到/V 了/SF ， 请/MOD 你/S 先/ADV 开始/V 。', 'If I happen to be late, please start without me.'],
      ['*万一*/CONJ1 电脑/S 坏/V 了/SF ， 文件/S 就/ADV 没有/V 了/SF 。', 'If the computer breaks, the files will be gone.'],
      ['*万一*/CONJ1 有/V 问题/O ， 你/S 就/ADV 给/PP 我 打/V 电话/O 。', 'If anything goes wrong, ring me.'],
      ['*万一*/CONJ1 项目/S 没有/V 成果/O ， 谁/S 承担/V 责任/O ？', 'If the project produces nothing, who takes responsibility?'],
      ['我们/S 要/MOD 有/V 措施/O ， *万一*/CONJ1 出/V 了/ASP 事故/O 呢/SF 。', 'We need measures in place in case there is an accident.'],
      ['*万一*/CONJ1 他/S 不/ADV 来/V ， 我们/S 怎么/ADV 办/V ？', "What do we do if he doesn't come?"],
      ['*万一*/CONJ1 资格/S 不/ADV 合格/V ， 就/ADV 不/ADV 能/MOD 参加/V 培训/O 。', "If your qualifications aren't up to standard, you can't join the training."],
      ['*万一*/CONJ1 领导/S 不/ADV 批准/V ， 这/S 个 计划 就/ADV 不/ADV 能/MOD 进行/V 。', "If the boss doesn't approve, this plan can't go ahead."],
      ['*万一*/CONJ1 迷路/V 了/SF ， 就/ADV 问/V 当地/O 人 。', 'If you get lost, ask a local.'],
      ['*万一*/CONJ1 你/S 生病/V 了/SF ， 工作/S 怎么/ADV 办/V ？', 'If you fall ill, what happens to the work?'],
    ],
    cloze: {
      blank: ['万一'],
      distractors: [
        ['既然', 'LEX.NEAR_SYNONYM', '既然 starts from a known fact; 万一 is an unlikely "in case".'],
        ['因为', 'LEX.NEAR_SYNONYM', '因为 gives a real reason, not a possibility.'],
      ],
    },
  },
  {
    id: 'G5-03', unit: 25, title: '未必 / 不见得 (not necessarily)', titleZh: '“未必”和“不见得”',
    summary: '未必 / 不见得 doubts a claim: it is not necessarily so.',
    explanationMd: `
**Form:** Subject + **未必 / 不见得** + verb / adjective.

贵的东西未必好 — "expensive things aren't necessarily good".

- 未必 is a little more formal; 不见得 is common in speech.
- They soften a denial: not "no", but "not necessarily".
- Compare **一定** (definitely) and **并不** (G4-04, actually not).`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G4-04'],
    contrasts: ['G4-04'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['贵/S 的 东西 *未必*/ADV 好/V 。', "Expensive things aren't necessarily good."],
      ['他/S *不见得*/ADV 会/MOD 同意/V 。', "He won't necessarily agree."],
      ['读/S 过 博士 的 人 *未必*/ADV 有/V 能力/O 。', "People with doctorates aren't necessarily capable."],
    ],
    instances: [
      ['工资/S 高 的 工作 *未必*/ADV 适合/V 你/O 。', "A well-paid job won't necessarily suit you."],
      ['这/S 个 方案 *不见得*/ADV 比/PP 那 个 好/V 。', "This plan isn't necessarily better than that one."],
      ['经验/S 多 的 人 *未必*/ADV 不/ADV 会/MOD 失误/V 。', "Experienced people still make mistakes sometimes."],
      ['他/S 说 的 *不见得*/ADV 是/V 真/O 的 。', "What he says isn't necessarily true."],
      ['大/S 企业 的 待遇 *未必*/ADV 好/V 。', "Big companies don't necessarily pay well."],
      ['努力/S *未必*/ADV 就/ADV 能/MOD 成功/V ， 可是/CONJ2 不/ADV 努力/V 一定/ADV 不/ADV 能/MOD 成功/V 。', "Hard work doesn't guarantee success, but without it you certainly won't succeed."],
      ['他/S 今天 *不见得*/ADV 会/MOD 来/V 。', "He won't necessarily come today."],
      ['升职/S *未必*/ADV 是/V 好/O 事情 。', "Promotion isn't necessarily a good thing."],
      ['这/S 个 对手 *不见得*/ADV 很/ADV 厉害/V 。', "This rival isn't necessarily that strong."],
      ['创业/S *未必*/ADV 比/PP 上班 累/V 。', "Starting a business isn't necessarily harder than a job."],
      ['老板/S *不见得*/ADV 知道/V 这/O 件 事情 。', "The boss doesn't necessarily know about this."],
      ['便宜/S 的 *未必*/ADV 不/ADV 好/V 。', "Cheap things aren't necessarily bad."],
      ['这/S 次 失误 *不见得*/ADV 是/V 他/O 的 错 。', "This slip isn't necessarily his fault."],
      ['多/S 加班 *未必*/ADV 能/MOD 提高/V 效率/O 。', "More overtime won't necessarily improve efficiency."],
      ['你/S 的 看法 *不见得*/ADV 对/V 。', "Your view isn't necessarily right."],
    ],
    cloze: {
      blank: ['未必', '不见得'],
      distractors: [
        ['必须', 'LEX.NEAR_SYNONYM', '必须 = must; 未必 / 不见得 = not necessarily.'],
        ['一定', 'LEX.NEAR_SYNONYM', '一定 = definitely — the opposite idea.'],
      ],
    },
  },
  {
    id: 'G5-04', unit: 25, title: '何必 … 呢 (why bother …?)', titleZh: '何必…呢',
    summary: '何必 + V + 呢 is a rhetorical "why bother": there is no need to.',
    explanationMd: `
**Form:** (Subject) + **何必** + verb phrase + (**呢**)？

你何必生气呢？ — "why get angry? (there's no need)".

- A gentle, rhetorical way of saying 不必: it advises against something.
- Usually ends in **呢** and a question mark.`,
    formula: ['S', 'ADV', 'V', 'O', 'SF'],
    constraints: [ADV_POS],
    requires: ['G3-56', 'G4-02'],
    contrasts: ['G3-56'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['你/S *何必*/ADV 生气/V *呢*/SF ？', 'Why get angry?'],
      ['这么/TOP 近 ， *何必*/ADV 坐/V 出租车/O *呢*/SF ？', "It's so close — why bother with a taxi?"],
      ['他/S 已经/ADV 道歉/V 了/SF ， 你/S *何必*/ADV 这么/ADV 认真/V *呢*/SF ？', "He's already apologised — why take it so seriously?"],
    ],
    instances: [
      ['你/S *何必*/ADV 为了/PP 这么 小 的 事情 辞职/V *呢*/SF ？', 'Why quit over something so small?'],
      ['工作/S 已经 做 完 了 ， *何必*/ADV 加班/V *呢*/SF ？', 'The work is done — why stay late?'],
      ['你/S *何必*/ADV 担心/V 他/O *呢*/SF ？', 'Why worry about him?'],
      ['*何必*/ADV 花/V 那么/O 多 钱 *呢*/SF ？', 'Why spend so much money?'],
      ['大家/S 都 是 同事 ， *何必*/ADV 吵架/V *呢*/SF ？', "We're all colleagues — why argue?"],
      ['你/S *何必*/ADV 一 个 人 承担/V 所有/O 的 责任 *呢*/SF ？', 'Why take all the responsibility on yourself?'],
      ['*何必*/ADV 跟/PP 他 吵/V *呢*/SF ？', 'Why argue with him?'],
      ['你/S 有/V 那么/O 多 本领 ， *何必*/ADV 怕/V 失业/O *呢*/SF ？', 'With all your skills, why worry about losing your job?'],
      ['发/V 个 电子邮件/O 就 可以 了 ， *何必*/ADV 去/V 他/O 的 办公室 *呢*/SF ？', 'An email will do — why go to his office?'],
      ['*何必*/ADV 那么/ADV 着急/V *呢*/SF ？', "What's the rush?"],
      ['你/S *何必*/ADV 跟/PP 别人 比/V *呢*/SF ？', 'Why compare yourself with others?'],
      ['他/S 不/ADV 想/MOD 去/V ， 你/S *何必*/ADV 让/V 他/O 去/V *呢*/SF ？', "He doesn't want to go — why make him?"],
      ['*何必*/ADV 买/V 新/O 的 *呢*/SF ？', 'Why buy a new one?'],
      ['你/S *何必*/ADV 每 天 都 这么 忙碌/V *呢*/SF ？', 'Why be so busy every single day?'],
      ['这/S 是/V 小/O 失误 ， *何必*/ADV 批评/V 他/O *呢*/SF ？', "It's a small slip — why criticise him?"],
    ],
    cloze: {
      blank: ['何必'],
      distractors: [
        ['必须', 'LEX.NEAR_SYNONYM', '必须 = must; 何必 … 呢 = why bother.'],
        ['不必', 'LEX.NEAR_SYNONYM', '不必 is a plain "no need"; it doesn’t form a rhetorical 呢 question.'],
      ],
    },
  },
  {
    id: 'G5-05', unit: 25, title: '难免 / 不免 (bound to, can\'t help)', titleZh: '“难免”和“不免”',
    summary: '难免 (会) + V: something is hard to avoid in the situation; 不免 + V: someone can\'t help reacting.',
    explanationMd: `
- **难免** (adjective) + **会** + V — "it's only natural that …": 刚开始工作，难免会有失误。
- **不免** (adverb) + V — "can't help …", usually a feeling: 第一次谈判，他不免有点儿紧张。

Both accept the situation as natural. Compare **难怪** (G4-46, no wonder) and **未必** (G5-03).`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G4-29'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['刚/T 开始 工作 ， *难免*/ADV 会/MOD 有/V 失误/O 。', "When you've just started, mistakes are bound to happen."],
      ['第一/T 次 谈判 ， 他/S *不免*/ADV 有点儿/ADV 紧张/V 。', "In his first negotiation he couldn't help feeling a bit nervous."],
      ['人/S *难免*/ADV 会/MOD 出/V 错/O 。', 'Everyone makes mistakes.'],
    ],
    instances: [
      ['工作/S 节奏 太 快 ， *难免*/ADV 会/MOD 很/ADV 累/V 。', "When the pace of work is this fast, you're bound to get tired."],
      ['听/T 到 这 个 消息 ， 大家/S *不免*/ADV 有点儿/ADV 担心/V 。', "Hearing this news, everyone couldn't help worrying a bit."],
      ['新/S 员工 *难免*/ADV 不/ADV 熟悉/V 业务/O 。', "New staff are bound to be unfamiliar with the work."],
      ['看/T 到 老 照片 ， 她/S *不免*/ADV 想/V 起/C 了 以前 的 事情 。', "Seeing the old photos, she couldn't help remembering the past."],
      ['压力/S 大 了 ， *难免*/ADV 会/MOD 生气/V 。', "Under pressure, anyone gets cross."],
      ['他/S 一 个 人 在 外国 ， *不免*/ADV 觉得/V 孤单/O 。', "On his own abroad, he can't help feeling lonely."],
      ['创业/S *难免*/ADV 会/MOD 遇到/V 困难/O 。', 'Starting a business is bound to bring difficulties.'],
      ['看/T 到 别人 升职 ， 他/S *不免*/ADV 有点儿/ADV 羡慕/V 。', "Seeing others promoted, he can't help feeling a little envious."],
      ['两/S 个 人 在 一起 ， *难免*/ADV 会/MOD 有/V 矛盾/O 。', "When two people are together, conflicts are bound to arise."],
      ['项目/S 失败/V 了/SF ， 领导/S *不免*/ADV 有点儿/ADV 失望/V 。', "The project failed, and the boss couldn't help being a bit disappointed."],
      ['工作/S 多 了 ， *难免*/ADV 会/MOD 忘记/V 一/O 些 事情 。', "With so much work, you're bound to forget things."],
      ['第一/T 天 上班 ， 他/S *不免*/ADV 很/ADV 紧张/V 。', 'On his first day at work he was inevitably nervous.'],
      ['在/PP 大 企业 工作 ， *难免*/ADV 要/MOD 加班/V 。', "Working for a big company, overtime is unavoidable."],
      ['听/T 了 他 的 话 ， 我/S *不免*/ADV 有点儿/ADV 生气/V 。', "Hearing what he said, I couldn't help getting a bit cross."],
      ['刚/T 学 一 门 技能 ， *难免*/ADV 会/MOD 觉得/V 难/O 。', "When you're just learning a skill, it's bound to feel hard."],
    ],
    cloze: {
      blank: ['难免', '不免'],
      distractors: [
        ['难怪', 'LEX.NEAR_SYNONYM', '难怪 = no wonder; 难免 / 不免 = bound to, can’t help.'],
        ['未必', 'LEX.NEAR_SYNONYM', '未必 = not necessarily — the opposite idea.'],
      ],
    },
  },
  {
    id: 'G5-06', unit: 25, title: '似乎 (seemingly, it seems)', titleZh: '似乎',
    summary: '似乎 softens a statement: it seems that …',
    explanationMd: `
**Form:** Subject + **似乎** + verb phrase.

他似乎不太高兴 — "he doesn't seem very happy".

- More written than **好像** (G3-93), with the same meaning; it can't be followed by 一样 (✗ 似乎…一样 for "like").
- Goes after the subject, before the verb or other adverbs.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G3-93'],
    contrasts: ['G3-93'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S *似乎*/ADV 不/ADV 太/ADV 高兴/V 。', "He doesn't seem very happy."],
      ['这/S 个 方案 *似乎*/ADV 有/V 问题/O 。', 'There seems to be a problem with this plan.'],
      ['经理/S *似乎*/ADV 已经/ADV 知道/V 了/SF 。', 'The manager seems to know already.'],
    ],
    instances: [
      ['天/S *似乎*/ADV 要/MOD 下雨/V 了/SF 。', 'It looks like rain.'],
      ['她/S *似乎*/ADV 对/PP 这 个 岗位 很 有/V 兴趣/O 。', 'She seems very interested in this post.'],
      ['客户/S *似乎*/ADV 不/ADV 太/ADV 满意/V 。', "The client doesn't seem very satisfied."],
      ['他/S *似乎*/ADV 在/ADV 想/V 什么/O 事情 。', 'He seems to be thinking about something.'],
      ['这/S 个 制度 *似乎*/ADV 不/ADV 太/ADV 实际/V 。', "This system doesn't seem very practical."],
      ['他们/S *似乎*/ADV 认识/V 很/C 久 了 。', 'They seem to have known each other a long time.'],
      ['对手/S *似乎*/ADV 准备/V 得/C 更 好 。', 'Our rivals seem better prepared.'],
      ['你/S *似乎*/ADV 瘦/V 了/SF 。', 'You seem to have lost weight.'],
      ['这/S 件 事情 *似乎*/ADV 没有/V 那么/O 简单 。', "This doesn't seem to be so simple."],
      ['秘书/S *似乎*/ADV 忘记/V 了/ASP 这/O 个 会议 。', 'The secretary seems to have forgotten the meeting.'],
      ['他/S 的 表现 *似乎*/ADV 越来越/ADV 好/V 了/SF 。', 'His performance seems to be getting better and better.'],
      ['大家/S *似乎*/ADV 都/ADV 同意/V 。', 'Everyone seems to agree.'],
      ['这/S 个 工程师 *似乎*/ADV 很/ADV 有/V 本领/O 。', 'This engineer seems very capable.'],
      ['公司/S *似乎*/ADV 遇到/V 了/ASP 困难/O 。', 'The company seems to have run into trouble.'],
      ['她/S *似乎*/ADV 刚/ADV 哭/V 过/ASP 。', 'She seems to have just been crying.'],
    ],
    cloze: {
      blank: ['似乎'],
      distractors: [
        ['果然', 'LEX.NEAR_SYNONYM', '果然 confirms an expectation; 似乎 = it seems.'],
        ['难道', 'LEX.NEAR_SYNONYM', '难道 makes a rhetorical question ending in 吗.'],
      ],
    },
  },
];
