-- PostgreSQL / Supabase: add menu flags (matches SQLAlchemy MenuItem model).
-- Run once after deploying model changes. Then re-seed or sync from admin.

ALTER TABLE menu_items
  ADD COLUMN IF NOT EXISTS page_enabled boolean NOT NULL DEFAULT true;

ALTER TABLE menu_items
  ADD COLUMN IF NOT EXISTS show_in_nav boolean NOT NULL DEFAULT true;

UPDATE menu_items
SET
  page_enabled = COALESCE(page_enabled, visible),
  show_in_nav = COALESCE(show_in_nav, visible)
WHERE page_enabled IS DISTINCT FROM visible
   OR show_in_nav IS DISTINCT FROM visible;
