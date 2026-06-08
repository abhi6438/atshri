# atshri — CLAUDE.md

## Project overview
Personal/organization website for **atshri** — a React SPA with an admin panel. No backend; all data lives in static JS/JSON files under `src/data/`. Content is managed via the in-app admin dashboard.

## Stack
- **React 18** + **React Router DOM v7** (hash-based routing)
- **Vite 6** — dev server, build, bundling
- **ESLint 9** — linting (`npm run lint`)
- No TypeScript, no CSS framework, no state library

## Commands
```bash
npm run dev       # start dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview production build
npm run lint      # lint src/**/*.{js,jsx}
```

## Project layout
```
src/
  App.jsx              # root component — routing, theme, state
  main.jsx             # React entry point
  data/                # ALL site content (static, no API)
    activities.js
    categories.js
    team.js
    stats.js
    values.js
    site.json          # menu config, donateCta
    index.js           # re-exports everything
  pages/               # page-level components (PageHome, PageAbout, etc.)
    Home.jsx, About.jsx, Activities.jsx, Gallery.jsx
    Involved.jsx, Contact.jsx, AccessDenied.jsx
  components/
    layout/Nav.jsx      # top nav, mobile menu, theme toggle
    layout/Footer.jsx
    common/             # Chip, Divider, Empty, Logo, Toggle
    ActCard.jsx         # activity card used on Activities page
  admin/
    AdminLogin.jsx      # password gate (VITE_ADMIN_PASS)
    AdminDash.jsx       # full content editor (no persistence — in-memory only)
  utils/
    navigation.js       # route helpers: parsePathPage, pathForPage, isRouteEnabled
    catOf.js            # category lookup helper
  styles/
    global.css          # CSS variables (light/dark theme via data-theme attr)
  hooks/
    useScrolled.js      # scroll position hook used by Nav
index.html              # entry HTML — includes Google Ads script
vite.config.js          # vendor chunk split (react + react-dom)
```

## Routing
Routes are hash-based (BrowserRouter with URL path segments). `navigation.js` maps page IDs (`home`, `about`, `activities`, `gallery`, `involved`, `contact`, `admin`) to URL paths. Route availability is controlled by `menu[].enabled` flag in `site.json`.

## Theme
Light/dark toggled via `data-theme` attribute on `<html>`. CSS variables defined in `src/styles/global.css`. Theme persisted to `localStorage` under key `atshri.theme`.

## Admin panel
- Protected by password (`VITE_ADMIN_PASS` env var, default `atshri@2024`)
- Edits are **in-memory only** — changes are lost on page refresh
- Route: `/admin`

## Environment variables
Copy `.env.example` → `.env`:
```
VITE_ADMIN_PASS=           # admin panel password
VITE_CLOUDINARY_CLOUD_NAME= # for photo uploads (Gallery)
```

## Data patterns
- All content arrays (activities, team, stats, etc.) follow `{ id, visible, ... }` shape
- Activities also carry `youtube: ''` for a YouTube video URL (empty = no video shown)
- `visible: false` hides items from public views without deleting them
- `src/data/index.js` is the single import point for all data

## Key conventions
- Components use named exports (`export function PageHome`)
- Shared props passed down from `App.jsx` as a `shared` object spread
- No CSS modules — styles are inline or global CSS variables
- `structuredClone` used to avoid mutating static data defaults
