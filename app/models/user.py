from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from sqlalchemy.orm import relationship

from app.core.database import Base


class User(Base):

    __tablename__ = "users"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String,
        nullable=False
    )


    email = Column(
        String,
        unique=True,
        index=True
    )


    password = Column(
        String,
        nullable=False
    )


    balance = Column(
        Float,
        default=10000
    )


    transactions = relationship(
        "Transaction",
        back_populates="user"
    )

    role = Column(
        String,
        nullable=False,
        default="USER"
    )