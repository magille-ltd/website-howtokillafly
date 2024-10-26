import StarRating from './StarRating';

export default function Testimonial({ rating, content, author, reply }) {
  return (
    <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg">
      <StarRating rating={rating} />
      <p className="text-gray-300 mb-2">{content}</p>
      <p className="text-yellow-400 font-bold">{author}</p>
      {reply && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <p className="text-red-400 font-bold mb-2">Author's Reply:</p>
          <p className="text-gray-300">{reply}</p>
        </div>
      )}
    </div>
  );
}
