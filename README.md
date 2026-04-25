# Atshri Website

This repository is now split into two app folders:

- `atshri-frontend` - React + Vite web app
- `atshri-backend` - FastAPI + SQLAlchemy API

Atshri is a bilingual (English/Hindi) community trust website built with React and Vite.
It showcases seva activities, upcoming events, team information, gallery, and contact details,
with an internal admin dashboard for content updates.

## About the Website

- **Purpose:** Present Atshri's mission: Seva, Samaj, and Shakti.
- **Languages:** English and Hindi toggle across navigation and page content.
- **Audience:** Community members, volunteers, and supporters.
- **Theme:** Light and dark mode with saved user preference.

## Core Features

- Home page with hero, stats, featured seva, and upcoming events.
- Pages: Home, About, Activities, Gallery, Get Involved, Contact.
- Dynamic menu visibility and page enable/disable controls.
- Admin login and admin dashboard for managing website data.
- Data-driven content: **bundled** in `atshri-frontend/src/data/` and optionally **mirrored** in the FastAPI database.

## Admin Dashboard Capabilities

- Manage activities (add, remove, visibility, featured, upcoming).
- Manage categories and menu items.
- Manage team members and stats.
- Edit with safer controls (Edit / Save / Cancel flow for team and stats).
- Export current content as JSON.
- Optional Cloudinary upload support via `VITE_CLOUDINARY_CLOUD_NAME`.

## What We Have Done (Recent Work)

- Added and refined **upcoming events** support in the home flow.
- Standardized activities to a single source list with `featured` and `upcoming` flags.
- Updated blanket activity entry as a future winter upcoming event.
- Enhanced admin panel to support team and stats management with safer edit UX.
- Added dark/light theme toggle in navigation (desktop + mobile) with persisted preference.
- Introduced theme CSS variables for better light/dark consistency.
- Improved logo color contrast in dark mode (`--logo-at`, `--logo-shri`, etc.).
- Updated logo and slogan behavior for Hindi mode:
  - Logo name supports Hindi form.
  - Tagline/slogan reflects selected language where applied.
- Improved mobile home stats layout with better responsive grid behavior.

## Static data vs database

- **Default:** the site reads from `atshri-frontend/src/data/*` (`VITE_USE_API_CONTENT` unset or `false`).
- **Optional:** set `VITE_USE_API_CONTENT=true` in `atshri-frontend/.env` to load public content from `GET /content` after you have seeded the backend.

Export everything under `src/data` into one JSON file for the backend:

```bash
cd atshri-frontend
npm run dump:static
```

Load that JSON into SQLite / Postgres:

```bash
cd atshri-backend
rm -f atshri.db   # only if local SQLite schema changed
python seed.py
```

PostgreSQL schema tweak for menu columns: `atshri-backend/sql/001_menu_items_nav_flags.sql`

## Routing Note

This project now uses **React Router with browser history** (path routing), e.g.:

- `/`
- `/about`
- `/activities`
- `/gallery`
- `/involved`
- `/contact`
- `/admin`

For production deployments, configure your hosting to rewrite unknown paths to `index.html`
so refresh/direct open of deep links works correctly.

## Tech Stack

- React 18
- Vite 6
- Plain CSS (`src/styles/global.css`)
- ESLint for code quality

## Project Structure (High Level)

- `atshri-frontend/src/App.jsx` - app state, page switching, language/theme integration
- `atshri-frontend/src/pages/` - page-level UI
- `atshri-frontend/src/components/` - reusable UI (layout, logo, cards, controls)
- `atshri-frontend/src/admin/AdminDash.jsx` - admin tools for content management
- `atshri-frontend/src/data/` - source content (menu, activities, team, stats, values, categories)
- `atshri-frontend/src/utils/navigation.js` - route helpers
- `atshri-backend/main.py` - FastAPI app entrypoint
- `atshri-backend/routers/` - public/admin API routes

## Run Locally

```bash
cd atshri-frontend
npm install
npm run dev
```

## Build

```bash
cd atshri-frontend
npm run build
npm run preview
```
