import type { PatternSource } from './authoring';

// HSK 4 · Unit 1 (unit 13) · 职场 At work — Attitude & time adverbs (provisional).

const ADV_POS = { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' } as const;

export const patternsU13: PatternSource[] = [
  {
    id: 'G4-01', unit: 13, title: '竟然 / 居然 (unexpectedly)', titleZh: '“竟然”“居然”：出乎意料',
    summary: '竟然 / 居然 before the verb says the speaker did not expect this.',
    explanationMd: `
**Form:** Subject + **竟然 / 居然** + verb phrase.

Both mean "to my surprise, actually": the speaker expected the opposite. 他竟然辞职了 — nobody thought he would quit. 居然 is a little more colloquial; they swap freely.

Like other adverbs they sit **after the subject, before the verb** (and before 不 / 没): 他竟然没来.

Don't confuse with **当然** "of course" — that marks something *expected*.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G3-06'],
    contrasts: ['G4-03'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S *竟然*/ADV 辞职/V 了/SF 。', 'He actually quit his job!'],
      ['这么/TOP 简单 的 问题 ， 他/S *居然*/ADV 不/ADV 会/MOD 。', "Such an easy question, and he actually can't do it."],
      ['我们/S 等/V 了/ASP 半天/C ， 他/S *竟然*/ADV 没/ADV 来/V 。', "We waited ages, and he didn't even turn up."],
    ],
    instances: [
      ['经理/S *竟然*/ADV 同意/V 了/SF 。', 'The manager actually agreed!'],
      ['这么/TOP 好 的 工作 ， 他/S *居然*/ADV 不/ADV 要/V 。', "Such a good job, and he doesn't want it."],
      ['他/S 工作/V 了/ASP 十/C 年 ， 工资/S *竟然*/ADV 没/ADV 变/V 。', "He's worked ten years and his pay hasn't changed at all."],
      ['她/S *居然*/ADV 一/T 天 就 完成/V 了/ASP 任务/O 。', 'She actually finished the task in a single day.'],
      ['我/S 的 简历 里 *竟然*/ADV 有/V 两/O 个 错 字 。', 'There were actually two wrong characters in my CV.'],
      ['这/S 个 顾客 *居然*/ADV 给/PP 我 打/V 了/ASP 十/C 次 电话/O 。', 'This customer actually rang me ten times.'],
      ['外面/S 下/V 大 雨 ， 他/S *竟然*/ADV 按时/ADV 到/V 了/SF 。', "It was pouring, yet he still arrived on time."],
      ['那/S 个 文件 *竟然*/ADV 不/ADV 见/V 了/SF 。', 'That document has vanished!'],
      ['我/S *居然*/ADV 忘记/V 了/ASP 今天 的 会议/O 。', "I can't believe I forgot today's meeting."],
      ['老板/S *竟然*/ADV 让/V 我们/O 早/ADV 一点儿 下班/V 。', 'The boss actually let us finish early.'],
      ['他/S 昨天/T *居然*/ADV 加班/V 到/C 早上 。', 'He actually worked overtime until morning yesterday.'],
      ['这/S 个 部门 *竟然*/ADV 只@zhi3/ADV 有/V 三/O 个 人 。', 'This department has only three people!'],
      ['他/S 很/ADV 优秀/V ， 可是/CONJ2 *竟然*/ADV 没/ADV 找/V 到/C 工作/O 。', "He's excellent, yet he hasn't found a job."],
      ['电脑/S *居然*/ADV 又/ADV 坏/V 了/SF 。', "The computer's broken down again — unbelievable."],
      ['我/S 第一 次 应聘 *竟然*/ADV 就/ADV 成功/V 了/SF 。', 'My very first job application actually succeeded.'],
    ],
    decoys: [['当然', 'LEX.NEAR_SYNONYM', '当然 means "of course" — the opposite of a surprise.']],
    cloze: {
      blank: ['竟然', '居然'],
      distractors: [['当然', 'LEX.NEAR_SYNONYM', '当然 means "of course" — it marks something expected, not a surprise.']],
    },
  },
  {
    id: 'G4-02', unit: 13, title: '难道…吗？ (surely not …?)', titleZh: '反问句：难道…吗？',
    summary: '难道 … 吗 asks a question that expects no answer: it states the opposite strongly.',
    explanationMd: `
**Form:** (Subject) + **难道** + … + **吗**？

A rhetorical question. 难道你不知道吗？ = "Surely you know!" The speaker is reproaching or insisting; the answer is obvious.

- 难道 can go before or after the subject.
- The sentence normally ends in **吗** (sometimes 不成), never 呢.
- With a negative inside, the meaning is positive (你难道不知道吗 → you do know); without one it is negative (难道这是我的错吗 → it isn't my fault).

Compare **到底** (G4-03): a real question pressing for an answer.`,
    formula: ['S', 'ADV', 'V', 'O', 'SF'],
    constraints: [{ kind: 'pair', a: '难道', b: '吗', code: 'CONJ.MISSING_PARTNER' }],
    requires: ['G3-79'],
    contrasts: ['G4-03', 'G3-79'],
    errorCodes: ['CONJ.MISSING_PARTNER', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['你/S *难道*/ADV 不/ADV 知道/V *吗*/SF ？', "Surely you know?"],
      ['*难道*/ADV 你/S 忘记/V 了/ASP *吗*/SF ？', "Don't tell me you've forgotten!"],
      ['这/S *难道*/ADV 是/V 我/O 的 错 *吗*/SF ？', 'Is this supposed to be my fault?'],
    ],
    instances: [
      ['你/S *难道*/ADV 没/ADV 看/V 合同/O *吗*/SF ？', "Didn't you read the contract?"],
      ['他/S *难道*/ADV 想/MOD 每 天 加班/V *吗*/SF ？', 'Does he really want to work overtime every day?'],
      ['*难道*/ADV 你/S 不/ADV 想/MOD 换/V 工作/O *吗*/SF ？', "Don't you want to change jobs?"],
      ['你/S *难道*/ADV 不/ADV 认识/V 他/O *吗*/SF ？', "Don't you know him?"],
      ['这么/TOP 简单 的 事情 ， 你/S *难道*/ADV 不/ADV 会/MOD 做/V *吗*/SF ？', "Surely you can manage something this simple?"],
      ['*难道*/ADV 我们/S 要/MOD 一直/ADV 等/V 下去/C *吗*/SF ？', 'Are we supposed to just keep waiting?'],
      ['你/S *难道*/ADV 没/ADV 收/V 到/C 我/O 的 电子邮件 *吗*/SF ？', "Didn't you get my email?"],
      ['*难道*/ADV 他/S 已经/ADV 辞职/V 了 *吗*/SF ？', "Don't tell me he's already quit?"],
      ['你/S *难道*/ADV 不/ADV 觉得/V 压力/O 太 大 *吗*/SF ？', "Don't you feel the pressure is too much?"],
      ['工资/S 这么/ADV 少/V ， 你/S *难道*/ADV 满意/V *吗*/SF ？', 'With pay this low, are you really happy?'],
      ['*难道*/ADV 这/S 也/ADV 是/V 我/O 的 责任 *吗*/SF ？', 'Is this my responsibility too?'],
      ['你/S *难道*/ADV 不/ADV 需要/V 休息/O *吗*/SF ？', "Don't you need a rest?"],
      ['这/S *难道*/ADV 不/ADV 是/V 你/O 的 文件 *吗*/SF ？', "Isn't this your document?"],
      ['你/S *难道*/ADV 要/MOD 一 个 人 完成/V 这/O 个 任务 *吗*/SF ？', 'Are you really going to do this task all by yourself?'],
      ['*难道*/ADV 他/S 没/ADV 看/V 见/C 我/O *吗*/SF ？', "Didn't he see me?"],
    ],
    decoys: [['呢', 'CONJ.MISSING_PARTNER', 'A rhetorical 难道 question ends in 吗, not 呢.']],
    cloze: {
      blank: ['难道'],
      distractors: [
        ['到底', 'LEX.NEAR_SYNONYM', '到底 presses for a real answer and can’t be used in a yes/no 吗 question.'],
        ['究竟', 'LEX.NEAR_SYNONYM', '究竟, like 到底, asks for a real answer; it doesn’t go with 吗.'],
      ],
    },
  },
  {
    id: 'G4-03', unit: 13, title: '到底 / 究竟 (… on earth?)', titleZh: '“到底”“究竟”：追问',
    summary: '到底 / 究竟 in a question pushes for the real answer: what on earth …?',
    explanationMd: `
**Form:** Subject + **到底 / 究竟** + question (with 什么, 谁, 怎么, 几, or V不V).

到底 says the speaker is impatient or puzzled and wants a clear answer: 你到底去不去？ "Are you going or not?" 究竟 means the same and is a bit more formal.

- These questions **can't end in 吗** — use a question word or V不V instead.
- If the subject is a question word, 到底 goes first: 到底谁负责？

Compare **难道…吗** (G4-02): a rhetorical question, not a real one.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G4-02'],
    contrasts: ['G4-02', 'G4-01'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['你/S *到底*/ADV 去/V 不 去 ？', 'Are you going or not?'],
      ['他/S *究竟*/ADV 是/V 谁/O ？', 'Who on earth is he?'],
      ['这/S 个 问题 *到底*/ADV 怎么/ADV 解决/V ？', 'How on earth do we solve this problem?'],
    ],
    instances: [
      ['你/S *到底*/ADV 想/MOD 做/V 什么/O 职业 ？', 'What line of work do you actually want?'],
      ['会议/S *究竟*/ADV 推迟/V 到/C 几 点 ？', 'So what time has the meeting actually been moved to?'],
      ['你/S *到底*/ADV 同意/V 不 同意 ？', 'Do you agree or not?'],
      ['这/S 个 文件 *究竟*/ADV 是/V 谁/O 写 的 ？', 'Who actually wrote this document?'],
      ['你们/S 部门 *到底*/ADV 有/V 多少/O 人 ？', 'How many people does your department actually have?'],
      ['他/S *到底*/ADV 为什么/ADV 辞职/V ？', 'Why on earth did he quit?'],
      ['我们/S *究竟*/ADV 要/MOD 加班/V 到/C 什么 时候 ？', 'How long are we going to have to work overtime?'],
      ['他/S *到底*/ADV 来/V 没 来 ？', 'Did he come or not?'],
      ['我/S 的 工资 *到底*/ADV 什么/T 时候 发/V ？', 'When on earth am I getting paid?'],
      ['你/S *究竟*/ADV 在/PP 哪 个 部门 工作/V ？', 'Which department do you actually work in?'],
      ['这/S 个 任务 *到底*/ADV 谁/S 负责/V ？', 'Who exactly is in charge of this task?'],
      ['顾客/S *究竟*/ADV 有/V 什么/O 要求 ？', 'What exactly does the customer want?'],
      ['你/S *到底*/ADV 想/MOD 不 想 去 ？', 'Do you want to go or not?'],
      ['你/S *到底*/ADV 喜欢/V 哪/O 个 ？', 'Which one do you actually like?'],
      ['你们/S *究竟*/ADV 在/ADV 说/V 什么/O ？', 'What on earth are you talking about?'],
    ],
    decoys: [['吗', 'CONJ.MISSING_PARTNER', 'A 到底 question already has a question word or V不V; it can’t end in 吗.']],
    cloze: {
      blank: ['到底', '究竟'],
      distractors: [
        ['竟然', 'LEX.NEAR_SYNONYM', '竟然 reports a surprise; it can’t press a question.'],
        ['难道', 'LEX.NEAR_SYNONYM', '难道 needs a rhetorical yes/no question ending in 吗.'],
      ],
    },
  },
  {
    id: 'G4-04', unit: 13, title: '并 + 不 / 没 (not at all, actually not)', titleZh: '“并不”“并没”',
    summary: '并 before 不 / 没 denies what someone assumed: it is not actually so.',
    explanationMd: `
**Form:** Subject + **并** + 不 / 没(有) + verb phrase.

并不 / 并没 corrects an assumption: 这个工作并不难 — "this job isn't hard (as you might think)". It's only used with a negative.

- Order is fixed: **并不**, **并没** — not 不并.
- Often follows a contrast: 他看起来很忙，其实并不忙.`,
    formula: ['S', 'ADV', 'ADV', 'V', 'O'],
    constraints: [
      { kind: 'pair', a: '并', b: '不', code: 'ORDER.MULTI_ADVERB' },
      { kind: 'pair', a: '并', b: '没', code: 'ORDER.MULTI_ADVERB' },
    ],
    requires: ['G3-11'],
    errorCodes: ['ORDER.MULTI_ADVERB'],
    examples: [
      ['这/S 个 工作 *并*/ADV 不/ADV 难/V 。', "This job isn't hard at all."],
      ['我/S *并*/ADV 没/ADV 说/V 过/ASP 这/O 句 话 。', 'I never said that.'],
      ['他/S 看/V 起来/C 很/ADV 忙/V ， 其实/ADV *并*/ADV 不/ADV 忙/V 。', "He looks busy, but actually he isn't."],
    ],
    instances: [
      ['工资/S 高 *并*/ADV 不/ADV 是/V 最/O 重要 的 。', "A high salary isn't the most important thing."],
      ['我/S *并*/ADV 没/ADV 辞职/V 。', "I haven't quit (whatever you heard)."],
      ['加班/S *并*/ADV 不/ADV 一定/ADV 有/V 效率/O 。', "Working overtime isn't necessarily efficient."],
      ['经理/S *并*/ADV 没/ADV 同意/V 。', "The manager didn't actually agree."],
      ['这/S 个 规定 *并*/ADV 不/ADV 符合/V 大家/O 的 要求 。', "This rule doesn't actually meet everyone's needs."],
      ['他/S *并*/ADV 不/ADV 是/V 我们/O 部门 的 人 。', "He isn't actually in our department."],
      ['我/S *并*/ADV 没有/V 那么/O 多 时间 。', "I don't actually have that much time."],
      ['面试/S *并*/ADV 不/ADV 难/V 。', "The interview isn't difficult at all."],
      ['他/S 说/V 他/O 很 忙 ， 可是/CONJ2 他/S *并*/ADV 不/ADV 忙/V 。', "He says he's busy, but he isn't really."],
      ['我/S *并*/ADV 不/ADV 失望/V 。', "I'm not disappointed at all."],
      ['这/S 个 任务 *并*/ADV 没/ADV 完成/V 。', "This task hasn't actually been finished."],
      ['大家/S *并*/ADV 不/ADV 了解/V 他/O 。', "People don't really know him."],
      ['顾客/S *并*/ADV 不/ADV 满意/V 。', "The customer isn't actually satisfied."],
      ['我/S 以前/T *并*/ADV 不/ADV 认识/V 他/O 。', "I didn't actually know him before."],
      ['他/S 的 能力 *并*/ADV 不/ADV 差/V 。', "He's not at all lacking in ability."],
    ],
    decoys: [['很', 'LEX.COLLOCATION', '并 only strengthens a negative: 并不 / 并没.']],
  },
  {
    id: 'G4-05', unit: 13, title: '往往 vs 常常 (tend to / often)', titleZh: '“往往”和“常常”',
    summary: '往往 states a regular tendency under some condition; 常常 just means "often" and also works for the future and requests.',
    explanationMd: `
**往往** sums up what *usually happens* in a given situation, from experience: 周末他往往睡到中午. It needs a context (a time, a condition, a kind of person) and describes the past or present.

**常常** simply means "often". Unlike 往往 it can be used:
- for the **future** or a wish: 我以后会常常来看你。
- in **requests**: 请常常联系我。
- with no condition at all: 他常常给我打电话。

✗ 欢迎你往往来 · ✗ 你要往往锻炼.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G3-12'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['周末/T 他/S *往往*/ADV 睡/V 到/C 中午 。', 'At weekends he tends to sleep till noon.'],
      ['我/S 以后/T 会/MOD *常常*/ADV 来/V 看/V 你/O 的/SF 。', "I'll come and see you often from now on."],
      ['压力/S 大 的 人 *往往*/ADV 睡/V 不 好 。', "People under a lot of pressure tend to sleep badly."],
    ],
    instances: [
      ['年轻人/S *往往*/ADV 喜欢/V 换/V 工作/O 。', 'Young people tend to like changing jobs.'],
      ['你/S 要/MOD *常常*/ADV 锻炼/V 身体/O 。', 'You should exercise often.'],
      ['顾客/T 多 的 时候 ， 我们/S *往往*/ADV 要/MOD 加班/V 。', 'When there are lots of customers, we usually have to work overtime.'],
      ['我/S *常常*/ADV 想/V 起/C 以前 的 同事/O 。', 'I often think of my old colleagues.'],
      ['第一/S 次 面试 的 人 *往往*/ADV 很/ADV 紧张/V 。', 'People at their first interview tend to be nervous.'],
      ['欢迎/V 你/O *常常*/ADV 来/V 。', 'You are welcome to come often.'],
      ['地铁/S 里 的 人 早上 *往往*/ADV 很/ADV 多/V 。', 'The metro is usually crowded in the mornings.'],
      ['他/S *常常*/ADV 给/PP 我 打/V 电话/O 。', 'He often rings me.'],
      ['刚/S 工作 的 人 *往往*/ADV 没有/V 经验/O 。', 'People who have just started work usually lack experience.'],
      ['请/MOD 你/S *常常*/ADV 联系/V 我/O 。', 'Please keep in touch.'],
      ['优秀/S 的 人 *往往*/ADV 很/ADV 努力/V 。', 'Outstanding people tend to work very hard.'],
      ['我/S 小时候/T *常常*/ADV 去/V 爷爷/O 家 。', 'As a child I often went to my grandpa’s.'],
      ['工资/S 高 的 工作 ， 压力/S *往往*/ADV 也/ADV 很/ADV 大/V 。', 'Well-paid jobs usually come with a lot of pressure too.'],
      ['我们/S *常常*/ADV 一起/ADV 吃/V 午饭/O 。', 'We often have lunch together.'],
      ['周末/T 的 时候 ， 超市/S 里 *往往*/ADV 有/V 很/O 多 人 。', 'At the weekend the supermarket is usually full of people.'],
    ],
    cloze: {
      blank: ['常常'],
      distractors: [['往往', 'LEX.NEAR_SYNONYM', '往往 sums up a tendency from experience; it can’t be used for wishes, requests, the future or a plain one-off "often".']],
    },
  },
  {
    id: 'G4-06', unit: 13, title: '曾经 (once) / 从来 + 不/没 (never)', titleZh: '“曾经”和“从来”',
    summary: '曾经 = at one time in the past; 从来 + 不/没 = never (ever).',
    explanationMd: `
**曾经** + V(过): something was once true or once happened: 我曾经在银行工作过。 It is positive; the negative is 没(有) + V过, not 曾经不.

**从来** needs a negative or 都:
- **从来不** + V: never (as a habit or principle) — 他从来不迟到。
- **从来没(有)** + V **过**: never once (experience) — 我从来没去过外国。
- 从来都 + positive: always — 他从来都很认真。`,
    formula: ['S', 'ADV', 'V', 'ASP', 'O'],
    constraints: [ADV_POS],
    requires: ['G3-03'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'ASPECT.NEG_BU_MEI', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S *曾经*/ADV 在/PP 银行 工作/V 过/ASP 。', 'I once worked at a bank.'],
      ['他/S *从来*/ADV 不/ADV 迟到/V 。', 'He is never late.'],
      ['我/S *从来*/ADV 没/ADV 去/V 过/ASP 外国/O 。', "I've never been abroad."],
    ],
    instances: [
      ['她/S *曾经*/ADV 当/V 过/ASP 老师/O 。', 'She was once a teacher.'],
      ['我们/S *曾经*/ADV 是/V 同事/O 。', 'We were once colleagues.'],
      ['他/S *从来*/ADV 不/ADV 加班/V 。', 'He never works overtime.'],
      ['我/S *从来*/ADV 没/ADV 见/V 过/ASP 这么/O 优秀 的 人 。', "I've never met anyone so outstanding."],
      ['他/S *曾经*/ADV 换/V 过/ASP 三/C 次 工作/O 。', "He's changed jobs three times before."],
      ['经理/S *从来*/ADV 不/ADV 生气/V 。', 'The manager never gets angry.'],
      ['我/S *从来*/ADV 没/ADV 用/V 过/ASP 这/O 个 方法 。', "I've never used this method."],
      ['这儿/S *曾经*/ADV 是/V 一/O 个 公园 。', 'This used to be a park.'],
      ['我/S *曾经*/ADV 想/MOD 当/V 医生/O 。', 'I once wanted to be a doctor.'],
      ['他/S *从来*/ADV 不/ADV 喝/V 酒/O 。', 'He never drinks.'],
      ['她/S *从来*/ADV 没/ADV 对/PP 我 说/V 过/ASP 这/O 件 事情 。', 'She has never told me about this.'],
      ['我/S *曾经*/ADV 住/V 在/C 这 个 城市 。', 'I once lived in this city.'],
      ['他/S *从来*/ADV 都/ADV 很/ADV 认真/V 。', 'He has always been conscientious.'],
      ['我们/S *曾经*/ADV 一起/ADV 工作/V 过/ASP 两/C 年 。', 'We once worked together for two years.'],
      ['我/S *从来*/ADV 没/ADV 失望/V 过/ASP 。', "I've never once been disappointed."],
    ],
    cloze: {
      blank: ['曾经', '从来'],
      distractors: [
        ['曾经', 'LEX.NEAR_SYNONYM', '曾经 = "once, at one time"; it isn’t used with 不/没 to mean "never".'],
        ['从来', 'LEX.NEAR_SYNONYM', '从来 needs 不 / 没 or 都; it can’t mark a single past experience.'],
      ],
    },
  },
];
