import { useState, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';

export default function VoteButton({ id, type }) {
  const [votes, setVotes] = useState({ upVotes: 0, downVotes: 0 });
  const voteFetcher = useFetcher();

  useEffect(() => {
    async function fetchVotes() {
      const response = await fetch(`/api/vote?id=${id}&type=${type}`);
      const data = await response.json();
      setVotes(data);
    }
    fetchVotes();
  }, [id, type]);

  const handleVote = (increment) => {
    voteFetcher.submit(
      { id, type, increment: increment.toString() },
      { method: 'post', action: '/api/vote' }
    );
    setVotes((prevVotes) => ({
      ...prevVotes,
      [increment ? 'upVotes' : 'downVotes']: prevVotes[increment ? 'upVotes' : 'downVotes'] + 1
    }));
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleVote(true)}
        className="p-2 bg-yellow-400 text-gray-800 rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200"
        aria-label="Upvote"
      >
        🪰
      </button>
      <span className="text-xl font-semibold text-gray-300">{votes.upVotes}</span>
      <button
        onClick={() => handleVote(false)}
        className="p-2 bg-gray-400 text-gray-800 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
        aria-label="Downvote"
      >
        👎
      </button>
      <span className="text-xl font-semibold text-gray-300">{votes.downVotes}</span>
    </div>
  );
}
