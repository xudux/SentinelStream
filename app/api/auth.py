from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.schemas.user_schema import UserRegister

from app.models.user import User

from app.core.database import get_db

from app.core.security import hash_password


router = APIRouter()


@router.post(

    "/register"

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


    hashed = hash_password(

        user.password

    )


    new_user = User(

        name=user.name,

        email=user.email,

        password=hashed

    )


    db.add(

        new_user

    )

    db.commit()

    db.refresh(

        new_user

    )


    return {

        "message":

        "registered"

    }