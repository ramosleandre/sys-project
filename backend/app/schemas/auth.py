from pydantic import BaseModel

from app.schemas.user import User


class LoginRequest(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AuthResponse(Token):
    user: User


class LogoutResponse(BaseModel):
    message: str
