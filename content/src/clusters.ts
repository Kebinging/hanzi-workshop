import type { GrammarCluster } from '../../src/content/types';

/**
 * HSK 1–2 grammar diagnostic clusters (spec §1.2.2).
 * M1 format: pick the one grammatical sentence of three. The first two items are probes;
 * the third is the confirmation item used after a 1/2 result.
 */
export const clusters: GrammarCluster[] = [
  {
    id: 'G12-01', title: 'Time & place before the verb', summary: 'Time words and 在+place come before the verb: 我昨天在家看书。',
    items: [
      { options: ['我昨天在家看书。', '我看书昨天在家。', '我在家看书昨天。'], answer: 0, why: 'Time (昨天) and place (在家) both go before the verb 看.' },
      { options: ['他工作在银行。', '他在银行工作。', '在他银行工作。'], answer: 1, why: '在 + place is a prepositional phrase: it comes before the verb.' },
      { options: ['我们晚上七点吃饭。', '我们吃饭晚上七点。', '我们吃晚上七点饭。'], answer: 0, why: 'The time phrase 晚上七点 precedes the verb.' },
    ],
  },
  {
    id: 'G12-02', title: '了 for completed actions', summary: 'V了 marks a completed action; negate with 没 (and drop 了).',
    items: [
      { options: ['我昨天没买了苹果。', '我昨天没买苹果。', '我昨天不买了苹果。'], answer: 1, why: 'Negating a completed action: 没 + V, and 了 disappears.' },
      { options: ['他买了三本书。', '他了买三本书。', '他买三本了书。'], answer: 0, why: '了 attaches right after the verb when the object is quantified.' },
      { options: ['你吃饭了吗？', '你吃了饭吗了？', '你了吃饭吗？'], answer: 0, why: 'Sentence-final 了 before 吗 asks whether something has happened.' },
    ],
  },
  {
    id: 'G12-03', title: '过 for experience', summary: 'V过 = have done (at some time); 没V过 = have never done.',
    items: [
      { options: ['我去过中国。', '我过去中国。', '我去中国过。'], answer: 0, why: '过 follows the verb directly: 去过.' },
      { options: ['她没有去过医院。', '她不去过医院。', '她没去医院过。'], answer: 0, why: 'Experience is negated with 没(有) + V过.' },
      { options: ['你看过这个电影吗？', '你看这个电影过吗？', '你过看这个电影吗？'], answer: 0, why: '过 comes right after the verb, before the object.' },
    ],
  },
  {
    id: 'G12-04', title: 'Progressive 在/正在…呢', summary: '(正)在 + V (+呢) = in the middle of doing.',
    items: [
      { options: ['他在看电视呢。', '他看在电视呢。', '他看电视在呢。'], answer: 0, why: 'Progressive 在 stands before the verb.' },
      { options: ['妈妈正在做饭。', '妈妈做饭正在。', '妈妈正做在饭。'], answer: 0, why: '正在 goes directly before the verb phrase.' },
      { options: ['你在做什么呢？', '你做在什么呢？', '你做什么在呢？'], answer: 0, why: '在 + V for the ongoing action.' },
    ],
  },
  {
    id: 'G12-05', title: 'Basic 比 comparison', summary: 'A 比 B + Adj. No 很/非常 before the adjective.',
    items: [
      { options: ['他比我很高。', '他比我高。', '他高比我。'], answer: 1, why: 'Degree adverbs like 很 can’t modify the adjective in a 比 sentence.' },
      { options: ['今天比昨天冷。', '今天冷比昨天。', '今天比冷昨天。'], answer: 0, why: 'Structure: A 比 B + adjective.' },
      { options: ['哥哥比弟弟大两岁。', '哥哥比弟弟两岁大。', '哥哥大比弟弟两岁。'], answer: 0, why: 'The difference (两岁) follows the adjective.' },
    ],
  },
  {
    id: 'G12-06', title: '能 / 会 / 可以', summary: '会 = learned skill; 能 = able (circumstances); 可以 = permitted.',
    items: [
      { options: ['我会游泳。', '我游泳会。', '我能会游泳。'], answer: 0, why: 'A learned skill uses 会.' },
      { options: ['这儿可以坐吗？', '这儿会坐吗？', '这儿坐可以吗吗？'], answer: 0, why: 'Asking permission uses 可以.' },
      { options: ['我今天生病了，不能去上班。', '我今天生病了，不会去上班。', '我今天生病了，不可以会去上班。'], answer: 0, why: 'Circumstances prevent it: 不能.' },
    ],
  },
  {
    id: 'G12-07', title: 'Measure words', summary: 'Number + measure word + noun: 一本书, 两个人, 三件衣服.',
    items: [
      { options: ['我有两个书。', '我有两本书。', '我有二本书。'], answer: 1, why: 'Books take 本, and two-of-something is 两, not 二.' },
      { options: ['她买了一件衣服。', '她买了一衣服。', '她买了衣服一件。'], answer: 0, why: 'Clothes take 件, placed between number and noun.' },
      { options: ['这张照片很好看。', '这个张照片很好看。', '这照片张很好看。'], answer: 0, why: '这 + measure word (张) + noun.' },
    ],
  },
  {
    id: 'G12-08', title: '不 vs 没', summary: '不 = habitual / future / will not; 没 = did not / have not.',
    items: [
      { options: ['我昨天不去学校。', '我昨天没去学校。', '我昨天没去了学校。'], answer: 1, why: 'A past event that didn’t happen: 没.' },
      { options: ['我不喝咖啡。', '我没喝咖啡过。', '我没喝了咖啡。'], answer: 0, why: 'A habit (“I don’t drink coffee”): 不.' },
      { options: ['他没有有钱。', '他没有钱。', '他不有钱。'], answer: 1, why: '有 is always negated with 没: 没有.' },
    ],
  },
  {
    id: 'G12-09', title: '太…了 and degree', summary: '太 + Adj + 了 = too / so; 很 + Adj links a subject to an adjective.',
    items: [
      { options: ['这件衣服太贵了。', '这件衣服太了贵。', '这件衣服贵太了。'], answer: 0, why: 'Pattern: 太 + adjective + 了.' },
      { options: ['我很忙。', '我是忙。', '我是很忙的了。'], answer: 0, why: 'Adjectives are predicates directly; no 是 needed: 我很忙.' },
      { options: ['今天的天气很好。', '今天的天气是好。', '今天的天气好很。'], answer: 0, why: '很 + adjective as the predicate.' },
    ],
  },
  {
    id: 'G12-10', title: 'Questions', summary: '吗 questions, A-not-A, question words stay in place.',
    items: [
      { options: ['你是不是老师？', '你是不是老师吗？', '你是老师不是吗？'], answer: 0, why: 'A-not-A questions don’t take 吗.' },
      { options: ['你去哪儿？', '哪儿你去？', '你去哪儿吗？'], answer: 0, why: 'Question words stay where the answer would go, and no 吗.' },
      { options: ['他是谁？', '谁他是？', '他是谁吗？'], answer: 0, why: '谁 replaces the answer in place; no 吗.' },
    ],
  },
  {
    id: 'G12-11', title: '要…了 (about to happen)', summary: '(快/就)要 + V + 了 = something is about to happen.',
    items: [
      { options: ['火车快要开了。', '火车快要开。', '火车开快要了。'], answer: 0, why: 'Imminence: 快要 + V + 了 (了 is required).' },
      { options: ['要下雨了，我们回家吧。', '下雨要了，我们回家吧。', '要了下雨，我们回家吧。'], answer: 0, why: '要 + V + 了.' },
      { options: ['电影就要开始了。', '电影就开始要了。', '电影要就开始了。'], answer: 0, why: '就要 + V + 了.' },
    ],
  },
  {
    id: 'G12-12', title: 'Attributive 的', summary: 'Modifier + 的 + noun: 我的书, 很漂亮的衣服, 我买的苹果.',
    items: [
      { options: ['这是我买的苹果。', '这是买我的苹果。', '这是我的买苹果。'], answer: 0, why: 'A clause modifier comes before 的 and the noun.' },
      { options: ['她是一个很漂亮的女孩儿。', '她是一个女孩儿很漂亮的。', '她是一个漂亮很的女孩儿。'], answer: 0, why: 'Adjective phrase + 的 + noun.' },
      { options: ['我朋友的手机很新。', '我手机的朋友很新。', '我的朋友手机的很新。'], answer: 0, why: 'Possessor + 的 + possessed.' },
    ],
  },
];
