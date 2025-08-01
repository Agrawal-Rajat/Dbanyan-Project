# Admin Service - Dbanyan Group Backend
# Business logic for admin dashboard and analytics

from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from decimal import Decimal
from motor.motor_asyncio import AsyncIOMotorDatabase

from models.admin import AdminStats, TopProduct, RecentOrder, DashboardOverview, AnalyticsData, SalesReport
from models.product import Product
from models.order import Order
from models.user import User


class AdminService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.products_collection = db.products
        self.orders_collection = db.orders
        self.users_collection = db.users
        self.newsletter_collection = db.newsletter_subscribers

    async def get_admin_stats(self, period: str = "7d") -> AdminStats:
        """Get overall admin statistics"""
        end_date = datetime.utcnow()
        start_date = self._get_start_date(period, end_date)
        
        # Total revenue
        revenue_pipeline = [
            {"$match": {"created_at": {"$gte": start_date, "$lte": end_date}}},
            {"$group": {"_id": None, "total": {"$sum": "$total_amount"}}}
        ]
        revenue_result = await self.orders_collection.aggregate(revenue_pipeline).to_list(1)
        total_revenue = Decimal(str(revenue_result[0]["total"] if revenue_result else 0))
        
        # Total orders
        total_orders = await self.orders_collection.count_documents({
            "created_at": {"$gte": start_date, "$lte": end_date}
        })
        
        # Total products
        total_products = await self.products_collection.count_documents({"is_active": True})
        
        # Total customers
        total_customers = await self.users_collection.count_documents({"role": "customer"})
        
        # Calculate changes (mock for now)
        revenue_change = 12.5  # Would calculate from previous period
        orders_change = 8.3
        products_change = 2.1
        customers_change = 15.7
        
        return AdminStats(
            total_revenue=total_revenue,
            total_orders=total_orders,
            total_products=total_products,
            total_customers=total_customers,
            revenue_change=revenue_change,
            orders_change=orders_change,
            products_change=products_change,
            customers_change=customers_change
        )

    async def get_top_products(self, limit: int = 10, period: str = "30d") -> List[TopProduct]:
        """Get top selling products"""
        end_date = datetime.utcnow()
        start_date = self._get_start_date(period, end_date)
        
        # Aggregate top products by sales
        pipeline = [
            {"$match": {"created_at": {"$gte": start_date, "$lte": end_date}}},
            {"$unwind": "$items"},
            {"$group": {
                "_id": "$items.product_uid",
                "name": {"$first": "$items.product_name"},
                "sales_count": {"$sum": "$items.quantity"},
                "revenue": {"$sum": "$items.total_price"}
            }},
            {"$sort": {"sales_count": -1}},
            {"$limit": limit}
        ]
        
        results = await self.orders_collection.aggregate(pipeline).to_list(limit)
        
        top_products = []
        for result in results:
            # Get product details
            product = await self.products_collection.find_one({"uid": result["_id"]})
            if product:
                top_products.append(TopProduct(
                    uid=result["_id"],
                    name=result["name"],
                    price=Decimal(str(product.get("price", 0))),
                    sales_count=result["sales_count"],
                    views=product.get("views", 0),
                    revenue=Decimal(str(result["revenue"]))
                ))
        
        return top_products

    async def get_recent_orders(self, limit: int = 10) -> List[RecentOrder]:
        """Get recent orders for dashboard"""
        cursor = self.orders_collection.find().sort("created_at", -1).limit(limit)
        orders = await cursor.to_list(limit)
        
        recent_orders = []
        for order in orders:
            recent_orders.append(RecentOrder(
                uid=order["uid"],
                customer_email=order["customer_email"],
                customer_name=order["shipping_address"]["full_name"],
                total_amount=Decimal(str(order["total_amount"])),
                status=order["status"],
                payment_status=order["payment_status"],
                created_at=order["created_at"]
            ))
        
        return recent_orders

    async def get_dashboard_overview(self) -> DashboardOverview:
        """Get complete dashboard overview"""
        stats = await self.get_admin_stats("30d")
        top_products = await self.get_top_products(5, "30d")
        recent_orders = await self.get_recent_orders(5)
        
        # Mock monthly revenue data (would be calculated from actual data)
        monthly_revenue = [
            {"month": "Jan", "revenue": 45000},
            {"month": "Feb", "revenue": 52000},
            {"month": "Mar", "revenue": 48000},
            {"month": "Apr", "revenue": 61000},
            {"month": "May", "revenue": 55000},
            {"month": "Jun", "revenue": 67000}
        ]
        
        # Mock order status distribution
        order_status_distribution = {
            "pending": 12,
            "confirmed": 8,
            "processing": 15,
            "shipped": 25,
            "delivered": 89,
            "cancelled": 3
        }
        
        return DashboardOverview(
            stats=stats,
            top_products=top_products,
            recent_orders=recent_orders,
            monthly_revenue=monthly_revenue,
            order_status_distribution=order_status_distribution
        )

    async def get_analytics_data(self, period: str = "30d") -> AnalyticsData:
        """Get detailed analytics data"""
        # Mock analytics data (would be calculated from actual data)
        return AnalyticsData(
            conversion_rate=68.5,
            average_order_value=Decimal("293.50"),
            customer_lifetime_value=Decimal("850.00"),
            bounce_rate=32.1,
            return_customer_rate=45.2,
            monthly_growth_rate=12.3
        )

    async def get_sales_report(self, period: str = "30d") -> SalesReport:
        """Get detailed sales report"""
        end_date = datetime.utcnow()
        start_date = self._get_start_date(period, end_date)
        
        # Calculate basic metrics
        stats = await self.get_admin_stats(period)
        top_products = await self.get_top_products(10, period)
        
        # Mock daily sales data
        daily_sales = []
        current_date = start_date
        while current_date <= end_date:
            daily_sales.append({
                "date": current_date.strftime("%Y-%m-%d"),
                "revenue": float(stats.total_revenue / 30),  # Mock even distribution
                "orders": stats.total_orders // 30
            })
            current_date += timedelta(days=1)
        
        return SalesReport(
            period=period,
            total_revenue=stats.total_revenue,
            total_orders=stats.total_orders,
            average_order_value=stats.total_revenue / max(stats.total_orders, 1),
            top_products=top_products,
            daily_sales=daily_sales
        )

    def _get_start_date(self, period: str, end_date: datetime) -> datetime:
        """Get start date based on period"""
        if period == "7d":
            return end_date - timedelta(days=7)
        elif period == "30d":
            return end_date - timedelta(days=30)
        elif period == "90d":
            return end_date - timedelta(days=90)
        elif period == "1y":
            return end_date - timedelta(days=365)
        else:
            return end_date - timedelta(days=7)
