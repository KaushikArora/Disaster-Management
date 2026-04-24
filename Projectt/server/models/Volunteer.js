import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  missions: { type: Number, required: true },
  avatar: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);
