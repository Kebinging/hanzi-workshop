import type { PatternSource } from './authoring';

// HSK 5 · Unit 10 (unit 34) · 自然环境 Nature — Rhetorical emphasis (provisional).

const ADV_POS = { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' } as const;

export const patternsU34: PatternSource[] = [
  {
    id: 'G5-55', unit: 34, title: '莫非 (could it be that …?)', titleZh: '莫非',
    summary: '莫非 voices a surprised guess, usually ending in a question.',
    explanationMd: `
**Form:** **莫非** + guess (+ 吗 / ？).

莫非他生病了？ — "could it be that he's ill?"

- The speaker sees a sign and guesses the reason.
- Close to 难道 (G4-02), but 莫非 leans towards believing the guess; 难道 usually rejects it.`,
    formula: ['ADV', 'S', 'V', 'SF'],
    constraints: [],
    requires: ['G4-02'],
    contrasts: ['G4-02'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*莫非*/ADV 他/S 生病/V 了/SF ？', "Could it be that he's ill?"],
      ['天/S 这么 黑 ， *莫非*/ADV 要/MOD 下/V 暴雨/O 了 ？', "It's so dark — is a storm coming?"],
      ['*莫非*/ADV 你/S 不/ADV 认识/V 我/O 了 ？', "Don't you recognise me?"],
    ],
    instances: [
      ['河/S 里 的 鱼 都 没 了 ， *莫非*/ADV 是/V 水/O 的 问题 ？', 'All the fish in the river are gone — is it the water?'],
      ['*莫非*/ADV 今天/T 有/V 台风/O ？', 'Could there be a typhoon today?'],
      ['天/S 这么 热 ， *莫非*/ADV 全球/S 真/ADV 在/ADV 变暖/V ？', "It's so hot — is the world really warming up?"],
      ['*莫非*/ADV 这/S 里 发生/V 过/ASP 地震/O ？', 'Could there have been an earthquake here?'],
      ['鸟/S 都 飞 走 了 ， *莫非*/ADV 要/MOD 有/V 暴雨/O ？', 'The birds have all flown off — is a storm on its way?'],
      ['*莫非*/ADV 你/S 也/ADV 喜欢/V 蝴蝶/O ？', 'Do you like butterflies too, then?'],
      ['*莫非*/ADV 这/S 是/V 野生/O 的 熊 ？', 'Could this be a wild bear?'],
      ['他/S 还 没 来 ， *莫非*/ADV 路/S 上 出/V 了/ASP 事情/O ？', "He's still not here — has something happened on the way?"],
      ['*莫非*/ADV 天气/S 预报 错/V 了/SF ？', 'Could the forecast have been wrong?'],
      ['*莫非*/ADV 这/S 种 动物 已经 灭绝/V 了/SF ？', 'Could this animal already be extinct?'],
      ['*莫非*/ADV 你/S 见/V 过/ASP 鲸/O ？', 'Have you actually seen a whale?'],
      ['外面/S 有 这么 多 人 ， *莫非*/ADV 有/V 地震/O ？', 'So many people outside — is there an earthquake?'],
      ['*莫非*/ADV 这里/S 以前/T 是/V 一/O 个 湖泊 ？', 'Could this once have been a lake?'],
      ['*莫非*/ADV 你/S 想/MOD 去/V 草原/O ？', 'Do you want to go to the grasslands, then?'],
      ['*莫非*/ADV 他/S 怕/V 蛇/O ？', 'Could he be afraid of snakes?'],
    ],
    cloze: {
      blank: ['莫非'],
      distractors: [
        ['果然', 'LEX.NEAR_SYNONYM', '果然 confirms what was expected; a puzzled guess is 莫非.'],
        ['难怪', 'LEX.NEAR_SYNONYM', '难怪 = no wonder (the reason is known).'],
      ],
    },
  },
  {
    id: 'G5-56', unit: 34, title: '何尝 (when have … ever; it is not that … not)', titleZh: '何尝',
    summary: 'Rhetorical 何尝: 何尝不 = of course I do; 何尝 + V = never did.',
    explanationMd: `
**Form:** Subject + **何尝** (+ 不) + verb phrase？

我何尝不想去呢？ — "do you think I don't want to go?" (= of course I do).

- 何尝不 + V = definitely V. 何尝 + V(过) = never V.
- Written and emotional; often ends with 呢 or a question mark.`,
    formula: ['S', 'ADV', 'ADV', 'V', 'SF'],
    constraints: [ADV_POS],
    requires: ['G3-79'],
    contrasts: ['G3-79', 'G5-04'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S *何尝*/ADV 不/ADV 想/MOD 去/V 呢/SF ？', "Do you think I don't want to go?"],
      ['他/S *何尝*/ADV 说/V 过/ASP 这样/O 的 话 ？', 'When did he ever say that?'],
      ['我/S *何尝*/ADV 不/ADV 知道/V 环境/O 重要 ？', "Of course I know the environment matters."],
    ],
    instances: [
      ['我/S *何尝*/ADV 不/ADV 想/MOD 保护/V 环境/O 呢/SF ？', "Of course I want to protect the environment."],
      ['他/S *何尝*/ADV 见/V 过/ASP 雪山/O ？', 'When has he ever seen snowy mountains?'],
      ['谁/S *何尝*/ADV 不/ADV 喜欢/V 凉爽/O 的 天气 ？', "Who doesn't like cool weather?"],
      ['我/S *何尝*/ADV 不/ADV 想/MOD 去/V 看/V 日出/O 呢/SF ？', "Of course I want to see the sunrise."],
      ['她/S *何尝*/ADV 怕/V 过/ASP 困难/O ？', 'When has she ever been afraid of difficulties?'],
      ['我/S *何尝*/ADV 不/ADV 担心/V 气温/O 升高 ？', "Of course I worry about rising temperatures."],
      ['我们/S *何尝*/ADV 不/ADV 知道/V 排放/O 的 危害 ？', "We know full well the harm emissions do."],
      ['他/S *何尝*/ADV 不/ADV 想/MOD 救/V 那/O 只 鹿 呢/SF ？', "Of course he wants to save that deer."],
      ['你/S *何尝*/ADV 关心/V 过/ASP 生态/O ？', 'When have you ever cared about ecology?'],
      ['我/S *何尝*/ADV 不/ADV 喜欢/V 彩虹/O ？', "Who says I don't like rainbows?"],
      ['他们/S *何尝*/ADV 不/ADV 想/MOD 治理/V 河流/O ？', "Of course they want to clean up the rivers."],
      ['我/S *何尝*/ADV 不/ADV 怕/V 台风/O ？', "Do you think I'm not afraid of typhoons?"],
      ['她/S *何尝*/ADV 去/V 过/ASP 高原/O ？', 'When has she ever been to the plateau?'],
      ['我/S *何尝*/ADV 不/ADV 想/MOD 住/V 在/C 岛/O 上 ？', "Of course I'd like to live on an island."],
      ['谁/S *何尝*/ADV 愿意/MOD 看/V 到/C 灾难/O ？', 'Who would ever want to see a disaster?'],
    ],
    cloze: {
      blank: ['何尝'],
      distractors: [
        ['何必', 'LEX.NEAR_SYNONYM', '何必 = there is no need to; 何尝 (不) = of course / never.'],
        ['曾经', 'LEX.NEAR_SYNONYM', '曾经 = once (did); it is not rhetorical.'],
      ],
    },
  },
  {
    id: 'G5-57', unit: 34, title: '怎么能 … 呢？ (how could …?)', titleZh: '怎么能…呢？',
    summary: 'A rhetorical question that means "you shouldn\'t" or "we must".',
    explanationMd: `
**Form:** Subject + **怎么能** + verb phrase + **呢**？

你怎么能这样做呢？ — "how could you do that?" (= you shouldn't).

- With 不: 我们怎么能不保护生态呢？ = we must protect it.
- Strong and emotional; 呢 softens the end.`,
    formula: ['S', 'ADV', 'MOD', 'V', 'O', 'SF'],
    constraints: [{ kind: 'pair', a: '怎么', b: '呢', code: 'CONJ.MISSING_PARTNER' }],
    requires: ['G3-79'],
    contrasts: ['G3-79', 'G4-02'],
    errorCodes: ['CONJ.MISSING_PARTNER', 'ORDER.MODAL_POSITION'],
    examples: [
      ['你/S *怎么*/ADV 能/MOD 这样/ADV 做/V *呢*/SF ？', 'How could you do that?'],
      ['我们/S *怎么*/ADV 能/MOD 往/PP 河 里 扔/V 垃圾/O *呢*/SF ？', 'How can we throw rubbish in the river?'],
      ['他/S *怎么*/ADV 能/MOD 不/ADV 关心/V 环境/O *呢*/SF ？', 'How can he not care about the environment?'],
    ],
    instances: [
      ['你/S *怎么*/ADV 能/MOD 打/V 野生/O 动物 *呢*/SF ？', 'How could you hit a wild animal?'],
      ['我们/S *怎么*/ADV 能/MOD 不/ADV 保护/V 生态/O *呢*/SF ？', 'How could we not protect the ecology?'],
      ['工厂/S *怎么*/ADV 能/MOD 排放/V 脏/O 水 *呢*/SF ？', 'How can a factory just dump dirty water?'],
      ['你/S *怎么*/ADV 能/MOD 在/PP 草原 上 抽烟/V *呢*/SF ？', 'How can you smoke on the grassland?'],
      ['他/S *怎么*/ADV 能/MOD 不/ADV 听/V 警告/O *呢*/SF ？', 'How could he ignore the warning?'],
      ['我们/S *怎么*/ADV 能/MOD 让/V 熊/O 灭绝 *呢*/SF ？', 'How can we let bears die out?'],
      ['你/S *怎么*/ADV 能/MOD 在/PP 台风 天 去/V 海/O 上 *呢*/SF ？', 'How can you go out to sea in a typhoon?'],
      ['我们/S *怎么*/ADV 能/MOD 不/ADV 去/V 看/V 日落/O *呢*/SF ？', "How could we not go and see the sunset?"],
      ['你/S *怎么*/ADV 能/MOD 把/BA 蝴蝶 关/V 起来/C *呢*/SF ？', 'How could you shut the butterfly up?'],
      ['大家/S *怎么*/ADV 能/MOD 不/ADV 关心/V 气温/O 升高 *呢*/SF ？', 'How can people not care about rising temperatures?'],
      ['你/S *怎么*/ADV 能/MOD 在/PP 这么 恶劣 的 天气 里 爬/V 山/O *呢*/SF ？', 'How can you climb a mountain in such terrible weather?'],
      ['他们/S *怎么*/ADV 能/MOD 不/ADV 治理/V 河流/O *呢*/SF ？', 'How can they not clean up the rivers?'],
      ['我们/S *怎么*/ADV 能/MOD 浪费/V 水/O *呢*/SF ？', 'How can we waste water?'],
      ['你/S *怎么*/ADV 能/MOD 不/ADV 看/V 天气/O 预报 *呢*/SF ？', "How could you not check the forecast?"],
      ['他/S *怎么*/ADV 能/MOD 忘记/V 这/O 次 灾难 *呢*/SF ？', 'How could he forget this disaster?'],
    ],
  },
  {
    id: 'G5-58', unit: 34, title: '哪里 … 呢？ (how could …? — rhetorical denial)', titleZh: '哪里…呢？',
    summary: 'Rhetorical 哪里: 我哪里知道呢？ = I have no way of knowing.',
    explanationMd: `
**Form:** Subject + **哪里** + verb phrase + **呢**？

我哪里知道呢？ — "how would I know?"

- 哪里 here is not "where": it denies the statement. 这哪里是小问题？ = this is no small problem.
- 哪里哪里 is a set phrase for brushing off praise.`,
    formula: ['S', 'ADV', 'V', 'O', 'SF'],
    constraints: [{ kind: 'pair', a: '哪里', b: '呢', code: 'CONJ.MISSING_PARTNER' }],
    requires: ['G3-79'],
    contrasts: ['G5-57'],
    errorCodes: ['LEX.MEANING'],
    examples: [
      ['我/S *哪里*/ADV 知道/V *呢*/SF ？', 'How would I know?'],
      ['他/S *哪里*/ADV 是/V 专家/O *呢*/SF ？', "He's hardly an expert!"],
      ['我/S *哪里*/ADV 有/V 时间/O *呢*/SF ？', 'Where would I find the time?'],
    ],
    instances: [
      ['这/S *哪里*/ADV 是/V 小/O 问题 *呢*/SF ？', 'This is no small problem!'],
      ['我/S *哪里*/ADV 见/V 过/ASP 鲸/O *呢*/SF ？', "I've never seen a whale!"],
      ['他/S *哪里*/ADV 懂/V 生态/O *呢*/SF ？', "What does he know about ecology?"],
      ['我/S *哪里*/ADV 想/V 到/C 会/O 有 地震 *呢*/SF ？', 'How could I have known there would be an earthquake?'],
      ['这/S *哪里*/ADV 是/V 凉爽/O *呢*/SF ？', "This is hardly cool!"],
      ['她/S *哪里*/ADV 怕/V 冷/O *呢*/SF ？', "She's not afraid of the cold!"],
      ['我们/S *哪里*/ADV 知道/V 会/O 有 台风 *呢*/SF ？', 'How were we to know a typhoon was coming?'],
      ['这/S *哪里*/ADV 是/V 天然/O 的 *呢*/SF ？', "This is hardly natural!"],
      ['他/S *哪里*/ADV 去/V 过/ASP 高原/O *呢*/SF ？', "He's never been to the plateau!"],
      ['我/S *哪里*/ADV 会/MOD 认识/V 这/O 种 昆虫 *呢*/SF ？', 'How would I recognise this insect?'],
      ['这/S *哪里*/ADV 是/V 湖泊/O *呢*/SF ？', "That's no lake!"],
      ['你/S *哪里*/ADV 关心/V 过/ASP 环境/O *呢*/SF ？', 'When have you ever cared about the environment?'],
      ['猴子/S *哪里*/ADV 会/MOD 怕/V 人/O *呢*/SF ？', "Monkeys aren't afraid of people!"],
      ['这/S *哪里*/ADV 是/V 炎热/O *呢*/SF ？', "You call this hot?"],
      ['我/S *哪里*/ADV 敢/MOD 去/V 救/V 熊/O *呢*/SF ？', 'How would I dare rescue a bear?'],
    ],
    cloze: {
      blank: ['哪里'],
      distractors: [
        ['那里', 'LEX.MEANING', '那里 = there; the rhetorical "how could" is 哪里.'],
        ['怎么样', 'LEX.MEANING', '怎么样 asks "how is it".'],
      ],
    },
  },
  {
    id: 'G5-59', unit: 34, title: '谁知道 (who would have thought; who knows)', titleZh: '谁知道',
    summary: 'Mid-sentence 谁知道 = unexpectedly; at the start = nobody can tell.',
    explanationMd: `
**Form:** A (expectation)，**谁知道** + what really happened · or **谁知道** + question？

我以为天气会很好，谁知道突然下起了暴雨 — "I thought the weather would be fine — who knew it would pour?"

- After an expectation, 谁知道 introduces a surprise, like 没想到 or 不料 (G5-72).
- On its own it means "who knows?": 谁知道明年会怎么样呢？`,
    formula: ['S', 'V', 'O', 'P', 'CONJ2', 'ADV', 'V'],
    constraints: [],
    requires: ['G4-01'],
    contrasts: ['G4-01', 'G5-72'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S 觉得/V 天气/O 会 很 好 ， *谁*/CONJ2 *知道* 突然/ADV 下/V 起/C 了 暴雨/O 。', "I thought the weather would be fine — then out of nowhere it poured."],
      ['他/S 本来/ADV 想/MOD 去/V 草原/O ， *谁*/CONJ2 *知道* 来/V 了/ASP 台风/O 。', 'He meant to go to the grasslands, but then a typhoon came.'],
      ['*谁*/S *知道*/V 以后/T 会/MOD 怎么样/V 呢/SF ？', 'Who knows what will happen later?'],
    ],
    instances: [
      ['我们/S 准备/V 去/V 看/V 日出/O ， *谁*/CONJ2 *知道* 天/S 一直/ADV 是/V 阴/O 的 。', 'We were going to watch the sunrise, but it stayed cloudy.'],
      ['天气/S 预报 说/V 很/O 凉爽 ， *谁*/CONJ2 *知道* 那/T 天 特别/ADV 炎热/V 。', 'The forecast said cool, but that day was scorching.'],
      ['他/S 觉得/V 那/O 是 鹿 ， *谁*/CONJ2 *知道* 是/V 一/O 只 狼 。', 'He thought it was a deer — it turned out to be a wolf.'],
      ['我/S 本来/ADV 想/MOD 去/V 岛/O 上 玩 ， *谁*/CONJ2 *知道* 船/S 不/ADV 开/V 了/SF 。', 'I meant to go to the island, but the boat was cancelled.'],
      ['我们/S 刚/ADV 到/V 山/O 上 ， *谁*/CONJ2 *知道* 就/ADV 打/V 雷/O 了 。', "We'd only just reached the mountain when it started thundering."],
      ['大家/S 觉得/V 这/O 种 鸟 灭绝 了 ， *谁*/CONJ2 *知道* 又/ADV 发现/V 了/ASP 几/O 只 。', 'Everyone thought the bird was extinct, then a few more were found.'],
      ['*谁*/S *知道*/V 以后/T 会/MOD 不/ADV 会/MOD 干旱/V 呢/SF ？', 'Who knows whether there will be a drought next year?'],
      ['我/S 觉得/V 冬天/O 很 寒冷 ， *谁*/CONJ2 *知道* 一点儿/ADV 也/ADV 不/ADV 冷/V 。', "I thought winter would be bitter — it wasn't cold at all."],
      ['他/S 想/MOD 拍/V 彩虹/O ， *谁*/CONJ2 *知道* 彩虹/S 很/ADV 快/ADV 就/ADV 没/V 了/SF 。', 'He wanted a photo of the rainbow, but it was gone in a flash.'],
      ['我们/S 在/PP 海岸 散步/V ， *谁*/CONJ2 *知道* 突然/ADV 来/V 了/ASP 台风/O 。', 'We were walking on the coast when suddenly a typhoon hit.'],
      ['*谁*/S *知道*/V 这/O 条 河流 以后 会 怎么样 呢/SF ？', 'Who knows what will happen to this river?'],
      ['早上/T 天气/S 很/ADV 好/V ， *谁*/CONJ2 *知道* 下午/T 就/ADV 有/V 了/ASP 闪电/O 。', 'The morning was lovely, but by the afternoon there was lightning.'],
      ['我/S 觉得/V 这/O 是 普通 的 昆虫 ， *谁*/CONJ2 *知道* 是/V 一/O 种 很 少 见 的 物种 。', 'I thought it was an ordinary insect — it was a rare species.'],
      ['大家/S 觉得/V 火灾/O 结束 了 ， *谁*/CONJ2 *知道* 晚上/T 又/ADV 开始/V 了/SF 。', 'Everyone thought the fire was out, but it flared up again at night.'],
      ['我/S 想/MOD 去/V 看/V 日落/O ， *谁*/CONJ2 *知道* 下/V 起/C 了 暴雨/O 。', 'I wanted to watch the sunset, but a storm broke.'],
    ],
  },
  {
    id: 'G5-60', unit: 34, title: '倒(是) (actually, on the other hand)', titleZh: '倒（是）',
    summary: '倒是 marks a contrast with what came before or what you would expect.',
    explanationMd: `
**Form:** A，Subject + **倒是** + contrasting comment.

城市很热，山上倒是很凉爽 — "the city is hot; up in the hills, though, it's cool".

- Softer than 却: it often sounds pleasantly surprised or concessive.
- 我倒是想去，可是… = I'd like to go, but….`,
    formula: ['S', 'ADV', 'V'],
    constraints: [ADV_POS],
    requires: ['G3-96'],
    contrasts: ['G3-96'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['这儿/S 冬天 不 冷 ， 夏天/S *倒是*/ADV 很/ADV 炎热/V 。', "Winter here isn't cold; summer, though, is scorching."],
      ['城市/S 很 热 ， 山/S 上 *倒是*/ADV 很/ADV 凉爽/V 。', "The city is hot; up the mountain it's cool, though."],
      ['我/S *倒是*/ADV 想/MOD 去/V ， 可是/CONJ2 没有/V 时间/O 。', "I'd actually like to go, but I don't have time."],
    ],
    instances: [
      ['中午/T 很/ADV 热/V ， 晚上/T *倒是*/ADV 很/ADV 凉爽/V 。', "It's hot at noon, but the evenings are cool."],
      ['这/S 个 地方 很 远 ， 景观/S *倒是*/ADV 很/ADV 漂亮/V 。', "It's a long way, but the scenery is lovely."],
      ['房子/S 不 大 ， 环境/S *倒是*/ADV 很/ADV 好/V 。', "The house isn't big, but the surroundings are nice."],
      ['台风/S 来/V 了/SF ， 损失/S *倒是*/ADV 不/ADV 大/V 。', "The typhoon came, but the damage wasn't great."],
      ['我/S *倒是*/ADV 不/ADV 怕/V 冷/O ， 就/ADV 怕/V 潮湿/O 。', "I don't actually mind the cold — it's the damp I can't stand."],
      ['这里/S 很 干旱 ， 草原/S *倒是*/ADV 很/ADV 大/V 。', "It's dry here, but the grasslands are vast."],
      ['他/S *倒是*/ADV 很/ADV 喜欢/V 昆虫/O 。', 'He actually really likes insects.'],
      ['天气/S 很 寒冷 ， 孩子/S *倒是*/ADV 很/ADV 高兴/V 。', "It's freezing, but the children are happy."],
      ['我/S *倒是*/ADV 见/V 过/ASP 猴子/O ， 可是/CONJ2 没/ADV 见/V 过/ASP 熊/O 。', "I've seen monkeys, but never a bear."],
      ['这/S 种 蛇 看/V 起来/C 很 危险 ， 其实/ADV *倒是*/ADV 没有/V 危害/O 。', 'This snake looks dangerous but is actually harmless.'],
      ['东西/S 不 贵 ， 质量/S *倒是*/ADV 不错/V 。', "It's not expensive, and the quality is actually good."],
      ['那儿/S 夏天 很 炎热 ， 冬天/S *倒是*/ADV 不/ADV 太/ADV 寒冷/V 。', "Summers there are scorching; winters aren't too cold, though."],
      ['你/S 说 的 *倒是*/ADV 有/V 道理/O 。', "You've actually got a point."],
      ['他/S 没/ADV 去/V 过/ASP 高原/O ， 平原/S *倒是*/ADV 去/V 过/ASP 很/O 多 。', "He's never been to the plateau, but he's been to plenty of plains."],
      ['路/S 很 远 ， 日出/S *倒是*/ADV 很/ADV 漂亮/V 。', 'It was a long way, but the sunrise was beautiful.'],
    ],
    cloze: {
      blank: ['倒是'],
      distractors: [
        ['果然', 'LEX.NEAR_SYNONYM', '果然 = as expected; 倒是 marks a contrast.'],
        ['难怪', 'LEX.NEAR_SYNONYM', '难怪 = no wonder.'],
      ],
    },
  },
];
