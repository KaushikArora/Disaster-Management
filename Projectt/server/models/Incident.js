import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  severity: { type: String, required: true },
  status: { type: String, required: true },
  time: { type: String, required: true },
  team: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Incident || mongoose.model('Incident', incidentSchema);
