from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.models.audit_log import AuditLog
from app.core.roles import require_admin


router = APIRouter()


@router.post("/reset-balances")
def reset_balances(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):

    users = db.query(User).all()

    for user in users:
        user.balance = 10000

    db.commit()

    return {
        "message": "all balances reset",
        "users_updated": len(users)
    }


@router.get("/audit-logs")
def get_audit_logs(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):

    logs = (
        db.query(AuditLog)
        .order_by(AuditLog.created_at.desc())
        .limit(100)
        .all()
    )

    return logs