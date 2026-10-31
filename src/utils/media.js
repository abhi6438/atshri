export function ytId(url) {
  const m = String(url || '').match(/(?:shorts\/|watch\?v=|youtu\.be\/|embed\/)([^?&/]+)/);
  return m ? m[1] : null;
}

export function ytThumb(url, quality = 'hqdefault') {
  const id = ytId(url);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : null;
}

export function fmtDate(dateStr, lang, opts = { month: 'short', year: 'numeric' }) {
  if (!dateStr) return '';
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', opts);
}

export function videosOf(a) {
  return Array.isArray(a?.youtube) ? a.youtube.filter(Boolean) : [];
}

/** Build a playlist [{url,title}] for VideoModal from activities. */
export function buildPlaylist(acts, lang) {
  return acts.flatMap(a => videosOf(a).map(url => ({ url, title: a.heading[lang] })));
}
