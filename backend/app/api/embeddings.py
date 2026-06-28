from fastapi import APIRouter

from app.embeddings.embedding_service import EmbeddingService
from app.vectorstore.chroma_service import ChromaService


router = APIRouter(
    prefix="/embeddings",
    tags=["Embeddings"]
)


@router.get("/test")
def test_embedding():
    """
    Test embedding generation.
    """

    text = "Machine Learning is a subset of Artificial Intelligence."

    embedding = EmbeddingService.generate_embedding(
        text
    )

    return {
        "dimensions": len(embedding),
        "first_10_values": embedding[:10]
    }


@router.get("/count")
def count_embeddings():
    """
    Returns the total number of chunks stored in ChromaDB.
    """

    return {
        "chunks": ChromaService.count()
    }