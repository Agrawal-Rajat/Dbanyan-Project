# Simple Database Seeder - Dbanyan Group Backend
# Populate database with real Moringa products data (simplified version)

import asyncio
import logging
from datetime import datetime
from uuid import uuid4
from decimal import Decimal

from motor.motor_asyncio import AsyncIOMotorClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB settings
MONGODB_URL = "mongodb://localhost:27017"
MONGODB_DB_NAME = "dbanyan_db"


async def seed_database():
    """Seed database with real product data"""
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[MONGODB_DB_NAME]
    
    try:
        logger.info("Starting database seeding...")
        
        # Clear existing data
        await db.products.delete_many({})
        await db.users.delete_many({})
        await db.orders.delete_many({})
        logger.info("Cleared existing data")
        
        # Create products as dictionaries
        products_data = [
            {
                "uid": str(uuid4()),
                "name": "Organic Moringa Powder",
                "description": "Premium quality organic moringa powder sourced from the finest moringa trees. Rich in vitamins A, C, and E, calcium, potassium, and protein. Our moringa powder is carefully dried and ground to preserve maximum nutritional value. Perfect for smoothies, teas, and cooking.",
                "short_description": "Premium organic moringa powder packed with essential nutrients and vitamins.",
                "category": "powder",
                "price": 299.00,
                "compare_at_price": 399.00,
                "quantity": 100,
                "weight": "100g",
                "ingredients": ["100% Organic Moringa Oleifera Leaves"],
                "benefits": [
                    "Rich in Vitamin A, C, E",
                    "High in Calcium and Potassium", 
                    "Natural Energy Booster",
                    "Supports Immune System",
                    "Anti-inflammatory Properties"
                ],
                "usage_instructions": "Mix 1-2 teaspoons with water, juice, or smoothies. Can be added to food preparations. Take twice daily for best results.",
                "images": [
                    {
                        "url": "/images/moringa-powder-main.jpg",
                        "alt_text": "Organic Moringa Powder - 100g Package",
                        "is_primary": True
                    },
                    {
                        "url": "/images/moringa-powder-usage.jpg",
                        "alt_text": "Moringa Powder Usage Guide",
                        "is_primary": False
                    }
                ],
                "nutrition_info": {
                    "serving_size": "1 teaspoon (3g)",
                    "calories": 10,
                    "protein": "2g",
                    "fiber": "1g",
                    "vitamin_c": "15mg",
                    "calcium": "40mg",
                    "iron": "2mg"
                },
                "is_preservative_free": True,
                "is_active": True,
                "views": 1250,
                "sales_count": 89,
                "seo_title": "Buy Organic Moringa Powder Online | Premium Quality | Dbanyan Group",
                "seo_description": "Premium organic moringa powder rich in vitamins and minerals. Free shipping across India. Order now for natural health benefits.",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            
            {
                "uid": str(uuid4()),
                "name": "Moringa Capsules - 60 Count",
                "description": "Convenient moringa capsules for daily supplementation. Each capsule contains 500mg of pure moringa leaf powder. Easy to consume and perfect for busy lifestyles. All the benefits of moringa in convenient capsule form.",
                "short_description": "Convenient moringa capsules for daily health supplementation.",
                "category": "capsules",
                "price": 449.00,
                "compare_at_price": 549.00,
                "quantity": 75,
                "weight": "60 capsules",
                "ingredients": ["Moringa Oleifera Leaf Powder", "Vegetable Capsule Shell"],
                "benefits": [
                    "Daily Nutritional Support",
                    "Easy to Consume",
                    "Standardized Dosage",
                    "Travel Friendly",
                    "No Taste or Smell"
                ],
                "usage_instructions": "Take 1-2 capsules twice daily with water, preferably before meals. Do not exceed recommended dosage.",
                "images": [
                    {
                        "url": "/images/moringa-capsules-main.jpg",
                        "alt_text": "Moringa Capsules - 60 Count Bottle",
                        "is_primary": True
                    }
                ],
                "nutrition_info": {
                    "serving_size": "2 capsules (1g)",
                    "calories": 3,
                    "protein": "0.7g",
                    "vitamin_c": "5mg",
                    "calcium": "15mg",
                    "iron": "1mg"
                },
                "is_preservative_free": True,
                "is_active": True,
                "views": 980,
                "sales_count": 67,
                "seo_title": "Moringa Capsules Online | 60 Count | Natural Health Supplement",
                "seo_description": "Pure moringa leaf capsules for daily nutrition. 500mg per capsule. Order online with free shipping.",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            
            {
                "uid": str(uuid4()),
                "name": "Moringa Herbal Tea",
                "description": "Refreshing herbal tea blend featuring moringa leaves with complementary herbs. A perfect way to enjoy moringa's benefits in a delicious, soothing tea. Naturally caffeine-free and perfect for any time of day.",
                "short_description": "Refreshing herbal tea blend with moringa and complementary herbs.",
                "category": "tea",
                "price": 199.00,
                "compare_at_price": 249.00,
                "quantity": 50,
                "weight": "25 tea bags",
                "ingredients": ["Moringa Leaves", "Ginger", "Tulsi", "Lemongrass", "Natural Flavors"],
                "benefits": [
                    "Caffeine Free",
                    "Digestive Support", 
                    "Relaxing and Soothing",
                    "Antioxidant Rich",
                    "Natural Detox"
                ],
                "usage_instructions": "Steep 1 tea bag in hot water for 3-5 minutes. Add honey or lemon if desired. Enjoy 2-3 cups daily.",
                "images": [
                    {
                        "url": "/images/moringa-tea-main.jpg",
                        "alt_text": "Moringa Herbal Tea - 25 Tea Bags",
                        "is_primary": True
                    }
                ],
                "is_preservative_free": True,
                "is_active": True,
                "views": 750,
                "sales_count": 43,
                "seo_title": "Moringa Herbal Tea | Caffeine Free | 25 Tea Bags | Natural Wellness",
                "seo_description": "Premium moringa herbal tea blend. Caffeine-free with natural herbs. Perfect for daily wellness routine.",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            
            {
                "uid": str(uuid4()),
                "name": "Pure Moringa Oil",
                "description": "Cold-pressed moringa oil extracted from moringa seeds. Rich in antioxidants and nutrients, perfect for skin and hair care. Can also be used for cooking. Our oil is 100% pure with no additives or preservatives.",
                "short_description": "Cold-pressed pure moringa oil for skin, hair, and culinary use.",
                "category": "oil",
                "price": 899.00,
                "compare_at_price": 1199.00,
                "quantity": 30,
                "weight": "100ml",
                "ingredients": ["100% Pure Moringa Oleifera Seed Oil"],
                "benefits": [
                    "Moisturizes Skin",
                    "Nourishes Hair",
                    "Anti-aging Properties",
                    "Cooking Oil Alternative",
                    "Rich in Antioxidants"
                ],
                "usage_instructions": "For skin: Apply few drops to clean skin. For hair: Massage into scalp and hair, leave for 30 minutes before washing. For cooking: Use as finishing oil or for light cooking.",
                "images": [
                    {
                        "url": "/images/moringa-oil-main.jpg",
                        "alt_text": "Pure Moringa Oil - 100ml Bottle",
                        "is_primary": True
                    }
                ],
                "is_preservative_free": True,
                "is_active": True,
                "views": 650,
                "sales_count": 34,
                "seo_title": "Pure Moringa Oil | Cold Pressed | 100ml | Skin & Hair Care",
                "seo_description": "100% pure cold-pressed moringa oil for skin, hair and cooking. Rich in antioxidants. Free shipping available.",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        
        # Insert products
        await db.products.insert_many(products_data)
        logger.info(f"Created {len(products_data)} products")
        
        # Create admin user
        admin_user_data = {
            "uid": str(uuid4()),
            "email": "admin@dbanyan.com",
            "password_hash": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNQjLGZhv7o9G",  # admin123456
            "full_name": "Admin User",
            "phone": None,
            "role": "admin",
            "is_active": True,
            "is_verified": True,
            "verification_token": None,
            "reset_token": None,
            "created_at": datetime.utcnow(),
            "last_login": None
        }
        await db.users.insert_one(admin_user_data)
        logger.info("Created admin user: admin@dbanyan.com")
        
        # Create customer users
        customer_users_data = [
            {
                "uid": str(uuid4()),
                "email": "john.doe@example.com",
                "password_hash": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNQjLGZhv7o9G",  # customer123
                "full_name": "John Doe",
                "phone": "9876543210",
                "role": "customer",
                "is_active": True,
                "is_verified": True,
                "verification_token": None,
                "reset_token": None,
                "created_at": datetime.utcnow(),
                "last_login": None
            },
            {
                "uid": str(uuid4()),
                "email": "jane.smith@example.com",
                "password_hash": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNQjLGZhv7o9G",  # customer123
                "full_name": "Jane Smith",
                "phone": "9876543211",
                "role": "customer",
                "is_active": True,
                "is_verified": True,
                "verification_token": None,
                "reset_token": None,
                "created_at": datetime.utcnow(),
                "last_login": None
            }
        ]
        
        await db.users.insert_many(customer_users_data)
        logger.info(f"Created {len(customer_users_data)} customer users")
        
        # Create sample orders
        sample_orders_data = [
            {
                "uid": str(uuid4()),
                "customer_email": "john.doe@example.com",
                "items": [
                    {
                        "product_uid": products_data[0]["uid"],
                        "product_name": "Organic Moringa Powder",
                        "quantity": 2,
                        "unit_price": 299.00,
                        "total_price": 598.00
                    }
                ],
                "shipping_address": {
                    "full_name": "John Doe",
                    "phone": "9876543210",
                    "address_line_1": "123 Main Street",
                    "address_line_2": None,
                    "city": "Mumbai",
                    "state": "Maharashtra",
                    "postal_code": "400001",
                    "country": "India"
                },
                "subtotal": 598.00,
                "discount_amount": 0.00,
                "shipping_cost": 50.00,
                "tax_amount": 0.00,
                "total_amount": 648.00,
                "razorpay_order_id": None,
                "razorpay_payment_id": None,
                "payment_status": "paid",
                "status": "delivered",
                "tracking_number": None,
                "coupon_code": None,
                "notes": None,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "confirmed_at": None,
                "shipped_at": None,
                "delivered_at": None
            },
            {
                "uid": str(uuid4()),
                "customer_email": "jane.smith@example.com",
                "items": [
                    {
                        "product_uid": products_data[1]["uid"],
                        "product_name": "Moringa Capsules - 60 Count",
                        "quantity": 1,
                        "unit_price": 449.00,
                        "total_price": 449.00
                    },
                    {
                        "product_uid": products_data[2]["uid"],
                        "product_name": "Moringa Herbal Tea",
                        "quantity": 1,
                        "unit_price": 199.00,
                        "total_price": 199.00
                    }
                ],
                "shipping_address": {
                    "full_name": "Jane Smith",
                    "phone": "9876543211",
                    "address_line_1": "456 Oak Avenue",
                    "address_line_2": None,
                    "city": "Delhi",
                    "state": "Delhi",
                    "postal_code": "110001",
                    "country": "India"
                },
                "subtotal": 648.00,
                "discount_amount": 0.00,
                "shipping_cost": 50.00,
                "tax_amount": 0.00,
                "total_amount": 698.00,
                "razorpay_order_id": None,
                "razorpay_payment_id": None,
                "payment_status": "paid",
                "status": "shipped",
                "tracking_number": "TRK123456789",
                "coupon_code": None,
                "notes": None,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "confirmed_at": None,
                "shipped_at": None,
                "delivered_at": None
            }
        ]
        
        await db.orders.insert_many(sample_orders_data)
        logger.info(f"Created {len(sample_orders_data)} sample orders")
        
        logger.info("Database seeding completed successfully!")
        print("✅ Database populated with:")
        print(f"   - {len(products_data)} Products")
        print(f"   - {len(customer_users_data) + 1} Users (1 admin, {len(customer_users_data)} customers)")
        print(f"   - {len(sample_orders_data)} Sample Orders")
        print("   - Admin Login: admin@dbanyan.com / admin123456")
        
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        raise
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(seed_database())
