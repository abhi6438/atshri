import { Logo, LogoName } from '../common/Logo';

export function Footer({ lang, go, cats, menu }) {
  const quick = (menu || []).filter(m => m.enabled !== false);

  return (
    <footer style={{ background: '#1C1410', color: 'rgba(255,255,255,.75)', padding: '50px 20px 22px' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(185px,1fr))', gap: 30, marginBottom: 38 }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
              <Logo size={40} />
              <div>
                <LogoName light lang={lang} />
                <div
                  style={{
                    fontSize: lang === 'hi' ? 8.5 : 9,
                    color: 'rgba(251,168,50,.65)',
                    fontWeight: 700,
                    letterSpacing: lang === 'hi' ? 0.8 : 2.2,
                    marginTop: 2,
                  }}
                >
                  {lang === 'en' ? 'SEVA · SAMAJ · SHAKTI' : 'सेवा · समाज · शक्ति'}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.9, color: 'rgba(255,255,255,.5)', marginTop: 10 }}>
              सेवा · समाज · शक्ति<br />Rewa, Madhya Pradesh
            </p>
          </div>

          <div>
            <h4 style={{ color: '#F4831F', fontWeight: 700, marginBottom: 13 }}>
              {lang === 'en' ? 'Quick Links' : 'लिंक'}
            </h4>
            {quick.map(m => (
              <div
                key={m.id}
                onClick={() => go(m.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && go(m.id)}
                style={{ cursor: 'pointer', marginBottom: 7, fontSize: 13, transition: 'color .2s' }}
                onMouseEnter={e => (e.target.style.color = '#F4831F')}
                onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,.75)')}
              >
                {m.label[lang]}
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ color: '#F4831F', fontWeight: 700, marginBottom: 13 }}>
              {lang === 'en' ? 'Our Seva' : 'हमारी सेवा'}
            </h4>
            {cats.slice(0, 5).map(c => (
              <div key={c.id} style={{ fontSize: 13, marginBottom: 6 }}>
                {c.icon} {c.name[lang]}
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ color: '#F4831F', fontWeight: 700, marginBottom: 13 }}>
              {lang === 'en' ? 'Contact' : 'संपर्क'}
            </h4>
            <p style={{ fontSize: 13, lineHeight: 2, color: 'rgba(255,255,255,.55)' }}>
              📍 Rewa, MP<br />
              📧 atshri.seva@gmail.com<br />
              🙏 Maya Manoj Shrivastava
            </p>
            <div
              onClick={() => go('admin')}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && go('admin')}
              style={{ marginTop: 14, fontSize: 11, color: 'rgba(255,255,255,.2)', cursor: 'pointer' }}
            >
              Admin →
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 18, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
          © {new Date().getFullYear()} Atshri. All rights reserved. | Made with ❤️ for community service
        </div>
      </div>
    </footer>
  );
}
