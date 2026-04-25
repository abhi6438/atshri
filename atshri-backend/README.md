# Atshri Backend (FastAPI)

## Quick Start

```bash
cd atshri-backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

Default **SQLite** is always `atshri-backend/atshri.db` (not “whatever `./atshri.db` means for your shell cwd”), so `python seed.py` and the API see the same file. Restart `uvicorn` after changing `database.py` or `.env`.

- API docs: `http://localhost:8000/docs`
- Health: `GET http://localhost:8000/`

## Seed full site content (from frontend `src/data`)

1. Regenerate the JSON snapshot (committed as `data/static_content.json`):

```bash
cd ../atshri-frontend
npm run dump:static
```

2. Apply DB rows:

```bash
cd ../atshri-backend
# Local SQLite: remove DB if an older schema exists (new menu columns, etc.)
rm -f atshri.db
python seed.py
```

**Supabase:** set `DATABASE_URL` in `.env`, run `sql/001_menu_items_nav_flags.sql` once on an existing DB if upgrading, then `python seed.py`.

## Main Endpoints

- Public:
  - `GET /content`
  - `POST /contact`
  - `POST /volunteer`
- Auth:
  - `POST /auth/login`
- Admin:
  - `/admin/contacts`, `/admin/volunteers`
  - `/admin/activities`
  - `/admin/categories`
  - `/admin/menu`
  - `/admin/team`
  - `/admin/stats`
  - `/admin/values`
