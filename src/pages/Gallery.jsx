import { useState } from 'react';
import { Chip } from '../components/common/Chip';
import { Divider } from '../components/common/Divider';
import { Empty } from '../components/common/Empty';
import { catOf } from '../utils/catOf';
import { VideoModal } from '../components/common/VideoModal';
import SITE from '../data/site.json';

function ytId(url) {
  const m = url.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([^?&]+)/);
  return m ? m[1] : null;
}

function fmtDate(dateStr, lang) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short', year: 'numeric' });
}

const IG_GRAD = 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)';

function igShortcode(url) {
  const m = url.match(/\/(reel|p)\/([^/?]+)/);
  return m ? { type: m[1], code: m[2] } : null;
}

function InstaCard({ url }) {
  const info = igShortcode(url);
  if (!info) return null;
  const isReel = info.type === 'reel';
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'flex', flexDirection: 'column', borderRadius: 14, overflow: 'hidden', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,.1)', transition: 'transform .18s, box-shadow .18s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,.16)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.1)'; }}
    >
      {/* gradient cover */}
      <div style={{ background: IG_GRAD, height: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        {/* Instagram logo */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="white" fillOpacity="0.2" />
          <rect x="12" y="12" width="24" height="24" rx="7" stroke="white" strokeWidth="2.5" fill="none" />
          <circle cx="24" cy="24" r="6" stroke="white" strokeWidth="2.5" fill="none" />
          <circle cx="32.5" cy="15.5" r="1.8" fill="white" />
        </svg>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 13, background: 'rgba(0,0,0,0.25)', padding: '3px 12px', borderRadius: 20 }}>
          {isReel ? '▶ Reel' : '📷 Post'}
        </span>
      </div>
      {/* footer */}
      <div style={{ background: 'var(--card)', padding: '11px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--mid)', fontWeight: 600 }}>
          {isReel ? 'Instagram Reel' : 'Instagram Post'}
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, background: IG_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          View →
        </span>
      </div>
    </a>
  );
}

function VideoCard({ url, act, lang, cats, playlist }) {
  const id = ytId(url);
  const [playing, setPlaying] = useState(false);
  if (!id) return null;
  const c = catOf(cats, act.category);
  const openIdx = playlist ? Math.max(0, playlist.findIndex(v => v.url === url)) : 0;
  const activePlaylist = playlist || [{ url, title: act.heading[lang] }];
  return (
    <>
      <div
        onClick={() => setPlaying(true)}
        style={{ display: 'block', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', color: 'inherit', boxShadow: '0 4px 16px rgba(0,0,0,.09)', transition: 'transform .18s, box-shadow .18s', background: 'var(--card)' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,.14)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.09)'; }}
      >
        <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000', overflow: 'hidden' }}>
          <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt={act.heading[lang]} loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 50%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="22" fill="rgba(255,255,255,0.88)" />
              <polygon points="18,14 34,22 18,30" fill="#FF0000" />
            </svg>
          </div>
          <span style={{ position: 'absolute', top: 10, left: 10, background: c.color, color: '#fff', fontWeight: 700, fontSize: 10, padding: '2px 8px', borderRadius: 20 }}>
            {c.icon} {c.name[lang]}
          </span>
        </div>
        <div style={{ padding: '12px 14px' }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3, lineHeight: 1.4 }}>{act.heading[lang]}</div>
          <div style={{ fontSize: 11, color: 'var(--mid)' }}>{fmtDate(act.date, lang)}</div>
        </div>
      </div>
      {playing && <VideoModal videos={activePlaylist} initialIndex={openIdx} onClose={() => setPlaying(false)} />}
    </>
  );
}

