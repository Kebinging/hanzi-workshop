import type { PatternSource } from './authoring';

// HSK 4 · Unit 2 (unit 14) · 人际 People — Concession & condition II (provisional).

export const patternsU14: PatternSource[] = [
  {
    id: 'G4-07', unit: 14, title: '即使 … 也 … (even if)', titleZh: '即使…也…',
    summary: '即使 sets up a hypothetical; 也 says the result holds anyway.',
    explanationMd: `
**Form:** **即使** + condition，(Subject) + **也** + result.

即使下雨，我们也要去 — "even if it rains, we're still going". The condition is imagined (or treated as if it were); the main clause doesn't change.

- 也 goes **after** the second subject, before the verb: 我也不原谅他.
- Compare **虽然…但是** (a real fact) and **既然…就** (G4-09, a known fact leading to a conclusion).`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '即使', b: '也', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G3-81'],
    contrasts: ['G4-09', 'G4-10'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*即使*/CONJ1 下雨/V ， 我们/S *也*/ADV 要/MOD 去/V 。', "Even if it rains, we're going."],
      ['*即使*/CONJ1 他/S 道歉/V ， 我/S *也*/ADV 不/ADV 原谅/V 他/O 。', "Even if he apologises, I won't forgive him."],
      ['*即使*/CONJ1 很/ADV 累/V ， 她/S *也*/ADV 坚持/V 锻炼/O 。', 'Even when she is tired, she keeps up her exercise.'],
    ],
    instances: [
      ['*即使*/CONJ1 工资/S 不/ADV 高/V ， 我/S *也*/ADV 想/MOD 做/V 这/O 个 工作 。', "Even if the pay isn't high, I want this job."],
      ['*即使*/CONJ1 你/S 不/ADV 说/V ， 我/S *也*/ADV 知道/V 。', "Even if you don't say it, I know."],
      ['*即使*/CONJ1 我们/S 吵架/V 了/SF ， 我/S *也*/ADV 信任/V 你/O 。', 'Even when we quarrel, I trust you.'],
      ['*即使*/CONJ1 是/V 好/O 朋友 ， *也*/ADV 要/MOD 尊重/V 对方/O 。', 'Even good friends have to respect each other.'],
      ['*即使*/CONJ1 他/S 拒绝/V ， 你/S *也*/ADV 别/ADV 生气/V 。', "Even if he says no, don't be cross."],
      ['*即使*/CONJ1 父母/S 不/ADV 同意/V ， 他/S *也*/ADV 要/MOD 去/V 。', "Even if his parents don't agree, he's going."],
      ['*即使*/CONJ1 很/ADV 忙/V ， 他/S *也*/ADV 每/T 天 陪/V 母亲/O 散步/V 。', 'Even when he is busy, he walks with his mother every day.'],
      ['*即使*/CONJ1 有/V 误会/O ， 我们/S *也*/ADV 能/MOD 解决/V 。', 'Even if there is a misunderstanding, we can sort it out.'],
      ['*即使*/CONJ1 你/S 开玩笑/V ， *也*/ADV 不/ADV 能/MOD 这么/ADV 说/V 。', "Even as a joke, you can't say that."],
      ['*即使*/CONJ1 他/S 很/ADV 骄傲/V ， 大家/S *也*/ADV 喜欢/V 他/O 。', "Even though he's a bit proud, everyone likes him."],
      ['*即使*/CONJ1 是/V 陌生/O 人 ， 你/S *也*/ADV 要/MOD 有/V 礼貌/O 。', 'Even with strangers, you should be polite.'],
      ['*即使*/CONJ1 失败/V 了/SF ， 你/S *也*/ADV 不/ADV 要/MOD 放弃/V 。', "Even if you fail, don't give up."],
      ['*即使*/CONJ1 他/S 不/ADV 邀请/V 我/O ， 我/S *也*/ADV 会/MOD 去/V 。', "Even if he doesn't invite me, I'll go."],
      ['*即使*/CONJ1 你/S 是/V 对/O 的 ， *也*/ADV 应该/MOD 耐心/V 一点儿/C 。', "Even if you're right, you should be a bit more patient."],
      ['*即使*/CONJ1 他/S 是/V 你/O 的 父亲 ， *也*/ADV 不/ADV 一定/ADV 理解/V 你/O 。', "Even your father won't necessarily understand you."],
    ],
    decoys: [['就', 'CONJ.PAIR_MISMATCH', '即使 pairs with 也, not 就.']],
    cloze: {
      blank: ['即使'],
      distractors: [
        ['因为', 'CONJ.PAIR_MISMATCH', '因为 gives a reason and pairs with 所以; "even if … still" is 即使 … 也.'],
        ['只有', 'CONJ.CONDITION_LOGIC', '只有 "only if" pairs with 才, not 也.'],
      ],
    },
  },
  {
    id: 'G4-08', unit: 14, title: '无论 / 不管 … 都 … (no matter)', titleZh: '无论／不管…都…',
    summary: '无论 / 不管 + a question word or A不A covers every case; 都 (或 也) says the result is the same.',
    explanationMd: `
**Form:** **无论 / 不管** + question word / A不A / A还是B，(Subject) + **都 / 也** + result.

不管你同意不同意，我都要去 — "whether you agree or not, I'm going".

- The first clause must contain a **choice**: 什么, 谁, 怎么, 多么, 哪儿, 去不去, 朋友还是同事 … ✗ 无论他同意，…
- 无论 is a little more formal than 不管.
- 都 / 也 goes after the second subject.`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [
      { kind: 'pair', a: '无论', b: '都', code: 'CONJ.PAIR_MISMATCH' },
      { kind: 'pair', a: '不管', b: '都', code: 'CONJ.PAIR_MISMATCH' },
    ],
    requires: ['G3-78'],
    contrasts: ['G4-07'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['*无论*/CONJ1 多么/ADV 忙/V ， 他/S *都*/ADV 给/PP 母亲 打/V 电话/O 。', 'However busy he is, he rings his mother.'],
      ['*不管*/CONJ1 你/S 同意/V 不 同意 ， 我/S *都*/ADV 要/MOD 去/V 。', "Whether you agree or not, I'm going."],
      ['*无论*/CONJ1 谁/S 来/V ， 我/S *都*/ADV 不/ADV 开/V 门/O 。', "Whoever comes, I won't open the door."],
    ],
    instances: [
      ['*不管*/CONJ1 天气/S 怎么样/V ， 我们/S *都*/ADV 去/V 爬山/O 。', "Whatever the weather, we're going hiking."],
      ['*无论*/CONJ1 有/V 什么/O 问题 ， 你/S *都*/ADV 可以/MOD 找/V 我/O 。', 'Whatever the problem, you can come to me.'],
      ['*不管*/CONJ1 他/S 说/V 什么/O ， 你/S *都*/ADV 别/ADV 相信/V 。', "Whatever he says, don't believe it."],
      ['*无论*/CONJ1 多/ADV 晚/V ， 我/S *都*/ADV 等/V 你/O 。', "However late it is, I'll wait for you."],
      ['*不管*/CONJ1 是/V 朋友/O 还是 同事 ， 他/S *都*/ADV 很/ADV 热情/V 。', "Friend or colleague, he's warm to everyone."],
      ['*无论*/CONJ1 去/V 哪儿/O ， 她/S *都*/ADV 带/V 着/ASP 这/O 本 书 。', 'Wherever she goes, she takes this book.'],
      ['*不管*/CONJ1 你/S 怎么/ADV 道歉/V ， 她/S *都*/ADV 不/ADV 原谅/V 你/O 。', "However you apologise, she won't forgive you."],
      ['*无论*/CONJ1 年龄/S 大 小 ， 大家/S *都*/ADV 喜欢/V 他/O 。', 'Young or old, everyone likes him.'],
      ['*不管*/CONJ1 多么/ADV 生气/V ， 你们/S *都*/ADV 不/ADV 要/MOD 吵架/V 。', "However angry you are, don't quarrel."],
      ['*无论*/CONJ1 他/S 去/V 不 去 ， 我/S *都*/ADV 去/V 。', "Whether he goes or not, I'm going."],
      ['*不管*/CONJ1 父亲/S 怎么/ADV 说/V ， 他/S *都*/ADV 不/ADV 答应/V 。', "Whatever his father says, he won't agree."],
      ['*无论*/CONJ1 什么/T 时候 ， 你/S *都*/ADV 要/MOD 诚实/V 。', 'Always be honest, whatever the moment.'],
      ['*不管*/CONJ1 熟悉/V 不 熟悉 ， 他/S *都*/ADV 很/ADV 有/V 礼貌/O 。', "Whether he knows you or not, he's very polite."],
      ['*无论*/CONJ1 你/S 做/V 什么/O ， 父母/S *都*/ADV 会/MOD 支持/V 你/O 。', 'Whatever you do, your parents will support you.'],
      ['*不管*/CONJ1 谁/S 对 谁 错 ， 你们/S *都*/ADV 应该/MOD 互相/ADV 理解/V 。', "Whoever is right, you should try to understand each other."],
    ],
    decoys: [['就', 'CONJ.PAIR_MISMATCH', '无论 / 不管 pair with 都 or 也, not 就.']],
    cloze: {
      blank: ['无论', '不管'],
      distractors: [
        ['虽然', 'CONJ.PAIR_MISMATCH', '虽然 introduces one real fact and pairs with 但是; "no matter …" needs 无论 / 不管 + a choice + 都.'],
        ['如果', 'CONJ.PAIR_MISMATCH', '如果 pairs with 就 and takes one condition, not a choice.'],
      ],
    },
  },
  {
    id: 'G4-09', unit: 14, title: '既然 … 就 … (since, now that)', titleZh: '既然…就…',
    summary: '既然 starts from a fact both people accept; 就 draws the conclusion (often advice).',
    explanationMd: `
**Form:** **既然** + known fact，(Subject) + **就** + conclusion.

既然你答应了，就要做到 — "since you've promised, you have to do it". The first clause is already true; the second is what follows from it, often a suggestion with 吧 or a 要 / 应该.

Compare:
- **因为…所以** — explains a cause (neutral report).
- **即使…也** (G4-07) — a hypothetical "even if".`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '既然', b: '就', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G3-83'],
    contrasts: ['G4-07', 'G3-83'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*既然*/CONJ1 你/S 答应/V 了/SF ， *就*/ADV 要/MOD 做/V 到/C 。', "Since you've promised, you have to do it."],
      ['*既然*/CONJ1 他/S 道歉/V 了/SF ， 你/S *就*/ADV 原谅/V 他/O 吧/SF 。', "He's apologised, so forgive him."],
      ['*既然*/CONJ1 你/S 不/ADV 舒服/V ， *就*/ADV 早/ADV 一点儿 回/V 家/O 吧/SF 。', "Since you're not well, go home early."],
    ],
    instances: [
      ['*既然*/CONJ1 大家/S 都/ADV 同意/V ， 我们/S *就*/ADV 这么/ADV 做/V 吧/SF 。', "Since everyone agrees, let's do it this way."],
      ['*既然*/CONJ1 你/S 不/ADV 喜欢/V 他/O ， *就*/ADV 别/ADV 陪/V 他/O 了/SF 。', "If you don't like him, stop keeping him company."],
      ['*既然*/CONJ1 来/V 了/SF ， *就*/ADV 多/ADV 住/V 几/C 天 吧/SF 。', "Now that you're here, stay a few more days."],
      ['*既然*/CONJ1 是/V 误会/O ， 你们/S *就*/ADV 别/ADV 吵架/V 了/SF 。', "Since it was a misunderstanding, stop arguing."],
      ['*既然*/CONJ1 你/S 很/ADV 自信/V ， *就*/ADV 去/V 试/V 一下/C 吧/SF 。', "Since you're so confident, go and give it a try."],
      ['*既然*/CONJ1 他/S 拒绝/V 了/SF ， 我们/S *就*/ADV 找/V 别人/O 吧/SF 。', "Since he's said no, let's find someone else."],
      ['*既然*/CONJ1 你/S 熟悉/V 这儿/O ， *就*/ADV 带/V 我们/O 去/V 吧/SF 。', "You know this place, so take us there."],
      ['*既然*/CONJ1 他/S 邀请/V 了/ASP 你/O ， 你/S *就*/ADV 去/V 吧/SF 。', "He's invited you, so go."],
      ['*既然*/CONJ1 你们/S 是/V 好/O 朋友 ， *就*/ADV 应该/MOD 互相/ADV 信任/V 。', "Since you're good friends, you ought to trust each other."],
      ['*既然*/CONJ1 下雨/V 了/SF ， 我们/S *就*/ADV 不/ADV 去/V 了/SF 。', "Since it's raining, we won't go."],
      ['*既然*/CONJ1 你/S 知道/V 错/O 了 ， *就*/ADV 去/V 道歉/V 吧/SF 。', 'Now that you know you were wrong, go and apologise.'],
      ['*既然*/CONJ1 父母/S 支持/V 你/O ， 你/S *就*/ADV 别/ADV 担心/V 了/SF 。', "Your parents support you, so stop worrying."],
      ['*既然*/CONJ1 时间/S 来不及/V 了/SF ， 我们/S *就*/ADV 坐/V 出租车/O 吧/SF 。', "There's no time left, so let's take a taxi."],
      ['*既然*/CONJ1 她/S 害羞/V ， 你/S *就*/ADV 别/ADV 开玩笑/V 了/SF 。', "She's shy, so stop teasing her."],
      ['*既然*/CONJ1 你/S 理解/V 我/O ， *就*/ADV 支持/V 我/O 吧/SF 。', 'Since you understand me, support me.'],
    ],
    decoys: [['也', 'CONJ.PAIR_MISMATCH', '既然 draws a conclusion with 就; 也 belongs to 即使.']],
    cloze: {
      blank: ['既然'],
      distractors: [
        ['即使', 'LEX.NEAR_SYNONYM', '即使 is "even if" and pairs with 也; 既然 starts from a known fact and pairs with 就.'],
        ['虽然', 'CONJ.PAIR_MISMATCH', '虽然 pairs with 但是 / 可是, not 就.'],
      ],
    },
  },
  {
    id: 'G4-10', unit: 14, title: '尽管 … 还是 / 可是 … (although, despite)', titleZh: '尽管…还是／可是…',
    summary: '尽管 states a real fact; the second clause goes against what you would expect from it.',
    explanationMd: `
**Form:** **尽管** + real fact，**可是 / 但是** … or (Subject) + **还是 / 也** + …

尽管天气不好，他们还是出发了 — "although the weather was bad, they still set off".

- Like 虽然 it introduces a **fact**, but sounds a little stronger ("despite the fact that").
- Partners: 可是 / 但是 at the start of the clause, or 还是 / 也 after the subject.
- ✗ 尽管…就: 尽管 never leads to a conclusion.`,
    formula: ['CONJ1', 'S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G3-81'],
    contrasts: ['G4-07', 'G3-81'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*尽管*/CONJ1 他/S 很/ADV 累/V ， *可是*/CONJ2 还/ADV 在/ADV 工作/V 。', "Although he's tired, he's still working."],
      ['*尽管*/CONJ1 我们/S 吵架/V 了/SF ， *但是*/CONJ2 我/S 还/ADV 是/V 他/O 的 朋友 。', "Although we argued, I'm still his friend."],
      ['*尽管*/CONJ1 天气/S 不/ADV 好/V ， 他们/S *还是*/ADV 出发/V 了/SF 。', 'Although the weather was bad, they set off anyway.'],
    ],
    instances: [
      ['*尽管*/CONJ1 他/S 很/ADV 有/V 能力/O ， *可是*/CONJ2 脾气/S 不/ADV 好/V 。', "Although he's very capable, he has a bad temper."],
      ['*尽管*/CONJ1 她/S 很/ADV 害羞/V ， *可是*/CONJ2 她/S 很/ADV 想/MOD 交/V 朋友/O 。', "Although she's shy, she really wants to make friends."],
      ['*尽管*/CONJ1 工资/S 不/ADV 高/V ， 他/S *还是*/ADV 很/ADV 努力/V 。', "Although the pay isn't high, he still works hard."],
      ['*尽管*/CONJ1 我们/S 不/ADV 熟悉/V ， *可是*/CONJ2 他/S 很/ADV 热情/V 。', "Although we don't know each other well, he's very warm."],
      ['*尽管*/CONJ1 他/S 道歉/V 了/SF ， 她/S *还是*/ADV 很/ADV 生气/V 。', "Although he apologised, she's still angry."],
      ['*尽管*/CONJ1 很/ADV 忙/V ， 他/S *还是*/ADV 陪/V 我/O 去/V 了/ASP 医院/O 。', 'Busy as he was, he still went to the hospital with me.'],
      ['*尽管*/CONJ1 他/S 年龄 不/ADV 大/V ， *但是*/CONJ2 很/ADV 有/V 经验/O 。', "Although he's young, he has plenty of experience."],
      ['*尽管*/CONJ1 有/V 很/O 多 矛盾 ， 他们/S *还是*/ADV 结婚/V 了/SF 。', 'Despite all their conflicts, they got married.'],
      ['*尽管*/CONJ1 她/S 拒绝/V 了/ASP 我/O ， *可是*/CONJ2 我/S 不/ADV 失望/V 。', "Although she turned me down, I'm not disappointed."],
      ['*尽管*/CONJ1 他/S 很/ADV 马虎/V ， *可是*/CONJ2 大家/S 都/ADV 喜欢/V 他/O 。', "Although he's careless, everyone likes him."],
      ['*尽管*/CONJ1 是/V 陌生/O 人 ， 她/S *还是*/ADV 帮/V 了/ASP 我/O 。', 'Although I was a stranger, she still helped me.'],
      ['*尽管*/CONJ1 他/S 很/ADV 幽默/V ， *但是*/CONJ2 有时候/T 也/ADV 很/ADV 骄傲/V 。', "Although he's funny, he can be arrogant at times."],
      ['*尽管*/CONJ1 我/S 很/ADV 羡慕/V 他/O ， *可是*/CONJ2 我/S 不/ADV 想/MOD 跟/PP 他 一样/V 。', "Although I envy him, I don't want to be like him."],
      ['*尽管*/CONJ1 外面/S 很/ADV 冷/V ， 孩子/S *还是*/ADV 想/MOD 出去/V 玩/V 。', 'Although it is cold out, the child still wants to go and play.'],
      ['*尽管*/CONJ1 他/S 很/ADV 诚实/V ， *可是*/CONJ2 有时候/T 太/ADV 粗心/V 了/SF 。', "Although he's honest, he's sometimes too careless."],
    ],
    decoys: [['就', 'CONJ.PAIR_MISMATCH', '尽管 sets up a contrast; it never leads to 就.']],
    cloze: {
      blank: ['尽管'],
      distractors: [
        ['既然', 'LEX.NEAR_SYNONYM', '既然 "since" leads to a conclusion with 就; 尽管 sets up a contrast.'],
        ['即使', 'LEX.NEAR_SYNONYM', '即使 is hypothetical ("even if") and pairs with 也; 尽管 states a real fact.'],
      ],
    },
  },
  {
    id: 'G4-11', unit: 14, title: '否则 / 要不然 (otherwise)', titleZh: '“否则”“要不然”',
    summary: '否则 / 要不然 starts the clause saying what happens if the first clause is not done.',
    explanationMd: `
**Form:** advice / necessity，**否则 / 要不然** + bad result.

你快走吧，否则会迟到的 — "hurry up, otherwise you'll be late".

- The first clause is usually advice (要, 得, 应该, 快…吧, 别…).
- 否则 is more formal; 要不然 (要不) is spoken.
- The result often uses **会 … 的** (a likely outcome).`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G3-73'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['你/S 快/ADV 走/V 吧/SF ， *否则*/CONJ2 会/MOD 迟到/V 的/SF 。', "Get going, or you'll be late."],
      ['我们/S 得@dei3/MOD 早/ADV 一点儿 出发/V ， *要不然*/CONJ2 来不及/V 了/SF 。', "We have to leave earlier, or we won't make it."],
      ['你/S 应该/MOD 道歉/V ， *否则*/CONJ2 她/S 不/ADV 会/MOD 原谅/V 你/O 。', "You should apologise, otherwise she won't forgive you."],
    ],
    instances: [
      ['你/S 要/MOD 耐心/V 一点儿/C ， *否则*/CONJ2 孩子/S 会/MOD 害怕/V 。', 'Be more patient, or the child will be frightened.'],
      ['多/ADV 穿/V 一点儿/C ， *要不然*/CONJ2 会/MOD 感冒/V 的/SF 。', "Wrap up, or you'll catch a cold."],
      ['你/S 别/ADV 太/ADV 马虎/V ， *否则*/CONJ2 会/MOD 出/V 错/O 。', "Don't be so careless, or you'll make mistakes."],
      ['我们/S 要/MOD 互相/ADV 信任/V ， *否则*/CONJ2 很/ADV 难/V 做/V 朋友/O 。', "We have to trust each other, otherwise it's hard to be friends."],
      ['快/ADV 给/PP 他 打/V 电话/O ， *要不然*/CONJ2 他/S 会/MOD 担心/V 的/SF 。', "Ring him quickly, or he'll worry."],
      ['你/S 得@dei3/MOD 早/ADV 一点儿 睡觉/V ， *否则*/CONJ2 明天/T 起/V 不 来 。', "You'd better go to bed earlier, or you won't get up tomorrow."],
      ['别/ADV 开玩笑/V 了/SF ， *要不然*/CONJ2 她/S 会/MOD 生气/V 的/SF 。', "Stop joking, or she'll get angry."],
      ['你/S 必须/MOD 诚实/V ， *否则*/CONJ2 大家/S 不/ADV 会/MOD 信任/V 你/O 。', "You have to be honest, or nobody will trust you."],
      ['我们/S 得@dei3/MOD 说/V 清楚/C ， *否则*/CONJ2 会/MOD 有/V 误会/O 。', 'We need to make this clear, or there will be a misunderstanding.'],
      ['你/S 要/MOD 尊重/V 对方/O ， *要不然*/CONJ2 你们/S 会/MOD 吵架/V 。', "You need to respect each other, or you'll fall out."],
      ['我/S 要/MOD 去/V 机场/O 接/V 父亲/O ， *否则*/CONJ2 他/S 不/ADV 知道/V 怎么/ADV 走/V 。', "I have to pick my father up at the airport, otherwise he won't know the way."],
      ['你/S 快/ADV 答应/V 他/O 吧/SF ， *要不然*/CONJ2 他/S 会/MOD 一直/ADV 问/V 。', "Just say yes to him, or he'll keep asking."],
      ['我们/S 要/MOD 按时/ADV 完成/V ， *否则*/CONJ2 经理/S 会/MOD 失望/V 的/SF 。', 'We must finish on time, or the manager will be disappointed.'],
      ['你/S 别/ADV 骄傲/V ， *否则*/CONJ2 会/MOD 失败/V 的/SF 。', "Don't get cocky, or you'll fail."],
      ['我/S 得@dei3/MOD 走/V 了/SF ， *要不然*/CONJ2 母亲/S 会/MOD 着急/V 的/SF 。', "I must go, or my mother will worry."],
    ],
    cloze: {
      blank: ['否则', '要不然'],
      distractors: [
        ['所以', 'LEX.NEAR_SYNONYM', '所以 gives the result of what is true; 否则 says what happens if the advice is NOT followed.'],
        ['而且', 'LEX.NEAR_SYNONYM', '而且 adds a further point; it can’t mean "otherwise".'],
      ],
    },
  },
  {
    id: 'G4-12', unit: 14, title: '除非 … 才 / 否则 … (unless; only if)', titleZh: '除非…才／否则…',
    summary: '除非 names the one condition that would change things: 除非 A，才 B (only if A, B) or 除非 A，否则 不 B (unless A, not B).',
    explanationMd: `
**Two frames:**
- **除非** A，(Subject) + **才** + B — "only if A will B": 除非你道歉，她才会原谅你。
- **除非** A，**否则** + negative — "unless A, not B": 除非父母同意，否则我不去。

Both say A is the *only* way. Compare **只要…就** (A is enough) and **只有…才** (G3-75, very close to 除非…才).`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-75', 'G4-11'],
    contrasts: ['G3-74', 'G3-75'],
    errorCodes: ['CONJ.CONDITION_LOGIC', 'CONJ.PAIR_MISMATCH'],
    examples: [
      ['*除非*/CONJ1 你/S 道歉/V ， 她/S *才*/ADV 会/MOD 原谅/V 你/O 。', "She'll only forgive you if you apologise."],
      ['*除非*/CONJ1 下/V 大 雨 ， *否则*/CONJ2 比赛/S 不/ADV 会/MOD 推迟/V 。', "Unless it pours, the match won't be postponed."],
      ['*除非*/CONJ1 父母/S 同意/V ， *否则*/CONJ2 我/S 不/ADV 去/V 。', "I'm not going unless my parents agree."],
    ],
    instances: [
      ['*除非*/CONJ1 你/S 陪/V 我/O ， 我/S *才*/ADV 去/V 。', "I'll only go if you come with me."],
      ['*除非*/CONJ1 他/S 邀请/V 我/O ， *否则*/CONJ2 我/S 不/ADV 会/MOD 去/V 。', "I won't go unless he invites me."],
      ['*除非*/CONJ1 你/S 很/ADV 诚实/V ， 大家/S *才*/ADV 会/MOD 信任/V 你/O 。', "People will only trust you if you're honest."],
      ['*除非*/CONJ1 他/S 答应/V ， *否则*/CONJ2 我们/S 没有/V 办法/O 。', "Unless he agrees, there's nothing we can do."],
      ['*除非*/CONJ1 工资/S 很/ADV 高/V ， *否则*/CONJ2 我/S 不/ADV 换/V 工作/O 。', "I won't change jobs unless the pay is really good."],
      ['*除非*/CONJ1 你/S 理解/V 他/O ， *才*/ADV 能/MOD 跟/PP 他 做/V 朋友/O 。', "You can only be friends with him if you understand him."],
      ['*除非*/CONJ1 天气/S 好/V ， 我们/S *才*/ADV 去/V 爬山/O 。', "We'll only go hiking if the weather is good."],
      ['*除非*/CONJ1 你/S 主动/ADV 联系/V 他/O ， *否则*/CONJ2 他/S 不/ADV 会/MOD 联系/V 你/O 。', "He won't get in touch unless you do first."],
      ['*除非*/CONJ1 你/S 有/V 耐心/O ， *才*/ADV 能/MOD 教/V 好/C 孩子/O 。', 'Only with patience can you teach children well.'],
      ['*除非*/CONJ1 经理/S 同意/V ， *否则*/CONJ2 我们/S 不/ADV 能/MOD 加班/V 。', "We can't work overtime unless the manager agrees."],
      ['*除非*/CONJ1 他/S 先/ADV 道歉/V ， *否则*/CONJ2 我/S 不/ADV 跟/PP 他 说话/V 。', "I'm not speaking to him unless he apologises first."],
      ['*除非*/CONJ1 你/S 自己 想/V 明白/C ， *否则*/CONJ2 别人/S 说/V 什么/O 都/ADV 没/ADV 用/V 。', "Unless you work it out yourself, nothing anyone says will help."],
      ['*除非*/CONJ1 你/S 告诉/V 我/O ， *否则*/CONJ2 我/S 不/ADV 会/MOD 知道/V 。', "I won't know unless you tell me."],
      ['*除非*/CONJ1 有/V 很/O 重要 的 事情 ， 他/S *才*/ADV 会/MOD 请假/V 。', 'He only takes time off for something really important.'],
      ['*除非*/CONJ1 你/S 尊重/V 别人/O ， 别人/S *才*/ADV 会/MOD 尊重/V 你/O 。', 'Others will only respect you if you respect them.'],
    ],
    cloze: {
      blank: ['除非'],
      distractors: [
        ['只要', 'CONJ.CONDITION_LOGIC', '只要 "as long as" pairs with 就; 除非 "only if / unless" pairs with 才 or 否则.'],
        ['即使', 'LEX.NEAR_SYNONYM', '即使 "even if" pairs with 也.'],
      ],
    },
  },
];
