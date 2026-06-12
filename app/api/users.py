from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.core.database import get_db
from app.models.user import User


router = APIRouter()


@router.get("/profile")
def profile(
    current_user=Depends(
        get_current_user
    )
):
    return {
        "name": current_user.name,
        "email": current_user.email,
        "balance": current_user.balance
    }


@router.get("/all")
def all_users(
    db: Session = Depends(get_db)
):
    users = (
        db.query(User)
        .order_by(User.id.desc())
        .all()
    )

    return users