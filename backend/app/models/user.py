from datetime import datetime, timezone

from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base
from sqlalchemy.orm import relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.document import Document

class User(Base):
    __tablename__ = "users"

    # Primary key for uniquely identifying each user
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # Username displayed in the application
    username: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    # Email should be unique across all users
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False
    )

    # Store hashed password, never plain text passwords
    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    # Track account creation time
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )
    documents: Mapped[list["Document"]] = relationship(
    back_populates="owner",
    cascade="all, delete-orphan"
)