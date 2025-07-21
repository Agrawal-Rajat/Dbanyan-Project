# Dbanyan Group Backend - Coupon Service
# Implementing project_context.md Section 2.4: Coupon code functionality - FR4.3

import logging
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime
from decimal import Decimal

from motor.motor_asyncio import AsyncIOMotorDatabase
from models import Coupon, CouponCreate, CouponType

logger = logging.getLogger(__name__)


class CouponService:
    """Business logic for coupon management"""
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.coupons
    
    async def create_coupon(self, coupon_data: CouponCreate) -> Coupon:
        """Create a new coupon"""
        try:
            coupon = Coupon(**coupon_data.model_dump())
            
            await self.collection.insert_one(coupon.model_dump(mode='json'))
            
            logger.info(f"Coupon created: {coupon.code}")
            return coupon
            
        except Exception as e:
            logger.error(f"Error creating coupon: {e}")
            raise
    
    async def get_coupon_by_code(self, code: str) -> Optional[Coupon]:
        """Get coupon by code"""
        try:
            coupon_doc = await self.collection.find_one({"code": code.upper()})
            if coupon_doc:
                coupon_doc['uid'] = UUID(coupon_doc['uid'])
                return Coupon(**coupon_doc)
            return None
            
        except Exception as e:
            logger.error(f"Error fetching coupon {code}: {e}")
            raise
    
    async def validate_coupon(self, code: str, order_amount: Decimal) -> Dict[str, Any]:
        """Validate coupon against order amount"""
        try:
            coupon = await self.get_coupon_by_code(code)
            
            if not coupon:
                return {
                    "valid": False,
                    "message": "Coupon not found"
                }
            
            # Check if coupon is active
            if not coupon.is_active:
                return {
                    "valid": False,
                    "message": "Coupon is not active"
                }
            
            # Check expiry
            if coupon.expires_at < datetime.utcnow():
                return {
                    "valid": False,
                    "message": "Coupon has expired"
                }
            
            # Check minimum order amount
            if order_amount < coupon.minimum_order_amount:
                return {
                    "valid": False,
                    "message": f"Minimum order amount is ₹{coupon.minimum_order_amount}"
                }
            
            # Check usage limit
            if coupon.usage_limit and coupon.usage_count >= coupon.usage_limit:
                return {
                    "valid": False,
                    "message": "Coupon usage limit reached"
                }
            
            return {
                "valid": True,
                "coupon": coupon,
                "message": "Coupon is valid"
            }
            
        except Exception as e:
            logger.error(f"Error validating coupon {code}: {e}")
            raise
    
    async def apply_coupon(self, code: str, order_amount: Decimal) -> Dict[str, Any]:
        """Apply coupon and calculate discount"""
        try:
            validation = await self.validate_coupon(code, order_amount)
            
            if not validation["valid"]:
                return validation
            
            coupon = validation["coupon"]
            
            # Calculate discount amount
            if coupon.coupon_type == CouponType.PERCENTAGE:
                discount_amount = order_amount * (coupon.value / Decimal('100'))
            else:  # FIXED_AMOUNT
                discount_amount = coupon.value
            
            # Apply maximum discount limit if set
            if coupon.maximum_discount_amount and discount_amount > coupon.maximum_discount_amount:
                discount_amount = coupon.maximum_discount_amount
            
            # Ensure discount doesn't exceed order amount
            if discount_amount > order_amount:
                discount_amount = order_amount
            
            return {
                "valid": True,
                "discount_amount": discount_amount,
                "coupon": coupon,
                "message": f"Discount of ₹{discount_amount} applied"
            }
            
        except Exception as e:
            logger.error(f"Error applying coupon {code}: {e}")
            raise
    
    async def increment_usage_count(self, code: str) -> bool:
        """Increment coupon usage count"""
        try:
            result = await self.collection.update_one(
                {"code": code.upper()},
                {"$inc": {"usage_count": 1}}
            )
            return result.modified_count > 0
            
        except Exception as e:
            logger.error(f"Error incrementing usage count for {code}: {e}")
            raise
    
    async def deactivate_coupon(self, uid: UUID) -> bool:
        """Deactivate a coupon"""
        try:
            result = await self.collection.update_one(
                {"uid": str(uid)},
                {"$set": {"is_active": False}}
            )
            return result.modified_count > 0
            
        except Exception as e:
            logger.error(f"Error deactivating coupon {uid}: {e}")
            raise
