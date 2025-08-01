# Models module - Central import for all data models

from .base import (
    ResponseModel, PaginatedResponse, UserLogin, Token, 
    PasswordResetRequest, PasswordResetConfirm, ChangePasswordRequest,
    EmailVerificationRequest, SubscriberCreate
)
from .product import Product, ProductCreate, ProductUpdate, ProductCategory
from .user import User, UserCreate, UserResponse, UserRole, UserStats
from .order import Order, OrderCreate, OrderItem, OrderResponse, OrderStatus, PaymentStatus
from .coupon import Coupon, CouponCreate, CouponResponse, CouponType  
from .newsletter import NewsletterSubscriber, NewsletterSubscribe, NewsletterUnsubscribe
from .admin import AdminStats, TopProduct, RecentOrder, DashboardOverview, SalesReport, AnalyticsData

__all__ = [
    # Base models
    "ResponseModel", "PaginatedResponse", "UserLogin", "Token",
    "PasswordResetRequest", "PasswordResetConfirm", "ChangePasswordRequest",
    "EmailVerificationRequest", "SubscriberCreate",
    # Product models
    "Product", "ProductCreate", "ProductUpdate", "ProductCategory",
    # User models  
    "User", "UserCreate", "UserResponse", "UserRole", "UserStats",
    # Order models
    "Order", "OrderCreate", "OrderItem", "OrderResponse", "OrderStatus", "PaymentStatus",
    # Coupon models
    "Coupon", "CouponCreate", "CouponResponse", "CouponType",
    # Newsletter models
    "NewsletterSubscriber", "NewsletterSubscribe", "NewsletterUnsubscribe",
    # Admin models
    "AdminStats", "TopProduct", "RecentOrder", "DashboardOverview", "SalesReport", "AnalyticsData"
]
