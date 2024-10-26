import React, { useEffect, useState } from 'react';
import { useFetcher } from "@remix-run/react";
import blogPosts from '../blogPosts';
import BlogPostCard from './BlogPostCard';

export default function BlogSection() {
  const [topReactions, setTopReactions] = useState({});
  const fetcher = useFetcher();

  useEffect(() => {
    // Fetch top reactions when component mounts
    fetcher.load('/api/top-reactions?itemType=blog');
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setTopReactions(fetcher.data);
    }
  }, [fetcher.data]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          topReaction={topReactions[post.id]}
        />
      ))}
    </div>
  );
}
