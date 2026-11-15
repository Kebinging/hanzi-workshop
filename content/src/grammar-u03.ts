import type { PatternSource } from './authoring';

// HSK 3 · Unit 3 · 比一比 — Comparison & degree (provisional).
export const patternsU03: PatternSource[] = [
  {
    id: 'G3-17', unit: 3, title: 'A 比 B + Adj + 一点儿 / 多了 / 得多', titleZh: '比字句：程度',
    summary: 'In a 比 comparison, degree words come after the adjective (一点儿, 多了, 得多) or 更 before it — never 很.',
    explanationMd: `
**Form:** A + **比** + B + Adj (+ 一点儿 / 一些 / 多了 / 得多)

- "a bit more": Adj + **一点儿 / 一些** — 他比我高一点儿.
- "much more": Adj + **多了 / 得多** — 今天比昨天冷多了.
- "even more": **更** + Adj — 他比我更忙.

✗ 他比我很高 / 非常高 — 很, 非常, 太 can't modify the adjective in a 比 sentence.`,
    formula: ['S', 'PP', 'V', 'C'],
    constraints: [{ kind: 'before', a: 'PP', b: 'V', code: 'ORDER.COMPARISON' }],
    requires: ['G12-05'],
    contrasts: ['G3-19', 'G3-20'],
    errorCodes: ['ORDER.COMPARISON', 'COMP.DEGREE_IN_BI'],
    examples: [
      ['今天/S *比*/PP 昨天 冷/V 多/C 了 。', "Today is much colder than yesterday."],
      ['他/S *比*/PP 我 高/V 一点儿/C 。', "He's a bit taller than me."],
      ['这/S 件 衣服 *比*/PP 那 件 贵/V 得/C 多 。', 'This piece of clothing is much more expensive than that one.'],
    ],
    instances: [
      ['我/S 哥哥 *比*/PP 我 大/V 。', 'My older brother is older than me.'],
      ['地铁/S *比*/PP 公共汽车 快/V 多/C 了 。', 'The metro is much faster than the bus.'],
      ['北京/S *比*/PP #上海=shànghǎi=Shanghai 冷/V 。', 'Beijing is colder than Shanghai.'],
      ['今天/S *比*/PP 昨天 暖和/V 一点儿/C 。', "Today is a little warmer than yesterday."],
      ['他/S 的 汉语 *比*/PP 我 的 好/V 多/C 了 。', 'His Chinese is much better than mine.'],
      ['这/S 个 房间 *比*/PP 那 个 安静/V 。', 'This room is quieter than that one.'],
      ['夏天/S *比*/PP 冬天 热/V 得/C 多 。', 'Summer is much hotter than winter.'],
      ['坐/S 地铁 *比*/PP 开车 方便/V 。', 'Taking the metro is more convenient than driving.'],
    ],
    decoys: [['很', 'COMP.DEGREE_IN_BI', '很 / 非常 can’t go inside a 比 comparison; put 一点儿 or 多了 after the adjective.']],
    transforms: [
      { subtype: 'rewrite', inputs: ['我 高 。', '他 不 太 高 。'], chip: '比', answer: '我/S 比/PP 他 高/V 。', en: "I'm taller than him.", decoys: [['很', 'COMP.DEGREE_IN_BI', 'No 很 inside a 比 comparison.']] },
      { subtype: 'rewrite', inputs: ['今天 很 冷 。', '昨天 不 太 冷 。'], chip: '比 … 多了', answer: '今天/S 比/PP 昨天 冷/V 多/C 了 。', en: 'Today is much colder than yesterday.', decoys: [['很', 'COMP.DEGREE_IN_BI', 'No 很 inside a 比 comparison.']] },
    ],
  },
  {
    id: 'G3-18', unit: 3, title: 'A 比 B + Adj + exact difference', titleZh: '比字句：具体差别',
    summary: 'The exact amount of difference goes after the adjective: 他比我高五厘米.',
    explanationMd: `
**Form:** A + 比 + B + Adj + **number + measure**

哥哥比弟弟大两岁 — "older by two years". The quantity always follows the adjective; it never comes before it.

✗ 哥哥比弟弟两岁大.`,
    formula: ['S', 'PP', 'V', 'C'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-17'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.DEGREE_IN_BI'],
    examples: [
      ['他/S *比*/PP 我 高/V 五/C 厘米 。', "He's five centimetres taller than me."],
      ['哥哥/S *比*/PP 弟弟 大/V 两/C 岁 。', 'The older brother is two years older than the younger one.'],
      ['这/S 个 *比*/PP 那 个 贵/V %二十/C 块 。', 'This one is twenty yuan more expensive than that one.'],
    ],
    instances: [
      ['今天/S *比*/PP 昨天 冷/V 五/C 度 。', 'Today is five degrees colder than yesterday.'],
      ['我/S 妹妹 *比*/PP 我 小/V 三/C 岁 。', 'My younger sister is three years younger than me.'],
      ['他/S *比*/PP 我 重/V 十/C 公斤 。', "He's ten kilos heavier than me."],
      ['这/S 本 书 *比*/PP 那 本 便宜/V 十/C 块 。', 'This book is ten yuan cheaper than that one.'],
      ['我/S *比*/PP 他 矮/V 三/C 厘米 。', "I'm three centimetres shorter than him."],
      ['你/S 家 *比*/PP 我 家 远/V 两/C 公里 。', 'Your home is two kilometres further than mine.'],
      ['地铁/S *比*/PP 公共汽车 快/V %二十/C 分钟 。', 'The metro is twenty minutes faster than the bus.'],
      ['姐姐/S *比*/PP 我 大/V 五/C 岁 。', 'My older sister is five years older than me.'],
    ],
    decoys: [['很', 'COMP.DEGREE_IN_BI', '很 can’t go inside a 比 comparison.']],
    transforms: [
      { subtype: 'rewrite', inputs: ['哥哥 %二十 岁 。', '弟弟 %十八 岁 。'], chip: '比 + difference', answer: '哥哥/S 比/PP 弟弟 大/V 两/C 岁 。', en: 'The older brother is two years older than the younger one.', decoys: [['很', 'COMP.DEGREE_IN_BI', 'No 很 inside a 比 comparison.']] },
    ],
  },
  {
    id: 'G3-19', unit: 3, title: 'A 没有 B (那么/这么) + Adj', titleZh: '“没有”比较句',
    summary: 'The negative comparison is A 没有 B (那么) Adj — "A is not as … as B".',
    explanationMd: `
**Form:** A + **没有** + B + (那么 / 这么) + Adj

今天没有昨天冷 = today isn't as cold as yesterday. 那么/这么 ("that/this much") is optional and adds emphasis.

✗ 今天不比昨天冷 means something different ("today isn't *colder* than yesterday" — maybe the same). For "not as … as", use 没有.`,
    formula: ['S', 'PP', 'ADV', 'V'],
    constraints: [{ kind: 'before', a: 'PP', b: 'V', code: 'ORDER.COMPARISON' }],
    requires: ['G3-17'],
    contrasts: ['G3-17'],
    errorCodes: ['COMP.NEG_COMPARISON', 'ORDER.COMPARISON'],
    examples: [
      ['今天/S *没有*/PP 昨天 冷/V 。', "Today isn't as cold as yesterday."],
      ['我/S *没有*/PP 他 那么/ADV 高/V 。', "I'm not as tall as him."],
      ['地铁/S *没有*/PP 飞机 快/V 。', "The metro isn't as fast as a plane."],
    ],
    instances: [
      ['这/S 个 菜 *没有*/PP 那 个 好吃/V 。', "This dish isn't as tasty as that one."],
      ['我/S 的 汉语 *没有*/PP 你 的 好/V 。', "My Chinese isn't as good as yours."],
      ['今天/S *没有*/PP 昨天 那么/ADV 热/V 。', "Today isn't as hot as yesterday."],
      ['我/S 家 *没有*/PP 你 家 这么/ADV 大/V 。', "My home isn't as big as yours."],
      ['弟弟/S *没有*/PP 哥哥 高/V 。', "The younger brother isn't as tall as the older one."],
      ['这/S 本 书 *没有*/PP 那 本 有意思/V 。', "This book isn't as interesting as that one."],
      ['南方/S 的 冬天 *没有*/PP 北方 的 冷/V 。', "Winters in the south aren't as cold as in the north."],
      ['他/S *没有*/PP 我 这么/ADV 忙/V 。', "He isn't as busy as me."],
    ],
    decoys: [['不', 'COMP.NEG_COMPARISON', 'A 不 B Adj isn’t a comparison; "not as … as" is A 没有 B Adj.']],
    transforms: [
      { subtype: 'rewrite', inputs: ['今天 比 昨天 冷 。'], chip: '昨天 … 没有', answer: '昨天/S 没有/PP 今天 冷/V 。', en: "Yesterday wasn't as cold as today.", decoys: [['不', 'COMP.NEG_COMPARISON', 'Use 没有 for "not as … as".']] },
    ],
  },
  {
    id: 'G3-20', unit: 3, title: 'A 跟/和 B 一样 (+ Adj)', titleZh: '“跟…一样”',
    summary: 'A 跟 B 一样 = A is the same as B; add an adjective for "as … as": 跟他一样高.',
    explanationMd: `
**Form:** A + **跟 / 和** + B + **一样** (+ Adj)
Negative: A + 跟 B + **不一样** — not 没一样.

- 我的手机跟你的一样 — same as yours.
- 他跟他哥哥一样高 — as tall as his brother.

✗ 我比你一样 — 比 is for differences; sameness is 跟…一样.`,
    formula: ['S', 'PP', 'ADV', 'V'],
    constraints: [{ kind: 'before', a: 'PP', b: 'V', code: 'ORDER.COMPARISON' }],
    requires: ['G3-17'],
    contrasts: ['G3-17'],
    errorCodes: ['COMP.BI_YIYANG', 'ORDER.COMPARISON'],
    examples: [
      ['我/S 的 手机 *跟*/PP 你 的 *一样*/V 。', 'My phone is the same as yours.'],
      ['他/S *跟*/PP 他 哥哥 *一样*/ADV 高/V 。', "He's as tall as his older brother."],
      ['这/S 本 书 *跟*/PP 那 本 不/V *一样* 。', 'This book is different from that one.'],
    ],
    instances: [
      ['今天/S *跟*/PP 昨天 *一样*/ADV 冷/V 。', 'Today is as cold as yesterday.'],
      ['我/S *和*/PP 你 *一样*/ADV 喜欢/V 音乐/O 。', 'I love music just as much as you.'],
      ['她/S 的 衣服 *跟*/PP 我 的 *一样*/V 。', 'Her clothes are the same as mine.'],
      ['北方/S 的 菜 *跟*/PP 南方 的 不/V *一样* 。', 'Northern food is different from southern food.'],
      ['这/S 个 字 *跟*/PP 那 个 字 不/V *一样* 。', 'This character is different from that one.'],
      ['他/S *跟*/PP 我 *一样*/ADV 大/V 。', "He's the same age as me."],
      ['这里/S 的 天气 *跟*/PP 北京 *一样*/ADV 冷/V 。', 'The weather here is as cold as in Beijing.'],
      ['她/S *跟*/PP 她 妈妈 *一样*/ADV 漂亮/V 。', "She's as pretty as her mum."],
    ],
    decoys: [['比', 'COMP.BI_YIYANG', '比 compares a difference; sameness is 跟/和 … 一样.']],
    transforms: [
      { subtype: 'combine', inputs: ['我 %二十 岁 。', '他 也 %二十 岁 。'], chip: '跟…一样 + 大', answer: '我/S 跟/PP 他 一样/ADV 大/V 。', en: "I'm the same age as him.", decoys: [['比', 'COMP.BI_YIYANG', '比 is for differences.']] },
    ],
  },
  {
    id: 'G3-21', unit: 3, title: '越来越 + Adj (more and more)', titleZh: '越来越…',
    summary: '越来越 before an adjective or mental verb: something is changing steadily over time. Usually ends in 了.',
    explanationMd: `
**Form:** Subject + **越来越** + Adj / 喜欢-type verb (+ 了)

天气越来越热了 — getting hotter and hotter. 越来越 already carries the degree, so no 很/非常 after it.

✗ 天气越来越很热.`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [],
    requires: ['G3-02'],
    contrasts: ['G3-22'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'ORDER.ADVERB_POSITION'],
    examples: [
      ['天气/S *越来越*/ADV 热/V 了/SF 。', "It's getting hotter and hotter."],
      ['他/S 的 汉语 *越来越*/ADV 好/V 了/SF 。', 'His Chinese is getting better and better.'],
      ['我/S *越来越*/ADV 喜欢/V 这/O 个 城市 了/SF 。', "I like this city more and more."],
    ],
    instances: [
      ['东西/S *越来越*/ADV 贵/V 了/SF 。', 'Things are getting more and more expensive.'],
      ['她/S *越来越*/ADV 漂亮/V 了/SF 。', "She's getting prettier and prettier."],
      ['学/S 汉语 的 人 *越来越*/ADV 多/V 了/SF 。', 'More and more people are learning Chinese.'],
      ['天/S *越来越*/ADV 冷/V 了/SF 。', "It's getting colder and colder."],
      ['我/S 的 工作 *越来越*/ADV 忙/V 了/SF 。', 'My work is getting busier and busier.'],
      ['这里/S 的 环境 *越来越*/ADV 好/V 了/SF 。', 'The environment here is getting better and better.'],
      ['他/S *越来越*/ADV 胖/V 了/SF 。', "He's getting fatter and fatter."],
      ['我们/S 的 生活 *越来越*/ADV 方便/V 了/SF 。', 'Our lives are getting more and more convenient.'],
    ],
    decoys: [['很', 'COMP.PLACEMENT', '越来越 already expresses degree; no 很.']],
  },
  {
    id: 'G3-22', unit: 3, title: '越…越… (the more … the more …)', titleZh: '越…越…',
    summary: '越 A 越 B: as A increases, so does B. Each 越 goes right before its own verb or adjective.',
    explanationMd: `
**Form:** Subject + **越** + V/Adj₁ + **越** + Adj/V₂

他越说越快 — the more he talked, the faster he went. 东西越新鲜越好吃.

Both 越 are adverbs: each sits directly before its verb/adjective, never before the subject.
越来越 (G3-21) is the special case "more and more as time goes on".`,
    formula: ['S', 'ADV', 'V', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-21'],
    contrasts: ['G3-21'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S *越*/ADV 说/V *越*/ADV 快/V 。', 'The more he talked, the faster he got.'],
      ['这/TOP 个 故事 我/S *越*/ADV 听/V *越*/ADV 喜欢/V 。', 'The more I hear this story, the more I like it.'],
      ['东西/S *越*/ADV 新鲜/V *越*/ADV 好吃/V 。', 'The fresher the food, the tastier it is.'],
    ],
    instances: [
      ['他/S *越*/ADV 走/V *越*/ADV 快/V 。', 'The further he walked, the faster he went.'],
      ['汉语/TOP 我/S *越*/ADV 学/V *越*/ADV 有意思/V 。', 'The more I study Chinese, the more interesting it gets.'],
      ['天/S *越*/ADV 晚/V *越*/ADV 冷/V 。', 'The later it gets, the colder it is.'],
      ['你/S *越*/ADV 着急/V *越*/ADV 容易 错 。', 'The more anxious you are, the easier it is to make mistakes.'],
      ['他/S *越*/ADV 想/V *越*/ADV 生气/V 。', 'The more he thought about it, the angrier he got.'],
      ['孩子/S *越*/ADV 大/V *越*/ADV 聪明/V 。', 'The older the child gets, the cleverer.'],
      ['我/S *越*/ADV 看/V *越*/ADV 喜欢/V 这/O 张 照片 。', 'The more I look at this photo, the more I like it.'],
      ['路/S *越*/ADV 走/V *越*/ADV 远/V 。', 'The more we walked, the further it seemed.'],
    ],
    decoys: [['越来越', 'LEX.NEAR_SYNONYM', '越来越 = more and more over time; 越A越B links two changes.']],
    transforms: [
      { subtype: 'combine', inputs: ['天 晚 了 。', '天 冷 了 。'], chip: '越…越', answer: '天/S 越/ADV 晚/V 越/ADV 冷/V 。', en: 'The later it gets, the colder it is.', decoys: [['越来越', 'LEX.NEAR_SYNONYM', 'Linking two changes needs 越…越.']] },
    ],
  },
  {
    id: 'G3-23', unit: 3, title: '有点儿 vs 一点儿', titleZh: '“有点儿”和“一点儿”',
    summary: '有点儿 + Adj = "a bit (too)", usually a complaint; Adj + 一点儿 = "a bit more", for comparisons and requests.',
    explanationMd: `
- **有点儿** goes **before** the adjective and usually sounds negative: 这件衣服有点儿贵 (a bit too pricey).
- **一点儿** goes **after** the adjective — comparing or asking for change: 便宜一点儿吧, 他比我高一点儿, 说慢一点儿.

✗ 这件衣服一点儿贵 / ✗ 便宜有点儿吧.`,
    formula: ['S', 'ADV', 'V', 'C'],
    constraints: [],
    requires: ['G12-09'],
    errorCodes: ['COMP.PLACEMENT', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['这/S 件 衣服 *有点儿*/ADV 贵/V 。', 'This piece of clothing is a bit pricey.'],
      ['便宜/V *一点儿*/C 吧/SF 。', 'Make it a little cheaper.'],
      ['我/S *有点儿*/ADV 累/V 。', "I'm a bit tired."],
    ],
    instances: [
      ['今天/S *有点儿*/ADV 冷/V 。', "It's a bit cold today."],
      ['请/MOD 你/S 说/V 慢/C *一点儿* 。', 'Please speak a little more slowly.'],
      ['这/S 个 菜 *有点儿*/ADV 甜/V 。', 'This dish is a bit too sweet.'],
      ['他/S 比/PP 我 高/V *一点儿*/C 。', "He's a little taller than me."],
      ['我/S *有点儿*/ADV 不/ADV 舒服/V 。', "I'm feeling a bit unwell."],
      ['你/S 来/V 早/C *一点儿* 吧/SF 。', 'Come a little earlier.'],
      ['这/S 个 问题 *有点儿*/ADV 难/V 。', 'This question is a bit hard.'],
      ['快/V *一点儿*/C ！', 'A bit faster!'],
    ],
  },
  {
    id: 'G3-24', unit: 3, title: 'Adj + 极了 / 死了 / 坏了 / 多了', titleZh: '程度补语：极了／死了／坏了／多了',
    summary: 'These go after an adjective to mean "extremely": 好极了, 累死了, 高兴坏了; 多了 = much more (than before).',
    explanationMd: `
**Form:** Adj + **极了 / 死了 / 坏了 / 多了**

- 极了 — extremely (neutral or positive): 好吃极了.
- 死了 — "to death", strong and colloquial, usually unpleasant: 累死了, 热死了.
- 坏了 — "terribly", for feelings and states: 高兴坏了, 饿坏了.
- 多了 — *much more than before / than something*: 你的汉语好多了.

They come **after** the adjective; 很 or 太…了 go before. ✗ 好吃很了.`,
    formula: ['S', 'V', 'C'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G12-09'],
    contrasts: ['G3-17'],
    errorCodes: ['COMP.PLACEMENT'],
    examples: [
      ['这/S 个 菜 好吃/V *极*/C 了 。', 'This dish is absolutely delicious.'],
      ['我/S 累/V *死*/C 了 。', "I'm dead tired."],
      ['他/S 高兴/V *坏*/C 了 。', 'He was overjoyed.'],
    ],
    instances: [
      ['今天/S 热/V *死*/C 了 。', "It's boiling today."],
      ['这里/S 的 环境 好/V *极*/C 了 。', 'The surroundings here are wonderful.'],
      ['孩子/S 饿/V *坏*/C 了 。', 'The child is starving.'],
      ['你/S 的 汉语 好/V *多*/C 了 。', 'Your Chinese is much better (than before).'],
      ['这/S 个 电影 有意思/V *极*/C 了 。', 'This film is incredibly interesting.'],
      ['我/S 渴/V *死*/C 了 。', "I'm dying of thirst."],
      ['北京/S 的 冬天 冷/V *死*/C 了 。', 'Beijing winters are freezing.'],
      ['他/S 的 房间 干净/V *极*/C 了 。', 'His room is spotless.'],
    ],
    decoys: [['很', 'COMP.PLACEMENT', '很 goes before an adjective, not after it.']],
    cloze: {
      blank: ['极', '死', '坏', '多'],
      distractors: [
        ['很', 'COMP.PLACEMENT', '很 goes before the adjective; after it you need 极了 / 死了 / 坏了.'],
        ['太', 'COMP.PLACEMENT', '太…了 wraps the adjective: 太好吃了, not 好吃太了.'],
      ],
    },
  },
];
