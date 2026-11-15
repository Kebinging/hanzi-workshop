import type { GeneratorSpec } from '../../src/content/types';

// Explicit-lexicon generators (spec 5.5). Every combination is natural by construction:
// the lexicon lists whole verb phrases, so no verb–object clash can occur. Entries with
// `tags` only combine with entries that share a tag.
export const generators: GeneratorSpec[] = [
  {
    id: 'gen_le_quantified', patternId: 'G3-01',
    template: '{S} {ACT} 。',
    en: '{S} {ACT}.',
    slots: {
      S: [
        { zh: '我/S', en: 'I' }, { zh: '妈妈/S', en: 'Mum' }, { zh: '我/S 哥哥', en: 'My older brother' },
        { zh: '她/S', en: 'She' }, { zh: '我们/S', en: 'We' }, { zh: '老师/S', en: 'The teacher' },
      ],
      ACT: [
        { zh: '买/V *了*/ASP 三/O 本 书', en: 'bought three books' },
        { zh: '喝/V *了*/ASP 两/O 杯 茶', en: 'drank two cups of tea' },
        { zh: '吃/V *了*/ASP 一/O 个 苹果', en: 'ate an apple' },
        { zh: '写/V *了*/ASP %二十/O 个 汉字', en: 'wrote twenty characters' },
        { zh: '借/V *了*/ASP 两/O 本 词典', en: 'borrowed two dictionaries' },
        { zh: '看/V *了*/ASP 一/O 个 电影', en: 'watched a film' },
        { zh: '买/V *了*/ASP 一/O 些 水果', en: 'bought some fruit' },
        { zh: '打/V *了*/ASP 两/O 个 电话', en: 'made two phone calls' },
        { zh: '复习/V *了*/ASP 十/O 个 句子', en: 'reviewed ten sentences' },
        { zh: '买/V *了*/ASP 一/O 件 衬衫', en: 'bought a shirt' },
      ],
    },
  },
  {
    id: 'gen_progressive', patternId: 'G3-05',
    template: '{S} *正在*/ADV {ACT} 。',
    en: '{S} {ACT} right now.',
    slots: {
      S: [
        { zh: '妈妈/S', en: 'Mum is' }, { zh: '我/S', en: 'I am' }, { zh: '他们/S', en: 'They are' },
        { zh: '爸爸/S', en: 'Dad is' }, { zh: '我/S 妹妹', en: 'My younger sister is' }, { zh: '我们/S', en: 'We are' },
      ],
      ACT: [
        { zh: '打扫/V 房间/O', en: 'cleaning the room' },
        { zh: '准备/V 晚饭/O', en: 'making dinner' },
        { zh: '看/V 电视/O', en: 'watching TV' },
        { zh: '复习/V 生词/O', en: 'reviewing new words' },
        { zh: '找/V 手机/O', en: 'looking for a phone' },
        { zh: '洗/V 衣服/O', en: 'washing clothes' },
        { zh: '预习/V 课文/O', en: 'preparing the text' },
        { zh: '吃/V 午饭/O', en: 'having lunch' },
      ],
    },
  },
  {
    id: 'gen_bi_degree', patternId: 'G3-17',
    template: '{PAIR} {ADJ} 。',
    en: '{PAIR}.',
    slots: {
      PAIR: [
        { zh: '今天/S *比*/PP 昨天', en: 'Today is {ADJ} than yesterday', tags: ['weather'] },
        { zh: '这里/S *比*/PP 北京', en: 'It is {ADJ} here than in Beijing', tags: ['weather'] },
        { zh: '我/S 哥哥 *比*/PP 我', en: 'My older brother is {ADJ} than me', tags: ['person'] },
        { zh: '他/S *比*/PP 他 妹妹', en: 'He is {ADJ} than his younger sister', tags: ['person'] },
        { zh: '这/S 件 衣服 *比*/PP 那 件', en: 'This piece of clothing is {ADJ} than that one', tags: ['thing'] },
        { zh: '这/S 本 书 *比*/PP 那 本', en: 'This book is {ADJ} than that one', tags: ['thing'] },
      ],
      ADJ: [
        { zh: '冷/V 多/C 了', en: 'much colder', tags: ['weather'] },
        { zh: '热/V 一点儿/C', en: 'a bit hotter', tags: ['weather'] },
        { zh: '暖和/V 一点儿/C', en: 'a bit warmer', tags: ['weather'] },
        { zh: '高/V 多/C 了', en: 'much taller', tags: ['person'] },
        { zh: '忙/V 一点儿/C', en: 'a bit busier', tags: ['person'] },
        { zh: '瘦/V 一点儿/C', en: 'a bit thinner', tags: ['person'] },
        { zh: '贵/V 多/C 了', en: 'much more expensive', tags: ['thing'] },
        { zh: '便宜/V 一点儿/C', en: 'a bit cheaper', tags: ['thing'] },
        { zh: '旧/V 一点儿/C', en: 'a bit older', tags: ['thing'] },
      ],
    },
  },
];
