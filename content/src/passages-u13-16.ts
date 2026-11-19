import type { PassageSrc } from './authoring';

// Reading passages, HSK 4 units 13–16 (spec 2.4): A 150–220 chars, B 220–320, review 250–350.

const LI = '#小李=XiǎoLǐ=Xiao_Li';
const WANG = '#小王=XiǎoWáng=Xiao_Wang';
const LILI = '#丽丽=Lìlì=Lili';
const DAVID = '#大卫=Dàwèi=David';

export const passagesU13to16: PassageSrc[] = [
  // ---------------- Unit 13 ----------------
  {
    id: 'U13-A', unit: 13, title: '我的新工作', titleEn: 'My new job', genre: 'diary',
    patternIds: ['G4-01', 'G4-04', 'G4-05', 'G4-06'],
    paragraphs: [
      '{time 上 个 月 } {mod 一 家 } 公司 在 招聘 ， 我 就 去 应聘 了 。 我 从来 没 做 过 {mod 这 种 } 工作 ， 所以 简历 写 {comp 得 很 简单 } 。 没 想 到 ， 经理 竟然 让 我 去 面试 了 。',
      '面试 并 不 难 。 经理 问 了 {mod 我 的 } 专业 ， 还 问 我 能 不 能 适应 加班 。 我 说 ： “ 我 曾经 在 银行 工作 过 ， {time 那 时候 } 往往 要 工作 到 很 晚 ， 我 能 适应 。 ”',
      '{time 第二天 } 公司 给 我 打 电话 ， 说 我 可以 去 上班 了 。 我 高兴 {comp 极 了 } ！ 现在 我 负责 {mod 公司 的 } 文件 和 合同 ， 收入 也 比 以前 高 。',
      '我 知道 自己 的 经验 还 很 少 ， 所以 每 天 都 认真 学习 。 我 要 保证 按时 完成 {mod 每 个 } 任务 。',
    ],
    questions: [
      { type: 'truth', stem: '“ 我 ” 以前 做 过 这 种 工作 吗 ？', options: ['没 做 过', '做 过 很 多 次', '做 过 一 次'], answer: 0,
        why: '我从来没做过这种工作.', evidence: ['我从来没做过这种工作'] },
      { type: 'referent', stem: '“ 我 能 适应 ” ， 适应 什么 ？', options: ['加班', '面试', '简历'], answer: 0,
        why: 'The manager asked whether I could cope with overtime.', evidence: ['还问我能不能适应加班'] },
      { type: 'function', stem: '“ 经理 竟然 让 我 去 面试 了 ” 的 “ 竟然 ” 是 什么 意思 ？', options: ['“ 我 ” 没 想 到', '“ 我 ” 很 生气', '经理 很 忙'], answer: 0,
        why: '竟然 marks a surprise — the CV was very simple.', evidence: ['经理竟然让我去面试了'] },
      { type: 'truth', stem: '现在 “ 我 ” 负责 什么 ？', options: ['文件 和 合同', '招聘', '面试'], answer: 0,
        why: '现在我负责公司的文件和合同.', evidence: ['现在我负责公司的文件和合同'] },
    ],
  },
  {
    id: 'U13-B', unit: 13, title: '同事小李', titleEn: 'My colleague Xiao Li', genre: 'story',
    patternIds: ['G4-01', 'G4-02', 'G4-03', 'G4-04', 'G4-05', 'G4-06'],
    paragraphs: [
      `{mod 我们 部门 的 } 同事 ${LI} 是 {mod 一 个 很 优秀 的 } 人 。 他 工作 很 有 效率 ， 从来 不 迟到 ， 也 从来 不 让 顾客 失望 。`,
      `{time 上 个 星期 } ， 经理 让 他 三 天 完成 {mod 一 个 很 大 的 } 任务 。 大家 都 说 ： “ 三 天 ？ 难道 经理 不 知道 这 个 任务 有 多 难 吗 ？ ”`,
      `可是 ${LI} 竟然 两 天 就 完成 了 ！ 他 每 天 早上 七 点 就 到 公司 ， 先 复印 材料 ， 然后 给 顾客 发 传真 。`,
      `我 问 他 ： “ 你 到底 是 怎么 做 到 的 ？ ” 他 笑 着 说 ： “ 其实 并 不 难 ， 要 及时 ， 也 要 有 方法 。 ” 经理 很 满意 ， 给 了 他 {mod 很 多 } 奖金 。`,
      '现在 大家 都 想 跟 他 学习 。 我 也 要 积累 经验 ， 继续 努力 。',
      '他 还 说 ： “ 有 问题 要 及时 问 。 公司 提供 了 很 多 材料 ， 你 可以 先 看 一下 。 正式 工作 以前 ， 要 先 适应 一下 。 ” 我 觉得 他 说 {comp 得 很 对 } 。',
    ],
    questions: [
      { type: 'truth', stem: `${LI} 迟到 吗 ？`, options: ['从来 不 迟到', '往往 迟到', '有时候 迟到'], answer: 0,
        why: '从来不迟到.', evidence: ['从来不迟到'] },
      { type: 'inference', stem: '大家 觉得 这 个 任务 怎么样 ？', options: ['太 难 了', '很 简单', '很 有意思'], answer: 0,
        why: 'The rhetorical 难道…吗 means "surely the manager knows how hard it is".', evidence: ['难道经理不知道这个任务有多难吗'] },
      { type: 'truth', stem: `${LI} 用 了 几 天 完成 任务 ？`, options: ['两 天', '三 天', '一 天'], answer: 0,
        why: '竟然两天就完成了.', evidence: ['竟然两天就完成了'] },
      { type: 'truth', stem: `${LI} 觉得 完成 任务 难 吗 ？`, options: ['并 不 难', '非常 难', '有点儿 难'], answer: 0,
        why: '其实并不难.', evidence: ['其实并不难'] },
      { type: 'referent', stem: '“ 给 了 他 很 多 奖金 ” 的 “ 他 ” 是 谁 ？', options: [LI, '经理', '“ 我 ”'], answer: 0,
        why: 'The manager rewarded Xiao Li.', evidence: ['给了他很多奖金'] },
    ],
  },

  // ---------------- Unit 14 ----------------
  {
    id: 'U14-A', unit: 14, title: '吵架以后', titleEn: 'After the quarrel', genre: 'diary',
    patternIds: ['G4-07', 'G4-09', 'G4-10', 'G4-11'],
    paragraphs: [
      '{time 昨天 } 我 跟 {mod 最 好 的 } 朋友 吵架 了 。 原因 很 简单 ： 他 跟 我 开玩笑 ， 我 生气 了 。',
      '妈妈 说 ： “ 既然 你们 是 好 朋友 ， 就 应该 互相 理解 。 即使 他 不 对 ， 你 也 要 耐心 一点儿 。 ”',
      '我 想 了 很 久 。 尽管 我 很 生气 ， 可是 我 也 知道 ， 他 是 {mod 一 个 很 善良 的 } 人 ， 他 并 不 想 让 我 难过 。',
      '{time 今天 } 我 主动 给 他 打 电话 道歉 。 他 说 ： “ 没关系 ， 是 我 不 好 。 以后 我 不 开玩笑 了 ， 要不然 你 又 会 生气 的 。 ” 我们 都 笑 了 。',
      '我 觉得 ， 友谊 比 什么 都 重要 。 即使 我们 的 性格 不 一样 ， 也 能 互相 理解 。',
    ],
    questions: [
      { type: 'inference', stem: '他们 为什么 吵架 ？', options: ['朋友 开玩笑', '朋友 迟到 了', '朋友 不 道歉'], answer: 0,
        why: '他跟我开玩笑，我生气了.', evidence: ['他跟我开玩笑'] },
      { type: 'function', stem: '妈妈 说 “ 既然 你们 是 好 朋友 ” ， 意思 是 ：', options: ['你们 是 好 朋友 ， 所以 要 互相 理解', '你们 不 是 朋友', '你们 应该 吵架'], answer: 0,
        why: '既然 starts from a known fact and draws a conclusion.', evidence: ['既然你们是好朋友'] },
      { type: 'truth', stem: '谁 先 道歉 的 ？', options: ['“ 我 ”', '朋友', '妈妈'], answer: 0,
        why: '我主动给他打电话道歉.', evidence: ['我主动给他打电话道歉'] },
      { type: 'referent', stem: '“ 他 并 不 想 让 我 难过 ” 的 “ 他 ” 是 谁 ？', options: ['朋友', '妈妈', '爸爸'], answer: 0,
        why: 'The friend, described as kind.', evidence: ['他并不想让我难过'] },
    ],
  },
  {
    id: 'U14-B', unit: 14, title: '交朋友的建议', titleEn: 'Tips for making friends', genre: 'explanation',
    patternIds: ['G4-07', 'G4-08', 'G4-11', 'G4-12'],
    paragraphs: [
      '{time 刚 到 一 个 陌生 的 地方 } ， 很 多 人 都 会 紧张 。 不管 你 的 性格 怎么样 ， 这 几 个 建议 都 能 帮 你 。',
      '第一 ， 要 主动 。 即使 你 很 害羞 ， 也 要 先 跟 别人 说话 。 除非 你 自己 不 想 交 朋友 ， 否则 一定 能 交 到 朋友 。',
      '%第二 ， 要 尊重 对方 。 无论 对方 的 年龄 多 大 ， 你 都 要 有 礼貌 。 别 太 骄傲 ， 要不然 大家 会 讨厌 你 。',
      '%第三 ， 要 诚实 。 有 误会 的 时候 ， 要 及时 说 清楚 ， 否则 会 有 更 多 矛盾 。 朋友 的 感情 需要 信任 和 理解 。',
      '最后 ， 别 忘 了 你 的 父亲 和 母亲 。 不管 多 忙 ， 都 要 给 他们 打 电话 。 他们 永远 支持 你 。',
      '我 也 曾经 是 {mod 一 个 很 害羞 的 } 人 ， 可是 后来 交 到 了 很 多 朋友 。 交 朋友 并 不 难 ， 只要 你 主动 一点儿 ， 就 会 有 很 多 人 陪 你 。',
    ],
    questions: [
      { type: 'gist', stem: '这 些 建议 是 给 谁 的 ？', options: ['刚 到 一 个 陌生 地方 的 人', '老师', '父母'], answer: 0,
        why: 'The first paragraph names the reader.', evidence: ['刚到一个陌生的地方'] },
      { type: 'function', stem: '“ 除非 你 自己 不 想 交 朋友 ， 否则 一定 能 交 到 朋友 ” 的 意思 是 ：', options: ['想 交 朋友 就 能 交 到', '交 朋友 很 难', '不 要 交 朋友'], answer: 0,
        why: 'Unless you don’t want to, you will make friends.', evidence: ['否则一定能交到朋友'] },
      { type: 'truth', stem: '太 骄傲 会 怎么样 ？', options: ['大家 会 讨厌 你', '大家 会 喜欢 你', '没有 关系'], answer: 0,
        why: '别太骄傲，要不然大家会讨厌你.', evidence: ['要不然大家会讨厌你'] },
      { type: 'inference', stem: '有 误会 的 时候 ， 应该 怎么 做 ？', options: ['及时 说 清楚', '不 说话', '吵架'], answer: 0,
        why: '要及时说清楚.', evidence: ['要及时说清楚'] },
    ],
  },

  // ---------------- Unit 15 ----------------
  {
    id: 'U15-A', unit: 15, title: '租房子', titleEn: 'Renting a flat', genre: 'diary',
    patternIds: ['G4-13', 'G4-14', 'G4-15', 'G4-18'],
    paragraphs: [
      '我 想 租 一 个 房子 ， 看 了 两 个 。 第一 个 离 公司 很 近 ， 可是 房租 比 %第二 个 还 贵 。 %第二 个 不如 第一 个 方便 ， 但是 又 大 又 便宜 。',
      '我 一直 很 犹豫 ， 不 知道 选 哪 个 。 朋友 说 ： “ 与其 每 天 浪费 时间 坐 车 ， 不如 多 花 一点儿 钱 。 ” 妈妈 说 ： “ 你 刚 工作 ， 收入 不 高 ， 应该 节省 一点儿 。 ”',
      '我 考虑 了 很 久 ， 最后 决定 ： 我 宁可 每 天 早 一点儿 起床 ， 也 不 想 花 那么 多 钱 。 我 觉得 这 个 选择 是 正确 的 ， 不 会 后悔 。',
      '虽然 房子 有点儿 远 ， 但是 我 可以 顺便 在 路上 看 书 。',
    ],
    questions: [
      { type: 'truth', stem: '第一 个 房子 怎么样 ？', options: ['近 ， 可是 贵', '远 ， 可是 便宜', '又 大 又 便宜'], answer: 0,
        why: '离公司很近，可是房租比第二个还贵.', evidence: ['第一个离公司很近'] },
      { type: 'referent', stem: '“ 不如 多 花 一点儿 钱 ” 是 谁 说 的 ？', options: ['朋友', '妈妈', '“ 我 ”'], answer: 0,
        why: 'The friend recommends paying more.', evidence: ['朋友说'] },
      { type: 'inference', stem: '“ 我 ” 最后 选 了 哪 个 房子 ？', options: ['%第二 个', '第一 个', '都 没 选'], answer: 0,
        why: 'I would rather get up early than pay so much — the cheaper, further one.', evidence: ['也不想花那么多钱'] },
      { type: 'truth', stem: '妈妈 为什么 让 “ 我 ” 节省 一点儿 ？', options: ['收入 不 高', '房子 太 小', '朋友 不 同意'], answer: 0,
        why: '你刚工作，收入不高.', evidence: ['收入不高'] },
    ],
  },
  {
    id: 'U15-B', unit: 15, title: '出国还是工作？', titleEn: 'Study abroad or work?', genre: 'dialogue',
    patternIds: ['G4-13', 'G4-14', 'G4-16', 'G4-17'],
    paragraphs: [
      `${LILI} ： ${DAVID} ， 你 毕业 以后 打算 做 什么 ？ 申请 研究生 ， 还是 找 工作 ？`,
      `${DAVID} ： 我 还 在 考虑 。 我 想 出国 读 硕士 ， 可是 出国 要 花 很 多 钱 。 跟 在 这儿 读 相比 ， 出国 贵 多 了 。`,
      `${LILI} ： 可是 出国 的 好处 也 很 明显 啊 。 你 可以 学 好 外语 ， 还 能 了解 不同 的 文化 。`,
      `${DAVID} ： 我 也 考虑 过 先 工作 两 年 ， 可是 工作 以后 ， 往往 很 难 再 回 学校 读 。`,
      `${DAVID} ： 你 说 得 对 。 不过 现在 工作 一 年 比 一 年 难 找 ， 我 担心 读 完 以后 找 不 到 工作 。`,
      `${LILI} ： 与其 担心 ， 不如 先 确定 一 个 目标 。 你 主要 想 做 什么 ？`,
      `${DAVID} ： 我 的 目标 是 当 大学 老师 ， 所以 至少 要 读 到 博士 。`,
      `${LILI} ： 那 就 别 犹豫 了 ！ 千万 别 放弃 这 个 机会 。 我 宁可 晚 两 年 工作 ， 也 要 做 自己 喜欢 的 事情 。`,
      `${DAVID} ： 好 ， 我 今天 就 开始 准备 申请 ！`,
    ],
    questions: [
      { type: 'truth', stem: `${DAVID} 想 出国 读 什么 ？`, options: ['硕士', '大学', '汉语'], answer: 0,
        why: '我想出国读硕士.', evidence: ['我想出国读硕士'] },
      { type: 'inference', stem: `${DAVID} 为什么 犹豫 ？`, options: ['出国 要 花 很 多 钱', '他 不 喜欢 外语', `${LILI} 不 同意`], answer: 0,
        why: '可是出国要花很多钱.', evidence: ['可是出国要花很多钱'] },
      { type: 'truth', stem: `${DAVID} 的 目标 是 什么 ？`, options: ['当 大学 老师', '当 经理', '找 工作'], answer: 0,
        why: '我的目标是当大学老师.', evidence: ['我的目标是当大学老师'] },
      { type: 'function', stem: '“ 千万 别 放弃 ” 的 意思 是 ：', options: ['一定 不 要 放弃', '可以 放弃', '放弃 一 千 次'], answer: 0,
        why: '千万别 = on no account.', evidence: ['千万别放弃这个机会'] },
      { type: 'inference', stem: `最后 ${DAVID} 决定 做 什么 ？`, options: ['准备 申请', '找 工作', '回 家'], answer: 0,
        why: '我今天就开始准备申请.', evidence: ['我今天就开始准备申请'] },
    ],
  },
  {
    id: 'R15', unit: 15, review: true, title: '小王辞职了', titleEn: 'Xiao Wang quits', genre: 'story',
    patternIds: ['G4-01', 'G4-02', 'G4-04', 'G4-08', 'G4-10', 'G4-13', 'G4-15', 'G4-16', 'G4-17'],
    paragraphs: [
      `${WANG} 在 {mod 一 家 大 } 公司 工作 了 五 年 。 工资 不 少 ， 奖金 也 多 ， 大家 都 很 羡慕 他 。 可是 {time 上 个 月 } ， 他 竟然 辞职 了 ！`,
      `同事 都 问 他 ： “ 这么 好 的 工作 ， 你 为什么 不 要 了 ？ 难道 你 找 到 了 更 好 的 吗 ？ ” ${WANG} 说 ： “ 并 没有 。 跟 收入 相比 ， 我 觉得 健康 更 重要 。 ”`,
      `原来 ， ${WANG} 的 压力 一 天 比 一 天 大 。 他 每 天 加班 到 很 晚 ， 周末 也 往往 要 工作 。 尽管 他 很 努力 ， 可是 身体 越来越 不 好 。`,
      '他 的 父母 本来 反对 他 辞职 ， 可是 后来 也 理解 了 。 母亲 说 ： “ 与其 每 天 这么 累 ， 不如 换 {mod 一 个 轻松 一点儿 的 } 工作 。 无论 你 做 什么 ， 我们 都 支持 你 。 ”',
      `现在 ${WANG} 在 {mod 一 个 小 } 公司 工作 。 虽然 收入 不如 以前 多 ， 但是 他 每 天 都 很 高兴 ， 也 有 时间 锻炼 了 。`,
      '我 问 他 ： “ 你 后悔 吗 ？ ” 他 说 ： “ 一点儿 也 不 后悔 。 以前 我 总是 很 累 ， 现在 我 觉得 很 轻松 。 ”',
    ],
    questions: [
      { type: 'truth', stem: `大家 为什么 羡慕 ${WANG} ？`, options: ['工资 和 奖金 多', '他 很 健康', '他 辞职 了'], answer: 0,
        why: '工资不少，奖金也多.', evidence: ['工资不少'] },
      { type: 'inference', stem: `${WANG} 为什么 辞职 ？`, options: ['压力 太 大 ， 身体 不 好', '找 到 了 更 好 的 工作', '不 喜欢 同事'], answer: 0,
        why: 'His pressure grew daily and his health got worse.', evidence: ['可是身体越来越不好'] },
      { type: 'truth', stem: `${WANG} 的 父母 本来 同意 他 辞职 吗 ？`, options: ['不 同意', '同意', '不 知道'], answer: 0,
        why: '他的父母本来反对他辞职.', evidence: ['他的父母本来反对他辞职'] },
      { type: 'function', stem: '“ 并 没有 ” 的 意思 是 ：', options: ['他 没有 找 到 更 好 的 工作', '他 很 生气', '他 有 很 多 钱'], answer: 0,
        why: '并没有 denies what the colleagues assumed.', evidence: ['并没有'] },
      { type: 'truth', stem: `现在 ${WANG} 的 收入 怎么样 ？`, options: ['不如 以前 多', '比 以前 多', '跟 以前 一样'], answer: 0,
        why: '虽然收入不如以前多.', evidence: ['虽然收入不如以前多'] },
    ],
  },

  // ---------------- Unit 16 ----------------
  {
    id: 'U16-A', unit: 16, title: '怎么记生词？', titleEn: 'How to remember new words', genre: 'explanation',
    patternIds: ['G4-19', 'G4-20', 'G4-22', 'G4-24'],
    paragraphs: [
      '很 多 人 觉得 学 汉语 {mod 最 大 的 } 困难 是 记 生词 。 其实 ， 记 生词 既 要 有 方法 ， 也 要 有 规律 。',
      '首先 ， 要 重复 。 {mod 我们 的 } 记忆 往往 不 太 好 ， {mod 学 过 的 } 词语 很 快 就 忘 了 。 由于 这 个 原因 ， 我们 要 每 天 复习 。',
      '其次 ， 要 多 用 。 你 可以 通过 写 文章 、 跟 朋友 聊天 来 练习 新 词语 。 用 {comp 得 越 多 } ， 记 {comp 得 越 清楚 } 。',
      '最后 ， 要 看 例子 。 比如 “ 掌握 ” 这 个 词 ， 只@zhi3 看 意思 不 够 ， 要 看 它 在 句子 里 怎么 用 ， 才 能 真 的 掌握 。',
      '记 生词 并 不 是 {mod 一 件 很 难 的 } 事情 ， 只要 方法 正确 ， 就 一定 会 有 效果 。',
    ],
    questions: [
      { type: 'gist', stem: '这 篇 文章 主要 讲 什么 ？', options: ['怎么 记 生词', '怎么 写 文章', '怎么 聊天'], answer: 0,
        why: 'Every paragraph is a tip for remembering new words.', evidence: ['记生词既要有方法'] },
      { type: 'truth', stem: '为什么 要 每 天 复习 ？', options: ['学 过 的 词语 很 快 就 忘 了', '老师 要求', '考试 很 难'], answer: 0,
        why: '学过的词语很快就忘了.', evidence: ['学过的词语很快就忘了'] },
      { type: 'sequence', stem: '文章 先 说 了 什么 ， 然后 说 了 什么 ？', options: ['重复', '多 用', '看 例子'], answer: [0, 1, 2],
        why: '首先 → 其次 → 最后.', evidence: ['首先', '其次', '最后'] },
      { type: 'function', stem: '“ 用 得 越 多 ， 记 得 越 清楚 ” 的 意思 是 ：', options: ['多 用 就 能 记 住', '用 得 太 多 不 好', '不 用 也 能 记 住'], answer: 0,
        why: '越…越: the more you use them, the better you remember.', evidence: ['用得越多'] },
    ],
  },
  {
    id: 'U16-B', unit: 16, title: '一次讲座', titleEn: 'A lecture', genre: 'diary',
    patternIds: ['G4-19', 'G4-20', 'G4-21', 'G4-22', 'G4-23'],
    paragraphs: [
      '{time 上 个 星期 } ， 学校 请 了 一 位 教授 来 讲 “ 语言 和 文化 ” 。 我 对 这 个 题目 很 有 兴趣 ， 于是 就 报名 了 。',
      '讲座 很 精彩 。 教授 说 ， 学 语言 一 方面 要 掌握 语法 和 词语 ， 另 一 方面 也 要 了解 文化 。 由于 {mod 不同 国家 的 } 人 有 不同 的 习惯 ， 因此 {mod 一样 的 } 话 ， 意思 可能 不同 。',
      '他 给 了 我们 很 多 例子 ， 既 有意思 又 容易 懂 。 比如 ， 中国 人 说 “ 你 吃 了 吗 ？ ” ， 往往 并 不 是 真 的 想 请 你 吃 饭 。',
      '通过 这 次 讲座 ， 我 明白 了 ： 沟通 不 只@zhi3 是 说 对 句子 ， 还 要 表达 {comp 得 合适 } 。 我 打算 {time 下 个 学期 } 选 一 门 文化 课程 。',
      '{time 讲座 结束 以后 } ， 我 还 写 了 一 篇 总结 ， 老师 说 {mod 我 的 } 观点 很 清楚 。',
      '教授 还 说 ， 学 语言 要 有 耐心 ， 进步 往往 很 慢 。 我 觉得 这 次 讲座 对 我 的 帮助 很 大 ， 以后 有 讲座 我 还 要 去 听 。',
    ],
    questions: [
      { type: 'inference', stem: '“ 我 ” 为什么 去 听 讲座 ？', options: ['对 这 个 题目 有 兴趣', '老师 让 去', '朋友 是 教授'], answer: 0,
        why: '我对这个题目很有兴趣，于是就报名了.', evidence: ['我对这个题目很有兴趣'] },
      { type: 'truth', stem: '教授 觉得 学 语言 还 要 做 什么 ？', options: ['了解 文化', '只@zhi3 学 语法', '只@zhi3 多 说'], answer: 0,
        why: '另一方面也要了解文化.', evidence: ['另一方面也要了解文化'] },
      { type: 'function', stem: '中国 人 说 “ 你 吃 了 吗 ？ ” ， 往往 是 什么 意思 ？', options: ['不 是 真 的 请 你 吃 饭', '想 请 你 吃 饭', '问 你 饿 不 饿'], answer: 0,
        why: '往往并不是真的想请你吃饭.', evidence: ['往往并不是真的想请你吃饭'] },
      { type: 'truth', stem: '下 个 学期 “ 我 ” 打算 做 什么 ？', options: ['选 一 门 文化 课程', '去 中国', '当 教授'], answer: 0,
        why: '我打算下个学期选一门文化课程.', evidence: ['选一门文化课程'] },
    ],
  },
];
