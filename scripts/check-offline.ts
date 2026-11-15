/**
 * Zero-network check (spec 5.1): scans the production build for anything that could reach
 * a remote origin at runtime. Fails if it finds fetch/XHR/import/src/href to an external URL.
 * Run after `npm run build`: npm run check-offline
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const dist = join(process.cwd(), 'dist');
const files: string[] = [];
const walk = (d: string) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (['.js', '.html', '.css', '.webmanifest'].includes(extname(p))) files.push(p);
  }
};
walk(dist);

// Strings that are URLs but never requested (namespaces, error-doc links in library code).
const HARMLESS = [/^https?:\/\/www\.w3\.org\//, /^https?:\/\/react\.dev\/errors/, /^https?:\/\/reactjs\.org\/docs\/error-decoder/, /^https?:\/\/(github\.com|dexie\.org)\//];
const URL_RE = /https?:\/\/[^\s"'`)<>\\]+/g;
const RISKY_CONTEXT = /(fetch\(|XMLHttpRequest|importScripts\(|src=|href=|@import|url\()\s*["'`]?https?:\/\//;

let failures = 0;
const seen = new Map<string, Set<string>>();
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(URL_RE)) {
    const url = m[0];
    if (HARMLESS.some((h) => h.test(url))) continue;
    const ctx = text.slice(Math.max(0, m.index! - 20), m.index! + 8);
    const risky = RISKY_CONTEXT.test(ctx);
    if (risky) failures++;
    const key = `${risky ? 'RISKY' : 'string'}  ${url}`;
    if (!seen.has(key)) seen.set(key, new Set());
    seen.get(key)!.add(f.replace(dist, 'dist'));
  }
  if (f.endsWith('index.html') && !text.includes("connect-src 'self'")) {
    console.error('✗ index.html is missing the CSP connect-src \'self\' meta tag');
    failures++;
  }
}
for (const [k, fs] of seen) console.log(`  ${k}  (${[...fs].join(', ')})`);
if (failures) {
  console.error(`✗ ${failures} potential network reference(s) in the build`);
  process.exit(1);
}
console.log(`✓ no runtime network references in ${files.length} files`);
