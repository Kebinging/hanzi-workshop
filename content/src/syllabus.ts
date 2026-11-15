import type { Syllabus } from '../../src/content/types';

export const syllabus: Syllabus = {
  version: '0.1.0-m1',
  levels: [
    { level: 2, cumulativeWords: 500, cumulativeChars: 300, grammarPoints: 0 },
    { level: 3, cumulativeWords: 1000, cumulativeChars: 587, grammarPoints: 96 },
  ],
  units: [
    { unit: 1, hsk: 3, title: 'Daily rhythm', titleZh: '生活节奏', theme: 'Aspect & time adverbs', patternIds: ['G3-01','G3-02','G3-03','G3-04','G3-05','G3-06','G3-07','G3-08'], available: true },
    { unit: 2, hsk: 3, title: 'Plans & habits', titleZh: '安排与习惯', theme: 'Sequence, frequency, duration', patternIds: [], available: false },
    { unit: 3, hsk: 3, title: 'Comparing things', titleZh: '比一比', theme: 'Comparison & degree', patternIds: [], available: false },
    { unit: 4, hsk: 3, title: 'How well?', titleZh: '怎么样？', theme: 'State complement 得 & reduplication', patternIds: [], available: false },
    { unit: 5, hsk: 3, title: 'Getting it done', titleZh: '做完了没有？', theme: 'Result complements', patternIds: [], available: false },
    { unit: 6, hsk: 3, title: 'Comings and goings', titleZh: '进来吧', theme: 'Directional complements & existentials', patternIds: [], available: false },
    { unit: 7, hsk: 3, title: "Can or can't", titleZh: '能不能？', theme: 'Potential complements & modals', patternIds: [], available: false },
    { unit: 8, hsk: 3, title: 'Handling things', titleZh: '把它放好', theme: '把 disposal', patternIds: [], available: false },
    { unit: 9, hsk: 3, title: 'Things that happened to me', titleZh: '被偷了！', theme: '被 passive & focus', patternIds: [], available: false },
    { unit: 10, hsk: 3, title: 'Conditions & choices', titleZh: '要是…就好了', theme: 'Conditionals, totality', patternIds: [], available: false },
    { unit: 11, hsk: 3, title: 'Weighing things up', titleZh: '虽然…但是', theme: 'Concession, addition, cause, purpose', patternIds: [], available: false },
    { unit: 12, hsk: 3, title: 'Telling a story', titleZh: '讲故事', theme: 'Narrative cohesion & separable verbs II', patternIds: [], available: false },
  ],
};
