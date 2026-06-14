from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from datetime import datetime

from app.core.database import Base


class Investigation(Base):

    __tablename__ = "investigations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    fraud_event_id = Column(
        Integer,
        ForeignKey("fraud_events.id")
    )

    status = Column(
        String,
        default="OPEN"
    )

    assigned_to = Column(
        String,
        nullable=True
    )

    priority = Column(
        String,
        default="MEDIUM"
    )

    notes = Column(
        String,
        nullable=True
    )

    resolution = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )