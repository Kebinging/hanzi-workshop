import type { PatternSource } from './authoring';

// HSK 5 · Unit 11 (unit 35) · 历史文化 History — Written function words (provisional).

const PPV = { kind: 'before', a: 'PP', b: 'V', code: 'ORDER.PLACE_AFTER_VERB' } as const;

export const patternsU35: PatternSource[] = [
  {
    id: 'G5-61', unit: 35, title: '之所以 A，是因为 B (the reason A is that B)', titleZh: '之所以…是因为…',
    summary: 'Result first, then the reason: a formal way of explaining why.',
    explanationMd: `
**Form:** Subject + **之所以** + result，**是因为** + reason.

他之所以成功，是因为他很努力 — "the reason he succeeded is that he worked hard".

- The reverse order of 因为…所以 (G3-83): the known result comes first.
- 之所以 goes after the subject; 是因为 opens the second clause.`,
    formula: ['S', 'CONJ1', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [{ kind: 'pair', a: '之所以', b: '因为', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G3-83'],
    contrasts: ['G3-83'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'CONJ.MISSING_PARTNER'],
    examples: [
      ['他/S *之所以*/CONJ1 成功/V ， 是/CONJ2 *因为* 他/S 很/ADV 努力/V 。', 'The reason he succeeded is that he worked hard.'],
      ['这/S 座 城市 *之所以*/CONJ1 有名/V ， 是/CONJ2 *因为* 这儿/S 有/V 很/O 多 古迹 。', 'This city is famous because it has many historic sites.'],
      ['我/S *之所以*/CONJ1 学/V 历史/O ， 是/CONJ2 *因为* 我/S 喜欢/V 传说/O 。', 'I study history because I love legends.'],
    ],
    instances: [
      ['丝绸/S *之所以*/CONJ1 有名/V ， 是/CONJ2 *因为* 质量/S 很/ADV 好/V 。', 'Silk is famous because the quality is so good.'],
      ['这/S 个 王朝 *之所以*/CONJ1 衰落/V ， 是/CONJ2 *因为* 战争/S 太/ADV 多/V 。', 'The dynasty declined because there were too many wars.'],
      ['他/S *之所以*/CONJ1 当/V 了/ASP 将军/O ， 是/CONJ2 *因为* 他/S 很/ADV 有/V 智慧/O 。', 'He became a general because he was wise.'],
      ['瓷器/S *之所以*/CONJ1 珍贵/V ， 是/CONJ2 *因为* 历史/S 很/ADV 悠久/V 。', 'Porcelain is precious because of its long history.'],
      ['这/S 个 传说 *之所以*/CONJ1 能/MOD 传承/V 下来/C ， 是/CONJ2 *因为* 百姓/S 都/ADV 喜欢/V 。', 'The legend survived because ordinary people loved it.'],
      ['我/S *之所以*/CONJ1 来/V 中国/O ， 是/CONJ2 *因为* 我/S 喜欢/V 中国/O 文学 。', 'I came to China because I love Chinese literature.'],
      ['这/S 个 遗址 *之所以*/CONJ1 重要/V ， 是/CONJ2 *因为* 这/S 是/V 一/O 个 古老 的 都城 。', 'The site matters because it was an ancient capital.'],
      ['他/S *之所以*/CONJ1 写/V 诗歌/O ， 是/CONJ2 *因为* 他/S 热爱/V 祖国/O 。', 'He wrote poetry because he loved his country.'],
      ['那/S 个 国王 *之所以*/CONJ1 失败/V ， 是/CONJ2 *因为* 他/S 不/ADV 关心/V 百姓/O 。', 'The king failed because he did not care about his people.'],
      ['文物/S *之所以*/CONJ1 要/MOD 修复/V ， 是/CONJ2 *因为* 有/V 了/ASP 很/O 多 问题 。', 'The relics need restoring because they have many problems.'],
      ['这/S 里 的 农业 *之所以*/CONJ1 发达/V ， 是/CONJ2 *因为* 这儿/S 有/V 很/O 多 河流 。', 'Farming is advanced here because there are many rivers.'],
      ['他/S *之所以*/CONJ1 研究/V 考古/O ， 是/CONJ2 *因为* 他/S 小 时候 去/V 过/ASP 一/O 个 遗址 。', 'He studies archaeology because he visited a site as a child.'],
      ['这/S 次 战争 *之所以*/CONJ1 胜利/V ， 是/CONJ2 *因为* 士兵/S 都/ADV 很/ADV 勇敢/V 。', 'The war was won because the soldiers were brave.'],
      ['商人/S *之所以*/CONJ1 来/V 这儿/O ， 是/CONJ2 *因为* 这儿/S 有/V 丝绸/O 。', 'Merchants came here because there was silk.'],
      ['我/S *之所以*/CONJ1 喜欢/V 戏剧/O ， 是/CONJ2 *因为* 我/S 从/PP 小 就/ADV 看/V 。', "I love theatre because I've watched it since I was little."],
    ],
    cloze: {
      blank: ['之所以'],
      distractors: [
        ['所以', 'CONJ.PAIR_MISMATCH', '所以 gives a result; before 是因为 the result clause takes 之所以.'],
        ['因此', 'CONJ.PAIR_MISMATCH', '因此 = therefore; it does not pair with 是因为.'],
      ],
    },
  },
  {
    id: 'G5-62', unit: 35, title: '所 + V (+ 的) (what … does)', titleZh: '所 + 动词',
    summary: 'Written 所 before a verb turns it into "the thing that is V-ed".',
    explanationMd: `
**Form:** (Subject) + **所** + verb + 的 + (noun).

我所知道的历史 — "the history (that) I know"; 他所说的都是事实 — "what he said is all true".

- 所 adds a formal tone; 我知道的历史 means the same.
- Compare 被/为…所 (G5-30), where 所 marks a passive.`,
    formula: ['S', 'V', 'O'],
    constraints: [],
    requires: ['G5-30'],
    contrasts: ['G5-30'],
    errorCodes: ['LEX.COLLOCATION'],
    examples: [
      ['这/S 就/ADV 是/V 我/O *所* 知道 的 历史 。', 'This is the history I know.'],
      ['他/S *所* 说 的 都/ADV 是/V 事实/O 。', 'Everything he said is true.'],
      ['我们/S *所* 看 到 的 文物 都/ADV 很/ADV 珍贵/V 。', 'All the relics we saw are precious.'],
    ],
    instances: [
      ['书/S 里 *所* 记载 的 事情 都/ADV 是/V 真/O 的 。', 'What is recorded in the book is all true.'],
      ['这/S 是/V 我/O *所* 见 过 的 最 大 的 宫殿 。', 'This is the biggest palace I have ever seen.'],
      ['大家/S *所* 关心 的 是/V 和平/O 。', 'What everyone cares about is peace.'],
      ['他/S *所* 写 的 诗歌 很/ADV 有名/V 。', 'The poems he wrote are famous.'],
      ['这儿/S *所* 展示 的 都/ADV 是/V 文物/O 。', 'Everything on display here is a cultural relic.'],
      ['我/S *所* 了解 的 历史 不/ADV 多/V 。', "I don't know much history."],
      ['他们/S *所* 保存 的 文献 很/ADV 古老/V 。', 'The documents they keep are very old.'],
      ['百姓/S *所* 需要 的 是/V 和平/O 。', 'What ordinary people need is peace.'],
      ['这/S 是/V 他/O *所* 珍藏 的 瓷器 。', 'This is the porcelain he treasures.'],
      ['我们/S *所* 继承 的 遗产 非常/ADV 丰富/V 。', 'The heritage we inherit is very rich.'],
      ['他/S *所* 研究 的 是/V 考古/O 。', 'What he studies is archaeology.'],
      ['这/S 个 神话 *所* 讲 的 是/V 一/O 个 皇帝 的 故事 。', 'This myth tells the story of an emperor.'],
      ['他/S *所* 做 的 一切 都/ADV 是/V 为了/O 祖国 。', 'Everything he did was for his country.'],
      ['我/S *所* 喜欢 的 是/V 民间/O 舞蹈 。', 'What I like is folk dance.'],
      ['这/S 本 书 *所* 写 的 寓言 很/ADV 有意思/V 。', 'The fables in this book are fun.'],
    ],
    cloze: {
      blank: ['所'],
      distractors: [
        ['被', 'LEX.COLLOCATION', '被 marks a passive; before a verb meaning "what is V-ed" use 所.'],
        ['之', 'LEX.COLLOCATION', '之 links two nouns; before a verb use 所.'],
      ],
    },
  },
  {
    id: 'G5-63', unit: 35, title: '之一 (one of — written 之)', titleZh: '之',
    summary: '之 is classical 的; today it lives on in set forms like 之一, 之前, 之后, 之间.',
    explanationMd: `
**Form:** … **之** 一 / 前 / 后 / 间 / 中.

这是中国最古老的宫殿之一 — "this is one of China's oldest palaces".

- A + 之一 = one of A. Time + 之前 / 之后 = before / after (more formal than 以前 / 以后).
- A 和 B 之间 = between A and B.`,
    formula: ['S', 'V', 'O'],
    constraints: [],
    requires: ['G3-90'],
    contrasts: ['G3-90'],
    errorCodes: ['LEX.COLLOCATION'],
    examples: [
      ['这/S 是/V 中国/O 最 古老 的 宫殿 *之* 一 。', "This is one of China's oldest palaces."],
      ['这/S 是/V 历史/O 上 最 有名 的 战争 *之* 一 。', 'This is one of the most famous wars in history.'],
      ['丝绸/S 是/V 中国/O 最 有名 的 东西 *之* 一 。', "Silk is one of China's most famous products."],
    ],
    instances: [
      ['他/S 是/V 那/O 个 朝代 最 有名 的 诗人 *之* 一 。', 'He is one of the most famous poets of that dynasty.'],
      ['他/S 是/V 那/O 个 王朝 最 有名 的 将军 *之* 一 。', 'He is one of the most famous generals of that dynasty.'],
      ['这/S 是/V 中国/O 古老 的 都城 *之* 一 。', "This is one of China's ancient capitals."],
      ['这/S 次 革命 是/V 历史/O 上 最 重要 的 事情 *之* 一 。', 'This revolution is one of the most important events in history.'],
      ['瓷器/S 是/V 最 珍贵 的 文物/O *之* 一 。', 'Porcelain is one of the most precious relics.'],
      ['这儿/S 是/V 以前/O 最 繁华 的 都城 *之* 一 。', 'This was once one of the most thriving capitals.'],
      ['他/S 是/V 这/O 个 领域 的 专家 *之* 一 。', 'He is one of the experts in this field.'],
      ['这/S 个 皇帝 的 故事 是/V 民间/O 最 有名 的 传说 *之* 一 。', "This emperor's story is one of the best-known folk legends."],
      ['这/S 是/V 我/O 最 喜欢 的 神话 *之* 一 。', 'This is one of my favourite myths.'],
      ['农业/S 是/V 这/O 个 王朝 最 发达 的 领域 *之* 一 。', "Farming was one of this dynasty's most advanced fields."],
      ['这/S 个 宫殿 是/V 中国/O 文化 的 象征 *之* 一 。', 'This palace is one of the symbols of Chinese culture.'],
      ['这/S 是/V 历史/O 上 最 辉煌 的 朝代 *之* 一 。', 'This was one of the most glorious dynasties in history.'],
      ['考古/S 是/V 我/O 最 喜欢 的 学科 *之* 一 。', 'Archaeology is one of my favourite subjects.'],
      ['丝绸/S 是/V 商人/O 最 喜欢 的 东西 *之* 一 。', 'Silk was one of the things merchants liked best.'],
      ['这/S 种 舞蹈 是/V 民间/O 艺术 *之* 一 。', 'This dance is one of the folk arts.'],
    ],
    cloze: {
      blank: ['之'],
      distractors: [
        ['其', 'LEX.MEANING', '其 = its / their; "one of" is 之一.'],
        ['所', 'LEX.COLLOCATION', '所 goes before a verb.'],
      ],
    },
  },
  {
    id: 'G5-64', unit: 35, title: '其 (its, their, his, her)', titleZh: '其',
    summary: 'Written 其 refers back to something just mentioned: 其 + noun = its / their noun.',
    explanationMd: `
**Form:** A …，**其** + noun + comment.

这座宫殿很古老，其历史有几百年了 — "this palace is old; its history goes back centuries".

- 其 = 他的 / 她的 / 它的 / 他们的, but only in writing.
- Fixed forms: 其中 (among them), 其实 (actually), 其他 (other).`,
    formula: ['S', 'V', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G3-95'],
    errorCodes: ['LEX.MEANING'],
    examples: [
      ['这/S 个 王朝 很 有名 ， *其*/S 都城 在/V 北方/O 。', 'This dynasty is famous; its capital was in the north.'],
      ['这/S 本 书 很 好 ， *其*/S 内容 很/ADV 丰富/V 。', 'This book is good; its content is rich.'],
      ['这/S 座 宫殿 很 古老 ， *其*/S 历史 有/V 几/O 百 年 了 。', 'This palace is old; its history goes back centuries.'],
    ],
    instances: [
      ['这/S 个 传说 很 古老 ， *其*/S 起源 已经/ADV 不/ADV 清楚/V 了/SF 。', 'This legend is ancient; its origin is no longer clear.'],
      ['这/S 位 诗人 很 有名 ， *其*/S 诗歌 都/ADV 被/BA 保存/V 了/ASP 下来/C 。', 'This poet is famous; all his poems have been preserved.'],
      ['这/S 个 遗址 很 大 ， *其*/S 中 有/V 很/O 多 宫殿 。', 'The site is huge, with many palaces in it.'],
      ['他/S 写 了 很 多 书 ， *其*/S 中 最 有名 的 是/V 一/O 本 寓言 。', 'He wrote many books; the most famous is a book of fables.'],
      ['这/S 个 朝代 很 辉煌 ， *其*/S 文化 影响/V 了/ASP 很/O 多 国家 。', 'This dynasty was glorious; its culture influenced many countries.'],
      ['这/S 种 瓷器 很 珍贵 ， *其*/S 价格 非常/ADV 高/V 。', 'This porcelain is precious; its price is very high.'],
      ['这/S 个 国家 很 小 ， *其*/S 军队 却/ADV 很/ADV 强/V 。', 'The country was small, yet its army was strong.'],
      ['这/S 本 文献 很 重要 ， *其*/S 内容 记载/V 了/ASP 很/O 多 战争 。', 'This document is important; it records many wars.'],
      ['这/S 个 王朝 衰落 了 ， *其*/S 原因 有/V 很/O 多 。', 'The dynasty declined, for many reasons.'],
      ['这/S 位 将军 很 有名 ， *其*/S 故事 一直/ADV 传承/V 到/C 今天/O 。', 'This general is famous; his story has been passed down to today.'],
      ['这/S 座 都城 很 繁华 ， *其*/S 商人 很/ADV 多/V 。', 'The capital was thriving, with many merchants.'],
      ['这/S 种 舞蹈 很 古老 ， *其*/S 起源 在/V 民间/O 。', 'This dance is old; it began among the common people.'],
      ['这/S 个 神话 很 有意思 ， *其*/S 情节 很/ADV 简单/V 。', 'This myth is interesting; its plot is simple.'],
      ['这/S 件 文物 被 修复 了 ， *其*/S 颜色 更/ADV 漂亮/V 了/SF 。', 'This relic has been restored; its colours are even lovelier.'],
      ['这/S 个 地方 农业 很 发达 ， *其*/S 丝绸 也/ADV 很/ADV 有名/V 。', 'This place has advanced farming, and its silk is famous too.'],
    ],
    cloze: {
      blank: ['其'],
      distractors: [
        ['之', 'LEX.MEANING', '之 links two nouns (之一); "its" is 其.'],
        ['所', 'LEX.MEANING', '所 goes before a verb.'],
      ],
    },
  },
  {
    id: 'G5-65', unit: 35, title: '以 (by means of, with — written)', titleZh: '以',
    summary: 'Written 以 + means = 用 / 通过: do something by means of it.',
    explanationMd: `
**Form:** Subject + **以** + means + verb phrase.

他以诗歌记载了那次战争 — "he recorded that war in poetry".

- Like 用 or 通过 (G4-19), but formal.
- Compare 以 A 为 B (G5-25), where 以 pairs with 为.`,
    formula: ['S', 'PP', 'V', 'O'],
    constraints: [PPV],
    requires: ['G4-19', 'G5-25'],
    contrasts: ['G5-25'],
    errorCodes: ['ORDER.PLACE_AFTER_VERB', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S *以*/PP 诗歌 记载/V 了/ASP 那/O 次 战争 。', 'He recorded that war in poetry.'],
      ['我们/S 要/MOD *以*/PP 和平 的 方法 解决/V 问题/O 。', 'We must solve problems by peaceful means.'],
      ['他/S *以*/PP 自己 的 智慧 救/V 了/ASP 很/O 多 百姓 。', 'He saved many people with his wisdom.'],
    ],
    instances: [
      ['皇帝/S *以*/PP 战争 统一/V 了/ASP 国家/O 。', 'The emperor unified the country through war.'],
      ['商人/S *以*/PP 丝绸 换/V 瓷器/O 。', 'Merchants traded silk for porcelain.'],
      ['他/S *以*/PP 舞蹈 表现/V 民间/O 的 生活 。', 'He shows folk life through dance.'],
      ['我们/S *以*/PP 考古 的 方法 研究/V 历史/O 。', 'We study history by archaeological methods.'],
      ['诗人/S *以*/PP 诗歌 表达/V 自己/O 的 心情 。', 'Poets express their feelings in poetry.'],
      ['他/S *以*/PP 绘画 记载/V 了/ASP 百姓/O 的 生活 。', 'He recorded ordinary life in paintings.'],
      ['学者/S *以*/PP 文献 证明/V 了/ASP 这/O 个 传说 。', 'Scholars proved the legend with documents.'],
      ['国王/S *以*/PP 和平 的 方法 解决/V 了/ASP 问题/O 。', 'The king solved the problem peacefully.'],
      ['他们/S *以*/PP 手工 做/V 瓷器/O 。', 'They make porcelain by hand.'],
      ['将军/S *以*/PP 很 少 的 士兵 获得/V 了/ASP 胜利/O 。', 'The general won with very few soldiers.'],
      ['这/S 个 寓言 *以*/PP 简单 的 情节 讲/V 了/ASP 一/O 个 道理 。', 'The fable makes its point with a simple plot.'],
      ['她/S *以*/PP 戏剧 展示/V 了/ASP 历史/O 。', 'She presented history through drama.'],
      ['我们/S *以*/PP 照片 保存/V 了/ASP 古迹/O 的 样子 。', 'We preserved how the site looked in photos.'],
      ['他/S *以*/PP 自己 的 一生 传承/V 了/ASP 这/O 种 手工 。', 'He devoted his life to passing on this craft.'],
      ['老师/S *以*/PP 神话 讲解/V 历史/O 。', 'The teacher explains history through myths.'],
    ],
    cloze: {
      blank: ['以'],
      distractors: [
        ['对', 'LEX.NEAR_SYNONYM', '对 = to, towards; "by means of" is 以.'],
        ['被', 'LEX.NEAR_SYNONYM', '被 marks a passive.'],
      ],
    },
  },
  {
    id: 'G5-66', unit: 35, title: 'V + 为 (wéi) (as, into)', titleZh: '动词 + 为',
    summary: 'Written 为 (wéi) after a verb = "as / into": 选为, 改为, 分为.',
    explanationMd: `
**Form:** (把 / 被 …) + verb + **为** + result.

他被选为将军 — "he was chosen as general". 这座宫殿改为学校了 — "the palace became a school".

- Common verbs: 选为 (elect as), 改为 (change into), 分为 (divide into), 变为 (turn into).
- Spoken equivalents use 成: 改成, 分成, 变成 (G3-39).`,
    formula: ['S', 'BA', 'V', 'C', 'O'],
    constraints: [],
    requires: ['G3-39', 'G3-61'],
    contrasts: ['G3-39'],
    errorCodes: ['COMP.RESULT_CHOICE'],
    examples: [
      ['他/S 被/BA 大家 选/V *为*/C 将军/O 。', 'He was chosen as general.'],
      ['这/S 座 宫殿 后来 改/V *为*/C 学校/O 。', 'The palace was later turned into a school.'],
      ['历史/S 可以/MOD 分/V *为*/C %三/O 个 部分 。', 'History can be divided into three parts.'],
    ],
    instances: [
      ['这/S 个 城市 被/BA 选/V *为*/C 都城/O 。', 'This city was chosen as the capital.'],
      ['他/S 被/BA 选/V *为*/C 国王/O 。', 'He was chosen as king.'],
      ['这/S 本 书 分/V *为*/C %两/O 个 部分 。', 'This book is divided into two parts.'],
      ['那/S 个 王朝 把/BA 都城 改/V *为*/C 北京/O 。', 'That dynasty moved the capital to Beijing.'],
      ['这/S 个 地方 从/PP 农业 城市 变/V *为*/C 工业/O 城市 。', 'This place turned from a farming town into an industrial city.'],
      ['他/S 被/BA 选/V *为*/C 校长/O 。', 'He was chosen as head.'],
      ['这/S 种 舞蹈 被/BA 选/V *为*/C 文化/O 遗产 。', 'This dance was named cultural heritage.'],
      ['这/S 个 宫殿 被/BA 改/V *为*/C 学校/O 了 。', 'The palace has been turned into a school.'],
      ['中国/S 历史 可以/MOD 分/V *为*/C 很/O 多 朝代 。', 'Chinese history can be divided into many dynasties.'],
      ['他/S 把/BA 小说 改/V *为*/C 戏剧/O 。', 'He adapted the novel into a play.'],
      ['这/S 个 遗址 被/BA 选/V *为*/C 世界/O 遗产 。', 'The site was named World Heritage.'],
      ['大家/S 把/BA 他 选/V *为*/C 代表/O 。', 'Everyone chose him as their representative.'],
      ['这/S 个 古迹 被/BA 改/V *为*/C 公园/O 。', 'The historic site was turned into a park.'],
      ['学生/S 被/BA 分/V *为*/C %三/O 个 班 。', 'The students were divided into three classes.'],
      ['这/S 个 传说 被/BA 改/V *为*/C 电影/O 。', 'The legend was made into a film.'],
    ],
    cloze: {
      blank: ['为'],
      distractors: [
        ['在', 'LEX.COLLOCATION', '在 gives a place; "chosen as / turned into" is V + 为.'],
        ['给', 'LEX.COLLOCATION', '给 marks a recipient.'],
      ],
    },
  },
];
