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

default_rules = [

    {
        "name": "Russia High Risk",
        "rule_type": "COUNTRY",
        "rule_value": "Russia",
        "risk_score": 50
    },

    {
        "name": "North Korea Block",
        "rule_type": "COUNTRY",
        "rule_value": "North Korea",
        "risk_score": 80
    },

    {
        "name": "Iran High Risk",
        "rule_type": "COUNTRY",
        "rule_value": "Iran",
        "risk_score": 60
    },

    {
        "name": "Unknown Merchant",
        "rule_type": "MERCHANT",
        "rule_value": "UnknownVendor",
        "risk_score": 40
    },

    {
        "name": "Crypto Exchange",
        "rule_type": "MERCHANT",
        "rule_value": "CryptoExchange",
        "risk_score": 30
    },

    {
        "name": "High Amount",
        "rule_type": "AMOUNT",
        "rule_value": "10000",
        "risk_score": 30
    },

    {
        "name": "Very High Amount",
        "rule_type": "AMOUNT",
        "rule_value": "50000",
        "risk_score": 60
    }

]

for rule in default_rules:

    existing = (
        db.query(FraudRule)
        .filter(FraudRule.name == rule["name"])
        .first()
    )

    if existing:
        print(f"{rule['name']} already exists")
        continue

    db.add(
        FraudRule(
            name=rule["name"],
            rule_type=rule["rule_type"],
            rule_value=rule["rule_value"],
            risk_score=rule["risk_score"],
            is_active=True
        )
    )

    print(f"Created rule {rule['name']}")

db.commit()

db.close()