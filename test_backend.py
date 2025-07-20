# Test Backend Configuration
# Quick verification script

import sys
import os

def test_config():
    try:
        from config import settings
        print("✅ Config loaded successfully")
        print(f"📍 Project: {settings.PROJECT_NAME}")
        print(f"🔧 Debug mode: {settings.DEBUG}")
        print(f"🌐 CORS origins: {settings.ALLOWED_ORIGINS}")
        print(f"🗄️ Database: {settings.DB_NAME}")
        return True
    except Exception as e:
        print(f"❌ Config error: {e}")
        return False

def test_imports():
    try:
        import fastapi
        import uvicorn
        import motor
        import aiosmtplib
        print("✅ All required packages imported successfully")
        return True
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing Dbanyan Backend Configuration...")
    
    config_ok = test_config()
    imports_ok = test_imports()
    
    if config_ok and imports_ok:
        print("🎉 Backend is ready to start!")
        sys.exit(0)
    else:
        print("🔴 Backend has configuration issues")
        sys.exit(1)
