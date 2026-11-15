import { readFileSync, readdirSync } from 'node:fs';
const files = readdirSync('content/src').filter((f) => f.startsWith('vocab-'));
const set = new Set<string>(); let n = 0; let pool = 0;
for (const f of files) for (const l of readFileSync('content/src/' + f, 'utf8').split(/\r?\n/)) {
  if (!l || l[0] === '#' || l[0] === '@') continue; n++; if (f.includes('hsk12')) pool++;
  for (const c of l.split('|')[0]) set.add(c);
}
const have = new Set(readFileSync('content/src/chars.txt', 'utf8').split(/\r?\n/).map((l) => l.split('|')[0]));
console.log(`words ${n} (pool ${pool}), chars ${set.size}`);
console.log('missing:', [...set].filter((c) => !have.has(c)).join(''));
