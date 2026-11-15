import type { PairSrc } from './authoring';

// Contrastive minimal pairs (spec 3.2). "___" marks each gap. Option parts joined with "|".
// Only contexts where exactly one option is acceptable are included.
export const pairs: PairSrc[] = [
  {
    contrast: '的 / 得 / 地', patternIds: ['G3-25', 'G3-31'],
    items: [
      { context: '他 跑 ___ 很 快 。', en: 'He runs fast.', options: [
        ['得', true, 'Verb + 得 + description of how it’s done.'],
        ['的', false, '的 links a modifier to a noun, not a verb to its description.', 'COMP.DE_WRONG'],
      ] },
      { context: '这 是 我 ___ 书 。', en: 'This is my book.', options: [
        ['的', true, 'Possession before a noun → 的.'],
        ['得', false, '得 follows a verb; before a noun use 的.', 'COMP.DE_WRONG'],
      ] },
      { context: '他 认真 ___ 写 作业 。', en: 'He does his homework conscientiously.', options: [
        ['地', true, 'An adverbial before the verb → 地.'],
        ['得', false, '得 comes after the verb; before it, use 地.', 'COMP.DE_WRONG'],
      ] },
      { context: '她 唱 ___ 很 好听 。', en: 'She sings beautifully.', options: [
        ['得', true, 'Verb + 得 + how well.'],
        ['地', false, '地 goes before a verb, not after it.', 'COMP.DE_WRONG'],
      ] },
      { context: '孩子 高兴 ___ 回 家 了 。', en: 'The child went home happily.', options: [
        ['地', true, '"Happily" describes the going → Adj + 地 + verb.'],
        ['的', false, '的 would need a noun after it.', 'COMP.DE_WRONG'],
      ] },
    ],
  },
  {
    contrast: '太…了 vs 非常', patternIds: ['G3-29'],
    items: [
      { context: '这 件 衣服 ___ 贵 了 ， 我 不 买 。', en: "This is too expensive — I won't buy it.", options: [
        ['太', true, '"Too …" with 了 → 太…了.'],
        ['非常', false, '非常 doesn’t pair with 了 to mean "too".', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 ___ 喜欢 音乐 。', en: 'He likes music very much.', options: [
        ['非常', true, 'A plain statement of degree → 非常.'],
        ['太', false, '太 needs 了 here (太喜欢了), and it sounds like an exclamation.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '今天 ___ 热 了 ！', en: "It's so hot today!", options: [
        ['太', true, '太…了 — an exclamation.'],
        ['很', false, '很 doesn’t take 了 to exclaim; use 太…了.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: 'Negating a 得-description', patternIds: ['G3-27'],
    items: [
      { context: '他 跑 得 ___ 快 。', en: "He doesn't run fast.", options: [
        ['不', true, 'The description after 得 is negated with 不.'],
        ['没', false, '没 can’t negate a 得-description.', 'ASPECT.NEG_BU_MEI'],
      ] },
      { context: '我 写 得 ___ 好 ， 你 别 看 。', en: "I don't write well — don't look.", options: [
        ['不', true, '不 after 得.'],
        ['没', false, 'Use 不, after 得.', 'ASPECT.NEG_BU_MEI'],
      ] },
      { context: '你 睡 得 好 ___ 好 ？', en: 'Did you sleep well?', options: [
        ['不', true, 'A-not-A after 得: 好不好.'],
        ['没', false, 'The question form is 好不好.', 'ASPECT.NEG_BU_MEI'],
      ] },
    ],
  },
  {
    contrast: 'Which result complement?', patternIds: ['G3-33', 'G3-34', 'G3-35'],
    items: [
      { context: '老师 说 得 很 慢 ， 我 都 听 ___ 了 。', en: 'The teacher spoke slowly, so I understood everything.', options: [
        ['懂', true, 'Understanding by listening → 听懂.'],
        ['会', false, '会 as a result is for skills you learn (学会).', 'COMP.RESULT_CHOICE'],
      ] },
      { context: '我 找 了 半天 ， 才 找 ___ 钥匙 。', en: 'I searched for ages before I found the key.', options: [
        ['到', true, 'Succeeding in finding → 找到.'],
        ['完', false, '找完 = finished searching, not found.', 'COMP.RESULT_CHOICE'],
      ] },
      { context: '我 学 了 一 个 月 ， 学 ___ 了 游泳 。', en: 'After a month I had learned to swim.', options: [
        ['会', true, 'Mastering a skill → 学会.'],
        ['懂', false, '懂 is understanding, not being able to do it.', 'COMP.RESULT_CHOICE'],
      ] },
      { context: '这 个 字 你 写 ___ 了 ， 再 写 一 遍 吧 。', en: "You've written this character wrong — write it again.", options: [
        ['错', true, 'Asked to rewrite it → it was wrong: 写错.'],
        ['完', false, '写完 = finished; that doesn’t explain rewriting.', 'COMP.RESULT_CHOICE'],
      ] },
      { context: '饭 做 ___ 了 ， 快 来 吃 吧 。', en: "Dinner's ready — come and eat.", options: [
        ['好', true, 'Ready / done properly → 做好.'],
        ['到', false, '做到 means "achieve"; ready food is 做好.', 'COMP.RESULT_CHOICE'],
      ] },
    ],
  },
  {
    contrast: '在 / 到 / 给 after the verb', patternIds: ['G3-37'],
    items: [
      { context: '我 现在 住 ___ 北京 。', en: 'I live in Beijing now.', options: [
        ['在', true, 'Staying at a place → V在.'],
        ['给', false, '给 hands something to a person.', 'LEX.COLLOCATION'],
      ] },
      { context: '这 本 书 我 想 送 ___ 你 。', en: "I'd like to give you this book.", options: [
        ['给', true, 'Giving to a person → 送给.'],
        ['在', false, '在 marks a place, not a recipient.', 'LEX.COLLOCATION'],
      ] },
      { context: '他 跑 ___ 门口 ， 又 跑 回来 了 。', en: 'He ran to the door and ran back again.', options: [
        ['到', true, 'Reaching a point → V到.'],
        ['给', false, '给 needs a person.', 'LEX.COLLOCATION'],
      ] },
      { context: '书 放 ___ 桌子 上 了 。', en: 'The book has been put on the table.', options: [
        ['在', true, 'Where it ends up → 放在.'],
        ['给', false, '给 needs a person.', 'LEX.COLLOCATION'],
      ] },
    ],
  },
  {
    contrast: '来 vs 去', patternIds: ['G3-41', 'G3-42'],
    items: [
      { context: '我 在 楼上 ， 你 上 ___ 吧 。', en: "I'm upstairs — come on up.", options: [
        ['来', true, 'Towards the speaker (upstairs) → 来.'],
        ['去', false, '去 is away from the speaker.', 'COMP.DIRECTION'],
      ] },
      { context: '他 不 在 家 ， 出 ___ 了 。', en: "He's not home — he's gone out.", options: [
        ['去', true, 'Away from here → 去.'],
        ['来', false, '来 would mean coming towards us.', 'COMP.DIRECTION'],
      ] },
      { context: '外面 很 冷 ， 快 进 ___ ！', en: "It's cold out — come in, quick!", options: [
        ['来', true, 'Into where the speaker is → 来.'],
        ['去', false, '去 is away from the speaker.', 'COMP.DIRECTION'],
      ] },
      { context: '你 先 回 ___ 吧 ， 我 还 要 工作 。', en: "You go back first — I still have work.", options: [
        ['去', true, 'Away from the speaker → 去.'],
        ['来', false, '来 is towards the speaker.', 'COMP.DIRECTION'],
      ] },
    ],
  },
  {
    contrast: 'Place before 来/去', patternIds: ['G3-43'],
    items: [
      { context: '她 回 ___ 了 。', en: "She's gone home.", options: [
        ['家去', true, 'A place goes before 来/去.'],
        ['去家', false, 'A place never follows 来/去.', 'COMP.DIRECTIONAL_OBJECT'],
      ] },
      { context: '老师 走 进 ___ 了 。', en: 'The teacher walked into the classroom.', options: [
        ['教室来', true, 'Place, then 来.'],
        ['来教室', false, 'A place never follows 来/去.', 'COMP.DIRECTIONAL_OBJECT'],
      ] },
      { context: '我 下 ___ 吧 。', en: "I'll go downstairs.", options: [
        ['楼去', true, 'Place, then 去.'],
        ['去楼', false, 'A place never follows 来/去.', 'COMP.DIRECTIONAL_OBJECT'],
      ] },
    ],
  },
  {
    contrast: '起来 / 下去 / 出来', patternIds: ['G3-44', 'G3-45'],
    items: [
      { context: '这 件 衣服 看 ___ 很 新 。', en: 'This piece of clothing looks new.', options: [
        ['起来', true, '"Looks …" → 看起来.'],
        ['出来', false, '看出来 means "make out, notice".', 'COMP.DIRECTION'],
      ] },
      { context: '你 说 得 很 好 ， 请 说 ___ 。', en: "You're doing well — please go on.", options: [
        ['下去', true, '"Carry on" → 下去.'],
        ['起来', false, '说起来 = start talking / speaking of.', 'COMP.DIRECTION'],
      ] },
      { context: '我 一 听 就 听 ___ 是 你 了 。', en: 'I knew it was you the moment I heard you.', options: [
        ['出来', true, 'Recognising by sound → 听出来.'],
        ['起来', false, '听起来 = "sounds (like)".', 'COMP.DIRECTION'],
      ] },
      { context: '他 听 了 这 个 故事 ， 突然 笑 ___ 了 。', en: 'Hearing the story, he suddenly burst out laughing.', options: [
        ['起来', true, 'Starting to laugh → 笑起来.'],
        ['下去', false, '下去 would mean he kept on laughing.', 'COMP.DIRECTION'],
      ] },
      { context: '这 个 办法 听 ___ 不错 。', en: 'That idea sounds good.', options: [
        ['起来', true, '"Sounds …" → 听起来.'],
        ['出来', false, '听出来 = recognise by ear.', 'COMP.DIRECTION'],
      ] },
    ],
  },
  {
    contrast: 'Existential word order', patternIds: ['G3-46', 'G3-47'],
    items: [
      { context: '___ 。', en: "There's a book on the table.", options: [
        ['桌子上放着一本书', true, 'Place, then V着, then the thing.'],
        ['一本书放着在桌子上', false, 'In "there is" sentences the place comes first and the thing last.', 'ORDER.EXISTENTIAL'],
      ] },
      { context: '___ 。', en: 'Guests have come to our home.', options: [
        ['家里来了客人', true, 'Place + V了 + newcomer.'],
        ['客人来了家里', false, 'The newcomer goes last: 家里来了客人.', 'ORDER.EXISTENTIAL'],
      ] },
      { context: '___ 。', en: 'Two children are sitting on the sofa.', options: [
        ['沙发上坐着两个孩子', true, 'Place + V着 + who.'],
        ['两个孩子坐着沙发上', false, 'Place first; 坐着 can’t take a place after it.', 'ORDER.EXISTENTIAL'],
      ] },
    ],
  },
  {
    contrast: 'Localisers', patternIds: ['G3-48'],
    items: [
      { context: '鱼 在 水 ___ 。', en: 'The fish are in the water.', options: [
        ['里', true, 'Inside → 里.'],
        ['上', false, '上 is on top of / on the surface.', 'LEX.COLLOCATION'],
      ] },
      { context: '在 学习 ___ ， 他 很 认真 。', en: "When it comes to studying, he's diligent.", options: [
        ['上', true, '在…上 = "in terms of".'],
        ['里', false, '在…里 is physically inside.', 'LEX.COLLOCATION'],
      ] },
      { context: '照片 挂 在 墙 ___ 。', en: 'The photo is hanging on the wall.', options: [
        ['上', true, 'On a surface → 上.'],
        ['里', false, '里 is inside.', 'LEX.COLLOCATION'],
      ] },
    ],
  },
  {
    contrast: '就 vs 才', patternIds: ['G3-08'],
    items: [
      { context: '我 等 了 一 个 小时 ， 他 ___ 来 。', en: 'I waited an hour before he came.', options: [
        ['才', true, 'He came later than expected — you waited an hour. 才 = "not until".'],
        ['就', false, '就 means sooner than expected, which contradicts the long wait (and would need 了).', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 六 点 ___ 起床 了 ， 比 我 早 。', en: 'He was up as early as six — earlier than me.', options: [
        ['就', true, 'Earlier than expected ("earlier than me"), with 了 → 就.'],
        ['才', false, '才 means later than expected, and it normally drops 了.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '这 个 问题 很 简单 ， 我 五 分钟 ___ 做 完 了 。', en: 'This question was easy — I finished it in just five minutes.', options: [
        ['就', true, 'Quicker than expected ("very easy") → 就 … 了.'],
        ['才', false, '才 would mean it took longer than expected — but it was easy.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '电影 七 点 开始 ， 他 七 点 半 ___ 到 。', en: "The film started at seven; he didn't arrive until half past.", options: [
        ['才', true, 'He arrived after the start — later than expected → 才, no 了.'],
        ['就', false, '就 means earlier than expected, but he was late.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 怎么 现在 ___ 来 ？ 大家 都 等 你 呢 。', en: "Why are you only coming now? Everyone's waiting for you.", options: [
        ['才', true, 'Everyone is waiting — the arrival is late → 才.'],
        ['就', false, '就 would praise the arrival as early.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '我们 九 点 上课 ， 他 八 点 ___ 到 教室 了 。', en: 'Class is at nine; he was in the classroom by eight.', options: [
        ['就', true, 'An hour early → 就 … 了.'],
        ['才', false, '才 means late, and doesn’t go with 了 here.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '刚 vs 刚才', patternIds: ['G3-07'],
    items: [
      { context: '___ 的 电影 很 有意思 。', en: 'The film (we saw) just now was interesting.', options: [
        ['刚才', true, '刚才 is a time noun, so it can modify a noun with 的.'],
        ['刚', false, '刚 is an adverb; it can’t take 的 to modify a noun.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '我 ___ 没 看见 你 。', en: "I didn't see you just now.", options: [
        ['刚才', true, 'Only 刚才 can be negated: 刚才没….'],
        ['刚', false, '刚 can’t be followed by 没.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 ___ 来 北京 两 个 月 。', en: "He's only been in Beijing two months.", options: [
        ['刚', true, '刚 is subjective "just" — two months can feel recent.'],
        ['刚才', false, '刚才 means minutes ago; it can’t cover two months.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '___ 你 去 哪儿 了 ？', en: 'Where did you go just now?', options: [
        ['刚才', true, 'A time word can open the sentence before the subject.'],
        ['刚', false, '刚 is an adverb; it can’t come before the subject.', 'ORDER.ADVERB_POSITION'],
      ] },
    ],
  },
  {
    contrast: '了 / 过 / 着', patternIds: ['G3-01', 'G3-03', 'G3-04'],
    items: [
      { context: '你 看 ___ 这 个 电影 吗 ？ 很 有意思 ！', en: "Have you ever seen this film? It's great!", options: [
        ['过', true, 'Asking about experience ("ever") → 过.'],
        ['着', false, '着 is a lasting state, not an experience.', 'ASPECT.ZHE_MISUSE'],
      ] },
      { context: '门 开 ___ ， 请 进 。', en: 'The door is open — come in.', options: [
        ['着', true, 'A state you can see now → 着.'],
        ['过', false, '过 = has been opened at some time, not a present state.', 'ASPECT.GUO_MISUSE'],
      ] },
      { context: '我 没 去 ___ 那儿 。', en: "I've never been there.", options: [
        ['过', true, '没 + V + 过 = never.'],
        ['了', false, 'After 没, 了 disappears.', 'ASPECT.NEG_BU_MEI'],
      ] },
      { context: '他 穿 ___ 一 件 红 衬衫 ， 很 好看 。', en: "He's wearing a red shirt; it looks good.", options: [
        ['着', true, 'Describing what someone has on → 着.'],
        ['过', false, '过 would mean he has worn it before.', 'ASPECT.GUO_MISUSE'],
      ] },
      { context: '昨天 我 买 ___ 两 本 书 。', en: 'Yesterday I bought two books.', options: [
        ['了', true, 'One completed action with a quantity → 了.'],
        ['着', false, '着 marks a lasting state, not a completed purchase.', 'ASPECT.ZHE_MISUSE'],
      ] },
      { context: '她 手 里 拿 ___ 一 个 包 。', en: "She's holding a bag.", options: [
        ['着', true, 'A visible state → 着.'],
        ['过', false, '过 is experience, not a current state.', 'ASPECT.GUO_MISUSE'],
      ] },
    ],
  },
  {
    contrast: '正在 vs 着', patternIds: ['G3-05', 'G3-04'],
    items: [
      { context: '妈妈 ___ 做 饭 ， 你 等 一会儿 。', en: "Mum's cooking — wait a moment.", options: [
        ['正在', true, 'An action in progress → 正在 before the verb.'],
        ['着', false, '着 goes after the verb, not before it.', 'ASPECT.ZHE_MISUSE'],
      ] },
      { context: '灯 开 ___ ， 可是 房间 里 没有 人 。', en: "The light is on, but there's nobody in the room.", options: [
        ['着', true, 'A lasting state after the verb → 着.'],
        ['正在', false, '正在 goes before the verb.', 'ORDER.ADVERB_POSITION'],
      ] },
      { context: '他们 ___ 开会 呢 。', en: "They're in a meeting.", options: [
        ['正在', true, 'In progress → 正在 … 呢.'],
        ['已经', false, '已经 means already done and needs 了.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '外面 ___ 下雨 ， 你 带 伞 吧 。', en: "It's raining outside — take an umbrella.", options: [
        ['正在', true, 'Happening right now → 正在.'],
        ['已经', false, '已经 would need 了 and means already done.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '又 vs 再', patternIds: ['G3-10'],
    items: [
      { context: '他 昨天 迟到 了 ， 今天 ___ 迟到 了 。', en: 'He was late yesterday, and he was late again today.', options: [
        ['又', true, 'The repeat already happened → 又.'],
        ['再', false, '再 is for a future repeat.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '我 没 听 懂 ， 请 你 ___ 说 一 遍 。', en: "I didn't catch that — please say it again.", options: [
        ['再', true, 'A request for a future repeat → 再.'],
        ['又', false, '又 is for repeats that already happened.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '这 个 电影 很 好看 ， 我 想 ___ 看 一 次 。', en: 'This film is great — I want to watch it again.', options: [
        ['再', true, 'A plan to repeat → 再.'],
        ['又', false, '又 means it already happened.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 怎么 ___ 忘记 了 ？', en: 'How did you forget again?', options: [
        ['又', true, 'It already happened (again) → 又 … 了.'],
        ['再', false, '再 is for something still to come.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '明天 ___ 来 吧 。', en: 'Come again tomorrow.', options: [
        ['再', true, 'Future → 再.'],
        ['又', false, '又 is for a repeat that already happened.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 上 个 星期 ___ 生病 了 。', en: 'He got ill again last week.', options: [
        ['又', true, 'Last week — already happened → 又.'],
        ['再', false, '再 is for the future.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '一直 vs 总是', patternIds: ['G3-12'],
    items: [
      { context: '从 早上 到 晚上 ， 雨 ___ 在 下 。', en: "It rained non-stop from morning till night.", options: [
        ['一直', true, 'One unbroken stretch → 一直.'],
        ['总是', false, '总是 describes repeated separate occasions, not one continuous period.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '我 ___ 等 你 等 到 十 点 。', en: 'I waited for you all the way until ten.', options: [
        ['一直', true, 'Continuous waiting until a point → 一直.'],
        ['总是', false, '总是 means "every time", not one continuous wait.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 ___ 往 前面 走 ， 就 到 了 。', en: "Keep going straight ahead and you're there.", options: [
        ['一直', true, '一直 also means "straight (ahead)".'],
        ['总是', false, '总是 = always (habit); it can’t mean "straight".', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '他 每 次 来 ， ___ 给 孩子 带 礼物 。', en: 'Every time he comes, he always brings the kids presents.', options: [
        ['总是', true, '"Every time" — repeated occasions → 总是.'],
        ['一直', false, '一直 is one continuous stretch, not a series of visits.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '还 vs 又', patternIds: ['G3-11'],
    items: [
      { context: '他 ___ 没 回来 。', en: "He still hasn't come back.", options: [
        ['还', true, '"Still not" → 还没.'],
        ['又', false, '又 repeats a past action; it doesn’t mean "still".', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '已经 %十二 点 了 ， 你 ___ 不 睡觉 ？', en: "It's already twelve and you're still not going to bed?", options: [
        ['还', true, '"Still not" → 还不.'],
        ['又', false, '又 means "again", not "still".', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '你 ___ 要 什么 ？', en: 'What else would you like?', options: [
        ['还', true, '"In addition / else" → 还.'],
        ['又', false, '又 is for a repeated past action.', 'LEX.NEAR_SYNONYM'],
      ] },
      { context: '外面 ___ 在 下雨 。', en: "It's still raining outside.", options: [
        ['还', true, 'The situation continues → 还在.'],
        ['又', false, '又在 would mean it started again, not that it continues.', 'LEX.NEAR_SYNONYM'],
      ] },
    ],
  },
  {
    contrast: '离 vs 从', patternIds: ['G3-15'],
    items: [
      { context: '我 家 ___ 公司 很 远 。', en: 'My home is far from the office.', options: [
        ['离', true, 'Distance between two places → 离.'],
        ['从', false, '从 marks a starting point, not a distance.', 'LEX.COLLOCATION'],
      ] },
      { context: '___ 北京 到 #上海=shànghǎi=Shanghai 要 五 个 小时 。', en: 'From Beijing to Shanghai takes five hours.', options: [
        ['从', true, '从 … 到 … = from … to ….'],
        ['离', false, '离 doesn’t pair with 到; it measures distance.', 'LEX.COLLOCATION'],
      ] },
      { context: '学校 ___ 这儿 不 远 。', en: "The school isn't far from here.", options: [
        ['离', true, 'Near/far from → 离.'],
        ['从', false, '从 is a starting point.', 'LEX.COLLOCATION'],
      ] },
      { context: '我 ___ 早上 八 点 工作 到 下午 五 点 。', en: 'I work from eight in the morning until five in the afternoon.', options: [
        ['从', true, 'A span "from … until …" → 从.'],
        ['离', false, '离 measures distance, not a time span.', 'LEX.COLLOCATION'],
      ] },
    ],
  },
  {
    contrast: '一…就 vs other pairs', patternIds: ['G3-16'],
    items: [
      { context: '他 ___ 回 家 ___ 睡觉 。', en: 'As soon as he gets home he goes to sleep.', options: [
        ['一|就', true, '"As soon as" → 一 … 就.'],
        ['一|才', false, '一 pairs with 就, not 才.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '我 ___ 看 ___ 懂 了 。', en: 'I understood the moment I looked.', options: [
        ['一|就', true, '一 + V₁ 就 + V₂.'],
        ['又|就', false, '又 means "again"; "as soon as" needs 一.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '天 ___ 黑 ， 他 ___ 回 家 了 。', en: 'As soon as it got dark, he went home.', options: [
        ['一|就', true, '一 … 就, each before its own verb.'],
        ['先|就', false, '先 marks a first step and pairs with 然后/再.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
  {
    contrast: '先…然后 vs 以后', patternIds: ['G3-09'],
    items: [
      { context: '我们 ___ 吃 饭 ， ___ 去 看 电影 。', en: "Let's eat first, then go and see a film.", options: [
        ['先|然后', true, '先 marks step one; 然后 opens step two.'],
        ['然后|先', false, '先 must come first — it marks the first step.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '下课 ___ ， 我们 去 吃 饭 吧 。', en: "After class, let's go and eat.", options: [
        ['以后', true, '以后 follows an event: 下课以后.'],
        ['然后', false, '然后 opens the next clause; it can’t attach after an event.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '你 先 休息 一会儿 ， ___ 工作 。', en: 'Rest a moment first, then work.', options: [
        ['再', true, '再 before the second verb: 先 … 再 ….'],
        ['以后', false, '以后 can’t open the second step after 先.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
  {
    contrast: 'Degree in 比 sentences', patternIds: ['G3-17', 'G3-24'],
    items: [
      { context: '今天 比 昨天 ___ 热 。', en: 'Today is even hotter than yesterday.', options: [
        ['更', true, '更 can go before the adjective in a 比 sentence.'],
        ['很', false, 'No 很 inside a 比 comparison.', 'COMP.DEGREE_IN_BI'],
      ] },
      { context: '他 比 我 ___ 忙 。', en: "He's even busier than me.", options: [
        ['更', true, '更 = even more — allowed in 比 sentences.'],
        ['非常', false, '非常 can’t modify the adjective in a 比 sentence.', 'COMP.DEGREE_IN_BI'],
      ] },
      { context: '今天 比 昨天 冷 ___ 。', en: 'Today is much colder than yesterday.', options: [
        ['多了', true, '"Much more" in a 比 sentence → Adj + 多了.'],
        ['极了', false, '极了 can’t be used in a 比 comparison.', 'COMP.DEGREE_IN_BI'],
      ] },
      { context: '这 个 菜 好吃 ___ ！', en: 'This dish is absolutely delicious!', options: [
        ['极了', true, 'No comparison here — just "extremely" → 极了.'],
        ['多了', false, '多了 needs a comparison (than something / than before).', 'COMP.PLACEMENT'],
      ] },
    ],
  },
  {
    contrast: '没有 vs 不 in comparisons', patternIds: ['G3-19'],
    items: [
      { context: '我 ___ 他 那么 高 。', en: "I'm not as tall as him.", options: [
        ['没有', true, '"Not as … as" → A 没有 B (那么) Adj.'],
        ['不', false, '不 can’t form this comparison.', 'COMP.NEG_COMPARISON'],
      ] },
      { context: '今天 ___ 昨天 冷 。', en: "Today isn't as cold as yesterday.", options: [
        ['没有', true, 'Negative comparison → 没有.'],
        ['不', false, 'A 不 B Adj isn’t grammatical.', 'COMP.NEG_COMPARISON'],
      ] },
      { context: '这 个 菜 ___ 那 个 好吃 。', en: "This dish isn't as tasty as that one.", options: [
        ['没有', true, 'A 没有 B Adj.'],
        ['不', false, 'Use 没有 for "not as … as".', 'COMP.NEG_COMPARISON'],
      ] },
    ],
  },
  {
    contrast: '跟…一样 vs 比', patternIds: ['G3-20'],
    items: [
      { context: '我 的 手机 ___ 你 的 一样 。', en: 'My phone is the same as yours.', options: [
        ['跟', true, 'Sameness → 跟 … 一样.'],
        ['比', false, '比 compares differences; it can’t end in 一样.', 'COMP.BI_YIYANG'],
      ] },
      { context: '他 跟 他 哥哥 ___ 高 。', en: "He's as tall as his older brother.", options: [
        ['一样', true, '跟 … 一样 + Adj = as … as.'],
        ['很', false, '跟 B 很 Adj isn’t a comparison; you need 一样.', 'COMP.BI_YIYANG'],
      ] },
      { context: '这 本 书 跟 那 本 ___ 。', en: 'This book is different from that one.', options: [
        ['不一样', true, 'The negative of 一样 is 不一样.'],
        ['没一样', false, '一样 is negated with 不, not 没.', 'ASPECT.NEG_BU_MEI'],
      ] },
    ],
  },
  {
    contrast: '越来越 vs 越…越', patternIds: ['G3-21', 'G3-22'],
    items: [
      { context: '天气 ___ 热 了 。', en: "It's getting hotter and hotter.", options: [
        ['越来越', true, 'Steady change over time → 越来越.'],
        ['越', false, 'A single 越 needs a second 越 (越A越B).', 'CONJ.MISSING_PARTNER'],
      ] },
      { context: '他 越 说 ___ 快 。', en: 'The more he talked, the faster he got.', options: [
        ['越', true, '越A越B: the second 越 goes before 快.'],
        ['越来越', false, '越来越 can’t complete a 越…越 pair.', 'CONJ.PAIR_MISMATCH'],
      ] },
      { context: '这 个 故事 我 越 听 ___ 喜欢 。', en: 'The more I hear this story, the more I like it.', options: [
        ['越', true, 'Second half of 越…越.'],
        ['更', false, '越…越 needs the second 越.', 'CONJ.PAIR_MISMATCH'],
      ] },
    ],
  },
  {
    contrast: '有点儿 vs 一点儿', patternIds: ['G3-23'],
    items: [
      { context: '这 件 衣服 ___ 贵 。', en: 'This piece of clothing is a bit pricey.', options: [
        ['有点儿', true, '有点儿 goes before the adjective (a complaint).'],
        ['一点儿', false, '一点儿 goes after the adjective.', 'COMP.PLACEMENT'],
      ] },
      { context: '太 贵 了 ， 便宜 ___ 吧 。', en: "It's too expensive — make it a bit cheaper.", options: [
        ['一点儿', true, 'A request for "a bit more" → Adj + 一点儿.'],
        ['有点儿', false, '有点儿 goes before the adjective.', 'COMP.PLACEMENT'],
      ] },
      { context: '我 ___ 累 ， 想 休息 一下 。', en: "I'm a bit tired and want a rest.", options: [
        ['有点儿', true, 'Before the adjective, a slight complaint → 有点儿.'],
        ['一点儿', false, '一点儿 can’t stand before an adjective.', 'COMP.PLACEMENT'],
      ] },
      { context: '请 你 说 慢 ___ 。', en: 'Please speak a little more slowly.', options: [
        ['一点儿', true, 'Asking for change → Adj + 一点儿.'],
        ['有点儿', false, '有点儿 goes before the adjective.', 'COMP.PLACEMENT'],
      ] },
      { context: '他 比 我 高 ___ 。', en: "He's a bit taller than me.", options: [
        ['一点儿', true, 'In a 比 comparison: Adj + 一点儿.'],
        ['有点儿', false, '有点儿 isn’t used in 比 comparisons.', 'COMP.DEGREE_IN_BI'],
      ] },
    ],
  },
];
