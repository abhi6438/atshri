export function PageAccessDenied({ lang, go }) {
  return (
    <section
      className="sec pat"
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px 60px',
        textAlign: 'center',
      }}
    >
      <div className="wrap" style={{ maxWidth: 480 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🚫</div>
        <h1 className="sxt" style={{ marginBottom: 12 }}>
          {lang === 'en' ? 'Access denied' : 'पहुँच अस्वीकृत'}
        </h1>
        <p className="sxs" style={{ marginBottom: 28 }}>
          {lang === 'en'
            ? 'This section is not available right now. The link may be outdated or the page has been turned off.'
            : 'यह खंड अभी उपलब्ध नहीं है। लिंक पुराना हो सकता है या पृष्ठ बंद कर दिया गया है।'}
        </p>
        <button type="button" className="bsf" style={{ padding: '12px 28px', fontSize: 16 }} onClick={() => go('home')}>
          {lang === 'en' ? 'Back to home' : 'होम पर जाएँ'}
        </button>
      </div>
    </section>
  );
}
