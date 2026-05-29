from fastapi import FastAPI

from app.core.database import Base
from app.core.database import engine

from app.models.user import User
from app.models.transaction import Transaction
from app.api.transactions import router as transaction_router

from app.api.auth import router as auth_router
from app.api.users import router as users_router



Base.metadata.create_all(bind=engine)


app = FastAPI()


app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Auth"]
)


app.include_router(
    users_router,
    prefix="/users",
    tags=["Users"]
)


@app.get("/")

def root():

    return {
        "message":
        "SentinelStream Running"
    }


@app.get("/health")

def health():

    return {
        "status":
        "healthy"
    }

app.include_router(

    transaction_router,

    prefix="/transactions",

    tags=["Transactions"]

)