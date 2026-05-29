from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.core.auth import get_current_user

from app.models.user import User
from app.models.transaction import Transaction

from app.schemas.transaction_schema import TransactionCreate
from app.rules.fraud_rules import calculate_risk_score
from app.rules.fraud_rules import get_transaction_status

router = APIRouter()


@router.post("/send")
def send_transaction(

        transaction: TransactionCreate,

        db: Session = Depends(get_db),

        current_user: User = Depends(
            get_current_user
        )

):

    # 1. Analyze fraud
    risk_score = calculate_risk_score(

        transaction.amount,

        transaction.merchant,

        transaction.location

    )

    status = get_transaction_status(
        risk_score
    )

    # 2. Block if risky
    if status == "blocked":

        raise HTTPException(
            status_code=403,
            detail="transaction blocked due to fraud risk"
        )

    # 3. Check balance
    if current_user.balance < transaction.amount:

        raise HTTPException(
            status_code=400,
            detail="insufficient balance"
        )

    # 4. Deduct balance
    current_user.balance -= transaction.amount

    # 5. Save transaction
    new_transaction = Transaction(

        user_id=current_user.id,

        amount=transaction.amount,

        merchant=transaction.merchant,

        location=transaction.location,

        status=status,

        risk_score=risk_score

    )

    db.add(new_transaction)

    db.commit()

    db.refresh(new_transaction)

    return {

        "message": "transaction processed",

        "transaction_id": new_transaction.id,

        "status": status,

        "risk_score": risk_score,

        "remaining_balance": current_user.balance

    }

@router.get("/history")

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