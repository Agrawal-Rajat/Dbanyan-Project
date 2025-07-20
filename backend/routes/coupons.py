# Dbanyan Group Backend - Coupon API Routes
# Implementing project_context.md Section 2.4: Coupon functionality - FR4.3

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from decimal import Decimal

from db import get_database
from models import CouponCreate, Coupon, ResponseModel
from services import CouponService

router = APIRouter(prefix="/coupons", tags=["coupons"])


@router.post("/validate")
async def validate_coupon(
    validation_data: dict,  # {"code": "SAVE10", "order_amount": 500.00}
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Validate coupon code for checkout - FR4.3
    Fast validation for real-time feedback
    """
    try:
        if "code" not in validation_data or "order_amount" not in validation_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Code and order_amount are required"
            )
        
        coupon_service = CouponService(db)
        result = await coupon_service.apply_coupon(
            validation_data["code"],
            Decimal(str(validation_data["order_amount"]))
        )
        
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to validate coupon: {str(e)}"
        )


@router.post("/", response_model=Coupon, status_code=status.HTTP_201_CREATED)
async def create_coupon(
    coupon_data: CouponCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Create new coupon (Admin only - will add auth later)
    """
    try:
        coupon_service = CouponService(db)
        return await coupon_service.create_coupon(coupon_data)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create coupon: {str(e)}"
        )
