"""
Generate sql/seed_full_public_content.sql from data/static_content.json.

Run from repo root or atshri-backend:
  cd atshri-backend && python scripts/generate_seed_sql.py

Requires: npm run dump:static (from atshri-frontend) so JSON is up to date.
"""
import json
from pathlib import Path


def sql_str(s: str) -> str:
    if s is None:
        return "NULL"
    return "'" + str(s).replace("'", "''") + "'"


def sql_bool(b: bool) -> str:
    return "TRUE" if b else "FALSE"


def main():
    root = Path(__file__).resolve().parent.parent
    data_path = root / "data" / "static_content.json"
    out_path = root / "sql" / "seed_full_public_content.sql"
    if not data_path.exists():
        raise SystemExit(f"Missing {data_path}. Run: cd atshri-frontend && npm run dump:static")

    data = json.loads(data_path.read_text(encoding="utf-8"))
    lines = [
        "-- Atshri: full public site content (menu, categories, activities, team, stats, values)",
        "-- Target: PostgreSQL / Supabase (and compatible clients)",
        "-- Regenerate: python scripts/generate_seed_sql.py",
        "",
        "BEGIN;",
        "",
        "-- Clear existing content rows (keeps contacts / volunteers if any)",
        "TRUNCATE TABLE",
        "  activities,",
        "  categories,",
        "  menu_items,",
        "  team_members,",
        "  stats,",
        "  values",
        "RESTART IDENTITY CASCADE;",
        "",
    ]

    for i, m in enumerate(data.get("menu", [])):
        pe = bool(m.get("enabled", True))
        sn = bool(m.get("showInNav", True))
        lines.append(
            "INSERT INTO menu_items (id, icon, label_en, label_hi, visible, page_enabled, show_in_nav, sort_order) VALUES ("
            f"{sql_str(m['id'])}, {sql_str(m.get('icon', '📄'))}, "
            f"{sql_str(m.get('label', {}).get('en', ''))}, {sql_str(m.get('label', {}).get('hi', ''))}, "
            f"{sql_bool(pe)}, {sql_bool(pe)}, {sql_bool(sn)}, {i + 1});",
        )

    for i, c in enumerate(data.get("categories", [])):
        lines.append(
            "INSERT INTO categories (id, icon, name_en, name_hi, color, visible, sort_order) VALUES ("
            f"{sql_str(c['id'])}, {sql_str(c.get('icon', '🏷️'))}, "
            f"{sql_str(c.get('name', {}).get('en', ''))}, {sql_str(c.get('name', {}).get('hi', ''))}, "
            f"{sql_str(c.get('color', '#F4831F'))}, {sql_bool(bool(c.get('visible', True)))}, {i + 1});",
        )

    for i, a in enumerate(data.get("activities", [])):
        raw = a.get("date") or ""
        d = str(raw)[:10] if raw else "1970-01-01"
        aid = a.get("id")
        id_part = f"{int(aid)}, " if aid is not None else ""
        cols = (
            "INSERT INTO activities (id, icon, category, heading_en, heading_hi, date, "
            "text_en, text_hi, image, visible, featured, upcoming, sort_order) VALUES ("
        )
        if aid is None:
            cols = (
                "INSERT INTO activities (icon, category, heading_en, heading_hi, date, "
                "text_en, text_hi, image, visible, featured, upcoming, sort_order) VALUES ("
            )
        lines.append(
            cols
            + id_part
            + f"{sql_str(a.get('icon', '🎯'))}, {sql_str(a.get('category', ''))}, "
            f"{sql_str(a.get('heading', {}).get('en', ''))}, {sql_str(a.get('heading', {}).get('hi', ''))}, "
            f"{sql_str(d)}::date, "
            f"{sql_str(a.get('text', {}).get('en', ''))}, {sql_str(a.get('text', {}).get('hi', ''))}, "
            f"{sql_str(a.get('image', '') or '')}, "
            f"{sql_bool(bool(a.get('visible', True)))}, "
            f"{sql_bool(bool(a.get('featured', False)))}, "
            f"{sql_bool(bool(a.get('upcoming', False)))}, {i + 1});",
        )

    for i, t in enumerate(data.get("team", [])):
        tid = t.get("id")
        if tid is not None:
            lines.append(
                "INSERT INTO team_members (id, name, initials, role_en, role_hi, badge, desc_en, desc_hi, visible, sort_order) VALUES ("
                f"{int(tid)}, {sql_str(t.get('name', ''))}, {sql_str(t.get('initials', ''))}, "
                f"{sql_str(t.get('role', {}).get('en', ''))}, {sql_str(t.get('role', {}).get('hi', ''))}, "
                f"{sql_str(t.get('badge', '🌟') or '🌟')}, "
                f"{sql_str(t.get('desc', {}).get('en', ''))}, {sql_str(t.get('desc', {}).get('hi', ''))}, "
                f"{sql_bool(bool(t.get('visible', True)))}, {i + 1});",
            )
        else:
            lines.append(
                "INSERT INTO team_members (name, initials, role_en, role_hi, badge, desc_en, desc_hi, visible, sort_order) VALUES ("
                f"{sql_str(t.get('name', ''))}, {sql_str(t.get('initials', ''))}, "
                f"{sql_str(t.get('role', {}).get('en', ''))}, {sql_str(t.get('role', {}).get('hi', ''))}, "
                f"{sql_str(t.get('badge', '🌟') or '🌟')}, "
                f"{sql_str(t.get('desc', {}).get('en', ''))}, {sql_str(t.get('desc', {}).get('hi', ''))}, "
                f"{sql_bool(bool(t.get('visible', True)))}, {i + 1});",
            )

    for i, s in enumerate(data.get("stats", [])):
        sid = s.get("id")
        if sid is not None:
            lines.append(
                "INSERT INTO stats (id, icon, value, label_en, label_hi, visible, sort_order) VALUES ("
                f"{int(sid)}, {sql_str(s.get('icon', '📊'))}, {sql_str(s.get('value', '0+'))}, "
                f"{sql_str(s.get('label', {}).get('en', ''))}, {sql_str(s.get('label', {}).get('hi', ''))}, "
                f"{sql_bool(bool(s.get('visible', True)))}, {i + 1});",
            )
        else:
            lines.append(
                "INSERT INTO stats (icon, value, label_en, label_hi, visible, sort_order) VALUES ("
                f"{sql_str(s.get('icon', '📊'))}, {sql_str(s.get('value', '0+'))}, "
                f"{sql_str(s.get('label', {}).get('en', ''))}, {sql_str(s.get('label', {}).get('hi', ''))}, "
                f"{sql_bool(bool(s.get('visible', True)))}, {i + 1});",
            )

    for i, v in enumerate(data.get("values", [])):
        vid = v.get("id")
        if vid is not None:
            lines.append(
                "INSERT INTO values (id, icon, title_en, title_hi, desc_en, desc_hi, visible, sort_order) VALUES ("
                f"{int(vid)}, {sql_str(v.get('icon', '✨'))}, "
                f"{sql_str(v.get('title', {}).get('en', ''))}, {sql_str(v.get('title', {}).get('hi', ''))}, "
                f"{sql_str(v.get('desc', {}).get('en', ''))}, {sql_str(v.get('desc', {}).get('hi', ''))}, "
                f"{sql_bool(bool(v.get('visible', True)))}, {i + 1});",
            )
        else:
            lines.append(
                "INSERT INTO values (icon, title_en, title_hi, desc_en, desc_hi, visible, sort_order) VALUES ("
                f"{sql_str(v.get('icon', '✨'))}, "
                f"{sql_str(v.get('title', {}).get('en', ''))}, {sql_str(v.get('title', {}).get('hi', ''))}, "
                f"{sql_str(v.get('desc', {}).get('en', ''))}, {sql_str(v.get('desc', {}).get('hi', ''))}, "
                f"{sql_bool(bool(v.get('visible', True)))}, {i + 1});",
            )

    lines.extend(["", "COMMIT;", ""])
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out_path} ({len(lines)} lines)")


if __name__ == "__main__":
    main()
