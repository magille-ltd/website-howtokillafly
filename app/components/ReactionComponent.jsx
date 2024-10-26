import { useState, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { ReactionType, ReactionEmoji } from '~/constants/reactionTypes';
import GradientText from './GradientText';
const ReactionComponent = ({ itemType, itemId, enabledReactions, style = 'default' }) => {
  const [reactions, setReactions] = useState([]);
  const [localReactions, setLocalReactions] = useState({});
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load(`/api/reaction?itemType=${itemType}&itemId=${itemId}`);
  }, [itemType, itemId]);

  useEffect(() => {
    if (fetcher.data && fetcher.data.reactions) {
      setReactions(fetcher.data.reactions);
      setLocalReactions({});
    }
  }, [fetcher.data]);

  const handleReaction = (reactionType) => {
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
    if (style === 'minimal') {
      return type === ReactionType.LIKE ? 
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg> :
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
        </svg>;
    }
    return ReactionEmoji[type] || '❓';
  };

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
    <div className={`flex ${style === 'minimal' ? 'gap-4' : 'flex-wrap gap-2'}`}>
      {reactionsToShow.map((type) => {
        const serverCount = reactions.find(r => r.type === type)?.count || 0;
        const localCount = localReactions[type] || 0;
        const totalCount = serverCount + localCount;

        const isZeroCount = totalCount === 0;
        const minimalOpacityClass = isZeroCount ? 'opacity-30' : 'opacity-60';
        const minimalHoverClass = isZeroCount ? 'hover:opacity-50' : 'hover:opacity-80';

        return (
          <GradientText style="emoji">
            <button
              key={type}
              onClick={() => handleReaction(type)}
              className={`flex items-center ${
                style === 'minimal'
                  ? `text-gray-400 ${minimalOpacityClass} ${minimalHoverClass}`
                  : 'flex-col py-2 px-1 sm:p-2 border-none border-gray-300 rounded-lg hover:bg-gray-800'
              } transition-colors duration-200`}
              title={type.charAt(0).toUpperCase() + type.slice(1)}
            >
              <span className={style === 'minimal' ? 'mr-1' : 'text-2xl'}>
                {getEmojiForReaction(type)}
              </span>
              {totalCount > 0 && (
                <span className={style === 'minimal' ? 'text-xs' : 'text-xs mt-1'}>
                  {totalCount}
                </span>
              )}
            </button>
          </GradientText>
        );
      })}
    </div>
  );
};

export default ReactionComponent;
