from fastapi import FastAPI
from app.core.database import Base
from app.core.database import engine
from app.api.auth import router as auth_router
from app.models.user import User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SentinelStream",
    version="1.0"
)

app.include_router(

    auth_router,

    prefix="/auth",

    tags=["Auth"]

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