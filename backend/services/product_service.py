# Dbanyan Group Backend - Product Service
# Implementing project_context.md Section 2.2: Products & Product Details
# FR3.1-FR3.4: Full Inventory Management System

import logging
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime
from decimal import Decimal

from motor.motor_asyncio import AsyncIOMotorDatabase
from models import (
    Product, ProductCreate, ProductUpdate, ProductCategory,
    ResponseModel, PaginatedResponse
)

logger = logging.getLogger(__name__)


class ProductService:
    """Business logic for product management"""
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.products
    
    async def create_product(self, product_data: ProductCreate) -> Product:
        """Create a new product"""
        try:
            # Convert to product model
            product = Product(**product_data.model_dump())
            
            # Insert into database
            result = await self.collection.insert_one(
                product.model_dump(mode='json')
            )
            
            if result.inserted_id:
                logger.info(f"Product created: {product.uid}")
                return product
            else:
                raise Exception("Failed to create product")
                
        except Exception as e:
            logger.error(f"Error creating product: {e}")
            raise
    
    async def get_product_by_uid(self, uid: UUID) -> Optional[Product]:
        """Get product by UID"""
        try:
            product_doc = await self.collection.find_one({"uid": str(uid)})
            if product_doc:
                # Convert string UID back to UUID for Pydantic
                product_doc['uid'] = UUID(product_doc['uid'])
                return Product(**product_doc)
            return None
            
        except Exception as e:
            logger.error(f"Error fetching product {uid}: {e}")
            raise
    
    async def get_all_products(
        self,
        category: Optional[ProductCategory] = None,
        is_active: bool = True,
        page: int = 1,
        per_page: int = 10,
        sort_by: str = "created_at",
        sort_order: int = -1
    ) -> PaginatedResponse:
        """Get all products with filtering and pagination"""
        try:
            # Build query filter
            query_filter = {"is_active": is_active}
            if category:
                query_filter["category"] = category.value
            
            # Calculate pagination
            skip = (page - 1) * per_page
            
            # Get total count
            total = await self.collection.count_documents(query_filter)
            
            # Get products
            cursor = self.collection.find(query_filter).sort(sort_by, sort_order).skip(skip).limit(per_page)
            products_docs = await cursor.to_list(length=per_page)
            
            # Convert to Pydantic models
            products = []
            for doc in products_docs:
                # Remove MongoDB ObjectId
                if '_id' in doc:
                    del doc['_id']
                doc['uid'] = UUID(doc['uid'])
                products.append(Product(**doc))
            
            # Calculate pages
            pages = (total + per_page - 1) // per_page
            
            return PaginatedResponse(
                success=True,
                message="Products retrieved successfully",
                data=products,
                total=total,
                page=page,
                per_page=per_page,
                pages=pages
            )
            
        except Exception as e:
            logger.error(f"Error fetching products: {e}")
            raise
    
    async def update_product(self, uid: UUID, update_data: ProductUpdate) -> Optional[Product]:
        """Update product by UID"""
        try:
            # Remove None values
            update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
            update_dict["updated_at"] = datetime.utcnow()
            
            # Update in database
            result = await self.collection.update_one(
                {"uid": str(uid)},
                {"$set": update_dict}
            )
            
            if result.modified_count > 0:
                # Return updated product
                return await self.get_product_by_uid(uid)
            return None
            
        except Exception as e:
            logger.error(f"Error updating product {uid}: {e}")
            raise
    
    async def delete_product(self, uid: UUID) -> bool:
        """Soft delete product (set is_active to False)"""
        try:
            result = await self.collection.update_one(
                {"uid": str(uid)},
                {"$set": {"is_active": False, "updated_at": datetime.utcnow()}}
            )
            return result.modified_count > 0
            
        except Exception as e:
            logger.error(f"Error deleting product {uid}: {e}")
            raise
    
    async def update_product_quantity(self, uid: UUID, new_quantity: int) -> bool:
        """Update product inventory quantity - FR3.4"""
        try:
            result = await self.collection.update_one(
                {"uid": str(uid)},
                {"$set": {"quantity": new_quantity, "updated_at": datetime.utcnow()}}
            )
            return result.modified_count > 0
            
        except Exception as e:
            logger.error(f"Error updating product quantity {uid}: {e}")
            raise
    
    async def decrement_product_quantities(self, items: List[Dict[str, Any]]) -> bool:
        """
        Atomically decrement product quantities after successful payment - FR3.2
        items: [{"product_uid": UUID, "quantity": int}, ...]
        """
        try:
            # Use MongoDB transactions for atomicity
            async with await self.db.client.start_session() as session:
                async with session.start_transaction():
                    for item in items:
                        product_uid = item["product_uid"]
                        quantity_to_decrement = item["quantity"]
                        
                        # Check current quantity first - FR3.3
                        product = await self.get_product_by_uid(UUID(product_uid))
                        if not product or product.quantity < quantity_to_decrement:
                            await session.abort_transaction()
                            logger.error(f"Insufficient stock for product {product_uid}")
                            return False
                        
                        # Decrement quantity
                        result = await self.collection.update_one(
                            {"uid": str(product_uid)},
                            {
                                "$inc": {"quantity": -quantity_to_decrement},
                                "$set": {"updated_at": datetime.utcnow()}
                            },
                            session=session
                        )
                        
                        if result.modified_count == 0:
                            await session.abort_transaction()
                            logger.error(f"Failed to update quantity for product {product_uid}")
                            return False
                    
                    # All updates successful
                    await session.commit_transaction()
                    logger.info("Product quantities decremented successfully")
                    return True
                    
        except Exception as e:
            logger.error(f"Error decrementing product quantities: {e}")
            return False
    
    async def check_stock_availability(self, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Check if requested quantities are available in stock - FR3.3
        items: [{"product_uid": UUID, "quantity": int}, ...]
        """
        try:
            availability = {"available": True, "issues": []}
            
            for item in items:
                product_uid = item["product_uid"]
                requested_quantity = item["quantity"]
                
                product = await self.get_product_by_uid(UUID(product_uid))
                if not product:
                    availability["available"] = False
                    availability["issues"].append({
                        "product_uid": product_uid,
                        "issue": "Product not found"
                    })
                elif product.quantity < requested_quantity:
                    availability["available"] = False
                    availability["issues"].append({
                        "product_uid": product_uid,
                        "issue": f"Insufficient stock. Available: {product.quantity}, Requested: {requested_quantity}"
                    })
                elif not product.is_active:
                    availability["available"] = False
                    availability["issues"].append({
                        "product_uid": product_uid,
                        "issue": "Product is not active"
                    })
            
            return availability
            
        except Exception as e:
            logger.error(f"Error checking stock availability: {e}")
            raise
    
    async def search_products(self, query: str, page: int = 1, per_page: int = 10) -> PaginatedResponse:
        """Search products by name and description"""
        try:
            # MongoDB text search
            search_filter = {
                "$text": {"$search": query},
                "is_active": True
            }
            
            # Calculate pagination
            skip = (page - 1) * per_page
            
            # Get total count
            total = await self.collection.count_documents(search_filter)
            
            # Get products with text score sorting
            cursor = self.collection.find(
                search_filter,
                {"score": {"$meta": "textScore"}}
            ).sort([("score", {"$meta": "textScore"})]).skip(skip).limit(per_page)
            
            products_docs = await cursor.to_list(length=per_page)
            
            # Convert to Pydantic models
            products = []
            for doc in products_docs:
                doc['uid'] = UUID(doc['uid'])
                # Remove the score field for Pydantic
                doc.pop('score', None)
                products.append(Product(**doc))
            
            # Calculate pages
            pages = (total + per_page - 1) // per_page
            
            return PaginatedResponse(
                success=True,
                message="Search results retrieved successfully",
                data=products,
                total=total,
                page=page,
                per_page=per_page,
                pages=pages
            )
            
        except Exception as e:
            logger.error(f"Error searching products: {e}")
            raise
    
    async def get_featured_products(self, limit: int = 4) -> List[Product]:
        """Get featured products for homepage - project_context.md FR1.5"""
        try:
            cursor = self.collection.find(
                {"is_active": True, "quantity": {"$gt": 0}}
            ).sort("created_at", -1).limit(limit)
            
            products_docs = await cursor.to_list(length=limit)
            
            products = []
            for doc in products_docs:
                doc['uid'] = UUID(doc['uid'])
                products.append(Product(**doc))
            
            return products
            
        except Exception as e:
            logger.error(f"Error fetching featured products: {e}")
            raise
