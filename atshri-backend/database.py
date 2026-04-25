import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

# Anchor default SQLite to this package directory so API + seed.py use the same
# file whether you start uvicorn from repo root or atshri-backend (relative ./atshri.db does not).
_backend_dir = Path(__file__).resolve().parent
_default_sqlite = "sqlite:///" + (_backend_dir / "atshri.db").as_posix()

DATABASE_URL = os.getenv("DATABASE_URL", _default_sqlite)

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, pool_pre_ping=True, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    from models import (  # pylint: disable=import-outside-toplevel
        Activity,
        Category,
        Contact,
        MenuItem,
        Stat,
        TeamMember,
        Value,
        Volunteer,
    )

    Base.metadata.create_all(bind=engine)
