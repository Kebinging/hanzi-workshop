import type { PatternSource, Distractor } from './authoring';

// HSK 3 · Unit 5 · 做完了没有？ — Result complements & separable verbs I (provisional).

const RESULT: Distractor[] = [
  ['完', 'COMP.RESULT_CHOICE', '完 means finished; check what result the sentence needs.'],
];

export const patternsU05: PatternSource[] = [
  {
    id: 'G3-33', unit: 5, title: 'V + 完 / 好 (finish)', titleZh: '结果补语：完／好',
    summary: '完 = finished; 好 = done and ready / done properly. They attach directly to the verb.',
    explanationMd: `
**Form:** V + **完 / 好** (+ object) + 了

- 我写**完**作业了 — I've finished my homework.
- 饭做**好**了 — dinner is ready (done properly).

The result sticks to the verb; the object comes after it. Negative: 没 + V + 完/好 (no 了).`,
    formula: ['S', 'V', 'C', 'O', 'SF'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }, { kind: 'before', a: 'C', b: 'O', code: 'COMP.PLACEMENT' }],
    requires: ['G3-02'],
    contrasts: ['G3-34', 'G3-35'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.RESULT_CHOICE'],
    examples: [
      ['我/S 写/V *完*/C 作业/O 了/SF 。', "I've finished my homework."],
      ['饭/S 做/V *好*/C 了/SF 。', 'The food is ready.'],
      ['你/S 看/V *完*/C 这/O 本 书 了/SF 吗/SF ？', 'Have you finished this book?'],
    ],
    instances: [
      ['我/S 吃/V *完*/C 了/SF 。', "I've finished eating."],
      ['他/S 已经/ADV 准备/V *好*/C 了/SF 。', "He's all ready."],
      ['会议/S 开/V *完*/C 了/SF 。', 'The meeting is over.'],
      ['衣服/S 洗/V *好*/C 了/SF 。', 'The washing is done.'],
      ['我/S 还/ADV 没/ADV 写/V *完*/C 作文/O 。', "I still haven't finished my essay."],
      ['你/S 用/V *完*/C 电脑/O 了/SF 吗/SF ？', 'Have you finished with the computer?'],
      ['我们/S 收拾/V *好*/C 房间/O 了/SF 。', "We've tidied the room."],
      ['他/S 说/V *完*/C 就/ADV 走/V 了/SF 。', 'He left as soon as he finished speaking.'],
    ],
    decoys: [['过', 'ASPECT.GUO_MISUSE', '过 is about experience; finishing an action takes a result complement (完/好).']],
    cloze: {
      blank: ['完', '好'],
      distractors: [
        ['着', 'ASPECT.ZHE_MISUSE', '着 marks an ongoing state; finishing needs a result like 完 or 好.'],
        ['地', 'COMP.DE_WRONG', '地 goes before a verb, never right after it.'],
      ],
    },
  },
  {
    id: 'G3-34', unit: 5, title: 'V + 到 / 见 (succeed in, perceive)', titleZh: '结果补语：到／见',
    summary: '到 = manage to get/reach (找到, 买到, 收到); 见 = perceive (看见, 听见).',
    explanationMd: `
- **到** marks success in reaching a goal: 找**到**钥匙 (found the key), 买**到**机票, 收**到**邮件.
- **见** marks perceiving: 看**见** (see), 听**见** (hear).

Compare: 找 = look for, 找到 = find. 看 = look, 看见 = see.`,
    formula: ['S', 'V', 'C', 'O', 'SF'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-33'],
    contrasts: ['G3-33', 'G3-35'],
    errorCodes: ['COMP.RESULT_CHOICE', 'COMP.PLACEMENT'],
    examples: [
      ['我/S 找/V *到*/C 钥匙/O 了/SF 。', "I've found the key."],
      ['你/S 看/V *见*/C 我/O 的 手机 了/SF 吗/SF ？', 'Have you seen my phone?'],
      ['我/S 听/V *见*/C 有/O 人 叫 我 。', 'I heard someone call me.'],
    ],
    instances: [
      ['我/S 没/ADV 找/V *到*/C 他/O 。', "I couldn't find him."],
      ['你/S 收/V *到*/C 我/O 的 电子邮件 了/SF 吗/SF ？', 'Did you get my email?'],
      ['我/S 在/PP 路上 看/V *见*/C 了/ASP 我/O 的 老师 。', 'I saw my teacher on the way.'],
      ['他/S 买/V *到*/C 机票/O 了/SF 。', 'He managed to get a plane ticket.'],
      ['我/S 没/ADV 听/V *见*/C 你/O 说 的 话 。', "I didn't hear what you said."],
      ['妈妈/S 在/PP 超市 买/V *到*/C 了/ASP 新鲜/O 的 鱼 。', 'Mum got fresh fish at the supermarket.'],
      ['他/S 找/V *到*/C 工作/O 了/SF 。', "He's found a job."],
      ['我/S 看/V *见*/C 他/O 进/V 了/ASP 教室/O 。', 'I saw him go into the classroom.'],
    ],
    decoys: RESULT,
    cloze: {
      blank: ['到', '见'],
      distractors: [
        ['懂', 'COMP.RESULT_CHOICE', '懂 means understood — not found, got, or perceived.'],
        ['会', 'COMP.RESULT_CHOICE', '会 as a result means "have learned (a skill)", as in 学会.'],
      ],
    },
  },
  {
    id: 'G3-35', unit: 5, title: 'V + 懂 / 会 / 对 / 错', titleZh: '结果补语：懂／会／对／错',
    summary: '懂 = understood, 会 = learned (a skill), 对 = right, 错 = wrong — results attached to the verb.',
    explanationMd: `
- 听**懂** / 看**懂** — understand by listening / reading.
- 学**会** — learn to do (a skill): 学会游泳.
- 说**对** / 做**对** — get it right; 写**错** / 打**错** — get it wrong.

Negative: 没听懂, 没学会 — with 没, never 不 (for something that didn't happen).`,
    formula: ['S', 'V', 'C', 'O', 'SF'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-33'],
    contrasts: ['G3-34'],
    errorCodes: ['COMP.RESULT_CHOICE', 'COMP.PLACEMENT'],
    examples: [
      ['我/S 听/V *懂*/C 了/SF 。', 'I understood.'],
      ['他/S 学/V *会*/C 了/ASP 游泳/O 。', "He's learned to swim."],
      ['你/S 写/V *错*/C 了/SF 。', "You've written it wrong."],
    ],
    instances: [
      ['这/TOP 个 句子 我/S 没/ADV 看/V *懂*/C 。', "I didn't understand this sentence."],
      ['你/S 说/V *对*/C 了/SF 。', "You're right."],
      ['我/S 做/V *错*/C 了/ASP 两/O 个 题 。', 'I got two questions wrong.'],
      ['他/S 听/V *懂*/C 老师/O 的 话 了/SF 。', 'He understood what the teacher said.'],
      ['我/S 已经/ADV 学/V *会*/C 开车/O 了/SF 。', "I've already learned to drive."],
      ['你/S 回答/V *对*/C 了/SF 。', 'You answered correctly.'],
      ['我/S 打/V *错*/C 电话/O 了/SF 。', 'I dialled the wrong number.'],
      ['你/S 看/V *懂*/C 这/O 个 字 了/SF 吗/SF ？', 'Did you understand this character?'],
    ],
    decoys: RESULT,
  },
  {
    id: 'G3-36', unit: 5, title: 'V + 住 / 清楚 / 干净', titleZh: '结果补语：住／清楚／干净',
    summary: '住 = fixed in place (记住 remember firmly); adjectives as results: 说清楚, 洗干净.',
    explanationMd: `
- **住**: holds firm — 记**住** (commit to memory), 站**住** (stand still).
- An **adjective** can be the result: 说**清楚** (say clearly), 洗**干净** (wash clean), 看**清楚** (see clearly).

Compare with 得 (G3-25): 洗干净了 reports the result; 洗得很干净 describes how well.`,
    formula: ['S', 'V', 'C', 'O', 'SF'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-33'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.DE_WRONG'],
    examples: [
      ['我/S 记/V *住*/C 了/SF 。', "I've got it memorised."],
      ['请/MOD 你/S 说/V *清楚*/C 一点儿/C 。', 'Please say it a bit more clearly.'],
      ['衣服/S 洗/V *干净*/C 了/SF 。', 'The clothes are washed clean.'],
    ],
    instances: [
      ['你/S 要/MOD 记/V *住*/C 这/O 个 地址 。', 'You must remember this address.'],
      ['我/S 没/ADV 看/V *清楚*/C 。', "I didn't see it clearly."],
      ['桌子/S 擦/V *干净*/C 了/SF 吗/SF ？', 'Has the table been wiped clean?'],
      ['这/TOP 些 生词 你/S 都/ADV 记/V *住*/C 了/SF 吗/SF ？', 'Have you memorised all these new words?'],
      ['我/S 没/ADV 听/V *清楚*/C ， 请/MOD 再/ADV 说/V 一/C 遍 。', "I didn't hear clearly — please say it again."],
      ['盘子/S 洗/V *干净*/C 了/SF 。', 'The plates are washed clean.'],
      ['你/S 写/V *清楚*/C 你/O 的 名字 。', 'Write your name clearly.'],
      ['房间/S 打扫/V *干净*/C 了/SF 。', 'The room has been cleaned.'],
    ],
    decoys: [['得', 'COMP.DE_WRONG', '得 would introduce a description (洗得很干净); the prompt reports the result.']],
  },
  {
    id: 'G3-37', unit: 5, title: 'V + 在 / 到 / 给 + place or person', titleZh: '结果补语：在／到／给',
    summary: 'V在 = ends up at a place; V到 = reaches a place/point; V给 = goes to a person.',
    explanationMd: `
- **V + 在 + place** — where something ends up / stays: 住在北京, 放在桌子上, 停在门口.
- **V + 到 + place** — arriving at: 走到门口, 跑到教室.
- **V + 给 + person** — handing over: 送给她, 还给我, 借给他.

These phrases come **after** the verb (unlike 在-phrases for where an action happens, which go before).`,
    formula: ['S', 'V', 'C', 'O'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G12-01'],
    errorCodes: ['COMP.PLACEMENT', 'LEX.COLLOCATION'],
    examples: [
      ['我/S 住/V *在*/C 北京 。', 'I live in Beijing.', { alts: ['我在北京住'] }],
      ['他/S 走/V *到*/C 门口 了/SF 。', "He's walked to the door."],
      ['我/S 送/V *给*/C 她 一/O 本 书 。', 'I gave her a book.'],
    ],
    instances: [
      ['你/S 坐/V *在*/C 这儿 吧/SF 。', 'Sit here.', { alts: ['你在这儿坐吧'] }],
      ['书/S 放/V *在*/C 桌子 上 了/SF 。', 'The book has been put on the table.'],
      ['我/S 发/V *给*/C 你 一/O 个 电子邮件 。', "I'll send you an email."],
      ['他/S 跑/V *到*/C 教室 了/SF 。', 'He ran to the classroom.'],
      ['钥匙/S 丢/V *在*/C 哪儿 了/SF ？', 'Where did the key get lost?'],
      ['请/MOD 你/S 还@huan2/V *给*/C 我 。', 'Please give it back to me.'],
      ['车/S 停/V *在*/C 银行 门口 。', 'The car is parked outside the bank.'],
      ['我/S 借/V *给*/C 他 两/O 本 书 。', 'I lent him two books.'],
    ],
    decoys: [
      ['在', 'LEX.COLLOCATION', '在 = stays at a place; check whether it should be 到 (arrives) or 给 (to a person).'],
      ['到', 'LEX.COLLOCATION', '到 = arrives at; check whether it should be 在 (stays) or 给 (to a person).'],
      ['给', 'LEX.COLLOCATION', '给 = handed to a person; check whether it should be 在 or 到.'],
    ],
  },
  {
    id: 'G3-38', unit: 5, title: '没 + V + result (didn’t manage)', titleZh: '结果补语的否定：没＋动词＋结果',
    summary: 'A result that didn’t happen is negated with 没 before the verb, and 了 drops: 我没听懂.',
    explanationMd: `
**Form:** 没(有) + V + result (+ object)

- 我**没**听懂 — I didn't understand.
- 他**没**找到钥匙 — he didn't find the key.

✗ 我不听懂 — 不 is for habits/intentions, not results. ✗ 我没听懂了 — 了 disappears after 没.`,
    formula: ['S', 'ADV', 'V', 'C', 'O'],
    constraints: [{ kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' }],
    requires: ['G3-33', 'G12-08'],
    errorCodes: ['ASPECT.NEG_BU_MEI', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['我/S *没*/ADV 听/V 懂/C 。', "I didn't understand."],
      ['他/S *没*/ADV 找/V 到/C 钥匙/O 。', "He didn't find the key."],
      ['我/S 还/ADV *没*/ADV 写/V 完/C 作业/O 。', "I haven't finished my homework yet."],
    ],
    instances: [
      ['我/S *没*/ADV 看/V 见/C 你/O 。', "I didn't see you."],
      ['他/S *没*/ADV 买/V 到/C 机票/O 。', "He didn't manage to get a plane ticket."],
      ['衣服/S 还/ADV *没*/ADV 洗/V 干净/C 。', "The clothes aren't clean yet."],
      ['我/S *没*/ADV 记/V 住/C 他/O 的 名字 。', "I didn't remember his name."],
      ['这/TOP 个 句子 我/S *没*/ADV 翻译/V 对/C 。', "I didn't translate this sentence correctly."],
      ['饭/S 还/ADV *没*/ADV 做/V 好/C 。', "The food isn't ready yet."],
      ['我/S *没*/ADV 收/V 到/C 你/O 的 电子邮件 。', "I didn't get your email."],
      ['他/S *没*/ADV 学/V 会/C 开车/O 。', "He didn't learn to drive."],
    ],
    decoys: [
      ['不', 'ASPECT.NEG_BU_MEI', 'A result that didn’t happen is negated with 没, not 不.'],
      ['了', 'ASPECT.NEG_BU_MEI', 'After 没 the 了 disappears.'],
    ],
    cloze: {
      blank: ['没'],
      distractors: [
        ['不', 'ASPECT.NEG_BU_MEI', '不 can’t negate a result that didn’t happen; use 没.'],
        ['别', 'LEX.NEAR_SYNONYM', '别 means "don’t" — a command, not a report of what happened.'],
      ],
    },
  },
  {
    id: 'G3-39', unit: 5, title: 'V + 成 (into, become)', titleZh: '结果补语：成',
    summary: '成 marks what something turns into or is changed to: 翻译成中文, 改成明天.',
    explanationMd: `
**Form:** V + **成** + result

- 翻译**成**英语 — translate into English.
- 会议改**成**明天了 — the meeting has been moved to tomorrow.
- 换**成**那个房间 — switch to that room.

Unit 8 will use this a lot with 把 (把美元换成人民币).`,
    formula: ['S', 'V', 'C', 'SF'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-33'],
    errorCodes: ['COMP.RESULT_CHOICE', 'COMP.PLACEMENT'],
    examples: [
      ['这/S 本 书 已经/ADV 翻译/V *成*/C 中文 了/SF 。', 'This book has already been translated into Chinese.'],
      ['请/MOD 你/S 翻译/V *成*/C 英语 。', 'Please translate it into English.'],
      ['会议/S 改/V *成*/C 明天 了/SF 。', 'The meeting has been moved to tomorrow.'],
    ],
    instances: [
      ['这/S 个 句子 翻译/V *成*/C 英语 是/V 什么/O ？', 'What is this sentence in English?'],
      ['我/S 想/MOD 换/V *成*/C 那/O 个 房间 。', "I'd like to switch to that room."],
      ['他/S 想/MOD 改/V *成*/C 明天 去/V 。', 'He wants to change it to going tomorrow.'],
      ['晚饭/S 改/V *成*/C 七 点 了/SF 。', 'Dinner has been moved to seven.'],
      ['这/TOP 个 菜 我/S 想/MOD 换/V *成*/C 鱼 。', "I'd like to swap this dish for fish."],
      ['这/S 件 衣服 能/MOD 换/V *成*/C 大/O 一点儿 的 吗/SF ？', 'Can I exchange this for a bigger one?'],
      ['我们/S 的 计划 改/V *成*/C 下/O 个 星期 了/SF 。', 'Our plan has been moved to next week.'],
      ['这/S 张 照片 能/MOD 打印/V *成*/C 大/O 一点儿 的 吗/SF ？', 'Can this photo be printed bigger?'],
    ],
    decoys: [['到', 'COMP.RESULT_CHOICE', '到 marks reaching a place or point; turning into something is 成.']],
  },
  {
    id: 'G3-40', unit: 5, title: 'Separable verbs I: 见面, 帮忙, 睡觉…', titleZh: '离合词（一）',
    summary: 'Verb-object words split: aspect, counts and objects go in the middle — 见了一次面, 帮我一个忙.',
    explanationMd: `
Words like 见面, 帮忙, 睡觉, 跑步, 聊天, 洗澡, 照相, 理发 are really **verb + object**. Extra pieces go **between** the halves:

- aspect: 见**过**面, 洗了个澡
- counts / duration: 见了**一次**面, 睡了**八个小时的**觉
- the person helped: 帮**我的 / 我一个**忙

✗ 见面了一次, ✗ 帮忙我 — nothing can follow the whole word as an object.`,
    formula: ['S', 'V', 'ASP', 'C', 'O'],
    constraints: [
      { kind: 'before', a: 'ASP', b: 'O', code: 'SEP.ASPECT_POSITION' },
      { kind: 'before', a: 'C', b: 'O', code: 'SEP.ASPECT_POSITION' },
      { kind: 'before', a: 'V', b: 'O', code: 'SEP.OBJECT_AFTER' },
    ],
    requires: ['G3-01', 'G3-14'],
    errorCodes: ['SEP.ASPECT_POSITION', 'SEP.OBJECT_AFTER'],
    examples: [
      ['我们/S 见/V 过/ASP 一/C 次 面@jianmian=miàn/O 。', "We've met once."],
      ['你/S 能/MOD 帮/V 我/O 一/O 个 忙@bangmang=máng 吗/SF ？', 'Could you do me a favour?'],
      ['昨天/T 我/S 睡/V 了/ASP 十/C 个 小时 的 觉@shuijiao=jiào 。', 'I slept for ten hours yesterday.'],
    ],
    instances: [
      ['我/S 每/T 天 早上 跑/V 一/C 个 小时 的 步@paobu=bù 。', 'I go running for an hour every morning.'],
      ['我们/S 聊@liaotian=liáo/V 了/ASP 一会儿/C 天@liaotian=tiān/O 。', 'We chatted for a while.'],
      ['他/S 洗/V 了/ASP 个/C 澡@xizao=zǎo/O 就/ADV 睡觉/V 了/SF 。', 'He had a shower and went to bed.'],
      ['我/S 想/MOD 跟/PP 你 见/V 个/C 面@jianmian=miàn/O 。', "I'd like to meet up with you."],
      ['他/S 帮/V 了/ASP 我/O 很/O 多 忙@bangmang=máng 。', 'He helped me a lot.'],
      ['我/S 昨天/T 理@lifa=lǐ/V 了/ASP 发@lifa=fà/O 。', 'I got a haircut yesterday.'],
      ['我们/S 照@zhaoxiang=zhào/V 了/ASP 几/C 张 相@zhaoxiang=xiàng/O 。', 'We took a few photos.'],
      ['我/S 跟/PP 他 见/V 过/ASP 面@jianmian=miàn/O 。', "I've met him."],
    ],
    transforms: [
      { subtype: 'rewrite', inputs: ['我们 见面 了 。', '一 次'], chip: '见…面 (split it)', answer: '我们/S 见/V 了/ASP 一/C 次 面@jianmian=miàn/O 。', en: 'We met once.' },
    ],
  },
];
