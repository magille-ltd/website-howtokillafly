import React from 'react';
import { useParams, Link } from '@remix-run/react';
import blogPosts from '../blogPosts';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/blog" className="text-yellow-400 hover:underline mb-4 inline-block">
        &larr; Back to Blog
      </Link>
      <article className="bg-gray-800 rounded-lg shadow-md p-6">
        {post.content}
      </article>
    </div>
  );
}
