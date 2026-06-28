from app.services.search_service import SearchService
from app.services.llm_service import LLMService


class ChatService:
    """
    Handles the complete RAG pipeline.
    """

    @staticmethod
    def chat(
        question: str,
        owner_id: int
    ) -> str:
        """
        Answers a user's question using RAG.
        """

        chunks = SearchService.search(
            query=question,
            owner_id=owner_id
        )

        answer = LLMService.generate_answer(
            question=question,
            context=chunks
        )

        return answer