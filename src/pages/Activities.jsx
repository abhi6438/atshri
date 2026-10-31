import { useState } from 'react';
import { Chip } from '../components/common/Chip';
import { Empty } from '../components/common/Empty';
import { ActCard } from '../components/ActCard';
import { PageHeader } from '../components/common/PageHeader';
import { buildPlaylist } from '../utils/media';

const TABS = [
  { id: 'done',     en: 'Completed', hi: 'पूर्ण कार्य' },
  { id: 'upcoming', en: 'Upcoming',  hi: 'आगामी'      },
];

export function PageActivities({ lang, go, acts, cats }) {
  const [tab,    setTab]    = useState('done');
  const [filter, setFilter] = useState('all');
  const en = lang === 'en';

  const done     = acts.filter(a => !a.upcoming);
  const upcoming = acts.filter(a =>  a.upcoming);
  const byTab    = tab === 'done' ? done : upcoming;
  const shown    = filter === 'all' ? byTab : byTab.filter(a => a.category === filter);
  // only offer categories that actually have activities in this tab
  const tabCats  = cats.filter(c => byTab.some(a => a.category === c.id));

  const playlist = buildPlaylist(acts, lang);

  function switchTab(id) { setTab(id); setFilter('all'); }

  return (
    <>
      <PageHeader
        lang={lang}
        go={go}
        crumb={en ? 'Activities' : 'गतिविधियाँ'}
        eyebrow={en ? 'Activities & Events' : 'गतिविधियाँ एवं कार्यक्रम'}
        title={en ? 'Seva in every season' : 'हर मौसम में सेवा'}
        lead={en ? 'From summer to winter — a record of what we have done, and what we are preparing next.' : 'गर्मी से सर्दी तक — हमारे पूर्ण कार्यों और आगामी तैयारियों का विवरण।'}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="toolbar">
            <div className="tabs" role="tablist" aria-label={en ? 'Activity status' : 'गतिविधि स्थिति'}>
              {TABS.map(t => {
                const count  = t.id === 'done' ? done.length : upcoming.length;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="act-panel"
                    className={`tab${active ? ' is-active' : ''}`}
                    onClick={() => switchTab(t.id)}
                  >
                    {t[lang]} <span className="count">{count}</span>
                  </button>
                );
              })}
            </div>
            {tabCats.length > 1 && (
              <div className="chip-row chip-row--scroll" aria-label={en ? 'Filter by category' : 'श्रेणी अनुसार फ़िल्टर'}>
                <Chip active={filter === 'all'} onClick={() => setFilter('all')}>{en ? 'All' : 'सभी'}</Chip>
                {tabCats.map(c => (
                  <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
                    <span aria-hidden="true">{c.icon}</span> {c.name[lang]}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          <div id="act-panel" role="tabpanel" aria-live="polite">
            {shown.length === 0
              ? <Empty lang={lang} />
              : (
                <div className="grid grid-3">
                  {shown.map(a => <ActCard key={a.id} a={a} lang={lang} cats={cats} playlist={playlist} headingLevel={2} />)}
                </div>
              )}
          </div>
        </div>
      </section>
    </>
  );
}
