import React from 'react';
import { useParams, Link } from '@remix-run/react';
import blogPosts from '../blogPosts';
import ContentContainer from '../components/ContentContainer';
import PrevNextNavigation from '../components/PrevNextNavigation';

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
      <ContentContainer>
        {post.content}
      </ContentContainer>

      <PrevNextNavigation prevItem={prevPost} nextItem={nextPost} basePath="blog" />
    </div>
  );
}
