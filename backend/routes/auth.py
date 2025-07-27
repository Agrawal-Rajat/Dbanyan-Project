# Dbanyan Group Backend - Authentication Routes
# Implementing guest checkout + admin auth flow with email functionality

from typing import Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel, EmailStr

from db import get_database
from models import UserCreate, UserLogin, UserResponse, ResponseModel, Token, User
from services import AuthService

router = APIRouter(prefix="/auth", tags=["authentication"])
security = HTTPBearer()

class CreateAdminRequest(BaseModel):
    """Schema for creating admin user"""
    email: EmailStr
    password: str
    full_name: str
    admin_secret: str = "dbanyan_admin_2025"  # Secret key for first admin creation

class UpdateProfileRequest(BaseModel):
    """Schema for updating user profile"""
    full_name: Optional[str] = None
    phone: Optional[str] = None

class ForgotPasswordRequest(BaseModel):
    """Schema for forgot password request"""
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    """Schema for password reset"""
    token: str
    new_password: str

# Dependency to get current user from JWT token
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> UserResponse:
    """Get current authenticated user from JWT token"""
    try:
        auth_service = AuthService(db)
        user = await auth_service.get_current_user(credentials.credentials)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Dependency for admin-only routes
async def get_admin_user(
    current_user: UserResponse = Depends(get_current_user)
) -> UserResponse:
    """Dependency to ensure user is admin"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user

@router.post("/create-admin", response_model=ResponseModel)
async def create_admin(
    request: CreateAdminRequest,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create the first admin user - restricted by secret key"""
    try:
        # Check admin secret
        if request.admin_secret != "dbanyan_admin_2025":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid admin secret key"
            )
        
        auth_service = AuthService(db)
        # Check if any admin already exists
        existing_admin = await auth_service.db.users.find_one({"role": "admin"})
        if existing_admin:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Admin user already exists"
            )
        
        result = await auth_service.create_admin_user(
            email=request.email,
            password=request.password,
            full_name=request.full_name
        )
        
        return ResponseModel(
            success=True,
            message="Admin user created successfully",
            data={"email": result.email, "role": result.role}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create admin: {str(e)}"
        )

@router.post("/register", response_model=ResponseModel)
async def register(
    user_data: UserCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Register new user account"""
    try:
        auth_service = AuthService(db)
        result = await auth_service.create_user(user_data)
        
        return ResponseModel(
            success=True,
            message="User registered successfully",
            data={"email": result.email, "uid": str(result.uid)}
        )
        
    except Exception as e:
        if "already exists" in str(e):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )

@router.post("/login", response_model=Token)
async def login(
    credentials: UserLogin,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """User login with email and password"""
    try:
        auth_service = AuthService(db)
        user = await auth_service.authenticate_user(credentials)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Generate token
        access_token = auth_service.create_access_token(user)
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": UserResponse(**user.model_dump())
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    current_user: UserResponse = Depends(get_current_user)
):
    """Get current user profile"""
    return current_user

@router.patch("/profile", response_model=UserResponse)
async def update_profile(
    update_data: UpdateProfileRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update user profile"""
    try:
        auth_service = AuthService(db)
        updated_user = await auth_service.update_user_profile(
            current_user.uid, 
            update_data.model_dump(exclude_unset=True)
        )
        
        if not updated_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to update profile"
            )
        
        return updated_user
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update profile: {str(e)}"
        )

@router.post("/forgot-password", response_model=ResponseModel)
async def forgot_password(
    request: ForgotPasswordRequest,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Initiate password reset process"""
    try:
        auth_service = AuthService(db)
        reset_token = await auth_service.initiate_password_reset(request.email)
        
        if reset_token:
            return ResponseModel(
                success=True,
                message="Password reset email sent successfully"
            )
        else:
            # Don't reveal if email exists or not for security
            return ResponseModel(
                success=True,
                message="If the email exists, a reset link has been sent"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process password reset: {str(e)}"
        )

@router.post("/reset-password", response_model=ResponseModel)
async def reset_password(
    request: ResetPasswordRequest,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Reset password using token"""
    try:
        auth_service = AuthService(db)
        success = await auth_service.reset_password(request.token, request.new_password)
        
        if success:
            return ResponseModel(
                success=True,
                message="Password reset successfully"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired reset token"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to reset password: {str(e)}"
        )


@router.get("/admin/users")
async def get_all_users_admin(
    skip: int = 0,
    limit: int = 100,
    admin_user: UserResponse = Depends(get_admin_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get all users for admin dashboard
    TODO: Add admin authentication middleware
    """
    try:
        auth_service = AuthService(db)
        users = await auth_service.get_all_users_admin(skip, limit)
        return users
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch users: {str(e)}"
        )


@router.get("/admin/stats")
async def get_user_stats_admin(
    admin_user: UserResponse = Depends(get_admin_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get user statistics for admin dashboard
    TODO: Add admin authentication middleware
    """
    try:
        auth_service = AuthService(db)
        stats = await auth_service.get_user_stats()
        return stats
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch user stats: {str(e)}"
        )


class CreateAdminRequest(BaseModel):
    """Schema for creating admin user"""
    email: str
    password: str
    full_name: str
    admin_secret: str = "dbanyan_admin_2025"  # Secret key for first admin creation


class ForgotPasswordRequest(BaseModel):
    """Schema for forgot password request"""
    email: str


class ResetPasswordRequest(BaseModel):
    """Schema for reset password request"""
    token: str
    new_password: str


class UpdateProfileRequest(BaseModel):
    """Schema for profile update request"""
    full_name: str = None
    phone: str = None
security = HTTPBearer()


async def get_auth_service(db: AsyncIOMotorDatabase = Depends(get_database)) -> AuthService:
    """Dependency to get auth service"""
    return AuthService(db)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    auth_service: AuthService = Depends(get_auth_service)
) -> UserResponse:
    """Get current authenticated user"""
    token = credentials.credentials
    payload = auth_service.verify_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    user_uid = payload.get("sub")
    if not user_uid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )
    
    user = await auth_service.get_user_by_uid(user_uid)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return UserResponse(**user.model_dump())


