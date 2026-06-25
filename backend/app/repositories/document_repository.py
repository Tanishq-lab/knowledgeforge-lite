from sqlalchemy.orm import Session

from app.models.document import Document


class DocumentRepository:
    """
    Handles all database operations related to documents.
    """

    @staticmethod
    def create_document(
        db: Session,
        original_filename: str,
        file_path: str,
        owner_id: int
    ) -> Document:

        document = Document(
            original_filename=original_filename,
            file_path=file_path,
            owner_id=owner_id
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        return document