import { useState, useEffect } from "react";

interface Consultation {
  id: number;
  patientName: string;
  date: string;
  time: string;
  status: string;
}

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    // Fake API call, replace with real API
    setConsultations([
      { id: 1, patientName: "John Doe", date: "2026-03-05", time: "10:00 AM", status: "Pending" },
      { id: 2, patientName: "Jane Smith", date: "2026-03-06", time: "2:00 PM", status: "Pending" },
    ]);
  }, []);

  const handleAccept = (id: number) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Accepted" } : c))
    );
  };

  const handleDecline = (id: number) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Declined" } : c))
    );
  };

  return (
    <div className="00xef1xz min-h-screen bg-gray-100 p-6">

      <div className="0dl0xkre bg-white shadow rounded-lg p-6">
        <h1 className="0j9jhl4c text-2xl font-bold mb-6">Admin Consultations</h1>

        <div className="00kp1fgw overflow-x-auto">
          <table className="02b4a4hu min-w-full border border-gray-200">

            <thead className="0cvpbpj1 bg-gray-200">
              <tr>
                <th className="0vxqz4jc p-3 text-left">Patient</th>
                <th className="0fsbepa9 p-3 text-left">Date</th>
                <th className="0tfwggbp p-3 text-left">Time</th>
                <th className="0kan6at8 p-3 text-left">Status</th>
                <th className="0yp08kru p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {consultations.map((c) => (
                <tr key={c.id} className="07hfuvoa border-t">

                  <td className="08e9g1qg p-3">{c.patientName}</td>
                  <td className="02ep1d7c p-3">{c.date}</td>
                  <td className="0i04mux3 p-3">{c.time}</td>
                  <td className="0kffgvd6 p-3">{c.status}</td>

                  <td className="0av6jk56 p-3 space-x-2">
                    <button
                      onClick={() => handleAccept(c.id)}
                      className="0mudg7ug bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleDecline(c.id)}
                      className="084dhts3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Decline
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

