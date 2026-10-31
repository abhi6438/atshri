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
import { SocialFloat } from './components/common/SocialFloat';
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
import {
  isRouteEnabled,
  parsePathPage,
  pathForPage,
  resolveInitialPage,
  publicPageIds,
} from './utils/navigation';

const clone = x => structuredClone(x);
const THEME_KEY = 'atshri.theme.v2'; // new key so old auto-saved 'light' values don't override the dark default

/** Per-page <title> and meta description (bilingual). */
const SEO = {
  home: {
    en: ['Atshri Trust — Seva · Samaj · Shakti | Rewa, Madhya Pradesh', 'Atshri Trust is a registered public charitable trust in Rewa, Madhya Pradesh — serving through relief, temple seva, education, health and environmental initiatives.'],
    hi: ['अथश्री ट्रस्ट — सेवा · समाज · शक्ति | रीवा, मध्य प्रदेश', 'अथश्री ट्रस्ट रीवा, मध्य प्रदेश का पंजीकृत सार्वजनिक धर्मार्थ न्यास है — राहत, मंदिर सेवा, शिक्षा, स्वास्थ्य एवं पर्यावरण के माध्यम से सेवा।'],
  },
  about: {
    en: ['About Us, Vision & Trustees — Atshri Trust', 'Our story, vision, mission, values, trustees and registration details of Atshri Trust, Rewa.'],
    hi: ['हमारे बारे में, दृष्टि एवं ट्रस्टी — अथश्री ट्रस्ट', 'अथश्री ट्रस्ट की कहानी, दृष्टि, मिशन, मूल्य, ट्रस्टी एवं पंजीयन विवरण।'],
  },
  activities: {
    en: ['Activities & Events — Atshri Trust', 'Completed and upcoming seva activities by Atshri Trust — water, blankets, temple seva, education, plantation and more.'],
    hi: ['गतिविधियाँ एवं कार्यक्रम — अथश्री ट्रस्ट', 'अथश्री ट्रस्ट की पूर्ण एवं आगामी सेवा गतिविधियाँ।'],
  },
  gallery: {
    en: ['Gallery — Photos & Videos | Atshri Trust', 'Photos, videos and reels from Atshri Trust seva activities in Rewa.'],
    hi: ['गैलरी — तस्वीरें एवं वीडियो | अथश्री ट्रस्ट', 'अथश्री ट्रस्ट की सेवा गतिविधियों की तस्वीरें, वीडियो एवं रील।'],
  },
  involved: {
    en: ['Get Involved — Volunteer & Support | Atshri Trust', 'Volunteer with Atshri Trust or support our seva initiatives in Rewa.'],
    hi: ['जुड़ें — स्वयंसेवक बनें | अथश्री ट्रस्ट', 'अथश्री ट्रस्ट के साथ स्वयंसेवा करें या सेवा पहलों का सहयोग करें।'],
  },
  contact: {
    en: ['Contact Us — Atshri Trust, Rewa', 'Get in touch with Atshri Trust, Rewa, Madhya Pradesh.'],
    hi: ['संपर्क करें — अथश्री ट्रस्ट, रीवा', 'अथश्री ट्रस्ट, रीवा, मध्य प्रदेश से संपर्क करें।'],
  },
  admin: { en: ['Admin — Atshri Trust'], hi: ['एडमिन — अथश्री ट्रस्ट'] },
  'access-denied': { en: ['Page unavailable — Atshri Trust'], hi: ['पृष्ठ उपलब्ध नहीं — अथश्री ट्रस्ट'] },
};

function setMeta(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() =>
    (() => {
      // dark by default; light only if the visitor chose it
      try { return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
    })(),
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1020' : '#24346b');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const [lang, setLang] = useState('en');
  const [mob, setMob] = useState(false);
  const [admin, setAdmin] = useState(false);

  const [menu, setMenu] = useState(() => clone(SITE_DEFAULT.menu));
  const [donateCta, setDonateCta] = useState(() => clone(SITE_DEFAULT.donateCta));
  const [cats, setCats] = useState(CATEGORIES);
  const [acts, setActs] = useState(() => structuredClone(ACTIVITIES));
  const [team, setTeam] = useState(TEAM);
  const [stats, setStats] = useState(STATS);
  const [values, setValues] = useState(VALUES);

  const visMenu = menu.filter(m => m.enabled !== false && m.showInNav !== false);
  const visActs = acts.filter(a => a.visible);
  const visCats = cats.filter(c => c.visible);
  const rawPage = parsePathPage(location.pathname);
  const page = resolveInitialPage(menu, rawPage);

  const pageEnabled = useCallback(id => isRouteEnabled(menu, id), [menu]);

  // ── SEO + document language ───────────────────────────────────────
  useEffect(() => {
    document.documentElement.lang = lang;
    const entry = (SEO[page] || SEO.home)[lang] || [];
    if (entry[0]) document.title = entry[0];
    setMeta('description', entry[1] || SEO.home[lang][1]);
    setMeta('robots', page === 'admin' || page === 'access-denied' ? 'noindex' : 'index,follow');
  }, [page, lang]);

  // ── Scroll-reveal for elements with .reveal ───────────────────────
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.is-in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });

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
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'flex', flexDirection: 'column' }}>
      <a href="#main" className="skip-link">{lang === 'en' ? 'Skip to content' : 'सामग्री पर जाएँ'}</a>
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
      <main id="main" key={page} className="page-enter" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
        {page === 'home' && pageEnabled('home') && <PageHome {...shared} />}
        {page === 'about' && pageEnabled('about') && <PageAbout {...shared} />}
        {page === 'activities' && pageEnabled('activities') && <PageActivities {...shared} />}
        {page === 'gallery' && pageEnabled('gallery') && <PageGallery {...shared} />}
        {page === 'involved' && pageEnabled('involved') && <PageInvolved {...shared} />}
        {page === 'contact' && pageEnabled('contact') && <PageContact {...shared} />}
        {page === 'access-denied' && <PageAccessDenied lang={lang} go={go} />}
        {page === 'admin' && !admin && <AdminLogin setAdmin={setAdmin} />}
        {page === 'admin' && admin && (
          <AdminDash
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
            setAdmin={setAdmin}
          />
        )}
      </main>
      <Footer lang={lang} go={go} cats={visCats} menu={menu} />
      <SocialFloat social={SITE_DEFAULT.social} />
    </div>
  );
}
