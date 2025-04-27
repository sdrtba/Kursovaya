from fastapi import FastAPI, Depends, HTTPException
import uvicorn
from starlette.middleware.cors import CORSMiddleware
from services import create_database, get_db, get_db_user, create_db_user, create_token, get_db_contacts, \
    get_current_user, get_db_contact, create_db_contact, update_db_contact, delete_db_contact, auth_user
from schemas import UserCreateS, UserS, ContactS, ContactCreateS
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://213.108.23.238",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    create_database()


@app.post("/api/token")
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = await auth_user(login=form_data.username, password=form_data.password, db=db)

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    return await create_token(user=db_user)


@app.post("/api/users")
async def create_user(user: UserCreateS, db: Session = Depends(get_db)):
    db_user = await get_db_user(login=user.login, db=db)

    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")

    db_user = await create_db_user(user, db)

    return await create_token(db_user)


@app.get("/api/users/me", response_model=UserS)
async def get_user(user: UserS = Depends(get_current_user)):
    return user

@app.post("/api/contacts", response_model=ContactS)
async def create_contact(contact: ContactCreateS, user: UserS = Depends(get_current_user), db: Session = Depends(get_db)):
    return await create_db_contact(user=user, contact=contact, db=db)


@app.get("/api/contacts/{id}", response_model=ContactS)
async def get_contact(contact_id: int, user: UserS = Depends(get_current_user), db: Session = Depends(get_db)):
    return await get_db_contact(contact_id=contact_id, user=user, db=db)


@app.get("/api/contacts", response_model=list[ContactS])
async def get_contacts(offset: int = 0, limit: int = 10,
                       user: UserS = Depends(get_current_user),
                       db: Session = Depends(get_db)):
    return await get_db_contacts(offset=offset, limit=limit, user=user, db=db)


@app.put("/api/contacts/{id}", response_model=ContactS)
async def update_contact(contact_id: int, contact: ContactCreateS,
                         user: UserS = Depends(get_current_user),
                         db: Session = Depends(get_db)):
    return await update_db_contact(contact_id=contact_id, user=user, contact=contact, db=db)


@app.delete("/api/contacts/{id}")
async def delete_contact(contact_id: int, user: UserS = Depends(get_current_user), db: Session = Depends(get_db)):
    return await delete_db_contact(contact_id=contact_id, user=user, db=db)


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)
