from app.core.database import SessionLocal

from app.models.user import User
from app.models.transaction import Transaction
from app.models.fraud_event import FraudEvent
from app.models.audit_log import AuditLog
from app.models.investigation import Investigation
from app.models.fraud_rule import FraudRule

from app.core.security import hash_password


db = SessionLocal()


users = [

    {

        "name":"Admin",

        "email":"admin@sentinel.com",

        "password":"admin123",

        "role":"ADMIN",

        "balance":100000

    },

    {

        "name":"Fraud Analyst",

        "email":"analyst@sentinel.com",

        "password":"analyst123",

        "role":"FRAUD_ANALYST",

        "balance":50000

    },

    {

        "name":"Customer",

        "email":"user@sentinel.com",

        "password":"user123",

        "role":"USER",

        "balance":25000

    }

]


for u in users:

    existing = (

        db.query(User)

        .filter(

            User.email == u["email"]

        )

        .first()

    )


    if existing:

        print(

            f"{u['email']} already exists"

        )

        continue


    new_user = User(

        name=u["name"],

        email=u["email"],

        password=hash_password(

            u["password"]

        ),

        role=u["role"],

        balance=u["balance"]

    )


    db.add(new_user)

    print(

        f"Created {u['email']}"

    )


db.commit()

db.close()

print("Users seeded successfully")