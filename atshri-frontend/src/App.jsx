import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  SITE_DEFAULT,
  CATEGORIES,
  ACTIVITIES,
  TEAM,
  STATS,
  VALUES,
} from './data';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { PageHome } from './pages/Home';
import { PageAbout } from './pages/About';
import { PageActivities } from './pages/Activities';
import { PageGallery } from './pages/Gallery';
import { PageInvolved } from './pages/Involved';
import { PageContact } from './pages/Contact';
import { PageAccessDenied } from './pages/AccessDenied';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDash } from './admin/AdminDash';
import { fetchContent } from './api';
import {
  isRouteEnabled,
  parsePathPage,
  pathForPage,
  resolveInitialPage,
  publicPageIds,
} from './utils/navigation';

const clone = x => structuredClone(x);
const THEME_KEY = 'atshri.theme';
const ADMIN_TOKEN_KEY = 'atshri.adminToken';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light',
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#12100e' : '#F4831F');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const [lang, setLang] = useState('en');
  const [mob, setMob] = useState(false);
  const [adminToken, setAdminToken] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem(ADMIN_TOKEN_KEY) || '' : '',
  );
  const [admin, setAdmin] = useState(() => !!adminToken);

  const [menu, setMenu] = useState(() => clone(SITE_DEFAULT.menu));
  const [donateCta, setDonateCta] = useState(() => clone(SITE_DEFAULT.donateCta));
  const [cats, setCats] = useState(CATEGORIES);
  const [acts, setActs] = useState(() => structuredClone(ACTIVITIES));
  const [team, setTeam] = useState(TEAM);
  const [stats, setStats] = useState(STATS);
  const [values, setValues] = useState(VALUES);

  useEffect(() => {
    if (adminToken) localStorage.setItem(ADMIN_TOKEN_KEY, adminToken);
    else localStorage.removeItem(ADMIN_TOKEN_KEY);
  }, [adminToken]);

  useEffect(() => {
    if (import.meta.env.VITE_USE_API_CONTENT !== 'true') return;
    let active = true;
    fetchContent()
      .then(data => {
        if (!active) return;
        // Always apply a successful response (including empty arrays) so the UI
        // reflects the database. Previously we skipped empty lists, which left
        // bundled static data in place when the DB was not seeded yet.
        setMenu(Array.isArray(data.menu) ? data.menu : []);
        setCats(Array.isArray(data.categories) ? data.categories : []);
        setActs(Array.isArray(data.activities) ? data.activities : []);
        setTeam(Array.isArray(data.team) ? data.team : []);
        setStats(Array.isArray(data.stats) ? data.stats : []);
        setValues(Array.isArray(data.values) ? data.values : []);
      })
      .catch(err => {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn(
            '[atshri] GET /content failed; keeping bundled src/data. Check VITE_API_URL, CORS, and that the API is running.',
            err,
          );
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const visMenu = menu.filter(m => m.enabled !== false && m.showInNav !== false);
  const visActs = acts.filter(a => a.visible);
  const visCats = cats.filter(c => c.visible);
  const rawPage = parsePathPage(location.pathname);
  const page = resolveInitialPage(menu, rawPage);

  const pageEnabled = useCallback(id => isRouteEnabled(menu, id), [menu]);

  const go = useCallback(
    targetId => {
      setMob(false);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 10);

      if (targetId === 'admin') {
        navigate(pathForPage('admin'));
        return;
      }
      if (targetId === 'access-denied') {
        navigate(pathForPage('access-denied'));
        return;
      }
      if (!publicPageIds(menu).has(targetId)) {
        navigate(pathForPage('home'));
        return;
      }
      if (!isRouteEnabled(menu, targetId)) {
        navigate(pathForPage('access-denied'));
        return;
      }
      navigate(pathForPage(targetId));
    },
    [menu, navigate],
  );

  useEffect(() => {
    if (rawPage !== page) navigate(pathForPage(page), { replace: true });
  }, [rawPage, page, navigate]);

  const donateTarget = menu.find(m => m.id === donateCta.targetId);
  const showDonate =
    donateCta.show !== false && donateTarget && isRouteEnabled(menu, donateCta.targetId);

  const shared = {
    lang,
    go,
    acts: visActs,
    cats: visCats,
    team,
    stats,
    values,
    pageEnabled,
    donateCta,
  };

  return (
    <div style={{ fontFamily: "'Baloo 2',sans-serif", minHeight: '100vh', background: 'var(--sfp)', color: 'var(--tx)' }}>
      <Nav
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        page={page}
        go={go}
        menu={visMenu}
        mob={mob}
        setMob={setMob}
        showDonate={showDonate}
        donateCta={donateCta}
      />
      <main>
        {page === 'home' && pageEnabled('home') && <PageHome {...shared} />}
        {page === 'about' && pageEnabled('about') && <PageAbout {...shared} />}
        {page === 'activities' && pageEnabled('activities') && <PageActivities {...shared} />}
        {page === 'gallery' && pageEnabled('gallery') && <PageGallery {...shared} />}
        {page === 'involved' && pageEnabled('involved') && <PageInvolved {...shared} />}
        {page === 'contact' && pageEnabled('contact') && <PageContact {...shared} />}
        {page === 'access-denied' && <PageAccessDenied lang={lang} go={go} />}
        {page === 'admin' && !admin && (
          <AdminLogin
            onLogin={token => {
              setAdminToken(token);
              setAdmin(true);
            }}
          />
        )}
        {page === 'admin' && admin && (
          <AdminDash
            adminToken={adminToken}
            lang={lang}
            menu={menu}
            setMenu={setMenu}
            donateCta={donateCta}
            setDonateCta={setDonateCta}
            cats={cats}
            setCats={setCats}
            acts={acts}
            setActs={setActs}
            team={team}
            setTeam={setTeam}
            stats={stats}
            setStats={setStats}
            values={values}
            setValues={setValues}
            setAdmin={next => {
              if (next === false) {
                setAdmin(false);
                setAdminToken('');
                return;
              }
              setAdmin(!!next);
            }}
          />
        )}
      </main>
      <Footer lang={lang} go={go} cats={visCats} menu={menu} />
    </div>
  );
}
