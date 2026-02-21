# Install Required Packages

## 1. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
```

## 2. Install React Leaflet for Maps
```bash
npm install react-leaflet leaflet
```

## 3. Make sure your main.jsx imports the CSS
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'  // ← This line is CRITICAL

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## 4. Your file structure should be:
```
AsthmaShieldApp/
├── src/
│   ├── components/
│   │   └── LandingScreen.jsx  ✅
│   ├── index.css              ✅
│   └── main.jsx
├── tailwind.config.js         ✅
└── package.json
```

## 5. Test Tailwind is working
Add this to any component:
```jsx
<h1 className="text-5xl text-red-600 font-black">
  Tailwind Working!
</h1>
```

If it appears BIG and RED, Tailwind is working! 🎉