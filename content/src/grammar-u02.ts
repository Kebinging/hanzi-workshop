import type { PatternSource } from './authoring';

// HSK 3 · Unit 2 · 安排与习惯 — Sequence, frequency, duration (provisional).
export const patternsU02: PatternSource[] = [
  {
    id: 'G3-09', unit: 2, title: '先…然后/再… (first … then …)', titleZh: '先…然后／再…',
    summary: '先 marks the first step; 然后 or 再 introduces the next one.',
    explanationMd: `
**Form:** (Subject) + **先** + V₁ …，**然后 / 再** + V₂ …

- 先 is an adverb: after the subject, before the verb.
- 然后 starts the second clause ("and then").
- 再 is also an adverb, so it sits *right before the verb* of step two — common in instructions: 你先洗手，再吃饭。

Don't use 以后 to start step two: 以后 follows an event (下课以后).`,
    formula: ['S', 'ADV', 'V', 'O', 'P', 'CONJ2', 'V', 'O'],
    constraints: [{ kind: 'pair', a: '先', b: '然后', code: 'CONJ.PAIR_MISMATCH' }, { kind: 'pair', a: '先', b: '再', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G12-01'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['我们/S *先*/ADV 吃/V 饭/O ， *然后*/CONJ2 去/V 看 电影 。', "Let's eat first, then go and see a film."],
      ['你/S *先*/ADV 洗/V 手/O ， *再*/ADV 吃/V 饭/O 。', 'Wash your hands first, then eat.'],
      ['他/S 早上/T *先*/ADV 跑步/V ， *然后*/CONJ2 吃/V 早饭/O 。', 'In the morning he runs first, then has breakfast.'],
    ],
    instances: [
      ['我/S *先*/ADV 刷牙/V ， *然后*/CONJ2 洗澡/V 。', 'I brush my teeth first, then shower.'],
      ['你/S *先*/ADV 预习/V 课文/O ， *再*/ADV 去/V 上课 。', 'Prepare the text first, then go to class.'],
      ['我们/S *先*/ADV 坐/V 地铁/O ， *然后*/CONJ2 走/V 十/C 分钟 。', 'We take the metro first, then walk ten minutes.'],
      ['她/S *先*/ADV 打扫/V 房间/O ， *然后*/CONJ2 做/V 饭/O 。', 'She cleans the room first, then cooks.'],
      ['他/S *先*/ADV 去/V 了/ASP 银行/O ， *然后*/CONJ2 去/V 了/ASP 超市/O 。', 'He went to the bank first, then to the supermarket.'],
      ['我们/S *先*/ADV 学/V 生词/O ， *再*/ADV 读/V 课文/O 。', 'We learn the new words first, then read the text.'],
      ['你/S *先*/ADV 休息/V 一会儿/C ， *再*/ADV 工作/V 吧/SF 。', 'Rest a moment first, then work.'],
      ['我/S *先*/ADV 洗脸/V ， *然后*/CONJ2 吃/V 早饭/O 。', 'I wash my face first, then have breakfast.'],
    ],
    decoys: [['以后', 'CONJ.PAIR_MISMATCH', '以后 follows an event (下课以后); to start the second step use 然后 or 再.']],
    cloze: {
      blank: ['然后', '再'],
      distractors: [
        ['以后', 'CONJ.PAIR_MISMATCH', '以后 attaches after an event (吃饭以后); it can’t open the second step after 先.'],
        ['才', 'CONJ.PAIR_MISMATCH', '才 means "not until"; after 先 the next step is 然后 or 再.'],
      ],
    },
    transforms: [
      { subtype: 'combine', inputs: ['我 吃 早饭 。', '我 去 上班 。'], chip: '先…然后', answer: '我/S 先/ADV 吃/V 早饭/O ， 然后/CONJ2 去/V 上班 。', en: 'I have breakfast first, then go to work.', decoys: [['以后', 'CONJ.PAIR_MISMATCH', '以后 can’t open the second step; use 然后.']] },
      { subtype: 'combine', inputs: ['你 洗 手 。', '你 吃 饭 。'], chip: '先…再', answer: '你/S 先/ADV 洗/V 手/O ， 再/ADV 吃/V 饭/O 。', en: 'Wash your hands first, then eat.', decoys: [['又', 'LEX.NEAR_SYNONYM', '又 repeats a past action; 再 is the next (future) step.']] },
    ],
  },
  {
    id: 'G3-10', unit: 2, title: '又 vs 再 (again)', titleZh: '“又”和“再”',
    summary: '又 = again, and it already happened; 再 = again, in the future (or a request).',
    explanationMd: `
Both go *before the verb*.

- **又** — the repetition has **already happened**: 他又迟到了 (he was late again). Usually with 了.
- **再** — the repetition is **still to come**, or you're asking for it: 明天再来吧, 请再说一遍.

Quick test: can you add "already"? → 又. Is it a plan or a request? → 再.`,
    formula: ['S', 'T', 'ADV', 'V', 'SF'],
    constraints: [],
    requires: ['G12-02'],
    contrasts: ['G3-11'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['他/S *又*/ADV 迟到/V 了/SF 。', "He's late again."],
      ['明天/T *再*/ADV 来/V 吧/SF 。', 'Come again tomorrow.'],
      ['请/MOD *再*/ADV 说/V 一/C 遍 。', 'Please say it again.'],
    ],
    instances: [
      ['你/S 怎么/ADV *又*/ADV 忘记/V 了/SF ？', 'How did you forget again?'],
      ['我/S 想/MOD *再*/ADV 看/V 一/C 次 。', 'I want to watch it again.'],
      ['他/S 上/T 个 星期 *又*/ADV 生病/V 了/SF 。', 'He got sick again last week.'],
      ['我们/S 下/T 个 周末 *再*/ADV 去/V 吧/SF 。', "Let's go again next weekend."],
      ['妈妈/S *又*/ADV 买/V 了/ASP 一/O 些 水果 。', 'Mum bought some fruit again.'],
      ['你/S *再*/ADV 等/V 一会儿/C 。', 'Wait a little longer.'],
      ['天/S *又*/ADV 下雨/V 了/SF 。', "It's raining again."],
      ['我/S 明天/T *再*/ADV 给/PP 你 打/V 电话/O 。', "I'll call you again tomorrow."],
    ],
    decoys: [
      ['再', 'LEX.NEAR_SYNONYM', '再 is for a repeat that hasn’t happened yet; this one already happened.'],
      ['又', 'LEX.NEAR_SYNONYM', '又 is for a repeat that already happened; this one is still to come.'],
    ],
    transforms: [
      { subtype: 'rewrite', inputs: ['他 迟到 了 。'], chip: '又 (again — it happened)', answer: '他/S 又/ADV 迟到/V 了/SF 。', en: "He's late again.", decoys: [['再', 'LEX.NEAR_SYNONYM', '再 is for a future repeat.']] },
      { subtype: 'rewrite', inputs: ['请 说 一 遍 。'], chip: '再 (again — please)', answer: '请/MOD 再/ADV 说/V 一/C 遍 。', en: 'Please say it again.', decoys: [['又', 'LEX.NEAR_SYNONYM', '又 is for a repeat that already happened.']] },
    ],
  },
  {
    id: 'G3-11', unit: 2, title: '还 (still; in addition)', titleZh: '“还”：仍然／另外',
    summary: '还 before the verb: "still" (the situation continues) or "also, in addition".',
    explanationMd: `
**还** is an adverb: after the subject, before the verb — and before other adverbs like 没, 不, 在.

1. **Still:** 他还没回来 (he still hasn't come back), 外面还在下雨.
2. **In addition:** 我学了汉语，还学了英语. 你还要什么？ (anything else?)

Order of adverbs: 还 + 没 / 不 / 在 — never 没还.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [
      { kind: 'pair', a: '还', b: '没', code: 'ORDER.MULTI_ADVERB' },
      { kind: 'pair', a: '还', b: '不', code: 'ORDER.MULTI_ADVERB' },
      { kind: 'pair', a: '还', b: '在', code: 'ORDER.MULTI_ADVERB' },
    ],
    requires: ['G12-08'],
    contrasts: ['G3-10'],
    errorCodes: ['ORDER.MULTI_ADVERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S *还*/ADV 没/ADV 回来/V 。', "He still hasn't come back."],
      ['我/S 学/V 了/ASP 汉语/O ， *还*/ADV 学/V 了/ASP 英语/O 。', 'I studied Chinese, and English as well.'],
      ['你/S *还*/ADV 要/V 什么/O ？', 'What else do you want?'],
    ],
    instances: [
      ['外面/S *还*/ADV 在/ADV 下雨/V 。', "It's still raining outside."],
      ['他/S *还*/ADV 在/V 办公室/O 。', "He's still in the office."],
      ['我/S *还*/ADV 没/ADV 完成/V 作业/O 。', "I still haven't finished my homework."],
      ['她/S 会/MOD 说/V 汉语/O ， *还*/ADV 会/MOD 说/V 英语/O 。', 'She speaks Chinese, and English too.'],
      ['这/S 件 衣服 很/ADV 漂亮/V ， *还*/ADV 很/ADV 便宜/V 。', 'This piece of clothing is pretty, and cheap too.'],
      ['你/S *还*/ADV 记得/V 我/O 吗/SF ？', 'Do you still remember me?'],
      ['我/S 吃/V 了/ASP 米饭/O ， *还*/ADV 喝/V 了/ASP 一/O 杯 茶 。', 'I had rice, and a cup of tea as well.'],
      ['%十二/T 点 了/SF ， 你/S *还*/ADV 不/ADV 睡觉/V ？', "It's twelve — you're still not going to bed?"],
    ],
    decoys: [['又', 'LEX.NEAR_SYNONYM', '又 repeats a past action; 还 means "still" or "in addition".']],
  },
  {
    id: 'G3-12', unit: 2, title: '一直 vs 总是', titleZh: '“一直”和“总是”',
    summary: '一直 = continuously, without a break (or straight ahead); 总是 = always, every time (a habit).',
    explanationMd: `
Both are adverbs before the verb.

- **一直** — one unbroken stretch: 雨一直在下 (it hasn't stopped raining), 我一直住在北京. Also "straight": 一直往前走.
- **总是** — repeated occasions, a habit: 他总是迟到 (he's late every time), 早上他总是喝咖啡.

Test: one long continuous period → 一直. Many separate times → 总是.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [],
    requires: ['G12-01'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['*一直*/ADV 在/ADV 下雨/V 。', "It's been raining non-stop."],
      ['他/S *总是*/ADV 很/ADV 忙/V 。', "He's always busy."],
      ['我/S *一直*/ADV 在/PP 这儿 等/V 你/O 。', "I've been waiting here for you the whole time."],
    ],
    instances: [
      ['她/S *总是*/ADV 迟到/V 。', "She's always late."],
      ['我/S *一直*/ADV 住/V 在/C 北京 。', "I've always lived in Beijing."],
      ['他/S 早上/T *总是*/ADV 喝/V 一/O 杯 咖啡 。', 'He always has a cup of coffee in the morning.'],
      ['你/S *一直*/ADV 往/PP 前面 走/V 。', 'Go straight ahead.'],
      ['我/S *一直*/ADV 很/ADV 喜欢/V 音乐/O 。', "I've always loved music."],
      ['周末/T 他/S *总是*/ADV 去/V 公园 跑步 。', 'At weekends he always goes running in the park.'],
      ['这/T 两 天 *一直*/ADV 很/ADV 冷/V 。', "It's been cold the last couple of days."],
      ['爸爸/S *总是*/ADV 很/ADV 晚/ADV 下班/V 。', 'Dad always finishes work late.'],
    ],
  },
  {
    id: 'G3-13', unit: 2, title: 'Verbal measures: V + 次 / 遍 / 一下', titleZh: '动量补语：次／遍／一下',
    summary: 'How many times an action happens goes after the verb: 看了三遍, 去过两次, 等一下.',
    explanationMd: `
**Form:** V (+了/过) + number + **次 / 遍** (+ object).

- **次** counts occurrences: 我去过两次北京.
- **遍** counts complete run-throughs, start to finish: 这本书我看了三遍.
- **一下** softens: "briefly, a bit": 请等一下.

Object position: a normal noun object goes **after** the count (去过两次北京); a **pronoun** goes **before** it (见过他一次). Long objects are often moved to the front as the topic: 这本书我看了三遍.`,
    formula: ['TOP', 'S', 'V', 'ASP', 'C', 'O'],
    constraints: [],
    requires: ['G12-07'],
    errorCodes: ['COMP.PLACEMENT', 'LEX.MEASURE_WORD'],
    examples: [
      ['这/TOP 本 书 我/S 看/V 了/ASP 三/C *遍* 。', "I've read this book three times."],
      ['我/S 去/V 过/ASP 两/C *次* 北京/O 。', "I've been to Beijing twice."],
      ['请/MOD 你/S 等/V *一下*/C 。', 'Please wait a moment.'],
    ],
    instances: [
      ['我/S 见/V 过/ASP 他/O 一/C *次* 。', "I've met him once."],
      ['这/TOP 个 课文 我/S 读/V 了/ASP 五/C *遍* 。', "I've read this text five times."],
      ['他/S 来/V 过/ASP 这儿/O 三/C *次* 。', "He's been here three times."],
      ['你/S 看/V *一下*/C 这/O 个 。', 'Have a look at this.'],
      ['我/S 一/T 个 星期 去/V 两/C *次* 超市/O 。', 'I go to the supermarket twice a week.'],
      ['这/TOP 个 电影 我/S 看/V 过/ASP 两/C *遍* 。', "I've seen this film twice."],
      ['请/MOD 你/S 再/ADV 说/V 一/C *遍* 。', 'Please say it again.'],
      ['他/S 给/PP 我 打/V 了/ASP 三/C *次* 电话/O 。', 'He phoned me three times.'],
    ],
    decoys: [['个', 'LEX.MEASURE_WORD', '个 counts things; how many times an action happens needs 次 or 遍.']],
    cloze: {
      blank: ['遍', '次'],
      distractors: [
        ['个', 'LEX.MEASURE_WORD', '个 counts things; counting how many times an action happens needs 次 or 遍.'],
        ['些', 'LEX.MEASURE_WORD', '些 means "some" — it can’t count how many times something happens.'],
      ],
    },
  },
  {
    id: 'G3-14', unit: 2, title: 'Duration: V(了) + time (+ 的) + object', titleZh: '时量补语',
    summary: 'How long an action lasts goes after the verb: 学了两年汉语, 等你等了半天.',
    explanationMd: `
**Form A:** V + 了 + duration (+ 的) + object — 我学了两年(的)汉语.
**Form B:** V + object + **V again** + 了 + duration — 我学汉语学了两年.
**Pronoun object:** V + pronoun + duration — 我等了他半天.

Duration never goes before the verb when it means "for how long": ✗ 我两年学了汉语.
(Before the verb, a time phrase means "within" — 他一个小时就完成了, G3-08.)`,
    formula: ['S', 'V', 'ASP', 'C', 'O'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.DURATION_POSITION' }],
    requires: ['G3-01'],
    errorCodes: ['COMP.DURATION_POSITION'],
    examples: [
      ['我/S 学/V 了/ASP 两/C 年 汉语/O 。', 'I studied Chinese for two years.'],
      ['他/S 等/V 你/O 等/V 了/ASP 半天/C 。', "He waited for you for ages."],
      ['我/S 每/T 天 锻炼/V 一/C 个 小时 。', 'I work out for an hour every day.'],
    ],
    instances: [
      ['他/S 在/PP 北京 住/V 了/ASP 三/C 年 。', 'He lived in Beijing for three years.'],
      ['我们/S 等/V 了/ASP %二十/C 分钟 。', 'We waited twenty minutes.'],
      ['她/S 看/V 了/ASP 一/C 个 小时 的 电视/O 。', 'She watched TV for an hour.'],
      ['我/S 学/V 汉语/O 学/V 了/ASP 两/C 年 。', "I've studied Chinese for two years."],
      ['你/S 每/T 天 工作/V 几/C 个 小时 ？', 'How many hours do you work a day?'],
      ['昨天/T 我/S 休息/V 了/ASP 一/C 天 。', 'Yesterday I rested for a day.'],
      ['我/S 在/PP 银行 工作/V 了/ASP 五/C 年 。', 'I worked at the bank for five years.'],
      ['我们/S 休息/V 十/C 分钟 吧/SF 。', "Let's take a ten-minute break."],
    ],
    transforms: [
      { subtype: 'rewrite', inputs: ['我 学 汉语 。', '两 年'], chip: 'V了 + duration + O', answer: '我/S 学/V 了/ASP 两/C 年 汉语/O 。', en: 'I studied Chinese for two years.' },
    ],
  },
  {
    id: 'G3-15', unit: 2, title: '从…到… and 离 (from / distance)', titleZh: '“从…到…”和“离”',
    summary: '从 A 到 B = from A to B (starting point to end point); A 离 B 远/近 = A is far from / near B.',
    explanationMd: `
- **从 … 到 …** marks a span in space or time: 从北京到上海, 从早上八点到下午五点. The whole phrase goes *before* the verb (或 到 + time after the verb: 工作到五点).
- **离** measures *distance between* two points: 我家离公司很远. Pattern: A + 离 + B + 远/近/有…公里.

✗ 我家从公司很远 — 从 is a starting point, not a distance.`,
    formula: ['S', 'PP', 'ADV', 'V'],
    constraints: [{ kind: 'before', a: 'PP', b: 'V', code: 'ORDER.PLACE_AFTER_VERB' }],
    requires: ['G12-01'],
    errorCodes: ['LEX.COLLOCATION', 'ORDER.PLACE_AFTER_VERB'],
    examples: [
      ['我/S 家 *离*/PP 公司 很/ADV 远/V 。', 'My home is far from the office.'],
      ['*从*/PP #北京=běijīng=Beijing *到* #上海=shànghǎi=Shanghai 要/V 五/C 个 小时 。', 'It takes five hours from Beijing to Shanghai.'],
      ['我/S *从*/PP 早上 八 点 工作/V *到*/C 下午 五 点 。', 'I work from eight in the morning until five in the afternoon.'],
    ],
    instances: [
      ['学校/S *离*/PP 这儿 不/ADV 远/V 。', "The school isn't far from here."],
      ['超市/S *离*/PP 我 家 很/ADV 近/V 。', 'The supermarket is close to my home.'],
      ['*从*/PP 我 家 *到* 公司 要/V 半/C 个 小时 。', 'It takes half an hour from my home to the office.'],
      ['我/S *从*/PP 星期 一 *到* 星期 五 都/ADV 上班/V 。', 'I work Monday to Friday.'],
      ['银行/S *离*/PP 这儿 有/V 两/O 公里 。', "The bank is two kilometres from here."],
      ['你/S 家 *离*/PP 学校 远/V 吗/SF ？', 'Is your home far from school?'],
      ['*从*/PP 这儿 *到* 机场 要/V 多/C 长 时间 ？', 'How long does it take from here to the airport?'],
      ['图书馆/S *离*/PP 教室 很/ADV 近/V 。', 'The library is close to the classroom.'],
    ],
    decoys: [
      ['从', 'LEX.COLLOCATION', '从 marks a starting point; distance between two places uses 离.'],
      ['离', 'LEX.COLLOCATION', '离 measures distance; a span "from … to …" uses 从.'],
    ],
  },
  {
    id: 'G3-16', unit: 2, title: '一…就… (as soon as)', titleZh: '一…就…',
    summary: '一 + V₁ … 就 + V₂: the second thing happens immediately after the first.',
    explanationMd: `
**Form:** (S₁) + **一** + V₁ …，(S₂) + **就** + V₂ …

Both 一 and 就 are adverbs: each goes *before its own verb*, after its own subject. With one subject there's usually no comma: 他一回家就睡觉. With two subjects, each clause keeps its subject: 天一黑，他就回家了.

✗ 一他回家 — 一 never comes before the subject.`,
    formula: ['S', 'ADV', 'V', 'O', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '一', b: '就', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G3-08'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['他/S *一*/ADV 回/V 家/O *就*/ADV 睡觉/V 。', 'As soon as he gets home he goes to sleep.'],
      ['我/S *一*/ADV 看/V *就*/ADV 懂/V 了/SF 。', 'I understood as soon as I looked.'],
      ['天/S *一*/ADV 黑/V ， 他/S *就*/ADV 回/V 家/O 了/SF 。', 'As soon as it got dark, he went home.'],
    ],
    instances: [
      ['她/S *一*/ADV 下课/V *就*/ADV 去/V 图书馆/O 。', 'As soon as class ends she goes to the library.'],
      ['我/S *一*/ADV 到/V 家/O *就*/ADV 给/PP 你 打/V 电话/O 。', "I'll call you as soon as I get home."],
      ['他/S *一*/ADV 喝/V 咖啡/O *就*/ADV 不/ADV 想/MOD 睡觉/V 。', "Whenever he drinks coffee he doesn't feel like sleeping."],
      ['孩子/S *一*/ADV 看见/V 妈妈/O *就*/ADV 笑/V 了/SF 。', 'The child smiled as soon as she saw her mum.'],
      ['我/S *一*/ADV 起床/V *就*/ADV 刷牙/V 。', 'I brush my teeth as soon as I get up.'],
      ['他/S *一*/ADV 有/V 时间/O *就*/ADV 去/V 爬山 。', 'Whenever he has time he goes hiking.'],
      ['电影/S *一*/ADV 结束/V ， 我们/S *就*/ADV 走/V 了/SF 。', 'We left as soon as the film ended.'],
      ['我/S *一*/ADV 听/V *就*/ADV 知道/V 是/O 你 。', 'I knew it was you the moment I heard it.'],
    ],
    decoys: [['才', 'CONJ.PAIR_MISMATCH', '一 pairs with 就 ("as soon as"), not 才.']],
    transforms: [
      { subtype: 'combine', inputs: ['我 到 家 。', '我 给 你 打 电话 。'], chip: '一…就', answer: '我/S 一/ADV 到/V 家/O 就/ADV 给/PP 你 打/V 电话/O 。', en: "I'll call you as soon as I get home.", decoys: [['才', 'CONJ.PAIR_MISMATCH', '一 pairs with 就.']] },
      { subtype: 'combine', inputs: ['她 下课 。', '她 去 图书馆 。'], chip: '一…就', answer: '她/S 一/ADV 下课/V 就/ADV 去/V 图书馆/O 。', en: 'As soon as class ends she goes to the library.', decoys: [['先', 'CONJ.PAIR_MISMATCH', '先 marks a first step, not "as soon as"; pair 一 with 就.']] },
    ],
  },
];
