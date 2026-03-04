@echo off
echo ============================================
echo   AsthmaShield Full Stack Development Setup
echo ============================================
echo.

REM Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo [Setup] Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

echo [1/2] Starting Backend Server with nodemon...
cd backend
start "AsthmaShield Backend" cmd /k "npm run dev"
cd ..

echo.
echo [2/2] Starting Expo Frontend...
echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo Starting Expo Dev Server...
start "AsthmaShield Frontend" cmd /k "npm start"

echo.
echo ============================================
echo   Both servers are starting!
echo ============================================
echo.
echo Backend:  http://localhost:4000
echo Frontend: http://localhost:8081 (or Expo QR)
echo.
echo To stop servers: close the terminal windows or press Ctrl+C in each
echo.
pause

