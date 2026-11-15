# 汉字工坊 · HSK 3 Reading & Grammar Workshop
## System & Learning Specification — v0.1 (draft for approval)

> Personal, single-user, 100% offline PWA for New HSK Level 3 (reading, character recognition, active grammar construction).
> This document is the single source of truth for implementation. Every rule is written so it can be turned directly into code and tests. Normative words: **MUST**, **SHOULD**, **MAY**.

---

## 0. Scope, assumptions & glossary

### 0.1 In scope
- Reading comprehension, Hanzi recognition (meaning + form discrimination), active sentence/grammar construction.
- HSK 1–2 foundation repair (diagnostic + bridge queue) and the full HSK 3 increment.
- Offline-only operation, local persistence, JSON backup/restore.

### 0.2 Explicitly out of scope
Speaking, listening, audio/TTS, handwriting/stroke drills, accounts, sync, cloud, social features, streaks-as-currency, coins, hearts, leaderboards, notifications that guilt-trip. The only "progress" shown is measured mastery (see §1.6).

### 0.3 Syllabus scope (decided 2026-11-15)
- **Scope now runs HSK 1 → HSK 5.** The learner starts at HSK 3; HSK 1–2 is handled only by the diagnostic + bridge queue (§1.2). HSK 3 is the first full course (§2); HSK 4 and HSK 5 follow as further courses with the same machinery.
- HSK 3 target figures: **1,000 cumulative words (HSK 1–2 = 500, HSK 3 = 500 new)**, **587 cumulative recognition characters**, **96 Level-3 grammar points**.
- **No official list file is available**, so word and grammar lists are compiled by Claude from standard HSK material and every item carries `provisional: true`. If an official list turns up later, a reconciliation pass replaces/renames items via `content/renames.json` without breaking user progress.
- The system is **syllabus-agnostic**: all counts live in `content/syllabus.json`, never hard-coded. `HskLevel` is `1 | 2 | 3 | 4 | 5`.
- HSK 4 and HSK 5 unit maps are specified in detail before their milestones (M5, M6); they reuse every schema and exercise type unchanged.

### 0.4 Platform (decided 2026-11-15)
- **Android only** (Chrome / installed WebAPK). No iOS/Safari workarounds.
- Android's system CJK font (Noto Sans CJK SC) is used directly — no bundled font.
- Hosted once on **GitHub Pages** (public repo) for installation; afterwards fully offline.

