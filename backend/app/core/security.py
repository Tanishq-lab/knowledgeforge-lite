from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import jwt

from app.core.config import settings

from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

# Configure password hashing algorithm
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str) -> str:
    """
    Generate a secure hash for storing passwords.
    """

    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    """
    Compare user input password with stored hash.
    """

    return pwd_context.verify(
        plain_password,
        hashed_password
    )

def create_access_token(
    data: dict
) -> str:

    to_encode = data.copy()

    expire = datetime.now(
        timezone.utc
    ) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update(
        {"exp": expire}
    )

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)

def decode_access_token(
    token: str
) -> dict:

    return jwt.decode(
        token,
        settings.SECRET_KEY,
        algorithms=[settings.ALGORITHM]
    )