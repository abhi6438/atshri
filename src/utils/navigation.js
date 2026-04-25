/** @typedef {{ id: string, enabled?: boolean, showInNav?: boolean }} MenuItem */

const SPECIAL_ALWAYS = new Set(['admin', 'access-denied']);

/**
 * @param {MenuItem[]} menu
 * @param {string} pageId
 */
export function isRouteEnabled(menu, pageId) {
  if (SPECIAL_ALWAYS.has(pageId)) return true;
  const m = menu.find(x => x.id === pageId);
  if (!m) return false;
  return m.enabled !== false;
}

/**
 * @param {MenuItem[]} menu
 */
export function publicPageIds(menu) {
  return new Set(menu.map(m => m.id));
}

/**
 * @param {string} pathname
 */
export function parsePathPage(pathname) {
  const clean = (pathname || '/').trim().toLowerCase();
  if (clean === '/' || clean === '') return 'home';
  const first = clean.replace(/^\/+/, '').split('/')[0];
  return first || 'home';
}

/**
 * @param {string} pageId
 */
export function pathForPage(pageId) {
  if (!pageId || pageId === 'home') return '/';
  return `/${String(pageId).toLowerCase()}`;
}

/**
 * @param {MenuItem[]} menu
 * @param {string} wanted
 */
export function resolveInitialPage(menu, wanted) {
  if (wanted === 'admin') return 'admin';
  if (wanted === 'access-denied') return 'access-denied';
  const ids = publicPageIds(menu);
  if (!ids.has(wanted)) return 'home';
  if (!isRouteEnabled(menu, wanted)) return 'access-denied';
  return wanted;
}
