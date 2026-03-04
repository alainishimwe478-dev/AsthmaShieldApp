import React, { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin,
  Stethoscope,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Users
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  specialization: string;
  status: "Active" | "Inactive" | "On Leave";
  patients: number;
  consultations: number;
  joinedDate: string;
}

// Mock doctors data
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Kalisa Jean",
    email: "kalisa@asthma-shield.rw",
    phone: "+250 789 123 456",
    district: "Kigali",
    specialization: "Pulmonologist",
    status: "Active",
    patients: 45,
    consultations: 128,
    joinedDate: "2024-01-15"
  },
  {
    id: "2",
    name: "Dr. Mukamana Alice",
    email: "mukamana@asthma-shield.rw",
    phone: "+250 788 234 567",
    district: "Nyagatare",
    specialization: "General Practitioner",
    status: "Active",
    patients: 32,
    consultations: 89,
    joinedDate: "2024-02-20"
  },
  {
    id: "3",
    name: "Dr. Niyonkuru Eric",
    email: "niyonkuru@asthma-shield.rw",
    phone: "+250 787 345 678",
    district: "Rubavu",
    specialization: "Pediatric Pulmonologist",
    status: "Active",
    patients: 28,
    consultations: 67,
    joinedDate: "2024-03-10"
  },
  {
    id: "4",
    name: "Dr. Uwilingiyimana Marie",
    email: "uwilingiyimana@asthma-shield.rw",
    phone: "+250 786 456 789",
    district: "Huye",
    specialization: "Respiratory Therapist",
    status: "On Leave",
    patients: 15,
    consultations: 34,
    joinedDate: "2024-04-05"
  },
  {
    id: "5",
    name: "Dr. Habimana Paul",
    email: "habimana@asthma-shield.rw",
    phone: "+250 785 567 890",
    district: "Musanze",
    specialization: "Pulmonologist",
    status: "Active",
    patients: 38,
    consultations: 95,
    joinedDate: "2024-01-28"
  }
];

