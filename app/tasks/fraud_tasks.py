from app.tasks.celery_app import celery_app

from app.core.database import SessionLocal


from app.models.user import User
from app.models.transaction import Transaction
from app.models.fraud_event import FraudEvent
from app.core.constants import FRAUD_EVENT_THRESHOLD




@celery_app.task
def analyze_transaction(

        transaction_id,

        risk_score

):

    db = SessionLocal()

    try:

        if risk_score < FRAUD_EVENT_THRESHOLD:
            return {
                "message": "not a fraud event"
            }

        fraud_event = FraudEvent(

            transaction_id=transaction_id,

            risk_score=risk_score

        )

        db.add(
            fraud_event
        )

        db.commit()

        print(
            f"Fraud event stored for transaction {transaction_id}"
        )

    finally:

        db.close()

    return {

        "transaction_id": transaction_id,

        "risk_score": risk_score

    }