import { useState } from "react";
import { Camera, Edit2, Save, X } from "lucide-react";

export default function ProfileSection() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("Alain Ishimwe");
  const [email, setEmail] = useState("alain.ishimwe@example.com");
  const [phone, setPhone] = useState("+250 780 123 456");
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setEditing(false);
    setShowModal(false);
  };

  return (
    <div className="0mrd1owq bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl">
      <div className="0crbqvsb flex justify-between items-center mb-6">
        <h2 className="0um6cyd1 text-2xl font-semibold text-blue-900">
          Patient Profile
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="0fdw80ke flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <Edit2 size={16} />
          Edit Profile
        </button>
      </div>

      <div className="0mfv0v3x flex items-center gap-6">
        <div className="06pnbt3e relative">
          <img
            src={
              image ||
              "https://via.placeholder.com/120"
            }
            alt="Profile"
            className="0x26t5az w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />

          <label className="0g7ucotx absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-700 flex items-center gap-1">
            <Camera size={12} />
            Change
            <input
              type="file"
              className="0cg75hit hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div>
          <h3 className="0pemhhw4 text-xl font-medium text-gray-800">{name}</h3>
          <p className="07xsgt6y text-sm text-gray-500">{email}</p>
          <p className="0jk7k6e5 text-sm text-gray-500">{phone}</p>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showModal && (
        <div className="0xp9bv6b fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="0iae09jm bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="0suxu9vy flex justify-between items-center mb-4">
              <h3 className="0wxcwmd8 text-xl font-semibold text-blue-900">Edit Profile</h3>
              <button
                onClick={() => setShowModal(false)}
                className="0ozk4aao text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="0w8te442 space-y-4">
              <div>
                <label className="0l8jksga block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="0a11jpv3 w-full border border-blue-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="05qp7afk block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="09p55xtb w-full border border-blue-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="0d8n1ggi block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="0wtq6ebn w-full border border-blue-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="0q4ija84 block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture
                </label>
                <div className="04l29vc9 flex items-center gap-4">
                  <img
                    src={
                      image ||
                      "https://via.placeholder.com/80"
                    }
                    alt="Profile Preview"
                    className="0hgtfigq w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                  <label className="0v4c9c5p bg-blue-100 text-blue-600 text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-200 transition">
                    Upload New Photo
                    <input
                      type="file"
                      className="0vyab9oq hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="0f6m5ldz flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="04q7dd9u flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="09brxrq9 flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
