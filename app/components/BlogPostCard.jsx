import React from 'react';
import { Link } from "@remix-run/react";
import { ReactionEmoji } from '../constants/reactionTypes';
import GradientText from './GradientText';
import GradientBackground from './GradientBackground';

export default function BlogPostCard({ post, topReaction }) {
  const topReactionEmoji = topReaction ? ReactionEmoji[topReaction] : null;

  return (
    <GradientBackground className="bg-gray-800 rounded-lg shadow-md p-6 relative">
      {topReactionEmoji && (
        <span className="absolute -top-2 -right-3 text-2xl" title="Top reaction">
          <GradientText style="emoji">{topReactionEmoji}</GradientText>
        </span>
      )}
      <h3 className="text-xl font-semibold mb-2 text-yellow-400 mr-1">
        <Link to={`/blog/${post.id}`} className="hover:underline">
          <GradientText style="default">{post.title}</GradientText>
        </Link>
      </h3>
      <p className="text-gray-300 mb-4">{post.excerpt}</p>
      <Link
        to={`/blog/${post.id}`}
        className="text-yellow-400 hover:underline"
      >
        Read more
      </Link>
    </GradientBackground>
  );
}
