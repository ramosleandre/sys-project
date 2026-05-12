from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import CurrentAuth, get_current_auth
from app.core.database import get_db
from app.schemas.auth import AuthResponse, LoginRequest, LogoutResponse
from app.schemas.user import UserCreate
from app.services.auth import (
    authenticate_user,
    build_auth_response,
    get_user_by_email,
    register_user,
)

router = APIRouter(prefix="/auth")


@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(user_create: UserCreate, db: Session = Depends(get_db)) -> AuthResponse:
    if get_user_by_email(db, user_create.email) is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists.",
        )

    return register_user(db, user_create)


@router.post("/login", response_model=AuthResponse)
async def login(login_request: LoginRequest, db: Session = Depends(get_db)) -> AuthResponse:
    user = authenticate_user(db, login_request.email, login_request.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    return build_auth_response(user)


@router.get("/me", response_model=AuthResponse)
async def get_current_user(current_auth: CurrentAuth = Depends(get_current_auth)) -> AuthResponse:
    return AuthResponse(access_token=current_auth.token, user=current_auth.user)


@router.post("/logout", response_model=LogoutResponse)
async def logout(_: CurrentAuth = Depends(get_current_auth)) -> LogoutResponse:
    return LogoutResponse(message="Logged out successfully.")
