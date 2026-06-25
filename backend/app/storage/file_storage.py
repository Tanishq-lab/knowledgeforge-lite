from pathlib import Path
import shutil
import uuid

from fastapi import UploadFile


class FileStorage:
    """
    Handles all file storage operations.
    """

    # Base directory where uploaded files will be stored
    STORAGE_DIR = Path("storage/uploads")

    @staticmethod
    def create_user_folder(
        user_id: int
    ) -> Path:
        """
        Creates the upload folder for a user if it doesn't exist.
        """

        user_folder = FileStorage.STORAGE_DIR / str(user_id)

        user_folder.mkdir(
            parents=True,
            exist_ok=True
        )

        return user_folder

    @staticmethod
    def save_file(
        file: UploadFile,
        user_id: int
    ) -> str:
        """
        Saves an uploaded file and returns its relative path.
        """

        # Create the user's upload folder
        user_folder = FileStorage.create_user_folder(
            user_id
        )

        # Generate a unique filename
        file_extension = Path(file.filename).suffix

        unique_filename = (
            f"{uuid.uuid4()}{file_extension}"
        )

        # Full path where the file will be saved
        destination = user_folder / unique_filename

        # Copy uploaded file to disk
        with destination.open("wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        # Return relative path for storing in database
        return str(destination)