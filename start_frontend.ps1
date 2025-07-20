# Simple Frontend Startup Script
# For Dbanyan Group Frontend

Write-Host "⚛️ Starting Dbanyan Group Frontend..." -ForegroundColor Green

# Navigate to frontend directory
Set-Location "c:\Users\devanshu\Downloads\dbanayan\Dbanyan-Project\frontend\dbanyan"

# Install dependencies if needed
Write-Host "📦 Installing/updating dependencies..." -ForegroundColor Yellow
npm install

# Start the development server
Write-Host "🚀 Starting React development server..." -ForegroundColor Green
Write-Host "📍 Frontend will be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🛑 Press Ctrl+C to stop the server" -ForegroundColor Red

npm run dev
