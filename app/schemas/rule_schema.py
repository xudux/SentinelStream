from pydantic import BaseModel


class RuleCreate(BaseModel):

    name: str

    rule_type: str

    rule_value: str

    risk_score: int


class RuleResponse(BaseModel):

    id: int

    name: str

    rule_type: str

    rule_value: str

    risk_score: int

    is_active: bool


    class Config:

        from_attributes = True