from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.models.audit_log import AuditLog
from app.core.roles import require_admin
from app.models.transaction import Transaction
from app.models.fraud_event import FraudEvent
from app.models.fraud_rule import FraudRule


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


@router.get("/system-health")
def system_health(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):

    total_users = db.query(User).count()

    total_transactions = (
        db.query(Transaction).count()
    )

    fraud_events = (
        db.query(FraudEvent).count()
    )

    active_rules = (
        db.query(FraudRule)
        .filter(FraudRule.is_active == True)
        .count()
    )

    latest_log = (
        db.query(AuditLog)
        .order_by(AuditLog.created_at.desc())
        .first()
    )

    return {
        "api_status": "ONLINE",
        "database_status": "CONNECTED",
        "fraud_engine": "ACTIVE",
        "auth_service": "ACTIVE",

        "total_users": total_users,
        "total_transactions": total_transactions,
        "fraud_events": fraud_events,
        "active_rules": active_rules,

        "latest_activity": (
            latest_log.action
            if latest_log
            else "None"
        )
    }