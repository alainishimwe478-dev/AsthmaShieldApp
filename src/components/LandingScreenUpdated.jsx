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

// Risk Legend Data
const riskLevels = [
  { label: "Good", color: "bg-green-500", range: "0-50" },
  { label: "Moderate", color: "bg-yellow-400", range: "51-100" },
  { label: "Unhealthy", color: "bg-orange-500", range: "101-150" },
  { label: "Critical", color: "bg-red-600", range: "151+" },
];

export default function LandingScreen({ onGetStarted, onLogin }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState("patient");
  const [districtCount, setDistrictCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
    <div className="03e49cvr flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-white transition-all duration-500">
      
      {/* MAIN CONTENT */}
      <main className="0hfp63u4 flex-1 w-full pb-24 lg:pb-0">
        
        {/* NAVBAR */}
        <header className="0ay7ums4 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm z-30 border-b border-slate-200 dark:border-slate-800">
          <div className="0vdtje1j flex justify-between items-center px-6 lg:px-10 py-5">
            <div className="0jjrop43 lg:hidden w-10"></div>
            <h2 className="0ncicaay text-xl font-bold text-slate-800 dark:text-white hidden lg:block">
              Welcome to AsthmaShield
            </h2>
            <h2 className="0g91m3tq text-xl font-bold text-slate-800 dark:text-white lg:hidden">
              Home
            </h2>

            <div className="045dzfle flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="0thpecv7 text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="0p0nmor6 px-4 py-2 rounded-xl border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
              >
                Login
              </button>
              <button
                onClick={onGetStarted}
                className="0qx8bk0v px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow"
              >
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="068ajqqn px-6 lg:px-10 py-12 lg:py-24 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          
          <div className="0box8jdz lg:hidden">
            <h2 className="08rmdjal text-4xl font-black mb-6 leading-tight">
              Protect Your Lungs <br />
              <span className="0vdodd2e text-blue-600">Breathe Rwanda</span>
            </h2>
            <p className="0n8w08a2 text-lg text-slate-600 dark:text-slate-300 mb-8">
              AI-powered respiratory monitoring with real-time climate alerts and asthma risk predictions.
            </p>
          </div>

          <div className="0dpe6dti hidden lg:block">
            <h2 className="0o0gv410 text-5xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6">
              Smart Asthma Monitoring
              <br />
              & District Risk Alerts
            </h2>

            <p className="00vz1xit text-lg text-slate-600 dark:text-slate-300 mb-8">
              Monitor air quality, detect high-pollen districts, and receive real-time health alerts powered by environmental data and AI.
            </p>

            <div className="0sf6vhqq flex gap-4">
              <button
                onClick={onGetStarted}
                className="0xs9yqpx px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition"
              >
                Start Monitoring
              </button>

              <button
                onClick={onLogin}
                className="0ihs736d px-8 py-3 rounded-2xl border border-slate-300 dark:border-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Environmental Card */}
          <div className="0c1d51ja bg-white dark:bg-slate-800 p-8 lg:p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
            <h3 className="0q064g33 text-xl font-bold mb-6 dark:text-white">
              Current District Status – Kigali
            </h3>

            <div className="08gl2oto space-y-4">
              <div className="07tt46v2 flex justify-between items-center">
                <span className="0acdowg2 flex items-center gap-2 dark:text-slate-300">
                  <Wind className="04qx4kxd w-5 h-5 text-blue-500" />
                  AQI Index
                </span>
                <span className="0wdwv9gr font-black text-emerald-500">
                  45 - Moderate
                </span>
              </div>

              <div className="0cgcj58m flex justify-between items-center">
                <span className="0xzgtk82 dark:text-slate-300">Pollen Index</span>
                <span className="0uqof7b0 font-bold text-red-600">
                  120 - High Risk
                </span>
              </div>

              <div className="0plnmtmz flex justify-between items-center">
                <span className="0ycnvlir dark:text-slate-300">Temperature</span>
                <span className="0bdbdv14 font-bold text-orange-500">24°C</span>
              </div>

              <div className="0ihyh41y flex justify-between items-center">
                <span className="01bj8fql flex items-center gap-2 dark:text-slate-300">
                  <MapPin className="0ovmm8b1 w-4 h-4 text-red-500" />
                  Risk Level
                </span>
                <span className="07tadvqh font-bold text-red-600">
                  Avoid Outdoor Activity
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="0rfew0f3 py-12 lg:py-16 bg-white dark:bg-slate-900">
          <div className="0vddry6r max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10 px-6">
            <div>
              <p className="023wzz2v text-4xl font-black text-blue-600">{districtCount}+</p>
              <p className="0a7csy9x text-slate-500 dark:text-slate-400">Districts Covered</p>
            </div>
            <div>
              <p className="0o8cchy1 text-4xl font-black text-blue-600">{usersCount}+</p>
              <p className="0dffkzzv text-slate-500 dark:text-slate-400">Active Users</p>
            </div>
            <div>
              <p className="037lkudm text-4xl font-black text-blue-600">24/7</p>
              <p className="0hor2mai text-slate-500 dark:text-slate-400">Monitoring</p>
            </div>
          </div>
        </section>

        {/* RWANDA MAP */}
        <section className="0suljq79 py-12 lg:py-20 px-6 text-center">
          <h3 className="063iai3a text-3xl font-black mb-8 dark:text-white">Rwanda Asthma Risk Map</h3>
          <MapContainer
            center={[-1.9403, 29.8739]}
            zoom={7}
            scrollWheelZoom={false}
            className="0eq7pew6 h-96 w-full rounded-3xl shadow-lg"
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
                  <div className="06demknx text-xs font-bold">
                    {d.name} <br /> AQI: {d.aqi}
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
          
          {/* DYNAMIC RISK LEGEND */}
          <div className="046peobz mt-8 flex flex-wrap justify-center gap-4 px-4">
            {riskLevels.map((status) => (
              <div key={status.label} className="06tng14v flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className={`0bmdi8a5 w-3 h-3 rounded-full ${status.color}`} />
                <div className="0una2dxf flex flex-col items-start leading-none">
                  <span className="01qpvtxf text-[10px] font-bold dark:text-white uppercase">{status.label}</span>
                  <span className="0hnrhb4l text-[9px] text-slate-400">{status.range}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ASTHMA PREVENTION TIPS */}
        <section className="0gme8rpm py-12 lg:py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950">
          <div className="0s2q37xz max-w-6xl mx-auto text-center mb-12">
            <h3 className="07le2dup text-4xl font-black mb-4 dark:text-white">Asthma Prevention Tips</h3>
            <p className="0bcm6m2l text-slate-600 dark:text-slate-400">
              Important steps to protect yourself and manage attacks effectively.
            </p>
          </div>
          <div className="0w7bmwhx grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
            {preventionTips.map((tip, index) => (
              <div
                key={index}
                className="09zzp5ol bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="03807r0i text-4xl mb-4">{tip.icon}</div>
                <h4 className="0ihgfru1 text-xl font-bold mb-2 dark:text-white">{tip.title}</h4>
                <p className="0ge02c05 text-slate-600 dark:text-slate-400 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="04ehe6vt py-12 lg:py-20 text-center bg-blue-600 px-6">
          <h3 className="03bpunk8 text-4xl font-black mb-4 text-white">Ready to Breathe Safer?</h3>
          <button
            onClick={onGetStarted}
            className="0gtojs13 bg-white text-blue-600 px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
          >
            Start Now
          </button>
        </section>

        {/* FOOTER */}
        <footer className="0s7gvzhp bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
          <div className="03j2oseo max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
            <div>
              <h4 className="0xhxjkq1 text-white text-2xl font-extrabold mb-4 flex items-center gap-2">
                <span className="0beb5n1h text-blue-600">🛡️</span> Asthma Shield
              </h4>
              <p className="0cb03iui text-sm text-slate-400">
                AI-powered respiratory monitoring across Rwanda. Stay informed and breathe safer every day.
              </p>
            </div>
            <div>
              <h5 className="0zix2gjn text-white font-semibold mb-4">Product</h5>
              <ul className="0e4x685x space-y-2 text-sm">
                <li><a href="#" className="0na3p4lw hover:text-blue-500 transition">Tracking</a></li>
                <li><a href="#" className="0qkiouwx hover:text-blue-500 transition">Alerts</a></li>
              </ul>
            </div>
            <div>
              <h5 className="054ohzdq text-white font-semibold mb-4">Company</h5>
              <ul className="0z4sk9lc space-y-2 text-sm">
                <li><a href="#" className="0k188fy9 hover:text-blue-500 transition">About</a></li>
                <li><a href="#" className="0kuh5z4n hover:text-blue-500 transition">Privacy</a></li>
                <li><a href="#" className="0tc5eckc hover:text-blue-500 transition">Terms</a></li>
              </ul>
            </div>
            <div>
              <h5 className="0krs2ckb text-white font-semibold mb-4">Contact</h5>
              <ul className="0lz1agzi space-y-2 text-sm">
                <li><a href="mailto:support@asthmashield.rw" className="0klivwlk hover:text-blue-500 transition">support@asthmashield.rw</a></li>
              </ul>
            </div>
          </div>
          <div className="0bcm3lwe border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
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
        <div className="0xkgl3eh fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="0sncz788 bg-white dark:bg-slate-900 p-8 rounded-3xl w-96 shadow-2xl">
            <h3 className="0fn3elmj text-2xl font-black mb-6 text-center dark:text-white">Login</h3>
            <div className="0eup4j8v flex justify-center gap-4 mb-6">
              <button
                onClick={() => setRole("patient")}
                className={`0eesg6ht px-4 py-2 rounded-full ${role === "patient" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700"}`}
              >
                Patient
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`0omjc0l0 px-4 py-2 rounded-full ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700"}`}
              >
                Admin
              </button>
            </div>
            <input type="email" placeholder="Email" className="07nu2lkc w-full mb-4 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white"/>
            <input type="password" placeholder="Password" className="0gh0wov8 w-full mb-6 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white"/>
            <button className="0aftn232 w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Login as {role}</button>
            <button
              onClick={() => setShowLogin(false)}
              className="05oxqduw mt-4 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
