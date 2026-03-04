import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin,
  Users,
  Download,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  Activity,
  Calendar,
  X
} from "lucide-react";
import { jsPDF } from "jspdf";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  age: number;
  status: "Critical" | "At Risk" | "Stable";
  lastVisit: string;
  assignedDoctor: string;
  aqi: number;
}

// Mock patients data
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Jean Paul",
    email: "jean.paul@email.rw",
    phone: "+250 789 111 222",
    district: "Nyagatare",
    age: 34,
    status: "Critical",
    lastVisit: "2026-03-05",
    assignedDoctor: "Dr. Kalisa Jean",
    aqi: 160
  },
  {
    id: "2",
    name: "Alice Mukamana",
    email: "alice.m@email.rw",
    phone: "+250 788 222 333",
    district: "Kigali",
    age: 28,
    status: "Stable",
    lastVisit: "2026-03-04",
    assignedDoctor: "Dr. Mukamana Alice",
    aqi: 45
  },
  {
    id: "3",
    name: "Eric Niyonkuru",
    email: "eric.n@email.rw",
    phone: "+250 787 333 444",
    district: "Rubavu",
    age: 45,
    status: "Stable",
    lastVisit: "2026-03-03",
    assignedDoctor: "Dr. Niyonkuru Eric",
    aqi: 52
  },
  {
    id: "4",
    name: "Marie Uwilingiyimana",
    email: "marie.u@email.rw",
    phone: "+250 786 444 555",
    district: "Huye",
    age: 22,
    status: "At Risk",
    lastVisit: "2026-03-05",
    assignedDoctor: "Dr. Kalisa Jean",
    aqi: 95
  },
  {
    id: "5",
    name: "Paul Habimana",
    email: "paul.h@email.rw",
    phone: "+250 785 555 666",
    district: "Musanze",
    age: 51,
    status: "Stable",
    lastVisit: "2026-03-02",
    assignedDoctor: "Dr. Habimana Paul",
    aqi: 38
  },
  {
    id: "6",
    name: "Sarah Kwizera",
    email: "sarah.k@email.rw",
    phone: "+250 784 666 777",
    district: "Nyagatare",
    age: 29,
    status: "Critical",
    lastVisit: "2026-03-05",
    assignedDoctor: "Dr. Mukamana Alice",
    aqi: 175
  }
];

