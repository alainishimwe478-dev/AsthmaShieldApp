export default function PatientsPage() {
  const patients = [
    { id: 1, name: "Jean Paul", age: 34, district: "Nyagatare", status: "Critical" },
    { id: 2, name: "Alice M.", age: 28, district: "Kigali", status: "At Risk" },
    { id: 3, name: "Eric S.", age: 45, district: "Rubavu", status: "Stable" }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Patients List</h2>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Age</th>
              <th className="p-4 text-left">District</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-4 font-semibold">{p.name}</td>
                <td className="p-4">{p.age}</td>
                <td className="p-4">{p.district}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-lg ${
                    p.status === "Critical" ? "bg-red-50 text-red-600" :
                    p.status === "At Risk" ? "bg-orange-50 text-orange-600" :
                    "bg-emerald-50 text-emerald-600"
                  }`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