async def get_admin_user(
    current_user: UserResponse = Depends(get_current_user)
) -> UserResponse:
    """Dependency to ensure user is admin"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user


@router.post("/create-admin", response_model=ResponseModel)
async def create_admin(
    request: CreateAdminRequest,
    auth_service: AuthService = Depends(get_auth_service)
):
    """Create the first admin user - restricted by secret key"""
    try:
        # Check admin secret
        if request.admin_secret != "dbanyan_admin_2025":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid admin secret key"
            )
        
        # Check if any admin already exists
        existing_admin = await auth_service.db.users.find_one({"role": "admin"})
        if existing_admin:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Admin user already exists. Only one admin can be created this way."
            )
        
        # Create admin user
        admin_data = UserCreate(
            email=request.email,
            password=request.password,
            full_name=request.full_name,
            role=UserRole.ADMIN
        )
        
        admin_user = await auth_service.create_user(admin_data)
        
        # Send welcome email
        await email_service.send_welcome_email(
            to_email=admin_user.email,
            name=admin_user.full_name
        )
        
        return ResponseModel(
            success=True,
            message="Admin user created successfully",
            data={"admin_id": str(admin_user.uid)}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create admin: {str(e)}"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    """Get current user profile"""
    return UserResponse(**current_user.model_dump())


@router.post("/register", response_model=Token)
async def register(
    user_data: UserCreate,
    auth_service: AuthService = Depends(get_auth_service)
):
    """Register new user"""
    try:
        user = await auth_service.create_user(user_data)
        
        # Convert to full User model for token creation
        full_user = await auth_service.get_user_by_email(user.email)
        access_token = auth_service.create_access_token(full_user)
        
        return Token(
            access_token=access_token,
            user=user
        )
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: UserResponse = Depends(get_current_user)
):
    """Get current user information"""
    return current_user


@router.post("/admin/create", response_model=ResponseModel)
async def create_admin(
    admin_email: str,
    admin_password: str,
    admin_name: str,
    auth_service: AuthService = Depends(get_auth_service)
):
    """Create admin user - protected endpoint for initial setup"""
    try:
        # Check if any admin exists
        existing_admin = await auth_service.collection.find_one({"role": "admin"})
        if existing_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin user already exists"
            )
        
        admin_user = await auth_service.create_admin_user(
            email=admin_email,
            password=admin_password,
            full_name=admin_name
        )
        
        return ResponseModel(
            success=True,
            message="Admin user created successfully",
            data={"admin_uid": str(admin_user.uid)}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create admin user"
        )


@router.post("/forgot-password", response_model=ResponseModel)
async def forgot_password(
    request: ForgotPasswordRequest,
    auth_service: AuthService = Depends(get_auth_service)
):
    """Send password reset email"""
    try:
        # Always return success for security (don't reveal if email exists)
        reset_token = await auth_service.initiate_password_reset(request.email)
        
        return ResponseModel(
            success=True,
            message="If the email exists, a reset link has been sent to your email"
        )
        
    except Exception as e:
        # Still return success for security
        return ResponseModel(
            success=True,
            message="If the email exists, a reset link has been sent to your email"
        )


@router.post("/reset-password", response_model=ResponseModel)
async def reset_password(
    request: ResetPasswordRequest,
    auth_service: AuthService = Depends(get_auth_service)
):
    """Reset password with token"""
    try:
        success = await auth_service.reset_password(request.token, request.new_password)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired reset token"
            )
        
        return ResponseModel(
            success=True,
            message="Password reset successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to reset password"
        )


@router.put("/profile", response_model=UserResponse)
async def update_profile(
    request: UpdateProfileRequest,
    current_user: UserResponse = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service)
):
    """Update user profile"""
    try:
        update_data = request.model_dump(exclude_unset=True)
        updated_user = await auth_service.update_user_profile(current_user.uid, update_data)
        
        if not updated_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to update profile"
            )
        
        return updated_user
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update profile"
        )
