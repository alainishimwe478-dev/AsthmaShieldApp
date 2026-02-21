import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Rwanda districts & AQI
const rwandaDistricts = [
  { name: "Kigali", lat: -1.9441, lng: 30.0619, aqi: 12 },
  { name: "Musanze", lat: -1.4780, lng: 29.6360, aqi: 40 },
  { name: "Huye", lat: -2.5956, lng: 29.7390, aqi: 75 },
  { name: "Nyagatare", lat: -1.2942, lng: 30.3286, aqi: 110 },
  { name: "Rubavu", lat: -1.7514, lng: 29.2686, aqi: 160 },
];

const getAQIColor = (aqi) => {
  if (aqi <= 50) return "green";
  if (aqi <= 100) return "yellow";
  if (aqi <= 150) return "orange";
  if (aqi <= 200) return "red";
  return "purple";
};

// Asthma Prevention Tips
const preventionTips = [
  {
    icon: "💨",
    title: "Stay Calm & Breathe Slowly",
    description:
      "Sit upright, take slow deep breaths, and try to stay calm during an attack."
  },
  {
    icon: "💊",
    title: "Use Your Inhaler",
    description:
      "Follow your prescribed inhaler routine. Take quick-relief medication as directed."
  },
  {
    icon: "🏠",
    title: "Avoid Triggers",
    description:
      "Stay away from smoke, dust, pollen, or strong odors that can worsen symptoms."
  },
  {
    icon: "📞",
    title: "Seek Help if Needed",
    description:
      "Call your doctor or emergency services if symptoms persist or worsen."
  }
];

