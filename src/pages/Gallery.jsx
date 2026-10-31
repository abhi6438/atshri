import { useState } from 'react';
import { Chip } from '../components/common/Chip';
import { Divider } from '../components/common/Divider';
import { Empty } from '../components/common/Empty';
import { PageHeader } from '../components/common/PageHeader';
import { Icon } from '../components/common/Icon';
import { VideoModal } from '../components/common/VideoModal';
import { catOf } from '../utils/catOf';
import { fmtDate, videosOf, ytThumb } from '../utils/media';
import SITE from '../data/site.json';

function igShortcode(url) {
  const m = url.match(/\/(reel|p)\/([^/?]+)/);
  return m ? { type: m[1], code: m[2] } : null;
}

function InstaCard({ url, lang }) {
  const info = igShortcode(url);
  if (!info) return null;
  const isReel = info.type === 'reel';
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="card card-hover insta-card">
      <div className="insta-card__cover">
        <Icon name="instagram" />
        <span className="badge badge--brand">{isReel ? (lang === 'en' ? 'Reel' : 'रील') : (lang === 'en' ? 'Post' : 'पोस्ट')}</span>
      </div>
      <div className="insta-card__foot">
        <span>Instagram</span>
        <span className="link-arrow" style={{ border: 0 }}>{lang === 'en' ? 'View' : 'देखें'} <Icon name="external" /></span>
      </div>
    </a>
  );
}

export function PageGallery({ lang, go, acts, cats }) {
  const [filter, setFilter] = useState('all');
  const [playing, setPlaying] = useState(null); // index into gallery playlist
  const en = lang === 'en';

  const shown   = filter === 'all' ? acts : acts.filter(a => a.category === filter);
  const photos  = shown.filter(a => a.image);
  const allVideos = shown.flatMap(a => videosOf(a).map(url => ({ url, act: a })));
  const galleryPlaylist = allVideos.map(({ url, act }) => ({ url, title: act.heading[lang] }));
  const totalVideos = acts.flatMap(videosOf).length;
  const mediaCats = cats.filter(c => acts.some(a => a.category === c.id && (a.image || videosOf(a).length)));

  const s = SITE.social || {};
  const instaPosts = s.instagramPosts || [];

  return (
    <>
      <PageHeader
        lang={lang}
        go={go}
        crumb={en ? 'Gallery' : 'गैलरी'}
        eyebrow={en ? 'Seva in pictures & videos' : 'सेवा की तस्वीरें एवं वीडियो'}
        title={en ? 'Every frame, a story of care' : 'हर फ्रेम, सेवा की एक कहानी'}
        lead={en ? 'Photos, videos and reels from the field — moments of community, devotion and service.' : 'सेवा स्थल से तस्वीरें, वीडियो और रील — समाज, श्रद्धा और सेवा के क्षण।'}
      />

      <section className="section section--tight">
        <div className="container">
          {/* channels */}
          {(s.youtube || s.instagram) && (
            <div className="social-cards" style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }}>
              {s.youtube && (
                <a className="card card-hover social-card" href={s.youtube} target="_blank" rel="noopener noreferrer">
                  <span className="social-card__icon"><Icon name="youtube" /></span>
                  <span>
                    <strong>{en ? 'Watch on YouTube' : 'यूट्यूब पर देखें'}</strong>
                    <span>{s.youtubeHandle} · {totalVideos} {en ? 'videos published' : 'वीडियो प्रकाशित'}</span>
                  </span>
                  <span className="link-arrow">{en ? 'Subscribe' : 'सब्सक्राइब'} <Icon name="external" /></span>
                </a>
              )}
              {s.instagram && (
                <a className="card card-hover social-card" href={s.instagram} target="_blank" rel="noopener noreferrer">
                  <span className="social-card__icon"><Icon name="instagram" /></span>
                  <span>
                    <strong>{en ? 'Follow on Instagram' : 'इंस्टाग्राम पर फॉलो करें'}</strong>
                    <span>{s.instagramHandle} · {instaPosts.length} {en ? 'posts & reels' : 'पोस्ट और रील'}</span>
                  </span>
                  <span className="link-arrow">{en ? 'Follow' : 'फॉलो'} <Icon name="external" /></span>
                </a>
              )}
            </div>
          )}

          {/* filters */}
          <div className="toolbar">
            {mediaCats.length > 1 && (
              <div className="chip-row chip-row--scroll" aria-label={en ? 'Filter by category' : 'श्रेणी अनुसार फ़िल्टर'}>
                <Chip active={filter === 'all'} onClick={() => setFilter('all')}>{en ? 'All' : 'सभी'}</Chip>
                {mediaCats.map(c => (
                  <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
                    <span aria-hidden="true">{c.icon}</span> {c.name[lang]}
                  </Chip>
                ))}
              </div>
            )}
            <p className="muted" style={{ fontSize: 'var(--fs-sm)' }} aria-live="polite">
              {allVideos.length} {en ? 'videos' : 'वीडियो'} · {instaPosts.length} {en ? 'reels/posts' : 'रील/पोस्ट'} · {photos.length} {en ? 'photos' : 'तस्वीरें'} · {shown.length} {en ? 'activities' : 'गतिविधियाँ'}
            </p>
          </div>

          {shown.length === 0 ? <Empty lang={lang} /> : (
            <>
              {allVideos.length > 0 && (
                <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
                  <Divider count={allVideos.length}>{en ? 'Videos' : 'वीडियो'}</Divider>
                  <div className="grid grid-3">
                    {allVideos.map(({ url, act }, i) => {
                      const c = catOf(cats, act.category);
                      return (
                        <button key={url} type="button" className="video-tile" onClick={() => setPlaying(i)}>
                          <div className="video-tile__thumb">
                            <img src={ytThumb(url)} alt="" loading="lazy" decoding="async" />
                            <span className="badge badge--onimg">{c.icon} {c.name[lang]}</span>
                            <span className="video-tile__play"><Icon name="play" /></span>
                          </div>
                          <div className="video-tile__title">{act.heading[lang]}</div>
                          <div className="video-tile__meta">{fmtDate(act.date, lang)}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {instaPosts.length > 0 && (
                <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
                  <Divider count={instaPosts.length}>{en ? 'On Instagram' : 'इंस्टाग्राम पर'}</Divider>
                  <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))' }}>
                    {instaPosts.map(url => <InstaCard key={url} url={url} lang={lang} />)}
                  </div>
                </div>
              )}

              {photos.length > 0 && (
                <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
                  <Divider count={photos.length}>{en ? 'Photos from the field' : 'सेवा की तस्वीरें'}</Divider>
                  <div className="masonry">
                    {photos.map(a => {
                      const c = catOf(cats, a.category);
                      return (
                        <figure key={a.id} className="photo" tabIndex={0}>
                          <img src={a.image} alt={a.heading[lang]} loading="lazy" decoding="async" />
                          <figcaption>
                            <span>{c.icon} {c.name[lang]}</span>
                            <strong>{a.heading[lang]}</strong>
                            <span>{fmtDate(a.date, lang)}</span>
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                </div>
              )}

              {allVideos.length === 0 && photos.length === 0 && (
                <Empty lang={lang}>
                  {en ? 'No photos or videos yet for this category.' : 'इस श्रेणी में अभी कोई तस्वीर या वीडियो नहीं है।'}
                </Empty>
              )}
            </>
          )}
        </div>
      </section>

      {playing !== null && (
        <VideoModal videos={galleryPlaylist} initialIndex={playing} onClose={() => setPlaying(null)} />
      )}
    </>
  );
}
