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

export type Route = 'home' | 'session' | 'flight' | 'diagnostic' | 'progress' | 'settings' | 'grammar';
const ROUTES: Route[] = ['home', 'session', 'flight', 'diagnostic', 'progress', 'settings', 'grammar'];

function readHash(): Route {
  const r = location.hash.replace(/^#\/?/, '') as Route;
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

  switch (route) {
    case 'session': return <SessionView key="normal" mode="normal" onExit={home} />;
    case 'flight': return <SessionView key="flight" mode="flight" onExit={home} />;
    case 'diagnostic': return <DiagnosticView onDone={home} />;
    case 'progress': return <ProgressView onBack={home} />;
    case 'settings': return <SettingsView onBack={home} onRecalibrate={() => go('diagnostic')} />;
    case 'grammar': return <GrammarView onBack={home} />;
    default: return <HomeView go={go} />;
  }
}
