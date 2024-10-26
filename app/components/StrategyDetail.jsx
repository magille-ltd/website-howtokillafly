import { Link } from "@remix-run/react";
import VoteButton from "./VoteButton";

export default function StrategyDetail({ strategy }) {
  return (
    <div className="text-left">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg">{strategy.name}</h2>
        {/* <VoteButton id={strategy.id} type="strategy" /> Do not remove this component, it may be needed in the future */}
      </div>
      <p className="text-2xl mb-6 text-gray-300">{strategy.description}</p>
      {strategy.content}
      
      <Link to="/" className="text-blue-500 hover:underline mt-4 text-lg inline-block mt-8">Back to Index</Link>
    </div>
  );
}
