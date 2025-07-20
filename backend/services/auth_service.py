# Dbanyan Group Backend - Authentication Service
# Implementing JWT-based auth with admin and guest checkout flow

import logging
from typing import Optional, Dict, Any, List
from uuid import UUID
from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt

from motor.motor_asyncio import AsyncIOMotorDatabase
from models import User, UserCreate, UserLogin, UserResponse, Token, UserRole
from config import settings

logger = logging.getLogger(__name__)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    """Authentication and user management service"""
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.users
    
    async def create_user(self, user_data: UserCreate) -> UserResponse:
        """Create a new user"""
        try:
            # Check if user exists
            existing = await self.collection.find_one({"email": user_data.email})
            if existing:
                raise ValueError("User with this email already exists")
            
            # Hash password
            hashed_password = self.hash_password(user_data.password)
            
            # Create user
            user = User(
                **user_data.model_dump(exclude={'password'}),
                password_hash=hashed_password
            )
            
            # Insert into database
            result = await self.collection.insert_one(
                user.model_dump(mode='json')
            )
            
            if result.inserted_id:
                logger.info(f"User created: {user.email}")
                return UserResponse(**user.model_dump())
            else:
                raise Exception("Failed to create user")
                
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            raise
    
    async def authenticate_user(self, login_data: UserLogin) -> Optional[User]:
        """Authenticate user with email and password"""
        try:
            user_doc = await self.collection.find_one({"email": login_data.email})
            if not user_doc:
                return None
            
            # Convert to User model
            user_doc['uid'] = UUID(user_doc['uid'])
            user = User(**user_doc)
            
            # Verify password
            if not self.verify_password(login_data.password, user.password_hash):
                return None
            
            # Update last login
            await self.collection.update_one(
                {"uid": str(user.uid)},
                {"$set": {"last_login": datetime.utcnow()}}
            )
            
            return user
            
        except Exception as e:
            logger.error(f"Error authenticating user: {e}")
            raise
    
    async def get_user_by_uid(self, uid: UUID) -> Optional[User]:
        """Get user by UID"""
        try:
            user_doc = await self.collection.find_one({"uid": str(uid)})
            if user_doc:
                user_doc['uid'] = UUID(user_doc['uid'])
                return User(**user_doc)
            return None
            
        except Exception as e:
            logger.error(f"Error fetching user {uid}: {e}")
            raise
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        try:
            user_doc = await self.collection.find_one({"email": email})
            if user_doc:
                user_doc['uid'] = UUID(user_doc['uid'])
                return User(**user_doc)
            return None
            
        except Exception as e:
            logger.error(f"Error fetching user by email {email}: {e}")
            raise
    
    def create_access_token(self, user: User) -> str:
        """Create JWT access token"""
        expire = datetime.utcnow() + timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode = {
            "sub": str(user.uid),
            "email": user.email,
            "role": user.role.value,
            "exp": expire
        }
        return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    
    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Verify JWT token and return payload"""
        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
            return payload
        except jwt.PyJWTError:
            return None
    
    def hash_password(self, password: str) -> str:
        """Hash password"""
        return pwd_context.hash(password)
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify password"""
        return pwd_context.verify(plain_password, hashed_password)
    
    async def create_admin_user(self, email: str, password: str, full_name: str) -> UserResponse:
        """Create admin user - for initial setup"""
        try:
            admin_data = UserCreate(
                email=email,
                password=password,
                full_name=full_name,
                role=UserRole.ADMIN
            )
            return await self.create_user(admin_data)
            
        except Exception as e:
            logger.error(f"Error creating admin user: {e}")
            raise
    
    async def is_admin(self, user_uid: UUID) -> bool:
        """Check if user is admin"""
        user = await self.get_user_by_uid(user_uid)
        return user and user.role == UserRole.ADMIN
    
    async def initiate_password_reset(self, email: str) -> Optional[str]:
        """Initiate password reset process"""
        try:
            user = await self.get_user_by_email(email)
            if not user:
                return None
            
            # Create reset token (valid for 24 hours)
            expire = datetime.utcnow() + timedelta(hours=24)
            reset_data = {
                "sub": str(user.uid),
                "email": user.email,
                "type": "password_reset",
                "exp": expire
            }
            reset_token = jwt.encode(reset_data, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
            
            # Send email
            from services.email_service import email_service
            await email_service.send_password_reset_email(
                to_email=user.email,
                name=user.full_name,
                reset_token=reset_token
            )
            
            logger.info(f"Password reset initiated for user: {email}")
            return reset_token
            
        except Exception as e:
            logger.error(f"Error initiating password reset: {e}")
            raise
    
    async def reset_password(self, token: str, new_password: str) -> bool:
        """Reset password using token"""
        try:
            # Verify token
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
            
            if payload.get("type") != "password_reset":
                return False
            
            user_uid = UUID(payload.get("sub"))
            user = await self.get_user_by_uid(user_uid)
            
            if not user:
                return False
            
            # Update password
            hashed_password = self.hash_password(new_password)
            await self.collection.update_one(
                {"uid": str(user_uid)},
                {
                    "$set": {
                        "password_hash": hashed_password,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            
            logger.info(f"Password reset successful for user: {user.email}")
            return True
            
        except jwt.PyJWTError:
            logger.warning("Invalid password reset token")
            return False
        except Exception as e:
            logger.error(f"Error resetting password: {e}")
            raise
    
    async def update_user_profile(self, user_uid: UUID, update_data: dict) -> Optional[UserResponse]:
        """Update user profile"""
        try:
            # Remove sensitive fields
            allowed_fields = {"full_name", "phone"}
            filtered_data = {k: v for k, v in update_data.items() if k in allowed_fields}
            
            if not filtered_data:
                return None
            
            filtered_data["updated_at"] = datetime.utcnow()
            
            # Update user
            result = await self.collection.update_one(
                {"uid": str(user_uid)},
                {"$set": filtered_data}
            )
            
            if result.modified_count > 0:
                updated_user = await self.get_user_by_uid(user_uid)
                if updated_user:
                    return UserResponse(**updated_user.model_dump())
            
            return None
            
        except Exception as e:
            logger.error(f"Error updating user profile: {e}")
            raise

    async def get_all_users_admin(self, skip: int = 0, limit: int = 100) -> List[Dict]:
        """Get all users for admin dashboard"""
        try:
            cursor = self.collection.find({}, {
                "password_hash": 0  # Exclude password hash from results
            }).skip(skip).limit(limit).sort("created_at", -1)
            
            users = []
            async for user_doc in cursor:
                # Convert UUID fields
                user_doc['uid'] = str(user_doc['uid'])
                users.append(user_doc)
            
            return users
        except Exception as e:
            logger.error(f"Error fetching admin users: {e}")
            return []

    async def get_user_stats(self) -> Dict[str, Any]:
        """Get user statistics for admin dashboard"""
        try:
            # Total users
            total_users = await self.collection.count_documents({})
            
            # Users by role
            role_pipeline = [
                {"$group": {"_id": "$role", "count": {"$sum": 1}}}
            ]
            role_stats = {}
            async for result in self.collection.aggregate(role_pipeline):
                role_stats[result["_id"]] = result["count"]
            
            # Recent users count
            from datetime import datetime, timedelta
            recent_date = datetime.utcnow() - timedelta(days=7)
            recent_users = await self.collection.count_documents({
                "created_at": {"$gte": recent_date}
            })
            
            # Verified users count
            verified_users = await self.collection.count_documents({
                "email_verified": True
            })
            
            return {
                "total_users": total_users,
                "role_distribution": role_stats,
                "recent_users": recent_users,
                "verified_users": verified_users,
                "verification_rate": (verified_users / total_users * 100) if total_users > 0 else 0
            }
            
        except Exception as e:
            logger.error(f"Error fetching user stats: {e}")
            return {
                "total_users": 0,
                "role_distribution": {},
                "recent_users": 0,
                "verified_users": 0,
                "verification_rate": 0
            }
