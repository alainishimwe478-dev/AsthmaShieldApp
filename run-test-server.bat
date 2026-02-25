@echo off
echo ========================================
echo AsthmaShield - Test Server Runner
echo ========================================
echo.

echo Step 1: Checking if Node.js is installed...
node -v
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)
echo Node.js is installed!
echo.

echo Step 2: Checking current folder...
dir test.js
if errorlevel 1 (
    echo ERROR: test.js not found in current folder!
    echo Please make sure you are in the correct folder.
    pause
    exit /b 1
)
echo test.js found!
echo.

echo Step 3: Starting test server...
echo Press CTRL+C to stop the server when done testing.
echo.
echo Starting server on http://localhost:4000
echo.

node test.js

pause
