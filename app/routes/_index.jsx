import { Link } from "@remix-run/react";
import flyEliminationStrategies from './flyStrategies';

export const meta = () => {
  return [
    { title: "How to Kill a Fly" },
    { name: "description", content: "Explore various methods to eliminate flies effectively." },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-start text-white min-h-screen">
      <ul className="list-none text-left max-w-md mx-auto space-y-4">
        {flyEliminationStrategies.map((strategy, index) => (
          <li key={index}>
            <Link to={`/${strategy.id}`}>
              <div className="border border-yellow-400 p-4 rounded-md bg-gray-800 bg-opacity-75 hover:bg-opacity-100 transition duration-300 ease-in-out transform hover:scale-105">
                <h2 className="text-xl mb-2 font-extrabold text-yellow-400">{strategy.name}</h2>
                <p className="text-gray-300">{strategy.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
