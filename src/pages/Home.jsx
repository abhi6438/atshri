import { useState } from 'react';
import SITE from '../data/site.json';
import { ABOUT, FOCUS_AREAS } from '../data/content';
import { ActCard } from '../components/ActCard';
import { VideoModal } from '../components/common/VideoModal';
import { Icon } from '../components/common/Icon';
import { Photo, VisionMission, Trustees, Transparency, CtaBand } from '../components/sections';
import { buildPlaylist, fmtDate, videosOf, ytThumb } from '../utils/media';

const FOCUS_LAYOUT = ['focus--a', 'focus--b', 'focus--c', 'focus--d', 'focus--e', 'focus--f'];

export function PageHome({ lang, go, acts, cats, stats, team, values, pageEnabled, donateCta }) {
  const [homeVideo, setHomeVideo] = useState(null);
  const en = lang === 'en';

  const playlist = buildPlaylist(acts, lang);
  const featured = acts.filter(a => a.featured).slice(0, 3);
  const upcoming = [...acts.filter(a => a.upcoming)]
    .sort((a, b) => String(a.date).localeCompare(String(b.date)))
    .slice(0, 4);
  const doneCount = acts.filter(a => !a.upcoming).length;
  const visStats = stats
    .filter(s => s.visible)
    .map(s => (s.value === 'auto' ? { ...s, value: `${doneCount}+` } : s));
  const visCats = cats.filter(c => c.visible);
  const joinId = donateCta?.targetId || 'involved';
  const actsOn = pageEnabled('activities');
  const galleryOn = pageEnabled('gallery');
  const hero = SITE.images?.hero;
  const t = SITE.trust;

  const recentVideos = acts
    .filter(a => !a.upcoming)
    .flatMap(a => videosOf(a).map(url => ({ url, act: a })))
    .slice(0, 4);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-title">
        {hero && (
          <picture className="hero__bg">
            {hero.srcMobile && <source media="(max-width: 600px)" srcSet={hero.srcMobile} />}
            <img src={hero.src} alt={hero.alt?.[lang] || ''} decoding="async" />
          </picture>
        )}
        <div className="container">
          <div className="hero__content">
            <p className="hero__mantra u1" lang="sa">सेवा परमो धर्मः</p>
            <h1 id="hero-title" className="u1">
              {en ? <>Together, we <em>serve</em> — with faith and compassion</> : <>मिलकर करें <em>सेवा</em> — श्रद्धा और करुणा के साथ</>}
            </h1>
            <p className="hero__lead u2">
              {en
                ? 'Atshri Trust is a public charitable trust from Rewa, Madhya Pradesh — bringing water in summer, warmth in winter, and hope in every season through temple seva, education, health and community care.'
                : 'अथश्री ट्रस्ट रीवा, मध्य प्रदेश का एक सार्वजनिक धर्मार्थ न्यास है — गर्मी में जल, सर्दी में कम्बल और हर मौसम में आशा; मंदिर सेवा, शिक्षा, स्वास्थ्य एवं जनकल्याण के माध्यम से।'}
            </p>
            <div className="hero__actions u3">
              {actsOn && (
                <button type="button" className="btn btn-gold" onClick={() => go('activities')}>
                  {en ? 'Explore our seva' : 'हमारी सेवा देखें'} <Icon name="arrow" className="arrow" />
                </button>
              )}
              {pageEnabled(joinId) ? (
                <button type="button" className="btn btn-ghost-light" onClick={() => go(joinId)}>
                  {en ? 'Join us' : 'हमसे जुड़ें'}
                </button>
              ) : galleryOn && (
                <button type="button" className="btn btn-ghost-light" onClick={() => go('gallery')}>
                  {en ? 'View gallery' : 'गैलरी देखें'}
                </button>
              )}
            </div>
            {t && (
              <p className="hero__reg u3">
                <Icon name="shield" />
                {t.type[lang]} · {en ? 'Rewa, Madhya Pradesh' : 'रीवा, मध्य प्रदेश'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS RIBBON ───────────────────────────────────── */}
      {visStats.length > 0 && (
        <div className="stats-ribbon">
          <div className="container">
            <dl className="stats-ribbon__inner" aria-label={en ? 'Our impact' : 'हमारा प्रभाव'}>
              {visStats.slice(0, 4).map(s => (
                <div key={s.id} className="stat">
                  <dt className="stat__label">{s.label[lang]}</dt>
                  <dd className="stat__value">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {/* ── ABOUT INTRO ────────────────────────────────────── */}
      <section className="section" aria-labelledby="about-title">
        <div className="container split">
          <div className="media media--frame about-media reveal">
            <div className="media-inner"><Photo k="heritage" lang={lang} sizes="(max-width: 900px) 100vw, 45vw" /></div>
          </div>
          <div className="reveal reveal-d1">
            <p className="eyebrow">{en ? 'About Atshri' : 'अथश्री के बारे में'}</p>
            <h2 id="about-title" className="h-xl">{ABOUT.title[lang]}</h2>
            <p className="lead">{ABOUT.body[lang]}</p>
            <ul className="about-points">
              {ABOUT.points.map(p => (
                <li key={p.en}><Icon name="check" /> <span>{p[lang]}</span></li>
              ))}
            </ul>
            {pageEnabled('about') && (
              <button type="button" className="link-arrow" onClick={() => go('about')}>
                {en ? 'Our story & trustees' : 'हमारी कहानी एवं ट्रस्टी'} <Icon name="arrow" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── FOCUS AREAS ────────────────────────────────────── */}
      <section className="section bg-alt" aria-labelledby="focus-title">
        <div className="container">
          <div className="section-head section-head--row reveal">
            <div style={{ maxWidth: 640 }}>
              <p className="eyebrow">{en ? 'Focus Areas' : 'कार्यक्षेत्र'}</p>
              <h2 id="focus-title" className="h-xl">{en ? 'Many paths, one purpose — seva' : 'अनेक मार्ग, एक उद्देश्य — सेवा'}</h2>
            </div>
            <p className="lead" style={{ maxWidth: 420 }}>
              {en
                ? 'From temple courtyards to classrooms and city streets — our initiatives span culture, welfare, learning, health and nature.'
                : 'मंदिर प्रांगण से कक्षाओं और शहर की गलियों तक — हमारी पहलें संस्कृति, कल्याण, शिक्षा, स्वास्थ्य और प्रकृति तक फैली हैं।'}
            </p>
          </div>

          <div className="focus-grid">
            {FOCUS_AREAS.map((f, i) => {
              const Tag = actsOn ? 'button' : 'div';
              return (
                <Tag
                  key={f.id}
                  type={actsOn ? 'button' : undefined}
                  className={`focus ${FOCUS_LAYOUT[i]} reveal reveal-d${(i % 3) + 1}`}
                  onClick={actsOn ? () => go('activities') : undefined}
                >
                  <Photo k={f.image} lang={lang} sizes={i === 0 ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 560px) 100vw, 33vw'} />
                  <div className="focus__body">
                    <p className="focus__tag">{f.tag[lang]}</p>
                    <h3>{f.title[lang]}</h3>
                    <p>{f.text[lang]}</p>
                  </div>
                </Tag>
              );
            })}
          </div>

          {visCats.length > 0 && (
            <div className="cat-strip reveal">
              <span className="cat-strip__label">{en ? 'Seva categories:' : 'सेवा श्रेणियाँ:'}</span>
              {visCats.map(c =>
                actsOn ? (
                  <button key={c.id} type="button" className="chip" onClick={() => go('activities')}>
                    <span aria-hidden="true">{c.icon}</span> {c.name[lang]}
                  </button>
                ) : (
                  <span key={c.id} className="chip" style={{ cursor: 'default' }}>
                    <span aria-hidden="true">{c.icon}</span> {c.name[lang]}
                  </span>
                ),
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── RECENT SEVA ────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="section" aria-labelledby="recent-title">
          <div className="container">
            <div className="section-head section-head--row reveal">
              <div>
                <p className="eyebrow">{en ? 'Recent Seva' : 'हालिया सेवा'}</p>
                <h2 id="recent-title" className="h-xl" style={{ marginBottom: 0 }}>
                  {en ? 'What we’ve done recently' : 'हमारे हालिया सेवा कार्य'}
                </h2>
              </div>
              {actsOn && (
                <button type="button" className="link-arrow" onClick={() => go('activities')}>
                  {en ? 'All activities' : 'सभी गतिविधियाँ'} <Icon name="arrow" />
                </button>
              )}
            </div>
            <div className="grid grid-3">
              {featured.map((a, i) => (
                <div key={a.id} className={`reveal reveal-d${i + 1}`}>
                  <ActCard a={a} lang={lang} cats={cats} playlist={playlist} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── VISION / MISSION / VALUES ──────────────────────── */}
      <VisionMission lang={lang} values={values} />

      {/* ── UPCOMING EVENTS ────────────────────────────────── */}
      {upcoming.length > 0 && (
        <section className="section" aria-labelledby="upcoming-title">
          <div className="container narrow">
            <div className="section-head section-head--row reveal">
              <div>
                <p className="eyebrow">{en ? 'Upcoming' : 'आगामी'}</p>
                <h2 id="upcoming-title" className="h-xl" style={{ marginBottom: 0 }}>
                  {en ? 'Seva calendar' : 'सेवा कैलेंडर'}
                </h2>
              </div>
              {actsOn && (
                <button type="button" className="link-arrow" onClick={() => go('activities')}>
                  {en ? 'View all' : 'सभी देखें'} <Icon name="arrow" />
                </button>
              )}
            </div>
            <ol className="events">
              {upcoming.map(a => {
                const d = new Date(`${a.date}T00:00:00`);
                const valid = !Number.isNaN(d.getTime());
                return (
                  <li key={a.id} className="event reveal">
                    <div className="event__date">
                      <div className="event__day">{valid ? d.getDate() : '—'}</div>
                      <div className="event__month">{fmtDate(a.date, lang)}</div>
                    </div>
                    <div>
                      <h3>{a.heading[lang]}</h3>
                      <p>{a.text[lang]}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* ── FOUNDER & TRUSTEES ─────────────────────────────── */}
      <div className="bg-alt">
        <Trustees lang={lang} team={team} />
      </div>

      {/* ── GALLERY / MEDIA ────────────────────────────────── */}
      {(recentVideos.length > 0 || SITE.social?.youtube || SITE.social?.instagram) && (
        <section className="section" aria-labelledby="media-title">
          <div className="container">
            <div className="section-head section-head--row reveal">
              <div>
                <p className="eyebrow">{en ? 'Gallery' : 'गैलरी'}</p>
                <h2 id="media-title" className="h-xl" style={{ marginBottom: 0 }}>
                  {en ? 'Seva in motion' : 'सेवा की झलक'}
                </h2>
              </div>
              {galleryOn && (
                <button type="button" className="link-arrow" onClick={() => go('gallery')}>
                  {en ? 'Open gallery' : 'गैलरी खोलें'} <Icon name="arrow" />
                </button>
              )}
            </div>

            {recentVideos.length > 0 && (
              <div className="video-row" style={{ marginBottom: 40 }}>
                {recentVideos.map(({ url, act }, i) => (
                  <button
                    key={url}
                    type="button"
                    className={`video-tile reveal reveal-d${(i % 3) + 1}`}
                    onClick={() => setHomeVideo({ url })}
                  >
                    <div className="video-tile__thumb">
                      <img src={ytThumb(url)} alt="" loading="lazy" decoding="async" />
                      <span className="video-tile__play"><Icon name="play" /></span>
                    </div>
                    <div className="video-tile__title">{act.heading[lang]}</div>
                    <div className="video-tile__meta">{fmtDate(act.date, lang)}</div>
                  </button>
                ))}
              </div>
            )}

            <div className="social-cards">
              {SITE.social?.youtube && (
                <a className="card card-hover social-card reveal" href={SITE.social.youtube} target="_blank" rel="noopener noreferrer">
                  <span className="social-card__icon"><Icon name="youtube" /></span>
                  <span>
                    <strong>YouTube</strong>
                    <span>{SITE.social.youtubeHandle} · {en ? 'Videos from the field' : 'सेवा के वीडियो'}</span>
                  </span>
                  <span className="link-arrow">{en ? 'Subscribe' : 'सब्सक्राइब'} <Icon name="external" /></span>
                </a>
              )}
              {SITE.social?.instagram && (
                <a className="card card-hover social-card reveal reveal-d1" href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">
                  <span className="social-card__icon"><Icon name="instagram" /></span>
                  <span>
                    <strong>Instagram</strong>
                    <span>{SITE.social.instagramHandle} · {en ? 'Reels & moments' : 'रील एवं झलकियाँ'}</span>
                  </span>
                  <span className="link-arrow">{en ? 'Follow' : 'फॉलो'} <Icon name="external" /></span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── TRANSPARENCY ───────────────────────────────────── */}
      <Transparency lang={lang} go={go} pageEnabled={pageEnabled} showDocs={false} />

      {/* ── CTA ────────────────────────────────────────────── */}
      <CtaBand lang={lang} go={go} pageEnabled={pageEnabled} joinId={joinId} />

      {homeVideo && (
        <VideoModal
          videos={playlist.length ? playlist : [{ url: homeVideo.url, title: '' }]}
          initialIndex={Math.max(0, playlist.findIndex(v => v.url === homeVideo.url))}
          onClose={() => setHomeVideo(null)}
        />
      )}
    </>
  );
}
