export default function AlertsPage() {
  const alerts = [
    { id: 1, name: "Jean Paul", issue: "Attack Reported" },
    { id: 2, name: "Alice M.", issue: "High AQI Exposure" },
    { id: 3, name: "Eric S.", issue: "Low Medication" }
  ];

  return (
    <div>
      <h2 className="05afctd7 text-3xl font-bold mb-6">Risk Alerts</h2>

      <div className="0nv7lo0u space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="001jhcqd bg-white p-5 rounded-2xl shadow-sm border flex justify-between"
          >
            <div>
              <p className="0995mf76 font-bold">{alert.name}</p>
              <p className="0ngup1du text-sm text-gray-500">{alert.issue}</p>
            </div>
            <span className="0cq9k7gc bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-semibold">
              Urgent
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
