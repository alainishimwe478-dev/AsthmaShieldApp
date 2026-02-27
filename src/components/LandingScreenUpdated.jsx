import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Shield,
  Activity,
  AlertTriangle,
  Phone,
  Wind,
  MessageCircle,
  MapPin,
  HeartPulse,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Heart,
  Cloud,
} from "lucide-react";

// Rwanda districts & AQI
const rwandaDistricts = [
  { name: "Kigali", lat: -1.9441, lng: 30.0619, aqi: 12 },
  { name: "Musanze", lat: -1.478, lng: 29.636, aqi: 40 },
  { name: "Huye", lat: -2.5956, lng: 29.739, aqi: 75 },
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
      "Sit upright, take slow deep breaths, and try to stay calm during an attack.",
  },
  {
    icon: "💊",
    title: "Use Your Inhaler",
    description:
      "Follow your prescribed inhaler routine. Take quick-relief medication as directed.",
  },
  {
    icon: "🏠",
    title: "Avoid Triggers",
    description:
      "Stay away from smoke, dust, pollen, or strong odors that can worsen symptoms.",
  },
  {
    icon: "📞",
    title: "Seek Help if Needed",
    description:
      "Call your doctor or emergency services if symptoms persist or worsen.",
  },
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
  const [email, setEmail] = useState("");
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

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return false;
    }
    alert(`Logged in as ${role} with ${email} successfully!`);
    return true;
  };

  return (
    <div className="0n9kjsyk flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-white transition-all duration-500">
      {/* MAIN CONTENT */}
      <main className="06rfa5yg flex-1 w-full pb-24 lg:pb-0">
        {/* NAVBAR */}
        <header className="0pvn8psg sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm z-30 border-b border-slate-200 dark:border-slate-800">
          <div className="0g9i3lel flex justify-between items-center px-6 lg:px-10 py-5">
            <div className="068t9g6n lg:hidden w-10"></div>
            <h2 className="0ojclvs3 text-xl font-bold text-slate-800 dark:text-white hidden lg:block">
              AsthmaShield
            </h2>
            <h2 className="0jhzrpib text-xl font-bold text-slate-800 dark:text-white lg:hidden">
              Home
            </h2>

            <div className="0d146ly2 flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="0ro1w8gm text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="09knublt px-4 py-2 rounded-xl border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
              >
                Login
              </button>
              <button
                onClick={onGetStarted}
                className="00kc268e px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow"
              >
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="00z772nx px-6 lg:px-10 py-12 lg:py-24 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          <div className="0ged7pxv lg:hidden">
            <h2 className="087s4gz6 text-4xl font-black mb-6 leading-tight">
              Protect Your Lungs <br />
              <span className="0nnmup1c text-blue-600">Breathe Rwanda</span>
            </h2>
            <p className="0cuylb78 text-lg text-slate-600 dark:text-slate-300 mb-8">
              AI-powered respiratory monitoring with real-time climate alerts
              and asthma risk predictions.
            </p>
          </div>

          <div className="0ww4kw6s hidden lg:block">
            <h2 className="05dcmzbx text-5xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6">
              Smart Asthma Monitoring
              <br />& District Risk Alerts
            </h2>

            <p className="0ixrowyz text-lg text-slate-600 dark:text-slate-300 mb-8">
              Monitor air quality, detect high-pollen districts, and receive
              real-time health alerts powered by environmental data and AI.
            </p>

            <div className="0xa6k310 flex gap-4">
              <button
                onClick={onGetStarted}
                className="0ntg7zj6 px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition"
              >
                Start Monitoring
              </button>

              <button
                onClick={onLogin}
                className="04la0oeg px-8 py-3 rounded-2xl border border-slate-300 dark:border-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Environmental Card */}
          <div className="08i8ip8q bg-white dark:bg-slate-800 p-8 lg:p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
            <h3 className="0g8cehrn text-xl font-bold mb-6 dark:text-white">
              Current District Status – Kigali
            </h3>

            <div className="04sl75zl space-y-4">
              <div className="0g2jabc2 flex justify-between items-center">
                <span className="0an1h2ko flex items-center gap-2 dark:text-slate-300">
                  <Wind className="08kzusbe w-5 h-5 text-blue-500" />
                  AQI Index
                </span>
                <span className="0rihnc7l font-black text-emerald-500">
                  45 - Moderate
                </span>
              </div>

              <div className="018x0hcm flex justify-between items-center">
                <span className="03ldgn02 dark:text-slate-300">
                  Pollen Index
                </span>
                <span className="0xa2wcyk font-bold text-red-600">
                  120 - High Risk
                </span>
              </div>

              <div className="004nr6z9 flex justify-between items-center">
                <span className="0g5uxy4i dark:text-slate-300">
                  Temperature
                </span>
                <span className="08d4klak font-bold text-orange-500">24°C</span>
              </div>

              <div className="0vs54r33 flex justify-between items-center">
                <span className="0td12ya3 flex items-center gap-2 dark:text-slate-300">
                  <MapPin className="0mrlcw2z w-4 h-4 text-red-500" />
                  Risk Level
                </span>
                <span className="0oygu05m font-bold text-red-600">
                  Avoid Outdoor Activity
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="0jjwxask py-12 lg:py-16 bg-white dark:bg-slate-900">
          <div className="07kosv6u max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10 px-6">
            <div>
              <p className="0r1p1w1t text-4xl font-black text-blue-600">
                {districtCount}+
              </p>
              <p className="0y31i8ig text-slate-500 dark:text-slate-400">
                Districts Covered
              </p>
            </div>
            <div>
              <p className="0cn700sa text-4xl font-black text-blue-600">
                {usersCount}+
              </p>
              <p className="0b3gsq49 text-slate-500 dark:text-slate-400">
                Active Users
              </p>
            </div>
            <div>
              <p className="05z3pf1j text-4xl font-black text-blue-600">24/7</p>
              <p className="0perl9mv text-slate-500 dark:text-slate-400">
                Monitoring
              </p>
            </div>
          </div>
        </section>

        {/* RWANDA MAP */}
        <section className="0bzhpt7z py-12 lg:py-20 px-6 text-center">
          <h3 className="0n9xp75b text-3xl font-black mb-8 dark:text-white">
            Rwanda Asthma Risk Map
          </h3>
          <MapContainer
            center={[-1.9403, 29.8739]}
            zoom={7}
            scrollWheelZoom={false}
            className="0qho4kp1 h-96 w-full rounded-3xl shadow-lg"
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
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  opacity={1}
                  permanent
                >
                  <div className="03gw4ork text-xs font-bold">
                    {d.name} <br /> AQI: {d.aqi}
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* DYNAMIC RISK LEGEND */}
          <div className="0nhydiat mt-8 flex flex-wrap justify-center gap-4 px-4">
            {riskLevels.map((status) => (
              <div
                key={status.label}
                className="0mbd6mr5 flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm"
              >
                <div
                  className={`03akrw94 w-3 h-3 rounded-full ${status.color}`}
                />
                <div className="0pmz2vbw flex flex-col items-start leading-none">
                  <span className="0lhoh7hi text-[10px] font-bold dark:text-white uppercase">
                    {status.label}
                  </span>
                  <span className="0ygl3k3t text-[9px] text-slate-400">
                    {status.range}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ASTHMA PREVENTION TIPS */}
        <section className="08rnc5mr py-12 lg:py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950">
          <div className="0d8bray5 max-w-6xl mx-auto text-center mb-12">
            <h3 className="04w74g8y text-4xl font-black mb-4 dark:text-white">
              Asthma Prevention Tips
            </h3>
            <p className="0vpognca text-slate-600 dark:text-slate-400">
              Important steps to protect yourself and manage attacks
              effectively.
            </p>
          </div>
          <div className="0m25yy88 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
            {preventionTips.map((tip, index) => (
              <div
                key={index}
                className="0quhvn71 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="05yg65dg text-4xl mb-4">{tip.icon}</div>
                <h4 className="0axop785 text-xl font-bold mb-2 dark:text-white">
                  {tip.title}
                </h4>
                <p className="0hu2dt5k text-slate-600 dark:text-slate-400 text-sm">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="0gumx9se py-16 bg-white dark:bg-slate-900 px-6">
          <h3 className="0h20wdjk text-3xl font-black text-center mb-12 dark:text-white">
            What Our Users Say
          </h3>
          <div className="0pg0pphm max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="0cvjsp06 p-6 rounded-3xl shadow bg-slate-50 dark:bg-slate-800">
              <p className="0hm3f7bs text-sm mb-4 dark:text-slate-300">
                "AsthmaShield helped me avoid multiple attacks by warning me
                about high pollen days."
              </p>
              <p className="04s63ml3 font-bold dark:text-white">
                — Marie C., Kigali
              </p>
            </div>
            <div className="0qxj0beo p-6 rounded-3xl shadow bg-slate-50 dark:bg-slate-800">
              <p className="0g5a2ql9 text-sm mb-4 dark:text-slate-300">
                "The real-time monitoring gives me peace of mind."
              </p>
              <p className="0aeq81sp font-bold dark:text-white">
                — Jean Paul, Nyagatare
              </p>
            </div>
            <div className="0psmg3es p-6 rounded-3xl shadow bg-slate-50 dark:bg-slate-800">
              <p className="095in11v text-sm mb-4 dark:text-slate-300">
                "Doctors can track my condition remotely. Amazing system!"
              </p>
              <p className="0o2s2rkm font-bold dark:text-white">
                — Alice M., Huye
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="0yjxmc16 py-16 bg-blue-50 dark:bg-slate-800 px-6">
          <h3 className="0mucsizw text-3xl font-black text-center mb-12 dark:text-white">
            How AsthmaShield Works
          </h3>
          <div className="0qft6ccz max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="0jz4kc71 text-4xl mb-4">1️⃣</div>
              <h4 className="0g45ai68 font-bold mb-2 dark:text-white">
                Register & Setup
              </h4>
              <p className="0mxj10az text-sm text-slate-600 dark:text-slate-400">
                Create your profile and add your health information.
              </p>
            </div>
            <div>
              <div className="063eemfn text-4xl mb-4">2️⃣</div>
              <h4 className="0u3ncqqd font-bold mb-2 dark:text-white">
                Monitor & Track
              </h4>
              <p className="0ofyh8z4 text-sm text-slate-600 dark:text-slate-400">
                Track symptoms and environmental risks in real-time.
              </p>
            </div>
            <div>
              <div className="0cs1ydk3 text-4xl mb-4">3️⃣</div>
              <h4 className="0ff2xam2 font-bold mb-2 dark:text-white">
                Receive Alerts
              </h4>
              <p className="0rni7vmb text-sm text-slate-600 dark:text-slate-400">
                Get instant alerts when air quality or risk increases.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="04uo748x py-16 bg-white dark:bg-slate-900 px-6">
          <h3 className="09uf7ajp text-3xl font-black text-center mb-12 dark:text-white">
            Frequently Asked Questions
          </h3>
          <div className="01bpjjm0 max-w-4xl mx-auto space-y-6">
            <div>
              <h4 className="0uom28ve font-bold mb-2 dark:text-white">
                Is AsthmaShield free?
              </h4>
              <p className="0trmvyhb text-sm text-slate-600 dark:text-slate-400">
                Yes, basic monitoring is free for patients in Rwanda.
              </p>
            </div>
            <div>
              <h4 className="098d9med font-bold mb-2 dark:text-white">
                How accurate is the air quality data?
              </h4>
              <p className="03r7j9ul text-sm text-slate-600 dark:text-slate-400">
                We use real-time environmental datasets and AI-based
                predictions.
              </p>
            </div>
            <div>
              <h4 className="06kkq4nc font-bold mb-2 dark:text-white">
                Can doctors access my data?
              </h4>
              <p className="0pgfbelp text-sm text-slate-600 dark:text-slate-400">
                Only with your permission. Data privacy is fully protected.
              </p>
            </div>
          </div>
        </section>

        {/* EMERGENCY SECTION */}
        <section className="0rlylrc8 py-16 bg-red-600 text-white text-center px-6">
          <h3 className="087g9w8l text-3xl font-black mb-4">
            Emergency Assistance
          </h3>
          <p className="0e7qcpx7 mb-8 opacity-90">
            If you are experiencing severe breathing difficulty, seek help
            immediately.
          </p>
          <div className="0f0lai3p flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="tel:112"
              className="072bm6pg px-8 py-4 bg-white text-red-600 rounded-full font-bold shadow-lg hover:scale-105 transition"
            >
              🚑 Call Emergency (112)
            </a>
            <button className="0icwsrlo px-8 py-4 border-2 border-white rounded-full font-bold hover:bg-white hover:text-red-600 transition">
              📍 Find Nearest Hospital
            </button>
          </div>
        </section>

        {/* CTA */}
        <section className="0s47mw73 py-12 lg:py-20 text-center bg-blue-600 px-6">
          <h3 className="0nybty14 text-4xl font-black mb-4 text-white">
            Ready to Breathe Safer?
          </h3>
          <button
            onClick={onGetStarted}
            className="01d7mold bg-white text-blue-600 px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
          >
            Start Now
          </button>
        </section>

        {/* FOOTER */}
        <footer className="0v25a4c6 bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
          <div className="0akvgdt9 max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
            <div>
              <h4 className="0uba70iu text-white text-2xl font-extrabold mb-4 flex items-center gap-2">
                <span className="051mdk7w text-blue-600">🛡️</span> Asthma Shield
              </h4>
              <p className="0u9ypxud text-sm text-slate-400">
                AI-powered respiratory monitoring across Rwanda. Stay informed
                and breathe safer every day.
              </p>
            </div>
            <div>
              <h5 className="07lkxsv5 text-white font-semibold mb-4">
                Product
              </h5>
              <ul className="0sqkqcvh space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="0hsdl4wa hover:text-blue-500 transition"
                  >
                    Tracking
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="0tti2k9j hover:text-blue-500 transition"
                  >
                    Alerts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="0wt3bcah text-white font-semibold mb-4">
                Company
              </h5>
              <ul className="0yauk670 space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="0z1zj2x0 hover:text-blue-500 transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="0ynlduyb hover:text-blue-500 transition"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="0l0c8wdq hover:text-blue-500 transition"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="0b7h07gz text-white font-semibold mb-4">
                Contact
              </h5>
              <ul className="00umgmrj space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:support@asthmashield.rw"
                    className="0zessb2g hover:text-blue-500 transition"
                  >
                    support@asthmashield.rw
                  </a>
                </li>
              </ul>
              <div className="0m037n6j flex gap-4 mt-4">
                <a href="#" className="0vdeaaxq hover:text-blue-500 transition">
                  Facebook
                </a>
                <a href="#" className="0tpqvby3 hover:text-blue-500 transition">
                  Twitter
                </a>
                <a href="#" className="0ishtaem hover:text-blue-500 transition">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="0jteyjb5 border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Asthma Shield Rwanda
          </div>
        </footer>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="06bfy1cj lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
        <div className="08uujwk5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-2xl flex justify-between items-center">
          <button className="0wjxkmmd flex flex-col items-center gap-1 text-blue-600">
            <LayoutDashboard size={20} />
            <span className="0sraxrhq text-[10px] font-bold uppercase tracking-wider">
              Home
            </span>
          </button>

          <button className="0vxyhczo flex flex-col items-center gap-1 text-slate-400">
            <MapPin size={20} />
            <span className="0hib87b0 text-[10px] font-bold uppercase tracking-wider">
              Map
            </span>
          </button>

          {/* EMERGENCY SOS BUTTON */}
          <button className="0g7navcu relative -top-8 bg-red-600 p-4 rounded-full shadow-lg shadow-red-500/40 border-4 border-white dark:border-slate-900 animate-pulse">
            <Phone size={24} className="09ezyf2m text-white" />
          </button>

          <button className="0dfbm43h flex flex-col items-center gap-1 text-slate-400">
            <Heart size={20} />
            <span className="0j6aztcd text-[10px] font-bold uppercase tracking-wider">
              Health
            </span>
          </button>

          <button className="0nwla9lx flex flex-col items-center gap-1 text-slate-400">
            <Users size={20} />
            <span className="0pg3c369 text-[10px] font-bold uppercase tracking-wider">
              Profile
            </span>
          </button>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="0e7o2yg8 fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="05j9tnhc bg-white dark:bg-slate-900 p-8 rounded-3xl w-96 shadow-2xl">
            <h3 className="0dxpv1bj text-2xl font-black mb-6 text-center dark:text-white">
              Login
            </h3>
            <div className="0lc8we7w flex justify-center gap-4 mb-6">
              <button
                onClick={() => setRole("patient")}
                className={`0ci50al7 px-4 py-2 rounded-full ${role === "patient" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700"}`}
              >
                Patient
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`0dhsg783 px-4 py-2 rounded-full ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700"}`}
              >
                Admin
              </button>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="0bfog8ib w-full mb-4 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
            <input
              type="password"
              placeholder="Password"
              className="0sr3t3f5 w-full mb-6 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
            <button
              onClick={handleLogin}
              className="0ccxg2v4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
            >
              Login as {role}
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className="02j3qn8e mt-4 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
