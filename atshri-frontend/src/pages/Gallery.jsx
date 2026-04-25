import { useState } from 'react';
import { Chip } from '../components/common/Chip';
import { Divider } from '../components/common/Divider';
import { Empty } from '../components/common/Empty';
import { catOf } from '../utils/catOf';

export function PageGallery({ lang, acts, cats }) {
  const [filter, setFilter] = useState('all');
  const shown  = filter === 'all' ? acts : acts.filter(a => a.category === filter);
  const photos = shown.filter(a => a.image);
  const totalPhotos = acts.filter(a => a.image).length;

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: 'var(--hero-grad)', padding: '56px 20px' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--sf)', fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 8 }}>SEVA IN PICTURES</p>
          <h1 className="sxt">{lang === 'en' ? 'Our Gallery' : 'हमारी गैलरी'}</h1>
          <p className="sxs">
            {lang === 'en'
              ? 'A visual record of our service — every photo is a story of care and community.'
              : 'सेवा का दृश्य-अभिलेख — हर तस्वीर एक कहानी।'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            <Chip active={filter === 'all'} onClick={() => setFilter('all')} color="var(--sf)">
              {lang === 'en' ? 'All' : 'सभी'}
            </Chip>
            {cats.map(c => (
              <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)} color={c.color}>
                {c.icon} {c.name[lang]}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: 'var(--toolbar-bg)', borderBottom: '1px solid var(--bd)', padding: '12px 20px' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 13, color: 'var(--mid)', fontWeight: 600 }}>
          <span>{shown.length} {lang === 'en' ? 'activities' : 'गतिविधियाँ'} · {photos.length} {lang === 'en' ? 'with photos' : 'तस्वीरों के साथ'}</span>
          <span>{lang === 'en' ? `${totalPhotos} total photos in gallery` : `कुल ${totalPhotos} तस्वीरें`}</span>
        </div>
      </div>

      <section className="sec" style={{ background: 'var(--sfp)' }}>
        <div className="wrap">
          {shown.length === 0 ? <Empty lang={lang} /> : (
            <>
              {photos.length > 0 && (
                <div style={{ marginBottom: 48 }}>
                  <Divider>{lang === 'en' ? '📸 PHOTOS FROM THE FIELD' : '📸 सेवा की तस्वीरें'}</Divider>
                  <div style={{ columns: '3 260px', columnGap: 15 }}>
                    {photos.map(a => {
                      const c = catOf(cats, a.category);
                      return (
                        <div
                          key={a.id}
                          className="gcrd"
                          style={{
                            breakInside: 'avoid', marginBottom: 15, borderRadius: 15,
                            overflow: 'hidden', position: 'relative', cursor: 'pointer',
                            boxShadow: '0 4px 18px rgba(0,0,0,.1)',
                          }}
                        >
                          <div className="gimg">
                            <img src={a.image} alt={a.heading.en} loading="lazy" />
                          </div>
                          <div className="gov">
                            <span style={{ background: c.color, color: '#fff', fontWeight: 700, fontSize: 11, padding: '3px 9px', borderRadius: 20, display: 'inline-block', marginBottom: 6 }}>
                              {c.icon} {c.name[lang]}
                            </span>
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{a.heading[lang]}</div>
                            <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 12, marginTop: 2 }}>📅 {a.date}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <Divider>
                {lang === 'en' ? `📋 ALL ACTIVITIES (${shown.length})` : `📋 सभी गतिविधियाँ (${shown.length})`}
              </Divider>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 15, marginTop: 20 }}>
                {shown.map(a => {
                  const c = catOf(cats, a.category);
                  return (
                    <div key={a.id} className="card" style={{ overflow: 'hidden' }}>
                      <div style={{
                        height: 115,
                        background: a.image
                          ? `url(${a.image}) center/cover`
                          : `linear-gradient(135deg,${c.color}14,${c.color}30)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38,
                      }}>
                        {!a.image && a.icon}
                      </div>
                      <div style={{ padding: '13px 15px 14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                          <span style={{ background: `${c.color}18`, color: c.color, fontWeight: 700, fontSize: 11, padding: '3px 8px', borderRadius: 20 }}>
                            {c.name[lang]}
                          </span>
                          <span style={{ fontSize: 11, color: 'var(--mid)' }}>{a.date}</span>
                        </div>
                        <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{a.heading[lang]}</h4>
                        <p style={{ color: 'var(--mid)', fontSize: 12, lineHeight: 1.5 }}>
                          {a.text[lang].slice(0, 82)}…
                        </p>
                        {a.image && (
                          <div style={{ marginTop: 7, fontSize: 11, color: '#16A34A', fontWeight: 700 }}>
                            📸 {lang === 'en' ? 'Photo' : 'तस्वीर'}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
