from fastapi import APIRouter
from fastapi import Depends

from pika import data
from sqlalchemy.orm import Session

from app.models import user
from app.schemas.user_schema import UserRegister

from app.models.user import User

from app.core.database import get_db

from app.core.security import hash_password
from fastapi import HTTPException
from app.services.audit_service import create_audit_log
from app.schemas.user_schema import UserLogin
from app.core.security import verify_password
from app.core.security import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()


@router.post(
    "/register",
    summary="Register a new user",
    description="Creates a new user account after validating that the email is not already registered."
)

def register(

        user:

        UserRegister,

        db:

        Session

        = Depends(

            get_db

        )

):
    existing_user = db.query(
        User
    ).filter(
        User.email == user.email
    ).first()


    if existing_user:

        return {
            "message":
            "email already registered"
        }


    hashed = hash_password(

        user.password

    )


    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed,
        role="USER"
    )


    db.add(

        new_user

    )

    db.commit()

    db.refresh(

        new_user

    )

    create_audit_log(
        db,
        new_user.id,
        "USER_REGISTERED",
        f"User {new_user.email} registered"
    )


    return {

        "message":

        "registered"

    }


@router.post(
    "/login",
    summary="Authenticate user",
    description="Validates user credentials and returns a JWT access token."
)

def login(

        form_data: OAuth2PasswordRequestForm = Depends(),

        db: Session = Depends(get_db)

):


    existing_user = db.query(
        User
    ).filter(
        User.email == form_data.username
    ).first()


    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="invalid credentials"
        )


    valid = verify_password(

        form_data.password,

        existing_user.password

    )


    if not valid:

        raise HTTPException(
            status_code=401,
            detail="invalid credentials"
        )


    token = create_access_token(
    {
        "sub": existing_user.email,
        "role": existing_user.role
    })

    create_audit_log(
        db,
        existing_user.id,
        "USER_LOGIN",
        f"User {existing_user.email} logged in"
    )


    return {

        "access_token": token,

        "token_type": "bearer"

    }