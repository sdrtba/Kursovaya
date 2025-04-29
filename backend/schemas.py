from datetime import datetime
from pydantic import BaseModel


class UserBaseS(BaseModel):
    login: str


class UserCreateS(UserBaseS):
    password: str

    class Config:
        from_attributes = True


class PasswordUpdateS(BaseModel):
    old_password: str
    new_password: str


class UserS(UserBaseS):
    id: int

    class Config:
        from_attributes = True


class ContactBaseS(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    email: str
    phone: str


class ContactCreateS(ContactBaseS):
    pass


class ContactS(ContactBaseS):
    id: int
    owner_id: int
    date_created: datetime
    date_updated: datetime

    class Config:
        from_attributes = True
