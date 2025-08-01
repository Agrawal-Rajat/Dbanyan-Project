# Coupon Models - Dbanyan Group Backend
# All coupon-related Pydantic models

from datetime import datetime
from typing import Optional, List
from uuid import UUID, uuid4
from decimal import Decimal
from enum import Enum
from pydantic import BaseModel, Field, validator
from pydantic import ConfigDict


class CouponType(str, Enum):
    """Coupon types"""
    PERCENTAGE = "percentage"
    FIXED_AMOUNT = "fixed_amount"


class CouponCreate(BaseModel):
    """Schema for creating coupons"""
    code: str = Field(..., min_length=3, max_length=20)
    description: str = Field(..., min_length=5, max_length=200)
    coupon_type: CouponType
    value: Decimal = Field(..., gt=0)  # Percentage (1-100) or fixed amount
    minimum_order_amount: Decimal = Field(default=Decimal('0.00'), ge=0)
    maximum_discount_amount: Optional[Decimal] = Field(None, gt=0)
    usage_limit: Optional[int] = Field(None, gt=0)
    expires_at: datetime

    @validator('value', 'minimum_order_amount', 'maximum_discount_amount')
    def validate_price_precision(cls, v):
        if v is not None and v.as_tuple().exponent < -2:
            raise ValueError('Amount cannot have more than 2 decimal places')
        return v


class CouponUpdate(BaseModel):
    """Schema for updating coupons"""
    description: Optional[str] = Field(None, min_length=5, max_length=200)
    value: Optional[Decimal] = Field(None, gt=0)
    minimum_order_amount: Optional[Decimal] = Field(None, ge=0)
    maximum_discount_amount: Optional[Decimal] = Field(None, gt=0)
    usage_limit: Optional[int] = Field(None, gt=0)
    expires_at: Optional[datetime] = None
    is_active: Optional[bool] = None

    @validator('value', 'minimum_order_amount', 'maximum_discount_amount')
    def validate_price_precision(cls, v):
        if v is not None and v.as_tuple().exponent < -2:
            raise ValueError('Amount cannot have more than 2 decimal places')
        return v


class Coupon(CouponCreate):
    """Complete coupon schema"""
    model_config = ConfigDict(from_attributes=True)
    
    uid: UUID = Field(default_factory=uuid4)
    is_active: bool = True
    usage_count: int = Field(default=0, ge=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class CouponResponse(BaseModel):
    """Coupon response schema"""
    uid: UUID
    code: str
    description: str
    coupon_type: CouponType
    value: Decimal
    minimum_order_amount: Decimal
    maximum_discount_amount: Optional[Decimal]
    usage_limit: Optional[int]
    usage_count: int
    is_active: bool
    expires_at: datetime
    created_at: datetime


class CouponListResponse(BaseModel):
    """Response for coupon list with pagination"""
    data: List[CouponResponse]
    total: int
    page: int
    limit: int
    total_pages: int
