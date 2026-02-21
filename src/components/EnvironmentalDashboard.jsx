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
      <div className="01vh9ag8 flex items-center justify-center h-64">
        <div className="0hm6wbif w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="051xc2j9 text-center py-12">
        <p className="01p80vq8 text-slate-500">No environmental data available</p>
        <button
          onClick={onRefresh}
          className="0dfz8mrn mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-black text-xs uppercase"
        >
          Refresh Data
        </button>
      </div>
    );
  }

  return (
    <div className="0xdvsd7n max-w-5xl mx-auto px-6">
      {/* Header */}
      <div className="0yqmjeoz flex justify-between items-center mb-8">
        <div>
          <h2 className="0rs6wqwn text-3xl font-black text-slate-900 tracking-tight uppercase">
            Environmental Dashboard
          </h2>
          <p className="0ues1xju text-slate-500 text-sm mt-1">
            Real-time climate data for Rwanda
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="0v9si942 px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all"
        >
          Refresh
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="0aikvkjn grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Temperature */}
        <div className="0wm4es1n bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="07sqzlkj flex items-center gap-3 mb-3">
            <div className="0v23cvhx w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
              <span className="02bimcle text-xl">🌡️</span>
            </div>
            <span className="0gmxz1gi text-xs font-black text-slate-400 uppercase tracking-wider">
              Temperature
            </span>
          </div>
          <p className="0tc5d8w9 text-4xl font-black text-slate-900">
            {data.temperature}°C
          </p>
        </div>

        {/* AQI */}
        <div className="0qw3g6mk bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="08m99ia0 flex items-center gap-3 mb-3">
            <div
              className={`0fw3dci1 w-10 h-10 ${getAqiColor(data.airQualityIndex)} rounded-2xl flex items-center justify-center`}
            >
              <span className="0s2ml7zd text-xl">💨</span>
            </div>
            <span className="0yv1p14g text-xs font-black text-slate-400 uppercase tracking-wider">
              AQI
            </span>
          </div>
          <p
            className={`0u2qgzmp text-4xl font-black ${getAqiColor(data.airQualityIndex).replace("bg-", "text-")}`}
          >
            {data.airQualityIndex}
          </p>
        </div>

        {/* Humidity */}
        <div className="0cye0y6v bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="0ocmgloe flex items-center gap-3 mb-3">
            <div className="0zm8x4wh w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
              <span className="0z8dkcil text-xl">💧</span>
            </div>
            <span className="0x6m1cgk text-xs font-black text-slate-400 uppercase tracking-wider">
              Humidity
            </span>
          </div>
          <p className="0b19olyt text-4xl font-black text-slate-900">{data.humidity}%</p>
        </div>

        {/* Pollen */}
        <div className="055tbwrs bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100">
          <div className="01rbtz8v flex items-center gap-3 mb-3">
            <div className="0io30f3j w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
              <span className="06t3cka8 text-xl">🌿</span>
            </div>
            <span className="0us5y2r3 text-xs font-black text-slate-400 uppercase tracking-wider">
              Pollen
            </span>
          </div>
          <p className="073t82wr text-4xl font-black text-slate-900">
            {data.pollenLevel}
          </p>
        </div>
      </div>

      {/* Air Quality Status */}
      <div
        className={`09edjtg6 p-8 rounded-[3rem] mb-8 ${data.airQualityIndex > 150 ? "bg-red-50 border-2 border-red-200" : data.airQualityIndex > 100 ? "bg-orange-50 border-2 border-orange-200" : "bg-green-50 border-2 border-green-200"}`}
      >
        <div className="0zldilto flex items-center justify-between">
          <div>
            <p className="026za3uq text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
              Current Status
            </p>
            <p
              className={`0x206u53 text-2xl font-black ${data.airQualityIndex > 150 ? "text-red-600" : data.airQualityIndex > 100 ? "text-orange-600" : "text-green-600"}`}
            >
              {getAqiText(data.airQualityIndex)}
            </p>
          </div>
          <div className="0wdle994 text-right">
            <p className="0h322r2t text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
              Health Risk
            </p>
            <p className="0szyr92z text-2xl font-black text-slate-900">
              {data.healthRiskScore}/100
            </p>
          </div>
        </div>
        {data.summary && (
          <p className="0i4adggi mt-4 text-sm font-medium text-slate-600">
            {data.summary}
          </p>
        )}
      </div>

      {/* High Risk Districts */}
      {data.highRiskDistricts && data.highRiskDistricts.length > 0 && (
        <div className="0ngn3byp bg-white p-8 rounded-[3rem] shadow-lg border border-slate-100 mb-8">
          <h3 className="09dedfj9 text-lg font-black text-slate-900 mb-6 uppercase">
            High Risk Districts
          </h3>
          <div className="0xgxvfcm space-y-4">
            {data.highRiskDistricts.map((district, idx) => (
              <div
                key={idx}
                className={`0p5r4onm p-6 rounded-[2rem] ${district.risk === "Extreme" ? "bg-red-50 border-2 border-red-200" : "bg-orange-50 border-2 border-orange-200"}`}
              >
                <div className="0eknlypt flex justify-between items-center">
                  <div>
                    <p className="0qn75fac text-xl font-black text-slate-800">
                      {district.name}
                    </p>
                    <p className="0cayaoet text-sm text-slate-500 mt-1">
                      {district.reason}
                    </p>
                  </div>
                  <span
                    className={`0f0dabvb px-4 py-2 rounded-full text-xs font-black uppercase ${district.risk === "Extreme" ? "bg-red-600 text-white" : "bg-orange-500 text-white"}`}
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
      <div className="0c4y0gc2 text-center">
        <button
          onClick={onConsult}
          className="0gmcgiji px-10 py-5 bg-blue-600 text-white rounded-[2.5rem] font-black text-sm uppercase shadow-xl hover:bg-blue-700 transition-all flex items-center gap-3 mx-auto"
        >
          <svg
            className="0wxgs9j6 w-5 h-5"
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
      <p className="0zdpu1nu text-center text-xs text-slate-400 mt-6">
        Last updated:{" "}
        {data.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : "N/A"}
      </p>
    </div>
  );
}
