import React from 'react';
import BlogSection from '../components/BlogSection';
import GradientText from '../components/GradientText';
export default function BlogIndex() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400"><GradientText style="default">Fly Elimination Blog</GradientText></h1>
      <BlogSection />
    </div>
  );
}
