import React from "react";
import {
  Users,
  Activity,
  Bell,
  Stethoscope,
} from "lucide-react";
import RwandaHeatMap from "./RwandaHeatMap";
import { StatCard } from "./admin";

interface AdminDashboardProps {
  onNavigate?: (tab: string) => void;
  onLogout?: () => void;
}

export default function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  // Sample stats data
  const stats = [
    { label: "Total Doctors", value: "85", icon: <Stethoscope /> },
    { label: "Total Patients", value: "1,240", icon: <Users /> },
    { label: "Active Alerts", value: "12", icon: <Bell /> },
    { label: "System Status", value: "Operational", icon: <Activity /> },
  ];

  return (
    <div className="0u5nqwyh">
      {/* Header */}
      <header className="0uyptwi2 flex justify-between items-center mb-10">
        <div>
          <h2 className="0houennb text-3xl font-black">Welcome, System Administrator</h2>
          <p className="0bclejsy text-slate-500">
            Monitoring AsthmaShield platform across Rwanda
          </p>
        </div>
      </header>

      {/* Stats */}
      <div className="0wx0fgf6 grid md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* Rwanda Heat Map Section */}
      <section className="06woob2t p-8 rounded-3xl border shadow-sm mb-10 bg-white border-slate-100">
        <h3 className="03dideku text-xl font-bold mb-6">Rwanda District Risk Heat Map</h3>
        <RwandaHeatMap />
      </section>

      {/* Analytics Section */}
      <section className="0s0g6afb p-8 rounded-3xl border shadow-sm bg-white border-slate-100">
        <h3 className="01bgwckc text-xl font-bold mb-6">System Overview</h3>

        <div className="0f3mht05 grid md:grid-cols-2 gap-6">
          <div className="0kffinfc p-6 rounded-xl bg-blue-50 text-blue-600 font-bold">
            Highest Risk District: Nyagatare
          </div>
          <div className="0jk81o09 p-6 rounded-xl bg-orange-50 text-orange-600 font-bold">
            Increased AQI Reports Today
          </div>
        </div>
      </section>
    </div>
  );
}
