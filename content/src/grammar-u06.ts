import type { PatternSource, Distractor } from './authoring';

// HSK 3 · Unit 6 · 进来吧 — Directional complements & existential sentences (provisional).

const LAI: Distractor = ['来', 'COMP.DIRECTION', '来 = towards the speaker; 去 = away from the speaker. Check where the speaker is.'];
const QU: Distractor = ['去', 'COMP.DIRECTION', '去 = away from the speaker; 来 = towards the speaker. Check where the speaker is.'];

export const patternsU06: PatternSource[] = [
  {
    id: 'G3-41', unit: 6, title: 'Simple directionals: V + 来 / 去', titleZh: '简单趋向补语',
    summary: '来 after a motion verb = towards the speaker; 去 = away from the speaker.',
    explanationMd: `
**Form:** motion verb (进, 出, 上, 下, 回, 过…) + **来 / 去**

The choice depends on **where the speaker is**:
- 请进**来** — come in (I'm inside).
- 他回**去**了 — he went back (away from here).

The speaker's position decides it, not the mover's.`,
    formula: ['S', 'V', 'C', 'SF'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G12-01'],
    contrasts: ['G3-42'],
    errorCodes: ['COMP.DIRECTION', 'COMP.PLACEMENT'],
    examples: [
      ['请/MOD 进/V *来*/C 。', 'Please come in.'],
      ['他/S 回/V *去*/C 了/SF 。', "He's gone back."],
      ['你/S 上/V *来*/C 吧/SF 。', 'Come on up.'],
    ],
    instances: [
      ['他/S 出/V *去*/C 了/SF 。', "He's gone out."],
      ['你/S 上/V *来*/C 吧/SF ， 我/S 在/V 楼上/O 。', "Come up — I'm upstairs."],
      ['妈妈/S 回/V *来*/C 了/SF 。', "Mum's back."],
      ['快/ADV 进/V *来*/C ！', 'Come in, quick!'],
      ['你/S 先/ADV 回/V *去*/C 吧/SF 。', 'You go back first.'],
      ['他/S 从/PP 楼上 下/V *来*/C 了/SF 。', 'He came down from upstairs.'],
      ['我/S 出/V *去*/C 一下/C 。', "I'm popping out for a moment."],
      ['你们/S 都/ADV 进/V *去*/C 吧/SF 。', 'All of you go in.'],
    ],
    decoys: [LAI, QU],
    cloze: { blank: ['来', '去'], distractors: [LAI, QU] },
  },
  {
    id: 'G3-42', unit: 6, title: 'Compound directionals: V + 上/下/进/出/回/过/起 + 来/去', titleZh: '复合趋向补语',
    summary: 'A motion verb plus a two-part direction: 跑出去, 走进来, 站起来.',
    explanationMd: `
**Form:** V + **上/下/进/出/回/过/起** + **来/去**

- 跑**出去** — run out (away from me)
- 走**进来** — walk in (towards me)
- 站**起来** — stand up (起 only takes 来)

The first part gives the direction (in/out/up/down/back/over); 来/去 gives the speaker's viewpoint.`,
    formula: ['S', 'V', 'C', 'SF'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-41'],
    contrasts: ['G3-41'],
    errorCodes: ['COMP.DIRECTION', 'COMP.PLACEMENT'],
    examples: [
      ['他/S 跑/V *出去*/C 了/SF 。', 'He ran out.'],
      ['老师/S 走/V *进来*/C 了/SF 。', 'The teacher walked in.'],
      ['请/MOD 大家/S 站/V *起来*/C 。', 'Everyone, please stand up.'],
    ],
    instances: [
      ['小狗/S 跑/V *过来*/C 了/SF 。', 'The puppy ran over.'],
      ['他/S 爬/V *上去*/C 了/SF 。', 'He climbed up.'],
      ['猫咪/S 从/PP 床 上 跳/V *下来*/C 了/SF 。', 'The kitty jumped down from the bed.'],
      ['你/S 走/V *过去@guoqu_v*/C 看/V 看 吧/SF 。', 'Walk over and have a look.'],
      ['一/S 只 鸟 飞/V *进来*/C 了/SF 。', 'A bird flew in.'],
      ['我们/S 搬/V *回去*/C 吧/SF 。', "Let's move back."],
      ['他/S *慢慢@man=màn_màn*/ADV 地 站/V *起来*/C 了/SF 。', 'He slowly stood up.'],
      ['你们/S 快/ADV 跑/V *下来*/C ！', 'Come running down, quick!'],
    ],
    decoys: [
      ['出来', 'COMP.DIRECTION', 'Check the direction: in vs out, up vs down, towards vs away.'],
      ['进去', 'COMP.DIRECTION', 'Check the direction: in vs out, up vs down, towards vs away.'],
      ['上来', 'COMP.DIRECTION', 'Check the direction: in vs out, up vs down, towards vs away.'],
    ],
  },
  {
    id: 'G3-43', unit: 6, title: 'Objects with directionals', titleZh: '趋向补语与宾语的位置',
    summary: 'A place object goes before 来/去 (走进教室来); a thing can go before or after (拿出一本书来 / 拿出来一本书).',
    explanationMd: `
- **Place** objects always sit **before** 来/去: 回家**去**, 走进教室**来**, 下楼**去**. ✗ 回去家.
- **Thing** objects can go before 来/去 or after the whole complement: 拿出一本书**来** / 拿出来一本书.

Rule of thumb: a place never comes after 来/去.`,
    formula: ['S', 'V', 'C', 'O', 'C'],
    constraints: [{ kind: 'before', a: 'O', b: 'C', code: 'COMP.DIRECTIONAL_OBJECT' }],
    requires: ['G3-42'],
    errorCodes: ['COMP.DIRECTIONAL_OBJECT'],
    examples: [
      ['他/S 走/V 进/C 教室/O *来*/C 了/SF 。', 'He walked into the classroom.'],
      ['她/S 回/V 家/O *去*/C 了/SF 。', "She's gone home."],
      ['他/S 拿/V 出/C 一/O 本 书 *来*/C 。', 'He took out a book.', { alts: ['他拿出来一本书'] }],
    ],
    instances: [
      ['我/S 下/V 楼/O *去*/C 了/SF 。', "I'm going downstairs."],
      ['他/S 跑/V 上/C 楼/O *来*/C 了/SF 。', 'He ran upstairs.'],
      ['你/S 带/V 伞/O *去*/C 吧/SF 。', 'Take an umbrella with you.'],
      ['老师/S 走/V 出/C 教室/O *去*/C 了/SF 。', 'The teacher walked out of the classroom.'],
      ['他/S 买/V 回/C 一/O 些 水果 *来*/C 。', 'He bought some fruit and brought it back.', { alts: ['他买回来一些水果'] }],
      ['妈妈/S 回/V 北京/O *去*/C 了/SF 。', 'Mum has gone back to Beijing.'],
      ['他/S 搬/V 进/C 新/O 房子 *去*/C 了/SF 。', "He's moved into a new house."],
      ['客人/S 上/V 楼/O *来*/C 了/SF 。', 'The guests have come upstairs.'],
    ],
  },
  {
    id: 'G3-44', unit: 6, title: '起来: start to …; it seems …', titleZh: '“起来”的引申用法',
    summary: 'V/Adj + 起来 = starts to (笑起来); 看/听/吃起来 = it looks / sounds / tastes …',
    explanationMd: `
1. **Start and keep going:** 他笑**起来**了 (burst out laughing), 天气热**起来**了 (it's getting warm).
2. **Judging by …:** 看**起来**很新 (looks new), 听**起来**不错 (sounds good), 吃**起来**有点儿辣 (tastes a bit spicy).
3. 说起来容易，做起来难 — easy to say, hard to do.`,
    formula: ['S', 'V', 'C', 'ADV', 'V'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-42'],
    contrasts: ['G3-45'],
    errorCodes: ['COMP.DIRECTION', 'COMP.PLACEMENT'],
    examples: [
      ['他/S 笑/V *起来*/C 了/SF 。', 'He burst out laughing.'],
      ['这/S 件 衣服 看/V *起来*/C 很/ADV 新/V 。', 'This piece of clothing looks new.'],
      ['这/S 个 菜 吃/V *起来*/C 有点儿/ADV 辣/V 。', 'This dish tastes a bit spicy.'],
    ],
    instances: [
      ['孩子/S 哭/V *起来*/C 了/SF 。', 'The child started crying.'],
      ['说/V *起来*/C 容易/V ， 做/V *起来*/C 难/V 。', 'Easier said than done.'],
      ['这/S 个 办法 听/V *起来*/C 不错/V 。', 'That idea sounds good.'],
      ['大家/S 都/ADV 笑/V *起来*/C 了/SF 。', 'Everyone started laughing.'],
      ['她/S 看/V *起来*/C 有点儿/ADV 紧张/V 。', 'She looks a bit nervous.'],
      ['天气/S 热/V *起来*/C 了/SF 。', "It's getting warm."],
      ['这/S 个 房间 看/V *起来*/C 很/ADV 干净/V 。', 'This room looks clean.'],
      ['他/S 突然/ADV 唱/V *起来*/C 了/SF 。', 'He suddenly started singing.'],
    ],
    decoys: [['下去', 'COMP.DIRECTION', '下去 = carry on; starting or "it seems" is 起来.']],
  },
  {
    id: 'G3-45', unit: 6, title: '下去 (carry on) and 出来 (make out, come up with)', titleZh: '“下去”“出来”的引申用法',
    summary: 'V + 下去 = keep doing; V + 出来 = identify or produce: 听出来 (recognise by ear), 想出来 (come up with).',
    explanationMd: `
- **下去** — continue: 说**下去** (go on), 坚持**下去** (keep at it).
- **出来** — something emerges or is recognised: 看**出来** (make out), 听**出来** (recognise by sound), 想**出来** (think up).

Compare 看起来 (looks like) with 看出来 (make out, notice).`,
    formula: ['S', 'MOD', 'V', 'C', 'SF'],
    constraints: [{ kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-42'],
    contrasts: ['G3-44'],
    errorCodes: ['COMP.DIRECTION', 'COMP.PLACEMENT'],
    examples: [
      ['你/S 说/V *下去*/C 。', 'Go on.'],
      ['我/S 听/V *出来*/C 了/SF ， 是/V 你/O 。', 'I recognised your voice — it’s you.'],
      ['你/S 看/V *出来*/C 了/SF 吗/SF ？', 'Did you notice?'],
    ],
    instances: [
      ['我们/S 要/MOD 坚持/V *下去*/C 。', 'We have to keep going.'],
      ['这/S 本 书 很/ADV 难/V ， 我/S 不/ADV 想/MOD 看/V *下去*/C 了/SF 。', "This book is hard — I don't want to keep reading."],
      ['我/S 一/ADV 看/V 就/ADV 看/V *出来*/C 了/SF 。', 'I could tell at a glance.'],
      ['你/S 能/MOD 听/V *出来*/C 这/O 是 谁 吗/SF ？', 'Can you tell who this is by the voice?'],
      ['请/MOD 你/S 读/V *下去*/C 。', 'Please read on.'],
      ['学/S 汉语 要/MOD 一直/ADV 学/V *下去*/C 。', 'With Chinese you have to keep at it.'],
      ['你/S 想/V *出来*/C 了/SF 吗/SF ？', 'Have you figured it out?'],
      ['大家/S 都/ADV 看/V *出来*/C 了/SF ， 他/S 很/ADV 紧张/V 。', 'Everyone could tell he was nervous.'],
    ],
    decoys: [['起来', 'COMP.DIRECTION', '起来 = start / seem; "continue" is 下去, "identify" is 出来.']],
  },
  {
    id: 'G3-46', unit: 6, title: 'Existential sentences I: Place + V着 + thing', titleZh: '存现句（一）：处所＋动词＋着＋名词',
    summary: 'To describe what is somewhere: place first, then V着, then the (indefinite) thing — 桌子上放着一本书.',
    explanationMd: `
**Form:** Place (+上/里/下) + V + **着** + number-measure + noun

- 桌子上放着一本书 — there's a book (lying) on the table.
- 墙上挂着一张画儿 — a picture hangs on the wall.

No 在 at the start, and the thing comes **last** — it's new information. ✗ 一本书放着桌子上.`,
    formula: ['PP', 'V', 'ASP', 'O'],
    constraints: [{ kind: 'before', a: 'PP', b: 'V', code: 'ORDER.EXISTENTIAL' }, { kind: 'before', a: 'ASP', b: 'O', code: 'ORDER.EXISTENTIAL' }],
    requires: ['G3-04'],
    contrasts: ['G3-47'],
    errorCodes: ['ORDER.EXISTENTIAL', 'ASPECT.ZHE_MISUSE'],
    examples: [
      ['桌子/PP 上 放/V *着*/ASP 一/O 本 书 。', "There's a book on the table."],
      ['墙/PP 上 挂/V *着*/ASP 一/O 张 画儿 。', 'A picture hangs on the wall.'],
      ['门口/PP 站/V *着*/ASP 一/O 个 人 。', "There's someone standing at the door."],
    ],
    instances: [
      ['床/PP 上 躺/V *着*/ASP 一/O 只 猫 。', "There's a cat lying on the bed."],
      ['沙发/PP 上 坐/V *着*/ASP 两/O 个 孩子 。', 'Two children are sitting on the sofa.'],
      ['书包/PP 里 放/V *着*/ASP 很/O 多 书 。', 'There are lots of books in the schoolbag.'],
      ['楼下/PP 停/V *着*/ASP 一/O 辆 车 。', "There's a car parked downstairs."],
      ['路口/PP 站/V *着*/ASP 很/O 多 人 。', 'Lots of people are standing at the intersection.'],
      ['黑板/PP 上 写/V *着*/ASP 几/O 个 字 。', 'A few characters are written on the blackboard.'],
      ['桌子/PP 上 放/V *着*/ASP 一/O 杯 茶 。', "There's a cup of tea on the table."],
      ['冰箱/PP 里 放/V *着*/ASP 一/O 些 水果 。', "There's some fruit in the fridge."],
    ],
    decoys: [['过', 'ASPECT.GUO_MISUSE', '过 is experience; describing what is there now uses 着.']],
    cloze: {
      blank: ['着'],
      distractors: [
        ['过', 'ASPECT.GUO_MISUSE', '过 is experience; a scene that is there now uses 着.'],
        ['的', 'COMP.DE_WRONG', '的 can’t follow the verb here; a lasting position needs 着.'],
      ],
    },
  },
  {
    id: 'G3-47', unit: 6, title: 'Existential sentences II: appearing and disappearing', titleZh: '存现句（二）：出现和消失',
    summary: 'Place/time + V了/V来/V走 + new person or thing: 家里来了客人, 前面走过来一个人.',
    explanationMd: `
**Form:** Place / time + V + 了 / directional + (number-measure) + noun

- 家里来**了**客人 — guests have come (to our home).
- 前面走**过来**一个人 — someone came walking towards us.
- 树上飞**走**了一只鸟 — a bird flew off the tree.

The newcomer goes **at the end**: it's new, unidentified information. With a known person you'd say 他来了.`,
    formula: ['T', 'PP', 'V', 'C', 'O'],
    constraints: [{ kind: 'before', a: 'PP', b: 'V', code: 'ORDER.EXISTENTIAL' }, { kind: 'before', a: 'V', b: 'O', code: 'ORDER.EXISTENTIAL' }],
    requires: ['G3-46', 'G3-42'],
    contrasts: ['G3-46'],
    errorCodes: ['ORDER.EXISTENTIAL'],
    examples: [
      ['前面/PP 走/V *过来*/C 一/O 个 人 。', 'Someone came walking towards us.'],
      ['家里/PP 来/V *了*/ASP 两/O 个 客人 。', 'Two guests have come to our home.'],
      ['昨天/T 我们/PP 班 来/V *了*/ASP 一/O 个 新 同学 。', 'A new classmate joined our class yesterday.'],
    ],
    instances: [
      ['树/PP 上 飞/V *走*/C 了/ASP 一/O 只 鸟 。', 'A bird flew off the tree.'],
      ['外面/PP 突然/ADV 跑/V *进来*/C 一/O 只 小狗 。', 'A puppy suddenly ran in from outside.'],
      ['前面/PP 开/V *过来*/C 一/O 辆 车 。', 'A car is coming towards us.'],
      ['我们/PP 公司 走/V *了*/ASP 两/O 个 人 。', 'Two people have left our company.'],
      ['桥/PP 下 开/V *过去@guoqu_v*/C 一/O 条 船 。', 'A boat passed under the bridge.'],
      ['对面/PP 搬/V *来*/C 了/ASP 新/O 邻居 。', 'New neighbours have moved in across the way.'],
      ['天/PP 上 飞/V *过去@guoqu_v*/C 一/O 只 鸟 。', 'A bird flew across the sky.'],
      ['楼上/PP 搬/V *走*/C 了/ASP 一/O 家 人 。', 'A family has moved out upstairs.'],
    ],
  },
  {
    id: 'G3-48', unit: 6, title: 'Localisers: 在 … 上 / 里 / 下 / 中 / 旁边', titleZh: '方位词',
    summary: 'A place noun usually needs a localiser: 在桌子上, 在书包里, 在床下; 在…上/中 also means "in terms of".',
    explanationMd: `
Ordinary nouns become places with a **localiser**: 桌子**上** (on the table), 书包**里** (in the bag), 床**下** (under the bed), 银行**旁边** (next to the bank).

Abstract uses: 在学习**上** (as far as study goes), 在生活**中** (in life).

Country and city names don't need one: 在北京, 在中国.`,
    formula: ['S', 'PP', 'V', 'O'],
    constraints: [{ kind: 'before', a: 'PP', b: 'V', code: 'ORDER.PLACE_AFTER_VERB' }],
    requires: ['G12-01'],
    errorCodes: ['LEX.COLLOCATION', 'ORDER.PLACE_AFTER_VERB'],
    examples: [
      ['钥匙/S 在/V 书包/O *里* 。', 'The key is in the schoolbag.'],
      ['他/S 在/PP 银行 *旁边* 等/V 你/O 。', "He's waiting for you next to the bank."],
      ['猫/S 在/V 床/O *下* 。', 'The cat is under the bed.'],
    ],
    instances: [
      ['我/S 的 手机 在/V 沙发/O *上* 。', 'My phone is on the sofa.'],
      ['学校/S 在/V 公园/O *旁边* 。', 'The school is next to the park.'],
      ['在/PP 学习 *上* ， 他/S 很/ADV 认真/V 。', "When it comes to studying, he's very diligent."],
      ['在/PP 生活 *中* ， 我们/S 需要/V 朋友/O 。', 'In life, we need friends.'],
      ['鱼/S 在/V 水/O *里* 。', 'The fish are in the water.'],
      ['我/S 在/PP 墙 *上* 挂/V 了/ASP 一/O 张 照片 。', 'I hung a photo on the wall.'],
      ['飞机/S 在/PP 天 *上* 飞/V 。', 'The plane is flying in the sky.'],
      ['车/S 停/V 在/C 楼下 。', "The car's parked downstairs."],
    ],
  },
];
