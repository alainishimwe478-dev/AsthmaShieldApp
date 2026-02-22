import React, { useState } from "react";
import { Send, Phone, Video, Info, CheckCheck, MapPin, Wind, AlertCircle } from "lucide-react";

interface ConsultationPageProps {
  onClose?: () => void;
}

export default function ConsultationPage({ onClose }: ConsultationPageProps) {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);

  const chats = [
    { id: 1, name: "Jean Paul", lastMsg: "I'm feeling tight-chested", time: "2m ago", unread: true, risk: "High", location: "Nyagatare", aqi: 160 },
    { id: 2, name: "Alice M.", lastMsg: "Should I increase dosage?", time: "1h ago", unread: false, risk: "Stable", location: "Kigali", aqi: 45 },
    { id: 3, name: "Eric S.", lastMsg: "Thanks, doctor!", time: "Yesterday", unread: false, risk: "Stable", location: "Rubavu", aqi: 52 },
    { id: 4, name: "Marie C.", lastMsg: "The pollen is really bad today", time: "3h ago", unread: false, risk: "At Risk", location: "Huye", aqi: 95 },
  ];

  const currentChat = chats.find(c => c.id === selectedChat) || chats[0];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "text-red-600";
      case "At Risk": return "text-orange-600";
      default: return "text-emerald-600";
    }
  };

  const getAqiColor = (aqi: number) => {
    if (aqi > 150) return "text-red-600";
    if (aqi > 100) return "text-orange-600";
    if (aqi > 50) return "text-yellow-600";
    return "text-emerald-600";
  };

  return (
    <div className="07i5x0fv flex h-[calc(100vh-160px)] gap-6 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Patient Selector Column */}
      <aside className="03sa94oy w-80 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        <div className="0eh4l205 p-6 border-b border-slate-50">
          <h3 className="05b75v0e font-black text-xl text-slate-800">Messages</h3>
          <p className="0vy3nmep text-xs text-slate-500 mt-1">4 active conversations</p>
        </div>
        <div className="048ksccz flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`0q1ikedf p-4 flex gap-3 cursor-pointer border-l-4 transition ${
                chat.id === selectedChat ? "bg-blue-50 border-blue-600" : "border-transparent hover:bg-slate-50"
              }`}
            >
              <div className="0m2bj1xq relative">
                <div className="0qcmhi8m w-12 h-12 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center font-bold text-slate-500">
                  {chat.name[0]}
                </div>
                {chat.unread && <span className="02pnfdyq absolute top-0 right-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></span>}
              </div>
              <div className="0uz8y7hz flex-1 min-w-0">
                <div className="06olbtya flex justify-between items-start">
                  <p className="0ews4luk font-bold text-slate-800 truncate">{chat.name}</p>
                  <span className="0ayo1343 text-[10px] text-slate-400 font-bold uppercase">{chat.time}</span>
                </div>
                <p className="06qcnc6j text-xs text-slate-500 truncate">{chat.lastMsg}</p>
                <span className={`04lue5lz text-[10px] font-bold ${getRiskColor(chat.risk)}`}>{chat.risk}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* 2. Main Chat Column */}
      <section className="07si2otn flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="06kgdmyh p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div className="02a0v04m flex items-center gap-3">
            <div className="0jwz7xwk w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
              {currentChat.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="0x9ppcyw font-bold text-slate-800">{currentChat.name}</p>
              <p className="0fdlpyp2 text-[10px] text-emerald-500 font-black uppercase flex items-center gap-1">
                <span className="0bge95rs w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <div className="0o7pmeqk flex gap-2">
            <button className="0phdccrd p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition">
              <Phone size={20} />
            </button>
            <button className="04z9afx9 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition">
              <Video size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="0r1icpy8 flex-1 overflow-y-auto p-6 space-y-6">
          <div className="03jnb46b flex justify-center">
            <span className="0a4jblm8 text-[10px] bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-400 uppercase tracking-widest">Today</span>
          </div>
          
          {/* Patient Message */}
          <div className="05ris2wz flex gap-3 max-w-[80%]">
            <div className="0c0u1a0p bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-700 text-sm">
              Hello Doctor. I am in {currentChat.location} right now and the air feels very heavy. My chest is getting tight.
            </div>
          </div>

          {/* Doctor Message */}
          <div className="04skkodj flex flex-row-reverse gap-3 max-w-[80%] ml-auto text-right">
            <div className="09yqmmp0 bg-blue-600 p-4 rounded-2xl rounded-tr-none text-white text-sm shadow-lg shadow-blue-100">
              I see a spike in AQI in your area ({currentChat.aqi}). Please move indoors immediately and take 2 puffs of your blue inhaler. How is your breathing now?
              <div className="0r9z0945 flex justify-end gap-1 mt-1 opacity-70">
                <span className="09fqegkm text-[10px]">10:45 AM</span>
                <CheckCheck size={12} />
              </div>
            </div>
          </div>

          {/* Patient Response */}
          <div className="0s9ner6u flex gap-3 max-w-[80%]">
            <div className="0y5zq0ax bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-700 text-sm">
              I just took 2 puffs. It's a bit better now but I can still feel some tightness.
            </div>
          </div>

          {/* Doctor Message */}
          <div className="0lom5zbb flex flex-row-reverse gap-3 max-w-[80%] ml-auto text-right">
            <div className="0sbscvii bg-blue-600 p-4 rounded-2xl rounded-tr-none text-white text-sm shadow-lg shadow-blue-100">
              Good, stay indoors and monitor your breathing. If it doesn't improve in 15 minutes, take 2 more puffs and let me know. Keep the windows closed.
              <div className="0tbme1cw flex justify-end gap-1 mt-1 opacity-70">
                <span className="0qwrcwjd text-[10px]">10:48 AM</span>
                <CheckCheck size={12} />
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="07zgcd7v p-4 bg-slate-50/50 border-t border-slate-100">
          <div className="0a3i5od8 flex gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-inner">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type medical advice..." 
              className="0efyo0jy flex-1 bg-transparent px-4 py-2 outline-none text-sm"
            />
            <button className="0ezj6f3x bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition">
              <Send size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Medical Context Sidebar */}
      <aside className="0mpd1mol w-72 space-y-6">
        <div className="0kqomjn1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="0fdsftqb font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Info size={16} /> Patient Vitals
          </h4>
          <div className="06fcdwme space-y-4">
            <div className="0sbtb5pn flex justify-between items-center">
              <span className="0r80i8xn text-xs text-slate-500 flex items-center gap-1">
                <MapPin size={12}/> Location
              </span>
              <span className="0l2iiwjj text-xs font-bold">{currentChat.location}</span>
            </div>
            <div className="0wcjrrhl flex justify-between items-center">
              <span className="0jdk72bl text-xs text-slate-500 flex items-center gap-1">
                <Wind size={12}/> Local AQI
              </span>
              <span className={`0oc3cdc1 text-xs font-bold ${getAqiColor(currentChat.aqi)}`}>
                {currentChat.aqi} {currentChat.aqi > 100 ? '(Unhealthy)' : '(Moderate)'}
              </span>
            </div>
            <div className="0n7icbxl h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
              <div 
                className={`0j6z0nxl h-full ${currentChat.aqi > 150 ? 'bg-red-500' : currentChat.aqi > 100 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min((currentChat.aqi / 200) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="0denwfdw text-[10px] text-slate-400 text-center font-medium">
              Risk level is {currentChat.aqi > 150 ? '80%' : currentChat.aqi > 100 ? '40%' : '10%'} higher than baseline
            </p>
          </div>
        </div>

        {/* Patient Info Card */}
        <div className="0h6i91h0 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="0o3czrsr font-bold text-slate-800 mb-4">Patient Info</h4>
          <div className="09w9jr38 space-y-3 text-xs">
            <div className="0165896k flex justify-between">
              <span className="0if9rjab text-slate-500">Age</span>
              <span className="0stfr1ti font-bold">34 years</span>
            </div>
            <div className="0iq03s0k flex justify-between">
              <span className="0zbr0vco text-slate-500">Asthma Severity</span>
              <span className="00rqj9iy font-bold text-orange-600">Moderate</span>
            </div>
            <div className="0285buhp flex justify-between">
              <span className="07101qlg text-slate-500">Peak Flow</span>
              <span className="0zt0ewl2 font-bold">380 L/min</span>
            </div>
            <div className="0qgrq2iw flex justify-between">
              <span className="0cb4bpni text-slate-500">Last Attack</span>
              <span className="06c7e3cy font-bold">3 days ago</span>
            </div>
          </div>
        </div>

        <div className="0jfpwds6 bg-slate-900 p-6 rounded-3xl text-white">
          <h4 className="0los7fvl font-bold text-sm mb-4">Quick Actions</h4>
          <div className="0z9c4z35 space-y-2">
            <button className="0vvjkynd w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition flex items-center gap-2">
              📋 Prescribe Inhaler
            </button>
            <button className="0mmskqzb w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition flex items-center gap-2">
              🏥 Refer to Hospital
            </button>
            <button className="0h2ylqiv w-full text-left p-3 rounded-xl bg-red-500 text-white text-xs font-bold transition flex items-center gap-2">
              <AlertCircle size={14} /> Trigger Emergency
            </button>
          </div>
        </div>
      </aside>

    </div>
  );
}
