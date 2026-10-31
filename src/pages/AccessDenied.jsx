import { Icon } from '../components/common/Icon';
import { Logo } from '../components/common/Logo';

export function PageAccessDenied({ lang, go }) {
  const en = lang === 'en';
  return (
    <section
      className="pat"
      style={{
        minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 48px) var(--gutter) 64px', textAlign: 'center', background: 'var(--bg-alt)',
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}><Logo size={64} /></div>
        <p className="eyebrow eyebrow--center">{en ? 'Page unavailable' : 'पृष्ठ उपलब्ध नहीं'}</p>
        <h1 className="h-xl">{en ? 'This section is resting for now' : 'यह खंड अभी उपलब्ध नहीं है'}</h1>
        <p className="lead" style={{ margin: '0 auto 32px' }}>
          {en
            ? 'This section is not available right now. The link may be outdated or the page has been turned off.'
            : 'यह खंड अभी उपलब्ध नहीं है। लिंक पुराना हो सकता है या पृष्ठ बंद कर दिया गया है।'}
        </p>
        <button type="button" className="btn btn-primary" onClick={() => go('home')}>
          <Icon name="arrowLeft" /> {en ? 'Back to home' : 'होम पर जाएँ'}
        </button>
      </div>
    </section>
  );
}
