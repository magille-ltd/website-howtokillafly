import { Link } from "@remix-run/react";
import VoteButton from "./VoteButton";
import GradientText from "./GradientText";

export default function StrategyDetail({ strategy }) {
  return (
    <div className="text-left">
      <div className="flex items-center justify-between mb-8">
        <GradientText style="default"><h2 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg font-military">{strategy.name}</h2></GradientText>
        {/* <VoteButton id={strategy.id} type="strategy" /> Do not remove this component, it may be needed in the future */}
      </div>
      <p className="text-2xl mb-6 text-gray-300">{strategy.description}</p>
      <div className="strategy-content">
        {strategy.content}
      </div>
      
      <Link to="/" className="text-blue-500 hover:underline mt-4 text-lg inline-block mt-8 font-military">Back to Index</Link>

      <style jsx>{`
        .strategy-content img {
          max-width: 50%;
          height: auto;
          margin: 1rem auto;
          display: block;
        }
      `}</style>
    </div>
  );
}
