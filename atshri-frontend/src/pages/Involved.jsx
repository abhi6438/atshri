import { useState } from 'react';
import { submitVolunteer } from '../api';

const DONATION_AMOUNTS = [101, 251, 501, 1001];

export function PageInvolved({ lang }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await submitVolunteer({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.msg,
      });
      setSent(true);
      setForm({ name: '', email: '', phone: '', msg: '' });
    } catch {
      setErr(lang === 'en' ? 'Failed to submit. Please try again.' : 'सबमिट करने में समस्या हुई।');
    } finally {
      setLoading(false);
    }
  };

  const updateField = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: 'var(--hero-grad)', padding: '56px 20px', textAlign: 'center' }}>
        <div className="wrap">
          <h1 className="sxt">{lang === 'en' ? 'Get Involved' : 'जुड़ें हमसे'}</h1>
          <p className="sxs">
            {lang === 'en' ? 'Give your time or give your support — both matter.' : 'समय दें या सहयोग दें — दोनों मायने रखते हैं।'}
          </p>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--surface)' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 32 }}>

          {/* Donate card */}
          <div className="card" style={{ padding: 32 }}>
            <div style={{ fontSize: 46, marginBottom: 13 }}>💝</div>
            <h2 style={{ fontWeight: 800, fontSize: 23, marginBottom: 10 }}>
              {lang === 'en' ? 'Support Our Cause' : 'सहयोग करें'}
            </h2>
            <p style={{ color: 'var(--mid)', lineHeight: 1.75, marginBottom: 22 }}>
              {lang === 'en'
                ? 'Your contribution fuels our mission. Every rupee goes directly to people in need.'
                : 'आपका योगदान हमारे मिशन को आगे बढ़ाता है।'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginBottom: 17 }}>
              {DONATION_AMOUNTS.map(n => (
                <button key={n} className="bout" style={{ padding: '11px 8px', fontSize: 15 }}>
                  ₹{n}
                </button>
              ))}
            </div>
            <button className="bsf" style={{ width: '100%', padding: 13, fontSize: 16 }}>
              {lang === 'en' ? 'Donate Now 🙏' : 'दान करें 🙏'}
            </button>
            <p style={{ fontSize: 12, color: 'var(--mid)', marginTop: 11, textAlign: 'center' }}>
              {lang === 'en' ? 'UPI / Bank Transfer / Cash — all accepted' : 'UPI / बैंक ट्रांसफर / नकद — सभी स्वीकार्य'}
            </p>
          </div>

          {/* Volunteer card */}
          <div className="card" style={{ padding: 32 }}>
            <div style={{ fontSize: 46, marginBottom: 13 }}>🙌</div>
            <h2 style={{ fontWeight: 800, fontSize: 23, marginBottom: 10 }}>
              {lang === 'en' ? 'Become a Volunteer' : 'स्वयंसेवक बनें'}
            </h2>
            <p style={{ color: 'var(--mid)', lineHeight: 1.75, marginBottom: 20 }}>
              {lang === 'en' ? 'No skill is too small. Your time and energy matter enormously.' : 'आपका हर पल मायने रखता है।'}
            </p>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '26px 0' }}>
                <div style={{ fontSize: 46, marginBottom: 11 }}>✅</div>
                <h3 style={{ color: 'var(--sf)', fontWeight: 700, fontSize: 19, marginBottom: 7 }}>
                  {lang === 'en' ? 'Welcome to the family!' : 'परिवार में स्वागत है!'}
                </h3>
                <p style={{ color: 'var(--mid)' }}>
                  {lang === 'en' ? "We'll reach out to you shortly." : 'हम जल्द संपर्क करेंगे।'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                  value={form.name} onChange={updateField('name')}
                  placeholder={lang === 'en' ? 'Full Name *' : 'पूरा नाम *'} required
                />
                <input
                  type="email" value={form.email} onChange={updateField('email')}
                  placeholder={lang === 'en' ? 'Email *' : 'ईमेल *'} required
                />
                <input
                  type="tel" value={form.phone} onChange={updateField('phone')}
                  placeholder={lang === 'en' ? 'Phone' : 'फोन'}
                />
                <textarea
                  rows={3} value={form.msg} onChange={updateField('msg')}
                  placeholder={lang === 'en' ? 'Why do you want to volunteer?' : 'आप स्वयंसेवक क्यों बनना चाहते हैं?'}
                />
                {err && <p style={{ color: '#DC2626', fontSize: 13 }}>{err}</p>}
                <button type="submit" className="bsf" style={{ padding: 13, fontSize: 15 }} disabled={loading}>
                  {loading
                    ? (lang === 'en' ? 'Submitting...' : 'सबमिट हो रहा है...')
                    : (lang === 'en' ? 'Join as Volunteer 🙏' : 'स्वयंसेवक बनें 🙏')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
