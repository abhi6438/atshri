from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class ORMBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactOut(ORMBase):
    id: int
    name: str
    email: EmailStr
    message: str
    is_read: bool
    created_at: datetime


class VolunteerCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: Optional[str] = None


class VolunteerOut(ORMBase):
    id: int
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: Optional[str] = None
    is_reviewed: bool
    created_at: datetime


class ActivityBase(BaseModel):
    icon: str = "🎯"
    category: str
    heading_en: str
    heading_hi: str
    date: date
    text_en: str
    text_hi: str
    image: str = ""
    visible: bool = True
    featured: bool = False
    upcoming: bool = False
    sort_order: int = 0


class ActivityCreate(ActivityBase):
    pass


class ActivityUpdate(BaseModel):
    icon: Optional[str] = None
    category: Optional[str] = None
    heading_en: Optional[str] = None
    heading_hi: Optional[str] = None
    date: Optional[date] = None
    text_en: Optional[str] = None
    text_hi: Optional[str] = None
    image: Optional[str] = None
    visible: Optional[bool] = None
    featured: Optional[bool] = None
    upcoming: Optional[bool] = None
    sort_order: Optional[int] = None


class ActivityOut(ORMBase):
    id: int
    icon: str
    category: str
    heading_en: str
    heading_hi: str
    date: date
    text_en: str
    text_hi: str
    image: str
    visible: bool
    featured: bool
    upcoming: bool
    sort_order: int


class CategoryBase(BaseModel):
    id: str
    icon: str = "🏷️"
    name_en: str
    name_hi: str
    color: str = "#F4831F"
    visible: bool = True
    sort_order: int = 0


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    icon: Optional[str] = None
    name_en: Optional[str] = None
    name_hi: Optional[str] = None
    color: Optional[str] = None
    visible: Optional[bool] = None
    sort_order: Optional[int] = None


class CategoryOut(ORMBase):
    id: str
    icon: str
    name_en: str
    name_hi: str
    color: str
    visible: bool
    sort_order: int


class MenuItemBase(BaseModel):
    id: str
    icon: str = "📄"
    label_en: str
    label_hi: str
    visible: bool = True
    page_enabled: bool = True
    show_in_nav: bool = True
    sort_order: int = 0


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemUpdate(BaseModel):
    icon: Optional[str] = None
    label_en: Optional[str] = None
    label_hi: Optional[str] = None
    visible: Optional[bool] = None
    page_enabled: Optional[bool] = None
    show_in_nav: Optional[bool] = None
    sort_order: Optional[int] = None


class MenuItemOut(ORMBase):
    id: str
    icon: str
    label_en: str
    label_hi: str
    visible: bool
    page_enabled: bool
    show_in_nav: bool
    sort_order: int


class TeamMemberBase(BaseModel):
    name: str
    initials: str
    role_en: str
    role_hi: str
    badge: str = "🌟"
    desc_en: str = ""
    desc_hi: str = ""
    visible: bool = True
    sort_order: int = 0


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    initials: Optional[str] = None
    role_en: Optional[str] = None
    role_hi: Optional[str] = None
    badge: Optional[str] = None
    desc_en: Optional[str] = None
    desc_hi: Optional[str] = None
    visible: Optional[bool] = None
    sort_order: Optional[int] = None


class TeamMemberOut(ORMBase):
    id: int
    name: str
    initials: str
    role_en: str
    role_hi: str
    badge: str
    desc_en: str
    desc_hi: str
    visible: bool
    sort_order: int


class StatBase(BaseModel):
    icon: str = "📊"
    value: str
    label_en: str
    label_hi: str
    visible: bool = True
    sort_order: int = 0


class StatCreate(StatBase):
    pass


class StatUpdate(BaseModel):
    icon: Optional[str] = None
    value: Optional[str] = None
    label_en: Optional[str] = None
    label_hi: Optional[str] = None
    visible: Optional[bool] = None
    sort_order: Optional[int] = None


class StatOut(ORMBase):
    id: int
    icon: str
    value: str
    label_en: str
    label_hi: str
    visible: bool
    sort_order: int


class ValueBase(BaseModel):
    icon: str = "✨"
    title_en: str
    title_hi: str
    desc_en: str = ""
    desc_hi: str = ""
    visible: bool = True
    sort_order: int = 0


class ValueCreate(ValueBase):
    pass


class ValueUpdate(BaseModel):
    icon: Optional[str] = None
    title_en: Optional[str] = None
    title_hi: Optional[str] = None
    desc_en: Optional[str] = None
    desc_hi: Optional[str] = None
    visible: Optional[bool] = None
    sort_order: Optional[int] = None


class ValueOut(ORMBase):
    id: int
    icon: str
    title_en: str
    title_hi: str
    desc_en: str
    desc_hi: str
    visible: bool
    sort_order: int


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
