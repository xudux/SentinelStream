from app.tasks.celery_app import celery_app

from app.core.database import SessionLocal


from app.models.user import User
from app.models.transaction import Transaction
from app.models.fraud_event import FraudEvent
from app.services.audit_service import create_audit_log
from app.core.constants import FRAUD_EVENT_THRESHOLD



@celery_app.task(
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=True
)
def analyze_transaction(
    self,
    transaction_id,
    risk_score
):
    db = SessionLocal()

    try:
        if risk_score < FRAUD_EVENT_THRESHOLD:
            return {
                "message": "not a fraud event"
            }

        existing = (
            db.query(FraudEvent)
            .filter(FraudEvent.transaction_id == transaction_id)
            .first()
        )

        if existing:
            return {
                "message": "already exists"
            }

        fraud_event = FraudEvent(
            transaction_id=transaction_id,
            risk_score=risk_score
        )

        db.add(fraud_event)
        db.commit()

        transaction = (
            db.query(Transaction)
            .filter(Transaction.id == transaction_id)
            .first()
        )

        if transaction:

            create_audit_log(
                db,
                transaction.user_id,
                "FRAUD_EVENT_CREATED",
                f"Fraud event created for transaction {transaction_id}"
            )

        print(
            f"Fraud event stored for transaction {transaction_id}"
        )

        return {
            "transaction_id": transaction_id,
            "risk_score": risk_score
        }

    finally:
        db.close()