export default function ManagePatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterDistrict, setFilterDistrict] = useState<string>("All");

  // Report form modal states
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [reportType, setReportType] = useState<string>("daily");

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "All" || patient.status === filterStatus;
    const matchesDistrict = filterDistrict === "All" || patient.district === filterDistrict;
    
    return matchesSearch && matchesStatus && matchesDistrict;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "At Risk": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Stable": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getAqiColor = (aqi: number) => {
    if (aqi > 150) return "text-red-500";
    if (aqi > 100) return "text-orange-500";
    if (aqi > 50) return "text-yellow-500";
    return "text-green-500";
  };

  const districts = [...new Set(patients.map(p => p.district))];

  return (
    <div className="0u5nqwyh">
      {/* Page Header */}
      <div className="0fvjj8wc flex justify-between items-center mb-6">
        <div>
          <h2 className="0k7pmwzx text-2xl font-black">Manage Patients</h2>
          <p className="0wzln0dk text-slate-500 dark:text-slate-400">
            View and manage patient records across all districts
          </p>
        </div>
        <div className="0jx1r9mn flex gap-3">
          <button className="0y4t8qzf flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-gray-700 rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-gray-600 transition">
            <Download size={18} />
            Export
          </button>
          <button
            onClick={() => setShowReportForm(true)}
            className="0p8d1fhf flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition"
          >
            <Activity size={18} />
            Generate Report
          </button>
          <button className="0p8d1fhf flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            <Plus size={18} />
            Add Patient
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="0wx0fgf6 bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-sm border border-slate-200 dark:border-gray-700">
        <div className="0jx1r9mn flex flex-wrap gap-4">
          {/* Search */}
          <div className="0po5p2yh flex-1 min-w-[250px]">
            <div className="0hcs684e relative">
              <Search className="0etm2yqq absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search patients by name, email, or district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="02fyxw1g w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="0jx1r9mn">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="0lpoiwqe px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="All">All Status</option>
              <option value="Critical">Critical</option>
              <option value="At Risk">At Risk</option>
              <option value="Stable">Stable</option>
            </select>
          </div>

          {/* District Filter */}
          <div className="0jx1r9mn">
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="0lpoiwqe px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="All">All Districts</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="0wx0fgf6 grid grid-cols-4 gap-4 mb-6">
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Users className="0t8n5rkj text-blue-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Total Patients</p>
              <p className="0k7pmwzx text-xl font-bold">{patients.length}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="0t8n5rkj text-red-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Critical</p>
              <p className="0k7pmwzx text-xl font-bold">{patients.filter(p => p.status === "Critical").length}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Activity className="0t8n5rkj text-yellow-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">At Risk</p>
              <p className="0k7pmwzx text-xl font-bold">{patients.filter(p => p.status === "At Risk").length}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Users className="0t8n5rkj text-green-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Stable</p>
              <p className="0k7pmwzx text-xl font-bold">{patients.filter(p => p.status === "Stable").length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="0wx0fgf6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
        <div className="0t9jbqw4 overflow-x-auto">
          <table className="0a6e3sds w-full">
            <thead>
              <tr className="0n8k0h84 bg-slate-50 dark:bg-gray-700/50">
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Patient</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Contact</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">District</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Age</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">AQI</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Status</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Assigned Doctor</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr 
                  key={patient.id} 
                  className="0hs9c6ff border-b border-slate-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700/30 transition"
                >
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn flex items-center gap-3">
                      <div className="0po5p2yh w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <span className="0t8n5rkj text-purple-600 dark:text-purple-400 font-bold">{patient.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="0rhho7bi font-semibold">{patient.name}</p>
                        <p className="0d7zfbrg text-xs text-slate-500">ID: {patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn flex flex-col gap-1">
                      <div className="0jx1r9mn items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                        <Mail size={14} />
                        {patient.email}
                      </div>
                      <div className="0jx1r9mn items-center gap-2 text-slate-500 text-xs">
                        <Phone size={12} />
                        {patient.phone}
                      </div>
                    </div>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <MapPin size={14} />
                      {patient.district}
                    </div>
                  </td>
                  <td className="0p8d1fhf p-4 text-slate-600 dark:text-slate-300">
                    {patient.age}
                  </td>
                  <td className="0p8d1fhf p-4">
                    <span className={`0k7pmwzx font-bold ${getAqiColor(patient.aqi)}`}>
                      {patient.aqi}
                    </span>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <span className={`0p8d1fhf px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="0p8d1fhf p-4 text-slate-600 dark:text-slate-300 text-sm">
                    {patient.assignedDoctor}
                  </td>
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn gap-2">
                      <button className="0y4t8qzf p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition" title="View Details">
                        <Eye size={16} className="0wqprzhj text-slate-500" />
                      </button>
                      <button className="0y4t8qzf p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition" title="Edit">
                        <Edit size={16} className="0rum6z7e text-blue-500" />
                      </button>
                      <button className="0y4t8qzf p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition" title="Delete">
                        <Trash2 size={16} className="0ionovi8 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="0mr2m41l p-12 text-center text-slate-500">
            <p>No patients found matching your criteria</p>
          </div>
        )}

        {/* Pagination */}
        <div className="0fvjj8wc p-4 border-t border-slate-100 dark:border-gray-700">
          <div className="0jx1r9mn justify-between items-center">
            <p className="0d7zfbrg text-sm text-slate-500">
              Showing {filteredPatients.length} of {patients.length} patients
            </p>
            <div className="0jx1r9mn gap-2">
              <button className="0y4t8qzf px-3 py-1 bg-slate-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-gray-600 transition">
                Previous
              </button>
              <button className="0y4t8qzf px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
                1
              </button>
              <button className="0y4t8qzf px-3 py-1 bg-slate-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-gray-600 transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Report Modal */}
      {showReportForm && (
        <div className="0l6js0dx fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="0imibvcl bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg">
            <div className="08rridpe flex justify-between items-center mb-4">
              <h2 className="0k7pmwzx text-xl font-bold">Generate Patient Report</h2>
              <button 
                onClick={() => setShowReportForm(false)}
                className="0fj9rpwf p-1 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={20} className="0dylmca3 text-slate-500" />
              </button>
            </div>

            <p className="0svii0lc text-sm text-slate-500 mb-4">
              Select patients and report type to generate a PDF summary.
            </p>

            {/* Select Patients */}
            <div className="04y47iun mb-4">
              <label className="0bl47uqz block text-sm font-semibold mb-2">Select Patients</label>
              <select
                multiple
                value={selectedPatients}
                onChange={(e) =>
                  setSelectedPatients(Array.from(e.target.selectedOptions, option => option.value))
                }
                className="0bqybu3a w-full h-32 px-3 py-2 border border-slate-200 dark:border-gray-600 rounded-xl bg-slate-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.district})
                  </option>
                ))}
              </select>
              <p className="0f6mbu04 text-xs text-slate-500 mt-1">Hold Ctrl/Cmd to select multiple patients</p>
            </div>

            {/* Report Type */}
            <div className="0es51n76 mb-4">
              <label className="0010m3tz block text-sm font-semibold mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="01rkoprp w-full px-3 py-2 border border-slate-200 dark:border-gray-600 rounded-xl bg-slate-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily Summary</option>
                <option value="weekly">Weekly Summary</option>
                <option value="monthly">Monthly Summary</option>
              </select>
            </div>

            {/* Actions */}
            <div className="0bs4ewas flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowReportForm(false)}
                className="0rq3xt6c px-4 py-2 rounded-xl bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Generate PDF for selectedPatients
                  const selectedPatientsData = patients.filter(p => selectedPatients.includes(p.id));
                  
                  if (selectedPatientsData.length === 0) {
                    alert("Please select at least one patient");
                    return;
                  }

                  // Create PDF
                  const doc = new jsPDF();
                  
                  // Header
                  doc.setFontSize(20);
                  doc.setTextColor(40, 40, 40);
                  doc.text("AsthmaShield Patient Report", 20, 20);
                  
                  doc.setFontSize(12);
                  doc.setTextColor(100, 100, 100);
                  doc.text(`Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Summary`, 20, 30);
                  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 36);
                  doc.text(`Total Patients: ${selectedPatientsData.length}`, 20, 42);
                  
                  // Line
                  doc.setDrawColor(200, 200, 200);
                  doc.line(20, 48, 190, 48);
                  
                  // Patient Details
                  let yPos = 58;
                  selectedPatientsData.forEach((patient, index) => {
                    if (yPos > 250) {
                      doc.addPage();
                      yPos = 20;
                    }
                    
                    doc.setFontSize(14);
                    doc.setTextColor(40, 40, 40);
                    doc.text(`${index + 1}. ${patient.name}`, 20, yPos);
                    
                    doc.setFontSize(10);
                    doc.setTextColor(100, 100, 100);
                    yPos += 7;
                    doc.text(`ID: ${patient.id} | Age: ${patient.age} | Status: ${patient.status}`, 25, yPos);
                    yPos += 5;
                    doc.text(`District: ${patient.district} | AQI: ${patient.aqi}`, 25, yPos);
                    yPos += 5;
                    doc.text(`Email: ${patient.email}`, 25, yPos);
                    yPos += 5;
                    doc.text(`Phone: ${patient.phone}`, 25, yPos);
                    yPos += 5;
                    doc.text(`Assigned Doctor: ${patient.assignedDoctor}`, 25, yPos);
                    yPos += 5;
                    doc.text(`Last Visit: ${patient.lastVisit}`, 25, yPos);
                    yPos += 10;
                  });
                  
                  // Summary Statistics
                  const criticalCount = selectedPatientsData.filter(p => p.status === "Critical").length;
                  const atRiskCount = selectedPatientsData.filter(p => p.status === "At Risk").length;
                  const stableCount = selectedPatientsData.filter(p => p.status === "Stable").length;
                  const avgAqi = Math.round(selectedPatientsData.reduce((sum, p) => sum + p.aqi, 0) / selectedPatientsData.length);
                  
                  doc.addPage();
                  doc.setFontSize(16);
                  doc.setTextColor(40, 40, 40);
                  doc.text("Summary Statistics", 20, 20);
                  
                  doc.setFontSize(12);
                  doc.text(`Critical Patients: ${criticalCount}`, 20, 35);
                  doc.text(`At Risk Patients: ${atRiskCount}`, 20, 45);
                  doc.text(`Stable Patients: ${stableCount}`, 20, 55);
                  doc.text(`Average AQI: ${avgAqi}`, 20, 65);
                  
                  // Footer
                  doc.setFontSize(10);
                  doc.setTextColor(150, 150, 150);
                  doc.text("Generated by AsthmaShield Admin Portal", 20, 280);
                  
                  // Save PDF
                  doc.save(`patient-report-${reportType}-${new Date().toISOString().split('T')[0]}.pdf`);
                  
                  console.log("Generate report for:", selectedPatients);
                  setShowReportForm(false);
                  setSelectedPatients([]);
                }}
                className="0qtyd6d8 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

