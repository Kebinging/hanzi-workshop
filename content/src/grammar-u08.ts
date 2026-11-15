import type { PatternSource, Distractor } from './authoring';

// HSK 3 · Unit 8 · 把它放好 — 把 disposal sentences (provisional).

const BA_BEFORE_V = { kind: 'before' as const, a: 'BA' as const, b: 'V' as const, code: 'BA.ORDER' };
const NOT_BEI: Distractor = ['被', 'BEI.AGENT_ROLE', '被 would make the subject the one affected; 把 brings the thing being handled forward.'];

export const patternsU08: PatternSource[] = [
  {
    id: 'G3-57', unit: 8, title: '把 + object + V + 了', titleZh: '把字句：把＋宾语＋动词＋了',
    summary: '把 moves a definite object in front of the verb to say what was done to it: 我把苹果吃了.',
    explanationMd: `
**Form:** Subject + **把** + object + V + 了 / other element

把 says *what happened to* a specific thing: 我把苹果吃了 — I ate the apple (it's gone).

- The object is definite (that apple, my book), not "an apple".
- The verb never stands alone: it needs 了, a result, a direction, etc.
- 把 + object goes **before** the verb.`,
    formula: ['S', 'BA', 'V', 'SF'],
    constraints: [BA_BEFORE_V],
    requires: ['G3-01', 'G3-02'],
    contrasts: ['G3-65'],
    errorCodes: ['BA.ORDER', 'BA.BARE_VERB'],
    examples: [
      ['我/S *把*/BA 苹果 吃/V 了/SF 。', 'I ate the apple.'],
      ['他/S *把*/BA 那 本 书 卖/V 了/SF 。', 'He sold that book.'],
      ['你/S *把*/BA 药 吃/V 了/SF 吗/SF ？', 'Have you taken the medicine?'],
    ],
    instances: [
      ['妈妈/S *把*/BA 垃圾 扔/V 了/SF 。', 'Mum threw the rubbish away.'],
      ['我/S *把*/BA 那 杯 咖啡 喝/V 了/SF 。', 'I drank that cup of coffee.'],
      ['弟弟/S *把*/BA 我 的 蛋糕 吃/V 了/SF 。', 'My little brother ate my cake.'],
      ['他/S *把*/BA 旧 房子 卖/V 了/SF 。', 'He sold the old house.'],
      ['我/S 已经/ADV *把*/BA 作业 交/V 了/SF 。', "I've already handed in the homework."],
      ['你/S *把*/BA 汤 喝/V 了/SF 吧/SF 。', 'Drink up the soup.'],
      ['她/S *把*/BA 那 张 照片 扔/V 了/SF 。', 'She threw that photo away.'],
      ['我们/S *把*/BA 饺子 吃/V 了/SF 。', 'We ate the dumplings.'],
    ],
    decoys: [NOT_BEI],
    cloze: {
      blank: ['把'],
      distractors: [
        ['被', 'BEI.AGENT_ROLE', '被 would mean the subject was affected by the object.'],
        ['给', 'LEX.COLLOCATION', '给 marks someone who receives something; the handled object takes 把.'],
      ],
    },
  },
  {
    id: 'G3-58', unit: 8, title: '把 + object + V + result', titleZh: '把字句：结果补语',
    summary: '把 with a result complement says what state you left the object in: 把作业写完, 把门关好.',
    explanationMd: `
**Form:** S + 把 + object + V + result (完, 好, 干净, 坏, 错, 住…)

- 我把作业写**完**了 — I've finished the homework.
- 他把我的电脑弄**坏**了 — he broke my computer.
- 请你把门关**好** — please shut the door properly.`,
    formula: ['S', 'BA', 'V', 'C', 'SF'],
    constraints: [BA_BEFORE_V, { kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-57', 'G3-33'],
    errorCodes: ['BA.ORDER', 'COMP.PLACEMENT'],
    examples: [
      ['我/S *把*/BA 作业 写/V 完/C 了/SF 。', "I've finished the homework."],
      ['请/MOD 你/S *把*/BA 门 关/V 好/C 。', 'Please shut the door properly.'],
      ['他/S *把*/BA 我 的 电脑 弄/V 坏/C 了/SF 。', 'He broke my computer.'],
    ],
    instances: [
      ['你/S *把*/BA 这 些 生词 记/V 住/C 。', 'Memorise these new words.'],
      ['妈妈/S *把*/BA 衣服 洗/V 干净/C 了/SF 。', 'Mum washed the clothes clean.'],
      ['我/S *把*/BA 房间 打扫/V 干净/C 了/SF 。', "I've cleaned the room."],
      ['请/MOD *把*/BA 你 的 名字 写/V 清楚/C 。', 'Please write your name clearly.'],
      ['他/S *把*/BA 我 的 话 听/V 错/C 了/SF 。', 'He misheard what I said.'],
      ['你/S *把*/BA 汤 喝/V 完/C 吧/SF 。', 'Finish your soup.'],
      ['我/S 还/ADV 没/ADV *把*/BA 作文 写/V 完/C 。', "I haven't finished my essay yet."],
      ['孩子/S *把*/BA 房间 弄/V 乱/C 了/SF 。', 'The child made a mess of the room.'],
    ],
    decoys: [NOT_BEI],
  },
  {
    id: 'G3-59', unit: 8, title: '把 + object + V + 在 / 到 / 给 + X', titleZh: '把字句：在／到／给',
    summary: 'Moving a thing somewhere or to someone: 把书放在桌子上, 把钱还给他, 把车开到门口.',
    explanationMd: `
When you put, move or give a specific thing, Chinese strongly prefers 把:

- 把书放**在**桌子上 — put the book on the table.
- 把钱还**给**他 — give the money back to him.
- 把车开**到**门口 — drive the car to the door.

✗ 放书在桌子上 — the object can't sit between the verb and 在.`,
    formula: ['S', 'BA', 'V', 'C', 'SF'],
    constraints: [BA_BEFORE_V, { kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-57', 'G3-37'],
    errorCodes: ['BA.ORDER', 'COMP.PLACEMENT', 'LEX.COLLOCATION'],
    examples: [
      ['请/MOD *把*/BA 书 放/V 在/C 桌子 上 。', 'Please put the book on the table.'],
      ['我/S *把*/BA 钱 还@huan2/V 给/C 他 了/SF 。', 'I gave the money back to him.'],
      ['他/S *把*/BA 车 开/V 到/C 门口 了/SF 。', 'He drove the car up to the door.'],
    ],
    instances: [
      ['你/S *把*/BA 牛奶 放/V 在/C 冰箱 里 吧/SF 。', 'Put the milk in the fridge.'],
      ['我/S *把*/BA 照片 挂/V 在/C 墙 上 了/SF 。', 'I hung the photo on the wall.'],
      ['请/MOD 你/S *把*/BA 这 本 书 送/V 给/C #王=Wáng=Wang 老师 。', 'Please give this book to Teacher Wang.'],
      ['他/S *把*/BA 行李 搬/V 到/C 楼上 了/SF 。', 'He carried the luggage upstairs.'],
      ['别/ADV *把*/BA 垃圾 扔/V 在/C 地上 。', "Don't throw rubbish on the ground."],
      ['我/S *把*/BA 毛巾 放/V 在/C 洗手间 了/SF 。', 'I put the towel in the bathroom.'],
      ['妈妈/S *把*/BA 饺子 送/V 到/C 邻居 家 。', 'Mum took the dumplings round to the neighbours.'],
      ['你/S *把*/BA 钥匙 留/V 给/C 我 吧/SF 。', 'Leave the key with me.'],
    ],
    decoys: [
      ['在', 'LEX.COLLOCATION', '在 = where it ends up; check whether it should be 到 (moved to) or 给 (to a person).'],
      ['给', 'LEX.COLLOCATION', '给 = to a person; check whether it should be 在 or 到.'],
    ],
  },
  {
    id: 'G3-60', unit: 8, title: '把 + object + V + direction', titleZh: '把字句：趋向补语',
    summary: '把 with a direction says where the thing ends up moving: 把椅子搬进来, 把书拿出来.',
    explanationMd: `
**Form:** S + 把 + object + V + direction (进来, 出来, 上去, 回来…)

- 请把椅子搬**进来** — bring the chair in.
- 他把书拿**出来**了 — he took the book out.
- 你把箱子拿**上去**吧 — take the box up.`,
    formula: ['S', 'BA', 'V', 'C', 'SF'],
    constraints: [BA_BEFORE_V, { kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-57', 'G3-42'],
    errorCodes: ['BA.ORDER', 'COMP.DIRECTION'],
    examples: [
      ['请/MOD *把*/BA 椅子 搬/V 进来/C 。', 'Please bring the chair in.'],
      ['他/S *把*/BA 书 拿/V 出来/C 了/SF 。', 'He took the book out.'],
      ['你/S *把*/BA 箱子 拿/V 上去/C 吧/SF 。', 'Take the box upstairs.'],
    ],
    instances: [
      ['我/S *把*/BA 垃圾 拿/V 下去/C 了/SF 。', 'I took the rubbish downstairs.'],
      ['请/MOD *把*/BA 手机 拿/V 出来/C 。', 'Please take out your phones.'],
      ['他/S *把*/BA 自行车 骑/V 回来/C 了/SF 。', 'He rode the bike back.'],
      ['你/S *把*/BA 衣服 收/V 进来/C 吧/SF ， 要/ADV 下雨/V 了/SF 。', "Bring the washing in — it's about to rain."],
      ['妈妈/S *把*/BA 汤 拿/V 过来/C 了/SF 。', 'Mum brought the soup over.'],
      ['别/ADV *把*/BA 猫 带/V 进来/C 。', "Don't bring the cat in."],
      ['我/S *把*/BA 沙发 搬/V 过去@guoqu_v/C 了/SF 。', 'I moved the sofa over there.'],
      ['他/S *把*/BA 行李 提/V 上来/C 了/SF 。', 'He carried the luggage up.'],
    ],
    decoys: [
      ['出来', 'COMP.DIRECTION', 'Check the direction: in vs out, up vs down, towards vs away.'],
      ['进去', 'COMP.DIRECTION', 'Check the direction: in vs out, up vs down, towards vs away.'],
    ],
  },
  {
    id: 'G3-61', unit: 8, title: '把 + object + V + 成 (turn into)', titleZh: '把字句：V成',
    summary: '把…V成… changes something into something else: 把美元换成人民币, 把句子翻译成中文.',
    explanationMd: `
**Form:** S + 把 + A + V + **成** + B — turn A into B.

- 把美元换**成**人民币 — change dollars into RMB.
- 把这个句子翻译**成**中文 — translate this sentence into Chinese.
- 他把七点听**成**了十点 — he misheard seven as ten.`,
    formula: ['S', 'BA', 'V', 'C'],
    constraints: [BA_BEFORE_V, { kind: 'before', a: 'V', b: 'C', code: 'COMP.PLACEMENT' }],
    requires: ['G3-57', 'G3-39'],
    errorCodes: ['BA.ORDER', 'COMP.RESULT_CHOICE'],
    examples: [
      ['我/S 想/MOD *把*/BA 美元 换/V 成/C 人民币 。', "I'd like to change dollars into RMB."],
      ['请/MOD *把*/BA 这 个 句子 翻译/V 成/C 中文 。', 'Please translate this sentence into Chinese.'],
      ['他/S *把*/BA 七 点 听/V 成/C 了/ASP 十 点 。', 'He misheard seven as ten.'],
    ],
    instances: [
      ['我们/S *把*/BA 客厅 改/V 成/C 了/ASP 卧室 。', 'We turned the living room into a bedroom.'],
      ['你/S 能/MOD *把*/BA 这 张 照片 打印/V 成/C 大/O 一点儿 的 吗/SF ？', 'Can you print this photo bigger?'],
      ['她/S *把*/BA 西红柿 切/V 成/C 小 块 。', 'She cut the tomatoes into small pieces.'],
      ['我/S *把*/BA 会议 改/V 成/C 星期 三 了/SF 。', "I've moved the meeting to Wednesday."],
      ['他/S *把*/BA 我 看/V 成/C 了/ASP 我 哥哥 。', 'He mistook me for my older brother.'],
      ['请/MOD *把*/BA 人民币 换/V 成/C 美元 。', 'Please change the RMB into dollars.'],
      ['我/S 想/MOD *把*/BA 阳台 改/V 成/C 一 个 小 花园 。', "I'd like to turn the balcony into a little garden."],
      ['她/S *把*/BA 土豆 切/V 成/C 了/ASP 长 条 。', 'She cut the potatoes into strips.'],
    ],
    decoys: [['到', 'COMP.RESULT_CHOICE', '到 marks reaching a place; turning into something is 成.']],
  },
  {
    id: 'G3-62', unit: 8, title: 'Negatives, modals and time words go before 把', titleZh: '把字句中的否定和能愿动词',
    summary: '没 / 别 / 不 / 要 / 能 / 已经 come before 把, never between 把 and the verb: 别把门关上.',
    explanationMd: `
Anything that negates or qualifies the whole action sits **before 把**:

- 你**别**把门关上 — don't shut the door.
- 我**没**把作业带来 — I didn't bring the homework.
- 你**要**把药吃完 — you must finish the medicine.
- 他**已经**把房间整理好了.

✗ 把门别关上, ✗ 我把作业没带来.`,
    formula: ['S', 'ADV', 'BA', 'V', 'C'],
    constraints: [
      { kind: 'before', a: 'ADV', b: 'BA', code: 'BA.NEG_POSITION' },
      { kind: 'before', a: 'MOD', b: 'BA', code: 'BA.NEG_POSITION' },
      BA_BEFORE_V,
    ],
    requires: ['G3-58'],
    errorCodes: ['BA.NEG_POSITION', 'BA.ORDER'],
    examples: [
      ['你/S 别/ADV *把*/BA 门 关/V 上/C 。', "Don't shut the door."],
      ['我/S 没/ADV *把*/BA 作业 带/V 来/C 。', "I didn't bring my homework."],
      ['你/S 要/MOD *把*/BA 药 吃/V 完/C 。', 'You must finish the medicine.'],
    ],
    instances: [
      ['他/S 已经/ADV *把*/BA 房间 整理/V 好/C 了/SF 。', "He's already tidied the room."],
      ['我/S 还/ADV 没/ADV *把*/BA 钱 还@huan2/V 给/C 他 。', "I haven't paid him back yet."],
      ['你/S 应该/MOD *把*/BA 窗户 关/V 上/C 。', 'You should close the window.'],
      ['别/ADV *把*/BA 手机 放/V 在/C 床 上 。', "Don't leave your phone on the bed."],
      ['我/S 不/ADV 想/MOD *把*/BA 这 件 衣服 扔/V 了/SF 。', "I don't want to throw this away."],
      ['你/S 能/MOD *把*/BA 盐 给/V 我/O 吗/SF ？', 'Could you pass me the salt?'],
      ['他/S 没/ADV *把*/BA 我 的 话 记/V 住/C 。', "He didn't remember what I said."],
      ['明天/T 你/S 一定/ADV 要/MOD *把*/BA 护照 带/V 来/C 。', 'Be sure to bring your passport tomorrow.'],
    ],
    decoys: [['不', 'ASPECT.NEG_BU_MEI', 'For something that didn’t happen use 没; for "don’t" use 别.']],
    cloze: {
      blank: ['把'],
      distractors: [
        ['被', 'BEI.AGENT_ROLE', '被 would make the subject the one affected.'],
        ['给', 'LEX.COLLOCATION', 'The handled object takes 把, not 给.'],
      ],
    },
  },
  {
    id: 'G3-63', unit: 8, title: '把 rules: no bare verb, definite object, no potential form', titleZh: '把字句的限制',
    summary: 'A 把 sentence needs something after the verb, a specific object, and 能 instead of a potential complement.',
    explanationMd: `
Three things make a 把 sentence wrong:

1. **Bare verb:** ✗ 你把衣服洗 → ✓ 你把衣服洗**一下** / 洗**干净**.
2. **Indefinite object:** ✗ 把一本书拿来 (any book) → ✓ 把**那本**书拿来.
3. **Potential complement:** ✗ 我把作业写**得完** → ✓ 我**能**把作业写完.`,
    formula: ['S', 'MOD', 'BA', 'V', 'C'],
    constraints: [BA_BEFORE_V, { kind: 'before', a: 'MOD', b: 'BA', code: 'BA.NEG_POSITION' }],
    requires: ['G3-62', 'G3-49'],
    errorCodes: ['BA.BARE_VERB', 'BA.POTENTIAL_COMP'],
    examples: [
      ['我/S 能/MOD *把*/BA 作业 写/V 完/C 。', 'I can finish the homework.'],
      ['你/S *把*/BA 衣服 洗/V 一下/C 吧/SF 。', 'Give the clothes a wash.'],
      ['请/MOD *把*/BA 那 本 书 给/V 我/O 。', 'Please give me that book.'],
    ],
    instances: [
      ['我/S 今天/T 不/ADV 能/MOD *把*/BA 这 些 书 看/V 完/C 。', "I can't finish reading these books today."],
      ['他/S *把*/BA 车 停/V 在/C 楼下 了/SF 。', 'He parked the car downstairs.'],
      ['你/S *把*/BA 那 个 盒子 拿/V 过来/C 。', 'Bring that box over.'],
      ['我/S *把*/BA 菜 炒/V 好/C 了/SF 。', "I've finished stir-frying the vegetables."],
      ['你/S 能/MOD *把*/BA 这 个 箱子 搬/V 上去/C 吗/SF ？', 'Can you carry this box up?'],
      ['妈妈/S *把*/BA 肉 切/V 好/C 了/SF 。', 'Mum has cut the meat.'],
      ['请/MOD *把*/BA 你 的 卡 给/V 我/O 。', 'Please give me your card.'],
      ['我/S *把*/BA 汤 倒/V 在/C 碗 里 了/SF 。', 'I poured the soup into the bowl.'],
    ],
    decoys: [['得', 'BA.POTENTIAL_COMP', '把 can’t take a potential complement (写得完); use 能 before 把.']],
  },
  {
    id: 'G3-64', unit: 8, title: '把 + object + V一下 / VV / V了V', titleZh: '把字句：动词重叠／一下',
    summary: 'A quick action on a specific thing: 把房间收拾一下, 把手洗洗, 他把照片看了看.',
    explanationMd: `
一下, a doubled verb, or V了V count as "something after the verb", so they complete a 把 sentence and soften it:

- 你把房间收拾**一下** — tidy the room up a bit.
- 把手洗**洗** — give your hands a wash.
- 他把照片看**了看** — he glanced at the photos.`,
    formula: ['S', 'BA', 'V', 'C'],
    constraints: [BA_BEFORE_V],
    requires: ['G3-57', 'G3-32'],
    errorCodes: ['BA.BARE_VERB', 'BA.ORDER'],
    examples: [
      ['你/S *把*/BA 房间 收拾/V 一下/C 。', 'Tidy up the room a bit.'],
      ['请/MOD *把*/BA 你 的 名字 写/V 一下/C 。', 'Please write down your name.'],
      ['我/S *把*/BA 桌子 擦/V 了 擦 。', 'I gave the table a wipe.'],
    ],
    instances: [
      ['你/S *把*/BA 手 洗/V 洗 。', 'Give your hands a wash.'],
      ['请/MOD *把*/BA 这 个 句子 读/V 一下/C 。', 'Please read this sentence out.'],
      ['我/S *把*/BA 衣柜 整理/V 了/ASP 一下/C 。', 'I sorted out the wardrobe a bit.'],
      ['你/S *把*/BA 地板 擦/V 一下/C 吧/SF 。', 'Give the floor a wipe.'],
      ['他/S *把*/BA 照片 看/V 了 看 。', 'He glanced at the photos.'],
      ['我们/S *把*/BA 厨房 打扫/V 打扫 吧/SF 。', "Let's give the kitchen a clean."],
      ['你/S *把*/BA 这 件 衬衫 试/V 一下/C 。', 'Try this shirt on.'],
      ['你/S *把*/BA 行李 检查/V 一下/C 。', 'Check your luggage.'],
    ],
    transforms: [
      { subtype: 'rewrite', inputs: ['你 收拾 一下 房间 。'], chip: '把', answer: '你/S 把/BA 房间 收拾/V 一下/C 。', en: 'Tidy up the room a bit.', decoys: [NOT_BEI] },
      { subtype: 'rewrite', inputs: ['请 放 书 在 桌子 上 。'], chip: '把 (fix the order)', answer: '请/MOD 把/BA 书 放/V 在/C 桌子 上 。', en: 'Please put the book on the table.', decoys: [NOT_BEI] },
    ],
  },
];
