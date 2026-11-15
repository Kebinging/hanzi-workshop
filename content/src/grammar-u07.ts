import type { PatternSource, Distractor } from './authoring';

// HSK 3 · Unit 7 · 能不能？ — Potential complements & modal verbs (provisional).

const POT: Distractor[] = [
  ['没', 'ASPECT.NEG_BU_MEI', 'Inside a potential complement the negative is 不 (看不懂), never 没.'],
  ['的', 'COMP.DE_WRONG', 'The potential form is V + 得 / 不 + result; 的 can’t do this job.'],
];
const NENG: Distractor = ['能', 'COMP.POTENTIAL_VS_MODAL', '能 goes before the verb; "can / can’t manage to" with a result is V得 / V不 + result.'];

export const patternsU07: PatternSource[] = [
  {
    id: 'G3-49', unit: 7, title: 'V + 得/不 + result (can / can’t manage)', titleZh: '可能补语：结果',
    summary: 'Put 得 or 不 between a verb and its result: 看得懂 = can understand (by reading), 看不懂 = can’t.',
    explanationMd: `
**Form:** V + **得 / 不** + result (+ object)

- 我看**得**懂 — I can understand it (reading).
- 我听**不**懂 — I can't understand (listening).
- 你找**得**到他吗？ — Can you find him?

It's about whether the result *can be achieved*. The negative 不 sits **between** verb and result; 没 is never used here.`,
    formula: ['S', 'V', 'C', 'O'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-35', 'G3-34'],
    contrasts: ['G3-54'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.POTENTIAL_VS_MODAL', 'ASPECT.NEG_BU_MEI'],
    examples: [
      ['这/TOP 本 书 我/S 看/V *得*/C 懂 。', 'I can understand this book.'],
      ['我/S 听/V *不*/C 懂 他/O 说 的 话 。', "I can't understand what he says."],
      ['你/S 找/V *得*/C 到 他/O 吗/SF ？', 'Can you find him?'],
    ],
    instances: [
      ['作业/TOP 太 多 了 ， 今天/T 我/S 写/V *不*/C 完 。', "There's too much homework — I can't finish it today."],
      ['黑板/TOP 上 的 字 你/S 看/V *得*/C 清楚 吗/SF ？', 'Can you see the writing on the board clearly?'],
      ['我/S 记/V *不*/C 住 这么/O 多 生词 。', "I can't remember so many new words."],
      ['没有/V 钥匙/O ， 我/S 打/V *不*/C 开 门/O 。', "Without a key I can't open the door."],
      ['你/S 听/V *得*/C 见 我/O 说话 吗/SF ？', 'Can you hear me?'],
      ['这/S 件 衣服 洗/V *不*/C 干净 了/SF 。', "This piece of clothing won't wash clean any more."],
      ['他/TOP 说 的 普通话 我/S 都/ADV 听/V *得*/C 懂 。', 'I can understand all of his Mandarin.'],
      ['这么/TOP 多 菜 我们/S 吃/V *得*/C 完 吗/SF ？', 'Can we finish all this food?'],
    ],
    decoys: [POT[0], NENG],
    cloze: { blank: ['得', '不'], distractors: POT },
  },
  {
    id: 'G3-50', unit: 7, title: 'V + 得/不 + direction (can / can’t get there)', titleZh: '可能补语：趋向',
    summary: 'Directions take the same 得/不 slot: 上得去 = can get up, 回不来 = can’t come back.',
    explanationMd: `
**Form:** V + **得 / 不** + direction (上来, 进去, 起来…)

- 这座山我爬**得**上去 — I can climb up this mountain.
- 今天晚上我回**不**来了 — I can't come back tonight.
- 箱子太大了，拿**不**进去 — the box is too big to get in.`,
    formula: ['S', 'V', 'C', 'SF'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-49', 'G3-42'],
    errorCodes: ['COMP.PLACEMENT', 'ASPECT.NEG_BU_MEI'],
    examples: [
      ['这/TOP 座 山 我/S 爬/V *得*/C 上去 。', 'I can climb up this mountain.'],
      ['今天/T 晚上 我/S 回/V *不*/C 来 了/SF 。', "I can't come back tonight."],
      ['箱子/S 太/ADV 大/V 了/SF ， 拿/V *不*/C 进去 。', "The box is too big to get in."],
    ],
    instances: [
      ['你/S 站/V *得*/C 起来 吗/SF ？', 'Can you stand up?'],
      ['人/S 太/ADV 多/V 了/SF ， 我们/S 进/V *不*/C 去 。', "There are too many people — we can't get in."],
      ['这么/TOP 重 的 箱子 你/S 搬/V *得*/C 上去 吗/SF ？', 'Can you carry such a heavy box up?'],
      ['他/S 太/ADV 累/V 了/SF ， 站/V *不*/C 起来 了/SF 。', "He's too tired to get up."],
      ['五/T 点 以前 你/S 回/V *得*/C 来 吗/SF ？', 'Can you be back before five?'],
      ['这/S 个 门 太/ADV 小/V 了/SF ， 沙发/S 搬/V *不*/C 进来 。', "This door is too small — the sofa won't come in."],
      ['猫/S 爬/V *得*/C 上去 ， 狗/S 爬/V *不*/C 上去 。', "Cats can climb up; dogs can't."],
      ['桥/S 太/ADV 小/V 了/SF ， 车/S 开/V *不*/C 过去@guoqu_v 。', "The bridge is too small — cars can't get across."],
    ],
    decoys: [POT[0]],
    cloze: { blank: ['得', '不'], distractors: POT },
  },
  {
    id: 'G3-51', unit: 7, title: 'V得了 / V不了 (can / can’t manage at all)', titleZh: '可能补语：V得了／V不了',
    summary: '了 (liǎo) after 得/不 asks whether the action is possible at all: 吃不了 (can’t eat that much), 去不了 (can’t make it).',
    explanationMd: `
**Form:** V + **得了 / 不了** (liǎo)

- 这么多菜我吃**不了** — I can't eat all this.
- 明天我去**不了** — I can't make it tomorrow.
- 你一个人拿**得了**吗？ — Can you carry it on your own?

Here 了 is pronounced **liǎo** and means "manage, cope with".`,
    formula: ['S', 'V', 'C', 'O'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-49'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.POTENTIAL_VS_MODAL'],
    examples: [
      ['这么/TOP 多 菜 我/S 吃/V *不*/C 了@liao3 。', "I can't eat all this food."],
      ['明天/T 我/S 很/ADV 忙/V ， 去/V *不*/C 了@liao3 。', "I'm busy tomorrow — I can't make it."],
      ['你/S 一/ADV 个 人 拿/V *得*/C 了@liao3 吗/SF ？', 'Can you carry it on your own?'],
    ],
    instances: [
      ['我/S 太/ADV 累/V 了/SF ， 走/V *不*/C 了@liao3 了/SF 。', "I'm too tired to walk any more."],
      ['这么/TOP 多 钱 我/S 用/V *不*/C 了@liao3 。', "I can't use this much money."],
      ['他/S 生病/V 了/SF ， 今天/T 来/V *不*/C 了@liao3 了/SF 。', "He's ill and can't come today."],
      ['这/TOP 个 问题 我/S 回答/V *不*/C 了@liao3 。', "I can't answer this question."],
      ['放心/V 吧/SF ， 我/S 忘/V *不*/C 了@liao3 。', "Don't worry, I won't forget."],
      ['十/TOP 个 苹果 你/S 吃/V *得*/C 了@liao3 吗/SF ？', 'Can you eat ten apples?'],
      ['雨/S 太/ADV 大/V 了/SF ， 比赛/S 开始/V *不*/C 了@liao3 了/SF 。', "The rain's too heavy — the match can't start."],
      ['我/S 喝/V *不*/C 了@liao3 这么/O 多 啤酒 。', "I can't drink this much beer."],
    ],
    decoys: [NENG],
  },
  {
    id: 'G3-52', unit: 7, title: 'V得下 / V不下 (room enough)', titleZh: '可能补语：V得下／V不下',
    summary: '下 after 得/不 asks whether there is room: 坐得下 = there’s room to sit, 放不下 = won’t fit.',
    explanationMd: `
**Form:** V + **得下 / 不下** (+ object)

- 这辆车坐**得下**五个人 — this car seats five.
- 这个箱子放**不下**这么多东西 — this box can't hold so much.
- 我吃**不下**了 — I can't eat another bite (no room left).`,
    formula: ['S', 'V', 'C', 'O'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }, { kind: 'before', a: 'C', b: 'O', code: 'COMP.PLACEMENT' }],
    requires: ['G3-49'],
    errorCodes: ['COMP.PLACEMENT'],
    examples: [
      ['这/S 辆 车 坐/V *得*/C 下 五/O 个 人 。', 'This car seats five.'],
      ['我/S 吃/V *不*/C 下 了/SF 。', "I can't eat any more."],
      ['这/S 个 箱子 放/V *不*/C 下 这么/O 多 东西 。', "This box can't hold so many things."],
    ],
    instances: [
      ['房间/S 太/ADV 小/V 了/SF ， 放/V *不*/C 下 床/O 。', "The room's too small for a bed."],
      ['冰箱/S 里 还/ADV 放/V *得*/C 下 吗/SF ？', 'Is there still room in the fridge?'],
      ['这/S 个 教室 坐/V *得*/C 下 %五十/O 个 人 吗/SF ？', 'Can this classroom seat fifty people?'],
      ['我/S 的 书包 装/V *不*/C 下 了/SF 。', "My schoolbag won't hold any more."],
      ['太/ADV 饱/V 了/SF ， 我/S 喝/V *不*/C 下 了/SF 。', "I'm too full — I can't drink any more."],
      ['这/S 张 桌子 坐/V *得*/C 下 六/O 个 人 。', 'This table seats six.'],
      ['行李/S 太/ADV 多/V 了/SF ， 车/S 里 装/V *不*/C 下 。', "Too much luggage — it won't fit in the car."],
      ['钱包/S 里 放/V *不*/C 下 这么/O 多 钱 。', "The wallet can't hold this much money."],
    ],
    decoys: [POT[0]],
  },
  {
    id: 'G3-53', unit: 7, title: 'V不动 / V不起 (too heavy / too expensive)', titleZh: '可能补语：不动／不起',
    summary: '不动 = can’t move it (not strong enough); 不起 = can’t afford it.',
    explanationMd: `
- **V + 不动**: lacking the strength — 搬不动 (can't shift it), 走不动 (can't walk any further).
- **V + 不起**: lacking the money — 买不起 (can't afford), 吃不起.

Positive forms exist too: 拿得动, 买得起.`,
    formula: ['S', 'V', 'C', 'O'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-49'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.POTENTIAL_VS_MODAL'],
    examples: [
      ['我/S 走/V *不*/C 动 了/SF 。', "I can't walk any further."],
      ['这/S 个 箱子 太/ADV 重/V 了/SF ， 我/S 搬/V *不*/C 动 。', "This box is too heavy — I can't move it."],
      ['这么/TOP 贵 的 衣服 我/S 买/V *不*/C 起 。', "I can't afford such expensive clothes."],
    ],
    instances: [
      ['他/S 太/ADV 累/V 了/SF ， 跑/V *不*/C 动 了/SF 。', "He's too tired to keep running."],
      ['你/S 拿/V *得*/C 动 吗/SF ？', 'Can you carry it?'],
      ['我们/S 两 个 人 搬/V *得*/C 动 这/O 张 桌子 。', 'The two of us can move this table.'],
      ['这么/TOP 贵 的 饭店 我/S 吃/V *不*/C 起 。', "I can't afford to eat at such an expensive restaurant."],
      ['我/S 提/V *不*/C 动 这么/O 重 的 行李 。', "I can't carry such heavy luggage."],
      ['他/S 现在/T 买/V *得*/C 起 房子/O 了/SF 。', 'He can afford a house now.'],
      ['奶奶/S 走/V *不*/C 动 了/SF ， 我们/S 休息/V 一下/C 吧/SF 。', "Grandma can't walk any more — let's rest a bit."],
      ['这/TOP 辆 车 我/S 买/V *不*/C 起 。', "I can't afford this car."],
    ],
    decoys: [NENG],
  },
  {
    id: 'G3-54', unit: 7, title: 'Potential complement vs 能', titleZh: '可能补语和“能”',
    summary: 'V不R = can’t manage because of ability or conditions (看不清楚); 不能 = not allowed or not possible as a plan (不能说话).',
    explanationMd: `
- **看不见 / 听不懂 / 搬不动** — you try, but the result doesn't happen (too small, too fast, too heavy).
- **不能** — it isn't allowed, or the circumstances rule it out: 图书馆里不能说话, 我今天不能去.

Requests use 能: 你能帮我吗？ — never ✗ 你帮得了我吗 as a polite request.`,
    formula: ['S', 'MOD', 'V', 'C'],
    constraints: [],
    requires: ['G3-49', 'G12-06'],
    contrasts: ['G3-49', 'G3-55'],
    errorCodes: ['COMP.POTENTIAL_VS_MODAL'],
    examples: [
      ['图书馆/PP 里 不/ADV *能*/MOD 说话/V 。', "You can't talk in the library."],
      ['你/S 明天/T *能*/MOD 来/V 吗/SF ？', 'Can you come tomorrow?'],
      ['我/S 看/V *不*/C 见 ， 你/S 能/MOD 开/V 一下/C 灯/O 吗/SF ？', "I can't see — could you turn on the light?"],
    ],
    instances: [
      ['上课/T 的 时候 不/ADV *能*/MOD 用/V 手机/O 。', "You can't use your phone in class."],
      ['这/S 个 字 太/ADV 小/V 了/SF ， 我/S 看/V *不*/C 清楚 。', "This character is too small — I can't see it clearly."],
      ['你/S *能*/MOD 帮/V 我/O 一下/C 吗/SF ？', 'Could you help me?'],
      ['声音/S 太/ADV 小/V 了/SF ， 我/S 听/V *不*/C 见 。', "The sound is too low — I can't hear."],
      ['我/S 感冒/V 了/SF ， 今天/T 不/ADV *能*/MOD 游泳/V 。', "I've got a cold, so I can't swim today."],
      ['这/S 个 门 我/S 打/V *不*/C 开 。', "I can't open this door."],
      ['没有/V 护照/O ， 你/S 不/ADV *能*/MOD 上/V 飞机/O 。', "You can't board the plane without a passport."],
      ['这么/TOP 多 字 我/S 一/T 天 记/V *不*/C 住 。', "I can't memorise so many characters in a day."],
    ],
  },
  {
    id: 'G3-55', unit: 7, title: '能 / 会 / 可以', titleZh: '“能”“会”“可以”',
    summary: '会 = learned skill or likely future; 能 = able (capacity / circumstances); 可以 = permitted, or an offer.',
    explanationMd: `
- **会** — a learned skill (我会开车) or "will probably" (明天会下雨).
- **能** — capacity or circumstances (他一分钟能写五十个字; 我今天不能去).
- **可以** — permission (这里可以照相吗？) or an offer.

To refuse permission, 不可以 or 不能; to say "can't do (a skill)", 不会.`,
    formula: ['S', 'MOD', 'V', 'O'],
    constraints: [{ kind: 'before', a: 'MOD', b: 'V', code: 'ORDER.MODAL_POSITION' }],
    requires: ['G12-06'],
    contrasts: ['G3-54'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ORDER.MODAL_POSITION'],
    examples: [
      ['我/S *会*/MOD 说/V 汉语/O 。', 'I can speak Chinese.'],
      ['我/S 今天/T 不/ADV *能*/MOD 去/V 。', "I can't go today."],
      ['这里/S *可以*/MOD 照相/V 吗/SF ？', 'Can I take photos here?'],
    ],
    instances: [
      ['你/S *会*/MOD 开车/V 吗/SF ？', 'Can you drive?'],
      ['我/S *可以*/MOD 进来/V 吗/SF ？', 'May I come in?'],
      ['他/S 一/T 分钟 *能*/MOD 写/V %五十/O 个 字 。', 'He can write fifty characters a minute.'],
      ['我/S 不/ADV *会*/MOD 游泳/V 。', "I can't swim."],
      ['你/S 明天/T *能*/MOD 早/ADV 一点儿 来/V 吗/SF ？', 'Can you come a bit earlier tomorrow?'],
      ['上课/T 的 时候 不/ADV *可以*/MOD 吃/V 东西/O 。', "You're not allowed to eat in class."],
      ['我/S 感冒/V 了/SF ， 不/ADV *能*/MOD 去/V 上班 。', "I've got a cold and can't go to work."],
      ['明天/T *会*/MOD 下雨/V 吗/SF ？', 'Will it rain tomorrow?'],
    ],
  },
  {
    id: 'G3-56', unit: 7, title: 'Obligation: 应该 / 得 (děi) / 必须 / 不用 / 不必', titleZh: '应该／得／必须／不用',
    summary: '应该 = should; 得 (děi) = have to (spoken); 必须 = must; 不用 / 不必 = needn’t.',
    explanationMd: `
- **应该** — should, ought to: 你应该多休息.
- **得 (děi)** — have to, everyday speech: 我得走了.
- **必须** — must (rule, strong): 学生必须准时上课.
- **不用 / 不必** — needn't: 你不用来了.

The negative of 必须 / 得 is **不用 / 不必**, not 不必须 or 不得.`,
    formula: ['S', 'MOD', 'V', 'O'],
    constraints: [{ kind: 'before', a: 'MOD', b: 'V', code: 'ORDER.MODAL_POSITION' }],
    requires: ['G3-55'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ORDER.MODAL_POSITION'],
    examples: [
      ['你/S *应该*/MOD 多/ADV 休息/V 。', 'You should rest more.'],
      ['我/S *得@dei3*/MOD 走/V 了/SF 。', 'I have to go.'],
      ['明天/T 你/S *不用*/MOD 来/V 了/SF 。', "You don't need to come tomorrow."],
    ],
    instances: [
      ['学生/S *必须*/MOD 准时/ADV 上课/V 。', 'Students must be on time for class.'],
      ['你/S *应该*/MOD 早/ADV 一点儿 睡觉/V 。', 'You should go to bed a bit earlier.'],
      ['这/T 个 星期 我/S *得@dei3*/MOD 写/V 完/C 作文/O 。', 'I have to finish my essay this week.'],
      ['你/S *不用*/MOD 担心/V ， 我/S 已经/ADV 好/V 了/SF 。', "You needn't worry — I'm better now."],
      ['上/T 飞机 以前 *必须*/MOD 检查/V 护照/O 。', 'Passports must be checked before boarding.'],
      ['你/S *不必*/MOD 买/V 新/O 的 ， 我/S 有/V 。', "You don't need to buy a new one — I have one."],
      ['天气/S 冷/V 了/SF ， 你/S *得@dei3*/MOD 多/ADV 穿/V 衣服/O 。', "It's turned cold — you'll have to wear more."],
      ['他/S 生病/V 了/SF ， *应该*/MOD 去/V 医院/O 。', "He's ill — he should go to hospital."],
    ],
  },
];
