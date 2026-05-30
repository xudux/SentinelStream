import pandas as pd
import random

rows = []

for _ in range(1000):

    amount = random.randint(10, 15000)

    merchant_risk = random.choice([0, 1])

    location_risk = random.choice([0, 1])

    velocity_flag = random.choice([0, 1])

    fraud = 0

    score = 0

    if amount > 5000:
        score += 1

    if merchant_risk:
        score += 1

    if location_risk:
        score += 1

    if velocity_flag:
        score += 1

    if score >= 2:
        fraud = 1

    rows.append([
        amount,
        merchant_risk,
        location_risk,
        velocity_flag,
        fraud
    ])

df = pd.DataFrame(

    rows,

    columns=[
        "amount",
        "merchant_risk",
        "location_risk",
        "velocity_flag",
        "fraud"
    ]

)

df.to_csv(
    "data/transactions.csv",
    index=False
)

print("Dataset generated.")