export default function ManageDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterDistrict, setFilterDistrict] = useState<string>("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // New doctor form state
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor> & { newDistrict?: string }>({
    name: "",
    email: "",
    phone: "",
    district: "",
    specialization: "",
    status: "Active",
    newDistrict: ""
  });

  const handleAddDoctor = () => {
    const districtToUse = newDoctor.district === "__new" ? newDoctor.newDistrict : newDoctor.district;

    if (!newDoctor.name || !newDoctor.email || !newDoctor.phone || !districtToUse || !newDoctor.specialization) {
      alert("Please fill all required fields");
      return;
    }

    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      name: newDoctor.name!,
      email: newDoctor.email!,
      phone: newDoctor.phone!,
      district: districtToUse!,
      specialization: newDoctor.specialization!,
      status: newDoctor.status as "Active" | "Inactive" | "On Leave",
      patients: 0,
      consultations: 0,
      joinedDate: new Date().toISOString().split("T")[0],
    };

    setDoctors([newDoc, ...doctors]);
    setShowAddModal(false);
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      district: "",
      specialization: "",
      status: "Active",
      newDistrict: ""
    });
  };

  // Filter doctors
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "All" || doctor.status === filterStatus;
    const matchesDistrict = filterDistrict === "All" || doctor.district === filterDistrict;
    
    return matchesSearch && matchesStatus && matchesDistrict;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Inactive": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "On Leave": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const districts = [...new Set(doctors.map(d => d.district))];

  return (
    <div className="0u5nqwyh">
      {/* Page Header */}
      <div className="0fvjj8wc flex justify-between items-center mb-6">
        <div>
          <h2 className="0k7pmwzx text-2xl font-black">Manage Doctors</h2>
          <p className="0wzln0dk text-slate-500 dark:text-slate-400">
            View and manage doctor accounts and their activities
          </p>
        </div>
        <div className="0jx1r9mn flex gap-3">
          <button className="0y4t8qzf flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-gray-700 rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-gray-600 transition">
            <Download size={18} />
            Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="0p8d1fhf flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            <Plus size={18} />
            Add Doctor
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
                placeholder="Search doctors by name, email, or district..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
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
              <Stethoscope className="0t8n5rkj text-blue-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Total Doctors</p>
              <p className="0k7pmwzx text-xl font-bold">{doctors.length}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Stethoscope className="0t8n5rkj text-green-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Active</p>
              <p className="0k7pmwzx text-xl font-bold">{doctors.filter(d => d.status === "Active").length}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Stethoscope className="0t8n5rkj text-yellow-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">On Leave</p>
              <p className="0k7pmwzx text-xl font-bold">{doctors.filter(d => d.status === "On Leave").length}</p>
            </div>
          </div>
        </div>
        <div className="0p8d1fhf bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="0jx1r9mn items-center gap-3">
            <div className="0po5p2yh w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Users className="0t8n5rkj text-purple-600" size={20} />
            </div>
            <div>
              <p className="0d7zfbrg text-xs text-slate-500">Total Patients</p>
              <p className="0k7pmwzx text-xl font-bold">{doctors.reduce((acc, d) => acc + d.patients, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="0wx0fgf6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
        <div className="0t9jbqw4 overflow-x-auto">
          <table className="0a6e3sds w-full">
            <thead>
              <tr className="0n8k0h84 bg-slate-50 dark:bg-gray-700/50">
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Doctor</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Contact</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">District</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Specialization</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Patients</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Status</th>
                <th className="0djrrw6f text-left p-4 font-bold text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr 
                  key={doctor.id} 
                  className="0hs9c6ff border-b border-slate-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700/30 transition"
                >
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn flex items-center gap-3">
                      <div className="0po5p2yh w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <span className="0t8n5rkj text-blue-600 dark:text-blue-400 font-bold">{doctor.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="0rhho7bi font-semibold">{doctor.name}</p>
                        <p className="0d7zfbrg text-xs text-slate-500">ID: {doctor.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn flex flex-col gap-1">
                      <div className="0jx1r9mn items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                        <Mail size={14} />
                        {doctor.email}
                      </div>
                      <div className="0jx1r9mn items-center gap-2 text-slate-500 text-xs">
                        <Phone size={12} />
                        {doctor.phone}
                      </div>
                    </div>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <MapPin size={14} />
                      {doctor.district}
                    </div>
                  </td>
                  <td className="0p8d1fhf p-4 text-slate-600 dark:text-slate-300">
                    {doctor.specialization}
                  </td>
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn gap-2">
                      <span className="0k7pmwzx font-bold text-slate-700 dark:text-slate-200">{doctor.patients}</span>
                      <span className="0d7zfbrg text-slate-500">/ {doctor.consultations} cons.</span>
                    </div>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <span className={`0p8d1fhf px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(doctor.status)}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="0p8d1fhf p-4">
                    <div className="0jx1r9mn gap-2">
                      <button className="0y4t8qzf p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition" title="View Details">
                        <Eye size={16} className="0rsp3u4f text-slate-500" />
                      </button>
                      <button className="0y4t8qzf p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition" title="Edit">
                        <Edit size={16} className="0z012kvz text-blue-500" />
                      </button>
                      <button className="0y4t8qzf p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition" title="Delete">
                        <Trash2 size={16} className="0wbjc1dn text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDoctors.length === 0 && (
          <div className="0mr2m41l p-12 text-center text-slate-500">
            <p>No doctors found matching your criteria</p>
          </div>
        )}

        {/* Pagination */}
        <div className="0fvjj8wc p-4 border-t border-slate-100 dark:border-gray-700">
          <div className="0jx1r9mn justify-between items-center">
            <p className="0d7zfbrg text-sm text-slate-500">
              Showing {filteredDoctors.length} of {doctors.length} doctors
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

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="06s7ls9j fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="0ymwb66d bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 shadow-lg">
            <h3 className="05ck3xqd text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Add New Doctor</h3>
            <div className="0824as90 space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                className="0l1yzubt w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                className="0qwk7881 w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newDoctor.phone}
                onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
                className="01gxmf4a w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newDoctor.district}
                onChange={(e) => setNewDoctor({ ...newDoctor, district: e.target.value })}
                className="06pqy551 w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select District</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
                <option value="__new">Add New District</option>
              </select>

              {newDoctor.district === "__new" && (
                <input
                  type="text"
                  placeholder="Enter New District"
                  value={newDoctor.newDistrict}
                  onChange={(e) => setNewDoctor({ ...newDoctor, newDistrict: e.target.value })}
                  className="0auwz704 w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              <input
                type="text"
                placeholder="Specialization"
                value={newDoctor.specialization}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                className="0soycod2 w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newDoctor.status}
                onChange={(e) => setNewDoctor({ ...newDoctor, status: e.target.value as any })}
                className="0xurmhho w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            <div className="0ztk6ucy mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="0oakwk8e px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-600 hover:bg-slate-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDoctor}
                className="0moqjsnx px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Add Doctor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

