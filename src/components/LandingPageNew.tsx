import React, { useState } from "react";
import { 
  HeartPulse, 
  Stethoscope, 
  Plus, 
  BarChart2, 
  AlertTriangle,
  Activity,
  ShieldCheck,
  Wind,
  Thermometer,
  Map,
  Bell
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import '../index.css';
import { useTranslation } from "react-i18next";
import inhalerImg from '../../assets/inhaler.png';
import demoVideo from '../../assets/videoplayback.mp4';
import ProfessionalFooter from './ProfessionalFooter';
import Navbar from './Navbar';
import LoginModal from './LoginModal';

const rwandaDistricts = [
  { key: "nyarugenge", lat: -1.9441, lng: 30.0619, aqi: 145, risk: "High", reason: "Heavy traffic, vehicle emissions" },
  { key: "gasabo", lat: -1.8849, lng: 30.1333, aqi: 120, risk: "High", reason: "Urban development, industrial activity" },
  { key: "kicukiro", lat: -1.9667, lng: 30.1167, aqi: 95, risk: "Moderate", reason: "Mixed residential and commercial" },
  { key: "rubavu", lat: -1.7514, lng: 29.2686, aqi: 165, risk: "Extreme", reason: "High population density, border traffic" },
  { key: "nyagatare", lat: -1.2942, lng: 30.3286, aqi: 110, risk: "High", reason: "Agricultural activities, dust" },
  { key: "huye", lat: -2.5956, lng: 29.739, aqi: 75, risk: "Moderate", reason: "University town, moderate traffic" },
  { key: "musanze", lat: -1.478, lng: 29.636, aqi: 40, risk: "Low", reason: "Tourism, clean air" },
  { key: "ruhengeri", lat: -1.5117, lng: 29.5633, aqi: 35, risk: "Low", reason: "Mountain region, fresh air" },
  { key: "bugesera", lat: -2.1333, lng: 30.0667, aqi: 88, risk: "Moderate", reason: "Airport proximity" },
  { key: "rwamagana", lat: -1.9487, lng: 30.4358, aqi: 65, risk: "Low", reason: "Agricultural area" },
];

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return "#22c55e";
  if (aqi <= 100) return "#eab308";
  if (aqi <= 150) return "#f97316";
  if (aqi <= 200) return "#ef4444";
  return "#a855f7";
};

const getRiskColor = (risk: string) => {
  if (risk === "Low") return "bg-green-500";
  if (risk === "Moderate") return "bg-yellow-400";
  if (risk === "High") return "bg-orange-500";
  return "bg-red-600";
};

const riskLegend = [
  { label: "Low", color: "bg-green-500", range: "0-50" },
  { label: "Moderate", color: "bg-yellow-400", range: "51-100" },
  { label: "High", color: "bg-orange-500", range: "101-150" },
  { label: "Extreme", color: "bg-red-600", range: "151+" },
];

const peakFlowData = [
  { day: "Mon", value: 320 },
  { day: "Tue", value: 300 },
  { day: "Wed", value: 310 },
  { day: "Thu", value: 330 },
  { day: "Fri", value: 325 },
  { day: "Sat", value: 315 },
  { day: "Sun", value: 320 },
];

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onNavigate?: (view: string) => void;
}

// Helper function to get language code without region suffix
const getLangCode = (lang: string): string => {
  return lang.split('-')[0].toLowerCase();
};

export default function LandingPageNew({
  onGetStarted,
  onLogin,
}: LandingPageProps) {
  const { t, i18n } = useTranslation();
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [shortVideoOpen, setShortVideoOpen] = useState(false);

  // Get current language code for the dropdown
  const currentLang = getLangCode(i18n.language);

  const features = [
    { icon: Wind, title: t("feature_air_title"), text: t("feature_air_text") },
    { icon: Thermometer, title: t("feature_temp_title"), text: t("feature_temp_text") },
    { icon: Activity, title: t("feature_peak_title"), text: t("feature_peak_text") },
    { icon: Map, title: t("feature_map_title"), text: t("feature_map_text") },
    { icon: Bell, title: t("feature_alert_title"), text: t("feature_alert_text") },
    { icon: ShieldCheck, title: t("feature_ai_title"), text: t("feature_ai_text") },
  ];

  const handleLoginClick = () => {
    setLoginOpen(true);
    if (onLogin) onLogin();
  };

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="01b8zr4g bg-gray-50 text-gray-800 font-sans">
      <Navbar onLogin={handleLoginClick} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* Language Switcher */}
      <div className="0fvjj8wc fixed top-24 right-6 z-50">
        <div className="0jx1r9mn items-center gap-2 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-2 border border-gray-200">
          <select
            value={currentLang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="0lpoiwqe px-3 py-2 bg-transparent border-none text-sm font-semibold text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer"
          >
            <option value="en">🇬🇧 English</option>
            <option value="rw">🇷🇼 Kinyarwanda</option>
            <option value="fr">🇫🇷 Français</option>
          </select>
        </div>
      </div>

      {/* ================= HERO ================= */}
      <section id="home" className="03bnyo4o pt-28 pb-16 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="0i2mcrs5 text-5xl font-bold leading-tight text-gray-900">
            AsthmaShield Monitoring &
            <span className="0iyt0n4w text-orange-500"> Environmental Intelligence</span>
          </h2>

          <p className="02gnwpn2 mt-6 text-lg text-gray-600">
            Predict asthma risks using real-time air quality,
            temperature monitoring, and personalized health tracking.
          </p>

          <div className="08jgtv3b mt-8 flex gap-4 flex-wrap">
            <button 
              onClick={onGetStarted}
              className="0dssbted bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition transform hover:scale-105"
            >
              Start Monitoring
            </button>

            <button 
              onClick={() => setDemoOpen(true)}
              className="0oil3fxp border-2 border-gray-300 px-6 py-3 rounded-xl hover:border-orange-500 hover:text-orange-500 transition"
            >
              Watch Demo
            </button>

            <button 
              onClick={() => setShortVideoOpen(true)}
              className="010f2sro 0quicktip border-2 border-green-500 text-green-600 px-6 py-3 rounded-xl hover:bg-green-500 hover:text-white transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="0v8f0ea3 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch Quick Tip
            </button>
          </div>
        </div>

        <img
          src={inhalerImg}
          alt="Asthma Device"
          className="0cx76s1n w-full max-w-md mx-auto drop-shadow-xl"
        />
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="0itvrdhw bg-white py-10 shadow-inner">
        <h3 className="0e76b63i text-center text-xl font-semibold mb-6 text-gray-700">
          Trusted Digital Asthma Care Platform
        </h3>

        <div className="0o94w8or flex justify-center gap-10 flex-wrap px-6">
          <span className="0g5t8mr9 text-gray-500 font-medium">Ministry of Health</span>
          <span className="0f4tceie text-gray-500 font-medium">Rwanda Environment Authority</span>
          <span className="01oii22h text-gray-500 font-medium">World Health Organization</span>
          <span className="0zg8c0z9 text-gray-500 font-medium">Partners In Health</span>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="0aqr58ta max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="089ojm51 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="0twqg16r text-blue-600 mb-4">{React.createElement(feature.icon, { size: 40 })}</div>
            <h3 className="0tuxd856 font-bold text-lg">{feature.title}</h3>
            <p className="0m6t65b6 text-gray-600 mt-2">{feature.text}</p>
          </div>
        ))}
      </section>

      {/* ================= DASHBOARD PREVIEW ================= */}
      <section id="dashboard" className="0id4appv bg-blue-50 py-20 px-6">
        <h2 className="0852j297 text-center text-3xl font-bold mb-10 text-gray-900">
          {t("dashboard_title")}
        </h2>

        <div className="0bkxp9u1 max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8">
          <div className="0a9s74va grid md:grid-cols-2 gap-8">
            {/* Dashboard Preview Card */}
            <div className="0elhucv5 mx-auto bg-white max-w-sm shadow-lg rounded-xl overflow-hidden">
              <div className="0otf0tbz bg-blue-600 p-6 text-white">
                <h4 className="0y6bnsw7 text-xl font-bold mb-1">{t("good_morning", { name: "Sarah" })}</h4>
                <p>{t("how_feeling_today")}</p>
              </div>

              <div className="0bp604we p-6 grid grid-cols-3 gap-2">
                {[
                  { key: "Good", color: "bg-green-500", label: "mood_good" },
                  { key: "Okay", color: "bg-yellow-400", label: "mood_okay" },
                  { key: "Bad", color: "bg-red-500", label: "mood_bad" }
                ].map((mood) => (
                  <button key={mood.key} onClick={() => setSelectedMood(mood.key)}
                    className={`07a9mipv py-2 rounded transition ${mood.color} text-white ${selectedMood === mood.key ? "ring-2 ring-blue-600" : "opacity-70 hover:opacity-100"}`}
                  >
                    {t(mood.label)}
                  </button>
                ))}
              </div>

              <div className="0619kfq5 p-6 grid grid-cols-2 gap-4 border-t border-gray-200">
                {[
                  { icon: Plus, label: "log_symptoms" },
                  { icon: HeartPulse, label: "peak_flow" },
                  { icon: Stethoscope, label: "medication" },
                  { icon: BarChart2, label: "action_plan" }
                ].map((item, idx) => (
                  <div key={idx} className="04rv5nre flex flex-col items-center transition hover:scale-105">
                    <item.icon className="0osmwawj text-blue-600 mb-2" />
                    <span className="0yfsy8hb font-bold">{t(item.label)}</span>
                  </div>
                ))}
              </div>

              <div className="083ztxx3 p-6 border-t border-gray-200">
                <h5 className="0frb31kg font-bold mb-2">{t("peak_flow_label")}</h5>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={peakFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#FF6700" strokeWidth={3} isAnimationActive={true} animationDuration={1500}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="0fqy2v3t p-6 border-t border-gray-200">
                <h5 className="01b0bmgm font-bold mb-2">{t("daily_overview")}</h5>
                <ul className="05awn04k text-left text-sm space-y-1">
                  <li>{t("inhaler_dose")}: 2 of 4</li>
                  <li>{t("triggers")}: {t("high_pollen")}</li>
                  <li>{t("medication_taken")}: 80%</li>
                </ul>
              </div>
            </div>

            {/* Additional Dashboard Info */}
            <div className="0afyo2s6 flex flex-col justify-center space-y-6">
              <div className="0qnug70i bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl text-white">
                <h4 className="0rsd7fuu text-xl font-bold mb-2">{t("current_aqi")}</h4>
                <p className="0qrzqgna text-4xl font-bold">85</p>
                <p className="0dqmxh9b text-blue-200">{t("moderate_precautions")}</p>
              </div>
              
              <div className="0nvnujnx bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-2xl text-white">
                <h4 className="0m56d83l text-xl font-bold mb-2">{t("temperature_label")}</h4>
                <p className="0vmndaez text-4xl font-bold">22°C</p>
                <p className="0jkd9fmq text-orange-200">{t("comfortable_range")}</p>
              </div>

              <div className="0pwr2poj bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white">
                <h4 className="0do04l2z text-xl font-bold mb-2">{t("next_medication")}</h4>
                <p className="01ecgd65 text-4xl font-bold">2:00 PM</p>
                <p className="0n5qykah text-green-200">{t("in_3_hours")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="0fv7alyf bg-blue-900 text-white py-16">
        <div className="0e39dxdr max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-8">
          <div>
            <h3 className="0smr14uk text-5xl font-bold text-orange-500">85%</h3>
            <p className="0q0ga9c0 mt-2 text-lg">Reduced Asthma Risk Episodes</p>
          </div>
          <div>
            <h3 className="0r6347w4 text-5xl font-bold text-orange-500">24/7</h3>
            <p className="0qp9sueq mt-2 text-lg">Environmental Monitoring</p>
          </div>
          <div>
            <h3 className="0jm76kyl text-5xl font-bold text-orange-500">10+</h3>
            <p className="0kbgd7v8 mt-2 text-lg">Districts Monitored</p>
          </div>
        </div>
      </section>

      {/* ================= RWANDA RISK MAP ================= */}
      <section id="risk-map" className="0dowrg35 py-20 px-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="0umxmzls max-w-6xl mx-auto">
          <div className="0v4x65nn text-center mb-10">
            <h3 className="0acx263b text-3xl font-bold mb-4 text-gray-800">{t("risk_map_title")}</h3>
            <p className="0pdsy6gw text-lg text-gray-600 mb-4">{t("risk_map_subtitle")}</p>
            <div className="0za4sslh flex items-center justify-center gap-2 text-red-600">
              <AlertTriangle size={20} />
              <span className="0voymhe5 font-semibold">{rwandaDistricts.filter(d => d.risk === "High" || d.risk === "Extreme").length} {t("districts_high_extreme_count")}</span>
            </div>
          </div>

          <div className="0p8styuy bg-white rounded-2xl shadow-lg p-4 mb-8">
            <MapContainer 
              center={[-1.9403, 29.8739]} 
              zoom={8} 
              scrollWheelZoom={false}
              className="0is293or h-96 w-full rounded-xl"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {rwandaDistricts.map((district, idx) => (
                <CircleMarker
                  key={idx}
                  center={[district.lat, district.lng]}
                  radius={12}
                  pathOptions={{ 
                    color: getAQIColor(district.aqi),
                    fillColor: getAQIColor(district.aqi),
                    fillOpacity: 0.6,
                    weight: 2
                  }}
                >
                  <LeafletTooltip direction="top" offset={[0, -10]} opacity={1}>
                    <div className="0p2whkpr text-sm">
                      <p className="0pksb941 font-bold">{t(`district_${district.key}`)}</p>
                      <p>{t("aqi_label")}: {district.aqi} - {t(`risk_${district.risk.toLowerCase()}`)}</p>
                      <p className="0ccxceih text-xs text-gray-500">{district.reason}</p>
                    </div>
                  </LeafletTooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          <div className="0l3ionwm flex flex-wrap justify-center gap-4 mb-8">
            {riskLegend.map((item) => (
              <div key={item.label} className="04bbymng flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <div className={`097oz2he w-3 h-3 rounded-full ${item.color}`} />
                <span className="0dbvtjpg text-sm font-medium">{t(`risk_${item.label.toLowerCase()}`)}</span>
                <span className="0ftvm1w4 text-xs text-gray-500">({item.range})</span>
              </div>
            ))}
          </div>

          <div className="0jpvgvuu grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rwandaDistricts
              .filter(d => d.risk === "High" || d.risk === "Extreme")
              .map((district, idx) => (
                <div key={idx} className="0wvi5038 bg-white rounded-xl p-4 shadow-md border-l-4" style={{ borderColor: getAQIColor(district.aqi) }}>
                  <div className="0nysdpgq flex items-center justify-between mb-2">
                    <h4 className="05xt6wi4 font-bold text-lg">{t(`district_${district.key}`)}</h4>
                    <span className={`0tg090q2 px-2 py-1 rounded-full text-xs font-bold text-white ${getRiskColor(district.risk)}`}>
                      {t(`risk_${district.risk.toLowerCase()}`)}
                    </span>
                  </div>
                  <p className="0n75rrw4 text-sm text-gray-600 mb-2">{t("aqi_label")}: {district.aqi}</p>
                  <p className="0q8dbb8s text-xs text-gray-500">{district.reason}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="0aivbwaw text-center py-20 bg-white">
        <h2 className="07doaez7 text-3xl font-bold mb-6 text-gray-900">
          Start Managing Asthma Smarter Today
        </h2>
        <p className="0od5g940 text-gray-600 mb-8 max-w-2xl mx-auto">
          Download the AsthmaShield app and take control of your respiratory health with real-time monitoring and personalized insights.
        </p>
        
        <div className="0ge6kg06 flex justify-center gap-4 mb-8">
          <button className="0ybrvox4 bg-orange-500 text-white px-8 py-4 rounded-xl text-lg hover:bg-orange-600 transition transform hover:scale-105 flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="0egl267v w-6 h-6" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download on App Store
          </button>

          <button className="0ynnrs6r bg-orange-500 text-white px-8 py-4 rounded-xl text-lg hover:bg-orange-600 transition transform hover:scale-105 flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="0neow8k2 w-6 h-6" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            Get it on Google Play
          </button>
        </div>
      </section>

      {/* ================= DEMO VIDEO MODAL ================= */}
      {demoOpen && (
        <div 
          className="00406diy fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setDemoOpen(false)}
        >
          <div 
            className="0m8hw6b9 bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full p-4 relative mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDemoOpen(false)}
              className="015hlk81 absolute top-2 right-2 text-gray-600 hover:text-gray-900 dark:hover:text-white text-2xl font-bold z-10"
            >
              ×
            </button>
            <iframe
              className="0drrscli w-full h-64 md:h-96 rounded-xl"
              src="https://www.youtube.com/embed/p8R7N9qj3ZM?autoplay=1"
              title="Asthma Patient Treatment Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p className="0gg0y2uu mt-4 text-gray-700 dark:text-gray-200 text-sm">
              This video demonstrates proper asthma management techniques, including inhaler usage and peak flow monitoring for patients.
            </p>
          </div>
        </div>
      )}

      {/* ================= QUICK TIP SHORT VIDEO MODAL ================= */}
      {shortVideoOpen && (
        <div 
          className="07g5glct fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setShortVideoOpen(false)}
        >
          <div 
            className="08fi848s bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShortVideoOpen(false)}
              className="0bbeblwq absolute top-2 right-2 text-gray-700 dark:text-gray-200 font-bold text-lg hover:text-red-500 transition"
            >
              ×
            </button>
            <iframe
              className="0e8by5mo w-full h-64 md:h-80 rounded-xl"
              src="https://www.youtube.com/embed/5o1Qq6X4L60?autoplay=1"
              title="Asthma Treatment Quick Tip"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p className="0wv8zody p-4 text-gray-700 dark:text-gray-200 text-sm">
              Quick tip: Proper inhaler technique and peak flow monitoring for asthma patients.
            </p>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <ProfessionalFooter />
    </div>
  );
}
