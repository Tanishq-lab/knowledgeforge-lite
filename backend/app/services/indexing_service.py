from app.pdf.pdf_processor import PDFProcessor
from app.pdf.text_cleaner import TextCleaner
from app.pdf.chunker import Chunker

from app.embeddings.embedding_service import EmbeddingService
from app.vectorstore.chroma_service import ChromaService


class IndexingService:
    """
    Handles document indexing.
    """

    @staticmethod
    def index_document(
        document_id: int,
        owner_id: int,
        file_path: str
    ) -> None:
        """
        Processes a document and stores all chunks
        inside ChromaDB.
        """

        # Extract text
        text = PDFProcessor.extract_text(
            file_path
        )

        # Clean text
        text = TextCleaner.clean(
            text
        )

        # Split into chunks
        chunks = Chunker.chunk_text(
            text
        )

        ids = []
        documents = []
        embeddings = []
        metadatas = []

        for index, chunk in enumerate(chunks):

            ids.append(
                f"document_{document_id}_chunk_{index}"
            )

            documents.append(chunk)

            embeddings.append(
                EmbeddingService.generate_embedding(
                    chunk
                )
            )

            metadatas.append(
                {
                    "owner_id": owner_id,
                    "document_id": document_id,
                    "chunk_index": index
                }
            )

        ChromaService.add_chunks(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas
        )