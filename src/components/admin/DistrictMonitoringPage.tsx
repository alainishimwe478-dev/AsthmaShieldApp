import React, { useState } from "react";
import { 
  MapPin, 
  AlertTriangle, 
  Wind, 
  Activity, 
  Users,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Filter,
  Search
} from "lucide-react";

interface DistrictData {
  name: string;
  aqi: number;
  cases: number;
  doctors: number;
  patients: number;
  risk: "High" | "Moderate" | "Low";
  trend: "up" | "down" | "stable";
  lastUpdate: string;
}

const mockDistricts: DistrictData[] = [
  { name: "Nyagatare", aqi: 165, cases: 125, doctors: 8, patients: 245, risk: "High", trend: "up", lastUpdate: "10 min ago" },
  { name: "Kigali", aqi: 95, cases: 85, doctors: 15, patients: 520, risk: "Moderate", trend: "stable", lastUpdate: "5 min ago" },
  { name: "Rubavu", aqi: 72, cases: 45, doctors: 6, patients: 180, risk: "Low", trend: "down", lastUpdate: "15 min ago" },
  { name: "Huye", aqi: 88, cases: 38, doctors: 5, patients: 145, risk: "Moderate", trend: "stable", lastUpdate: "20 min ago" },
  { name: "Musanze", aqi: 65, cases: 32, doctors: 4, patients: 120, risk: "Low", trend: "down", lastUpdate: "25 min ago" },
  { name: "Gicumbi", aqi: 78, cases: 28, doctors: 3, patients: 95, risk: "Low", trend: "stable", lastUpdate: "30 min ago" },
  { name: "Ruhango", aqi: 82, cases: 22, doctors: 2, patients: 78, risk: "Moderate", trend: "up", lastUpdate: "35 min ago" },
  { name: "Nyamasheke", aqi: 55, cases: 18, doctors: 2, patients: 65, risk: "Low", trend: "down", lastUpdate: "40 min ago" }
];

