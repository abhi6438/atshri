# atshri — CLAUDE.md

## Project overview
Bilingual (English/Hindi) website for **Atshri** — a community trust in Rewa, MP ("Seva · Samaj · Shakti"). React SPA with a password-gated admin panel. **No backend**: all content lives in static files under `src/data/`. Deployed as static `dist/` (Netlify-style `public/_redirects` SPA fallback).

## Stack
- **React 18** + **React Router DOM v7** — `BrowserRouter`, **path-based** routes (not hash)
- **Vite 6** (`@vitejs/plugin-react`), vendor chunk split for react/react-dom
- Plain CSS design system in `src/styles/global.css` (tokens + component classes); fonts Playfair Display / Inter / Mukta loaded in `index.html`
- No TypeScript, no CSS framework, no state library

## Commands
```bash
npm install
npm run dev       # dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview production build
npm run lint      # ESLint 9 flat config (eslint.config.mjs)
```

## Project layout
```
index.html              # entry HTML, meta/theme-color, TWO Google AdSense scripts
public/_redirects       # "/* /index.html 200" SPA fallback
vite.config.js          # vendor chunk split
src/
  main.jsx              # sets data-theme from localStorage before render; wraps App in BrowserRouter
  App.jsx               # all app state (lang, theme, menu, content arrays, admin), routing, `shared` props
  data/                 # ALL site content (static)
    index.js            # single import point: SITE_DEFAULT, CATEGORIES, ACTIVITIES, TEAM, STATS, VALUES, MENU
    site.json           # menu[], social{} (YouTube/Instagram + posts), donateCta{}
    activities.js  categories.js  team.js  stats.js  values.js
  pages/                # Home, About, Activities, Gallery, Involved, Contact, AccessDenied
  components/
    ActCard.jsx         # activity card
    layout/Nav.jsx      # top nav, mobile menu, EN/HI + theme toggles
    layout/Footer.jsx
    common/             # Chip, Divider, Empty, Logo (Logo/LogoName/LogoFull), Toggle,
                        # SocialFloat (floating social buttons), VideoModal (YouTube player/playlist)
  admin/
    AdminLogin.jsx      # password gate (VITE_ADMIN_PASS, fallback 'atshri@2024')
    AdminDash.jsx       # content editor (~900 lines), tabs incl. Export JSON, Cloudinary upload
  utils/
    navigation.js       # parsePathPage, pathForPage, isRouteEnabled, publicPageIds, resolveInitialPage
    catOf.js            # category lookup with fallback
  hooks/useScrolled.js  # scroll threshold hook (Nav)
  styles/global.css     # CSS variables for light/dark via [data-theme]
```

## Routing
- Paths: `/`, `/about`, `/activities`, `/gallery`, `/involved`, `/contact`, `/admin`, `/access-denied`.
- `parsePathPage(location.pathname)` → page id; `resolveInitialPage` redirects unknown ids → `home`, disabled ids → `access-denied`. `admin` and `access-denied` are always allowed.
- Navigate only through `go(pageId)` from `App.jsx` (closes mobile menu, scrolls to top, enforces enabled checks).
- Page availability = `menu[].enabled` in `site.json`; nav visibility = `menu[].showInNav`. Currently `involved` is disabled and hidden.
- Pages render via `page === 'x' && pageEnabled('x')` conditionals in `App.jsx` (no `<Routes>`). Adding a page = add menu entry in `site.json` + conditional in `App.jsx`.

## i18n
- `lang` state in `App.jsx` (`'en' | 'hi'`), toggled in Nav, **not persisted**.
- Every user-facing text field is `{ en, hi }`; render with `field[lang]`. Always supply both languages.

## Theme
- `data-theme="light|dark"` on `<html>`, dark by default, persisted in `localStorage` key `atshri.theme.v2`.
- `App.jsx` also updates `<meta name="theme-color">` (`#F4831F` light / `#12100e` dark).
- Use CSS variables (`var(--sfp)`, `var(--tx)`, `var(--mid)`, `var(--sf)`, `--logo-*` …) rather than hard-coded colors.

## Admin panel
- Route `/admin`; password from `VITE_ADMIN_PASS` (fallback `atshri@2024` — client-side only, not real security; it ships in the bundle).
- Edits are **in-memory only** — lost on refresh. To publish changes: use **Export JSON** tab, then paste into `src/data/*` and redeploy.
- Image uploads go to Cloudinary (unsigned) using `VITE_CLOUDINARY_CLOUD_NAME` or a name typed into the dashboard.

