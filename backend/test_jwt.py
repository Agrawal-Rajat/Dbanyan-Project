#!/usr/bin/env python3
"""Test JWT functionality"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from jose import jwt
    from datetime import datetime, timedelta
    
    # Test JWT encoding/decoding
    secret = "test_secret"
    payload = {
        "sub": "test_user",
        "email": "test@example.com",
        "exp": datetime.utcnow() + timedelta(minutes=30)
    }
    
    # Test encode
    token = jwt.encode(payload, secret, algorithm="HS256")
    print(f"✅ JWT encode successful: {token[:50]}...")
    
    # Test decode
    decoded = jwt.decode(token, secret, algorithms=["HS256"])
    print(f"✅ JWT decode successful: {decoded['sub']}")
    
    print("🎉 JWT functionality is working correctly!")
    
except Exception as e:
    print(f"❌ JWT test failed: {e}")
    import traceback
    traceback.print_exc()
