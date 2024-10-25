import { useParams, Link } from "@remix-run/react";
import flyEliminationStrategies from '../flyStrategies';

export default function StrategyDetail() {
  const params = useParams();
  const { id } = params;
  console.log({ params, id });
  const strategy = flyEliminationStrategies.find(s => s.id === id);

  if (!strategy) {
    return <div>Strategy not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start text-white">
      <div className="text-center py-8">
        <h2 className="text-5xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">{strategy.name}</h2>
        <p className="text-2xl mb-6 text-gray-300">{strategy.description}</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 text-lg">Back to Index</Link>
      </div>
    </div>
  );
}
