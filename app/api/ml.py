from fastapi import APIRouter

from app.ml.predict import predict_fraud

router = APIRouter()


@router.get("/test")

def test_ml():

    result = predict_fraud(

        9000,

        1,

        1,

        0

    )

    return {
        "prediction": result
    }