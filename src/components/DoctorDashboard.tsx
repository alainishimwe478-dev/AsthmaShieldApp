import React, { useState } from "react";
import { 
  Users, Activity, Bell, Search, Filter, 
  MapPin, Wind, ArrowUpRight, MessageSquare, 
  Calendar, FileText, Settings, LogOut, AlertCircle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
}

export default function DoctorDashboard({ onClose }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const handlePatientClick = (patient: any) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="07ehi6du flex h-screen bg-slate-50 font-sans">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="0zhry17s w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="01pbvewq p-8 flex items-center gap-2">
          <div className="0a9af0pa bg-blue-600 p-2 rounded-lg">
            <Activity className="0t52gvtt text-white w-6 h-6" />
          </div>
          <h1 className="01mfkwpd text-xl font-black text-slate-800 tracking-tight">Dr. Panel</h1>
        </div>

        <nav className="0n7xu8s0 flex-1 px-4 space-y-1">
          <NavItem 
            icon={<Activity />} 
            label="Overview" 
            active={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")} 
          />
          <NavItem 
            icon={<Users />} 
            label="Patients List" 
            active={activeTab === "patients"} 
            onClick={() => setActiveTab("patients")} 
          />
          <NavItem 
            icon={<Bell />} 
            label="Risk Alerts" 
            badge="4" 
            active={activeTab === "alerts"} 
            onClick={() => setActiveTab("alerts")} 
          />
          <NavItem 
            icon={<MessageSquare />} 
            label="Consultations" 
            active={activeTab === "chat"} 
            onClick={() => setActiveTab("chat")} 
          />
          <NavItem 
            icon={<FileText />} 
            label="Reports" 
            active={activeTab === "reports"} 
            onClick={() => setActiveTab("reports")} 
          />
        </nav>

        <div className="027wiimr p-6 border-t border-slate-100">
          <NavItem icon={<Settings />} label="Settings" />
          <NavItem icon={<LogOut />} label="Logout" color="text-red-500" />
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="0tht77ag flex-1 overflow-y-auto p-10">
        
        {/* Header */}
        <header className="0ei0ed4x flex justify-between items-center mb-10">
          <div>
            <h2 className="0tv0o7n0 text-3xl font-black text-slate-800">Welcome Back, Dr. Kalisa</h2>
            <p className="0dm2gub2 text-slate-500">Monitoring 1,240 patients across Rwanda.</p>
          </div>
          <div className="0ua11x1s flex gap-4">
            <div className="0dfymh5g relative">
              <Search className="0tg247et absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search patients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="0al0tqu1 pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <button className="073qjla0 bg-white p-2 rounded-xl border border-slate-200 shadow-sm relative">
              <Bell className="0s1n0iy2 w-5 h-5 text-slate-600" />
              <span className="0bgqzsor absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="0nm5rv1o grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="Critical Risk" value="12" color="bg-red-50 text-red-600" icon={<AlertCircle />} />
          <StatCard label="High Pollen Area" value="Nyagatare" color="bg-orange-50 text-orange-600" icon={<MapPin />} />
          <StatCard label="Total Inhaler Usage" value="+24%" color="bg-blue-50 text-blue-600" icon={<Activity />} />
          <StatCard label="Avg. AQI" value="48" color="bg-emerald-50 text-emerald-600" icon={<Wind />} />
        </div>

        <div className="00wcpp8m grid lg:grid-cols-3 gap-8">
          
          {/* Main Chart */}
          <section className="0j5mtr4x lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="0nufxa2b flex justify-between items-center mb-6">
              <h3 className="0v4aa7mu font-bold text-xl">Attack Frequency Trends</h3>
              <div className="0lc14755 flex gap-2">
                <button className="0y33lfyi px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-600 border border-blue-100">Today</button>
                <button className="0n2i2yr0 px-3 py-1 text-xs font-bold rounded-lg text-slate-400">Weekly</button>
              </div>
            </div>
            <div className="0t4zin0l h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientTrends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="risk" stroke="#2563eb" strokeWidth={4} dot={{ r: 6, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Urgent Attention Feed */}
          <section className="0myw44j1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="07ilgjpv font-bold text-xl mb-6">Recent Alerts</h3>
            <div className="0b9u7z3e space-y-6">
              <AlertItem name="Jean Paul" district="Nyagatare" time="12 min ago" type="Attack Reported" />
              <AlertItem name="Alice M." district="Kigali" time="45 min ago" type="High AQI Exposure" />
              <AlertItem name="Eric S." district="Rubavu" time="2 hours ago" type="Low Medication" />
            </div>
            <button className="0j7ljcer w-full mt-8 py-3 rounded-2xl border-2 border-slate-100 font-bold text-slate-500 hover:bg-slate-50 transition">
              View All Alerts
            </button>
          </section>

        </div>

        {/* Patients List Section */}
        {activeTab === "patients" && (
          <section className="0pgkvbbt mt-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="0uuogs1q flex justify-between items-center mb-6">
              <h3 className="084yjeqp font-bold text-xl">All Patients</h3>
              <div className="0ny4rw37 flex gap-2">
                <button className="0aaw1oi0 px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 flex items-center gap-1">
                  <Filter className="0nmg4n1e w-3 h-3" /> Filter
                </button>
              </div>
            </div>
            <div className="0cy0x26o overflow-x-auto">
              <table className="0iuffe9e w-full">
                <thead>
                  <tr className="0d4qw1iu border-b border-slate-100">
                    <th className="0jxnjaea text-left py-4 px-4 font-bold text-slate-500 text-sm">Patient Name</th>
                    <th className="0809k9qb text-left py-4 px-4 font-bold text-slate-500 text-sm">Age</th>
                    <th className="0dwq6wd4 text-left py-4 px-4 font-bold text-slate-500 text-sm">District</th>
                    <th className="0yoean2e text-left py-4 px-4 font-bold text-slate-500 text-sm">Status</th>
                    <th className="0yixlcbc text-left py-4 px-4 font-bold text-slate-500 text-sm">Last Log</th>
                    <th className="08q5lqzb text-left py-4 px-4 font-bold text-slate-500 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPatients.map((patient) => (
                    <tr key={patient.id} className="0tccj7g5 border-b border-slate-50 hover:bg-slate-50">
                      <td className="0t5p3rkc py-4 px-4 font-bold text-slate-800">{patient.name}</td>
                      <td className="0pe5a8wk py-4 px-4 text-slate-600">{patient.age}</td>
                      <td className="0amc3rsc py-4 px-4 text-slate-600">{patient.district}</td>
                      <td className="0q678z2f py-4 px-4">
                        <span className={`0ad5qhni px-2 py-1 text-xs font-bold rounded-lg ${
                          patient.status === "Critical" ? "bg-red-50 text-red-600" :
                          patient.status === "At Risk" ? "bg-orange-50 text-orange-600" :
                          "bg-emerald-50 text-emerald-600"
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="0xh59xb1 py-4 px-4 text-slate-500 text-sm">{patient.lastLog}</td>
                      <td className="046rjia8 py-4 px-4">
                        <button 
                          onClick={() => handlePatientClick(patient)}
                          className="0tquji5w text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
                        >
                          <ArrowUpRight className="0k3j6u0n w-4 h-4" />
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
          <section className="0m791bxj mt-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="0xo9w01g font-bold text-xl mb-6">All Risk Alerts</h3>
            <div className="04830we2 space-y-4">
              <AlertItem name="Jean Paul" district="Nyagatare" time="12 min ago" type="Attack Reported" />
              <AlertItem name="Alice M." district="Kigali" time="45 min ago" type="High AQI Exposure" />
              <AlertItem name="Eric S." district="Rubavu" time="2 hours ago" type="Low Medication" />
              <AlertItem name="Marie C." district="Huye" time="3 hours ago" type="Irregular Peak Flow" />
              <AlertItem name="Paul K." district="Musanze" time="5 hours ago" type="Missed Medication" />
            </div>
          </section>
        )}

        {/* Consultations Section */}
        {activeTab === "chat" && (
          <ConsultationPage />
        )}

        {/* Reports Section */}
        {activeTab === "reports" && (
          <section className="0aitiha4 mt-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="0qvewppk font-bold text-xl mb-6">Reports & Analytics</h3>
            <div className="0nr4tjlj grid md:grid-cols-2 gap-6">
              <div className="0klcglz3 p-6 bg-slate-50 rounded-2xl">
                <Calendar className="04wsw6s4 w-8 h-8 text-blue-600 mb-4" />
                <h4 className="0tai1ikf font-bold text-lg mb-2">Weekly Summary</h4>
                <p className="0qzmkjdu text-slate-500 text-sm">Download weekly patient summary reports.</p>
                <button className="0pzbgbta mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg">
                  Download
                </button>
              </div>
              <div className="0fdb7mnq p-6 bg-slate-50 rounded-2xl">
                <FileText className="08k77d7d w-8 h-8 text-blue-600 mb-4" />
                <h4 className="0qvuqgwn font-bold text-lg mb-2">Monthly Report</h4>
                <p className="088trqcc text-slate-500 text-sm">Comprehensive monthly health analytics.</p>
                <button className="0bq5j3ck mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg">
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
}

function NavItem({ icon, label, active = false, badge, onClick, color = "text-slate-600" }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`083tg6db w-full flex items-center justify-between p-4 rounded-2xl transition group ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : `hover:bg-blue-50 ${color}`}`}
    >
      <div className="01ceoc3i flex items-center gap-3 font-bold">
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
        {label}
      </div>
      {badge && <span className={`03t3gizn px-2 py-0.5 rounded-lg text-xs font-black ${active ? 'bg-white text-blue-600' : 'bg-red-500 text-white'}`}>{badge}</span>}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  color: string;
  icon: React.ReactNode;
}

function StatCard({ label, value, color, icon }: StatCardProps) {
  return (
    <div className="0xpwczvf bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
      <div className={`0agugz7v ${color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </div>
      <p className="02rn1iiv text-slate-500 font-medium text-sm">{label}</p>
      <p className="0px1zcbr text-2xl font-black text-slate-800">{value}</p>
    </div>
  );
}

interface AlertItemProps {
  name: string;
  district: string;
  time: string;
  type: string;
}

function AlertItem({ name, district, time, type }: AlertItemProps) {
  return (
    <div className="0bljhx8d flex gap-4 items-start border-b border-slate-50 pb-4 last:border-0">
      <div className="03zcbs2j w-10 h-10 bg-slate-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-slate-400">
        {name[0]}
      </div>
      <div className="0djxdzat flex-1">
        <div className="02uzlt80 flex justify-between">
          <p className="06e4lpou font-bold text-slate-800">{name}</p>
          <span className="0vrrfrf4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{time}</span>
        </div>
        <p className="0v2mcpxv text-xs text-slate-500 font-medium mb-1">{district}</p>
        <span className="0135bfsg text-[10px] px-2 py-0.5 bg-red-50 text-red-600 font-black rounded-md">{type}</span>
      </div>
      <button className="0pqsqszp text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition">
        <ArrowUpRight className="0n1n7we3 w-4 h-4" />
      </button>
    </div>
  );
}
