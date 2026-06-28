from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str
    APP_VERSION: str
    DEBUG: bool

    DATABASE_URL: str

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # AI Settings
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"

    GEMINI_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()