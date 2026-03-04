import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Search,
  Eye,
  Printer,
  Mail,
  Clock,
  BarChart3,
  Users,
  AlertTriangle,
  Activity
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  type: "Monthly" | "Weekly" | "Quarterly" | "Annual";
  date: string;
  size: string;
  downloads: number;
  status: "Ready" | "Processing";
}

const mockReports: Report[] = [
  { id: "1", title: "February 2026 System Report", type: "Monthly", date: "2026-03-01", size: "2.4 MB", downloads: 45, status: "Ready" },
  { id: "2", title: "January 2026 System Report", type: "Monthly", date: "2026-02-01", size: "2.2 MB", downloads: 38, status: "Ready" },
  { id: "3", title: "Q4 2025 Analytics Report", type: "Quarterly", date: "2026-01-15", size: "5.8 MB", downloads: 62, status: "Ready" },
  { id: "4", title: "December 2025 System Report", type: "Monthly", date: "2026-01-01", size: "2.1 MB", downloads: 35, status: "Ready" },
  { id: "5", title: "November 2025 System Report", type: "Monthly", date: "2025-12-01", size: "2.0 MB", downloads: 28, status: "Ready" },
  { id: "6", title: "2025 Annual Report", type: "Annual", date: "2025-12-31", size: "12.5 MB", downloads: 156, status: "Ready" },
];

