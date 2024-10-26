import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  itemType: { type: String, required: true, enum: ['strategy', 'post'] },
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 },
});

// Create a compound index for itemId and itemType
voteSchema.index({ itemId: 1, itemType: 1 }, { unique: true });

export const Vote = mongoose.models.Vote || mongoose.model('Vote', voteSchema);
