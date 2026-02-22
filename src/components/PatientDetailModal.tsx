import React from "react";
import { 
  X, Clock, Zap, Wind, AlertCircle, 
  Activity, Thermometer, Droplets, 
  FileText, Download, ChevronRight
} from "lucide-react";

// Extended patient type with additional details for the modal
interface PatientDetail {
  id: string;
  name: string;
  age: number;
  status: "Stable" | "At Risk" | "Critical";
  district: string;
  lastLog: string;
  peakFlow?: number;
  inhalerPuffs?: number;
  avgTemperature?: number;
  logs?: ActivityLog[];
}

interface ActivityLog {
  id: string;
  type: "attack" | "medication" | "aqi" | "peakflow";
  title: string;
  subtitle: string;
  time: string;
  icon: "zap" | "clock" | "wind" | "activity";
}

interface PatientDetailModalProps {
  patient: PatientDetail | null;
  onClose: () => void;
}

export default function PatientDetailModal({ patient, onClose }: PatientDetailModalProps) {
  if (!patient) return null;

  // Mock activity logs based on patient type
  const activityLogs: ActivityLog[] = [
    {
      id: "1",
      type: "attack",
      title: "Emergency Attack Detected",
      subtitle: "Rescue inhaler used 2x within 15 mins",
      time: "Feb 22, 11:20 AM",
      icon: "zap"
    },
    {
      id: "2",
      type: "medication",
      title: "Daily Medication Taken",
      subtitle: "Controller inhaler dose logged",
      time: "Feb 22, 07:00 AM",
      icon: "clock"
    },
    {
      id: "3",
      type: "aqi",
      title: "High Pollution Exposure",
      subtitle: "AQI exceeded 120 for 3 hours",
      time: "Feb 21, 04:30 PM",
      icon: "wind"
    },
    {
      id: "4",
      type: "peakflow",
      title: "Peak Flow Recorded",
      subtitle: "420 L/min - Below baseline",
      time: "Feb 21, 08:00 AM",
      icon: "activity"
    }
  ];

  return (
    <div 
      className="0pn4yjcv fixed inset-0 z-[100] flex items-center justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Slide-out Panel */}
      <div 
        className="09rwdapd h-full w-full max-w-2xl bg-white shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="0fkrqakb sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-slate-100 p-8 flex justify-between items-start">
          <div className="0h8xaipm flex gap-4 items-center">
            <div className="0rewp5yp w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-2xl font-black">
              {patient.name[0]}
            </div>
            <div>
              <h2 className="0scvx6om text-2xl font-black text-slate-800">{patient.name}</h2>
              <p className="0dznotl0 text-slate-500 font-medium">ID: {patient.id} • {patient.district}, Rwanda</p>
              <span className={`0j17w9b7 inline-block mt-1 px-2 py-1 text-xs font-bold rounded-lg ${
                patient.status === "Critical" ? "bg-red-50 text-red-600" :
                patient.status === "At Risk" ? "bg-orange-50 text-orange-600" :
                "bg-emerald-50 text-emerald-600"
              }`}>
                {patient.status}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="0tcjep9g p-2 hover:bg-slate-100 rounded-full transition"
          >
            <X className="07vlj1hf text-slate-400" size={24} />
          </button>
        </div>

        <div className="0pm2hboe p-8 space-y-8">
          {/* Quick Stats Grid */}
          <div className="00toh2nm grid grid-cols-3 gap-4">
            <div className="033kt4z5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="0z3xujd6 text-[10px] font-black uppercase text-slate-400 mb-1">Peak Flow</p>
              <p className="0w9lcyoc text-lg font-bold text-blue-600">{patient.peakFlow || 420} L/min</p>
            </div>
            <div className="0vvtwgjf bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="0eqqowik text-[10px] font-black uppercase text-slate-400 mb-1">Inhaler Left</p>
              <p className="05ioqt88 text-lg font-bold text-orange-600">{patient.inhalerPuffs || 45} Puffs</p>
            </div>
            <div className="0krjvvao bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="02g1wqki text-[10px] font-black uppercase text-slate-400 mb-1">Avg. Temp</p>
              <p className="0b9jwvhf text-lg font-bold text-slate-800">{patient.avgTemperature || 24}°C</p>
            </div>
          </div>

          {/* Historical Logs */}
          <section>
            <h3 className="09r2e8ug text-lg font-black mb-4 flex justify-between items-center">
              Recent Activity Log
              <button className="0s5hjd2w text-blue-600 text-xs flex items-center gap-1 font-bold hover:text-blue-700 transition">
                <Download size={14} /> Export Data
              </button>
            </h3>
            <div className="08mduhde space-y-3">
              {activityLogs.map((log) => (
                <LogItem 
                  key={log.id}
                  icon={getIcon(log.icon)}
                  title={log.title} 
                  subtitle={log.subtitle} 
                  time={log.time} 
                />
              ))}
            </div>
          </section>

          {/* Environmental Exposure Timeline */}
          <section>
            <h3 className="07xd9zph text-lg font-black mb-4 flex justify-between items-center">
              AQI Exposure History
              <span className="0xkw6zjp text-xs font-medium text-slate-400">Last 7 days</span>
            </h3>
            <div className="0uw6md1h bg-gradient-to-r from-emerald-50 via-yellow-50 to-red-50 p-4 rounded-2xl border border-slate-100">
              <div className="0o6xsorn flex justify-between items-end h-24 gap-2">
                <AQIBar day="Mon" value={45} />
                <AQIBar day="Tue" value={65} />
                <AQIBar day="Wed" value={85} />
                <AQIBar day="Thu" value={125} high />
                <AQIBar day="Fri" value={95} />
                <AQIBar day="Sat" value={55} />
                <AQIBar day="Sun" value={48} />
              </div>
              <div className="0lmj50j5 flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                <span>Good</span>
                <span>Moderate</span>
                <span>Unhealthy</span>
              </div>
            </div>
          </section>

          {/* Peak Flow Trend */}
          <section>
            <h3 className="00un2xdm text-lg font-black mb-4 flex justify-between items-center">
              Peak Flow Trend
              <span className="0hky67da text-xs font-medium text-slate-400">Last 7 readings</span>
            </h3>
            <div className="0ubkni4b bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="0kooqsse flex items-end justify-between h-20 gap-3">
                <PeakFlowBar value={380} />
                <PeakFlowBar value={420} />
                <PeakFlowBar value={350} low />
                <PeakFlowBar value={400} />
                <PeakFlowBar value={380} />
                <PeakFlowBar value={420} />
                <PeakFlowBar value={410} />
              </div>
              <div className="0a76tcht flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                <span>Feb 16</span>
                <span>Feb 22</span>
              </div>
            </div>
            <p className="0ewway0c text-xs text-slate-500 mt-2 text-center">
              Baseline: 450 L/min | Current trend: <span className="0vym79k6 text-orange-600 font-bold">Declining</span>
            </p>
          </section>

          {/* Medical Notes */}
          <section className="08ka8f9s bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
            <h3 className="0cdxxasn font-black text-blue-900 mb-2 flex items-center gap-2">
              <FileText size={18} />
              Doctor's Private Notes
            </h3>
            <textarea 
              className="0y6s3la4 w-full bg-transparent border-none outline-none text-sm text-blue-800 placeholder:text-blue-300 min-h-[100px]"
              placeholder="Add observations about the patient's recovery here..."
            />
          </section>

          <button className="0lb173m6 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition shadow-xl flex items-center justify-center gap-2">
            Update Medical Plan
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to get icon based on type
function getIcon(type: string) {
  switch (type) {
    case "zap":
      return <Zap className="09v79osf text-red-500" size={16}/>;
    case "clock":
      return <Clock className="08akue02 text-blue-500" size={16}/>;
    case "wind":
      return <Wind className="0aeuhuu4 text-orange-500" size={16}/>;
    case "activity":
      return <Activity className="0q5o7t4c text-purple-500" size={16}/>;
    default:
      return <Clock className="0ffbyfdp text-slate-500" size={16}/>;
  }
}

// Log Item Component
function LogItem({ icon, title, subtitle, time }: { icon: React.ReactNode; title: string; subtitle: string; time: string }) {
  return (
    <div className="0zsx88mf flex gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition cursor-pointer">
      <div className="0p850s11 w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
        {icon}
      </div>
      <div className="0beouj25 flex-1">
        <p className="0dzj48gi text-sm font-bold text-slate-800">{title}</p>
        <p className="0g1kpc5n text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="0d7bg4ig text-right">
        <p className="0va1cr7e text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{time}</p>
      </div>
    </div>
  );
}

// AQI Bar Component
function AQIBar({ day, value, high }: { day: string; value: number; high?: boolean }) {
  const height = Math.min((value / 150) * 100, 100);
  const color = value <= 50 ? "bg-emerald-500" : value <= 100 ? "bg-yellow-500" : "bg-red-500";
  
  return (
    <div className="0x0sy7qe flex flex-col items-center gap-1 flex-1">
      <div 
        className={`055v6hi0 w-full rounded-t-lg ${color} ${high ? 'animate-pulse' : ''}`}
        style={{ height: `${height}%` }}
      />
      <span className="0i8fc7ks text-[8px] font-bold text-slate-400">{day}</span>
    </div>
  );
}

// Peak Flow Bar Component
function PeakFlowBar({ value, low }: { value: number; low?: boolean }) {
  const height = (value / 500) * 100;
  const color = low ? "bg-orange-500" : "bg-blue-500";
  
  return (
    <div className="03rv3tgh flex flex-col items-center gap-1 flex-1">
      <div 
        className={`0lzk387g w-full rounded-t-lg ${color} ${low ? 'animate-pulse' : ''}`}
        style={{ height: `${height}%` }}
      />
      <span className="0lleb8qf text-[8px] font-bold text-slate-400">{value}</span>
    </div>
  );
}
