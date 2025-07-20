# Dbanyan Group Backend - Database Connection
# Following project_context.md Section 3.1: MongoDB with Motor (async)
# CRITICAL: Using UUID instead of ObjectId as per requirements

import logging
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from config import settings

# Database connection
client: AsyncIOMotorClient = None
database: AsyncIOMotorDatabase = None

logger = logging.getLogger(__name__)


async def connect_to_mongo():
    """Create database connection on startup"""
    global client, database
    try:
        client = AsyncIOMotorClient(settings.MONGODB_URI)
        database = client[settings.DB_NAME]
        
        # Test connection
        await client.admin.command('ping')
        logger.info(f"Connected to MongoDB: {settings.DB_NAME}")
        
        # Create indexes for performance
        await create_indexes()
        
    except Exception as e:
        logger.error(f"Could not connect to MongoDB: {e}")
        raise


async def close_mongo_connection():
    """Close database connection on shutdown"""
    global client
    if client:
        client.close()
        logger.info("Disconnected from MongoDB")


def get_database() -> AsyncIOMotorDatabase:
    """Dependency to get database instance"""
    global database
    if database is None:
        raise Exception("Database not connected")
    return database


async def get_database() -> AsyncIOMotorDatabase:
    """Dependency injection for database access"""
    return database


async def create_indexes():
    """Create database indexes for optimal query performance"""
    try:
        # Products collection indexes
        await database.products.create_index("uid", unique=True)
        await database.products.create_index("category")
        await database.products.create_index("is_active")
        await database.products.create_index([("name", "text"), ("description", "text")])
        
        # Orders collection indexes
        await database.orders.create_index("uid", unique=True)
        await database.orders.create_index("customer_email")
        await database.orders.create_index("status")
        await database.orders.create_index("created_at")
        await database.orders.create_index("razorpay_order_id")
        
        # Users collection indexes (for future admin functionality)
        await database.users.create_index("uid", unique=True)
        await database.users.create_index("email", unique=True)
        
        # Newsletter subscribers
        await database.subscribers.create_index("email", unique=True)
        await database.subscribers.create_index("created_at")
        
        # Coupons collection
        await database.coupons.create_index("code", unique=True)
        await database.coupons.create_index("is_active")
        await database.coupons.create_index("expires_at")
        
        logger.info("Database indexes created successfully")
        
    except Exception as e:
        logger.error(f"Error creating indexes: {e}")


# Database collections (for type hints and easy access)
class Collections:
    @staticmethod
    def products():
        return database.products
    
    @staticmethod
    def orders():
        return database.orders
    
    @staticmethod
    def users():
        return database.users
    
    @staticmethod
    def subscribers():
        return database.subscribers
    
    @staticmethod
    def coupons():
        return database.coupons
