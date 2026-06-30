from sqlalchemy.orm import Session
from fastapi import UploadFile

from app.models.document import Document
from app.repositories.document_repository import DocumentRepository
from app.storage.file_storage import FileStorage
from app.services.indexing_service import IndexingService


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

        # Validate file type
        if file.content_type != "application/pdf":
            raise ValueError(
                "Only PDF files are allowed."
            )

        file_path = None

        try:
            # Save the uploaded PDF
            file_path = FileStorage.save_file(
                file=file,
                user_id=owner_id
            )

            # Create database record
            document = (
                DocumentRepository.create_document(
                    db=db,
                    original_filename=file.filename,
                    file_path=file_path,
                    owner_id=owner_id
                )
            )

            # Index the document
            IndexingService.index_document(
    document_id=document.id,
    owner_id=owner_id,
    file_path=file_path,
    document_name=document.original_filename
)

            return document

        except Exception:

            # Delete uploaded file if something fails
            if file_path:
                FileStorage.delete_file(
                    file_path
                )

            raise

    @staticmethod
    def get_user_documents(
        db: Session,
        owner_id: int
    ) -> list[Document]:
        """
        Returns all documents belonging to a user.
        """

        return DocumentRepository.get_user_documents(
            db=db,
            owner_id=owner_id
        )