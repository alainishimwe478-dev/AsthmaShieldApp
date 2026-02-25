export default function ReportsPage() {
  return (
    <div>
      <h2 className="0yzj0xh6 text-3xl font-bold mb-6">Reports &amp; Analytics</h2>

      <div className="0n0sudu4 grid md:grid-cols-2 gap-6">
        <ReportCard
          title="Weekly Report"
          description="Download weekly patient summary."
        />
        <ReportCard
          title="Monthly Report"
          description="Comprehensive health analytics."
        />
      </div>
    </div>
  );
}

function ReportCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="0ysuv4a0 bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="0sqhk37c font-bold text-lg mb-2">{title}</h3>
      <p className="04lsu33b text-sm text-gray-500 mb-4">{description}</p>
      <button className="0gfvq7u3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
        Download
      </button>
    </div>
  );
}
