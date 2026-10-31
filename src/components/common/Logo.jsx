/* Atshri mark: the original "A / shikhara" glyph set in a royal-navy seal with an antique-gold ring. */
export function Logo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="24" cy="24" r="23" fill="#24346b" />
      <circle cx="24" cy="24" r="20.2" fill="none" stroke="#d6be92" strokeWidth="1" />
      <g transform="translate(9.5 8.5) scale(.76)" fill="#f3ead8">
        <path d="M 1.5 35.5 Q 5.5 21.5 19 6.5 L 9 35.5 Z" />
        <path d="M 36.5 35.5 Q 32.5 21.5 19 6.5 L 29 35.5 Z" />
        <rect x="12" y="22" width="14" height="2.4" rx="1.2" />
        <circle cx="19" cy="3" r="2.8" fill="#d6be92" />
      </g>
    </svg>
  );
}

/** @param {{ light?: boolean, lang?: 'en' | 'hi', size?: number }} props */
export function LogoName({ light = false, lang = 'en', size }) {
  const at = lang === 'hi' ? 'अथ' : 'at';
  const shri = lang === 'hi' ? 'श्री' : 'Shri';
  return (
    <span className={`logo-name${light ? ' logo-name--light' : ''}`} style={size ? { fontSize: size } : undefined}>
      <span className="logo-name__at">{at}</span>
      <span className="logo-name__shri">{shri}</span>
    </span>
  );
}

/** @param {{ size?: number, light?: boolean, lang?: 'en' | 'hi' }} props */
export function LogoFull({ size = 80, light = false, lang = 'en' }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: Math.round(size * 0.16) }}>
      <Logo size={size} />
      <div style={{ textAlign: 'center' }}>
        <LogoName light={light} lang={lang} size={Math.round(size * 0.42)} />
        <div
          className="brand__sub"
          style={{ fontSize: Math.max(10, Math.round(size * 0.12)), marginTop: Math.round(size * 0.1), color: light ? 'var(--gold-300)' : undefined }}
        >
          {lang === 'en' ? 'Seva · Samaj · Shakti' : 'सेवा · समाज · शक्ति'}
        </div>
      </div>
    </div>
  );
}
