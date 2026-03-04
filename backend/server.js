// Backend server for AsthmaShield Doctor Dashboard API
// Run with: node backend/server.js

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store (replace with database in production)
let consultations = [
  { id: "1", patientName: "Jean Paul", patientId: "p1", date: "Today", time: "2m ago", status: "pending", lastMsg: "I'm feeling tight-chested", unread: true, risk: "High", location: "Nyagatare", aqi: 160, age: 34, asthmaSeverity: "Moderate", peakFlow: 380, lastAttack: "3 days ago" },
  { id: "2", patientName: "Alice M.", patientId: "p2", date: "Today", time: "1h ago", status: "accepted", lastMsg: "Should I increase dosage?", unread: false, risk: "Stable", location: "Kigali", aqi: 45, age: 28, asthmaSeverity: "Mild", peakFlow: 420, lastAttack: "2 weeks ago" },
  { id: "3", patientName: "Eric S.", patientId: "p3", date: "Yesterday", time: "Yesterday", status: "completed", lastMsg: "Thanks, doctor!", unread: false, risk: "Stable", location: "Rubavu", aqi: 52, age: 45, asthmaSeverity: "Mild", peakFlow: 450, lastAttack: "1 month ago" },
  { id: "4", patientName: "Marie C.", patientId: "p4", date: "Today", time: "3h ago", status: "pending", lastMsg: "The pollen is really bad today", unread: false, risk: "At Risk", location: "Huye", aqi: 95, age: 22, asthmaSeverity: "Severe", peakFlow: 320, lastAttack: "1 week ago" },
];

let patients = [
  { id: "1", name: "Jean Paul", age: 34, status: "Critical", district: "Nyagatare", lastLog: "12 min ago" },
  { id: "2", name: "Alice M.", age: 28, status: "At Risk", district: "Kigali", lastLog: "45 min ago" },
  { id: "3", name: "Eric S.", age: 45, status: "Stable", district: "Rubavu", lastLog: "2 hours ago" },
  { id: "4", name: "Marie C.", age: 22, status: "At Risk", district: "Huye", lastLog: "3 hours ago" },
  { id: "5", name: "Paul K.", age: 51, status: "Stable", district: "Musanze", lastLog: "5 hours ago" },
];

let alerts = [
  { id: "1", name: "Jean Paul", district: "Nyagatare", time: "12 min ago", type: "Attack Reported" },
  { id: "2", name: "Alice M.", district: "Kigali", time: "45 min ago", type: "High AQI Exposure" },
  { id: "3", name: "Eric S.", district: "Rubavu", time: "2 hours ago", type: "Low Medication" },
  { id: "4", name: "Marie C.", district: "Huye", time: "3 hours ago", type: "Irregular Peak Flow" },
  { id: "5", name: "Paul K.", district: "Musanze", time: "5 hours ago", type: "Missed Medication" },
];

// ============ API Routes ============

// GET /api/consultations - Fetch all consultations
app.get('/api/consultations', (req, res) => {
  res.json(consultations);
});

// PUT /api/consultations/:id/accept - Accept a consultation
app.put('/api/consultations/:id/accept', (req, res) => {
  const { id } = req.params;
  
  const consultationIndex = consultations.findIndex(c => c.id === id);
  
  if (consultationIndex === -1) {
    return res.status(404).json({ error: 'Consultation not found' });
  }
  
  // Update the consultation status to accepted
  consultations[consultationIndex] = {
    ...consultations[consultationIndex],
    status: 'accepted'
  };
  
  console.log(`Consultation ${id} accepted`);
  
  res.json(consultations[consultationIndex]);
});

// GET /api/patients - Fetch all patients
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

// GET /api/alerts - Fetch all alerts
app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

// POST /api/consultations - Create a new consultation (for testing)
app.post('/api/consultations', (req, res) => {
  const newConsultation = {
    id: String(consultations.length + 1),
    ...req.body,
    status: 'pending',
    unread: true
  };
  
  consultations.unshift(newConsultation);
  res.status(201).json(newConsultation);
});

// PUT /api/consultations/:id/complete - Mark consultation as completed
app.put('/api/consultations/:id/complete', (req, res) => {
  const { id } = req.params;
  
  const consultationIndex = consultations.findIndex(c => c.id === id);
  
  if (consultationIndex === -1) {
    return res.status(404).json({ error: 'Consultation not found' });
  }
  
  consultations[consultationIndex].status = 'completed';
  res.json(consultations[consultationIndex]);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AsthmaShield API server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /api/consultations    - Fetch all consultations`);
  console.log(`   PUT  /api/consultations/:id/accept - Accept a consultation`);
  console.log(`   PUT  /api/consultations/:id/complete - Complete a consultation`);
  console.log(`   GET  /api/patients         - Fetch all patients`);
  console.log(`   GET  /api/alerts           - Fetch all alerts`);
  console.log(`   POST /api/consultations   - Create new consultation`);
});

module.exports = app;
