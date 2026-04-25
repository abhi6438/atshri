import { LogoFull } from '../components/common/Logo';
import { ActCard } from '../components/ActCard';

export function PageHome({ lang, go, acts, cats, stats, pageEnabled, donateCta }) {
  const featured = acts.filter(a => a.featured).slice(0, 3);
  const upcoming = [...acts.filter(a => a.upcoming)]
    .sort((a, b) => String(a.date).localeCompare(String(b.date)))
    .slice(0, 3);
  const visStats = stats.filter(s => s.visible);
  const visCats = cats.filter(c => c.visible);
  const joinId = donateCta?.targetId || 'involved';

  return (
    <>
      {/* HERO */}
      <section
        className="pat"
        style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center',
          background: 'var(--hero-grad)',
          paddingTop: 80,
        }}
      >
        <div className="wrap" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div className="u1" style={{ marginBottom: 26 }}>
            <LogoFull size={88} lang={lang} />
          </div>
          <div className="u1" style={{
            display: 'inline-block', background: 'var(--sfl)',
            border: '1.5px solid var(--bd)', borderRadius: 50,
            padding: '6px 22px', marginBottom: 20,
          }}>
            <span style={{ color: 'var(--sfd)', fontWeight: 700, fontSize: 13, lineHeight: 1.45 }}>
              {lang === 'en'
                ? '✦ सेवा परमो धर्मः — Service is the Highest Dharma ✦'
                : '✦ सेवा परमो धर्मः — सर्वोच्च धर्म सेवा है ✦'}
            </span>
          </div>
          <h1 className="u2" style={{ fontSize: 'clamp(34px,6vw,66px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20, color: 'var(--tx)' }}>
            {lang === 'en' ? 'Together, We Serve' : 'मिलकर करें सेवा'}
          </h1>
          <p className="u3" style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'var(--mid)', maxWidth: 560, margin: '0 auto 34px', lineHeight: 1.8 }}>
            {lang === 'en'
              ? 'Atshri is a community trust dedicated to selfless service — water in summer, warmth in winter, hope in every season.'
              : 'अतश्री एक सामुदायिक ट्रस्ट है — गर्मी में पानी, सर्दी में कम्बल, हर मौसम में उम्मीद।'}
          </p>
          <div className="u3" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {pageEnabled('gallery') && (
              <button type="button" className="bsf" style={{ padding: '13px 30px', fontSize: 16 }} onClick={() => go('gallery')}>
                {lang === 'en' ? 'View Gallery' : 'गैलरी देखें'}
              </button>
            )}
            {pageEnabled(joinId) && (
              <button type="button" className="bout" style={{ padding: '13px 30px', fontSize: 16 }} onClick={() => go(joinId)}>
                {lang === 'en' ? 'Join Us' : 'हमसे जुड़ें'}
              </button>
            )}
          </div>

          {visStats.length > 0 && (
            <div className="home-stats-grid">
              {visStats.map(s => (
                <div key={s.id} className="card home-stat-card" style={{ padding: '18px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 'clamp(22px, 5vw, 30px)', fontWeight: 800, color: 'var(--sf)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--mid)', fontWeight: 600, marginTop: 4, lineHeight: 1.35 }}>{s.label[lang]}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* RECENT SEVA */}
      {featured.length > 0 && (
        <section className="sec" style={{ background: 'var(--surface)' }}>
          <div className="wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 30, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ color: 'var(--sf)', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 6 }}>RECENT SEVA</p>
                <h2 className="sxt" style={{ marginBottom: 0 }}>
                  {lang === 'en' ? "What We've Done Recently" : 'हमारी हालिया सेवा'}
                </h2>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {pageEnabled('gallery') && (
                  <button type="button" className="bout" style={{ padding: '8px 17px', fontSize: 13 }} onClick={() => go('gallery')}>
                    {lang === 'en' ? 'Gallery →' : 'गैलरी →'}
                  </button>
                )}
                {pageEnabled('activities') && (
                  <button type="button" className="bout" style={{ padding: '8px 17px', fontSize: 13 }} onClick={() => go('activities')}>
                    {lang === 'en' ? 'All →' : 'सभी →'}
                  </button>
                )}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 20 }}>
              {featured.map(a => <ActCard key={a.id} a={a} lang={lang} cats={cats} />)}
            </div>
          </div>
        </section>
      )}

      {/* UPCOMING EVENTS */}
      {upcoming.length > 0 && (
        <section className="sec pat" style={{ background: 'var(--sfp)' }}>
          <div className="wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 30, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ color: 'var(--sf)', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 6 }}>UPCOMING</p>
                <h2 className="sxt" style={{ marginBottom: 0 }}>
                  {lang === 'en' ? 'Events Coming Up' : 'आगामी कार्यक्रम'}
                </h2>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {pageEnabled('gallery') && (
                  <button type="button" className="bout" style={{ padding: '8px 17px', fontSize: 13 }} onClick={() => go('gallery')}>
                    {lang === 'en' ? 'Gallery →' : 'गैलरी →'}
                  </button>
                )}
                {pageEnabled('activities') && (
                  <button type="button" className="bout" style={{ padding: '8px 17px', fontSize: 13 }} onClick={() => go('activities')}>
                    {lang === 'en' ? 'All →' : 'सभी →'}
                  </button>
                )}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 20 }}>
              {upcoming.map(a => <ActCard key={a.id} a={a} lang={lang} cats={cats} />)}
            </div>
          </div>
        </section>
      )}

      {/* WHAT WE DO */}
      <section className="sec pat" style={{ background: 'var(--sfp)' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--sf)', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 8 }}>OUR SEVA</p>
          <h2 className="sxt">{lang === 'en' ? 'What We Do' : 'हम क्या करते हैं'}</h2>
          <p className="sxs">{lang === 'en' ? 'Many ways, one mission — to serve.' : 'अनेक रास्ते, एक मिशन — सेवा।'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(175px,1fr))', gap: 13 }}>
            {visCats.map(c => (
              <div
                key={c.id}
                className="card"
                style={{
                  padding: '20px 13px',
                  textAlign: 'center',
                  cursor: pageEnabled('activities') ? 'pointer' : 'default',
                  opacity: pageEnabled('activities') ? 1 : 0.65,
                }}
                onClick={() => pageEnabled('activities') && go('activities')}
                role={pageEnabled('activities') ? 'button' : undefined}
                tabIndex={pageEnabled('activities') ? 0 : undefined}
                onKeyDown={e => pageEnabled('activities') && e.key === 'Enter' && go('activities')}
              >
                <div style={{ fontSize: 32, marginBottom: 9 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: 'linear-gradient(135deg,#F4831F,#C96500)', padding: '60px 20px', textAlign: 'center' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
            {lang === 'en' ? 'Ready to Make a Difference?' : 'बदलाव लाने के लिए तैयार हैं?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 18, marginBottom: 30 }}>
            {lang === 'en' ? 'Every hand matters. Every act counts.' : 'हर हाथ मायने रखता है।'}
          </p>
          <div style={{ display: 'flex', gap: 13, justifyContent: 'center', flexWrap: 'wrap' }}>
            {pageEnabled(joinId) && (
              <button
                type="button"
                onClick={() => go(joinId)}
                style={{ padding: '13px 28px', borderRadius: 11, fontSize: 16, fontFamily: 'inherit', fontWeight: 700, background: 'var(--surface)', color: 'var(--sf)', border: 'none', cursor: 'pointer' }}
              >
                {lang === 'en' ? 'Join Us' : 'जुड़ें'} 🙏
              </button>
            )}
            {pageEnabled('gallery') && (
              <button
                type="button"
                onClick={() => go('gallery')}
                style={{ padding: '13px 28px', borderRadius: 11, fontSize: 16, fontFamily: 'inherit', fontWeight: 700, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,.6)', cursor: 'pointer' }}
              >
                {lang === 'en' ? 'See Gallery' : 'गैलरी देखें'}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
