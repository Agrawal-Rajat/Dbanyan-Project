# User Models - Dbanyan Group Backend
# All user and authentication related Pydantic models

from datetime import datetime
from typing import Optional, List
from uuid import UUID, uuid4
from enum import Enum
from pydantic import BaseModel, Field, EmailStr
from pydantic import ConfigDict


class UserRole(str, Enum):
    """User roles"""
    ADMIN = "admin"
    CUSTOMER = "customer"


class UserCreate(BaseModel):
    """Schema for creating users"""
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)
    full_name: str = Field(..., min_length=1, max_length=100)
    phone: Optional[str] = Field(None, min_length=10, max_length=15)


class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    """Schema for updating users"""
    full_name: Optional[str] = Field(None, min_length=1, max_length=100)
    phone: Optional[str] = Field(None, min_length=10, max_length=15)


class User(BaseModel):
    """Complete user schema"""
    model_config = ConfigDict(from_attributes=True)
    
    uid: UUID = Field(default_factory=uuid4)
    email: EmailStr
    password_hash: str
    full_name: str
    phone: Optional[str] = None
    role: UserRole = UserRole.CUSTOMER
    is_active: bool = True
    is_verified: bool = False
    verification_token: Optional[str] = None
    reset_token: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None


class UserResponse(BaseModel):
    """User response without sensitive data"""
    uid: UUID
    email: EmailStr
    full_name: str
    phone: Optional[str]
    role: UserRole
    is_active: bool
    is_verified: bool
    created_at: datetime
    last_login: Optional[datetime]


class UserListResponse(BaseModel):
    """Response for user list with pagination"""
    data: List[UserResponse]
    total: int
    page: int
    limit: int
    total_pages: int


class UserStats(BaseModel):
    """User statistics for admin dashboard"""
    total_users: int
    active_users: int
    new_users_this_month: int
    total_customers: int
    verified_users: int


class Token(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class PasswordChange(BaseModel):
    """Schema for password change"""
    current_password: str
    new_password: str = Field(..., min_length=8, max_length=100)


class PasswordReset(BaseModel):
    """Schema for password reset"""
    email: EmailStr


class PasswordResetConfirm(BaseModel):
    """Schema for password reset confirmation"""
    token: str
    new_password: str = Field(..., min_length=8, max_length=100)
