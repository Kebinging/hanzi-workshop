import type { PatternSource, Distractor } from './authoring';

// HSK 3 · Unit 4 · 怎么样？ — State complement 得, degree, reduplication (provisional).

const DE_DISTRACTORS: Distractor[] = [
  ['的', 'COMP.DE_WRONG', '的 links a modifier to a noun (我的书); a verb takes its description with 得.'],
  ['地', 'COMP.DE_WRONG', '地 goes before a verb (认真地学); after the verb, a description needs 得.'],
];

export const patternsU04: PatternSource[] = [
  {
    id: 'G3-25', unit: 4, title: 'V + 得 + (Adv) Adj', titleZh: '状态补语：动词＋得＋形容词',
    summary: '得 after a verb introduces how well / how the action is done: 他跑得很快.',
    explanationMd: `
**Form:** Subject + V + **得** + (很/非常/不…) + Adj

The part after 得 *describes or judges* the action: 他跑得很快 (he runs fast), 她唱得非常好听.

- Use **得** here — not 的 (noun modifier) or 地 (before a verb).
- The adverb (很, 非常, 不) goes **after** 得, never before the verb: ✗ 他很跑得快.`,
    formula: ['S', 'V', 'C', 'C'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G12-09'],
    contrasts: ['G3-31'],
    errorCodes: ['COMP.DE_WRONG', 'COMP.PLACEMENT'],
    examples: [
      ['他/S 跑/V *得*/C 很/C 快 。', 'He runs fast.'],
      ['她/S 唱/V *得*/C 非常/C 好听 。', 'She sings beautifully.'],
      ['我/S 今天/T 起/V *得*/C 很/C 早 。', 'I got up early today.'],
    ],
    instances: [
      ['你/S 说/V *得*/C 很/C 对 。', "You're quite right."],
      ['他/S 写/V *得*/C 很/C 认真 。', 'He writes very carefully.'],
      ['妹妹/S 跳/V *得*/C 很/C 高 。', 'My younger sister jumps high.'],
      ['昨天/T 我/S 睡/V *得*/C 很/C 好 。', 'I slept well last night.'],
      ['她/S 长@zhang3/V *得*/C 很/C 漂亮 。', "She's grown up very pretty."],
      ['他/S 考/V *得*/C 不错/C 。', 'He did well in the exam.'],
      ['你们/S 表演/V *得*/C 太/C 好 了 。', 'You performed brilliantly.'],
      ['老师/S 讲/V *得*/C 很/C 清楚 。', 'The teacher explains very clearly.'],
    ],
    decoys: [DE_DISTRACTORS[0], DE_DISTRACTORS[1]],
    cloze: { blank: ['得'], distractors: DE_DISTRACTORS },
  },
  {
    id: 'G3-26', unit: 4, title: '(V) + O + V + 得 + Adj, or object fronted', titleZh: '带宾语的状态补语',
    summary: 'With an object, repeat the verb (说汉语说得很好) or move the object to the front (汉语他说得很好).',
    explanationMd: `
得 must follow the verb **directly**, so an object can't sit between them: ✗ 他说汉语得很好.

Two fixes:
- **Repeat the verb:** 他说汉语**说**得很好.
- **Front the object** as the topic: **汉语**他说得很好.

Separable verbs work the same way: 跳舞跳得很好.`,
    formula: ['S', 'V', 'O', 'V', 'C', 'C'],
    constraints: [{ kind: 'before', a: 'O', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-25'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.DE_WRONG'],
    examples: [
      ['他/S 说/V 汉语/O 说/V *得*/C 很/C 好 。', 'He speaks Chinese well.'],
      ['汉语/TOP 他/S 说/V *得*/C 很/C 好 。', 'His Chinese is good.'],
      ['她/S 打/V 篮球/O 打/V *得*/C 不错/C 。', 'She plays basketball pretty well.'],
    ],
    instances: [
      ['我/S 写/V 汉字/O 写/V *得*/C 很/C 慢 。', 'I write characters slowly.'],
      ['爸爸/S 做/V 饭/O 做/V *得*/C 特别/C 好吃 。', 'Dad cooks really well.'],
      ['他/S 唱/V 歌/O 唱/V *得*/C 很/C 好听 。', 'He sings beautifully.'],
      ['我/S 妈妈 打扫/V 房间/O 打扫/V *得*/C 很/C 干净 。', 'My mum cleans the room spotlessly.'],
      ['她/S 跳舞/V 跳/V *得*/C 很/C 好 。', 'She dances well.'],
      ['中文/TOP 她/S 学/V *得*/C 很/C 快 。', "She's picking up Chinese fast."],
      ['这/TOP 个 字 你/S 写/V *得*/C 不/C 对 。', "You've written this character wrong."],
      ['你/S 回答/V 问题/O 回答/V *得*/C 很/C 好 。', 'You answered the questions well.'],
    ],
    decoys: [DE_DISTRACTORS[0]],
    cloze: { blank: ['得'], distractors: DE_DISTRACTORS },
    transforms: [
      { subtype: 'complement', inputs: ['他 说 汉语 。', '他 说 得 很 好 。'], chip: 'V + O + V得', answer: '他/S 说/V 汉语/O 说/V 得/C 很/C 好 。', en: 'He speaks Chinese well.', decoys: [DE_DISTRACTORS[0]] },
    ],
  },
  {
    id: 'G3-27', unit: 4, title: 'Negating and asking about a 得-complement', titleZh: '状态补语的否定和提问',
    summary: 'Negation goes after 得 (跑得不快); questions use the A-not-A form after 得 (跑得快不快) or 怎么样.',
    explanationMd: `
The judgement lives after 得, so that's where 不 and questions go:

- **Negative:** 他跑得**不**快 — not ✗ 他不跑得快, not ✗ 他跑得没快.
- **Question:** 你睡得**好不好**？ / 他唱得**怎么样**？ / 他说得流利**吗**？`,
    formula: ['S', 'V', 'C', 'C'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-25'],
    errorCodes: ['COMP.PLACEMENT', 'ASPECT.NEG_BU_MEI'],
    examples: [
      ['他/S 跑/V *得*/C 不/C 快 。', "He doesn't run fast."],
      ['你/S 睡/V *得*/C 好/C 不 好 ？', 'Did you sleep well?'],
      ['我/S 写/V *得*/C 不/C 太 好 。', "I don't write very well."],
    ],
    instances: [
      ['她/S 唱/V *得*/C 怎么样/C ？', 'How does she sing?'],
      ['他/S 考/V *得*/C 不/C 好 ， 很/ADV 伤心/V 。', "He didn't do well in the exam and he's upset."],
      ['你/S 来/V *得*/C 早/C 不 早 ？', 'Did you get here early?'],
      ['我/S 说/V *得*/C 对/C 不 对 ？', 'Am I right?'],
      ['弟弟/S 吃/V *得*/C 不/C 多 。', "My younger brother doesn't eat much."],
      ['他/S 说/V 汉语/O 说/V *得*/C 流利/C 吗/SF ？', 'Does he speak Chinese fluently?'],
      ['你/S 跑/V *得*/C 快/C 不 快 ？', 'Do you run fast?'],
      ['他/S 写/V *得*/C 不/C 清楚 。', "He doesn't write clearly."],
    ],
    decoys: [['没', 'ASPECT.NEG_BU_MEI', 'A 得-description is negated with 不, after 得 — not with 没.']],
    cloze: { blank: ['得'], distractors: DE_DISTRACTORS },
  },
  {
    id: 'G3-28', unit: 4, title: 'Adj + 得很 / 得不得了', titleZh: '形容词＋得很／得不得了',
    summary: 'After an adjective, 得很 = very, 得不得了 = extremely — a strong, spoken emphasis.',
    explanationMd: `
**Form:** Adj + **得很** / **得不得了**

- 今天热得很 — it's really hot today.
- 他高兴得不得了 — he's over the moon.

These follow the adjective; compare 很热 (plain "hot") with 热得很 (emphatic).`,
    formula: ['S', 'V', 'C', 'C'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-25'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.DE_WRONG'],
    examples: [
      ['今天/S 热/V *得*/C 很/C 。', "It's really hot today."],
      ['他/S 高兴/V *得*/C 不得了/C 。', "He's extremely happy."],
      ['这/S 个 菜 好吃/V *得*/C 很/C 。', 'This dish is really tasty.'],
    ],
    instances: [
      ['我/S 累/V *得*/C 不得了/C 。', "I'm absolutely exhausted."],
      ['外面/S 冷/V *得*/C 很/C 。', "It's really cold outside."],
      ['那/S 个 地方 漂亮/V *得*/C 很/C 。', 'That place is really beautiful.'],
      ['她/S 紧张/V *得*/C 不得了/C 。', "She's incredibly nervous."],
      ['孩子/S 激动/V *得*/C 不得了/C 。', 'The child is terribly excited.'],
      ['这/S 个 问题 难/V *得*/C 很/C 。', 'This question is really hard.'],
      ['北京/S 的 冬天 冷/V *得*/C 不得了/C 。', 'Beijing winters are extremely cold.'],
      ['他/S 的 汉语 好/V *得*/C 很/C 。', 'His Chinese is really good.'],
    ],
    decoys: [['很', 'COMP.PLACEMENT', 'Here 很 follows 得: Adj + 得很.']],
    cloze: { blank: ['得'], distractors: DE_DISTRACTORS },
  },
  {
    id: 'G3-29', unit: 4, title: 'Degree adverbs: 太…了, 非常, 特别, 真, 十分', titleZh: '程度副词',
    summary: 'Degree adverbs go right before the adjective or mental verb; 太 usually pairs with 了 ("too / so").',
    explanationMd: `
All go **before** the adjective (or verbs like 喜欢):

- **太 … 了** — too / so (often a complaint or exclamation): 太贵了, 太好了.
- **非常 / 十分** — very, extremely (neutral; 十分 is a bit formal).
- **特别** — especially.
- **真** — really (exclamation; not before a noun-modifying 的-phrase).

非常 / 特别 / 十分 don't take the 太…了 frame: ✗ 非常贵了.`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [{ kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' }],
    requires: ['G12-09'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['这里/S 的 菜 *特别*/ADV 好吃/V 。', 'The food here is especially good.'],
      ['今天/S *太*/ADV 热/V 了/SF 。', "It's so hot today."],
      ['你/S 的 发音 *真*/ADV 好/V ！', 'Your pronunciation is really good!'],
    ],
    instances: [
      ['这/S 个 电影 *非常*/ADV 有意思/V 。', 'This film is very interesting.'],
      ['他/S *十分*/ADV 紧张/V 。', "He's extremely nervous."],
      ['这/S 件 衣服 *太*/ADV 贵/V 了/SF 。', 'This piece of clothing is too expensive.'],
      ['她/S *特别*/ADV 喜欢/V 画 画儿 。', 'She especially loves painting.'],
      ['你/S *真*/ADV 厉害/V ！', "You're amazing!"],
      ['北方/S 的 冬天 *非常*/ADV 冷/V 。', 'Winters in the north are very cold.'],
      ['这/S 次 考试 *太*/ADV 难/V 了/SF 。', 'This exam was too hard.'],
      ['他/S 对/PP 人 *非常*/ADV 客气/V 。', "He's very polite to people."],
    ],
  },
  {
    id: 'G3-30', unit: 4, title: '多(么) + Adj + 啊！ (exclamation)', titleZh: '感叹句：多(么)…啊',
    summary: '多 or 多么 before an adjective, 啊 at the end: "How …!"',
    explanationMd: `
**Form:** (Subject) + **多 / 多么** + Adj + **啊**！

- 多漂亮啊！ — How beautiful!
- 今天的天气多么好啊！ — What lovely weather today!

多么 is a little more emphatic or written; 多 is everyday speech. 很 can't make this exclamation.`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [],
    requires: ['G3-29'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['今天/S 的 天气 *多么*/ADV 好/V *啊*/SF ！', 'What lovely weather today!'],
      ['*多*/ADV 好吃/V *啊*/SF ！', 'How delicious!'],
      ['你/S 的 女儿 *多*/ADV 可爱/V *啊*/SF ！', 'How cute your daughter is!'],
    ],
    instances: [
      ['这/S 个 孩子 *多么*/ADV 聪明/V *啊*/SF ！', 'How clever this child is!'],
      ['*多*/ADV 漂亮/V *啊*/SF ！', 'How beautiful!'],
      ['北京/S 的 冬天 *多*/ADV 冷/V *啊*/SF ！', 'How cold Beijing winters are!'],
      ['这/S 个 节目 *多么*/ADV 有意思/V *啊*/SF ！', 'What an interesting programme!'],
      ['你/S 来/V 了/SF ， 我/S *多*/ADV 高兴/V *啊*/SF ！', "You came — I'm so happy!"],
      ['我们/S 的 生活 *多么*/ADV 方便/V *啊*/SF ！', 'How convenient our lives are!'],
      ['他/S 的 汉语 *多*/ADV 流利/V *啊*/SF ！', 'How fluent his Chinese is!'],
      ['*多*/ADV 香/V *啊*/SF ！', 'It smells so good!'],
    ],
    decoys: [['很', 'LEX.NEAR_SYNONYM', '很 makes a plain statement; the exclamation needs 多(么) … 啊.']],
    cloze: {
      blank: ['多么', '多'],
      distractors: [
        ['很', 'LEX.NEAR_SYNONYM', '很 + Adj + 啊 isn’t an exclamation of degree; use 多(么).'],
        ['更', 'LEX.NEAR_SYNONYM', '更 compares ("even more"); it can’t make an exclamation.'],
      ],
    },
  },
  {
    id: 'G3-31', unit: 4, title: 'Adjective reduplication (AABB, AA的)', titleZh: '形容词重叠',
    summary: 'Doubling an adjective makes it vivid: 高高兴兴地, 干干净净的. Reduplicated adjectives take no 很.',
    explanationMd: `
**Two-syllable AB → AABB:** 高兴 → 高高兴兴, 干净 → 干干净净, 认真 → 认认真真.
**One syllable A → AA:** 大 → 大大的, 长 → 长长的, 慢 → 慢慢地.

- Before a verb, add **地**: 高高兴兴**地**回家, 慢慢**地**说.
- As a description, add **的**: 房间干干净净**的**.

A reduplicated adjective is already vivid, so no 很/非常: ✗ 很高高兴兴.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [],
    requires: ['G3-25'],
    contrasts: ['G3-25'],
    errorCodes: ['LEX.REDUPLICATION', 'COMP.DE_WRONG'],
    examples: [
      ['孩子/S *高高兴兴@gaoxing=gāo_gāo_xìng_xìng*/ADV 地 回/V 家/O 了/SF 。', 'The child went home happily.'],
      ['她/S 的 房间 *干干净净@ganjing=gān_gān_jìng_jìng*/V 的 。', 'Her room is spick and span.'],
      ['你/S *慢慢@man=màn_màn*/ADV 地 说/V 。', 'Speak slowly.'],
    ],
    instances: [
      ['他/S *认认真真@renzhen=rèn_rèn_zhēn_zhēn*/ADV 地 写/V 作业/O 。', 'He does his homework very conscientiously.'],
      ['我们/S *高高兴兴@gaoxing=gāo_gāo_xìng_xìng*/ADV 地 去/V 公园/O 吧/SF 。', "Let's go to the park and have a good time."],
      ['她/S 的 头发 *长长@chang2=cháng_cháng*/V 的 。', 'Her hair is nice and long.'],
      ['你/S *好好@hao=hǎo_hǎo*/ADV 地 休息/V 一下/C 吧/SF 。', 'Have a proper rest.'],
      ['房间/S *安安静静@anjing=ān_ān_jìng_jìng*/V 的 。', 'The room is completely quiet.'],
      ['他/S 的 字 写/V 得/C *清清楚楚@qingchu=qīng_qīng_chǔ_chǔ*/C 的 。', 'His handwriting is perfectly clear.'],
      ['这/S 个 孩子 的 眼睛 *大大@da=dà_dà*/V 的 。', "This child's eyes are big and round."],
      ['他/S *舒舒服服@shufu=shū_shū_fú_fú*/ADV 地 坐/V 在/C 那儿 。', "He's sitting there comfortably."],
    ],
    decoys: [['很', 'LEX.REDUPLICATION', 'A reduplicated adjective is already vivid — it can’t take 很.']],
  },
  {
    id: 'G3-32', unit: 4, title: 'Verb reduplication (VV, V一V, V了V)', titleZh: '动词重叠',
    summary: 'Doubling a verb softens it: "have a quick go / try / a bit": 看看, 试一试, 休息休息.',
    explanationMd: `
- One syllable: **VV** or **V一V** — 看看, 看一看, 试一试.
- Two syllables: **ABAB** — 休息休息, 介绍介绍, 收拾收拾.
- Already done (past): **V了V** — 他看了看手表.

The doubled verb sounds relaxed and polite — great for suggestions and requests. It doesn't take 着/过, and the object follows the whole doubled verb: 看看这本书.`,
    formula: ['S', 'MOD', 'V', 'O'],
    constraints: [{ kind: 'before', a: 'V', b: 'O', code: 'ORDER.OBJECT' }],
    requires: ['G12-06'],
    errorCodes: ['ORDER.OBJECT', 'ASPECT.LE_MISUSE'],
    examples: [
      ['你/S *看*/V *看* 。', 'Have a look.'],
      ['我们/S *休息*/V *休息* 吧/SF 。', "Let's take a little rest."],
      ['你/S *试*/V 一 *试* 这/O 件 衣服 。', 'Try this one on.'],
    ],
    instances: [
      ['我/S 想/MOD *看*/V 一 *看* 你/O 的 照片 。', "I'd like to have a look at your photos."],
      ['请/MOD 你/S *介绍*/V *介绍* 你/O 自己 。', 'Please tell us a bit about yourself.'],
      ['他/S *看*/V 了 *看* 手表/O ， 就/ADV 走/V 了/SF 。', 'He glanced at his watch and left.'],
      ['你/S 去/V *问*/V *问* 老师/O 吧/SF 。', 'Go and ask the teacher.'],
      ['我们/S *收拾*/V *收拾* 房间/O 吧/SF 。', "Let's tidy up the room a bit."],
      ['你/S *想*/V *想* ， 这/S 是/V 什么/O ？', 'Think about it — what is this?'],
      ['大家/S 一起/ADV *练习*/V *练习* 吧/SF 。', "Let's all practise a bit together."],
      ['我/S 去/V *洗*/V *洗* 手/O 。', "I'll go and wash my hands."],
    ],
    transforms: [
      { subtype: 'rewrite', inputs: ['你 看 这 本 书 。'], chip: 'V一V (have a quick look)', answer: '你/S 看/V 一 看 这/O 本 书 。', en: 'Have a look at this book.' },
      { subtype: 'rewrite', inputs: ['我们 休息 吧 。'], chip: 'ABAB (take a little rest)', answer: '我们/S 休息/V 休息 吧/SF 。', en: "Let's take a little rest." },
    ],
  },
];
