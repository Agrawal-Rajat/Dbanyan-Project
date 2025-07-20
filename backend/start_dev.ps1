# Dbanyan Group Backend - Development Startup Script
# Quick setup and start development server

Write-Host "🚀 Starting Dbanyan Group Backend Development Server..." -ForegroundColor Green

# Check if virtual environment exists
if (!(Test-Path "venv")) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
Write-Host "🔧 Activating virtual environment..." -ForegroundColor Yellow
& "venv\Scripts\Activate.ps1"

# Install dependencies
Write-Host "📥 Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Check if .env exists
if (!(Test-Path ".env")) {
    Write-Host "⚠️  .env file not found. Copying from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "⚙️  Please update .env with your actual MongoDB URI and API keys!" -ForegroundColor Red
}

# Start the server
Write-Host "🌟 Starting FastAPI server..." -ForegroundColor Green
Write-Host "📍 Server will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "📚 API Documentation: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "🛑 Press Ctrl+C to stop the server" -ForegroundColor Yellow

python main.py
