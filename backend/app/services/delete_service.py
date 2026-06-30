from sqlalchemy.orm import Session

from app.repositories.document_repository import DocumentRepository
from app.storage.file_storage import FileStorage
from app.vectorstore.chroma_service import ChromaService


class DeleteService:
    """
    Handles document deletion.
    """

    @staticmethod
    def delete_document(
        db: Session,
        document_id: int,
        owner_id: int
    ) -> None:

        document = DocumentRepository.get_document(
            db=db,
            document_id=document_id,
            owner_id=owner_id
        )

        if not document:
            raise ValueError(
                "Document not found."
            )

        # Delete vectors
        ChromaService.delete_document(
            document_id=document.id
        )

        # Delete PDF
        FileStorage.delete_file(
            document.file_path
        )

        # Delete DB record
        DocumentRepository.delete_document(
            db=db,
            document=document
        )