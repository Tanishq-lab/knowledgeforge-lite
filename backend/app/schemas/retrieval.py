from pydantic import BaseModel


class SearchResult(BaseModel):
    text: str
    document_name: str
    document_id: int
    chunk_index: int