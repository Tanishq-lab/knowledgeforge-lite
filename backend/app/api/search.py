from fastapi import (
    APIRouter,
    Depends
)

from app.dependencies.current_user import get_current_user
from app.models.user import User
from app.schemas.search import (
    SearchRequest,
    SearchResponse
)
from app.services.search_service import SearchService


router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


@router.post(
    "",
    response_model=SearchResponse
)
def semantic_search(
    request: SearchRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Performs semantic search over the user's documents.
    """

    chunks = SearchService.search(
        query=request.query,
        owner_id=current_user.id
    )

    return SearchResponse(
        chunks=chunks
    )