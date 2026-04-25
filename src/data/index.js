export { default as SITE_DEFAULT } from './site.json';
export { CATEGORIES } from './categories';
export { ACTIVITIES } from './activities';
export { TEAM } from './team';
export { STATS } from './stats';
export { VALUES } from './values';

import SITE_DEFAULT from './site.json';

/** Initial menu snapshot (App clones into state). */
export const MENU = structuredClone(SITE_DEFAULT.menu);
