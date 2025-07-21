# Dbanyan Group Backend - Order API Routes
# Implementing project_context.md Section 2.4: Cart & Checkout Flow
# FR4.1-FR4.5: Complete checkout with Razorpay integration

from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from db import get_database
from models import Order, OrderCreate, OrderStatus, ResponseModel
from services import OrderService

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("/create")
async def create_order(
    order_data: OrderCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Create order with Razorpay integration - FR4.4
    Returns order and Razorpay details for frontend payment
    """
    try:
        order_service = OrderService(db)
        result = await order_service.create_order(order_data)
        
        if not result["success"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result["message"]
            )
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create order: {str(e)}"
        )


@router.post("/create-cod")
async def create_cod_order(
    order_data: OrderCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Create Cash on Delivery order - FR4.4
    Bypasses Razorpay integration for COD orders
    """
    try:
        order_service = OrderService(db)
        result = await order_service.create_cod_order(order_data)
        
        if not result["success"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result["message"]
            )
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create COD order: {str(e)}"
        )


@router.post("/confirm-payment")
async def confirm_payment(
    payment_data: dict
):
    """
    Confirm payment after Razorpay success - FR4.5
    Updates order status and decrements inventory
    """
    try:
        # Validate required fields
        required_fields = ["razorpay_order_id", "razorpay_payment_id", "razorpay_signature"]
        for field in required_fields:
            if field not in payment_data:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Missing required field: {field}"
                )
        
        order_service = OrderService(db)
        result = await order_service.confirm_payment(payment_data)
        
        if not result["success"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result["message"]
            )
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to confirm payment: {str(e)}"
        )


@router.get("/{order_uid}", response_model=Order)
async def get_order(
    order_uid: UUID,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get order by UID
    """
    try:
        order_service = OrderService(db)
        order = await order_service.get_order_by_uid(order_uid)
        
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found"
            )
        
        return order
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch order: {str(e)}"
        )


@router.get("/customer/{email}", response_model=List[Order])
async def get_customer_orders(
    email: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get all orders for a customer email
    """
    try:
        order_service = OrderService(db)
        orders = await order_service.get_orders_by_email(email)
        return orders
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch customer orders: {str(e)}"
        )


@router.patch("/{order_uid}/status")
async def update_order_status(
    order_uid: UUID,
    status_data: dict,  # {"status": "shipped", "tracking_number": "ABC123"}
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Update order status and tracking (Admin only - will add auth later)
    """
    try:
        if "status" not in status_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Status is required"
            )
        
        order_service = OrderService(db)
        success = await order_service.update_order_status(
            order_uid,
            OrderStatus(status_data["status"]),
            status_data.get("tracking_number")
        )
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found"
            )
        
        return ResponseModel(
            success=True,
            message="Order status updated successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update order status: {str(e)}"
        )


@router.get("/admin/all", response_model=List[Order])
async def get_all_orders_admin(
    skip: int = 0,
    limit: int = 100,
    status_filter: Optional[str] = None,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get all orders for admin dashboard
    TODO: Add admin authentication middleware
    """
    try:
        order_service = OrderService(db)
        orders = await order_service.get_all_orders_admin(skip, limit, status_filter)
        return orders
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch orders: {str(e)}"
        )


@router.get("/admin/stats")
async def get_order_stats_admin(
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get order statistics for admin dashboard
    TODO: Add admin authentication middleware
    """
    try:
        order_service = OrderService(db)
        stats = await order_service.get_order_stats()
        return stats
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch order stats: {str(e)}"
        )
