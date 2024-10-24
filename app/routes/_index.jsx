import { Link } from "@remix-run/react";
import flyEliminationStrategies from '../flyStrategies';

export const meta = () => {
  return [
    { title: "How to Kill a Fly" },
    { name: "description", content: "Explore various methods to eliminate flies effectively." },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-start text-white pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {flyEliminationStrategies.map((strategy, index) => (
            <Link to={`/${strategy.id}`} key={index} className="block h-full">
              <div className="h-full border border-yellow-400 p-4 rounded-md bg-gray-800 bg-opacity-75 hover:bg-opacity-100 transition duration-300 ease-in-out transform hover:scale-105 flex flex-col">
                <h2 className="text-xl mb-2 font-extrabold text-yellow-400">{strategy.name}</h2>
                <p className="text-gray-300 flex-grow">{strategy.description}</p>
              </div>
            </Link>
          ))}
        </div>
      
    </div>
  );
}
