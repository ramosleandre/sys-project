from dataclasses import dataclass

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.user import User
from app.services.auth import get_user_by_id

bearer_scheme = HTTPBearer()


@dataclass(frozen=True)
class CurrentAuth:
    token: str
    user: User


def get_current_auth(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> CurrentAuth:
    token = credentials.credentials

    try:
        payload = decode_access_token(token)
        user_id = int(payload["sub"])
    except (KeyError, TypeError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = get_user_by_id(db, user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token user no longer exists.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return CurrentAuth(token=token, user=user)


def get_current_user(current_auth: CurrentAuth = Depends(get_current_auth)) -> User:
    return current_auth.user
