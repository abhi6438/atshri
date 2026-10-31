/** Shared inner-page header: breadcrumb, eyebrow, serif title, lead. */
export function PageHeader({ lang, go, eyebrow, title, lead, crumb, children }) {
  return (
    <header className="page-header pat">
      <div className="container">
        {go && crumb && (
          <nav aria-label={lang === 'en' ? 'Breadcrumb' : 'ब्रेडक्रम्ब'}>
            <ol className="crumbs">
              <li><button type="button" onClick={() => go('home')}>{lang === 'en' ? 'Home' : 'होम'}</button></li>
              <li aria-current="page">{crumb}</li>
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow u1">{eyebrow}</p>}
        <h1 className="u1">{title}</h1>
        {lead && <p className="lead u2">{lead}</p>}
        {children && <div className="u3" style={{ marginTop: 28, position: 'relative', zIndex: 1 }}>{children}</div>}
      </div>
    </header>
  );
}
