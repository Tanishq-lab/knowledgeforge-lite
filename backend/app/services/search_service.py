from app.embeddings.embedding_service import EmbeddingService
from app.schemas.retrieval import SearchResult
from app.vectorstore.chroma_service import ChromaService


class SearchService:
    """
    Handles semantic search operations.
    """

    @staticmethod
    def search(
        query: str,
        owner_id: int,
        document_ids: list[int] | None = None,
        k: int = 3
    ) -> list[SearchResult]:
        """
        Performs semantic search and returns
        the most relevant chunks with metadata.
        """

        embedding = EmbeddingService.generate_embedding(
            query
        )

        results = ChromaService.search(
            embedding=embedding,
            owner_id=owner_id,
            document_ids=document_ids,
            k=k
        )

        documents = results["documents"][0]
        metadatas = results["metadatas"][0]

        search_results = []

        for document, metadata in zip(
            documents,
            metadatas
        ):
            search_results.append(
                SearchResult(
                    text=document,
                    document_name=metadata["document_name"],
                    document_id=metadata["document_id"],
                    chunk_index=metadata["chunk_index"]
                )
            )

        return search_results