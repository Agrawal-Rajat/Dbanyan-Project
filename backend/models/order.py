# Order Models - Dbanyan Group Backend
# All order-related Pydantic models

from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4
from decimal import Decimal
from enum import Enum
from pydantic import BaseModel, Field, EmailStr, validator
from pydantic import ConfigDict


class OrderStatus(str, Enum):
    """Order status enumeration"""
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class PaymentStatus(str, Enum):
    """Payment status enumeration"""
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"


class OrderItem(BaseModel):
    """Individual item in an order"""
    product_uid: UUID
    product_name: str
    quantity: int = Field(..., gt=0)
    unit_price: Decimal = Field(..., gt=0)
    total_price: Decimal = Field(..., gt=0)

    @validator('unit_price', 'total_price')
    def validate_price_precision(cls, v):
        if v is not None and v.as_tuple().exponent < -2:
            raise ValueError('Price cannot have more than 2 decimal places')
        return v


class ShippingAddress(BaseModel):
    """Shipping address schema"""
    full_name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    address_line_1: str = Field(..., min_length=1, max_length=200)
    address_line_2: Optional[str] = Field(None, max_length=200)
    city: str = Field(..., min_length=1, max_length=100)
    state: str = Field(..., min_length=1, max_length=100)
    postal_code: str = Field(..., min_length=5, max_length=10)
    country: str = Field(default="India", max_length=100)


class OrderCreate(BaseModel):
    """Schema for creating orders"""
    customer_email: EmailStr
    items: List[OrderItem] = Field(..., min_items=1)
    shipping_address: ShippingAddress
    coupon_code: Optional[str] = None
    notes: Optional[str] = Field(None, max_length=500)


class OrderUpdate(BaseModel):
    """Schema for updating orders"""
    status: Optional[OrderStatus] = None
    payment_status: Optional[PaymentStatus] = None
    tracking_number: Optional[str] = None
    notes: Optional[str] = None


class Order(BaseModel):
    """Complete order schema"""
    model_config = ConfigDict(from_attributes=True)
    
    uid: UUID = Field(default_factory=uuid4)
    customer_email: EmailStr
    items: List[OrderItem]
    shipping_address: ShippingAddress
    
    # Pricing
    subtotal: Decimal = Field(..., gt=0)
    discount_amount: Decimal = Field(default=Decimal('0.00'), ge=0)
    shipping_cost: Decimal = Field(default=Decimal('0.00'), ge=0)
    tax_amount: Decimal = Field(default=Decimal('0.00'), ge=0)
    total_amount: Decimal = Field(..., gt=0)
    
    # Payment
    razorpay_order_id: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    payment_status: PaymentStatus = PaymentStatus.PENDING
    
    # Status & Tracking
    status: OrderStatus = OrderStatus.PENDING
    tracking_number: Optional[str] = None
    coupon_code: Optional[str] = None
    notes: Optional[str] = None
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    confirmed_at: Optional[datetime] = None
    shipped_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None

    @validator('subtotal', 'discount_amount', 'shipping_cost', 'tax_amount', 'total_amount')
    def validate_price_precision(cls, v):
        if v is not None and v.as_tuple().exponent < -2:
            raise ValueError('Price cannot have more than 2 decimal places')
        return v


class OrderResponse(BaseModel):
    """Order response schema"""
    uid: UUID
    customer_email: EmailStr
    items: List[OrderItem]
    shipping_address: ShippingAddress
    subtotal: Decimal
    discount_amount: Decimal
    shipping_cost: Decimal
    tax_amount: Decimal
    total_amount: Decimal
    razorpay_order_id: Optional[str]
    razorpay_payment_id: Optional[str]
    payment_status: PaymentStatus
    status: OrderStatus
    tracking_number: Optional[str]
    coupon_code: Optional[str]
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime
    confirmed_at: Optional[datetime]
    shipped_at: Optional[datetime]
    delivered_at: Optional[datetime]


class OrderListResponse(BaseModel):
    """Response for order list with pagination"""
    data: List[OrderResponse]
    total: int
    page: int
    limit: int
    total_pages: int


class OrderStats(BaseModel):
    """Order statistics for admin dashboard"""
    total_orders: int
    total_revenue: Decimal
    pending_orders: int
    completed_orders: int
    average_order_value: Decimal
    orders_this_month: int
    revenue_this_month: Decimal
