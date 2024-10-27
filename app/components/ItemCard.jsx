import React from 'react';
import { Link } from "@remix-run/react";
import { ReactionEmoji } from '../constants/reactionTypes';
import GradientText from './GradientText';
import GradientBackground from './GradientBackground';

export default function ItemCard({ item, linkPrefix = '' }) {
  const topReactionEmoji = item.topReactionEmoji ? ReactionEmoji[item.topReactionEmoji] : null;

  return (
    <Link to={`${linkPrefix}/${item.id}`} className="block h-full">
      <GradientBackground className="h-full border border-yellow-400 rounded-lg shadow-md p-4 sm:p-6 relative bg-gray-800 bg-opacity-75 hover:bg-opacity-100 transition duration-300 ease-in-out transform hover:scale-105 flex flex-col">
        {item.hot && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">HOT</span>
        )}
        {topReactionEmoji && (
          <span className="absolute -top-1 -right-1 text-xl" title="Top reaction">
            <GradientText style="emoji">{topReactionEmoji}</GradientText>
          </span>
        )}
        <h3 className="text-xl font-semibold mb-2 text-yellow-400 mr-7">
          <GradientText style="default">{item.title || item.name}</GradientText>
        </h3>
        <p className="text-gray-300 mb-4 flex-grow">{item.excerpt || item.description}</p>
        {item.readMore && <span className="text-yellow-400">Read more</span>}
      </GradientBackground>
    </Link>
  );
}