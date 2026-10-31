import { useEffect } from 'react';
import { useScrolled } from '../../hooks/useScrolled';
import { Logo, LogoName } from '../common/Logo';
import { Icon } from '../common/Icon';

function LangSwitch({ lang, setLang }) {
  return (
    <div className="lang-switch" role="group" aria-label="Language / भाषा">
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">EN</button>
      <button type="button" aria-pressed={lang === 'hi'} onClick={() => setLang('hi')} lang="hi">हिं</button>
    </div>
  );
}

function ThemeBtn({ theme, toggleTheme }) {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      <Icon name={dark ? 'sun' : 'moon'} />
    </button>
  );
}

export function Nav({ lang, setLang, theme, toggleTheme, page, go, menu, mob, setMob, showDonate, donateCta }) {
  const scrolled = useScrolled(24);
  const overHero = page === 'home' && !scrolled;

  // lock body scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!mob) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = e => e.key === 'Escape' && setMob(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mob, setMob]);

  const donateLabel = donateCta ? `${donateCta.label[lang]}${donateCta.suffix ? ` ${donateCta.suffix}` : ''}` : '';

  return (
    <>
      <header className={`site-nav${overHero ? ' is-over-hero' : ' is-solid'}`}>
        <div className="container site-nav__inner">
          <button type="button" className="brand" onClick={() => go('home')} aria-label={lang === 'en' ? 'Atshri Trust — home' : 'अथश्री ट्रस्ट — होम'}>
            <Logo size={44} />
            <span>
              <LogoName lang={lang} />
              <span className="brand__sub" style={{ display: 'block' }}>
                {lang === 'en' ? 'Seva · Samaj · Shakti' : 'सेवा · समाज · शक्ति'}
              </span>
            </span>
          </button>

          <nav aria-label={lang === 'en' ? 'Main' : 'मुख्य'} style={{ display: 'flex', alignItems: 'center' }}>
            <ul className="nav-links">
              {menu.map(m => (
                <li key={m.id}>
                  <button
                    type="button"
                    className={`nav-link${page === m.id ? ' is-active' : ''}`}
                    aria-current={page === m.id ? 'page' : undefined}
                    onClick={() => go(m.id)}
                  >
                    {m.label[lang]}
                  </button>
                </li>
              ))}
            </ul>
            <div className="nav-tools nav-tools--desktop">
              {showDonate && (
                <button type="button" className={`btn btn-sm ${overHero ? 'btn-light' : 'btn-primary'}`} onClick={() => go(donateCta.targetId)}>
                  {donateLabel}
                </button>
              )}
              <LangSwitch lang={lang} setLang={setLang} />
              <ThemeBtn theme={theme} toggleTheme={toggleTheme} />
            </div>
            <button
              type="button"
              className="icon-btn nav-burger"
              onClick={() => setMob(true)}
              aria-label={lang === 'en' ? 'Open menu' : 'मेनू खोलें'}
              aria-expanded={mob}
              aria-controls="mobile-drawer"
            >
              <Icon name="menu" />
            </button>
          </nav>
        </div>
      </header>

      {mob && (
        <>
          <div className="drawer-backdrop" onClick={() => setMob(false)} aria-hidden="true" />
          <div id="mobile-drawer" className="drawer" role="dialog" aria-modal="true" aria-label={lang === 'en' ? 'Menu' : 'मेनू'}>
            <div className="drawer__head">
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Logo size={36} />
                <LogoName lang={lang} />
              </span>
              <button type="button" className="icon-btn" onClick={() => setMob(false)} aria-label={lang === 'en' ? 'Close menu' : 'मेनू बंद करें'} autoFocus>
                <Icon name="close" />
              </button>
            </div>
            <ul className="drawer__links">
              {menu.map(m => (
                <li key={m.id}>
                  <button
                    type="button"
                    className={`drawer__link${page === m.id ? ' is-active' : ''}`}
                    aria-current={page === m.id ? 'page' : undefined}
                    onClick={() => go(m.id)}
                  >
                    {m.label[lang]}
                    <Icon name="arrow" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="drawer__foot">
              {showDonate && (
                <button type="button" className="btn btn-primary btn-block" onClick={() => go(donateCta.targetId)}>
                  {donateLabel}
                </button>
              )}
              <div className="drawer__tools">
                <LangSwitch lang={lang} setLang={setLang} />
                <ThemeBtn theme={theme} toggleTheme={toggleTheme} />
              </div>
              <p className="muted" style={{ fontSize: 12, fontFamily: 'var(--font-hi)' }}>सेवा परमो धर्मः</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
