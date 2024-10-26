import React from 'react';

const blogPosts = [
  {
    id: "fly-psychology-101",
    title: "Fly Psychology 101: Understanding Your Nemesis",
    excerpt: "Dive into the mind of a fly and learn how to outsmart them.",
    content: (
      <>
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Fly Psychology 101: Understanding Your Nemesis</h2>
        <p className="text-gray-300 mb-4">
          Ever wondered what goes on in that tiny fly brain? Let's explore the psychology of our buzzing adversaries and how we can use this knowledge to our advantage.
        </p>
        <h3 className="text-xl font-semibold mb-3 text-yellow-400">1. The Fly's Perception of Time</h3>
        <p className="text-gray-300 mb-4">
          Flies perceive time differently than humans. Their neural responses are much faster, allowing them to react to threats in what seems like superhuman speed to us. This is why they're so hard to catch!
        </p>
        <h3 className="text-xl font-semibold mb-3 text-yellow-400">2. The Attraction to Light</h3>
        <p className="text-gray-300 mb-4">
          Flies are naturally drawn to light sources. This behavior, called positive phototaxis, can be exploited in various fly elimination strategies.
        </p>
        <p className="text-gray-300 mb-4">
          Understanding these aspects of fly psychology can help you become a more effective fly eliminator. Stay tuned for more insights into the fascinating world of fly behavior!
        </p>
      </>
    )
  },
  {
    id: "top-5-fly-free-destinations",
    title: "Top 5 Fly-Free Vacation Destinations",
    excerpt: "Discover paradise without the buzz. Here are our top picks for fly-free getaways.",
    content: (
      <>
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Top 5 Fly-Free Vacation Destinations</h2>
        <p className="text-gray-300 mb-4">
          Tired of battling flies at home? Why not take a vacation to a place where these pesky insects are scarce? Here are our top 5 picks for fly-free destinations:
        </p>
        <ol className="list-decimal list-inside text-gray-300 mb-4">
          <li className="mb-2">Iceland - The land of fire and ice is too cold for most fly species.</li>
          <li className="mb-2">Antarctica - The ultimate fly-free zone. Just watch out for penguins!</li>
          <li className="mb-2">Atacama Desert, Chile - Too dry for flies to thrive.</li>
          <li className="mb-2">Scottish Highlands - The combination of wind and cool temperatures keeps flies at bay.</li>
          <li>Mount Everest Base Camp - High altitude means low fly population.</li>
        </ol>
        <p className="text-gray-300 mb-4">
          Remember, while these destinations may be relatively fly-free, they come with their own unique challenges. Always research thoroughly before planning your trip!
        </p>
      </>
    )
  },
  {
    id: "diy-fly-traps",
    title: "5 DIY Fly Traps You Can Make Today",
    excerpt: "Get crafty with these homemade fly traps that actually work!",
    content: (
      <>
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">5 DIY Fly Traps You Can Make Today</h2>
        <p className="text-gray-300 mb-4">
          Who says fly elimination can't be a fun DIY project? Here are 5 easy-to-make fly traps using common household items:
        </p>
        <ol className="list-decimal list-inside text-gray-300 mb-4">
          <li className="mb-2">The Classic Vinegar Trap: Mix apple cider vinegar with a drop of dish soap in a jar.</li>
          <li className="mb-2">Paper Cone Trap: Place a paper cone in a jar with some bait at the bottom.</li>
          <li className="mb-2">Milk Jug Trap: Cut holes in a milk jug and bait it with something sweet.</li>
          <li className="mb-2">Sticky Tape Mobile: Hang strips of sticky tape from a hanger.</li>
          <li>UV Light Trap: Use a UV light to attract flies to a sticky surface.</li>
        </ol>
        <p className="text-gray-300 mb-4">
          Remember, the key to any good fly trap is patience. Set them up and let them do their work!
        </p>
      </>
    )
  }
];

export default blogPosts;
