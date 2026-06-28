from pydantic import BaseModel


class SearchRequest(BaseModel):
    """
    Request schema for semantic search.
    """

    query: str


class SearchResponse(BaseModel):
    """
    Response schema for semantic search.
    """

    chunks: list[str]