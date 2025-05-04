from datetime import datetime
from pydantic import BaseModel, constr


class UserBaseS(BaseModel):
    login: str


class UserCreateS(UserBaseS):
    password: str

    class Config:
        from_attributes = True


class UserS(UserBaseS):
    id: int

    class Config:
        from_attributes = True


class PasswordUpdateS(BaseModel):
    old_password: str
    new_password: str


class ContactBaseS(BaseModel):
    first_name: constr(max_length=255)
    middle_name: constr(max_length=255)
    last_name: constr(max_length=255)
    email: constr(max_length=255)
    phone: constr(max_length=255)


class ContactCreateS(ContactBaseS):
    pass


class ContactS(ContactBaseS):
    id: int
    owner_id: int
    date_created: datetime
    date_updated: datetime

    class Config:
        from_attributes = True
