import React from 'react';
import flyEliminationStrategies from '../flyStrategies';
import Testimonials from '../components/Testimonials';
import StrategyGrid from '../components/StrategyGrid';
import StrategyContainer from '../components/StrategyContainer';
import BlogSection from '../components/BlogSection';
import LearnMoreSection from '../components/LearnMoreSection';
import SectionHeader from '../components/SectionHeader';

export const meta = () => {
  return [
    { title: "How to Kill a Fly" },
    { name: "description", content: "Directory of various methods to eliminate that pesky mother fly with utmost efficiency and precision." },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-8">
      
      <section className="mb-8">
        <SectionHeader>Fly Elimination Strategies</SectionHeader>
        <StrategyContainer>
          <StrategyGrid strategies={flyEliminationStrategies} />
        </StrategyContainer>
      </section>
      
      <section className="mb-12 max-w-4xl mx-auto">
        <SectionHeader>Latest from the Blog</SectionHeader>
        <BlogSection />
      </section>

      <section className="mb-8">
        <SectionHeader>Buzz from the Battlefield</SectionHeader>
        <Testimonials />
      </section>
      
      <LearnMoreSection />
    </div>
  );
}
