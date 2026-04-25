from datetime import date
from typing import Any, Type

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from auth import create_access_token, get_current_admin, verify_admin
from database import get_db
from models import Activity, Category, Contact, MenuItem, Stat, TeamMember, Value, Volunteer
from schemas import (
    ActivityCreate,
    ActivityOut,
    ActivityUpdate,
    CategoryCreate,
    CategoryOut,
    CategoryUpdate,
    ContactOut,
    LoginRequest,
    MenuItemCreate,
    MenuItemOut,
    MenuItemUpdate,
    StatCreate,
    StatOut,
    StatUpdate,
    TeamMemberCreate,
    TeamMemberOut,
    TeamMemberUpdate,
    TokenResponse,
    ValueCreate,
    ValueOut,
    ValueUpdate,
    VolunteerOut,
)

auth_router = APIRouter(tags=["auth"])

# Unauthenticated: explains how to call admin routes (opening /admin/content/sync in a browser is a GET and will not work).
admin_discovery_router = APIRouter(prefix="/admin", tags=["admin"])


@admin_discovery_router.get("")
def admin_api_discovery():
    return {
        "service": "atshri-admin",
        "auth": {
            "login": {"method": "POST", "path": "/auth/login", "body": {"username": "string", "password": "string"}},
            "header": "Authorization: Bearer <access_token>",
        },
        "bulk_sync": {
            "path": "/admin/content/sync",
            "method": "POST",
            "requires_auth": True,
            "note": "Replaces ALL content tables — use granular routes below for normal edits.",
        },
        "granular": {
            "activities": "GET/POST /admin/activities — PUT/DELETE /admin/activities/{id}",
            "categories": "GET/POST /admin/categories — PUT/DELETE /admin/categories/{id}",
            "menu": "GET/POST /admin/menu — PUT/DELETE /admin/menu/{id}",
            "team": "GET/POST /admin/team — PUT/DELETE /admin/team/{id}",
            "stats": "GET/POST /admin/stats — PUT/DELETE /admin/stats/{id}",
            "values": "GET/POST /admin/values — PUT/DELETE /admin/values/{id}",
        },
    }


admin_router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(get_current_admin)])


def _get_or_404(db: Session, model: Type[Any], item_id: Any):
    row = db.get(model, item_id)
    if not row:
        raise HTTPException(status_code=404, detail=f"{model.__name__} not found")
    return row


def _update_row(row: Any, values: dict[str, Any]):
    for field, value in values.items():
        setattr(row, field, value)


