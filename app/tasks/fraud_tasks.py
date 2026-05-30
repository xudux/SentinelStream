from app.tasks.celery_app import celery_app


@celery_app.task
def analyze_transaction(

        transaction_id,

        risk_score

):

    print(
        f"Analyzing transaction {transaction_id}"
    )

    print(
        f"Risk score: {risk_score}"
    )

    return {

        "transaction_id": transaction_id,

        "risk_score": risk_score

    }