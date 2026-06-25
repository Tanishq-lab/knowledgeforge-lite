from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    """
    Schema used for registering new users.
    """

    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    """
    Schema used during login.
    """

    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """
    Schema returned to the client.
    """

    id: int
    username: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True