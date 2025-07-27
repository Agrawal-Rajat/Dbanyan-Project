# Dbanyan Group Backend - Product API Routes
# Implementing project_context.md Section 2.2: Products & Product Details
# Fast and efficient API endpoints for optimal performance

from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from db import get_database
from models import (
    Product, ProductCreate, ProductUpdate, ProductCategory,
    ResponseModel, PaginatedResponse
)
from services import ProductService

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=PaginatedResponse)
async def get_products(
    category: Optional[ProductCategory] = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    sort_by: str = Query("created_at", regex="^(name|price|created_at|updated_at)$"),
    sort_order: int = Query(-1, ge=-1, le=1),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get all products with filtering, pagination, and sorting
    Optimized for fast loading on frontend
    """
    try:
        product_service = ProductService(db)
        return await product_service.get_all_products(
            category=category,
            page=page,
            per_page=per_page,
            sort_by=sort_by,
            sort_order=sort_order
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch products: {str(e)}"
        )


@router.get("/featured", response_model=List[Product])
async def get_featured_products(
    limit: int = Query(4, ge=1, le=10),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get featured products for homepage - FR1.5
    Fast endpoint for landing page product showcase
    """
    try:
        product_service = ProductService(db)
        products = await product_service.get_featured_products(limit=limit)
        return products
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch featured products: {str(e)}"
        )


@router.get("/search", response_model=PaginatedResponse)
async def search_products(
    q: str = Query(..., min_length=1, max_length=100),
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Search products by name and description
    Fast text search with MongoDB indexes
    """
    try:
        product_service = ProductService(db)
        return await product_service.search_products(
            query=q,
            page=page,
            per_page=per_page
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Search failed: {str(e)}"
        )


@router.get("/{product_uid}", response_model=Product)
async def get_product(
    product_uid: UUID,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get single product by UID - FR2.1, FR2.2
    Optimized for product detail page
    """
    try:
        product_service = ProductService(db)
        product = await product_service.get_product_by_uid(product_uid)
        
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        
        return product
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch product: {str(e)}"
        )


@router.post("/", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: ProductCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Create new product (Admin only - will add auth later)
    """
    try:
        product_service = ProductService(db)
        return await product_service.create_product(product_data)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create product: {str(e)}"
        )


@router.put("/{product_uid}", response_model=Product)
async def update_product(
    product_uid: UUID,
    update_data: ProductUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Update product by UID (Admin only - will add auth later)
    """
    try:
        product_service = ProductService(db)
        product = await product_service.update_product(product_uid, update_data)
        
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        
        return product
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update product: {str(e)}"
        )


@router.patch("/{product_uid}/quantity")
async def update_product_quantity(
    product_uid: UUID,
    new_quantity: int = Query(..., ge=0),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Update product inventory quantity - FR3.4
    (Admin only - will add auth later)
    """
    try:
        product_service = ProductService(db)
        success = await product_service.update_product_quantity(product_uid, new_quantity)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        
        return ResponseModel(
            success=True,
            message=f"Quantity updated to {new_quantity}"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update quantity: {str(e)}"
        )


@router.post("/check-stock")
async def check_stock_availability(
    items: List[dict],  # [{"product_uid": "...", "quantity": 1}, ...]
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Check stock availability for multiple items - FR3.3
    Fast endpoint for cart validation
    """
    try:
        product_service = ProductService(db)
        availability = await product_service.check_stock_availability(items)
        return availability
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to check stock: {str(e)}"
        )


@router.delete("/{product_uid}")
async def delete_product(
    product_uid: UUID,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Soft delete product (Admin only - will add auth later)
    """
    try:
        product_service = ProductService(db)
        success = await product_service.delete_product(product_uid)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        
        return ResponseModel(
            success=True,
            message="Product deleted successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete product: {str(e)}"
        )
