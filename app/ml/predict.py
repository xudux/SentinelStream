import joblib
import pandas as pd

model = joblib.load(
    "app/ml/model.pkl"
)


def predict_fraud(
        amount,
        merchant_risk,
        location_risk,
        velocity_flag
):

    data = pd.DataFrame([{
        "amount": amount,
        "merchant_risk": merchant_risk,
        "location_risk": location_risk,
        "velocity_flag": velocity_flag
    }])

    prediction = model.predict(data)

    return int(prediction[0])