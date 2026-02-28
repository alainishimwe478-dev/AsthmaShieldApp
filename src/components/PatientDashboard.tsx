import React, { useState, useEffect, useRef, ReactNode } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
  Heart,
  FileText,
  Pill,
  Calendar,
  Bell,
  Droplets,
  Wind,
  AlertTriangle,
  Thermometer,
} from "lucide-react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import PatientDashboardHome from "./patient/PatientDashboardHome";
import PatientHealthPage from "./patient/PatientHealthPage";
import PatientMedicationsPage from "./patient/PatientMedicationsPage";
import PatientLogsPage from "./patient/PatientLogsPage";
import PatientAppointmentsPage from "./patient/PatientAppointmentsPage";
import PatientProfilePage from "./patient/PatientProfilePage";
import PatientSettingsPage from "./patient/PatientSettingsPage";
import { updateTemperatureHistory, getTemperatureHistory, getHottestAndColdest, getTemperatureRisk } from "../lib/temperatureUtils";

// Toast Component
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="0uu6s9im fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50 animate-slide-in">
      {message}
    </div>
  );
}

interface PatientDashboardProps {
  children?: ReactNode;
}

export default function PatientDashboard({ children }: PatientDashboardProps) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [toasts, setToasts] = useState<string[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const [user] = useState(() => {
    const savedUser = localStorage.getItem("rwanda_guard_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [environmentalData, setEnvironmentalData] = useState({
    humidity: 78,
    aqi: 145,
    pollen: "High",
    temperature: 22,
  });

  // Temperature history state
  const [temperatureHistory, setTemperatureHistory] = useState<{ date: string; temperature: number }[]>([]);
  const [hottest, setHottest] = useState<{ date: string; temperature: number } | null>(null);
  const [coldest, setColdest] = useState<{ date: string; temperature: number } | null>(null);
  const [tempRisk, setTempRisk] = useState<{ level: string; message: string; color: string }>({ level: 'Normal', message: 'Comfortable temperature.', color: 'green' });

  const districts = [
    { name: "Gasabo", lat: -1.9441, lng: 30.0619, risk: "High", wealth: "Medium" },
    { name: "Kicukiro", lat: -1.9706, lng: 30.1044, risk: "Medium", wealth: "High" },
    { name: "Nyarugenge", lat: -1.9499, lng: 30.0588, risk: "High", wealth: "Low" },
  ];

  const getRiskColor = (risk: string) => (risk === "High" ? "red" : risk === "Medium" ? "orange" : "green");
  const getWealthColor = (wealth: string) => (wealth === "High" ? "blue" : wealth === "Medium" ? "yellow" : "gray");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("rwanda_guard_user");
    navigate("/");
  };

  const baseClass = "flex items-center gap-3 p-3 rounded-xl transition-all duration-200";
  const activeClass = "bg-blue-600 text-white shadow-md";
  const inactiveClass = "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700";

  // === Initialize temperature history and update on load ===
  useEffect(() => {
    const history = getTemperatureHistory();
    const { hottest: hot, coldest: cold } = getHottestAndColdest(history);
    setTemperatureHistory(history);
    setHottest(hot);
    setColdest(cold);
  }, []);

  // === Simulate live updates and trigger toast + sound ===
  useEffect(() => {
    const interval = setInterval(() => {
      const newHumidity = 60 + Math.floor(Math.random() * 40);
      const newAqi = 80 + Math.floor(Math.random() * 100);
      const pollenLevels = ["Low", "Medium", "High"];
      const newPollen = pollenLevels[Math.floor(Math.random() * pollenLevels.length)];
      
      // Simulate temperature between 15°C and 38°C
      const newTemperature = 15 + Math.floor(Math.random() * 23);

      setEnvironmentalData({ humidity: newHumidity, aqi: newAqi, pollen: newPollen, temperature: newTemperature });

      // Update temperature risk
      const risk = getTemperatureRisk(newTemperature);
      setTempRisk(risk);

      // Update temperature history
      const updatedHistory = updateTemperatureHistory(newTemperature);
      const { hottest: hot, coldest: cold } = getHottestAndColdest(updatedHistory);
      setTemperatureHistory(updatedHistory);
      setHottest(hot);
      setColdest(cold);

      const newNotifications: string[] = [];

      if (newPollen === "High") newNotifications.push("High pollen alert! Use mask outdoors.");
      if (newAqi > 150) newNotifications.push("AQI reached dangerous levels! Avoid outdoor activity.");
      if (newHumidity < 40) newNotifications.push("Humidity low! Keep hydrated.");
      
      // Temperature alerts
      if (risk.level === 'Hot' || risk.level === 'Warm') {
        newNotifications.push(`Temperature alert: ${risk.message}`);
      } else if (risk.level === 'Cold' || risk.level === 'Cool') {
        newNotifications.push(`Temperature alert: ${risk.message}`);
      }

      setNotifications(newNotifications);

      // Trigger sound + toast
      if (newNotifications.length > 0) {
        newNotifications.forEach(note => {
          setToasts(prev => [...prev, note]);
        });
        if (audioRef.current) audioRef.current.play();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`062vq6oz flex h-screen ${darkMode ? "bg-gray-900" : "bg-slate-100"} transition-colors`}>
      {/* SIDEBAR */}
      <aside className={`00xcewkp w-64 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"} border-r p-6 flex flex-col justify-between`}>
        <div>
          <div className="04d70mo2 flex items-center gap-2 mb-8">
            <div className="0wtsyt5y bg-blue-600 p-3 rounded-lg">
              <Heart className="0ggqun38 text-white w-8 h-8" />
            </div>
            <h1 className={`07bzgmqg text-xl font-black ${darkMode ? "text-white" : "text-slate-800"}`}>Asthma Shield</h1>
          </div>
          <nav className="02a7jird space-y-2">
            <NavLink to="/patient-dashboard" end className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <LayoutDashboard size={18}/> Dashboard
            </NavLink>
            <NavLink to="/patient-dashboard/health" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <Activity size={18}/> My Health
            </NavLink>
            <NavLink to="/patient-dashboard/medications" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <Pill size={18}/> Medications
            </NavLink>
            <NavLink to="/patient-dashboard/logs" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <FileText size={18}/> Health Logs
            </NavLink>
            <NavLink to="/patient-dashboard/appointments" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <Calendar size={18}/> Appointments
            </NavLink>
            <NavLink to="/patient-dashboard/profile" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <User size={18}/> Profile
            </NavLink>
            <NavLink to="/patient-dashboard/settings" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <Settings size={18}/> Settings
            </NavLink>
          </nav>
        </div>

        <div className="0nbqnd4o space-y-2">
          <button onClick={toggleDarkMode} className="03gh446g w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-gray-700">
            <div className="0nuls957 flex items-center gap-3 font-bold">{darkMode ? <Sun size={18}/> : <Moon size={18}/>} {darkMode ? "Light Mode" : "Dark Mode"}</div>
            <ChevronRight size={16}/>
          </button>
          <button onClick={handleLogout} className="0s868fst flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl w-full">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className={`0q192nga flex-1 p-10 overflow-y-auto ${darkMode ? "text-white" : "text-slate-800"}`}>
        <header className="0m3kwez3 flex justify-between items-center mb-10">
          <div>
            <h2 className="0wdqc41o text-3xl font-bold">Welcome Back, {user?.fullName || "Patient"} 👋</h2>
            <p className="0fs2hgr5 text-slate-500 dark:text-gray-400">Monitor environmental asthma risks in real-time.</p>
          </div>

          {/* Notification */}
          <div className="0ocs36eb relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="0ipelilc relative">
              <Bell className="0k3g3c47 w-6 h-6 cursor-pointer"/>
              <span className="07r5l0dk absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">{notifications.length}</span>
            </button>
            {showNotifications && (
              <div className="013qqpf3 absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border rounded-xl shadow-lg z-50">
                <h4 className="0qxlpvxo font-bold p-2 border-b dark:border-gray-700">Notifications & Prevention</h4>
                <ul>
                  {notifications.length === 0 ? (
                    <li className="01bheh47 p-2">No alerts right now ✅</li>
                  ) : (
                    notifications.map((note, idx) => (
                      <li key={idx} className="0iw4vl9d p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{note}</li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Environmental Cards */}
        <div className="03jsdfbm grid md:grid-cols-4 gap-6 mb-8">
          <div className="0afir3ct bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center gap-4">
            <Droplets className="0k6uf8dp text-blue-500 w-8 h-8"/>
            <div>
              <p>Humidity</p>
              <h2 className="0aamc5kh text-xl font-bold">{environmentalData.humidity}%</h2>
            </div>
          </div>
          <div className="0o7nrguu bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center gap-4">
            <Wind className="0ir8vthc text-purple-500 w-8 h-8"/>
            <div>
              <p>AQI</p>
              <h2 className="0b5vgfn8 text-xl font-bold">{environmentalData.aqi}</h2>
            </div>
          </div>
          <div className="0azdj282 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center gap-4">
            <AlertTriangle className="0083iq0n text-red-500 w-8 h-8"/>
            <div>
              <p>Pollen Level</p>
              <h2 className="0cpfr07e text-xl font-bold">{environmentalData.pollen}</h2>
            </div>
          </div>
          <div className={`0xcsbgbt 0tempcard bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center gap-4 border-l-4 ${
            tempRisk.color === 'red' ? 'border-l-red-500' : 
            tempRisk.color === 'orange' ? 'border-l-orange-500' :
            tempRisk.color === 'green' ? 'border-l-green-500' :
            tempRisk.color === 'blue' ? 'border-l-blue-500' : 'border-l-indigo-500'
          }`}>
            <Thermometer className={`05gc5sgw w-8 h-8 ${
              tempRisk.color === 'red' ? 'text-red-500' : 
              tempRisk.color === 'orange' ? 'text-orange-500' :
              tempRisk.color === 'green' ? 'text-green-500' :
              tempRisk.color === 'blue' ? 'text-blue-500' : 'text-indigo-500'
            }`}/>
            <div>
              <p>Temperature</p>
              <h2 className="0tempval text-xl font-bold">{environmentalData.temperature}°C</h2>
              <p className={`0nlpw7db text-xs ${
                tempRisk.color === 'red' ? 'text-red-500' : 
                tempRisk.color === 'orange' ? 'text-orange-500' :
                tempRisk.color === 'green' ? 'text-green-500' :
                tempRisk.color === 'blue' ? 'text-blue-500' : 'text-indigo-500'
              }`}>{tempRisk.level}</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="09aqx7r0 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="0ir2q8xp text-lg font-semibold mb-4">District Risk & Wealth Map</h2>
          <MapContainer center={[-1.9441, 30.0619]} zoom={12} style={{ height: "400px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {districts.map((d, i) => (
              <Circle
                key={i}
                center={[d.lat, d.lng]}
                radius={2000}
                pathOptions={{ color: getRiskColor(d.risk), fillColor: getWealthColor(d.wealth), fillOpacity: 0.3 }}
              >
                <Popup>
                  <strong>{d.name}</strong><br/>
                  Risk: {d.risk}<br/>
                  Wealth: {d.wealth}<br/>
                  Prevention: {d.risk === "High" ? "Stay indoors, use mask, carry inhaler" : "Normal precautions"}
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>

        {/* Nested Routes - Using Outlet for proper nested routing */}
        <Outlet context={{ darkMode, user }} />

        {/* Audio for notifications */}
        <audio ref={audioRef} src="/notification-sound.mp3" preload="auto" />
        
        {/* Toast notifications */}
        {toasts.map((t, idx) => (
          <Toast key={idx} message={t} onClose={() => setToasts(prev => prev.filter((_, i) => i !== idx))}/>
        ))}
      </main>
    </div>
  );
}
