# 🛡️ Asthma Shield Landing Page Setup
Write-Host "🛡️ Creating Asthma Shield Landing Page..." -ForegroundColor Green

# Create project folder
New-Item -ItemType Directory -Name "asthma-shield-landing" -Force | Out-Null
Set-Location "asthma-shield-landing"

# Initialize npm
Write-Host "⚡ Initializing project..." -ForegroundColor Yellow
npm init -y | Out-Null

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install react react-dom vite leaflet react-leaflet | Out-Null
npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-react | Out-Null

# Initialize Tailwind
Write-Host "🎨 Setting up Tailwind..." -ForegroundColor Yellow
npx tailwindcss init -p | Out-Null

# Create src folder
New-Item -ItemType Directory -Name "src" -Force | Out-Null

# Create package.json with proper scripts
Write-Host "📝 Creating configuration files..." -ForegroundColor Yellow
@"
{
  "name": "asthma-shield-landing",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.4",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.17"
  }
}
"@ | Out-File package.json -Encoding utf8

# Create vite.config.js
@"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
"@ | Out-File vite.config.js -Encoding utf8

# Create tailwind.config.js
@"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
"@ | Out-File tailwind.config.js -Encoding utf8

# Create postcss.config.js
@"
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
"@ | Out-File postcss.config.js -Encoding utf8

# Create index.html
@"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Asthma Shield</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"@ | Out-File index.html -Encoding utf8

# Create src/index.css
@"
@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: smooth; }
"@ | Out-File src\index.css -Encoding utf8

# Create src/main.jsx
@"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
"@ | Out-File src\main.jsx -Encoding utf8

# Create src/App.jsx
@"
import React from "react";
import LandingScreen from "./LandingScreen";

export default function App() {
  return (
    <LandingScreen
      onGetStarted={() => alert("Get Started clicked!")}
      onLogin={() => alert("Login clicked!")}
    />
  );
}
"@ | Out-File src\App.jsx -Encoding utf8

# Create complete LandingScreen.jsx
@"
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

const rwandaDistricts = [
  { name: "Kigali", lat: -1.9441, lng: 30.0619, aqi: 45 },
  { name: "Huye", lat: -2.5967, lng: 29.7394, aqi: 32 },
  { name: "Musanze", lat: -1.4997, lng: 29.6343, aqi: 28 },
  { name: "Rubavu", lat: -1.6792, lng: 29.2661, aqi: 38 },
  { name: "Nyagatare", lat: -1.2925, lng: 30.3267, aqi: 55 },
  { name: "Karongi", lat: -1.9536, lng: 29.3961, aqi: 41 },
];

const preventionTips = [
  {
    icon: "💨",
    title: "Monitor Air Quality",
    description: "Check daily AQI levels and avoid outdoor activities when pollution is high."
  },
  {
    icon: "💊",
    title: "Keep Inhaler Ready",
    description: "Always carry your rescue inhaler and know how to use it properly."
  },
  {
    icon: "🏠",
    title: "Clean Indoor Air",
    description: "Use air purifiers, avoid smoke, and keep humidity levels optimal."
  },
  {
    icon: "🏃♂️",
    title: "Stay Active Safely",
    description: "Exercise regularly but avoid outdoor activities during high pollution days."
  }
];

const getAQIColor = (aqi) => {
  if (aqi <= 50) return "#00e400";
  if (aqi <= 100) return "#ffff00";
  if (aqi <= 150) return "#ff7e00";
  if (aqi <= 200) return "#ff0000";
  return "#8f3f97";
};

