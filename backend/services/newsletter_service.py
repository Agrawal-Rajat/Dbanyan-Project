# Dbanyan Group Backend - Newsletter Service
# Implementing project_context.md Section 2.7: Newsletter signup - FR7.2

import logging
from typing import List
from datetime import datetime

from motor.motor_asyncio import AsyncIOMotorDatabase
from models import NewsletterSubscriber, SubscriberCreate

logger = logging.getLogger(__name__)


class NewsletterService:
    """Business logic for newsletter subscription management"""
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.subscribers
    
    async def subscribe(self, subscriber_data: SubscriberCreate) -> dict:
        """Subscribe user to newsletter"""
        try:
            # Check if email already exists
            existing = await self.collection.find_one({"email": subscriber_data.email})
            
            if existing:
                if existing.get("is_active", True):
                    return {
                        "success": False,
                        "message": "Email already subscribed"
                    }
                else:
                    # Reactivate existing subscription
                    await self.collection.update_one(
                        {"email": subscriber_data.email},
                        {"$set": {"is_active": True, "created_at": datetime.utcnow()}}
                    )
                    return {
                        "success": True,
                        "message": "Subscription reactivated successfully"
                    }
            
            # Create new subscription
            subscriber = NewsletterSubscriber(email=subscriber_data.email)
            await self.collection.insert_one(subscriber.model_dump(mode='json'))
            
            logger.info(f"Newsletter subscription: {subscriber_data.email}")
            
            return {
                "success": True,
                "message": "Subscribed successfully"
            }
            
        except Exception as e:
            logger.error(f"Error subscribing to newsletter: {e}")
            return {
                "success": False,
                "message": "Failed to subscribe"
            }
    
    async def unsubscribe(self, email: str) -> dict:
        """Unsubscribe user from newsletter"""
        try:
            result = await self.collection.update_one(
                {"email": email},
                {"$set": {"is_active": False}}
            )
            
            if result.modified_count > 0:
                return {
                    "success": True,
                    "message": "Unsubscribed successfully"
                }
            else:
                return {
                    "success": False,
                    "message": "Email not found"
                }
                
        except Exception as e:
            logger.error(f"Error unsubscribing from newsletter: {e}")
            return {
                "success": False,
                "message": "Failed to unsubscribe"
            }
    
    async def get_all_subscribers(self, active_only: bool = True) -> List[NewsletterSubscriber]:
        """Get all newsletter subscribers"""
        try:
            query_filter = {"is_active": True} if active_only else {}
            
            cursor = self.collection.find(query_filter).sort("created_at", -1)
            subscribers_docs = await cursor.to_list(length=None)
            
            subscribers = []
            for doc in subscribers_docs:
                doc['uid'] = doc['uid'] if isinstance(doc['uid'], str) else str(doc['uid'])
                subscribers.append(NewsletterSubscriber(**doc))
            
            return subscribers
            
        except Exception as e:
            logger.error(f"Error fetching subscribers: {e}")
            raise
