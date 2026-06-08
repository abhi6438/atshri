import { useEffect, useRef, useState } from 'react';

function ytId(url) {
  const m = url.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([^?&]+)/);
  return m ? m[1] : null;
}

function thumb(url) {
  const id = ytId(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
}

// ── Load YouTube IFrame API script once, globally ───────────────────
const _cbs = [];
let _ytReady = false;

function onYtReady(cb) {
  if (_ytReady) { cb(); return; }
  _cbs.push(cb);
  if (!window.__ytLoading) {
    window.__ytLoading = true;
    window.onYouTubeIframeAPIReady = () => {
      _ytReady = true;
      _cbs.splice(0).forEach(f => f());
    };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
  }
}

// ── Component ───────────────────────────────────────────────────────
export function VideoModal({ videos, initialIndex = 0, onClose }) {
  const [idx, setIdx] = useState(initialIndex);
  const listRef    = useRef(null);
  const wrapperRef = useRef(null);   // stable outer div — YT must NOT touch this
  const playerRef  = useRef(null);   // YT.Player instance
  const readyRef   = useRef(false);  // true after onReady fires
  const pendingRef = useRef(null);   // video id waiting for player to be ready
  const idxRef     = useRef(idx);
  const totalRef   = useRef(videos.length);
  // isFirst resets inside init effect so Strict Mode's 2nd mount also skips
  const isFirst    = useRef(true);

  idxRef.current   = idx;
  totalRef.current = videos.length;

  const total   = videos.length;
  const current = videos[idx] || {};
  const go      = (i) => setIdx(Math.max(0, Math.min(total - 1, i)));

  // ── Init: create YT.Player once per modal lifetime ─────────────────
  useEffect(() => {
    isFirst.current = true;          // reset so idx effect skips on this mount

    let cancelled = false;
    const firstId = ytId(videos[initialIndex]?.url || '');
    if (!firstId) return;

    const createPlayer = () => {
      if (cancelled || !wrapperRef.current) return;

      // Create a fresh inner div each time — YT replaces it with an iframe.
      // Using a ref-held outer div means getElementById is never needed and
      // Strict Mode's double-invoke is safe (new div each time).
      wrapperRef.current.innerHTML = '';
      const target = document.createElement('div');
      target.style.cssText = 'width:100%;height:100%';
      wrapperRef.current.appendChild(target);

      const p = new window.YT.Player(target, {
        videoId: firstId,
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady() {
            if (cancelled) { try { p.destroy(); } catch (_) {} return; }
            playerRef.current = p;
            readyRef.current  = true;
            // load any video that changed before the player was ready
            if (pendingRef.current) {
              p.loadVideoById(pendingRef.current);
              pendingRef.current = null;
            }
          },
          onStateChange(e) {
            if (cancelled) return;
            if (e.data === 0) {                    // 0 = ENDED
              const cur = idxRef.current;
              const tot = totalRef.current;
              if (cur < tot - 1) setIdx(cur + 1);
            }
          },
        },
      });
    };

    onYtReady(createPlayer);

    return () => {
      cancelled = true;
      readyRef.current  = false;
      pendingRef.current = null;
      try { playerRef.current?.destroy(); } catch (_) {}
      playerRef.current = null;
    };
  }, []);   // intentionally empty — player lives for the entire modal lifetime

  // ── Switch video when idx changes (skip the very first render) ──────
  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    const newId = ytId(videos[idx]?.url || '');
    if (!newId) return;
    if (readyRef.current && playerRef.current) {
      try { playerRef.current.loadVideoById(newId); } catch (_) {}
    } else {
      pendingRef.current = newId;    // player not ready yet — queue it
    }
  }, [idx]);

  // ── Keyboard nav + body scroll lock ────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = e => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft')  go(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [idx]);

  // ── Keep active thumbnail in view ───────────────────────────────────
  useEffect(() => {
    listRef.current?.children[idx]
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [idx]);

  const ytUrl = current.url?.startsWith('http')
    ? current.url
    : `https://youtube.com/${current.url}`;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '12px', animation: 'vmFadeIn .18s ease',
    }}>
      <style>{`@keyframes vmFadeIn{from{opacity:0}to{opacity:1}}`}</style>

      <div onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 840, display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
            {idx + 1} / {total}
          </span>
          <span style={{
            color: '#fff', fontWeight: 700, flex: 1,
            fontSize: 'clamp(12px,3.5vw,14px)',
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          }}>
            {current.title}
          </span>
          <button onClick={e => { e.stopPropagation(); go(idx - 1); }}
            disabled={idx === 0}
            style={{ ...navBtn, opacity: idx === 0 ? 0.3 : 1 }}>◀</button>
          <button onClick={e => { e.stopPropagation(); go(idx + 1); }}
            disabled={idx === total - 1}
            style={{ ...navBtn, opacity: idx === total - 1 ? 0.3 : 1 }}>▶</button>
          <button onClick={onClose}
            style={{ ...navBtn, background: 'rgba(255,255,255,.2)' }}>✕</button>
        </div>

        {/* ── Player ─────────────────────────────────────────────────
             wrapperRef is the stable outer div.
             createPlayer() injects a fresh inner div here each time,
             which YT.Player then replaces with an <iframe>.            */}
        <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 12, overflow: 'hidden', background: '#000', boxShadow: '0 16px 50px rgba(0,0,0,.7)' }}>
          <div ref={wrapperRef}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        </div>

        {/* ── Playlist strip ── */}
        {total > 1 && (
          <div ref={listRef}
            style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
            {videos.map((v, i) => {
              const t = thumb(v.url);
              const active = i === idx;
              return (
                <div key={v.url} onClick={() => go(i)} style={{
                  flexShrink: 0, cursor: 'pointer', borderRadius: 8, overflow: 'hidden',
                  position: 'relative',
                  outline: active ? '2.5px solid #FF0000' : '2.5px solid transparent',
                  opacity: active ? 1 : 0.55,
                  transition: 'opacity .2s, outline-color .2s',
                }}>
                  {t
                    ? <img src={t} alt={v.title} style={{ width: 100, height: 56, objectFit: 'cover', display: 'block' }} />
                    : <div style={{ width: 100, height: 56, background: '#333' }} />
                  }
                  {active && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,0,0,.15)' }}>
                      <svg width="20" height="20" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,.9)" />
                        <polygon points="13,10 24,16 13,22" fill="#FF0000" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: 'right' }}>
          <a href={ytUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,.4)', fontSize: 11, textDecoration: 'none' }}>
            ↗ Open in YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

const navBtn = {
  background: 'rgba(255,255,255,0.12)', border: 'none',
  color: '#fff', width: 44, height: 44, borderRadius: '50%',
  fontSize: 16, cursor: 'pointer', flexShrink: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'background .15s', fontFamily: 'inherit',
  WebkitTapHighlightColor: 'transparent',
};
