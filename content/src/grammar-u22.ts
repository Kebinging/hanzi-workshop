import type { PatternSource } from './authoring';

// HSK 4 · Unit 10 (unit 22) · 环境 Environment — Change & alternation (provisional).

const ZHONG = '种@zhong4v';
const GQ = '过去@guoqu_v';

export const patternsU22: PatternSource[] = [
  {
    id: 'G4-55', unit: 22, title: '变得 + Adj / 成为 + N (become)', titleZh: '“变得”和“成为”',
    summary: '变得 + adjective describes a change of quality; 成为 + noun says what something becomes.',
    explanationMd: `
- **变 + 得 + (degree) + Adj**: 城市变得越来越美丽 — a quality changes.
- **成为 + noun**: 这儿成为了一个有名的地方 — becomes a new kind of thing.
- **变成 + noun**: turns into (often physically): 水变成了冰.

✗ 成为很漂亮 (adjective after 成为) · ✗ 变得一个城市 (noun after 变得).`,
    formula: ['S', 'V', 'C', 'C'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-39', 'G3-21'],
    errorCodes: ['COMP.PLACEMENT', 'LEX.COLLOCATION'],
    examples: [
      ['城市/S *变*/V 得/C 越来越/C 美丽 。', 'The city is getting more and more beautiful.'],
      ['这儿/S *成为*/V 了/ASP 一/O 个 有名 的 地方 。', 'This has become a famous place.'],
      ['天气/S *变*/V 得/C 很/C 干燥 。', 'The weather has turned very dry.'],
    ],
    instances: [
      ['河/S 水 *变*/V 得/C 很/C 干净 。', 'The river water has become very clean.'],
      ['他/S *成为*/V 了/ASP 一/O 个 有名 的 医生 。', 'He became a famous doctor.'],
      ['天空/S *变*/V 得/C 很/C 暗 。', 'The sky went very dark.'],
      ['这/S 个 小 城市 *成为*/V 了/ASP 现代/O 的 大 城市 。', 'This small town has become a modern city.'],
      ['湖/S 水 *变*/V 得/C 越来越/C 浅 。', 'The lake is getting shallower and shallower.'],
      ['保护/S 环境 *成为*/V 了/ASP 大家/O 的 共同 目标 。', 'Protecting the environment has become a goal we all share.'],
      ['叶子/S *变*/V 红/C 了/SF 。', 'The leaves have turned red.'],
      ['雾/S 太 大 ， 路/S *变*/V 得/C 很/C 危险 。', 'The fog is so thick the roads have become dangerous.'],
      ['这儿/S 以后 会 *成为*/V 一/O 个 大 公园 。', 'This will become a big park.'],
      ['她/S *变*/V 得/C 越来越/C 漂亮 了 。', "She's getting prettier and prettier."],
      ['地球/S *变*/V 得/C 越来越/C 热 了 。', 'The earth is getting hotter and hotter.'],
      ['塑料/S 垃圾 *成为*/V 了/ASP 一/O 个 大 问题 。', 'Plastic waste has become a big problem.'],
      ['冬天/T 湖/S 里 的 水 *变*/V 成/C 了 冰 。', 'In winter the lake water turns to ice.'],
      ['他/S 的 梦想 是/V *成为*/V 一/O 个 导游 。', 'His dream is to become a tour guide.'],
      ['空气/S *变*/V 得/C 越来越/C 新鲜 了 。', 'The air is getting fresher and fresher.'],
    ],
  },
  {
    id: 'G4-56', unit: 22, title: 'V满 (fill) / V遍 (all over)', titleZh: '结果补语：满／遍',
    summary: 'V + 满 = so that the place is full; V + 遍 = everywhere, every one.',
    explanationMd: `
- **满** "full": 房间里坐满了人 — "the room is packed". Usually *place* + V满了 + thing.
- **遍** "all over, every one": 我找遍了整个商场 — "I searched the whole mall".

Both are result complements (G3-33): 了 follows the complement, and the object comes after.`,
    formula: ['S', 'V', 'C', 'O'],
    constraints: [
      { kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' },
      { kind: 'before', a: 'C', b: 'O', code: 'COMP.PLACEMENT' },
    ],
    requires: ['G3-33', 'G3-46'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.RESULT_CHOICE'],
    examples: [
      ['房间/S 里 坐/V *满*/C 了/ASP 人/O 。', 'The room is packed with people.'],
      ['我/S 找/V *遍*/C 了/ASP 整个 商场/O ， 也/ADV 没/ADV 找/V 到/C 。', "I searched the whole mall and still didn't find it."],
      ['天空/S 中 挂/V *满*/C 了/ASP 星星/O 。', 'The sky is full of stars.'],
    ],
    instances: [
      [`公园/S 里 ${ZHONG}/V *满*/C 了/ASP 花/O 。`, 'The park is planted full of flowers.'],
      ['他/S 走/V *遍*/C 了/ASP 这/O 个 城市 。', "He's walked all over this city."],
      ['桌子/S 上 放/V *满*/C 了/ASP 书/O 。', 'The desk is covered in books.'],
      ['河/S 上 停/V *满*/C 了/ASP 船/O 。', 'The river is full of moored boats.'],
      ['他/S 去/V *遍*/C 了/ASP 中国/O 的 每 个 省 。', "He's been to every province in China."],
      ['杯子/S 里 倒/V *满*/C 了/ASP 水/O 。', 'The glass has been filled to the brim.'],
      ['树/S 上 开/V *满*/C 了/ASP 花/O 。', 'The tree is in full bloom.'],
      ['我/S 问/V *遍*/C 了/ASP 所有/O 的 朋友 。', "I've asked all my friends."],
      ['冰箱/S 里 装/V *满*/C 了/ASP 食物/O 。', 'The fridge is stuffed with food.'],
      ['他/S 看/V *遍*/C 了/ASP 这儿/O 的 风景 。', "He's seen all the sights here."],
      ['天空/S 中 飞/V *满*/C 了/ASP 鸟/O 。', 'The sky is full of birds.'],
      ['街/S 上 停/V *满*/C 了/ASP 车/O 。', 'The street is lined with parked cars.'],
      ['我/S 找/V *遍*/C 了/ASP 家/O 里 的 每 个 地方 。', "I've searched every corner of the house."],
      ['墙/S 上 挂/V *满*/C 了/ASP 照片/O 。', 'The walls are covered in photos.'],
      ['我/S 跑/V *遍*/C 了/ASP 附近/O 的 商店 。', "I've been round every shop nearby."],
    ],
    cloze: {
      blank: ['满', '遍'],
      distractors: [
        ['见', 'COMP.RESULT_CHOICE', '见 = perceived; "full of / all over" is 满 / 遍.'],
        ['懂', 'COMP.RESULT_CHOICE', '懂 = understood; "full of / all over" is 满 / 遍.'],
      ],
    },
  },
  {
    id: 'G4-57', unit: 22, title: '有的 … 有的 … (some …, others …)', titleZh: '有的…有的…',
    summary: '有的 … 有的 … splits a group into parts that do or are different things.',
    explanationMd: `
**Form:** (group，) **有的** (N) + A，**有的** (N) + B.

有的人喜欢夏天，有的人喜欢冬天 — "some people like summer, others like winter".

- 有的 goes **before** the noun (有的人, 有的地方) or stands for it when the group is clear.
- The group is often named first as a topic: 公园里的人，有的在跑步，有的在散步.
- There can be a third part: 有的…，有的…，还有的…`,
    formula: ['S', 'V', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G3-95'],
    errorCodes: ['ORDER.SUBJECT'],
    examples: [
      ['*有的*/S 人 喜欢/V 夏天/O ， *有的*/S 人 喜欢/V 冬天/O 。', 'Some people like summer, others like winter.'],
      ['这儿/TOP 的 树 ， *有的*/S 高/V ， *有的*/S 矮/V 。', 'Some of the trees here are tall, some short.'],
      ['*有的*/S 植物 喜欢/V 阳光/O ， *有的*/S 不/ADV 喜欢/V 。', "Some plants like sunshine, some don't."],
    ],
    instances: [
      ['公园/TOP 里 的 人 ， *有的*/S 在/ADV 跑步/V ， *有的*/S 在/ADV 散步/V 。', 'In the park, some people are running and some are walking.'],
      ['*有的*/S 地方 下雨/V ， *有的*/S 地方 刮风/V 。', "It's raining in some places and windy in others."],
      ['这/TOP 些 叶子 ， *有的*/S 是/V 绿/O 的 ， *有的*/S 是/V 红/O 的 。', 'Some of these leaves are green, some are red.'],
      ['*有的*/S 动物 喜欢/V 冷/O ， *有的*/S 喜欢/V 热/O 。', 'Some animals like the cold, others the heat.'],
      ['湖/TOP 里 的 鱼 ， *有的*/S 大/V ， *有的*/S 小/V 。', 'Some of the fish in the lake are big, some small.'],
      ['*有的*/S 人 骑/V 自行车/O ， *有的*/S 人 坐/V 地铁/O 。', 'Some people cycle, some take the metro.'],
      ['*有的*/S 城市 的 空气 很/ADV 好/V ， *有的*/S 城市 的 空气 很/ADV 脏/V 。', 'Some cities have clean air, others dirty.'],
      ['这/TOP 些 星星 ， *有的*/S 亮/V ， *有的*/S 暗/V 。', 'Some of these stars are bright, some dim.'],
      ['*有的*/S 河 很/ADV 深/V ， *有的*/S 很/ADV 浅/V 。', 'Some rivers are deep, some shallow.'],
      ['*有的*/S 季节 很/ADV 干燥/V ， *有的*/S 季节 常常/ADV 下雨/V 。', 'Some seasons are dry, others often rainy.'],
      ['*有的*/S 学生 喜欢/V 自然/O ， *有的*/S 喜欢/V 科学/O 。', 'Some students like nature, others science.'],
      ['*有的*/S 路 很/ADV 宽/V ， *有的*/S 很/ADV 窄/V 。', 'Some roads are wide, some narrow.'],
      ['这/TOP 些 书 ， *有的*/S 很/ADV 厚/V ， *有的*/S 很/ADV 薄/V 。', 'Some of these books are thick, some thin.'],
      ['*有的*/S 云 很/ADV 白/V ， *有的*/S 很/ADV 暗/V 。', 'Some clouds are white, some dark.'],
      [`*有的*/S 人 ${ZHONG}/V 花/O ， *有的*/S 人 ${ZHONG}/V 树/O 。`, 'Some people plant flowers, others trees.'],
    ],
  },
  {
    id: 'G4-58', unit: 22, title: '一会儿 … 一会儿 … (now …, now …)', titleZh: '一会儿…一会儿…',
    summary: '一会儿 A，一会儿 B: two states or actions keep alternating.',
    explanationMd: `
**Form:** Subject + **一会儿** + A，**一会儿** + B.

天气一会儿晴，一会儿阴 — "the weather keeps changing from sunny to cloudy".

- Each 一会儿 goes right before its verb or adjective.
- A and B are usually opposites or contrasting actions.
- Compare 又…又 (G3-85): both at once; 一会儿…一会儿: one after the other, back and forth.`,
    formula: ['S', 'ADV', 'V', 'ADV', 'V'],
    constraints: [{ kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' }],
    requires: ['G3-85'],
    contrasts: ['G3-85'],
    errorCodes: ['ORDER.ADVERB_POSITION'],
    examples: [
      ['天气/S *一会儿*/ADV 晴/V ， *一会儿*/ADV 阴/V 。', 'The weather keeps switching between sun and cloud.'],
      ['孩子/S *一会儿*/ADV 哭/V ， *一会儿*/ADV 笑/V 。', 'The child is crying one minute and laughing the next.'],
      ['他/S *一会儿*/ADV 看/V 书/O ， *一会儿*/ADV 看/V 手机/O 。', 'He keeps switching between his book and his phone.'],
    ],
    instances: [
      ['今天/S *一会儿*/ADV 下雨/V ， *一会儿*/ADV 刮风/V 。', "Today it's been raining one minute, windy the next."],
      ['天空/S *一会儿*/ADV 亮/V ， *一会儿*/ADV 暗/V 。', 'The sky keeps going light and dark.'],
      ['她/S *一会儿*/ADV 说/V 冷/O ， *一会儿*/ADV 说/V 热/O 。', "One minute she's cold, the next she's hot."],
      ['温度/S *一会儿*/ADV 高/V ， *一会儿*/ADV 低/V 。', 'The temperature keeps going up and down.'],
      [`小狗/S *一会儿*/ADV 跑/V 过来/C ， *一会儿*/ADV 跑/V ${GQ}/C 。`, 'The puppy keeps running back and forth.'],
      ['他/S *一会儿*/ADV 站/V 起来/C ， *一会儿*/ADV 坐/V 下/C 。', 'He keeps standing up and sitting down.'],
      ['云/S *一会儿*/ADV 多/V ， *一会儿*/ADV 少/V 。', 'The clouds come and go.'],
      ['我/S 的 心情 *一会儿*/ADV 好/V ， *一会儿*/ADV 不/ADV 好/V 。', 'My mood keeps going up and down.'],
      ['鸟/S *一会儿*/ADV 飞/V 到/C 树 上 ， *一会儿*/ADV 飞/V 到/C 湖 上 。', 'The bird flits between the tree and the lake.'],
      ['他/S *一会儿*/ADV 想/MOD 去/V ， *一会儿*/ADV 又/ADV 不/ADV 想/MOD 去/V 。', "One minute he wants to go, the next he doesn't."],
      ['雾/S *一会儿*/ADV 大/V ， *一会儿*/ADV 小/V 。', 'The fog keeps thickening and thinning.'],
      ['孩子/S *一会儿*/ADV 要/V 喝/V 水/O ， *一会儿*/ADV 要/V 吃/V 饼干/O 。', 'The child wants water one minute and biscuits the next.'],
      ['阳光/S *一会儿*/ADV 出来/V ， *一会儿*/ADV 又/ADV 没有/V 了/SF 。', 'The sun keeps coming out and disappearing again.'],
      ['她/S *一会儿*/ADV 开/V 灯/O ， *一会儿*/ADV 关/V 灯/O 。', 'She keeps switching the light on and off.'],
      ['海/S 上 的 船 *一会儿*/ADV 近/V ， *一会儿*/ADV 远/V 。', 'The boat at sea keeps coming closer and drifting away.'],
    ],
  },
  {
    id: 'G4-59', unit: 22, title: '不是 A，而是 B (not A but B)', titleZh: '不是…而是…',
    summary: '不是 A，而是 B rejects one explanation or identity and gives the right one.',
    explanationMd: `
**Form:** Subject + **不是** + A，**而是** + B.

这不是雾，而是污染 — "this isn't fog, it's pollution".

- A is the mistaken idea; B is the truth.
- Often used with 因为 for reasons: 不是因为…，而是因为…
- Compare **不是…就是** (G4-60): "either A or B".`,
    formula: ['S', 'ADV', 'V', 'O', 'P', 'CONJ2', 'V', 'O'],
    constraints: [],
    requires: ['G3-81'],
    contrasts: ['G4-60'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['这/S 不/ADV 是/V 雾/O ， *而*/CONJ2 是/V 污染/O 。', "This isn't fog — it's pollution."],
      ['问题/S 不/ADV 是/V 钱/O ， *而*/CONJ2 是/V 时间/O 。', "The problem isn't money, it's time."],
      ['他/S 不/ADV 是/V 不/O 想 来 ， *而*/CONJ2 是/V 没有/O 时间 。', "It's not that he doesn't want to come — he has no time."],
    ],
    instances: [
      ['我/S 不/ADV 是/V 不/O 喜欢 ， *而*/CONJ2 是/V 太/O 贵 了 。', "It's not that I don't like it — it's too expensive."],
      ['这/S 不/ADV 是/V 湖/O ， *而*/CONJ2 是/V 海/O 。', "This isn't a lake, it's the sea."],
      ['他们/S 不/ADV 是/V 游客/O ， *而*/CONJ2 是/V 当地/O 人 。', "They aren't tourists, they're locals."],
      ['天/S 黑 不/ADV 是/V 因为/O 晚 了 ， *而*/CONJ2 是/V 因为/O 云 太 多 。', "It's dark not because it's late but because it's so cloudy."],
      ['这/S 个 问题 不/ADV 是/V 一/O 个 人 的 ， *而*/CONJ2 是/V 大家/O 的 。', "This isn't one person's problem — it's everyone's."],
      ['保护/S 环境 不/ADV 是/V 政府/O 一 个 人 的 事情 ， *而*/CONJ2 是/V 每/O 个 人 的 责任 。', "Protecting the environment isn't only the government's job; it's everyone's responsibility."],
      ['他/S 不/ADV 是/V 生气/O ， *而*/CONJ2 是/V 太/O 累 了 。', "He's not angry, he's just exhausted."],
      ['那/S 不/ADV 是/V 星星/O ， *而*/CONJ2 是/V 飞机/O 。', "That's not a star, it's a plane."],
      ['我/S 学 汉语 不/ADV 是/V 为了/O 工作 ， *而*/CONJ2 是/V 因为/O 喜欢 。', "I study Chinese not for work but because I enjoy it."],
      ['他/S 不/ADV 是/V 医生/O ， *而*/CONJ2 是/V 护士/O 。', "He's not a doctor, he's a nurse."],
      ['这/S 种 植物 不/ADV 是/V 草/O ， *而*/CONJ2 是/V 花/O 。', "This plant isn't a grass, it's a flower."],
      ['重要/S 的 不/ADV 是/V 输/O 赢 ， *而*/CONJ2 是/V 参加/O 。', "What matters isn't winning or losing, it's taking part."],
      ['天气/S 变 冷 不/ADV 是/V 因为/O 下 雪 ， *而*/CONJ2 是/V 因为/O 刮风 。', "It got cold not because of snow but because of the wind."],
      ['她/S 哭 不/ADV 是/V 因为/O 难过 ， *而*/CONJ2 是/V 因为/O 高兴 。', "She's crying not because she's sad but because she's happy."],
      ['地球/S 不/ADV 是/V 我们/O 一 个 人 的 ， *而*/CONJ2 是/V 大家/O 的 。', "The earth doesn't belong to any one of us — it belongs to everyone."],
    ],
    decoys: [['就', 'CONJ.PAIR_MISMATCH', '不是…就是 = either…or; "not A but B" is 不是…而是.']],
  },
  {
    id: 'G4-60', unit: 22, title: '不是 A，就是 B (either A or B)', titleZh: '不是…就是…',
    summary: '不是 A，就是 B: it is always one of the two — often a complaint about repetition.',
    explanationMd: `
**Form:** Subject + **不是** + A，**就是** + B.

这儿的冬天不是下雪，就是刮风 — "winter here is either snowy or windy".

- It sums up a situation where there's no third option.
- Often a mild complaint: 最近不是下雨，就是有雾.
- Compare **不是…而是** (G4-59): not A, but B.`,
    formula: ['S', 'ADV', 'V', 'O', 'P', 'ADV', 'V', 'O'],
    constraints: [],
    requires: ['G4-59'],
    contrasts: ['G4-59'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['周末/T 他/S 不/ADV 是/V 看/O 书 ， *就*/ADV 是/V 睡觉/O 。', 'At weekends he either reads or sleeps.'],
      ['这儿/S 的 冬天 不/ADV 是/V 下/O 雪 ， *就*/ADV 是/V 刮风/O 。', 'Winter here is either snowy or windy.'],
      ['他/S 不/ADV 是/V 在/O 家 ， *就*/ADV 是/V 在/O 公园 。', "He's either at home or in the park."],
    ],
    instances: [
      ['最近/T 不/ADV 是/V 下雨/O ， *就*/ADV 是/V 有/O 雾 。', "Lately it's either raining or foggy."],
      ['晚饭/S 不/ADV 是/V 米饭/O ， *就*/ADV 是/V 面条/O 。', 'Dinner is always either rice or noodles.'],
      ['她/S 不/ADV 是/V 太/O 忙 ， *就*/ADV 是/V 太/O 累 。', "She's always either too busy or too tired."],
      ['路/S 上 不/ADV 是/V 车/O ， *就*/ADV 是/V 人/O 。', 'The road is full of cars and people.'],
      ['他/S 每 天 不/ADV 是/V 工作/O ， *就*/ADV 是/V 运动/O 。', "Every day he's either working or exercising."],
      ['天气/S 不/ADV 是/V 太/O 热 ， *就*/ADV 是/V 太/O 冷 。', "The weather is always either too hot or too cold."],
      ['公园/S 里 不/ADV 是/V 树/O ， *就*/ADV 是/V 花/O 。', 'The park is all trees and flowers.'],
      ['他/S 说 的 不/ADV 是/V 天气/O ， *就*/ADV 是/V 环境/O 。', "He only ever talks about the weather or the environment."],
      ['孩子/S 不/ADV 是/V 哭/O ， *就*/ADV 是/V 笑/O 。', 'The child is either crying or laughing.'],
      ['这儿/S 的 鸟 不/ADV 是/V 白/O 的 ， *就*/ADV 是/V 黑/O 的 。', 'The birds here are either white or black.'],
      ['他/S 不/ADV 是/V 迟到/O ， *就*/ADV 是/V 请假/O 。', "He's always either late or off."],
      ['湖/S 上 不/ADV 是/V 船/O ， *就*/ADV 是/V 鸟/O 。', 'The lake is covered in boats and birds.'],
      ['我/S 周末 不/ADV 是/V 去/O 爬山 ， *就*/ADV 是/V 去/O 游泳 。', 'At weekends I go either hiking or swimming.'],
      ['他/S 喝 的 不/ADV 是/V 茶/O ， *就*/ADV 是/V 咖啡/O 。', 'He drinks either tea or coffee.'],
      ['这儿/S 的 夏天 不/ADV 是/V 下雨/O ， *就*/ADV 是/V 很/O 热 。', 'Summer here is either rainy or very hot.'],
    ],
    decoys: [['而', 'CONJ.PAIR_MISMATCH', '不是…而是 = not A but B; "either A or B" is 不是…就是.']],
  },
];
