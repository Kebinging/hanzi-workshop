import type { PatternSource } from './authoring';

// HSK 3 · Unit 1 · 生活节奏 — Aspect & time adverbs (provisional).
export const patternsU01: PatternSource[] = [
  {
    id: 'G3-01', unit: 1, title: 'V了 + number-measure + object', titleZh: '动词＋了＋数量＋宾语',
    summary: '了 right after the verb marks a completed action, typically with a quantified object.',
    explanationMd: `
**Form:** Subject + V + **了** + number + measure word + object.

了 sits directly after the verb when the object is *quantified* (两本书, 三杯咖啡, 一些水果). Without a quantity, a bare 我买了书 sounds unfinished — native speakers either add a quantity, add a following clause, or use sentence-final 了.

**Negation:** 没 + V, and 了 disappears: 我没买书。`,
    formula: ['S', 'T', 'V', 'ASP', 'O'],
    constraints: [
      { kind: 'adjacent', a: 'V', b: 'ASP', code: 'ASPECT.LE_MISUSE' },
      { kind: 'before', a: 'ASP', b: 'O', code: 'ASPECT.LE_MISUSE' },
      { kind: 'before', a: 'T', b: 'V', code: 'ORDER.TIME_AFTER_VERB' },
    ],
    requires: ['G12-02', 'G12-07'],
    contrasts: ['G3-02', 'G3-03'],
    errorCodes: ['ASPECT.LE_MISUSE', 'ASPECT.NEG_BU_MEI', 'LEX.MEASURE_WORD'],
    examples: [
      ['我 买 *了* 两 本 书 。', 'I bought two books.'],
      ['他 喝 *了* 三 杯 咖啡 。', 'He drank three cups of coffee.'],
      ['昨天 我 看 *了* 一 个 电影 。', 'Yesterday I watched a film.'],
    ],
    instances: [
      ['妈妈 买 *了* 一 些 水果 。', 'Mum bought some fruit.'],
      ['他 吃 *了* 两 碗 米饭 。', 'He ate two bowls of rice.'],
      ['我 昨天 打 *了* 三 个 电话 。', 'I made three phone calls yesterday.'],
      ['姐姐 买 *了* 一 件 衬衫 。', 'My older sister bought a shirt.'],
      ['我们 复习 *了* %三十 个 句子 。', 'We reviewed thirty sentences.'],
      ['爸爸 喝 *了* 两 杯 啤酒 。', 'Dad drank two glasses of beer.'],
      ['我 在 银行 换 *了* 一 些 钱 。', 'I changed some money at the bank.'],
      ['弟弟 借 *了* 两 本 词典 。', 'My younger brother borrowed two dictionaries.'],
    ],
  },
  {
    id: 'G3-02', unit: 1, title: 'Sentence-final 了 (change of state)', titleZh: '句末“了”：变化',
    summary: '了 at the end of a sentence announces a new situation: something is now different.',
    explanationMd: `
**Form:** … + **了**。 (at the very end of the sentence)

Sentence-final 了 says *the situation has changed*: 天冷了 "it's got cold (it wasn't before)". With a negative it means "no longer": 我不想去了 "I don't want to go any more".

Don't confuse it with V了 (completed action, G3-01). 我饿了 is not "I hungered" — it's "I'm hungry now".`,
    formula: ['S', 'ADV', 'V', 'O', 'SF'],
    constraints: [{ kind: 'required', slot: 'SF', code: 'ASPECT.LE_MISUSE' }],
    requires: ['G12-02'],
    contrasts: ['G3-01'],
    errorCodes: ['ASPECT.LE_MISUSE'],
    examples: [
      ['天 冷 *了* 。', "It's turned cold."],
      ['我 饿 *了* 。', "I'm hungry (now)."],
      ['他 不 想 去 *了* 。', "He doesn't want to go any more."],
    ],
    instances: [
      ['我 妹妹 %二十 岁 *了* 。', 'My younger sister is twenty now.'],
      ['下雨 *了* ， 我们 回 家 吧 。', "It's started raining — let's go home."],
      ['现在 %十一 点 *了* 。', "It's eleven o'clock now."],
      ['他 是 医生 *了* 。', "He's a doctor now."],
      ['我 不 饿 *了* ， 谢谢 。', "I'm not hungry any more, thanks."],
      ['天气 热 *了* 。', "The weather's got hot."],
      ['我 不 喝 咖啡 *了* 。', "I don't drink coffee any more."],
      ['她 的 头发 长 *了* 。', 'Her hair has grown long.'],
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
    constraints: [
      { kind: 'adjacent', a: 'V', b: 'ASP', code: 'ASPECT.GUO_MISUSE' },
      { kind: 'before', a: 'ASP', b: 'O', code: 'ASPECT.GUO_MISUSE' },
    ],
    requires: ['G12-03'],
    contrasts: ['G3-01'],
    errorCodes: ['ASPECT.GUO_MISUSE', 'ASPECT.NEG_BU_MEI'],
    examples: [
      ['我 去 *过* #上海=shànghǎi=Shanghai 。', "I've been to Shanghai."],
      ['你 吃 *过* 中国 菜 吗 ？', 'Have you ever eaten Chinese food?'],
      ['我 没 看 *过* 这 个 电影 。', "I've never seen this film."],
    ],
    instances: [
      ['他 学 *过* 汉语 。', "He's studied Chinese before."],
      ['我 没 坐 *过* 飞机 。', "I've never been on a plane."],
      ['你 见 *过* 他 的 妻子 吗 ？', 'Have you ever met his wife?'],
      ['我 以前 来 *过* 这儿 。', "I've been here before."],
      ['她 没 去 *过* 医院 。', "She's never been to hospital."],
      ['你 听 *过* 这 个 故事 吗 ？', 'Have you heard this story before?'],
      ['他 没 迟到 *过* 。', "He's never been late."],
      ['我 用 *过* 这 种 手机 。', "I've used this kind of phone before."],
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
    constraints: [{ kind: 'adjacent', a: 'V', b: 'ASP', code: 'ASPECT.ZHE_MISUSE' }],
    requires: ['G12-04'],
    contrasts: ['G3-05'],
    errorCodes: ['ASPECT.ZHE_MISUSE'],
    examples: [
      ['门 开 *着* 。', 'The door is open.'],
      ['他 穿 *着* 一 件 白 衬衫 。', "He's wearing a white shirt."],
      ['她 拿 *着* 一 个 包 。', "She's holding a bag."],
    ],
    instances: [
      ['灯 开 *着* 。', 'The light is on.'],
      ['教室 的 门 关 *着* 。', 'The classroom door is shut.'],
      ['他 手 里 拿 *着* 一 本 书 。', "He's holding a book in his hand."],
      ['她 穿 *着* 红 裙子 。', "She's wearing a red skirt."],
      ['电视 开 *着* ， 可是 没有 人 看 。', 'The TV is on, but nobody is watching.'],
      ['他 穿 *着* 黑 裤子 。', "He's wearing black trousers."],
      ['空调 开 *着* 吗 ？', 'Is the air conditioning on?'],
      ['冰箱 的 门 开 *着* 。', 'The fridge door is open.'],
    ],
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
    constraints: [{ kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' }],
    requires: ['G12-04'],
    contrasts: ['G3-04'],
    errorCodes: ['ORDER.ADVERB_POSITION'],
    examples: [
      ['他 *正在* 开会 *呢* 。', "He's in a meeting right now."],
      ['我 *在* 看 书 。', "I'm reading."],
      ['他们 *正在* 吃 饭 。', "They're eating."],
    ],
    instances: [
      ['你 *在* 做 什么 *呢* ？', 'What are you doing?'],
      ['妈妈 *正在* 打扫 房间 。', 'Mum is cleaning the room.'],
      ['外面 *正在* 下雨 。', "It's raining outside."],
      ['爸爸 *正在* 办公室 工作 。', 'Dad is working in his office.'],
      ['我 *正在* 找 我 的 手机 。', "I'm looking for my phone."],
      ['他们 *在* 打篮球 *呢* 。', "They're playing basketball."],
      ['姐姐 *正在* 准备 晚饭 。', 'My older sister is making dinner.'],
      ['老师 *正在* 检查 我们 的 作业 。', 'The teacher is checking our homework.'],
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
    constraints: [
      { kind: 'before', a: 'S', b: 'ADV', code: 'ORDER.ADVERB_POSITION' },
      { kind: 'required', slot: 'SF', code: 'ASPECT.LE_MISUSE' },
    ],
    requires: ['G12-02'],
    contrasts: ['G3-07'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'ASPECT.LE_MISUSE', 'ORTHO.LOOKALIKE'],
    examples: [
      ['电影 *已经* 开始 *了* 。', 'The film has already started.'],
      ['他 *已经* 走 *了* 。', "He's already left."],
      ['我 *已经* 吃 饭 *了* 。', "I've already eaten."],
    ],
    instances: [
      ['会议 *已经* 结束 *了* 。', 'The meeting is already over.'],
      ['我 *已经* 完成 作业 *了* 。', "I've already finished my homework."],
      ['她 *已经* %二十 岁 *了* 。', "She's already twenty."],
      ['飞机 *已经* 起飞 *了* 。', 'The plane has already taken off.'],
      ['我 *已经* 习惯 这里 的 天气 *了* 。', "I've got used to the weather here."],
      ['他 *已经* 决定 *了* 。', "He's already decided."],
      ['*已经* %十二 点 *了* ， 快 睡觉 吧 。', "It's already twelve — go to sleep."],
      ['我 *已经* 忘记 他 的 名字 *了* 。', "I've already forgotten his name."],
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
    constraints: [{ kind: 'before', a: 'S', b: 'ADV', code: 'ORDER.ADVERB_POSITION' }],
    requires: ['G12-01'],
    contrasts: ['G3-06'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['我 *刚* 到 。', "I've just arrived."],
      ['*刚才* 你 去 哪儿 了 ？', 'Where did you go just now?'],
      ['他 *刚才* 在 这儿 。', 'He was here a moment ago.'],
    ],
    instances: [
      ['会议 *刚* 结束 。', 'The meeting has just ended.'],
      ['*刚才* 有 人 找 你 。', 'Someone was looking for you just now.'],
      ['他 *刚* 回 家 。', "He's just got home."],
      ['*刚才* 的 电影 很 有意思 。', 'The film just now was interesting.'],
      ['我 *刚* 认识 她 。', "I've only just got to know her."],
      ['你 *刚才* 说 什么 ？', 'What did you say just now?'],
      ['她 *刚* 到 公司 。', "She's just arrived at the office."],
      ['*刚才* 下雨 了 ， 现在 晴 了 。', 'It was raining a moment ago; now it’s sunny.'],
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
      { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' },
    ],
    requires: ['G12-01', 'G12-02'],
    contrasts: ['G3-07'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ASPECT.LE_MISUSE', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['他 七 点 *就* 来 了 。', 'He came as early as seven.'],
      ['他 十 点 *才* 来 。', "He didn't come until ten."],
      ['我 等 了 一 个 小时 ， 他 *才* 到 。', 'I waited an hour before he finally arrived.'],
    ],
    instances: [
      ['会议 九 点 开始 ， 他 八 点 半 *就* 到 了 。', 'The meeting started at nine; he was there by half past eight.'],
      ['我 昨天 晚上 %十二 点 *才* 睡觉 。', "I didn't go to bed until twelve last night."],
      ['她 六 岁 *就* 会 游泳 了 。', 'She could already swim at six.'],
      ['你 怎么 现在 *才* 来 ？', 'Why are you only coming now?'],
      ['他 一 个 小时 *就* 完成 了 。', 'He finished it in just an hour.'],
      ['我们 走 了 一 个 小时 *才* 到 。', 'We walked for an hour before we got there.'],
      ['我 早上 五 点 *就* 起床 了 。', 'I was up as early as five this morning.'],
      ['他 %三十 岁 *才* 开始 学 汉语 。', "He didn't start learning Chinese until he was thirty."],
    ],
  },
];
