# Admin Models - Dbanyan Group Backend
# All admin dashboard related Pydantic models

from datetime import datetime
from typing import Optional, List, Dict, Any
from uuid import UUID
from decimal import Decimal
from pydantic import BaseModel, Field


class AdminStats(BaseModel):
    """Overall admin statistics"""
    total_revenue: Decimal
    total_orders: int
    total_products: int
    total_customers: int
    revenue_change: Optional[float] = None  # Percentage change
    orders_change: Optional[float] = None
    products_change: Optional[float] = None
    customers_change: Optional[float] = None


class TopProduct(BaseModel):
    """Top selling product for admin dashboard"""
    uid: UUID
    name: str
    price: Decimal
    sales_count: int
    views: int
    revenue: Decimal


class RecentOrder(BaseModel):
    """Recent order summary for admin dashboard"""
    uid: UUID
    customer_email: str
    customer_name: str
    total_amount: Decimal
    status: str
    payment_status: str
    created_at: datetime


class DashboardOverview(BaseModel):
    """Complete dashboard overview"""
    stats: AdminStats
    top_products: List[TopProduct]
    recent_orders: List[RecentOrder]
    monthly_revenue: List[Dict[str, Any]]  # Chart data
    order_status_distribution: Dict[str, int]


class SalesReport(BaseModel):
    """Sales report for specific period"""
    period: str
    total_revenue: Decimal
    total_orders: int
    average_order_value: Decimal
    top_products: List[TopProduct]
    daily_sales: List[Dict[str, Any]]


class AnalyticsData(BaseModel):
    """Analytics data for admin dashboard"""
    conversion_rate: float
    average_order_value: Decimal
    customer_lifetime_value: Decimal
    bounce_rate: float
    return_customer_rate: float
    monthly_growth_rate: float
