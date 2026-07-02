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

        ChromaService.collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas
        )

    @staticmethod
    def count() -> int:

        return ChromaService.collection.count()

    @staticmethod
    def delete_document(
        document_id: int
    ) -> None:
        """
        Deletes all chunks belonging
        to a document.
        """

        ChromaService.collection.delete(
            where={
                "document_id": document_id
            }
        )

    @staticmethod
    def search(
        embedding: list[float],
        owner_id: int,
        document_ids: list[int] | None = None,
        k: int = 5
    ):

        if document_ids:
            where = {
                "$and": [
                    {
                        "owner_id": owner_id
                    },
                    {
                        "document_id": {
                            "$in": document_ids
                        }
                    }
                ]
            }
        else:
            where = {
                "owner_id": owner_id
            }

        return ChromaService.collection.query(
            query_embeddings=[embedding],
            n_results=k,
            where=where
        )