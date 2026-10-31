import { useState } from 'react';
import SITE from '../data/site.json';
import { PageHeader } from '../components/common/PageHeader';
import { Icon, XLogo } from '../components/common/Icon';

const C = SITE.contact || {};
/** Both inboxes receive the same prefilled message from the form (mailto). */
const CONTACT_EMAILS = C.emails || ['info@atshri.org', 'atshri.trust@gmail.com'];
const MAILTO_TO = CONTACT_EMAILS.join(',');

export function PageContact({ lang, go, team = [] }) {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const en = lang === 'en';
  const s = SITE.social || {};
  const t = SITE.trust;
  const founder = team.find(m => m.visible);

  const updateField = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const openMailto = e => {
    e.preventDefault();
    const subject = en ? `Atshri — message from ${form.name}` : `अथश्री — ${form.name} का संदेश`;
    const body = en
      ? `Name: ${form.name}\nReply-to email: ${form.email}\n\nMessage:\n${form.msg}\n`
      : `नाम: ${form.name}\nईमेल (जवाब के लिए): ${form.email}\n\nसंदेश:\n${form.msg}\n`;
    window.location.href = `mailto:${MAILTO_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <PageHeader
        lang={lang}
        go={go}
        crumb={en ? 'Contact' : 'संपर्क'}
        eyebrow={en ? 'Contact Us' : 'संपर्क करें'}
        title={en ? 'We would love to hear from you' : 'हमें आपसे सुनकर प्रसन्नता होगी'}
        lead={en ? 'Questions, partnerships, volunteering or a family in need — write to us and a trustee will respond.' : 'प्रश्न, साझेदारी, स्वयंसेवा या कोई जरूरतमंद परिवार — हमें लिखें, एक ट्रस्टी उत्तर देंगे।'}
      />

      <section className="section">
        <div className="container split" style={{ alignItems: 'start' }}>
          {/* Contact info */}
          <div className="reveal">
            <h2 className="h-lg" style={{ marginBottom: 28 }}>{en ? 'Reach Atshri Trust' : 'अथश्री ट्रस्ट से संपर्क'}</h2>
            <ul className="info-list">
              <li className="info-item">
                <span className="info-item__icon"><Icon name="pin" /></span>
                <div><h3>{en ? 'Location' : 'स्थान'}</h3><p>{C.address?.[lang] || 'Rewa, Madhya Pradesh, India'}</p></div>
              </li>
              <li className="info-item">
                <span className="info-item__icon"><Icon name="mail" /></span>
                <div>
                  <h3>{en ? 'Email' : 'ईमेल'}</h3>
                  {CONTACT_EMAILS.map(addr => <p key={addr}><a href={`mailto:${addr}`}>{addr}</a></p>)}
                </div>
              </li>
              {C.phone && (
                <li className="info-item">
                  <span className="info-item__icon"><Icon name="phone" /></span>
                  <div><h3>{en ? 'Phone' : 'फोन'}</h3><p><a href={`tel:${C.phone.replace(/\s/g, '')}`}>{C.phone}</a></p></div>
                </li>
              )}
              {C.hours && (
                <li className="info-item">
                  <span className="info-item__icon"><Icon name="clock" /></span>
                  <div><h3>{en ? 'Hours' : 'समय'}</h3><p>{C.hours[lang]}</p></div>
                </li>
              )}
              <li className="info-item">
                <span className="info-item__icon"><Icon name="heart" /></span>
                <div>
                  <h3>{en ? 'Follow us' : 'हमें फॉलो करें'}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px' }}>
                    {s.youtube && <a href={s.youtube} target="_blank" rel="noopener noreferrer">YouTube <span className="muted">{s.youtubeHandle}</span></a>}
                    {s.instagram && <a href={s.instagram} target="_blank" rel="noopener noreferrer">Instagram <span className="muted">{s.instagramHandle}</span></a>}
                    {C.x && (
                      <a href={C.x} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <XLogo width="13" height="13" /> <span className="muted">{C.xHandle}</span>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            </ul>

            {(founder || t) && (
              <div className="panel" style={{ marginTop: 28, display: 'flex', gap: 16, alignItems: 'center', background: 'var(--bg-alt)' }}>
                <Icon name="shield" style={{ width: 28, height: 28, color: 'var(--gold)', flexShrink: 0 }} />
                <div style={{ fontSize: 'var(--fs-sm)' }}>
                  {founder && <p><strong>{founder.name}</strong> · <span className="muted">{founder.role[lang]}</span></p>}
                  {t && <p className="muted">{t.name[lang]} · {lang === 'en' ? 'Reg. No.' : 'पंजीयन क्र.'} {t.regNo}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Contact form */}
          <div className="card reveal reveal-d1" style={{ padding: 'clamp(24px, 4vw, 44px)' }}>
            {sent ? (
              <div className="success-state" role="status">
                <div className="success-state__icon"><Icon name="mail" /></div>
                <h3>{en ? 'Check your email app' : 'अपना ईमेल ऐप देखें'}</h3>
                <p className="muted" style={{ maxWidth: 340, margin: '0 auto' }}>
                  {en
                    ? 'Your device should open your mail app with a draft to us. Press Send there to deliver the message.'
                    : 'आपके फ़ोन/कंप्यूटर पर ईमेल ऐप खुलकर हमारे लिए एक ड्राफ़्ट तैयार हो जाना चाहिए। संदेश भेजने के लिए वहाँ Send दबाएँ।'}
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ marginTop: 22 }}
                  onClick={() => { setSent(false); setForm({ name: '', email: '', msg: '' }); }}
                >
                  {en ? 'Send another' : 'और भेजें'}
                </button>
              </div>
            ) : (
              <form onSubmit={openMailto} className="form-stack" noValidate={false}>
                <div>
                  <h2 className="h-md" style={{ marginBottom: 8 }}>{en ? 'Send a message' : 'संदेश भेजें'}</h2>
                  <div className="notice">
                    <Icon name="info" />
                    <span>
                      {en
                        ? 'This opens your own email app — nothing is stored on a server. Both trust addresses are included as recipients.'
                        : 'यह आपके ईमेल ऐप से खुलेगा — सर्वर पर कुछ सेव नहीं होता। दोनों पते प्राप्तकर्ता में होंगे।'}
                    </span>
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="c-name">{en ? 'Name' : 'नाम'} *</label>
                    <input id="c-name" value={form.name} onChange={updateField('name')} autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">{en ? 'Email' : 'ईमेल'} *</label>
                    <input id="c-email" type="email" value={form.email} onChange={updateField('email')} autoComplete="email" inputMode="email" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="c-msg">{en ? 'Message' : 'संदेश'} *</label>
                  <textarea id="c-msg" rows={6} value={form.msg} onChange={updateField('msg')} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  {en ? 'Send message' : 'संदेश भेजें'} <Icon name="arrow" className="arrow" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
