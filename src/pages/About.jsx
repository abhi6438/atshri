import { ABOUT } from '../data/content';
import { PageHeader } from '../components/common/PageHeader';
import { Icon } from '../components/common/Icon';
import { Photo, VisionMission, Trustees, Transparency, CtaBand } from '../components/sections';

export function PageAbout({ lang, go, team, values, pageEnabled, donateCta }) {
  const en = lang === 'en';
  const jump = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <PageHeader
        lang={lang}
        go={go}
        crumb={en ? 'About Us' : 'हमारे बारे में'}
        eyebrow={en ? 'About Atshri Trust' : 'अथश्री ट्रस्ट के बारे में'}
        title={en ? 'Every act of service creates ripples of lasting change' : 'सेवा का हर कार्य स्थायी परिवर्तन की लहर बनाता है'}
        lead={en
          ? 'From cool water under the summer sun to blankets on cold winter nights and the floors of our beloved mandirs — we show up wherever we are needed.'
          : 'गर्मी में शीतल जल से लेकर सर्दी की रातों में कम्बल और हमारे प्रिय मंदिरों की सेवा तक — जहाँ आवश्यकता हो, हम वहाँ पहुँचते हैं।'}
      >
        <nav className="chip-row chip-row--scroll" aria-label={en ? 'On this page' : 'इस पृष्ठ पर'}>
          {[
            ['story', en ? 'Our story' : 'हमारी कहानी'],
            ['vision', en ? 'Vision & Mission' : 'दृष्टि एवं मिशन'],
            ['trustees', en ? 'Trustees' : 'ट्रस्टी'],
            ['documents', en ? 'Documents' : 'दस्तावेज़'],
          ].map(([id, label]) => (
            <button key={id} type="button" className="chip" onClick={() => jump(id)}>{label}</button>
          ))}
        </nav>
      </PageHeader>

      {/* Story */}
      <section className="section" id="story" aria-labelledby="story-title">
        <div className="container split split--rev">
          <div className="reveal">
            <p className="eyebrow">{en ? 'Our Story' : 'हमारी कहानी'}</p>
            <h2 id="story-title" className="h-xl">{ABOUT.title[lang]}</h2>
            <p className="lead">{ABOUT.body[lang]}</p>
            <blockquote className="quote">{ABOUT.quote[lang]}</blockquote>
            <ul className="about-points">
              {ABOUT.points.map(p => (
                <li key={p.en}><Icon name="check" /> <span>{p[lang]}</span></li>
              ))}
            </ul>
          </div>
          <div className="reveal reveal-d1" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 16, alignItems: 'end' }}>
            <div className="media" style={{ aspectRatio: '3 / 4' }}>
              <Photo k="culture" lang={lang} sizes="(max-width: 900px) 55vw, 28vw" />
            </div>
            <div className="media" style={{ aspectRatio: '3 / 4', marginBottom: '18%' }}>
              <Photo k="heritage" lang={lang} sizes="(max-width: 900px) 45vw, 22vw" />
            </div>
          </div>
        </div>
      </section>

      <VisionMission lang={lang} values={values} />
      <Trustees lang={lang} team={team} />
      <Transparency lang={lang} go={go} pageEnabled={pageEnabled} />
      <CtaBand lang={lang} go={go} pageEnabled={pageEnabled} joinId={donateCta?.targetId || 'involved'} />
    </>
  );
}
