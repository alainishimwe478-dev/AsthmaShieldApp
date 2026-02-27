 import React, { useState, useEffect } from "react";
import { 
  Shield, Activity, AlertTriangle, Phone, Wind, 
  MessageCircle, MapPin, HeartPulse, LayoutDashboard, 
  Users, Heart 
} from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import logo from "../../assets/logo.png";

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
  { icon: "💨", title: "Stay Calm & Breathe Slowly", description: "Sit upright, take slow deep breaths, and try to stay calm during an attack." },
  { icon: "💊", title: "Use Your Inhaler", description: "Follow your prescribed inhaler routine. Take quick-relief medication as directed." },
  { icon: "🏠", title: "Avoid Triggers", description: "Stay away from smoke, dust, pollen, or strong odors that can worsen symptoms." },
  { icon: "📞", title: "Seek Help if Needed", description: "Call your doctor or emergency services if symptoms persist or worsen." }
];

// Dashboard Features
const dashboardFeatures = [
  { title: "Real-time Monitoring", description: "Track your breathing patterns and symptoms" },
  { title: "AI Risk Assessment", description: "Get personalized risk predictions" },
  { title: "Environmental Alerts", description: "Stay informed about air quality in your area" }
];

// Newsletter Subscription
const subscribeNewsletter = (email) => {
  if (email) {
    alert(`Subscribed ${email} to AsthmaShield updates!`);
    return true;
  }
  return false;
};

