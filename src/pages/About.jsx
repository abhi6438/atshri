import { LogoFull } from '../components/common/Logo';

export function PageAbout({ lang, team, values }) {
  const visTeam   = team.filter(t => t.visible);
  const visValues = values.filter(v => v.visible);

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: 'var(--hero-grad)', padding: '76px 20px' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 22 }}><LogoFull size={78} lang={lang} /></div>
          <h1 className="sxt">{lang === 'en' ? 'About Atshri' : 'अतश्री के बारे में'}</h1>
          <p style={{ color: 'var(--mid)', maxWidth: 700, margin: '0 auto', fontSize: 17, lineHeight: 1.85 }}>
            {lang === 'en'
              ? 'Atshri was founded on one simple belief — every act of service, however small, creates ripples of lasting change. From distributing cool water under the scorching summer sun, to wrapping blankets around shivering shoulders in cold winter nights, to sweeping the floors of our beloved mandirs — we show up wherever we are needed, with willing hands and open hearts.'
              : 'अतश्री की नींव एक सरल विश्वास पर रखी गई — सेवा का हर छोटा कार्य स्थायी परिवर्तन की लहर बनाता है। गर्मी में पानी, सर्दी में कम्बल, मंदिरों की सफाई — जहाँ जरूरत होती है, हम वहाँ पहुँचते हैं।'}
          </p>
        </div>
      </section>

      {visValues.length > 0 && (
        <section className="sec" style={{ background: 'var(--surface)' }}>
          <div className="wrap">
            <h2 className="sxt" style={{ textAlign: 'center', marginBottom: 36 }}>
              {lang === 'en' ? 'Our Values' : 'हमारे मूल्य'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
              {visValues.map(v => (
                <div key={v.id} className="card" style={{ padding: 26 }}>
                  <div style={{ fontSize: 34, marginBottom: 11 }}>{v.icon}</div>
                  <h3 style={{ fontWeight: 700, color: 'var(--sf)', fontSize: 17, marginBottom: 7 }}>{v.title[lang]}</h3>
                  <p style={{ color: 'var(--mid)', lineHeight: 1.62, fontSize: 14 }}>{v.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {visTeam.length > 0 && (
        <section className="sec pat" style={{ background: 'var(--sfp)' }}>
          <div className="wrap">
            <h2 className="sxt" style={{ textAlign: 'center', marginBottom: 36 }}>
              {lang === 'en' ? 'Our Team' : 'हमारी टीम'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24, maxWidth: 900, margin: '0 auto' }}>
              {visTeam.map(m => (
                <div key={m.id} className="card" style={{ padding: 32, textAlign: 'center' }}>
                  <div style={{
                    width: 72, height: 72,
                    background: 'linear-gradient(135deg,#F4831F,#C96500)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', margin: '0 auto 13px',
                    fontSize: 20, fontWeight: 800, color: '#fff',
                    boxShadow: '0 4px 14px rgba(244,131,31,.35)',
                  }}>
                    {m.initials}
                  </div>
                  <div style={{ fontSize: 18, marginBottom: 5 }}>{m.badge}</div>
                  <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{m.name}</h3>
                  <div style={{ color: 'var(--sf)', fontWeight: 700, fontSize: 11, marginBottom: 11, letterSpacing: 1 }}>
                    {m.role[lang].toUpperCase()}
                  </div>
                  <p style={{ color: 'var(--mid)', fontSize: 13, lineHeight: 1.62 }}>{m.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
