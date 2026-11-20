import type { PatternSource } from './authoring';

// HSK 5 · Unit 6 (unit 30) · 媒体观点 Media & opinion — Perspective & reformulation (provisional).

export const patternsU30: PatternSource[] = [
  {
    id: 'G5-31', unit: 30, title: '对 … 而言 (as far as … is concerned)', titleZh: '对…而言',
    summary: '对 X 而言 frames a statement from X\'s position: for X, ….',
    explanationMd: `
**Form:** **对** + person / group + **而言**，comment.

对年轻人而言，网络很重要 — "for young people, the internet is very important".

- A more formal version of **对…来说** (G3-87).
- The frame goes first, followed by a comma.`,
    formula: ['PP', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G3-87'],
    contrasts: ['G3-87', 'G5-33'],
    errorCodes: ['LEX.COLLOCATION'],
    examples: [
      ['*对*/PP 年轻人 *而言* ， 网络/S 很/ADV 重要/V 。', 'For young people, the internet is very important.'],
      ['*对*/PP 我 *而言* ， 这/S 个 消息 很/ADV 意外/V 。', 'For me, this news was unexpected.'],
      ['*对*/PP 媒体 *而言* ， 真相/S 最/ADV 重要/V 。', 'For the media, the truth matters most.'],
    ],
    instances: [
      ['*对*/PP 读者 *而言* ， 文章/S 要/MOD 客观/V 。', 'For readers, articles need to be objective.'],
      ['*对*/PP 记者 *而言* ， 采访/S 很/ADV 重要/V 。', 'For journalists, interviews are very important.'],
      ['*对*/PP 主持人 *而言* ， 说话/S 要/MOD 清楚/V 。', 'For a presenter, speaking clearly is a must.'],
      ['*对*/PP 用户 *而言* ， 隐私/S 最/ADV 重要/V 。', 'For users, privacy is what matters most.'],
      ['*对*/PP 老人 *而言* ， 网络/S 有点儿/ADV 复杂/V 。', 'For older people, the internet is a bit complicated.'],
      ['*对*/PP 公司 *而言* ， 舆论/S 的 影响 很/ADV 大/V 。', 'For a company, public opinion has a big impact.'],
      ['*对*/PP 学生 *而言* ， 这/S 本 杂志 很/ADV 有意思/V 。', 'For students, this magazine is very interesting.'],
      ['*对*/PP 网友 *而言* ， 转发/S 很/ADV 方便/V 。', 'For internet users, sharing is easy.'],
      ['*对*/PP 观众 *而言* ， 节目/S 要/MOD 有意思/V 。', 'For viewers, a programme has to be interesting.'],
      ['*对*/PP 政府 *而言* ， 公开/S 信息 很/ADV 重要/V 。', 'For the government, making information public is important.'],
      ['*对*/PP 作者 *而言* ， 读者/S 的 评论 很/ADV 重要/V 。', "For an author, readers' comments are important."],
      ['*对*/PP 我们 *而言* ， 这/S 是/V 一/O 个 热点 。', 'For us, this is a hot topic.'],
      ['*对*/PP 孩子 *而言* ， 网络/S 也/ADV 有/V 危险/O 。', 'For children, the internet has dangers too.'],
      ['*对*/PP 他 *而言* ， 承认/S 错误 很/ADV 难/V 。', 'For him, admitting mistakes is hard.'],
      ['*对*/PP 平台 *而言* ， 用户/S 越/ADV 多/V 越/ADV 好/V 。', 'For a platform, the more users the better.'],
    ],
    cloze: {
      blank: ['而言'],
      distractors: [
        ['看来', 'LEX.COLLOCATION', '看来 goes with 在 … (在…看来); 对 … pairs with 而言 / 来说.'],
        ['以来', 'LEX.COLLOCATION', '以来 means "since" and goes with 自从 ….'],
      ],
    },
  },
  {
    id: 'G5-32', unit: 30, title: '从 … 来看 (judging from)', titleZh: '从…来看',
    summary: '从 X 来看 bases a judgement on X: judging from X, ….',
    explanationMd: `
**Form:** **从** + evidence / angle + **来看**，judgement.

从这些数据来看，情况越来越好 — "judging from these figures, things are improving".

- X is evidence (数据, 结果, 反应) or an angle (角度, 历史, 长远).
- Compare 对…而言 (G5-31: for whom) and 在…看来 (G5-33: in whose opinion).`,
    formula: ['PP', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G4-41'],
    contrasts: ['G5-31', 'G5-33'],
    errorCodes: ['LEX.COLLOCATION'],
    examples: [
      ['*从*/PP 这 些 数据 来 看 ， 情况/S 越来越/ADV 好/V 。', 'Judging from these figures, things are improving.'],
      ['*从*/PP 读者 的 角度 来 看 ， 这/S 篇 文章 太/ADV 长/V 了/SF 。', "From the reader's point of view, this article is too long."],
      ['*从*/PP 评论 来 看 ， 大家/S 都/ADV 很/ADV 喜欢/V 。', 'Judging from the comments, everyone loves it.'],
    ],
    instances: [
      ['*从*/PP 事实 来 看 ， 他/S 说 的 是/V 对/O 的 。', 'Judging from the facts, he is right.'],
      ['*从*/PP 这 个 角度 来 看 ， 他/S 也/ADV 有/V 道理/O 。', 'From this angle, he has a point too.'],
      ['*从*/PP 网友 的 反应 来 看 ， 这/S 个 节目 很/ADV 成功/V 。', "Judging from users' reactions, this programme is a success."],
      ['*从*/PP 现在 的 趋势 来 看 ， 网络/S 会/MOD 越来越/ADV 重要/V 。', 'Judging from current trends, the internet will become more and more important.'],
      ['*从*/PP 他 的 表情 来 看 ， 他/S 不/ADV 太/ADV 赞成/V 。', "Judging from his face, he doesn't really agree."],
      ['*从*/PP 调查 结果 来 看 ， 大/S 部分 人 都/ADV 关注/V 时事/O 。', 'According to the survey results, most people follow current affairs.'],
      ['*从*/PP 证据 来 看 ， 这/S 个 新闻 是/V 真实/O 的 。', 'Judging from the evidence, this news is true.'],
      ['*从*/PP 客观 的 角度 来 看 ， 两/S 种 看法 都/ADV 有/V 道理/O 。', 'Objectively speaking, both views make sense.'],
      ['*从*/PP 点击 的 数字 来 看 ， 这/S 篇 文章 很/ADV 有名/V 。', 'Judging from the clicks, this article is well known.'],
      ['*从*/PP 读者 的 评论 来 看 ， 大家/S 的 意见 不/ADV 一致/V 。', "Judging from readers' comments, opinions are divided."],
      ['*从*/PP 历史 来 看 ， 媒体/S 的 影响 越来越/ADV 大/V 。', 'Historically, the influence of the media keeps growing.'],
      ['*从*/PP 这 件 事情 来 看 ， 他/S 是/V 一/O 个 可靠 的 人 。', "Judging from this, he's a reliable person."],
      ['*从*/PP 他 的 发言 来 看 ， 他/S 很/ADV 了解/V 这/O 个 话题 。', 'From his speech, he clearly knows this topic well.'],
      ['*从*/PP 宣传 的 效果 来 看 ， 这/S 次 活动 很/ADV 成功/V 。', 'Judging from the publicity, this event was a success.'],
      ['*从*/PP 全面 的 角度 来 看 ， 这/S 个 问题 很/ADV 复杂/V 。', 'Looked at in the round, this problem is complex.'],
    ],
    cloze: {
      blank: ['从'],
      distractors: [
        ['对', 'LEX.COLLOCATION', '对 … pairs with 而言 / 来说; "judging from" is 从 … 来看.'],
        ['在', 'LEX.COLLOCATION', '在 … pairs with 看来.'],
      ],
    },
  },
  {
    id: 'G5-33', unit: 30, title: '在 … 看来 (in … view)', titleZh: '在…看来',
    summary: '在 X 看来 gives the statement as X\'s opinion.',
    explanationMd: `
**Form:** **在** + person + **看来**，opinion.

在我看来，这个办法很合理 — "in my view, this approach is reasonable".

- It marks the sentence as an opinion, not a fact.
- Compare 对…而言 (G5-31, for whom it matters) and 从…来看 (G5-32, judging from evidence).`,
    formula: ['PP', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G5-31'],
    contrasts: ['G5-31', 'G5-32'],
    errorCodes: ['LEX.COLLOCATION'],
    examples: [
      ['*在*/PP 我 *看来* ， 这/S 个 办法 很/ADV 合理/V 。', 'In my view, this approach is reasonable.'],
      ['*在*/PP 很 多 人 *看来* ， 媒体/S 应该/MOD 客观/V 。', 'In many people’s view, the media should be objective.'],
      ['*在*/PP 他 *看来* ， 网络/S 让/V 生活/O 更 方便 了 。', 'As he sees it, the internet has made life easier.'],
    ],
    instances: [
      ['*在*/PP 老师 *看来* ， 这/S 篇 文章 写/V 得/C 很 好 。', "In the teacher's view, this essay is well written."],
      ['*在*/PP 年轻人 *看来* ， 网络/S 是/V 生活/O 的 一 部分 。', 'To young people, the internet is part of life.'],
      ['*在*/PP 记者 *看来* ， 真相/S 最/ADV 重要/V 。', 'In journalists’ eyes, the truth matters most.'],
      ['*在*/PP 我 *看来* ， 他/S 的 观点 有点儿/ADV 片面/V 。', 'In my view, his opinion is a bit one-sided.'],
      ['*在*/PP 专家 *看来* ， 这/S 个 趋势 会/MOD 继续/V 。', 'Experts think this trend will continue.'],
      ['*在*/PP 父母 *看来* ， 孩子/S 上网/V 太/ADV 多/V 了/SF 。', 'Parents think their children spend too much time online.'],
      ['*在*/PP 他 *看来* ， 这/S 个 声明 不/ADV 可靠/V 。', "In his view, this statement isn't reliable."],
      ['*在*/PP 读者 *看来* ， 这/S 本 杂志 很/ADV 客观/V 。', 'Readers find this magazine objective.'],
      ['*在*/PP 很 多 网友 *看来* ， 隐私/S 很/ADV 重要/V 。', 'Many internet users think privacy matters a lot.'],
      ['*在*/PP 我 *看来* ， 你们/S 的 分歧 不/ADV 大/V 。', "As I see it, your differences aren't big."],
      ['*在*/PP 主持人 *看来* ， 这/S 个 话题 很/ADV 有意思/V 。', 'The presenter thinks this topic is interesting.'],
      ['*在*/PP 她 *看来* ， 宣传/S 太/ADV 多/V 了/SF 。', 'In her view, there is too much publicity.'],
      ['*在*/PP 大家 *看来* ， 他/S 的 言论 很/ADV 合理/V 。', 'Everyone thinks what he said is reasonable.'],
      ['*在*/PP 作者 *看来* ， 这/S 个 现象 很/ADV 普遍/V 。', 'The author thinks this phenomenon is widespread.'],
      ['*在*/PP 我 *看来* ， 评论/S 应该/MOD 全面/V 一点儿/C 。', 'In my view, comments should be more comprehensive.'],
    ],
    cloze: {
      blank: ['看来'],
      distractors: [
        ['而言', 'LEX.COLLOCATION', '而言 goes with 对 …; 在 … 看来 = in … view.'],
        ['来说', 'LEX.COLLOCATION', '来说 goes with 对 ….'],
      ],
    },
  },
  {
    id: 'G5-34', unit: 30, title: '换句话说 / 也就是说 (in other words)', titleZh: '换句话说／也就是说',
    summary: '换句话说 / 也就是说 restates the previous point more plainly or draws out what it means.',
    explanationMd: `
**Form:** statement，**换句话说 / 也就是说**，restatement.

他没有否认，换句话说，他承认了 — "he didn't deny it — in other words, he admitted it".

- Both reformulate; 也就是说 is also used to spell out an implication.
- Usually followed by a comma.`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G4-69'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S 没有/V 否认/O ， *换句话说*/CONJ2 ， 他/S 承认/V 了/SF 。', "He didn't deny it — in other words, he admitted it."],
      ['这/S 个 节目 的 观众 越来越 少 ， *也就是说*/CONJ2 ， 大家/S 不/ADV 喜欢/V 了/SF 。', "This show is losing viewers — that is to say, people don't like it any more."],
      ['他/S 是/V 主持人/O ， *也就是说*/CONJ2 ， 他/S 每/T 天 都/ADV 上/V 电视/O 。', "He's a presenter, which means he's on TV every day."],
    ],
    instances: [
      ['这/S 篇 文章 只@zhi3 说 了 一 个 方面 ， *换句话说*/CONJ2 ， 它/S 很/ADV 片面/V 。', 'This article only covers one side — in other words, it is one-sided.'],
      ['大家/S 的 意见 都 一样 ， *也就是说*/CONJ2 ， 我们/S 没有/V 分歧/O 。', "Everyone thinks the same — that is, we have no differences."],
      ['他/S 没有/V 回答/O ， *换句话说*/CONJ2 ， 他/S 不/ADV 想/MOD 说/V 。', "He didn't answer — in other words, he doesn't want to say."],
      ['这/S 个 平台 有 一 亿 用户 ， *也就是说*/CONJ2 ， 它/S 的 影响 很/ADV 大/V 。', 'This platform has 100 million users, which means its influence is huge.'],
      ['记者/S 没有/V 证据/O ， *换句话说*/CONJ2 ， 这/S 个 报道 不/ADV 可靠/V 。', "The journalist has no evidence — in other words, the report isn't reliable."],
      ['他/S 赞成/V ， 我/S 也/ADV 赞成/V ， *也就是说*/CONJ2 ， 我们/S 的 意见 一致/V 。', 'He agrees and so do I — that is, we are of one mind.'],
      ['这/S 个 消息 没有 公开 ， *换句话说*/CONJ2 ， 大家/S 还/ADV 不/ADV 知道/V 。', "The news hasn't been made public — in other words, nobody knows yet."],
      ['他/S 是/V 我/O 父亲 的 兄弟 ， *也就是说*/CONJ2 ， 他/S 是/V 我/O 的 长辈 。', "He's my father's brother, which means he's my elder."],
      ['网友/S 的 反应 很 大 ， *换句话说*/CONJ2 ， 这/S 是/V 一/O 个 热点 。', "Users' reaction was huge — in other words, it is a hot topic."],
      ['这/S 个 栏目 每 天 都 有 时事 ， *也就是说*/CONJ2 ， 你/S 每/T 天 都/ADV 能/MOD 了解/V 新闻/O 。', 'This section has current affairs every day, so you can keep up with the news daily.'],
      ['他/S 不/ADV 同意/V 你/O 的 看法 ， *换句话说*/CONJ2 ， 他/S 反对/V 。', "He doesn't share your view — in other words, he's against it."],
      ['这/S 本 杂志 一 个 月 出版 一 次 ， *也就是说*/CONJ2 ， 一/T 年 有/V %十二/O 本 。', 'This magazine comes out once a month, so there are twelve issues a year.'],
      ['他/S 很 少 发表 评论 ， *换句话说*/CONJ2 ， 他/S 不/ADV 喜欢/V 表达/V 自己/O 的 观点 。', "He rarely comments — in other words, he doesn't like giving his views."],
      ['这/S 个 声明 是 公开 的 ， *也就是说*/CONJ2 ， 谁/S 都/ADV 可以/MOD 看/V 。', 'This statement is public, which means anyone can read it.'],
      ['她/S 很 少 上网 ， *换句话说*/CONJ2 ， 她/S 不/ADV 太/ADV 了解/V 网络/O 。', "She rarely goes online — in other words, she doesn't know much about the internet."],
    ],
    cloze: {
      blank: ['换句话说', '也就是说'],
      distractors: [
        ['另外', 'LEX.NEAR_SYNONYM', '另外 adds a new point; 换句话说 / 也就是说 restate the same one.'],
        ['可是', 'LEX.NEAR_SYNONYM', '可是 introduces a contrast.'],
      ],
    },
  },
  {
    id: 'G5-35', unit: 30, title: '总而言之 (in a word, all in all)', titleZh: '总而言之',
    summary: '总而言之 sums up a discussion in one conclusion (formal).',
    explanationMd: `
**Form:** (points …)，**总而言之**，conclusion.

总而言之，媒体应该客观 — "in a word, the media should be objective".

- The formal counterpart of **总之** (G4-69).
- Usually opens the final sentence or paragraph, followed by a comma.`,
    formula: ['CONJ1', 'P', 'S', 'V'],
    constraints: [],
    requires: ['G4-69'],
    contrasts: ['G4-69'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*总而言之*/CONJ1 ， 媒体/S 应该/MOD 客观/V 。', 'In a word, the media should be objective.'],
      ['有/S 人 赞成/V ， 有/S 人 反对/V ， *总而言之*/CONJ1 ， 大家/S 的 看法 不/ADV 一致/V 。', 'Some agree, some disagree — in short, opinions differ.'],
      ['*总而言之*/CONJ1 ， 这/S 是/V 一/O 个 很 好 的 节目 。', 'All in all, this is a very good programme.'],
    ],
    instances: [
      ['*总而言之*/CONJ1 ， 网络/S 有/V 好处/O ， 也/ADV 有/V 坏处/O 。', 'All in all, the internet has advantages and disadvantages.'],
      ['*总而言之*/CONJ1 ， 我们/S 要/MOD 保护/V 自己/O 的 隐私 。', 'In short, we must protect our privacy.'],
      ['*总而言之*/CONJ1 ， 这/S 篇 文章 写/V 得/C 很 全面 。', 'All in all, this article is very thorough.'],
      ['*总而言之*/CONJ1 ， 真相/S 最/ADV 重要/V 。', 'In a word, the truth matters most.'],
      ['*总而言之*/CONJ1 ， 我/S 赞成/V 你/O 的 观点 。', 'In short, I agree with you.'],
      ['*总而言之*/CONJ1 ， 舆论/S 的 影响 越来越/ADV 大/V 。', 'All in all, public opinion is becoming more and more influential.'],
      ['*总而言之*/CONJ1 ， 大家/S 要/MOD 多/ADV 关注/V 时事/O 。', 'In a word, everyone should follow current affairs more.'],
      ['*总而言之*/CONJ1 ， 这/S 次 采访 很/ADV 成功/V 。', 'All in all, the interview was a success.'],
      ['*总而言之*/CONJ1 ， 我们/S 不/ADV 能/MOD 只@zhi3/ADV 看/V 一/O 个 角度 。', "In short, we mustn't look at it from only one angle."],
      ['*总而言之*/CONJ1 ， 他/S 说 的 很/ADV 合理/V 。', 'All in all, what he says is reasonable.'],
      ['*总而言之*/CONJ1 ， 平台/S 应该/MOD 尊重/V 用户/O 。', 'In short, platforms should respect their users.'],
      ['*总而言之*/CONJ1 ， 读者/S 很/ADV 满意/V 。', 'All in all, readers are happy.'],
      ['*总而言之*/CONJ1 ， 我们/S 要/MOD 有/V 自己/O 的 立场 。', 'In a word, we need a position of our own.'],
      ['*总而言之*/CONJ1 ， 这/S 个 话题 值得/V 讨论/O 。', 'All in all, this topic is worth discussing.'],
      ['*总而言之*/CONJ1 ， 媒体/S 的 责任 很/ADV 大/V 。', 'In short, the media carry great responsibility.'],
    ],
    cloze: {
      blank: ['总而言之'],
      distractors: [
        ['例如', 'LEX.NEAR_SYNONYM', '例如 introduces an example, not a conclusion.'],
        ['然后', 'LEX.NEAR_SYNONYM', '然后 is the next step, not a summary.'],
      ],
    },
  },
  {
    id: 'G5-36', unit: 30, title: '况且 (moreover, besides)', titleZh: '况且',
    summary: '况且 adds a further, often decisive reason in an argument.',
    explanationMd: `
**Form:** reason 1，**况且** + (also) reason 2.

这个消息不可靠，况且也没有证据 — "this news isn't reliable — and besides, there's no evidence".

- Common in arguing or persuading; the second clause often has 也 / 还.
- Close to **何况** (G4-48), but 况且 doesn't take 呢 and doesn't mean "let alone".`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G4-48'],
    contrasts: ['G4-48', 'G4-70'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['这/S 个 消息 不/ADV 可靠/V ， *况且*/CONJ2 也/ADV 没有/V 证据/O 。', "This news isn't reliable — and besides, there's no evidence."],
      ['我/S 不/ADV 想/MOD 去/V ， *况且*/CONJ2 外面/S 还/ADV 在/ADV 下雨/V 。', "I don't want to go — and anyway, it's still raining."],
      ['你/S 别/ADV 担心/V ， *况且*/CONJ2 他/S 已经/ADV 道歉/V 了/SF 。', "Don't worry — besides, he's already apologised."],
    ],
    instances: [
      ['这/S 本 杂志 太/ADV 贵/V ， *况且*/CONJ2 内容/S 也/ADV 不/ADV 太/ADV 好/V 。', "This magazine is too pricey, and the content isn't great either."],
      ['我/S 没有/V 时间/O ， *况且*/CONJ2 我/S 也/ADV 不/ADV 了解/V 这/O 个 话题 。', "I don't have time, and besides, I don't know this topic."],
      ['他/S 是/V 专家/O ， *况且*/CONJ2 他/S 有/V 很/O 多 证据 。', "He's an expert, and moreover he has plenty of evidence."],
      ['这/S 个 平台 很/ADV 方便/V ， *况且*/CONJ2 还/ADV 是/V 免费/O 的 。', "This platform is convenient, and it's free too."],
      ['你/S 应该/MOD 承认/V 错误/O ， *况且*/CONJ2 大家/S 都/ADV 知道/V 了/SF 。', 'You should admit the mistake — besides, everyone knows already.'],
      ['这/S 个 观点 太/ADV 片面/V ， *况且*/CONJ2 没有/V 事实/O 。', 'This view is too one-sided, and it has no facts behind it.'],
      ['时间/S 太/ADV 晚/V 了/SF ， *况且*/CONJ2 明天/T 还/ADV 要/MOD 上班/V 。', "It's too late, and besides, there's work tomorrow."],
      ['我/S 不/ADV 想/MOD 转发/V ， *况且*/CONJ2 这/S 个 消息 不/ADV 一定/ADV 真实/V 。', "I don't want to share it — and anyway, the news may not be true."],
      ['他/S 很/ADV 有/V 经验/O ， *况且*/CONJ2 也/ADV 很/ADV 客观/V 。', "He's experienced, and objective too."],
      ['这/S 个 节目 很/ADV 有意思/V ， *况且*/CONJ2 主持人/S 也/ADV 很/ADV 幽默/V 。', 'This show is interesting, and the presenter is funny too.'],
      ['我们/S 应该/MOD 尊重/V 他/O 的 隐私 ， *况且*/CONJ2 他/S 不/ADV 是/V 有名/O 的 人 。', "We should respect his privacy — besides, he isn't famous."],
      ['你/S 别/ADV 争论/V 了/SF ， *况且*/CONJ2 大家/S 已经/ADV 有/V 一致/O 的 看法 了 。', 'Stop arguing — besides, everyone already agrees.'],
      ['这/S 个 网站 信息 很 多 ， *况且*/CONJ2 都/ADV 很/ADV 可靠/V 。', "This website has lots of information, and it's all reliable."],
      ['他/S 不/ADV 会/MOD 来/V 的/SF ， *况且*/CONJ2 也/ADV 没有/V 人/O 邀请 他 。', "He won't come — and anyway, nobody invited him."],
      ['这/S 篇 文章 太/ADV 长/V ， *况且*/CONJ2 读者/S 也/ADV 没有/V 时间/O 。', "This article is too long, and readers don't have the time anyway."],
    ],
    cloze: {
      blank: ['况且'],
      distractors: [
        ['所以', 'LEX.NEAR_SYNONYM', '所以 gives a result; 况且 adds a further reason.'],
        ['可是', 'LEX.NEAR_SYNONYM', '可是 contrasts; 况且 adds.'],
      ],
    },
  },
];
