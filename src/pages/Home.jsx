import { useState } from 'react';
import { LogoFull } from '../components/common/Logo';
import { ActCard } from '../components/ActCard';
import SITE from '../data/site.json';
import { VideoModal } from '../components/common/VideoModal';

const IG_GRAD = 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)';

function ytId(url) {
  const m = url.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([^?&]+)/);
  return m ? m[1] : null;
}

export function PageHome({ lang, go, acts, cats, stats, pageEnabled, donateCta }) {
  const [homeVideo, setHomeVideo] = useState(null);

  // global playlist for all video-enabled acts
  const playlist = acts.flatMap(a =>
    (Array.isArray(a.youtube) ? a.youtube.filter(Boolean) : [])
      .map(url => ({ url, title: a.heading[lang] }))
  );

  const featured = acts.filter(a => a.featured).slice(0, 3);
  const upcoming = [...acts.filter(a => a.upcoming)]
    .sort((a, b) => String(a.date).localeCompare(String(b.date)))
    .slice(0, 3);
  const doneCount = acts.filter(a => !a.upcoming).length;
  const visStats = stats
    .filter(s => s.visible)
    .map(s => s.value === 'auto' ? { ...s, value: `${doneCount}+` } : s);
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
              {featured.map(a => <ActCard key={a.id} a={a} lang={lang} cats={cats} playlist={playlist} />)}
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
              {upcoming.map(a => <ActCard key={a.id} a={a} lang={lang} cats={cats} playlist={playlist} />)}
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

      {/* FOLLOW US */}
      {(SITE.social?.youtube || SITE.social?.instagram) && (() => {
        const recentVideos = acts
          .filter(a => !a.upcoming && Array.isArray(a.youtube))
          .flatMap(a => a.youtube.filter(Boolean).map(url => ({ url, act: a })))
          .slice(0, 4);
        return (
          <section className="sec pat" style={{ background: 'var(--sfp)' }}>
            <div className="wrap">
              <p style={{ color: 'var(--sf)', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 8, textAlign: 'center' }}>STAY CONNECTED</p>
              <h2 className="sxt" style={{ textAlign: 'center', marginBottom: 6 }}>
                {lang === 'en' ? 'Follow Our Journey' : 'हमारे साथ जुड़ें'}
              </h2>
              <p className="sxs" style={{ textAlign: 'center' }}>
                {lang === 'en' ? 'Subscribe & follow — watch our seva unfold in real time.' : 'सब्सक्राइब और फॉलो करें — सेवा को लाइव देखें।'}
              </p>

              {/* Platform cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 16, marginBottom: 36 }}>
                {SITE.social?.youtube && (
                  <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 14, padding: '18px 20px', background: '#FF0000', borderRadius: 16, textDecoration: 'none', boxShadow: '0 4px 18px rgba(255,0,0,0.3)', transition: 'transform .18s, box-shadow .18s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,0,0,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(255,0,0,0.3)'; }}
                  >
                    <svg width="52" height="36" viewBox="0 0 52 36" fill="none">
                      <rect width="52" height="36" rx="8" fill="rgba(255,255,255,0.2)" />
                      <polygon points="21,10 21,26 36,18" fill="white" />
                    </svg>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>{lang === 'en' ? 'YouTube' : 'यूट्यूब'}</div>
                      <div style={{ color: 'rgba(255,255,255,.8)', fontSize: 13, marginTop: 2 }}>{SITE.social.youtubeHandle} · {lang === 'en' ? 'Subscribe for videos' : 'वीडियो के लिए सब्सक्राइब करें'}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', background: '#fff', color: '#FF0000', fontWeight: 800, fontSize: 13, padding: '7px 16px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      ▶ {lang === 'en' ? 'Subscribe' : 'सब्सक्राइब'}
                    </span>
                  </a>
                )}
                {SITE.social?.instagram && (
                  <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 14, padding: '18px 20px', background: IG_GRAD, borderRadius: 16, textDecoration: 'none', boxShadow: '0 4px 18px rgba(188,24,136,0.3)', transition: 'transform .18s, box-shadow .18s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(188,24,136,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(188,24,136,0.3)'; }}
                  >
                    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                      <rect x="2" y="2" width="44" height="44" rx="12" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="rgba(255,255,255,0.15)" />
                      <rect x="10" y="10" width="28" height="28" rx="8" stroke="white" strokeWidth="2.5" fill="none" />
                      <circle cx="24" cy="24" r="7" stroke="white" strokeWidth="2.5" fill="none" />
                      <circle cx="33" cy="15" r="2" fill="white" />
                    </svg>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>{lang === 'en' ? 'Instagram' : 'इंस्टाग्राम'}</div>
                      <div style={{ color: 'rgba(255,255,255,.8)', fontSize: 13, marginTop: 2 }}>{SITE.social.instagramHandle} · {lang === 'en' ? 'Follow for reels & posts' : 'रील और पोस्ट के लिए फॉलो करें'}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', background: '#fff', color: '#bc1888', fontWeight: 800, fontSize: 13, padding: '7px 16px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      📸 {lang === 'en' ? 'Follow' : 'फॉलो'}
                    </span>
                  </a>
                )}
              </div>

              {/* Latest video thumbnails */}
              {recentVideos.length > 0 && (
                <>
                  <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--mid)', marginBottom: 14 }}>
                    {lang === 'en' ? '▶ Latest Videos' : '▶ ताज़े वीडियो'}
                  </p>
                  <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
                    {recentVideos.map(({ url, act }) => {
                      const id = ytId(url);
                      if (!id) return null;
                      return (
                        <div key={url}
                          onClick={() => setHomeVideo({ url, title: act.heading[lang], playlist })}
                          style={{ flexShrink: 0, width: 220, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 3px 12px rgba(0,0,0,0.1)', transition: 'transform .18s', background: 'var(--card)' }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                            <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt={act.heading[lang]}
                              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                              <svg width="36" height="36" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="18" fill="rgba(255,255,255,0.88)" />
                                <polygon points="15,11 27,18 15,25" fill="#FF0000" />
                              </svg>
                            </div>
                          </div>
                          <div style={{ padding: '10px 12px' }}>
                            <div style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                              {act.heading[lang]}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })()}

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
      {homeVideo && (
        <VideoModal
          videos={homeVideo.playlist || [{ url: homeVideo.url, title: homeVideo.title }]}
          initialIndex={Math.max(0, (homeVideo.playlist || []).findIndex(v => v.url === homeVideo.url))}
          onClose={() => setHomeVideo(null)}
        />
      )}
    </>
  );
}
