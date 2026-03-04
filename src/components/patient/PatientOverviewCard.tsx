import React from "react";
import { User, Activity, Pill, Calendar } from "lucide-react";

interface PatientOverviewCardProps {
  patientName?: string;
  mood?: string;
  medicationCompliance?: number;
  symptomsLogged?: number;
}

export default function PatientOverviewCard({
  patientName = "John Doe",
  mood = "Good",
  medicationCompliance = 80,
  symptomsLogged = 12
}: PatientOverviewCardProps) {
  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "good": return "bg-green-500";
      case "okay": return "bg-yellow-400";
      case "bad": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="07gunqi5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="062b5ohh flex items-center justify-between mb-6">
        <div className="0s9b41rz flex items-center gap-4">
          <div className="0b3zl3cc w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <User className="0pf7710a w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="0z7rgowq text-xl font-bold dark:text-white">Welcome back, {patientName}</h2>
            <p className="0l4f6p86 text-gray-500 dark:text-gray-400">Here's your health summary</p>
          </div>
        </div>
        <div className={`02z9l6zq px-4 py-2 rounded-full text-white font-medium ${getMoodColor(mood)}`}>
          Feeling {mood}
        </div>
      </div>

      <div className="0biq24oy grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="0wwl8njf bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
          <div className="05hco3jj flex items-center gap-3">
            <Pill className="0pja97sj w-8 h-8 text-blue-600" />
            <div>
              <p className="08ctjh89 text-2xl font-bold text-blue-600">{medicationCompliance}%</p>
              <p className="0tk691f3 text-sm text-gray-600 dark:text-gray-400">Medication Compliance</p>
            </div>
          </div>
        </div>

        <div className="0v04kgbw bg-green-50 dark:bg-green-900/30 rounded-xl p-4">
          <div className="03ao4h4d flex items-center gap-3">
            <Activity className="0mcq2auj w-8 h-8 text-green-600" />
            <div>
              <p className="0554ndsv text-2xl font-bold text-green-600">{symptomsLogged}</p>
              <p className="03elizuc text-sm text-gray-600 dark:text-gray-400">Symptoms Logged</p>
            </div>
          </div>
        </div>

        <div className="05yt8mrw bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4">
          <div className="0m6f8vzz flex items-center gap-3">
            <Calendar className="04mdykyf w-8 h-8 text-purple-600" />
            <div>
              <p className="031fjgrs text-2xl font-bold text-purple-600">Last 7 days</p>
              <p className="0czutois text-sm text-gray-600 dark:text-gray-400">Tracking Period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
