from fastapi import APIRouter
from fastapi import Depends

from app.core.auth import get_current_user


router = APIRouter()


@router.get("/profile")

def profile(

    current_user=Depends(
        get_current_user
    )

):


    return {

        "name":
        current_user.name,

        "email":
        current_user.email,

        "balance":
        current_user.balance

    }