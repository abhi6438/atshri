import SITE from '../data/site.json';
import { VISION, MISSION } from '../data/content';
import { Icon } from './common/Icon';
import { fmtDate } from '../utils/media';

/** Responsive <img> for a site.json → images entry. */
export function Photo({ k, lang, eager = false, sizes = '(max-width: 700px) 100vw, 50vw', style, className }) {
  const img = SITE.images?.[k];
  if (!img) return null;
  const small = img.srcSmall || img.srcMobile;
  return (
    <img
      src={img.src}
      srcSet={small ? `${small} 640w, ${img.src} 1200w` : undefined}
      sizes={small ? sizes : undefined}
      alt={img.alt?.[lang] || ''}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={style}
    />
  );
}

/** Vision, Mission & Values — deep navy band. */
export function VisionMission({ lang, values = [] }) {
  const vis = values.filter(v => v.visible);
  return (
    <section className="section bg-deep pat" aria-labelledby="vm-title" id="vision">
      <div className="container">
        <div className="section-head reveal" style={{ maxWidth: 720 }}>
          <p className="eyebrow">{lang === 'en' ? 'Our Purpose' : 'हमारा उद्देश्य'}</p>
          <h2 id="vm-title" className="h-xl">
            {lang === 'en' ? <>Guided by <em className="serif-italic gold">compassion</em>, committed to service</> : 'करुणा से प्रेरित, सेवा के प्रति समर्पित'}
          </h2>
        </div>
        <div className="vm reveal reveal-d1">
          <div className="vm__item">
            <div className="vm__num">01 — {lang === 'en' ? 'VISION' : 'दृष्टि'}</div>
            <h3>{lang === 'en' ? 'Our Vision' : 'हमारी दृष्टि'}</h3>
            <p>{VISION[lang]}</p>
          </div>
          <div className="vm__item">
            <div className="vm__num">02 — {lang === 'en' ? 'MISSION' : 'मिशन'}</div>
            <h3>{lang === 'en' ? 'Our Mission' : 'हमारा मिशन'}</h3>
            <p>{MISSION[lang]}</p>
          </div>
        </div>
        {vis.length > 0 && (
          <ul className="values-list reveal reveal-d2" aria-label={lang === 'en' ? 'Our values' : 'हमारे मूल्य'}>
            {vis.map(v => (
              <li key={v.id}>
                <h4>{v.title[lang]}</h4>
                <p>{v.desc[lang]}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function initialsOf(m) {
  return m.initials || m.name.split(/\s+/).map(w => w[0]).join('').slice(0, 3).toUpperCase();
}

/** Founder feature + trustee cards. */
export function Trustees({ lang, team = [], compact = false }) {
  const vis = team.filter(t => t.visible);
  if (!vis.length) return null;
  const [founder, ...rest] = vis;

  return (
    <section className="section" aria-labelledby="trustees-title" id="trustees">
      <div className="container">
        <div className="section-head reveal" style={{ maxWidth: 680 }}>
          <p className="eyebrow">{lang === 'en' ? 'Founder & Trustees' : 'संस्थापक एवं ट्रस्टी'}</p>
          <h2 id="trustees-title" className="h-xl">
            {lang === 'en' ? 'The people behind the seva' : 'सेवा के पीछे के लोग'}
          </h2>
        </div>

        <div className="founder reveal">
          <div className="portrait" aria-hidden="true">
            <span className="portrait__initials">{initialsOf(founder)}</span>
          </div>
          <div>
            <p className="trustee-role">{founder.role[lang]}</p>
            <h3 className="h-lg" style={{ margin: '10px 0 18px' }}>{founder.name}</h3>
            <p className="lead">{founder.desc[lang]}</p>
            <blockquote className="quote">
              सेवा परमो धर्मः
              <span style={{ display: 'block', fontSize: '0.8em', marginTop: 6, color: 'var(--text-muted)' }}>
                {lang === 'en' ? 'Service is the highest dharma — the guiding motto of Atshri Trust.' : 'सेवा ही सर्वोच्च धर्म है — अथश्री ट्रस्ट का मूल मंत्र।'}
              </span>
            </blockquote>
          </div>
        </div>

        {rest.length > 0 && (
          <div className={`grid ${compact || rest.length <= 2 ? 'grid-2' : 'grid-3'}`} style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
            {rest.map((m, i) => (
              <article key={m.id} className={`card trustee reveal reveal-d${(i % 3) + 1}`}>
                <div className="portrait portrait--sm" aria-hidden="true">
                  <span className="portrait__initials">{initialsOf(m)}</span>
                </div>
                <div>
                  <p className="trustee-role">{m.role[lang]}</p>
                  <h3>{m.name}</h3>
                  <p>{m.desc[lang]}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** Registration facts + documents list. */
export function Transparency({ lang, go, pageEnabled, showDocs = true }) {
  const t = SITE.trust;
  if (!t) return null;
  const contactOn = pageEnabled ? pageEnabled('contact') : false;
  const date = fmtDate(t.regDate, lang, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className="section bg-alt" aria-labelledby="transparency-title" id="documents">
      <div className="container">
        <div className="section-head section-head--row reveal">
          <div style={{ maxWidth: 640 }}>
            <p className="eyebrow">{lang === 'en' ? 'Trust & Transparency' : 'विश्वास एवं पारदर्शिता'}</p>
            <h2 id="transparency-title" className="h-xl">
              {lang === 'en' ? 'Registered, accountable, open' : 'पंजीकृत, जवाबदेह, पारदर्शी'}
            </h2>
            <p className="lead">
              {lang === 'en'
                ? 'Atshri is constituted by a registered trust deed. Every rupee and every resource is held by the trust and used only for its charitable objects.'
                : 'अथश्री एक पंजीकृत न्यास विलेख द्वारा गठित है। प्रत्येक रुपया और संसाधन न्यास में निहित है तथा केवल धर्मार्थ उद्देश्यों हेतु उपयोग होता है।'}
            </p>
          </div>
        </div>

        <div className="trust-doc reveal reveal-d1">
          <div className="trust-doc__seal">
            <Icon name="shield" />
            <h3>{t.name[lang]}</h3>
            <p>{t.type[lang]}</p>
          </div>
          <dl className="trust-doc__facts">
            <div className="fact"><dt>{lang === 'en' ? 'Registration No.' : 'पंजीयन क्रमांक'}</dt><dd className="mono">{t.regNo}</dd></div>
            <div className="fact"><dt>{lang === 'en' ? 'Date of registration' : 'पंजीयन तिथि'}</dt><dd>{date}</dd></div>
            <div className="fact"><dt>{lang === 'en' ? 'Registering office' : 'पंजीयन कार्यालय'}</dt><dd>{t.regOffice[lang]}</dd></div>
            <div className="fact"><dt>{lang === 'en' ? 'Governing law' : 'शासी कानून'}</dt><dd>{lang === 'en' ? 'Indian Trusts Act, 1882 · Registration Act, 1908' : 'भारतीय न्यास अधिनियम, 1882 · पंजीकरण अधिनियम, 1908'}</dd></div>
            <div className="fact"><dt>{lang === 'en' ? 'Nature' : 'प्रकृति'}</dt><dd>{lang === 'en' ? 'Non-profit · Non-political · Charitable' : 'गैर-लाभकारी · गैर-राजनीतिक · धर्मार्थ'}</dd></div>
          </dl>
        </div>

        {showDocs && (
          <ul className="doc-list">
            <li className="card doc-item reveal">
              <Icon name="doc" />
              <div>
                <strong>{lang === 'en' ? 'Registered Trust Deed' : 'पंजीकृत न्यास विलेख'}</strong>
                <span>{lang === 'en' ? `Sub Registrar Office, Rewa · ${date}` : `उप पंजीयक कार्यालय, रीवा · ${date}`}</span>
              </div>
              <span className="badge badge--brand"><Icon name="check" style={{ width: 12, height: 12 }} /> {lang === 'en' ? 'Registered' : 'पंजीकृत'}</span>
            </li>
          </ul>
        )}

        {contactOn && go && (
          <p className="reveal" style={{ marginTop: 28 }}>
            <button type="button" className="link-arrow" onClick={() => go('contact')}>
              {lang === 'en' ? 'Questions about our governance? Contact us' : 'संचालन संबंधी प्रश्न? संपर्क करें'} <Icon name="arrow" />
            </button>
          </p>
        )}
      </div>
    </section>
  );
}

/** Closing call-to-action band over a nature photograph. */
export function CtaBand({ lang, go, pageEnabled, joinId = 'involved' }) {
  const canJoin = pageEnabled(joinId);
  const canContact = pageEnabled('contact');
  const canAct = pageEnabled('activities');
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <Photo k="nature" lang={lang} className="cta-band__bg" sizes="100vw" />
      <div className="container">
        <p className="eyebrow reveal" style={{ color: 'var(--gold-300)' }}>{lang === 'en' ? 'Be part of the seva' : 'सेवा का हिस्सा बनें'}</p>
        <h2 id="cta-title" className="reveal">{lang === 'en' ? 'Every hand matters. Every act counts.' : 'हर हाथ मायने रखता है। हर कार्य महत्वपूर्ण है।'}</h2>
        <p className="reveal reveal-d1">
          {lang === 'en'
            ? 'Volunteer at our next drive, sponsor an initiative, or simply spread the word in your community.'
            : 'हमारे अगले अभियान में स्वयंसेवा करें, किसी पहल को प्रायोजित करें, या अपने समाज में बात फैलाएँ।'}
        </p>
        <div className="actions reveal reveal-d2">
          {canJoin && (
            <button type="button" className="btn btn-light" onClick={() => go(joinId)}>
              {lang === 'en' ? 'Join us' : 'हमसे जुड़ें'} <Icon name="arrow" className="arrow" />
            </button>
          )}
          {canContact && (
            <button type="button" className={`btn ${canJoin ? 'btn-ghost-light' : 'btn-light'}`} onClick={() => go('contact')}>
              {lang === 'en' ? 'Get in touch' : 'संपर्क करें'} <Icon name="arrow" className="arrow" />
            </button>
          )}
          {!canJoin && canAct && (
            <button type="button" className="btn btn-ghost-light" onClick={() => go('activities')}>
              {lang === 'en' ? 'See upcoming seva' : 'आगामी सेवा देखें'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/** Prominent band for big upcoming events (activities with `highlight: true`). */
export function EventHighlight({ lang, go, pageEnabled, events = [] }) {
  if (!events.length) return null;
  const en = lang === 'en';
  const sorted = [...events].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const main = sorted[0];
  const last = sorted[sorted.length - 1];
  const fmt = d => fmtDate(d, lang, { day: 'numeric', month: 'long' });
  const range = `${fmt(main.date)} – ${fmt(last.endDate || last.date)} ${new Date(`${main.date}T00:00:00`).getFullYear()}`;
  const start = new Date(`${main.date}T00:00:00`);
  const days = Math.ceil((start - new Date()) / 86400000);
  const ig = sorted.find(e => e.instagram)?.instagram;
  const igEmbed = ig ? `${ig.split('?')[0].replace(/\/?$/, '/')}embed/` : null;

  return (
    <section className="section section--tight" aria-labelledby="mahotsav-title">
      <div className="container">
        <div className="mahotsav reveal">
          <div className="mahotsav__body">
            <p className="eyebrow">{en ? 'Upcoming Mahotsav · You are invited' : 'आगामी महोत्सव · सादर आमंत्रण'}</p>
            <h2 id="mahotsav-title">{main.heading[lang]}</h2>
            <p className="mahotsav__dates">{range}{main.venue ? ` · ${main.venue[lang]}` : ''}</p>
            <p className="lead">{main.text[lang]}</p>
            <ul className="mahotsav__sched">
              {sorted.map(ev => (
                <li key={ev.id}>
                  <strong>
                    {ev.endDate
                      ? `${fmtDate(ev.date, lang, { day: 'numeric', month: 'short' })} – ${fmtDate(ev.endDate, lang, { day: 'numeric', month: 'short' })}`
                      : fmtDate(ev.date, lang, { day: 'numeric', month: 'short' })}
                  </strong>
                  <span>{ev.heading[lang]}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {pageEnabled('contact') && (
                <button type="button" className="btn btn-gold" onClick={() => go('contact')}>
                  {en ? 'Contact for details' : 'जानकारी हेतु संपर्क करें'} <Icon name="arrow" className="arrow" />
                </button>
              )}
              {pageEnabled('activities') && (
                <button type="button" className="btn btn-ghost-light" onClick={() => go('activities')}>
                  {en ? 'All upcoming events' : 'सभी आगामी कार्यक्रम'}
                </button>
              )}
            </div>
          </div>
          <div className={`mahotsav__media${igEmbed ? ' mahotsav__media--reel' : ''}`}>
            {igEmbed ? (
              <>
                <iframe
                  src={igEmbed}
                  title={en ? 'Bhagwat Katha invitation on Instagram' : 'इंस्टाग्राम पर भागवत कथा आमंत्रण'}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                  scrolling="no"
                />
                <a className="link-arrow reel-link" href={ig} target="_blank" rel="noopener noreferrer">
                  {en ? 'Open on Instagram' : 'इंस्टाग्राम पर देखें'} <Icon name="external" />
                </a>
              </>
            ) : (
              <Photo k="culture" lang={lang} sizes="(max-width: 860px) 100vw, 40vw" />
            )}
            {days > 0 && (
              <div className="countdown" aria-label={en ? `${days} days to go` : `${days} दिन शेष`}>
                <b>{days}</b>
                <small>{en ? (days === 1 ? 'day to go' : 'days to go') : 'दिन शेष'}</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
