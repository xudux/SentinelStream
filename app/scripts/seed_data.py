from app.core.database import SessionLocal

from app.models.user import User
from app.models.transaction import Transaction
from app.models.fraud_event import FraudEvent
from app.models.fraud_rule import FraudRule
from app.models.investigation import Investigation

from app.core.security import hash_password


db = SessionLocal()

if db.query(User).count() == 0:

    users = [

        User(

            name="huda",

            email="huda@test.com",

            password=hash_password("123456"),

            balance=100000

        ),

        User(

            name="audituser",

            email="audit@test.com",

            password=hash_password("123456"),

            balance=10000

        ),

        User(

            name="test",

            email="test@gmail.com",

            password=hash_password("123456"),

            balance=10000

        )

    ]


    db.add_all(users)

    db.commit()

    print("Users Seeded")