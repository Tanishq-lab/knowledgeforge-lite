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

        if file.content_type != "application/pdf":
            raise ValueError(
                "Only PDF files are allowed."
            )

        file_path = None

        try:

            file_path = FileStorage.save_file(
                file=file,
                user_id=owner_id
            )

            document = (
                DocumentRepository.create_document(
                    db=db,
                    original_filename=file.filename,
                    file_path=file_path,
                    owner_id=owner_id
                )
            )

            return document

        except Exception:

            if file_path:
                FileStorage.delete_file(
                    file_path
                )

            raise