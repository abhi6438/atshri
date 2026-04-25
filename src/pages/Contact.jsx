import { useState } from 'react';

const CONTACT_INFO = [
  { icon: '📍', en: 'Location', hi: 'स्थान',  value: 'Rewa, Madhya Pradesh, India' },
  { icon: '📧', en: 'Email',    hi: 'ईमेल',   value: 'atshri.seva@gmail.com' },
  { icon: '📱', en: 'Phone',    hi: 'फोन',    value: '+91 XXXXX XXXXX' },
];

export function PageContact({ lang }) {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);

  const updateField = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

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
            {CONTACT_INFO.map(({ icon, en, hi, value }) => (
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
                  <div style={{ color: 'var(--mid)', fontSize: 15 }}>{value}</div>
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
                  {lang === 'en' ? 'Message Sent!' : 'संदेश भेज दिया!'}
                </h3>
                <p style={{ color: 'var(--mid)' }}>
                  {lang === 'en' ? "We'll get back to you soon." : 'हम जल्द संपर्क करेंगे।'}
                </p>
                <button
                  className="bsf"
                  style={{ marginTop: 18, padding: '9px 22px', fontSize: 14 }}
                  onClick={() => setSent(false)}
                >
                  {lang === 'en' ? 'Send Another' : 'और भेजें'}
                </button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h3 style={{ fontWeight: 800, fontSize: 19, marginBottom: 4 }}>
                  {lang === 'en' ? 'Send a Message' : 'संदेश भेजें'}
                </h3>
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
