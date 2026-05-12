from pydantic import BaseModel


class UserBase(BaseModel):
    name: str
    email: str
    is_active: bool = True


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    model_config = {"from_attributes": True}
