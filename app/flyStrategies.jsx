// for inspiration: https://en.wikipedia.org/wiki/Fly-killing_device

import React from 'react';

const flyEliminationStrategies = [
  {
    id: "fly-swatter",
    name: "Fly Swatter",
    description: "A classic tool for quick and effective fly elimination. Channel your inner ninja with a swift swat!"
  },
  {
    id: "electric-fly-zapper",
    name: "Electric Fly Zapper",
    description: "Zap those flies with a satisfying crackle using an electric fly swatter or zapper."
  },
  {
    id: "cleaning-spray",
    name: "Cleaning Spray",
    description: "Use a cleaning spray to effectively eliminate pesky flies. Ensure proper ventilation and follow safety instructions."
  },
  {
    id: "diy-light-trap",
    name: "DIY Light Trap",
    description: "Build a light-based trap using a lamp and a bowl of soapy water to attract and drown flies."
  },
  {
    id: "sticky-fly-paper",
    name: "Sticky Fly Paper",
    description: "Hang sticky fly paper in areas where flies are prevalent to catch them passively."
  },
  {
    id: "nerf-fly-blaster",
    name: "Nerf Fly Blaster",
    description: "Eliminate flies with precision using a Nerf blaster.",
    hot: true,
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Nerf strat - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Get a nerf blaster. Prefer one of the more accurate models, such as the Elite-series Disruptor.
        </p>

        <img src="/disruptor.png" alt="Nerf Blaster" className="w-full h-auto rounded-md" />

        <p className="text-gray-300 mb-0 mt-8">
          Another great option is the Elite 2.0 series Slyshot paired with X-Shot ammo:
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
          PS. If you score a direct hit on your house fly friend while he's hanging upside down from <i>your</i> roof, be prepared to get him down somehow. It will be difficult to clean all the leftover shit once it dries up. The only reason we have a picture of Robert is because he is still there.
        </p>
      </>
    )
  },
  {
    id: "vacuum-strategy",
    name: "Vacuum Strategy",
    description: "Use a vacuum cleaner to suck up flies, especially effective for fruit flies! Quick, efficient, and satisfying."
  },
  {
    id: "vinegar-soap-trap",
    name: "Vinegar and Soap Trap",
    description: "Create a simple trap using apple cider vinegar and a drop of dish soap. Flies are attracted to the vinegar but can't escape due to the soap."
  },
  {
    id: "hoodie-attack",
    name: "Hoodie Attack",
    description: "Take off your hoodie and use it as a projectile or swatter. Swing it at the fly or throw it for an unexpected aerial attack. A versatile and surprising method that leaves flies confused and outmaneuvered!"
  },
  {
    id: "hand-clap",
    name: "Hand Clap",
    description: "Position your hands above the fly and clap them together quickly. This simple yet effective method uses the element of surprise and your natural tools. Perfect for when you're caught without any equipment!"
  },
  {
    id: "isopropyl-alcohol-spray",
    name: "Isopropyl Alcohol Spray Attack",
    description: "Use a spray bottle filled with isopropyl alcohol to target flies. Caution: Use in a well-ventilated area and remember the spray is flammable."
  },
  {
    id: "newspaper-swat",
    name: "Newspaper Swat",
    description: "Roll up a newspaper tightly and use it as an improvised fly swatter. This classic method combines readily available materials with satisfying sound effects for an eco-friendly fly elimination strategy."
  },
];

export default flyEliminationStrategies;
