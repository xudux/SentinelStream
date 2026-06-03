from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime

from sqlalchemy.orm import relationship

from datetime import datetime

from app.core.database import Base


class Transaction(Base):

    __tablename__ = "transactions"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )


    amount = Column(
        Float,
        nullable=False
    )


    merchant = Column(
        String,
        nullable=False
    )


    location = Column(
        String,
        nullable=False
    )


    status = Column(
        String,
        default="completed"
    )


    risk_score = Column(
        Integer,
        default=0
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    user = relationship(
        "User",
        back_populates="transactions"
    )

    fraud_events = relationship(
        "FraudEvent",
        back_populates="transaction"
    )