#!/usr/bin/env python3
"""Test script to verify login functionality"""

import asyncio
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.services.auth_service import AuthService
from backend.models import UserLogin
from backend.db import get_database_sync

async def test_login():
    """Test login functionality"""
    try:
        # Get database connection
        db = await get_database_sync()
        auth_service = AuthService(db)
        
        # Test credentials (replace with actual test user)
        login_data = UserLogin(
            email="test@example.com",
            password="password123"
        )
        
        print("Testing authenticate_user...")
        user = await auth_service.authenticate_user(login_data)
        
        if user:
            print(f"✅ authenticate_user returned: {type(user)} with uid: {user.uid}")
            
            print("Testing create_access_token...")
            token = auth_service.create_access_token(user)
            print(f"✅ create_access_token returned: {token[:50]}...")
            
            print("✅ Login flow test PASSED!")
        else:
            print("❌ authenticate_user returned None (invalid credentials or user not found)")
            
    except Exception as e:
        print(f"❌ Login flow test FAILED: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_login())
