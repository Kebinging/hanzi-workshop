# 汉字工坊 · Hanzi Workshop

A personal, fully offline PWA for learning Mandarin from HSK 3 onward — reading, character recognition and grammar construction only. No accounts, no server, no network calls while studying. Everything is stored on the phone (IndexedDB) and can be exported as a JSON backup.

The full design lives in [docs/SPEC.md](docs/SPEC.md).

## Status — Milestone 1

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
