import React from 'react';
import { Link } from '@remix-run/react';
import blogPosts from '../blogPosts';

export default function BlogIndex() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Fly Elimination Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              <Link to={`/blog/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <Link
              to={`/blog/${post.id}`}
              className="text-yellow-400 hover:underline"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
