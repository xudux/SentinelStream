from fastapi import FastAPI

from app.core.database import Base
from app.core.database import engine

from app.models.user import User
from app.models.transaction import Transaction
from app.models.fraud_event import FraudEvent
from app.models.audit_log import AuditLog
from app.models.investigation import Investigation
from app.models.fraud_rule import FraudRule
from app.api.transactions import router as transaction_router

from app.api.auth import router as auth_router
from app.api.users import router as users_router

from app.api import ml
from app.api import dashboard
from app.api.admin import router as admin_router
from fastapi.middleware.cors import CORSMiddleware
from app.api import users
from app.api import rules
from app.api import investigations



Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


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

app.include_router(
    ml.router,
    prefix="/ml",
    tags=["Machine Learning"]
)

app.include_router(

    dashboard.router,

    prefix="/dashboard",

    tags=["Dashboard"]

)

app.include_router(
    admin_router,
    prefix="/admin",
    tags=["Admin"]
)

app.include_router(

    rules.router,

    prefix="/rules",

    tags=["Rules"]

)

app.include_router(

    investigations.router,

    prefix="/investigations",

    tags=["Investigations"]

)