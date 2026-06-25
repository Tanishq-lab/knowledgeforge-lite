from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:
    """
    Handles all database operations related to users.
    """

    @staticmethod
    def get_by_email(
        db: Session,
        email: str
    ) -> User | None:

        return (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

    @staticmethod
    def create_user(
        db: Session,
        username: str,
        email: str,
        hashed_password: str
    ) -> User:

        user = User(
            username=username,
            email=email,
            hashed_password=hashed_password
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user
    
    @staticmethod
    def get_by_id(
    db: Session,
    user_id: int
) -> User | None:

        return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )