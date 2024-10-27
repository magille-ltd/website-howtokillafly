import React, { useEffect, useState } from 'react';
import { useFetcher } from "@remix-run/react";
import blogPosts from '../blogPosts';
import ItemCard from './ItemCard';

export default function BlogSection() {
  const [topReactions, setTopReactions] = useState({});
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load('/api/top-reactions?itemType=blog');
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      //console.log('blog fetcher.data', fetcher.data);
      setTopReactions(fetcher.data);
    }
  }, [fetcher.data]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post) => (
        <ItemCard
          key={post.id}
          item={{
            ...post,
            topReactionEmoji: topReactions[post.id],
            readMore: true
          }}
          linkPrefix="/blog"
        />
      ))}
    </div>
  );
}
