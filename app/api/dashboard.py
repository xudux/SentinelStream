from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.transaction import Transaction
from app.models.fraud_event import FraudEvent
from app.schemas.fraud_event_schema import FraudEventResponse
from app.core.constants import HIGH_RISK_THRESHOLD
from app.core.roles import require_analyst

router = APIRouter()


@router.get("/stats")
def dashboard_stats(
        db: Session = Depends(get_db),
        current_user=Depends(require_analyst)
):

    total_transactions = db.query(
        Transaction
    ).count()

    approved = db.query(
        Transaction
    ).filter(
        Transaction.status == "approved"
    ).count()

    flagged = db.query(
        Transaction
    ).filter(
        Transaction.status == "flagged"
    ).count()

    blocked = db.query(
        Transaction
    ).filter(
        Transaction.status == "blocked"
    ).count()

    fraud_count = db.query(
        FraudEvent
    ).count()

    fraud_rate = 0

    if total_transactions > 0:
        fraud_rate = round(
            (fraud_count / total_transactions) * 100,
            2
        )

    return {
        "total_transactions": total_transactions,
        "approved": approved,
        "flagged": flagged,
        "blocked": blocked,
        "fraud_events": fraud_count,
        "fraud_rate": fraud_rate
    }


@router.get(
    "/high-risk",
    response_model=list[FraudEventResponse]
)
def high_risk_transactions(
        db: Session = Depends(get_db),
        current_user=Depends(require_analyst)
):

    events = db.query(
        FraudEvent
    ).filter(
        FraudEvent.risk_score >= HIGH_RISK_THRESHOLD
    ).all()

    return events


@router.get(
    "/recent",
    response_model=list[FraudEventResponse]
)
def recent_fraud_events(
        db: Session = Depends(get_db),
        current_user=Depends(require_analyst)
):

    events = db.query(
        FraudEvent
    ).order_by(
        FraudEvent.created_at.desc()
    ).limit(20).all()

    return events


@router.get("/high-risk-count")
def high_risk_count(
        db: Session = Depends(get_db),
        current_user=Depends(require_analyst)
):

    count = db.query(
        FraudEvent
    ).filter(
        FraudEvent.risk_score >= HIGH_RISK_THRESHOLD
    ).count()

    return {
        "high_risk_events": count
    }


@router.get("/fraud-rate")
def fraud_rate(
        db: Session = Depends(get_db),
        current_user=Depends(require_analyst)
):

    total = db.query(
        Transaction
    ).count()

    fraud = db.query(
        FraudEvent
    ).count()

    if total == 0:
        return {
            "fraud_rate": 0
        }

    return {
        "fraud_rate": round(
            (fraud / total) * 100,
            2
        )
    }


@router.get(
    "/fraud-trend",
    response_model=list[FraudEventResponse]
)
def fraud_trend(
        db: Session = Depends(get_db),
        current_user=Depends(require_analyst)
):

    events = db.query(
        FraudEvent
    ).order_by(
        FraudEvent.created_at.desc()
    ).limit(20).all()

    return events


@router.get("/fraud-events")
def fraud_events(
        db: Session = Depends(get_db),
        current_user=Depends(require_analyst)
):

    events = (
        db.query(FraudEvent)
        .order_by(
            FraudEvent.created_at.desc()
        )
        .all()
    )

    return events

@router.get("/status-distribution")
def status_distribution(
        db: Session = Depends(get_db),
        current_user=Depends(require_analyst)
):

    approved = db.query(
        Transaction
    ).filter(
        Transaction.status == "approved"
    ).count()

    flagged = db.query(
        Transaction
    ).filter(
        Transaction.status == "flagged"
    ).count()

    blocked = db.query(
        Transaction
    ).filter(
        Transaction.status == "blocked"
    ).count()

    return {
        "approved": approved,
        "flagged": flagged,
        "blocked": blocked
    }