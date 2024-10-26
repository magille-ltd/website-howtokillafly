import React from 'react';
import { useParams, Link } from '@remix-run/react';
import blogPosts from '../blogPosts';

export default function BlogPost() {
  const { id } = useParams();
  const currentPostIndex = blogPosts.findIndex((post) => post.id === id);
  const post = blogPosts[currentPostIndex];

  if (!post) {
    return <div>Post not found</div>;
  }

  const prevPost = currentPostIndex > 0 ? blogPosts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < blogPosts.length - 1 ? blogPosts[currentPostIndex + 1] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/blog" className="text-yellow-400 hover:underline mb-4 inline-block">
        &larr; Back to Blog
      </Link>
      <article className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        {post.content}
      </article>

      <div className="grid grid-cols-2 gap-4">
        <div>
          {prevPost && (
            <Link to={`/blog/${prevPost.id}`} className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition-colors flex items-center h-full w-full">
              <div className="mr-4 text-yellow-400 text-2xl">&larr;</div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Previous Post</h3>
                <p className="text-white">{prevPost.title}</p>
              </div>
            </Link>
          )}
        </div>
        <div>
          {nextPost && (
            <Link to={`/blog/${nextPost.id}`} className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition-colors flex items-center justify-end h-full w-full">
              <div className="text-right">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Next Post</h3>
                <p className="text-white">{nextPost.title}</p>
              </div>
              <div className="ml-4 text-yellow-400 text-2xl">&rarr;</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
