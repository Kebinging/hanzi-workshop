import type { PatternSource } from './authoring';

// HSK 4 · Unit 9 (unit 21) · 消费 Spending — Quantity & indefinites (provisional).

export const patternsU21: PatternSource[] = [
  {
    id: 'G4-49', unit: 21, title: 'Approximate numbers: 左右 / 多 / 来', titleZh: '概数：左右／多／来',
    summary: 'Number + M + 左右 = about; number + 多 / 来 + M = more than / around.',
    explanationMd: `
- **左右** goes **after** the whole amount: 一百块左右, 半个小时左右 — "about".
- **多** after a round number means "more than": 二十多家商店, 两千多块. With 十 / 百 / 千 / 万 it goes **before** the measure word.
- **来** works like 多 but means "around, give or take": 十来本书.

✗ 左右一百块 · ✗ 二十家多商店.`,
    formula: ['S', 'V', 'O'],
    constraints: [],
    requires: ['G3-01'],
    errorCodes: ['ORDER.GENERAL', 'LEX.MEASURE_WORD'],
    examples: [
      ['这/S 件 衣服 一/V 百 块 *左右* 。', 'This costs about a hundred yuan.'],
      ['商场/S 里 有/V %二十/O *多* 家 商店 。', 'There are more than twenty shops in the mall.'],
      ['我/S 买/V 了/ASP 十/O *来* 本 书 。', 'I bought ten or so books.'],
    ],
    instances: [
      ['我们/S 等/V 了/ASP 半/C 个 小时 *左右* 。', 'We waited about half an hour.'],
      ['这/S 双 皮鞋 三/V 百 块 *左右* 。', 'These leather shoes are about three hundred yuan.'],
      ['他/S %三十/V 岁 *左右* 。', "He's about thirty."],
      ['我/S 每 个 月 的 房租 是/V 两/O 千 *多* 块 。', 'My rent is over two thousand a month.'],
      ['超市/S 里 有/V 一/O 百 *多* 种 水果 。', 'The supermarket has over a hundred kinds of fruit.'],
      ['我/S 在/PP 商场 花/V 了/ASP 五/O 百 *多* 块 。', 'I spent over five hundred yuan at the mall.'],
      ['每/T 天 有/V 一/O 千 *来* 个 快递 。', 'About a thousand parcels arrive every day.'],
      ['我/S 的 工资 是/V 一/O 万 *左右* 。', 'My salary is about ten thousand.'],
      ['他/S 买/V 了/ASP %二十/O *来* 双 袜子 。', 'He bought twenty-odd pairs of socks.'],
      ['去/S 商场 要/V 十/C 分钟 *左右* 。', 'It takes about ten minutes to get to the mall.'],
      ['这/S 个 包裹 有/V 五/O 公斤 *左右* 。', 'This parcel weighs about five kilos.'],
      ['我/S 存/V 了/ASP 一/O 万 *多* 块 钱 。', "I've saved over ten thousand yuan."],
      ['我们/S 下午/T 三 点 *左右* 到/V 。', "We'll arrive at about three in the afternoon."],
      ['这/S 本 书 有/V 三/O 百 *多* 页 。', 'This book has over three hundred pages.'],
      ['这儿/S 有/V 十/O *来* 个 售货员 。', 'There are ten or so shop assistants here.'],
    ],
  },
  {
    id: 'G4-50', unit: 21, title: 'Percentages, multiples and halves: 百分之 / 倍 / 一半', titleZh: '百分之／倍／一半',
    summary: '百分之 N = N per cent; N 倍 = N times; 一半 = half.',
    explanationMd: `
- **百分之** + number: 百分之八十 = 80%. The "hundred" comes **first**.
- **倍**: A 是 B 的两倍 (A is twice B) · A 比 B 大三倍 (A is three times bigger than B) · 增加了两倍.
- **一半**: 吃了一半, 一半的学生.

Rising and falling with percentages: 涨了 / 增加了 / 降低了 + 百分之 N.`,
    formula: ['S', 'V', 'O'],
    constraints: [],
    requires: ['G3-18'],
    errorCodes: ['ORDER.GENERAL', 'LEX.MEASURE_WORD'],
    examples: [
      ['商品/S 的 价格 涨/V 了/ASP *百分之*/O %十 。', 'Prices have gone up ten per cent.'],
      ['他/S 的 收入 是/V 我/O 的 两 *倍* 。', 'His income is twice mine.'],
      ['我/S 吃/V 了/ASP *一半*/O 。', "I've eaten half."],
    ],
    instances: [
      ['*百分之*/S %八十 的 顾客 都/ADV 很/ADV 满意/V 。', 'Eighty per cent of customers are satisfied.'],
      ['这/S 个 商场 比/PP 那 个 大/V 三/C *倍* 。', 'This mall is three times bigger than that one.'],
      ['房租/S 涨/V 了/ASP *一半*/O 。', 'The rent has gone up by half.'],
      ['这/S 个 月 的 收入 增加/V 了/ASP *百分之*/O %二十 。', "This month's income is up twenty per cent."],
      ['网上/S 的 价格 只@zhi3/ADV 是/V 商店/O 的 *一半* 。', 'Online prices are only half of what the shops charge.'],
      ['他/S 赚 的 钱 是/V 我/O 的 三 *倍* 。', 'He earns three times as much as I do.'],
      ['*百分之*/S %九十 的 人 都/ADV 用/V 信用卡/O 。', 'Ninety per cent of people use credit cards.'],
      ['我们/S 班 有/V *一半*/O 的 学生 会 说 英语 。', 'Half the students in our class speak English.'],
      ['这/S 种 商品 的 数量 增加/V 了/ASP 两/C *倍* 。', 'The amount of this product has tripled.'],
      ['我/S 只@zhi3/ADV 花/V 了/ASP *一半*/O 的 钱 。', 'I only spent half the money.'],
      ['广告/S 的 费用 降低/V 了/ASP *百分之*/O %三十 。', 'Advertising costs have fallen thirty per cent.'],
      ['这儿/S 的 东西 比/PP 那儿 贵/V 一/C *倍* 。', 'Things here are twice as expensive as over there.'],
      ['超过/S *一半* 的 人 都/ADV 同意/V 了/SF 。', 'More than half the people agreed.'],
      ['他/S 每 个 月 存/V 下 *百分之*/O %二十 的 工资 。', 'He saves twenty per cent of his salary every month.'],
      ['这/S 双 袜子 的 价格 是/V 那/O 双 的 *一半* 。', 'These socks cost half as much as that pair.'],
    ],
  },
  {
    id: 'G4-51', unit: 21, title: '各 / 每 … 都 (each, every)', titleZh: '“各”和“每…都”',
    summary: '每 + M + N … 都 = every single one; 各 + M + N = each / all the various …; 各 + V = each does V.',
    explanationMd: `
- **每** + M + N (+ 都): every one, with no exceptions — 每件衣服都打折.
- **各** + M + N: each / the various — 各个国家, 各种商品, 各位顾客 (polite address).
- **各** before a verb: each person does it — 我们各买了一双袜子.

Both need a measure word: ✗ 每衣服 · ✗ 各商品.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [],
    requires: ['G3-78'],
    errorCodes: ['LEX.COLLOCATION', 'LEX.MEASURE_WORD'],
    examples: [
      ['*各*/S 个 商店 都/ADV 在/ADV 打折/V 。', 'Every shop is having a sale.'],
      ['*每*/S 个 人 都/ADV 有/V 自己 的 爱好/O 。', 'Everyone has their own hobbies.'],
      ['我们/S *各*/ADV 买/V 了/ASP 一/O 双 袜子 。', 'We each bought a pair of socks.'],
    ],
    instances: [
      ['商场/S 里 有/V *各*/O 种 商品 。', 'The mall has all kinds of goods.'],
      ['*每*/T 次 来 ， 他/S 都/ADV 买/V 很/O 多 东西 。', 'Every time he comes, he buys loads.'],
      ['他们/S *各*/ADV 花/V 了/ASP 一/O 百 块 。', 'They each spent a hundred yuan.'],
      ['请/MOD *各*/S 位 顾客 排队/V 付款/V 。', 'Customers, please queue to pay.'],
      ['*每*/S 件 衣服 都/ADV 打折/V 。', 'Every item of clothing is reduced.'],
      ['*各*/S 个 国家 的 人 都/ADV 来/V 了/SF 。', 'People came from all sorts of countries.'],
      ['*每*/T 个 月 ， 我/S 都/ADV 存/V 一点儿/O 钱 。', 'I save a little money every month.'],
      ['我们/S 学校 有/V *各*/O 个 国家 的 学生 。', 'Our school has students from all over the world.'],
      ['*每*/S 个 包裹 都/ADV 要/MOD 检查/V 。', 'Every parcel has to be checked.'],
      ['*各*/S 家 商店 的 价格 都/ADV 不/ADV 一样/V 。', 'Every shop charges different prices.'],
      ['*每*/T 次 购物 ， 她/S 都/ADV 用/V 信用卡/O 。', 'She uses a credit card every time she shops.'],
      ['他们/S *各*/ADV 买/V 了/ASP 一/O 份 礼物 。', 'They each bought a present.'],
      ['*各*/S 个 部门 都/ADV 要/MOD 节约/V 费用/O 。', 'Every department must cut costs.'],
      ['*每*/S 位 售货员 都/ADV 很/ADV 热情/V 。', 'Every shop assistant is very friendly.'],
      ['*各*/S 种 商品 都/ADV 有/V 广告/O 。', 'All kinds of products have adverts.'],
    ],
    cloze: {
      blank: ['各', '每'],
      distractors: [
        ['所有', 'LEX.COLLOCATION', '所有 can’t be followed directly by a measure word; use 各 / 每 + M.'],
        ['全部', 'LEX.COLLOCATION', '全部 can’t be followed by a measure word.'],
      ],
    },
  },
  {
    id: 'G4-52', unit: 21, title: '所有 / 全部 / 一切 (all, everything)', titleZh: '“所有”“全部”“一切”',
    summary: '所有 + (的) N = all the N; 全部 = the whole lot (also as an adverb); 一切 = everything (often alone).',
    explanationMd: `
- **所有(的)** + noun: 所有的商品都打折。 It needs a noun after it.
- **全部** can modify a noun (全部的钱) or work like an adverb before the verb: 商品全部卖完了.
- **一切** = "everything", usually standing alone as subject or object: 一切都准备好了, 谢谢你做的一切.

All three usually take **都** before the verb when they're the subject.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [],
    requires: ['G4-51'],
    contrasts: ['G4-51'],
    errorCodes: ['LEX.COLLOCATION'],
    examples: [
      ['*所有*/S 的 商品 都/ADV 打折/V 。', 'Everything in the shop is reduced.'],
      ['钱/S *全部*/ADV 花/V 完/C 了/SF 。', 'The money is all spent.'],
      ['*一切*/S 都/ADV 准备/V 好/C 了/SF 。', 'Everything is ready.'],
    ],
    instances: [
      ['*所有*/S 的 人 都/ADV 来/V 了/SF 。', 'Everyone has come.'],
      ['我/S 把/BA *所有* 的 东西 都 放/V 在/C 箱子 里 。', 'I put all my things in the case.'],
      ['作业/TOP 我/S *全部*/ADV 做/V 完/C 了/SF 。', "I've done all my homework."],
      ['*一切*/S 都/ADV 很/ADV 顺利/V 。', 'Everything went smoothly.'],
      ['*所有*/S 的 包裹 都/ADV 送/V 到/C 了/SF 。', 'All the parcels have been delivered.'],
      ['他/S 把/BA 工资 *全部* 存/V 起来/C 了/SF 。', 'He has saved all his wages.'],
      ['谢谢/V 你/O 做 的 *一切* 。', 'Thank you for everything you have done.'],
      ['*所有*/S 的 商店 都/ADV 九/T 点 关/V 门/O 。', 'All the shops close at nine.'],
      ['商品/S *全部*/ADV 卖/V 完/C 了/SF 。', 'The goods are completely sold out.'],
      ['他/S 给/V 了/ASP 我/O *一切* 。', 'He gave me everything.'],
      ['*所有*/S 的 费用 都/ADV 由/PP 公司 提供/V 。', 'All costs are covered by the company.'],
      ['这/S 些 家具 *全部*/ADV 是/V 新/O 的 。', 'All this furniture is new.'],
      ['*一切*/S 都/ADV 会/MOD 好/V 起来/C 的/SF 。', 'Everything will be all right.'],
      ['我/S 认识/V 这儿/O *所有* 的 售货员 。', 'I know all the shop assistants here.'],
      ['*全部*/S 的 钱 是/V 一/O 万 块 。', 'The total is ten thousand yuan.'],
    ],
    cloze: {
      blank: ['一切'],
      distractors: [['所有', 'LEX.COLLOCATION', '所有 needs a noun after it; standing alone, "everything" is 一切.']],
    },
  },
  {
    id: 'G4-53', unit: 21, title: '… 什么的 / 等等 (and so on)', titleZh: '“什么的”和“等等”',
    summary: '什么的 (spoken) or 等等 (written) closes an open list: and so on, etc.',
    explanationMd: `
**Form:** A 和 B + **什么的 / 等等**.

我买了苹果和香蕉什么的 — "I bought apples, bananas and so on".

- **什么的** is casual speech; **等等** (or 等) is more written.
- They go **after** the last item, never before.
- The list is open — there were other similar things too.`,
    formula: ['S', 'V', 'O'],
    constraints: [],
    requires: ['G3-80'],
    errorCodes: ['ORDER.GENERAL'],
    examples: [
      ['我/S 买/V 了/ASP 苹果/O 和 香蕉 *什么的* 。', 'I bought apples, bananas and so on.'],
      ['商场/S 里 有/V 衣服/O 和 家具 *等等* 。', 'The mall has clothes, furniture and so on.'],
      ['我/S 喜欢/V 跑步/O 和 游泳 *什么的* 。', 'I like running, swimming and that sort of thing.'],
    ],
    instances: [
      ['她/S 买/V 了/ASP 毛衣/O 和 围巾 *什么的* 。', 'She bought sweaters, scarves and so on.'],
      ['冬天/T 要/MOD 准备/V 手套/O 和 毛衣 *等等* 。', 'For winter you need gloves, sweaters and the like.'],
      ['超市/S 里 有/V 牛奶/O 和 面包 *什么的* 。', 'The supermarket has milk, bread and so on.'],
      ['你/S 要/MOD 带/V 护照/O 和 信用卡 *等等* 。', 'You need to take your passport, credit card and so on.'],
      ['我/S 周末/T 打扫/V 房间/O 和 洗 衣服 *什么的* 。', 'At weekends I clean my room, do the washing and so on.'],
      ['桌子/S 上 有/V 电池/O 和 塑料袋 *什么的* 。', "There are batteries, plastic bags and stuff on the table."],
      ['商店/S 卖/V 冰箱/O 和 空调 *等等* 。', 'The shop sells fridges, air conditioners and so on.'],
      ['他/S 喜欢/V 吃/V 包子/O 和 饺子 *什么的* 。', 'He likes buns, dumplings and the like.'],
      ['我们/S 讨论/V 了/ASP 价格/O 和 数量 *等等* 。', 'We discussed price, quantity and so on.'],
      ['我/S 想/MOD 买/V 袜子/O 和 手套 *什么的* 。', "I'd like to buy socks, gloves and things."],
      ['她/S 包 里 有/V 钱包/O 和 手机 *什么的* 。', 'Her bag has her wallet, phone and so on.'],
      ['快递/S 可以/MOD 送/V 包裹/O 和 文件 *等等* 。', 'Couriers can deliver parcels, documents and more.'],
      ['他/S 会/MOD 打/V 篮球/O 和 网球 *什么的* 。', 'He can play basketball, tennis and so on.'],
      ['我们/S 准备/V 了/ASP 饼干/O 和 巧克力 *什么的* 。', "We've got biscuits, chocolate and stuff ready."],
      ['书包/S 里 有/V 本子/O 和 笔 *等等* 。', 'The school bag has notebooks, pens and so on.'],
    ],
  },
  {
    id: 'G4-54', unit: 21, title: 'Question word … same question word (whoever …, wherever …)', titleZh: '疑问代词连用：谁…谁',
    summary: 'The same question word in both clauses links them: 谁先到，谁买票 = whoever arrives first buys the tickets.',
    explanationMd: `
**Form:** clause with 谁 / 什么 / 哪儿 / 哪 + M / 多少 / 怎么 , (就) clause with **the same** question word.

谁先到，谁买票 — "whoever gets there first buys the tickets". 你想去哪儿，我们就去哪儿 — "we'll go wherever you want".

- These aren't questions: no 吗, and the sentence ends in 。
- 就 often appears in the second clause.
- Both question words refer to the same person, thing or place.`,
    formula: ['S', 'ADV', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-78'],
    contrasts: ['G3-78'],
    errorCodes: ['ORDER.GENERAL'],
    examples: [
      ['*谁*/S 先/ADV 到/V ， *谁*/S 买/V 票/O 。', 'Whoever gets there first buys the tickets.'],
      ['你/S 想/MOD 去/V *哪儿*/O ， 我们/S 就/ADV 去/V *哪儿*/O 。', "We'll go wherever you want."],
      ['你/S 喜欢/V *什么*/O ， 就/ADV 买/V *什么*/O 。', 'Buy whatever you like.'],
    ],
    instances: [
      ['*谁*/S 想/MOD 去/V ， *谁*/S 就/ADV 去/V 。', 'Whoever wants to go can go.'],
      ['你/S 要/MOD *多少*/O ， 我/S 给/V *多少*/O 。', "I'll give you as many as you want."],
      ['*哪*/S 个 便宜/V ， 我/S 就/ADV 买/V *哪*/O 个 。', "I'll buy whichever is cheaper."],
      ['*谁*/S 赢/V 了/SF ， *谁*/S 请客/V 。', 'Whoever wins treats everyone.'],
      ['你/S *什么*/T 时候 方便/V ， 我们/S 就/ADV *什么*/T 时候 去/V 。', "We'll go whenever suits you."],
      ['*谁*/S 的 钱 多/V ， *谁*/S 付款/V 。', 'Whoever has more money pays.'],
      ['你/S 想/MOD 吃/V *什么*/O ， 我/S 就/ADV 做/V *什么*/O 。', "I'll cook whatever you want to eat."],
      ['*哪儿*/S 便宜/V ， 大家/S 就/ADV 去/V *哪儿*/O 买 。', 'People shop wherever is cheapest.'],
      ['*谁*/S 有/V 问题/O ， *谁*/S 就/ADV 问/V 。', 'Anyone with a question, just ask.'],
      ['你/S 需要/V *多少*/O ， 就/ADV 拿/V *多少*/O 。', 'Take as much as you need.'],
      ['*怎么*/ADV 方便/V ， 就/ADV *怎么*/ADV 做/V 。', 'Do it whichever way is easiest.'],
      ['*谁*/S 先/ADV 来/V ， *谁*/S 先/ADV 选/V 。', 'First come, first choose.'],
      ['你/S 去/V *哪儿*/O ， 我/S 就/ADV 跟/V 到/C *哪儿*/O 。', "Wherever you go, I'll follow."],
      ['*哪*/S 家 商店 打折/V ， 她/S 就/ADV 去/V *哪*/O 家 。', 'She goes to whichever shop has a sale.'],
      ['你/S 喜欢/V *哪*/O 件 ， 就/ADV 挑/V *哪*/O 件 。', 'Pick whichever one you like.'],
    ],
  },
];
