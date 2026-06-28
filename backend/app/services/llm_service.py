import google.generativeai as genai

from app.core.config import settings


class LLMService:
    """
    Handles all interactions with the LLM.
    """

    genai.configure(
        api_key=settings.GEMINI_API_KEY
    )

    model = genai.GenerativeModel(
        "gemini-2.5-flash"
    )

    @staticmethod
    def generate_answer(
        question: str,
        context: list[str]
    ) -> str:
        """
        Generates an answer using the retrieved context.
        """

        context_text = "\n\n".join(
            context
        )

        prompt = f"""
You are an AI assistant.

Answer ONLY using the provided context.

If the answer is not present in the context,
reply exactly:

I don't know based on the provided documents.

Context:
------------------------
{context_text}
------------------------

Question:
{question}

Answer:
"""

        response = LLMService.model.generate_content(
            prompt
        )

        return response.text