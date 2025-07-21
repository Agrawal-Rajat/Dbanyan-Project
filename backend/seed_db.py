# Dbanyan Group Backend - Database Seeder
# Populate database with initial products and sample data

import asyncio
import os
from decimal import Decimal
from datetime import datetime, timedelta

# Add the backend directory to Python path
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from motor.motor_asyncio import AsyncIOMotorClient
from models import (
    Product, ProductCategory, ProductImage, NutritionInfo,
    CouponCreate, CouponType
)
from services import ProductService, CouponService


async def seed_database():
    """Seed database with initial data"""
    
    # Database connection
    MONGODB_URI = "mongodb://localhost:27017"  # Update with your MongoDB URI
    DB_NAME = "dbanyan"
    
    client = AsyncIOMotorClient(MONGODB_URI)
    db = client[DB_NAME]
    
    try:
        print("🌱 Starting database seeding...")
        
        # Initialize services
        product_service = ProductService(db)
        coupon_service = CouponService(db)
        
        # Sample product data
        products_data = [
            {
                "name": "Premium Moringa Powder",
                "description": "Pure, organic Moringa powder packed with essential nutrients. Rich in vitamins A, C, and E, calcium, potassium, and protein. Perfect for smoothies, teas, and cooking. Our Moringa is carefully dried and ground to preserve maximum nutritional value.",
                "short_description": "Pure organic Moringa powder with 90+ nutrients",
                "category": ProductCategory.POWDER,
                "price": Decimal("299.00"),
                "compare_at_price": Decimal("399.00"),
                "quantity": 50,
                "images": [
                    ProductImage(
                        url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
                        alt_text="Premium Moringa Powder",
                        is_primary=True
                    ),
                    ProductImage(
                        url="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
                        alt_text="Moringa Powder Packaging",
                        is_primary=False
                    )
                ],
                "ingredients": [
                    "100% Pure Moringa Oleifera Leaf Powder",
                    "No Additives",
                    "No Preservatives",
                    "No Artificial Colors"
                ],
                "benefits": [
                    "Rich in Vitamin C (7x more than oranges)",
                    "High in Calcium (4x more than milk)",
                    "Contains all 9 essential amino acids",
                    "Powerful antioxidant properties",
                    "Supports immune system",
                    "Natural energy booster"
                ],
                "usage_instructions": "Mix 1-2 teaspoons (3-6g) with water, juice, smoothies, or food. Start with smaller amounts and gradually increase. Best taken with meals.",
                "nutrition_info": NutritionInfo(
                    serving_size="1 teaspoon (3g)",
                    calories=9,
                    protein="2.1g",
                    fiber="1.2g",
                    vitamin_c="51mg",
                    calcium="61mg",
                    iron="3.2mg"
                ),
                "weight": "100g",
                "seo_title": "Premium Moringa Powder - 100% Organic | Dbanyan Group",
                "seo_description": "Buy premium organic Moringa powder rich in 90+ nutrients. No preservatives, pure quality. Free shipping on orders above ₹500."
            },
            {
                "name": "Moringa Capsules (60 Count)",
                "description": "Convenient Moringa capsules for daily nutrition. Each capsule contains 500mg of pure Moringa leaf powder, providing you with essential vitamins, minerals, and antioxidants. Perfect for busy lifestyles and precise dosing.",
                "short_description": "Convenient 500mg Moringa capsules for daily wellness",
                "category": ProductCategory.CAPSULES,
                "price": Decimal("449.00"),
                "compare_at_price": Decimal("599.00"),
                "quantity": 30,
                "images": [
                    ProductImage(
                        url="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
                        alt_text="Moringa Capsules",
                        is_primary=True
                    )
                ],
                "ingredients": [
                    "Moringa Oleifera Leaf Powder (500mg per capsule)",
                    "Vegetarian Capsule Shell",
                    "No Fillers",
                    "No Artificial Additives"
                ],
                "benefits": [
                    "Easy to consume daily",
                    "Precise 500mg dosing",
                    "Supports overall wellness",
                    "Rich in antioxidants",
                    "Boosts energy naturally",
                    "Vegetarian friendly"
                ],
                "usage_instructions": "Take 1-2 capsules daily with water, preferably with meals. Do not exceed recommended dosage.",
                "nutrition_info": NutritionInfo(
                    serving_size="1 capsule (500mg)",
                    protein="0.35g",
                    vitamin_c="8.5mg",
                    calcium="10mg",
                    iron="0.5mg"
                ),
                "weight": "60 capsules",
                "seo_title": "Moringa Capsules 500mg - 60 Count | Dbanyan Group",
                "seo_description": "Premium Moringa capsules with 500mg pure leaf powder. Convenient daily nutrition. Vegetarian, no preservatives."
            },
            {
                "name": "Moringa Herbal Tea",
                "description": "Refreshing and nutritious Moringa herbal tea blend. A perfect way to enjoy the benefits of Moringa in a soothing, caffeine-free tea. Naturally sweet with an earthy flavor that's perfect for any time of day.",
                "short_description": "Caffeine-free herbal tea with pure Moringa leaves",
                "category": ProductCategory.TEA,
                "price": Decimal("199.00"),
                "compare_at_price": Decimal("249.00"),
                "quantity": 40,
                "images": [
                    ProductImage(
                        url="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=500&fit=crop",
                        alt_text="Moringa Herbal Tea",
                        is_primary=True
                    )
                ],
                "ingredients": [
                    "100% Pure Moringa Oleifera Leaves",
                    "No Added Flavors",
                    "No Caffeine",
                    "No Preservatives"
                ],
                "benefits": [
                    "Caffeine-free relaxation",
                    "Rich in antioxidants",
                    "Supports digestion",
                    "Natural detox properties",
                    "Calming and soothing",
                    "Perfect for evening consumption"
                ],
                "usage_instructions": "Steep 1 tea bag in hot water (80-90°C) for 3-5 minutes. Add honey or lemon to taste. Enjoy 2-3 cups daily.",
                "weight": "20 tea bags (40g)",
                "seo_title": "Moringa Herbal Tea - Caffeine Free | Dbanyan Group",
                "seo_description": "Premium Moringa herbal tea. Caffeine-free, rich in antioxidants. Perfect for relaxation and wellness. 20 tea bags."
            },
            {
                "name": "Pure Moringa Oil",
                "description": "Cold-pressed Moringa oil extracted from premium Moringa seeds. Rich in oleic acid and antioxidants, perfect for skin and hair care. Light, non-greasy texture that absorbs quickly. Also suitable for culinary use.",
                "short_description": "Cold-pressed Moringa oil for skin, hair, and culinary use",
                "category": ProductCategory.OIL,
                "price": Decimal("699.00"),
                "compare_at_price": Decimal("899.00"),
                "quantity": 25,
                "images": [
                    ProductImage(
                        url="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
                        alt_text="Pure Moringa Oil",
                        is_primary=True
                    )
                ],
                "ingredients": [
                    "100% Pure Moringa Oleifera Seed Oil",
                    "Cold-Pressed",
                    "Unrefined",
                    "No Chemical Processing"
                ],
                "benefits": [
                    "Rich in oleic acid (70%)",
                    "Natural moisturizer",
                    "Anti-aging properties",
                    "Nourishes hair and scalp",
                    "Culinary grade quality",
                    "Long shelf life"
                ],
                "usage_instructions": "For skin: Apply a few drops and massage gently. For hair: Apply to scalp and hair, leave for 30 minutes before washing. For cooking: Use as finishing oil or in salad dressings.",
                "weight": "100ml",
                "seo_title": "Pure Moringa Oil - Cold Pressed | Dbanyan Group",
                "seo_description": "Premium cold-pressed Moringa oil for skin, hair, and cooking. Rich in oleic acid. 100ml bottle, unrefined and pure."
            }
        ]
        
        # Create products
        print("📦 Creating products...")
        for product_data in products_data:
            try:
                product = await product_service.create_product(product_data)
                print(f"✅ Created product: {product.name}")
            except Exception as e:
                print(f"❌ Failed to create product {product_data['name']}: {e}")
        
        # Create sample coupons
        print("🎫 Creating coupons...")
        coupons_data = [
            {
                "code": "WELCOME10",
                "description": "Welcome discount for new customers",
                "coupon_type": CouponType.PERCENTAGE,
                "value": Decimal("10"),
                "minimum_order_amount": Decimal("299"),
                "expires_at": datetime.utcnow() + timedelta(days=30)
            },
            {
                "code": "SAVE50",
                "description": "Flat ₹50 off on orders above ₹500",
                "coupon_type": CouponType.FIXED_AMOUNT,
                "value": Decimal("50"),
                "minimum_order_amount": Decimal("500"),
                "expires_at": datetime.utcnow() + timedelta(days=60)
            },
            {
                "code": "MORINGA20",
                "description": "20% off on all Moringa products",
                "coupon_type": CouponType.PERCENTAGE,
                "value": Decimal("20"),
                "minimum_order_amount": Decimal("199"),
                "maximum_discount_amount": Decimal("200"),
                "usage_limit": 100,
                "expires_at": datetime.utcnow() + timedelta(days=90)
            }
        ]
        
        for coupon_data in coupons_data:
            try:
                coupon = await coupon_service.create_coupon(CouponCreate(**coupon_data))
                print(f"✅ Created coupon: {coupon.code}")
            except Exception as e:
                print(f"❌ Failed to create coupon {coupon_data['code']}: {e}")
        
        print("🎉 Database seeding completed successfully!")
        
    except Exception as e:
        print(f"❌ Database seeding failed: {e}")
    
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(seed_database())
