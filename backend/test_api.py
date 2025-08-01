# Test Admin API Endpoints
# Simple script to verify admin endpoints are working

import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

def test_login():
    """Test admin login"""
    login_data = {
        "email": "admin@dbanyan.com",
        "password": "admin123456"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    if response.status_code == 200:
        token = response.json()["access_token"]
        print("✅ Admin login successful")
        return token
    else:
        print(f"❌ Admin login failed: {response.status_code}")
        print(response.text)
        return None

def test_admin_endpoints(token):
    """Test admin endpoints"""
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test admin stats
    print("\n🔍 Testing admin stats endpoint...")
    response = requests.get(f"{BASE_URL}/admin/stats", headers=headers)
    if response.status_code == 200:
        print("✅ Admin stats endpoint working")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"❌ Admin stats failed: {response.status_code}")
        print(response.text)
    
    # Test products admin endpoint
    print("\n🔍 Testing products admin endpoint...")
    response = requests.get(f"{BASE_URL}/products/admin/all", headers=headers)
    if response.status_code == 200:
        print("✅ Products admin endpoint working")
        data = response.json()
        print(f"Found {len(data.get('data', []))} products")
    else:
        print(f"❌ Products admin failed: {response.status_code}")
        print(response.text)
    
    # Test top products
    print("\n🔍 Testing top products endpoint...")
    response = requests.get(f"{BASE_URL}/products/admin/top", headers=headers)
    if response.status_code == 200:
        print("✅ Top products endpoint working")
        data = response.json()
        print(f"Found {len(data.get('data', []))} top products")
    else:
        print(f"❌ Top products failed: {response.status_code}")
        print(response.text)

def test_public_endpoints():
    """Test public endpoints"""
    print("🔍 Testing public products endpoint...")
    response = requests.get(f"{BASE_URL}/products/")
    if response.status_code == 200:
        print("✅ Public products endpoint working")
        data = response.json()
        print(f"Found {len(data.get('data', []))} products")
    else:
        print(f"❌ Public products failed: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    print("🧪 Testing Admin API Endpoints\n")
    
    # Test public endpoints first
    test_public_endpoints()
    
    # Test admin login and endpoints
    token = test_login()
    if token:
        test_admin_endpoints(token)
    
    print("\n✨ API testing completed!")
