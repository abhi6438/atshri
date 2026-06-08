import { useState } from 'react';
import { Chip } from '../components/common/Chip';
import { Empty } from '../components/common/Empty';
import { ActCard } from '../components/ActCard';

const TABS = [
  { id: 'done',     en: '✅ Completed', hi: '✅ पूर्ण कार्य' },
  { id: 'upcoming', en: '📅 Upcoming',  hi: '📅 आगामी'       },
];

export function PageActivities({ lang, acts, cats }) {
  const [tab,    setTab]    = useState('done');
  const [filter, setFilter] = useState('all');

  const done     = acts.filter(a => !a.upcoming);
  const upcoming = acts.filter(a =>  a.upcoming);
  const byTab    = tab === 'done' ? done : upcoming;
  const shown    = filter === 'all' ? byTab : byTab.filter(a => a.category === filter);

  // global playlist — all visible activities with YouTube videos
  const playlist = acts.flatMap(a =>
    (Array.isArray(a.youtube) ? a.youtube.filter(Boolean) : [])
      .map(url => ({ url, title: a.heading[lang] }))
  );

  function switchTab(id) { setTab(id); setFilter('all'); }

  return (
    <div style={{ paddingTop: 64 }}>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--hero-grad)', padding: '48px 20px 36px' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h1 className="sxt">{lang === 'en' ? 'Our Activities' : 'हमारी गतिविधियाँ'}</h1>
          <p className="sxs" style={{ marginBottom: 0 }}>
            {lang === 'en' ? 'From summer to winter — we serve in every season.' : 'गर्मी से सर्दी तक — हम हर मौसम में सेवा करते हैं।'}
          </p>
        </div>
      </section>

      {/* ── Tab bar ── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--brd)', position: 'sticky', top: 64, zIndex: 10 }}>
        <div className="wrap" style={{ display: 'flex' }}>
          {TABS.map(t => {
            const count  = t.id === 'done' ? done.length : upcoming.length;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => switchTab(t.id)} style={{
                flex: 1, padding: '14px 8px',
                fontWeight: 700, fontSize: 14,
                background: 'none', border: 'none',
                borderBottom: active ? '3px solid var(--accent)' : '3px solid transparent',
                color: active ? 'var(--accent)' : 'var(--mid)',
                cursor: 'pointer', transition: 'color .15s, border-color .15s',
                fontFamily: 'inherit',
              }}>
                {t[lang]}{' '}
                <span style={{
                  display: 'inline-block',
                  background: active ? 'var(--accent)' : 'var(--brd)',
                  color: active ? '#fff' : 'var(--mid)',
                  borderRadius: 20, fontSize: 11, padding: '1px 7px', marginLeft: 4,
                  transition: 'background .15s, color .15s',
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content ── */}
      <section className="sec" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            <Chip active={filter === 'all'} onClick={() => setFilter('all')} color="var(--sf)">
              {lang === 'en' ? 'All' : 'सभी'}
            </Chip>
            {cats.map(c => (
              <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)} color={c.color}>
                {c.icon} {c.name[lang]}
              </Chip>
            ))}
          </div>

          {shown.length === 0
            ? <Empty lang={lang} />
            : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 20 }}>
                {shown.map(a => <ActCard key={a.id} a={a} lang={lang} cats={cats} playlist={playlist} />)}
              </div>
            )}
        </div>
      </section>
    </div>
  );
}
