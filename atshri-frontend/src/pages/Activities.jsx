import { useState } from 'react';
import { Chip } from '../components/common/Chip';
import { Empty } from '../components/common/Empty';
import { ActCard } from '../components/ActCard';

export function PageActivities({ lang, acts, cats }) {
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? acts : acts.filter(a => a.category === filter);

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: 'var(--hero-grad)', padding: '56px 20px' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h1 className="sxt">{lang === 'en' ? 'Our Activities' : 'हमारी गतिविधियाँ'}</h1>
          <p className="sxs">
            {lang === 'en' ? 'From summer to winter — we serve in every season.' : 'गर्मी से सर्दी तक — हम हर मौसम में सेवा करते हैं।'}
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

      <section className="sec" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          {shown.length === 0
            ? <Empty lang={lang} />
            : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 20 }}>
                {shown.map(a => <ActCard key={a.id} a={a} lang={lang} cats={cats} />)}
              </div>
            )}
        </div>
      </section>
    </div>
  );
}
