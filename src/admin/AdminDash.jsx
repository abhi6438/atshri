import { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { Toggle } from '../components/common/Toggle';
import { catOf } from '../utils/catOf';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';

const TABS = [
  { id: 'activities', label: '📋 Activities' },
  { id: 'add',        label: '➕ Add Activity' },
  { id: 'menu',       label: '☰ Menu' },
  { id: 'categories', label: '🏷️ Categories' },
  { id: 'team',       label: '👥 Team' },
  { id: 'stats',      label: '📊 Stats' },
  { id: 'export',     label: '📤 Export JSON' },
];

const DEFAULT_FORM = {
  icon: '🎯', category: 'water',
  heading_en: '', heading_hi: '',
  date: new Date().toISOString().split('T')[0],
  text_en: '', text_hi: '',
  image: '', visible: true, featured: false, upcoming: false,
};

const DEFAULT_TEAM_FORM = {
  name: '',
  initials: '',
  badge: '🌟',
  role_en: '',
  role_hi: '',
  desc_en: '',
  desc_hi: '',
  visible: true,
};

const DEFAULT_STAT_FORM = {
  icon: '📌',
  value: '0+',
  label_en: '',
  label_hi: '',
  visible: true,
};

export function AdminDash({
  lang,
  menu,
  setMenu,
  donateCta,
  setDonateCta,
  cats,
  setCats,
  acts,
  setActs,
  team,
  setTeam,
  stats,
  setStats,
  values,
  setValues,
  setAdmin,
}) {
  const [tab,    setTab]   = useState('activities');
  const [cloud,  setCloud] = useState(CLOUD_NAME);
  const [upl,    setUpl]   = useState(false);
  const [saved,  setSaved] = useState(false);
  const [form,   setForm]  = useState(DEFAULT_FORM);
  const [teamForm, setTeamForm] = useState(DEFAULT_TEAM_FORM);
  const [teamSaved, setTeamSaved] = useState(false);
  const [statForm, setStatForm] = useState(DEFAULT_STAT_FORM);
  const [statSaved, setStatSaved] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [teamEditDraft, setTeamEditDraft] = useState(null);
  const [editingStatId, setEditingStatId] = useState(null);
  const [statEditDraft, setStatEditDraft] = useState(null);

  const toggle = (arr, setArr, id) =>
    setArr(arr.map(x => x.id === id ? { ...x, visible: !x.visible } : x));

  const toggleActField = (id, key) =>
    setActs(arr => arr.map(x => (x.id === id ? { ...x, [key]: !x[key] } : x)));

  const toggleMenuField = (id, field) => {
    setMenu(prev =>
      prev.map(x => {
        if (x.id !== id) return x;
        const cur = x[field];
        const on = cur === undefined ? true : cur;
        return { ...x, [field]: !on };
      }),
    );
  };

  const updateForm = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  const addAct = e => {
    e.preventDefault();
    const newActivity = {
      id: Date.now(),
      icon: form.icon,
      category: form.category,
      heading: { en: form.heading_en, hi: form.heading_hi },
      date: form.date,
      text: { en: form.text_en, hi: form.text_hi },
      image: form.image,
      visible: form.visible,
      featured: form.featured,
      upcoming: form.upcoming,
    };
    setActs(prev => [newActivity, ...prev]);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setForm({ ...DEFAULT_FORM, date: new Date().toISOString().split('T')[0] });
  };

  const delAct = id => {
    if (window.confirm('Delete this activity?')) {
      setActs(prev => prev.filter(a => a.id !== id));
    }
  };

  const updateTeamForm = field => e => setTeamForm(f => ({ ...f, [field]: e.target.value }));

  const addTeamMember = e => {
    e.preventDefault();
    if (!teamForm.name.trim()) return;
    const initials =
      (teamForm.initials || teamForm.name.replace(/\s+/g, '').slice(0, 3))
        .toUpperCase()
        .slice(0, 6);
    setTeam(prev => [
      {
        id: Date.now(),
        name: teamForm.name.trim(),
        initials,
        role: { en: teamForm.role_en.trim(), hi: teamForm.role_hi.trim() },
        badge: teamForm.badge.trim() || '⭐',
        desc: { en: teamForm.desc_en.trim(), hi: teamForm.desc_hi.trim() },
        visible: teamForm.visible,
      },
      ...prev,
    ]);
    setTeamForm({ ...DEFAULT_TEAM_FORM });
    setTeamSaved(true);
    setTimeout(() => setTeamSaved(false), 2500);
  };

  const startEditTeam = m => {
    if (teamEditDraft && editingTeamId !== m.id) {
      if (!window.confirm('Discard unsaved changes for the member you were editing?')) return;
    }
    setEditingTeamId(m.id);
    setTeamEditDraft({
      name: m.name,
      initials: m.initials,
      badge: m.badge,
      role_en: m.role.en,
      role_hi: m.role.hi,
      desc_en: m.desc.en,
      desc_hi: m.desc.hi,
      visible: m.visible,
    });
  };

  const cancelTeamEdit = () => {
    setEditingTeamId(null);
    setTeamEditDraft(null);
  };

  const saveTeamEdit = e => {
    e?.preventDefault();
    if (editingTeamId == null || !teamEditDraft) return;
    const initials = (teamEditDraft.initials || teamEditDraft.name.replace(/\s+/g, '').slice(0, 3))
      .toUpperCase()
      .slice(0, 6);
    setTeam(prev =>
      prev.map(x =>
        x.id !== editingTeamId
          ? x
          : {
              ...x,
              name: teamEditDraft.name.trim(),
              initials,
              badge: teamEditDraft.badge.trim() || '⭐',
              role: { en: teamEditDraft.role_en.trim(), hi: teamEditDraft.role_hi.trim() },
              desc: { en: teamEditDraft.desc_en.trim(), hi: teamEditDraft.desc_hi.trim() },
              visible: teamEditDraft.visible,
            },
      ),
    );
    cancelTeamEdit();
  };

  const updateTeamEditDraft = field => e =>
    setTeamEditDraft(d => (d ? { ...d, [field]: e.target.value } : d));

  const delTeamMember = id => {
    if (window.confirm('Remove this team member?')) {
      if (editingTeamId === id) cancelTeamEdit();
      setTeam(prev => prev.filter(t => t.id !== id));
    }
  };

  const updateStatForm = field => e => setStatForm(f => ({ ...f, [field]: e.target.value }));

  const addStatRow = e => {
    e.preventDefault();
    if (!statForm.label_en.trim() && !statForm.label_hi.trim()) return;
    setStats(prev => [
      {
        id: Date.now(),
        icon: statForm.icon.trim() || '📌',
        value: (statForm.value || '0').trim(),
        label: { en: statForm.label_en.trim(), hi: statForm.label_hi.trim() },
        visible: statForm.visible,
      },
      ...prev,
    ]);
    setStatForm({ ...DEFAULT_STAT_FORM });
    setStatSaved(true);
    setTimeout(() => setStatSaved(false), 2500);
  };

  const startEditStat = s => {
    if (statEditDraft && editingStatId !== s.id) {
      if (!window.confirm('Discard unsaved changes for the stat you were editing?')) return;
    }
    setEditingStatId(s.id);
    setStatEditDraft({
      icon: s.icon,
      value: s.value,
      label_en: s.label.en,
      label_hi: s.label.hi,
      visible: s.visible,
    });
  };

  const cancelStatEdit = () => {
    setEditingStatId(null);
    setStatEditDraft(null);
  };

  const saveStatEdit = e => {
    e?.preventDefault();
    if (editingStatId == null || !statEditDraft) return;
    setStats(prev =>
      prev.map(x =>
        x.id !== editingStatId
          ? x
          : {
              ...x,
              icon: statEditDraft.icon.trim() || '📌',
              value: statEditDraft.value.trim(),
              label: { en: statEditDraft.label_en.trim(), hi: statEditDraft.label_hi.trim() },
              visible: statEditDraft.visible,
            },
      ),
    );
    cancelStatEdit();
  };

  const updateStatEditDraft = field => e =>
    setStatEditDraft(d => (d ? { ...d, [field]: e.target.value } : d));

  const delStatRow = id => {
    if (window.confirm('Remove this stat from the homepage?')) {
      if (editingStatId === id) cancelStatEdit();
      setStats(prev => prev.filter(s => s.id !== id));
    }
  };

  const upload = async e => {
    const file = e.target.files[0];
    if (!file || !cloud) return;
    setUpl(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'atshri_uploads');
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.secure_url) {
        setForm(f => ({ ...f, image: data.secure_url }));
      } else {
        alert('Upload error: ' + (data.error?.message || 'Unknown'));
      }
    } catch {
      alert('Upload failed. Check Cloud Name and preset.');
    }
    setUpl(false);
  };

  const tabStyle = id => ({
    padding: '9px 16px', borderRadius: 9, fontFamily: 'inherit', fontWeight: 700,
    fontSize: 13, cursor: 'pointer',
    background: tab === id ? 'var(--sf)' : 'var(--surface)',
    color: tab === id ? '#fff' : 'var(--tx)',
    border: `1.5px solid ${tab === id ? 'var(--sf)' : 'var(--bd)'}`,
  });

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--sfp)' }}>

      {/* Top bar */}
      <div style={{ background: 'linear-gradient(135deg,#F4831F,#C96500)', padding: '18px 20px' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Logo size={38} />
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>Admin Dashboard</div>
              <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 12 }}>
                {acts.length} activities · {acts.filter(a => a.visible).length} visible · {acts.filter(a => a.featured).length} featured · {acts.filter(a => a.upcoming).length} upcoming · {acts.filter(a => a.image).length} with photos
              </div>
            </div>
          </div>
          <button
            onClick={() => setAdmin(false)}
            style={{ background: 'rgba(255,255,255,.18)', border: '1.5px solid rgba(255,255,255,.4)', color: '#fff', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="wrap" style={{ padding: '24px 20px' }}>

        {/* Cloudinary config */}
        <div style={{ background: '#FFFBE6', border: '1.5px solid #F4C43060', borderRadius: 13, padding: 18, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 5, color: '#92400E' }}>☁️ Cloudinary Setup (for photo uploads)</h3>
          <p style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 9 }}>
            Enter your Cloud Name and create an unsigned upload preset named <strong>atshri_uploads</strong>.
            You can also set <code>VITE_CLOUDINARY_CLOUD_NAME</code> in your <code>.env</code> file.
          </p>
          <input value={cloud} onChange={e => setCloud(e.target.value)} placeholder="Your Cloudinary Cloud Name" style={{ maxWidth: 300 }} />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
          {TABS.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={tabStyle(t.id)}>{t.label}</button>)}
        </div>

        {/* ── ACTIVITIES TAB ── */}
        {tab === 'activities' && (
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 18 }}>
              📋 All Activities{' '}
              <span style={{ fontSize: 14, color: 'var(--mid)', fontWeight: 500 }}>— toggle to show/hide on public site</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {acts.map(a => {
                const c = catOf(cats, a.category);
                return (
                  <div
                    key={a.id}
                    className="card"
                    style={{ padding: 15, display: 'flex', gap: 13, alignItems: 'center', flexWrap: 'wrap', opacity: a.visible ? 1 : 0.55 }}
                  >
                    <div style={{
                      width: 52, height: 52, flexShrink: 0, borderRadius: 10,
                      background: a.image ? `url(${a.image}) center/cover` : `${c.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                    }}>
                      {!a.image && a.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{a.heading.en}</div>
                      <div style={{ fontWeight: 600, color: 'var(--mid)', fontSize: 13 }}>{a.heading.hi}</div>
                      <div style={{ display: 'flex', gap: 7, marginTop: 5, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, background: `${c.color}20`, color: c.color, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>{c.name.en}</span>
                        <span style={{ fontSize: 11, color: 'var(--mid)' }}>📅 {a.date}</span>
                        {a.image    && <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 700 }}>📸 Photo</span>}
                        {a.featured && <span style={{ fontSize: 11, color: 'var(--sf)', fontWeight: 700 }}>⭐ Featured</span>}
                        {a.upcoming && <span style={{ fontSize: 11, color: '#C2410C', fontWeight: 700 }}>📅 Upcoming</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: 'var(--mid)', fontWeight: 600 }}>{a.visible ? 'Visible' : 'Hidden'}</span>
                      <Toggle on={a.visible} onChange={() => toggle(acts, setActs, a.id)} />
                      <span style={{ fontSize: 11, color: 'var(--mid)', fontWeight: 600 }}>⭐</span>
                      <Toggle on={!!a.featured} onChange={() => toggleActField(a.id, 'featured')} />
                      <span style={{ fontSize: 11, color: 'var(--mid)', fontWeight: 600 }}>📅</span>
                      <Toggle on={!!a.upcoming} onChange={() => toggleActField(a.id, 'upcoming')} />
                      <button
                        onClick={() => delAct(a.id)}
                        style={{ background: '#FEE2E2', border: 'none', color: '#EF4444', padding: '7px 13px', borderRadius: 7, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 12 }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ADD ACTIVITY TAB ── */}
        {tab === 'add' && (
          <div className="card" style={{ padding: 30 }}>
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 20 }}>➕ Add New Activity</h2>
            {saved && (
              <div style={{ background: '#DCFCE7', border: '1.5px solid #4ADE80', borderRadius: 9, padding: '11px 15px', marginBottom: 16, color: '#166534', fontWeight: 600 }}>
                ✅ Activity added successfully!
              </div>
            )}
            <form onSubmit={addAct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 13 }}>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Icon (emoji)</label>
                <input value={form.icon} onChange={updateForm('icon')} placeholder="e.g. 💧" style={{ fontSize: 22 }} />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Category</label>
                <select value={form.category} onChange={updateForm('category')}>
                  {cats.map(c => (
                    <option key={c.id} value={c.id}>{c.icon} {c.name.en} / {c.name.hi}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Heading (English) *</label>
                <input value={form.heading_en} onChange={updateForm('heading_en')} placeholder="e.g. Summer Water Distribution" required />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>शीर्षक (हिन्दी) *</label>
                <input value={form.heading_hi} onChange={updateForm('heading_hi')} placeholder="जैसे: ग्रीष्म जल वितरण" required />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Date</label>
                <input type="date" value={form.date} onChange={updateForm('date')} />
              </div>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', paddingTop: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Toggle on={form.visible} onChange={() => setForm(f => ({ ...f, visible: !f.visible }))} />
                  <span style={{ fontWeight: 600, fontSize: 13 }}>Visible</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Toggle on={form.featured} onChange={() => setForm(f => ({ ...f, featured: !f.featured }))} />
                  <span style={{ fontWeight: 600, fontSize: 13 }}>⭐ Featured</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Toggle on={form.upcoming} onChange={() => setForm(f => ({ ...f, upcoming: !f.upcoming }))} />
                  <span style={{ fontWeight: 600, fontSize: 13 }}>📅 Upcoming</span>
                </div>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Description (English) *</label>
                <textarea rows={3} value={form.text_en} onChange={updateForm('text_en')} placeholder="Describe the activity in English..." required />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>विवरण (हिन्दी) *</label>
                <textarea rows={3} value={form.text_hi} onChange={updateForm('text_hi')} placeholder="हिन्दी में विवरण लिखें..." required />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 8 }}>📸 Photo</label>
                <input type="file" accept="image/*" onChange={upload} disabled={!cloud || upl} style={{ marginBottom: 8 }} />
                {!cloud && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>⚠️ Enter Cloudinary Cloud Name above first</p>}
                {upl    && <p style={{ fontSize: 12, color: 'var(--sf)', marginTop: 4 }}>⏳ Uploading to Cloudinary...</p>}
                {form.image && <img src={form.image} alt="preview" style={{ marginTop: 8, height: 110, borderRadius: 8, objectFit: 'cover', display: 'block' }} />}
                <input value={form.image} onChange={updateForm('image')} placeholder="Or paste image URL here" style={{ marginTop: 8 }} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <button type="submit" className="bsf" style={{ padding: '12px 28px', fontSize: 16 }}>Add Activity 🎯</button>
              </div>
            </form>
          </div>
        )}

        {/* ── MENU TAB ── */}
        {tab === 'menu' && (
          <div className="card" style={{ padding: 28 }}>
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>☰ Site pages & nav</h2>
            <p style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 20 }}>
              <strong>Live</strong> controls the whole site (nav, footer, home buttons, and direct URLs).{' '}
              <strong>Top nav</strong> only hides the bar link; the page can stay open via footer or donate if it stays live.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {menu.map(m => {
                const live = m.enabled !== false;
                const inNav = m.showInNav !== false;
                return (
                  <div
                    key={m.id}
                    style={{
                      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, padding: '14px 18px',
                      background: live ? 'var(--surface)' : 'var(--sfl)',
                      borderRadius: 11, border: `1.5px solid ${live ? 'var(--bd)' : '#E5E7EB'}`,
                    }}
                  >
                    <div style={{ fontSize: 24, width: 36, textAlign: 'center' }}>{m.icon}</div>
                    <div style={{ flex: '1 1 160px' }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>
                        {m.label.en} <span style={{ color: 'var(--mid)', fontWeight: 500 }}>/ {m.label.hi}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 2 }}>
                        Page ID: <code style={{ background: '#F3F4F6', padding: '1px 5px', borderRadius: 4 }}>{m.id}</code>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: live ? 'var(--sf)' : '#9CA3AF', width: 72 }}>Live</span>
                        <Toggle on={live} onChange={() => toggleMenuField(m.id, 'enabled')} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: inNav ? 'var(--sf)' : '#9CA3AF', width: 72 }}>Top nav</span>
                        <Toggle on={inNav} onChange={() => toggleMenuField(m.id, 'showInNav')} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 28, paddingTop: 22, borderTop: '1px solid var(--bd)' }}>
              <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 8 }}>🙏 Donate button (header)</h3>
              <p style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 14 }}>
                Uses labels from <code>site.json → donateCta</code>. It only appears if this switch is on and the target page is live.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Show donate CTA</span>
                <Toggle
                  on={donateCta.show !== false}
                  onChange={() => setDonateCta(d => ({ ...d, show: !(d.show !== false) }))}
                />
                <label style={{ fontSize: 13, fontWeight: 600, marginLeft: 12 }}>
                  Target page ID{' '}
                  <select
                    value={donateCta.targetId}
                    onChange={e => setDonateCta(d => ({ ...d, targetId: e.target.value }))}
                    style={{ marginLeft: 6, padding: '6px 10px', borderRadius: 8, border: '1.5px solid var(--bd)', fontFamily: 'inherit' }}
                  >
                    {menu.map(m => (
                      <option key={m.id} value={m.id}>{m.id}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ── CATEGORIES TAB ── */}
        {tab === 'categories' && (
          <div className="card" style={{ padding: 28 }}>
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>🏷️ Activity Categories</h2>
            <p style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 20 }}>Hidden categories won't appear in filter tabs or on activity cards.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 12 }}>
              {cats.map(c => (
                <div
                  key={c.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 13, padding: '14px 16px',
                    background: c.visible ? 'var(--surface)' : 'var(--sfl)',
                    borderRadius: 11, border: `1.5px solid ${c.visible ? c.color + '44' : '#E5E7EB'}`,
                  }}
                >
                  <div style={{ width: 40, height: 40, background: `${c.color}18`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: c.color }}>{c.name.en}</div>
                    <div style={{ fontSize: 13, color: 'var(--mid)' }}>
                      {c.name.hi} · <code style={{ fontSize: 11, background: '#F3F4F6', padding: '1px 5px', borderRadius: 4 }}>{c.id}</code>
                    </div>
                  </div>
                  <Toggle on={c.visible} onChange={() => toggle(cats, setCats, c.id)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TEAM TAB ── */}
        {tab === 'team' && (
          <div>
            <div className="card" style={{ padding: 28, marginBottom: 20 }}>
              <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>👥 Team Members</h2>
              <p style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>
                Table view — use <strong>Edit</strong> to change details (nothing saves until you click Save). Toggle visibility here without opening edit. Hidden rows do not appear on About.
              </p>
              {teamEditDraft && editingTeamId != null && (
                <form
                  onSubmit={saveTeamEdit}
                  style={{
                    marginBottom: 22,
                    padding: 18,
                    borderRadius: 11,
                    border: '2px solid var(--sf)',
                    background: 'var(--sfp)',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: 'var(--sf)' }}>Editing member #{editingTeamId}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
                    <div style={{ gridColumn: '1/-1' }}>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Full name</label>
                      <input value={teamEditDraft.name} onChange={updateTeamEditDraft('name')} style={{ width: '100%' }} required />
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Initials</label>
                      <input value={teamEditDraft.initials} onChange={updateTeamEditDraft('initials')} style={{ width: '100%' }} />
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Badge</label>
                      <input value={teamEditDraft.badge} onChange={updateTeamEditDraft('badge')} style={{ width: '100%', fontSize: 20 }} />
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Role (EN)</label>
                      <input value={teamEditDraft.role_en} onChange={updateTeamEditDraft('role_en')} style={{ width: '100%' }} />
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Role (HI)</label>
                      <input value={teamEditDraft.role_hi} onChange={updateTeamEditDraft('role_hi')} style={{ width: '100%' }} />
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Bio (EN)</label>
                      <textarea rows={2} value={teamEditDraft.desc_en} onChange={updateTeamEditDraft('desc_en')} style={{ width: '100%' }} />
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Bio (HI)</label>
                      <textarea rows={2} value={teamEditDraft.desc_hi} onChange={updateTeamEditDraft('desc_hi')} style={{ width: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Toggle on={teamEditDraft.visible} onChange={() => setTeamEditDraft(d => (d ? { ...d, visible: !d.visible } : d))} />
                      <span style={{ fontWeight: 600, fontSize: 13 }}>Visible</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                    <button type="submit" className="bsf" style={{ padding: '9px 22px', fontSize: 14 }}>Save changes</button>
                    <button type="button" className="bout" style={{ padding: '9px 22px', fontSize: 14 }} onClick={cancelTeamEdit}>Cancel</button>
                  </div>
                </form>
              )}
              <div style={{ overflowX: 'auto', border: '1.5px solid var(--bd)', borderRadius: 11, background: 'var(--surface)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: 'var(--sfl)' }}>
                      <th style={{ padding: '11px 14px', textAlign: 'left', fontWeight: 700, borderBottom: '1.5px solid var(--bd)' }}> </th>
                      <th style={{ padding: '11px 14px', textAlign: 'left', fontWeight: 700, borderBottom: '1.5px solid var(--bd)' }}>Member</th>
                      <th style={{ padding: '11px 14px', textAlign: 'left', fontWeight: 700, borderBottom: '1.5px solid var(--bd)' }}>Role</th>
                      <th style={{ padding: '11px 14px', textAlign: 'center', fontWeight: 700, borderBottom: '1.5px solid var(--bd)' }}>Visible</th>
                      <th style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, borderBottom: '1.5px solid var(--bd)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.map(m => (
                      <tr key={m.id} style={{ borderBottom: '1px solid var(--bd)', opacity: m.visible ? 1 : 0.65 }}>
                        <td style={{ padding: '12px 14px', verticalAlign: 'middle' }}>
                          <div style={{
                            width: 40, height: 40, background: 'linear-gradient(135deg,#F4831F,#C96500)', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff',
                          }}>
                            {m.initials}
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: 700 }}>{m.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--mid)' }}>{m.badge} · id {m.id}</div>
                        </td>
                        <td style={{ padding: '12px 14px', verticalAlign: 'middle', color: 'var(--mid)', maxWidth: 280 }}>
                          <span style={{ color: 'var(--tx)' }}>{m.role.en}</span>
                          {' · '}
                          <span>{m.role.hi}</span>
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', verticalAlign: 'middle' }}>
                          <Toggle on={m.visible} onChange={() => toggle(team, setTeam, m.id)} />
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <button
                            type="button"
                            className="bout"
                            style={{ padding: '6px 14px', fontSize: 13, marginRight: 8 }}
                            onClick={() => startEditTeam(m)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => delTeamMember(m.id)}
                            style={{ background: '#FEE2E2', border: 'none', color: '#EF4444', padding: '6px 12px', borderRadius: 7, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 12 }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: 14 }}>➕ Add team member</h2>
              {teamSaved && (
                <div style={{ background: '#DCFCE7', border: '1.5px solid #4ADE80', borderRadius: 9, padding: '10px 14px', marginBottom: 14, color: '#166534', fontWeight: 600, fontSize: 14 }}>
                  Member added — use Export JSON to save into <code>team.js</code> if you want it permanent.
                </div>
              )}
              <form onSubmit={addTeamMember} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Full name *</label>
                  <input value={teamForm.name} onChange={updateTeamForm('name')} placeholder="e.g. Priya Sharma" required />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Initials (optional)</label>
                  <input value={teamForm.initials} onChange={updateTeamForm('initials')} placeholder="Auto from name if empty" />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Badge emoji</label>
                  <input value={teamForm.badge} onChange={updateTeamForm('badge')} style={{ fontSize: 20 }} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Role (English)</label>
                  <input value={teamForm.role_en} onChange={updateTeamForm('role_en')} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Role (हिन्दी)</label>
                  <input value={teamForm.role_hi} onChange={updateTeamForm('role_hi')} />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Bio (English)</label>
                  <textarea rows={2} value={teamForm.desc_en} onChange={updateTeamForm('desc_en')} />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Bio (हिन्दी)</label>
                  <textarea rows={2} value={teamForm.desc_hi} onChange={updateTeamForm('desc_hi')} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8 }}>
                  <Toggle on={teamForm.visible} onChange={() => setTeamForm(f => ({ ...f, visible: !f.visible }))} />
                  <span style={{ fontWeight: 600, fontSize: 13 }}>Visible on About</span>
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <button type="submit" className="bsf" style={{ padding: '11px 24px', fontSize: 15 }}>Add member</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── STATS TAB ── */}
        {tab === 'stats' && (
          <div>
            <div className="card" style={{ padding: 28, marginBottom: 20 }}>
              <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>📊 Homepage Stats</h2>
              <p style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>
                Table view — <strong>Edit</strong> opens a form; values update only after <strong>Save changes</strong>. Use the toggle to show/hide on the home hero without editing.
              </p>
              {statEditDraft && editingStatId != null && (
                <form
                  onSubmit={saveStatEdit}
                  style={{
                    marginBottom: 22,
                    padding: 18,
                    borderRadius: 11,
                    border: '2px solid var(--sf)',
                    background: 'var(--sfp)',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: 'var(--sf)' }}>Editing stat #{editingStatId}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Icon</label>
                      <input value={statEditDraft.icon} onChange={updateStatEditDraft('icon')} style={{ width: '100%', fontSize: 22 }} />
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Value</label>
                      <input value={statEditDraft.value} onChange={updateStatEditDraft('value')} style={{ width: '100%', fontWeight: 800 }} />
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Label (English)</label>
                      <input value={statEditDraft.label_en} onChange={updateStatEditDraft('label_en')} style={{ width: '100%' }} required />
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                      <label style={{ fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 4 }}>Label (हिन्दी)</label>
                      <input value={statEditDraft.label_hi} onChange={updateStatEditDraft('label_hi')} style={{ width: '100%' }} required />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Toggle on={statEditDraft.visible} onChange={() => setStatEditDraft(d => (d ? { ...d, visible: !d.visible } : d))} />
                      <span style={{ fontWeight: 600, fontSize: 13 }}>Visible on home</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                    <button type="submit" className="bsf" style={{ padding: '9px 22px', fontSize: 14 }}>Save changes</button>
                    <button type="button" className="bout" style={{ padding: '9px 22px', fontSize: 14 }} onClick={cancelStatEdit}>Cancel</button>
                  </div>
                </form>
              )}
              <div style={{ overflowX: 'auto', border: '1.5px solid var(--bd)', borderRadius: 11, background: 'var(--surface)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: 'var(--sfl)' }}>
                      <th style={{ padding: '11px 14px', textAlign: 'left', fontWeight: 700, borderBottom: '1.5px solid var(--bd)' }}>Icon</th>
                      <th style={{ padding: '11px 14px', textAlign: 'left', fontWeight: 700, borderBottom: '1.5px solid var(--bd)' }}>Value</th>
                      <th style={{ padding: '11px 14px', textAlign: 'left', fontWeight: 700, borderBottom: '1.5px solid var(--bd)' }}>Labels</th>
                      <th style={{ padding: '11px 14px', textAlign: 'center', fontWeight: 700, borderBottom: '1.5px solid var(--bd)' }}>Visible</th>
                      <th style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, borderBottom: '1.5px solid var(--bd)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map(s => (
                      <tr key={s.id} style={{ borderBottom: '1px solid var(--bd)', opacity: s.visible ? 1 : 0.65 }}>
                        <td style={{ padding: '12px 14px', fontSize: 26, verticalAlign: 'middle' }}>{s.icon}</td>
                        <td style={{ padding: '12px 14px', verticalAlign: 'middle', fontWeight: 800, fontSize: 18, color: 'var(--sf)' }}>{s.value}</td>
                        <td style={{ padding: '12px 14px', verticalAlign: 'middle', color: 'var(--mid)', maxWidth: 320 }}>
                          <div style={{ color: 'var(--tx)', fontWeight: 600 }}>{s.label.en}</div>
                          <div style={{ fontSize: 13 }}>{s.label.hi}</div>
                          <div style={{ fontSize: 11, marginTop: 4 }}>id {s.id}</div>
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', verticalAlign: 'middle' }}>
                          <Toggle on={s.visible} onChange={() => toggle(stats, setStats, s.id)} />
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <button
                            type="button"
                            className="bout"
                            style={{ padding: '6px 14px', fontSize: 13, marginRight: 8 }}
                            onClick={() => startEditStat(s)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => delStatRow(s.id)}
                            style={{ background: '#FEE2E2', border: 'none', color: '#EF4444', padding: '6px 12px', borderRadius: 7, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 12 }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: 14 }}>➕ Add homepage stat</h2>
              {statSaved && (
                <div style={{ background: '#DCFCE7', border: '1.5px solid #4ADE80', borderRadius: 9, padding: '10px 14px', marginBottom: 14, color: '#166534', fontWeight: 600, fontSize: 14 }}>
                  Stat added — use Export JSON to save into <code>stats.js</code> if you want it permanent.
                </div>
              )}
              <form onSubmit={addStatRow} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Icon (emoji)</label>
                  <input value={statForm.icon} onChange={updateStatForm('icon')} style={{ fontSize: 20 }} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Value</label>
                  <input value={statForm.value} onChange={updateStatForm('value')} placeholder="e.g. 120+" />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Label (English) *</label>
                  <input value={statForm.label_en} onChange={updateStatForm('label_en')} required />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>Label (हिन्दी) *</label>
                  <input value={statForm.label_hi} onChange={updateStatForm('label_hi')} required />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8 }}>
                  <Toggle on={statForm.visible} onChange={() => setStatForm(f => ({ ...f, visible: !f.visible }))} />
                  <span style={{ fontWeight: 600, fontSize: 13 }}>Visible on home</span>
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <button type="submit" className="bsf" style={{ padding: '11px 24px', fontSize: 15 }}>Add stat</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── EXPORT JSON TAB ── */}
        {tab === 'export' && (
          <div className="card" style={{ padding: 28 }}>
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>📤 Export Current JSON</h2>
            <p style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>
              Copy this JSON and paste it into the matching file under <code>src/data/</code> (for routes and the donate button, merge into <code>site.json</code>) to make changes permanent.
            </p>
            {[
              { label: 'site.json → { menu, donateCta }', data: { menu, donateCta } },
              { label: 'categories.js → CATEGORIES', data: cats },
              { label: 'activities.js → ACTIVITIES', data: acts },
              { label: 'team.js → TEAM', data: team },
              { label: 'stats.js → STATS', data: stats },
              { label: 'values.js → VALUES', data: values },
            ].map(({ label, data }) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <code style={{ fontWeight: 700, fontSize: 14, color: 'var(--sf)' }}>{label}</code>
                  <button
                    onClick={() => navigator.clipboard?.writeText(JSON.stringify(data, null, 2))}
                    style={{ padding: '5px 12px', borderRadius: 7, background: 'var(--sfl)', border: '1.5px solid var(--bd)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 12, color: 'var(--sfd)' }}
                  >
                    📋 Copy
                  </button>
                </div>
                <textarea
                  readOnly
                  value={JSON.stringify(data, null, 2)}
                  rows={6}
                  style={{ fontFamily: 'monospace', fontSize: 12, background: '#1C1410', color: '#FCD34D', border: 'none', borderRadius: 9, padding: 14, resize: 'vertical', width: '100%' }}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
