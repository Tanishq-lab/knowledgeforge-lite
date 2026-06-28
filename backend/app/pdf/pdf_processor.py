import fitz


class PDFProcessor:
    """
    Handles PDF processing operations.
    """

    @staticmethod
    def extract_text(
        file_path: str
    ) -> str:
        """
        Extracts text from every page of a PDF.
        """

        text = ""

        with fitz.open(file_path) as document:

            for page in document:
                text += page.get_text()

        return text