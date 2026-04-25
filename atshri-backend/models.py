from sqlalchemy import Boolean, Column, Date, DateTime, Integer, String, Text, func

from database import Base


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(180), nullable=False, index=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class Volunteer(Base):
    __tablename__ = "volunteers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(180), nullable=False, index=True)
    phone = Column(String(40))
    message = Column(Text)
    is_reviewed = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String(20), default="🎯", nullable=False)
    category = Column(String(80), nullable=False, index=True)
    heading_en = Column(String(180), nullable=False)
    heading_hi = Column(String(180), nullable=False)
    date = Column(Date, nullable=False)
    text_en = Column(Text, nullable=False)
    text_hi = Column(Text, nullable=False)
    image = Column(String(500), default="", nullable=False)
    visible = Column(Boolean, default=True, nullable=False)
    featured = Column(Boolean, default=False, nullable=False)
    upcoming = Column(Boolean, default=False, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)


class Category(Base):
    __tablename__ = "categories"

    id = Column(String(80), primary_key=True, index=True)
    icon = Column(String(20), default="🏷️", nullable=False)
    name_en = Column(String(140), nullable=False)
    name_hi = Column(String(140), nullable=False)
    color = Column(String(24), default="#F4831F", nullable=False)
    visible = Column(Boolean, default=True, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(String(80), primary_key=True, index=True)
    icon = Column(String(20), default="📄", nullable=False)
    label_en = Column(String(120), nullable=False)
    label_hi = Column(String(120), nullable=False)
    # Legacy: kept in sync with page_enabled for older rows / serializers.
    visible = Column(Boolean, default=True, nullable=False)
    page_enabled = Column(Boolean, default=True, nullable=False)
    show_in_nav = Column(Boolean, default=True, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    initials = Column(String(12), nullable=False)
    role_en = Column(String(180), nullable=False)
    role_hi = Column(String(180), nullable=False)
    badge = Column(String(20), default="🌟", nullable=False)
    desc_en = Column(Text, default="", nullable=False)
    desc_hi = Column(Text, default="", nullable=False)
    visible = Column(Boolean, default=True, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)


class Stat(Base):
    __tablename__ = "stats"

    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String(20), default="📊", nullable=False)
    value = Column(String(60), nullable=False)
    label_en = Column(String(140), nullable=False)
    label_hi = Column(String(140), nullable=False)
    visible = Column(Boolean, default=True, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)


class Value(Base):
    __tablename__ = "values"

    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String(20), default="✨", nullable=False)
    title_en = Column(String(160), nullable=False)
    title_hi = Column(String(160), nullable=False)
    desc_en = Column(Text, default="", nullable=False)
    desc_hi = Column(Text, default="", nullable=False)
    visible = Column(Boolean, default=True, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)
