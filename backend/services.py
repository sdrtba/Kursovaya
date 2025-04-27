import datetime

from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jwt import ExpiredSignatureError
from passlib.exc import InvalidTokenError

from database import Base, SessionLocal, engine
from sqlalchemy.orm import Session
from models import User, Contact
from schemas import UserCreateS, UserS, ContactS, ContactCreateS
from passlib.hash import bcrypt
from config import settings
import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")


def create_database():
    return Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_db_user(login: str, db: Session):
    db_user = db.query(User).filter(User.login == login).first()
    return db_user


async def create_db_user(user: UserCreateS, db: Session):
    db_user = User(login=user.login, hashed_password=bcrypt.hash(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        db_user = db.get(User, payload["user_id"])
        if db_user is None:
            raise HTTPException(status_code=404, detail="User Not Found")
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token Expired")
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid Token")
    except:
        raise HTTPException(status_code=401, detail="Something went wrong")

    return db_user


async def auth_user(login: str, password: str, db: Session):
    db_user = await get_db_user(login=login, db=db)

    if not db_user:
        return False
    if not db_user.verify_password(password):
        return False

    return db_user


async def create_token(user: User):
    token_payload = {
        "user_id": user.id,
        "user_name": user.login,
        "exp": datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=settings.TOKEN_EXPIRATION_MINUTES),
    }

    token = jwt.encode(token_payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    return dict(access_token=token, token_type="Bearer")


async def _contact_selector(contact_id: int, user: UserS, db: Session):
    db_contact = db.query(Contact).filter_by(owner_id=user.id).filter(Contact.id == contact_id).first()

    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact Not Found")

    return db_contact


async def get_db_contact(contact_id: int, user: UserS, db: Session):
    db_contact = await _contact_selector(contact_id=contact_id, user=user, db=db)
    return db_contact


async def get_db_contacts(offset: int, limit: int, user: UserS, db: Session):
    db_contacts = db.query(Contact).filter_by(owner_id=user.id).offset(offset).limit(limit).all()

    if db_contacts is None:
        raise HTTPException(status_code=404, detail="Contacts Not Found")

    return db_contacts


async def create_db_contact(user: UserS, contact: ContactCreateS, db: Session):
    db_contact = Contact(**contact.model_dump(), owner_id=user.id)
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact


async def update_db_contact(contact_id: int, user: UserS, contact: ContactCreateS, db: Session):
    db_contact = await _contact_selector(contact_id=contact_id, user=user, db=db)

    db_contact.first_name = contact.first_name
    db_contact.middle_name = contact.middle_name
    db_contact.last_name = contact.last_name
    db_contact.email = contact.email
    db_contact.phone = contact.phone

    db.commit()
    db.refresh(db_contact)
    return db_contact


async def delete_db_contact(contact_id: int, user: UserS, db: Session):
    db_contact = await _contact_selector(contact_id=contact_id, user=user, db=db)

    db.delete(db_contact)
    db.commit()

    return dict(status_code=201, details="Contact Deleted")