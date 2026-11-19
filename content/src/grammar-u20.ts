import type { PatternSource } from './authoring';

// HSK 4 · Unit 8 (unit 20) · 心情 Feelings — Modal stance (provisional).

const ADV_POS = { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' } as const;

export const patternsU20: PatternSource[] = [
  {
    id: 'G4-43', unit: 20, title: '嘛 (it\'s obvious; come on)', titleZh: '语气词“嘛”',
    summary: '嘛 at the end of a clause presents the point as obvious, or softens a suggestion.',
    explanationMd: `
**Form:** statement / suggestion + **嘛**.

- **Obvious reason**: 他是孩子嘛，别生气了 — "he's a child, after all — don't be cross".
- **Gentle push**: 你别着急嘛 / 有问题就问嘛 — "come on, don't panic / just ask".

嘛 is spoken and friendly. Don't mix it up with **吗** (yes/no question) or **吧** (suggestion, guess).`,
    formula: ['S', 'V', 'SF'],
    constraints: [],
    requires: ['G3-05'],
    errorCodes: ['LEX.MEANING'],
    examples: [
      ['他/S 是/V 孩子/O *嘛*/SF ， 别/ADV 生气/V 了/SF 。', "He's only a child — don't be cross."],
      ['有/V 问题/O 就/ADV 问/V *嘛*/SF 。', 'If you have a question, just ask.'],
      ['你/S 别/ADV 着急/V *嘛*/SF 。', "Come on, don't panic."],
    ],
    instances: [
      ['这/S 是/V 我/O 的 错 *嘛*/SF ， 我/S 道歉/V 。', "It's my fault, obviously — I apologise."],
      ['累/V 了/SF 就/ADV 休息/V *嘛*/SF 。', "If you're tired, just rest."],
      ['他/S 第一 次 来/V *嘛*/SF ， 不/ADV 熟悉/V 很/ADV 正常/V 。', "It's his first time here, so of course he doesn't know his way around."],
      ['你/S 说/V 得/C 对 *嘛*/SF 。', "Well, you're right."],
      ['想/V 去/V 就/ADV 去/V *嘛*/SF ！', 'If you want to go, just go!'],
      ['我/S 早/ADV 就/ADV 说/V 过/ASP *嘛*/SF 。', 'I told you so.'],
      ['别/ADV 难过/V 了/SF ， 下/T 次 再/ADV 努力/V *嘛*/SF 。', "Don't be upset — just try harder next time."],
      ['你/S 笑/V 一下/C *嘛*/SF 。', 'Go on, give us a smile.'],
      ['这么/ADV 晚/V 了/SF ， 他/S 当然/ADV 困/V *嘛*/SF 。', "It's so late, of course he's sleepy."],
      ['我们/S 是/V 朋友/O *嘛*/SF ， 不用/MOD 客气/V 。', "We're friends — no need to be polite."],
      ['天气/S 好/V *嘛*/SF ， 大家/S 都/ADV 出来/V 了/SF 。', "The weather's nice, so everyone's out."],
      ['你/S 不/ADV 喜欢/V 就/ADV 别/ADV 吃/V *嘛*/SF 。', "If you don't like it, don't eat it."],
      ['他/S 是/V 老师/O *嘛*/SF ， 当然/ADV 有/V 耐心/O 。', "He's a teacher, so naturally he's patient."],
      ['慢慢@man=màn_màn/ADV 来/V *嘛*/SF 。', 'Take it easy.'],
      ['人/S 都/ADV 会/MOD 有/V 烦恼/O 的/SF *嘛*/SF 。', 'Everyone has their worries, after all.'],
    ],
    cloze: {
      blank: ['嘛'],
      distractors: [
        ['吗', 'LEX.MEANING', '吗 turns the sentence into a yes/no question; 嘛 presents the point as obvious.'],
        ['呢', 'LEX.MEANING', '呢 asks "what about …?" or marks something ongoing; 嘛 says "obviously".'],
      ],
    },
  },
  {
    id: 'G4-44', unit: 20, title: '不得不 (have no choice but to)', titleZh: '不得不',
    summary: '不得不 + V: circumstances force the subject to do something it would rather not.',
    explanationMd: `
**Form:** (reason)，Subject + **不得不** + V.

下雨了，我们不得不回家 — "it started raining, so we had to go home".

- Stronger and more reluctant than 得 (děi) / 必须: there's no other way.
- Like 只好 (G4 Unit 3), but 不得不 stresses the pressure; 只好 the lack of options.
- Goes after the subject, before the verb.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G3-56'],
    contrasts: ['G3-56'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['下雨/V 了/SF ， 我们/S *不得不*/ADV 回/V 家/O 。', 'It started raining, so we had to go home.'],
      ['他/S 生病/V 了/SF ， *不得不*/ADV 请假/V 。', 'He fell ill and had to take time off.'],
      ['为了/PP 赶 飞机 ， 我/S *不得不*/ADV 早/ADV 起床/V 。', 'I had to get up early to catch the plane.'],
    ],
    instances: [
      ['没有/V 钱/O 了/SF ， 他/S *不得不*/ADV 找/V 工作/O 。', 'He ran out of money and had to find a job.'],
      ['我/S *不得不*/ADV 说/V ， 你/S 是/V 对/O 的 。', "I have to admit you're right."],
      ['车/S 坏/V 了/SF ， 我们/S *不得不*/ADV 走/V 回去/C 。', 'The car broke down, so we had to walk back.'],
      ['她/S *不得不*/ADV 放弃/V 这/O 个 机会 。', 'She had to give up this chance.'],
      ['房租/S 太/ADV 贵/V 了/SF ， 他/S *不得不*/ADV 搬/V 走/C 。', 'The rent was too high, so he had to move out.'],
      ['为了/PP 健康 ， 爸爸/S *不得不*/ADV 少/ADV 吃/V 肉/O 。', "For his health, Dad has had to cut down on meat."],
      ['电梯/S 坏/V 了/SF ， 大家/S *不得不*/ADV 走/V 楼梯/O 。', 'The lift broke, so everyone had to take the stairs.'],
      ['我/S *不得不*/ADV 拒绝/V 他/O 的 邀请 。', 'I had to turn down his invitation.'],
      ['任务/S 太/ADV 多/V 了/SF ， 我/S *不得不*/ADV 加班/V 。', 'There was too much work, so I had to stay late.'],
      ['她/S *不得不*/ADV 一 个 人 照顾/V 孩子/O 。', 'She has to look after the child on her own.'],
      ['因为/CONJ1 堵车/V ， 我/S *不得不*/ADV 改/V 坐/V 地铁/O 。', 'Because of the traffic, I had to switch to the metro.'],
      ['他/S 太/ADV 粗心/V 了/SF ， 我/S *不得不*/ADV 再/ADV 检查/V 一/C 遍 。', "He's so careless that I had to check it again."],
      ['雨/S 太/ADV 大/V 了/SF ， 比赛/S *不得不*/ADV 推迟/V 。', 'The rain was so heavy the match had to be postponed.'],
      ['我/S *不得不*/ADV 跟/PP 他 道歉/V 。', 'I had no choice but to apologise to him.'],
      ['没有/V 办法/O ， 我们/S *不得不*/ADV 同意/V 。', 'There was no way round it — we had to agree.'],
    ],
    cloze: {
      blank: ['不得不'],
      distractors: [
        ['不必', 'LEX.NEAR_SYNONYM', '不必 = there is no need to; 不得不 = have no choice but to.'],
        ['不用', 'LEX.NEAR_SYNONYM', '不用 = no need to; the situation here forces the action.'],
      ],
    },
  },
  {
    id: 'G4-45', unit: 20, title: '非 … 不可 (simply must)', titleZh: '非…不可',
    summary: '非 + V + 不可: it absolutely must happen — or the speaker insists on it.',
    explanationMd: `
**Form:** Subject + **非** + verb phrase + **不可**.

这个电影我非看不可 — "I absolutely have to see this film". Literally "if not V, not OK".

- Both halves are needed: ✗ 我非看.
- It can express **necessity** (要学好汉语，非多练习不可) or **insistence** (她非要买那件衣服不可).`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [{ kind: 'pair', a: '非', b: '不可', code: 'CONJ.MISSING_PARTNER' }],
    requires: ['G3-56'],
    errorCodes: ['CONJ.MISSING_PARTNER'],
    examples: [
      ['这/TOP 个 电影 我/S *非*/ADV 看/V *不可*/SF 。', 'I absolutely have to see this film.'],
      ['你/S *非*/ADV 去/V *不可*/SF 吗/SF ？', 'Do you really have to go?'],
      ['要/MOD 学/V 好/C 汉语/O ， *非*/ADV 多/ADV 练习/V *不可*/SF 。', 'To get good at Chinese, you simply must practise a lot.'],
    ],
    instances: [
      ['他/S 生病/V 了/SF ， *非*/ADV 去/V 医院/O *不可*/SF 。', "He's ill — he has to go to hospital."],
      ['这/TOP 件 事情 *非*/ADV 你/S 来 做/V *不可*/SF 。', 'Only you can do this.'],
      ['我/S 今天/T *非*/ADV 把/BA 这 个 任务 完成/V *不可*/SF 。', "I've got to get this task done today."],
      ['你/S *非*/ADV 道歉/V *不可*/SF 。', 'You simply must apologise.'],
      ['这/TOP 次 比赛 我们/S *非*/ADV 赢/V *不可*/SF 。', 'We have to win this match.'],
      ['她/S *非*/ADV 要/MOD 买/V 那/O 件 衣服 *不可*/SF 。', 'She insists on buying that piece of clothing.'],
      ['要/MOD 有/V 好/O 身体 ， *非*/ADV 锻炼/V *不可*/SF 。', 'To stay healthy, you have to exercise.'],
      ['这么/TOP 重要 的 会议 ， 经理/S *非*/ADV 参加/V *不可*/SF 。', 'For a meeting this important, the manager has to attend.'],
      ['我/S *非*/ADV 弄/V 清楚/C 这/O 个 问题 *不可*/SF 。', "I'm going to get to the bottom of this."],
      ['他/S 的 脾气 *非*/ADV 改/V *不可*/SF 。', 'He really has to do something about his temper.'],
      ['孩子/S *非*/ADV 让/V 妈妈/O 陪/V *不可*/SF 。', 'The child insists on having Mum there.'],
      ['这/TOP 个 好 消息 ， 我/S *非*/ADV 告诉/V 你/O *不可*/SF 。', 'I just had to tell you this good news.'],
      ['你/S 的 牙齿 *非*/ADV 检查/V 一下/C *不可*/SF 。', 'You really must get your teeth checked.'],
      ['想/V 进/V 这/O 家 公司 ， *非*/ADV 有/V 经验/O *不可*/SF 。', 'To get into this company, you must have experience.'],
      ['这么/TOP 好 的 机会 ， 你/S *非*/ADV 去/V *不可*/SF 。', "With a chance this good, you've got to go."],
    ],
    decoys: [['不能', 'CONJ.MISSING_PARTNER', '非 pairs with 不可: 非…不可.']],
  },
  {
    id: 'G4-46', unit: 20, title: '难怪 (no wonder)', titleZh: '难怪',
    summary: '难怪 + what was puzzling: now that the reason is known, it makes sense.',
    explanationMd: `
**Form:** reason，**难怪** + what you noticed · or **难怪** + what you noticed，(原来) + reason.

他昨天加班到两点，难怪今天这么困 — "he worked till two last night — no wonder he's so sleepy today".

- 难怪 introduces the **effect** you had noticed; the other clause (often with **原来**) gives the explanation.
- It's the speaker's sudden understanding, so it's common in speech.`,
    formula: ['S', 'V', 'P', 'ADV', 'S', 'V'],
    constraints: [],
    requires: ['G3-83'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S 昨天/T 加班/V 到/C 两 点 ， *难怪*/ADV 今天/T 这么/ADV 困/V 。', "He worked till two last night — no wonder he's so sleepy today."],
      ['原来/ADV 她/S 生病/V 了/SF ， *难怪*/ADV 没/ADV 来/V 上课/O 。', "So she's ill — no wonder she didn't come to class."],
      ['*难怪*/ADV 你/S 这么/ADV 高兴/V ， 原来/ADV 考试/S 及格/V 了/SF 。', "No wonder you're so happy — you passed the exam."],
    ],
    instances: [
      ['他/S 每/T 天 都/ADV 锻炼/V ， *难怪*/ADV 身体/S 这么/ADV 好/V 。', "He exercises every day — no wonder he's so fit."],
      ['下雨/V 了/SF ， *难怪*/ADV 这么/ADV 冷/V 。', "It's raining — no wonder it's so cold."],
      ['*难怪*/ADV 他/S 不/ADV 高兴/V ， 原来/ADV 他/S 输/V 了/SF 。', "No wonder he's unhappy — he lost."],
      ['她/S 在/PP 中国 住/V 了/ASP 十/C 年 ， *难怪*/ADV 汉语/S 说/V 得/C 这么 好 。', 'She lived in China for ten years — no wonder her Chinese is so good.'],
      ['原来/ADV 你们/S 是/V 亲戚/O ， *难怪*/ADV 长@zhang3/V 得/C 这么 像 。', "So you're related — no wonder you look so alike."],
      ['他/S 没/ADV 吃/V 早饭/O ， *难怪*/ADV 这么/ADV 饿/V 。', "He skipped breakfast — no wonder he's so hungry."],
      ['*难怪*/ADV 他/S 这么/ADV 得意/V ， 他/S 拿/V 到/C 了/ASP 奖金/O 。', "No wonder he's so pleased with himself — he got a bonus."],
      ['你/S 一直/ADV 看/V 手机/O ， *难怪*/ADV 眼睛/S 不/ADV 舒服/V 。', "You're always on your phone — no wonder your eyes hurt."],
      ['原来/ADV 他/S 跟/PP 妻子 吵架/V 了/SF ， *难怪*/ADV 心情/S 不/ADV 好/V 。', "So he quarrelled with his wife — no wonder he's in a bad mood."],
      ['*难怪*/ADV 这么/ADV 安静/V ， 大家/S 都/ADV 出去/V 了/SF 。', "No wonder it's so quiet — everyone's gone out."],
      ['她/S 每/T 天 都/ADV 很/ADV 乐观/V ， *难怪*/ADV 大家/S 都/ADV 喜欢/V 她/O 。', "She's always cheerful — no wonder everyone likes her."],
      ['你/S 昨天/T 没/ADV 睡/V 好/C ， *难怪*/ADV 精神/S 不/ADV 好/V 。', "You slept badly last night — no wonder you've got no energy."],
      ['原来/ADV 是/V 你/O 做 的 菜 ， *难怪*/ADV 这么/ADV 好吃/V 。', 'So you cooked it — no wonder it tastes so good.'],
      ['他/S 是/V 运动员/O ， *难怪*/ADV 跑/V 得/C 这么 快 。', "He's an athlete — no wonder he's so fast."],
      ['*难怪*/ADV 你/S 不/ADV 认识/V 他/O ， 他/S 是/V 新/O 同事 。', "No wonder you don't know him — he's a new colleague."],
    ],
    cloze: {
      blank: ['难怪'],
      distractors: [
        ['幸亏', 'LEX.NEAR_SYNONYM', '幸亏 = luckily; 难怪 = no wonder (now I see why).'],
        ['何况', 'LEX.NEAR_SYNONYM', '何况 = let alone; it adds a stronger case rather than explaining one.'],
      ],
    },
  },
  {
    id: 'G4-47', unit: 20, title: '幸亏 / 好在 (luckily, fortunately)', titleZh: '“幸亏”“好在”',
    summary: '幸亏 / 好在 introduce the lucky circumstance that prevented something bad.',
    explanationMd: `
**Form:** **幸亏 / 好在** + lucky fact，(要不然 / 才) + what was avoided.

幸亏你提醒我，要不然我就忘了 — "luckily you reminded me, otherwise I'd have forgotten".

- 幸亏 is often followed by **要不然 / 否则** (what would have happened) or **才** (only thanks to this).
- 好在 is very similar but more neutral — "fortunately, at least": 下大雨了，好在我带了伞。
- They usually go at the start of their clause, before the subject.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [],
    requires: ['G4-11'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*幸亏*/ADV 你/S 提醒/V 我/O ， 要不然/CONJ2 我/S 就/ADV 忘/V 了/SF 。', "Luckily you reminded me, otherwise I'd have forgotten."],
      ['下/V 大 雨 了 ， *好在*/ADV 我/S 带/V 了/ASP 伞/O 。', "It's pouring, but fortunately I brought an umbrella."],
      ['*幸亏*/ADV 医生/S 来/V 得/C 及时 ， 他/S 没有/V 危险/O 。', 'Luckily the doctor came in time, so he is out of danger.'],
    ],
    instances: [
      ['*幸亏*/ADV 我们/S 早/ADV 出发/V 了/SF ， 要不然/CONJ2 就/ADV 迟到/V 了/SF 。', "Luckily we left early, or we'd have been late."],
      ['我/S 的 钱包 丢/V 了/SF ， *好在*/ADV 没有/V 多少/O 钱 。', 'I lost my wallet, but luckily there was not much money in it.'],
      ['*幸亏*/ADV 有/V 你/O 帮忙/V 。', "It's lucky you were here to help."],
      ['车/S 坏/V 了/SF ， *好在*/ADV 离/PP 家 不 远/V 。', "The car broke down, but fortunately we weren't far from home."],
      ['*幸亏*/ADV 他/S 会/MOD 说/V 汉语/O ， 我们/S 才/ADV 没/ADV 迷路/V 。', "Luckily he speaks Chinese, or we'd have got lost."],
      ['考试/S 很/ADV 难/V ， *好在*/ADV 我/S 复习/V 得/C 很 好 。', 'The exam was hard, but fortunately I had revised well.'],
      ['*幸亏*/ADV 我/S 买/V 了/ASP 票/O ， 现在/T 都/ADV 卖/V 完/C 了/SF 。', "Lucky I bought tickets — they've all sold out now."],
      ['他/S 受伤/V 了/SF ， *好在*/ADV 不/ADV 严重/V 。', "He's hurt, but luckily it isn't serious."],
      ['*幸亏*/ADV 你/S 没/ADV 去/V ， 那儿/S 发生/V 了/ASP 事故/O 。', "Good thing you didn't go — there was an accident there."],
      ['停电/V 了/SF ， *好在*/ADV 天/S 还/ADV 没/ADV 黑/V 。', "The power's gone, but luckily it isn't dark yet."],
      ['*幸亏*/ADV 他/S 很/ADV 冷静/V ， 大家/S 才/ADV 没/ADV 有/V 危险/O 。', 'Luckily he stayed calm, so nobody was in danger.'],
      ['我/S 忘/V 了/ASP 带/V 钥匙/O ， *好在*/ADV 妈妈/S 在/V 家/O 。', 'I forgot my keys, but luckily Mum was at home.'],
      ['*幸亏*/ADV 你/S 告诉/V 我/O ， 我/S 才/ADV 知道/V 。', "Good thing you told me — I'd never have known."],
      ['路/S 很/ADV 远/V ， *好在*/ADV 我们/S 有/V 车/O 。', "It's a long way, but luckily we have a car."],
      ['*幸亏*/ADV 运气/S 好/V ， 我们/S 找/V 到/C 了/ASP 酒店/O 。', 'Luckily we were in luck and found a hotel.'],
    ],
    cloze: {
      blank: ['幸亏', '好在'],
      distractors: [
        ['难怪', 'LEX.NEAR_SYNONYM', '难怪 = no wonder; 幸亏 / 好在 = luckily.'],
        ['竟然', 'LEX.NEAR_SYNONYM', '竟然 = surprisingly; a lucky circumstance is 幸亏 / 好在.'],
      ],
    },
  },
  {
    id: 'G4-48', unit: 20, title: '何况 (let alone; besides)', titleZh: '何况',
    summary: '何况 adds a stronger case: if even A is so, B certainly is — or adds one more reason.',
    explanationMd: `
**Two uses:**
- **let alone**: A 都 / 也 …，**何况** B (呢)？ — 这个问题老师都不会，何况我呢？ "Even the teacher can't do it, let alone me."
- **besides, moreover**: 你很聪明，何况又很努力 — adds a further, stronger reason.

In the first use the first clause has **都 / 也 / 连…都**, and the second often ends with **呢**.`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G3-72'],
    contrasts: ['G3-72'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['这/TOP 个 问题 老师/S 都/ADV 不/ADV 会/MOD ， *何况*/CONJ2 我/S 呢/SF ？', "Even the teacher can't do this, let alone me."],
      ['走/S 路 都/ADV 很/ADV 累/V ， *何况*/CONJ2 跑步/V 呢/SF ？', 'Walking is tiring enough, let alone running.'],
      ['北京/TOP 我/S 都/ADV 没/ADV 去/V 过/ASP ， *何况*/CONJ2 外国/O 呢/SF ？', "I haven't even been to Beijing, let alone abroad."],
    ],
    instances: [
      ['中文/TOP 他/S 都/ADV 说/V 不 好 ， *何况*/CONJ2 写/V 汉字/O 呢/SF ？', "He can't even speak Chinese well, let alone write characters."],
      ['我/S 一 个 人 都 搬/V 不 动 ， *何况*/CONJ2 你/S 呢/SF ？', "I can't move it on my own, let alone you."],
      ['平时/T 路/S 上 车 就 很 多 ， *何况*/CONJ2 是/V 周末/O 呢/SF ？', "There's lots of traffic even on weekdays, let alone at the weekend."],
      ['我/S 都/ADV 害怕/V ， *何况*/CONJ2 孩子/S 呢/SF ？', "Even I'm scared, let alone a child."],
      ['你/S 很/ADV 聪明/V ， *何况*/CONJ2 又/ADV 很/ADV 努力/V ， 一定/ADV 会/MOD 成功/V 的/SF 。', "You're clever, and hard-working too — you'll definitely succeed."],
      ['这/S 件 衣服 很/ADV 贵/V ， *何况*/CONJ2 我/S 也/ADV 不/ADV 喜欢/V 。', "That's expensive, and besides, I don't like it."],
      ['他/S 连/PP 自己 都 照顾/V 不 好 ， *何况*/CONJ2 别人/O 呢/SF ？', "He can't even look after himself, let alone anyone else."],
      ['晴/T 天 都 这么 冷 ， *何况*/CONJ2 下/V 雪 呢/SF ？', "It's this cold even on a sunny day, let alone when it snows."],
      ['这/TOP 件 事情 朋友 都 不 知道 ， *何况*/CONJ2 陌生/O 人 呢/SF ？', "Even friends don't know about this, let alone strangers."],
      ['时间/S 不/ADV 多/V 了/SF ， *何况*/CONJ2 我们/S 还/ADV 没/ADV 准备/V 好/C 。', "There isn't much time, and besides, we're not ready."],
      ['我/S 都/ADV 不/ADV 敢/MOD 去/V ， *何况*/CONJ2 胆小/O 的 他 呢/SF ？', "Even I don't dare go, let alone someone as timid as him."],
      ['这么/TOP 简单 的 题 他 都 做 错 了 ， *何况*/CONJ2 难/O 的 呢/SF ？', 'He got even the easy questions wrong, let alone the hard ones.'],
      ['房租/S 已经/ADV 很/ADV 贵/V 了/SF ， *何况*/CONJ2 还/ADV 要/MOD 吃/V 饭/O 呢/SF 。', "The rent's already high, and on top of that you have to eat."],
      ['我/S 一/T 天 都 等/V 不 了@liao3 ， *何况*/CONJ2 一/O 个 月 呢/SF ？', "I can't wait a single day, let alone a month."],
      ['他/S 很/ADV 忙/V ， *何况*/CONJ2 身体/S 也/ADV 不/ADV 好/V ， 你/S 就/ADV 别/ADV 让/V 他/O 来/V 了/SF 。', "He's busy, and he's not well either — don't make him come."],
    ],
    cloze: {
      blank: ['何况'],
      distractors: [
        ['所以', 'LEX.NEAR_SYNONYM', '所以 gives a result; 何况 adds an even stronger case ("let alone").'],
        ['于是', 'LEX.NEAR_SYNONYM', '于是 narrates what happened next.'],
      ],
    },
  },
];
