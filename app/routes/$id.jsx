import { useParams, Link } from "@remix-run/react";
import flyEliminationStrategies from '../flyStrategies';

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


export default function StrategyDetail() {
  const params = useParams();
  const { id } = params;
  console.log({ params, id });
  const strategy = flyEliminationStrategies.find(s => s.id === id);

  if (!strategy) {
    return <div>Strategy not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start text-white max-w-3xl mx-auto">
      <div className="text-center py-8">
        <h2 className="text-5xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">{strategy.name}</h2>
        <p className="text-2xl mb-6 text-gray-300">{strategy.description}</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 text-lg">Back to Index</Link>
      </div>
    </div>
  );
}
