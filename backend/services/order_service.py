# Dbanyan Group Backend - Order Service
# Implementing project_context.md Section 2.4: Cart & Checkout Flow
# FR4.1-FR4.5: Complete order management with Razorpay integration

import logging
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime
from decimal import Decimal
import razorpay

from motor.motor_asyncio import AsyncIOMotorDatabase
from models import (
    Order, OrderCreate, OrderStatus, PaymentStatus, OrderItem,
    ResponseModel
)
from services.product_service import ProductService
from config import settings

logger = logging.getLogger(__name__)


class OrderService:
    """Business logic for order management"""
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.orders
        self.product_service = ProductService(db)
        
        # Initialize Razorpay client
        self.razorpay_client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )
    
    async def create_order(self, order_data: OrderCreate) -> Dict[str, Any]:
        """
        Create order with Razorpay integration - FR4.4
        Returns order details and Razorpay order for frontend
        """
        try:
            # 1. Validate stock availability - FR3.3
            items_for_stock_check = [
                {"product_uid": str(item.product_uid), "quantity": item.quantity}
                for item in order_data.items
            ]
            
            stock_check = await self.product_service.check_stock_availability(items_for_stock_check)
            if not stock_check["available"]:
                return {
                    "success": False,
                    "message": "Stock unavailable",
                    "issues": stock_check["issues"]
                }
            
            # 2. Calculate pricing
            subtotal = sum(item.total_price for item in order_data.items)
            discount_amount = Decimal('0.00')
            
            # Apply coupon if provided - FR4.3
            if order_data.coupon_code:
                coupon_service = CouponService(self.db)
                discount_result = await coupon_service.apply_coupon(
                    order_data.coupon_code, subtotal
                )
                if discount_result["valid"]:
                    discount_amount = discount_result["discount_amount"]
            
            # Calculate final amounts
            shipping_cost = self._calculate_shipping_cost(subtotal)
            tax_amount = self._calculate_tax(subtotal - discount_amount)
            total_amount = subtotal - discount_amount + shipping_cost + tax_amount
            
            # 3. Create order object
            order = Order(
                customer_email=order_data.customer_email,
                items=order_data.items,
                shipping_address=order_data.shipping_address,
                subtotal=subtotal,
                discount_amount=discount_amount,
                shipping_cost=shipping_cost,
                tax_amount=tax_amount,
                total_amount=total_amount,
                coupon_code=order_data.coupon_code,
                notes=order_data.notes
            )
            
            # 4. Create Razorpay order
            razorpay_order_data = {
                "amount": int(total_amount * 100),  # Razorpay expects paise
                "currency": "INR",
                "receipt": str(order.uid),
                "notes": {
                    "customer_email": order_data.customer_email,
                    "order_uid": str(order.uid)
                }
            }
            
            razorpay_order = self.razorpay_client.order.create(razorpay_order_data)
            order.razorpay_order_id = razorpay_order["id"]
            
            # 5. Save order to database
            await self.collection.insert_one(order.model_dump(mode='json'))
            
            logger.info(f"Order created: {order.uid}")
            
            return {
                "success": True,
                "message": "Order created successfully",
                "order": order,
                "razorpay_order": razorpay_order,
                "razorpay_key_id": settings.RAZORPAY_KEY_ID
            }
            
        except Exception as e:
            logger.error(f"Error creating order: {e}")
            return {
                "success": False,
                "message": f"Failed to create order: {str(e)}"
            }
    
    async def create_cod_order(self, order_data: OrderCreate) -> Dict[str, Any]:
        """
        Create Cash on Delivery order - FR4.4
        Bypasses Razorpay integration
        """
        try:
            # 1. Validate stock availability - FR3.3
            items_for_stock_check = [
                {"product_uid": str(item.product_uid), "quantity": item.quantity}
                for item in order_data.items
            ]
            
            stock_check = await self.product_service.check_stock_availability(items_for_stock_check)
            if not stock_check["available"]:
                return {
                    "success": False,
                    "message": "Stock unavailable",
                    "issues": stock_check["issues"]
                }
            
            # 2. Calculate pricing
            subtotal = sum(item.total_price for item in order_data.items)
            discount_amount = Decimal('0.00')
            
            # Apply coupon if provided - FR4.3
            if order_data.coupon_code:
                coupon_service = CouponService(self.db)
                discount_result = await coupon_service.apply_coupon(
                    order_data.coupon_code, subtotal
                )
                if discount_result["valid"]:
                    discount_amount = discount_result["discount_amount"]
            
            # Calculate final amounts
            shipping_cost = self._calculate_shipping_cost(subtotal)
            tax_amount = self._calculate_tax(subtotal - discount_amount)
            total_amount = subtotal - discount_amount + shipping_cost + tax_amount
            
            # 3. Create order object (COD specific)
            order = Order(
                customer_email=order_data.customer_email,
                items=order_data.items,
                shipping_address=order_data.shipping_address,
                subtotal=subtotal,
                discount_amount=discount_amount,
                shipping_cost=shipping_cost,
                tax_amount=tax_amount,
                total_amount=total_amount,
                coupon_code=order_data.coupon_code,
                notes=order_data.notes,
                payment_status=PaymentStatus.PENDING,  # COD is pending until delivery
                status=OrderStatus.CONFIRMED  # COD orders are auto-confirmed
            )
            
            # 4. Save order to database
            await self.collection.insert_one(order.model_dump(mode='json'))
            
            # 5. Decrement product quantities immediately for COD
            items_for_decrement = [
                {"product_uid": str(item.product_uid), "quantity": item.quantity}
                for item in order.items
            ]
            
            decrement_success = await self.product_service.decrement_product_quantities(items_for_decrement)
            if not decrement_success:
                logger.error(f"Failed to decrement quantities for COD order {order.uid}")
            
            logger.info(f"COD Order created: {order.uid}")
            
            return {
                "success": True,
                "message": "COD order created successfully",
                "order_uid": str(order.uid),
                "order": order
            }
            
        except Exception as e:
            logger.error(f"Error creating COD order: {e}")
            return {
                "success": False,
                "message": f"Failed to create COD order: {str(e)}"
            }
    
    async def confirm_payment(self, payment_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Confirm payment and update order status - FR4.5
        payment_data: {
            "razorpay_order_id": str,
            "razorpay_payment_id": str,
            "razorpay_signature": str
        }
        """
        try:
            # 1. Verify payment signature
            if not self._verify_razorpay_signature(payment_data):
                return {
                    "success": False,
                    "message": "Payment verification failed"
                }
            
            # 2. Find order by Razorpay order ID
            order_doc = await self.collection.find_one({
                "razorpay_order_id": payment_data["razorpay_order_id"]
            })
            
            if not order_doc:
                return {
                    "success": False,
                    "message": "Order not found"
                }
            
            # 3. Update order status
            update_data = {
                "razorpay_payment_id": payment_data["razorpay_payment_id"],
                "payment_status": PaymentStatus.COMPLETED.value,
                "status": OrderStatus.CONFIRMED.value,
                "confirmed_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            await self.collection.update_one(
                {"razorpay_order_id": payment_data["razorpay_order_id"]},
                {"$set": update_data}
            )
            
            # 4. Decrement product quantities - FR3.2
            order_doc['uid'] = UUID(order_doc['uid'])
            order = Order(**order_doc)
            
            items_for_decrement = [
                {"product_uid": str(item.product_uid), "quantity": item.quantity}
                for item in order.items
            ]
            
            decrement_success = await self.product_service.decrement_product_quantities(items_for_decrement)
            if not decrement_success:
                logger.error(f"Failed to decrement quantities for order {order.uid}")
                # Note: In production, this should trigger a manual review process
            
            logger.info(f"Payment confirmed for order: {order.uid}")
            
            return {
                "success": True,
                "message": "Payment confirmed successfully",
                "order_uid": str(order.uid)
            }
            
        except Exception as e:
            logger.error(f"Error confirming payment: {e}")
            return {
                "success": False,
                "message": f"Failed to confirm payment: {str(e)}"
            }
    
    async def get_order_by_uid(self, uid: UUID) -> Optional[Order]:
        """Get order by UID"""
        try:
            order_doc = await self.collection.find_one({"uid": str(uid)})
            if order_doc:
                order_doc['uid'] = UUID(order_doc['uid'])
                return Order(**order_doc)
            return None
            
        except Exception as e:
            logger.error(f"Error fetching order {uid}: {e}")
            raise
    
    async def get_orders_by_email(self, email: str) -> List[Order]:
        """Get all orders for a customer email"""
        try:
            cursor = self.collection.find(
                {"customer_email": email}
            ).sort("created_at", -1)
            
            orders_docs = await cursor.to_list(length=None)
            
            orders = []
            for doc in orders_docs:
                doc['uid'] = UUID(doc['uid'])
                orders.append(Order(**doc))
            
            return orders
            
        except Exception as e:
            logger.error(f"Error fetching orders for {email}: {e}")
            raise
    
    async def update_order_status(self, uid: UUID, status: OrderStatus, tracking_number: Optional[str] = None) -> bool:
        """Update order status and tracking"""
        try:
            update_data = {
                "status": status.value,
                "updated_at": datetime.utcnow()
            }
            
            if tracking_number:
                update_data["tracking_number"] = tracking_number
            
            if status == OrderStatus.SHIPPED:
                update_data["shipped_at"] = datetime.utcnow()
            elif status == OrderStatus.DELIVERED:
                update_data["delivered_at"] = datetime.utcnow()
            
            result = await self.collection.update_one(
                {"uid": str(uid)},
                {"$set": update_data}
            )
            
            return result.modified_count > 0
            
        except Exception as e:
            logger.error(f"Error updating order status {uid}: {e}")
            raise
    
    def _calculate_shipping_cost(self, subtotal: Decimal) -> Decimal:
        """Calculate shipping cost based on order value"""
        # Free shipping above ₹500
        if subtotal >= Decimal('500.00'):
            return Decimal('0.00')
        else:
            return Decimal('50.00')  # ₹50 shipping fee
    
    def _calculate_tax(self, taxable_amount: Decimal) -> Decimal:
        """Calculate tax (GST 18% for health supplements in India)"""
        return taxable_amount * Decimal('0.18')
    
    def _verify_razorpay_signature(self, payment_data: Dict[str, Any]) -> bool:
        """Verify Razorpay payment signature"""
        try:
            # Create signature verification string
            message = f"{payment_data['razorpay_order_id']}|{payment_data['razorpay_payment_id']}"
            
            # Verify signature using Razorpay utility
            return self.razorpay_client.utility.verify_payment_signature({
                'razorpay_order_id': payment_data['razorpay_order_id'],
                'razorpay_payment_id': payment_data['razorpay_payment_id'],
                'razorpay_signature': payment_data['razorpay_signature']
            })
            
        except Exception as e:
            logger.error(f"Error verifying Razorpay signature: {e}")
            return False


    async def get_all_orders_admin(self, skip: int = 0, limit: int = 100, status_filter: Optional[str] = None) -> List[Order]:
        """Get all orders for admin dashboard"""
        try:
            filter_query = {}
            if status_filter:
                filter_query["status"] = status_filter
            
            cursor = self.collection.find(filter_query).skip(skip).limit(limit).sort("created_at", -1)
            orders = []
            
            async for order_doc in cursor:
                order_doc['uid'] = UUID(order_doc['uid'])
                orders.append(Order(**order_doc))
            
            return orders
        except Exception as e:
            logger.error(f"Error fetching admin orders: {e}")
            return []

    async def get_order_stats(self) -> Dict[str, Any]:
        """Get order statistics for admin dashboard"""
        try:
            # Total orders
            total_orders = await self.collection.count_documents({})
            
            # Orders by status
            status_pipeline = [
                {"$group": {"_id": "$status", "count": {"$sum": 1}}}
            ]
            status_stats = {}
            async for result in self.collection.aggregate(status_pipeline):
                status_stats[result["_id"]] = result["count"]
            
            # Revenue stats
            revenue_pipeline = [
                {"$match": {"payment_status": "completed"}},
                {"$group": {
                    "_id": None,
                    "total_revenue": {"$sum": "$total_amount"},
                    "avg_order_value": {"$avg": "$total_amount"}
                }}
            ]
            revenue_stats = {"total_revenue": 0, "avg_order_value": 0}
            async for result in self.collection.aggregate(revenue_pipeline):
                revenue_stats = {
                    "total_revenue": float(result["total_revenue"]),
                    "avg_order_value": float(result["avg_order_value"])
                }
            
            # Recent orders count
            from datetime import datetime, timedelta
            recent_date = datetime.utcnow() - timedelta(days=7)
            recent_orders = await self.collection.count_documents({
                "created_at": {"$gte": recent_date}
            })
            
            return {
                "total_orders": total_orders,
                "status_distribution": status_stats,
                "total_revenue": revenue_stats["total_revenue"],
                "avg_order_value": revenue_stats["avg_order_value"],
                "recent_orders": recent_orders
            }
            
        except Exception as e:
            logger.error(f"Error fetching order stats: {e}")
            return {
                "total_orders": 0,
                "status_distribution": {},
                "total_revenue": 0,
                "avg_order_value": 0,
                "recent_orders": 0
            }


# Import here to avoid circular imports
from services.coupon_service import CouponService
