from fastapi import (
    APIRouter,
    Depends
)

from app.dependencies.current_user import get_current_user
from app.models.user import User
from app.schemas.chat import (
    ChatRequest,
    ChatResponse
)
from app.services.chat_service import ChatService


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post(
    "",
    response_model=ChatResponse
)
def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Chat with uploaded documents.
    """

    answer = ChatService.chat(
        question=request.question,
        owner_id=current_user.id
    )

    return ChatResponse(
        answer=answer
    )