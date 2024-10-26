import { useState, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { ReactionType, ReactionEmoji } from '~/constants/reactionTypes';

const ReactionComponent = ({ itemType, itemId, enabledReactions }) => {
  const [reactions, setReactions] = useState([]);
  const [localReactions, setLocalReactions] = useState({});
  const fetcher = useFetcher();

  useEffect(() => {
    // Fetch initial reactions
    fetcher.load(`/api/reaction?itemType=${itemType}&itemId=${itemId}`);
  }, [itemType, itemId]);

  useEffect(() => {
    if (fetcher.data && fetcher.data.reactions) {
      setReactions(fetcher.data.reactions);
      // Reset local reactions when new data is fetched
      setLocalReactions({});
    }
  }, [fetcher.data]);

  const handleReaction = (reactionType) => {
    // Update local state immediately
    setLocalReactions(prev => ({
      ...prev,
      [reactionType]: (prev[reactionType] || 0) + 1
    }));

    fetcher.submit(
      { itemType, itemId, reactionType },
      { method: 'post', action: '/api/reaction' }
    );
  };

  const getEmojiForReaction = (type) => {
    return ReactionEmoji[type] || '❓';
  };

  // Use the passed enabledReactions prop, or fallback to a default set if not provided
  const reactionsToShow = enabledReactions || [
    ReactionType.LIKE,
    ReactionType.LOVE,
    ReactionType.LAUGH,
    ReactionType.WOW,
    ReactionType.CLAP,
    ReactionType.GENIUS,
    ReactionType.SAD,
    ReactionType.FIRE,
    ReactionType.FLY
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {reactionsToShow.map((type) => {
        const serverCount = reactions.find(r => r.type === type)?.count || 0;
        const localCount = localReactions[type] || 0;
        const totalCount = serverCount + localCount;

        return (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            className="flex flex-col items-center p-2 border-none border-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            title={type.charAt(0).toUpperCase() + type.slice(1)}
          >
            <span className="text-2xl">{getEmojiForReaction(type)}</span>
            {totalCount > 0 && (
              <span className="text-xs mt-1">{totalCount}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ReactionComponent;
