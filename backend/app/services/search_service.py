from app.embeddings.embedding_service import EmbeddingService
from app.vectorstore.chroma_service import ChromaService


class SearchService:
    """
    Handles semantic search operations.
    """

    @staticmethod
    def search(
        query: str,
        owner_id: int,
        k: int = 3
    ) -> list[str]:
        """
        Performs semantic search and returns
        the most relevant chunks.
        """

        embedding = EmbeddingService.generate_embedding(
            query
        )

        results = ChromaService.search(
            embedding=embedding,
            owner_id=owner_id,
            k=k
        )

        return results["documents"][0]