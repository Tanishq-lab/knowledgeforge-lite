from fastapi import Depends, HTTPException
from jose import JWTError
from sqlalchemy.orm import Session

from app.core.security import (
    oauth2_scheme,
    decode_access_token
)
from app.database.dependencies import get_db
from app.repositories.user_repository import UserRepository
from app.models.user import User


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:

    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials"
    )

    try:
        payload = decode_access_token(
            token
        )

        email = payload.get("sub")

        if email is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = UserRepository.get_by_email(
        db,
        email
    )

    if user is None:
        raise credentials_exception

    return user