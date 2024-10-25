import { useParams, Link } from "@remix-run/react";
import flyEliminationStrategies from '../flyStrategies';

export default function StrategyDetail() {
  //const params = useParams();
  //const { id } = params;

  const id = "nerf-fly-blaster";
  //console.log({ params, id });
  const strategy = flyEliminationStrategies.find(s => s.id === id);

  if (!strategy) {
    return <div>Strategy not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start text-white">
      <div className="text-center py-8">
        <h2 className="text-5xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">{strategy.name}</h2>
        <p className="text-2xl mb-6 text-gray-300">{strategy.description}</p>

        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Nerf strat - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
        Get a nerf blaster. Prefer one of the more accurate models, such as the Elite-series Disruptor.
        </p>

        <img src="/disruptor.png" alt="Nerf Blaster" className="w-full h-auto rounded-md" />

        <p className="text-gray-300 mb-6">
        Another great option is the Elite 2.0 series Slyshot:
        </p>

        <img src="/slyshot.png" alt="Nerf Blaster" className="w-full h-auto rounded-md" />

        <p className="text-gray-300 mb-6">
        The way to go about using this strat is to sit still and wait. Listen, and pay attention. The fly has to land before long. Usually it will eat shit in some corner of your man cave, in some sense doing you a service, but before long it will land somewhere in sight. Now it's time to act, but do not rush. If you have a steady hand and a good aim, you can kill it from afar. If you are already in a state of rage where you can't stay put and you are literally trembling from anger, take a step, two, three closer. If the f* doesn't figure out you're coming for it, you have a far better chance at hitting it from an arms length.
        </p>

        <p className="text-gray-300 mb-6">
        Here's Robert,
        </p>

        <div className=" p-6 rounded-lg mb-6">
          <div className="mb-4">
            <img 
              src="/robert.png" 
              alt="Robert, a victim of the Nerf Fly Blaster strategy" 
              className="w-full h-auto rounded-md"
            />
          </div>
          <p className="text-gray-300 italic text-center">
            "I ate shit for weeks. I should have kept eating shit. I now regret my life choices."
          </p>
          <p className="text-yellow-400 font-bold text-right mt-2">- Robert</p>
        </div>

        <p className="text-gray-300 mb-6">
        Let him rest in piece.
        </p>

        <p className="text-gray-300 mb-6">
        PS. If you score a direct hit on your house fly friend while he's hanging upside down from the roof, be prepared to get him down somehow. It will be difficult to clean all the leftover shit once it dries up. The only reason we have a picture of Robert is because he is still there.
        </p>

        <Link to="/" className="text-blue-500 hover:underline mt-4 text-lg">Back to Index</Link>
      </div>
    </div>
  );
}