export default function LandingScreen({ onGetStarted, onLogin }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState("patient");
  const [districtCount, setDistrictCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Animated counters
  useEffect(() => {
    const districtTarget = 30;
    const usersTarget = 5000;
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
    <div className="0fn4zej4 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-white transition-all duration-500">

      {/* NAVBAR */}
      <header className="0ncnl7qp fixed w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="0byqpaeb max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="0am41dqy text-xl font-black text-blue-600">
            🛡️ Asthma Shield
          </h1>
          <div className="0yqwcvct flex items-center gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="0bzdw2ug text-sm font-semibold hover:text-blue-600 transition"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="01tous6m bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <div className="00zsacva h-20"></div>

      {/* HERO */}
      <section className="0g0j730x text-center py-20 px-6 max-w-4xl mx-auto">
        <h2 className="0zbyo9rd text-5xl font-black mb-6 leading-tight">
          Protect Your Lungs <br />
          <span className="0sykmx5x text-blue-600">Breathe Rwanda</span>
        </h2>
        <p className="0pchbdrl text-lg text-slate-600 dark:text-slate-300 mb-8">
          AI-powered respiratory monitoring with real-time climate alerts and
          asthma risk predictions.
        </p>
        <div className="0h5zi4hz flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="0ojcekc1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
          >
            Get Started
          </button>
          <button
            onClick={onLogin}
            className="0tptpojl border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 dark:hover:bg-slate-800 transition"
          >
            Try Demo
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="0eut3mm7 py-16 bg-white dark:bg-slate-900">
        <div className="0z7huud3 max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10">
          <div>
            <p className="00rs8fxh text-4xl font-black text-blue-600">{districtCount}+</p>
            <p className="0ectm3xp text-slate-500 dark:text-slate-400">Districts Covered</p>
          </div>
          <div>
            <p className="0ptbdhy1 text-4xl font-black text-blue-600">{usersCount}+</p>
            <p className="03z9w0is text-slate-500 dark:text-slate-400">Active Users</p>
          </div>
          <div>
            <p className="07464uur text-4xl font-black text-blue-600">24/7</p>
            <p className="0ysxuh0i text-slate-500 dark:text-slate-400">Monitoring</p>
          </div>
        </div>
      </section>

      {/* RWANDA MAP */}
      <section className="0d36z5a0 py-20 px-6 text-center">
        <h3 className="0jfwfvxa text-3xl font-black mb-8">Rwanda Asthma Risk Map</h3>
        <MapContainer
          center={[-1.9403, 29.8739]}
          zoom={7}
          scrollWheelZoom={false}
          className="0b42sm2i h-96 w-full rounded-3xl shadow-lg"
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
                <div className="0xf0t5cf text-xs font-bold">
                  {d.name} <br /> AQI: {d.aqi}
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
        <p className="0osg5ms0 mt-4 text-slate-600 dark:text-slate-400 text-sm">
          Color-coded districts: Green (Good), Yellow (Moderate), Orange (Unhealthy for sensitive groups), Red (Unhealthy), Purple (Very Unhealthy)
        </p>
      </section>

      {/* ASTHMA PREVENTION TIPS */}
      <section className="00ptc088 py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950">
        <div className="0smvg5b2 max-w-6xl mx-auto text-center mb-12">
          <h3 className="0r0cj4fb text-4xl font-black mb-4">Asthma Prevention Tips</h3>
          <p className="0nph9k69 text-slate-600 dark:text-slate-400">
            Important steps to protect yourself and manage attacks effectively.
          </p>
        </div>
        <div className="0tbpfp0t grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {preventionTips.map((tip, index) => (
            <div
              key={index}
              className="0ppo61q1 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="0n7zlq9n text-4xl mb-4">{tip.icon}</div>
              <h4 className="09klfx7a text-xl font-bold mb-2">{tip.title}</h4>
              <p className="028ajuvm text-slate-600 dark:text-slate-400 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="0gn09l6c py-24 px-6">
        <div className="0ffo9pe0 max-w-4xl mx-auto">
          <h3 className="0jtr93wf text-4xl font-black text-center mb-12">FAQ</h3>
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
            <details key={i} className="0xjrt5iy mb-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
              <summary className="011zd3sd font-semibold cursor-pointer">{faq.q}</summary>
              <p className="04388y0h mt-2 text-slate-600 dark:text-slate-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="0li9nt7f py-20 text-center bg-blue-600 text-white">
        <h3 className="0zk89yas text-4xl font-black mb-4">Ready to Breathe Safer?</h3>
        <button
          onClick={onGetStarted}
          className="0258boq3 bg-white text-blue-600 px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
        >
          Start Now
        </button>
      </section>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="0e9l4w3d fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="00e87wwf bg-white dark:bg-slate-900 p-8 rounded-3xl w-96 shadow-2xl">
            <h3 className="0rdh53d9 text-2xl font-black mb-6 text-center">Login</h3>
            <div className="0xq2i2qp flex justify-center gap-4 mb-6">
              <button
                onClick={() => setRole("patient")}
                className={`0hupym3h px-4 py-2 rounded-full ${role === "patient" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                Patient
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`0039ywng px-4 py-2 rounded-full ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                Admin
              </button>
            </div>
            <input type="email" placeholder="Email" className="0dioc4tq w-full mb-4 p-3 rounded-xl border"/>
            <input type="password" placeholder="Password" className="049bok6l w-full mb-6 p-3 rounded-xl border"/>
            <button className="0vtuqast w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Login as {role}</button>
            <button
              onClick={() => setShowLogin(false)}
              className="0ccff5y0 mt-4 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="0sfvz67t bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
        <div className="06sqv6p3 max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h4 className="09ekc9gt text-white text-2xl font-extrabold mb-4 flex items-center gap-2">
              <span className="0757l48p text-blue-600">🛡️</span> Asthma Shield
            </h4>
            <p className="0ixnt0c4 text-sm text-slate-400">
              AI-powered respiratory monitoring across Rwanda. Stay informed and breathe safer every day.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h5 className="01vbicat text-white font-semibold mb-4">Product</h5>
            <ul className="0ionhqxe space-y-2 text-sm">
              <li>
                <a href="#tracking" className="0vj5fcca hover:text-blue-500 transition">Tracking</a>
              </li>
              <li>
                <a href="#alerts" className="0xgv243w hover:text-blue-500 transition">Alerts</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="01t3xsve text-white font-semibold mb-4">Company</h5>
            <ul className="0b2dd4ai space-y-2 text-sm">
              <li>
                <a href="#about" className="0mcb6rpa hover:text-blue-500 transition">About</a>
              </li>
              <li>
                <a href="#privacy" className="0efenv6n hover:text-blue-500 transition">Privacy</a>
              </li>
              <li>
                <a href="#terms" className="0dvr8pi9 hover:text-blue-500 transition">Terms</a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="073kzibi text-white font-semibold mb-4">Contact</h5>
            <ul className="02i8ycvh space-y-2 text-sm">
              <li>
                <a href="mailto:support@asthmashield.rw" className="0ujzgmva hover:text-blue-500 transition">
                  support@asthmashield.rw
                </a>
              </li>
              <li>
                <div className="0huzz90h flex gap-3 mt-2">
                  <a href="#" className="01tpskr2 hover:text-blue-500 transition">📘</a>
                  <a href="#" className="0ewl9c0x hover:text-blue-500 transition">💼</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="0auiizwq border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Asthma Shield Rwanda</span>
        </div>
      </footer>
      </div>
    );
  }
