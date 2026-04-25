export function Logo({ size = 42 }) {
  const r = Math.round(size * 0.25);
  return (
    <div style={{
      width: size, height: size, borderRadius: r, flexShrink: 0,
      background: 'linear-gradient(148deg,#FBAA34,#F4831F 46%,#BF5200)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 38 38" fill="none">
        <path d="M 1.5 35.5 Q 5.5 21.5 19 6.5 L 9 35.5 Z" fill="white" />
        <path d="M 36.5 35.5 Q 32.5 21.5 19 6.5 L 29 35.5 Z" fill="white" />
        <rect x="12" y="22" width="14" height="2.4" rx="1.2" fill="white" />
        <circle cx="19" cy="3" r="2.8" fill="white" />
      </svg>
    </div>
  );
}

/** @param {{ light?: boolean, lang?: 'en' | 'hi' }} props */
export function LogoName({ light = false, lang = 'en' }) {
  const at = lang === 'hi' ? 'अत' : 'at';
  const shri = lang === 'hi' ? 'श्री' : 'Shri';
  return (
    <span style={{ fontSize: 20, lineHeight: 1, fontFamily: "'Baloo 2',sans-serif" }}>
      <span style={{ fontWeight: 400, color: light ? 'rgba(255,255,255,.75)' : 'var(--logo-at)' }}>{at}</span>
      <span style={{ fontWeight: 800, color: light ? '#FFD07A' : 'var(--logo-shri)' }}>{shri}</span>
    </span>
  );
}

/** @param {{ size?: number, light?: boolean, lang?: 'en' | 'hi' }} props */
export function LogoFull({ size = 80, light = false, lang = 'en' }) {
  const tc = light ? 'rgba(255,255,255,.5)' : 'var(--logo-tag)';
  const hc = light ? 'rgba(255,255,255,.35)' : 'var(--logo-tag-hi)';
  const at = lang === 'hi' ? 'अत' : 'at';
  const shri = lang === 'hi' ? 'श्री' : 'Shri';
  const nameSize = Math.round(size * 0.44);
  const tagSize = Math.round(size * 0.12);
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: Math.round(size * 0.13) }}>
      <Logo size={size} />
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: nameSize, lineHeight: 1, fontFamily: "'Baloo 2',sans-serif" }}>
          <span style={{ fontWeight: 400, color: light ? 'rgba(255,255,255,.75)' : 'var(--logo-at)' }}>{at}</span>
          <span style={{ fontWeight: 800, color: light ? '#FFD07A' : 'var(--logo-shri)' }}>{shri}</span>
        </span>
        <div style={{ marginTop: Math.round(size * 0.07) }}>
          {lang === 'en' ? (
            <>
              <div style={{ fontSize: tagSize, fontWeight: 700, letterSpacing: 2.8, color: tc, marginBottom: 2 }}>
                Seva · Samaj · Shakti
              </div>
              <div style={{ fontSize: tagSize, fontWeight: 600, letterSpacing: 2, color: hc }}>
                सेवा · समाज · शक्ति
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: tagSize, fontWeight: 700, letterSpacing: 1.2, color: tc, marginBottom: 2 }}>
                सेवा · समाज · शक्ति
              </div>
              <div style={{ fontSize: tagSize, fontWeight: 600, letterSpacing: 2, color: hc }}>
                Seva · Samaj · Shakti
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
