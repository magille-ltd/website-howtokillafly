import React from 'react';
import { useLocation } from "@remix-run/react";
import ReactionComponent from './ReactionComponent';
import { ReactionType } from '../constants/reactionTypes';

export default function ContentContainer({ children, itemType, itemId }) {
  const selectedReactions = itemType === 'blog'
    ? [ReactionType.LIKE, ReactionType.LOVE, ReactionType.DISLIKE]
    : [ReactionType.FLY, ReactionType.FIRE, ReactionType.SKEPTICAL];

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 relative">
      <div className="md:absolute md:top-2 md:right-2 static mt-2 flex justify-center">
        <ReactionComponent 
          itemType={itemType}
          itemId={itemId}
          enabledReactions={selectedReactions} 
        />
      </div>
      <div className="text-left pt-8 lg:pt-0">
        {children}
      </div>
    </div>
  );
}
