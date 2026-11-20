import type { PatternSource } from './authoring';

// HSK 5 · Unit 7 (unit 31) · 城市交通 City life — Prepositions of time & manner (provisional).

const PPV = { kind: 'before', a: 'PP', b: 'V', code: 'ORDER.PLACE_AFTER_VERB' } as const;

export const patternsU31: PatternSource[] = [
  {
    id: 'G5-37', unit: 31, title: '自从 … (以来) (ever since)', titleZh: '自从…（以来）',
    summary: '自从 + past point (以来): since then, a new situation has held.',
    explanationMd: `
**Form:** **自从** + past event / time (+ **以来**)，new situation.

自从有了地铁以来，交通方便多了 — "since the metro opened, getting around is much easier".

- Only for the **past** up to now; for the future use 从…起.
- 以来 is optional and slightly formal.`,
    formula: ['PP', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G3-15'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*自从*/PP 搬 到 这儿 ， 我/S 每/T 天 都 步行/V 上班 。', "Ever since I moved here, I've walked to work every day."],
      ['*自从*/PP 有 了 地铁 *以来* ， 交通/S 方便/V 多/C 了 。', 'Since the metro opened, getting around is much easier.'],
      ['*自从*/PP 他 学 会 了 驾驶 ， 他/S 就/ADV 很 少 坐/V 公交/O 了 。', 'Since he learned to drive, he rarely takes the bus.'],
    ],
    instances: [
      ['*自从*/PP 小区 有 了 物业 ， 环境/S 好/V 多/C 了 。', 'Since the estate got property management, it has looked much better.'],
      ['*自从*/PP 房价 上升 *以来* ， 租房/S 的 人 越来越/ADV 多/V 。', 'Since house prices went up, more and more people rent.'],
      ['*自从*/PP 修建 了 这 座 桥梁 ， 去/S 对面 方便/V 多/C 了 。', 'Since the bridge was built, getting across is much easier.'],
      ['*自从*/PP 有 了 导航 ， 我/S 再/ADV 也/ADV 没有/V 迷路/V 过/ASP 。', "Since I got satnav, I've never got lost."],
      ['*自从*/PP 搬 到 市区 ， 他/S 每/T 天 都 打车/V 。', 'Since he moved downtown, he takes a taxi every day.'],
      ['*自从*/PP 这 条 路 改造 了 *以来* ， 车辆/S 越来越/ADV 多/V 。', 'Since this road was rebuilt, there has been more and more traffic.'],
      ['*自从*/PP 有 了 共享 自行车 ， 很/S 多 人 都/ADV 骑/V 车/O 上班 。', 'Since bike sharing arrived, many people cycle to work.'],
      ['*自从*/PP 我 住 进 这 个 公寓 ， 就/ADV 认识/V 了/ASP 很/O 多 邻居 。', "Since I moved into this flat, I've got to know lots of neighbours."],
      ['*自从*/PP 这儿 建设 了 大厦 ， 街头/S 就/ADV 更/ADV 繁华/V 了/SF 。', 'Since the tower went up, the street has become even busier.'],
      ['*自从*/PP 地铁 开 了 *以来* ， 马路/S 上 就/ADV 不/ADV 那么/ADV 拥挤/V 了/SF 。', "Since the metro opened, the roads aren't so crowded."],
      ['*自从*/PP 搬 到 郊区 ， 我们/S 的 房子 宽敞/V 多/C 了 。', 'Since moving to the suburbs, our home is much roomier.'],
      ['*自从*/PP 有 了 垃圾桶 ， 街道/S 干净/V 多/C 了 。', 'Since the bins were put in, the streets are much cleaner.'],
      ['*自从*/PP 他 拿 到 驾照 ， 就/ADV 每/T 天 开车/V 。', 'Since he got his licence, he drives every day.'],
      ['*自从*/PP 治安 好 了 *以来* ， 居民/S 晚上/T 也/ADV 敢/MOD 出门/V 了/SF 。', 'Since public safety improved, residents dare to go out at night.'],
      ['*自从*/PP 有 了 绿化 ， 小区/S 漂亮/V 多/C 了 。', 'Since the trees were planted, the estate looks much nicer.'],
    ],
    cloze: {
      blank: ['自从'],
      distractors: [
        ['从来', 'LEX.NEAR_SYNONYM', '从来 = always / never (with 不 / 没); "since (a past point)" is 自从.'],
        ['如果', 'LEX.NEAR_SYNONYM', '如果 sets a condition.'],
      ],
    },
  },
  {
    id: 'G5-38', unit: 31, title: '趁 (while, taking advantage of)', titleZh: '趁',
    summary: '趁 + a favourable time or condition: do something while the chance lasts.',
    explanationMd: `
**Form:** (Subject) + **趁** + favourable condition + verb phrase.

我们趁天气好去公园吧 — "let's go to the park while the weather's good".

- The condition won't last, so act now.
- 趁 + short phrase: 趁热, 趁年轻, 趁周末, 趁还没堵车.`,
    formula: ['S', 'PP', 'V', 'O'],
    constraints: [PPV],
    requires: ['G3-15'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['我们/S *趁*/PP 天气 好 去/V 公园/O 吧/SF 。', "Let's go to the park while the weather's good."],
      ['*趁*/PP 年轻 ， 多/ADV 学/V 一点儿/O 东西 。', 'Learn as much as you can while you are young.'],
      ['你/S *趁*/PP 热 吃/V 吧/SF 。', 'Eat it while it is hot.'],
    ],
    instances: [
      ['*趁*/PP 还 没 堵车 ， 我们/S 快/ADV 出发/V 。', "Let's set off before the traffic builds up."],
      ['我/S *趁*/PP 周末 去/V 租/V 了/ASP 一/O 个 房子 。', 'I used the weekend to rent a flat.'],
      ['*趁*/PP 房价 还 不 高 ， 他/S 买/V 了/ASP 一/O 个 公寓 。', 'He bought a flat while prices were still low.'],
      ['他/S *趁*/PP 午饭 的 时间 去/V 了/ASP 银行/O 。', 'He went to the bank in his lunch break.'],
      ['*趁*/PP 天 还 没 黑 ， 我们/S 回/V 家/O 吧/SF 。', "Let's get home before it gets dark."],
      ['我/S 想/MOD *趁*/PP 假期 去/V 旅行/O 。', "I'd like to travel during the holidays."],
      ['*趁*/PP 公交 还 没 来 ， 我/S 去/V 买/V 了/ASP 一/O 瓶 水 。', 'While waiting for the bus, I went and bought some water.'],
      ['你/S *趁*/PP 这 个 机会 好好@hao=hǎo_hǎo 休息/V 一下/C 。', 'Take this chance to have a proper rest.'],
      ['*趁*/PP 夜景 最 漂亮 的 时候 ， 我们/S 去/V 拍/V 照片/O 。', "Let's take photos while the night view is at its best."],
      ['他/S *趁*/PP 大家 不 注意 ， 走/V 了/SF 。', 'He slipped away while nobody was looking.'],
      ['*趁*/PP 路 上 人 少 ， 我/S 步行/V 去/V 了/ASP 公司/O 。', 'While the streets were quiet, I walked to the office.'],
      ['她/S *趁*/PP 孩子 睡觉 的 时候 做/V 家务/O 。', 'She does the housework while the child is asleep.'],
      ['*趁*/PP 房东 在 家 ， 我们/S 去/V 交/V 房租/O 吧/SF 。', "Let's pay the rent while the landlord is in."],
      ['我/S *趁*/PP 下班 以后 去/V 了/ASP 超市/O 。', 'I went to the supermarket after work.'],
      ['*趁*/PP 还 有 时间 ， 我们/S 再/ADV 检查/V 一下/C 路线/O 。', "While there's still time, let's check the route again."],
    ],
    cloze: {
      blank: ['趁'],
      distractors: [
        ['从', 'LEX.NEAR_SYNONYM', '从 = from; "taking the chance while" is 趁.'],
        ['向', 'LEX.NEAR_SYNONYM', '向 = towards.'],
      ],
    },
  },
  {
    id: 'G5-39', unit: 31, title: '沿着 (along)', titleZh: '沿着',
    summary: '沿着 + a road, river or route: moving or spread along it.',
    explanationMd: `
**Form:** Subject + **沿着** + path + verb.

我们沿着这条路一直走 — "we keep walking along this road".

- The 沿着-phrase comes before the verb.
- It can also open a sentence about what lies along something: 沿着这条街，有很多商店。`,
    formula: ['S', 'PP', 'V'],
    constraints: [PPV],
    requires: ['G3-15'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['我们/S *沿着*/PP 这 条 路 一直 走/V 。', 'We keep walking along this road.'],
      ['你/S *沿着*/PP 人行道 走/V 。', 'Walk along the pavement.'],
      ['车/S *沿着*/PP 高速公路 开/V 了/ASP 两/C 个 小时 。', 'The car drove along the motorway for two hours.'],
    ],
    instances: [
      ['我们/S *沿着*/PP 河 散步/V 。', 'We walk along the river.'],
      ['他/S *沿着*/PP 街道 找/V 他/O 的 车 。', 'He walked along the street looking for his car.'],
      ['*沿着*/PP 这 条 路线 ， 你/S 能/MOD 看/V 到/C 很/O 多 夜景 。', 'Along this route you can see lots of night views.'],
      ['你/S *沿着*/PP 马路 一直/ADV 走/V ， 就/ADV 能/MOD 看/V 到/C 那/O 座 大厦 。', 'Keep going along the road and you will see that tower.'],
      ['我们/S *沿着*/PP 地图 上 的 路线 走/V 。', 'We follow the route on the map.'],
      ['公交/S *沿着*/PP 河 开/V 。', 'The bus runs along the river.'],
      ['他们/S *沿着*/PP 海 修建/V 了/ASP 一/O 条 路 。', 'They built a road along the coast.'],
      ['我/S *沿着*/PP 隧道 走/V 了/ASP 出去/C 。', 'I walked out along the tunnel.'],
      ['*沿着*/PP 这 条 街 ， 有/V 很/O 多 商店 。', 'There are lots of shops along this street.'],
      ['他/S *沿着*/PP 车道 开/V 得/C 很 慢 。', 'He drove slowly along the lane.'],
      ['我们/S *沿着*/PP 桥梁 走/V 到/C 了 对面 。', 'We walked across the bridge to the other side.'],
      ['你/S *沿着*/PP 墙 走/V ， 就/ADV 不/ADV 会/MOD 迷路/V 。', "Follow the wall and you won't get lost."],
      ['孩子/S *沿着*/PP 人行道 骑/V 自行车/O 。', 'The child cycles along the pavement.'],
      ['*沿着*/PP 这 条 河 ， 有/V 很/O 多 小区 。', 'There are lots of housing estates along this river.'],
      ['我们/S *沿着*/PP 导航 的 路线 开/V 到/C 了 市区 。', 'We followed the satnav route into the city centre.'],
    ],
    cloze: {
      blank: ['沿着'],
      distractors: [
        ['关于', 'LEX.NEAR_SYNONYM', '关于 = about (a topic).'],
        ['为了', 'LEX.NEAR_SYNONYM', '为了 = in order to.'],
      ],
    },
  },
  {
    id: 'G5-40', unit: 31, title: '朝 (towards, facing)', titleZh: '朝',
    summary: '朝 + direction / person: movement or action towards it; as a verb, "face".',
    explanationMd: `
**Form:** Subject + **朝** + direction / person + verb · or Subject + **朝** + direction (= faces).

他朝我走过来 — "he walked towards me". 我的房间朝南 — "my room faces south".

- Close to 向 and 往; 朝 also works for a body's orientation and for actions like 看, 笑.`,
    formula: ['S', 'PP', 'V', 'C'],
    constraints: [PPV],
    requires: ['G3-41'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S *朝*/PP 我 走/V 过来/C 。', 'He walked towards me.'],
      ['我/S 的 房间 *朝*/V 南/O 。', 'My room faces south.'],
      ['你/S *朝*/PP 前面 走/V 。', 'Walk straight ahead.'],
    ],
    instances: [
      ['车/S *朝*/PP 市区 开/V 去/C 。', 'The car headed towards the city centre.'],
      ['她/S *朝*/PP 窗户 外面 看/V 了 看 。', 'She glanced out of the window.'],
      ['这/S 个 公寓 *朝*/V 东/O 。', 'This flat faces east.'],
      ['他/S *朝*/PP 车站 跑/V 去/C 。', 'He ran towards the station.'],
      ['孩子/S *朝*/PP 妈妈 笑/V 了 笑 。', 'The child smiled at Mum.'],
      ['你/S *朝*/PP 右边 拐/V 。', 'Turn right.'],
      ['小狗/S *朝*/PP 我们 跑/V 过来/C 了/SF 。', 'The puppy ran towards us.'],
      ['我们/S *朝*/PP 广场 走/V 吧/SF 。', "Let's head for the square."],
      ['小区/S 的 门 *朝*/V 西/O 。', 'The estate gate faces west.'],
      ['他/S *朝*/PP 司机 说/V 了/ASP 一/O 句 话 。', 'He said something to the driver.'],
      ['船/S *朝*/PP 海 上 开/V 去/C 。', 'The boat headed out to sea.'],
      ['我/S *朝*/PP 他 看/V 了/ASP 一下/C 。', 'I glanced at him.'],
      ['鸟/S *朝*/PP 森林 飞/V 去/C 。', 'The birds flew towards the forest.'],
      ['你/S *朝*/PP 这儿 看/V 。', 'Look this way.'],
      ['他们/S *朝*/PP 地铁 站台 走/V 去/C 。', 'They walked towards the metro platform.'],
    ],
    cloze: {
      blank: ['朝'],
      distractors: [
        ['从', 'LEX.NEAR_SYNONYM', '从 = from; towards is 朝.'],
        ['比', 'LEX.NEAR_SYNONYM', '比 compares; direction is 朝.'],
      ],
    },
  },
  {
    id: 'G5-41', unit: 31, title: '凭 (by, on the strength of)', titleZh: '凭',
    summary: '凭 + document / ability: on the basis of it, or by showing it.',
    explanationMd: `
**Form:** (Subject) + **凭** + basis + verb.

凭驾照可以租车 — "you can hire a car with a driving licence". 他凭自己的能力找到了工作 — "he found a job on his own merits".

- Typical in notices (凭票进站) and when stressing someone's own effort.
- 凭什么 …？ is a challenge: "on what grounds …?"`,
    formula: ['S', 'PP', 'V', 'O'],
    constraints: [PPV],
    requires: ['G4-41'],
    contrasts: ['G4-41'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*凭*/PP 驾照 可以/MOD 租/V 车/O 。', 'You can hire a car with a driving licence.'],
      ['他/S *凭*/PP 自己 的 能力 找/V 到/C 了/ASP 工作/O 。', 'He found a job on his own merits.'],
      ['*凭*/PP 票 进/V 站/O 。', 'Entry to the station by ticket only.'],
    ],
    instances: [
      ['居民/S *凭*/PP 卡 进/V 小区/O 。', 'Residents enter the estate with a card.'],
      ['他/S *凭*/PP 经验 找/V 到/C 了/ASP 路/O 。', 'He found the way by experience.'],
      ['*凭*/PP 学生 卡 可以/MOD 免费/ADV 坐/V 公交/O 。', 'With a student card you can ride the bus free.'],
      ['她/S *凭*/PP 自己 的 努力 买/V 了/ASP 房子/O 。', 'She bought a flat through her own hard work.'],
      ['你/S 不/ADV 能/MOD *凭*/PP 感觉 开车/V 。', "You can't drive by feel."],
      ['*凭*/PP 发票 可以/MOD 退/V 换 。', 'You can return or exchange items with a receipt.'],
      ['他/S *凭*/PP 导航 开/V 到/C 了 郊区 。', 'He drove to the suburbs using satnav.'],
      ['我们/S *凭*/PP 地图 找/V 到/C 了/ASP 那/O 个 公寓 。', 'We found the flat with the map.'],
      ['*凭*/PP 护照 可以/MOD 办/V 卡/O 。', 'You can get a card with your passport.'],
      ['他/S *凭*/PP 一 张 照片 找/V 到/C 了/ASP 那/O 条 街 。', 'He found the street from a single photo.'],
      ['你/S *凭*/PP 什么 说/V 我/O 错 了 ？', 'What makes you say I was wrong?'],
      ['*凭*/PP 这 张 卡 ， 你/S 可以/MOD 停/V 车/O 。', 'With this card you can park.'],
      ['他/S *凭*/PP 记忆 画/V 了/ASP 一/O 张 地图 。', 'He drew a map from memory.'],
      ['她/S *凭*/PP 自己 的 本领 当/V 上/C 了 经理/O 。', 'She became manager on her own merits.'],
      ['*凭*/PP 门票 进/V 公园/O 。', 'Entry to the park by ticket.'],
    ],
    cloze: {
      blank: ['凭'],
      distractors: [
        ['跟', 'LEX.NEAR_SYNONYM', '跟 = with (a person); "on the strength of / by showing" is 凭.'],
        ['往', 'LEX.NEAR_SYNONYM', '往 = towards.'],
      ],
    },
  },
  {
    id: 'G5-42', unit: 31, title: '按 (according to, by)', titleZh: '按',
    summary: '按 + rule / unit: do something according to it (按时间, 按规定, 按公里收钱).',
    explanationMd: `
**Form:** (Subject) + **按** + standard / unit + verb.

房租按月交 — "rent is paid monthly". 请大家按号码排队 — "please queue by number".

- A shorter, more everyday version of **按照** (G4-41).
- Also used for units of charging: 按公里, 按人, 按月.`,
    formula: ['S', 'PP', 'V', 'O'],
    constraints: [PPV],
    requires: ['G4-41'],
    contrasts: ['G4-41'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['请/MOD *按*/PP 时间 到/V 站台/O 。', 'Please arrive at the platform on time.'],
      ['房租/S *按*/PP 月 交/V 。', 'Rent is paid monthly.'],
      ['我们/S *按*/PP 导航 的 路线 走/V 吧/SF 。', "Let's follow the satnav route."],
    ],
    instances: [
      ['公交/S *按*/PP 时间 出发/V 。', 'The bus leaves on schedule.'],
      ['你/S 要/MOD *按*/PP 规定 停/V 车/O 。', 'You must park according to the rules.'],
      ['出租车/S *按*/PP 公里 收/V 钱/O 。', 'Taxis charge by the kilometre.'],
      ['请/MOD 大家/S *按*/PP 号码 排队/V 。', 'Everyone, please queue by number.'],
      ['我们/S *按*/PP 计划 修建/V 了/ASP 这/O 座 桥梁 。', 'We built the bridge according to plan.'],
      ['房东/S *按*/PP 合同 收/V 房租/O 。', 'The landlord collects rent as the contract says.'],
      ['他/S *按*/PP 医生 说 的 做/V 了/SF 。', 'He did as the doctor said.'],
      ['地铁/S *按*/PP 距离 收/V 钱/O 。', 'The metro charges by distance.'],
      ['这/S 个 小区 *按*/PP 规划 建设/V 。', 'This estate is built to plan.'],
      ['请/MOD *按*/PP 地图 上 的 路线 走/V 。', 'Please follow the route on the map.'],
      ['学生/S *按*/PP 成绩 分/V 班/O 。', 'Students are put into classes by their results.'],
      ['水/S 和 电 都 *按*/PP 用 的 多少 交/V 钱/O 。', 'Water and electricity are paid for by how much you use.'],
      ['我们/S *按*/PP 人 买/V 票/O 。', 'We buy tickets per person.'],
      ['请/MOD *按*/PP 要求 写/V 。', 'Please write as instructed.'],
      ['车辆/S 要/MOD *按*/PP 车道 开/V 。', 'Vehicles must keep to their lanes.'],
    ],
    cloze: {
      blank: ['按'],
      distractors: [
        ['对', 'LEX.NEAR_SYNONYM', '对 = to, towards; "according to" is 按.'],
        ['向', 'LEX.NEAR_SYNONYM', '向 = towards.'],
      ],
    },
  },
];
