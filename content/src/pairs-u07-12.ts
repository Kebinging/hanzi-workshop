import type { PairSrc } from './authoring';

// Contrastive minimal pairs for Units 7–12 (spec 3.2). "___" marks each gap.
export const pairsU07to12: PairSrc[] = [
  {
    contrast: 'Potential complement vs 能', patternIds: ['G3-54', 'G3-49'],
    items: [
      { context: '字 太 小 了 ， 我 看 ___ 。', en: "The characters are too small — I can't see them clearly.", options: [
        ['不清楚', true, 'Trying but failing because of conditions → V不R: 看不清楚.'],
        ['不能清楚', false, '不能 can’t be followed by a result like that; use 看不清楚.', 'COMP.POTENTIAL_VS_MODAL'],
      ] },
      { context: '上课 的 时候 ， 你 ___ 用 手机 。', en: "You can't use your phone in class.", options: [
        ['不能', true, 'Not allowed → 不能.'],
        ['不会', false, '不会 = haven’t learned how; rules use 不能.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '这 个 箱子 太 重 了 ， 我 ___ 。', en: "This box is too heavy — I can't move it.", options: [
        ['搬不动', true, 'Not strong enough → V不动.'],
        ['不能搬动', false, 'Lacking strength is expressed with the potential form 搬不动.', 'COMP.POTENTIAL_VS_MODAL'],
      ] },
      { context: '你 ___ 帮 我 一下 吗 ？', en: 'Could you help me?', options: [
        ['能', true, 'A request → 能.'],
        ['会', false, '会 is about skills or likelihood, not requests.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '会 / 能 / 可以', patternIds: ['G3-55'],
    items: [
      { context: '我 ___ 游泳 ， 我 学 过 。', en: 'I can swim — I learned.', options: [
        ['会', true, 'A learned skill → 会.'],
        ['可以', false, '可以 is permission, not a skill.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '这里 ___ 照相 吗 ？', en: 'Is it OK to take photos here?', options: [
        ['可以', true, 'Asking permission → 可以.'],
        ['会', false, '会 is a skill or likelihood, not permission.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '明天 ___ 下雨 吗 ？', en: 'Will it rain tomorrow?', options: [
        ['会', true, '"Will (probably)" → 会.'],
        ['可以', false, '可以 is permission.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 一 分钟 ___ 写 %五十 个 字 。', en: 'He can write fifty characters a minute.', options: [
        ['能', true, 'Capacity / how much → 能.'],
        ['会', false, '会 is having the skill at all; amount or capacity uses 能.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '不用 / 必须 / 得', patternIds: ['G3-56'],
    items: [
      { context: '明天 你 ___ 来 了 ， 我们 不 上课 。', en: "You don't need to come tomorrow — there's no class.", options: [
        ['不用', true, 'Not necessary → 不用.'],
        ['不能', false, '不能 means not allowed; here it simply isn’t necessary.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '我 已经 好 了 ， 你 ___ 担心 。', en: "I'm better now — you needn't worry.", options: [
        ['不用', true, '"Needn’t" → 不用.'],
        ['必须', false, '必须 = must; the opposite meaning.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '学生 ___ 准时 上课 。', en: 'Students must be on time for class.', options: [
        ['必须', true, 'A rule → 必须.'],
        ['不必', false, '不必 = needn’t; the opposite meaning.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '把 sentences: what makes them right?', patternIds: ['G3-63', 'G3-57', 'G3-62'],
    items: [
      { context: '___ 。', en: 'I can finish the homework.', options: [
        ['我能把作业写完', true, 'Ability goes before 把 as 能.'],
        ['我把作业写得完', false, '把 can’t take a potential complement.', 'BA.POTENTIAL_COMP'],
      ] },
      { context: '___ 。', en: 'Give the clothes a wash.', options: [
        ['你把衣服洗一下', true, 'Something follows the verb (一下).'],
        ['你把衣服洗', false, 'A 把 sentence can’t end with a bare verb.', 'BA.BARE_VERB'],
      ] },
      { context: '___ 。', en: 'I put the book on the table.', options: [
        ['我把书放在桌子上了', true, 'S + 把 + O + V + 在 + place.'],
        ['我放在桌子上把书了', false, 'The 把-phrase comes before the verb.', 'BA.ORDER'],
      ] },
      { context: '___ 。', en: "Don't throw that away.", options: [
        ['别把那个扔了', true, '别 goes before 把.'],
        ['把那个别扔了', false, 'Negatives go before 把, not after it.', 'BA.NEG_POSITION'],
      ] },
    ],
  },
  {
    contrast: '把 vs 被', patternIds: ['G3-70', 'G3-65'],
    items: [
      { context: '我 的 自行车 ___ 小偷 偷 走 了 。', en: 'My bike was stolen by a thief.', options: [
        ['被', true, 'The bike suffered the action → 被 + doer.'],
        ['把', false, '把 would make the bike the thief!', 'BEI.AGENT_ROLE'],
      ] },
      { context: '小偷 ___ 我 的 自行车 偷 走 了 。', en: 'The thief stole my bike.', options: [
        ['把', true, 'The doer is the subject → 把 + thing.'],
        ['被', false, '被 would mean the thief was stolen by my bike.', 'BEI.AGENT_ROLE'],
      ] },
      { context: '树叶 ___ 风 吹 走 了 。', en: 'The leaves were blown away by the wind.', options: [
        ['被', true, 'Leaves are affected → 被.'],
        ['把', false, '把 needs the doer as subject.', 'BEI.AGENT_ROLE'],
      ] },
      { context: '风 ___ 树叶 吹 走 了 。', en: 'The wind blew the leaves away.', options: [
        ['把', true, 'The wind is the doer → 把.'],
        ['被', false, '被 would make the wind the one affected.', 'BEI.AGENT_ROLE'],
      ] },
    ],
  },
  {
    contrast: '是…的 vs 了', patternIds: ['G3-71'],
    items: [
      { context: '你 是 怎么 来 ___ ？', en: 'How did you get here?', options: [
        ['的', true, 'Asking about the manner of a past event → 是…的.'],
        ['了', false, 'With 是 focusing a detail, the sentence ends in 的.', 'ASPECT.LE_MISUSE'],
      ] },
      { context: '我 昨天 买 ___ 两 本 书 。', en: 'Yesterday I bought two books.', options: [
        ['了', true, 'Simply reporting a completed action with a quantity → V了.'],
        ['的', false, 'Nothing is being singled out here; use 了.', 'ASPECT.LE_MISUSE'],
      ] },
      { context: '他 是 在 北京 出生 ___ 。', en: 'He was born in Beijing.', options: [
        ['的', true, 'The place is in focus → 是…的.'],
        ['了', false, '是…的 ends in 的.', 'ASPECT.LE_MISUSE'],
      ] },
    ],
  },
  {
    contrast: '只要…就 vs 只有…才', patternIds: ['G3-74', 'G3-75'],
    items: [
      { context: '___ 你 来 ， 我 就 很 高兴 。', en: "As long as you come, I'll be happy.", options: [
        ['只要', true, 'Enough condition + 就 → 只要.'],
        ['只有', false, '只有 pairs with 才, not 就.', 'CONJ.CONDITION_LOGIC'],
      ] },
      { context: '___ 多 练习 ， 才 能 说 得 好 。', en: 'Only by practising a lot can you speak well.', options: [
        ['只有', true, 'Necessary condition + 才 → 只有.'],
        ['只要', false, '只要 pairs with 就, not 才.', 'CONJ.CONDITION_LOGIC'],
      ] },
      { context: '只要 努力 ， ___ 能 成功 。', en: "As long as you work hard, you'll succeed.", options: [
        ['就', true, '只要 … 就.'],
        ['才', false, '才 goes with 只有.', 'CONJ.CONDITION_LOGIC'],
      ] },
      { context: '只有 带 护照 ， ___ 能 上 飞机 。', en: 'You can only board with a passport.', options: [
        ['才', true, '只有 … 才.'],
        ['就', false, '就 goes with 只要.', 'CONJ.CONDITION_LOGIC'],
      ] },
    ],
  },
  {
    contrast: '除了…还 vs 除了…都', patternIds: ['G3-76'],
    items: [
      { context: '除了 汉语 以外 ， 我 ___ 学 英语 。', en: 'Besides Chinese, I also study English.', options: [
        ['还', true, 'In addition → 还.'],
        ['都', false, '都 would mean "everything except Chinese".', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '除了 他 以外 ， 我们 ___ 去 了 。', en: 'All of us went except him.', options: [
        ['都', true, 'Excluding him → 都.'],
        ['还', false, '还 would mean he went and we went too.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '除了 星期 天 以外 ， 我 每 天 ___ 上班 。', en: 'I work every day except Sunday.', options: [
        ['都', true, 'Every day except one → 都.'],
        ['还', false, '还 means "also", which doesn’t fit an exception.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '还是 vs 或者', patternIds: ['G3-80'],
    items: [
      { context: '你 喝 茶 ___ 咖啡 ？', en: 'Would you like tea or coffee?', options: [
        ['还是', true, 'A question offering a choice → 还是.'],
        ['或者', false, '或者 is for statements.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '茶 ___ 咖啡 都 可以 。', en: 'Tea or coffee — either is fine.', options: [
        ['或者', true, 'A statement → 或者.'],
        ['还是', false, '还是 is for asking which one.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 是 学生 ___ 老师 ？', en: 'Are you a student or a teacher?', options: [
        ['还是', true, 'Asking which → 还是.'],
        ['或者', false, '或者 is for statements.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '周末 我 去 爬山 ___ 游泳 。', en: 'At the weekend I go hiking or swimming.', options: [
        ['或者', true, 'A statement → 或者.'],
        ['还是', false, '还是 is for questions.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '虽然…但是 vs 因为…所以', patternIds: ['G3-81', 'G3-83'],
    items: [
      { context: '___ 很 累 ， 但是 很 高兴 。', en: "Although I'm tired, I'm happy.", options: [
        ['虽然', true, 'Contrast with 但是 → 虽然.'],
        ['因为', false, '因为 pairs with 所以.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '因为 堵车 ， ___ 我 迟到 了 。', en: 'Because of the traffic, I was late.', options: [
        ['所以', true, '因为 … 所以.'],
        ['但是', false, 'A result after 因为 takes 所以.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '虽然 下雨 了 ， ___ 我们 还是 去 了 。', en: 'Although it rained, we still went.', options: [
        ['可是', true, '虽然 … 可是.'],
        ['所以', false, '所以 goes with 因为.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '___ 太 贵 了 ， 所以 我 没 买 。', en: "Because it was too expensive, I didn't buy it.", options: [
        ['因为', true, 'Cause with 所以 → 因为.'],
        ['虽然', false, '虽然 pairs with 但是/可是.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
  {
    contrast: '不但…而且', patternIds: ['G3-82'],
    items: [
      { context: '她 不但 漂亮 ， ___ 很 聪明 。', en: "She's not only pretty but also clever.", options: [
        ['而且', true, '不但 … 而且.'],
        ['但是', false, '但是 is a contrast; 不但 needs 而且.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '___ ， 而且 说 得 很 好 。', en: 'He not only speaks Chinese, but speaks it well.', options: [
        ['他不但会说汉语', true, 'One subject → it comes before 不但.'],
        ['不但他会说汉语', false, 'With the same subject in both halves, put it before 不但.', 'CONJ.SUBJECT_POSITION'],
      ] },
    ],
  },
  {
    contrast: '一边…一边 vs 又…又', patternIds: ['G3-84', 'G3-85'],
    items: [
      { context: '这 个 菜 ___ 便宜 ___ 好吃 。', en: 'This dish is cheap and tasty.', options: [
        ['又|又', true, 'Two qualities → 又…又.'],
        ['一边|一边', false, '一边…一边 is for two actions at the same time.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '他 ___ 吃 饭 ___ 看 电视 。', en: 'He watches TV while eating.', options: [
        ['一边|一边', true, 'Two simultaneous actions → 一边…一边.'],
        ['又|又', false, '又…又 joins qualities; simultaneous actions take 一边…一边.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
  {
    contrast: '为了 vs 因为', patternIds: ['G3-86'],
    items: [
      { context: '___ 学 好 汉语 ， 我 来 了 中国 。', en: 'I came to China to learn Chinese well.', options: [
        ['为了', true, 'A goal → 为了.'],
        ['因为', false, 'Learning Chinese well is a goal, not an existing cause.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '___ 下雨 ， 比赛 停 了 。', en: 'The match was stopped because of the rain.', options: [
        ['因为', true, 'A cause → 因为.'],
        ['为了', false, 'Nobody wanted the rain; it’s a cause.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '___ 身体 健康 ， 他 每 天 跑步 。', en: 'He runs every day to stay healthy.', options: [
        ['为了', true, 'Health is the goal → 为了.'],
        ['因为', false, 'Here health is what he’s aiming for, so 为了.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '对 vs 关于', patternIds: ['G3-87', 'G3-88'],
    items: [
      { context: '他 ___ 人 很 热情 。', en: "He's warm towards people.", options: [
        ['对', true, 'Attitude towards someone → 对.'],
        ['关于', false, '关于 introduces a topic, not an attitude.', 'LEX.COLLOCATION'],
      ] },
      { context: '这 是 一 本 ___ 熊猫 的 书 。', en: 'This is a book about pandas.', options: [
        ['关于', true, 'The topic of a book → 关于.'],
        ['对', false, '对 is for attitudes and effects.', 'LEX.COLLOCATION'],
      ] },
      { context: '运动 ___ 身体 很 好 。', en: 'Exercise is good for your health.', options: [
        ['对', true, 'An effect on something → 对.'],
        ['关于', false, '关于 means "about (a topic)".', 'LEX.COLLOCATION'],
      ] },
    ],
  },
  {
    contrast: '然后 / 后来 / 以后', patternIds: ['G3-90'],
    items: [
      { context: '他 去年 来 了 北京 ， ___ 又 去 了 #上海=Shànghǎi=Shanghai 。', en: 'He came to Beijing last year and later went on to Shanghai.', options: [
        ['后来', true, 'Later on, in a past story → 后来.'],
        ['以后', false, '以后 must follow an event or time (下课以后).', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '下课 ___ ， 我们 去 吃 饭 吧 。', en: "After class, let's go and eat.", options: [
        ['以后', true, 'After an event → X以后.'],
        ['后来', false, '后来 can’t attach to an event.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 先 洗 手 ， ___ 吃 饭 。', en: 'Wash your hands, then eat.', options: [
        ['然后', true, 'Next step → 然后.'],
        ['后来', false, '后来 is only for past stories.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '终于 / 突然 / 马上', patternIds: ['G3-91'],
    items: [
      { context: '我 等 了 半天 ， 车 ___ 来 了 。', en: 'I waited ages and the bus finally came.', options: [
        ['终于', true, 'After a long wait → 终于.'],
        ['突然', false, '突然 is "suddenly", not "at last".', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 等 一下 ， 我 ___ 来 。', en: "Wait a moment — I'm coming right away.", options: [
        ['马上', true, 'Very soon → 马上.'],
        ['终于', false, '终于 is for something that finally happened.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '我们 正在 吃 饭 ， 灯 ___ 关 了 。', en: 'We were eating when the lights suddenly went out.', options: [
        ['突然', true, 'Without warning → 突然.'],
        ['终于', false, 'Nobody was waiting for the lights to go out.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '好像 vs 像', patternIds: ['G3-93'],
    items: [
      { context: '他 ___ 不 太 高兴 。', en: "He doesn't seem very happy.", options: [
        ['好像', true, '"Seems" → 好像.'],
        ['像', false, '像 needs something to compare with (像…一样).', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '外面 ___ 下雨 了 。', en: 'It seems to be raining outside.', options: [
        ['好像', true, '"Seems / looks as if" → 好像.'],
        ['像', false, '像 is for comparing with something.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
];
