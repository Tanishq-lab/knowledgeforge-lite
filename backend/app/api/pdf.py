from fastapi import APIRouter

from app.pdf.pdf_processor import PDFProcessor
from app.pdf.text_cleaner import TextCleaner
from app.pdf.chunker import Chunker

router = APIRouter(
    prefix="/pdf",
    tags=["PDF"]
)


@router.get("/test")
def test_pdf():

    text = PDFProcessor.extract_text(
        "storage/uploads/2/0eefaf4e-19a9-4ffd-bc19-9be9fade4377.pdf"
    )

    return {
        "characters": len(text),
        "preview": text[:500]
    }

@router.get("/chunks")
def test_chunks():

    text = PDFProcessor.extract_text(
        "storage/uploads/2/0eefaf4e-19a9-4ffd-bc19-9be9fade4377.pdf"
    )

    text = TextCleaner.clean(text)

    chunks = Chunker.chunk_text(text)

    return {
        "chunks": len(chunks),
        "first_chunk": chunks[0],
        "last_chunk": chunks[-1]
    }