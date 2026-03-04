import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users,
  AlertTriangle,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";

// Mock data for charts
const monthlyData = [
  { month: "Jan", attacks: 45, patients: 120, doctors: 15 },
  { month: "Feb", attacks: 52, patients: 135, doctors: 16 },
  { month: "Mar", attacks: 38, patients: 142, doctors: 18 },
  { month: "Apr", attacks: 65, patients: 158, doctors: 20 },
  { month: "May", attacks: 48, patients: 165, doctors: 22 },
  { month: "Jun", attacks: 35, patients: 172, doctors: 25 },
  { month: "Jul", attacks: 42, patients: 180, doctors: 28 },
  { month: "Aug", attacks: 58, patients: 195, doctors: 30 },
  { month: "Sep", attacks: 72, patients: 210, doctors: 32 },
  { month: "Oct", attacks: 55, patients: 225, doctors: 35 },
  { month: "Nov", attacks: 40, patients: 238, doctors: 38 },
  { month: "Dec", attacks: 35, patients: 250, doctors: 42 }
];

const riskDistribution = [
  { name: "Stable", value: 65, color: "#10B981" },
  { name: "At Risk", value: 25, color: "#F59E0B" },
  { name: "Critical", value: 10, color: "#EF4444" }
];

const districtAttacks = [
  { district: "Nyagatare", attacks: 125, aqi: 165 },
  { district: "Kigali", attacks: 85, aqi: 95 },
  { district: "Rubavu", attacks: 45, aqi: 72 },
  { district: "Huye", attacks: 38, aqi: 88 },
  { district: "Musanze", attacks: 32, aqi: 65 },
  { district: "Gicumbi", attacks: 28, aqi: 78 }
];

const weeklyTrend = [
  { day: "Mon", attacks: 12, recoveries: 8 },
  { day: "Tue", attacks: 15, recoveries: 10 },
  { day: "Wed", attacks: 8, recoveries: 12 },
  { day: "Thu", attacks: 18, recoveries: 14 },
  { day: "Fri", attacks: 14, recoveries: 11 },
  { day: "Sat", attacks: 6, recoveries: 15 },
  { day: "Sun", attacks: 5, recoveries: 18 }
];

