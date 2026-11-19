import type { PatternSource } from './authoring';

// HSK 4 · Unit 6 (unit 18) · 出行 On the move — Extended complements & 随着 (provisional).

const VC = { kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' } as const;
const GQ = '过去@guoqu_v';

export const patternsU18: PatternSource[] = [
  {
    id: 'G4-31', unit: 18, title: 'V + 下来 (stop; settle; keep; note down)', titleZh: '“下来”的引申用法',
    summary: '下来 after a verb can mean coming to a stop or a calmer state, staying behind, or being recorded.',
    explanationMd: `
Besides "down towards the speaker" (G3-42), **V + 下来** has extended meanings:

- **stopping / settling**: 车停下来了, 天黑下来了, 她放松下来了
- **staying, being kept**: 把照片留下来
- **recording**: 把地址写下来, 记下来, 拍下来

Compare **下去** (carry on, G3-45) and **起来** (start / recall).`,
    formula: ['S', 'V', 'C', 'SF'],
    constraints: [VC],
    requires: ['G3-42', 'G3-45'],
    contrasts: ['G3-45', 'G4-32'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.DIRECTION'],
    examples: [
      ['车/S 停/V *下来*/C 了/SF 。', 'The car has stopped.'],
      ['请/MOD 把/BA 地址 写/V *下来*/C 。', 'Please write the address down.'],
      ['他/S 把/BA 这 些 照片 都 留/V *下来*/C 了/SF 。', 'He kept all these photos.'],
    ],
    instances: [
      ['雨/S 停/V *下来*/C 了/SF 。', 'The rain has stopped.'],
      ['你/S 先/ADV 坐/V *下来*/C 休息/V 一下/C 。', 'Sit down and rest first.'],
      ['导游/S 说 的 话 ， 我/S 都/ADV 记/V *下来*/C 了/SF 。', "I noted down everything the guide said."],
      ['天/S 黑/V *下来*/C 了/SF 。', "It's got dark."],
      ['他/S 把/BA 风景 拍/V *下来*/C 了/SF 。', 'He took photos of the view.'],
      ['城市/S 慢慢@man=màn_màn/ADV 安静/V *下来*/C 了/SF 。', 'The city gradually grew quiet.'],
      ['请/MOD 你/S 停/V *下来*/C 听/V 我/O 说 。', 'Please stop and listen to me.'],
      ['我/S 把/BA 酒店 的 电话 号码 写/V *下来*/C 了/SF 。', "I've written down the hotel's phone number."],
      ['这/S 个 习惯 是/V 从/PP 爷爷 那儿 留/V *下来*/C 的/SF 。', 'This habit has come down from Grandpa.'],
      ['司机/S 在/PP 路口 停/V *下来*/C 了/SF 。', 'The driver stopped at the junction.'],
      ['飞机/S 慢慢@man=màn_màn/ADV 降落/V *下来*/C 。', 'The plane slowly came in to land.'],
      ['她/S 慢慢@man=màn_màn/ADV 放松/V *下来*/C 了/SF 。', 'She gradually relaxed.'],
      ['我/S 把/BA 地点 记/V *下来*/C 了/SF 。', "I've noted down the place."],
      ['你/S 要/MOD 把/BA 每 天 的 事情 写/V *下来*/C 。', 'You should write down what happens each day.'],
      ['车/S 在/PP 加油站 停/V *下来*/C 了/SF 。', 'The car stopped at the petrol station.'],
    ],
    cloze: {
      blank: ['下来'],
      distractors: [
        ['起来', 'COMP.DIRECTION', '起来 starts something or recalls it; stopping, settling, keeping or recording is 下来.'],
        ['出去', 'COMP.DIRECTION', '出去 means going out, away from here.'],
      ],
    },
  },
  {
    id: 'G4-32', unit: 18, title: 'V出来 (make out) vs V起来 (recall)', titleZh: '“看出来”和“想起来”',
    summary: 'V出来 = identify or make something out (看出来, 听出来); V起来 = bring back to mind (想起来).',
    explanationMd: `
- **看 / 听 + 出来**: perceive and *identify*: 我听出来了，这是北京话。 "I could tell it was the Beijing accent."
- **想 + 起来**: something forgotten *comes back*: 我想起来了，他叫小王。
- **想 + 出来**: think *up* something new (an idea, a solution) — G3-45.

Potential forms: 看得出来 / 看不出来, 想得起来 / 想不起来.`,
    formula: ['S', 'V', 'C', 'O'],
    constraints: [VC],
    requires: ['G3-44', 'G3-45'],
    contrasts: ['G3-44', 'G3-45'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.DIRECTION'],
    examples: [
      ['我/S 看/V *出来*/C 了/SF ， 他/S 是/V 导游/O 。', 'I could tell he was a tour guide.'],
      ['我/S 想/V *起来*/C 了/SF ， 他/S 叫/V #小王=XiǎoWáng=Xiao_Wang/O 。', 'Now I remember — his name is Xiao Wang.'],
      ['我/S 听/V *出来*/C 了/SF ， 这/S 是/V 北京/O 话 。', "I could tell it was the Beijing accent."],
    ],
    instances: [
      ['这/S 个 地方 我/S 想/V 不 *起来*/C 了/SF 。', "I can't remember this place."],
      ['你/S 能/MOD 听/V *出来*/C 他/O 是 哪儿 的 人 吗/SF ？', 'Can you tell where he is from?'],
      ['我/S 突然/ADV 想/V *起来*/C ， 护照/S 还/ADV 在/V 酒店/O 。', 'I suddenly remembered my passport was still at the hotel.'],
      ['你/S 看/V 得 *出来*/C 这/O 是 哪儿 吗/SF ？', 'Can you tell where this is?'],
      ['他/S 一/ADV 说话/V ， 我/S 就/ADV 听/V *出来*/C 了/SF 。', 'The moment he spoke, I recognised him.'],
      ['我/S 想/V *起来*/C 了/SF ， 我们/S 曾经/ADV 在/PP 这儿 见/V 过/ASP 。', "Now I remember — we've met here before."],
      ['他/S 的 名字 我/S 想/V 不 *起来*/C 了/SF 。', "I can't remember his name."],
      ['我/S 没/ADV 看/V *出来*/C 他/O 很 累 。', "I didn't notice he was tired."],
      ['你/S 想/V *起来*/C 了/SF 吗/SF ？', 'Do you remember now?'],
      ['大家/S 都/ADV 看/V *出来*/C 了/SF ， 她/S 很/ADV 兴奋/V 。', 'Everyone could see she was excited.'],
      ['那/S 个 地方 的 名字 ， 我/S 终于/ADV 想/V *起来*/C 了/SF 。', "I've finally remembered the name of that place."],
      ['我/S 听/V 不 *出来*/C 这/O 是 什么 声音 。', "I can't make out what that sound is."],
      ['看/V 了/ASP 照片/O ， 我/S 想/V *起来*/C 了/ASP 很/O 多 事情 。', 'Looking at the photos brought back lots of memories.'],
      ['司机/S 看/V *出来*/C 我们/O 是 游客 。', 'The driver could tell we were tourists.'],
      ['我/S 想/V *起来*/C 了/SF ， 今天/T 是/V 你/O 的 生日 ！', "I've just remembered — it's your birthday today!"],
    ],
    cloze: {
      blank: ['出来', '起来'],
      distractors: [
        ['下去', 'COMP.DIRECTION', '下去 means carrying on; making out is 出来, remembering is 起来.'],
        ['过来', 'COMP.DIRECTION', '过来 means coming over or coming round, not perceiving or remembering.'],
      ],
    },
  },
  {
    id: 'G4-33', unit: 18, title: 'V + 过来 / 过去 (come round, turn, correct)', titleZh: '“过来”“过去”的引申用法',
    summary: '过来 / 过去 after a verb can mean turning round, moving across, or getting back to normal (改过来, 明白过来).',
    explanationMd: `
- **turning**: 转过来 (turn to face me), 转过去 (turn away)
- **crossing towards / away**: 走过去, 开过来 (G3-42)
- **back to the right state**: 改过来 (correct it), 明白过来 (come to realise)

过来 points *towards* the speaker or a normal state; 过去 points away.`,
    formula: ['S', 'V', 'C', 'SF'],
    constraints: [VC],
    requires: ['G3-42'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.DIRECTION'],
    examples: [
      ['请/MOD 你/S 转/V *过来*/C 。', 'Please turn round.'],
      ['你/S 把/BA 错 字 改/V *过来*/C 。', 'Correct the wrong characters.'],
      ['他/S 想/V 了/ASP 很/C 久 ， 才/ADV 明白/V *过来*/C 。', 'He thought for a long time before it dawned on him.'],
    ],
    instances: [
      [`她/S 转/V *${GQ}*/C 了/SF ， 不/ADV 想/MOD 看/V 我/O 。`, "She turned away; she didn't want to look at me."],
      ['这/S 个 习惯 很 难 改/V *过来*/C 。', 'This habit is hard to break.'],
      ['车/S 从/PP 对面 开/V *过来*/C 了/SF 。', 'A car came over from the other side.'],
      ['你/S 把/BA 椅子 转/V *过来*/C 吧/SF 。', 'Turn the chair round.'],
      [`飞机/S 从/PP 头 上 飞/V *${GQ}*/C 了/SF 。`, 'A plane flew overhead.'],
      ['我/S 很/T 久 以后 才/ADV 明白/V *过来*/C ， 他/S 在/ADV 开玩笑/V 。', 'It was ages before I realised he was joking.'],
      [`在/PP 路口 转/V *${GQ}*/C ， 就/ADV 是/V 酒店/O 。`, "Turn at the junction and you're at the hotel."],
      ['他/S 的 错误 已经/ADV 改/V *过来*/C 了/SF 。', 'His mistakes have already been corrected.'],
      ['小狗/S 向/PP 我 跑/V *过来*/C 。', 'The puppy ran over to me.'],
      [`她/S 走/V *${GQ}*/C ， 跟/PP 那 个 游客 说话/V 。`, 'She walked over and spoke to that tourist.'],
      ['你/S 坐/V *过来*/C 一点儿 。', 'Sit a bit closer.'],
      [`我/S 转/V *${GQ}*/C ， 看/V 见/C 了/ASP 一/O 个 老 朋友 。`, 'I turned and saw an old friend.'],
      ['你/S 能/MOD 把/BA 照片 拿/V *过来*/C 吗/SF ？', 'Could you bring the photo over?'],
      ['这/S 个 字 写/V 错/C 了/SF ， 快/ADV 改/V *过来*/C 。', "This character's wrong — correct it now."],
      ['船/S 从/PP 海 上 开/V *过来*/C 了/SF 。', 'A boat came in from the sea.'],
    ],
  },
  {
    id: 'G4-34', unit: 18, title: 'Adj + 着呢 (really, very — spoken)', titleZh: '形容词＋着呢',
    summary: 'Adj + 着呢 is a lively, reassuring "really / plenty": 时间还早着呢.',
    explanationMd: `
**Form:** Subject + Adj + **着呢**.

时间还早着呢 — "there's still plenty of time". It's spoken, a little emphatic and often reassuring or contradicting.

- No 很 / 非常 before the adjective: ✗ 很早着呢.
- Only with adjectives (and a few verbs like 忙): 多着呢, 远着呢, 好着呢.
- Not used for a change: ✗ 早了呢.`,
    formula: ['S', 'V', 'ASP', 'SF'],
    constraints: [],
    requires: ['G3-05'],
    errorCodes: ['ASPECT.ZHE_MISUSE', 'ASPECT.LE_MISUSE'],
    examples: [
      ['时间/S 还/ADV 早/V *着*/ASP *呢*/SF 。', "There's still plenty of time."],
      ['去/S 机场 的 路 远/V *着*/ASP *呢*/SF 。', "It's a long way to the airport."],
      ['这儿/S 的 风景 好/V *着*/ASP *呢*/SF 。', 'The scenery here is lovely.'],
    ],
    instances: [
      ['火车站/S 的 人 多/V *着*/ASP *呢*/SF 。', 'The station is packed.'],
      ['别/ADV 着急/V ， 时间/S 还/ADV 多/V *着*/ASP *呢*/SF 。', "Don't panic, there's loads of time."],
      ['这/S 个 城市 大/V *着*/ASP *呢*/SF 。', 'This city is really big.'],
      ['高速公路/S 上 的 车 多/V *着*/ASP *呢*/SF 。', 'The motorway is full of cars.'],
      ['他/S 的 行李箱 重/V *着*/ASP *呢*/SF 。', 'His suitcase is really heavy.'],
      ['外面/S 冷/V *着*/ASP *呢*/SF ， 多/ADV 穿/V 一点儿/C 。', "It's freezing out there — wrap up."],
      ['那/S 家 酒店 贵/V *着*/ASP *呢*/SF 。', "That hotel's really expensive."],
      ['我/S 好/V *着*/ASP *呢*/SF ， 你/S 别/ADV 担心/V 。', "I'm absolutely fine — don't worry."],
      ['他/S 忙/V *着*/ASP *呢*/SF ， 没有/V 时间/O 。', "He's really busy and has no time."],
      ['飞机/S 降落 还/ADV 早/V *着*/ASP *呢*/SF 。', "We're nowhere near landing yet."],
      ['晚上/T 广场/S 上 热闹/V *着*/ASP *呢*/SF 。', 'The square is really lively in the evening.'],
      ['首都/S 的 交通 方便/V *着*/ASP *呢*/SF 。', 'Transport in the capital is really convenient.'],
      ['这/S 条 街 长/V *着*/ASP *呢*/SF 。', 'This street goes on for ages.'],
      ['郊区/S 的 空气 好/V *着*/ASP *呢*/SF 。', 'The air in the suburbs is lovely.'],
      ['我/S 的 汉语 还/ADV 差/V *着*/ASP *呢*/SF 。', 'My Chinese still has a long way to go.'],
    ],
    decoys: [['很', 'LEX.COLLOCATION', 'Adj + 着呢 already means "very"; no 很 before it.']],
    cloze: {
      blank: ['着'],
      distractors: [
        ['了', 'ASPECT.LE_MISUSE', 'Adj + 着呢 is a lively "really"; 了 would announce a change.'],
        ['过', 'ASPECT.GUO_MISUSE', '过 marks a past experience, not a vivid present state.'],
      ],
    },
  },
  {
    id: 'G4-35', unit: 18, title: '直到 … (才) / 一直 V 到 … (until)', titleZh: '直到／一直…到…',
    summary: '直到 X，S 才 V: only when X came did it happen. S 一直 V 到 X: it went on until X.',
    explanationMd: `
- **直到** + time / event，Subject + **才** + V — "it wasn't until X that …": 直到飞机降落，我才放松下来。
- 直到 + time，Subject + **还** + V — "even up to X, still …": 直到现在，我还记得那次旅行。
- Subject + **一直** + V + **到** + X — "kept on V-ing until X": 我们一直玩到晚上。`,
    formula: ['PP', 'P', 'S', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-08', 'G3-12'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*直到*/PP %十二 点 ， 他/S 才/ADV 到达/V 酒店/O 。', "He didn't reach the hotel until twelve."],
      ['我们/S *一直*/ADV 走/V *到*/C 广场 。', 'We walked all the way to the square.'],
      ['*直到*/PP 现在 ， 我/S 还/ADV 记得/V 那/O 次 旅行 。', 'I still remember that trip to this day.'],
    ],
    instances: [
      ['*直到*/PP 飞机 降落 ， 我/S 才/ADV 放松/V 下来/C 。', "I didn't relax until the plane landed."],
      ['*直到*/PP 迷路 了 ， 他/S 才/ADV 后悔/V 没/ADV 带/V 地图/O 。', "It wasn't until he got lost that he regretted not bringing a map."],
      ['我们/S *一直*/ADV 玩/V *到*/C 晚上 。', 'We had fun right up until the evening.'],
      ['*直到*/PP 毕业 ， 她/S 才/ADV 第一 次 出国/V 。', "She didn't go abroad for the first time until she graduated."],
      ['雨/S *一直*/ADV 下/V *到*/C 第二天 早上 。', 'It rained right through to the next morning.'],
      ['*直到*/PP 到达 酒店 ， 我/S 才/ADV 发现/V 护照/O 不 见 了 。', "It wasn't until I reached the hotel that I noticed my passport was missing."],
      ['他/S *一直*/ADV 工作/V *到*/C %六十 岁 。', 'He worked until he was sixty.'],
      ['*直到*/PP 今天 ， 我/S 才/ADV 知道/V 这/O 件 事情 。', 'I only found out about this today.'],
      ['我/S *一直*/ADV 等/V *到*/C 最后 一 班 车 。', 'I waited right up until the last bus.'],
      ['*直到*/PP 司机 停 车 ， 他/S 才/ADV 下/V 车/O 。', "He didn't get off until the driver stopped."],
      ['他们/S *一直*/ADV 聊天/V *到*/C 很 晚 。', 'They chatted until very late.'],
      ['*直到*/PP 现在 ， 这/S 条 街 还/ADV 很/ADV 热闹/V 。', 'This street is still lively even now.'],
      ['我/S *一直*/ADV 住/V *到*/C 下 个 月 。', "I'm staying until next month."],
      ['*直到*/PP 看 见 红绿灯 ， 我/S 才/ADV 知道/V 自己/O 走 错 了 。', "Only when I saw the traffic lights did I realise I'd gone the wrong way."],
      ['*直到*/PP 出发 以前 ， 他/S 还/ADV 在/ADV 收拾/V 行李箱/O 。', 'Right up until we set off, he was still packing his case.'],
    ],
    cloze: {
      blank: ['直到'],
      distractors: [
        ['因为', 'LEX.NEAR_SYNONYM', '因为 gives a reason; 直到 marks the point in time when something finally happened.'],
        ['如果', 'LEX.NEAR_SYNONYM', '如果 sets a condition; 直到 marks a point in time.'],
      ],
    },
  },
  {
    id: 'G4-36', unit: 18, title: '随着 (along with, as)', titleZh: '随着',
    summary: '随着 + a change, the main clause describes another change that follows from it.',
    explanationMd: `
**Form:** **随着** + noun phrase (often X 的发展 / 变化 / 增加)，Subject + change.

随着交通的发展，旅行越来越方便了 — "as transport develops, travel is getting easier and easier".

- The 随着 phrase goes **first**, followed by a comma.
- The main clause usually has 越来越, 也, or 变 / 了 — something changes in step.`,
    formula: ['PP', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G3-21'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*随着*/PP 交通 的 发展 ， 旅行/S 越来越/ADV 方便/V 了/SF 。', 'As transport develops, travel keeps getting easier.'],
      ['*随着*/PP 年龄 的 增加 ， 他/S 越来越/ADV 喜欢/V 安静/O 。', 'As he gets older, he likes quiet more and more.'],
      ['*随着*/PP 天气 变 冷 ， 游客/S 越来越/ADV 少/V 了/SF 。', 'As the weather turns cold, there are fewer and fewer tourists.'],
    ],
    instances: [
      ['*随着*/PP 高速公路 的 发展 ， 开车/S 去 旅行 的 人 越来越/ADV 多/V 了/SF 。', 'With the growth of motorways, more and more people travel by car.'],
      ['*随着*/PP 时间 的 变化 ， 这/S 个 城市 也/ADV 变/V 了/SF 。', 'With time, the city has changed too.'],
      ['*随着*/PP 生活 的 变化 ， 大家/S 越来越/ADV 喜欢/V 旅游/O 。', 'As life changes, people like travelling more and more.'],
      ['*随着*/PP 收入 的 增加 ， 出国/S 的 人 越来越/ADV 多/V 。', 'As incomes rise, more and more people go abroad.'],
      ['*随着*/PP 春节 越来越 近 ， 火车站/S 的 人 越来越/ADV 多/V 。', 'As Spring Festival approaches, the stations get busier.'],
      ['*随着*/PP 互联网 的 发展 ， 预订/S 酒店 越来越/ADV 方便/V 。', 'With the internet, booking hotels keeps getting easier.'],
      ['*随着*/PP 年龄 的 增加 ， 爷爷/S 的 身体 越来越/ADV 弱/V 。', "As Grandpa gets older, he's getting weaker."],
      ['*随着*/PP 天 黑 下来 ， 街/S 上 的 人 越来越/ADV 少/V 。', 'As it gets dark, the streets empty.'],
      ['*随着*/PP 学习 的 进步 ， 他/S 越来越/ADV 自信/V 了/SF 。', 'As his studies progress, he is growing more confident.'],
      ['*随着*/PP 城市 变 大 ， 交通/S 越来越/ADV 麻烦/V 了/SF 。', 'As the city grows, getting around is more and more of a hassle.'],
      ['*随着*/PP 游客 的 增加 ， 当地/S 的 酒店 越来越/ADV 贵/V 。', 'As tourist numbers rise, local hotels get pricier.'],
      ['*随着*/PP 季节 的 变化 ， 风景/S 也/ADV 不/ADV 一样/V 了/SF 。', 'The scenery changes with the seasons.'],
      ['*随着*/PP 速度 越来越 快 ， 他/S 越来越/ADV 兴奋/V 。', 'The faster he went, the more excited he got.'],
      ['*随着*/PP 距离 越来越 近 ， 我/S 越来越/ADV 紧张/V 。', 'The closer we got, the more nervous I became.'],
      ['*随着*/PP 科学 的 发展 ， 我们/S 的 生活 越来越/ADV 方便/V 。', 'As science develops, our lives get more convenient.'],
    ],
    cloze: {
      blank: ['随着'],
      distractors: [
        ['除了', 'LEX.NEAR_SYNONYM', '除了 means "except / besides"; a change that goes along with another is 随着.'],
        ['关于', 'LEX.NEAR_SYNONYM', '关于 means "about (a topic)".'],
      ],
    },
  },
];
