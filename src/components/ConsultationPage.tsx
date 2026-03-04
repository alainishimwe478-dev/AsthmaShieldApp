import React, { useState, useEffect } from "react";
import {
  Send,
  Phone,
  Video,
  Info,
  CheckCheck,
  MapPin,
  Wind,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

import {
  fetchConsultations,
  acceptConsultation,
  Consultation,
} from "../services/api";

export default function ConsultationPage() {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<string>("");
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState<string | null>(null);

  useEffect(() => {
    loadConsultations();
  }, []);

  const loadConsultations = async () => {
    setLoading(true);
    try {
      const data = await fetchConsultations();
      setConsultations(data);

      if (data.length > 0) {
        const pending = data.find((c) => c.status === "pending");
        setSelectedChat(pending ? pending.id : data[0].id);
      }
    } catch (error) {
      console.error("Failed to load consultations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptConsultation = async (id: string) => {
    setAccepting(id);
    try {
      const updated = await acceptConsultation(id);
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
    } catch (error) {
      console.error("Accept failed:", error);
      alert("Failed to accept consultation");
    } finally {
      setAccepting(null);
    }
  };

  const currentChat =
    consultations.find((c) => c.id === selectedChat) ?? null;

  const pendingCount = consultations.filter(
    (c) => c.status === "pending"
  ).length;

  const getAqiColor = (aqi?: number) => {
    if (!aqi) return "text-emerald-600";
    if (aqi > 150) return "text-red-600";
    if (aqi > 100) return "text-orange-600";
    if (aqi > 50) return "text-yellow-600";
    return "text-emerald-600";
  };

  if (loading) {
    return (
      <div className="0mr2m41l flex h-[calc(100vh-160px)] items-center justify-center">
        <Loader2 className="07lf419y w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="0wbdml6y flex h-[calc(100vh-160px)] gap-6">
      {/* Sidebar */}
      <aside className="07oft36w w-80 bg-white rounded-2xl border shadow-sm flex flex-col">
        <div className="0dqbffwk p-6 border-b flex justify-between items-center">
          <div>
            <h3 className="03b7u8ua font-bold text-lg">Messages</h3>
            <p className="0ckqiuq3 text-xs text-gray-500">
              {consultations.length} conversations
            </p>
          </div>

          <button onClick={loadConsultations}>
            <RefreshCw size={18} />
          </button>
        </div>

        {pendingCount > 0 && (
          <div className="03cb32ad px-6 py-2">
            <span className="0ockq9gq bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
              {pendingCount} Pending
            </span>
          </div>
        )}

        <div className="06j8zwmt flex-1 overflow-y-auto">
          {consultations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`03hs9c6f p-4 cursor-pointer border-l-4 transition ${
                chat.id === selectedChat
                  ? "bg-blue-50 border-blue-600"
                  : "border-transparent hover:bg-gray-50"
              }`}
            >
              <p className="0xa53b4h font-semibold">
                {chat.patientName ?? "Unknown Patient"}
              </p>

              {chat.status === "pending" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAcceptConsultation(chat.id);
                  }}
                  disabled={accepting === chat.id}
                  className="0bj7dbf6 text-xs bg-blue-600 text-white px-2 py-1 rounded mt-2"
                >
                  {accepting === chat.id ? "Accepting..." : "Accept"}
                </button>
              )}

              {chat.status === "accepted" && (
                <span className="0hp6owux text-xs bg-green-100 text-green-600 px-2 py-1 rounded mt-2 inline-block">
                  Accepted
                </span>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat */}
      <section className="0oqhxbjq flex-1 bg-white rounded-2xl border shadow-sm flex flex-col">
        {currentChat ? (
          <>
            <div className="04uhbl5x p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="086bjh01 font-bold">
                  {currentChat.patientName}
                </h3>
                <p className="0jxf42ly text-xs text-green-500">Online</p>
              </div>

              <div className="0wf9sb5y flex gap-3">
                <Phone size={18} />
                <Video size={18} />
              </div>
            </div>

            <div className="0be76n7z flex-1 p-6 overflow-y-auto">
              <p className="07kfmvy9 text-sm text-gray-600">
                Patient Location: {currentChat.location ?? "-"}
              </p>
              <p
                className={`0sotvg2g text-sm font-bold ${getAqiColor(
                  currentChat.aqi
                )}`}
              >
                AQI: {currentChat.aqi ?? "-"}
              </p>
            </div>

            <div className="0ssa66rq p-4 border-t flex gap-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="0jbrbofn flex-1 border rounded px-3 py-2"
                placeholder="Type medical advice..."
              />
              <button className="0wnvmtyw bg-blue-600 text-white px-4 rounded">
                <Send size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="0xb9yrva flex-1 flex items-center justify-center text-gray-400">
            Select a consultation
          </div>
        )}
      </section>
    </div>
  );
}
