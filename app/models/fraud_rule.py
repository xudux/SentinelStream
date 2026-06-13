from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean

from app.core.database import Base


class FraudRule(Base):

    __tablename__ = "fraud_rules"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String,
        nullable=False
    )


    rule_type = Column(
        String,
        nullable=False
    )


    rule_value = Column(
        String,
        nullable=False
    )


    risk_score = Column(
        Integer,
        nullable=False
    )


    is_active = Column(
        Boolean,
        default=True
    )