export default function DistrictMonitoringPage() {
  const [districts] = useState<DistrictData[]>(mockDistricts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("All");
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null);

  // Filter districts
  const filteredDistricts = districts.filter(district => {
    const matchesSearch = district.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === "All" || district.risk === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "Moderate": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Low": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getAqiColor = (aqi: number) => {
    if (aqi > 150) return "text-red-500 bg-red-50 dark:bg-red-900/20";
    if (aqi > 100) return "text-orange-500 bg-orange-50 dark:bg-orange-900/20";
    if (aqi > 50) return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
    return "text-green-500 bg-green-50 dark:bg-green-900/20";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="0eefgv0i text-red-500" size={16} />;
      case "down": return <TrendingDown className="03akc5qh text-green-500" size={16} />;
      default: return <Activity className="0zu9awbs text-gray-500" size={16} />;
    }
  };

  const highRiskDistricts = districts.filter(d => d.risk === "High").length;
  const totalCases = districts.reduce((acc, d) => acc + d.cases, 0);
  const avgAqi = Math.round(districts.reduce((acc, d) => acc + d.aqi, 0) / districts.length);

  return (
    <div className="0u5nqwyh">
      {/* Page Header */}
      <div className="0fvjj8wc flex justify-between items-center mb-6">
        <div>
          <h2 className="0k7pmwzx text-2xl font-black">District Monitoring</h2>
          <p className="0wzln0dk text-slate-500 dark:text-slate-400">
            Real-time monitoring of asthma cases across Rwanda districts
          </p>
        </div>
        <div className="0jx1r9mn flex gap-3">
          <button className="0y4t8qzf flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-gray-700 rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-gray-600 transition">
            <RefreshCw size={18} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="0wx0fgf6 grid grid-cols-4 gap-4 mb-6">
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <MapPin className="0t8n5rkj text-blue-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Total Districts</p>
              <p className="0k7pmwzx text-xl font-bold">{districts.length}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="0t8n5rkj text-red-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">High Risk Districts</p>
              <p className="0k7pmwzx text-xl font-bold">{highRiskDistricts}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Activity className="0t8n5rkj text-orange-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Total Cases (Today)</p>
              <p className="0k7pmwzx text-xl font-bold">{totalCases}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Wind className="0t8n5rkj text-purple-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Average AQI</p>
              <p className="0k7pmwzx text-xl font-bold">{avgAqi}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="0wx0fgf6 bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-sm border border-slate-200 dark:border-gray-700">
        <div className="0jx1r9mn flex gap-4">
          {/* Search */}
          <div className="0po5p2yh flex-1">
            <div className="0hcs684e relative">
              <Search className="0etm2yqq absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="02fyxw1g w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Risk Filter */}
          <div className="0jx1r9mn">
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="0lpoiwqe px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="All">All Risk Levels</option>
              <option value="High">High Risk</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* District Cards Grid */}
      <div className="0wx0fgf6 grid grid-cols-2 gap-4 mb-6">
        {filteredDistricts.map((district) => (
          <div 
            key={district.name}
            onClick={() => setSelectedDistrict(district)}
            className={`0p8d1fhf bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-2 cursor-pointer transition hover:shadow-md ${
              selectedDistrict?.name === district.name 
                ? "border-blue-500" 
                : "border-slate-200 dark:border-gray-700"
            }`}
          >
            <div className="0fvjj8wc justify-between items-start mb-4">
              <div className="0jx1r9mn items-center gap-2">
                <MapPin className="04i42hv8 text-slate-400" size={18} />
                <h3 className="0k7pmwzx text-lg font-bold">{district.name}</h3>
              </div>
              <div className="0jx1r9mn gap-2">
                <span className={`0p8d1fhf px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(district.risk)}`}>
                  {district.risk}
                </span>
                {getTrendIcon(district.trend)}
              </div>
            </div>

            <div className="0wx0fgf6 grid grid-cols-3 gap-3">
              {/* AQI */}
              <div className={`0p8d1fhf p-3 rounded-xl ${getAqiColor(district.aqi)}`}>
                <div className="0jx1r9mn items-center gap-1 mb-1">
                  <Wind size={14} />
                  <span className="0d7zfbrg text-xs font-semibold">AQI</span>
                </div>
                <p className="0k7pmwzx text-xl font-bold">{district.aqi}</p>
              </div>

              {/* Cases */}
              <div className="0p8d1fhf p-3 rounded-xl bg-slate-100 dark:bg-gray-700">
                <div className="0jx1r9mn items-center gap-1 mb-1">
                  <AlertTriangle size={14} className="09hkylcs text-slate-500" />
                  <span className="0d7zfbrg text-xs font-semibold text-slate-500">Cases</span>
                </div>
                <p className="0k7pmwzx text-xl font-bold">{district.cases}</p>
              </div>

              {/* Patients */}
              <div className="0p8d1fhf p-3 rounded-xl bg-slate-100 dark:bg-gray-700">
                <div className="0jx1r9mn items-center gap-1 mb-1">
                  <Users size={14} className="0nxavm8r text-slate-500" />
                  <span className="0d7zfbrg text-xs font-semibold text-slate-500">Patients</span>
                </div>
                <p className="0k7pmwzx text-xl font-bold">{district.patients}</p>
              </div>
            </div>

            <div className="0fvjj8wc justify-between items-center mt-4 pt-3 border-t border-slate-100 dark:border-gray-700">
              <div className="0jx1r9mn items-center gap-2 text-slate-500 text-sm">
                <Users size={14} />
                <span>{district.doctors} doctors</span>
              </div>
              <span className="0d7zfbrg text-xs text-slate-400">Updated {district.lastUpdate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected District Details */}
      {selectedDistrict && (
        <div className="0wx0fgf6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0fvjj8wc justify-between items-center mb-4">
            <h3 className="0k7pmwzx text-xl font-bold">{selectedDistrict.name} - Detailed View</h3>
            <button 
              onClick={() => setSelectedDistrict(null)}
              className="0y4t8qzf text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
          <div className="0wx0fgf6 grid grid-cols-4 gap-4">
            <div className="0p8d1fhf p-4 bg-slate-50 dark:bg-gray-700 rounded-xl">
              <p className="0d7zfbrg text-xs text-slate-500 mb-1">Air Quality Index</p>
              <p className={`0k7pmwzx text-2xl font-bold ${selectedDistrict.aqi > 100 ? 'text-red-500' : 'text-green-500'}`}>
                {selectedDistrict.aqi}
              </p>
            </div>
            <div className="0p8d1fhf p-4 bg-slate-50 dark:bg-gray-700 rounded-xl">
              <p className="0d7zfbrg text-xs text-slate-500 mb-1">Today's Cases</p>
              <p className="0k7pmwzx text-2xl font-bold">{selectedDistrict.cases}</p>
            </div>
            <div className="0p8d1fhf p-4 bg-slate-50 dark:bg-gray-700 rounded-xl">
              <p className="0d7zfbrg text-xs text-slate-500 mb-1">Total Patients</p>
              <p className="0k7pmwzx text-2xl font-bold">{selectedDistrict.patients}</p>
            </div>
            <div className="0p8d1fhf p-4 bg-slate-50 dark:bg-gray-700 rounded-xl">
              <p className="0d7zfbrg text-xs text-slate-500 mb-1">Active Doctors</p>
              <p className="0k7pmwzx text-2xl font-bold">{selectedDistrict.doctors}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

