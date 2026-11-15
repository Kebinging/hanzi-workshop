import { useState } from 'react';
import { content } from '../content';
import type { GrammarPattern } from '../content/types';
import { Card, Page, TopBar } from '../ui/kit';

/** Minimal markdown: paragraphs, **bold**, list items. Content is authored by us, never user input. */
function Md({ text }: { text: string }) {
  const inline = (s: string) => s.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') ? <b key={i}>{part.slice(2, -2)}</b> : <span key={i}>{part}</span>);
  return (
    <div className="space-y-2 text-ink-2">
      {text.split(/\n\n+/).map((block, i) => {
        const lines = block.split('\n');
        if (lines.every((l) => l.startsWith('- '))) {
          return <ul key={i} className="list-disc pl-5">{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
        }
        return <p key={i}>{inline(block)}</p>;
      })}
    </div>
  );
}

const plain = (s: GrammarPattern['examples'][number]) => s.tokens.map((t) => t.t).join('');

export function GrammarView({ onBack }: { onBack: () => void }) {
  const patterns = content.unitPatterns(1);
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="min-h-dvh">
      <TopBar title="Unit 1 grammar" onBack={onBack} />
      <Page>
        <p className="mb-4 text-sm text-ink-3">Reference notes. Construction drills for these patterns arrive with the next update; for now they're here to read.</p>
        <div className="space-y-2">
          {patterns.map((g) => (
            <Card key={g.id} className="!p-0">
              <button type="button" className="w-full p-4 text-left" onClick={() => setOpen(open === g.id ? null : g.id)} aria-expanded={open === g.id}>
                <div className="text-xs text-ink-3">{g.id}</div>
                <div className="font-semibold">{g.title}</div>
                <div className="han text-sm text-ink-3">{g.titleZh}</div>
              </button>
              {open === g.id && (
                <div className="border-t border-line p-4">
                  <Md text={g.explanationMd} />
                  <h3 className="mt-4 mb-1 text-sm font-semibold">Examples</h3>
                  <ul className="space-y-2">
                    {g.examples.map((e) => (
                      <li key={e.id}><div className="han text-xl">{plain(e)}</div><div className="text-sm text-ink-3">{e.en}</div></li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Page>
    </div>
  );
}
