import { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Icon } from '../components/common/Icon';
import { Photo } from '../components/sections';

const DONATION_AMOUNTS = [101, 251, 501, 1001];

export function PageInvolved({ lang, go }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' });
  const [sent, setSent] = useState(false);
  const [amount, setAmount] = useState(null);
  const en = lang === 'en';

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  const updateField = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <>
      <PageHeader
        lang={lang}
        go={go}
        crumb={en ? 'Get Involved' : 'जुड़ें'}
        eyebrow={en ? 'Get Involved' : 'जुड़ें हमसे'}
        title={en ? 'Give your time, or give your support' : 'समय दें या सहयोग दें'}
        lead={en ? 'Both matter. Every volunteer hour and every contribution reaches people in need.' : 'दोनों मायने रखते हैं। हर स्वयंसेवा और हर योगदान जरूरतमंदों तक पहुँचता है।'}
      />

      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          {/* Support */}
          <div className="card reveal" style={{ overflow: 'hidden' }}>
            <div className="media" style={{ aspectRatio: '16 / 8', borderRadius: 0 }}>
              <Photo k="community" lang={lang} sizes="(max-width: 680px) 100vw, 50vw" />
            </div>
            <div style={{ padding: 'clamp(22px, 3.5vw, 36px)' }}>
              <p className="eyebrow">{en ? 'Support' : 'सहयोग'}</p>
              <h2 className="h-lg" style={{ marginBottom: 12 }}>{en ? 'Support our cause' : 'सहयोग करें'}</h2>
              <p className="muted" style={{ marginBottom: 22 }}>
                {en ? 'Your contribution fuels our mission. Every rupee goes directly to people in need.' : 'आपका योगदान हमारे मिशन को आगे बढ़ाता है। हर रुपया सीधे जरूरतमंदों तक पहुँचता है।'}
              </p>
              <div className="chip-row" role="group" aria-label={en ? 'Choose an amount' : 'राशि चुनें'} style={{ marginBottom: 18 }}>
                {DONATION_AMOUNTS.map(n => (
                  <button key={n} type="button" className={`chip${amount === n ? ' is-active' : ''}`} aria-pressed={amount === n} onClick={() => setAmount(n)} style={{ minWidth: 84, justifyContent: 'center' }}>
                    ₹{n}
                  </button>
                ))}
              </div>
              <button type="button" className="btn btn-primary btn-block">
                {en ? 'Donate now' : 'दान करें'} <Icon name="heart" />
              </button>
              <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 12, textAlign: 'center' }}>
                {en ? 'UPI / Bank Transfer / Cash — all accepted' : 'UPI / बैंक ट्रांसफर / नकद — सभी स्वीकार्य'}
              </p>
            </div>
          </div>

          {/* Volunteer */}
          <div className="card reveal reveal-d1" style={{ padding: 'clamp(22px, 3.5vw, 36px)' }}>
            <p className="eyebrow">{en ? 'Volunteer' : 'स्वयंसेवा'}</p>
            <h2 className="h-lg" style={{ marginBottom: 12 }}>{en ? 'Become a volunteer' : 'स्वयंसेवक बनें'}</h2>
            <p className="muted" style={{ marginBottom: 22 }}>
              {en ? 'No skill is too small. Your time and energy matter enormously.' : 'आपका हर पल मायने रखता है।'}
            </p>

            {sent ? (
              <div className="success-state" role="status">
                <div className="success-state__icon"><Icon name="check" /></div>
                <h3>{en ? 'Welcome to the family!' : 'परिवार में स्वागत है!'}</h3>
                <p className="muted">{en ? "We'll reach out to you shortly." : 'हम जल्द संपर्क करेंगे।'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form-stack">
                <div className="field">
                  <label htmlFor="v-name">{en ? 'Full name' : 'पूरा नाम'} *</label>
                  <input id="v-name" value={form.name} onChange={updateField('name')} autoComplete="name" required />
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="v-email">{en ? 'Email' : 'ईमेल'} *</label>
                    <input id="v-email" type="email" value={form.email} onChange={updateField('email')} autoComplete="email" required />
                  </div>
                  <div className="field">
                    <label htmlFor="v-phone">{en ? 'Phone' : 'फोन'}</label>
                    <input id="v-phone" type="tel" value={form.phone} onChange={updateField('phone')} autoComplete="tel" inputMode="tel" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="v-msg">{en ? 'Why do you want to volunteer?' : 'आप स्वयंसेवक क्यों बनना चाहते हैं?'}</label>
                  <textarea id="v-msg" rows={3} value={form.msg} onChange={updateField('msg')} />
                </div>
                <button type="submit" className="btn btn-primary">
                  {en ? 'Join as volunteer' : 'स्वयंसेवक बनें'} <Icon name="arrow" className="arrow" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
