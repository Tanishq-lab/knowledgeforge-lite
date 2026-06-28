import re


class TextCleaner:
    """
    Handles text cleaning operations.
    """

    @staticmethod
    def clean(
        text: str
    ) -> str:
        """
        Cleans extracted PDF text.
        """

        # Normalize line endings
        text = text.replace("\r\n", "\n")

        # Remove multiple blank lines
        text = re.sub(
            r"\n{2,}",
            "\n\n",
            text
        )

        # Remove multiple spaces
        text = re.sub(
            r"[ \t]+",
            " ",
            text
        )

        # Remove page numbers like:
        # 1 / 10
        # 12/35
        text = re.sub(
            r"\b\d+\s*/\s*\d+\b",
            "",
            text
        )

        return text.strip()