import React from 'react';
import { Link } from "@remix-run/react";
import { ReactionEmoji } from '../constants/reactionTypes';
import GradientText from './GradientText';
export default function BlogPostCard({ post, topReaction }) {
  const topReactionEmoji = topReaction ? ReactionEmoji[topReaction] : null;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 relative">
      {topReactionEmoji && (
        <span className="absolute top-2 right-2 text-2xl" title="Top reaction">
          <GradientText style="emoji">{topReactionEmoji}</GradientText>
        </span>
      )}
      <h3 className="text-xl font-semibold mb-2 text-yellow-400">
        <Link to={`/blog/${post.id}`} className="hover:underline">
          {post.title}
        </Link>
      </h3>
      <p className="text-gray-300 mb-4">{post.excerpt}</p>
      <Link
        to={`/blog/${post.id}`}
        className="text-yellow-400 hover:underline"
      >
        Read more
      </Link>
    </div>
  );
}
