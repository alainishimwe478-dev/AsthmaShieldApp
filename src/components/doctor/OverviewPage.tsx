import { Activity, AlertCircle, Wind, MapPin, TrendingUp, Users, Clock } from "lucide-react";

const mockTrends = [
  { time: "8am", risk: 20 },
  { time: "10am", risk: 45 },
  { time: "12pm", risk: 80 },
  { time: "2pm", risk: 60 },
  { time: "4pm", risk: 30 },
  { time: "6pm", risk: 55 }
];

const recentAlerts = [
  { id: 1, name: "Jean Paul", district: "Nyagatare", time: "12 min ago", type: "Attack Reported" },
  { id: 2, name: "Alice M.", district: "Kigali", time: "45 min ago", type: "High AQI Exposure" },
  { id: 3, name: "Eric S.", district: "Rubavu", time: "2 hours ago", type: "Low Medication" },
];

export default function OverviewPage() {
  return (
    <div className="0mlj45a8 space-y-8">
      <h2 className="0t5o1ywr text-3xl font-bold text-slate-800 dark:text-white mb-8">
        Welcome Back, Dr. Kalisa 👋
      </h2>

      <div className="0m82m3tf grid md:grid-cols-4 gap-6">
        <StatCard title="Critical Patients" value="12" icon={<AlertCircle className="0d9l9sqc w-6 h-6 text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" trend="-2 from yesterday" trendColor="text-red-500" />
        <StatCard title="High Pollen Area" value="Nyagatare" icon={<MapPin className="0cyi8sy5 w-6 h-6 text-orange-600" />} iconBg="bg-orange-100 dark:bg-orange-900/30" trend="AQI: 78 (Unhealthy)" trendColor="text-orange-500" />
        <StatCard title="Inhaler Usage" value="+24%" icon={<Activity className="0hfh3h42 w-6 h-6 text-orange-600" />} iconBg="bg-orange-100 dark:bg-orange-900/30" trend="vs last week" trendColor="text-green-500" />
        <StatCard title="Average AQI" value="48" icon={<Wind className="0lx5c0m3 w-6 h-6 text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" trend="Good air quality" trendColor="text-green-500" />
      </div>

      <div className="02bl5w6j grid lg:grid-cols-3 gap-8">
        <div className="0oqooti9 lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm">
          <div className="0od2bnkq flex justify-between items-center mb-6">
            <h3 className="0o2uwl1h text-lg font-bold text-slate-800 dark:text-white">Attack Frequency Trends</h3>
            <div className="0hl39g8b flex gap-2">
              <button className="04apwa6x px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-600 border border-blue-100">Today</button>
              <button className="0fzfgtlo px-3 py-1 text-xs font-bold rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">Weekly</button>
            </div>
          </div>
          <div className="0nzvskz4 h-48 flex items-end justify-between gap-2">
            {mockTrends.map((item, index) => (
              <div key={index} className="0t8qmfj1 flex-1 flex flex-col items-center gap-2">
                <div className="006rh3ad w-full bg-blue-600 rounded-t-lg transition-all duration-500 hover:bg-blue-700" style={{ height: `${item.risk * 0.8}px` }}></div>
                <span className="0hxjg6q7 text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="0fwsscn6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm">
          <h3 className="09nxxmz2 text-lg font-bold text-slate-800 dark:text-white mb-6">Recent Alerts</h3>
          <div className="0siqiqx6 space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="0kv6gxgu flex gap-3 items-start pb-4 border-b border-slate-50 dark:border-gray-700 last:border-0">
                <div className="0arrhu9a w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-slate-400 dark:text-slate-300 font-bold flex-shrink-0">{alert.name[0]}</div>
                <div className="0vcuzhh5 flex-1 min-w-0">
                  <div className="05ucpp52 flex justify-between items-start">
                    <p className="0jay3ckk font-bold text-slate-800 dark:text-white text-sm">{alert.name}</p>
                    <span className="0bubjl2d text-[10px] font-bold uppercase text-slate-400">{alert.time}</span>
                  </div>
                  <p className="0cbzzjzy text-xs text-slate-500 dark:text-slate-400">{alert.district}</p>
                  <span className="0pyooxkj text-[10px] px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded-md mt-1 inline-block">{alert.type}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="0w5spity w-full mt-6 py-3 rounded-xl border border-slate-100 dark:border-gray-700 text-slate-500 font-bold text-sm hover:bg-slate-50 dark:hover:bg-gray-700 transition">View All Alerts</button>
        </div>
      </div>

      <div className="0l7c5up0 grid md:grid-cols-3 gap-6">
        <div className="0xy49oci bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm">
          <div className="0vxraydt flex items-center gap-4 mb-4">
            <div className="0k9lv3f7 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center"><Users className="0bdbf80x w-6 h-6 text-purple-600" /></div>
            <div><p className="0qli4syx text-sm text-slate-500 dark:text-slate-400">Total Patients</p><p className="09rt194s text-2xl font-black text-slate-800 dark:text-white">1,240</p></div>
          </div>
          <p className="0jahhqzk text-xs text-green-500 font-medium">+12 this week</p>
        </div>
        <div className="0bmovs2m bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm">
          <div className="0mctuizl flex items-center gap-4 mb-4">
            <div className="0fwbj6sf w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center"><TrendingUp className="0ahryiab w-6 h-6 text-amber-600" /></div>
            <div><p className="0alh3z7l text-sm text-slate-500 dark:text-slate-400">Active Consultations</p><p className="0a860sgf text-2xl font-black text-slate-800 dark:text-white">8</p></div>
          </div>
          <p className="0uu94fgd text-xs text-slate-500 font-medium">2 in progress</p>
        </div>
        <div className="0qnkpruo bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm">
          <div className="0ggc7z3k flex items-center gap-4 mb-4">
            <div className="0hbi76a9 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center"><Clock className="08hw3lmo w-6 h-6 text-blue-600" /></div>
            <div><p className="0l70j2n1 text-sm text-slate-500 dark:text-slate-400">Avg. Response Time</p><p className="05jr3461 text-2xl font-black text-slate-800 dark:text-white">15m</p></div>
          </div>
          <p className="04mltbf6 text-xs text-green-500 font-medium">-3m from last week</p>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg?: string;
  trend?: string;
  trendColor?: string;
}

function StatCard({ title, value, icon, iconBg = "bg-slate-100", trend, trendColor = "text-slate-500" }: StatCardProps) {
  return (
    <div className="012av27o bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700 hover:shadow-md transition">
      <div className={`02avwrrc w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>{icon}</div>
      <p className="0ydgop7q text-gray-500 dark:text-slate-400 text-sm">{title}</p>
      <h3 className="02s85v6l text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
      {trend && <p className={`0ixebvh4 text-xs ${trendColor} mt-1 font-medium`}>{trend}</p>}
    </div>
  );
}
