import React from 'react';
import { useLoaderData, Link } from "@remix-run/react";
import flyEliminationStrategies from '../flyStrategies';
import StrategyDetail from '../components/StrategyDetail';
import ContentContainer from '../components/ContentContainer';
import PrevNextNavigation from '../components/PrevNextNavigation';

export const meta = ({ data }) => {
  if (!data || !data.strategy) {
    return [
      { title: "Strategy Not Found" },
      { name: "description", content: "The requested fly elimination strategy could not be found." },
    ];
  }

  return [
    { title: `${data.strategy.name} - Fly Elimination Strategy` },
    { name: "description", content: data.strategy.description },
  ];
};

export const loader = async ({ params }) => {
  const strategyIndex = flyEliminationStrategies.findIndex(s => s.id === params.id);
  const strategy = flyEliminationStrategies[strategyIndex];
  
  if (!strategy) {
    throw new Response("Not Found", { status: 404 });
  }

  const prevStrategy = strategyIndex > 0 ? flyEliminationStrategies[strategyIndex - 1] : null;
  const nextStrategy = strategyIndex < flyEliminationStrategies.length - 1 ? flyEliminationStrategies[strategyIndex + 1] : null;

  return { strategy, prevStrategy, nextStrategy };
};

export default function StrategyDetailPage() {
  const { strategy, prevStrategy, nextStrategy } = useLoaderData();

  if (!strategy) {
    return <div>Strategy not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-yellow-400 hover:underline mb-4 inline-block">
        &larr; Back to Strategies
      </Link>
      <ContentContainer itemType="strategy" itemId={strategy.id}>
        <StrategyDetail strategy={strategy} />
      </ContentContainer>

      <PrevNextNavigation 
        prevItem={prevStrategy} 
        nextItem={nextStrategy} 
        basePath="" 
      />
    </div>
  );
}
