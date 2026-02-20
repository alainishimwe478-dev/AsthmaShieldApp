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
      <div className="0lke2v73 flex items-center justify-center h-64">
        <div className="0ieyi28o w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="0svv3tpn text-center py-12">
        <p className="0qctlzxv text-slate-500">
          No environmental data available
        </p>
        <button
          onClick={onRefresh}
          className="0lltz2zb mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-black text-xs uppercase"
        >
          Refresh Data
        </button>
      </div>
    );
  }

  return (
    <div className="0atr6lcr max-w-5xl mx-auto px-6">
      {/* Header */}
      <div className="0ozqdpje flex justify-between items-center mb-8">
        <div>
          <h2 className="0cqm2tal text-3xl font-black text-slate-900 tracking-tight uppercase">
            Environmental Dashboard
          </h2>
          <p className="0dhlqiwx text-slate-500 text-sm mt-1">
            Real-time climate data for Rwanda
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="06tgtjn3 px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all"
        >
          Refresh
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="0ed2l25m grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Temperature */}
        <div className="0xjd3wdo bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="0mcn2sh2 flex items-center gap-3 mb-3">
            <div className="0yec8wxq w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
              <span className="0euoqbt9 text-xl">🌡️</span>
            </div>
            <span className="0u7nic3x text-xs font-black text-slate-400 uppercase tracking-wider">
              Temperature
            </span>
          </div>
          <p className="0rg9rafe text-4xl font-black text-slate-900">
            {data.temperature}°C
          </p>
        </div>

        {/* AQI */}
        <div className="0jbfnfxs bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="08h8n48r flex items-center gap-3 mb-3">
            <div
              className={`0z3i5tg0 w-10 h-10 ${getAqiColor(data.airQualityIndex)} rounded-2xl flex items-center justify-center`}
            >
              <span className="0265c5rk text-xl">💨</span>
            </div>
            <span className="0fdwa7zq text-xs font-black text-slate-400 uppercase tracking-wider">
              AQI
            </span>
          </div>
          <p
            className={`0b3ucc4e text-4xl font-black ${getAqiColor(data.airQualityIndex).replace("bg-", "text-")}`}
          >
            {data.airQualityIndex}
          </p>
        </div>

        {/* Humidity */}
        <div className="0yisaowx bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="0abr38fc flex items-center gap-3 mb-3">
            <div className="0nn34f43 w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
              <span className="0ceeywgr text-xl">💧</span>
            </div>
            <span className="0zfxt7qn text-xs font-black text-slate-400 uppercase tracking-wider">
              Humidity
            </span>
          </div>
          <p className="0cbk0ojb text-4xl font-black text-slate-900">
            {data.humidity}%
          </p>
        </div>

        {/* Pollen */}
        <div className="0b8jyuaj bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="0rzt9ros flex items-center gap-3 mb-3">
            <div className="0nmgb2dz w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
              <span className="0l5u3p9y text-xl">🌿</span>
            </div>
            <span className="0pwftb1z text-xs font-black text-slate-400 uppercase tracking-wider">
              Pollen
            </span>
          </div>
          <p className="02hn6uxh text-4xl font-black text-slate-900">
            {data.pollenLevel}
          </p>
        </div>
      </div>

      {/* Air Quality Status */}
      <div
        className={`0xrxsahc p-8 rounded-[3rem] mb-8 ${data.airQualityIndex > 150 ? "bg-red-50 border-2 border-red-200" : data.airQualityIndex > 100 ? "bg-orange-50 border-2 border-orange-200" : "bg-green-50 border-2 border-green-200"}`}
      >
        <div className="078w6dj8 flex items-center justify-between">
          <div>
            <p className="0cmata5h text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
              Current Status
            </p>
            <p
              className={`0xppi50i text-2xl font-black ${data.airQualityIndex > 150 ? "text-red-600" : data.airQualityIndex > 100 ? "text-orange-600" : "text-green-600"}`}
            >
              {getAqiText(data.airQualityIndex)}
            </p>
          </div>
          <div className="0ooxd98r text-right">
            <p className="04zc6xbb text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
              Health Risk
            </p>
            <p className="00mtydwm text-2xl font-black text-slate-900">
              {data.healthRiskScore}/100
            </p>
          </div>
        </div>
        {data.summary && (
          <p className="0zugt9kt mt-4 text-sm font-medium text-slate-600">
            {data.summary}
          </p>
        )}
      </div>

      {/* High Risk Districts */}
      {data.highRiskDistricts && data.highRiskDistricts.length > 0 && (
        <div className="0e34uqtv bg-white p-8 rounded-[3rem] shadow-lg border border-slate-100 mb-8">
          <h3 className="08ze94dw text-lg font-black text-slate-900 mb-6 uppercase">
            High Risk Districts
          </h3>
          <div className="0mymmoyr space-y-4">
            {data.highRiskDistricts.map((district, idx) => (
              <div
                key={idx}
                className={`0ktnevb6 p-6 rounded-[2rem] ${district.risk === "Extreme" ? "bg-red-50 border-2 border-red-200" : "bg-orange-50 border-2 border-orange-200"}`}
              >
                <div className="0yruyrr0 flex justify-between items-center">
                  <div>
                    <p className="05dkie60 text-xl font-black text-slate-800">
                      {district.name}
                    </p>
                    <p className="0wilj9h9 text-sm text-slate-500 mt-1">
                      {district.reason}
                    </p>
                  </div>
                  <span
                    className={`0ifo16k9 px-4 py-2 rounded-full text-xs font-black uppercase ${district.risk === "Extreme" ? "bg-red-600 text-white" : "bg-orange-500 text-white"}`}
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
      <div className="0mmnozu2 text-center">
        <button
          onClick={onConsult}
          className="0bi1pgzu px-10 py-5 bg-blue-600 text-white rounded-[2.5rem] font-black text-sm uppercase shadow-xl hover:bg-blue-700 transition-all flex items-center gap-3 mx-auto"
        >
          <svg
            className="03mx80tn w-5 h-5"
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
      <p className="025cdms5 text-center text-xs text-slate-400 mt-6">
        Last updated:{" "}
        {data.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : "N/A"}
      </p>
    </div>
  );
}
