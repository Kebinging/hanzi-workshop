import type { PatternSource } from './authoring';

// HSK 5 · Unit 4 (unit 28) · 身心健康 Body & mind — Fixed potential forms (provisional).

const ADV_POS = { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' } as const;

export const patternsU28: PatternSource[] = [
  {
    id: 'G5-19', unit: 28, title: '舍不得 (can\'t bear to)', titleZh: '舍不得',
    summary: '舍不得 + V / N: too attached to give something up, spend it or leave it.',
    explanationMd: `
**Form:** Subject + **舍不得** + verb phrase / person.

我舍不得离开家乡 — "I can't bear to leave my home town". 她舍不得花钱 — "she can't bring herself to spend money".

- A fixed potential form (like 来不及); the positive 舍得 means "be willing to part with".
- It can take a person directly: 我舍不得你.`,
    formula: ['S', 'V', 'V', 'O'],
    constraints: [],
    requires: ['G3-49'],
    errorCodes: ['COMP.POTENTIAL_VS_MODAL'],
    examples: [
      ['我/S *舍不得*/V 离开/V 家乡/O 。', "I can't bear to leave my home town."],
      ['她/S *舍不得*/V 花/V 钱/O 。', "She can't bring herself to spend money."],
      ['这/TOP 件 衣服 我/S *舍不得*/V 穿/V 。', "I can't bring myself to wear this — it's too nice."],
    ],
    instances: [
      ['孩子/S *舍不得*/V 睡觉/V 。', "The child can't bear to go to sleep."],
      ['奶奶/S *舍不得*/V 扔/V 旧/O 东西 。', "Grandma can't bear to throw old things away."],
      ['我/S *舍不得*/V 你/O 走 。', "I can't bear for you to leave."],
      ['他/S *舍不得*/V 吃/V 巧克力/O ， 留/V 给/C 了 妹妹 。', "He couldn't bring himself to eat the chocolate and saved it for his sister."],
      ['我/S 真/ADV *舍不得*/V 我/O 的 老 朋友 。', "I'll really miss my old friends."],
      ['老人/S *舍不得*/V 买/V 药物/O 。', "The old man can't bring himself to pay for medicine."],
      ['她/S *舍不得*/V 让/V 孩子/O 熬夜/V 。', "She can't bear to let the child stay up late."],
      ['这么/TOP 好 的 机会 ， 我/S *舍不得*/V 放弃/V 。', "I can't bring myself to give up such a good chance."],
      ['他/S *舍不得*/V 离开/V 这/O 家 医院 。', "He can't bear to leave this hospital."],
      ['我/S *舍不得*/V 把/BA 照片 扔/V 了/SF 。', "I can't bring myself to throw the photos away."],
      ['妈妈/S *舍不得*/V 打/V 孩子/O 。', "Mum can't bring herself to smack the child."],
      ['她/S *舍不得*/V 花/V 钱/O 去/V 健身/O 。', "She can't bring herself to pay to go to the gym."],
      ['我们/S 都/ADV *舍不得*/V 这/O 只 小狗 。', "None of us can bear to part with this puppy."],
      ['他/S *舍不得*/V 关/V 电视/O 。', "He can't bring himself to switch the TV off."],
      ['外婆/S *舍不得*/V 我们/O 回去 。', "Grandma can't bear to see us go."],
    ],
  },
  {
    id: 'G5-20', unit: 28, title: '恨不得 (itching to, wish one could)', titleZh: '恨不得',
    summary: '恨不得 + V: wanting something so badly one would do it right away (often impossible).',
    explanationMd: `
**Form:** Subject + **恨不得** + verb phrase.

我恨不得马上回家 — "I'm dying to go home right now".

- Expresses impatience or a strong, often exaggerated wish.
- Usually with 马上, 把…, or an impossible action.
- Compare **巴不得** (G5-24), which is "would be only too glad".`,
    formula: ['S', 'V', 'ADV', 'V'],
    constraints: [],
    requires: ['G5-19'],
    contrasts: ['G5-24'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S *恨不得*/V 马上/ADV 回/V 家/O 。', "I'm dying to go home right now."],
      ['他/S 太/ADV 累/V 了/SF ， *恨不得*/V 马上/ADV 睡觉/V 。', "He's so tired he wishes he could fall asleep this instant."],
      ['她/S *恨不得*/V 把/BA 所有 的 东西 都 买/V 下来/C 。', 'She wishes she could buy everything.'],
    ],
    instances: [
      ['我/S *恨不得*/V 马上/ADV 见/V 到/C 你 。', "I can't wait to see you."],
      ['牙/T 疼 的 时候 ， 我/S *恨不得*/V 马上/ADV 去/V 医院/O 。', "When my tooth aches, I just want to rush to hospital."],
      ['他/S *恨不得*/V 每 天 都 健身/V 。', 'He wishes he could work out every day.'],
      ['失眠/T 的 时候 ， 我/S *恨不得*/V 天/S 马上/ADV 亮/V 。', "When I can't sleep, I wish it were already morning."],
      ['她/S *恨不得*/V 告诉/V 所有/O 的 人 。', "She's itching to tell everyone."],
      ['孩子/S *恨不得*/V 每 天 都 吃/V 巧克力/O 。', 'The child wishes he could eat chocolate every day.'],
      ['我/S *恨不得*/V 马上/ADV 戒烟/V 。', 'I wish I could quit smoking right now.'],
      ['他/S 很/ADV 焦虑/V ， *恨不得*/V 马上/ADV 知道/V 结果/O 。', "He's anxious and desperate to know the result."],
      ['她/S *恨不得*/V 马上/ADV 瘦/V 下来/C 。', 'She wishes she could lose weight overnight.'],
      ['学生/S *恨不得*/V 马上/ADV 放假/V 。', "The students can't wait for the holidays."],
      ['他/S *恨不得*/V 马上/ADV 出院/V 。', "He's desperate to leave hospital."],
      ['我/S *恨不得*/V 把/BA 时间 停/V 下来/C 。', 'I wish I could stop time.'],
      ['大家/S *恨不得*/V 马上/ADV 出发/V 。', "Everyone's itching to set off."],
      ['我/S 很/ADV 饿/V ， *恨不得*/V 马上/ADV 吃/V 饭/O 。', "I'm starving and wish I could eat right now."],
      ['她/S *恨不得*/V 一/T 天 就 学/V 会/C 。', 'She wishes she could learn it in a single day.'],
    ],
  },
  {
    id: 'G5-21', unit: 28, title: '免不了 / 少不了 (bound to; can\'t do without)', titleZh: '“免不了”和“少不了”',
    summary: '免不了 + V = something can\'t be avoided; 少不了 + N = something is indispensable.',
    explanationMd: `
- **免不了** + (会 / 要) + V — "it's unavoidable that …": 熬夜多了，免不了会生病。 Close to 难免 (G5-05).
- **少不了** + noun — "can't do without": 健康的生活少不了运动。

Both are fixed potential forms (like 来不及): ✗ 不免了 · ✗ 不少了.`,
    formula: ['S', 'V', 'V', 'O'],
    constraints: [],
    requires: ['G5-05'],
    contrasts: ['G5-05'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['熬夜/S 多 了 ， *免不了*/V 会/MOD 生病/V 。', "Stay up late too often and you're bound to get ill."],
      ['健康/S 的 生活 *少不了*/V 运动/O 。', 'A healthy life needs exercise.'],
      ['他/S 刚/ADV 出院/V ， *免不了*/V 有点儿/ADV 疲劳/V 。', "He's just out of hospital, so he's bound to be a bit tired."],
    ],
    instances: [
      ['做/S 手术 *免不了*/V 要/MOD 住院/V 。', 'An operation inevitably means a hospital stay.'],
      ['好/S 的 睡眠 *少不了*/V 规律/O 的 作息 。', 'Good sleep depends on a regular routine.'],
      ['压力/S 大/V ， *免不了*/V 会/MOD 焦虑/V 。', "Under pressure, you're bound to feel anxious."],
      ['健身/S *少不了*/V 好/O 的 饮食 。', "Keeping fit can't do without a good diet."],
      ['年纪/S 大 了 ， *免不了*/V 会/MOD 有/V 一/O 些 毛病 。', 'As you get older, a few ailments are unavoidable.'],
      ['一/S 个 好 医生 *少不了*/V 耐心/O 。', 'A good doctor needs patience.'],
      ['吃/S 太 多 甜 的 ， *免不了*/V 会/MOD 胖/V 。', "Eat too many sweet things and you're bound to put on weight."],
      ['我们/S 的 生活 *少不了*/V 朋友/O 。', "We can't live without friends."],
      ['感冒/S 的 时候 *免不了*/V 咳嗽/V 。', 'When you have a cold, coughing is unavoidable.'],
      ['孩子/S 的 成长 *少不了*/V 父母/O 的 关怀 。', "Children can't grow up without their parents' care."],
      ['季节/S 变化 的 时候 ， *免不了*/V 会/MOD 感冒/V 。', "When the seasons change, colds are hard to avoid."],
      ['这/S 个 病 的 治疗 *少不了*/V 药物/O 。', "Treating this illness can't be done without medicine."],
      ['第一/T 次 做 手术 ， *免不了*/V 紧张/V 。', 'Having an operation for the first time, you are bound to be nervous.'],
      ['长寿/S *少不了*/V 好/O 的 心态 。', 'Living a long life takes a good attitude.'],
      ['工作/S 忙 的 时候 ， *免不了*/V 要/MOD 熬夜/V 。', 'When work is busy, late nights are unavoidable.'],
    ],
  },
  {
    id: 'G5-22', unit: 28, title: '说不定 (perhaps, maybe)', titleZh: '说不定',
    summary: '说不定 suggests a real possibility: maybe, it could be that.',
    explanationMd: `
**Form:** **说不定** + clause · or Subject + **说不定** + verb phrase.

说不定他已经出院了 — "maybe he's already been discharged".

- More hopeful or open than 不见得 (G5-03), which doubts.
- Often followed by 就 / 会: 你多运动，说不定就不失眠了。`,
    formula: ['ADV', 'S', 'V', 'SF'],
    constraints: [],
    requires: ['G4-67'],
    contrasts: ['G5-03'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*说不定*/ADV 他/S 已经/ADV 出院/V 了/SF 。', 'Maybe he has already been discharged.'],
      ['你/S 多 运动 ， *说不定*/ADV 就/ADV 不/ADV 失眠/V 了/SF 。', "If you exercise more, maybe you won't have trouble sleeping."],
      ['明天/T *说不定*/ADV 会/MOD 下雨/V 。', 'It might rain tomorrow.'],
    ],
    instances: [
      ['他/S *说不定*/ADV 是/V 太/O 累 了 。', "Maybe he's just too tired."],
      ['*说不定*/ADV 你/S 是/V 过敏/O 。', 'Maybe you have an allergy.'],
      ['这/S 种 药物 *说不定*/ADV 有/V 效果/O 。', 'This medicine might work.'],
      ['*说不定*/ADV 她/S 的 心情 不/ADV 好/V 。', "Maybe she's in a bad mood."],
      ['去/V 医院/O 检查/V 一下/C ， *说不定*/ADV 是/V 胃/O 的 问题 。', 'Get it checked at the hospital — it might be your stomach.'],
      ['你/S 早/ADV 一点儿 睡觉/V ， *说不定*/ADV 精神/S 会/MOD 好/V 一点儿/C 。', "Go to bed earlier — you might feel livelier."],
      ['*说不定*/ADV 他/S 忘/V 了/SF 。', 'Maybe he forgot.'],
      ['他/S 最近/T 很/ADV 疲劳/V ， *说不定*/ADV 是/V 工作/O 太 多 了 。', "He's been worn out lately — maybe he has too much work."],
      ['*说不定*/ADV 明天/T 他/S 就/ADV 康复/V 了/SF 。', 'He might be better by tomorrow.'],
      ['多/ADV 喝/V 水/O ， *说不定*/ADV 嗓子/S 就/ADV 不/ADV 疼/V 了/SF 。', "Drink more water — your throat might stop hurting."],
      ['她/S 不/ADV 接/V 电话/O ， *说不定*/ADV 在/ADV 睡觉/V 。', "She isn't answering — maybe she's asleep."],
      ['*说不定*/ADV 这/S 是/V 一/O 个 好 机会 。', 'This might be a good opportunity.'],
      ['你/S 去/V 问/V 医生/O ， *说不定*/ADV 他/S 有/V 办法/O 。', 'Ask the doctor — he might know what to do.'],
      ['*说不定*/ADV 他/S 的 血压 太/ADV 高/V 了/SF 。', 'Maybe his blood pressure is too high.'],
      ['你/S 试/V 一下/C 按摩/O ， *说不定*/ADV 腰/S 就/ADV 不/ADV 痛/V 了/SF 。', 'Try a massage — your back might stop aching.'],
    ],
    cloze: {
      blank: ['说不定'],
      distractors: [
        ['不见得', 'LEX.NEAR_SYNONYM', '不见得 doubts a claim; 说不定 suggests a possibility.'],
        ['果然', 'LEX.NEAR_SYNONYM', '果然 confirms an expectation.'],
      ],
    },
  },
  {
    id: 'G5-23', unit: 28, title: '不由得 (can\'t help, involuntarily)', titleZh: '不由得',
    summary: '不由得 + V: a reaction happens by itself, without the person meaning to.',
    explanationMd: `
**Form:** (trigger)，Subject + **不由得** + reaction.

听到这个消息，她不由得哭了 — "hearing the news, she couldn't help crying".

- The reaction is usually a feeling or a small physical response (笑, 哭, 紧张起来…).
- Compare **不得不** (G4-44): forced by circumstances, not an involuntary feeling.`,
    formula: ['T', 'S', 'ADV', 'V', 'SF'],
    constraints: [ADV_POS],
    requires: ['G4-44'],
    contrasts: ['G4-44'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['听/T 到 这 个 消息 ， 她/S *不由得*/ADV 哭/V 了/SF 。', "Hearing the news, she couldn't help crying."],
      ['看/T 到 老 照片 ， 我/S *不由得*/ADV 笑/V 了/SF 。', "Seeing the old photos, I couldn't help smiling."],
      ['他/S *不由得*/ADV 紧张/V 起来/C 。', 'He found himself getting nervous.'],
    ],
    instances: [
      ['想/T 到 明天 的 手术 ， 他/S *不由得*/ADV 焦虑/V 起来/C 。', "Thinking of tomorrow's operation, he couldn't help growing anxious."],
      ['看/T 到 孩子 ， 她/S *不由得*/ADV 微笑/V 了/SF 。', 'Seeing her child, she smiled without meaning to.'],
      ['一/T 个 人 的 时候 ， 我/S *不由得*/ADV 觉得/V 孤独/O 。', "When I'm on my own, I can't help feeling lonely."],
      ['听/T 了 医生 的 话 ， 我/S *不由得*/ADV 担心/V 起来/C 。', "After hearing the doctor, I couldn't help worrying."],
      ['天/S 冷/V 了/SF ， 我/S *不由得*/ADV 想/V 起/C 了 家乡 。', 'As it turned cold, I found myself thinking of home.'],
      ['看/T 到 她 的 眼泪 ， 我/S *不由得*/ADV 难过/V 起来/C 。', 'Seeing her tears, I felt sad in spite of myself.'],
      ['他/S *不由得*/ADV 停/V 了/ASP 下来/C 。', 'He stopped without meaning to.'],
      ['看/T 到 那么 多 人 ， 我/S *不由得*/ADV 害怕/V 了/SF 。', 'Seeing so many people, I felt frightened.'],
      ['听/T 到 音乐 ， 孩子/S *不由得*/ADV 跳/V 起来/C 。', 'Hearing the music, the child started dancing.'],
      ['她/S *不由得*/ADV 感动/V 了/SF 。', 'She was moved in spite of herself.'],
      ['看/T 到 体检 结果 ， 他/S *不由得*/ADV 吃惊/V 。', 'Seeing his check-up results, he was taken aback.'],
      ['一/T 想 到 考试 ， 我/S *不由得*/ADV 失眠/V 了/SF 。', "Just thinking about the exam, I couldn't sleep."],
      ['听/T 了 这 个 故事 ， 大家/S *不由得*/ADV 笑/V 了/SF 。', 'Hearing the story, everyone burst out laughing.'],
      ['他/S *不由得*/ADV 生气/V 了/SF 。', "He couldn't help getting angry."],
      ['看/T 到 外婆 老 了 ， 我/S *不由得*/ADV 伤心/V 起来/C 。', 'Seeing how old Grandma had got, I felt sad.'],
    ],
    cloze: {
      blank: ['不由得'],
      distractors: [
        ['不得不', 'LEX.NEAR_SYNONYM', '不得不 = forced by circumstances; 不由得 = can’t help (an involuntary reaction).'],
        ['不必', 'LEX.NEAR_SYNONYM', '不必 = no need.'],
      ],
    },
  },
  {
    id: 'G5-24', unit: 28, title: '巴不得 (be only too glad to)', titleZh: '巴不得',
    summary: '巴不得 + V: would love it if something happened; eagerly wishing.',
    explanationMd: `
**Form:** Subject + **巴不得** + verb phrase / clause.

孩子巴不得每天都放假 — "the kids would love it if every day were a holiday".

- Spoken. The wish is usually realistic and welcome; compare **恨不得** (G5-20), which is more impatient or exaggerated.`,
    formula: ['S', 'V', 'V', 'O'],
    constraints: [],
    requires: ['G5-20'],
    contrasts: ['G5-20'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['孩子/S *巴不得*/V 每 天 都 放假/V 。', 'The kids would love every day to be a holiday.'],
      ['我/S *巴不得*/V 马上/ADV 出院/V 。', "I'd be only too glad to leave hospital right now."],
      ['我/S *巴不得*/V 他/O 别 来 。', "I'd be glad if he didn't come."],
    ],
    instances: [
      ['她/S *巴不得*/V 马上/ADV 瘦/V 下来/C 。', "She'd love to slim down right away."],
      ['我/S *巴不得*/V 不/ADV 去/V 体检/O 。', "I'd be only too glad to skip the check-up."],
      ['大家/S *巴不得*/V 早/ADV 一点儿 下班/V 。', "Everyone would love to finish early."],
      ['他/S 早/ADV 就/ADV *巴不得*/V 戒烟/V 了/SF 。', "He's been longing to quit smoking for ages."],
      ['孩子/S *巴不得*/V 不/ADV 吃/V 药/O 。', "The child would love not to take the medicine."],
      ['我/S *巴不得*/V 有/V 一/O 个 长 假期 。', "I'd love a long holiday."],
      ['他/S *巴不得*/V 每 天 都 能/MOD 睡/V 好/C 。', "He'd give anything to sleep well every night."],
      ['她/S *巴不得*/V 手术/S 早/ADV 一点儿 结束/V 。', 'She wishes the operation would be over sooner.'],
      ['我/S *巴不得*/V 你/O 来 陪 我 。', "I'd love you to come and keep me company."],
      ['学生/S *巴不得*/V 没有/V 考试/O 。', 'Students would be glad if there were no exams.'],
      ['他/S *巴不得*/V 离开/V 这/O 个 城市 。', "He'd be only too glad to leave this city."],
      ['奶奶/S *巴不得*/V 孙子/O 每 天 都 来 。', 'Grandma would love her grandson to come every day.'],
      ['我/S *巴不得*/V 马上/ADV 去/V 旅行/O 。', "I'd love to go travelling right now."],
      ['她/S *巴不得*/V 大家/O 都 知道 。', "She'd be delighted if everyone knew."],
      ['我们/S *巴不得*/V 他/O 早/ADV 一点儿 康复/V 。', 'We hope with all our hearts that he recovers soon.'],
    ],
  },
];
