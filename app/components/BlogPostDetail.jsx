import { Link } from "@remix-run/react";
import VoteButton from "./VoteButton";

export default function BlogPostDetail({ post }) {
  return (
    <div className="text-left py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg">{post.title}</h2>
        <VoteButton id={post.id} type="post" />
      </div>
      <p className="text-2xl mb-6 text-gray-300">{post.excerpt}</p>
      {post.content}
      <Link to="/blog" className="text-blue-500 hover:underline mt-4 text-lg block mt-8">Back to Blog</Link>
    </div>
  );
}
