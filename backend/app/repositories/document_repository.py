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

    @staticmethod
    def get_user_documents(
        db: Session,
        owner_id: int
    ) -> list[Document]:
        """
        Returns all documents uploaded by a user.
        """

        return (
            db.query(Document)
            .filter(Document.owner_id == owner_id)
            .order_by(Document.created_at.desc())
            .all()
        )

    @staticmethod
    def get_document(
        db: Session,
        document_id: int,
        owner_id: int
    ) -> Document | None:
        """
        Returns a single document.
        """

        return (
            db.query(Document)
            .filter(
                Document.id == document_id,
                Document.owner_id == owner_id
            )
            .first()
        )

    @staticmethod
    def delete_document(
        db: Session,
        document: Document
    ) -> None:
        """
        Deletes a document from the database.
        """

        db.delete(document)
        db.commit()