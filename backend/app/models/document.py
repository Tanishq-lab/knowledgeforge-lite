from typing import TYPE_CHECKING

from sqlalchemy import (
    ForeignKey,
    Integer,
    String
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.database.base import Base

if TYPE_CHECKING:
    from app.models.user import User

class Document(Base):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(
    Integer,
    primary_key=True,
    index=True
)
    original_filename: Mapped[str] = mapped_column(
    String(255),
    nullable=False
)
    file_path: Mapped[str] = mapped_column(
    String(500),
    nullable=False
)
    owner_id: Mapped[int] = mapped_column(
    ForeignKey("users.id"),
    nullable=False
)
    owner: Mapped["User"] = relationship(
    back_populates="documents"
)
    