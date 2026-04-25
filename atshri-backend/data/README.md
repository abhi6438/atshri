# `static_content.json`

This file is the **single export** of everything under `atshri-frontend/src/data/`
(menu, categories, activities, team, stats, values, donate CTA metadata).

Regenerate after editing frontend data:

```bash
cd atshri-frontend
npm run dump:static
```

Then load into the database:

```bash
cd ../atshri-backend
# If you use local SQLite and changed table shape, remove the old file first:
rm -f atshri.db
python seed.py
```

For **Supabase (PostgreSQL)**, apply `sql/001_menu_items_nav_flags.sql` once if upgrading an existing database, then run `python seed.py` against your `DATABASE_URL`.

### Shareable SQL (no Python on the machine)

After `static_content.json` is current (run `npm run dump:static` in `atshri-frontend`, or use the committed file), generate a single Postgres script:

```bash
cd atshri-backend
python scripts/generate_seed_sql.py
```

That writes **`sql/seed_full_public_content.sql`**: `TRUNCATE` of public content tables (not contacts/volunteers), then `INSERT`s for menu, categories, activities, team, stats, and values. Anyone can run it in **psql**, **Supabase → SQL Editor**, or another Postgres client against a database that already has the app schema (`create_all` / migrations). Then point the frontend at the API with `VITE_USE_API_CONTENT=true` so the UI reads from `GET /content`.
