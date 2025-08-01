# Newsletter Models - Dbanyan Group Backend
# All newsletter-related Pydantic models

from datetime import datetime
from typing import Optional, List
from uuid import UUID, uuid4
from pydantic import BaseModel, Field, EmailStr
from pydantic import ConfigDict


class NewsletterSubscribe(BaseModel):
    """Schema for newsletter subscription"""
    email: EmailStr
    full_name: Optional[str] = Field(None, max_length=100)


class NewsletterUnsubscribe(BaseModel):
    """Schema for newsletter unsubscription"""
    email: EmailStr


class NewsletterSubscriber(BaseModel):
    """Complete newsletter subscriber schema"""
    model_config = ConfigDict(from_attributes=True)
    
    uid: UUID = Field(default_factory=uuid4)
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    unsubscribed_at: Optional[datetime] = None


class NewsletterSubscriberResponse(BaseModel):
    """Newsletter subscriber response schema"""
    uid: UUID
    email: EmailStr
    full_name: Optional[str]
    is_active: bool
    subscribed_at: datetime
    unsubscribed_at: Optional[datetime]


class NewsletterSubscriberListResponse(BaseModel):
    """Response for newsletter subscriber list with pagination"""
    data: List[NewsletterSubscriberResponse]
    total: int
    page: int
    limit: int
    total_pages: int


class NewsletterStats(BaseModel):
    """Newsletter statistics for admin dashboard"""
    total_subscribers: int
    active_subscribers: int
    new_subscribers_this_month: int
    unsubscribed_this_month: int
