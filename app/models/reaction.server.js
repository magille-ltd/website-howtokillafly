import mongoose from 'mongoose';
import { ReactionType } from '../constants/reactionTypes';

const reactionSchema = new mongoose.Schema({
  itemType: { type: String, required: true },
  itemId: { type: String, required: true },
  reactions: [{
    type: {
      type: String,
      enum: Object.values(ReactionType),
      required: true,
    },
    count: { type: Number, default: 0 },
  }],
});

// Create a unique compound index for itemType and itemId
reactionSchema.index({ itemType: 1, itemId: 1 }, { unique: true });

// Add a compound index for itemType, itemId, and reaction type
reactionSchema.index({ itemType: 1, itemId: 1, 'reactions.type': 1 });

export const Reaction = mongoose.models.Reaction || mongoose.model('Reaction', reactionSchema);
// Export ReactionType for use in other files
export { ReactionType };