## Environment variables
Copy `.env.example` → `.env`:
```
VITE_ADMIN_PASS=
VITE_CLOUDINARY_CLOUD_NAME=
```

## Data patterns
- Arrays use `{ id, visible, ... }`; `visible: false` hides from public views without deleting. `App.jsx` filters `acts`/`cats` by `visible` before passing to pages.
- Activity: `{ id, icon, category, heading{en,hi}, date 'YYYY-MM-DD', text{en,hi}, image, visible, featured, upcoming, youtube? }`
  - `category` must match a `CATEGORIES[].id`.
  - `youtube` is an **array** of URLs (Shorts supported); Home/Activities/Gallery do `Array.isArray(a.youtube)`.
  - `featured` → Home featured seva; `upcoming` → Home upcoming events.
- Stats: `value: 'auto'` = computed from activity count; otherwise a display string like `'50+'`.
- Social links/handles/Instagram posts come from `site.json → social` (used by Gallery and SocialFloat).
- State seeded with `structuredClone` of the static defaults — never mutate imports directly.

## Conventions
- Named exports for components (`export function PageHome`); `App` is the only default export.
- Pages receive the `shared` object (`lang, go, acts, cats, team, stats, values, pageEnabled, donateCta`) via spread.
- Styling: inline style objects + global classes (`card`, `bsf`, …). No CSS modules.
- Keep emoji icons consistent with existing data entries.

## Design system (premium redesign, Oct 2026)
- Palette: royal navy (`--brand-700` #24346b, primary; `--brand-800` #18244a dark bands; `--brand-900` #0f1830 footer), antique gold (`--gold-500` #b08d57), warm ivory bg (`--ivory` #faf7f0), muted saffron accent, charcoal text. Dark theme remaps semantic tokens under `[data-theme='dark']`.
- Use **semantic tokens** (`--bg`, `--bg-alt`, `--surface`, `--text`, `--text-muted`, `--border`, `--primary`, `--on-primary`, `--gold`, `--gold-text`, `--deep`). Legacy aliases (`--sf`, `--mid`, `--bd`…) still exist for the admin panel — don't add new usages.
- Typography: headings `var(--font-serif)` (Playfair), body `var(--font-sans)` (Inter); Hindi falls back to Mukta automatically and `html[lang='hi']` switches headings to Mukta. `App.jsx` sets `document.documentElement.lang`.
- Component classes: `.container`, `.section`, `.split`, `.grid grid-2/3`, `.eyebrow`, `.h-xl/.h-lg/.h-md`, `.lead`, `.btn btn-primary|btn-gold|btn-outline|btn-light|btn-ghost-light`, `.link-arrow`, `.card card-hover`, `.chip`, `.badge`, `.tabs/.tab`, `.field`, `.page-header`, `.media`.
- Scroll reveal: add `className="reveal"` (+ `reveal-d1..3`); an IntersectionObserver in `App.jsx` adds `.is-in`. Respects reduced motion.
- Icons: `components/common/Icon.jsx` (line icons). Avoid emoji in UI chrome; category emoji in data are fine.
- Shared sections: `components/sections.jsx` → `Photo`, `VisionMission`, `Trustees`, `Transparency`, `CtaBand`. Inner pages use `components/common/PageHeader.jsx`.
- Editorial copy (vision, mission, focus areas): `src/data/content.js`. Images config: `site.json → images` (files in `public/images/`, **Unsplash placeholders** — see `public/images/CREDITS.md`; replace with real trust photos). Contact details: `site.json → contact`.
- Per-page `<title>`/meta description: `SEO` map in `App.jsx`.

## Known issues / TODO
- Remaining lint warnings are pre-existing (VideoModal hook deps, unused admin props).
- Activities marked `upcoming: true` with dates already past (e.g. Apr–Oct 2026) still show as upcoming — update data.
- `README.md` mentions "hash-based navigation" in one place — routing is path-based (BrowserRouter).
- Some Hindi activity texts say "भोपाल" (Bhopal) while English says Rewa — check content.
- `Contact.jsx` hard-codes `youtube.com/@atshri` instead of reading `site.json → social`.
- `index.html` loads two different AdSense client IDs — confirm which one is correct.
