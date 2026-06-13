from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.fraud_rule import FraudRule

from app.schemas.rule_schema import (
    RuleCreate,
    RuleResponse
)


router = APIRouter()


@router.get(
    "/",
    response_model=list[RuleResponse]
)
def get_rules(

    db: Session = Depends(get_db)

):

    rules = (

        db.query(FraudRule)

        .order_by(FraudRule.id.desc())

        .all()

    )

    return rules



@router.post(
    "/",
    response_model=RuleResponse
)
def create_rule(

    rule: RuleCreate,

    db: Session = Depends(get_db)

):

    new_rule = FraudRule(

        name=rule.name,

        rule_type=rule.rule_type,

        rule_value=rule.rule_value,

        risk_score=rule.risk_score

    )

    db.add(new_rule)

    db.commit()

    db.refresh(new_rule)

    return new_rule