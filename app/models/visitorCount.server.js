import mongoose from 'mongoose';

const visitorCountSchema = new mongoose.Schema({
  counterId: { type: String, default: 'default', unique: true },
  count: { type: Number, default: 0 },
});

export const VisitorCount = mongoose.models.VisitorCount || mongoose.model('VisitorCount', visitorCountSchema);
