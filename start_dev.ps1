# Dbanyan Group - Reliable Development Startup Script
# Start both backend and frontend servers

Write-Host "🚀 Starting Dbanyan Group Full Stack Development Environment..." -ForegroundColor Green

# Check if directories exist
if (!(Test-Path "c:\Users\devanshu\Downloads\dbanayan\Dbanyan-Project\backend")) {
    Write-Host "❌ Backend directory not found!" -ForegroundColor Red
    exit 1
}

if (!(Test-Path "c:\Users\devanshu\Downloads\dbanayan\Dbanyan-Project\frontend\dbanyan")) {
    Write-Host "❌ Frontend directory not found!" -ForegroundColor Red
    exit 1
}

# Start backend in a new window
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", "c:\Users\devanshu\Downloads\dbanayan\Dbanyan-Project\start_backend.ps1"

# Wait for backend to initialize
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start frontend in a new window
Write-Host "⚛️ Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", "c:\Users\devanshu\Downloads\dbanayan\Dbanyan-Project\start_frontend.ps1"

Write-Host "🌟 Services are starting..." -ForegroundColor Cyan
Write-Host "📍 Backend API: http://localhost:8000" -ForegroundColor Yellow
Write-Host "📍 API Documentation: http://localhost:8000/docs" -ForegroundColor Yellow  
Write-Host "📍 Frontend App: http://localhost:5173" -ForegroundColor Yellow
Write-Host "🛑 Close the terminal windows to stop services" -ForegroundColor Red

Write-Host "✅ Development environment ready!" -ForegroundColor Green
