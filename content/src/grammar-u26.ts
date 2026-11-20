import type { PatternSource } from './authoring';

// HSK 5 · Unit 2 (unit 26) · 家庭生活 Family — Condition & concession III (provisional).

export const patternsU26: PatternSource[] = [
  {
    id: 'G5-07', unit: 26, title: '哪怕 … 也 … (even if)', titleZh: '哪怕…也…',
    summary: '哪怕 is a strong, spoken "even if": however extreme the condition, the result holds.',
    explanationMd: `
**Form:** **哪怕** + (extreme) condition，Subject + **也** + result.

哪怕工作再忙，我也会陪伴孩子 — "however busy work is, I'll still spend time with my children".

- Like 即使 (G4-07), but more emphatic and colloquial; the condition is often extreme (只有一天, 再…).
- 也 (or 都) is required in the second clause.`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '哪怕', b: '也', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G4-07'],
    contrasts: ['G4-07', 'G5-12'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*哪怕*/CONJ1 工作/S 再 忙 ， 我/S *也*/ADV 会/MOD 陪伴/V 孩子/O 。', "However busy work is, I'll still spend time with my children."],
      ['*哪怕*/CONJ1 只@zhi3/ADV 有/V 一/O 天 ， 我/S *也*/ADV 想/MOD 回/V 家乡/O 。', "Even if it's only one day, I want to go home."],
      ['*哪怕*/CONJ1 父母/S 反对/V ， 他/S *也*/ADV 要/MOD 娶/V 她/O 。', "Even if his parents object, he's going to marry her."],
    ],
    instances: [
      ['*哪怕*/CONJ1 很/ADV 累/V ， 妈妈/S *也*/ADV 每/T 天 做/V 家务/O 。', 'Even when she is exhausted, Mum does the housework every day.'],
      ['*哪怕*/CONJ1 是/V 小/O 事情 ， 她/S *也*/ADV 很/ADV 操心/V 。', 'Even over little things, she worries a lot.'],
      ['*哪怕*/CONJ1 吵架/V 了/SF ， 夫妻/S *也*/ADV 要/MOD 互相/ADV 包容/V 。', 'Even after a quarrel, a couple should be tolerant of each other.'],
      ['*哪怕*/CONJ1 我们/S 不/ADV 在/V 一起/O ， 我/S *也*/ADV 一直/ADV 牵挂/V 着/ASP 你/O 。', "Even when we're apart, I'm always thinking of you."],
      ['*哪怕*/CONJ1 没有/V 钱/O ， 我们/S *也*/ADV 很/ADV 幸福/V 。', "Even without money, we're happy."],
      ['*哪怕*/CONJ1 孩子/S 长大/V 了/SF ， 父母/S *也*/ADV 会/MOD 操心/V 。', 'Even when children grow up, parents still worry.'],
      ['*哪怕*/CONJ1 下/V 大 雨 ， 他/S *也*/ADV 去/V 接/V 孩子/O 。', 'Even in heavy rain he goes to pick up the child.'],
      ['*哪怕*/CONJ1 他/S 说 错 了 ， 你/S *也*/ADV 别/ADV 嫌/V 他/O 。', "Even if he says the wrong thing, don't hold it against him."],
      ['*哪怕*/CONJ1 只@zhi3/ADV 有/V 她/O 一 个 人 ， 她/S *也*/ADV 能/MOD 把/BA 孩子 抚养/V 大/C 。', 'Even on her own, she can bring up the child.'],
      ['*哪怕*/CONJ1 再/ADV 难/V ， 我们/S *也*/ADV 要/MOD 团聚/V 。', "However hard it is, we'll get together."],
      ['*哪怕*/CONJ1 奶奶/S 唠叨/V ， 我/S *也*/ADV 喜欢/V 陪/V 她/O 。', 'Even if Grandma nags, I like keeping her company.'],
      ['*哪怕*/CONJ1 工作/S 不/ADV 好/V ， 家人/S *也*/ADV 会/MOD 支持/V 你/O 。', "Even if your job isn't great, your family will support you."],
      ['*哪怕*/CONJ1 是/V 晚辈/O ， *也*/ADV 可以/MOD 说/V 自己/O 的 看法 。', 'Even the younger generation can give their views.'],
      ['*哪怕*/CONJ1 只@zhi3/ADV 是/V 一/O 个 电话 ， 外婆/S *也*/ADV 会/MOD 很/ADV 高兴/V 。', "Even just a phone call makes Grandma happy."],
      ['*哪怕*/CONJ1 生活/S 很/ADV 难/V ， 他们/S *也*/ADV 很/ADV 和睦/V 。', 'Even though life is hard, they get on well.'],
    ],
    cloze: {
      blank: ['哪怕'],
      distractors: [
        ['既然', 'LEX.NEAR_SYNONYM', '既然 starts from a fact and pairs with 就; 哪怕 is "even if" with 也.'],
        ['因为', 'CONJ.PAIR_MISMATCH', '因为 pairs with 所以, not 也.'],
      ],
    },
  },
  {
    id: 'G5-08', unit: 26, title: '要不是 … (就) … (if it weren\'t for)', titleZh: '要不是…',
    summary: '要不是 A，B: without A, B would have happened — A did happen, so B didn\'t.',
    explanationMd: `
**Form:** **要不是** + real circumstance，(Subject) + (就 / 早就) + what would have happened.

要不是你帮忙，我早就放弃了 — "if it hadn't been for your help, I'd have given up long ago".

- The first clause is **true**; the second is contrary to fact.
- Different from **要是** (if): 要是你帮忙 = "if you help".`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-73'],
    contrasts: ['G3-73'],
    errorCodes: ['LEX.NEAR_SYNONYM', 'CONJ.CONDITION_LOGIC'],
    examples: [
      ['*要不是*/CONJ1 你/S 帮忙/V ， 我/S 早/ADV 就/ADV 放弃/V 了/SF 。', "If it hadn't been for your help, I'd have given up long ago."],
      ['*要不是*/CONJ1 外婆/S 照料/V ， 我/S 不/ADV 会/MOD 这么/ADV 健康/V 。', "If Grandma hadn't looked after me, I wouldn't be this healthy."],
      ['*要不是*/CONJ1 下雨/V ， 我们/S 就/ADV 去/V 公园/O 了 。', "If it weren't raining, we'd go to the park."],
    ],
    instances: [
      ['*要不是*/CONJ1 父母/S 支持/V ， 他/S 不/ADV 能/MOD 上/V 大学/O 。', "Without his parents' support, he couldn't have gone to university."],
      ['*要不是*/CONJ1 妈妈/S 提醒/V ， 我/S 就/ADV 忘/V 了/SF 。', "If Mum hadn't reminded me, I'd have forgotten."],
      ['*要不是*/CONJ1 你/S 告诉/V 我/O ， 我/S 还/ADV 不/ADV 知道/V 她/S 怀孕/V 了/SF 。', "If you hadn't told me, I wouldn't know she's pregnant."],
      ['*要不是*/CONJ1 堵车/V ， 我/S 早/ADV 就/ADV 到/V 了/SF 。', "If it weren't for the traffic, I'd have been here ages ago."],
      ['*要不是*/CONJ1 他/S 体贴/V ， 她/S 不/ADV 会/MOD 嫁/V 给/C 他 。', "If he weren't so considerate, she wouldn't have married him."],
      ['*要不是*/CONJ1 兄弟/S 帮/V 我/O ， 我/S 不/ADV 会/MOD 有/V 今天/O 。', "Without my brothers' help, I wouldn't be where I am today."],
      ['*要不是*/CONJ1 太/ADV 忙/V ， 我/S 就/ADV 回/V 故乡/O 了 。', "If I weren't so busy, I'd go back to my home town."],
      ['*要不是*/CONJ1 她/S 包容/V 我/O ， 我们/S 早/ADV 就/ADV 离婚/V 了/SF 。', "If she weren't so tolerant, we'd have divorced long ago."],
      ['*要不是*/CONJ1 婆婆/S 帮/V 我们/O 看/V 孩子/O ， 我/S 不/ADV 能/MOD 去/V 上班/O 。', "If my mother-in-law didn't look after the baby, I couldn't go to work."],
      ['*要不是*/CONJ1 亲人/S 的 关怀 ， 他/S 不/ADV 会/MOD 这么/ADV 快/ADV 好/V 起来/C 。', "Without his family's care, he wouldn't have recovered so quickly."],
      ['*要不是*/CONJ1 你/S 来/V 了/SF ， 我/S 一 个 人 会 很/ADV 孤单/V 。', "If you hadn't come, I'd be lonely on my own."],
      ['*要不是*/CONJ1 他/S 道歉/V ， 我们/S 不/ADV 会/MOD 和好/V 。', "If he hadn't apologised, we wouldn't have made up."],
      ['*要不是*/CONJ1 祖先/S 留/V 下/C 这/O 个 房屋 ， 我们/S 就/ADV 没有/V 家/O 了 。', "If our ancestors hadn't left this house, we'd have no home."],
      ['*要不是*/CONJ1 你/S 陪伴/V 我/O ， 我/S 不/ADV 会/MOD 这么/ADV 快乐/V 。', "If you weren't with me, I wouldn't be this happy."],
      ['*要不是*/CONJ1 他/S 太/ADV 宠/V 孩子/O ， 孩子/S 不/ADV 会/MOD 这么/ADV 依赖/V 他/O 。', "If he didn't spoil the child so much, the child wouldn't depend on him like this."],
    ],
    cloze: {
      blank: ['要不是'],
      distractors: [
        ['要是', 'LEX.NEAR_SYNONYM', '要是 = if; 要不是 = if it weren’t for (contrary to fact).'],
        ['只要', 'CONJ.CONDITION_LOGIC', '只要 = as long as.'],
      ],
    },
  },
  {
    id: 'G5-09', unit: 26, title: '假如 / 倘若 (if, supposing)', titleZh: '“假如”和“倘若”',
    summary: '假如 / 倘若 introduce a hypothesis in a more formal register than 如果.',
    explanationMd: `
**Form:** **假如 / 倘若** + hypothesis，(Subject) + (就 / 会) + result.

假如你是我，你会怎么做？ — "if you were me, what would you do?"

- Same grammar as **如果** (G3-73); 假如 is a little more literary, 倘若 more so.
- Often used for imaginary or unlikely situations.`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-73'],
    contrasts: ['G3-73'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['*假如*/CONJ1 你/S 是/V 我/O ， 你/S 会/MOD 怎么/ADV 做/V ？', 'If you were me, what would you do?'],
      ['*倘若*/CONJ1 有/V 机会/O ， 我/S 一定/ADV 回/V 故乡/O 看/V 看 。', "If I get the chance, I'll definitely go back to my home town."],
      ['*假如*/CONJ1 明天/T 下雨/V ， 婚礼/S 就/ADV 推迟/V 。', 'If it rains tomorrow, the wedding will be postponed.'],
    ],
    instances: [
      ['*假如*/CONJ1 我/S 有/V 很/O 多 钱 ， 我/S 就/ADV 给/PP 父母 买/V 房子/O 。', "If I had lots of money, I'd buy my parents a house."],
      ['*倘若*/CONJ1 你们/S 结婚/V ， 我/S 一定/ADV 参加/V 。', "If you get married, I'll definitely come."],
      ['*假如*/CONJ1 孩子/S 太/ADV 依赖/V 父母/O ， 就/ADV 很/ADV 难/V 独立/V 。', 'If children depend on their parents too much, it is hard to become independent.'],
      ['*倘若*/CONJ1 他/S 不/ADV 孝顺/V ， 父母/S 会/MOD 很/ADV 伤心/V 。', "If he weren't devoted to them, his parents would be heartbroken."],
      ['*假如*/CONJ1 你/S 不/ADV 喜欢/V ， 就/ADV 告诉/V 我/O 。', "If you don't like it, tell me."],
      ['*假如*/CONJ1 能/MOD 回/V 到/C 小时候 ， 我/S 想/MOD 多/ADV 陪/V 陪 外婆/O 。', "If I could go back to my childhood, I'd spend more time with Grandma."],
      ['*倘若*/CONJ1 夫妻/S 互相/ADV 理解/V ， 就/ADV 很/ADV 少/ADV 吵架/V 。', 'If a couple understand each other, they rarely quarrel.'],
      ['*假如*/CONJ1 你/S 是/V 长辈/O ， 你/S 会/MOD 怎么/ADV 想/V ？', 'If you were the older generation, how would you feel?'],
      ['*倘若*/CONJ1 有/V 困难/O ， 亲人/S 会/MOD 帮助/V 你/O 。', 'If you run into trouble, your family will help.'],
      ['*假如*/CONJ1 他/S 离开/V 家乡/O ， 他/S 一定/ADV 会/MOD 很/ADV 想念/V 。', "If he left his home town, he'd certainly miss it."],
      ['*倘若*/CONJ1 你/S 真/ADV 爱/V 她/O ， 就/ADV 应该/MOD 尊重/V 她/O 。', 'If you truly love her, you should respect her.'],
      ['*假如*/CONJ1 我/S 是/V 你/O ， 我/S 就/ADV 不/ADV 会/MOD 嫌/V 他/O 。', "If I were you, I wouldn't hold it against him."],
      ['*倘若*/CONJ1 明天/T 天气/S 好/V ， 我们/S 就/ADV 全 家 去/V 爬山/O 。', "If the weather's good tomorrow, the whole family will go hiking."],
      ['*假如*/CONJ1 他们/S 和好/V 了/SF ， 我/S 会/MOD 很/ADV 高兴/V 。', "If they made up, I'd be very glad."],
      ['*倘若*/CONJ1 你/S 需要/V 帮助/O ， 就/ADV 给/PP 我 打/V 电话/O 。', 'If you need help, give me a call.'],
    ],
    cloze: {
      blank: ['假如', '倘若'],
      distractors: [
        ['即使', 'LEX.NEAR_SYNONYM', '即使 = even if, paired with 也.'],
        ['虽然', 'CONJ.PAIR_MISMATCH', '虽然 introduces a real fact, not a hypothesis.'],
      ],
    },
  },
  {
    id: 'G5-10', unit: 26, title: '一旦 … 就 … (once …, as soon as …)', titleZh: '一旦…就…',
    summary: '一旦 + event: once it happens, the consequence follows (often lasting or serious).',
    explanationMd: `
**Form:** **一旦** + event，(Subject) + **就** + consequence.

一旦结婚，就要承担责任 — "once you're married, you have to take on responsibility".

- 一旦 marks a turning point; the consequence is usually lasting.
- 一旦 can go before or after the subject.
- Compare 一…就 (G3-16), which is about *immediate* sequence.`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-16'],
    contrasts: ['G3-16'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['*一旦*/CONJ1 结婚/V ， *就*/ADV 要/MOD 承担/V 责任/O 。', "Once you're married, you have to take on responsibility."],
      ['孩子/S *一旦*/CONJ1 独立/V 了/SF ， *就*/ADV 不/ADV 太/ADV 需要/V 父母/O 了 。', "Once children are independent, they don't need their parents so much."],
      ['*一旦*/CONJ1 习惯/V 了/SF ， 你/S *就*/ADV 不/ADV 会/MOD 觉得/V 难/O 了 。', "Once you're used to it, it won't feel hard."],
    ],
    instances: [
      ['*一旦*/CONJ1 决定/V 了/SF ， 他/S *就*/ADV 不/ADV 会/MOD 改变/V 。', "Once he's decided, he won't change his mind."],
      ['*一旦*/CONJ1 离开/V 家乡/O ， *就*/ADV 很/ADV 难/V 回去/C 了 。', "Once you leave your home town, it's hard to go back."],
      ['*一旦*/CONJ1 吵架/V ， 他们/S *就*/ADV 好/V 几 天 不 说话 。', "Once they quarrel, they don't speak for days."],
      ['*一旦*/CONJ1 怀孕/V ， *就*/ADV 要/MOD 注意/V 身体/O 。', "Once you're pregnant, you must look after your health."],
      ['孩子/S *一旦*/CONJ1 生病/V ， 父母/S *就*/ADV 很/ADV 操心/V 。', 'As soon as the child gets ill, the parents worry.'],
      ['*一旦*/CONJ1 答应/V 了/SF ， *就*/ADV 一定/ADV 要/MOD 做/V 到/C 。', "Once you've promised, you must keep your word."],
      ['*一旦*/CONJ1 有/V 了/ASP 孩子/O ， 家务/S *就*/ADV 更/ADV 多/V 了/SF 。', "Once you have a child, there's even more housework."],
      ['*一旦*/CONJ1 父母/S 老/V 了/SF ， 我们/S *就*/ADV 要/MOD 照料/V 他们/O 。', 'Once our parents are old, we must look after them.'],
      ['*一旦*/CONJ1 你/S 嫁/V 给/C 他 ， *就*/ADV 要/MOD 住/V 在/C 他 的 家乡 。', "Once you marry him, you'll have to live in his home town."],
      ['感情/S *一旦*/CONJ1 没有/V 了/SF ， 婚姻/S *就*/ADV 很/ADV 难/V 继续/V 。', "Once the feelings are gone, a marriage is hard to keep going."],
      ['*一旦*/CONJ1 开始/V 恋爱/O ， 他/S *就*/ADV 变/V 得/C 很 温柔 。', 'Once he falls in love, he becomes very gentle.'],
      ['*一旦*/CONJ1 孩子/S 长大/V ， 他们/S *就*/ADV 会/MOD 离开/V 家/O 。', 'Once children grow up, they leave home.'],
      ['*一旦*/CONJ1 有/V 时间/O ， 我/S *就*/ADV 回/V 家/O 陪/V 父母/O 。', 'As soon as I have time, I go home to be with my parents.'],
      ['*一旦*/CONJ1 依赖/V 别人/O ， *就*/ADV 很/ADV 难/V 独立/V 了/SF 。', "Once you depend on others, it's hard to be independent."],
      ['*一旦*/CONJ1 家人/S 团聚/V ， 家里/S *就*/ADV 特别/ADV 热闹/V 。', 'Whenever the family gets together, the house is really lively.'],
    ],
    cloze: {
      blank: ['一旦'],
      distractors: [
        ['虽然', 'CONJ.PAIR_MISMATCH', '虽然 introduces a contrast with 但是; 一旦 … 就 = once … then.'],
        ['尽管', 'LEX.NEAR_SYNONYM', '尽管 = although.'],
      ],
    },
  },
  {
    id: 'G5-11', unit: 26, title: '固然 … 但(是) … (admittedly …, but …)', titleZh: '固然…但是…',
    summary: '固然 grants a point; 但是 / 可是 then gives the more important one.',
    explanationMd: `
**Form:** Subject + **固然** + point A，**但是 / 可是** + more important point B.

钱固然重要，但是家庭更重要 — "money matters, admittedly, but family matters more".

- 固然 concedes something true; the weight of the sentence is on B.
- Compare **虽然** (G3-81): 固然 sounds more argumentative and formal.`,
    formula: ['S', 'ADV', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G3-81'],
    contrasts: ['G3-81'],
    errorCodes: ['CONJ.PAIR_MISMATCH', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['钱/S *固然*/ADV 重要/V ， *但是*/CONJ2 家庭/S 更/ADV 重要/V 。', 'Money matters, admittedly, but family matters more.'],
      ['他/S *固然*/ADV 有/V 缺点/O ， *可是*/CONJ2 他/S 很/ADV 孝顺/V 。', "He has his faults, it's true, but he is devoted to his parents."],
      ['独立/S *固然*/ADV 好/V ， *但是*/CONJ2 也/ADV 要/MOD 关心/V 家人/O 。', 'Independence is good, of course, but you should also care for your family.'],
    ],
    instances: [
      ['工作/S *固然*/ADV 重要/V ， *但是*/CONJ2 也/ADV 要/MOD 陪伴/V 孩子/O 。', 'Work matters, of course, but you also need to spend time with your children.'],
      ['父母/S 的 唠叨 *固然*/ADV 让/V 人/O 烦恼 ， *可是*/CONJ2 也/ADV 是/V 关心/O 。', "Parents' nagging is annoying, admittedly, but it is care too."],
      ['宠/S 孩子 *固然*/ADV 没有/V 错/O ， *但是*/CONJ2 不/ADV 能/MOD 太/ADV 宠/V 。', "There's nothing wrong with indulging children, but don't overdo it."],
      ['房子/S *固然*/ADV 小/V ， *可是*/CONJ2 一/S 家 人 很/ADV 和睦/V 。', 'The flat is small, admittedly, but the family gets on well.'],
      ['他/S *固然*/ADV 很/ADV 忙/V ， *但是*/CONJ2 也/ADV 应该/MOD 回/V 家/O 看/V 看 。', "He's busy, of course, but he should still visit home."],
      ['恋爱/S *固然*/ADV 浪漫/V ， *但是*/CONJ2 婚姻/S 需要/V 责任/O 。', 'Romance is lovely, but marriage takes responsibility.'],
      ['外婆/S 年纪 *固然*/ADV 大/V 了/SF ， *可是*/CONJ2 身体/S 很/ADV 好/V 。', "Grandma is old, it's true, but she's very healthy."],
      ['你/S 说 的 *固然*/ADV 对/V ， *但是*/CONJ2 他/S 也/ADV 没有/V 错/O 。', "You're right, of course, but he isn't wrong either."],
      ['家务/S *固然*/ADV 很/ADV 累/V ， *可是*/CONJ2 夫妻/S 一起/ADV 做/V 就/ADV 轻松/V 了/SF 。', 'Housework is tiring, but it is easier when a couple share it.'],
      ['搬家/S *固然*/ADV 麻烦/V ， *但是*/CONJ2 新/S 房子 更/ADV 大/V 。', 'Moving is a hassle, admittedly, but the new place is bigger.'],
      ['离婚/S *固然*/ADV 是/V 他们/O 自己 的 事情 ， *但是*/CONJ2 孩子/S 怎么/ADV 办/V ？', "Divorce is their own business, of course, but what about the children?"],
      ['她/S *固然*/ADV 很/ADV 温柔/V ， *可是*/CONJ2 有时候/T 也/ADV 会/MOD 生气/V 。', 'She is gentle, of course, but she can get angry too.'],
      ['长辈/S 的 话 *固然*/ADV 要/MOD 听/V ， *但是*/CONJ2 也/ADV 要/MOD 有/V 自己/O 的 看法 。', 'You should listen to your elders, but you need your own views too.'],
      ['青春/S *固然*/ADV 美好/V ， *可是*/CONJ2 很/ADV 快/ADV 就/ADV 过去@guoqu_v/V 了/SF 。', 'Youth is wonderful, admittedly, but it passes quickly.'],
      ['装修/S *固然*/ADV 花/V 钱/O ， *但是*/CONJ2 住/V 得/C 更 舒服 。', 'Renovating costs money, but you live more comfortably.'],
    ],
    cloze: {
      blank: ['固然'],
      distractors: [
        ['既然', 'LEX.NEAR_SYNONYM', '既然 leads to a conclusion with 就; 固然 concedes a point before 但是.'],
        ['果然', 'LEX.NEAR_SYNONYM', '果然 = as expected.'],
      ],
    },
  },
  {
    id: 'G5-12', unit: 26, title: '即便 … 也 … (even if — formal)', titleZh: '即便…也…',
    summary: '即便 is a written-style "even if", used like 即使 with 也.',
    explanationMd: `
**Form:** **即便** + condition，(Subject) + **也** + result.

即便很忙，他也每天给外婆打电话 — "even when he's busy, he rings his grandmother every day".

- Means the same as **即使** (G4-07) and is slightly more formal.
- **哪怕** (G5-07) is the most spoken of the three.`,
    formula: ['CONJ1', 'S', 'V', 'P', 'S', 'ADV', 'V'],
    constraints: [{ kind: 'pair', a: '即便', b: '也', code: 'CONJ.PAIR_MISMATCH' }],
    requires: ['G4-07'],
    contrasts: ['G4-07', 'G5-07'],
    errorCodes: ['CONJ.PAIR_MISMATCH'],
    examples: [
      ['*即便*/CONJ1 父母/S 老/V 了/SF ， 他们/S *也*/ADV 一直/ADV 牵挂/V 着/ASP 孩子/O 。', 'Even in old age, parents never stop worrying about their children.'],
      ['*即便*/CONJ1 很/ADV 忙/V ， 他/S *也*/ADV 每/T 天 给/PP 外婆 打/V 电话/O 。', "Even when he's busy, he rings his grandmother every day."],
      ['*即便*/CONJ1 吵架/V 了/SF ， 兄弟/S *也*/ADV 是/V 兄弟/O 。', 'Even after a quarrel, brothers are still brothers.'],
    ],
    instances: [
      ['*即便*/CONJ1 住/V 得/C 很 远 ， 他们/S *也*/ADV 经常/ADV 团聚/V 。', 'Even though they live far apart, they often get together.'],
      ['*即便*/CONJ1 孩子/S 做/V 错/C 了/SF ， 妈妈/S *也*/ADV 会/MOD 原谅/V 他/O 。', 'Even when the child does wrong, Mum forgives him.'],
      ['*即便*/CONJ1 她/S 嫁/V 到/C 外国 ， *也*/ADV 不/ADV 会/MOD 忘记/V 家乡/O 。', "Even if she marries abroad, she won't forget her home town."],
      ['*即便*/CONJ1 生活/S 很/ADV 难/V ， 一/S 家 人 *也*/ADV 要/MOD 在/V 一起/O 。', 'Even when life is hard, a family should stay together.'],
      ['*即便*/CONJ1 你/S 不/ADV 同意/V ， 我/S *也*/ADV 要/MOD 去/V 。', "Even if you don't agree, I'm going."],
      ['*即便*/CONJ1 长大/V 了/SF ， 你/S *也*/ADV 是/V 妈妈/O 的 宝贝 。', "Even grown up, you're still Mum's baby."],
      ['*即便*/CONJ1 没有/V 钱/O ， 我们/S *也*/ADV 要/MOD 好好@hao=hǎo_hǎo/ADV 生活/V 。', 'Even without money, we should live well.'],
      ['*即便*/CONJ1 他/S 很/ADV 唠叨/V ， 大家/S *也*/ADV 很/ADV 尊重/V 他/O 。', 'Even though he nags, everyone respects him.'],
      ['*即便*/CONJ1 离婚/V 了/SF ， 他们/S *也*/ADV 会/MOD 一起/ADV 抚养/V 孩子/O 。', "Even divorced, they'll raise the child together."],
      ['*即便*/CONJ1 是/V 亲人/O ， *也*/ADV 要/MOD 互相/ADV 尊重/V 。', 'Even family members should respect each other.'],
      ['*即便*/CONJ1 已经/ADV 和好/V 了/SF ， 她/S 心 里 *也*/ADV 还/ADV 有点儿/ADV 难过/V 。', "Even though they've made up, she's still a little hurt."],
      ['*即便*/CONJ1 很/ADV 累/V ， 爸爸/S *也*/ADV 会/MOD 陪伴/V 我们/O 。', 'Even when he is tired, Dad spends time with us.'],
      ['*即便*/CONJ1 搬/V 到/C 城市 ， 爷爷/S *也*/ADV 常常/ADV 想/V 起/C 故乡/O 。', 'Even since moving to the city, Grandpa often thinks of his home town.'],
      ['*即便*/CONJ1 你/S 嫌/V 我/O 唠叨 ， 我/S *也*/ADV 要/MOD 说/V 。', "Even if you think I'm nagging, I'm going to say it."],
      ['*即便*/CONJ1 后代/S 不/ADV 知道/V ， 祖先/S 的 故事 *也*/ADV 不/ADV 会/MOD 消失/V 。', "Even if later generations don't know them, our ancestors' stories won't disappear."],
    ],
    cloze: {
      blank: ['即便'],
      distractors: [
        ['既然', 'LEX.NEAR_SYNONYM', '既然 starts from a known fact and pairs with 就.'],
        ['因为', 'CONJ.PAIR_MISMATCH', '因为 pairs with 所以.'],
      ],
    },
  },
];
