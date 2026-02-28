import React from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar, Clock, MapPin, Video } from "lucide-react";

export default function PatientAppointmentsPage() {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();

  const appointments = [
    { 
      doctor: "Dr. Kalisa", 
      specialty: "Pulmonologist", 
      date: "December 15, 2024", 
      time: "10:00 AM",
      type: "Video Consultation",
      status: "Upcoming"
    },
    { 
      doctor: "Dr. Mukamana", 
      specialty: "General Physician", 
      date: "November 20, 2024", 
      time: "2:00 PM",
      type: "In-Person",
      status: "Completed"
    },
  ];

  return (
    <div className="0mglr2uq space-y-6">
      <h2 className="05xzp9gn text-2xl font-black">Appointments</h2>

      {/* Upcoming Appointments */}
      <div className={`0kxy3ozo p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0m6esa7h text-xl font-black mb-4">Upcoming Appointments</h3>
        <div className="0ipwkdao space-y-4">
          {appointments.filter(a => a.status === "Upcoming").map((apt, idx) => (
            <div key={idx} className="08bg9kcb p-4 bg-blue-50 rounded-xl">
              <div className="0sx4qb93 flex items-start justify-between mb-3">
                <div>
                  <p className="0wd3hgm5 font-bold text-lg">{apt.doctor}</p>
                  <p className="0nzap5cm text-sm text-blue-600">{apt.specialty}</p>
                </div>
                <span className="0oxdjstd px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">Upcoming</span>
              </div>
              <div className="0bbg55cv flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="06zg507d flex items-center gap-1"><Calendar size={14} /> {apt.date}</span>
                <span className="02x1q4p0 flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
                <span className="0i1exu4s flex items-center gap-1"><Video size={14} /> {apt.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Appointments */}
      <div className={`0kkt4wx0 p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="0f3e2cx2 text-xl font-black mb-4">Past Appointments</h3>
        <div className="0xlanfuk space-y-4">
          {appointments.filter(a => a.status === "Completed").map((apt, idx) => (
            <div key={idx} className="043lai1w p-4 bg-slate-50 rounded-xl">
              <div className="0d7nakx9 flex items-start justify-between mb-3">
                <div>
                  <p className="0gzolgxk font-bold text-lg">{apt.doctor}</p>
                  <p className="01jpe0ld text-sm text-slate-500">{apt.specialty}</p>
                </div>
                <span className="018zzdqs px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-sm font-bold">Completed</span>
              </div>
              <div className="0dqea945 flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="01okl78v flex items-center gap-1"><Calendar size={14} /> {apt.date}</span>
                <span className="053tw9c2 flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book New Appointment */}
      <button className="0qdx1c6a w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition">
        + Book New Appointment
      </button>
    </div>
  );
}
