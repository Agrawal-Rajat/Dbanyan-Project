# Dbanyan Group Backend - Newsletter API Routes
# Implementing project_context.md Section 2.7: Newsletter signup - FR7.2

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from db import get_database
from models import SubscriberCreate, ResponseModel
from services import NewsletterService

router = APIRouter(prefix="/newsletter", tags=["newsletter"])


@router.post("/subscribe")
async def subscribe_newsletter(
    subscriber_data: SubscriberCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Subscribe to newsletter - FR7.2
    Fast endpoint for footer newsletter signup
    """
    try:
        newsletter_service = NewsletterService(db)
        result = await newsletter_service.subscribe(subscriber_data)
        
        if not result["success"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result["message"]
            )
        
        return ResponseModel(
            success=True,
            message=result["message"]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to subscribe: {str(e)}"
        )


@router.post("/unsubscribe")
async def unsubscribe_newsletter(
    email_data: dict,  # {"email": "user@example.com"}
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Unsubscribe from newsletter
    """
    try:
        if "email" not in email_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is required"
            )
        
        newsletter_service = NewsletterService(db)
        result = await newsletter_service.unsubscribe(email_data["email"])
        
        if not result["success"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result["message"]
            )
        
        return ResponseModel(
            success=True,
            message=result["message"]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to unsubscribe: {str(e)}"
        )