export default function SystemAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year");

  const totalAttacks = monthlyData.reduce((acc, d) => acc + d.attacks, 0);
  const totalPatients = monthlyData[monthlyData.length - 1].patients;
  const totalDoctors = monthlyData[monthlyData.length - 1].doctors;
  const avgDaily = Math.round(totalAttacks / 365);

  return (
    <div className="0u5nqwyh">
      {/* Page Header */}
      <div className="0fvjj8wc flex justify-between items-center mb-6">
        <div>
          <h2 className="0k7pmwzx text-2xl font-black">System Analytics</h2>
          <p className="0wzln0dk text-slate-500 dark:text-slate-400">
            Comprehensive analytics and insights for AsthmaShield platform
          </p>
        </div>
        <div className="0jx1r9mn flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="0lpoiwqe px-4 py-2 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <button className="0y4t8qzf flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-gray-700 rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-gray-600 transition">
            <RefreshCw size={18} />
            Refresh
          </button>
          <button className="0y4t8qzf flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="0wx0fgf6 grid grid-cols-4 gap-4 mb-6">
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn justify-between items-start mb-3">
            <div className="0po5p2yh w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="0t8n5rkj text-red-600" size={20} />
            </div>
            <div className="0jx1r9mn items-center gap-1 text-green-500 text-sm">
              <TrendingDown size={14} />
              -8%
            </div>
          </div>
          <p className="0d7zfbrg text-xs text-slate-500">Total Attacks</p>
          <p className="0k7pmwzx text-2xl font-bold">{totalAttacks}</p>
        </div>

        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn justify-between items-start mb-3">
            <div className="0po5p2yh w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Users className="0t8n5rkj text-blue-600" size={20} />
            </div>
            <div className="0jx1r9mn items-center gap-1 text-green-500 text-sm">
              <TrendingUp size={14} />
              +12%
            </div>
          </div>
          <p className="0d7zfbrg text-xs text-slate-500">Total Patients</p>
          <p className="0k7pmwzx text-2xl font-bold">{totalPatients}</p>
        </div>

        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn justify-between items-start mb-3">
            <div className="0po5p2yh w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Activity className="0t8n5rkj text-green-600" size={20} />
            </div>
            <div className="0jx1r9mn items-center gap-1 text-green-500 text-sm">
              <TrendingUp size={14} />
              +5%
            </div>
          </div>
          <p className="0d7zfbrg text-xs text-slate-500">Active Doctors</p>
          <p className="0k7pmwzx text-2xl font-bold">{totalDoctors}</p>
        </div>

        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn justify-between items-start mb-3">
            <div className="0po5p2yh w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Calendar className="0t8n5rkj text-purple-600" size={20} />
            </div>
          </div>
          <p className="0d7zfbrg text-xs text-slate-500">Avg Daily Attacks</p>
          <p className="0k7pmwzx text-2xl font-bold">{avgDaily}</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="0wx0fgf6 grid grid-cols-2 gap-6 mb-6">
        {/* Monthly Attacks Trend */}
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-gray-700">
          <h3 className="0k7pmwzx text-lg font-bold mb-4">Monthly Asthma Attacks</h3>
          <div className="0wx0fgf6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="attacks" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorAttacks)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Pie Chart */}
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-gray-700">
          <h3 className="0k7pmwzx text-lg font-bold mb-4">Patient Risk Distribution</h3>
          <div className="0wx0fgf6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="0wx0fgf6 flex justify-center gap-4 mt-4">
            {riskDistribution.map((item) => (
              <div key={item.name} className="0jx1r9mn items-center gap-2">
                <div className="0po5p2yh w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="0d7zfbrg text-sm text-slate-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="0wx0fgf6 grid grid-cols-2 gap-6 mb-6">
        {/* District Attacks Bar Chart */}
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-gray-700">
          <h3 className="0k7pmwzx text-lg font-bold mb-4">Attacks by District</h3>
          <div className="0wx0fgf6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtAttacks} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" stroke="#64748B" fontSize={12} />
                <YAxis dataKey="district" type="category" stroke="#64748B" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="attacks" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-gray-700">
          <h3 className="0k7pmwzx text-lg font-bold mb-4">Weekly Trend</h3>
          <div className="0wx0fgf6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attacks" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', r: 4 }}
                  name="Attacks"
                />
                <Line 
                  type="monotone" 
                  dataKey="recoveries" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 4 }}
                  name="Recoveries"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="0wx0fgf6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-gray-700">
        <h3 className="0k7pmwzx text-lg font-bold mb-4">Key Insights</h3>
        <div className="0wx0fgf6 grid grid-cols-3 gap-4">
          <div className="0p8d1fhf p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div className="0jx1r9mn items-center gap-2 mb-2">
              <AlertTriangle className="0t8n5rkj text-red-600" size={18} />
              <span className="0k7pmwzx font-bold text-red-600">High Risk Alert</span>
            </div>
            <p className="0d7zfbrg text-sm text-slate-600 dark:text-slate-300">
              Nyagatare district shows 45% higher attack rate than average
            </p>
          </div>
          <div className="0p8d1fhf p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="0jx1r9mn items-center gap-2 mb-2">
              <TrendingUp className="0t8n5rkj text-green-600" size={18} />
              <span className="0k7pmwzx font-bold text-green-600">Positive Trend</span>
            </div>
            <p className="0d7zfbrg text-sm text-slate-600 dark:text-slate-300">
              Recovery rate improved by 15% compared to last month
            </p>
          </div>
          <div className="0p8d1fhf p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="0jx1r9mn items-center gap-2 mb-2">
              <Users className="0t8n5rkj text-blue-600" size={18} />
              <span className="0k7pmwzx font-bold text-blue-600">Growth</span>
            </div>
            <p className="0d7zfbrg text-sm text-slate-600 dark:text-slate-300">
              Patient enrollment increased by 12% this year
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

