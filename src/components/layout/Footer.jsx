import { Logo, LogoName } from '../common/Logo';
import { Icon, XLogo } from '../common/Icon';
import SITE from '../../data/site.json';

export function Footer({ lang, go, cats, menu }) {
  const quick = (menu || []).filter(m => m.enabled !== false);
  const t = SITE.trust;
  const c = SITE.contact || {};
  const s = SITE.social || {};

  return (
    <footer className="site-footer" aria-labelledby="footer-title">
      <div className="container">
        <h2 id="footer-title" className="sr-only">{lang === 'en' ? 'Site footer' : 'फ़ुटर'}</h2>
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Logo size={48} />
              <div>
                <LogoName light lang={lang} size={24} />
                <div className="brand__sub" style={{ color: 'var(--gold-300)' }}>
                  {t?.name[lang] || 'Atshri Trust'}
                </div>
              </div>
            </div>
            <p>
              {lang === 'en'
                ? 'A registered public charitable trust in Rewa, Madhya Pradesh — serving through relief, cultural seva, education, health and care for nature.'
                : 'रीवा, मध्य प्रदेश का एक पंजीकृत सार्वजनिक धर्मार्थ न्यास — राहत, सांस्कृतिक सेवा, शिक्षा, स्वास्थ्य एवं प्रकृति संरक्षण के माध्यम से सेवा।'}
            </p>
            <p className="mantra">सेवा परमो धर्मः</p>
            <p style={{ marginTop: 10, fontSize: 'var(--fs-xs)', color: 'var(--gold-300)' }}>
              {lang === 'en' ? 'Dedicated to the loving memory of Late Shri Manoj Kumar Shrivastava' : 'स्व. श्री मनोज कुमार श्रीवास्तव की पुण्य स्मृति में समर्पित'}
            </p>
            <div className="footer-social">
              {s.youtube && <a href={s.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Icon name="youtube" /></a>}
              {s.instagram && <a href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" /></a>}
              {c.x && <a href={c.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><XLogo width="15" height="15" /></a>}
            </div>
          </div>

          <nav aria-label={lang === 'en' ? 'Footer' : 'फ़ुटर लिंक'}>
            <h3>{lang === 'en' ? 'Explore' : 'देखें'}</h3>
            <ul>
              {quick.map(m => (
                <li key={m.id}>
                  <button type="button" className="footer-link" onClick={() => go(m.id)}>{m.label[lang]}</button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3>{lang === 'en' ? 'Our Seva' : 'हमारी सेवा'}</h3>
            <ul>
              {cats.slice(0, 6).map(cat => <li key={cat.id}>{cat.name[lang]}</li>)}
            </ul>
          </div>

          <div>
            <h3>{lang === 'en' ? 'Contact' : 'संपर्क'}</h3>
            <ul>
              <li>{c.address?.[lang] || 'Rewa, MP'}</li>
              {(c.emails || []).map(e => (
                <li key={e}><a href={`mailto:${e}`}>{e}</a></li>
              ))}
              {c.phone && <li><a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a></li>}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t?.name[lang] || 'Atshri'}. {lang === 'en' ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}
          </span>
          {t?.regNo && (
            <span>
              {t.type[lang]} · {lang === 'en' ? 'Reg. No.' : 'पंजीयन क्र.'} <span className="reg">{t.regNo}</span>
            </span>
          )}
          <button type="button" className="footer-link footer-admin" onClick={() => go('admin')}>
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
