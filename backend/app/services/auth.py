from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User
from app.schemas.auth import AuthResponse
from app.schemas.user import UserCreate


def get_user_by_email(db: Session, email: str) -> User | None:
    normalized_email = email.strip().lower()
    return db.scalar(select(User).where(User.email == normalized_email))

def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.get(User, user_id)

def register_user(db: Session, user_create: UserCreate) -> AuthResponse:
    user = User(
        name=user_create.name.strip(),
        email=user_create.email.strip().lower(),
        password_hash=hash_password(user_create.password),
        is_active=user_create.is_active,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return AuthResponse(
        access_token=create_access_token(str(user.id)),
        user=user,
    )


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(db, email)
    if user is None:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user


def build_auth_response(user: User) -> AuthResponse:
    return AuthResponse(
        access_token=create_access_token(str(user.id)),
        user=user,
    )
