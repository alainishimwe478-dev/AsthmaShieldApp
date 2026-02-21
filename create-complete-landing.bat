@echo off
echo 🛡️ Creating Asthma Shield Landing Page...
echo.

REM Create project directory
mkdir asthma-shield-landing 2>nul
cd asthma-shield-landing

REM Initialize npm project
echo ⚡ Initializing project...
call npm init -y >nul 2>&1

REM Install dependencies
echo 📦 Installing dependencies...
call npm install react react-dom vite leaflet react-leaflet >nul 2>&1
call npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-react >nul 2>&1

REM Initialize Tailwind
echo 🎨 Setting up Tailwind...
call npx tailwindcss init -p >nul 2>&1

REM Create directories
mkdir src 2>nul

REM Create package.json with proper scripts
echo 📝 Creating configuration files...
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

REM Create vite.config.js
(
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo.
echo export default defineConfig({
echo   plugins: [react()],
echo }^)
) > vite.config.js

REM Create tailwind.config.js
(
echo /** @type {import('tailwindcss'^).Config} */
echo module.exports = {
echo   content: ["./index.html", "./src/**/*.{js,jsx}"],
echo   theme: { extend: {} },
echo   plugins: [],
echo }
) > tailwind.config.js

REM Create postcss.config.js
(
echo module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
) > postcss.config.js

REM Create index.html
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo   ^<head^>
echo     ^<meta charset="UTF-8" /^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>
echo     ^<title^>Asthma Shield^</title^>
echo   ^</head^>
echo   ^<body^>
echo     ^<div id="root"^>^</div^>
echo     ^<script type="module" src="/src/main.jsx"^>^</script^>
echo   ^</body^>
echo ^</html^>
) > index.html

REM Create src/index.css
(
echo @tailwind base;
echo @tailwind components;
echo @tailwind utilities;
echo.
echo html { scroll-behavior: smooth; }
) > src\index.css

REM Create src/main.jsx
(
echo import React from "react";
echo import ReactDOM from "react-dom/client";
echo import App from "./App";
echo import "./index.css";
echo.
echo ReactDOM.createRoot(document.getElementById("root"^)^).render(
echo   ^<React.StrictMode^>^<App /^>^</React.StrictMode^>
echo ^);
) > src\main.jsx

REM Create src/App.jsx
(
echo import React from "react";
echo import LandingScreen from "./LandingScreen";
echo.
echo export default function App(^) {
echo   return ^<LandingScreen
echo     onGetStarted={(^) =^> alert("Get Started clicked!"^)}
echo     onLogin={(^) =^> alert("Login clicked!"^)}
echo   /^>;
echo }
) > src\App.jsx

REM Copy the LandingScreen component
copy "..\LandingScreen-template.jsx" "src\LandingScreen.jsx" >nul 2>&1

echo.
echo ✅ Project created successfully!
echo.
echo 🚀 Next steps:
echo    cd asthma-shield-landing
echo    npm install
echo    npm run dev
echo.
echo 🌐 Then open: http://localhost:5173
echo.
pause