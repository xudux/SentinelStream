from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.core.roles import require_admin
from app.schemas.user_schema import RoleUpdate



router = APIRouter()


@router.get("/profile")
def profile(
    current_user=Depends(get_current_user)
):
    return {
        "name": current_user.name,
        "email": current_user.email,
        "balance": current_user.balance,
        "role": current_user.role,
        "is_active": current_user.is_active,
        "created_at": current_user.created_at
    }


@router.get("/all")
def all_users(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    users = (
        db.query(User)
        .order_by(User.id.desc())
        .all()
    )

    return [
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "balance": u.balance,
            "role": u.role,
            "is_active": u.is_active
        }
        for u in users
    ]

@router.put("/{user_id}/role")
def update_role(

    user_id: int,

    update: RoleUpdate,

    db: Session = Depends(get_db),

    current_user=Depends(require_admin)

):

    user = (

        db.query(User)

        .filter(User.id == user_id)

        .first()

    )

    if not user:

        return {

            "detail": "user not found"

        }

    user.role = update.role

    db.commit()

    db.refresh(user)

    return {

        "message": "role updated",

        "role": user.role

    }

@router.put("/{user_id}/toggle-status")
def toggle_user_status(

    user_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(require_admin)

):

    user = (

        db.query(User)

        .filter(User.id == user_id)

        .first()

    )

    if not user:

        return {

            "detail": "user not found"

        }

    user.is_active = not user.is_active

    db.commit()

    db.refresh(user)

    return {

        "message": "status updated",

        "is_active": user.is_active

    }