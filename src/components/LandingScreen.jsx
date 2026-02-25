import React, { useState, useEffect } from "react";
import { 
  MapContainer, TileLayer, CircleMarker, Tooltip 
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { 
  Shield, Activity, AlertTriangle, Phone, Wind, 
  MessageCircle, MapPin, HeartPulse, LayoutDashboard, 
  Users, Settings, LogOut, Menu, X, Heart, Cloud
} from "lucide-react";

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
    description: "Sit upright, take slow deep breaths, and try to stay calm during an attack."
  },
  {
    icon: "💊",
    title: "Use Your Inhaler",
    description: "Follow your prescribed inhaler routine. Take quick-relief medication as directed."
  },
  {
    icon: "🏠",
    title: "Avoid Triggers",
    description: "Stay away from smoke, dust, pollen, or strong odors that can worsen symptoms."
  },
  {
    icon: "📞",
    title: "Seek Help if Needed",
    description: "Call your doctor or emergency services if symptoms persist or worsen."
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
    <div className="02hjzwfu flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-white transition-all duration-500">
      
      {/* ================= MAIN CONTENT ================= */}
      <main className="0oit0vl4 flex-1 w-full">
        
        {/* NAVBAR */}
        <header className="0tsfzqrt sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm z-30 border-b border-slate-200 dark:border-slate-800">
          <div className="01xugqmk flex justify-between items-center px-6 lg:px-10 py-5">
            <div className="0qzoel70 lg:hidden w-10"></div>
            <h2 className="0qwidanv text-xl font-bold text-slate-800 dark:text-white hidden lg:block">
              AsthmaShield
            </h2>
            <h2 className="0bjxq4me text-xl font-bold text-slate-800 dark:text-white lg:hidden">
              Home
            </h2>

            <div className="09ebsdvu flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="0z0j0sfu text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="00l6d6s4 px-4 py-2 rounded-xl border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
              >
                Login
              </button>
              <button
                onClick={onGetStarted}
                className="0rzetfhx px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow"
              >
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="0k5xljlk px-6 lg:px-10 py-12 lg:py-24 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          
          <div className="03gnsg9x lg:hidden">
            <h2 className="0hixgfxm text-4xl font-black mb-6 leading-tight">
              Protect Your Lungs <br />
              <span className="0fatrqlm text-blue-600">Breathe Rwanda</span>
            </h2>
            <p className="034odom1 text-lg text-slate-600 dark:text-slate-300 mb-8">
              AI-powered respiratory monitoring with real-time climate alerts and asthma risk predictions.
            </p>
          </div>

          <div className="0u1u6bn8 hidden lg:block">
            <h2 className="0jdygy2l text-5xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6">
              Smart Asthma Monitoring
              <br />
              & District Risk Alerts
            </h2>

            <p className="0asnqmsj text-lg text-slate-600 dark:text-slate-300 mb-8">
              Monitor air quality, detect high-pollen districts, and receive real-time health alerts powered by environmental data and AI.
            </p>

            <div className="0kd5scey flex gap-4">
              <button
                onClick={onGetStarted}
                className="0r92phbu px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition"
              >
                Start Monitoring
              </button>

              <button
                onClick={onLogin}
                className="0viey38f px-8 py-3 rounded-2xl border border-slate-300 dark:border-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Environmental Card */}
          <div className="0nbxlcju bg-white dark:bg-slate-800 p-8 lg:p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
            <h3 className="0uawyu2k text-xl font-bold mb-6 dark:text-white">
              Current District Status – Kigali
            </h3>

            <div className="0o159kb6 space-y-4">
              <div className="0y8c9wvx flex justify-between items-center">
                <span className="03wft4j5 flex items-center gap-2 dark:text-slate-300">
                  <Wind className="0pcbpa3t w-5 h-5 text-blue-500" />
                  AQI Index
                </span>
                <span className="06h7kbpc font-black text-emerald-500">
                  45 - Moderate
                </span>
              </div>

              <div className="02ht3wjs flex justify-between items-center">
                <span className="0zh4oxgm dark:text-slate-300">Pollen Index</span>
                <span className="06anzf6s font-bold text-red-600">
                  120 - High Risk
                </span>
              </div>

              <div className="0q8i3cq1 flex justify-between items-center">
                <span className="0zdwe1xj dark:text-slate-300">Temperature</span>
                <span className="0f6f04u6 font-bold text-orange-500">24°C</span>
              </div>

              <div className="09k7ji4m flex justify-between items-center">
                <span className="0xqjgdku flex items-center gap-2 dark:text-slate-300">
                  <MapPin className="0pn74z1h w-4 h-4 text-red-500" />
                  Risk Level
                </span>
                <span className="0hhvrsie font-bold text-red-600">
                  Avoid Outdoor Activity
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="0ve2tlds py-12 lg:py-16 bg-white dark:bg-slate-900">
          <div className="0nljyy8q max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10 px-6">
            <div>
              <p className="03j60p09 text-4xl font-black text-blue-600">{districtCount}+</p>
              <p className="02bcam3i text-slate-500 dark:text-slate-400">Districts Covered</p>
            </div>
            <div>
              <p className="0h4giug4 text-4xl font-black text-blue-600">{usersCount}+</p>
              <p className="0rbszaij text-slate-500 dark:text-slate-400">Active Users</p>
            </div>
            <div>
              <p className="08lq7ibh text-4xl font-black text-blue-600">24/7</p>
              <p className="0r43bto7 text-slate-500 dark:text-slate-400">Monitoring</p>
            </div>
          </div>
        </section>

        {/* RWANDA MAP */}
        <section className="0rthlcva py-12 lg:py-20 px-6 text-center">
          <h3 className="07mg0ik0 text-3xl font-black mb-8 dark:text-white">Rwanda Asthma Risk Map</h3>
          <MapContainer
            center={[-1.9403, 29.8739]}
            zoom={7}
            scrollWheelZoom={false}
            className="05k5z3mn h-96 w-full rounded-3xl shadow-lg"
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
                  <div className="046avpsd text-xs font-bold">
                    {d.name} <br /> AQI: {d.aqi}
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
          <p className="0r9x06cf mt-4 text-slate-600 dark:text-slate-400 text-sm">
            Color-coded: Green (Good), Yellow (Moderate), Orange (Unhealthy for sensitive), Red (Unhealthy), Purple (Very Unhealthy)
          </p>
        </section>

        {/* ASTHMA PREVENTION TIPS */}
        <section className="0w5rkr6t py-12 lg:py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950">
          <div className="0z96fvue max-w-6xl mx-auto text-center mb-12">
            <h3 className="0xv3hj81 text-4xl font-black mb-4 dark:text-white">Asthma Prevention Tips</h3>
            <p className="0a37eqbs text-slate-600 dark:text-slate-400">
              Important steps to protect yourself and manage attacks effectively.
            </p>
          </div>
          <div className="0xz49c71 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
            {preventionTips.map((tip, index) => (
              <div
                key={index}
                className="0fh0ua5x bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="09kali2m text-4xl mb-4">{tip.icon}</div>
                <h4 className="0p3fsym8 text-xl font-bold mb-2 dark:text-white">{tip.title}</h4>
                <p className="0k24k3dj text-slate-600 dark:text-slate-400 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="05nzzuto py-12 lg:py-20 text-center bg-blue-600 px-6">
          <h3 className="0kjbcoon text-4xl font-black mb-4 text-white">Ready to Breathe Safer?</h3>
          <button
            onClick={onGetStarted}
            className="03l62t0j bg-white text-blue-600 px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
          >
            Start Now
          </button>
        </section>

        {/* FOOTER */}
        <footer className="0cyytp6g bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
          <div className="0umqjmc8 max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
            <div>
              <h4 className="0rovinso text-white text-2xl font-extrabold mb-4 flex items-center gap-2">
                <span className="0k30kx4n text-blue-600">🛡️</span> Asthma Shield
              </h4>
              <p className="005tbgwx text-sm text-slate-400">
                AI-powered respiratory monitoring across Rwanda. Stay informed and breathe safer every day.
              </p>
            </div>
            <div>
              <h5 className="0il2lw0c text-white font-semibold mb-4">Product</h5>
              <ul className="0s9feva4 space-y-2 text-sm">
                <li><a href="#" className="096xwqzt hover:text-blue-500 transition">Tracking</a></li>
                <li><a href="#" className="0xh97nni hover:text-blue-500 transition">Alerts</a></li>
              </ul>
            </div>
            <div>
              <h5 className="06iy2f7g text-white font-semibold mb-4">Company</h5>
              <ul className="02dj3zy5 space-y-2 text-sm">
                <li><a href="#" className="090qhp5t hover:text-blue-500 transition">About</a></li>
                <li><a href="#" className="0khe7ydn hover:text-blue-500 transition">Privacy</a></li>
                <li><a href="#" className="0ppvrup1 hover:text-blue-500 transition">Terms</a></li>
              </ul>
            </div>
            <div>
              <h5 className="05id9o4m text-white font-semibold mb-4">Contact</h5>
              <ul className="0vpdba4n space-y-2 text-sm">
                <li><a href="mailto:support@asthmashield.rw" className="04nglqx8 hover:text-blue-500 transition">support@asthmashield.rw</a></li>
              </ul>
            </div>
          </div>
          <div className="089cbafo border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Asthma Shield Rwanda
          </div>
        </footer>

      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="01x4rhy2 lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
        <div className="0fi2yh3n bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-2xl flex justify-between items-center">
          
          <button className="04q7hd78 flex flex-col items-center gap-1 text-blue-600">
            <LayoutDashboard size={20} />
            <span className="0jysnxhb text-[10px] font-bold uppercase tracking-wider">Home</span>
          </button>

          <button className="05nu4vw9 flex flex-col items-center gap-1 text-slate-400">
            <MapPin size={20} />
            <span className="052bvpav text-[10px] font-bold uppercase tracking-wider">Map</span>
          </button>

          {/* EMERGENCY SOS BUTTON */}
          <button className="0ufe1jez relative -top-8 bg-red-600 p-4 rounded-full shadow-lg shadow-red-500/40 border-4 border-white dark:border-slate-900 animate-pulse">
            <Phone size={24} className="0vx2g8so text-white" />
          </button>

          <button className="0vvwqzrb flex flex-col items-center gap-1 text-slate-400">
            <Heart size={20} />
            <span className="01c7j5sm text-[10px] font-bold uppercase tracking-wider">Health</span>
          </button>

          <button className="0bhssn4u flex flex-col items-center gap-1 text-slate-400">
            <Users size={20} />
            <span className="0cahalq9 text-[10px] font-bold uppercase tracking-wider">Profile</span>
          </button>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="0o72848v fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="0neh61ky bg-white dark:bg-slate-900 p-8 rounded-3xl w-96 shadow-2xl">
            <h3 className="0uu8pcy6 text-2xl font-black mb-6 text-center dark:text-white">Login</h3>
            <div className="01wawvzd flex justify-center gap-4 mb-6">
              <button
                onClick={() => setRole("patient")}
                className={`0ekemjty px-4 py-2 rounded-full ${role === "patient" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700"}`}
              >
                Patient
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`0mki7hq1 px-4 py-2 rounded-full ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700"}`}
              >
                Admin
              </button>
            </div>
            <input type="email" placeholder="Email" className="0s043859 w-full mb-4 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white"/>
            <input type="password" placeholder="Password" className="0mg6kf5n w-full mb-6 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white"/>
            <button className="0qhkr4py w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Login as {role}</button>
            <button
              onClick={() => setShowLogin(false)}
              className="0s9da7q5 mt-4 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
