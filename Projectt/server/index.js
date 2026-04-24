import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Incident from './models/Incident.js';
import Volunteer from './models/Volunteer.js';

// Setup environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection Caching for Serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/disasteros';
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('Successfully connected to MongoDB');
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}

// Middleware to ensure DB connection before handling API routes
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    await connectToDatabase();
  }
  next();
});

// Basic API route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running and connected to MongoDB' });
});

// GET all incidents
app.get('/api/incidents', async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incidents', error: error.message });
  }
});

// GET all volunteers
app.get('/api/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ missions: -1 });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteers', error: error.message });
  }
});

// POST to seed database with sample data
app.post('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await Incident.deleteMany({});
    await Volunteer.deleteMany({});

    // Sample Incidents
    const sampleIncidents = [
      { id: 'INC-001', type: 'Flood', location: 'Downtown', severity: 'Critical', status: 'Active', time: '10m ago', team: 'Alpha' },
      { id: 'INC-002', type: 'Fire', location: 'North Hills', severity: 'High', status: 'Active', time: '2h ago', team: 'Bravo' },
      { id: 'INC-003', type: 'Accident', location: 'Highway 5', severity: 'Medium', status: 'Resolved', time: '5h ago', team: 'Charlie' },
      { id: 'INC-004', type: 'Power Outage', location: 'Westside', severity: 'Low', status: 'Pending', time: '1d ago', team: 'Delta' },
      { id: 'INC-005', type: 'Earthquake', location: 'Central', severity: 'Critical', status: 'Active', time: '30m ago', team: 'Alpha' },
      { id: 'INC-006', type: 'Landslide', location: 'Mountain Pass', severity: 'High', status: 'Pending', time: '3h ago', team: 'Echo' },
    ];

    // Sample Volunteers
    const sampleVolunteers = [
      { name: 'Dr. Sarah Johnson', role: 'Medical Response Lead', location: 'Central District', email: 'sarah.j@volunteer.org', phone: '+1 (555) 234-5678', missions: 47, avatar: '👩‍⚕️', status: 'Deployed' },
      { name: 'Mike Chen', role: 'Search & Rescue Specialist', location: 'North Region', email: 'mike.chen@volunteer.org', phone: '+1 (555) 345-6789', missions: 52, avatar: '👨‍🚒', status: 'Deployed' },
      { name: 'Emily Rodriguez', role: 'Logistics Coordinator', location: 'River Valley', email: 'emily.r@volunteer.org', phone: '+1 (555) 456-7890', missions: 38, avatar: '👩‍💼', status: 'Available' },
      { name: 'James Williams', role: 'Emergency Communications', location: 'Coastal Area', email: 'james.w@volunteer.org', phone: '+1 (555) 567-8901', missions: 41, avatar: '👨‍💻', status: 'Available' },
      { name: 'Lisa Anderson', role: 'Community Outreach', location: 'Mountain Ridge', email: 'lisa.a@volunteer.org', phone: '+1 (555) 678-9012', missions: 35, avatar: '👩‍🏫', status: 'Off-Duty' },
      { name: 'David Kumar', role: 'Equipment Manager', location: 'South District', email: 'david.k@volunteer.org', phone: '+1 (555) 789-0123', missions: 29, avatar: '👨‍🔧', status: 'Deployed' },
      { name: 'Rachel Martinez', role: 'Mental Health Support', location: 'West Region', email: 'rachel.m@volunteer.org', phone: '+1 (555) 890-1234', missions: 44, avatar: '👩‍⚕️', status: 'Available' },
      { name: 'Tom Baker', role: 'Transportation Lead', location: 'East District', email: 'tom.b@volunteer.org', phone: '+1 (555) 901-2345', missions: 33, avatar: '👨‍✈️', status: 'Available' },
    ];

    await Incident.insertMany(sampleIncidents);
    await Volunteer.insertMany(sampleVolunteers);

    res.json({ message: 'Database successfully seeded with sample data!' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});


// Start server locally (Vercel doesn't use this, it uses the exported app)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
