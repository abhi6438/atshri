/**
 * Exports everything under src/data/* into one JSON file for the Python backend seed.
 * Run: node scripts/dump-static-for-db.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const feRoot = join(__dirname, '..');
const outDir = join(feRoot, '..', 'atshri-backend', 'data');
const outFile = join(outDir, 'static_content.json');

const site = JSON.parse(readFileSync(join(feRoot, 'src/data/site.json'), 'utf8'));

const { ACTIVITIES } = await import(new URL('../src/data/activities.js', import.meta.url).href);
const { CATEGORIES } = await import(new URL('../src/data/categories.js', import.meta.url).href);
const { TEAM } = await import(new URL('../src/data/team.js', import.meta.url).href);
const { STATS } = await import(new URL('../src/data/stats.js', import.meta.url).href);
const { VALUES } = await import(new URL('../src/data/values.js', import.meta.url).href);

const snapshot = {
  menu: site.menu,
  donateCta: site.donateCta,
  categories: CATEGORIES,
  activities: ACTIVITIES,
  team: TEAM,
  stats: STATS,
  values: VALUES,
};

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(`Wrote ${outFile}`);
