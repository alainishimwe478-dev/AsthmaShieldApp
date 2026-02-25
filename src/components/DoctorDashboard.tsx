
import React, { useState, useEffect } from "react";
import { 
  Users, Activity, Bell, Search, Filter, 
  MapPin, Wind, ArrowUpRight, MessageSquare, 
  Calendar, FileText, Settings, LogOut, AlertCircle,
  Moon, Sun, ChevronRight, LayoutDashboard, Stethoscope
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { NavLink, useLocation } from "react-router-dom";
import ConsultationPage from "./ConsultationPage";
import PatientDetailModal from "./PatientDetailModal";

// Mock Data
const patientTrends = [
  { time: "8am", risk: 20 }, { time: "10am", risk: 45 }, { time: "12pm", risk: 80 },
  { time: "2pm", risk: 60 }, { time: "4pm", risk: 30 }, { time: "6pm", risk: 55 }
];

// Mock patient data for the list
const mockPatients = [
  { id: "1", name: "Jean Paul", age: 34, status: "Critical", district: "Nyagatare", lastLog: "12 min ago" },
  { id: "2", name: "Alice M.", age: 28, status: "At Risk", district: "Kigali", lastLog: "45 min ago" },
  { id: "3", name: "Eric S.", age: 45, status: "Stable", district: "Rubavu", lastLog: "2 hours ago" },
  { id: "4", name: "Marie C.", age: 22, status: "At Risk", district: "Huye", lastLog: "3 hours ago" },
  { id: "5", name: "Paul K.", age: 51, status: "Stable", district: "Musanze", lastLog: "5 hours ago" },
];

interface DoctorDashboardProps {
  onClose?: () => void;
  onNavigate?: (tab: string) => void;
}

export default function DoctorDashboard({ onClose, onNavigate }: DoctorDashboardProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Sync activeTab with current URL
  useEffect(() => {
    if (location.pathname.includes("/doctor/patients")) {
      setActiveTab("patients");
    } else if (location.pathname.includes("/doctor/alerts")) {
      setActiveTab("alerts");
    } else if (location.pathname.includes("/doctor/consultations")) {
      setActiveTab("chat");
    } else if (location.pathname.includes("/doctor/reports")) {
      setActiveTab("reports");
    } else {
      setActiveTab("overview");
    }
  }, [location]);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handlePatientClick = (patient: any) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className={`0uh09477 flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-slate-50'} font-sans transition-colors duration-300`}>
      
      {/* ================= SIDEBAR ================= */}
      <aside className={`0zxi3hfd w-72 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} border-r flex flex-col transition-colors duration-300`}>
        <div className="0ad3zl1c p-8 flex items-center gap-2">
          <div className="0etwb5ds bg-blue-600 p-2 rounded-lg">
            <Activity className="0k9pzv6p text-white w-6 h-6" />
          </div>
          <h1 className={`0xuzgp71 text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>Dr. Panel</h1>
        </div>

        {/* Define nav link styles */}
        {(() => {
          const baseClass = "flex items-center gap-3 p-3 rounded-xl transition-all duration-300";
          const activeClass = "bg-blue-600 text-white shadow-lg scale-105";
          const inactiveClass = "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700";
          
          return (
            <nav className="0r72d54f flex-1 px-4 space-y-1">
              {/* Overview - uses "end" prop to match exactly "/" */}
              <NavLink
                to="/doctor/overview"
                end
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <LayoutDashboard size={20} />
                Overview
              </NavLink>

              {/* Patients List */}
              <NavLink
                to="/doctor/patients"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <Users size={20} />
                Patients List
              </NavLink>

              {/* Risk Alerts */}
              <NavLink
                to="/doctor/alerts"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <Bell size={20} />
                Risk Alerts
                <span className="0d9x87d0 ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  4
                </span>

              </NavLink>

              {/* Consultations */}
              <NavLink
                to="/doctor/consultations"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <Stethoscope size={20} />
                Consultations
              </NavLink>

              {/* Reports */}
              <NavLink
                to="/doctor/reports"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <FileText size={20} />
                Reports
              </NavLink>
            </nav>
          );
        })()}
        {/* Dark Mode Toggle */}
        <div className="065w0xb5 px-4 mb-4">
          <button 
            onClick={toggleDarkMode}
            className={`086z68i6 w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <div className="014cobvl flex items-center gap-3 font-bold">
              {darkMode ? <Sun className="0ebstftz w-5 h-5" /> : <Moon className="0g003k58 w-5 h-5" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </div>
            <ChevronRight className="092bwm2l w-4 h-4 opacity-50" />
          </button>
        </div>

        <div className="0rwltkb4 p-6 border-t border-slate-100 dark:border-gray-700">
          <NavItem icon={<Settings />} label="Settings" darkMode={darkMode} />
          <NavItem icon={<LogOut />} label="Logout" color="text-red-500" darkMode={darkMode} />
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className={`0s159xzf flex-1 overflow-y-auto p-10 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
        
        {/* Header */}
        <header className="0ipg6ksa flex justify-between items-center mb-10">
          <div>
            <h2 className={`088e89j5 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>Welcome Back, Dr. Kalisa</h2>
            <p className={darkMode ? '0zdrc1k3 text-gray-400' : 'text-slate-500'}>Monitoring 1,240 patients across Rwanda.</p>
          </div>
          <div className="0oful6kd flex gap-4">
            <div className="0p8m11kz relative">
              <Search className="09gcmm0u absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search patients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className={`0lwj1m57 pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-slate-200'
                }`}
              />
            </div>
            <button className={`0wl22xhv p-2 rounded-xl shadow-sm relative ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-slate-200'}`}>
              <Bell className="0mgmzx01 w-5 h-5 text-slate-600" />
              <span className="0dh1k5fb absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="0tjcj1eb grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="Critical Risk" value="12" color="bg-red-50 text-red-600" icon={<AlertCircle />} darkMode={darkMode} />
          <StatCard label="High Pollen Area" value="Nyagatare" color="bg-orange-50 text-orange-600" icon={<MapPin />} darkMode={darkMode} />
          <StatCard label="Total Inhaler Usage" value="+24%" color="bg-blue-50 text-blue-600" icon={<Activity />} darkMode={darkMode} />
          <StatCard label="Avg. AQI" value="48" color="bg-emerald-50 text-emerald-600" icon={<Wind />} darkMode={darkMode} />
        </div>

        <div className="0yalc9v1 grid lg:grid-cols-3 gap-8">
          
          {/* Main Chart */}
          <section className={`0jxxjwxp lg:col-span-2 p-8 rounded-3xl border shadow-sm transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'
          }`}>
            <div className="0acnuoq0 flex justify-between items-center mb-6">
              <h3 className={`0qafpkaa font-bold text-xl ${darkMode ? 'text-white' : ''}`}>Attack Frequency Trends</h3>
              <div className="0gyj3bvl flex gap-2">
                <button className="0sbg5eie px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-600 border border-blue-100">Today</button>
                <button className={`0xkf88u8 px-3 py-1 text-xs font-bold rounded-lg ${darkMode ? 'text-gray-400' : 'text-slate-400'}`}>Weekly</button>
              </div>
            </div>
            <div className="0o1porg4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientTrends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#374151" : "#f1f5f9"} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: darkMode ? '#9CA3AF' : '#94a3b8', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="risk" stroke="#2563eb" strokeWidth={4} dot={{ r: 6, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Urgent Attention Feed */}
          <section className={`0eir1rhk p-8 rounded-3xl border shadow-sm transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'
          }`}>
            <h3 className={`0fpi656t font-bold text-xl mb-6 ${darkMode ? 'text-white' : ''}`}>Recent Alerts</h3>
            <div className="0pffaplp space-y-6">
              <AlertItem name="Jean Paul" district="Nyagatare" time="12 min ago" type="Attack Reported" darkMode={darkMode} />
              <AlertItem name="Alice M." district="Kigali" time="45 min ago" type="High AQI Exposure" darkMode={darkMode} />
              <AlertItem name="Eric S." district="Rubavu" time="2 hours ago" type="Low Medication" darkMode={darkMode} />
            </div>
            <button className={`0zpnpavl w-full mt-8 py-3 rounded-2xl border-2 font-bold transition ${
              darkMode ? 'border-gray-700 text-gray-400 hover:bg-gray-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'
            }`}>
              View All Alerts
            </button>
          </section>

        </div>

        {/* Overview Content - Shows when activeTab is "overview" */}
        {activeTab === "overview" && (
          <section className={`0k5idia0 mt-8 p-8 rounded-3xl border shadow-sm transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'
          }`}>
            <h3 className={`0iizvrcc font-bold text-xl mb-6 ${darkMode ? 'text-white' : ''}`}>Dashboard Overview</h3>
            <p className={darkMode ? '0ts0znff text-gray-400' : 'text-slate-500'}>
              Select a category from the sidebar to view detailed information.
            </p>
          </section>
        )}

        {/* Patients List Section */}
        {activeTab === "patients" && (
          <section className={`0k5idia0 mt-8 p-8 rounded-3xl border shadow-sm transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'
          }`}>
            <div className="0s57qaqs flex justify-between items-center mb-6">
              <h3 className={`0iizvrcc font-bold text-xl ${darkMode ? 'text-white' : ''}`}>All Patients</h3>
              <div className="0c996seb flex gap-2">
                <button className={`0kszip9n px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1 ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Filter className="09d93ehy w-3 h-3" /> Filter
                </button>
              </div>
            </div>
            <div className="08rmda9u overflow-x-auto">
              <table className="0dz2vj9c w-full">
                <thead>
                  <tr className={`0i5a4j3p border-b ${darkMode ? 'border-gray-700' : 'border-slate-100'}`}>
                    <th className={`0esyv0ln text-left py-4 px-4 font-bold text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Patient Name</th>
                    <th className={`0szqiws7 text-left py-4 px-4 font-bold text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Age</th>
                    <th className={`0w2rybgb text-left py-4 px-4 font-bold text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>District</th>
                    <th className={`0lz1g249 text-left py-4 px-4 font-bold text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Status</th>
                    <th className={`0zkgbgyg text-left py-4 px-4 font-bold text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Last Log</th>
                    <th className={`0zkt2hzb text-left py-4 px-4 font-bold text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPatients.map((patient) => (
                    <tr key={patient.id} className={`0ms70ku3 border-b hover:bg-slate-50 dark:hover:bg-gray-700 ${
                      darkMode ? 'border-gray-700' : 'border-slate-50'
                    }`}>
                      <td className={`09s5ujac py-4 px-4 font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{patient.name}</td>
                      <td className={`0y1ifvee py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>{patient.age}</td>
                      <td className={`04gljr9a py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>{patient.district}</td>
                      <td className="0wqcpz9o py-4 px-4">
                        <span className={`0sc8wq5j px-2 py-1 text-xs font-bold rounded-lg ${
                          patient.status === "Critical" ? "bg-red-50 text-red-600" :
                          patient.status === "At Risk" ? "bg-orange-50 text-orange-600" :
                          "bg-emerald-50 text-emerald-600"
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className={`0gr2o98j py-4 px-4 text-sm ${darkMode ? 'text-gray-500' : 'text-slate-500'}`}>{patient.lastLog}</td>
                      <td className="0o889fer py-4 px-4">
                        <button 
                          onClick={() => handlePatientClick(patient)}
                          className="0ps5x3uv text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
                        >
                          <ArrowUpRight className="0wmn54bu w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Risk Alerts Section */}
        {activeTab === "alerts" && (
          <section className={`0o9f1c45 mt-8 p-8 rounded-3xl border shadow-sm transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'
          }`}>
            <h3 className={`0t85y0fx font-bold text-xl mb-6 ${darkMode ? 'text-white' : ''}`}>All Risk Alerts</h3>
            <div className="0mz60jm5 space-y-4">
              <AlertItem name="Jean Paul" district="Nyagatare" time="12 min ago" type="Attack Reported" darkMode={darkMode} />
              <AlertItem name="Alice M." district="Kigali" time="45 min ago" type="High AQI Exposure" darkMode={darkMode} />
              <AlertItem name="Eric S." district="Rubavu" time="2 hours ago" type="Low Medication" darkMode={darkMode} />
              <AlertItem name="Marie C." district="Huye" time="3 hours ago" type="Irregular Peak Flow" darkMode={darkMode} />
              <AlertItem name="Paul K." district="Musanze" time="5 hours ago" type="Missed Medication" darkMode={darkMode} />
            </div>
          </section>
        )}

        {/* Consultations Section */}
        {activeTab === "chat" && (
          <ConsultationPage />
        )}

        {/* Reports Section */}
        {activeTab === "reports" && (
          <section className={`04h3o97j mt-8 p-8 rounded-3xl border shadow-sm transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'
          }`}>
            <h3 className={`0ngbo87a font-bold text-xl mb-6 ${darkMode ? 'text-white' : ''}`}>Reports & Analytics</h3>
            <div className="07wee13l grid md:grid-cols-2 gap-6">
              <div className={`09tyiohu p-6 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-slate-50'}`}>
                <Calendar className="0uskep8x w-8 h-8 text-blue-600 mb-4" />
                <h4 className={`0z3shw92 font-bold text-lg mb-2 ${darkMode ? 'text-white' : ''}`}>Weekly Summary</h4>
                <p className={`0ok2r5aj text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Download weekly patient summary reports.</p>
                <button className="0zcstri7 mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg">
                  Download
                </button>
              </div>
              <div className={`0c8asz3a p-6 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-slate-50'}`}>
                <FileText className="0qca2lga w-8 h-8 text-blue-600 mb-4" />
                <h4 className={`0tlbzgrw font-bold text-lg mb-2 ${darkMode ? 'text-white' : ''}`}>Monthly Report</h4>
                <p className={`07b6ziii text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Comprehensive monthly health analytics.</p>
                <button className="0v17zhad mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg">
                  Download
                </button>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Patient Detail Modal */}
      <PatientDetailModal 
        patient={selectedPatient} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

// Sub-components for cleaner code
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
  color?: string;
  darkMode?: boolean;
}

function NavItem({ icon, label, active = false, badge, onClick, color = "text-slate-600", darkMode = false }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`007gxd6e w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
        active 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1' 
          : `hover:bg-blue-50 dark:hover:bg-gray-700 ${darkMode ? 'text-gray-200' : color}`
      }`}
    >
      <div className="08bj8c2x flex items-center gap-3 font-bold">
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
        {label}
      </div>
      {badge && (
        <span className={`0aznmnbg px-2 py-0.5 rounded-lg text-xs font-black animate-pulse ${
          active ? 'bg-white text-blue-600' : 'bg-red-500 text-white'
        }`}>
          {badge}
        </span>
      )}
      {active && <ChevronRight className="02xfr0cs w-4 h-4 text-blue-200" />}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  color: string;
  icon: React.ReactNode;
  darkMode?: boolean;
}

function StatCard({ label, value, color, icon, darkMode = false }: StatCardProps) {
  return (
    <div className={`03a1u0md p-6 rounded-3xl border shadow-sm hover:shadow-md transition ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'
    }`}>
      <div className={`07zkzo0m ${color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </div>
      <p className={`012clc3h font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{label}</p>
      <p className={`06acvxeu text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>{value}</p>
    </div>
  );
}

interface AlertItemProps {
  name: string;
  district: string;
  time: string;
  type: string;
  darkMode?: boolean;
}

function AlertItem({ name, district, time, type, darkMode = false }: AlertItemProps) {
  return (
    <div className={`087tgn28 flex gap-4 items-start border-b pb-4 last:border-0 ${
      darkMode ? 'border-gray-700' : 'border-slate-50'
    }`}>
      <div className={`0wifd216 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold ${
        darkMode ? 'bg-gray-700 text-gray-400' : 'bg-slate-100 text-slate-400'
      }`}>
        {name[0]}
      </div>
      <div className="0m6tzlpo flex-1">
        <div className="0jefz3hs flex justify-between">
          <p className={`08puvhdz font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{name}</p>
          <span className={`0i4byrmy text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>{time}</span>
        </div>
        <p className={`01jsvl7s text-xs font-medium mb-1 ${darkMode ? 'text-gray-500' : 'text-slate-500'}`}>{district}</p>
        <span className="02zwtqle text-[10px] px-2 py-0.5 bg-red-50 text-red-600 font-black rounded-md">{type}</span>
      </div>
      <button className="0n1xyeqm text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition">
        <ArrowUpRight className="0xjfc5h7 w-4 h-4" />
      </button>
    </div>
  );
}
