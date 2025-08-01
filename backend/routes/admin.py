# Admin Routes - Dbanyan Group Backend
# Admin dashboard and analytics endpoints

from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from datetime import datetime, timedelta
from decimal import Decimal
from motor.motor_asyncio import AsyncIOMotorDatabase

from models.admin import AdminStats, TopProduct, RecentOrder, DashboardOverview, AnalyticsData
from models.user import User
from services.auth_service import get_current_admin_user
from services.admin_service import AdminService
from db import get_database

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/stats", response_model=AdminStats)
async def get_admin_stats(
    period: str = Query("7d", description="Period: 7d, 30d, 90d, 1y"),
    current_user: User = Depends(get_current_admin_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get overall admin statistics for dashboard"""
    try:
        admin_service = AdminService(db)
        stats = await admin_service.get_admin_stats(period)
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/dashboard", response_model=DashboardOverview)
async def get_dashboard_overview(
    current_user: User = Depends(get_current_admin_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get complete dashboard overview"""
    try:
        admin_service = AdminService(db)
        overview = await admin_service.get_dashboard_overview()
        return overview
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/analytics", response_model=AnalyticsData)
async def get_analytics_data(
    period: str = Query("30d", description="Period: 7d, 30d, 90d, 1y"),
    current_user: User = Depends(get_current_admin_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get detailed analytics data"""
    try:
        admin_service = AdminService(db)
        analytics = await admin_service.get_analytics_data(period)
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/top-products")
async def get_top_products(
    limit: int = Query(10, le=50),
    period: str = Query("30d", description="Period: 7d, 30d, 90d, 1y"),
    current_user: User = Depends(get_current_admin_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get top selling products"""
    try:
        admin_service = AdminService(db)
        top_products = await admin_service.get_top_products(limit, period)
        return {"data": top_products}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/recent-orders")
async def get_recent_orders(
    limit: int = Query(10, le=50),
    current_user: User = Depends(get_current_admin_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get recent orders for admin dashboard"""
    try:
        admin_service = AdminService(db)
        recent_orders = await admin_service.get_recent_orders(limit)
        return {"data": recent_orders}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/sales-report")
async def get_sales_report(
    period: str = Query("30d", description="Period: 7d, 30d, 90d, 1y"),
    current_user: User = Depends(get_current_admin_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get detailed sales report"""
    try:
        admin_service = AdminService(db)
        report = await admin_service.get_sales_report(period)
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
