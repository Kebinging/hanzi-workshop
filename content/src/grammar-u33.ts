import type { PatternSource } from './authoring';

// HSK 5 · Unit 9 (unit 33) · 教育学习 Education — Correlatives II (provisional).

export const patternsU33: PatternSource[] = [
  {
    id: 'G5-49', unit: 33, title: '不但不 … 反而 … (not only not … but instead …)', titleZh: '不但不…反而…',
    summary: 'The expected result did not happen — the opposite did.',
    explanationMd: `
**Form:** Subject + **不但不 / 不但没** + expected result，(Subject) + **反而** + opposite result.

他不但不生气，反而笑了 — "far from getting angry, he laughed".

- Compare 不但…而且 (G3-82), which adds a second point in the same direction. Here the second clause goes *against* expectations.
- 反而 sits after the subject of the second clause.`,
    formula: ['S', 'CONJ1', 'ADV', 'V', 'P', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '不但', b: '反而', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G3-82'],
    contrasts: ['G3-82', 'G5-54'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S *不但*/CONJ1 不/ADV 生气/V ， *反而*/ADV 笑/V 了/SF 。', 'Far from getting angry, he laughed.'],
      ['补习/S *不但*/CONJ1 没有/ADV 帮助/V 他/O ， *反而*/ADV 让/V 他/O 更 累 了 。', "The extra lessons didn't help him — they just made him more tired."],
      ['老师/S 批评/V 了/ASP 他/O ， 他/S *不但*/CONJ1 不/ADV 难过/V ， *反而*/ADV 更/ADV 努力/V 了/SF 。', "The teacher criticised him; instead of being upset, he worked harder."],
    ],
    instances: [
      ['他/S 的 病 *不但*/CONJ1 没/ADV 好/V ， *反而*/ADV 更/ADV 严重/V 了/SF 。', 'His illness, far from improving, got worse.'],
      ['背诵/S 太 多 *不但*/CONJ1 不/ADV 能/MOD 提高/V 思维/O ， *反而*/ADV 让/V 学生/O 很 被动 。', "Too much recitation doesn't improve thinking — it makes students passive."],
      ['孩子/S *不但*/CONJ1 不/ADV 喜欢/V 家教/O ， *反而*/ADV 更/ADV 不/ADV 想/MOD 学习/V 了/SF 。', "The child didn't like the tutor; if anything, they wanted to study even less."],
      ['分数/S *不但*/CONJ1 没/ADV 提高/V ， *反而*/ADV 下降/V 了/SF 。', 'Far from rising, the marks went down.'],
      ['他/S 去/V 了/ASP 补习/O ， 成绩/S *不但*/CONJ1 没/ADV 好/V ， *反而*/ADV 更/ADV 差/V 了/SF 。', "He took extra lessons, but his results got worse, not better."],
      ['我/S 提问/V 以后 ， 他/S *不但*/CONJ1 不/ADV 讲解/V ， *反而*/ADV 批评/V 了/ASP 我/O 。', 'When I asked a question, instead of explaining he criticised me.'],
      ['这/S 次 测验 *不但*/CONJ1 不/ADV 难/V ， *反而*/ADV 很/ADV 简单/V 。', 'This quiz was not hard at all — it was easy.'],
      ['他/S 考 了 满分 ， *不但*/CONJ1 不/ADV 骄傲/V ， *反而*/ADV 更/ADV 谦虚/V 了/SF 。', 'He got full marks, and instead of being proud he became even more modest.'],
      ['天气/S *不但*/CONJ1 没有/ADV 变/V 好/C ， *反而*/ADV 更/ADV 冷/V 了/SF 。', "The weather didn't improve; it got colder."],
      ['学费/S *不但*/CONJ1 没/ADV 降低/V ， *反而*/ADV 更/ADV 贵/V 了/SF 。', "Tuition didn't go down — it went up."],
      ['他/S *不但*/CONJ1 不/ADV 感谢/V 导师/O ， *反而*/ADV 说/V 导师/O 不 公平 。', "Instead of thanking his supervisor, he said the supervisor was unfair."],
      ['休息/S 太 多 *不但*/CONJ1 不/ADV 能/MOD 让/V 人/O 轻松 ， *反而*/ADV 会/MOD 让/V 人/O 更 累 。', "Too much rest doesn't relax you — it makes you more tired."],
      ['她/S *不但*/CONJ1 没/ADV 放弃/V ， *反而*/ADV 开始/V 自学/V 了/SF 。', "She didn't give up — she started teaching herself."],
      ['这样/S 做 *不但*/CONJ1 不/ADV 公平/V ， *反而*/ADV 会/MOD 让/V 学生/O 更 被动 。', "Doing it this way isn't fair, and it will make students more passive."],
      ['我/S 说/V 了/ASP 对不起/O ， 他/S *不但*/CONJ1 没/ADV 原谅/V 我/O ， *反而*/ADV 更/ADV 生气/V 了/SF 。', "I said sorry, but instead of forgiving me he got angrier."],
    ],
    cloze: {
      blank: ['反而'],
      distractors: [
        ['而且', 'CONJ.PAIR_MISMATCH', '不但…而且 adds a point in the same direction; after 不但不 the result goes the other way → 反而.'],
        ['于是', 'LEX.NEAR_SYNONYM', '于是 = so, and then.'],
      ],
    },
  },
  {
    id: 'G5-50', unit: 33, title: '与其说 A，不如说 B (it is less A than B)', titleZh: '与其说…不如说…',
    summary: 'Corrects a description: B is the more accurate way to put it.',
    explanationMd: `
**Form:** **与其说** A，**不如说** B.

与其说他聪明，不如说他努力 — "it's not so much that he's clever as that he works hard".

- A builds on 与其 A，不如 B (G4-13), but compares two *descriptions*, not two actions.
- Both halves keep 说.`,
    formula: ['CONJ1', 'V', 'O', 'P', 'CONJ2', 'V', 'O'],
    constraints: [{ kind: 'pair', a: '与其', b: '不如', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G4-13'],
    contrasts: ['G4-13'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['*与其*/CONJ1 说/V 他/O 聪明 ， *不如*/CONJ2 说/V 他/O 努力 。', "It's not so much that he's clever as that he works hard."],
      ['*与其*/CONJ1 说/V 这/O 是 天赋 ， *不如*/CONJ2 说/V 这/O 是 练习 的 结果 。', "It's less a gift than the result of practice."],
      ['*与其*/CONJ1 说/V 他/O 在 学习 ， *不如*/CONJ2 说/V 他/O 在 玩 。', "He's playing rather than studying."],
    ],
    instances: [
      ['*与其*/CONJ1 说/V 她/O 是 老师 ， *不如*/CONJ2 说/V 她/O 是 朋友 。', "She's more a friend than a teacher."],
      ['*与其*/CONJ1 说/V 这/O 是 考试 ， *不如*/CONJ2 说/V 这/O 是 一 次 练习 。', "This is less an exam than a practice."],
      ['*与其*/CONJ1 说/V 他/O 不 会 ， *不如*/CONJ2 说/V 他/O 不 想 学 。', "It's not that he can't — he doesn't want to learn."],
      ['*与其*/CONJ1 说/V 分数/O 重要 ， *不如*/CONJ2 说/V 思维/O 重要 。', 'What matters is less the marks than the thinking.'],
      ['*与其*/CONJ1 说/V 这/O 是 学问 ， *不如*/CONJ2 说/V 这/O 是 常识 。', "This is less scholarship than common sense."],
      ['*与其*/CONJ1 说/V 他/O 有 天赋 ， *不如*/CONJ2 说/V 他/O 很 自觉 。', "It's not so much talent as self-discipline."],
      ['*与其*/CONJ1 说/V 这/O 是 学校 ， *不如*/CONJ2 说/V 这/O 是 一 个 大 家庭 。', "It's more a big family than a school."],
      ['*与其*/CONJ1 说/V 她/O 在 背诵 ， *不如*/CONJ2 说/V 她/O 在 思考 。', "She's thinking rather than reciting."],
      ['*与其*/CONJ1 说/V 这/O 是 问题 ， *不如*/CONJ2 说/V 这/O 是 机会 。', "It's less a problem than an opportunity."],
      ['*与其*/CONJ1 说/V 他/O 失败 了 ， *不如*/CONJ2 说/V 他/O 学 到 了 很 多 。', "It's not so much that he failed as that he learned a lot."],
      ['*与其*/CONJ1 说/V 导师/O 在 讲解 ， *不如*/CONJ2 说/V 他/O 在 示范 。', 'The supervisor is demonstrating rather than explaining.'],
      ['*与其*/CONJ1 说/V 学生/O 在 学习 ， *不如*/CONJ2 说/V 他们/O 在 准备 考试 。', "The students are preparing for exams rather than learning."],
      ['*与其*/CONJ1 说/V 他/O 聪明 ， *不如*/CONJ2 说/V 他/O 逻辑 好 。', "It's less that he's clever than that his logic is good."],
      ['*与其*/CONJ1 说/V 这/O 是 运气 ， *不如*/CONJ2 说/V 这/O 是 努力 的 结果 。', "This is less luck than the result of hard work."],
      ['*与其*/CONJ1 说/V 这/O 是 竞赛 ， *不如*/CONJ2 说/V 这/O 是 一 个 活动 。', "It's more an event than a competition."],
    ],
    cloze: {
      blank: ['不如'],
      distractors: [
        ['而且', 'CONJ.PAIR_MISMATCH', '与其说 pairs with 不如说.'],
        ['所以', 'CONJ.PAIR_MISMATCH', '所以 gives a result; 与其说 pairs with 不如说.'],
      ],
    },
  },
  {
    id: 'G5-51', unit: 33, title: '宁愿 … 也不 / 也要 … (would rather)', titleZh: '宁愿…也不／也要…',
    summary: 'Choose a costly option (宁愿 A) to avoid B (也不 B) or to achieve B (也要 B).',
    explanationMd: `
**Form:** Subject + **宁愿** + A，**也不** + B · or **宁愿** A，**也要** B.

我宁愿自学，也不去补习 — "I'd rather teach myself than go to cram classes".

- The same as 宁可 (G4-14); 宁愿 sounds a little more personal and emotional.
- A is usually something unpleasant you accept.`,
    formula: ['S', 'ADV', 'V', 'P', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '宁愿', b: '也', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G4-14'],
    contrasts: ['G4-14'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S *宁愿*/ADV 自学/V ， *也*/ADV 不/ADV 去/V 补习/O 。', "I'd rather teach myself than go to extra lessons."],
      ['他/S *宁愿*/ADV 少/ADV 睡觉/V ， *也*/ADV 要/MOD 写/V 完/C 论文/O 。', "He'd rather sleep less than not finish his thesis."],
      ['她/S *宁愿*/ADV 走/V 路/O ， *也*/ADV 不/ADV 坐/V 公交/O 。', "She'd rather walk than take the bus."],
    ],
    instances: [
      ['我/S *宁愿*/ADV 晚/ADV 一点儿 毕业/V ， *也*/ADV 不/ADV 想/MOD 放弃/V 这/O 个 学位 。', "I'd rather graduate later than give up this degree."],
      ['他/S *宁愿*/ADV 在/PP 阅览室 看/V 书/O ， *也*/ADV 不/ADV 去/V 玩/V 。', "He'd rather read in the reading room than go out."],
      ['她/S *宁愿*/ADV 多/ADV 花/V 学费/O ， *也*/ADV 要/MOD 上/V 好/O 学校 。', "She'd rather pay more fees to go to a good school."],
      ['我/S *宁愿*/ADV 吃/V 食堂/O ， *也*/ADV 不/ADV 想/MOD 做/V 饭/O 。', "I'd rather eat in the canteen than cook."],
      ['孩子/S *宁愿*/ADV 在/PP 操场 上 跑/V ， *也*/ADV 不/ADV 想/MOD 在/PP 教室 里 坐/V 着/ASP 。', "The children would rather run on the sports ground than sit in the classroom."],
      ['他/S *宁愿*/ADV 住/V 宿舍/O ， *也*/ADV 不/ADV 想/MOD 回/V 家/O 。', "He'd rather live in the dorm than go home."],
      ['我/S *宁愿*/ADV 考/V 得/C 低 一点儿 ， *也*/ADV 不/ADV 做/V 不/O 公平 的 事情 。', "I'd rather get a lower mark than do something unfair."],
      ['她/S *宁愿*/ADV 自己/ADV 思考/V ， *也*/ADV 不/ADV 想/MOD 背诵/V 答案/O 。', "She'd rather think for herself than memorise answers."],
      ['他/S *宁愿*/ADV 多/ADV 练习/V 几/C 遍 ， *也*/ADV 不/ADV 想/MOD 出/V 错/O 。', "He'd rather practise a few more times than make mistakes."],
      ['我/S *宁愿*/ADV 等/V 一/C 年 ， *也*/ADV 要/MOD 报考/V 这/O 个 学校 。', "I'd rather wait a year to apply to this school."],
      ['他/S *宁愿*/ADV 不/ADV 要/V 奖学金/O ， *也*/ADV 不/ADV 想/MOD 离开/V 家乡/O 。', "He'd rather give up the scholarship than leave home."],
      ['她/S *宁愿*/ADV 当/V 教师/O ， *也*/ADV 不/ADV 想/MOD 去/V 公司/O 。', "She'd rather be a teacher than work for a company."],
      ['我/S *宁愿*/ADV 站/V 着/ASP ， *也*/ADV 不/ADV 坐/V 那儿/O 。', "I'd rather stand than sit there."],
      ['他/S *宁愿*/ADV 自学/V ， *也*/ADV 不/ADV 请/V 家教/O 。', "He'd rather teach himself than hire a tutor."],
      ['学生/S *宁愿*/ADV 多/ADV 做/V 测验/O ， *也*/ADV 不/ADV 想/MOD 有/V 大/O 考试 。', "Students would rather do more quizzes than have a big exam."],
    ],
    cloze: {
      blank: ['宁愿'],
      distractors: [
        ['难道', 'LEX.NEAR_SYNONYM', '难道 starts a rhetorical question.'],
        ['何必', 'LEX.NEAR_SYNONYM', '何必 = there is no need.'],
      ],
    },
  },
  {
    id: 'G5-52', unit: 33, title: '要么 A，要么 B (either A or B)', titleZh: '要么…要么…',
    summary: 'Two options and nothing else: you must pick one.',
    explanationMd: `
**Form:** **要么** A，**要么** B.

你要么自学，要么请家教 — "either teach yourself or get a tutor".

- Close to 不是 A，就是 B (G4-60), but 要么 offers a *choice*; 不是…就是 states a fact ("it's always one or the other").
- Each 要么 goes right before its option.`,
    formula: ['S', 'CONJ1', 'V', 'P', 'CONJ2', 'V'],
    constraints: [],
    requires: ['G3-80'],
    contrasts: ['G4-60'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['*要么*/CONJ1 你/S 来/V ， *要么*/CONJ2 我/S 去/V 。', 'Either you come, or I go.'],
      ['你/S *要么*/CONJ1 自学/V ， *要么*/CONJ2 请/V 家教/O 。', 'Either teach yourself or get a tutor.'],
      ['周末/T 我/S *要么*/CONJ1 在/PP 宿舍 看/V 书/O ， *要么*/CONJ2 去/V 操场/O 跑步 。', 'At weekends I either read in the dorm or go running on the sports ground.'],
    ],
    instances: [
      ['*要么*/CONJ1 考/V 本科/O ， *要么*/CONJ2 去/V 工作/O 。', 'Either go to university or get a job.'],
      ['午饭/T 我/S *要么*/CONJ1 在/PP 食堂 吃/V ， *要么*/CONJ2 不/ADV 吃/V 。', 'For lunch I either eat in the canteen or skip it.'],
      ['你/S *要么*/CONJ1 现在/T 交/V 论文/O ， *要么*/CONJ2 明天/T 交/V 。', 'Either hand in your paper now or tomorrow.'],
      ['*要么*/CONJ1 参加/V 竞赛/O ， *要么*/CONJ2 参加/V 社团/O 。', 'Either enter the competition or join a club.'],
      ['他/S *要么*/CONJ1 在/PP 实验室 ， *要么*/CONJ2 在/PP 宿舍 。', "He's either in the lab or in the dorm."],
      ['*要么*/CONJ1 你/S 自己/ADV 思考/V ， *要么*/CONJ2 你/S 去/V 问/V 导师/O 。', 'Either think it through yourself or ask your supervisor.'],
      ['学生/S *要么*/CONJ1 住/V 宿舍/O ， *要么*/CONJ2 自己/ADV 租房/V 。', 'Students either live in the dorms or rent their own place.'],
      ['*要么*/CONJ1 我们/S 今天/T 做/V 完/C ， *要么*/CONJ2 明天/T 再/ADV 做/V 。', "Either we finish today, or we do it tomorrow."],
      ['你/S *要么*/CONJ1 去/V 补习/V ， *要么*/CONJ2 在/PP 家 自学/V 。', 'Either go to extra lessons or study at home on your own.'],
      ['*要么*/CONJ1 拿/V 满分/O ， *要么*/CONJ2 不/ADV 参加/V 。', 'Either get full marks or don’t take part.'],
      ['老师/S *要么*/CONJ1 讲解/V ， *要么*/CONJ2 示范/V 。', 'The teacher either explains or demonstrates.'],
      ['他/S 周末/T *要么*/CONJ1 看/V 书/O ， *要么*/CONJ2 睡觉/V 。', 'At weekends he either reads or sleeps.'],
      ['*要么*/CONJ1 你/S 说/V 中文/O ， *要么*/CONJ2 你/S 写/V 汉字/O 。', 'Either speak Chinese or write characters.'],
      ['这/S 个 问题 *要么*/CONJ1 是/V 你/O 错 了 ， *要么*/CONJ2 是/V 我/O 错 了 。', "Either you're wrong about this or I am."],
      ['你/S *要么*/CONJ1 选/V 这/O 个 学科 ， *要么*/CONJ2 选/V 那/O 个 。', 'Pick either this subject or that one.'],
    ],
  },
  {
    id: 'G5-53', unit: 33, title: '并非 (is by no means)', titleZh: '并非',
    summary: '并非 = 并不是: a formal, firm denial of a common assumption.',
    explanationMd: `
**Form:** Subject + **并非** + noun / clause.

分数并非一切 — "marks are by no means everything".

- The written partner of 并 + 不 / 没 (G4-04): 并非 = 并不是.
- Often corrects what people tend to believe.`,
    formula: ['S', 'V', 'O'],
    constraints: [],
    requires: ['G4-04'],
    contrasts: ['G4-04'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['分数/S *并非*/V 一切/O 。', 'Marks are by no means everything.'],
      ['学历/S 高 的 人 *并非*/ADV 都/ADV 有/V 能力/O 。', 'People with a good education are by no means all capable.'],
      ['这/S *并非*/V 他/O 一 个 人 的 错 。', "This is by no means his fault alone."],
    ],
    instances: [
      ['天赋/S *并非*/V 最/O 重要 的 。', 'Talent is not the most important thing.'],
      ['学习/S *并非*/ADV 只@zhi3 是/V 背诵/O 。', 'Learning is by no means just reciting.'],
      ['他/S 说 的 *并非*/V 事实/O 。', 'What he said is not the truth.'],
      ['考试/S *并非*/V 学习/O 的 目的 。', 'Exams are not the purpose of learning.'],
      ['这/S 个 结果 *并非*/V 偶然/O 。', 'This result is by no means chance.'],
      ['成功/S *并非*/V 容易/O 的 事情 。', 'Success is no easy thing.'],
      ['好/S 学校 *并非*/ADV 只@zhi3/ADV 看/V 分数/O 。', 'Good schools by no means look only at marks.'],
      ['有/S 文凭 *并非*/ADV 就/ADV 有/V 学问/O 。', 'Having a diploma does not mean having learning.'],
      ['他/S 的 话 *并非*/ADV 没有/V 道理/O 。', 'What he says is not without reason.'],
      ['这/S 次 失败 *并非*/V 坏/O 事情 。', 'This failure is not a bad thing.'],
      ['教师/S *并非*/ADV 都/ADV 是/V 专家/O 。', 'Teachers are by no means all experts.'],
      ['补习/S *并非*/ADV 对/PP 每 个 学生 都 有/V 帮助/O 。', 'Extra lessons do not help every student.'],
      ['聪明/S *并非*/ADV 一定/ADV 会/MOD 成功/V 。', 'Being clever does not guarantee success.'],
      ['我/S *并非*/ADV 不/ADV 想/MOD 去/V ， 只@zhi3/ADV 是/V 没有/O 时间 。', "It's not that I don't want to go — I just don't have time."],
      ['这/S 次 测验 *并非*/ADV 那么/ADV 难/V 。', "This quiz isn't really that hard."],
    ],
    cloze: {
      blank: ['并非'],
      distractors: [
        ['并且', 'LEX.NEAR_SYNONYM', '并且 = and also; the denial is 并非.'],
        ['而且', 'LEX.NEAR_SYNONYM', '而且 = moreover.'],
      ],
    },
  },
  {
    id: 'G5-54', unit: 33, title: '不仅 … 还 / 也 … (not only … but also)', titleZh: '不仅…还／也…',
    summary: 'A more formal 不但…而且: add a second, often bigger, point.',
    explanationMd: `
**Form:** Subject + **不仅** + A，(Subject) + **还 / 也 / 而且** + B.

她不仅拿了满分，还获得了奖学金 — "not only did she get full marks, she also won a scholarship".

- Means the same as 不但…而且 (G3-82) but is more formal.
- With one subject, put 不仅 after it; with two different subjects, put 不仅 first.`,
    formula: ['S', 'CONJ1', 'V', 'O', 'P', 'ADV', 'V', 'O'],
    constraints: [{ kind: 'pair', a: '不仅', b: '还', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G3-82'],
    contrasts: ['G3-82', 'G5-49'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'CONJ.SUBJECT_POSITION'],
    examples: [
      ['他/S *不仅*/CONJ1 会/MOD 说/V 中文/O ， *还*/ADV 会/MOD 写/V 汉字/O 。', 'He can not only speak Chinese but also write characters.'],
      ['这/S 个 学校 *不仅*/CONJ1 有/V 宿舍/O ， *还*/ADV 有/V 食堂/O 。', 'This school has not only dorms but a canteen too.'],
      ['老师/S *不仅*/CONJ1 讲解/V 了/ASP 原理/O ， *还*/ADV 做/V 了/ASP 示范/O 。', 'The teacher not only explained the principle but also demonstrated it.'],
    ],
    instances: [
      ['她/S *不仅*/CONJ1 拿/V 了/ASP 满分/O ， *还*/ADV 获得/V 了/ASP 奖学金/O 。', 'Not only did she get full marks, she also won a scholarship.'],
      ['导师/S *不仅*/CONJ1 指导/V 我/O 写 论文 ， *还*/ADV 帮/V 我/O 找 工作 。', 'My supervisor not only guides my thesis but also helps me find work.'],
      ['这/S 个 社团 *不仅*/CONJ1 有意思/V ， *还*/ADV 能/MOD 交/V 朋友/O 。', 'This club is not only fun — you can make friends too.'],
      ['他/S *不仅*/CONJ1 有/V 学位/O ， *还*/ADV 有/V 很/O 多 经验 。', 'He has not only a degree but plenty of experience.'],
      ['学习/S *不仅*/CONJ1 要/MOD 背诵/V ， *还*/ADV 要/MOD 思考/V 。', 'Learning needs not only memorising but thinking.'],
      ['老师/S *不仅*/CONJ1 批改/V 了/ASP 作业/O ， *还*/ADV 写/V 了/ASP 很/O 多 意见 。', 'The teacher not only marked the homework but wrote lots of comments.'],
      ['校园/S *不仅*/CONJ1 很/ADV 大/V ， *还*/ADV 很/ADV 漂亮/V 。', 'The campus is not only big but beautiful.'],
      ['这/S 本 教材 *不仅*/CONJ1 有/V 课文/O ， *还*/ADV 有/V 很/O 多 练习 。', 'This textbook has not only texts but lots of exercises.'],
      ['他/S *不仅*/CONJ1 自学/V 了/ASP 中文/O ， *还*/ADV 考/V 上/C 了 本科/O 。', 'He not only taught himself Chinese but got into university.'],
      ['素质/S 教育 *不仅*/CONJ1 重视/V 学问/O ， *还*/ADV 重视/V 品德/O 。', 'Well-rounded education values not only knowledge but character.'],
      ['她/S *不仅*/CONJ1 当/V 家教/O ， *还*/ADV 在/PP 食堂 工作/V 。', "She's not only a private tutor — she also works in the canteen."],
      ['这/S 个 竞赛 *不仅*/CONJ1 有/V 奖励/O ， *还*/ADV 能/MOD 提高/V 排名/O 。', 'This competition offers not only prizes but a better ranking.'],
      ['他/S *不仅*/CONJ1 很/ADV 聪明/V ， *还*/ADV 很/ADV 自觉/V 。', "He's not only clever but self-motivated."],
      ['我们/S *不仅*/CONJ1 要/MOD 学/V 知识/O ， *还*/ADV 要/MOD 学/V 做/O 人 。', 'We must learn not only knowledge but how to be good people.'],
      ['学费/S *不仅*/CONJ1 没有/ADV 降低/V ， *还*/ADV 更/ADV 高/V 了/SF 。', "Tuition not only didn't fall — it went up."],
    ],
    cloze: {
      blank: ['不仅'],
      distractors: [
        ['虽然', 'CONJ.PAIR_MISMATCH', '虽然 pairs with 但是 / 可是, not 还.'],
        ['因为', 'CONJ.PAIR_MISMATCH', '因为 gives a reason.'],
      ],
    },
  },
];
