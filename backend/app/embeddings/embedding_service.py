from sentence_transformers import SentenceTransformer
from app.core.config import settings

class EmbeddingService:
    """
    Handles embedding generation.
    """

    # Load model only once
    model = SentenceTransformer(
    settings.EMBEDDING_MODEL
)

    @staticmethod
    def generate_embedding(
        text: str
    ) -> list[float]:
        """
        Generates an embedding vector.
        """

        embedding = (
            EmbeddingService.model.encode(
                text,
                convert_to_numpy=True
            )
        )

        return embedding.tolist()