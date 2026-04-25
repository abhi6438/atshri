import { useScrolled } from '../../hooks/useScrolled';
import { Logo, LogoName } from '../common/Logo';

export function Nav({ lang, setLang, theme, toggleTheme, page, go, menu, mob, setMob, showDonate, donateCta }) {
  const scrolled = useScrolled(20);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'var(--nav-scrolled)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      boxShadow: scrolled ? (theme === 'dark' ? '0 2px 24px rgba(0,0,0,.35)' : '0 2px 20px rgba(244,131,31,.1)') : 'none',
      transition: 'all .3s', padding: '0 clamp(12px, 4vw, 20px)',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <button
          onClick={() => go('home')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
            padding: 0, minWidth: 0, textAlign: 'left',
          }}
          aria-label="Go to homepage"
        >
          <Logo size={42} />
          <div style={{ minWidth: 0 }}>
            <LogoName lang={lang} />
            <div
              style={{
                fontSize: lang === 'hi' ? 8.5 : 9,
                color: 'var(--nav-sub)',
                fontWeight: 700,
                letterSpacing: lang === 'hi' ? 0.8 : 2.3,
                marginTop: 2,
                lineHeight: 1.2,
              }}
            >
              {lang === 'en' ? 'SEVA · SAMAJ · SHAKTI' : 'सेवा · समाज · शक्ति'}
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <div className="dsk" style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {menu.map(m => (
            <span
              key={m.id}
              className={`nl${page === m.id ? ' on' : ''}`}
              onClick={() => go(m.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && go(m.id)}
            >
              {m.icon} {m.label[lang]}
            </span>
          ))}
          {showDonate && (
            <button
              type="button"
              className="bsf"
              style={{ padding: '8px 17px', fontSize: 13.5, marginLeft: 8 }}
              onClick={() => go(donateCta.targetId)}
            >
              {donateCta.label[lang]}
              {donateCta.suffix ? ` ${donateCta.suffix}` : ''}
            </button>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              marginLeft: 8, padding: '7px 12px', background: 'var(--sfl)',
              border: '1.5px solid var(--bd)', borderRadius: 8, cursor: 'pointer',
              fontWeight: 700, fontSize: 15, color: 'var(--sfd)', fontFamily: 'inherit', lineHeight: 1,
            }}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{
              marginLeft: 8, padding: '7px 12px', background: 'var(--sfl)',
              border: '1.5px solid var(--bd)', borderRadius: 8, cursor: 'pointer',
              fontWeight: 700, fontSize: 13, color: 'var(--sfd)', fontFamily: 'inherit',
            }}
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'हिं' : 'EN'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="mbs"
          onClick={() => setMob(!mob)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 26, color: 'var(--sf)' }}
          aria-label={mob ? 'Close menu' : 'Open menu'}
        >
          {mob ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {mob && (
        <div className="mbm" style={{ background: 'var(--drawer-bg)', padding: 20, boxShadow: '0 8px 24px rgba(0,0,0,.12)', borderTop: '1px solid var(--bd)' }}>
          {menu.map(m => (
            <div
              key={m.id}
              className="nl"
              style={{ display: 'block', padding: '12px 8px', borderBottom: '1px solid var(--sfl)' }}
              onClick={() => go(m.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && go(m.id)}
            >
              {m.icon} {m.label[lang]}
            </div>
          ))}
          {showDonate && (
            <button
              type="button"
              className="bsf"
              style={{ width: '100%', padding: 13, marginTop: 12, fontSize: 15 }}
              onClick={() => go(donateCta.targetId)}
            >
              {donateCta.label[lang]}
              {donateCta.suffix ? ` ${donateCta.suffix}` : ''}
            </button>
          )}
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{
              width: '100%', marginTop: 8, padding: 11, background: 'var(--sfl)',
              border: '1.5px solid var(--bd)', borderRadius: 10, cursor: 'pointer',
              fontWeight: 700, color: 'var(--sfd)', fontFamily: 'inherit',
            }}
          >
            {lang === 'en' ? 'हिन्दी में देखें' : 'View in English'}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              width: '100%', marginTop: 8, padding: 11, background: 'var(--sfl)',
              border: '1.5px solid var(--bd)', borderRadius: 10, cursor: 'pointer',
              fontWeight: 700, color: 'var(--sfd)', fontFamily: 'inherit',
            }}
          >
            {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>
        </div>
      )}
    </nav>
  );
}
