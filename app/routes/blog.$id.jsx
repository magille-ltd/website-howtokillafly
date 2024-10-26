import React from 'react';
import { useParams, Link } from '@remix-run/react';
import blogPosts from '../blogPosts';
import ContentContainer from '../components/ContentContainer';
import PrevNextNavigation from '../components/PrevNextNavigation';
import GradientText from '../components/GradientText';

export const meta = ({ data }) => {
  if (!data || !data.post) {
    return [
      { title: "Blog Post Not Found" },
      { name: "description", content: "The requested blog post could not be found." },
    ];
  }

  return [
    { title: `${data.post.title} - Fly Elimination Blog` },
    { name: "description", content: data.post.excerpt },
  ];
};

export const loader = async ({ params }) => {
  const post = blogPosts.find(post => post.id === params.id);
  
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return { post };
};


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

      
      <ContentContainer itemType="blog" itemId={post.id}>
        <GradientText style="default"><h2 className="text-2xl font-bold mb-4 text-yellow-400 drop-shadow-lg font-military">{post.title}</h2></GradientText>
        {post.content}
      </ContentContainer>

      <PrevNextNavigation prevItem={prevPost} nextItem={nextPost} basePath="blog" />
    </div>
  );
}
