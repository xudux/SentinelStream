from pydantic import BaseModel
from datetime import datetime

class FraudEventResponse(BaseModel):

    id: int
    transaction_id: int
    risk_score: int
    created_at: datetime

    class Config:
        from_attributes = True