export function PageGallery({ lang, acts, cats }) {
  const [filter, setFilter] = useState('all');
  const shown   = filter === 'all' ? acts : acts.filter(a => a.category === filter);
  const photos  = shown.filter(a => a.image);

  const allVideos = shown.flatMap(a => {
    const vids = Array.isArray(a.youtube) ? a.youtube.filter(Boolean) : [];
    return vids.map(url => ({ url, act: a }));
  });

  const totalVideos = acts.flatMap(a =>
    Array.isArray(a.youtube) ? a.youtube.filter(Boolean) : []
  ).length;

  const channelUrl    = SITE.social?.youtube || '';
  const channelHandle = SITE.social?.youtubeHandle || 'YouTube';
  const instaUrl      = SITE.social?.instagram || '';
  const instaHandle   = SITE.social?.instagramHandle || '@instagram';
  const instaPosts    = SITE.social?.instagramPosts || [];

  return (
    <div style={{ paddingTop: 64 }}>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--hero-grad)', padding: '56px 20px 40px' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--sf)', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 8 }}>SEVA IN PICTURES & VIDEOS</p>
          <h1 className="sxt">{lang === 'en' ? 'Our Gallery' : 'हमारी गैलरी'}</h1>
          <p className="sxs">
            {lang === 'en'
              ? 'Photos and videos from the field — every frame a story of care and community.'
              : 'सेवा की तस्वीरें और वीडियो — हर फ्रेम एक कहानी।'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            <Chip active={filter === 'all'} onClick={() => setFilter('all')} color="var(--sf)">
              {lang === 'en' ? 'All' : 'सभी'}
            </Chip>
            {cats.map(c => (
              <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)} color={c.color}>
                {c.icon} {c.name[lang]}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* ── YouTube Channel Banner ── */}
      {channelUrl && (
        <div style={{ background: 'linear-gradient(135deg,#FF0000,#CC0000)', padding: '20px 16px' }}>
          <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* YouTube icon */}
              <svg width="48" height="34" viewBox="0 0 48 34" fill="none">
                <rect width="48" height="34" rx="8" fill="white" />
                <polygon points="19,10 19,24 33,17" fill="#FF0000" />
              </svg>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>
                  {lang === 'en' ? 'Watch on YouTube' : 'यूट्यूब पर देखें'}
                </div>
                <div style={{ color: 'rgba(255,255,255,.8)', fontSize: 13, marginTop: 2 }}>
                  {channelHandle} · {totalVideos} {lang === 'en' ? 'videos published' : 'वीडियो प्रकाशित'}
                </div>
              </div>
            </div>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', padding: '10px 24px',
                background: '#fff', color: '#CC0000',
                fontWeight: 800, fontSize: 14, borderRadius: 25,
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}
            >
              {lang === 'en' ? '▶ Subscribe' : '▶ सब्सक्राइब करें'}
            </a>
          </div>
        </div>
      )}

      {/* ── Instagram Channel Banner ── */}
      {instaUrl && (
        <div style={{ background: IG_GRAD, padding: '20px 16px' }}>
          <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="4" width="40" height="40" rx="11" stroke="white" strokeWidth="3.5" fill="none" />
                  <circle cx="24" cy="24" r="9" stroke="white" strokeWidth="3.5" fill="none" />
                  <circle cx="35.5" cy="12.5" r="2.5" fill="white" />
                </svg>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>
                  {lang === 'en' ? 'Follow on Instagram' : 'इंस्टाग्राम पर फॉलो करें'}
                </div>
                <div style={{ color: 'rgba(255,255,255,.85)', fontSize: 13, marginTop: 2 }}>
                  {instaHandle} · {instaPosts.length} {lang === 'en' ? 'posts & reels' : 'पोस्ट और रील'}
                </div>
              </div>
            </div>
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '10px 24px', background: '#fff', color: '#bc1888', fontWeight: 800, fontSize: 14, borderRadius: 25, textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              {lang === 'en' ? '📸 Follow' : '📸 फॉलो करें'}
            </a>
          </div>
        </div>
      )}

      {/* ── Stats toolbar ── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--brd)', padding: '11px 20px' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 13, color: 'var(--mid)', fontWeight: 600 }}>
          <span>
            {allVideos.length} {lang === 'en' ? 'videos' : 'वीडियो'} · {instaPosts.length} {lang === 'en' ? 'reels/posts' : 'रील/पोस्ट'} · {photos.length} {lang === 'en' ? 'photos' : 'तस्वीरें'}
          </span>
          <span>{shown.length} {lang === 'en' ? 'activities shown' : 'गतिविधियाँ दिख रही हैं'}</span>
        </div>
      </div>

      <section className="sec" style={{ background: 'var(--sfp)' }}>
        <div className="wrap">
          {shown.length === 0 ? <Empty lang={lang} /> : (
            <>
              {/* ── Videos ── */}
              {allVideos.length > 0 && (
                <div style={{ marginBottom: 48 }}>
                  <Divider>{lang === 'en' ? `▶ VIDEOS (${allVideos.length})` : `▶ वीडियो (${allVideos.length})`}</Divider>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 18, marginTop: 20 }}>
                    {(() => {
                      const galleryPlaylist = allVideos.map(({ url, act }) => ({ url, title: act.heading[lang] }));
                      return allVideos.map(({ url, act }) => (
                        <VideoCard key={url} url={url} act={act} lang={lang} cats={cats} playlist={galleryPlaylist} />
                      ));
                    })()}
                  </div>
                </div>
              )}

              {/* ── Instagram Posts ── */}
              {instaPosts.length > 0 && (
                <div style={{ marginBottom: 48 }}>
                  <Divider>{lang === 'en' ? `📸 ON INSTAGRAM (${instaPosts.length})` : `📸 इंस्टाग्राम पर (${instaPosts.length})`}</Divider>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16, marginTop: 20 }}>
                    {instaPosts.map(url => <InstaCard key={url} url={url} />)}
                  </div>
                </div>
              )}

              {/* ── Photos ── */}
              {photos.length > 0 && (
                <div style={{ marginBottom: 48 }}>
                  <Divider>{lang === 'en' ? '📸 PHOTOS FROM THE FIELD' : '📸 सेवा की तस्वीरें'}</Divider>
                  <div style={{ columns: '3 260px', columnGap: 15, marginTop: 20 }}>
                    {photos.map(a => {
                      const c = catOf(cats, a.category);
                      return (
                        <div key={a.id} className="gcrd" style={{ breakInside: 'avoid', marginBottom: 15, borderRadius: 15, overflow: 'hidden', position: 'relative', cursor: 'pointer', boxShadow: '0 4px 18px rgba(0,0,0,.1)' }}>
                          <div className="gimg">
                            <img src={a.image} alt={a.heading.en} loading="lazy" />
                          </div>
                          <div className="gov">
                            <span style={{ background: c.color, color: '#fff', fontWeight: 700, fontSize: 11, padding: '3px 9px', borderRadius: 20, display: 'inline-block', marginBottom: 6 }}>
                              {c.icon} {c.name[lang]}
                            </span>
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{a.heading[lang]}</div>
                            <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 12, marginTop: 2 }}>📅 {fmtDate(a.date, lang)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── No media message ── */}
              {allVideos.length === 0 && photos.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--mid)' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    {lang === 'en' ? 'No photos or videos yet for this category.' : 'इस श्रेणी में अभी कोई तस्वीर या वीडियो नहीं है।'}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
