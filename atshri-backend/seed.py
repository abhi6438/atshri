"""
Load all public site content from `data/static_content.json` (generated from frontend src/data).

Generate JSON from the repo root:
  cd atshri-frontend && npm run dump:static

Then:
  python seed.py

If you changed the SQLAlchemy models (e.g. new columns), delete the local SQLite file first:
  rm -f atshri.db
"""
import json
from datetime import date
from pathlib import Path

from sqlalchemy import delete

from database import SessionLocal, init_db
from models import Activity, Category, MenuItem, Stat, TeamMember, Value


def load_snapshot():
    path = Path(__file__).resolve().parent / "data" / "static_content.json"
    if not path.exists():
        raise FileNotFoundError(
            f"Missing {path}. Run: cd atshri-frontend && npm run dump:static",
        )
    return json.loads(path.read_text(encoding="utf-8"))


def run_seed():
    init_db()
    data = load_snapshot()
    db = SessionLocal()
    try:
        db.execute(delete(Activity))
        db.execute(delete(Category))
        db.execute(delete(MenuItem))
        db.execute(delete(TeamMember))
        db.execute(delete(Stat))
        db.execute(delete(Value))
        db.commit()

        for i, m in enumerate(data.get("menu", [])):
            pe = bool(m.get("enabled", True))
            sn = bool(m.get("showInNav", True))
            db.add(
                MenuItem(
                    id=m["id"],
                    icon=m.get("icon", "📄"),
                    label_en=m.get("label", {}).get("en", ""),
                    label_hi=m.get("label", {}).get("hi", ""),
                    visible=pe,
                    page_enabled=pe,
                    show_in_nav=sn,
                    sort_order=i + 1,
                ),
            )

        for i, c in enumerate(data.get("categories", [])):
            db.add(
                Category(
                    id=c["id"],
                    icon=c.get("icon", "🏷️"),
                    name_en=c.get("name", {}).get("en", ""),
                    name_hi=c.get("name", {}).get("hi", ""),
                    color=c.get("color", "#F4831F"),
                    visible=bool(c.get("visible", True)),
                    sort_order=i + 1,
                ),
            )

        for i, a in enumerate(data.get("activities", [])):
            raw = a.get("date")
            try:
                d = date.fromisoformat(str(raw)[:10]) if raw else date.today()
            except ValueError:
                d = date.today()
            kwargs = dict(
                icon=a.get("icon", "🎯"),
                category=a.get("category", ""),
                heading_en=a.get("heading", {}).get("en", ""),
                heading_hi=a.get("heading", {}).get("hi", ""),
                date=d,
                text_en=a.get("text", {}).get("en", ""),
                text_hi=a.get("text", {}).get("hi", ""),
                image=a.get("image", "") or "",
                visible=bool(a.get("visible", True)),
                featured=bool(a.get("featured", False)),
                upcoming=bool(a.get("upcoming", False)),
                sort_order=i + 1,
            )
            if a.get("id") is not None:
                kwargs["id"] = int(a["id"])
            db.add(Activity(**kwargs))

        for i, t in enumerate(data.get("team", [])):
            kwargs = dict(
                name=t.get("name", ""),
                initials=t.get("initials", ""),
                role_en=t.get("role", {}).get("en", ""),
                role_hi=t.get("role", {}).get("hi", ""),
                badge=t.get("badge", "🌟") or "🌟",
                desc_en=t.get("desc", {}).get("en", ""),
                desc_hi=t.get("desc", {}).get("hi", ""),
                visible=bool(t.get("visible", True)),
                sort_order=i + 1,
            )
            if t.get("id") is not None:
                kwargs["id"] = int(t["id"])
            db.add(TeamMember(**kwargs))

        for i, s in enumerate(data.get("stats", [])):
            kwargs = dict(
                icon=s.get("icon", "📊"),
                value=s.get("value", "0+"),
                label_en=s.get("label", {}).get("en", ""),
                label_hi=s.get("label", {}).get("hi", ""),
                visible=bool(s.get("visible", True)),
                sort_order=i + 1,
            )
            if s.get("id") is not None:
                kwargs["id"] = int(s["id"])
            db.add(Stat(**kwargs))

        for i, v in enumerate(data.get("values", [])):
            kwargs = dict(
                icon=v.get("icon", "✨"),
                title_en=v.get("title", {}).get("en", ""),
                title_hi=v.get("title", {}).get("hi", ""),
                desc_en=v.get("desc", {}).get("en", ""),
                desc_hi=v.get("desc", {}).get("hi", ""),
                visible=bool(v.get("visible", True)),
                sort_order=i + 1,
            )
            if v.get("id") is not None:
                kwargs["id"] = int(v["id"])
            db.add(Value(**kwargs))

        db.commit()
        print("Seed complete from data/static_content.json")
    finally:
        db.close()


if __name__ == "__main__":
    run_seed()
