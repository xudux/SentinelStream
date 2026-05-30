from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.transaction import Transaction
from app.models.fraud_event import FraudEvent

router = APIRouter()

@router.get("/stats")
def dashboard_stats(

        db: Session = Depends(get_db)

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

    return {

        "total_transactions":
        total_transactions,

        "approved":
        approved,

        "flagged":
        flagged,

        "blocked":
        blocked

    }

@router.get("/high-risk")
def high_risk_transactions(

        db: Session = Depends(get_db)

):

    events = db.query(
        FraudEvent
    ).filter(
        FraudEvent.risk_score >= 50
    ).all()

    return events