import { Link } from "@remix-run/react";

export default function StrategyDetail({ strategy }) {
  return (
    <div className="text-center py-8">
      <h2 className="text-5xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">{strategy.name}</h2>
      <p className="text-2xl mb-6 text-gray-300">{strategy.description}</p>
      {strategy.content}
      <Link to="/" className="text-blue-500 hover:underline mt-4 text-lg block mt-8">Back to Index</Link>
    </div>
  );
}
