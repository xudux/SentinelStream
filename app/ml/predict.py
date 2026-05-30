import joblib

model = joblib.load(
    "app/ml/model.pkl"
)


def predict_fraud(

        amount,
        merchant_risk,
        location_risk,
        velocity_flag

):

    prediction = model.predict([

        [

            amount,
            merchant_risk,
            location_risk,
            velocity_flag

        ]

    ])

    return int(
        prediction[0]
    )