### 0.5 Glossary
| Term | Meaning |
|---|---|
| **Item** | A learnable unit: a word (`VocabItem`), a character (`CharItem`), or a grammar pattern (`GrammarPattern`). |
| **Facet** | One testable aspect of an item, which owns exactly one FSRS card (e.g. a word's *recognition* facet). |
| **Known** | A facet whose FSRS retrievability ≥ `R_KNOWN` (0.85) *now*, or a diagnostic-confirmed item. |
| **Exposure pool** | All words the coverage gate treats as known (§1.1.2). |
| **Token** | One pre-segmented word in a sentence/passage. Segmentation is authored, never computed at runtime. |
| **Instance** | A concrete sentence drawn from a grammar pattern (authored or generated). |
| **Attempt** | One learner response to one exercise instance. |

---

## 1. Pedagogical philosophy & cognitive learning loop

### 1.1 Comprehensible input (i+1) & the vocabulary coverage gate

**Principle.** Reading research (Hu & Nation 2000; Laufer 1989; Schmitt et al. 2011) shows unassisted comprehension requires ~95–98% known-token coverage. Every piece of text the app shows — exercise sentences, distractors, feedback examples, passages — passes through one gate.

#### 1.1.1 Token classes
Each authored token carries a `kind`:
| kind | Counted in coverage? | Notes |
|---|---|---|
| `word` | yes | Normal lexical token, linked to a `VocabItem.id`. |
| `target` | no (exempt) | The "+1": the word(s) or grammar marker(s) the exercise is teaching. |
| `name` | no | Proper names (人名/地名) — always rendered with pinyin and a name underline. |
| `num` | no | Numerals, dates, times, prices. |
| `punct` | no | Punctuation. |
| `gloss` | yes, but pre-glossed | Off-syllabus word deliberately allowed in a passage; always shows an inline gloss. Max 1 per 100 chars. |

#### 1.1.2 Exposure pool (computed at session start, cached for the session)
A word is in the pool if **any** holds:
1. Its `recog` facet has `R(now) ≥ 0.85` (R_KNOWN).
2. It was marked *known* by the diagnostic and has no lapse since.
3. It belongs to a unit the learner has completed **and** its `recog` facet is in state `Review` (even if R has dipped — this avoids passage lock-out after a holiday; such words get pinyin re-enabled, §1.3).

#### 1.1.3 Gate rules (MUST)
- **G1 — Coverage:** `coverage = known_counted_tokens / counted_tokens ≥ 0.95` for passages; **= 1.00** for single-sentence exercises (every non-target token known).
- **G2 — Single novelty:** An exercise sentence may contain **at most one** non-exempt unknown dimension: either one target word, or one target grammar pattern, never a new word *and* a new pattern in the same sentence (except unit-introduction "presentation" sentences, where the pattern is new and every word is known).
- **G3 — Distractor hygiene:** Distractors in any choice task must also be in the exposure pool (or be the deliberate look-alike under test).
- **G4 — Fallback:** If no authored/generated instance passes G1–G3 for a scheduled card, the scheduler (a) tries the next instance, (b) tries procedural generation (§5.5) restricted to the pool, (c) defers the card by 1 day and logs `GATE_STARVED`. It never shows an ungated sentence.
- **G5 — Passage lock:** A unit passage is locked until it passes G1 against the live pool; the lock UI shows the exact blocking words ("Learn 4 more words to unlock: 举行, 节目, …") and can queue them.

Gate evaluation is a pure function `checkCoverage(tokens, pool): {ratio, unknown: string[]}` with unit tests.

### 1.2 Adaptive HSK 1–2 diagnostic & bridge queue

**Goal:** In ≤ 12 minutes, estimate which of the 500 HSK 1–2 words and ~ HSK 1–2 grammar points are solid, without replaying beginner content.

#### 1.2.1 Lexical diagnostic (≈ 70–90 items, ~7 min)
1. **Banding.** The 500 words are sorted by a difficulty score (`hskLevel`, then corpus frequency rank, then character count) into **10 bands of 50**.
2. **Item format:** Hanzi only (no pinyin) → choose meaning from 4 English glosses **+ an "I don't know" button** (reduces guessing noise; DK scores as wrong without penalising look-alike stats).
3. **Adaptive walk:** Start at band 5. Sample 6 words.
   - ≥ 5/6 correct → band *passed*; jump up 2 bands (or 1 if near the top).
   - ≤ 3/6 → band *failed*; step down 1 band.
   - 4/6 → *uncertain*; sample 6 more from the same band, then decide at ≥ 9/12.
   - Stop when a passed band sits directly below a failed band, or after 15 probes.
4. **Inference:** All bands below the highest passed band with no failures beneath → *assumed known*. Failed/uncertain bands → **exhaustive sweep** in fast mode: each remaining word shown for "know / don't know" self-report, with **20% random verification** (forced 4-choice meaning check). If verification accuracy < 80%, the self-reports in that band are discarded and all its words go to the bridge queue.
5. **Look-alike probe:** 8 fixed items use look-alike distractors (己/已, 买/卖, 人/入, 天/夫, 午/牛, 问/间, 休/体, 未/末); errors seed the orthography track (§4).

#### 1.2.2 Grammar diagnostic (≈ 24–30 items, ~5 min)
The HSK 1–2 grammar inventory (~40 patterns, in `content/grammar_hsk12.json`) is grouped into **12 clusters** (e.g. 了/过 aspect, 是…的, 在 progressive, 比 basic, 能/会/可以, question forms, measure words, 不/没 negation, 太…了, 要…了, 因为…所以, time-word position). Each cluster is probed with **2 items**. 2/2 → known, 1/2 → one confirmation item, 0/2 → weak.
- **M1 item format:** *sentence judgement* — pick the one grammatical sentence out of 3 (distractors break exactly the cluster's rule). From M2 on, one of the two items per cluster becomes a Slot-Builder order task.

#### 1.2.3 Seeding results into FSRS
| Diagnostic outcome | FSRS seeding |
|---|---|
| Known (band passed or verified) | Create card in `Review` state, `stability = 30d`, `difficulty = 4`, `due = now + rand(10..40)d` (jittered to avoid a review wall). |
| Self-reported known, unverified | `stability = 10d`, `due = now + rand(3..12)d`. |
| Weak / DK | Card created in `New` state, tagged `origin: 'bridge'`. |

#### 1.2.4 Bridge queue behaviour ("silent injection")
- Bridge items are **never** shown as a separate "beginner course". They are interleaved into normal sessions.
- **Priority:** a bridge item's priority = number of HSK 3 unit items (words in examples, grammar dependencies) that depend on it in the *current or next* unit. Dependencies come from `VocabItem.unitFirstNeeded` and `GrammarPattern.requires`.
- **Rate:** ≤ 8 bridge words + 1 bridge grammar cluster per day, counted against (not on top of) the daily new-item budget.
- **Gate interaction:** a bridge word with priority > 0 that blocks a passage (G5) jumps to the front.
- The diagnostic is re-runnable from Settings ("Recalibrate"); re-running never lowers stability of cards that already have ≥ 3 real reviews.

### 1.3 Anti-crutch pinyin fading

#### 1.3.1 Display levels per token
| Level | Rendering |
|---|---|
| `L0_FULL` | Hanzi + ruby pinyin + small English gloss under the word |
| `L1_PINYIN` | Hanzi + ruby pinyin |
| `L2_BARE` | Hanzi only (default for anything learned) |

#### 1.3.2 Level selection (MUST, evaluated per token)
```
if token.kind in ['name']                         -> L1_PINYIN
if token.kind == 'gloss'                          -> L0_FULL
if word is New / Learning (first 2 successful)    -> L1_PINYIN
if word.hskLevel <= 2 and word ∈ exposure pool    -> L2_BARE
if word.hskLevel == 3 and recog.stability >= 21d  -> L2_BARE
if word.hskLevel == 3 and recog.stability <  21d  -> L1_PINYIN  (fades as stability grows)
if word ∈ pool only via rule §1.1.2(3) (R dipped) -> L1_PINYIN
```
- In **exercises that test recognition of that word**, the tested word is *always* `L2_BARE` regardless of the table (otherwise the test is void).
- There is **no global "show all pinyin" toggle.** (A crutch you can always switch on becomes the default.)

#### 1.3.3 Tap-to-peek
- Tap (or long-press in tile contexts, where tap = select) on any token opens a **bottom sheet**:
  1. Pinyin with tone marks and tone colouring.
  2. Concise definition(s) for *this* sense (from `VocabItem.senses`, the one referenced by the token).
  3. **Component breakdown** per character: semantic radical (with meaning), phonetic component (with its reading and whether it's still a reliable hint), and the decomposition tree (from Make Me a Hanzi data, §5.4).
  4. Look-alike warning chips if the character is in a confusion set (e.g. "≠ 已 yǐ 'already'").
  5. HSK level + current mastery ring.
- **Peek cost (the anti-crutch part):** every peek writes a `PeekEvent`. A peek on a word whose display level was `L2_BARE` is evidence of forgetting:
  - If the word's `recog` card is due within 3 days → it is reviewed *now* with rating **Again** at the end of the exercise.
  - Otherwise, 2 peeks of the same word within 14 days (since its last review) → the word is made **due immediately** at the next session start, so it gets tested rather than failed blind.
  - A peek during a *graded* exercise on a non-target word does **not** fail the exercise but caps the exercise's FSRS rating at **Hard** for the target if the peeked word was inside the target structure.

### 1.4 Dual-track FSRS

Implementation: **`ts-fsrs`** (FSRS-5/6 algorithm, MIT licence), pinned version, one `FSRS` scheduler instance per track with its own parameters.

#### 1.4.1 Tracks and facets
| Track | Facet | What a review tests | Exercise types allowed |
|---|---|---|---|
| **Lexical** | `word.recog` | Hanzi → meaning, in-context (preferred) or isolated | Cloze (target word blank), passage questions, recognition MCQ |
| **Lexical** | `char.form` | Distinguish a character from its look-alikes | Look-alike discrimination micro-drill |
| **Lexical** | `word.produce` *(optional, unlocked per word after `recog.stability ≥ 14d`)* | Meaning/context → select correct Hanzi word from same-POS set | Cloze with look-alike/near-synonym distractors |
| **Syntactic** | `gram.form` | Assemble the pattern in correct order | Slot Builder, Transformation |
| **Syntactic** | `gram.use` | Choose the pattern/contrast that fits a context | Minimal-Pair, Cloze (grammar blank) |

Characters are tracked only on the `form` facet for characters that belong to a confusion set (§4.3) or that the learner has confused at least once. Word recognition already covers meaning.

#### 1.4.2 Track parameters
| Parameter | Lexical | Syntactic | Why |
|---|---|---|---|
| `request_retention` | 0.90 | 0.88 | Grammar reviews are expensive (≈ 45 s); slightly lower retention halves review load with little loss. |
| `maximum_interval` | 365 d | 180 d | Grammar decays in production faster than recognition. |
| `enable_fuzz` | true | true | Spreads load. |
| `w` (weights) | FSRS defaults | FSRS defaults | After ≥ 1,000 reviews on a track, the app MAY offer local parameter optimisation (`ts-fsrs` optimizer or a bundled WASM build) — offline. |

#### 1.4.3 Automatic rating (no self-grading in exercises)
Rating is derived from behaviour, per facet under test:
| Condition | Rating |
|---|---|
| Wrong final answer, or "I don't know", or ≥ 2 wrong tile placements before success | **Again (1)** |
| Correct but used hint / peeked inside the target / 1 wrong tile placement / latency > `slowMs` | **Hard (2)** |
| Correct, first try, latency between `fastMs` and `slowMs` | **Good (3)** |
| Correct, first try, latency < `fastMs`, and card `reps ≥ 2` | **Easy (4)** |

`fastMs`/`slowMs` are per exercise type, adapted as the learner's rolling median ×0.6 / ×1.8 (bounded by type defaults: recognition 2.5 s/8 s, cloze 5 s/15 s, slot builder 10 s/40 s, transformation 15 s/60 s).

#### 1.4.4 Instance variation for grammar cards
A `gram.*` card is the *pattern*, not a sentence. Each review draws a fresh instance (authored bank first, then generated) that the learner has not seen in the last `N=5` reviews of that card. This prevents memorising a sentence instead of the structure.

#### 1.4.5 Multi-item attempts
One attempt may touch several cards (e.g. a Slot Builder sentence with a target pattern and a target word). Rules:
- Only cards that are **due (R ≤ request_retention)** or **explicitly targeted** get a rating.
- Non-due incidental words are not rated (avoids over-reviewing), but their correct use is logged as `exposure` for analytics.
- If an error is classified (§4) to a specific item, *that* item's card gets Again even if it wasn't the target.

### 1.5 The session loop
```
Session(start)
 ├─ build exposure pool (§1.1.2)
 ├─ queue = due reviews (both tracks, sorted by lowest R first)
 │         + remedial drills triggered by error taxonomy (§4.4)
 │         + bridge items (§1.2.4)
 │         + new items from current unit (budget §1.5.1)
 ├─ interleave (§1.5.2)
 ├─ for each card: pick exercise type → pick gated instance → present → grade → rate → classify errors
 └─ end: summary (what got stronger/weaker, error categories, unlocked passages)
```

#### 1.5.1 Budgets (Settings, with defaults)
- New words/day: **12** (incl. bridge words). New grammar points/day: **1** (≤ 2).
- Hard cap on reviews/session: none; but a **"flight mode" session** option builds a long session (60–120 min) by pre-pulling reviews due in the next 3 days and lowering new-item budget to 0 after 30 minutes.
- New items are **withheld** when due backlog > 150 or the 7-day Again-rate > 25% (overload protection).

#### 1.5.2 Interleaving rules
- Never two cards of the same grammar pattern back-to-back; never two minimal-pair items on the same contrast within 5 cards.
- New-item introduction sequence: *presentation* (pattern explained with 3 annotated examples, pinyin `L1`) → 2 immediate easy instances → re-test 5–10 cards later (FSRS learning steps `1m, 10m` drive this) → next day.
- A new grammar point is introduced only if all its `requires` patterns have `gram.form` in `Review` state.

### 1.6 What "progress" means (only these metrics)
- **Words known** (count in exposure pool) / 1,000; **characters recognised** / 587 (a character is recognised when ≥ 2 known words contain it, or its `char.form` card is in Review).
- **Grammar mastered**: patterns whose `gram.form` *and* `gram.use` stability ≥ 21 d / 96.
- **Reading readiness**: % of all unit passages that pass the coverage gate today.
- **Retention**: true retention per track over 30 days (actual vs target).
- **Weakness map**: top error categories with trend (§4).
No streak counters, no points.

---

## 2. HSK 3 curriculum & progression architecture

### 2.1 Structure
- **12 units × 8 grammar points = 96**, **≈ 41–42 new HSK 3 words per unit = 500**.
- Each unit: theme (drives vocabulary and passage topics) + syntactic milestone (drives grammar).
- Each unit ends with **2 micro-reading passages** (A: 100–150 chars, B: 180–250 chars) = 24 passages, plus 4 review passages after units 3, 6, 9, 12 (cumulative).
- **Dependency graph:** each `GrammarPattern.requires: string[]`. A unit is *available* when ≥ 80% of the previous unit's grammar has `gram.form` in Review and ≥ 70% of its words are in the pool. The learner may preview but not start new items in a locked unit.

### 2.2 Unit map (working grammar inventory — IDs G3-01 … G3-96)

**Conjunction-pair milestones (the "nine pairs"):** 虽然…可是/但是 (G3-81), 不但…而且 (G3-82), 只要…就 (G3-74), 只有…才 (G3-75), 如果/要是…就 (G3-73), 一边…一边 (G3-84), 因为…所以 (G3-83), 一…就 (G3-16), 除了…以外，还/都 (G3-76). Supporting pair-like frames: 越…越 (G3-22), 又…又 (G3-85), 先…然后 (G3-09), 连…都/也 (G3-72).

---

#### Unit 1 · 生活节奏 *Daily rhythm* — **Aspect & time adverbs**
Theme words: schedules, morning routine, commuting, appointments.
| ID | Pattern | Example |
|---|---|---|
| G3-01 | V了 + Num-M + O (completed, quantified) | 我买了两本书。 |
| G3-02 | Sentence-final 了 (change of state) | 天冷了。/ 我不想去了。 |
| G3-03 | V过 (experience); 没V过 | 我去过上海。 |
| G3-04 | V着 (durative state) | 门开着。他穿着一件红衣服。 |
| G3-05 | 正在/在/正…呢 (progressive) | 他正在开会呢。 |
| G3-06 | 已经…了 | 电影已经开始了。 |
| G3-07 | 刚 vs 刚才 | 我刚到。/ 刚才你去哪儿了？ |
| G3-08 | 就 vs 才 (earlier / later than expected) | 他七点就来了。/ 他十点才来。 |

#### Unit 2 · 安排与习惯 *Plans & habits* — **Sequence, frequency, duration**
| ID | Pattern | Example |
|---|---|---|
| G3-09 | 先…然后/再… | 先洗手，然后吃饭。 |
| G3-10 | 又 (past repetition) vs 再 (future repetition) | 他又迟到了。/ 明天再来吧。 |
| G3-11 | 还 (still; in addition) | 他还没回来。 |
| G3-12 | 一直 vs 总是 | 雨一直下。/ 他总是很忙。 |
| G3-13 | Verbal measure complement V + 次/遍/下 | 这本书我看了三遍。 |
| G3-14 | Duration complement: V(了)+duration(+的)+O / V+O+V+duration | 我学了两年(的)汉语。/ 他等你等了半天。 |
| G3-15 | 从…到… / 离 (distance & span) | 我家离公司很远。 |
| G3-16 | **一…就…** | 他一回家就睡觉。 |

#### Unit 3 · 比一比 *Comparing things* — **Comparison & degree**
| ID | Pattern | Example |
|---|---|---|
| G3-17 | A 比 B + Adj + 一点儿/一些/多了/得多 | 今天比昨天冷多了。 |
| G3-18 | A 比 B + Adj + quantity | 他比我高五厘米。 |
| G3-19 | A 没有 B (这么/那么) Adj | 北京没有哈尔滨那么冷。 |
| G3-20 | 跟/和…一样/不一样 (+Adj) | 我的手机跟你的一样。 |
| G3-21 | 越来越 + Adj/V | 天气越来越热了。 |
| G3-22 | 越…越… | 雨越下越大。 |
| G3-23 | 有点儿 + Adj (negative) vs Adj + 一点儿 (comparative/request) | 有点儿贵。/ 便宜一点儿吧。 |
| G3-24 | Degree complements: Adj + 极了/死了/坏了/多了 | 累死了。好极了。 |

#### Unit 4 · 怎么样？ *How well?* — **State complement 得 & reduplication**
| ID | Pattern | Example |
|---|---|---|
| G3-25 | V + 得 + (Adv) Adj | 他跑得很快。 |
| G3-26 | (V) + O + V + 得 + Adj / O fronted | 他说汉语说得很好。/ 汉语他说得很好。 |
| G3-27 | Negation & questions of 得-complement | 他跑得不快。/ 跑得快不快？ |
| G3-28 | Adj + 得 + 很 / 不得了 | 好得很。 |
| G3-29 | 太…了 / 非常 / 特别 / 真 (degree adverbs, register) | 这儿的菜特别好吃。 |
| G3-30 | 多(么)…啊 exclamative | 多漂亮啊！ |
| G3-31 | Adjective reduplication AABB / ABB | 高高兴兴地回家。 |
| G3-32 | Verb reduplication VV / V一V / V了V / ABAB | 你看看。/ 休息休息。 |

#### Unit 5 · 做完了没有？ *Getting it done* — **Result complements**
| ID | Pattern | Example |
|---|---|---|
| G3-33 | V + 完/好 | 作业写完了。饭做好了。 |
| G3-34 | V + 到/见 (attainment, perception) | 我找到钥匙了。看见他了。 |
| G3-35 | V + 懂/会/对/错 | 我听懂了。你写错了。 |
| G3-36 | V + 住 / V + 清楚 / V + 干净 | 记住了。洗干净了。 |
| G3-37 | V + 在/到/给 + Place/Person | 住在北京。送给她。 |
| G3-38 | Negation 没 + V + RC (never 不 for past) | 我没听懂。 |
| G3-39 | V + 成 (become/into) | 把句子翻译成中文。 *(presented with simple object first)* |
| G3-40 | **Separable verbs I** (见面、帮忙、睡觉、跑步): insertion of 了/过/duration/pronoun | 我们见过一次面。帮我一个忙。 |

#### Unit 6 · 进来吧 *Comings and goings* — **Directional complements & existential sentences**
| ID | Pattern | Example |
|---|---|---|
| G3-41 | Simple directional V + 来/去 | 进来！他回去了。 |
| G3-42 | Compound directional V + 上/下/进/出/回/过/起 + 来/去 | 他跑出去了。 |
| G3-43 | Object placement with directionals (place obj before 来/去) | 他走进教室来了。/ 拿出一本书来。 |
| G3-44 | Extended 起来 (start; seem/assess) | 他笑起来了。看起来很新。 |
| G3-45 | Extended 下去 (continue) & 出来 (identify) | 说下去。我听出来是你。 |
| G3-46 | **存现句 I**: Place + V着 + (Num-M) NP | 桌子上放着一本书。 |
| G3-47 | **存现句 II**: Place/Time + V了/来/走 + NP (appear/disappear) | 前面走过来一个人。家里来了客人。 |
| G3-48 | Localiser frames 在…上/下/里/中/旁边 | 在我看来… / 在书上 |

#### Unit 7 · 能不能？ *Can or can't* — **Potential complements & modals**
| ID | Pattern | Example |
|---|---|---|
| G3-49 | V + 得/不 + Result | 看得懂 / 看不懂 |
| G3-50 | V + 得/不 + Direction | 上得去 / 回不来 |
| G3-51 | V + 得了/不了 (capacity, quantity) | 我吃不了这么多。 |
| G3-52 | V + 得下/不下 (capacity) | 这辆车坐不下六个人。 |
| G3-53 | V + 不动 / 不起 (inability by strength / means) | 走不动了。买不起。 |
| G3-54 | Potential complement vs 能/不能 (contrast: ability-by-circumstance vs permission) | 我看不懂 ≠ 我不能看 |
| G3-55 | 能 / 会 / 可以 contrast | 我会游泳，可是今天不能游。 |
| G3-56 | Obligation: 应该 / 得(děi) / 必须 / 不用 / 不必 | 你得早点儿睡。 |

#### Unit 8 · 把它放好 *Handling things* — **把 disposal**
Requires G3-33…G3-50 (result & directional complements).
| ID | Pattern | Example |
|---|---|---|
| G3-57 | 把 + O + V + 了 | 我把苹果吃了。 |
| G3-58 | 把 + O + V + Result | 我把作业写完了。 |
| G3-59 | 把 + O + V + 在/到/给 + X | 把书放在桌子上。把钱还给他。 |
| G3-60 | 把 + O + V + Direction | 把椅子搬进来。 |
| G3-61 | 把 + O + V + 成 | 把美元换成人民币。 |
| G3-62 | Negation/modal/time before 把 (没/别/不要/要/已经 + 把) | 别把门关上。 |
| G3-63 | 把 constraints: no bare verb, definite object, **no potential complement** | ✗ 我把作业写得完。 |
| G3-64 | 把 + O + V一下 / VV / V了V | 把房间收拾一下。 |

#### Unit 9 · 被偷了！ *Things that happened to me* — **被 passive & focus**
| ID | Pattern | Example |
|---|---|---|
| G3-65 | 被 + Agent + V + Other | 我的自行车被人骑走了。 |
| G3-66 | 被 + V + Other (agent omitted) | 杯子被打破了。 |
| G3-67 | 叫/让 colloquial passive (agent required) | 蛋糕叫弟弟吃了。 |
| G3-68 | Negation/adverb before 被 (没被, 已经被, 又被) | 他没被老师批评。 |
| G3-69 | Notional passive (no marker) | 信写好了。 |
| G3-70 | 把 ↔ 被 transformation | 我把杯子打破了 → 杯子被我打破了。 |
| G3-71 | 是…的 (focus on time/place/manner of a past event) | 我是坐飞机来的。 |
| G3-72 | 连…都/也 | 他连一个字都没写。 |

#### Unit 10 · 要是…就好了 *Conditions & choices* — **Conditionals, totality**
| ID | Pattern | Example |
|---|---|---|
| G3-73 | **如果/要是…(的话)，就…** | 要是下雨，我们就不去了。 |
| G3-74 | **只要…就…** (sufficient condition) | 只要努力，就能学好。 |
| G3-75 | **只有…才…** (necessary condition) | 只有多读，才能看懂。 |
| G3-76 | **除了…以外，还/也** (inclusive) vs **都** (exclusive) | 除了他以外，我们都去了。 |
| G3-77 | 一 + M + (N) + 也/都 + 不/没 | 一个人也没有。 |
| G3-78 | Interrogative pronouns as universals: 谁/什么/哪儿 + 都/也 | 他什么都不吃。 |
| G3-79 | Rhetorical 不是…吗？ | 你不是去过吗？ |
| G3-80 | 还是 (question) vs 或者 (statement) | 喝茶还是喝咖啡？/ 喝茶或者咖啡都行。 |

#### Unit 11 · 虽然…但是 *Weighing things up* — **Concession, addition, cause, purpose**
| ID | Pattern | Example |
|---|---|---|
| G3-81 | **虽然…但是/可是…** | 虽然很累，但是很高兴。 |
| G3-82 | **不但…而且…** (+ subject placement rule) | 他不但会说，而且说得很好。 |
| G3-83 | **因为…所以…** / 所以 alone | 因为下雨，所以比赛取消了。 |
| G3-84 | **一边…一边…** | 一边吃饭一边看电视。 |
| G3-85 | 又…又… | 又便宜又好吃。 |
| G3-86 | 为了 (purpose) vs 因为 (cause) | 为了身体健康，他每天跑步。 |
| G3-87 | 对…来说 / 对 (towards) | 对我来说，汉字不难。 |
| G3-88 | 关于 (topic) vs 对 | 关于这件事，我不知道。 |

#### Unit 12 · 讲故事 *Telling a story* — **Narrative cohesion & separable verbs II**
| ID | Pattern | Example |
|---|---|---|
| G3-89 | **Separable verbs II** (放假、洗澡、生气、结婚、请假): 了/过/duration/个/de-possessive inside | 生他的气。洗了个澡。放三天假。 |
| G3-90 | 然后 vs 后来 vs 以后 | 后来我们没再见面。 |
| G3-91 | 终于 / 突然 / 马上 | 他终于来了。 |
| G3-92 | 只 / 就 (only) / 差不多 / 几乎 | 我就有十块钱。 |
| G3-93 | 好像 / 像…一样 | 他好像不太高兴。 |
| G3-94 | V₁ + 着 + V₂ (manner) | 他笑着说。走着去。 |
| G3-95 | Topic–comment & object fronting | 这本书我看完了。 |
| G3-96 | Contrastive connectives 可是 / 但是 / 不过 (register & strength) | 东西不错，不过有点儿贵。 |

### 2.3 Vocabulary allocation rules
1. Each of the 500 HSK 3 words is assigned to exactly one unit (`VocabItem.unit`) by theme fit, **and** by being needed in that unit's grammar exemplars (e.g. 搬, 放, 收拾 in Unit 8).
2. Separable verbs are flagged `separable: true` with `splitPoint` (e.g. 见|面) and first appear in Unit 5 or later.
3. Every new HSK 3 *character* (≈ 287 new characters to reach 587) is first introduced inside a word; `CharItem.firstWord` records which.
4. Within a unit, words are introduced in an order that maximises early passage unlock (greedy: pick next the word that appears in the most locked sentences of this unit).

---

## 3. Exercise mechanics

All five types share: an `ExerciseTemplate` (§5.3), a gated instance, a grader returning `GradeResult { correct, rating, errors: ErrorCode[], details }`, and a feedback panel (§4.2). Answers are never free-typed by default (no IME dependency, deterministic grading); a **type-it mode** is available for Transformation (§3.3) and graded against an accepted-answer set after normalisation.

### 3.1 Syntactic Slot Builder ("Grammar Lego")

**Trains:** `gram.form`. Word order, adverb placement, complement placement.

**UI**
- Top: English or Chinese *meaning prompt* (choose per card: English prompt early, Chinese-paraphrase prompt once `gram.form` stability ≥ 14d).
- Middle: a **slot rail** — coloured, labelled drop zones in canonical order. Slots appear only if the target sentence uses them (no giveaway of *what* goes where, but the rail shows the frame).
- Bottom: shuffled **tiles** (words or fixed chunks) + **1–2 decoy tiles** (e.g. 了 when 过 is correct; 就 when 才 is correct; 不 when 没 is correct).
- Tap a tile → it flies to the first free slot that accepts its category; tap a placed tile → returns it. Drag also supported. Tiles ≥ 44 px tall.
- "Check" button. Advanced mode (≥ stability 30d) hides slot labels ("free rail") — tiles go into an unlabelled line.

**Slot taxonomy & colours** (Tailwind tokens; colour-blind-safe pairs + text labels always visible)
| Slot | Code | Colour | Holds |
|---|---|---|---|
| Topic | `TOP` | slate | Fronted object/topic |
| Subject | `S` | blue | |
| Time | `T` | violet | 昨天, 七点 (may also precede S — see constraints) |
| Adverb | `ADV` | amber | 才/就/刚/已经/还/更/也/都/一直/又/再 |
| Modal | `MOD` | orange | 能/会/要/应该/得 |
| Prepositional / Location | `PP` | teal | 在图书馆, 跟朋友, 给他, 对我 |
| 把/被 phrase | `BA` | rose | 把作业, 被小偷 |
| Verb | `V` | red | |
| Aspect | `ASP` | pink | 了/着/过 |
| Complement | `C` | green | 完/得很快/进来/得懂/三遍/两个小时 |
| Object | `O` | sky | |
| Sentence-final | `SF` | gray | 了₂/吗/呢/吧 |

**Validity model (critical).** A template does not store one answer string. It stores the slot *assignments* plus **ordering constraints** (a partial order), so equivalent orders are accepted:
```ts
constraints: [
  { before: 'T', after: 'V' },          // time before verb
  { before: 'S', after: 'ADV' },        // adverbs after subject
  { before: 'ADV', after: 'PP' },       // 已经在… not 在…已经
  { before: 'MOD', after: 'PP' },
  { adjacent: ['V', 'C'] , unless: 'O-insertion' }
]
alternatives: [['T','S'], ['S','T']]    // 昨天我… and 我昨天… both valid
```
Grading = check the learner's sequence against all constraints; each violated constraint maps to an `ErrorCode` (§4.1). This gives diagnostic feedback for free.

**Adverb-placement focus set** (dedicated Slot Builder sub-bank): 才, 就, 刚, 已经, 还, 更, 也, 都, 又, 再, 一直, 常常, 马上 — including multi-adverb ordering (也都, 都已经, 还没).

### 3.2 Contrastive minimal-pair discrimination

**Trains:** `gram.use` (and `word.produce` for lexical pairs).

**Format:** A context (1–3 sentences, gated) with one gap → choose between the **pair** (2 options, sometimes 3 for triads). Optionally **"both / neither"** for pairs where both are grammatical but meaning differs — then a follow-up asks *which meaning results*.

**Each item stores per-option rationale** (shown after answer, for the chosen wrong option *and* the right one):
```
Context: 我等了他一个小时，他___来。
Options: 才 ✓ | 就
Why 才: action happened LATER than expected — the speaker waited an hour.
Why not 就: 就 signals EARLIER/sooner than expected, contradicting "waited an hour".
Rule card → G3-08
```

**Contrast bank (initial; each ≥ 15 items):**
| Contrast | Pattern IDs |
|---|---|
| 才 vs 就 (time) | G3-08 |
| 刚 vs 刚才 | G3-07 |
| 又 vs 再 | G3-10 |
| 有点儿 vs 一点儿 | G3-23 |
| 只要…就 vs 只有…才 | G3-74/75 |
| 觉得 vs 认为 (认为: considered judgement, not sensation) | lexical |
| 还是 vs 或者 | G3-80 |
| 因为 vs 为了 | G3-86 |
| 对 vs 关于 | G3-87/88 |
| 能 vs 会 vs 可以 | G3-55 |
| Potential complement vs 能 | G3-54 |
| 不 vs 没 (+ result complement) | G3-38 |
| 了 vs 过 vs 着 | G3-01/03/04 |
| 一直 vs 总是 | G3-12 |
| 然后 vs 后来 | G3-90 |
| 的 vs 得 vs 地 | G3-25, G3-31 |
| 把 vs 被 (who did what) | G3-70 |
| 除了…还 vs 除了…都 | G3-76 |
| 以后 vs 后来 | G3-90 |
| 二 vs 两 (quick revision bridge) | HSK 2 |

### 3.3 Sentence transformation & combining

**Trains:** `gram.form` for complex patterns (conjunctions, 把/被, complements).

**Sub-types**
| Sub-type | Input → Output | Example |
|---|---|---|
| `combine` | two HSK 1–2 clauses + target pattern chip | 天气不好。我们去公园。 + [虽然…但是] → 虽然天气不好，但是我们还是去公园了。 |
| `rewrite` | sentence + transformation chip | 我吃了苹果。 → [把] → 我把苹果吃了。 |
| `voice` | 把 ↔ 被 | 小偷把钱包偷走了。 → 钱包被小偷偷走了。 |
| `complement` | sentence + complement chip | 他看这本书。他看不明白。 → [V不R] → 这本书他看不懂。 |
| `condition` | situation + logic chip (sufficient / necessary) | → 只有…才 / 只要…就 |

**Answer input:** Slot Builder rail pre-loaded with clause chunks as tiles + connective tiles + decoy connective(s) (e.g. 所以 offered alongside 但是). **Type-it mode** (optional, stability ≥ 30d): learner types with system IME; graded by normalising punctuation/whitespace/全半角 and matching any of `acceptedAnswers[]`; near-misses (edit distance ≤ 2 tokens) are re-checked against constraints to classify the error instead of flat "wrong".

**Subject-placement rules** encoded as constraints, e.g. 不但…而且: same subject → subject *before* 不但; different subjects → subject *after* 不但.

### 3.4 Cloze syntax fill-in-the-blank

**Trains:** `word.recog`, `word.produce`, `gram.use`.

- 1 blank per sentence (2 for paired conjunctions), 4 options.
- **Distractor contract:** all options share the target's POS/slot. Each distractor is tagged with the **single** rule it violates:
  - `collocation` (e.g. 穿 vs 戴 帽子),
  - `aspect` (了/着/过 mismatch),
  - `complement` (看见 vs 看懂 in context),
  - `pairing` (虽然…*所以*),
  - `lookalike` (己 vs 已),
  - `register/near-synonym` (认为 vs 觉得).
- Feedback quotes the violated rule; the chosen distractor's tag becomes the `ErrorCode`.
- Distractors must be in the exposure pool (G3) except deliberate look-alikes.

### 3.5 Graduated micro-reading passages with Clause-Chunking X-ray

**Trains:** reading comprehension; incidental `word.recog` review.

**Passage specs**
| Property | Rule |
|---|---|
| Length | A: 100–150 chars; B: 180–250 chars |
| Vocabulary | Gate G1 (≥ 95%); ≤ 1 `gloss` token / 100 chars |
| Grammar | ≥ 4 of the unit's 8 patterns, each marked in annotations |
| Genres | Diary, message/chat, notice, short story, dialogue, simple explanation |
| Questions | 4–6 per passage |

**Reader UI**
- Large Hanzi (default 22 px, adjustable), pinyin per §1.3, tap-to-peek.
- **X-ray toggle** (one button, persistent per user) renders authored chunk annotations:
  - **Clause boundaries** — vertical hairline + subtle background band per clause.
  - **Subordinate clause** (虽然…, 如果…, 因为…) — dashed underline; its paired connective in the main clause highlighted in the same colour (pair-linking).
  - **Topic–comment** — topic in slate with a "⟶" marker before the comment.
  - **Complements** — green underline; **把/被 phrase** rose; **time/place** violet/teal (same palette as Slot Builder, so the reading view reinforces the construction view).
  - **Long modifiers** (…的 + N) — bracket ⌜ ⌝ around the modifier with the head noun bolded.
- X-ray is *scaffolding*: using it on a first read is free; a "Read clean" badge records passages finished without X-ray (shown in the progress page, not as points).

**Question types (all inference-focused, no "find the string" items)**
| Type | Example |
|---|---|
| `referent` | 文中的"他"指的是谁？ |
| `inference` | 为什么小王没去？ (answer not stated verbatim) |
| `sequence` | Order 3 events from the text |
| `truth` | 根据短文，哪句话是对的？ (distractors paraphrase with one grammatical twist, e.g. 才 vs 就 flipping meaning) |
| `function` | 第二句中"不过"表达什么？ (contrast/concession) |
| `gist` | 这段话主要说的是什么？ |
Questions and options are in Chinese (gated); English rationale in feedback.

---

## 4. Diagnostic feedback & error taxonomy

### 4.1 Error codes
Every wrong attempt produces ≥ 1 code. Codes are hierarchical: `FAMILY.SPECIFIC`.

| Family | Code | Detected by |
|---|---|---|
| **ORDER** | `ORDER.TIME_AFTER_VERB` | constraint T<V violated |
| | `ORDER.PLACE_AFTER_VERB` (在图书馆 after V) | PP<V violated |
| | `ORDER.ADVERB_POSITION` (adverb before subject / after PP) | S<ADV, ADV<PP |
| | `ORDER.MULTI_ADVERB` (都也 vs 也都) | adverb-pair constraint |
| | `ORDER.MODAL_POSITION` | MOD constraints |
| | `ORDER.TOPIC` | topic fronting misuse |
| **COMP** | `COMP.PLACEMENT` (object between V and complement wrongly) | V–C adjacency |
| | `COMP.DIRECTIONAL_OBJECT` (place object after 来/去) | directional object rule |
| | `COMP.DE_MISSING` / `COMP.DE_WRONG` (的/得/地) | token check |
| | `COMP.POTENTIAL_VS_MODAL` | minimal-pair tag |
| | `COMP.RESULT_CHOICE` (看见 vs 看懂) | cloze tag |
| | `COMP.DURATION_POSITION` | duration constraint |
| **ASPECT** | `ASPECT.LE_MISUSE` / `ASPECT.GUO_MISUSE` / `ASPECT.ZHE_MISUSE` | tag |
| | `ASPECT.NEG_BU_MEI` (不 for completed) | tag |
| **CONJ** | `CONJ.PAIR_MISMATCH` (虽然…所以) | pair constraint |
| | `CONJ.CONDITION_LOGIC` (只要 vs 只有) | minimal-pair tag |
| | `CONJ.SUBJECT_POSITION` (不但 subject rule) | constraint |
| | `CONJ.MISSING_PARTNER` (only one half used) | token check |
| **BA_BEI** | `BA.BARE_VERB`, `BA.POTENTIAL_COMP`, `BA.NEG_POSITION`, `BEI.AGENT_ROLE` (reversed roles), `BEI.MISSING_OTHER` | constraints + tags |
| **SEP** | `SEP.OBJECT_AFTER` (见面他), `SEP.ASPECT_POSITION` (见面了一次) | separable-verb rule |
| **LEX** | `LEX.MEANING` (wrong meaning picked in recognition), `LEX.NEAR_SYNONYM`, `LEX.COLLOCATION`, `LEX.MEASURE_WORD` | recognition / cloze tags |
| **ORTHO** | `ORTHO.LOOKALIKE` (己/已), `ORTHO.HOMOPHONE` (在/再, 做/作), `ORTHO.ANTONYM_FORM` (买/卖, 借/还) | look-alike/homophone sets |
| **READ** | `READ.REFERENT`, `READ.INFERENCE`, `READ.SEQUENCE`, `READ.CONNECTIVE_FUNCTION` | question type |
| **META** | `META.DONT_KNOW` | "I don't know" |

Each code has a record in `content/errors.json`: `{ code, title, explanation (EN, 1–2 lines), ruleCardRef (GrammarPattern id), remedialTemplateIds[] }`.

### 4.2 Feedback panel (on any wrong answer)
1. **What you did** — the learner's answer with the offending tile(s)/token(s) highlighted.
2. **Correct version** — with X-ray colouring.
3. **Why** — the code's explanation *specialised* with the actual tokens ("Time words like **昨天** go before the verb **去**, not after it.").
4. **Rule card link** — opens the GrammarPattern page (explanation + 3 annotated examples).
5. **"Try a twin"** — an optional immediate second instance of the same constraint (not FSRS-rated; logs success for the remediation tracker).

### 4.3 Look-alike & homophone sets
`content/confusables.json` (initial, extend in M4):
```
己 jǐ / 已 yǐ / 巳      买 mǎi / 卖 mài        人 / 入        土 / 士
天 / 夫                 未 / 末                午 / 牛        问 / 间
休 / 体                 住 / 往                日 / 目 / 白    大 / 太 / 犬
因 / 困                 历 / 力                找 / 我        冷 / 今 / 令
在/再 (homophone)       做/作 (homophone)      的/得/地         坐/座
```
Each set member has a `diffHint` (e.g. "已: stroke closes halfway; 己: open").
When `ORTHO.*` errors occur, the involved characters get `char.form` cards (§1.4.1) if they don't have one.

### 4.4 Remediation engine
- Maintain per-code **weakness score** `w(code) = Σ e^(−Δt/τ) · weight(error)` with τ = 10 days; correct attempts *on items that can trigger the code* subtract 0.5 × the same decay.
- **Trigger:** `w(code) ≥ 3.0` **and** ≥ 3 distinct items involved (so one hard sentence doesn't trigger a drill) → schedule a **micro-drill** for the next session start.
- **Micro-drill:** 5 items, generated from `remedialTemplateIds` for that code, using *different* lexical content than the failed items, ≥ 2 exercise types (e.g. 2 Slot Builder isolating the constraint, 2 Minimal-Pair, 1 Cloze). Completing ≥ 4/5 reduces `w` by 50%; ≤ 2/5 keeps it and schedules another in 2 days, plus pins the rule card in the session summary.
- At most 2 micro-drills per session; FSRS cards for involved patterns are rated as usual inside the drill.
- The **Weakness map** (progress page) lists codes by `w` with a 30-day sparkline.

---

## 5. Local-first data schemas & offline architecture

### 5.1 Tech stack (recommended)
| Concern | Choice | Reason |
|---|---|---|
| Language | TypeScript (strict) | Schema safety for content + state |
| UI | React 18 + Vite | Fast builds, small runtime, huge ecosystem |
| Styling | Tailwind CSS | Slot colour tokens, mobile-first utilities |
| State | Zustand (session/UI) + Dexie live queries (persisted) | Minimal boilerplate |
| Persistence | **Dexie (IndexedDB)** | Native in every mobile browser, no WASM; SQLite-WASM/OPFS unnecessary at this data size (< 20 MB) |
| SRS | `ts-fsrs` | Reference TS implementation of FSRS |
| Offline | `vite-plugin-pwa` (Workbox `generateSW`, precache-only) | Every asset precached at install; **no runtime network routes** |
| Drag/tap | `@dnd-kit` (tap-to-place primary, drag secondary) | Touch-friendly, accessible |
| Testing | Vitest (logic), Playwright (offline e2e with `context.setOffline(true)`) | |
| Font | Android system **Noto Sans CJK SC** via `font-family` stack | Android-only target ships this font; nothing to bundle, no font CDN |

**Zero-network guarantee**
- No analytics, no CDN, no web fonts from Google, no `fetch` to remote origins. A CSP meta tag `connect-src 'self'` plus an e2e test that fails on any non-`self` request.
- Content JSON is imported at build time (code-split per unit), so it's in the precache manifest.
- On first launch: `navigator.storage.persist()` is requested; status shown in Settings.
- **Installing requires one HTTPS load** (PWAs can't be installed from a file). The static build is hosted on GitHub Pages. The host only serves files; no data ever leaves the device. After install the app works in airplane mode indefinitely.
- **Android note:** an installed PWA is normally granted persistent storage, so Chrome won't evict its IndexedDB under storage pressure. Export reminders cover phone loss/reset.

### 5.2 Module layout
```
src/
  app/            routes, shell, settings
  content/        loaders + types for static bundles (read-only)
  db/             Dexie schema, migrations, backup/restore
  srs/            FSRS wrapper, rating policy, scheduler, session builder
  gate/           coverage gate, exposure pool
  gen/            instance selection + procedural generator
  exercises/      slot-builder, minimal-pair, transform, cloze, reader (+ graders)
  errors/         taxonomy, classifier, remediation engine
  diagnostic/     HSK1–2 placement
  ui/             tokens (Hanzi w/ pinyin levels), peek sheet, tiles, x-ray
content/          (repo root) authored JSON bundles, validated at build by zod schemas
scripts/          build-time: validate content, gate-check all instances, subset font
```

### 5.3 TypeScript schemas

```ts
// ---------- Shared ----------
export type HskLevel = 1 | 2 | 3 | 4 | 5;
export type POS =
  | 'n' | 'v' | 'adj' | 'adv' | 'prep' | 'conj' | 'mw' | 'pron'
  | 'num' | 'part' | 'aux' | 'loc' | 'intj' | 'vsep'; // vsep = separable verb
export type SlotCode =
  | 'TOP' | 'S' | 'T' | 'ADV' | 'MOD' | 'PP' | 'BA'
  | 'V' | 'ASP' | 'C' | 'O' | 'SF' | 'CONJ1' | 'CONJ2';

// ---------- Static content (read-only, shipped in bundle) ----------
export interface Sense {
  id: string;                 // "w_fangjia#1"
  gloss: string;              // "have a holiday/vacation"
  pos: POS;
  note?: string;              // usage note, register
}

export interface VocabItem {
  id: string;                 // stable slug, e.g. "w_fangjia"
  hanzi: string;              // "放假"
  pinyin: string;             // "fàng jià" (tone marks, syllable-spaced)
  pinyinNum: string;          // "fang4 jia4" (for tone colouring)
  hsk: HskLevel;
  unit?: number;              // 1..12 for HSK 3; undefined for HSK 1–2
  band?: number;              // 1..10 diagnostic band (HSK 1–2 only)
  freqRank?: number;
  senses: Sense[];
  chars: string[];            // ["放","假"] → CharItem ids
  separable?: { splitAfter: number }; // 放|假 → 1
  semantic: string[];         // feature tags for generation: ["event","time-off"]
  valency?: VerbFrame[];      // verbs only
  measureWord?: string[];     // nouns: ["本"]
  confusableWith?: string[];  // other VocabItem ids (near-synonyms)
  unitFirstNeeded?: number;   // earliest HSK 3 unit whose content uses it (for bridge priority)
  provisional?: boolean;      // compiled without an official list (§0.3)
}

export interface VerbFrame {
  objectTags?: string[];      // semantic tags an object must carry: ["portable-object"]
  allowsResult?: string[];    // ["完","好","到"]
  allowsDirection?: string[]; // ["进来","出去"]
  allowsBa?: boolean;
  allowsBei?: boolean;
  allowsPotential?: boolean;
}

export interface CharItem {
  id: string;                 // the character itself, "已"
  pinyin: string[];           // readings in HSK words
  hsk: HskLevel;
  radical: { char: string; meaning: string };
  phonetic?: { char: string; pinyin: string; reliable: boolean };
  decomposition: string;      // IDS, e.g. "⿱艹化"
  etymologyHint?: string;
  firstWord: string;          // VocabItem id where introduced
  confusableSet?: string;     // id in confusables.json
  diffHint?: string;
}

export interface GrammarPattern {
  id: string;                 // "G3-58"
  hsk: HskLevel;
  unit?: number;
  title: string;              // "把 + O + V + Result"
  titleZh: string;            // "把字句（结果补语）"
  summary: string;            // 1–2 line explanation (EN)
  explanationMd: string;      // full rule card (markdown, offline-rendered)
  formula: SlotCode[];        // canonical slot order: ['S','BA','V','C','SF']
  constraints: OrderConstraint[];
  alternatives?: SlotCode[][];// other valid canonical orders
  requires: string[];         // prerequisite pattern ids (HSK 1–3)
  contrasts?: string[];       // pattern ids it is drilled against
  errorCodes: string[];       // codes this pattern can produce
  examples: AnnotatedSentence[];   // ≥ 3, for rule card & presentation
  instanceBank: AnnotatedSentence[]; // authored instances (≥ 15 target)
  generators?: GeneratorSpec[];     // optional procedural templates (§5.5)
}

export type OrderConstraint =
  | { kind: 'before'; a: SlotCode; b: SlotCode; code: string }        // a must precede b
  | { kind: 'adjacent'; a: SlotCode; b: SlotCode; code: string }
  | { kind: 'required'; slot: SlotCode; code: string }
  | { kind: 'forbidden'; slot: SlotCode; when?: string; code: string } // e.g. potential C in 把
  | { kind: 'pair'; a: string; b: string; code: string };              // 虽然 ↔ 但是/可是

export interface Token {
  t: string;                  // surface form "图书馆"
  ref?: string;               // VocabItem id (absent for punct/num)
  sense?: string;             // Sense id
  kind: 'word' | 'target' | 'name' | 'num' | 'punct' | 'gloss';
  slot?: SlotCode;            // for slot-builder & x-ray
  chunk?: number;             // tile grouping: tokens sharing a chunk move as one tile
}

export interface ChunkAnnotation {
  start: number; end: number; // token index range [start, end)
  type: 'clause' | 'subordinate' | 'topic' | 'comment' | 'complement'
      | 'ba' | 'bei' | 'time' | 'place' | 'modifier' | 'pair';
  pairId?: string;            // links 虽然 … 但是
  patternId?: string;         // GrammarPattern the chunk exemplifies
}

export interface AnnotatedSentence {
  id: string;
  tokens: Token[];
  en: string;                 // meaning prompt
  zhParaphrase?: string;      // Chinese prompt for advanced cards
  chunks?: ChunkAnnotation[];
  patternIds: string[];
  acceptedOrders?: number[][];// explicit extra valid token orders if constraints aren't enough
  source: 'authored' | 'generated';
}

export type ExerciseKind =
  | 'slot_builder' | 'minimal_pair' | 'transform' | 'cloze' | 'reading' | 'recognition' | 'lookalike';

export interface ExerciseTemplate {
  id: string;
  kind: ExerciseKind;
  trains: { track: 'lexical' | 'syntactic'; facet: Facet }[];
  targetIds: string[];        // pattern / word / char ids
  minStabilityDays?: number;  // e.g. free-rail slot builder requires ≥ 30
  payload:
    | SlotBuilderPayload | MinimalPairPayload | TransformPayload
    | ClozePayload | RecognitionPayload | LookalikePayload;
  remedialFor?: string[];     // ErrorCodes this template can remediate
}

export interface SlotBuilderPayload {
  type: 'slot_builder';
  sentenceRef: string | 'GENERATE'; // AnnotatedSentence id, or draw from pattern
  decoys: { t: string; ref?: string; code: string }[]; // decoy tile + code if used
  prompt: 'en' | 'zh';
  freeRail: boolean;
}

export interface MinimalPairPayload {
  type: 'minimal_pair';
  context: Token[];           // with one token of kind 'target' replaced by a gap marker
  gapIndex: number;
  options: { t: string; ref?: string; correct: boolean; rationale: string; code?: string }[];
  followUp?: { question: string; options: string[]; answer: number };
}

export interface TransformPayload {
  type: 'transform';
  subtype: 'combine' | 'rewrite' | 'voice' | 'complement' | 'condition';
  inputs: Token[][];          // one or two source clauses
  chip: string;               // "虽然…但是" | "把" | "V不R" ...
  answer: string;             // AnnotatedSentence id
  acceptedAnswers: string[];  // normalised strings for type-it mode
  decoys: { t: string; code: string }[];
}

export interface ClozePayload {
  type: 'cloze';
  sentenceRef: string;
  blanks: number[];           // token indexes
  options: { t: string; ref?: string; correct: boolean; violates?: 'collocation'|'aspect'|'complement'|'pairing'|'lookalike'|'register'; code?: string; rationale: string }[];
}

export interface RecognitionPayload { type: 'recognition'; wordId: string; contextRef?: string; }
export interface LookalikePayload  { type: 'lookalike'; setId: string; targetChar: string; contextWord: string; }

export interface ReadingPassage {
  id: string;                 // "U08-B"
  unit: number;
  title: string;
  genre: 'diary' | 'chat' | 'notice' | 'story' | 'dialogue' | 'explanation';
  charCount: number;          // validated at build
  paragraphs: { tokens: Token[]; chunks: ChunkAnnotation[] }[];
  patternIds: string[];       // ≥ 4 unit patterns
  questions: PassageQuestion[];
}

export interface PassageQuestion {
  id: string;
  type: 'referent' | 'inference' | 'sequence' | 'truth' | 'function' | 'gist';
  stem: Token[];
  options: { tokens: Token[]; correct: boolean; rationale: string; code?: string }[];
  evidence: { paragraph: number; start: number; end: number }[]; // highlight on feedback
}

// ---------- User state (Dexie, persisted) ----------
export type Track = 'lexical' | 'syntactic';
export type Facet = 'word.recog' | 'word.produce' | 'char.form' | 'gram.form' | 'gram.use';

export interface FSRSCardState {
  id: string;                 // `${facet}:${itemId}`  e.g. "gram.form:G3-58"
  itemId: string;
  track: Track;
  facet: Facet;
  origin: 'curriculum' | 'bridge' | 'diagnostic' | 'remedial';
  // ts-fsrs Card fields (dates stored as epoch ms):
  due: number;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: 0 | 1 | 2 | 3;       // New, Learning, Review, Relearning
  last_review?: number;
  // app fields:
  recentInstanceIds: string[];// last 5 instances shown (variation, §1.4.4)
  suspended?: boolean;
}

export interface ReviewLog {
  id?: number;                // auto-increment
  cardId: string;
  ts: number;
  rating: 1 | 2 | 3 | 4;
  stateBefore: FSRSCardState['state'];
  stabilityBefore: number;
  difficultyBefore: number;
  elapsedDays: number;
  exerciseKind: ExerciseKind;
  instanceId: string;
  latencyMs: number;
  peeks: number;
}

export interface ErrorLog {
  id?: number;
  ts: number;
  attemptId: string;
  exerciseKind: ExerciseKind;
  instanceId: string;
  codes: string[];            // e.g. ["ORDER.TIME_AFTER_VERB"]
  itemIds: string[];          // items implicated (pattern, words, chars)
  learnerAnswer: string;      // serialised tiles / option id
  expected: string;
  remediated?: boolean;
}

export interface PeekEvent { id?: number; ts: number; wordId: string; displayLevel: 'L0_FULL'|'L1_PINYIN'|'L2_BARE'; inGradedExercise: boolean; }

export interface WeaknessState { code: string; score: number; updatedAt: number; itemIds: string[]; lastDrillAt?: number; }

export interface DiagnosticResult { id: 'latest'; ts: number; bandOutcomes: Record<number,'passed'|'failed'|'uncertain'|'assumed'>; grammarClusters: Record<string,'known'|'weak'>; }

export interface Settings {
  id: 'singleton';
  newWordsPerDay: number;     // 12
  newGrammarPerDay: number;   // 1
  retention: { lexical: number; syntactic: number };
  hanziSizePx: number;        // 22
  xrayDefault: boolean;
  lastBackupAt?: number;
  backupReminderDays: number; // 7
  contentVersion: string;
}
```

**Dexie schema (v1)**
```ts
db.version(1).stores({
  cards:     'id, itemId, track, facet, due, state, origin',
  reviews:   '++id, cardId, ts',
  errors:    '++id, ts, *codes, *itemIds',
  peeks:     '++id, ts, wordId',
  weakness:  'code, score',
  diagnostic:'id',
  settings:  'id',
  sessions:  '++id, startedAt',
});
```
Static content is **not** stored in IndexedDB; it is loaded from the precached JS chunks into memory (≈ 2–4 MB total). User state references content by stable string ids, so content updates never require data migration unless an id is retired (handled by a `content/renames.json` map applied at load).

### 5.4 Content packaging & sources
| Bundle | Contents | Source / licence |
|---|---|---|
| `syllabus.json` | counts, levels, unit list | from official syllabus (you to confirm) |
| `vocab_hsk12.json`, `vocab_hsk3.json` | `VocabItem[]` | official word list; glosses adapted from **CC-CEDICT** (CC BY-SA 4.0) and hand-edited for sense precision |
| `chars.json` | `CharItem[]` (587) | decomposition/radicals from **Make Me a Hanzi** (`dictionary.txt`, Arphic PL / LGPL) — data only, bundled |
| `grammar_hsk12.json`, `grammar_hsk3.json` | `GrammarPattern[]` | authored by Claude against the official grammar list |
| `exercises/unit-XX.json` | `ExerciseTemplate[]` | authored + generated at build |
| `passages/unit-XX.json` | `ReadingPassage[]` | authored |
| `errors.json`, `confusables.json` | taxonomy, look-alike sets | authored |

Attribution for CC-CEDICT and Make Me a Hanzi appears in Settings → About.

**Build-time validation (`scripts/validate-content.ts`, fails the build):**
1. Zod schema conformance for every bundle.
2. Every token `ref` resolves; every word's chars resolve.
3. Every authored instance passes gate G1 *against the vocabulary available at its unit* (words of units ≤ its unit + HSK 1–2), and G2.
4. Every passage: char count in range, ≥ 4 unit patterns, coverage ≥ 95% at unit completion.
5. Every Slot-Builder sentence's canonical order satisfies its pattern's constraints (self-consistency).
6. Every pattern has ≥ 3 examples and ≥ 15 instances (warning below 15, error below 8).
7. Coverage report: all 500 words appear in ≥ 3 instances; all 96 patterns have ≥ 1 passage occurrence.

### 5.5 Procedural sentence generation (no LLM at runtime)

**Policy:** *authored instances are primary*; generation adds variety only for patterns flagged safe. This avoids grammatical-but-unnatural output (a real risk with naive slot filling).

```ts
export interface GeneratorSpec {
  id: string;                         // "gen_ba_place"
  patternId: string;                  // "G3-59"
  skeleton: GenSlot[];                // ordered
  en: string;                         // "{S.en} put {O.en_def} {PLACE.en_prep}."
  blocklist?: [string, string][];     // forbidden word-id pairs (unnatural combos)
  maxPerSession: number;
}

export interface GenSlot {
  slot: SlotCode;
  fixed?: string;                     // literal "把" / "在"
  pick?: {
    pos: POS[];
    semantic: string[];               // all required tags, e.g. ["person"]
    agreeWith?: { slot: SlotCode; via: 'objectTags' | 'allowsResult' | 'allowsDirection' | 'measureWord' };
  };
  suffix?: string;                    // localiser "上" / "里"
}
```
**Example — G3-59 `把 + O + V + 在 + Place上`**
```
S    pick person                         → 妹妹
BA   fixed 把 + pick n[portable-object]  → 把 + 词典
V    pick v where valency.objectTags ⊇ O.semantic and allowsResult ∋ 在 → 放
C    fixed 在 + pick n[surface] + 上      → 在 + 桌子 + 上
SF   fixed 了
⇒ 妹妹把词典放在桌子上了。   en: "(My) younger sister put the dictionary on the table."
```
**Generation algorithm**
1. Filter candidate words per slot by POS + semantic tags + **exposure pool** (gate by construction).
2. Resolve agreement constraints (verb–object compatibility, measure words, complement compatibility from `VerbFrame`).
3. Reject combos in `blocklist`; reject if identical to any of the card's last 5 instances.
4. Seeded RNG (seed = cardId + review count) → deterministic, reproducible for bug reports.
5. Output an `AnnotatedSentence` with `source: 'generated'`, slots and chunks filled automatically from the skeleton, so it plugs into Slot Builder, Cloze and Transformation (`rewrite` 把↔被 is derived mechanically: `S 把 O V C` → `O 被 S V C`, only if `VerbFrame.allowsBei`).
6. Build script samples 50 outputs per generator into `reports/gen-samples.md` for human/Claude review before shipping; patterns whose samples contain unnatural sentences have their generator disabled.

### 5.6 Backup & restore
- **Export:** Settings → "Export backup" produces `hsk3-backup-YYYYMMDD-HHmm.json`:
  ```ts
  interface BackupFile {
    format: 'hsk3-workshop-backup'; schemaVersion: 1; contentVersion: string; exportedAt: number;
    tables: { cards: FSRSCardState[]; reviews: ReviewLog[]; errors: ErrorLog[]; peeks: PeekEvent[];
              weakness: WeaknessState[]; diagnostic: DiagnosticResult[]; settings: Settings[]; sessions: unknown[] };
    checksum: string;            // SHA-256 (WebCrypto) of the canonical JSON of `tables`
  }
  ```
  Delivered via the Web Share API (files) when available — lets you save to Files/Drive/AirDrop when you choose — falling back to a download link. Both work offline (share target chosen by you).
- **Import:** file picker → validate `format`, `schemaVersion` (run migrations if older), checksum → preview ("1,284 cards, 9,402 reviews, last review 3 Nov") → **Replace** (default) or **Merge** (per card, keep the one with the later `last_review`; union logs by `(cardId, ts)`).
- Before any import, an automatic **local snapshot** of current state is written to a `snapshots` table (last 3 kept) so an import can be undone.
- **Reminder:** a quiet banner when `now − lastBackupAt > backupReminderDays`. No nagging modals.

### 5.7 Mobile ergonomics
- Portrait-first; thumb zone: primary actions (Check / Continue) fixed at bottom; tiles in the lower half; prompt in the upper half.
- Min touch target 44×44 px; tile spacing ≥ 8 px; no hover-only affordances.
- `user-select: none` on tiles; long-press peek with 350 ms threshold; haptic `navigator.vibrate(10)` on Android for placement (no-op on iOS).
- Dark mode via `prefers-color-scheme` + manual override; slot colours have dark variants meeting WCAG AA against background, and every colour is paired with a text label (colour is never the only signal).
- Cold start target: < 1.5 s to interactive on a mid-range phone offline (route-level code splitting; content chunks per unit).

---

## 6. Phased implementation plan

Each milestone ends with a working, installable, offline build and passing tests. I will not start a milestone without your go-ahead.

### Milestone 1 — Offline PWA shell + FSRS engine + data model
**Build**
- Vite + React + TS + Tailwind project; `vite-plugin-pwa` precache-only; CSP; persisted-storage request.
- All TypeScript types (§5.3) + Zod schemas + `validate-content` script.
- Dexie DB v1 + repository layer.
- `srs/`: ts-fsrs wrapper with per-track params, automatic rating policy (§1.4.3), multi-item attempt rules (§1.4.5).
- `gate/`: exposure pool + `checkCoverage` (§1.1).
- Session builder with budgets, interleaving, overload protection (§1.5).
- Hanzi token component with pinyin fading levels + peek bottom sheet (with component breakdown) (§1.3).
- **Seed data:** full HSK 1–2 vocab (500) + HSK 3 Unit 1 vocab and its 8 patterns with instance banks; chars for those words; confusables starter set.
- Recognition + look-alike exercises (simplest types, to exercise the engine end-to-end).
- Adaptive HSK 1–2 diagnostic + bridge queue seeding (§1.2).
- Minimal backup export/import (full version in M4) — so progress is safe from day one.
**Acceptance**
- Install, enable airplane mode, kill & relaunch: app loads and a full session runs; Playwright offline test passes with zero non-self requests.
- Unit tests: FSRS rating mapping, gate ratio edge cases, diagnostic walk termination, pinyin-level rules, session interleaving constraints.

### Milestone 2 — Grammar Slot Builder + Minimal-Pair + Transformation
**Build**
- Slot Builder UI (tap + drag), slot colour system, decoys, free-rail mode; constraint-based grader returning error codes.
- Minimal-Pair engine with per-option rationales and follow-ups.
- Transformation engine (all 5 sub-types) using tile rail; type-it mode with normaliser.
- Cloze engine with tagged distractors.
- Rule-card pages for grammar patterns.
- Procedural generator (§5.5) + build-time sample report.
- Content: Units 1–3 complete (words, 24 patterns, instance banks, contrast bank items for their pairs).
**Acceptance**
- Grader accepts all alternative orders, rejects each constraint violation with the correct code (table-driven tests per pattern).
- Generated instances always pass gate; deterministic per seed.

### Milestone 3 — Micro-Reading X-ray Reader + Diagnostic Error Engine
**Build**
- Passage reader: paragraphs, pinyin fading, peek, X-ray chunk rendering with pair-linking, question flow with evidence highlighting.
- Passage lock/unlock UI with blocking-word queueing (G5).
- Error taxonomy (`errors.json`), feedback panel (§4.2), weakness scoring + remediation micro-drills (§4.4), "Try a twin".
- Progress page: the metrics in §1.6 incl. weakness map (no gamification).
- Content: Units 4–6 + their 6 passages + review passage after Unit 3 and 6.
**Acceptance**
- Every passage renders X-ray correctly at 320–430 px widths; questions keyed to evidence spans.
- Simulated error streams trigger exactly the expected drills (unit tests with fixed clocks).

### Milestone 4 — Full curriculum seeding + backup/restore hardening
**Build**
- Units 7–12: remaining words, patterns G3-49…G3-96, instance banks, contrast items, 12 passages + 2 review passages.
- Reconcile word list & grammar inventory against the official syllabus file; `renames.json` for any id changes.
- Full backup/restore: checksum, migrations, merge mode, snapshots, Web Share export, reminder banner.
- Font subsetting on final character set; performance pass; accessibility pass.
- Optional: on-device FSRS parameter optimisation once ≥ 1,000 reviews/track.
**Acceptance**
- `validate-content` passes with full coverage report (500/500 words in ≥ 3 instances, 96/96 patterns with ≥ 15 instances and ≥ 1 passage).
- Export → wipe → import round-trip restores identical state (deep-equal test).

### Milestone 5 — HSK 4 course
Unit map for HSK 4 (specified in this document before work starts), vocabulary and grammar bundles, passages. No new engine work expected beyond tuning.

### Milestone 6 — HSK 5 course
Same as M5 for HSK 5; longer passages (250–500 chars) and multi-paragraph X-ray.

---

## 7. Decisions log
| Date | Decision |
|---|---|
| 2026-11-15 | No official list file → Claude compiles provisional lists (`provisional: true`). |
| 2026-11-15 | Scope extended to HSK 5 (M5 = HSK 4, M6 = HSK 5). |
| 2026-11-15 | Android only. System CJK font. |
| 2026-11-15 | Public GitHub repo + GitHub Pages for install. |
| 2026-11-15 | English explanations. Default budgets (12 words + 1 grammar point/day) kept. |
| 2026-11-15 | M1 approved. |
