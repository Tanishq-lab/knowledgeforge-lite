from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile
)
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.dependencies.current_user import get_current_user
from app.models.user import User
from app.schemas.document import DocumentResponse
from app.services.document_service import DocumentService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post(
    "/upload",
    response_model=DocumentResponse
)
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Upload a PDF document.
    """

    try:
        return DocumentService.upload_document(
            db=db,
            file=file,
            owner_id=current_user.id
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )