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

        print(
            f"Fraud event stored for transaction {transaction_id}"
        )

        return {
            "transaction_id": transaction_id,
            "risk_score": risk_score
        }

    finally:
        db.close()