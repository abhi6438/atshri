# Atshri Website

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
- Data-driven content using local source files in `src/data`.

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
- Reverted experimental pathname routing changes to keep current stable hash-based navigation.

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

- `src/App.jsx` - app state, page switching, language/theme integration
- `src/pages/` - page-level UI
- `src/components/` - reusable UI (layout, logo, cards, controls)
- `src/admin/AdminDash.jsx` - admin tools for content management
- `src/data/` - source content (menu, activities, team, stats, values, categories)
- `src/utils/navigation.js` - route helpers (hash parsing and page resolution)

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
