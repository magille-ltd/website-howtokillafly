// for inspiration: https://en.wikipedia.org/wiki/Fly-killing_device
import React from 'react';

const flyEliminationStrategies = [
  {
    id: "fly-swatter",
    name: "Fly Swatter",
    description: "A classic tool for quick and effective fly elimination. Channel your inner ninja with a swift swat!",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Fly Swatter - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Ah, the classic fly swatter. A timeless weapon in the war against winged invaders. Here's how to wield this instrument of fly destruction like a true master:
        </p>

        <p className="text-gray-300 mb-6">
          First, choose your swatter wisely. Opt for one with a long handle for extended reach and a flexible swatting surface for that satisfying *thwap* sound. Now, channel your inner ninja and prepare for battle.
        </p>

        <p className="text-gray-300 mb-6">
          Approach your target with stealth. Flies have compound eyes, giving them an almost 360-degree view, so coming from behind isn't as sneaky as you might think. Instead, move slowly and steadily.
        </p>

        <p className="text-gray-300 mb-6">
          When you're within striking distance, don't aim for where the fly is, but where it's going to be. Flies take off backwards and upwards when startled, so aim slightly above and behind the fly for maximum impact.
        </p>

        <p className="text-gray-300 mb-6">
          Strike with swift, decisive action. A quick, sharp movement is more effective than a slow, powerful one. Remember, you're not trying to smash the fly into oblivion, just deliver a quick, fatal blow.
        </p>

        <p className="text-gray-300 mb-6">
          After your victorious swat, always check the swatter and the surrounding area. Flies are masters of playing dead, and you don't want your nemesis making a miraculous recovery and buzzing off to plot its revenge.
        </p>

        <p className="text-gray-300 mb-6">
          With practice, you'll become the Bruce Lee of fly swatting, striking fear into the hearts of flies everywhere. Just remember, with great power comes great responsibility. Use your skills wisely, and may your aim be true!
        </p>
      </>
    )
  },
  {
    id: "electric-fly-zapper",
    name: "Electric Fly Zapper",
    description: "Zap those flies with a satisfying crackle using an electric fly swatter or zapper.",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Electric Fly Zapper - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Welcome to the future of fly elimination! The electric fly zapper is like a lightsaber for the modern-day Jedi of pest control. Here's how to wield this electrifying weapon:
        </p>

        <p className="text-gray-300 mb-6">
          First, choose your zapper. You've got two main options: the handheld electric fly swatter or the stationary bug zapper. Both have their merits, but for active fly hunting, we recommend the handheld version.
        </p>

        <p className="text-gray-300 mb-6">
          Before you begin, make sure your zapper is fully charged. There's nothing worse than cornering your prey only to have your weapon fizzle out at the crucial moment.
        </p>

        <p className="text-gray-300 mb-6">
          Now, it's hunting time. Approach your target fly with the stealth of a cat. When you're within range, press the activation button. You'll hear a satisfying buzz as electricity courses through the metal grid.
        </p>

        <p className="text-gray-300 mb-6">
          Swing the zapper towards the fly, aiming to make contact with the electrified grid. The moment of truth arrives with a dramatic *ZAP* and a tiny spark. Congratulations, you've just sent that fly to the great bug light in the sky!
        </p>

        <p className="text-gray-300 mb-6">
          Remember, with great power comes great responsibility. Always follow the manufacturer's safety instructions. Keep the zapper away from curious pets and children, and never use it near flammable materials.
        </p>

        <p className="text-gray-300 mb-6">
          With practice, you'll become a fly-zapping dynamo, leaving a trail of electrified insect carcasses in your wake. Just be prepared for the addictive nature of that satisfying *ZAP* - you might find yourself wishing for more flies to hunt!
        </p>
      </>
    )
  },
  {
    id: "cleaning-spray",
    name: "Cleaning Spray",
    description: "Use a cleaning spray to effectively eliminate pesky flies. Ensure proper ventilation and follow safety instructions.",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Cleaning Spray - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Welcome to the world of chemical warfare, where cleaning sprays become the ultimate fly-killing agents. Here's how to wield this potent tool:
        </p>

        <p className="text-gray-300 mb-6">
          First, choose your cleaning spray wisely. Opt for one that's specifically designed for fly elimination, and make sure it's safe for use in your home.
        </p>

        <p className="text-gray-300 mb-6">
          Before you begin, ensure proper ventilation. You don't want to trap yourself and your fly prey in a cloud of toxic fumes.
        </p>

        <p className="text-gray-300 mb-6">
          Now, it's time to unleash the spray. Approach your target fly with caution, and aim for the fly itself. Remember, you're not trying to create a fly-sized cloud of doom, just a targeted strike.
        </p>

        <p className="text-gray-300 mb-6">
          With practice, you'll become a master of the cleaning spray, eliminating flies with ease and precision. Just be prepared for the occasional misfire, and always follow the manufacturer's safety instructions.
        </p>
      </>
    )
  },
  {
    id: "diy-light-trap",
    name: "DIY Light Trap",
    description: "Build a light-based trap using a lamp and a bowl of soapy water to attract and drown flies.",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">DIY Light Trap - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Welcome to the world of DIY fly traps, where creativity meets pest control. Here's how to build your own light-based trap:
        </p>

        <p className="text-gray-300 mb-6">
          First, gather your materials. You'll need a lamp, a bowl of soapy water, and some creativity. Place the lamp near the bowl, and watch as the flies are attracted to the light.
        </p>

        <p className="text-gray-300 mb-6">
          As the flies land on the surface of the water, they'll become trapped and eventually drown. It's a simple yet effective method that's perfect for indoor use.
        </p>

        <p className="text-gray-300 mb-6">
          With practice, you'll become a master of the DIY light trap, eliminating flies with ease and precision. Just be prepared for the occasional misfire, and always follow proper safety precautions.
        </p>
      </>
    )
  },
  {
    id: "sticky-fly-paper",
    name: "Sticky Fly Paper",
    description: "Hang sticky fly paper in areas where flies are prevalent to catch them passively.",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Sticky Fly Paper - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Welcome to the world of sticky fly paper, where flies become trapped in a web of adhesive doom. Here's how to use this passive fly-killing agent:
        </p>

        <p className="text-gray-300 mb-6">
          First, hang the sticky fly paper in areas where flies are prevalent. This could be near food sources, trash cans, or other areas where flies tend to congregate.
        </p>

        <p className="text-gray-300 mb-6">
          As the flies land on the paper, they'll become trapped and eventually die. It's a simple yet effective method that's perfect for indoor use.
        </p>

        <p className="text-gray-300 mb-6">
          With practice, you'll become a master of the sticky fly paper, eliminating flies with ease and precision. Just be prepared for the occasional misfire, and always follow proper safety precautions.
        </p>
      </>
    )
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
    description: "Use a vacuum cleaner to suck up flies, especially effective for fruit flies! Quick, efficient, and satisfying.",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Vacuum Strategy - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Welcome to the world of vacuum-powered fly elimination, where suction becomes the ultimate fly-killing force. Here's how to wield this powerful tool:
        </p>

        <p className="text-gray-300 mb-6">
          First, choose your vacuum wisely. Opt for one with a strong suction power and a gentle touch. You don't want to damage your furniture or harm any other living creatures.
        </p>

        <p className="text-gray-300 mb-6">
          Before you begin, make sure your vacuum is in good working condition. Check the filter, clean the dustbin, and ensure the hose is free from blockages.
        </p>

        <p className="text-gray-300 mb-6">
          Now, it's time to suck up those flies. Approach your target with caution, and aim for the fly itself. Remember, you're not trying to create a fly-sized vortex, just a targeted strike.
        </p>

        <p className="text-gray-300 mb-6">
          With practice, you'll become a master of the vacuum strategy, eliminating flies with ease and precision. Just be prepared for the occasional misfire, and always follow proper safety precautions.
        </p>
      </>
    )
  },
  {
    id: "vinegar-soap-trap",
    name: "Vinegar and Soap Trap",
    description: "Create a simple trap using apple cider vinegar and a drop of dish soap. Flies are attracted to the vinegar but can't escape due to the soap.",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Vinegar and Soap Trap - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Welcome to the world of vinegar and soap traps, where flies become trapped in a sticky web of doom. Here's how to use this passive fly-killing agent:
        </p>

        <p className="text-gray-300 mb-6">
          First, mix equal parts apple cider vinegar and water in a bowl. Add a drop of dish soap and stir gently.
        </p>

        <p className="text-gray-300 mb-6">
          Flies are attracted to the vinegar but can't escape due to the soap. As they land on the surface, they'll become trapped and eventually drown.
        </p>

        <p className="text-gray-300 mb-6">
          With practice, you'll become a master of the vinegar and soap trap, eliminating flies with ease and precision. Just be prepared for the occasional misfire, and always follow proper safety precautions.
        </p>
      </>
    )
  },
  {
    id: "hoodie-attack",
    name: "Hoodie Attack",
    description: "Take off your hoodie and use it as a projectile or swatter. Swing it at the fly or throw it for an unexpected aerial attack. A versatile and surprising method that leaves flies confused and outmaneuvered!",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Hoodie Attack - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Welcome to the world of hoodie attacks, where fashion meets fly elimination. Here's how to wield this versatile tool:
        </p>

        <p className="text-gray-300 mb-6">
          First, take off your hoodie and hold it with a firm grip. You can use it as a projectile or swatter, depending on your preference.
        </p>

        <p className="text-gray-300 mb-6">
          Swing the hoodie at the fly or throw it for an unexpected aerial attack. This method is perfect for when you're caught without any equipment.
        </p>

        <p className="text-gray-300 mb-6">
          With practice, you'll become a master of the hoodie attack, eliminating flies with ease and precision. Just be prepared for the occasional misfire, and always follow proper safety precautions.
        </p>
      </>
    )
  },
  {
    id: "hand-clap",
    name: "Hand Clap",
    description: "Position your hands above the fly and clap them together quickly. This simple yet effective method uses the element of surprise and your natural tools. Perfect for when you're caught without any equipment!",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Hand Clap - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Welcome to the world of hand claps, where simplicity meets fly elimination. Here's how to wield this natural tool:
        </p>

        <p className="text-gray-300 mb-6">
          First, position your hands above the fly. Make sure you're not too close, or you might end up with a face full of fly guts.
        </p>

        <p className="text-gray-300 mb-6">
          Now, clap your hands together quickly. This simple yet effective method uses the element of surprise and your natural tools.
        </p>

        <p className="text-gray-300 mb-6">
          With practice, you'll become a master of the hand clap, eliminating flies with ease and precision. Just be prepared for the occasional misfire, and always follow proper safety precautions.
        </p>
      </>
    )
  },
  {
    id: "isopropyl-alcohol-spray",
    name: "Isopropyl Alcohol Spray Attack",
    description: "Use a spray bottle filled with isopropyl alcohol to target flies. Caution: Use in a well-ventilated area and remember the spray is flammable.",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Isopropyl Alcohol Spray Attack - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Welcome to the world of isopropyl alcohol spray attacks, where chemical warfare meets fly elimination. Here's how to wield this potent tool:
        </p>

        <p className="text-gray-300 mb-6">
          First, fill a spray bottle with isopropyl alcohol. Make sure you're in a well-ventilated area, and remember the spray is flammable.
        </p>

        <p className="text-gray-300 mb-6">
          Now, target the fly with the spray. Aim for the fly itself, and make sure you're not spraying too much, or you might end up with a bigger problem on your hands.
        </p>

        <p className="text-gray-300 mb-6">
          With practice, you'll become a master of the isopropyl alcohol spray attack, eliminating flies with ease and precision. Just be prepared for the occasional misfire, and always follow proper safety precautions.
        </p>
      </>
    )
  },
  {
    id: "newspaper-swat",
    name: "Newspaper Swat",
    description: "Roll up a newspaper tightly and use it as an improvised fly swatter. This classic method combines readily available materials with satisfying sound effects for an eco-friendly fly elimination strategy.",
    content: (
      <>
        <h3 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">Newspaper Swat - How to use this strategy?</h3>

        <p className="text-gray-300 mb-6">
          Welcome to the art of newspaper swatting, where yesterday's news becomes today's weapon of fly destruction. This method is perfect for the eco-warrior who believes in reducing, reusing, and swatting flies into oblivion.
        </p>

        <p className="text-gray-300 mb-6">
          First, select your newspaper. The thicker the better - we're going for durability here. Roll it up tightly, securing it with a rubber band if you're feeling fancy. Congratulations, you've just crafted a lethal weapon from recyclable materials!
        </p>

        <p className="text-gray-300 mb-6">
          Now, channel your inner samurai. Hold your newspaper sword with a firm grip, but keep your wrist loose for maximum swatting speed. Remember, you're not trying to demolish furniture here - finesse is key.
        </p>

        <p className="text-gray-300 mb-6">
          Approach your target fly with the stealth of a ninja. When you're within range, strike swiftly and decisively. Aim for where the fly will be, not where it is - they have a nasty habit of taking off backwards when startled.
        </p>

        <p className="text-gray-300 mb-6">
          The satisfying *THWACK* of newspaper meeting fly is your reward. But don't celebrate too soon! Always double-check for sneaky survivors playing dead. A follow-up swat may be necessary for particularly resilient pests.
        </p>

        <p className="text-gray-300 mb-6">
          Pro tip: After a successful hunt, unfurl your newspaper and scan the obituaries. Who knows, you might just find your vanquished foe's name listed among the dearly departed!
        </p>

        <p className="text-gray-300 mb-6">
          Remember, practice makes perfect. Soon you'll be swatting flies with the precision of a marksman and the flair of a matador. Just be prepared for strange looks from houseguests as you lurk in corners, newspaper at the ready, muttering "Here, fly fly fly..."
        </p>
      </>
    )
  },
];

export default flyEliminationStrategies;
