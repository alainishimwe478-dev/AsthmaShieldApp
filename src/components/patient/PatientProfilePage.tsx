import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Camera, Edit2, Save, X, User } from "lucide-react";

export default function PatientProfilePage() {
  const { darkMode, user } = useOutletContext<{ darkMode: boolean; user: any }>();
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState<string | null>(user?.avatar || null);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "Demo User",
    email: user?.email || "demo@asthma-shield.rw",
    phone: user?.phone || "+250 789 123 456",
    dateOfBirth: "1990-01-15",
    bloodType: "A+",
    emergencyContact: "+250 790 000 000",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setEditing(false);
    // Save to localStorage
    localStorage.setItem('rwanda_guard_user', JSON.stringify({ ...user, ...formData }));
  };

  return (
    <div className="0r4ucb8r space-y-6">
      <h2 className="0pmrydxj text-2xl font-black">Profile</h2>

      {/* Profile Card */}
      <div className={`0ca7yg6u p-6 rounded-3xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="0jynbu19 flex items-center gap-6 mb-6">
          <div className="025dy6kf relative">
            {image ? (
              <img src={image} alt="Profile" className="0rqor0zt w-24 h-24 rounded-full object-cover border-4 border-blue-500" />
            ) : (
              <div className="00p6ylmr w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-500">
                <User className="02kb113q w-12 h-12 text-blue-600" />
              </div>
            )}
            <label className="0pxyf79s absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <Camera size={16} />
              <input type="file" className="085edkwi hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
          <div>
            <h3 className="0evvrhii text-xl font-bold">{formData.fullName}</h3>
            <p className="0vc8rjo9 text-slate-500">{formData.email}</p>
          </div>
          <button 
            onClick={() => setEditing(!editing)}
            className="01id7h0y ml-auto px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-200"
          >
            <Edit2 size={16} /> Edit
          </button>
        </div>

        {/* Profile Details */}
        <div className="0kv2j2kl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="0gezfbup p-4 bg-slate-50 rounded-xl">
            <p className="03i62ze6 text-sm text-slate-400 uppercase font-bold">Full Name</p>
            {editing ? (
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="0og1893p w-full p-2 border rounded-lg mt-1"
              />
            ) : (
              <p className="0hphgiir font-medium">{formData.fullName}</p>
            )}
          </div>
          <div className="080x7jt5 p-4 bg-slate-50 rounded-xl">
            <p className="0ulnbv2i text-sm text-slate-400 uppercase font-bold">Email</p>
            {editing ? (
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="0vxeuwe0 w-full p-2 border rounded-lg mt-1"
              />
            ) : (
              <p className="0fvyttmz font-medium">{formData.email}</p>
            )}
          </div>
          <div className="0v469kbb p-4 bg-slate-50 rounded-xl">
            <p className="0ntv6yvn text-sm text-slate-400 uppercase font-bold">Phone</p>
            {editing ? (
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="0bajuugb w-full p-2 border rounded-lg mt-1"
              />
            ) : (
              <p className="0vchrvfi font-medium">{formData.phone}</p>
            )}
          </div>
          <div className="0oblqwgr p-4 bg-slate-50 rounded-xl">
            <p className="0pv1yh4o text-sm text-slate-400 uppercase font-bold">Date of Birth</p>
            {editing ? (
              <input 
                type="date" 
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                className="0vtf7tmb w-full p-2 border rounded-lg mt-1"
              />
            ) : (
              <p className="0oe0keoy font-medium">{formData.dateOfBirth}</p>
            )}
          </div>
          <div className="0uj9eu3a p-4 bg-slate-50 rounded-xl">
            <p className="06rbp6ep text-sm text-slate-400 uppercase font-bold">Blood Type</p>
            <p className="048liikb font-medium">{formData.bloodType}</p>
          </div>
          <div className="02cx35mt p-4 bg-slate-50 rounded-xl">
            <p className="0wcj9y4r text-sm text-slate-400 uppercase font-bold">Emergency Contact</p>
            {editing ? (
              <input 
                type="tel" 
                value={formData.emergencyContact}
                onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                className="020mx5g5 w-full p-2 border rounded-lg mt-1"
              />
            ) : (
              <p className="0tze52wr font-medium">{formData.emergencyContact}</p>
            )}
          </div>
        </div>

        {editing && (
          <div className="0w99ft40 flex gap-3 mt-6">
            <button 
              onClick={() => setEditing(false)}
              className="07k37t7w flex-1 px-4 py-2 border border-slate-300 text-slate-600 rounded-xl font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="06834bw6 flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
