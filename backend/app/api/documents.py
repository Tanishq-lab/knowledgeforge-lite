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
from app.services.delete_service import DeleteService


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

    try:

        return DocumentService.upload_document(
            db=db,
            file=file,
            owner_id=current_user.id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception:

        raise HTTPException(
            status_code=500,
            detail="Internal Server Error"
        )


@router.get(
    "",
    response_model=list[DocumentResponse]
)
def get_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return DocumentService.get_user_documents(
        db=db,
        owner_id=current_user.id
    )


@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    try:

        DeleteService.delete_document(
            db=db,
            document_id=document_id,
            owner_id=current_user.id
        )

        return {
            "message": "Document deleted successfully."
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )