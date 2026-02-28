import React, { useState, useEffect } from "react";
import { ArrowRight, HeartPulse, Stethoscope, Calendar, Plus, BarChart2, MapPin, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import '../index.css';
import logoImg from '../../assets/logo.png';
import inhalerImg from '../../assets/inhaler.png';
import ProfessionalFooter from './ProfessionalFooter';

const rwandaDistricts = [
  { name: "Nyarugenge", lat: -1.9441, lng: 30.0619, aqi: 145, risk: "High", reason: "Heavy traffic, vehicle emissions" },
  { name: "Gasabo", lat: -1.8849, lng: 30.1333, aqi: 120, risk: "High", reason: "Urban development, industrial activity" },
  { name: "Kicukiro", lat: -1.9667, lng: 30.1167, aqi: 95, risk: "Moderate", reason: "Mixed residential and commercial" },
  { name: "Rubavu", lat: -1.7514, lng: 29.2686, aqi: 165, risk: "Extreme", reason: "High population density, border traffic" },
  { name: "Nyagatare", lat: -1.2942, lng: 30.3286, aqi: 110, risk: "High", reason: "Agricultural activities, dust" },
  { name: "Huye", lat: -2.5956, lng: 29.739, aqi: 75, risk: "Moderate", reason: "University town, moderate traffic" },
  { name: "Musanze", lat: -1.478, lng: 29.636, aqi: 40, risk: "Low", reason: "Tourism, clean air" },
  { name: "Ruhengeri", lat: -1.5117, lng: 29.5633, aqi: 35, risk: "Low", reason: "Mountain region, fresh air" },
  { name: "Bugesera", lat: -2.1333, lng: 30.0667, aqi: 88, risk: "Moderate", reason: "Airport proximity" },
  { name: "Rwamagana", lat: -1.9487, lng: 30.4358, aqi: 65, risk: "Low", reason: "Agricultural area" },
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

const testimonials = [
  { name: "John D.", text: "AsthmaShield helped me track my symptoms and prevent attacks!" },
  { name: "Sarah M.", text: "The dashboard is intuitive and keeps me on top of my medications." },
  { name: "Emily R.", text: "I love the peak flow charts—they show my progress clearly!" },
];

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onNavigate?: (view: string) => void;
}

export default function LandingPageNew({
  onGetStarted,
  onLogin,
}: LandingPageProps) {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="054sxq5t font-sans text-gray-800">

      <header className="02scq4sr bg-primary text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="0ja94bb0 text-2xl font-bold flex items-center gap-2">
          <img src={logoImg} alt="AsthmaShield Logo" className="0dxgjiau w-8 h-8" /> AsthmaShield
        </h1>
        <nav className="0wgj4fce flex gap-4">
          <a href="#features" className="0h7beqbd hover:underline">Features</a>
          <a href="#dashboard" className="0ufmhzpq hover:underline">Dashboard</a>
          <a href="#risk-map" className="0xqxsklp hover:underline">Risk Map</a>
          <a href="#contact" className="01zgu5l4 hover:underline">Contact</a>
          <button 
            onClick={onLogin}
            className="0e57xman bg-secondary text-white px-4 py-1 rounded hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </nav>
      </header>

      <section className="01pbp2be bg-orange-50 py-20 px-6 text-center">
        <div className="0a5rz0b0 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="00flbg88 flex-1 text-left">
            <h2 className="0zuzkipw text-4xl font-bold mb-4">Manage Your Asthma Easily</h2>
            <p className="0nv2ybdr text-lg mb-6">Track your symptoms, medication, peak flow, and risk alerts—all in one app.</p>
            <button 
              onClick={onGetStarted}
              className="0v4zuw8m inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded hover:bg-orange-700 transition"
            >
              Get Started <ArrowRight size={20} />
            </button>
          </div>
          <div className="0m1xovjd flex-1">
            <img
              src={inhalerImg}
              alt="Asthma Inhaler"
              className="0q54v94k w-96 h-96 object-contain mx-auto drop-shadow-lg rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <section id="features" className="0ng0z1dg py-20 px-6 max-w-6xl mx-auto">
        <h3 className="0lbghe7f text-3xl font-bold text-center mb-12">App Features</h3>
        <div className="0s1ot9uc grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: Calendar, title: "Symptom Tracking", desc: "Log your daily symptoms and monitor trends over time." },
            { icon: Stethoscope, title: "Doctor Consultations", desc: "Connect with healthcare providers for guidance anytime." },
            { icon: HeartPulse, title: "Peak Flow Monitoring", desc: "Keep track of your lung performance and prevent flare-ups." },
            { icon: ArrowRight, title: "Action Plan", desc: "Follow personalized asthma action plans recommended by your doctor." }
          ].map((feature, idx) => (
            <div key={idx} className="0hb3xes7 bg-white shadow-md rounded p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <feature.icon size={48} className="0a8eniqu mx-auto text-primary mb-4" />
              <h4 className="03raaoz5 font-bold text-xl mb-2">{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="dashboard" className="0vt7dqij bg-orange-50 py-20 px-6 text-center">
        <h3 className="0rccfpny text-3xl font-bold mb-6">Your Dashboard at a Glance</h3>
        <p className="0gbdm299 text-lg mb-10 max-w-2xl mx-auto">Visualize your asthma metrics, medication reminders, and risk alerts in an intuitive dashboard.</p>

        <div className="0thrmyw0 mx-auto bg-white max-w-sm shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105">
          <div className="0hytyrct bg-primary p-6 text-white text-left">
            <h4 className="0jx9mt2w text-xl font-bold mb-1">Good Morning, Sarah</h4>
            <p>How are you feeling today?</p>
          </div>

          <div className="01jandbs p-6 grid grid-cols-3 gap-2">
            {["Good", "Okay", "Bad"].map((mood) => (
              <button key={mood} onClick={() => setSelectedMood(mood)}
                className={`04gpwc93 py-2 rounded transition ${
                  mood === "Good" ? "bg-green-500 text-white" : ""
                } ${mood === "Okay" ? "bg-yellow-400 text-white" : ""} ${
                  mood === "Bad" ? "bg-red-500 text-white" : ""
                } ${selectedMood === mood ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`}
              >
                {mood}
              </button>
            ))}
          </div>

          <div className="09lutvqe p-6 grid grid-cols-2 gap-4 border-t border-gray-200">
            {[
              { icon: Plus, label: "Log Symptoms" },
              { icon: HeartPulse, label: "Peak Flow" },
              { icon: Stethoscope, label: "Medication" },
              { icon: BarChart2, label: "Action Plan" }
            ].map((item, idx) => (
              <div key={idx} className="0l7jli0o flex flex-col items-center transition hover:scale-105">
                <item.icon className="0swr6mhn text-primary mb-2" />
                <span className="0ermyapy font-bold">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="0uwm5ley p-6 border-t border-gray-200">
            <h5 className="0qtcgcbb font-bold mb-2">Peak Flow (L/min)</h5>
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

          <div className="0qjpbwvd p-6 border-t border-gray-200">
            <h5 className="0sg6lek6 font-bold mb-2">Daily Overview</h5>
            <ul className="064abcx1 text-left text-sm space-y-1">
              <li>Inhaler Dose: 2 of 4</li>
              <li>Triggers: High Pollen</li>
              <li>Medication Taken: 80%</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="0k24g3cy py-20 px-6 bg-white text-center max-w-3xl mx-auto">
        <h3 className="0cyc3wgc text-3xl font-bold mb-12">What Users Say</h3>
        <div className="0r0p1ru2 relative">
          <p className="0ee5gw5r italic mb-4">"{testimonials[testimonialIndex].text}"</p>
          <h5 className="0sbbud39 font-bold mb-2">- {testimonials[testimonialIndex].name}</h5>
          <div className="0yn2oeta flex justify-center gap-4 mt-4">
            <button onClick={prevTestimonial} className="0vsilv5a bg-primary text-white px-4 py-1 rounded hover:bg-orange-700 transition">Prev</button>
            <button onClick={nextTestimonial} className="07h57hoz bg-primary text-white px-4 py-1 rounded hover:bg-orange-700 transition">Next</button>
          </div>
        </div>
      </section>

      <section id="risk-map" className="0lixb3x4 py-20 px-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="0anh9r6u max-w-6xl mx-auto">
          <div className="0452lnzf text-center mb-10">
            <h3 className="0rbmmmw4 text-3xl font-bold mb-4 text-gray-800">Rwanda District Risk Map</h3>
            <p className="0j1fhrnh text-lg text-gray-600 mb-4">Real-time asthma risk levels across Rwanda districts</p>
            <div className="0harj7wm flex items-center justify-center gap-2 text-red-600">
              <AlertTriangle size={20} />
              <span className="09xj80bo font-semibold">{rwandaDistricts.filter(d => d.risk === "High" || d.risk === "Extreme").length} districts with High/Extreme risk</span>
            </div>
          </div>

          <div className="0fs4qbvk bg-white rounded-2xl shadow-lg p-4 mb-8">
            <MapContainer 
              center={[-1.9403, 29.8739]} 
              zoom={8} 
              scrollWheelZoom={false}
              className="0meb30uy h-96 w-full rounded-xl"
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
                    <div className="0w9h7fqo text-sm">
                      <p className="0ycmg42d font-bold">{district.name}</p>
                      <p>AQI: {district.aqi} - {district.risk}</p>
                      <p className="0svdumt6 text-xs text-gray-500">{district.reason}</p>
                    </div>
                  </LeafletTooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          <div className="0efjo7lf flex flex-wrap justify-center gap-4 mb-8">
            {riskLegend.map((item) => (
              <div key={item.label} className="064khdel flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <div className={`0wimmfpc w-3 h-3 rounded-full ${item.color}`} />
                <span className="0t7qhx6n text-sm font-medium">{item.label}</span>
                <span className="0bo70aap text-xs text-gray-500">({item.range})</span>
              </div>
            ))}
          </div>

          <div className="05mt4rg8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rwandaDistricts
              .filter(d => d.risk === "High" || d.risk === "Extreme")
              .map((district, idx) => (
                <div key={idx} className="0qbzgf3v bg-white rounded-xl p-4 shadow-md border-l-4" style={{ borderColor: getAQIColor(district.aqi) }}>
                  <div className="0v8dmm4t flex items-center justify-between mb-2">
                    <h4 className="0cujznvc font-bold text-lg">{district.name}</h4>
                    <span className={`0kej1268 px-2 py-1 rounded-full text-xs font-bold text-white ${getRiskColor(district.risk)}`}>
                      {district.risk}
                    </span>
                  </div>
                  <p className="0bzhtksk text-sm text-gray-600 mb-2">AQI: {district.aqi}</p>
                  <p className="0f8offiv text-xs text-gray-500">{district.reason}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="0nf9en4i py-20 px-6 text-center bg-orange-50">
        <h3 className="0psqgpcj text-3xl font-bold mb-6">Get AsthmaShield Today</h3>
        <p className="0w799kbd mb-6">Available on iOS and Android</p>
        <div className="0wbpq5hc flex justify-center gap-4">
          <a href="#" className="00rzmzfe bg-secondary text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-gray-800 transition">
            <img src="/apple-logo.png" alt="Apple" className="003myaj9 w-6" /> App Store
          </a>
          <a href="#" className="0nhuv3fc bg-primary text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-orange-700 transition">
            <img src="/google-play.png" alt="Google Play" className="0zx8zkta w-6" /> Google Play
          </a>
        </div>
      </section>

      <ProfessionalFooter />
    </div>
  );
}
