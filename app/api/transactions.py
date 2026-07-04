from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import get_current_user

from app.models.user import User
from app.models.transaction import Transaction
from app.models.fraud_rule import FraudRule

from app.schemas.transaction_schema import TransactionCreate
from app.rules.fraud_rules import calculate_risk_score
from app.rules.fraud_rules import get_transaction_status
from app.rules.velocity_rules import check_transaction_velocity
from app.ml.predict import predict_fraud
from app.tasks.fraud_tasks import analyze_transaction
from app.services.audit_service import create_audit_log
from app.core.roles import (
    require_admin,
    require_analyst
)
router = APIRouter()


@router.post(
    "/send",
    summary="Process a transaction",
    description="Processes a transaction by performing fraud analysis, balance validation, machine learning prediction, and audit logging."
)
def send_transaction(

        transaction: TransactionCreate,

        db: Session = Depends(get_db),

        current_user: User = Depends(
            get_current_user
        )

):

    # 1. Analyze fraud
    risk_score = calculate_risk_score(

        db,

        transaction.amount,

        transaction.merchant,

        transaction.location

    )

    velocity_flag = check_transaction_velocity(
        current_user.id
    )

    merchant_risk = 0

    location_risk = 0


    rules = (

        db.query(FraudRule)

        .filter(

            FraudRule.is_active == True

        )

        .all()

    )


    merchant = transaction.merchant.strip().lower()
    location = transaction.location.strip().lower()

    for rule in rules:

        value = rule.rule_value.strip().lower()

        if (
            rule.rule_type == "MERCHANT"
            and merchant == value
        ):
            merchant_risk = 1

        if (
            rule.rule_type == "COUNTRY"
            and location == value
        ):
            location_risk = 1


    velocity_value = 1 if velocity_flag else 0

    ml_prediction = predict_fraud(

        transaction.amount,

        merchant_risk,

        location_risk,

        velocity_value

    )

    if velocity_flag:

        risk_score += 50

    # Combine Rule Engine + ML

    if ml_prediction == 1:

        risk_score += 30

    status = get_transaction_status(
        risk_score
    )


    # 2. Block if risky
    if status == "blocked":

        blocked_transaction = Transaction(

            user_id=current_user.id,

            amount=transaction.amount,

            merchant=transaction.merchant,

            location=transaction.location,

            status="blocked",

            risk_score=risk_score

        )

        try:

            db.add(blocked_transaction)

            db.commit()

            db.refresh(blocked_transaction)

        except Exception:

            db.rollback()

            raise HTTPException(

                status_code=500,

                detail="database error"

            )

        analyze_transaction.delay(

            blocked_transaction.id,

            risk_score

        )

        create_audit_log(
            db,
            current_user.id,
            "TRANSACTION_BLOCKED",
            f"Transaction {blocked_transaction.id} blocked with risk score {risk_score}"
        )

        raise HTTPException(
            status_code=403,
            detail="transaction blocked due to fraud risk"
        )

    # 3. Check balance

    print(
        f"User balance: {current_user.balance}"
    )
    if current_user.balance < transaction.amount:

        raise HTTPException(
            status_code=400,
            detail="insufficient balance"
        )

    # 4. Deduct balance
    current_user.balance -= transaction.amount

    db.add(current_user)

    # 5. Save transaction
    new_transaction = Transaction(

        user_id=current_user.id,

        amount=transaction.amount,

        merchant=transaction.merchant,

        location=transaction.location,

        status=status,

        risk_score=risk_score

    )

    try:

        db.add(new_transaction)

        db.commit()

        db.refresh(new_transaction)

    except Exception:

        db.rollback()

        raise HTTPException(

            status_code=500,

            detail="database error"

        )

    analyze_transaction.delay(

        new_transaction.id,

        risk_score

    )

    create_audit_log(
        db,
        current_user.id,
        "TRANSACTION_PROCESSED",
        f"Transaction {new_transaction.id} processed with risk score {risk_score}"
    )

    return {

        "message": "transaction processed",

        "transaction_id": new_transaction.id,

        "status": status,

        "risk_score": risk_score,

        "ml_prediction": ml_prediction,

        "remaining_balance": current_user.balance

    }

@router.get(
    "/history",
    summary="Get transaction history",
    description="Returns all transactions associated with the authenticated user."
)

def transaction_history(

        db: Session = Depends(get_db),

        current_user: User = Depends(
            get_current_user
        )

):


    transactions = db.query(
        Transaction
    ).filter(
        Transaction.user_id == current_user.id
    ).all()


    return transactions


@router.get("/all")
def get_all_transactions(
    db: Session = Depends(get_db),
    current_user=Depends(require_analyst)
):

    transactions = (
        db.query(Transaction)
        .order_by(Transaction.id.desc())
        .all()
    )

    return transactions

@router.get("/{transaction_id}")
def get_transaction_details(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_analyst)
):

    transaction = (
        db.query(Transaction)
        .filter(
            Transaction.id == transaction_id
        )
        .first()
    )

    if not transaction:

        raise HTTPException(
            status_code=404,
            detail="transaction not found"
        )

    return transaction