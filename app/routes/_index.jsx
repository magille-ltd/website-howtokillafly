import React from 'react';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import LearnMoreSection from '../components/LearnMoreSection';
import SectionHeader from '../components/SectionHeader';
import StrategySection from '../components/StrategySection';
import VisitorCounter from '../components/VisitorCounter';

export const meta = () => {
  return [
    { title: "How to Kill a Fly" },
    { name: "description", content: "Directory of various methods to eliminate that pesky mother fly with utmost efficiency and precision." },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-0">
      <div className="mb-16 text-center">
        <VisitorCounter />
      </div>
      
      <section className="mb-16">
        <SectionHeader>Fly Elimination Strategies</SectionHeader>
        <StrategySection />
      </section>
      
      <section className="mb-16 max-w-4xl mx-auto">
        <SectionHeader>Latest from the Blog</SectionHeader>
        <BlogSection />
      </section>

      <section className="mb-16">
        <SectionHeader>Buzz from the Battlefield</SectionHeader>
        <Testimonials />
      </section>
      
      <LearnMoreSection />
    </div>
  );
}
