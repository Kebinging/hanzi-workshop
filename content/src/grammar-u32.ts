import type { PatternSource } from './authoring';

// HSK 5 · Unit 8 (unit 32) · 人物故事 Lives — Narrative aspect (provisional).

const ADV_POS = { kind: 'before', a: 'ADV', b: 'V', code: 'ORDER.ADVERB_POSITION' } as const;
const LIAO = '聊@liaotian=liáo';

export const patternsU32: PatternSource[] = [
  {
    id: 'G5-43', unit: 32, title: 'V来V去 (back and forth, over and over)', titleZh: 'V来V去',
    summary: 'V来V去 repeats an action again and again, often without result.',
    explanationMd: `
**Form:** Subject + V + **来** + V + **去**.

他想来想去，还是决定放弃 — "he thought it over and over, and in the end decided to give up".

- With movement verbs it is literal: 跑来跑去 (run back and forth).
- With 想, 找, 看, 说, 讨论 … it means doing it repeatedly, usually followed by the outcome.`,
    formula: ['S', 'V', 'P', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-41'],
    errorCodes: ['COMP.DIRECTION'],
    examples: [
      ['他/S 想/V *来* 想 *去* ， 还是/ADV 决定/V 放弃/V 。', 'He thought it over and over and decided to give up.'],
      ['孩子/S 在/PP 房间 里 跑/V *来* 跑 *去* 。', 'The child runs back and forth in the room.'],
      ['我/S 找/V *来* 找 *去* ， 也/ADV 没/ADV 找/V 到/C 那/O 本 传记 。', "I searched high and low but couldn't find that biography."],
    ],
    instances: [
      ['他/S 在/PP 门口 走/V *来* 走 *去* ， 很/ADV 着急/V 。', 'He paced up and down by the door, anxious.'],
      ['她/S 看/V *来* 看 *去* ， 还是/ADV 觉得/V 这/O 件 最 好 。', 'She looked them over again and again, and still liked this one best.'],
      ['我们/S 讨论/V *来* 讨论 *去* ， 也/ADV 没有/V 结果/O 。', 'We talked it round and round and got nowhere.'],
      ['鸟/S 在/PP 天空 中 飞/V *来* 飞 *去* 。', 'Birds fly back and forth in the sky.'],
      ['他/S 说/V *来* 说 *去* ， 就/ADV 是/V 不/ADV 想/MOD 去/V 。', "Whatever he says, the point is he doesn't want to go."],
      ['我/S 选/V *来* 选 *去* ， 最后/ADV 选/V 了/ASP 这/O 个 。', 'After going back and forth, I finally chose this one.'],
      ['他/S 改/V *来* 改 *去* ， 文章/S 还是/ADV 不/ADV 满意/V 。', "He revised it again and again but still wasn't happy with the essay."],
      ['小狗/S 在/PP 花园 里 跑/V *来* 跑 *去* 。', 'The puppy runs around the garden.'],
      ['我/S 想/V *来* 想 *去* ， 还是/ADV 不/ADV 明白/V 。', "I've thought and thought, and I still don't get it."],
      ['大家/S 争论/V *来* 争论 *去* ， 最后/ADV 还是/ADV 同意/V 了/SF 。', 'Everyone argued back and forth and finally agreed.'],
      ['他/S 写/V *来* 写 *去* ， 写/V 了/ASP 很/C 久 。', 'He wrote and rewrote for a long time.'],
      ['孩子/S 在/PP 床 上 跳/V *来* 跳 *去* 。', 'The child is jumping up and down on the bed.'],
      ['她/S 试/V *来* 试 *去* ， 也/ADV 没有/V 合适/O 的 。', "She tried on one after another, but nothing fitted."],
      ['他/S 在/PP 街 上 开/V *来* 开 *去* ， 找/V 停车场/O 。', 'He drove up and down the street looking for a car park.'],
      ['我/S 问/V *来* 问 *去* ， 也/ADV 没有/V 人/O 知道 。', 'I asked around, but nobody knew.'],
    ],
  },
  {
    id: 'G5-44', unit: 32, title: 'V着V着 (while V-ing, …)', titleZh: 'V着V着',
    summary: 'V着V着 sets a continuing action as background; something happens unexpectedly during it.',
    explanationMd: `
**Form:** Subject + V + **着** + V + **着**，(就 / 突然) + new event.

他说着说着，就哭了 — "as he was talking, he started crying".

- The second clause is unplanned: falling asleep, getting lost, bursting into tears.
- Often followed by 就, 突然 or 不由得.`,
    formula: ['S', 'V', 'P', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-94'],
    contrasts: ['G3-94'],
    errorCodes: ['ASPECT.ZHE_MISUSE'],
    examples: [
      ['他/S 说/V *着* 说 *着* ， 就/ADV 哭/V 了/SF 。', 'As he was talking, he started crying.'],
      ['孩子/S 看/V *着* 看 *着* ， 就/ADV 睡觉/V 了/SF 。', 'The child fell asleep while watching.'],
      ['我们/S 走/V *着* 走 *着* ， 天/S 黑/V 了/SF 。', 'As we walked on, it got dark.'],
    ],
    instances: [
      ['她/S 唱/V *着* 唱 *着* ， 突然/ADV 停/V 了/ASP 下来/C 。', 'In the middle of singing, she suddenly stopped.'],
      ['他/S 读/V *着* 读 *着* ， 不由得/ADV 感动/V 了/SF 。', 'As he read on, he was moved in spite of himself.'],
      [`我们/S ${LIAO}/V *着* ${LIAO} *着* ， 就/ADV 到/V 了/ASP 家/O 。`, 'We were home before we knew it, chatting away.'],
      ['他/S 想/V *着* 想 *着* ， 笑/V 了/SF 。', 'He smiled as he thought about it.'],
      ['她/S 写/V *着* 写 *着* ， 想/V 起/C 了 童年 。', 'As she wrote, she thought back to her childhood.'],
      ['孩子/S 玩/V *着* 玩 *着* ， 就/ADV 饿/V 了/SF 。', 'The child got hungry while playing.'],
      ['他/S 跑/V *着* 跑 *着* ， 腿/S 疼/V 了/SF 。', 'His leg started hurting as he ran.'],
      ['我/S 听/V *着* 听 *着* ， 不由得/ADV 想/V 起/C 了 往事 。', 'As I listened, memories came back.'],
      ['她/S 看/V *着* 看 *着* ， 眼泪/S 就/ADV 出来/V 了/SF 。', 'As she watched, tears came.'],
      ['他们/S 走/V *着* 走 *着* ， 迷路/V 了/SF 。', 'They got lost as they walked.'],
      ['他/S 说/V *着* 说 *着* ， 声音/S 越来越/ADV 小/V 。', 'As he went on talking, his voice grew quieter.'],
      ['我/S 等/V *着* 等 *着* ， 就/ADV 累/V 了/SF 。', 'I got tired of waiting.'],
      ['她/S 读/V *着* 读 *着* ， 忘/V 了/ASP 时间/O 。', 'She lost track of time as she read.'],
      ['孩子/S 哭/V *着* 哭 *着* ， 就/ADV 笑/V 了/SF 。', 'In the middle of crying, the child started laughing.'],
      ['我们/S 开/V *着* 开 *着* ， 下/V 起/C 了 雨 。', 'As we drove on, it started to rain.'],
    ],
  },
  {
    id: 'G5-45', unit: 32, title: '刚 … 就 … (no sooner … than …)', titleZh: '刚…就…',
    summary: '刚 A 就 B: B happened right after A had just happened.',
    explanationMd: `
**Form:** Subject + **刚** + A，(Subject) + **就** + B.

我刚到家，他就来了 — "I'd only just got home when he arrived".

- Stresses how close the two events were, often with surprise.
- Compare 一…就 (G3-16): 刚…就 is narrated about a single past occasion.`,
    formula: ['S', 'ADV', 'V', 'O', 'P', 'S', 'ADV', 'V'],
    constraints: [],
    requires: ['G3-07', 'G3-16'],
    contrasts: ['G3-16'],
    errorCodes: ['ORDER.ADVERB_POSITION'],
    examples: [
      ['我/S *刚*/ADV 到/V 家/O ， 他/S *就*/ADV 来/V 了/SF 。', "I'd only just got home when he arrived."],
      ['他/S *刚*/ADV 毕业/V *就*/ADV 找/V 到/C 了/ASP 工作/O 。', 'He found a job straight after graduating.'],
      ['她/S *刚*/ADV 出生/V ， 父亲/S *就*/ADV 去世/V 了/SF 。', 'Her father died just after she was born.'],
    ],
    instances: [
      ['我/S *刚*/ADV 出门/V *就*/ADV 下雨/V 了/SF 。', 'No sooner had I left than it started raining.'],
      ['他/S *刚*/ADV 当/V 上/C 经理/O *就*/ADV 遇到/V 了/ASP 挫折/O 。', 'He hit a setback as soon as he became manager.'],
      ['飞机/S *刚*/ADV 起飞/V ， 他/S *就*/ADV 睡觉/V 了/SF 。', 'He fell asleep as soon as the plane took off.'],
      ['我/S *刚*/ADV 说/V 完/C ， 大家/S *就*/ADV 笑/V 了/SF 。', 'I had hardly finished speaking when everyone laughed.'],
      ['他/S *刚*/ADV 回国/V *就*/ADV 开始/V 工作/O 了 。', 'He started work as soon as he came back to China.'],
      ['我/S *刚*/ADV 坐/V 下/C ， 他/S *就*/ADV 来/V 找/V 我/O 了 。', 'I had only just sat down when he came looking for me.'],
      ['她/S *刚*/ADV 开始/V 学/V 钢琴/O ， *就*/ADV 表现/V 出/C 了 才能 。', 'She showed her talent as soon as she started piano.'],
      ['电影/S *刚*/ADV 开始/V ， 他/S *就*/ADV 走/V 了/SF 。', 'He left just after the film started.'],
      ['他/S *刚*/ADV 获得/V 荣誉/O ， *就*/ADV 更/ADV 努力/V 了/SF 。', 'As soon as he won the honour, he worked even harder.'],
      ['我/S *刚*/ADV 打开/V 门/O ， 小狗/S *就*/ADV 跑/V 出去/C 了/SF 。', 'The moment I opened the door, the puppy ran out.'],
      ['她/S *刚*/ADV 到/V 北京/O *就*/ADV 生病/V 了/SF 。', 'She fell ill as soon as she got to Beijing.'],
      ['我/S *刚*/ADV 想/V 给/PP 你 打 电话 ， 你/S *就*/ADV 来/V 了/SF 。', 'I was just about to call you when you turned up.'],
      ['他/S *刚*/ADV 结婚/V *就*/ADV 出国/V 了/SF 。', 'He went abroad right after the wedding.'],
      ['我/S *刚*/ADV 准备/V 睡觉/V ， 天/S *就*/ADV 亮/V 了/SF 。', 'I was just getting ready for bed when day broke.'],
      ['他/S *刚*/ADV 开始/V 讲/V 故事/O ， 孩子/S *就*/ADV 笑/V 了/SF 。', 'The children laughed as soon as he began the story.'],
    ],
  },
  {
    id: 'G5-46', unit: 32, title: '总算 (at long last, finally)', titleZh: '总算',
    summary: '总算 marks a hoped-for result that came after a long wait or great effort.',
    explanationMd: `
**Form:** Subject + **总算** + verb phrase (+ 了).

等了三个小时，车总算来了 — "after a three-hour wait, the bus finally came".

- Like 终于 (G3-91), with an extra sense of relief ("at least it happened").
- Compare **差点儿** (G4-29): nearly happened; 总算: did happen, at last.`,
    formula: ['S', 'ADV', 'V', 'SF'],
    constraints: [ADV_POS],
    requires: ['G3-91'],
    contrasts: ['G3-91', 'G4-29'],
    errorCodes: ['ORDER.ADVERB_POSITION', 'LEX.NEAR_SYNONYM'],
    examples: [
      ['等/V 了/ASP 三/C 个 小时 ， 车/S *总算*/ADV 来/V 了/SF 。', 'After a three-hour wait, the bus finally came.'],
      ['经过/T 很 多 挫折 ， 他/S *总算*/ADV 成功/V 了/SF 。', 'After many setbacks, he finally succeeded.'],
      ['这/S 个 问题 *总算*/ADV 解决/V 了/SF 。', 'This problem is finally solved.'],
    ],
    instances: [
      ['我/S *总算*/ADV 明白/V 了/SF 。', 'At last I understand.'],
      ['他/S 奋斗/V 了/ASP 十/C 年 ， *总算*/ADV 实现/V 了/ASP 梦想/O 。', 'After ten years of striving, he finally realised his dream.'],
      ['雨/S *总算*/ADV 停/V 了/SF 。', 'The rain has stopped at last.'],
      ['她/S *总算*/ADV 找/V 到/C 了/ASP 一/O 个 好 工作 。', 'She has finally found a good job.'],
      ['考试/S *总算*/ADV 结束/V 了/SF 。', 'The exams are finally over.'],
      ['经过/T 努力 ， 他/S *总算*/ADV 获得/V 了/ASP 荣誉/O 。', 'Through hard work, he finally won recognition.'],
      ['我们/S *总算*/ADV 到/V 家/O 了 。', "We're home at last."],
      ['他/S 的 病 *总算*/ADV 好/V 了/SF 。', 'He has finally recovered.'],
      ['她/S 犹豫/V 了/ASP 很/C 久 ， *总算*/ADV 做/V 了/ASP 决定/O 。', 'After dithering for ages, she finally made up her mind.'],
      ['这/S 本 传记 我/S *总算*/ADV 看/V 完/C 了/SF 。', "I've finally finished this biography."],
      ['孩子/S *总算*/ADV 睡觉/V 了/SF 。', 'The child is asleep at last.'],
      ['他/S *总算*/ADV 赢得/V 了/ASP 大家/O 的 尊重 。', "He has finally earned everyone's respect."],
      ['我们/S *总算*/ADV 见/V 到/C 了/ASP 那/O 位 英雄 。', 'We finally got to meet that hero.'],
      ['他/S 等/V 了/ASP 很/C 久 ， 机会/S *总算*/ADV 来/V 了/SF 。', 'He waited a long time, and his chance finally came.'],
      ['经过/T 很 多 年 ， 他/S *总算*/ADV 回/V 到/C 了 家乡/O 。', 'After many years, he finally returned to his home town.'],
    ],
    cloze: {
      blank: ['总算'],
      distractors: [
        ['差点儿', 'LEX.NEAR_SYNONYM', '差点儿 = nearly (but it didn’t happen); 总算 = it happened at last.'],
        ['未必', 'LEX.NEAR_SYNONYM', '未必 = not necessarily.'],
      ],
    },
  },
  {
    id: 'G5-47', unit: 32, title: '偶然 (by chance)', titleZh: '偶然',
    summary: '偶然 = by chance, accidentally; as an adjective, "accidental".',
    explanationMd: `
**Form:** Subject + **偶然** + verb phrase · or … 很 / 是 **偶然** (的).

我偶然在图书馆看到了这本传记 — "I came across this biography in the library by chance".

- The opposite of 必然 (inevitable) and of **果然** (as expected).
- Don't confuse with **偶尔** (occasionally): 偶然 is about chance, not frequency.`,
    formula: ['S', 'ADV', 'V', 'O'],
    constraints: [],
    requires: ['G5-01'],
    contrasts: ['G5-01'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['我/S *偶然*/ADV 在/PP 图书馆 看/V 到/C 了/ASP 这/O 本 传记 。', 'I came across this biography in the library by chance.'],
      ['他们/S 是/V 在/PP 火车 上 *偶然*/ADV 认识/V 的/SF 。', 'They met by chance on a train.'],
      ['这/S 个 发现 很/ADV *偶然*/V 。', 'This discovery was accidental.'],
    ],
    instances: [
      ['我/S *偶然*/ADV 遇到/V 了/ASP 以前 的 同学/O 。', 'I ran into an old classmate by chance.'],
      ['他/S 的 成功 不/ADV 是/V *偶然*/O 的 。', 'His success was no accident.'],
      ['她/S *偶然*/ADV 听/V 到/C 了/ASP 这/O 个 消息 。', 'She heard this news by chance.'],
      ['这/S 不/ADV 是/V 一/O 次 *偶然* 的 机会 。', 'This was no chance opportunity.'],
      ['我/S *偶然*/ADV 发现/V 了/ASP 他/O 的 才华 。', 'I discovered his talent by chance.'],
      ['他/S *偶然*/ADV 看/V 到/C 了/ASP 一/O 个 广告 ， 改变/V 了/ASP 命运/O 。', 'He saw an advert by chance, and it changed his life.'],
      ['我们/S *偶然*/ADV 在/PP 街头 遇到/V 了/SF 。', 'We bumped into each other in the street.'],
      ['这/S 个 机会 来/V 得/C 很 *偶然* 。', 'This opportunity came about by chance.'],
      ['他/S *偶然*/ADV 想/V 到/C 了/ASP 一/O 个 好 主意 。', 'He hit on a good idea by chance.'],
      ['她/S *偶然*/ADV 发现/V 了/ASP 自己/O 的 才能 。', 'She discovered her own talent by chance.'],
      ['那/S 次 见面 很/ADV *偶然*/V 。', 'That meeting was pure chance.'],
      ['我/S *偶然*/ADV 打开/V 了/ASP 那/O 本 书 。', 'I opened that book by chance.'],
      ['他们/S 的 认识 很/ADV *偶然*/V 。', 'They met quite by chance.'],
      ['我/S *偶然*/ADV 看/V 见/C 了/ASP 他/O 小时候 的 照片 。', 'I happened to see a photo of him as a child.'],
      ['这/S 次 失误 不/ADV 是/V *偶然*/O 的 。', 'This mistake was no accident.'],
    ],
    cloze: {
      blank: ['偶然'],
      distractors: [
        ['果然', 'LEX.NEAR_SYNONYM', '果然 = as expected — the opposite of by chance.'],
        ['当然', 'LEX.NEAR_SYNONYM', '当然 = of course.'],
      ],
    },
  },
  {
    id: 'G5-48', unit: 32, title: '时而 … 时而 … (now … now …)', titleZh: '时而…时而…',
    summary: '时而 A，时而 B: alternating between two states (written).',
    explanationMd: `
**Form:** Subject + **时而** + A，**时而** + B.

天气时而晴，时而阴 — "the weather keeps switching between sun and cloud".

- The written counterpart of 一会儿…一会儿 (G4-58).
- Each 时而 goes right before its verb or adjective.`,
    formula: ['S', 'ADV', 'V', 'P', 'ADV', 'V'],
    constraints: [ADV_POS],
    requires: ['G4-58'],
    contrasts: ['G4-58'],
    errorCodes: ['ORDER.ADVERB_POSITION'],
    examples: [
      ['天气/S *时而*/ADV 晴/V ， *时而*/ADV 阴/V 。', 'The weather keeps switching between sun and cloud.'],
      ['他/S *时而*/ADV 笑/V ， *时而*/ADV 哭/V 。', 'He laughed one moment and cried the next.'],
      ['音乐/S *时而*/ADV 快/V ， *时而*/ADV 慢/V 。', 'The music speeds up and slows down.'],
    ],
    instances: [
      ['他/S 的 心情 *时而*/ADV 好/V ， *时而*/ADV 坏/V 。', 'His mood swings between good and bad.'],
      ['她/S *时而*/ADV 看/V 书/O ， *时而*/ADV 看/V 窗户/O 外面 。', 'She alternates between her book and the window.'],
      ['风/S *时而*/ADV 大/V ， *时而*/ADV 小/V 。', 'The wind keeps rising and falling.'],
      ['他/S 的 一生 *时而*/ADV 顺利/V ， *时而*/ADV 艰难/V 。', 'His life went through good times and hard times.'],
      ['雨/S *时而*/ADV 大/V ， *时而*/ADV 小/V 。', 'The rain keeps getting heavier and lighter.'],
      ['这/S 个 故事 的 情节 *时而*/ADV 有意思/V ， *时而*/ADV 让/V 人/O 难过 。', "The story's plot is sometimes fun, sometimes sad."],
      ['孩子/S *时而*/ADV 跑/V ， *时而*/ADV 跳/V 。', 'The child runs, then jumps.'],
      ['他/S *时而*/ADV 自豪/V ， *时而*/ADV 迷茫/V 。', 'He swings between pride and confusion.'],
      ['路/S *时而*/ADV 宽/V ， *时而*/ADV 窄/V 。', 'The road keeps widening and narrowing.'],
      ['她/S 说话 的 声音 *时而*/ADV 高/V ， *时而*/ADV 低/V 。', 'Her voice keeps rising and falling as she speaks.'],
      ['船/S *时而*/ADV 近/V ， *时而*/ADV 远/V 。', 'The boat drifts closer, then further away.'],
      ['他/S *时而*/ADV 工作/V ， *时而*/ADV 休息/V 。', 'He alternates between work and rest.'],
      ['灯光/S *时而*/ADV 亮/V ， *时而*/ADV 暗/V 。', 'The lights keep brightening and dimming.'],
      ['我们/S 的 关系 *时而*/ADV 好/V ， *时而*/ADV 不/ADV 好/V 。', 'Our relationship has its ups and downs.'],
      ['她/S *时而*/ADV 唱歌/V ， *时而*/ADV 跳舞/V 。', 'She sings, then dances.'],
    ],
  },
];
