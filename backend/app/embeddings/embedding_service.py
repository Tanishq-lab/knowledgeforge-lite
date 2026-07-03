from sentence_transformers import SentenceTransformer

from app.core.config import settings


class EmbeddingService:
    """
    Handles embedding generation using lazy loading.
    """

    _model = None

    @classmethod
    def get_model(cls):
        if cls._model is None:
            cls._model = SentenceTransformer(
                settings.EMBEDDING_MODEL
            )
        return cls._model

    @staticmethod
    def generate_embedding(
        text: str
    ) -> list[float]:
        """
        Generates an embedding vector.
        """

        model = EmbeddingService.get_model()

        embedding = model.encode(
            text,
            convert_to_numpy=True
        )

        return embedding.tolist()