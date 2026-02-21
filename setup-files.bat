@echo off
echo Setting up project files...

REM Create Vite config
(
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo.
echo export default defineConfig({
echo   plugins: [react()],
echo }^)
) > vite.config.js

REM Create Tailwind config
(
echo /** @type {import('tailwindcss'^).Config} */
echo module.exports = {
echo   content: ["./index.html", "./src/**/*.{js,jsx}"],
echo   theme: { extend: {} },
echo   plugins: [],
echo }
) > tailwind.config.js

REM Create PostCSS config
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

echo Files created successfully!
echo.
echo Now run:
echo npm install
echo npm run dev