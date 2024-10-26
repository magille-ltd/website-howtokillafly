import React from 'react';
import { Link } from "@remix-run/react";
import blogPosts from '../blogPosts';

export default function BlogSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post) => (
        <div key={post.id} className="bg-gray-800 rounded-lg shadow-md p-6">
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
      ))}
    </div>
  );
}
