# Dbanyan Group Backend - API Routes Index
# Centralized router configuration

from fastapi import APIRouter
from .products import router as products_router
from .orders import router as orders_router
from .newsletter import router as newsletter_router
from .coupons import router as coupons_router
from .auth import router as auth_router

# Create main API router
api_router = APIRouter()

# Include all route modules
api_router.include_router(auth_router)
api_router.include_router(products_router)
api_router.include_router(orders_router)
api_router.include_router(newsletter_router)
api_router.include_router(coupons_router)

__all__ = ["api_router"]