export default function ReportsPage() {
  const [reports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [dateRange, setDateRange] = useState("all");

  // Modal states
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    type: "Monthly",
    startDate: "",
    endDate: "",
    format: "PDF",
    description: ""
  });

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || report.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalDownloads = reports.reduce((acc, r) => acc + r.downloads, 0);
  const readyReports = reports.filter(r => r.status === "Ready").length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Monthly": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Weekly": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Quarterly": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Annual": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="0u5nqwyh">
      {/* Page Header */}
      <div className="0fvjj8wc flex justify-between items-center mb-6">
        <div>
          <h2 className="0k7pmwzx text-2xl font-black">Reports</h2>
          <p className="0wzln0dk text-slate-500 dark:text-slate-400">
            Generate and download system reports and analytics
          </p>
        </div>
        <button 
          onClick={() => setShowGenerateModal(true)}
          className="0p8d1fhf flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          <FileText size={18} />
          Generate New Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="0wx0fgf6 grid grid-cols-4 gap-4 mb-6">
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FileText className="0t8n5rkj text-blue-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Total Reports</p>
              <p className="0k7pmwzx text-xl font-bold">{reports.length}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Download className="0t8n5rkj text-green-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Total Downloads</p>
              <p className="0k7pmwzx text-xl font-bold">{totalDownloads}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="0t8n5rkj text-purple-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Ready Reports</p>
              <p className="0k7pmwzx text-xl font-bold">{readyReports}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Calendar className="0t8n5rkj text-orange-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">This Month</p>
              <p className="0k7pmwzx text-xl font-bold">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="0wx0fgf6 bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-sm border border-slate-200 dark:border-gray-700">
        <div className="0jx1r9mn flex gap-4">
          {/* Search */}
          <div className="0po5p2yh flex-1">
            <div className="0hcs684e relative">
              <Search className="0etm2yqq absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="02fyxw1g w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="0jx1r9mn">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="0lpoiwqe px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="All">All Types</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annual">Annual</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="0jx1r9mn">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="0lpoiwqe px-4 py-2.5 bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="0wx0fgf6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
        <div className="0t9jbqw4 overflow-x-auto">
          <table className="0a6e3sds w-full">
            <thead>
              <tr className="0n8k0h84 bg-slate-50 dark:bg-gray-700/50">
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Report Title</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Type</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Date</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Size</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Downloads</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Status</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr 
                  key={report.id} 
                  className="0hs9c6ff border-b border-slate-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700/30 transition"
                >
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn flex items-center gap-3">
                      <div className="0po5p2yh w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                        <FileText className="0t8n5rkj text-red-600" size={18} />
                      </div>
                      <div>
                        <p className="0rhho7bi font-semibold">{report.title}</p>
                        <p className="0d7zfbrg text-xs text-slate-500">ID: {report.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <span className={`0p8d1fhf px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Calendar size={14} />
                      {report.date}
                    </div>
                  </td>
                  <td className="0p8d1fhf p-4 text-slate-600 dark:text-slate-300">
                    {report.size}
                  </td>
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn items-center gap-2">
                      <Download size={14} className="01hyn4my text-slate-400" />
                      <span className="0q8qtxsv text-slate-600 dark:text-slate-300">{report.downloads}</span>
                    </div>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <span className={`0p8d1fhf px-3 py-1 rounded-full text-xs font-bold ${
                      report.status === "Ready" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn gap-2">
                      <button className="0y4t8qzf p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition" title="View">
                        <Eye size={16} className="0r5wyorn text-slate-500" />
                      </button>
                      <button className="0y4t8qzf p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition" title="Download">
                        <Download size={16} className="01x4qziv text-blue-500" />
                      </button>
                      <button className="0y4t8qzf p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition" title="Print">
                        <Printer size={16} className="02cmuch3 text-purple-500" />
                      </button>
                      <button className="0y4t8qzf p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition" title="Email">
                        <Mail size={16} className="0dxdpjj6 text-orange-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="0mr2m41l p-12 text-center text-slate-500">
            <p>No reports found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Report Generation Options */}
      <div className="0wx0fgf6 mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-gray-700">
        <h3 className="0k7pmwzx text-lg font-bold mb-4">Quick Report Generation</h3>
        <div className="0wx0fgf6 grid grid-cols-4 gap-4">
          <button className="0p8d1fhf p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition text-left">
            <div className="0jx1r9mn items-center gap-2 mb-2">
              <Activity className="0t8n5rkj text-blue-600" size={18} />
              <span className="0k7pmwzx font-semibold text-blue-600">Daily Summary</span>
            </div>
            <p className="0d7zfbrg text-xs text-slate-500">Generate today's activity report</p>
          </button>
          <button className="0p8d1fhf p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition text-left">
            <div className="0jx1r9mn items-center gap-2 mb-2">
              <Users className="0t8n5rkj text-green-600" size={18} />
              <span className="0k7pmwzx font-semibold text-green-600">Patient Report</span>
            </div>
            <p className="0d7zfbrg text-xs text-slate-500">Patient statistics and trends</p>
          </button>
          <button className="0p8d1fhf p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition text-left">
            <div className="0jx1r9mn items-center gap-2 mb-2">
              <AlertTriangle className="0t8n5rkj text-orange-600" size={18} />
              <span className="0k7pmwzx font-semibold text-orange-600">Alert Summary</span>
            </div>
            <p className="0d7zfbrg text-xs text-slate-500">System alerts and incidents</p>
          </button>
          <button className="0p8d1fhf p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition text-left">
            <div className="0jx1r9mn items-center gap-2 mb-2">
              <BarChart3 className="0t8n5rkj text-purple-600" size={18} />
              <span className="0k7pmwzx font-semibold text-purple-600">Analytics</span>
            </div>
            <p className="0d7zfbrg text-xs text-slate-500">Comprehensive analytics</p>
          </button>
        </div>
      </div>

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="0q937dlp fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="0vq4y7he bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h3 className="0fcezmjp text-xl font-bold mb-4">Generate New Report</h3>
            <div className="0z9tkt7n space-y-4">
              {/* Title */}
              <div>
                <label className="0jk0wafp text-sm font-medium">Report Title</label>
                <input
                  type="text"
                  value={newReport.title}
                  onChange={(e) =>
                    setNewReport({ ...newReport, title: e.target.value })
                  }
                  className="0dh5mkqp w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  placeholder="Enter report title"
                />
              </div>

              {/* Report Type */}
              <div>
                <label className="0de8gvef text-sm font-medium">Report Type</label>
                <select
                  value={newReport.type}
                  onChange={(e) =>
                    setNewReport({ ...newReport, type: e.target.value })
                  }
                  className="0gr44oms w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Annual</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="0jwzpgdi grid grid-cols-2 gap-3">
                <div>
                  <label className="0bjrgoga text-sm font-medium">Start Date</label>
                  <input
                    type="date"
                    value={newReport.startDate}
                    onChange={(e) =>
                      setNewReport({ ...newReport, startDate: e.target.value })
                    }
                    className="0xmqwj9y w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="0as0efbq text-sm font-medium">End Date</label>
                  <input
                    type="date"
                    value={newReport.endDate}
                    onChange={(e) =>
                      setNewReport({ ...newReport, endDate: e.target.value })
                    }
                    className="01nobeif w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              </div>

              {/* Format */}
              <div>
                <label className="070oquxa text-sm font-medium">Report Format</label>
                <select
                  value={newReport.format}
                  onChange={(e) =>
                    setNewReport({ ...newReport, format: e.target.value })
                  }
                  className="0wj2ls9w w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="0muawucz text-sm font-medium">Description</label>
                <textarea
                  value={newReport.description}
                  onChange={(e) =>
                    setNewReport({ ...newReport, description: e.target.value })
                  }
                  rows={3}
                  className="0fu35j70 w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  placeholder="Enter report description"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="080embi8 flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="0vjq3nn5 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              >
                Cancel
              </button>

              <button
                className="0zacejjr px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => {
                  alert("Report generation started!");
                  setShowGenerateModal(false);
                }}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
