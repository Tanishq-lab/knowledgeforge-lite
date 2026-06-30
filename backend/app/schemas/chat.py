from pydantic import BaseModel


class ChatRequest(BaseModel):
    """
    Request schema for chat.
    """

    question: str

    document_ids: list[int] | None = None


class ChatSource(BaseModel):
    """
    Source document.
    """

    document_name: str
    document_id: int


class ChatResponse(BaseModel):
    """
    Response schema.
    """

    answer: str
    sources: list[ChatSource]