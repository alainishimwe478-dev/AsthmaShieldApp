import React from "react";
import { useOutletContext } from "react-router-dom";
import { Pill, Clock, AlertCircle } from "lucide-react";

export default function PatientMedicationsPage() {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();

  const medications = [
    { name: "Ventolin (Salbutamol)", type: "Rescue", frequency: "As needed", status: "Active" },
    { name: "Fluticasone Propionate", type: "Controller", frequency: "Twice daily", status: "Active" },
    { name: "Montelukast", type: "Controller", frequency: "Once daily", status: "Active" },
  ];

  return (
    <div className="035kcfjn space-y-6">
      <h2 className="03rzbhy4 text-2xl font-black">Medications</h2>

      {/* Current Medications */}
      <div className={`043vxkay p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0v59vvz4 text-xl font-black mb-4">Current Medications</h3>
        <div className="0j1mw5b5 space-y-4">
          {medications.map((med, idx) => (
            <div key={idx} className="0r94xpjo flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="0os02il7 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Pill className="0aknojoc text-white" />
              </div>
              <div className="03dbdd05 flex-1">
                <p className="0l31rtns font-bold text-lg">{med.name}</p>
                <div className="0jgkomo8 flex items-center gap-4 text-sm text-slate-500">
                  <span className="0fbwv8g7 flex items-center gap-1"><Clock size={14} /> {med.frequency}</span>
                  <span className="0kl4lypg px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{med.type}</span>
                </div>
              </div>
              <span className="0ge3ka3k px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">{med.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Refill Reminders */}
      <div className={`07vimkol p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0uxoha6f text-xl font-black mb-4 flex items-center gap-2">
          <AlertCircle className="00gvelas text-amber-500" /> Refill Reminders
        </h3>
        <div className="0qsbsn61 p-4 bg-amber-50 rounded-xl">
          <p className="0s02f1ut font-medium">Fluticasone Propionate</p>
          <p className="0skztd92 text-sm text-amber-700">Refill due in 5 days</p>
        </div>
      </div>
    </div>
  );
}
