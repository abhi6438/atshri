import { catOf } from '../utils/catOf';

export function ActCard({ a, lang, cats }) {
  const c = catOf(cats, a.category);
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{
        height: 170,
        background: a.image
          ? `url(${a.image}) center/cover no-repeat`
          : `linear-gradient(135deg,${c.color}18,${c.color}35)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 54,
      }}>
        {!a.image && a.icon}
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
          <span style={{ background: `${c.color}18`, color: c.color, fontWeight: 700, fontSize: 12, padding: '4px 10px', borderRadius: 20 }}>
            {c.icon} {c.name[lang]}
          </span>
          <span style={{ fontSize: 12, color: 'var(--mid)' }}>{a.date}</span>
        </div>
        <h3 style={{ fontWeight: 700, marginBottom: 7, fontSize: 16 }}>{a.heading[lang]}</h3>
        <p style={{ color: 'var(--mid)', fontSize: 14, lineHeight: 1.62 }}>{a.text[lang]}</p>
      </div>
    </div>
  );
}
