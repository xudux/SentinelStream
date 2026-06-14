from pydantic import BaseModel
from datetime import datetime


class InvestigationCreate(BaseModel):

    fraud_event_id: int

    assigned_to: str | None = None

    priority: str = "MEDIUM"



class InvestigationUpdate(BaseModel):

    status: str | None = None

    assigned_to: str | None = None

    notes: str | None = None

    resolution: str | None = None

    priority: str | None = None



class InvestigationResponse(BaseModel):

    id: int

    fraud_event_id: int

    status: str

    assigned_to: str | None

    priority: str

    notes: str | None

    resolution: str | None

    created_at: datetime


    class Config:

        from_attributes = True