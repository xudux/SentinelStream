import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv(
    "data/transactions.csv"
)

X = df[
    [
        "amount",
        "merchant_risk",
        "location_risk",
        "velocity_flag"
    ]
]

y = df["fraud"]

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

joblib.dump(
    model,
    "app/ml/model.pkl"
)

print("Model trained successfully.")