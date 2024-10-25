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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {flyEliminationStrategies.map((strategy, index) => (
          <Link to={`/${strategy.id}`} key={index} className="block h-full">
            <div className="h-full border border-yellow-400 p-4 rounded-md bg-gray-800 bg-opacity-75 hover:bg-opacity-100 transition duration-300 ease-in-out transform hover:scale-105 flex flex-col">
              <h2 className="text-xl mb-2 font-extrabold text-yellow-400">{strategy.name}</h2>
              <p className="text-gray-300 flex-grow">{strategy.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="w-full max-w-2xl space-y-6">
        <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg">
          <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-300 mb-2">
            "Yesterday I was trying to get work done and one of these pesky f* bothered my deep work and set me back at least three hours. I finally managed to kill that f* after a long hunt. I love this directory, it is a testament to me winning that battle."
          </p>
          <p className="text-yellow-400 font-bold">- Me</p>
        </div>

        <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg">
          <div className="flex mb-2">
            <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {[...Array(4)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-gray-600 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-300 mb-2">
            "Think of the flies"
          </p>
          <p className="text-yellow-400 font-bold">- No one ever</p>
          <div className="mt-4 border-t border-gray-700 pt-4">
            <p className="text-red-400 font-bold mb-2">Author's Reply:</p>
            <p className="text-gray-300">
              "HOW DARE YOU ONESTAR MY PROJECT?? I PUT A LOT OF WORK INTO THIS"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
