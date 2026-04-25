const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return null;
}

export const mapActivityFromApi = a => ({
  id: a.id,
  icon: a.icon,
  category: a.category,
  heading: { en: a.heading_en, hi: a.heading_hi },
  date: typeof a.date === 'string' ? a.date.slice(0, 10) : String(a.date || '').slice(0, 10),
  text: { en: a.text_en, hi: a.text_hi },
  image: a.image || '',
  visible: a.visible,
  featured: a.featured,
  upcoming: a.upcoming,
});

const toCategory = c => ({
  id: c.id,
  icon: c.icon,
  name: { en: c.name_en, hi: c.name_hi },
  color: c.color,
  visible: c.visible,
});

const toMenu = m => {
  const enabled = m.page_enabled ?? m.visible;
  const inNav = m.show_in_nav ?? m.visible;
  return {
    id: m.id,
    icon: m.icon,
    label: { en: m.label_en, hi: m.label_hi },
    enabled: enabled !== false,
    showInNav: inNav !== false,
  };
};

const toTeam = t => ({
  id: t.id,
  name: t.name,
  initials: t.initials,
  role: { en: t.role_en, hi: t.role_hi },
  badge: t.badge,
  desc: { en: t.desc_en, hi: t.desc_hi },
  visible: t.visible,
});

const toStat = s => ({
  id: s.id,
  icon: s.icon,
  value: s.value,
  label: { en: s.label_en, hi: s.label_hi },
  visible: s.visible,
});

const toValue = v => ({
  id: v.id,
  icon: v.icon,
  title: { en: v.title_en, hi: v.title_hi },
  desc: { en: v.desc_en, hi: v.desc_hi },
  visible: v.visible,
});

export async function fetchContent() {
  const data = await request('/content');
  return {
    activities: (data.activities || []).map(mapActivityFromApi),
    categories: (data.categories || []).map(toCategory),
    menu: (data.menu || []).map(toMenu),
    team: (data.team || []).map(toTeam),
    stats: (data.stats || []).map(toStat),
    values: (data.values || []).map(toValue),
  };
}

export function loginAdmin(username, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function submitContact({ name, email, message }) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
  });
}

export function submitVolunteer({ name, email, phone, message }) {
  return request('/volunteer', {
    method: 'POST',
    body: JSON.stringify({ name, email, phone, message }),
  });
}

/** Bulk replace (destructive). Prefer granular admin* helpers from the dashboard. */
export function syncAdminContent(content, token) {
  return request('/admin/content/sync', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(content),
  });
}

async function adminRequest(path, token, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    ...options,
  });
  if (res.status === 204) return null;
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Admin request failed: ${res.status}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return null;
}

function isoDate(d) {
  const s = typeof d === 'string' ? d : String(d || '');
  return s.slice(0, 10) || new Date().toISOString().slice(0, 10);
}

export function adminCreateActivity(token, front, sortOrder = 0) {
  const body = {
    icon: front.icon || '🎯',
    category: front.category || '',
    heading_en: front.heading?.en ?? '',
    heading_hi: front.heading?.hi ?? '',
    date: isoDate(front.date),
    text_en: front.text?.en ?? '',
    text_hi: front.text?.hi ?? '',
    image: front.image || '',
    visible: !!front.visible,
    featured: !!front.featured,
    upcoming: !!front.upcoming,
    sort_order: sortOrder,
  };
  return adminRequest('/admin/activities', token, { method: 'POST', body: JSON.stringify(body) }).then(mapActivityFromApi);
}

export function adminUpdateActivity(token, id, patch) {
  return adminRequest(`/admin/activities/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(patch),
  }).then(mapActivityFromApi);
}

export function adminDeleteActivity(token, id) {
  return adminRequest(`/admin/activities/${id}`, token, { method: 'DELETE' });
}

export function adminUpdateCategory(token, id, patch) {
  return adminRequest(`/admin/categories/${encodeURIComponent(id)}`, token, {
    method: 'PUT',
    body: JSON.stringify(patch),
  }).then(toCategory);
}

export function adminUpdateMenu(token, id, patch) {
  return adminRequest(`/admin/menu/${encodeURIComponent(id)}`, token, {
    method: 'PUT',
    body: JSON.stringify(patch),
  }).then(toMenu);
}

export function adminCreateTeamMember(token, body) {
  return adminRequest('/admin/team', token, { method: 'POST', body: JSON.stringify(body) }).then(toTeam);
}

export function adminUpdateTeamMember(token, id, patch) {
  return adminRequest(`/admin/team/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(patch),
  }).then(toTeam);
}

export function adminDeleteTeamMember(token, id) {
  return adminRequest(`/admin/team/${id}`, token, { method: 'DELETE' });
}

export function adminCreateStat(token, body) {
  return adminRequest('/admin/stats', token, { method: 'POST', body: JSON.stringify(body) }).then(toStat);
}

export function adminUpdateStat(token, id, patch) {
  return adminRequest(`/admin/stats/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(patch),
  }).then(toStat);
}

export function adminDeleteStat(token, id) {
  return adminRequest(`/admin/stats/${id}`, token, { method: 'DELETE' });
}
