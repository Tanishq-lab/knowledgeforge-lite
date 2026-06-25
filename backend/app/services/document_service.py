from sqlalchemy.orm import Session
from fastapi import UploadFile

from app.models.document import Document
from app.repositories.document_repository import DocumentRepository
from app.storage.file_storage import FileStorage


class DocumentService:
    """
    Handles document-related business logic.
    """

    @staticmethod
    def upload_document(
        db: Session,
        file: UploadFile,
        owner_id: int
    ) -> Document:
        """
        Uploads a document, saves it to disk,
        stores its metadata in the database,
        and returns the created document.
        """

        # Save the uploaded file
        file_path = FileStorage.save_file(
            file=file,
            user_id=owner_id
        )

        # Save metadata in PostgreSQL
        document = DocumentRepository.create_document(
            db=db,
            original_filename=file.filename,
            file_path=file_path,
            owner_id=owner_id
        )

        return document