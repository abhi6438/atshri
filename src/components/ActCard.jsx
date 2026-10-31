import { useState } from 'react';
import { catOf } from '../utils/catOf';
import { fmtDate, videosOf, ytThumb } from '../utils/media';
import { VideoModal } from './common/VideoModal';
import { Icon } from './common/Icon';

export function ActCard({ a, lang, cats, playlist, headingLevel = 3 }) {
  const c = catOf(cats, a.category);
  const videos = videosOf(a);
  const cover = a.image || (videos.length ? ytThumb(videos[0]) : null);
  const [playing, setPlaying] = useState(null); // { videos, index }
  const H = `h${headingLevel}`;

  const openVideo = url => {
    const list = playlist || videos.map(u => ({ url: u, title: a.heading[lang] }));
    const index = list.findIndex(v => v.url === url);
    setPlaying({ videos: list, index: Math.max(0, index) });
  };

  return (
    <>
      <article className="card card-hover act-card">
        <div className="act-card__media">
          {cover ? (
            <img src={cover} alt={a.heading[lang]} loading="lazy" decoding="async" />
          ) : (
            <div className="act-card__ph" style={{ '--cat': c.color }} aria-hidden="true">{a.icon}</div>
          )}
          <span className="badge badge--onimg">{c.icon} {c.name[lang]}</span>
          {videos.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => openVideo(videos[0])}
                aria-label={`${lang === 'en' ? 'Play video' : 'वीडियो चलाएँ'}: ${a.heading[lang]}`}
              />
              <span className="play-dot">
                <span><Icon name="play" /></span>
                {videos.length > 1
                  ? `${videos.length} ${lang === 'en' ? 'videos' : 'वीडियो'}`
                  : lang === 'en' ? 'Watch' : 'देखें'}
              </span>
            </>
          )}
        </div>

        <div className="act-card__body">
          <div className="act-card__meta">
            {a.upcoming && <span className="badge badge--brand">{lang === 'en' ? 'Upcoming' : 'आगामी'}</span>}
            <time dateTime={a.date}>{fmtDate(a.date, lang)}</time>
          </div>
          <H>{a.heading[lang]}</H>
          <p>{a.text[lang]}</p>

          {videos.length > 1 && (
            <div className="act-card__videos" aria-label={lang === 'en' ? 'All videos' : 'सभी वीडियो'}>
              {videos.map((url, i) => (
                <button key={url} type="button" className="mini-thumb" onClick={() => openVideo(url)} aria-label={`${lang === 'en' ? 'Play video' : 'वीडियो'} ${i + 1}`}>
                  <img src={ytThumb(url, 'mqdefault')} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </article>

      {playing && (
        <VideoModal videos={playing.videos} initialIndex={playing.index} onClose={() => setPlaying(null)} />
      )}
    </>
  );
}
