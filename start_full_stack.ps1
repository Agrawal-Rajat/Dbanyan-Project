# Dbanyan Group - Full Stack Development Startup Script
# Start both backend and frontend servers for development

Write-Host "🚀 Starting Dbanyan Group Full Stack Development Environment..." -ForegroundColor Green

# Create separate PowerShell sessions for backend and frontend
$backendJob = Start-Job -ScriptBlock {
    Set-Location "c:\Users\devanshu\Downloads\dbanayan\Dbanyan-Project\backend"
    
    # Check if virtual environment exists
    if (!(Test-Path "venv")) {
        Write-Host "📦 Creating backend virtual environment..." -ForegroundColor Yellow
        python -m venv venv
    }
    
    # Activate virtual environment
    & "venv\Scripts\Activate.ps1"
    
    # Install dependencies
    pip install -r requirements.txt
    
    # Check if .env exists
    if (!(Test-Path ".env")) {
        Copy-Item ".env.example" ".env"
        Write-Host "⚠️ Please update backend .env with your MongoDB URI!" -ForegroundColor Red
    }
    
    Write-Host "🔧 Starting FastAPI Backend Server..." -ForegroundColor Green
    python main.py
}

$frontendJob = Start-Job -ScriptBlock {
    Set-Location "c:\Users\devanshu\Downloads\dbanayan\Dbanyan-Project\frontend\dbanyan"
    
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    
    Write-Host "⚛️ Starting React Frontend Server..." -ForegroundColor Green
    npm run dev
}

Write-Host "🌟 Starting services..." -ForegroundColor Cyan
Write-Host "📍 Backend API: http://localhost:8000" -ForegroundColor Yellow
Write-Host "📍 API Docs: http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host "📍 Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "🛑 Press Ctrl+C to stop all services" -ForegroundColor Red

# Wait for user to stop
try {
    while ($true) {
        Start-Sleep -Seconds 1
        
        # Check if jobs are still running
        if ($backendJob.State -eq "Completed" -or $backendJob.State -eq "Failed") {
            Write-Host "❌ Backend job stopped" -ForegroundColor Red
            Receive-Job $backendJob
        }
        
        if ($frontendJob.State -eq "Completed" -or $frontendJob.State -eq "Failed") {
            Write-Host "❌ Frontend job stopped" -ForegroundColor Red
            Receive-Job $frontendJob
        }
    }
} finally {
    Write-Host "🛑 Stopping all services..." -ForegroundColor Red
    Stop-Job $backendJob, $frontendJob
    Remove-Job $backendJob, $frontendJob
    Write-Host "✅ All services stopped" -ForegroundColor Green
}
