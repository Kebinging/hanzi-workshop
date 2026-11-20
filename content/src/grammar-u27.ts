import type { PatternSource } from './authoring';

// HSK 5 · Unit 3 (unit 27) · 经济生活 Money & markets — Purpose & consequence (provisional).

export const patternsU27: PatternSource[] = [
  {
    id: 'G5-13', unit: 27, title: '以便 (so that, in order to)', titleZh: '以便',
    summary: '以便 starts a second clause giving the purpose the first action makes easier.',
    explanationMd: `
**Form:** action，**以便** + purpose.

请留下电话号码，以便我们联系你 — "please leave your number so that we can contact you".

- Written style; the purpose is something *positive* that becomes easier.
- Compare **以免** (G5-14): so as to *avoid* something; and **为了** (G3-86), which comes first.`,
    formula: ['S', 'V', 'O', 'P', 'CONJ2', 'V'],
    constraints: [],
    requires: ['G3-86'],
    contrasts: ['G5-14', 'G3-86'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['请/MOD 留/V 下/C 电话 号码/O ， *以便*/CONJ2 我们/S 联系/V 你/O 。', 'Please leave your phone number so that we can contact you.'],
      ['公司/S 做/V 了/ASP 预算/O ， *以便*/CONJ2 节省/V 成本/O 。', 'The company drew up a budget so as to save costs.'],
      ['他/S 把/BA 每 天 的 支出 都 记/V 下来/C ， *以便*/CONJ2 计算/V 一/O 个 月 用 了 多少 钱 。', 'He notes down his spending every day so he can work out the monthly total.'],
    ],
    instances: [
      ['我们/S 要/MOD 了解/V 市场/O ， *以便*/CONJ2 生产/V 合适/O 的 产品 。', 'We need to understand the market so we can make the right products.'],
      ['请/MOD 留/V 好/C 发票/O ， *以便*/CONJ2 以后/T 换/V 。', 'Keep the receipt so you can exchange it later.'],
      ['他/S 去/V 银行/O 开/V 了/ASP 账户/O ， *以便*/CONJ2 存/V 钱/O 。', 'He opened an account at the bank so he could save.'],
      ['工厂/S 提前/ADV 生产/V ， *以便*/CONJ2 按时/ADV 供应/V 。', 'The factory produces in advance so it can supply on time.'],
      ['商店/S 早上/T 八 点 开始 营业/V ， *以便*/CONJ2 上班/S 的 人 买/V 早饭/O 。', 'The shop opens at eight so commuters can buy breakfast.'],
      ['我们/S 要/MOD 做/V 好/C 预算/O ， *以便*/CONJ2 减少/V 支出/O 。', 'We need a proper budget so we can cut spending.'],
      ['他/S 学/V 了/ASP 外语/O ， *以便*/CONJ2 做/V 国际/O 贸易 。', 'He learned a foreign language so he could work in international trade.'],
      ['请/MOD 把/BA 账单 发/V 给/C 我 ， *以便*/CONJ2 我/S 付款/V 。', 'Please send me the bill so I can pay.'],
      ['公司/S 降低/V 了/ASP 价格/O ， *以便*/CONJ2 增加/V 销售/O 。', 'The company cut prices to boost sales.'],
      ['我们/S 要/MOD 研究/V 需求/O ， *以便*/CONJ2 改进/V 产品/O 。', 'We need to study demand so we can improve the product.'],
      ['他/S 买/V 了/ASP 保险/O ， *以便*/CONJ2 减少/V 风险/O 。', 'He took out insurance to reduce his risk.'],
      ['农民/S 早上/T 把/BA 水果 送/V 到/C 市场 ， *以便*/CONJ2 卖/V 个 好 价钱/O 。', 'Farmers take their fruit to market in the morning so they get a good price.'],
      ['银行/S 给/V 他/O 贷款 ， *以便*/CONJ2 他/S 创业/V 。', 'The bank gave him a loan so he could start a business.'],
      ['我/S 把/BA 存款 放/V 在/C 两 个 账户 里 ， *以便*/CONJ2 管理/V 。', 'I keep my savings in two accounts to make them easier to manage.'],
      ['请/MOD 提前/ADV 告诉/V 我们/O ， *以便*/CONJ2 我们/S 准备/V 。', 'Please tell us in advance so we can prepare.'],
    ],
    cloze: {
      blank: ['以便'],
      distractors: [
        ['以免', 'LEX.NEAR_SYNONYM', '以免 = so as NOT to (avoiding something bad); 以便 = so that something good can happen.'],
        ['因为', 'LEX.NEAR_SYNONYM', '因为 gives a cause, not a purpose.'],
      ],
    },
  },
  {
    id: 'G5-14', unit: 27, title: '以免 (so as not to, lest)', titleZh: '以免',
    summary: '以免 starts a second clause naming the bad outcome the first action avoids.',
    explanationMd: `
**Form:** precaution，**以免** + bad outcome.

请检查一下账单，以免出错 — "please check the bill so there are no mistakes".

- The clause after 以免 is something *unwanted*.
- Opposite direction to **以便** (G5-13).`,
    formula: ['S', 'V', 'O', 'P', 'CONJ2', 'V'],
    constraints: [],
    requires: ['G5-13'],
    contrasts: ['G5-13'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['出门/V 要/MOD 带/V 伞/O ， *以免*/CONJ2 衣服/S 被 雨 弄/V 湿/C 。', 'Take an umbrella when you go out so your clothes don’t get wet.'],
      ['投资/V 要/MOD 小心/V ， *以免*/CONJ2 损失/S 太/ADV 大/V 。', 'Be careful when investing, so as not to lose too much.'],
      ['请/MOD 检查/V 一下/C 账单/O ， *以免*/CONJ2 出/V 错/O 。', 'Please check the bill so there are no mistakes.'],
    ],
    instances: [
      ['把/BA 钱 存/V 在/C 银行 里 ， *以免*/CONJ2 丢/V 了/SF 。', 'Put the money in the bank so you don’t lose it.'],
      ['买/V 东西/O 要/MOD 看/V 清楚/C 价格/O ， *以免*/CONJ2 多/ADV 花/V 钱/O 。', 'Check prices when you shop, so you don’t overspend.'],
      ['他/S 每/T 天 都 看 股票 ， *以免*/CONJ2 有/V 损失/O 。', 'He checks his shares every day to avoid losses.'],
      ['我们/S 要/MOD 节省/V 支出/O ， *以免*/CONJ2 超过/V 预算/O 。', 'We must cut spending so we don’t go over budget.'],
      ['请/MOD 收/V 好/C 发票/O ， *以免*/CONJ2 丢/V 了/SF 。', 'Keep the receipt safe so it doesn’t get lost.'],
      ['借/V 钱/O 要/MOD 小心/V ， *以免*/CONJ2 利息/S 太/ADV 高/V 。', 'Be careful when borrowing, so the interest isn’t too high.'],
      ['工厂/S 要/MOD 注意/V 安全/O ， *以免*/CONJ2 出/V 事故/O 。', 'Factories must watch safety to prevent accidents.'],
      ['你/S 最好/ADV 买/V 保险/O ， *以免*/CONJ2 有/V 风险/O 。', "You'd better get insurance, to be safe."],
      ['公司/S 不/ADV 敢/MOD 提高/V 价格/O ， *以免*/CONJ2 顾客/S 减少/V 。', "The company daren't raise prices in case customers drop off."],
      ['他/S 把/BA 密码 记/V 下来/C ， *以免*/CONJ2 忘记/V 。', 'He wrote down the password so as not to forget it.'],
      ['请/MOD 早/ADV 一点儿 付款/V ， *以免*/CONJ2 影响/V 交易/O 。', 'Please pay early so the deal isn’t affected.'],
      ['我们/S 要/MOD 多/ADV 了解/V 市场/O ， *以免*/CONJ2 产品/S 卖/V 不 出去 。', 'We should learn more about the market so the product doesn’t fail to sell.'],
      ['他/S 不/ADV 用/V 信用卡/O ， *以免*/CONJ2 花/V 太/O 多 钱 。', "He doesn't use credit cards, so as not to overspend."],
      ['不/ADV 要/MOD 把/BA 所有 的 钱 都 拿/V 去/C 投资 ， *以免*/CONJ2 破产/V 。', "Don't put all your money into investments, or you could go bankrupt."],
      ['请/MOD 提前/ADV 预订/V ， *以免*/CONJ2 没有/V 位置/O 。', 'Please book ahead so you don’t miss out on a place.'],
    ],
    cloze: {
      blank: ['以免'],
      distractors: [
        ['以便', 'LEX.NEAR_SYNONYM', '以便 introduces a goal to reach; 以免 something bad to avoid.'],
        ['所以', 'LEX.NEAR_SYNONYM', '所以 gives a result, not a precaution.'],
      ],
    },
  },
  {
    id: 'G5-15', unit: 27, title: '从而 (thereby, and so)', titleZh: '从而',
    summary: '从而 introduces the result achieved by the action in the first clause.',
    explanationMd: `
**Form:** action / measure，**从而** + result achieved.

公司降低了成本，从而增加了利润 — "the company cut costs, thereby raising profits".

- Written style. The subject of both clauses is usually the same.
- 从而 links method → result; **因而** (G5-16) links cause → effect more generally.`,
    formula: ['S', 'V', 'O', 'P', 'CONJ2', 'V', 'O'],
    constraints: [],
    requires: ['G4-20'],
    contrasts: ['G5-16'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['公司/S 降低/V 了/ASP 成本/O ， *从而*/CONJ2 增加/V 了/ASP 利润/O 。', 'The company cut costs, thereby raising profits.'],
      ['他/S 改进/V 了/ASP 方法/O ， *从而*/CONJ2 提高/V 了/ASP 效率/O 。', 'He improved his methods and so raised his efficiency.'],
      ['我们/S 要/MOD 节约/V 水/O ， *从而*/CONJ2 保护/V 环境/O 。', 'We should save water and so protect the environment.'],
    ],
    instances: [
      ['政府/S 改善/V 了/ASP 交通/O ， *从而*/CONJ2 发展/V 了/ASP 经济/O 。', 'The government improved transport and thereby developed the economy.'],
      ['工厂/S 增加/V 了/ASP 工人/O ， *从而*/CONJ2 提高/V 了/ASP 生产/O 。', 'The factory took on more workers and so raised production.'],
      ['他/S 通过/PP 投资 赚/V 了/ASP 很/O 多 钱 ， *从而*/CONJ2 变/V 得/C 富裕 。', 'He made a lot of money investing and so became well-off.'],
      ['商店/S 打折/V ， *从而*/CONJ2 吸引/V 了/ASP 很/O 多 顾客 。', 'The shop held a sale and so drew in lots of customers.'],
      ['他们/S 改进/V 了/ASP 产品/O ， *从而*/CONJ2 增加/V 了/ASP 销售/O 。', 'They improved the product and thereby increased sales.'],
      ['银行/S 降低/V 了/ASP 利息/O ， *从而*/CONJ2 让/V 更/O 多 人 贷款 。', 'The bank lowered interest rates, so more people took out loans.'],
      ['公司/S 做/V 了/ASP 广告/O ， *从而*/CONJ2 让/V 品牌/O 更 有名 。', 'The company advertised and so made its brand better known.'],
      ['农民/S 种@zhong4v/V 了/ASP 新/O 的 水果 ， *从而*/CONJ2 收入/S 增加/V 了/SF 。', 'The farmers planted new fruit and so their income rose.'],
      ['他/S 节省/V 了/ASP 支出/O ， *从而*/CONJ2 存/V 了/ASP 很/O 多 钱 。', 'He cut his spending and so saved a lot.'],
      ['国家/S 发展/V 了/ASP 贸易/O ， *从而*/CONJ2 经济/S 越来越/ADV 繁荣/V 。', 'The country developed trade and so the economy flourished.'],
      ['他们/S 减少/V 了/ASP 风险/O ， *从而*/CONJ2 减少/V 了/ASP 损失/O 。', 'They reduced their risks and thereby their losses.'],
      ['公司/S 改善/V 了/ASP 服务/O ， *从而*/CONJ2 有/V 了/ASP 更/O 多 客户 。', 'The company improved its service and so gained more clients.'],
      ['我们/S 研究/V 了/ASP 需求/O ， *从而*/CONJ2 生产/V 出/C 了 好 产品 。', 'We studied demand and so came up with a good product.'],
      ['物价/S 下降/V 了/SF ， *从而*/CONJ2 消费/S 增加/V 了/SF 。', 'Prices fell, and so spending rose.'],
      ['他/S 学/V 会/C 了/ASP 新/O 技能 ， *从而*/CONJ2 找/V 到/C 了/ASP 好/O 工作 。', 'He learned a new skill and so found a good job.'],
    ],
    cloze: {
      blank: ['从而'],
      distractors: [
        ['但是', 'LEX.NEAR_SYNONYM', '但是 marks a contrast; 从而 introduces the result achieved.'],
        ['否则', 'LEX.NEAR_SYNONYM', '否则 = otherwise.'],
      ],
    },
  },
  {
    id: 'G5-16', unit: 27, title: '因而 (hence, as a result)', titleZh: '因而',
    summary: '因而 introduces a consequence of the situation described before.',
    explanationMd: `
**Form:** cause / situation，**因而** + consequence.

物价上升了，因而大家都减少了消费 — "prices went up, and as a result people spent less".

- Written equivalent of 所以; the subjects of the two clauses can differ.
- Compare **从而** (G5-15): a method leading to an achieved result.`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G3-83'],
    contrasts: ['G5-15', 'G3-83'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['物价/S 上升/V 了/SF ， *因而*/CONJ2 大家/S 都/ADV 减少/V 了/ASP 消费/O 。', 'Prices went up, and as a result people spent less.'],
      ['这/S 家 公司 管理/V 得/C 很 好 ， *因而*/CONJ2 利润/S 很/ADV 高/V 。', 'This company is well run, and hence very profitable.'],
      ['他/S 没有/V 资金/O ， *因而*/CONJ2 不/ADV 能/MOD 创业/V 。', "He has no funds, so he can't start a business."],
    ],
    instances: [
      ['市场/S 的 需求 很/ADV 大/V ， *因而*/CONJ2 价格/S 上升/V 了/SF 。', 'Demand is high, so prices have gone up.'],
      ['他/S 投资/V 失败/V 了/SF ， *因而*/CONJ2 损失/V 了/ASP 很/O 多 钱 。', 'His investment failed and he lost a lot of money as a result.'],
      ['这儿/S 交通 方便 ， *因而*/CONJ2 商业/S 很/ADV 繁荣/V 。', 'Transport here is convenient, so business is booming.'],
      ['成本/S 太/ADV 高/V ， *因而*/CONJ2 工厂/S 破产/V 了/SF 。', 'Costs were too high, so the factory went bankrupt.'],
      ['产品/S 的 质量 好/V ， *因而*/CONJ2 销售/S 很/ADV 好/V 。', 'The product is good quality, so it sells well.'],
      ['他/S 没有/V 买/V 保险/O ， *因而*/CONJ2 损失/S 很/ADV 大/V 。', "He had no insurance, so his losses were heavy."],
      ['汇率/S 变化/V 了/SF ， *因而*/CONJ2 进口/S 的 东西 贵/V 了/SF 。', 'The exchange rate changed, so imported goods became dearer.'],
      ['他们/S 很/ADV 节约/V ， *因而*/CONJ2 存款/S 越来越/ADV 多/V 。', 'They are thrifty, so their savings keep growing.'],
      ['贷款/S 的 利息 太/ADV 高/V ， *因而*/CONJ2 很/S 少 人 贷款/V 。', 'Loan interest is too high, so few people borrow.'],
      ['这/S 个 品牌 很/ADV 有名/V ， *因而*/CONJ2 价格/S 比较/ADV 高/V 。', 'This brand is well known, so its prices are fairly high.'],
      ['经济/S 出现/V 了/ASP 危机/O ， *因而*/CONJ2 很/S 多 人 失业/V 了/SF 。', 'The economy went into crisis, and many people lost their jobs.'],
      ['这/S 家 饭馆 很/ADV 实惠/V ， *因而*/CONJ2 顾客/S 很/ADV 多/V 。', 'This restaurant is good value, so it has lots of customers.'],
      ['他/S 经营/V 得/C 很 好 ， *因而*/CONJ2 企业/S 发展/V 得/C 很 快 。', 'He runs it well, so the business has grown fast.'],
      ['贸易/S 增加/V 了/SF ， *因而*/CONJ2 工厂/S 需要/V 更/O 多 工人 。', 'Trade has grown, so factories need more workers.'],
      ['税/S 提高/V 了/SF ， *因而*/CONJ2 商品/S 也/ADV 贵/V 了/SF 。', 'Taxes went up, so goods became more expensive too.'],
    ],
    cloze: {
      blank: ['因而'],
      distractors: [
        ['然而', 'LEX.NEAR_SYNONYM', '然而 = however; 因而 = hence.'],
        ['而且', 'LEX.NEAR_SYNONYM', '而且 adds a point; 因而 gives the consequence.'],
      ],
    },
  },
  {
    id: 'G5-17', unit: 27, title: '进而 (and then, going further)', titleZh: '进而',
    summary: '进而 introduces a further step built on the first one.',
    explanationMd: `
**Form:** first step，**进而** + further step.

我们要了解市场，进而改进产品 — "we need to understand the market and then go on to improve the product".

- The second step goes *beyond* the first and depends on it.
- Often with 先 in the first clause: 先…，进而….`,
    formula: ['S', 'ADV', 'V', 'O', 'P', 'CONJ2', 'V', 'O'],
    constraints: [],
    requires: ['G3-09'],
    contrasts: ['G3-09', 'G5-15'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['他/S 先/ADV 在/PP 网上 卖/V 东西/O ， *进而*/CONJ2 开/V 了/ASP 一/O 家 公司 。', 'He first sold things online and then went on to open a company.'],
      ['我们/S 要/MOD 了解/V 市场/O ， *进而*/CONJ2 改进/V 产品/O 。', 'We need to understand the market and then improve the product.'],
      ['先/ADV 降低/V 成本/O ， *进而*/CONJ2 提高/V 利润/O 。', 'First cut costs, then go on to raise profits.'],
    ],
    instances: [
      ['他/S 学/V 会/C 了/ASP 经营/O ， *进而*/CONJ2 开始/V 创业/O 。', 'He learned how to run a business and then started his own.'],
      ['公司/S 先/ADV 在/PP 中国 销售/V ， *进而*/CONJ2 发展/V 国际/O 贸易 。', 'The company sold in China first and then expanded into international trade.'],
      ['收入/S 增加/V 了/SF ， *进而*/CONJ2 消费/S 也/ADV 增加/V 了/SF 。', 'Incomes rose, and spending rose in turn.'],
      ['他/S 发现/V 了/ASP 问题/O ， *进而*/CONJ2 找/V 到/C 了/ASP 原因/O 。', 'He spotted the problem and went on to find its cause.'],
      ['我们/S 先/ADV 做/V 预算/O ， *进而*/CONJ2 决定/V 投资/O 多少 。', 'We draw up a budget first, then decide how much to invest.'],
      ['农民/S 先/ADV 种@zhong4v/V 水果/O ， *进而*/CONJ2 开/V 了/ASP 工厂/O 。', 'The farmers grew fruit first and then went on to open a factory.'],
      ['物价/S 上升/V ， *进而*/CONJ2 影响/V 了/ASP 大家/O 的 生活 。', "Prices rose, which in turn affected everyone's lives."],
      ['他/S 先/ADV 当/V 工人/O ， *进而*/CONJ2 当/V 上/C 了 经理/O 。', 'He started as a worker and went on to become a manager.'],
      ['银行/S 先/ADV 了解/V 客户/O 的 需求 ， *进而*/CONJ2 提供/V 服务/O 。', "The bank first learns what clients need, then provides the service."],
      ['品牌/S 有名/V 了/SF ， *进而*/CONJ2 产品/S 的 价值 也/ADV 提高/V 了/SF 。', 'The brand became famous, and the products became more valuable in turn.'],
      ['他/S 先/ADV 存/V 钱/O ， *进而*/CONJ2 买/V 了/ASP 房子/O 。', 'He saved first and then bought a flat.'],
      ['我们/S 要/MOD 研究/V 损失/O 的 原因 ， *进而*/CONJ2 减少/V 风险/O 。', 'We need to study why we lost money and go on to reduce our risk.'],
      ['公司/S 先/ADV 改善/V 了/ASP 待遇/O ， *进而*/CONJ2 吸引/V 了/ASP 优秀/O 的 员工 。', 'The company improved conditions first and then attracted excellent staff.'],
      ['他/S 先/ADV 了解/V 行业/O ， *进而*/CONJ2 找/V 到/C 了/ASP 机会/O 。', 'He got to know the industry first and then found his opportunity.'],
      ['经济/S 发展/V 了/SF ， *进而*/CONJ2 大家/S 的 生活 也/ADV 富裕/V 了/SF 。', "The economy grew, and people's lives became more comfortable in turn."],
    ],
    cloze: {
      blank: ['进而'],
      distractors: [
        ['否则', 'LEX.NEAR_SYNONYM', '否则 = otherwise; 进而 = and then further.'],
        ['但是', 'LEX.NEAR_SYNONYM', '但是 marks a contrast.'],
      ],
    },
  },
  {
    id: 'G5-18', unit: 27, title: '由此可见 (from this we can see)', titleZh: '由此可见',
    summary: '由此可见 draws a general conclusion from the facts just given.',
    explanationMd: `
**Form:** facts / evidence，**由此可见**，conclusion.

很多人都买这个品牌，由此可见它的质量很好 — "lots of people buy this brand, which shows its quality is good".

- A formal version of **可见** (G4-68), typical of essays and reports.
- It opens the concluding clause, often followed by a comma.`,
    formula: ['S', 'V', 'P', 'CONJ2', 'S', 'V'],
    constraints: [],
    requires: ['G4-68'],
    contrasts: ['G4-68'],
    errorCodes: ['LEX.NEAR_SYNONYM'],
    examples: [
      ['很/S 多 人 都/ADV 买/V 这/O 个 品牌 ， *由此可见*/CONJ2 它/S 的 质量 很/ADV 好/V 。', 'Lots of people buy this brand, which shows its quality is good.'],
      ['工厂/S 一 年 就 破产 了 ， *由此可见*/CONJ2 经营/S 很/ADV 重要/V 。', 'The factory went bankrupt within a year — clearly management matters.'],
      ['物价/S 一直 在 上升 ， *由此可见*/CONJ2 经济/S 有/V 问题/O 。', 'Prices keep rising, which shows the economy has problems.'],
    ],
    instances: [
      ['这/S 家 饭馆 每 天 都 有 很 多 人 排队 ， *由此可见*/CONJ2 菜/S 很/ADV 好吃/V 。', 'People queue at this restaurant every day, so the food must be good.'],
      ['他/S 十 年 就 存 了 很 多 钱 ， *由此可见*/CONJ2 他/S 很/ADV 节约/V 。', 'He saved a lot in ten years, which shows how thrifty he is.'],
      ['投资/S 的 人 越来越 多 ， *由此可见*/CONJ2 大家/S 都/ADV 想/MOD 赚/V 钱/O 。', 'More and more people invest, which shows everyone wants to make money.'],
      ['这/S 个 产品 卖 得 很 好 ， *由此可见*/CONJ2 需求/S 很/ADV 大/V 。', 'This product sells well, which shows demand is high.'],
      ['他/S 的 公司 越来越 大 ， *由此可见*/CONJ2 他/S 很/ADV 会/MOD 经营/V 。', 'His company keeps growing — clearly he knows how to run a business.'],
      ['很/S 多 工厂 都 关 门 了 ， *由此可见*/CONJ2 经济/S 出现/V 了/ASP 危机/O 。', 'Many factories have closed, which shows the economy is in crisis.'],
      ['优惠/S 的 时候 人 特别 多 ， *由此可见*/CONJ2 价格/S 很/ADV 重要/V 。', 'Crowds come when there are discounts — price clearly matters.'],
      ['他/S 每 个 月 都 超过 预算 ， *由此可见*/CONJ2 他/S 不/ADV 会/MOD 管理/V 钱/O 。', "He goes over budget every month — clearly he can't manage money."],
      ['贷款/S 的 人 减少 了 ， *由此可见*/CONJ2 利息/S 太/ADV 高/V 了/SF 。', 'Fewer people are borrowing, which shows interest is too high.'],
      ['这/S 个 行业 的 工人 越来越 多 ， *由此可见*/CONJ2 它/S 发展/V 得/C 很 快 。', 'More and more people work in this industry, which shows how fast it is growing.'],
      ['大家/S 都 在 网上 买 东西 ， *由此可见*/CONJ2 网上/S 购物 很/ADV 方便/V 。', 'Everyone shops online, which shows how convenient it is.'],
      ['那/S 家 公司 破产 了 ， *由此可见*/CONJ2 投资/S 有/V 风险/O 。', 'That company went bankrupt, which shows investing carries risk.'],
      ['进口/S 的 东西 越来越 多 ， *由此可见*/CONJ2 贸易/S 越来越/ADV 繁荣/V 。', 'There are more and more imported goods, which shows trade is thriving.'],
      ['这/S 个 农民 富裕 了 ， *由此可见*/CONJ2 农村/S 也/ADV 在/ADV 发展/V 。', 'This farmer has become well-off, which shows the countryside is developing too.'],
      ['他/S 一直 赔偿 别人 的 损失 ， *由此可见*/CONJ2 他/S 很/ADV 诚实/V 。', "He has always compensated others for their losses, which shows he's honest."],
    ],
    cloze: {
      blank: ['由此可见'],
      distractors: [
        ['例如', 'LEX.NEAR_SYNONYM', '例如 introduces an example, not a conclusion.'],
        ['另外', 'LEX.NEAR_SYNONYM', '另外 adds a point; 由此可见 draws the conclusion.'],
      ],
    },
  },
];
