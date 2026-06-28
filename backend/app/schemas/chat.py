from pydantic import BaseModel


class ChatRequest(BaseModel):
    """
    Request schema for chat.
    """

    question: str


class ChatResponse(BaseModel):
    """
    Response schema for chat.
    """

    answer: str