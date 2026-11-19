import type { PatternSource } from './authoring';

// HSK 4 · Unit 5 (unit 17) · 健康 Health — Degree & extent (provisional).

const ADV_POS = { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' } as const;

export const patternsU17: PatternSource[] = [
  {
    id: 'G4-25', unit: 17, title: 'Adj / V + 得 + clause (so … that …)', titleZh: '程度补语：…得 + 小句',
    summary: 'After 得, a whole clause can say how extreme the state was: 累得站不起来.',
    explanationMd: `
**Form:** Subject + Adj / V + **得** + clause (the result).

我累得站不起来 — "I'm so tired I can't stand up". The clause after 得 shows the *effect* of the state, which makes the degree vivid.

- The clause often has 都, a potential complement (站不起来, 说不出话来) or 了.
- Compare G3-25 (V得 + Adj): 跑得很快 describes how; here the clause describes the consequence.`,
    formula: ['S', 'V', 'C', 'C'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-25', 'G3-28'],
    errorCodes: ['COMP.PLACEMENT', 'COMP.DE_WRONG'],
    examples: [
      ['我/S 累/V *得*/C 站/C 不 起来 。', "I'm so tired I can't stand up."],
      ['他/S 疼/V *得*/C 说/C 不 出 话 来 。', 'It hurt so much he could not speak.'],
      ['她/S 高兴/V *得*/C 跳/C 了 起来 。', 'She was so happy she jumped up.'],
    ],
    instances: [
      ['我/S 困/V *得*/C 什么/C 都 不 想 做 。', "I'm so sleepy I don't want to do anything."],
      ['孩子/S 咳嗽/V *得*/C 晚上/C 都 没 睡 好 。', 'The child was coughing so much he slept badly.'],
      ['他/S 跑/V *得*/C 出/C 了 很 多 汗 。', 'He ran so hard he was dripping with sweat.'],
      ['我/S 的 肚子 疼/V *得*/C 不/C 能 上课 了 。', 'My stomach hurts so much I cannot go to class.'],
      ['她/S 紧张/V *得*/C 手/C 都 凉 了 。', 'She was so nervous her hands went cold.'],
      ['我/S 饿/V *得*/C 吃/C 了 三 碗 米饭 。', 'I was so hungry I ate three bowls of rice.'],
      ['他/S 难受/V *得*/C 一/C 天 没 吃 饭 。', 'He felt so unwell he did not eat all day.'],
      ['爷爷/S 笑/V *得*/C 说/C 不 出 话 来 。', 'Grandpa laughed so much he could not speak.'],
      ['我/S 的 腰 疼/V *得*/C 不/C 能 动 了 。', "My back hurts so much I can't move."],
      ['天气/S 热/V *得*/C 大家/C 都 不 想 出去 。', "It's so hot nobody wants to go out."],
      ['他/S 激动/V *得*/C 哭/C 了 。', 'He was so moved he cried.'],
      ['我/S 冷/V *得*/C 一直/C 咳嗽 。', "I'm so cold I can't stop coughing."],
      ['运动员/S 累/V *得*/C 躺/C 在 地上 。', 'The athlete was so tired he lay down on the ground.'],
      ['他/S 的 嗓子 疼/V *得*/C 说/C 不 了@liao3 话 。', 'His throat is so sore he cannot talk.'],
      ['她/S 忙/V *得*/C 连/C 饭 都 没 时间 吃 。', 'She is so busy she has no time even to eat.'],
    ],
    decoys: [['地', 'COMP.DE_WRONG', '地 links an adverbial to a verb; a result after the state needs 得.']],
    cloze: {
      blank: ['得'],
      distractors: [
        ['的', 'COMP.DE_WRONG', '的 links a modifier to a noun; a result clause after a verb or adjective needs 得.'],
        ['地', 'COMP.DE_WRONG', '地 goes before a verb, never after it.'],
      ],
    },
  },
  {
    id: 'G4-26', unit: 17, title: '稍微 + Adj / V + 一点儿 / 一下 (slightly)', titleZh: '稍微…一点儿',
    summary: '稍微 before the adjective or verb plays the amount down; it needs 一点儿, 一下 or 有点儿 to go with it.',
    explanationMd: `
**Form:** Subject + **稍微** + Adj + **一点儿** · **稍微** + V + **一下** · **稍微** + **有点儿** + Adj.

今天稍微冷一点儿 — "it's a touch colder today". 稍微 can't stand alone with a bare adjective: ✗ 今天稍微冷.

- With a change: 稍微大了一点儿 ("a bit too big").
- In requests: 你能稍微慢一点儿吗？`,
    formula: ['S', 'ADV', 'V', 'C'],
    constraints: [ADV_POS],
    requires: ['G3-23'],
    contrasts: ['G3-23'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.COLLOCATION'],
    examples: [
      ['今天/S *稍微*/ADV 冷/V 一点儿/C 。', "It's a touch colder today."],
      ['你/S 能/MOD *稍微*/ADV 慢/V 一点儿/C 吗/SF ？', 'Could you go a little slower?'],
      ['我/S *稍微*/ADV 休息/V 一下/C 就/ADV 好/V 了/SF 。', "I'll be fine after a short rest."],
    ],
    instances: [
      ['这/S 个 药 *稍微*/ADV 有点儿/ADV 苦/V 。', 'This medicine is slightly bitter.'],
      ['我/S 的 身体 *稍微*/ADV 好/V 一点儿/C 了/SF 。', "I'm feeling a little better."],
      ['你/S *稍微*/ADV 等/V 一下/C 。', 'Wait a moment.'],
      ['请/MOD 你/S *稍微*/ADV 说/V 慢/C 一点儿 。', 'Please speak a little more slowly.'],
      ['这/S 件 衣服 *稍微*/ADV 大/V 了/SF 一点儿/C 。', 'This is a little too big.'],
      ['温度/S *稍微*/ADV 高/V 一点儿/C 。', 'The temperature is slightly higher.'],
      ['你/S 应该/MOD *稍微*/ADV 多/ADV 吃/V 一点儿/C 。', 'You should eat a little more.'],
      ['他/S 今天/T *稍微*/ADV 有点儿/ADV 咳嗽/V 。', 'He has a slight cough today.'],
      ['请/MOD 把/BA 空调 *稍微*/ADV 开/V 小/C 一点儿 。', 'Please turn the air conditioning down a little.'],
      ['我/S 的 头 *稍微*/ADV 有点儿/ADV 痛/V 。', 'I have a slight headache.'],
      ['跑步/S 的 速度 *稍微*/ADV 慢/V 一点儿/C 。', 'Run a little more slowly.'],
      ['你/S 的 皮肤 *稍微*/ADV 黑/V 了/SF 一点儿/C 。', "You've got a little more tanned."],
      ['我/S *稍微*/ADV 胖/V 了/SF 一点儿/C 。', "I've put on a little weight."],
      ['他/S 的 精神 *稍微*/ADV 好/V 了/SF 一点儿/C 。', 'He has a bit more energy now.'],
      ['你/S *稍微*/ADV 注意/V 一下/C 营养/O 。', 'Pay a little attention to your nutrition.'],
    ],
    cloze: {
      blank: ['稍微'],
      distractors: [
        ['非常', 'LEX.COLLOCATION', '非常 can’t be followed by 一点儿 / 一下; "a little" is 稍微 … 一点儿.'],
        ['很', 'LEX.COLLOCATION', '很 doesn’t combine with 一点儿 / 一下 after the word.'],
      ],
    },
  },
  {
    id: 'G4-27', unit: 17, title: '尤其 (是) (especially)', titleZh: '“尤其”“尤其是”',
    summary: '尤其 singles out the strongest case of what was just said.',
    explanationMd: `
**Form:** general statement，**尤其是** + noun / clause · or Subject + **尤其** + verb phrase.

我喜欢运动，尤其是游泳 — "I like sport, especially swimming".

- 尤其是 + a noun or time picks out one member of a group.
- 尤其 + verb/adjective goes after the subject: 他尤其喜欢吃巧克力.
- 特别是 means the same and is a little more colloquial.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [ADV_POS],
    requires: ['G3-29'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S 喜欢/V 运动/O ， *尤其*/ADV 是/V 游泳/O 。', 'I like sport, especially swimming.'],
      ['这儿/S 的 冬天 很/ADV 冷/V ， *尤其*/ADV 是/V 晚上/O 。', 'Winters here are cold, especially at night.'],
      ['他/S *尤其*/ADV 喜欢/V 吃/V 巧克力/O 。', 'He especially loves chocolate.'],
    ],
    instances: [
      ['我/S 不/ADV 太/ADV 喜欢/V 吃/V 甜/O 的 ， *尤其*/ADV 是/V 巧克力/O 。', "I'm not keen on sweet things, especially chocolate."],
      ['抽烟/S 对 身体 不/ADV 好/V ， *尤其*/ADV 对/PP 嗓子 不/ADV 好/V 。', 'Smoking is bad for you, especially for your throat.'],
      ['最近/T 感冒/S 的 人 很/ADV 多/V ， *尤其*/ADV 是/V 孩子/O 。', 'Lots of people have colds at the moment, especially children.'],
      ['我/S 的 腰 很/ADV 痛/V ， *尤其*/ADV 是/V 早上/O 。', 'My back hurts, especially in the mornings.'],
      ['运动员/S *尤其*/ADV 需要/V 营养/O 。', 'Athletes especially need good nutrition.'],
      ['他/S 喜欢/V 很/O 多 运动 ， *尤其*/ADV 是/V 网球/O 。', 'He likes lots of sports, especially tennis.'],
      ['多/ADV 喝/V 水/O 很 重要 ， *尤其*/ADV 是/V 夏天/O 。', "Drinking lots of water matters, especially in summer."],
      ['这/S 种 病 对 孩子 *尤其*/ADV 危险/V 。', 'This illness is especially dangerous for children.'],
      ['我/S *尤其*/ADV 喜欢/V 乒乓球/O 。', 'I especially like table tennis.'],
      ['睡觉/S 很/ADV 重要/V ， *尤其*/ADV 是/V 考试/O 以前 。', 'Sleep matters, especially before an exam.'],
      ['他/S 每/T 天 都 很 累 ， *尤其*/ADV 是/V 星期/O 一 。', "He's tired every day, especially on Mondays."],
      ['蔬菜/S 很/ADV 有/V 营养/O ， *尤其*/ADV 是/V 西红柿/O 。', 'Vegetables are nutritious, especially tomatoes.'],
      ['我/S 的 胳膊 很/ADV 痛/V ， *尤其*/ADV 是/V 打/O 羽毛球 以后 。', 'My arm hurts, especially after badminton.'],
      ['你/S 要/MOD 多/ADV 休息/V ， *尤其*/ADV 要/MOD 早/ADV 一点儿 睡觉/V 。', 'You need more rest — above all, go to bed earlier.'],
      ['这儿/S 的 空气 很/ADV 好/V ， *尤其*/ADV 是/V 早上/O 。', 'The air here is good, especially in the morning.'],
    ],
    cloze: {
      blank: ['尤其'],
      distractors: [
        ['于是', 'LEX.NEAR_SYNONYM', '于是 narrates what happened next; singling out a case is 尤其.'],
        ['终于', 'LEX.NEAR_SYNONYM', '终于 = finally, after waiting; it can’t single out a case.'],
      ],
    },
  },
  {
    id: 'G4-28', unit: 17, title: '相当 / 挺…的 / 格外 (quite; pretty; especially)', titleZh: '程度副词：相当／挺／格外',
    summary: '相当 = quite (fairly formal); 挺 … (的) = pretty (spoken); 格外 = more than usual.',
    explanationMd: `
All three go **before the adjective or verb**, like 很:

- **相当** "quite, considerably": 他的身体相当健康。 Neutral to formal.
- **挺** "pretty, rather", spoken, often with **的** at the end: 这个办法挺好的。
- **格外** "especially, all the more" — *more than usual* because of the situation: 下了雨以后，空气格外新鲜。`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [ADV_POS],
    requires: ['G3-29'],
    contrasts: ['G3-29'],
    errorCodes: ['ORDER.ADVERB_POSITION'],
    examples: [
      ['他/S 的 身体 *相当*/ADV 健康/V 。', "He's in very good health."],
      ['这/S 个 办法 *挺*/ADV 好/V 的/SF 。', "That's a pretty good idea."],
      ['下/T 了 雨 以后 ， 空气/S *格外*/ADV 新鲜/V 。', 'After the rain, the air is especially fresh.'],
    ],
    instances: [
      ['这/S 次 感冒 *相当*/ADV 严重/V 。', 'This cold is quite severe.'],
      ['这/S 种 巧克力 *挺*/ADV 好吃/V 的/SF 。', 'This chocolate is pretty tasty.'],
      ['今天/S 的 温度 *相当*/ADV 高/V 。', "Today's temperature is quite high."],
      ['生病/T 以后 ， 她/S *格外*/ADV 想/V 家/O 。', 'Since falling ill she has been missing home all the more.'],
      ['运动员/S 的 速度 *相当*/ADV 快/V 。', "The athletes are really fast."],
      ['这/S 个 医生 *挺*/ADV 有/V 耐心/O 的/SF 。', 'This doctor is quite patient.'],
      ['春节/T 的 时候 ， 街道/S *格外*/ADV 热闹/V 。', 'At Spring Festival the streets are especially lively.'],
      ['他/S 的 皮肤 *挺*/ADV 好/V 的/SF 。', 'His skin is pretty good.'],
      ['这/S 个 病 *相当*/ADV 危险/V 。', 'This illness is quite dangerous.'],
      ['吃/T 药 以后 ， 我/S 的 精神 *挺*/ADV 好/V 的/SF 。', "I've felt pretty lively since taking the medicine."],
      ['他/S 今天/T *格外*/ADV 高兴/V 。', 'He is especially happy today.'],
      ['网球/S *挺*/ADV 难/V 的/SF 。', 'Tennis is pretty hard.'],
      ['这儿/S 的 水 *相当*/ADV 干净/V 。', 'The water here is quite clean.'],
      ['下/T 完 雨 ， 天/S *格外*/ADV 蓝/V 。', 'After the rain the sky is especially blue.'],
      ['我/S 最近/T *挺*/ADV 累/V 的/SF 。', "I've been pretty tired lately."],
    ],
  },
  {
    id: 'G4-29', unit: 17, title: '差点儿 (nearly, almost)', titleZh: '差点儿',
    summary: '差点儿 + V: something very nearly happened (but didn’t).',
    explanationMd: `
**Form:** Subject + **差点儿** + verb phrase (+ 了).

我差点儿迟到了 — "I was nearly late" (but I wasn't).

- For an **unwanted** event, 差点儿 V and 差点儿没 V both mean it didn't happen: 我差点儿(没)迟到.
- For a **wanted** event, 差点儿没 V means it *did* happen, just barely: 我差点儿没赶上火车 — "I only just caught the train".
- Compare **几乎** (almost, about amounts) and **简直** (G4-30, exaggeration).`,
    formula: ['S', 'ADV', 'V', 'O', 'SF'],
    constraints: [ADV_POS],
    requires: ['G3-92'],
    contrasts: ['G3-92', 'G4-30'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S *差点儿*/ADV 迟到/V 了/SF 。', 'I was nearly late.'],
      ['他/S *差点儿*/ADV 忘记/V 吃/V 药/O 。', 'He nearly forgot to take his medicine.'],
      ['我/S *差点儿*/ADV 没/ADV 赶/V 上/C 火车/O 。', 'I only just caught the train.'],
    ],
    instances: [
      ['孩子/S *差点儿*/ADV 哭/V 了/SF 。', 'The child nearly cried.'],
      ['我/S *差点儿*/ADV 把/BA 药 忘/V 在/C 家 里 。', 'I nearly left my medicine at home.'],
      ['他/S 跑/V 得/C 太 快 ， *差点儿*/ADV 撞/V 到/C 人/O 。', 'He was running so fast he nearly crashed into someone.'],
      ['这/S 次 考试 我/S *差点儿*/ADV 没/ADV 及格/V 。', 'I only just passed this exam.'],
      ['她/S *差点儿*/ADV 生病/V 。', 'She nearly fell ill.'],
      ['我/S *差点儿*/ADV 没/ADV 听/V 见/C 。', 'I almost didn’t hear it.'],
      ['运动员/S *差点儿*/ADV 受伤/V 。', 'The athlete was nearly injured.'],
      ['我/S *差点儿*/ADV 把/BA 眼镜 弄/V 坏/C 了/SF 。', 'I nearly broke my glasses.'],
      ['他/S 喝/V 得/C 太 快 ， *差点儿*/ADV 咳嗽/V 起来/C 。', 'He drank so fast he nearly started coughing.'],
      ['我们/S *差点儿*/ADV 输/V 了/ASP 比赛/O 。', 'We nearly lost the match.'],
      ['我/S *差点儿*/ADV 忘记/V 了/ASP 你/O 的 生日 。', 'I nearly forgot your birthday.'],
      ['她/S *差点儿*/ADV 没/ADV 找/V 到/C 医院/O 。', 'She very nearly didn’t find the hospital.'],
      ['飞机/S *差点儿*/ADV 晚点/V 。', 'The plane was nearly delayed.'],
      ['我/S *差点儿*/ADV 买/V 错/C 药/O 。', 'I nearly bought the wrong medicine.'],
      ['他/S 太/ADV 困/V 了/SF ， *差点儿*/ADV 在/PP 车 上 睡觉/V 。', 'He was so sleepy he nearly fell asleep in the car.'],
    ],
    cloze: {
      blank: ['差点儿'],
      distractors: [
        ['终于', 'LEX.NEAR_SYNONYM', '终于 = finally (it did happen, after waiting); 差点儿 = it nearly happened.'],
        ['已经', 'LEX.NEAR_SYNONYM', '已经 says it has happened; 差点儿 says it very nearly did.'],
      ],
    },
  },
  {
    id: 'G4-30', unit: 17, title: '简直 (simply, practically)', titleZh: '简直',
    summary: '简直 exaggerates for effect: "it\'s simply …", "it\'s practically …".',
    explanationMd: `
**Form:** Subject + **简直** + strong comment (太…了 / V死了 / 像…一样 / 不…).

这个菜简直太好吃了！ — "this dish is simply delicious!"

- 简直 is the speaker's **emotional overstatement**, not a measurement. ✗ 简直有十个人 → 差不多 / 几乎.
- It usually goes with an already strong phrase: 太…了, 死了, 像…一样, 是…, 不 / 没.`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [ADV_POS],
    requires: ['G3-24', 'G3-93'],
    contrasts: ['G4-29'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['这/S 个 菜 *简直*/ADV 太/ADV 好吃/V 了/SF ！', 'This dish is simply delicious!'],
      ['我/S *简直*/ADV 累/V 死/C 了 。', "I'm absolutely shattered."],
      ['他/S 跑/V 得/C 那么 快 ， *简直*/ADV 像/V 运动员/O 一样 。', 'He runs so fast — he is like a real athlete.'],
    ],
    instances: [
      ['今天/S *简直*/ADV 热/V 死/C 了 。', "It's unbearably hot today."],
      ['这/S 种 药 *简直*/ADV 太/ADV 苦/V 了/SF 。', 'This medicine is horribly bitter.'],
      ['他/S 的 病 好/V 得/C 这么 快 ， *简直*/ADV 让/V 人/O 不 相信 。', 'He got better so fast it is hard to believe.'],
      ['我/S *简直*/ADV 不/ADV 知道/V 怎么/ADV 办/V 了/SF 。', "I really don't know what to do."],
      ['这儿/S 的 空气 *简直*/ADV 太/ADV 好/V 了/SF ！', 'The air here is simply wonderful!'],
      ['她/S 的 皮肤 *简直*/ADV 像/V 孩子/O 一样 。', "Her skin is just like a child's."],
      ['这/S 个 问题 *简直*/ADV 太/ADV 简单/V 了/SF 。', 'This question is ridiculously easy.'],
      ['我/S 的 嗓子 *简直*/ADV 疼/V 死/C 了 。', 'My throat is killing me.'],
      ['你/S *简直*/ADV 是/V 我/O 的 医生 ！', "You're practically my doctor!"],
      ['这/S 个 运动员 的 速度 *简直*/ADV 太/ADV 快/V 了/SF 。', "This athlete is unbelievably fast."],
      ['他/S 每 天 只@zhi3 睡 四 个 小时 ， *简直*/ADV 太/ADV 不/ADV 健康/V 了/SF 。', 'He only sleeps four hours a night — that is totally unhealthy.'],
      ['这么/TOP 多 巧克力 ， 他/S *简直*/ADV 吃/V 不 完 。', 'With this much chocolate, he could never finish it.'],
      ['我/S 困/V 得/C *简直*/C 站 不 住 了 。', "I'm so sleepy I can barely stand."],
      ['这/S 个 消息 *简直*/ADV 太/ADV 好/V 了/SF ！', "That's simply wonderful news!"],
      ['他/S *简直*/ADV 什么/O 都 不 吃 。', 'He eats practically nothing.'],
    ],
    cloze: {
      blank: ['简直'],
      distractors: [
        ['几乎', 'LEX.NEAR_SYNONYM', '几乎 measures "almost"; 简直 is the speaker’s exaggeration ("simply").'],
        ['差点儿', 'LEX.NEAR_SYNONYM', '差点儿 = something nearly happened.'],
      ],
    },
  },
];
