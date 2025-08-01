# Base Models - Dbanyan Group Backend
# Common response models and shared schemas

from datetime import datetime
from typing import Optional, List, Any, Dict, Generic, TypeVar
from uuid import UUID
from pydantic import BaseModel, Field

T = TypeVar('T')

class ResponseModel(BaseModel):
    """Standard API response model"""
    success: bool = True
    message: str
    data: Optional[Any] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated response model"""
    items: List[T]
    total: int
    page: int
    per_page: int
    pages: int
    has_prev: bool
    has_next: bool


class UserLogin(BaseModel):
    """User login request model"""
    email: str
    password: str


class Token(BaseModel):
    """JWT token response model"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int = 3600  # 1 hour
    user: Optional[Dict[str, Any]] = None


class PasswordResetRequest(BaseModel):
    """Password reset request model"""
    email: str


class PasswordResetConfirm(BaseModel):
    """Password reset confirmation model"""
    token: str
    new_password: str


class ChangePasswordRequest(BaseModel):
    """Change password request model"""
    current_password: str
    new_password: str


class EmailVerificationRequest(BaseModel):
    """Email verification request model"""
    token: str


class SubscriberCreate(BaseModel):
    """Newsletter subscriber creation model"""
    email: str
    full_name: Optional[str] = None
