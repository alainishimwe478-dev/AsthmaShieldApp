// lib/notifications.ts - Mock notifications / consultations for Admin Dashboard

export interface Consultation {
  id: number;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  status: "Pending" | "Accepted" | "Declined";
  location: string;
  aqi: number;
  lastMsg: string;
  risk: "High" | "At Risk" | "Stable";
}

// Mock consultation list
let consultations: Consultation[] = [
  { 
    id: 1, 
    patientName: "Jean Paul", 
    patientId: "p1",
    date: "2026-03-05", 
    time: "10:00 AM", 
    status: "Pending",
    location: "Nyagatare",
    aqi: 160,
    lastMsg: "I'm feeling tight-chested",
    risk: "High"
  },
  { 
    id: 2, 
    patientName: "Alice M.", 
    patientId: "p2",
    date: "2026-03-06", 
    time: "02:00 PM", 
    status: "Pending",
    location: "Kigali",
    aqi: 45,
    lastMsg: "Should I increase dosage?",
    risk: "Stable"
  },
  { 
    id: 3, 
    patientName: "Marie C.", 
    patientId: "p3",
    date: "2026-03-06", 
    time: "03:30 PM", 
    status: "Pending",
    location: "Huye",
    aqi: 95,
    lastMsg: "The pollen is really bad today",
    risk: "At Risk"
  },
  { 
    id: 4, 
    patientName: "Eric S.", 
    patientId: "p4",
    date: "2026-03-04", 
    time: "11:00 AM", 
    status: "Accepted",
    location: "Rubavu",
    aqi: 52,
    lastMsg: "Thanks for accepting my request",
    risk: "Stable"
  },
];

// Listeners for real-time updates
let listeners: (() => void)[] = [];

// Simulate API fetch
export const fetchConsultations = (): Promise<Consultation[]> =>
  new Promise<Consultation[]>(resolve => setTimeout(() => resolve([...consultations]), 500));

// Update consultation status
export const updateConsultationStatus = (id: number, status: "Accepted" | "Declined"): Consultation | undefined => {
  consultations = consultations.map(c => c.id === id ? { ...c, status } : c);
  // Notify listeners
  listeners.forEach(listener => listener());
  return consultations.find(c => c.id === id);
};

// Add a new consultation (simulating live incoming)
export const addConsultation = (consultation: Omit<Consultation, "id" | "status">): Consultation => {
  const newConsultation: Consultation = {
    ...consultation,
    id: Math.max(...consultations.map(c => c.id)) + 1,
    status: "Pending",
  };
  consultations = [newConsultation, ...consultations];
  // Notify listeners
  listeners.forEach(listener => listener());
  return newConsultation;
};

// Subscribe to consultation updates
export const subscribeToConsultations = (listener: () => void): (() => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

// Get pending consultations count
export const getPendingCount = (): number => 
  consultations.filter(c => c.status === "Pending").length;

// Generate random new consultation (for live simulation)
export const simulateNewConsultation = (): void => {
  const names = ["John Doe", "Sarah K.", "Michel R.", "Grace U.", "Daniel M."];
  const locations = ["Kigali", "Nyagatare", "Rubavu", "Huye", "Musanze", "Gicumbi"];
  const risks: ("High" | "At Risk" | "Stable")[] = ["High", "At Risk", "Stable"];
  const messages = [
    "I'm having trouble breathing",
    "My asthma is acting up",
    "Need immediate assistance",
    "Wheezing a lot today",
    "Peak flow dropped significantly"
  ];
  
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomRisk = risks[Math.floor(Math.random() * risks.length)];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  
  addConsultation({
    patientName: randomName,
    patientId: `p${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    location: randomLocation,
    aqi: Math.floor(Math.random() * 150) + 30,
    lastMsg: randomMsg,
    risk: randomRisk,
  });
};

export default {
  fetchConsultations,
  updateConsultationStatus,
  addConsultation,
  subscribeToConsultations,
  getPendingCount,
  simulateNewConsultation,
};

