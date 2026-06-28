import chromadb


class ChromaService:
    """
    Handles all ChromaDB operations.
    """

    client = chromadb.PersistentClient(
        path="storage/chroma"
    )

    collection = client.get_or_create_collection(
        name="knowledgeforge"
    )

    @staticmethod
    def add_chunks(
        ids: list[str],
        documents: list[str],
        embeddings: list[list[float]],
        metadatas: list[dict]
    ) -> None:
        """
        Stores chunks inside ChromaDB.
        """

        ChromaService.collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas
        )

    @staticmethod
    def count() -> int:
        """
        Returns total number of stored chunks.
        """

        return ChromaService.collection.count()

    @staticmethod
    def search(
        embedding: list[float],
        owner_id: int,
        k: int = 3
    ):
        """
        Searches for the most similar chunks.
        """

        return ChromaService.collection.query(
            query_embeddings=[embedding],
            n_results=k,
            where={
                "owner_id": owner_id
            }
        )