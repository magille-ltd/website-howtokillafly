import { Link } from "@remix-run/react";
import GradientText from './GradientText';
import GradientBackground from './GradientBackground';

export default function StrategyCard({ strategy }) {
  return (
    <Link to={`/${strategy.id}`} className="block h-full">
      <GradientBackground className="h-full border border-yellow-400 p-4 sm:p-6 rounded-md bg-gray-800 bg-opacity-75 hover:bg-opacity-100 transition duration-300 ease-in-out transform hover:scale-105 flex flex-col relative">
        {strategy.hot && false && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">HOT</span>
        )}
        {strategy.topReactionEmoji && (
          <span className="absolute -top-1 -right-1 text-xl" title="Top reaction">
            <GradientText style="emoji">{strategy.topReactionEmoji}</GradientText>
          </span>
        )}
        <h2 className="text-xl mb-2 font-extrabold text-yellow-400 mr-7">{strategy.name}</h2>
        <p className="text-gray-300 flex-grow">{strategy.description}</p>
      </GradientBackground>
    </Link>
  );
}
