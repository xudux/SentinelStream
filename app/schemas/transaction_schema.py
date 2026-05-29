from pydantic import BaseModel


class TransactionCreate(BaseModel):

    amount: float

    merchant: str

    location: str