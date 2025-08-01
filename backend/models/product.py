# Product Models - Dbanyan Group Backend
# All product-related Pydantic models

from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4
from decimal import Decimal
from enum import Enum
from pydantic import BaseModel, Field, validator
from pydantic import ConfigDict


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
    price: Decimal = Field(..., gt=0)
    compare_at_price: Optional[Decimal] = Field(None, gt=0)
    images: List[ProductImage] = Field(default_factory=list)
    ingredients: List[str] = Field(default_factory=list)
    benefits: List[str] = Field(default_factory=list)
    usage_instructions: str = ""
    nutrition_info: Optional[NutritionInfo] = None
    weight: str = ""  # e.g., "100g", "60 capsules"
    is_preservative_free: bool = True
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

    @validator('price', 'compare_at_price')
    def validate_price_precision(cls, v):
        if v is not None and v.as_tuple().exponent < -2:
            raise ValueError('Price cannot have more than 2 decimal places')
        return v


class ProductCreate(ProductBase):
    """Schema for creating products"""
    quantity: int = Field(..., ge=0)
    

class ProductUpdate(BaseModel):
    """Schema for updating products"""
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=10, max_length=2000)
    short_description: Optional[str] = Field(None, min_length=10, max_length=500)
    price: Optional[Decimal] = Field(None, gt=0)
    compare_at_price: Optional[Decimal] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)
    images: Optional[List[ProductImage]] = None
    ingredients: Optional[List[str]] = None
    benefits: Optional[List[str]] = None
    usage_instructions: Optional[str] = None
    nutrition_info: Optional[NutritionInfo] = None
    is_active: Optional[bool] = None

    @validator('price', 'compare_at_price')
    def validate_price_precision(cls, v):
        if v is not None and v.as_tuple().exponent < -2:
            raise ValueError('Price cannot have more than 2 decimal places')
        return v


class Product(ProductBase):
    """Complete product schema with database fields"""
    model_config = ConfigDict(from_attributes=True)
    
    uid: UUID = Field(default_factory=uuid4)
    quantity: int = Field(..., ge=0)
    is_active: bool = True
    views: int = Field(default=0, ge=0)
    sales_count: int = Field(default=0, ge=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class ProductResponse(BaseModel):
    """Product response schema"""
    uid: UUID
    name: str
    description: str
    short_description: str
    category: ProductCategory
    price: Decimal
    compare_at_price: Optional[Decimal]
    quantity: int
    images: List[ProductImage]
    ingredients: List[str]
    benefits: List[str]
    usage_instructions: str
    nutrition_info: Optional[NutritionInfo]
    weight: str
    is_preservative_free: bool
    is_active: bool
    views: int
    sales_count: int
    created_at: datetime
    updated_at: datetime
    seo_title: Optional[str]
    seo_description: Optional[str]


class ProductListResponse(BaseModel):
    """Response for product list with pagination"""
    data: List[ProductResponse]
    total: int
    page: int
    limit: int
    total_pages: int
