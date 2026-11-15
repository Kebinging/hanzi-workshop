# 汉字工坊 · Hanzi Workshop

A personal, fully offline PWA for learning Mandarin from HSK 3 onward — reading, character recognition and grammar construction only. No accounts, no server, no network calls while studying. Everything is stored on the phone (IndexedDB) and can be exported as a JSON backup.

The full design lives in [docs/SPEC.md](docs/SPEC.md).

## Status — Milestone 4

- The full HSK 3 course: 12 units, 497 new words on top of the 500-word HSK 1–2 base, all 96 grammar patterns (potential complements, 把, 被, 是…的, 连…都, conditionals, the conjunction pairs, narrative connectives, separable verbs)
- 28 reading passages (two per unit plus four cumulative reviews), every pattern appearing in at least one
- 155 contrast drills, 392 fill-in-the-gap items, 33 transformations
- Backup import can **merge** or **replace**, and any import can be undone from Settings
- `reports/coverage.md` tracks content coverage against the spec targets

## Milestone 3

- Reading: 14 graded passages (two per unit for Units 1–6 plus reviews after Units 3 and 6), each locked until you know 95% of its words, with a one-tap "queue the missing words" button
- X-ray mode: clause shading, subordinate clauses, time/place/complement underlines, topic and modifier marks, colour-linked connective pairs
- Inference-style questions (who/why/order/what it means) with evidence highlighted in the passage
- Error engine: weakness scores per mistake type, automatic 5-item focus drills, "Try a twin" after a wrong answer, and a weakness map with 30-day trends
- Units 4–6 (127 words, 24 patterns: 得 complements, results, directions, existentials)

## Milestone 2

- Grammar track live for Units 1–3 (24 HSK 3 patterns): Slot Builder, transformations, minimal pairs, cloze, plus sentence-judgement drills for weak HSK 1–2 grammar
- Constraint-based order grader that names the mistake (time word after verb, adverb position, 了 placement, 比 order, …)
- Rule cards with slot-coloured examples; units unlock as the previous unit's grammar and words are learned
- Build-time sentence generators with a review report in `reports/gen-samples.md`

## Milestone 1

- Offline PWA shell (service worker precache, CSP `connect-src 'self'`, persistent storage request)
- Dual-track FSRS engine (`ts-fsrs`), automatic ratings from correctness and response time
- Coverage gate (i+1) and exposure pool
- Pinyin fading with tap-to-peek (pinyin, meaning, radical and components, look-alike warnings)
- Adaptive HSK 1–2 calibration, with gaps fed into sessions as a bridge queue
- Exercises: word recognition (in context when a gated sentence exists) and look-alike character discrimination
- Content: 500 HSK 1–2 words, Unit 1 (42 words, 8 grammar patterns with notes and sentence banks), 525 characters, 16 look-alike sets
- JSON backup export (Android share sheet) and import with checksum and an automatic snapshot

Word lists, glosses, character breakdowns and grammar notes are compiled for this project and marked **provisional** until reconciled against an official HSK list.

## Install on Android

1. Open the GitHub Pages URL in Chrome.
2. Menu ⋮ → **Install app** (or **Add to Home screen**).
3. Open it once while online; after that it works in airplane mode.

## Develop

```bash
npm install
npm run dev          # local dev server
npm test             # unit tests (vitest)
npm run build        # compile content, validate, typecheck, build
npm run check-offline  # scan the build for runtime network references
```

Content is authored in compact form under `content/src/` and compiled to `content/dist/bundle.json` by `npm run content`, which also validates schemas, references and the coverage gate for every sentence.
