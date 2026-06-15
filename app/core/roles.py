from fastapi import Depends
from fastapi import HTTPException

from app.core.auth import get_current_user


def require_admin(
    current_user=Depends(get_current_user)
):
    if current_user.role != "ADMIN":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user


def require_analyst(
    current_user=Depends(get_current_user)
):
    if current_user.role not in [
        "ADMIN",
        "FRAUD_ANALYST"
    ]:
        raise HTTPException(
            status_code=403,
            detail="Analyst access required"
        )

    return current_user


def require_user(
    current_user=Depends(get_current_user)
):
    return current_user