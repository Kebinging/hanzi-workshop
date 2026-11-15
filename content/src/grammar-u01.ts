import type { PatternSource, Distractor } from './authoring';

// HSK 3 · Unit 1 · 生活节奏 — Aspect & time adverbs (provisional).

const NO_LE_AFTER_MEI: Distractor = ['了', 'ASPECT.NEG_BU_MEI', 'After 没, 了 disappears — but experience 过 stays: 没去过.'];

export const patternsU01: PatternSource[] = [
  {
    id: 'G3-01', unit: 1, title: 'V了 + number-measure + object', titleZh: '动词＋了＋数量＋宾语',
    summary: '了 right after the verb marks a completed action, typically with a quantified object.',
    explanationMd: `
**Form:** Subject + V + **了** + number + measure word + object.

了 sits directly after the verb when the object is *quantified* (两本书, 三杯咖啡, 一些水果). Without a quantity, a bare 我买了书 sounds unfinished — native speakers either add a quantity, add a following clause, or use sentence-final 了.

**Negation:** 没 + V, and 了 disappears: 我没买书。`,
    formula: ['S', 'T', 'V', 'ASP', 'O'],
    constraints: [],
    requires: ['G12-02', 'G12-07'],
    contrasts: ['G3-02', 'G3-03'],
    errorCodes: ['ASPECT.LE_MISUSE', 'ASPECT.NEG_BU_MEI', 'LEX.MEASURE_WORD'],
    examples: [
      ['我/S 买/V *了*/ASP 两/O 本 书 。', 'I bought two books.'],
      ['他/S 喝/V *了*/ASP 三/O 杯 咖啡 。', 'He drank three cups of coffee.'],
      ['昨天/T 我/S 看/V *了*/ASP 一/O 个 电影 。', 'Yesterday I watched a film.'],
    ],
    instances: [
      ['妈妈/S 买/V *了*/ASP 一/O 些 水果 。', 'Mum bought some fruit.'],
      ['他/S 吃/V *了*/ASP 两/O 碗 米饭 。', 'He ate two bowls of rice.'],
      ['我/S 昨天/T 打/V *了*/ASP 三/O 个 电话 。', 'I made three phone calls yesterday.'],
      ['姐姐/S 买/V *了*/ASP 一/O 件 衬衫 。', 'My older sister bought a shirt.'],
      ['我们/S 复习/V *了*/ASP %三十/O 个 句子 。', 'We reviewed thirty sentences.'],
      ['爸爸/S 喝/V *了*/ASP 两/O 杯 啤酒 。', 'Dad drank two glasses of beer.'],
      ['我/S 在/PP 银行 换/V *了*/ASP 一/O 些 钱 。', 'I changed some money at the bank.'],
      ['弟弟/S 借/V *了*/ASP 两/O 本 词典 。', 'My younger brother borrowed two dictionaries.'],
    ],
    decoys: [
      ['过', 'ASPECT.GUO_MISUSE', '过 means "have done at some point"; the prompt describes one completed action.'],
      ['着', 'ASPECT.ZHE_MISUSE', '着 marks a lasting state, not a completed action.'],
    ],
    cloze: {
      blank: ['了'],
      distractors: [
        ['着', 'ASPECT.ZHE_MISUSE', '着 describes a continuing state; buying or eating a quantity is a completed action.'],
        ['地', 'COMP.DE_WRONG', '地 links an adverbial to a verb (认真地学); it never follows a verb.'],
      ],
    },
  },
  {
    id: 'G3-02', unit: 1, title: 'Sentence-final 了 (change of state)', titleZh: '句末“了”：变化',
    summary: '了 at the end of a sentence announces a new situation: something is now different.',
    explanationMd: `
**Form:** … + **了**。 (at the very end of the sentence)

Sentence-final 了 says *the situation has changed*: 天冷了 "it's got cold (it wasn't before)". With a negative it means "no longer": 我不想去了 "I don't want to go any more".

Don't confuse it with V了 (completed action, G3-01). 我饿了 is not "I hungered" — it's "I'm hungry now".`,
    formula: ['S', 'ADV', 'V', 'O', 'SF'],
    constraints: [],
    requires: ['G12-02'],
    contrasts: ['G3-01'],
    errorCodes: ['ASPECT.LE_MISUSE'],
    examples: [
      ['天/S 冷/V *了*/SF 。', "It's turned cold."],
      ['我/S 饿/V *了*/SF 。', "I'm hungry (now)."],
      ['他/S 不/ADV 想/MOD 去/V *了*/SF 。', "He doesn't want to go any more."],
    ],
    instances: [
      ['我/S 妹妹 %二十/V 岁 *了*/SF 。', 'My younger sister is twenty now.'],
      ['下雨/V *了*/SF ， 我们/S 回/V 家/O 吧/SF 。', "It's started raining — let's go home."],
      ['现在/T %十一/V 点 *了*/SF 。', "It's eleven o'clock now."],
      ['他/S 是/V 医生/O *了*/SF 。', "He's a doctor now."],
      ['我/S 不/ADV 饿/V *了*/SF ， 谢谢/V 。', "I'm not hungry any more, thanks."],
      ['天气/S 热/V *了*/SF 。', "The weather's got hot."],
      ['我/S 不/ADV 喝/V 咖啡/O *了*/SF 。', "I don't drink coffee any more."],
      ['她/S 的 头发 长/V *了*/SF 。', 'Her hair has grown long.'],
    ],
    decoys: [['着', 'ASPECT.ZHE_MISUSE', '着 can’t end a sentence to announce a new situation; that is sentence-final 了.']],
    cloze: {
      blank: ['了'],
      distractors: [
        ['着', 'ASPECT.ZHE_MISUSE', '着 marks an ongoing state after a verb; it can’t announce a change at the end of a sentence.'],
        ['的', 'ASPECT.LE_MISUSE', '的 can’t end a sentence to show a new situation; that needs 了.'],
      ],
    },
    transforms: [
      { subtype: 'rewrite', inputs: ['我 喝 咖啡 。'], chip: '不…了 (no longer)', answer: '我/S 不/ADV 喝/V 咖啡/O 了/SF 。', en: "I don't drink coffee any more.", decoys: [['没', 'ASPECT.NEG_BU_MEI', '没 negates a past event; "no longer" is 不…了.']] },
      { subtype: 'rewrite', inputs: ['天气 很 冷 。'], chip: '…了 (it has become)', answer: '天气/S 冷/V 了/SF 。', en: 'The weather has turned cold.', decoys: [['过', 'ASPECT.GUO_MISUSE', '过 is about past experience, not a new situation.']] },
    ],
  },
  {
    id: 'G3-03', unit: 1, title: 'V过 (experience) and 没V过', titleZh: '动词＋过：经历',
    summary: '过 after a verb means "have done at some point"; 没(有)V过 means "have never done".',
    explanationMd: `
**Form:** Subject + V + **过** + object. Negative: 没(有) + V + **过**.

过 talks about *experience*, not one specific completed event. 我去过上海 = I have been to Shanghai (at some point in my life).

过 stays in the negative (unlike 了): 我没去过 ✓ / 我没去了 ✗.`,
    formula: ['S', 'T', 'V', 'ASP', 'O'],
    constraints: [],
    requires: ['G12-03'],
    contrasts: ['G3-01'],
    errorCodes: ['ASPECT.GUO_MISUSE', 'ASPECT.NEG_BU_MEI'],
    examples: [
      ['我/S 去/V *过*/ASP #上海=shànghǎi=Shanghai/O 。', "I've been to Shanghai."],
      ['你/S 吃/V *过*/ASP 中国/O 菜 吗/SF ？', 'Have you ever eaten Chinese food?'],
      ['我/S 没/ADV 看/V *过*/ASP 这/O 个 电影 。', "I've never seen this film.", { x: [NO_LE_AFTER_MEI] }],
    ],
    instances: [
      ['他/S 学/V *过*/ASP 汉语/O 。', "He's studied Chinese before."],
      ['我/S 没/ADV 坐/V *过*/ASP 飞机/O 。', "I've never been on a plane.", { x: [NO_LE_AFTER_MEI] }],
      ['你/S 见/V *过*/ASP 他/O 的 妻子 吗/SF ？', 'Have you ever met his wife?'],
      ['我/S 以前/T 来/V *过*/ASP 这儿/O 。', "I've been here before."],
      ['她/S 没/ADV 去/V *过*/ASP 医院/O 。', "She's never been to hospital.", { x: [NO_LE_AFTER_MEI] }],
      ['你/S 听/V *过*/ASP 这/O 个 故事 吗/SF ？', 'Have you heard this story before?'],
      ['他/S 没/ADV 迟到/V *过*/ASP 。', "He's never been late.", { x: [NO_LE_AFTER_MEI] }],
      ['我/S 用/V *过*/ASP 这/O 种 手机 。', "I've used this kind of phone before."],
    ],
    decoys: [
      ['了', 'ASPECT.LE_MISUSE', '了 reports one completed event; the prompt is about experience (ever / never).'],
      ['着', 'ASPECT.ZHE_MISUSE', '着 marks a lasting state, not an experience.'],
    ],
    cloze: {
      blank: ['过'],
      distractors: [
        ['着', 'ASPECT.ZHE_MISUSE', '着 marks an ongoing state; "have ever done" needs 过.'],
        ['地', 'COMP.DE_WRONG', '地 links an adverbial to a verb; it never follows a verb.'],
      ],
    },
    transforms: [
      { subtype: 'rewrite', inputs: ['我 坐 飞机 。'], chip: '没…过 (never)', answer: '我/S 没/ADV 坐/V 过/ASP 飞机/O 。', en: "I've never been on a plane.", decoys: [NO_LE_AFTER_MEI] },
      { subtype: 'rewrite', inputs: ['你 吃 中国 菜 吗 ？'], chip: '…过 (ever)', answer: '你/S 吃/V 过/ASP 中国/O 菜 吗/SF ？', en: 'Have you ever eaten Chinese food?', decoys: [['着', 'ASPECT.ZHE_MISUSE', '着 marks a lasting state, not an experience.']] },
    ],
  },
  {
    id: 'G3-04', unit: 1, title: 'V着 (continuing state)', titleZh: '动词＋着：状态持续',
    summary: '着 after a verb describes a state that stays in place: the door is open, he is wearing a hat.',
    explanationMd: `
**Form:** Subject + V + **着** (+ object).

着 is about a *lasting state*, often the result of an action: 门开着 "the door is (standing) open", 他穿着白衬衫 "he has a white shirt on". It describes a scene rather than an action in progress (that's 在/正在, G3-05).

Negative: 没 + V + 着 — 门没开着.`,
    formula: ['S', 'V', 'ASP', 'O'],
    constraints: [],
    requires: ['G12-04'],
    contrasts: ['G3-05'],
    errorCodes: ['ASPECT.ZHE_MISUSE'],
    examples: [
      ['门/S 开/V *着*/ASP 。', 'The door is open.'],
      ['他/S 穿/V *着*/ASP 一/O 件 白 衬衫 。', "He's wearing a white shirt."],
      ['她/S 拿/V *着*/ASP 一/O 个 包 。', "She's holding a bag."],
    ],
    instances: [
      ['灯/S 开/V *着*/ASP 。', 'The light is on.'],
      ['教室/S 的 门 关/V *着*/ASP 。', 'The classroom door is shut.'],
      ['他/S 手/PP 里 拿/V *着*/ASP 一/O 本 书 。', "He's holding a book in his hand."],
      ['她/S 穿/V *着*/ASP 红/O 裙子 。', "She's wearing a red skirt."],
      ['电视/S 开/V *着*/ASP ， 可是/CONJ2 没有/V 人 看 。', 'The TV is on, but nobody is watching.'],
      ['他/S 穿/V *着*/ASP 黑/O 裤子 。', "He's wearing black trousers."],
      ['空调/S 开/V *着*/ASP 吗/SF ？', 'Is the air conditioning on?'],
      ['冰箱/S 的 门 开/V *着*/ASP 。', 'The fridge door is open.'],
    ],
    decoys: [['过', 'ASPECT.GUO_MISUSE', '过 = has been done at some time; it doesn’t describe a state you can see now.']],
  },
  {
    id: 'G3-05', unit: 1, title: '正在 / 在 / 正…呢 (in progress)', titleZh: '进行：正在／在／正…呢',
    summary: '(正)在 before the verb, optionally 呢 at the end: an action in progress right now.',
    explanationMd: `
**Form:** Subject + **正在 / 在 / 正** + V (+ object) (+ **呢**).

- 正在 stresses "right at this moment".
- 在 is the everyday form.
- 呢 at the end adds a "that's what's going on" feel and can stand with or without 在.

Negative: 没(在) + V — 他没在看书.`,
    formula: ['S', 'ADV', 'V', 'O', 'SF'],
    constraints: [],
    requires: ['G12-04'],
    contrasts: ['G3-04'],
    errorCodes: ['ORDER.ADVERB_POSITION'],
    examples: [
      ['他/S *正在*/ADV 开会/V *呢*/SF 。', "He's in a meeting right now."],
      ['我/S *在*/ADV 看/V 书/O 。', "I'm reading."],
      ['他们/S *正在*/ADV 吃/V 饭/O 。', "They're eating."],
    ],
    instances: [
      ['你/S *在*/ADV 做/V 什么/O *呢*/SF ？', 'What are you doing?'],
      ['妈妈/S *正在*/ADV 打扫/V 房间/O 。', 'Mum is cleaning the room.'],
      ['外面/S *正在*/ADV 下雨/V 。', "It's raining outside."],
      ['爸爸/S *正在*/ADV 工作/V 。', 'Dad is working.'],
      ['我/S *正在*/ADV 找/V 我/O 的 手机 。', "I'm looking for my phone."],
      ['他们/S *在*/ADV 打篮球/V *呢*/SF 。', "They're playing basketball."],
      ['姐姐/S *正在*/ADV 准备/V 晚饭/O 。', 'My older sister is making dinner.'],
      ['老师/S *正在*/ADV 检查/V 我们/O 的 作业 。', 'The teacher is checking our homework.'],
    ],
    decoys: [['已经', 'LEX.NEAR_SYNONYM', '已经 = already done; the prompt describes an action still going on.']],
    cloze: {
      blank: ['正在', '在'],
      distractors: [
        ['已经', 'LEX.NEAR_SYNONYM', '已经 needs a completed action with 了; here the action is still going on.'],
        ['过', 'ASPECT.GUO_MISUSE', '过 goes after a verb, never before it.'],
      ],
    },
    transforms: [
      { subtype: 'rewrite', inputs: ['妈妈 做 饭 。'], chip: '正在 (right now)', answer: '妈妈/S 正在/ADV 做/V 饭/O 。', en: 'Mum is cooking right now.', decoys: [['已经', 'LEX.NEAR_SYNONYM', '已经 = already done, not in progress.']] },
    ],
  },
  {
    id: 'G3-06', unit: 1, title: '已经…了 (already)', titleZh: '已经…了',
    summary: '已经 before the verb with 了 at the end: something has already happened.',
    explanationMd: `
**Form:** Subject + **已经** + V (+ object) + **了**.

已经 almost always pairs with 了. 已经 is an adverb, so it goes *after* the subject and *before* the verb (and before any 在-phrase).

✗ 已经他走了 → ✓ 他已经走了.`,
    formula: ['S', 'ADV', 'V', 'O', 'SF'],
    constraints: [],
    requires: ['G12-02'],
    contrasts: ['G3-07'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'ASPECT.LE_MISUSE', 'ORTHO.LOOKALIKE'],
    examples: [
      ['电影/S *已经*/ADV 开始/V *了*/SF 。', 'The film has already started.'],
      ['他/S *已经*/ADV 走/V *了*/SF 。', "He's already left."],
      ['我/S *已经*/ADV 吃/V 饭/O *了*/SF 。', "I've already eaten."],
    ],
    instances: [
      ['会议/S *已经*/ADV 结束/V *了*/SF 。', 'The meeting is already over.'],
      ['我/S *已经*/ADV 完成/V 作业/O *了*/SF 。', "I've already finished my homework."],
      ['她/S *已经*/ADV %二十/V 岁 *了*/SF 。', "She's already twenty."],
      ['飞机/S *已经*/ADV 起飞/V *了*/SF 。', 'The plane has already taken off.'],
      ['我/S *已经*/ADV 习惯/V 这里/O 的 天气 *了*/SF 。', "I've got used to the weather here."],
      ['他/S *已经*/ADV 决定/V *了*/SF 。', "He's already decided."],
      ['*已经*/ADV %十二/V 点 *了*/SF ， 快/ADV 睡觉/V 吧/SF 。', "It's already twelve — go to sleep."],
      ['我/S *已经*/ADV 忘记/V 他/O 的 名字 *了*/SF 。', "I've already forgotten his name."],
    ],
    decoys: [['正在', 'LEX.NEAR_SYNONYM', '正在 = in progress; the prompt says it has already happened.']],
    cloze: {
      blank: ['已经'],
      distractors: [
        ['正在', 'LEX.NEAR_SYNONYM', '正在 = in progress; it can’t combine with the completed-action 了 here.'],
        ['才', 'LEX.NEAR_SYNONYM', '才 = "not until" and normally drops 了; 已经 pairs with 了.'],
      ],
    },
    transforms: [
      { subtype: 'rewrite', inputs: ['会议 结束 了 。'], chip: '已经 (already)', answer: '会议/S 已经/ADV 结束/V 了/SF 。', en: 'The meeting is already over.', decoys: [['正在', 'LEX.NEAR_SYNONYM', '正在 = in progress, not already done.']] },
      { subtype: 'rewrite', inputs: ['我 吃 饭 。'], chip: '已经…了', answer: '我/S 已经/ADV 吃/V 饭/O 了/SF 。', en: "I've already eaten.", decoys: [['过', 'ASPECT.GUO_MISUSE', '已经 pairs with sentence-final 了, not 过.']] },
    ],
  },
  {
    id: 'G3-07', unit: 1, title: '刚 vs 刚才', titleZh: '“刚”和“刚才”',
    summary: '刚 is an adverb (just did — subjectively recent); 刚才 is a time noun (a moment ago).',
    explanationMd: `
**刚** (adverb): goes *after* the subject, *before* the verb. "Just" — the speaker feels it was recent, even if it was a month ago: 我刚来北京 (I've just come to Beijing).
- No 了 needed, and 刚 can't be negated.

**刚才** (time noun): "a moment ago", only minutes ago. Like any time word it can go before *or after* the subject, can modify a noun (刚才的电影), and can be negated (我刚才没去).`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [],
    requires: ['G12-01'],
    contrasts: ['G3-06'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['我/S *刚*/ADV 到/V 。', "I've just arrived."],
      ['*刚才*/T 你/S 去/V 哪儿/O 了/SF ？', 'Where did you go just now?'],
      ['他/S *刚才*/T 在/V 这儿/O 。', 'He was here a moment ago.'],
    ],
    instances: [
      ['会议/S *刚*/ADV 结束/V 。', 'The meeting has just ended.'],
      ['*刚才*/T 有/V 人 找 你 。', 'Someone was looking for you just now.'],
      ['他/S *刚*/ADV 回/V 家/O 。', "He's just got home."],
      ['*刚才*/S 的 电影 很/ADV 有意思/V 。', 'The film just now was interesting.'],
      ['我/S *刚*/ADV 认识/V 她/O 。', "I've only just got to know her."],
      ['你/S *刚才*/T 说/V 什么/O ？', 'What did you say just now?'],
      ['她/S *刚*/ADV 到/V 公司/O 。', "She's just arrived at the office."],
      ['*刚才*/T 下雨/V 了/SF ， 现在/T 晴/V 了/SF 。', 'It was raining a moment ago; now it’s sunny.'],
    ],
  },
  {
    id: 'G3-08', unit: 1, title: '就 vs 才 (earlier / later than expected)', titleZh: '“就”和“才”：早与晚',
    summary: 'Time + 就 … 了 = sooner/earlier than expected; time + 才 = later/slower than expected (no 了).',
    explanationMd: `
Both go *after* the time expression and *before* the verb.

- **就** → earlier, sooner, easier than expected. Usually ends with 了: 他七点就来了 (already at seven!).
- **才** → later, slower, harder than expected. Normally **no** 了: 他十点才来 (not until ten).

Rule of thumb: 就 = "already / as early as", 才 = "not until / only then".`,
    formula: ['S', 'T', 'ADV', 'V', 'SF'],
    constraints: [
      { kind: 'before', a: 'T', b: 'ADV', code: 'ORDER.ADVERB_POSITION' },
    ],
    requires: ['G12-01', 'G12-02'],
    contrasts: ['G3-07'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ASPECT.LE_MISUSE', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['他/S 七/T 点 *就*/ADV 来/V 了/SF 。', 'He came as early as seven.'],
      ['他/S 十/T 点 *才*/ADV 来/V 。', "He didn't come until ten."],
      ['我/S 等/V 了/ASP 一/C 个 小时 ， 他/S *才*/ADV 到/V 。', 'I waited an hour before he finally arrived.'],
    ],
    instances: [
      ['会议/S 九/T 点 开始/V ， 他/S 八/T 点 半 *就*/ADV 到/V 了/SF 。', 'The meeting started at nine; he was there by half past eight.'],
      ['我/S 昨天/T 晚上 %十二 点 *才*/ADV 睡觉/V 。', "I didn't go to bed until twelve last night."],
      ['她/S 六/T 岁 *就*/ADV 会/MOD 游泳/V 了/SF 。', 'She could already swim at six.'],
      ['你/S 现在/T *才*/ADV 来/V 啊/SF ？', "You're only coming now?"],
      ['他/S 一/T 个 小时 *就*/ADV 完成/V 了/SF 。', 'He finished it in just an hour.'],
      ['我们/S 走/V 了/ASP 一/C 个 小时 *才*/ADV 到/V 。', 'We walked for an hour before we got there.'],
      ['我/S 早上/T 五 点 *就*/ADV 起床/V 了/SF 。', 'I was up as early as five this morning.'],
      ['他/S %三十/T 岁 *才*/ADV 开始/V 学/O 汉语 。', "He didn't start learning Chinese until he was thirty."],
    ],
    decoys: [
      ['才', 'LEX.NEAR_SYNONYM', '才 means later than expected — the opposite of what the prompt says.'],
      ['就', 'LEX.NEAR_SYNONYM', '就 means earlier or sooner than expected — the opposite of what the prompt says.'],
    ],
    transforms: [
      { subtype: 'rewrite', inputs: ['他 十 点 来 。'], chip: '才 (later than expected)', answer: '他/S 十/T 点 才/ADV 来/V 。', en: "He didn't come until ten.", decoys: [['就', 'LEX.NEAR_SYNONYM', '就 means earlier than expected.']] },
      { subtype: 'rewrite', inputs: ['她 六 岁 会 游泳 。'], chip: '就…了 (earlier than expected)', answer: '她/S 六/T 岁 就/ADV 会/MOD 游泳/V 了/SF 。', en: 'She could already swim at six.', decoys: [['才', 'LEX.NEAR_SYNONYM', '才 means later than expected.']] },
    ],
  },
];
