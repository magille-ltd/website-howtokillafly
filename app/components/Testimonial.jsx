import StarRating from './StarRating';
import ReactionComponent from './ReactionComponent';
import { ReactionType } from '~/constants/reactionTypes';
import GradientBackground from './GradientBackground';

export default function Testimonial({ rating, content, author, reply, id }) {
  const enabledReactions = [ReactionType.LIKE, ReactionType.DISLIKE];

  return (
    <GradientBackground className="bg-gray-800 p-6 rounded-lg text-left">
      <div className="absolute top-0 right-0">
        <ReactionComponent 
          itemType="testimonial" 
          itemId={id} 
          enabledReactions={enabledReactions}
          style="minimal"
        />
      </div>
      <StarRating rating={rating} />
      <p className="text-gray-300 mb-2">{content}</p>
      <p className="text-yellow-400 font-bold">{author}</p>
      {reply && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <p className="text-red-400 font-bold mb-2">Author's Reply:</p>
          <p className="text-gray-300">{reply}</p>
        </div>
      )}
    </GradientBackground>
  );
}
