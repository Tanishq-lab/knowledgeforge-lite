from app.services.search_service import SearchService
from app.services.llm_service import LLMService


class ChatService:
    """
    Handles the complete RAG pipeline.
    """

    @staticmethod
    def chat(
        question: str,
        owner_id: int,
        document_ids: list[int] | None = None
    ) -> dict:

        search_results = SearchService.search(
            query=question,
            owner_id=owner_id,
            document_ids=document_ids,
            k=6
        )

        context = [
            result.text
            for result in search_results
        ]

        answer = LLMService.generate_answer(
            question=question,
            context=context
        )

        seen = set()
        sources = []

        for result in search_results:

            if result.document_name not in seen:

                seen.add(result.document_name)

                sources.append(
                    {
                        "document_name": result.document_name,
                        "document_id": result.document_id
                    }
                )

        return {
            "answer": answer,
            "sources": sources
        }