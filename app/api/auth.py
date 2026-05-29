from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.schemas.user_schema import UserRegister

from app.models.user import User

from app.core.database import get_db

from app.core.security import hash_password
from fastapi import HTTPException

from app.schemas.user_schema import UserLogin
from app.core.security import verify_password
from app.core.security import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

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

# @router.post(
#     "/login"
# )

# def login(

#         user:

#         UserLogin,

#         db:

#         Session

#         = Depends(

#             get_db

#         )

# ):


#     existing_user = db.query(

#         User

#     ).filter(

#         User.email == user.email

#     ).first()


#     if not existing_user:

#         raise HTTPException(
#             status_code=401,
#             detail="invalid credentials"
#         )




#     valid = verify_password(

#         user.password,

#         existing_user.password

#     )


#     if not valid:

#         raise HTTPException(
#             status_code=401,
#             detail="invalid credentials"
#         )


#     token = create_access_token(

#         {

#             "sub":

#             existing_user.email

#         }

#     )


#     return {

#         "access_token":

#         token,

#         "token_type":

#         "bearer"

#     }

@router.post("/login")

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
            "sub": existing_user.email
        }

    )


    return {

        "access_token": token,

        "token_type": "bearer"

    }