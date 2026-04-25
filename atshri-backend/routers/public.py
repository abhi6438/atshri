from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_db
from models import Activity, Category, Contact, MenuItem, Stat, TeamMember, Value, Volunteer
from schemas import ContactCreate, ContactOut, VolunteerCreate, VolunteerOut

router = APIRouter(tags=["public"])


@router.get("/content")
def get_content(db: Session = Depends(get_db)):
    # Return full lists so the admin UI and public app can filter locally (hidden rows stay available).
    activities = db.scalars(select(Activity).order_by(Activity.sort_order.asc(), Activity.id.desc())).all()
    categories = db.scalars(select(Category).order_by(Category.sort_order.asc(), Category.id.asc())).all()
    menu = db.scalars(select(MenuItem).order_by(MenuItem.sort_order.asc(), MenuItem.id.asc())).all()
    team = db.scalars(select(TeamMember).order_by(TeamMember.sort_order.asc(), TeamMember.id.asc())).all()
    stats = db.scalars(select(Stat).order_by(Stat.sort_order.asc(), Stat.id.asc())).all()
    values = db.scalars(select(Value).order_by(Value.sort_order.asc(), Value.id.asc())).all()

    return {
        "activities": activities,
        "categories": categories,
        "menu": menu,
        "team": team,
        "stats": stats,
        "values": values,
    }


@router.post("/contact", response_model=ContactOut, status_code=201)
def create_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    row = Contact(name=payload.name.strip(), email=payload.email.lower().strip(), message=payload.message.strip())
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@router.post("/volunteer", response_model=VolunteerOut, status_code=201)
def create_volunteer(payload: VolunteerCreate, db: Session = Depends(get_db)):
    row = Volunteer(
        name=payload.name.strip(),
        email=payload.email.lower().strip(),
        phone=(payload.phone or "").strip() or None,
        message=(payload.message or "").strip() or None,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row
