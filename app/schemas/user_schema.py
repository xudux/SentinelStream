from pydantic import BaseModel


class UserRegister(BaseModel):

    name: str

    email: str

    password: str



class UserLogin(BaseModel):

    email: str

    password: str



class Token(BaseModel):

    access_token: str

    token_type: str



from pydantic import BaseModel


class UserCreate(BaseModel):

    name: str

    email: str

    password: str

    role: str



class RoleUpdate(BaseModel):

    role: str



class UserResponse(BaseModel):

    id: int

    name: str

    email: str

    role: str

    balance: float

    is_active: bool


    class Config:

        from_attributes = True