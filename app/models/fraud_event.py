from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class FraudEvent(Base):

    __tablename__ = "fraud_events"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    transaction_id = Column(
        Integer,
        ForeignKey("transactions.id"),
        nullable=False
    )

    risk_score = Column(
        Integer
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    transaction = relationship(
        "Transaction",
        back_populates="fraud_events"
    )

    investigations = relationship(
        "Investigation",
        back_populates="fraud_event",
        cascade="all, delete-orphan"
    )
        