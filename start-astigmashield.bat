@echo off
echo ========================================
echo AsthmaShield - Full Stack Startup
echo ========================================
echo.

echo Step 1: Starting Backend Server...
echo This will run on http://localhost:4000
echo.
cd AsthmaShieldApp\backend
start "AsthmaShield Backend" cmd /k "node server.js"

timeout /t 3 /nobreak > nul

echo.
echo Step 2: Starting Frontend Dev Server...
echo This will run on http://localhost:5173
echo.
start "AsthmaShield Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo.
echo Backend:   http://localhost:4000
echo Frontend:  http://localhost:5173
echo.
echo Keep both terminal windows open!
echo ========================================
echo.
pause