export default function LandingScreen({ onGetStarted, onLogin }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState("patient");
  const [districtCount, setDistrictCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  const districtTarget = 30;
  const usersTarget = 5000;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const districtInterval = setInterval(() => {
      setDistrictCount((prev) => {
        if (prev < districtTarget) return prev + 1;
        clearInterval(districtInterval);
        return prev;
      });
    }, 50);

    const usersInterval = setInterval(() => {
      setUsersCount((prev) => {
        if (prev < usersTarget) return prev + 100;
        clearInterval(usersInterval);
        return prev;
      });
    }, 30);

    return () => {
      clearInterval(districtInterval);
      clearInterval(usersInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-white transition-all duration-500">

      {/* NAVBAR */}
      <header className="fixed w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-black text-blue-600">
            🛡️ Asthma Shield
          </h1>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-sm font-semibold hover:text-blue-600 transition"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <div className="h-20"></div>

      {/* HERO */}
      <section className="text-center py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl font-black mb-6 leading-tight">
          Protect Your Lungs <br />
          <span className="text-blue-600">Breathe Rwanda</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          AI-powered respiratory monitoring with real-time climate alerts and
          asthma risk predictions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
          >
            Get Started
          </button>
          <button
            onClick={onLogin}
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 dark:hover:bg-slate-800 transition"
          >
            Try Demo
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10">
          <div>
            <p className="text-4xl font-black text-blue-600">{districtCount}+</p>
            <p className="text-slate-500 dark:text-slate-400">Districts Covered</p>
          </div>
          <div>
            <p className="text-4xl font-black text-blue-600">{usersCount}+</p>
            <p className="text-slate-500 dark:text-slate-400">Active Users</p>
          </div>
          <div>
            <p className="text-4xl font-black text-blue-600">24/7</p>
            <p className="text-slate-500 dark:text-slate-400">Monitoring</p>
          </div>
        </div>
      </section>

      {/* RWANDA MAP */}
      <section className="py-20 px-6 text-center">
        <h3 className="text-3xl font-black mb-8">Rwanda Asthma Risk Map</h3>
        <MapContainer
          center={[-1.9403, 29.8739]}
          zoom={7}
          scrollWheelZoom={false}
          className="h-96 w-full rounded-3xl shadow-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {rwandaDistricts.map((d, i) => (
            <CircleMarker
              key={i}
              center={[d.lat, d.lng]}
              radius={15}
              pathOptions={{ color: getAQIColor(d.aqi), fillOpacity: 0.5 }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                <div className="text-xs font-bold">
                  {d.name} <br /> AQI: {d.aqi}
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm">
          Color-coded districts: Green (Good), Yellow (Moderate), Orange (Unhealthy for sensitive groups), Red (Unhealthy), Purple (Very Unhealthy)
        </p>
      </section>

      {/* ASTHMA PREVENTION TIPS */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h3 className="text-4xl font-black mb-4">Asthma Prevention Tips</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Important steps to protect yourself and manage attacks effectively.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {preventionTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{tip.icon}</div>
              <h4 className="text-xl font-bold mb-2">{tip.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-black text-center mb-12">FAQ</h3>
          {[
            {
              q: "How does Asthma Shield protect me?",
              a: "Monitors real-time climate and air quality, sends alerts for asthma risks."
            },
            {
              q: "What should I do during an asthma attack?",
              a: "Use your inhaler, stay calm, follow your doctor's advice, seek help if needed."
            },
            {
              q: "Is the AI Doctor real?",
              a: "Yes! It provides guidance based on respiratory medical protocols."
            }
          ].map((faq, i) => (
            <details key={i} className="mb-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
              <summary className="font-semibold cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-blue-600 text-white">
        <h3 className="text-4xl font-black mb-4">Ready to Breathe Safer?</h3>
        <button
          onClick={onGetStarted}
          className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
        >
          Start Now
        </button>
      </section>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl w-96 shadow-2xl">
            <h3 className="text-2xl font-black mb-6 text-center">Login</h3>
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setRole("patient")}
                className={`px-4 py-2 rounded-full ${role === "patient" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                Patient
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`px-4 py-2 rounded-full ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                Admin
              </button>
            </div>
            <input type="email" placeholder="Email" className="w-full mb-4 p-3 rounded-xl border"/>
            <input type="password" placeholder="Password" className="w-full mb-6 p-3 rounded-xl border"/>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Login as {role}</button>
            <button
              onClick={() => setShowLogin(false)}
              className="mt-4 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white text-center py-8">
        © {new Date().getFullYear()} Asthma Shield Rwanda
      </footer>

    </div>
  );
}
"@ | Out-File src\LandingScreen.jsx -Encoding utf8

Write-Host ""
Write-Host "✅ Project created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "   npm install" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Then open: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""

# Auto-install and start (optional)
$response = Read-Host "Auto-install and start dev server? (y/n)"
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host "🚀 Starting development server..." -ForegroundColor Green
    npm install
    npm run dev
}