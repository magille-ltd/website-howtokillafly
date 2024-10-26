import React from 'react';
import { useLocation } from "@remix-run/react";
import ReactionComponent from './ReactionComponent';
import { ReactionType } from '../constants/reactionTypes';

export default function ContentContainer({ children }) {
  const location = useLocation();
  const selectedReactions = [ReactionType.FLY, ReactionType.FIRE, ReactionType.SKEPTICAL];

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 relative">
      <div className="absolute top-2 right-2">
        <ReactionComponent 
          itemType="page" 
          itemId={location.pathname}
          enabledReactions={selectedReactions} 
        />
      </div>
      <div className="text-left">
        {children}
      </div>
    </div>
  );
}
