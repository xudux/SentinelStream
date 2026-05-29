from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import OAuth2PasswordBearer

from jose import jwt
from jose import JWTError

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.core.config import settings


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/login"
)


def get_current_user(

        token: str = Depends(
            oauth2_scheme
        ),

        db: Session = Depends(
            get_db
        )

):

    try:

        payload = jwt.decode(

            token,

            settings.SECRET_KEY,

            algorithms=[
                settings.ALGORITHM
            ]

        )

        email = payload.get("sub")

        if email is None:

            raise HTTPException(
                status_code=401,
                detail="invalid token"
            )

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="invalid token"
        )


    user = db.query(
        User
    ).filter(
        User.email == email
    ).first()


    if not user:

        raise HTTPException(
            status_code=401,
            detail="user not found"
        )


    return user