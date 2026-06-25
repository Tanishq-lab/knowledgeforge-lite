from sqlalchemy.orm import Session

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.token import Token
from app.schemas.user import UserCreate


class AuthService:
    """
    Handles authentication-related business logic.
    """

    @staticmethod
    def register_user(
        db: Session,
        user_data: UserCreate
    ) -> User:
        """
        Register a new user after checking email uniqueness.
        """

        # Check if the email is already registered
        existing_user = UserRepository.get_by_email(
            db,
            user_data.email
        )

        if existing_user:
            raise ValueError(
                "Email already registered."
            )

        # Hash the password before storing it
        hashed_password = hash_password(
            user_data.password
        )

        # Create and store the new user
        return UserRepository.create_user(
            db=db,
            username=user_data.username,
            email=user_data.email,
            hashed_password=hashed_password
        )

    @staticmethod
    def login_user(
        db: Session,
        email: str,
        password: str
    ) -> Token:
        """
        Authenticate a user and return a JWT access token.
        """


        # Find user by email
        user = UserRepository.get_by_email(
            db,
            email
        )

        

        if not user:
            raise ValueError(
                "Invalid email or password."
            )

       

        # Verify password
        password_verified = verify_password(
            password,
            user.hashed_password
        )

       

        if not password_verified:
            raise ValueError(
                "Invalid email or password."
            )

        # Generate JWT access token
        access_token = create_access_token(
            data={
                "sub": user.email
            }
        )

        return Token(
            access_token=access_token,
            token_type="bearer"
        )