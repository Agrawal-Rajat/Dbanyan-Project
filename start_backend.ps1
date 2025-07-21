# Simple Backend Startup Script
# For Dbanyan Group Backend

Write-Host "🚀 Starting Dbanyan Group Backend..." -ForegroundColor Green

# Navigate to backend directory
Set-Location "c:\Users\devanshu\Downloads\dbanayan\Dbanyan-Project\backend"

# Check if .env exists
if (!(Test-Path ".env")) {
    Write-Host "❌ .env file not found. Please create one based on .env.example" -ForegroundColor Red
    exit 1
}

# Install requirements if needed
Write-Host "📦 Installing/updating requirements..." -ForegroundColor Yellow
python -m pip install -r requirements.txt

# Start the server
Write-Host "🔧 Starting FastAPI server..." -ForegroundColor Green
Write-Host "📍 Backend will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "📍 API Documentation: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "🛑 Press Ctrl+C to stop the server" -ForegroundColor Red

uvicorn main:app --reload --host 127.0.0.1 --port 8000