export default function LandingPage({ onGetStarted, onLogin }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState("patient");
  const [districtCount, setDistrictCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [email, setEmail] = useState("");

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

  const handleSubscribe = () => {
    if (subscribeNewsletter(email)) {
      setEmail("");
    }
  };

  return (
    <div className="0s8f1m1q flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-white transition-all duration-500">

      {/* NAVBAR */}
      <header className="070cw364 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow z-30 border-b border-slate-200 dark:border-slate-800">
        <div className="09zegsjm flex justify-between items-center px-6 lg:px-10 py-5 max-w-7xl mx-auto">
          <div className="0i7ek11e flex items-center gap-2">
            <img src={logo} alt="Asthma Shield Logo" className="0w6ku5zd w-10 h-10" />
            <h1 className="0ho7ig1q text-xl font-black hidden lg:block">AsthmaShield</h1>
          </div>
          <div className="0h4rgv81 flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="0d2s2tr5 text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button onClick={() => setShowLogin(true)} className="0zk8lh2d px-4 py-2 rounded-xl border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
              Login
            </button>
            <button onClick={onGetStarted} className="0aovut9t px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="0nowwaah px-6 lg:px-10 py-12 lg:py-24 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
        <div>
          <h2 className="0ankprcm text-5xl font-extrabold leading-tight mb-6">
            Smart Asthma Monitoring
            <br />
            & District Risk Alerts
          </h2>
          <p className="0lejx9h8 text-lg text-slate-600 dark:text-slate-300 mb-8">
            Monitor air quality, detect high-pollen districts, and receive real-time health alerts powered by environmental data and AI.
          </p>
          <div className="0hj2i6ad flex gap-4">
            <button onClick={onGetStarted} className="02jyvom6 px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition">
              Start Monitoring
            </button>
            <button onClick={onLogin} className="094mpvab px-8 py-3 rounded-2xl border border-slate-300 dark:border-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Sign In
            </button>
          </div>
        </div>

        {/* Environmental Card */}
        <div className="0axc05qh bg-white dark:bg-slate-800 p-8 lg:p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
          <h3 className="06ihjsu7 text-xl font-bold mb-6 dark:text-white">Current District Status – Kigali</h3>
          <div className="0kf1q8p7 space-y-4">
            <div className="0mgkp3j1 flex justify-between items-center">
              <span className="0olttep3 flex items-center gap-2 dark:text-slate-300"><Wind className="0dbw3td0 w-5 h-5 text-blue-500" />AQI Index</span>
              <span className="03bsuifz font-black text-emerald-500">45 - Moderate</span>
            </div>
            <div className="05a84vsb flex justify-between items-center">
              <span className="037whx7e dark:text-slate-300">Pollen Index</span>
              <span className="09lol45q font-bold text-red-600">120 - High Risk</span>
            </div>
            <div className="03iswwtf flex justify-between items-center">
              <span className="0cupbta8 dark:text-slate-300">Temperature</span>
              <span className="08wdixcm font-bold text-orange-500">24°C</span>
            </div>
            <div className="0b7opv0c flex justify-between items-center">
              <span className="0vtehzom flex items-center gap-2 dark:text-slate-300"><MapPin className="0fwybkvz w-4 h-4 text-red-500" />Risk Level</span>
              <span className="0p4bl4el font-bold text-red-600">Avoid Outdoor Activity</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="00iipsox py-12 lg:py-16 bg-white dark:bg-slate-900">
        <div className="0nujiljs max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10 px-6">
          <div><p className="0de5at54 text-4xl font-black text-blue-600">{districtCount}+</p><p className="0bnf6fmz text-slate-500 dark:text-slate-400">Districts Covered</p></div>
          <div><p className="0dwzvbnu text-4xl font-black text-blue-600">{usersCount}+</p><p className="0ucg9hp6 text-slate-500 dark:text-slate-400">Active Users</p></div>
          <div><p className="099ugt1n text-4xl font-black text-blue-600">24/7</p><p className="0az0aiv9 text-slate-500 dark:text-slate-400">Monitoring</p></div>
        </div>
      </section>

      {/* RWANDA MAP */}
      <section className="0ycp7vv2 py-12 lg:py-20 px-6 text-center">
        <h3 className="0s2267ru text-3xl font-black mb-8 dark:text-white">Rwanda Asthma Risk Map</h3>
        <MapContainer center={[-1.9403, 29.8739]} zoom={7} scrollWheelZoom={false} className="093nvsl0 h-96 w-full rounded-3xl shadow-lg">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {rwandaDistricts.map((d,i) => (
            <CircleMarker key={i} center={[d.lat,d.lng]} radius={15} pathOptions={{ color: getAQIColor(d.aqi), fillOpacity:0.5 }}>
              <Tooltip direction="top" offset={[0,-10]} opacity={1} permanent>
                <div className="0t5q1imy text-xs font-bold">{d.name} <br /> AQI: {d.aqi}</div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
        <p className="03pnt5bm mt-4 text-slate-600 dark:text-slate-400 text-sm">Color-coded: Green (Good), Yellow (Moderate), Orange (Unhealthy for sensitive), Red (Unhealthy), Purple (Very Unhealthy)</p>
      </section>

      {/* ASTHMA PREVENTION TIPS */}
      <section className="0ifwo6a6 py-12 lg:py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:to-slate-950">
        <div className="07hr3oyf max-w-6xl mx-auto text-center mb-12">
          <h3 className="03knhoo4 text-4xl font-black mb-4 dark:text-white">Asthma Prevention Tips</h3>
          <p className="0c07z6c1 text-slate-600 dark:text-slate-400">Important steps to protect yourself and manage attacks effectively.</p>
        </div>
        <div className="048m66ig grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {preventionTips.map((tip,i) => (
            <div key={i} className="0ees8et0 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="06mqq8b6 text-4xl mb-4">{tip.icon}</div>
              <h4 className="0m22sft9 text-xl font-bold mb-2 dark:text-white">{tip.title}</h4>
              <p className="0emdbp66 text-slate-600 dark:text-slate-400 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DASHBOARD FEATURES */}
      <section className="0pud4c8p py-16 bg-white dark:bg-slate-900">
        <h2 className="0f6zpjrf text-3xl font-bold text-center mb-8 dark:text-white">Patient Dashboard Features</h2>
        <div className="0xrozpes max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {dashboardFeatures.map((feature, i) => (
            <div key={i} className="0p047ydd bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl shadow-lg">
              <Activity className="0ox6j3qz w-12 h-12 text-blue-600 mb-4" />
              <h3 className="07gxccrk text-xl font-bold mb-2 dark:text-white">{feature.title}</h3>
              <p className="0n8envzy text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER SUBSCRIPTION */}
      <section className="04ivlzy6 py-16 bg-blue-50 dark:bg-slate-800 text-center px-6">
        <h2 className="07feov0z text-3xl font-bold mb-4 dark:text-white">Subscribe to Updates</h2>
        <p className="0xa28131 mb-6 dark:text-slate-300">Get the latest asthma alerts and app updates directly to your inbox.</p>
        <div className="0ataluc3 flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="00o1uxsr p-3 rounded-xl border border-slate-300 dark:border-slate-700 flex-1"
          />
          <button 
            onClick={handleSubscribe}
            className="03sduw0k px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="04jxbdl1 py-12 lg:py-20 text-center bg-blue-600 px-6">
        <h3 className="0kkm9x2w text-4xl font-black mb-4 text-white">Ready to Breathe Safer?</h3>
        <button onClick={onGetStarted} className="0sbci42d bg-white text-blue-600 px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all">
          Start Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="0c11o6df bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
        <div className="0n6q0c5p max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <h4 className="08xsqcqo text-white text-2xl font-extrabold mb-4 flex items-center gap-2"><span className="0gfhkafd text-blue-600">🛡️</span> Asthma Shield</h4>
            <p className="0tffc8qx text-sm text-slate-400">AI-powered respiratory monitoring across Rwanda. Stay informed and breathe safer every day.</p>
          </div>
          <div>
            <h5 className="0fbemm2h text-white font-semibold mb-4">Product</h5>
            <ul className="0y5zvudz space-y-2 text-sm">
              <li><a href="#" className="08cw8oh0 hover:text-blue-500 transition">Tracking</a></li>
              <li><a href="#" className="0w88djr8 hover:text-blue-500 transition">Alerts</a></li>
            </ul>
          </div>
          <div>
            <h5 className="0374ms1o text-white font-semibold mb-4">Company</h5>
            <ul className="0j3yebls space-y-2 text-sm">
              <li><a href="#" className="0l9wg0ma hover:text-blue-500 transition">About</a></li>
              <li><a href="#" className="0vufqwu8 hover:text-blue-500 transition">Privacy</a></li>
              <li><a href="#" className="0j8uf505 hover:text-blue-500 transition">Terms</a></li>
            </ul>
          </div>
          <div>
            <h5 className="0cdzf7lo text-white font-semibold mb-4">Contact</h5>
            <ul className="0z3cz0ml space-y-2 text-sm">
              <li><a href="mailto:support@asthmashield.rw" className="01nadlwu hover:text-blue-500 transition">support@asthmashield.rw</a></li>
            </ul>
          </div>
        </div>
        <div className="0nkjebld border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Asthma Shield Rwanda
        </div>
      </footer>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="05z2xvnr fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="0h1hhf6j bg-white dark:bg-slate-900 p-8 rounded-3xl w-96 shadow-2xl">
            <h3 className="0ggl2wpv text-2xl font-black mb-6 text-center dark:text-white">Login</h3>
            <div className="0w9i4wzn flex justify-center gap-4 mb-6">
              <button
                onClick={() => setRole("patient")}
                className={`04t82tph px-4 py-2 rounded-full ${role === "patient" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700"}`}
              >
                Patient
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`0akn5238 px-4 py-2 rounded-full ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700"}`}
              >
                Admin
              </button>
            </div>
            <input type="email" placeholder="Email" className="03907y75 w-full mb-4 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white"/>
            <input type="password" placeholder="Password" className="0mdlsfc4 w-full mb-6 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white"/>
            <button className="0qrmunw9 w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Login as {role}</button>
            <button
              onClick={() => setShowLogin(false)}
              className="0agv8g8r mt-4 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
