# Dbanyan Group Backend - Pydantic Models/Schemas
# Following project_context.md functional requirements
# CRITICAL: Using UUID instead of ObjectId throughout

from datetime import datetime
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4
from decimal import Decimal
from enum import Enum

from pydantic import BaseModel, Field, EmailStr, validator
from pydantic import ConfigDict


# =============== PRODUCT MODELS ===============

class ProductCategory(str, Enum):
    """Product categories for the 4 main products"""
    POWDER = "powder"
    CAPSULES = "capsules"  
    TEA = "tea"
    OIL = "oil"


class ProductImage(BaseModel):
    """Product image schema"""
    url: str
    alt_text: str
    is_primary: bool = False


class NutritionInfo(BaseModel):
    """Nutritional information per serving"""
    serving_size: str
    calories: Optional[int] = None
    protein: Optional[str] = None
    fiber: Optional[str] = None
    vitamin_c: Optional[str] = None
    calcium: Optional[str] = None
    iron: Optional[str] = None


class ProductBase(BaseModel):
    """Base product schema"""
    name: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=10, max_length=2000)
    short_description: str = Field(..., min_length=10, max_length=500)
    category: ProductCategory
    price: Decimal = Field(..., gt=0, decimal_places=2)
    compare_at_price: Optional[Decimal] = Field(None, gt=0, decimal_places=2)
    images: List[ProductImage] = Field(default_factory=list)
    ingredients: List[str] = Field(default_factory=list)
    benefits: List[str] = Field(default_factory=list)
    usage_instructions: str = ""
    nutrition_info: Optional[NutritionInfo] = None
    weight: str = ""  # e.g., "100g", "60 capsules"
    is_preservative_free: bool = True  # FR2.3 requirement
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None


class ProductCreate(ProductBase):
    """Schema for creating products"""
    quantity: int = Field(..., ge=0)  # FR3.1 requirement
    

class ProductUpdate(BaseModel):
    """Schema for updating products"""
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=10, max_length=2000)
    short_description: Optional[str] = Field(None, min_length=10, max_length=500)
    price: Optional[Decimal] = Field(None, gt=0, decimal_places=2)
    compare_at_price: Optional[Decimal] = Field(None, gt=0, decimal_places=2)
    quantity: Optional[int] = Field(None, ge=0)
    images: Optional[List[ProductImage]] = None
    ingredients: Optional[List[str]] = None
    benefits: Optional[List[str]] = None
    usage_instructions: Optional[str] = None
    nutrition_info: Optional[NutritionInfo] = None
    is_active: Optional[bool] = None


class Product(ProductBase):
    """Complete product schema with database fields"""
    model_config = ConfigDict(from_attributes=True)
    
    uid: UUID = Field(default_factory=uuid4)  # Using UUID instead of ObjectId
    quantity: int = Field(..., ge=0)  # FR3.1 requirement
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# =============== ORDER MODELS ===============

class OrderStatus(str, Enum):
    """Order status states"""
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


class PaymentStatus(str, Enum):
    """Payment status states"""
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"


class OrderItem(BaseModel):
    """Individual item in an order"""
    product_uid: UUID
    product_name: str
    quantity: int = Field(..., gt=0)
    unit_price: Decimal = Field(..., gt=0, decimal_places=2)
    total_price: Decimal = Field(..., gt=0, decimal_places=2)


class ShippingAddress(BaseModel):
    """Customer shipping address"""
    full_name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    address_line_1: str = Field(..., min_length=5, max_length=200)
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


class Order(BaseModel):
    """Complete order schema"""
    model_config = ConfigDict(from_attributes=True)
    
    uid: UUID = Field(default_factory=uuid4)
    customer_email: EmailStr
    items: List[OrderItem]
    shipping_address: ShippingAddress
    
    # Pricing
    subtotal: Decimal = Field(..., gt=0, decimal_places=2)
    discount_amount: Decimal = Field(default=Decimal('0.00'), ge=0, decimal_places=2)
    shipping_cost: Decimal = Field(default=Decimal('0.00'), ge=0, decimal_places=2)
    tax_amount: Decimal = Field(default=Decimal('0.00'), ge=0, decimal_places=2)
    total_amount: Decimal = Field(..., gt=0, decimal_places=2)
    
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


# =============== USER MODELS ===============

class UserRole(str, Enum):
    """User roles"""
    ADMIN = "admin"
    CUSTOMER = "customer"
    GUEST = "guest"  # For checkout without registration


class UserBase(BaseModel):
    """Base user schema"""
    email: EmailStr
    full_name: str = Field(..., min_length=1, max_length=100)
    phone: Optional[str] = Field(None, min_length=10, max_length=15)


class UserCreate(UserBase):
    """Schema for creating users"""
    password: str = Field(..., min_length=8, max_length=100)
    role: UserRole = UserRole.CUSTOMER


class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    """Schema for updating users"""
    full_name: Optional[str] = Field(None, min_length=1, max_length=100)
    phone: Optional[str] = Field(None, min_length=10, max_length=15)
    is_active: Optional[bool] = None


class User(UserBase):
    """Complete user schema"""
    model_config = ConfigDict(from_attributes=True)
    
    uid: UUID = Field(default_factory=uuid4)
    role: UserRole = UserRole.CUSTOMER
    is_active: bool = True
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None


class UserResponse(BaseModel):
    """User response without sensitive data"""
    uid: UUID
    email: EmailStr
    full_name: str
    phone: Optional[str]
    role: UserRole
    is_active: bool
    created_at: datetime
    last_login: Optional[datetime]


class Token(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# =============== COUPON MODELS ===============

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


class Coupon(CouponCreate):
    """Complete coupon schema"""
    model_config = ConfigDict(from_attributes=True)
    
    uid: UUID = Field(default_factory=uuid4)
    is_active: bool = True
    usage_count: int = Field(default=0, ge=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)


# =============== NEWSLETTER MODELS ===============

class NewsletterSubscriber(BaseModel):
    """Newsletter subscriber schema"""
    model_config = ConfigDict(from_attributes=True)
    
    uid: UUID = Field(default_factory=uuid4)
    email: EmailStr
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)


class SubscriberCreate(BaseModel):
    """Schema for creating newsletter subscribers"""
    email: EmailStr


# =============== RESPONSE MODELS ===============

class ResponseModel(BaseModel):
    """Generic API response model"""
    success: bool = True
    message: str = ""
    data: Optional[Dict[str, Any]] = None


class PaginatedResponse(BaseModel):
    """Paginated response model"""
    success: bool = True
    message: str = ""
    data: List[Any] = Field(default_factory=list)
    total: int = 0
    page: int = 1
    per_page: int = 10
    pages: int = 0


# =============== CART MODELS (for frontend state) ===============

class CartItem(BaseModel):
    """Cart item for frontend state management"""
    product_uid: UUID
    product_name: str
    price: Decimal
    quantity: int = Field(..., gt=0)
    image_url: str = ""


class CartState(BaseModel):
    """Complete cart state"""
    items: List[CartItem] = Field(default_factory=list)
    total_items: int = 0
    subtotal: Decimal = Field(default=Decimal('0.00'))
    
    @validator('total_items', always=True)
    def calculate_total_items(cls, v, values):
        items = values.get('items', [])
        return sum(item.quantity for item in items)
    
    @validator('subtotal', always=True)
    def calculate_subtotal(cls, v, values):
        items = values.get('items', [])
        return sum(item.price * item.quantity for item in items)
