# Dbanyan Group Backend - Database Seeding Script
# Populate database with sample products and data

Write-Host "🌱 Seeding Dbanyan Group Database..." -ForegroundColor Green

# Check if virtual environment exists
if (!(Test-Path "venv")) {
    Write-Host "❌ Virtual environment not found. Please run start_dev.ps1 first!" -ForegroundColor Red
    exit 1
}

# Activate virtual environment
& "venv\Scripts\Activate.ps1"

# Check if .env exists
if (!(Test-Path ".env")) {
    Write-Host "❌ .env file not found. Please create it from .env.example!" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Adding sample products and coupons to database..." -ForegroundColor Yellow
python seed_db.py

Write-Host "✅ Database seeding completed!" -ForegroundColor Green
