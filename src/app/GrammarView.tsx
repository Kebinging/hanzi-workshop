import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { content } from '../content';
import { db } from '../db/db';
import { retrievability } from '../srs/fsrs';
import { Card, Page, TopBar } from '../ui/kit';
import { RuleCard } from '../ui/grammarKit';
import { MasteryRing } from '../ui/PeekSheet';

/** Rule-card pages for every shipped unit (spec 6, M2). */
export function GrammarView({ onBack }: { onBack: () => void }) {
  const units = content.bundle.syllabus.units.filter((u) => u.available);
  const [open, setOpen] = useState<string | null>(null);
  const cards = useLiveQuery(() => db.cards.where('facet').equals('gram.form').toArray(), []);
  const now = Date.now();
  const byId = new Map((cards ?? []).map((c) => [c.itemId, c]));

  return (
    <div className="min-h-dvh">
      <TopBar title="Grammar" onBack={onBack} />
      <Page>
        <div className="space-y-6">
          {units.map((u) => (
            <section key={u.unit}>
              <h2 className="mb-2 text-sm font-semibold text-ink-3">Unit {u.unit} · <span className="han">{u.titleZh}</span> · {u.theme}</h2>
              <div className="space-y-2">
                {content.unitPatterns(u.unit).map((g) => {
                  const c = byId.get(g.id);
                  const status = !c || c.state === 0 ? 'not started' : c.state === 2 ? 'in review' : 'learning';
                  return (
                    <Card key={g.id} className="!p-0">
                      <button type="button" className="flex w-full items-center gap-3 p-4 text-left" onClick={() => setOpen(open === g.id ? null : g.id)} aria-expanded={open === g.id}>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-ink-3">{g.id} · {status}</div>
                          <div className="font-semibold">{g.title}</div>
                          <div className="han text-sm text-ink-3">{g.titleZh}</div>
                        </div>
                        {c?.state === 2 && <MasteryRing value={retrievability(c, now)} />}
                      </button>
                      {open === g.id && <div className="border-t border-line p-4"><RuleCard pattern={g} /></div>}
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </Page>
    </div>
  );
}
