import { useState } from 'react';

/** Both inboxes receive the same prefilled message from the form (mailto). */
const CONTACT_EMAILS = ['info@atshri.org', 'atshri.trust@gmail.com'];
const MAILTO_TO = CONTACT_EMAILS.join(',');

const CONTACT_INFO = [
  { icon: '📍', en: 'Location', hi: 'स्थान', value: 'Rewa, Madhya Pradesh, India' },
  { icon: '📧', en: 'Email', hi: 'ईमेल', emails: CONTACT_EMAILS },
  { icon: '📱', en: 'Phone', hi: 'फोन', value: '+91 XXXXX XXXXX' },
];

const SOCIAL_LINKS = [
  {
    icon: '▶️',
    en: 'YouTube',
    hi: 'यूट्यूब',
    href: 'https://www.youtube.com/@atshri',
    label: 'youtube.com/@atshri',
  },
  {
    icon: 'X',
    en: 'X (Twitter)',
    hi: 'एक्स (ट्विटर)',
    href: 'https://x.com/AtshriTrust',
    label: '@AtshriTrust',
  },
];

export function PageContact({ lang }) {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);

  const updateField = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const openMailto = e => {
    e.preventDefault();
    const subject =
      lang === 'en'
        ? `Atshri — message from ${form.name}`
        : `अथश्री — ${form.name} का संदेश`;
    const body =
      lang === 'en'
        ? `Name: ${form.name}\nReply-to email: ${form.email}\n\nMessage:\n${form.msg}\n`
        : `नाम: ${form.name}\nईमेल (जवाब के लिए): ${form.email}\n\nसंदेश:\n${form.msg}\n`;
    window.location.href = `mailto:${MAILTO_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: 'var(--hero-grad)', padding: '56px 20px', textAlign: 'center' }}>
        <div className="wrap">
          <h1 className="sxt">{lang === 'en' ? 'Contact Us' : 'संपर्क करें'}</h1>
          <p className="sxs">
            {lang === 'en' ? "Have a question? We'd love to hear from you." : 'कोई प्रश्न है? हम सुनना पसंद करेंगे।'}
          </p>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--surface)' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 36 }}>

          {/* Contact info */}
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 21, marginBottom: 24 }}>
              {lang === 'en' ? 'Contact Info' : 'संपर्क जानकारी'}
            </h2>
            {CONTACT_INFO.map(({ icon, en, hi, value, emails }) => (
              <div key={en} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, background: 'var(--sfl)', borderRadius: 11,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 19, flexShrink: 0,
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: 'var(--sf)', letterSpacing: 1, marginBottom: 2 }}>
                    {(lang === 'en' ? en : hi).toUpperCase()}
                  </div>
                  {emails ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {emails.map(addr => (
                        <a
                          key={addr}
                          href={`mailto:${addr}`}
                          style={{ color: 'var(--sf)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}
                        >
                          {addr}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: 'var(--mid)', fontSize: 15 }}>{value}</div>
                  )}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, background: 'var(--sfl)', borderRadius: 11,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 19, flexShrink: 0,
              }}>🕐</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 11, color: 'var(--sf)', letterSpacing: 1, marginBottom: 2 }}>
                  {lang === 'en' ? 'HOURS' : 'समय'}
                </div>
                <div style={{ color: 'var(--mid)', fontSize: 15 }}>
                  {lang === 'en' ? 'Mon–Sat, 9am–6pm' : 'सोम–शनि, 9–6'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, background: 'var(--sfl)', borderRadius: 11,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17, flexShrink: 0,
              }}>🔗</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 11, color: 'var(--sf)', letterSpacing: 1, marginBottom: 6 }}>
                  {(lang === 'en' ? 'Follow us' : 'हमें फॉलो करें').toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {SOCIAL_LINKS.map(({ icon, en, hi, href, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--sf)',
                        fontSize: 15,
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span aria-hidden>{icon}</span>
                      <span>
                        {lang === 'en' ? en : hi}
                        <span style={{ color: 'var(--mid)', fontWeight: 500, marginLeft: 6 }}>({label})</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: 18, background: 'var(--sfl)', borderRadius: 13, border: '1.5px solid var(--bd)', marginTop: 20 }}>
              <p style={{ fontWeight: 700, color: 'var(--sfd)', fontSize: 13, marginBottom: 4 }}>
                🙏 {lang === 'en' ? 'Trustee' : 'ट्रस्टी'}
              </p>
              <p style={{ fontWeight: 600 }}>Maya Manoj Shrivastava</p>
            </div>
          </div>

          {/* Contact form */}
          <div className="card" style={{ padding: 30 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '42px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 11 }}>✉️</div>
                <h3 style={{ color: 'var(--sf)', fontWeight: 700, fontSize: 21, marginBottom: 7 }}>
                  {lang === 'en' ? 'Check your email app' : 'अपना ईमेल ऐप देखें'}
                </h3>
                <p style={{ color: 'var(--mid)', maxWidth: 320, margin: '0 auto', lineHeight: 1.55 }}>
                  {lang === 'en'
                    ? 'Your device should open your mail app with a draft to us. Press Send there to deliver the message.'
                    : 'आपके फ़ोन/कंप्यूटर पर ईमेल ऐप खुलकर हमारे लिए एक ड्राफ़ तैयार हो जाना चाहिए। संदेश भेजने के लिए वहाँ Send दबाएँ।'}
                </p>
                <button
                  className="bsf"
                  style={{ marginTop: 18, padding: '9px 22px', fontSize: 14 }}
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', msg: '' });
                  }}
                >
                  {lang === 'en' ? 'Send Another' : 'और भेजें'}
                </button>
              </div>
            ) : (
              <form onSubmit={openMailto} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h3 style={{ fontWeight: 800, fontSize: 19, marginBottom: 4 }}>
                  {lang === 'en' ? 'Send a Message' : 'संदेश भेजें'}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--mid)', margin: '-6px 0 0', lineHeight: 1.45 }}>
                  {lang === 'en'
                    ? 'Uses your own email app — no server stores this. Both addresses are included as recipients.'
                    : 'यह आपके ईमेल ऐप से खुलेगा — सर्वर पर कुछ सेव नहीं होता। दोनों पते प्राप्तकर्ता में होंगे।'}
                </p>
                <input
                  value={form.name} onChange={updateField('name')}
                  placeholder={lang === 'en' ? 'Name *' : 'नाम *'} required
                />
                <input
                  type="email" value={form.email} onChange={updateField('email')}
                  placeholder={lang === 'en' ? 'Email *' : 'ईमेल *'} required
                />
                <textarea
                  rows={5} value={form.msg} onChange={updateField('msg')}
                  placeholder={lang === 'en' ? 'Message *' : 'संदेश *'} required
                />
                <button type="submit" className="bsf" style={{ padding: 13, fontSize: 15 }}>
                  {lang === 'en' ? 'Send Message' : 'भेजें'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
