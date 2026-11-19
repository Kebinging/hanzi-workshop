import type { PairSrc } from './authoring';

// Contrastive minimal pairs, HSK 4 units 17–20 (spec 3.2). "___" marks each gap.
export const pairsU17to20: PairSrc[] = [
  {
    contrast: '差点儿 vs 简直', patternIds: ['G4-29', 'G4-30'],
    items: [
      { context: '这 个 菜 ___ 太 好吃 了 ！', en: 'This dish is simply delicious!', options: [
        ['简直', true, 'Exaggerating for effect → 简直.'],
        ['差点儿', false, '差点儿 = something nearly happened.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '我 ___ 迟到 ， 跑 得 很 快 才 到 。', en: 'I was nearly late — I only made it by running.', options: [
        ['差点儿', true, 'Nearly happened (but didn’t) → 差点儿.'],
        ['简直', false, '简直 exaggerates a description; it can’t mean "nearly".', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '稍微 vs 非常', patternIds: ['G4-26'],
    items: [
      { context: '你 能 ___ 慢 一点儿 吗 ？', en: 'Could you go a little slower?', options: [
        ['稍微', true, '稍微 + Adj + 一点儿 = a little.'],
        ['非常', false, '非常 can’t combine with 一点儿.', 'LEX.COLLOCATION'],
      ] },
      { context: '这 个 药 ___ 苦 ， 我 不 想 吃 。', en: "This medicine is really bitter — I don't want to take it.", options: [
        ['非常', true, 'A strong degree with no 一点儿 → 非常.'],
        ['稍微', false, '稍微 needs 一点儿 / 有点儿 and only means "a little".', 'LEX.COLLOCATION'],
      ] },
    ],
  },
  {
    contrast: '下来 vs 下去', patternIds: ['G4-31'],
    items: [
      { context: '雨 停 ___ 了 。', en: 'The rain has stopped.', options: [
        ['下来', true, 'Coming to a stop → 下来.'],
        ['下去', false, '下去 means carrying on.', 'COMP.DIRECTION'],
      ] },
      { context: '这 本 书 很 有意思 ， 你 看 ___ 吧 。', en: 'This book is interesting — keep reading.', options: [
        ['下去', true, 'Continuing → 下去.'],
        ['下来', false, '下来 = stop, settle, note down; carrying on is 下去.', 'COMP.DIRECTION'],
      ] },
    ],
  },
  {
    contrast: '听出来 vs 想起来', patternIds: ['G4-32'],
    items: [
      { context: '我 想 ___ 了 ， 他 叫 #小王=XiǎoWáng=Xiao_Wang 。', en: 'Now I remember — his name is Xiao Wang.', options: [
        ['起来', true, 'Something forgotten comes back → 想起来.'],
        ['出来', false, '想出来 means coming up with a new idea.', 'COMP.DIRECTION'],
      ] },
      { context: '我 听 ___ 了 ， 这 是 北京 话 。', en: "I could tell it was the Beijing accent.", options: [
        ['出来', true, 'Identifying by ear → 听出来.'],
        ['起来', false, '听起来 means "it sounds …", not identifying.', 'COMP.DIRECTION'],
      ] },
    ],
  },
  {
    contrast: '随着 vs 除了', patternIds: ['G4-36'],
    items: [
      { context: '___ 交通 的 发展 ， 旅行 越来越 方便 。', en: 'As transport develops, travel is getting easier.', options: [
        ['随着', true, 'One change going along with another → 随着.'],
        ['除了', false, '除了 means "except / besides".', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '受到 vs 收到', patternIds: ['G4-37'],
    items: [
      { context: '这 个 节目 ___ 了 大家 的 欢迎 。', en: 'This programme was well received.', options: [
        ['受到', true, 'Welcome, praise, influence → 受到.'],
        ['收到', false, '收到 is for letters, emails and parcels.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 ___ 我 的 短信 了 吗 ？', en: 'Did you get my text?', options: [
        ['收到', true, 'A text message is received with 收到.'],
        ['受到', false, '受到 is for abstract things like welcome or criticism.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '由 vs 被', patternIds: ['G4-38'],
    items: [
      { context: '这 件 事情 ___ 我 负责 。', en: "I'm responsible for this.", options: [
        ['由', true, 'Who is in charge of a task → 由.'],
        ['被', false, '被 says something was done TO the subject, with a result.', 'BEI.AGENT_ROLE'],
      ] },
      { context: '我 的 钱包 ___ 小偷 偷 走 了 。', en: 'My wallet was stolen by a thief.', options: [
        ['被', true, 'Something bad done to the subject → 被.'],
        ['由', false, '由 names who is responsible for a task, not who harmed you.', 'BEI.AGENT_ROLE'],
      ] },
    ],
  },
  {
    contrast: '根据 / 作为 vs 关于 / 因为', patternIds: ['G4-41', 'G4-42'],
    items: [
      { context: '___ 调查 ， 年轻人 每 天 都 上网 。', en: 'According to the survey, young people go online every day.', options: [
        ['根据', true, 'Based on a source → 根据.'],
        ['关于', false, '关于 means "about (a topic)".', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '___ 学生 ， 你 应该 认真 学习 。', en: 'As a student, you should study hard.', options: [
        ['作为', true, 'A role → 作为.'],
        ['因为', false, '因为 gives a reason; a role is 作为.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '嘛 vs 吗', patternIds: ['G4-43'],
    items: [
      { context: '你 别 着急 ___ 。', en: "Come on, don't panic.", options: [
        ['嘛', true, 'A gentle push, not a question → 嘛.'],
        ['吗', false, 'This is not a yes/no question.', 'LEX.MEANING'],
      ] },
      { context: '你 明天 来 ___ ？', en: 'Are you coming tomorrow?', options: [
        ['吗', true, 'A yes/no question → 吗.'],
        ['嘛', false, '嘛 presents something as obvious; it doesn’t ask.', 'LEX.MEANING'],
      ] },
    ],
  },
  {
    contrast: '不得不 vs 不必', patternIds: ['G4-44'],
    items: [
      { context: '下雨 了 ， 我们 ___ 回 家 。', en: 'It started raining, so we had to go home.', options: [
        ['不得不', true, 'Forced by circumstances → 不得不.'],
        ['不必', false, '不必 = there is no need.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '天气 很 好 ， 你 ___ 带 伞 。', en: "The weather's fine — no need to take an umbrella.", options: [
        ['不必', true, 'No need → 不必.'],
        ['不得不', false, 'Nothing forces you here.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '难怪 vs 幸亏', patternIds: ['G4-46', 'G4-47'],
    items: [
      { context: '他 昨天 没 睡觉 ， ___ 今天 这么 累 。', en: "He didn't sleep last night — no wonder he's so tired.", options: [
        ['难怪', true, 'Now the reason is known → 难怪.'],
        ['幸亏', false, '幸亏 = luckily.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '___ 你 提醒 我 ， 要不然 我 就 忘 了 。', en: "Luckily you reminded me, or I'd have forgotten.", options: [
        ['幸亏', true, 'A lucky circumstance → 幸亏.'],
        ['难怪', false, '难怪 = no wonder.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
];
