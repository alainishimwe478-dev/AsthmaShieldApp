@echo off
echo Creating Asthma Shield Landing Page...

mkdir asthma-shield-landing
cd asthma-shield-landing

echo Initializing npm project...
call npm init -y

echo Installing dependencies...
call npm install react react-dom vite leaflet react-leaflet
call npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-react

echo Initializing Tailwind...
call npx tailwindcss init -p

echo Creating project structure...
mkdir src

echo Creating package.json scripts...
(
echo {
echo   "name": "asthma-shield-landing",
echo   "private": true,
echo   "version": "0.0.0",
echo   "type": "module",
echo   "scripts": {
echo     "dev": "vite",
echo     "build": "vite build",
echo     "preview": "vite preview"
echo   },
echo   "dependencies": {
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "leaflet": "^1.9.4",
echo     "react-leaflet": "^4.2.1"
echo   },
echo   "devDependencies": {
echo     "@vitejs/plugin-react": "^4.2.1",
echo     "vite": "^5.1.4",
echo     "tailwindcss": "^3.4.1",
echo     "postcss": "^8.4.35",
echo     "autoprefixer": "^10.4.17"
echo   }
echo }
) > package.json

echo Project created successfully!
echo.
echo Next steps:
echo 1. cd asthma-shield-landing
echo 2. Run the setup-files.bat script
echo 3. npm install
echo 4. npm run dev