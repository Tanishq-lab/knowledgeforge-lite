from datetime import datetime

from pydantic import BaseModel


class DocumentResponse(BaseModel):
    """
    Response schema for uploaded documents.
    """

    id: int
    original_filename: str
    file_path: str
    owner_id: int

    class Config:
        from_attributes = True