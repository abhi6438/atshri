import { useState } from 'react';
import { catOf } from '../utils/catOf';
import { VideoModal } from './common/VideoModal';

function ytId(url) {
  const m = url.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([^?&]+)/);
  return m ? m[1] : null;
}

function fmtDate(dateStr, lang) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short', year: 'numeric' });
}

function MiniThumb({ url, onPlay }) {
  const id = ytId(url);
  if (!id) return null;
  return (
    <div onClick={() => onPlay(url)} style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}>
      <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt="" style={{ width: 88, height: 50, objectFit: 'cover', display: 'block' }} />
      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
        <svg width="22" height="22" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.88)" />
          <polygon points="13,10 24,16 13,22" fill="#FF0000" />
        </svg>
      </span>
    </div>
  );
}

export function ActCard({ a, lang, cats, playlist }) {
  const c      = catOf(cats, a.category);
  const videos = Array.isArray(a.youtube) ? a.youtube.filter(Boolean) : [];
  const firstId = videos.length ? ytId(videos[0]) : null;
  const coverThumb = firstId ? `https://img.youtube.com/vi/${firstId}/mqdefault.jpg` : null;
  const [playing, setPlaying] = useState(null); // { videos, index }

  const openVideo = (url) => {
    // If a global playlist was passed in, use it and find the right index
    const list = playlist || videos.map(u => ({ url: u, title: a.heading[lang] }));
    const index = list.findIndex(v => v.url === url);
    setPlaying({ videos: list, index: Math.max(0, index) });
  };

  return (
    <>
      <div
        className="card"
        style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform .18s, box-shadow .18s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.13)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}
      >
        {/* ── Cover ── */}
        {coverThumb ? (
          <div onClick={() => openVideo(videos[0])}
            style={{ position: 'relative', height: 190, overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}>
            <img src={coverThumb} alt={a.heading[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.6) 0%,transparent 55%)' }} />
            <span style={{ position: 'absolute', top: 10, left: 12, background: c.color, color: '#fff', fontWeight: 700, fontSize: 11, padding: '3px 9px', borderRadius: 20 }}>
              {c.icon} {c.name[lang]}
            </span>
            <div style={{ position: 'absolute', bottom: 10, left: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg width="30" height="30" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.92)" />
                <polygon points="13,10 24,16 13,22" fill="#FF0000" />
              </svg>
              {videos.length > 1 && (
                <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 10 }}>
                  {videos.length} {lang === 'en' ? 'videos' : 'वीडियो'}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div style={{ height: 170, flexShrink: 0, background: `linear-gradient(135deg,${c.color}18,${c.color}35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 54 }}>
            {a.icon}
          </div>
        )}

        {/* ── Body ── */}
        <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {coverThumb ? (
            <span style={{ fontSize: 12, color: 'var(--mid)', marginBottom: 6, display: 'block' }}>{fmtDate(a.date, lang)}</span>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
              <span style={{ background: `${c.color}18`, color: c.color, fontWeight: 700, fontSize: 12, padding: '4px 10px', borderRadius: 20 }}>
                {c.icon} {c.name[lang]}
              </span>
              <span style={{ fontSize: 12, color: 'var(--mid)' }}>{fmtDate(a.date, lang)}</span>
            </div>
          )}
          <h3 style={{ fontWeight: 700, marginBottom: 7, fontSize: 16 }}>{a.heading[lang]}</h3>
          <p style={{ color: 'var(--mid)', fontSize: 14, lineHeight: 1.62, flex: 1 }}>{a.text[lang]}</p>

          {videos.length > 1 && (
            <div style={{ marginTop: 14, borderTop: '1px solid var(--brd)', paddingTop: 11 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {lang === 'en' ? 'All Videos' : 'सभी वीडियो'}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {videos.map(url => <MiniThumb key={url} url={url} onPlay={openVideo} />)}
              </div>
            </div>
          )}
        </div>
      </div>

      {playing && (
        <VideoModal videos={playing.videos} initialIndex={playing.index} onClose={() => setPlaying(null)} />
      )}
    </>
  );
}
