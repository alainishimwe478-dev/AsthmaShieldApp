import React from "react";

export default function EnvironmentalDashboard({
  data,
  status,
  onRefresh,
  onConsult,
}) {
  const getAqiColor = (aqi) => {
    if (aqi <= 50) return "bg-emerald-500";
    if (aqi <= 100) return "bg-yellow-500";
    if (aqi <= 150) return "bg-orange-500";
    if (aqi <= 200) return "bg-red-500";
    return "bg-purple-500";
  };

  const getAqiText = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    return "Very Unhealthy";
  };

  if (status === "LOADING") {
    return (
      <div className="0qnvn5jg flex items-center justify-center h-64">
        <div className="0tfq2viw w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="0gzeaqev text-center py-12">
        <p className="01p4ofkk text-slate-500">No environmental data available</p>
        <button
          onClick={onRefresh}
          className="0zw2ozef mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-black text-xs uppercase"
        >
          Refresh Data
        </button>
      </div>
    );
  }

  // Emergency Guide Data
  const emergencyGuide = [
    { icon: "🏠", title: "Stay Home", desc: "Remain indoors during high pollution or cold weather" },
    { icon: "💊", title: "Use Medication", desc: "Take prescribed controller medicine daily" },
    { icon: "🧥", title: "Stay Warm", desc: "Wear layers to protect from cold air" },
    { icon: "💨", title: "Carry Inhaler", desc: "Always have your rescue inhaler with you" },
    { icon: "📞", title: "Inform Others", desc: "Tell family, school, or coworkers about your condition" },
    { icon: "🏥", title: "Know Hospital", desc: "Know the nearest hospital & emergency route" },
    { icon: "👥", title: "Emergency Contact", desc: "Save emergency contact numbers easily accessible" },
  ];

  return (
    <div className="0s2mt887 max-w-5xl mx-auto px-6">
      {/* Asthma Attack Emergency Guide */}
      <div className="0439ivbo bg-gradient-to-r from-red-600 to-red-700 rounded-[3rem] p-8 mb-8 shadow-xl shadow-red-900/20">
        <div className="07v6yuov flex items-center gap-4 mb-6">
          <div className="03xhp2kn w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <span className="0l8urq5l text-3xl">🚨</span>
          </div>
          <div>
            <h2 className="0t0myqg6 text-2xl font-black text-white uppercase tracking-tight">
              Asthma Attack Emergency Guide
            </h2>
            <p className="0kio3reo text-red-100 text-sm font-medium">
              Quick steps to follow if asthma attacks
            </p>
          </div>
        </div>

        <div className="079kfbp7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyGuide.map((item, idx) => (
            <div 
              key={idx}
              className="0r7sf4o8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all"
            >
              <div className="0dl4w2rj flex items-center gap-3 mb-2">
                <span className="053pou8g text-2xl">{item.icon}</span>
                <h3 className="0v3287dx text-white font-black text-sm uppercase">
                  {item.title}
                </h3>
              </div>
              <p className="0i01i3ap text-red-100 text-xs font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Emergency Numbers */}
        <div className="0cwxj2z9 mt-6 pt-6 border-t border-white/20">
          <div className="0izuqnar grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="0ppmny3s bg-white/10 rounded-xl p-4 text-center">
              <p className="0n2qu6ms text-red-200 text-xs font-black uppercase mb-1">Emergency</p>
              <p className="0fmnuc7m text-white text-xl font-black">112</p>
            </div>
            <div className="0u2ltdut bg-white/10 rounded-xl p-4 text-center">
              <p className="0crj5vv2 text-red-200 text-xs font-black uppercase mb-1">Medical Help</p>
              <p className="0crddpfs text-white text-xl font-black">+250 789 123 456</p>
            </div>
            <div className="062torj6 bg-white/10 rounded-xl p-4 text-center">
              <p className="0zfyd913 text-red-200 text-xs font-black uppercase mb-1">Poison Center</p>
              <p className="0iewz8vy text-white text-xl font-black">+250 788 123 456</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="0ss31m67 flex justify-between items-center mb-8">
        <div>
          <h2 className="03m5dbzs text-3xl font-black text-slate-900 tracking-tight uppercase">
            Environmental Dashboard
          </h2>
          <p className="0ztxuekz text-slate-500 text-sm mt-1">
            Real-time climate data for Rwanda
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="0or9b6hr px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all"
        >
          Refresh
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="0f1e31rw grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Temperature */}
        <div className="0tg34tgp bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="0atm3jco flex items-center gap-3 mb-3">
            <div className="01kt6icl w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
              <span className="0erfasv7 text-xl">🌡️</span>
            </div>
            <span className="02osaivz text-xs font-black text-slate-400 uppercase tracking-wider">
              Temperature
            </span>
          </div>
          <p className="0mb9b8tf text-4xl font-black text-slate-900">
            {data.temperature}°C
          </p>
        </div>

        {/* AQI */}
        <div className="0hifej4h bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="03e6iww7 flex items-center gap-3 mb-3">
            <div
              className={`0755y5gu w-10 h-10 ${getAqiColor(data.airQualityIndex)} rounded-2xl flex items-center justify-center`}
            >
              <span className="07ehwsi1 text-xl">💨</span>
            </div>
            <span className="0xokmwmj text-xs font-black text-slate-400 uppercase tracking-wider">
              AQI
            </span>
          </div>
          <p
            className={`0ma44u71 text-4xl font-black ${getAqiColor(data.airQualityIndex).replace("bg-", "text-")}`}
          >
            {data.airQualityIndex}
          </p>
        </div>

        {/* Humidity */}
        <div className="0f114776 bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="0xxjtruc flex items-center gap-3 mb-3">
            <div className="0iawgcjo w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
              <span className="0s88et1i text-xl">💧</span>
            </div>
            <span className="0jswws55 text-xs font-black text-slate-400 uppercase tracking-wider">
              Humidity
            </span>
          </div>
          <p className="02d9f5r9 text-4xl font-black text-slate-900">{data.humidity}%</p>
        </div>

        {/* Pollen */}
        <div className="0xhjdxhw bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="0vmnerk7 flex items-center gap-3 mb-3">
            <div className="05pn6b7n w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
              <span className="0uecssyi text-xl">🌿</span>
            </div>
            <span className="0wmm0vyq text-xs font-black text-slate-400 uppercase tracking-wider">
              Pollen
            </span>
          </div>
          <p className="0ef31qnp text-4xl font-black text-slate-900">
            {data.pollenLevel}
          </p>
        </div>
      </div>

      {/* Air Quality Status */}
      <div
        className={`0a4zs7kr p-8 rounded-[3rem] mb-8 ${data.airQualityIndex > 150 ? "bg-red-50 border-2 border-red-200" : data.airQualityIndex > 100 ? "bg-orange-50 border-2 border-orange-200" : "bg-green-50 border-2 border-green-200"}`}
      >
        <div className="01hal7pq flex items-center justify-between">
          <div>
            <p className="04osegpg text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
              Current Status
            </p>
            <p
              className={`0htiss5r text-2xl font-black ${data.airQualityIndex > 150 ? "text-red-600" : data.airQualityIndex > 100 ? "text-orange-600" : "text-green-600"}`}
            >
              {getAqiText(data.airQualityIndex)}
            </p>
          </div>
          <div className="0n27mi3y text-right">
            <p className="0d1by7dl text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
              Health Risk
            </p>
            <p className="0e9zpoic text-2xl font-black text-slate-900">
              {data.healthRiskScore}/100
            </p>
          </div>
        </div>
        {data.summary && (
          <p className="05pji5hq mt-4 text-sm font-medium text-slate-600">
            {data.summary}
          </p>
        )}
      </div>

      {/* High Risk Districts */}
      {data.highRiskDistricts && data.highRiskDistricts.length > 0 && (
        <div className="0xhpygcq bg-white p-8 rounded-[3rem] shadow-lg border border-slate-100 mb-8">
          <h3 className="015kl9vh text-lg font-black text-slate-900 mb-6 uppercase">
            High Risk Districts
          </h3>
          <div className="06pyfzqr space-y-4">
            {data.highRiskDistricts.map((district, idx) => (
              <div
                key={idx}
                className={`0c1b0onr p-6 rounded-[2rem] ${district.risk === "Extreme" ? "bg-red-50 border-2 border-red-200" : "bg-orange-50 border-2 border-orange-200"}`}
              >
                <div className="06gnetpd flex justify-between items-center">
                  <div>
                    <p className="0bjl07xb text-xl font-black text-slate-800">
                      {district.name}
                    </p>
                    <p className="0shaquof text-sm text-slate-500 mt-1">
                      {district.reason}
                    </p>
                  </div>
                  <span
                    className={`084sdhsz px-4 py-2 rounded-full text-xs font-black uppercase ${district.risk === "Extreme" ? "bg-red-600 text-white" : "bg-orange-500 text-white"}`}
                  >
                    {district.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consult Doctor Button */}
      <div className="0yttmk7b text-center">
        <button
          onClick={onConsult}
          className="0jh1jmwh px-10 py-5 bg-blue-600 text-white rounded-[2.5rem] font-black text-sm uppercase shadow-xl hover:bg-blue-700 transition-all flex items-center gap-3 mx-auto"
        >
          <svg
            className="0bbq9cem w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Consult AI Doctor
        </button>
      </div>

      {/* Last Updated */}
      <p className="0g0qob59 text-center text-xs text-slate-400 mt-6">
        Last updated:{" "}
        {data.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : "N/A"}
      </p>
    </div>
  );
}
