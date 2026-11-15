import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, getSettings } from '../db/db';
import { ensureCards } from '../srs/controller';
import { content } from '../content';
import { HomeView } from './HomeView';
import { SessionView } from './SessionView';
import { DiagnosticView } from './DiagnosticView';
import { ProgressView } from './ProgressView';
import { SettingsView } from './SettingsView';
import { GrammarView } from './GrammarView';
import { ReaderView, ReadingListView } from './ReadingView';

export type Route = 'home' | 'session' | 'flight' | 'diagnostic' | 'progress' | 'settings' | 'grammar' | 'reading' | `read/${string}`;
const ROUTES: Route[] = ['home', 'session', 'flight', 'diagnostic', 'progress', 'settings', 'grammar', 'reading'];

function readHash(): Route {
  const r = location.hash.replace(/^#\/?/, '') as Route;
  if (r.startsWith('read/')) return r;
  return ROUTES.includes(r) ? r : 'home';
}

export function App() {
  const [route, setRoute] = useState<Route>(readHash);
  const settings = useLiveQuery(() => getSettings(), []);
  const needsCalibration = useLiveQuery(async () => (await db.diagnostic.count()) === 0 && (await db.cards.count()) === 0, []);

  useEffect(() => {
    const onHash = () => setRoute(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (!settings) return;
    const el = document.documentElement;
    if (settings.theme === 'system') el.removeAttribute('data-theme');
    else el.setAttribute('data-theme', settings.theme);
    el.style.setProperty('--hanzi-size', `${settings.hanziSizePx}px`);
  }, [settings]);

  const go = (r: Route) => { location.hash = r === 'home' ? '' : `/${r}`; setRoute(r); };
  const home = () => go('home');

  // First run: send to calibration (as a route, so the results screen survives the data write).
  useEffect(() => {
    if (needsCalibration && route !== 'diagnostic') go('diagnostic');
    if (needsCalibration === false) void ensureCards(content);
  }, [needsCalibration, route]);

  if (needsCalibration === undefined) return null;
  if (needsCalibration && route !== 'diagnostic') return null;

  if (route.startsWith('read/')) return <ReaderView key={route} passageId={route.slice(5)} onBack={() => go('reading')} />;
  switch (route) {
    case 'session': return <SessionView key="normal" mode="normal" onExit={home} />;
    case 'flight': return <SessionView key="flight" mode="flight" onExit={home} />;
    case 'diagnostic': return <DiagnosticView onDone={home} />;
    case 'progress': return <ProgressView onBack={home} />;
    case 'settings': return <SettingsView onBack={home} onRecalibrate={() => go('diagnostic')} />;
    case 'grammar': return <GrammarView onBack={home} />;
    case 'reading': return <ReadingListView onBack={home} onOpen={(id) => go(`read/${id}`)} />;
    default: return <HomeView go={go} />;
  }
}
