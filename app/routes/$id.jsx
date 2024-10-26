import { useLoaderData } from "@remix-run/react";
import flyEliminationStrategies from '../flyStrategies';
import StrategyContainer from '../components/StrategyContainer';
import StrategyDetail from '../components/StrategyDetail';

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
  const strategy = flyEliminationStrategies.find(s => s.id === params.id);
  
  if (!strategy) {
    throw new Response("Not Found", { status: 404 });
  }

  return { strategy };
};

export default function StrategyDetailPage() {
  const { strategy } = useLoaderData();

  if (!strategy) {
    return <div>Strategy not found</div>;
  }

  return (
    <StrategyContainer>
      <StrategyDetail strategy={strategy} />
    </StrategyContainer>
  );
}