@auth_router.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    if not verify_admin(payload.username, payload.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(payload.username)
    return TokenResponse(access_token=token)


@admin_router.get("/contacts", response_model=list[ContactOut])
def list_contacts(db: Session = Depends(get_db)):
    return db.scalars(select(Contact).order_by(Contact.created_at.desc())).all()


@admin_router.patch("/contacts/{item_id}/read", response_model=ContactOut)
def mark_contact_read(item_id: int, db: Session = Depends(get_db)):
    row = _get_or_404(db, Contact, item_id)
    row.is_read = True
    db.commit()
    db.refresh(row)
    return row


@admin_router.delete("/contacts/{item_id}", status_code=204)
def delete_contact(item_id: int, db: Session = Depends(get_db)):
    row = _get_or_404(db, Contact, item_id)
    db.delete(row)
    db.commit()
    return None


@admin_router.get("/volunteers", response_model=list[VolunteerOut])
def list_volunteers(db: Session = Depends(get_db)):
    return db.scalars(select(Volunteer).order_by(Volunteer.created_at.desc())).all()


@admin_router.patch("/volunteers/{item_id}/reviewed", response_model=VolunteerOut)
def mark_volunteer_reviewed(item_id: int, db: Session = Depends(get_db)):
    row = _get_or_404(db, Volunteer, item_id)
    row.is_reviewed = True
    db.commit()
    db.refresh(row)
    return row


@admin_router.delete("/volunteers/{item_id}", status_code=204)
def delete_volunteer(item_id: int, db: Session = Depends(get_db)):
    row = _get_or_404(db, Volunteer, item_id)
    db.delete(row)
    db.commit()
    return None


@admin_router.get("/activities", response_model=list[ActivityOut])
def list_activities(db: Session = Depends(get_db)):
    return db.scalars(select(Activity).order_by(Activity.sort_order.asc(), Activity.id.desc())).all()


@admin_router.post("/activities", response_model=ActivityOut, status_code=201)
def create_activity(payload: ActivityCreate, db: Session = Depends(get_db)):
    row = Activity(**payload.model_dump())
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@admin_router.put("/activities/{item_id}", response_model=ActivityOut)
def update_activity(item_id: int, payload: ActivityUpdate, db: Session = Depends(get_db)):
    row = _get_or_404(db, Activity, item_id)
    _update_row(row, payload.model_dump(exclude_unset=True))
    db.commit()
    db.refresh(row)
    return row


@admin_router.delete("/activities/{item_id}", status_code=204)
def delete_activity(item_id: int, db: Session = Depends(get_db)):
    row = _get_or_404(db, Activity, item_id)
    db.delete(row)
    db.commit()
    return None


@admin_router.get("/categories", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return db.scalars(select(Category).order_by(Category.sort_order.asc(), Category.id.asc())).all()


@admin_router.post("/categories", response_model=CategoryOut, status_code=201)
def create_category(payload: CategoryCreate, db: Session = Depends(get_db)):
    row = Category(**payload.model_dump())
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@admin_router.put("/categories/{item_id}", response_model=CategoryOut)
def update_category(item_id: str, payload: CategoryUpdate, db: Session = Depends(get_db)):
    row = _get_or_404(db, Category, item_id)
    _update_row(row, payload.model_dump(exclude_unset=True))
    db.commit()
    db.refresh(row)
    return row


@admin_router.delete("/categories/{item_id}", status_code=204)
def delete_category(item_id: str, db: Session = Depends(get_db)):
    row = _get_or_404(db, Category, item_id)
    db.delete(row)
    db.commit()
    return None


@admin_router.get("/menu", response_model=list[MenuItemOut])
def list_menu(db: Session = Depends(get_db)):
    return db.scalars(select(MenuItem).order_by(MenuItem.sort_order.asc(), MenuItem.id.asc())).all()


@admin_router.post("/menu", response_model=MenuItemOut, status_code=201)
def create_menu(payload: MenuItemCreate, db: Session = Depends(get_db)):
    row = MenuItem(**payload.model_dump())
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@admin_router.put("/menu/{item_id}", response_model=MenuItemOut)
def update_menu(item_id: str, payload: MenuItemUpdate, db: Session = Depends(get_db)):
    row = _get_or_404(db, MenuItem, item_id)
    _update_row(row, payload.model_dump(exclude_unset=True))
    db.commit()
    db.refresh(row)
    return row


@admin_router.delete("/menu/{item_id}", status_code=204)
def delete_menu(item_id: str, db: Session = Depends(get_db)):
    row = _get_or_404(db, MenuItem, item_id)
    db.delete(row)
    db.commit()
    return None


@admin_router.get("/team", response_model=list[TeamMemberOut])
def list_team(db: Session = Depends(get_db)):
    return db.scalars(select(TeamMember).order_by(TeamMember.sort_order.asc(), TeamMember.id.asc())).all()


@admin_router.post("/team", response_model=TeamMemberOut, status_code=201)
def create_team(payload: TeamMemberCreate, db: Session = Depends(get_db)):
    row = TeamMember(**payload.model_dump())
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@admin_router.put("/team/{item_id}", response_model=TeamMemberOut)
def update_team(item_id: int, payload: TeamMemberUpdate, db: Session = Depends(get_db)):
    row = _get_or_404(db, TeamMember, item_id)
    _update_row(row, payload.model_dump(exclude_unset=True))
    db.commit()
    db.refresh(row)
    return row


@admin_router.delete("/team/{item_id}", status_code=204)
def delete_team(item_id: int, db: Session = Depends(get_db)):
    row = _get_or_404(db, TeamMember, item_id)
    db.delete(row)
    db.commit()
    return None


@admin_router.get("/stats", response_model=list[StatOut])
def list_stats(db: Session = Depends(get_db)):
    return db.scalars(select(Stat).order_by(Stat.sort_order.asc(), Stat.id.asc())).all()


@admin_router.post("/stats", response_model=StatOut, status_code=201)
def create_stat(payload: StatCreate, db: Session = Depends(get_db)):
    row = Stat(**payload.model_dump())
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@admin_router.put("/stats/{item_id}", response_model=StatOut)
def update_stat(item_id: int, payload: StatUpdate, db: Session = Depends(get_db)):
    row = _get_or_404(db, Stat, item_id)
    _update_row(row, payload.model_dump(exclude_unset=True))
    db.commit()
    db.refresh(row)
    return row


@admin_router.delete("/stats/{item_id}", status_code=204)
def delete_stat(item_id: int, db: Session = Depends(get_db)):
    row = _get_or_404(db, Stat, item_id)
    db.delete(row)
    db.commit()
    return None


@admin_router.get("/values", response_model=list[ValueOut])
def list_values(db: Session = Depends(get_db)):
    return db.scalars(select(Value).order_by(Value.sort_order.asc(), Value.id.asc())).all()


@admin_router.post("/values", response_model=ValueOut, status_code=201)
def create_value(payload: ValueCreate, db: Session = Depends(get_db)):
    row = Value(**payload.model_dump())
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@admin_router.put("/values/{item_id}", response_model=ValueOut)
def update_value(item_id: int, payload: ValueUpdate, db: Session = Depends(get_db)):
    row = _get_or_404(db, Value, item_id)
    _update_row(row, payload.model_dump(exclude_unset=True))
    db.commit()
    db.refresh(row)
    return row


@admin_router.delete("/values/{item_id}", status_code=204)
def delete_value(item_id: int, db: Session = Depends(get_db)):
    row = _get_or_404(db, Value, item_id)
    db.delete(row)
    db.commit()
    return None


@admin_router.post("/content/sync", summary="Bulk replace all public content (destructive)")
def sync_content(payload: dict[str, Any], db: Session = Depends(get_db)):
    activities = payload.get("activities", [])
    categories = payload.get("categories", [])
    menu = payload.get("menu", [])
    team = payload.get("team", [])
    stats = payload.get("stats", [])
    values = payload.get("values", [])

    db.execute(delete(Activity))
    db.execute(delete(Category))
    db.execute(delete(MenuItem))
    db.execute(delete(TeamMember))
    db.execute(delete(Stat))
    db.execute(delete(Value))
    db.commit()

    for i, item in enumerate(menu):
        pe = bool(item.get("enabled", True))
        sn = bool(item.get("showInNav", pe))
        db.add(
            MenuItem(
                id=item.get("id"),
                icon=item.get("icon", "📄"),
                label_en=item.get("label", {}).get("en", ""),
                label_hi=item.get("label", {}).get("hi", ""),
                visible=pe,
                page_enabled=pe,
                show_in_nav=sn,
                sort_order=i + 1,
            )
        )

    for i, item in enumerate(categories):
        db.add(
            Category(
                id=item.get("id"),
                icon=item.get("icon", "🏷️"),
                name_en=item.get("name", {}).get("en", ""),
                name_hi=item.get("name", {}).get("hi", ""),
                color=item.get("color", "#F4831F"),
                visible=bool(item.get("visible", True)),
                sort_order=i + 1,
            )
        )

    for i, item in enumerate(activities):
        parsed_date = date.today()
        raw_date = item.get("date")
        if raw_date:
            try:
                parsed_date = date.fromisoformat(str(raw_date)[:10])
            except ValueError:
                parsed_date = date.today()
        act_kwargs = dict(
            icon=item.get("icon", "🎯"),
            category=item.get("category", ""),
            heading_en=item.get("heading", {}).get("en", ""),
            heading_hi=item.get("heading", {}).get("hi", ""),
            date=parsed_date,
            text_en=item.get("text", {}).get("en", ""),
            text_hi=item.get("text", {}).get("hi", ""),
            image=item.get("image", ""),
            visible=bool(item.get("visible", True)),
            featured=bool(item.get("featured", False)),
            upcoming=bool(item.get("upcoming", False)),
            sort_order=i + 1,
        )
        if item.get("id") is not None:
            act_kwargs["id"] = int(item["id"])
        db.add(Activity(**act_kwargs))

    for i, item in enumerate(team):
        tm_kwargs = dict(
            name=item.get("name", ""),
            initials=item.get("initials", ""),
            role_en=item.get("role", {}).get("en", ""),
            role_hi=item.get("role", {}).get("hi", ""),
            badge=item.get("badge", "🌟"),
            desc_en=item.get("desc", {}).get("en", ""),
            desc_hi=item.get("desc", {}).get("hi", ""),
            visible=bool(item.get("visible", True)),
            sort_order=i + 1,
        )
        if item.get("id") is not None:
            tm_kwargs["id"] = int(item["id"])
        db.add(TeamMember(**tm_kwargs))

    for i, item in enumerate(stats):
        st_kwargs = dict(
            icon=item.get("icon", "📊"),
            value=item.get("value", "0+"),
            label_en=item.get("label", {}).get("en", ""),
            label_hi=item.get("label", {}).get("hi", ""),
            visible=bool(item.get("visible", True)),
            sort_order=i + 1,
        )
        if item.get("id") is not None:
            st_kwargs["id"] = int(item["id"])
        db.add(Stat(**st_kwargs))

    for i, item in enumerate(values):
        val_kwargs = dict(
            icon=item.get("icon", "✨"),
            title_en=item.get("title", {}).get("en", ""),
            title_hi=item.get("title", {}).get("hi", ""),
            desc_en=item.get("desc", {}).get("en", ""),
            desc_hi=item.get("desc", {}).get("hi", ""),
            visible=bool(item.get("visible", True)),
            sort_order=i + 1,
        )
        if item.get("id") is not None:
            val_kwargs["id"] = int(item["id"])
        db.add(Value(**val_kwargs))

    db.commit()
    return {"ok": True}
