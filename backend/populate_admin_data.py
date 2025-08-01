# Admin Dashboard Data Population Script
# Populate database with products, users, and orders for admin dashboard

import asyncio
import logging
from datetime import datetime, timedelta
from uuid import uuid4
from decimal import Decimal
import random

from motor.motor_asyncio import AsyncIOMotorClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB settings
MONGODB_URL = "mongodb://localhost:27017"
MONGODB_DB_NAME = "dbanyan"


async def populate_database():
    """Populate database with products, users, and orders for admin dashboard"""
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[MONGODB_DB_NAME]
    
    try:
        logger.info("Starting database population for admin dashboard...")
        
        # Clear existing data
        await db.products.delete_many({})
        await db.users.delete_many({})
        await db.orders.delete_many({})
        await db.subscribers.delete_many({})
        await db.coupons.delete_many({})
        logger.info("Cleared existing data")
        
        # 1. POPULATE PRODUCTS (from frontend data)
        products_data = [
            {
                "uid": str(uuid4()),
                "name": "Moringa Powder",
                "description": "Pure, nutrient-rich moringa powder for daily wellness. Our premium Moringa Powder is made from carefully selected, organically grown Moringa leaves. Each batch is tested for purity and potency to ensure you receive the highest quality nutritional supplement.",
                "short_description": "Pure, nutrient-rich moringa powder for daily wellness.",
                "category": "powder",
                "price": 299.00,
                "compare_at_price": 399.00,
                "quantity": 50,
                "weight": "100g",
                "ingredients": [
                    "Pure Moringa Oleifera Leaf Powder",
                    "No artificial preservatives",
                    "No artificial colors",
                    "No added flavors"
                ],
                "benefits": [
                    "High in Vitamin C",
                    "Antioxidant Rich", 
                    "Natural Energy Boost",
                    "Rich in vitamins A, C, and E",
                    "Supports immune system",
                    "Promotes healthy skin"
                ],
                "usage_instructions": "Mix 1-2 teaspoons with water, juice, or smoothies daily. Best taken with meals.",
                "nutritional_info": {
                    "serving_size": "1 teaspoon (3g)",
                    "servings_per_container": "33",
                    "calories": "9",
                    "protein": "2g",
                    "vitamin_a": "15% DV",
                    "vitamin_c": "12% DV",
                    "iron": "8% DV",
                    "calcium": "6% DV"
                },
                "certifications": ["Organic", "Non-GMO", "Gluten-Free", "Vegan"],
                "shelf_life": "18 months from manufacturing date",
                "storage": "Store in a cool, dry place away from direct sunlight",
                "images": [
                    {
                        "url": "/images/moringaPowderPic.jpg",
                        "alt_text": "Moringa Powder",
                        "is_primary": True
                    }
                ],
                "is_preservative_free": True,
                "is_active": True,
                "rating": 4.8,
                "reviews_count": 124,
                "views": 1250,
                "sales_count": 89,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "uid": str(uuid4()),
                "name": "Moringa Paste",
                "description": "Fresh moringa paste for culinary and health uses. Our Moringa Paste is made from fresh, tender moringa leaves that are carefully processed to retain maximum nutritional value. Perfect for adding to curries, soups, and traditional Indian dishes.",
                "short_description": "Fresh moringa paste for culinary and health uses.",
                "category": "paste",
                "price": 349.00,
                "compare_at_price": 449.00,
                "quantity": 30,
                "weight": "200g",
                "ingredients": [
                    "Fresh Moringa Oleifera Leaves",
                    "Natural Preservatives",
                    "No artificial additives"
                ],
                "benefits": [
                    "Culinary Use",
                    "Nutrient Dense",
                    "Versatile",
                    "Rich in protein and vitamins",
                    "Traditional cooking ingredient",
                    "Easy to incorporate in recipes"
                ],
                "usage_instructions": "Add 1-2 tablespoons to curries, soups, or smoothies. Can be used as a natural food coloring and nutrient booster.",
                "nutritional_info": {
                    "serving_size": "2 tablespoons (30g)",
                    "calories": "25",
                    "protein": "4g",
                    "fiber": "2g",
                    "vitamin_c": "20mg",
                    "calcium": "60mg"
                },
                "certifications": ["Organic", "Traditional", "Preservative-Free"],
                "shelf_life": "6 months refrigerated",
                "storage": "Store in refrigerator after opening",
                "images": [
                    {
                        "url": "/images/moringaPastePic.jpg",
                        "alt_text": "Moringa Paste",
                        "is_primary": True
                    }
                ],
                "is_preservative_free": True,
                "is_active": True,
                "rating": 4.7,
                "reviews_count": 98,
                "views": 980,
                "sales_count": 67,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "uid": str(uuid4()),
                "name": "Moringa Drumstick",
                "description": "Nutritious moringa drumsticks (pods) for cooking. Fresh, tender moringa drumsticks that are perfect for traditional Indian cooking. These drumsticks are rich in fiber and essential nutrients, making them a healthy addition to your diet.",
                "short_description": "Nutritious moringa drumsticks (pods) for cooking.",
                "category": "drumstick",
                "price": 199.00,
                "compare_at_price": 249.00,
                "quantity": 40,
                "weight": "500g",
                "ingredients": [
                    "Fresh Moringa Oleifera Pods",
                    "No preservatives"
                ],
                "benefits": [
                    "Rich in Fiber",
                    "Traditional",
                    "Healthy",
                    "High in vitamin C and calcium",
                    "Supports digestive health",
                    "Traditional Indian cooking ingredient"
                ],
                "usage_instructions": "Wash thoroughly and cut into pieces. Add to curries, soups, or cook as a vegetable. Remove the outer skin before eating the tender inner flesh.",
                "nutritional_info": {
                    "serving_size": "100g",
                    "calories": "35",
                    "protein": "2g",
                    "fiber": "3g",
                    "vitamin_c": "25mg",
                    "calcium": "45mg"
                },
                "certifications": ["Fresh", "Organic", "Traditional"],
                "shelf_life": "7 days refrigerated",
                "storage": "Store in refrigerator",
                "images": [
                    {
                        "url": "/images/moringaFruitPic.jpg",
                        "alt_text": "Moringa Drumstick",
                        "is_primary": True
                    }
                ],
                "is_preservative_free": True,
                "is_active": True,
                "rating": 4.6,
                "reviews_count": 89,
                "views": 750,
                "sales_count": 45,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "uid": str(uuid4()),
                "name": "Moringa Dry Flower",
                "description": "Dried moringa flowers for tea and wellness. Our Moringa Dry Flowers are carefully harvested and dried to preserve their delicate flavor and nutritional properties. Perfect for making herbal teas and wellness beverages.",
                "short_description": "Dried moringa flowers for tea and wellness.",
                "category": "dry-flower",
                "price": 259.00,
                "compare_at_price": 329.00,
                "quantity": 20,
                "weight": "50g",
                "ingredients": [
                    "100% Dried Moringa Oleifera Flowers",
                    "No additives"
                ],
                "benefits": [
                    "Tea",
                    "Antioxidants",
                    "Wellness",
                    "Rich in antioxidants",
                    "Supports immune system",
                    "Calming and soothing"
                ],
                "usage_instructions": "Steep 1-2 teaspoons in hot water for 5-7 minutes. Can be mixed with other herbal teas. Drink 1-2 cups daily for wellness benefits.",
                "nutritional_info": {
                    "serving_size": "1 teaspoon (2g)",
                    "calories": "5",
                    "antioxidants": "High",
                    "vitamin_c": "10mg"
                },
                "certifications": ["Organic", "Traditional", "Herbal"],
                "shelf_life": "24 months",
                "storage": "Store in a cool, dry place in an airtight container",
                "images": [
                    {
                        "url": "/images/moringaFlowerPic.jpg",
                        "alt_text": "Moringa Dry Flower",
                        "is_primary": True
                    }
                ],
                "is_preservative_free": True,
                "is_active": True,
                "rating": 4.5,
                "reviews_count": 67,
                "views": 620,
                "sales_count": 38,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        
        # Insert products
        await db.products.insert_many(products_data)
        logger.info(f"Inserted {len(products_data)} products")
        
        # 2. POPULATE USERS (sample users for admin dashboard)
        users_data = [
            {
                "uid": str(uuid4()),
                "first_name": "Rajesh",
                "last_name": "Kumar",
                "email": "rajesh.kumar@email.com",
                "phone": "+91-9876543210",
                "address": {
                    "street": "123 MG Road",
                    "city": "Mumbai",
                    "state": "Maharashtra",
                    "pincode": "400001",
                    "country": "India"
                },
                "is_active": True,
                "is_admin": False,
                "created_at": datetime.utcnow() - timedelta(days=30),
                "updated_at": datetime.utcnow()
            },
            {
                "uid": str(uuid4()),
                "first_name": "Priya",
                "last_name": "Sharma",
                "email": "priya.sharma@email.com",
                "phone": "+91-8765432109",
                "address": {
                    "street": "456 Park Street",
                    "city": "Delhi",
                    "state": "Delhi",
                    "pincode": "110001",
                    "country": "India"
                },
                "is_active": True,
                "is_admin": False,
                "created_at": datetime.utcnow() - timedelta(days=25),
                "updated_at": datetime.utcnow()
            },
            {
                "uid": str(uuid4()),
                "first_name": "Amit",
                "last_name": "Patel",
                "email": "amit.patel@email.com",
                "phone": "+91-7654321098",
                "address": {
                    "street": "789 Brigade Road",
                    "city": "Bangalore",
                    "state": "Karnataka",
                    "pincode": "560001",
                    "country": "India"
                },
                "is_active": True,
                "is_admin": False,
                "created_at": datetime.utcnow() - timedelta(days=20),
                "updated_at": datetime.utcnow()
            },
            {
                "uid": str(uuid4()),
                "first_name": "Neha",
                "last_name": "Singh",
                "email": "neha.singh@email.com",
                "phone": "+91-6543210987",
                "address": {
                    "street": "321 College Street",
                    "city": "Kolkata",
                    "state": "West Bengal",
                    "pincode": "700073",
                    "country": "India"
                },
                "is_active": True,
                "is_admin": False,
                "created_at": datetime.utcnow() - timedelta(days=15),
                "updated_at": datetime.utcnow()
            },
            {
                "uid": str(uuid4()),
                "first_name": "Vikram",
                "last_name": "Malhotra",
                "email": "vikram.malhotra@email.com",
                "phone": "+91-5432109876",
                "address": {
                    "street": "654 Marina Beach Road",
                    "city": "Chennai",
                    "state": "Tamil Nadu",
                    "pincode": "600001",
                    "country": "India"
                },
                "is_active": True,
                "is_admin": False,
                "created_at": datetime.utcnow() - timedelta(days=10),
                "updated_at": datetime.utcnow()
            }
        ]
        
        # Insert users
        await db.users.insert_many(users_data)
        logger.info(f"Inserted {len(users_data)} users")
        
        # 3. POPULATE ORDERS (sample orders for admin dashboard)
        orders_data = []
        order_statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
        payment_methods = ["razorpay", "cod"]
        
        # Get product UIDs for order creation
        products = await db.products.find({}, {"uid": 1, "name": 1, "price": 1}).to_list(None)
        
        for i in range(20):  # Create 20 sample orders
            order_date = datetime.utcnow() - timedelta(days=random.randint(1, 30))
            user = random.choice(users_data)
            product = random.choice(products)
            quantity = random.randint(1, 3)
            
            order = {
                "uid": str(uuid4()),
                "customer_email": user["email"],
                "customer_name": f"{user['first_name']} {user['last_name']}",
                "customer_phone": user["phone"],
                "shipping_address": user["address"],
                "billing_address": user["address"],
                "items": [
                    {
                        "product_uid": product["uid"],
                        "product_name": product["name"],
                        "quantity": quantity,
                        "price": product["price"],
                        "total": product["price"] * quantity
                    }
                ],
                "subtotal": product["price"] * quantity,
                "shipping_cost": 50.00,
                "tax": (product["price"] * quantity) * 0.18,  # 18% GST
                "total": (product["price"] * quantity) + 50.00 + ((product["price"] * quantity) * 0.18),
                "status": random.choice(order_statuses),
                "payment_method": random.choice(payment_methods),
                "payment_status": "paid" if random.choice([True, False]) else "pending",
                "razorpay_order_id": f"order_{uuid4().hex[:16]}" if random.choice([True, False]) else None,
                "razorpay_payment_id": f"pay_{uuid4().hex[:16]}" if random.choice([True, False]) else None,
                "tracking_number": f"TRK{uuid4().hex[:8].upper()}" if random.choice([True, False]) else None,
                "notes": "Sample order for admin dashboard" if random.choice([True, False]) else "",
                "created_at": order_date,
                "updated_at": order_date
            }
            orders_data.append(order)
        
        # Insert orders
        await db.orders.insert_many(orders_data)
        logger.info(f"Inserted {len(orders_data)} orders")
        
        # 4. POPULATE NEWSLETTER SUBSCRIBERS
        subscribers_data = [
            {
                "email": "john.doe@email.com",
                "is_active": True,
                "created_at": datetime.utcnow() - timedelta(days=45)
            },
            {
                "email": "sarah.wilson@email.com",
                "is_active": True,
                "created_at": datetime.utcnow() - timedelta(days=40)
            },
            {
                "email": "mike.chen@email.com",
                "is_active": True,
                "created_at": datetime.utcnow() - timedelta(days=35)
            },
            {
                "email": "emma.brown@email.com",
                "is_active": False,
                "created_at": datetime.utcnow() - timedelta(days=50)
            },
            {
                "email": "david.garcia@email.com",
                "is_active": True,
                "created_at": datetime.utcnow() - timedelta(days=25)
            }
        ]
        
        # Insert subscribers
        await db.subscribers.insert_many(subscribers_data)
        logger.info(f"Inserted {len(subscribers_data)} newsletter subscribers")
        
        # 5. POPULATE COUPONS
        coupons_data = [
            {
                "uid": str(uuid4()),
                "code": "WELCOME10",
                "description": "Welcome discount for new customers",
                "discount_type": "percentage",
                "discount_value": 10.0,
                "minimum_order_amount": 500.0,
                "maximum_discount": 200.0,
                "usage_limit": 100,
                "used_count": 25,
                "is_active": True,
                "expires_at": datetime.utcnow() + timedelta(days=30),
                "created_at": datetime.utcnow() - timedelta(days=10)
            },
            {
                "uid": str(uuid4()),
                "code": "MORINGA20",
                "description": "20% off on all moringa products",
                "discount_type": "percentage",
                "discount_value": 20.0,
                "minimum_order_amount": 1000.0,
                "maximum_discount": 500.0,
                "usage_limit": 50,
                "used_count": 12,
                "is_active": True,
                "expires_at": datetime.utcnow() + timedelta(days=15),
                "created_at": datetime.utcnow() - timedelta(days=5)
            },
            {
                "uid": str(uuid4()),
                "code": "FREESHIP",
                "description": "Free shipping on orders above ₹1000",
                "discount_type": "fixed",
                "discount_value": 50.0,
                "minimum_order_amount": 1000.0,
                "maximum_discount": 50.0,
                "usage_limit": 200,
                "used_count": 45,
                "is_active": True,
                "expires_at": datetime.utcnow() + timedelta(days=60),
                "created_at": datetime.utcnow() - timedelta(days=20)
            }
        ]
        
        # Insert coupons
        await db.coupons.insert_many(coupons_data)
        logger.info(f"Inserted {len(coupons_data)} coupons")
        
        logger.info("Database population completed successfully!")
        
        # Print summary
        products_count = await db.products.count_documents({})
        users_count = await db.users.count_documents({})
        orders_count = await db.orders.count_documents({})
        subscribers_count = await db.subscribers.count_documents({})
        coupons_count = await db.coupons.count_documents({})
        
        print(f"\n📊 Database Population Summary:")
        print(f"✅ Products: {products_count}")
        print(f"✅ Users: {users_count}")
        print(f"✅ Orders: {orders_count}")
        print(f"✅ Newsletter Subscribers: {subscribers_count}")
        print(f"✅ Coupons: {coupons_count}")
        print(f"\n🎉 Admin dashboard is now ready with real data!")
        
    except Exception as e:
        logger.error(f"Error populating database: {e}")
        raise
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(populate_database()) 