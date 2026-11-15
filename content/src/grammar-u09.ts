import type { PatternSource, Distractor } from './authoring';

// HSK 3 · Unit 9 · 被偷了！ — 被 passives, 是…的, 连…都 (provisional).

const BEI_BEFORE_V = { kind: 'before' as const, a: 'BA' as const, b: 'V' as const, code: 'BA.ORDER' };
const NOT_BA: Distractor = ['把', 'BEI.AGENT_ROLE', '把 would make the subject the doer; here the subject is on the receiving end.'];

export const patternsU09: PatternSource[] = [
  {
    id: 'G3-65', unit: 9, title: '被 + doer + V + other element', titleZh: '被字句',
    summary: 'The subject suffers or undergoes the action; 被 introduces who did it: 我的自行车被小偷偷走了.',
    explanationMd: `
**Form:** Subject (affected) + **被** + doer + V + result / 了

- 我的自行车被小偷偷**走**了 — my bike was stolen by a thief.
- 他被老师批评**了** — he was told off by the teacher.

Like 把, the verb needs something after it (了, a result, a direction). 被 sentences often report something unwelcome.`,
    formula: ['S', 'BA', 'V', 'C', 'SF'],
    constraints: [BEI_BEFORE_V],
    requires: ['G3-57'],
    contrasts: ['G3-57', 'G3-70'],
    errorCodes: ['BEI.AGENT_ROLE', 'BEI.MISSING_OTHER', 'BA.ORDER'],
    examples: [
      ['我/S 的 自行车 *被*/BA 小偷 偷/V 走/C 了/SF 。', 'My bike was stolen by a thief.'],
      ['他/S *被*/BA 老师 批评/V 了/SF 。', 'He was told off by the teacher.'],
      ['我/S 的 蛋糕 *被*/BA 弟弟 吃/V 光/C 了/SF 。', 'My cake was eaten up by my little brother.'],
    ],
    instances: [
      ['我/S 的 钱包 *被*/BA 人 偷/V 了/SF 。', 'My wallet was stolen.'],
      ['杯子/S *被*/BA 猫 打破/V 了/SF 。', 'The cup was broken by the cat.'],
      ['他/S *被*/BA 车 撞/V 了/SF 。', 'He was hit by a car.'],
      ['我/S 的 衣服 *被*/BA 雨 弄/V 湿/C 了/SF 。', 'My clothes got soaked in the rain.'],
      ['树叶/S *被*/BA 风 吹/V 走/C 了/SF 。', 'The leaves were blown away by the wind.'],
      ['我/S *被*/BA 他 骗/V 了/SF 。', 'I was cheated by him.'],
      ['那/S 本 小说 *被*/BA 我 朋友 借/V 走/C 了/SF 。', 'That novel was borrowed by my friend.'],
      ['她/S *被*/BA 经理 表扬/V 了/SF 。', 'She was praised by the manager.'],
    ],
    decoys: [NOT_BA],
    cloze: {
      blank: ['被'],
      distractors: [
        ['把', 'BEI.AGENT_ROLE', '把 would make the subject the doer.'],
        ['对', 'LEX.COLLOCATION', '对 means "towards"; it can’t introduce who did it.'],
      ],
    },
  },
  {
    id: 'G3-66', unit: 9, title: '被 + V (doer left out)', titleZh: '被字句：省略施事',
    summary: 'When the doer is unknown or unimportant, 被 goes straight before the verb: 我的钱包被偷了.',
    explanationMd: `
**Form:** Subject + **被** + V + other element

- 我的钱包被偷了 — my wallet was stolen (by whom? unknown).
- 杯子被打破了 — the cup got broken.

Only 被 can drop the doer; 叫 and 让 (G3-67) always need one.`,
    formula: ['S', 'BA', 'V', 'C', 'SF'],
    constraints: [BEI_BEFORE_V],
    requires: ['G3-65'],
    errorCodes: ['BEI.MISSING_OTHER', 'BA.ORDER'],
    examples: [
      ['我/S 的 钱包 *被*/BA 偷/V 了/SF 。', 'My wallet was stolen.'],
      ['杯子/S *被*/BA 打破/V 了/SF 。', 'The cup got broken.'],
      ['他/S *被*/BA 选/V 上/C 了/SF 。', 'He was chosen.'],
    ],
    instances: [
      ['我/S 的 自行车 *被*/BA 骑/V 走/C 了/SF 。', 'Someone rode off on my bike.'],
      ['蛋糕/S *被*/BA 吃/V 光/C 了/SF 。', 'The cake has all been eaten.'],
      ['那/S 个 小偷 *被*/BA 抓/V 住/C 了/SF 。', 'That thief was caught.'],
      ['窗户/S *被*/BA 打开/V 了/SF 。', 'The window has been opened.'],
      ['他/S *被*/BA 批评/V 了/SF ， 很/ADV 难过/V 。', 'He was criticised and feels upset.'],
      ['我/S 的 书 *被*/BA 借/V 走/C 了/SF 。', 'My book has been borrowed.'],
      ['门/S *被*/BA 关/V 上/C 了/SF 。', 'The door was shut.'],
      ['玻璃/S *被*/BA 弄/V 碎/C 了/SF 。', 'The glass got smashed.'],
    ],
    decoys: [NOT_BA],
    cloze: {
      blank: ['被'],
      distractors: [
        ['把', 'BEI.AGENT_ROLE', '把 needs a doer as subject and an object after it.'],
        ['给', 'LEX.COLLOCATION', 'With no doer, the passive marker is 被.'],
      ],
    },
  },
  {
    id: 'G3-67', unit: 9, title: '叫 / 让 passive (spoken)', titleZh: '叫／让表被动',
    summary: 'In speech 叫 or 让 can replace 被 — but the doer must be stated: 蛋糕叫弟弟吃了.',
    explanationMd: `
**Form:** Subject + **叫 / 让** + doer + V + other element

- 蛋糕叫弟弟吃了 — the cake got eaten by my brother.
- 我的自行车让人骑走了.

Unlike 被, the doer can't be dropped: ✗ 蛋糕叫吃了.`,
    formula: ['S', 'BA', 'V', 'C', 'SF'],
    constraints: [BEI_BEFORE_V],
    requires: ['G3-65'],
    errorCodes: ['BEI.AGENT_ROLE', 'BA.ORDER'],
    examples: [
      ['蛋糕/S *叫*/BA 弟弟 吃/V 了/SF 。', 'The cake got eaten by my little brother.'],
      ['我/S 的 自行车 *让*/BA 人 骑/V 走/C 了/SF 。', 'Someone rode off on my bike.'],
      ['衣服/S *叫*/BA 雨 弄/V 湿/C 了/SF 。', 'The clothes got soaked by the rain.'],
    ],
    instances: [
      ['钱包/S *让*/BA 小偷 偷/V 走/C 了/SF 。', 'The wallet was stolen by a thief.'],
      ['书/S *叫*/BA 我 朋友 借/V 走/C 了/SF 。', 'My friend has borrowed the book.'],
      ['他/S *让*/BA 车 撞/V 了/SF 。', 'He was hit by a car.'],
      ['杯子/S *叫*/BA 猫 打破/V 了/SF 。', 'The cat broke the cup.'],
      ['我/S 的 话 *让*/BA 他 听/V 错/C 了/SF 。', 'He misheard what I said.'],
      ['房间/S *叫*/BA 孩子 弄/V 乱/C 了/SF 。', 'The child messed up the room.'],
      ['那/S 张 照片 *让*/BA 妈妈 扔/V 了/SF 。', 'Mum threw that photo away.'],
      ['我/S 的 钢笔 *叫*/BA 谁 拿/V 走/C 了/SF ？', 'Who took my pen?'],
    ],
    decoys: [NOT_BA],
  },
  {
    id: 'G3-68', unit: 9, title: 'Negatives and adverbs go before 被', titleZh: '被字句的否定',
    summary: '没 / 已经 / 又 / 别 come before 被, never after it: 他没被批评, 钱包又被偷了.',
    explanationMd: `
- 他**没**被老师批评 — he wasn't told off.
- 小偷**已经**被抓住了.
- 我的自行车**又**被偷了.
- 你**别**被他骗了 — don't let him fool you.

✗ 他被老师没批评.`,
    formula: ['S', 'ADV', 'BA', 'V', 'C'],
    constraints: [{ kind: 'before', a: 'ADV', b: 'BA', code: 'BA.NEG_POSITION' }, BEI_BEFORE_V],
    requires: ['G3-66'],
    errorCodes: ['BA.NEG_POSITION', 'ASPECT.NEG_BU_MEI'],
    examples: [
      ['他/S 没/ADV *被*/BA 老师 批评/V 。', "He wasn't told off by the teacher."],
      ['我/S 的 钱包 已经/ADV *被*/BA 偷/V 了/SF 。', 'My wallet has already been stolen.'],
      ['他/S 又/ADV *被*/BA 撞/V 了/SF 。', 'He got hit again.'],
    ],
    instances: [
      ['这/S 本 书 还/ADV 没/ADV *被*/BA 翻译/V 成/C 中文 。', "This book hasn't been translated into Chinese yet."],
      ['我/S 的 自行车 又/ADV *被*/BA 偷/V 了/SF 。', 'My bike has been stolen again.'],
      ['小偷/S 已经/ADV *被*/BA 警察 抓/V 住/C 了/SF 。', 'The thief has already been caught by the police.'],
      ['你/S 别/ADV *被*/BA 他 骗/V 了/SF 。', "Don't let him fool you."],
      ['他/S 没/ADV *被*/BA 车 撞/V 到/C ， 很/ADV 安全/V 。', "He wasn't hit by the car — he's safe."],
      ['蛋糕/S 已经/ADV *被*/BA 吃/V 光/C 了/SF 。', 'The cake has already all been eaten.'],
      ['那/S 个 孩子 没/ADV *被*/BA 批评/V 。', "That child wasn't told off."],
      ['信/S 已经/ADV *被*/BA 寄/V 走/C 了/SF 。', 'The letter has already been posted.'],
    ],
    decoys: [['不', 'ASPECT.NEG_BU_MEI', 'Something that didn’t happen is negated with 没, before 被.']],
  },
  {
    id: 'G3-69', unit: 9, title: 'Notional passive (no 被)', titleZh: '意义被动句',
    summary: 'Things can simply be the subject of a result: 信写好了, 票买到了 — no 被 needed.',
    explanationMd: `
Chinese often makes the *thing* the subject without any passive marker:

- 信写好了 — the letter is written.
- 票买到了 — got the tickets.
- 作业已经交了 — the homework has been handed in.

Use 被 mainly when something unpleasant or noteworthy happened to the subject.`,
    formula: ['S', 'ADV', 'V', 'C', 'SF'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-33'],
    errorCodes: ['COMP.PLACEMENT'],
    examples: [
      ['信/S 写/V *好*/C 了/SF 。', 'The letter is written.'],
      ['饭/S 已经/ADV 做/V *好*/C 了/SF 。', 'The food is ready.'],
      ['作业/S 已经/ADV 交/V *了*/SF 。', 'The homework has been handed in.'],
    ],
    instances: [
      ['衣服/S 洗/V *干净*/C 了/SF 。', 'The clothes are washed clean.'],
      ['票/S 买/V *到*/C 了/SF 。', 'Got the tickets.'],
      ['房间/S 打扫/V *好*/C 了/SF 。', 'The room has been cleaned.'],
      ['菜/S 都/ADV 准备/V *好*/C 了/SF 。', 'The dishes are all ready.'],
      ['电脑/S 修/V *好*/C 了/SF 。', 'The computer has been fixed.'],
      ['这/S 本 书 卖/V *完*/C 了/SF 。', 'This book has sold out.'],
      ['护照/S 带/V *来*/C 了/SF 吗/SF ？', 'Did you bring the passport?'],
      ['饺子/S 包/V *好*/C 了/SF 。', 'The dumplings are made.'],
    ],
  },
  {
    id: 'G3-70', unit: 9, title: '把 ↔ 被', titleZh: '把字句和被字句的转换',
    summary: 'A 把 sentence (doer 把 thing V…) and a 被 sentence (thing 被 doer V…) describe the same event from opposite sides.',
    explanationMd: `
- 我**把**杯子打破了 — I broke the cup (focus on what I did).
- 杯子**被**我打破了 — the cup got broken by me (focus on the cup).

The verb and its result stay the same; the doer and the thing swap places around 把/被.`,
    formula: ['S', 'BA', 'V', 'C', 'SF'],
    constraints: [BEI_BEFORE_V],
    requires: ['G3-57', 'G3-65'],
    contrasts: ['G3-57', 'G3-65'],
    errorCodes: ['BEI.AGENT_ROLE', 'BA.ORDER'],
    examples: [
      ['我/S *把*/BA 杯子 打破/V 了/SF 。', 'I broke the cup.'],
      ['杯子/S *被*/BA 我 打破/V 了/SF 。', 'The cup got broken by me.'],
      ['小偷/S *把*/BA 钱包 偷/V 走/C 了/SF 。', 'The thief stole the wallet.'],
    ],
    instances: [
      ['钱包/S *被*/BA 小偷 偷/V 走/C 了/SF 。', 'The wallet was stolen by the thief.'],
      ['风/S *把*/BA 树叶 吹/V 走/C 了/SF 。', 'The wind blew the leaves away.'],
      ['树叶/S *被*/BA 风 吹/V 走/C 了/SF 。', 'The leaves were blown away by the wind.'],
      ['弟弟/S *把*/BA 蛋糕 吃/V 光/C 了/SF 。', 'My little brother ate up the cake.'],
      ['蛋糕/S *被*/BA 弟弟 吃/V 光/C 了/SF 。', 'The cake was eaten up by my little brother.'],
      ['警察/S *把*/BA 小偷 抓/V 住/C 了/SF 。', 'The police caught the thief.'],
      ['小偷/S *被*/BA 警察 抓/V 住/C 了/SF 。', 'The thief was caught by the police.'],
      ['孩子/S *把*/BA 房间 弄/V 乱/C 了/SF 。', 'The child messed up the room.'],
    ],
    transforms: [
      { subtype: 'voice', inputs: ['小偷 把 钱包 偷 走 了 。'], chip: '被', answer: '钱包/S 被/BA 小偷 偷/V 走/C 了/SF 。', en: 'The wallet was stolen by the thief.', decoys: [NOT_BA] },
      { subtype: 'voice', inputs: ['我 把 杯子 打破 了 。'], chip: '被', answer: '杯子/S 被/BA 我 打破/V 了/SF 。', en: 'The cup got broken by me.', decoys: [NOT_BA] },
      { subtype: 'voice', inputs: ['树叶 被 风 吹 走 了 。'], chip: '把', answer: '风/S 把/BA 树叶 吹/V 走/C 了/SF 。', en: 'The wind blew the leaves away.', decoys: [['被', 'BEI.AGENT_ROLE', 'Now the doer (风) is the subject, so use 把.']] },
    ],
  },
  {
    id: 'G3-71', unit: 9, title: '是…的 (focus on how / when / where)', titleZh: '“是…的”句',
    summary: 'For a past event everyone knows happened, 是…的 spotlights the detail: 我是坐飞机来的.',
    explanationMd: `
**Form:** Subject + **是** + focused detail + V + **的**

- 我**是**坐飞机来**的** — I came *by plane*.
- 你**是**什么时候到**的**？ — *When* did you arrive?
- 他**是**在北京出生**的** — he was born *in Beijing*.

是 can be dropped in speech, but 的 can't. Don't use 了 here.`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [{ kind: 'pair', a: '是', b: '的', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G3-01'],
    errorCodes: ['ASPECT.LE_MISUSE', 'CONJ.PAIR_MISMATCH'],
    examples: [
      ['我/S *是*/ADV 坐/V 飞机 来 *的*/SF 。', 'I came by plane.'],
      ['你/S *是*/ADV 什么/T 时候 到/V *的*/SF ？', 'When did you arrive?'],
      ['他/S *是*/ADV 在/PP 北京 出生/V *的*/SF 。', 'He was born in Beijing.'],
    ],
    instances: [
      ['我/S *是*/ADV 去年/T 毕业/V *的*/SF 。', 'I graduated last year.'],
      ['这/TOP 本 小说 *是*/ADV 他/S 写/V *的*/SF 。', 'He is the one who wrote this novel.'],
      ['你/S *是*/ADV 怎么/ADV 来/V *的*/SF ？', 'How did you get here?'],
      ['我们/S *是*/ADV 在/PP 网上 认识/V *的*/SF 。', 'We met online.'],
      ['他/S *是*/ADV 一/ADV 个 人 来/V *的*/SF 。', 'He came on his own.'],
      ['我/S *是*/ADV 骑/V 自行车 来 *的*/SF 。', 'I came by bike.'],
      ['她/S *是*/ADV 在/PP 中国 留学/V *的*/SF 。', 'She studied abroad in China.'],
      ['你/S *是*/ADV 跟/PP 谁 一起 去/V *的*/SF ？', 'Who did you go with?'],
    ],
    decoys: [['了', 'ASPECT.LE_MISUSE', '是…的 ends in 的, not 了.']],
    cloze: {
      blank: ['的'],
      distractors: [
        ['了', 'ASPECT.LE_MISUSE', '是…的 highlights a detail of a past event; it ends in 的, not 了.'],
        ['得', 'COMP.DE_WRONG', '得 introduces a description after a verb; this frame needs 的.'],
      ],
    },
  },
  {
    id: 'G3-72', unit: 9, title: '连…都 / 也 (even)', titleZh: '连…都／也',
    summary: '连 marks the most surprising case, 都/也 before the verb: 他连一个字都没写.',
    explanationMd: `
**Form:** (S) + **连** + X + **都 / 也** + verb phrase

- 他连一个字**都**没写 — he didn't write even one character.
- 这个问题连老师**都**不知道 — even the teacher doesn't know.

连 + X goes *before* the verb; 都 or 也 must follow it. Often with a negative.`,
    formula: ['S', 'PP', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '连', b: '都', code: 'CONJ.PAIR_MISMATCH' }, { kind: 'before', a: 'PP', b: 'V', code: 'ORDER.ADVERB_POSITION' }],
    requires: ['G12-08'],
    errorCodes: ['CONJ.MISSING_PARTNER', 'CONJ.PAIR_MISMATCH'],
    examples: [
      ['他/S *连*/PP 一 个 字 *都*/ADV 没/ADV 写/V 。', "He didn't write a single character."],
      ['这/TOP 个 问题 *连*/PP 老师 *都*/ADV 不/ADV 知道/V 。', "Even the teacher doesn't know this."],
      ['他/S 太/ADV 累/V 了/SF ， *连*/PP 饭 *都*/ADV 不/ADV 想/MOD 吃/V 。', "He's so tired he doesn't even want to eat."],
    ],
    instances: [
      ['我/S *连*/PP 他 的 名字 *都*/ADV 忘/V 了/SF 。', "I've even forgotten his name."],
      ['*连*/PP 孩子 *都*/ADV 认识/V 这/O 个 字 。', 'Even children know this character.'],
      ['他/S *连*/PP 一 分 钱 *也*/ADV 没有/V 。', "He hasn't got a single cent."],
      ['她/S *连*/PP 早饭 *都*/ADV 没/ADV 吃/V 就/ADV 走/V 了/SF 。', 'She left without even having breakfast.'],
      ['今天/T 太/ADV 冷/V 了/SF ， *连*/PP 狗 *都*/ADV 不/ADV 想/MOD 出去/V 。', "It's so cold today even the dog doesn't want to go out."],
      ['他/S *连*/PP 一 句 话 *也*/ADV 没/ADV 说/V 。', "He didn't say a single word."],
      ['我/S *连*/PP 一 次 *都*/ADV 没/ADV 去/V 过/ASP 。', "I haven't been even once."],
      ['他/S *连*/PP 周末 *也*/ADV 工作/V 。', 'He even works at weekends.'],
    ],
    cloze: {
      blank: ['都', '也'],
      distractors: [
        ['就', 'CONJ.PAIR_MISMATCH', '连 pairs with 都 or 也, not 就.'],
        ['才', 'CONJ.PAIR_MISMATCH', '连 pairs with 都 or 也, not 才.'],
      ],
    },
  },
];
