from openai import OpenAI

from app.core.config import settings


class LLMService:
    """
    Handles all interactions with the LLM.
    """

    client = OpenAI(
        api_key=settings.LLM_API_KEY,
        base_url=settings.LLM_BASE_URL,
        default_headers={
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "KnowledgeForge",
        },
    )

    @staticmethod
    def generate_answer(
        question: str,
        context: list[str],
    ) -> str:
        """
        Generates an answer using the retrieved context.
        """

        context_text = "\n\n".join(
            f"Context {i + 1}\n{chunk}"
            for i, chunk in enumerate(context)
        )

        prompt = f"""
You are KnowledgeForge, an AI-powered document intelligence assistant.

Your purpose is to answer questions using the information contained in the user's uploaded documents.

Instructions:

1. Answer ONLY using the retrieved context provided below.
2. Never invent or assume information that is not present in the context.
3. If multiple context sections contain relevant information, combine them into one clear and coherent answer.
4. If the context contains only part of the answer, answer using only the available information.
5. Do not copy large portions of the retrieved text verbatim. Summarize and explain naturally.
6. If the answer cannot be found in the retrieved context, reply exactly:

I couldn't find enough information in the uploaded documents.

Formatting Guidelines:

- Use Markdown formatting.
- Use headings (##) when appropriate.
- Use bullet points for lists.
- Use numbered lists for procedures.
- Use tables when comparing concepts.
- Highlight important keywords using **bold**.
- Keep answers concise, accurate, and easy to understand.

Retrieved Context
-----------------
{context_text}

Question
--------
{question}

Answer
------
"""

        try:

            response = LLMService.client.chat.completions.create(
                model=settings.LLM_MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are KnowledgeForge, a helpful AI assistant "
                            "that answers questions using retrieved documents."
                        ),
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    },
                ],
                temperature=0.2,
                max_tokens=700,
            )

            return response.choices[0].message.content.strip()

        except Exception as e:

            print(f"LLM Error: {e}")

            return (
                "The AI service is temporarily unavailable. "
                "Please try again later."
            )