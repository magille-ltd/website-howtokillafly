We are going to work on some fun shit (literally!)

- treat app/flyjs as if it was a separate library (we might want to make it one later on)
  - meaning: do not add dependencies from flyjs to elsewhere in the code
  - package.json can be shared for now, but we should not really need any deps for flyjs

How I want it to work:
- I should be able to add the script/package easily to my project, import it as a tag and then add that tag to body or main layout, or whatever container it should live in.
- Anything the library adds should stay within the bounds of that parent container

First version:
- We need to model a fly's behavior as a class
  - Essentially a state machine, with some reasonable states like:
    - sampling_shit
    - eating_shit
    - taking_off
    - landing
    - flying
    - walking
  - While flying, a fly should bounce around erratically, just like a real fly would
  - If approached by the mouse cursor, the fly should get scared and fly away
    - This behavior should mimick a real fly: if you approach slowly, you can get close before it detects you. If you move fast, it'll detect you earlier.
  - Fly is attracted to shit. If there is shit on the page (as defined by the world model), the fly can smell it, and fly towards it.
  - The fly can land on shit and start sampling and eating it
  - The fly will also land on other elements on the page and can sample them. Depending on the element, this sampling can take more or less time.
  - The fly should also follow other flies, but also get scared if another flies flies fast by or lands nearby with speed
  - It would be appropriate for many flies to be able to land on the same shit however. So they can enjoy it together.
  - Representation
    - Fly should be represented by and UTF8 fly emoji.
    - While flying, the emoji should be rotated (head is up, it should point in the direction the fly is going)
  - Fly model should have height and speed for the fly.
    - Height should affect the size of the emoji slightly.
    - Consider the height to be a value 0-300cm from the ground, with the page being at level zero.
    - Each element on the page would be considered elevated slightly, so a fly would actually tumble into and bounce of elements if it isn't flying high enough to be able to land on an element.
  - Fly model while executing its tick can question the world model about nearby elements, including shit, which will have a smell a fly will be attracted to
  - Fly should have satiety and energy levels; flying will expend energy. energy will restore when the fly is not flying. walking uses less energy than flying. restoring energy requires burning through food. eating shit lifts the satiety level. satiety level also affects the fly's interest in annoying the user (mouse cursor)
  - Fly should have a modeled amount of shit and pathogens it is carrying in its legs and body
    - If a fly lands on shit, eats shit, walks on shit then this shit level will go up
    - If a shitty fly lands somewhere on the page, it will leave trace amounts of shit, modeled by new shit objects with small sizes. Shit left behind by fly with subtract from the shit its carrying.
  - Flys should have a sex (male, female), and should mate if they come into contact with opposite sex
  - Female fly that has met a male should lay eggs
    - Female should prefer laying the eggs in shit so larvae has something to eat, but can randomly lay them elsewhere
    - Female can lie a realistic amount of eggs (upto some limit in the world)
  - Flies have a modeled size. Eating shit will grow them bigger, to a limit.
  - A new fly will always start small, and grow bigger by landing on and eating shit. A small fly cannot fly quite as fast or far as a bigger one, model this through the max energy and food levels it can have.
  - A fly should have a max size, with some variation.
  - A fly should have some amount of personality when it comes to preferences and behavior
  - Offspring of two flies should inherint the average of its parents behavioral genes
    - this set of genes should affect eggs, larvae, and the eventual fly and can control all aspects of its behavior
- Eggs should be modeled and represent appropriately
- Larvae should be modeled and represented appropriately
  - Larvae should mostly stick to the shit, but can also move slightly
  - Larvae will eat shit, and grow bigger, and ultimately will turn into new flies
- We need a world "model" that will contain
  - all the flies added to the world
  - all the shit added to the world
  - information about elements on the page (this should be parsed from and updated based on the actual dom)
  - information about mouse cursor
  - fly models can query world for the state and information to aid in modeling the behavior and physics
- Finally we need a shit model
  - Shit can appear in random places on the page
  - When a fly eats shit, the shit will get smaller, so shit should have a modelled size
  - Shit is to be presented by poop utf8 emoji and can be rotated and on angles
  - New shit can occasionally rain down from the top of the page, in which case it will land on any element it first hits, and should stop there

AI Implementation Plan (Improved):

1. Project Structure:
   - Create a main `FlyJS` class that will initialize and manage the simulation
   - Implement separate classes for `Fly`, `Egg`, `Larva`, `Shit`, and `World`
   - Use ES6 modules for better organization
   - Add a `constants.js` file for shared constants and enums

2. World Model (world.js):
   - Implement the `World` class to manage the simulation environment
   - Methods for adding/removing flies, eggs, larvae, and shit
   - Methods for querying nearby elements, shit, and other flies
   - Implement mouse cursor tracking
   - Create a method to parse and update DOM element information
   - Add a spatial partitioning system (e.g., quadtree) for efficient proximity queries

3. Fly Model (fly.js):
   - Implement the `Fly` class with properties for state, position, size, energy, satiety, etc.
   - Create a state machine for fly behavior (sampling, eating, taking off, landing, flying, walking)
   - Implement methods for movement, including erratic flying behavior
   - Add methods for interacting with shit, other flies, and DOM elements
   - Implement energy and satiety management
   - Add genetics and personality traits
   - Implement mating and egg-laying behavior
   - Add a method for leaving trace amounts of shit

4. Egg Model (egg.js):
   - Create an `Egg` class with properties for position, age, and genetics
   - Implement hatching behavior
   - Add a method for updating egg state (aging)

5. Larva Model (larva.js):
   - Implement the `Larva` class with properties for size, age, and position
   - Add methods for movement, eating, and growth
   - Implement metamorphosis into a fly
   - Add a method for updating larva state (aging, growing)

6. Shit Model (shit.js):
   - Create a `Shit` class with properties for size, position, and smell intensity
   - Implement methods for size reduction when eaten
   - Add a method for creating trace amounts of shit left by flies
   - Implement a decay mechanism for shit over time

7. Rendering (renderer.js):
   - Implement a `Renderer` class to handle all visual representations
   - Methods for rendering flies, eggs, larvae, and shit using UTF-8 emojis
   - Implement rotation and scaling of emojis based on fly direction and height
   - Add a layer system to manage rendering order (background, shit, flies, UI)

8. Physics (physics.js):
   - Implement basic physics calculations for fly movement
   - Add collision detection with DOM elements and other flies
   - Implement bouncing behavior for flies hitting elements or boundaries

9. Main FlyJS Class (flyjs.js):
   - Create the main `FlyJS` class that initializes the simulation
   - Implement a game loop (requestAnimationFrame) to update and render the simulation
   - Add methods for adding/removing flies and shit
   - Implement the "shit rain" feature
   - Add pause/resume functionality for the simulation

10. Utility Functions (utils.js):
    - Create helper functions for common calculations (e.g., distance between points, random number generation)
    - Implement genetic algorithms for fly traits
    - Add vector math functions for movement calculations

11. Configuration (config.js):
    - Create a configuration file for easily adjustable parameters (e.g., fly speed, energy consumption rates, shit decay rate)
    - Add options for enabling/disabling certain features (e.g., shit rain, mating)

12. Event System (events.js):
    - Implement a simple event system for communication between components
    - Add events for important occurrences (e.g., fly birth, shit appearance, mating)

13. API and Integration:
    - Design a simple API for users to initialize and control the FlyJS simulation
    - Create documentation on how to integrate FlyJS into a web project
    - Implement methods for custom event handling and callbacks

14. Performance Optimization:
    - Implement object pooling for frequently created/destroyed objects (e.g., small shit particles)
    - Use requestIdleCallback for non-critical updates to improve performance

15. Testing:
    - Set up a testing framework (e.g., Jest)
    - Write unit tests for core functionality
    - Implement integration tests for the main FlyJS class

Implementation Steps:

1. Set up the project structure and create empty files for each module
2. Implement the World model with basic functionality and spatial partitioning
3. Create the Fly class with movement and state machine
4. Implement the Shit model with decay mechanism
5. Add rendering capabilities for flies and shit, including the layer system
6. Implement basic physics, collision detection, and bouncing behavior
7. Create the main FlyJS class, game loop, and event system
8. Implement energy and satiety management for flies
9. Add interaction between flies and shit (eating, sampling)
10. Implement egg-laying, larva behavior, and metamorphosis
11. Add genetics and personality traits to flies
12. Implement mating behavior and inheritance
13. Create the "shit rain" feature and trace shit leaving
14. Refine fly behavior (following other flies, reacting to mouse cursor)
15. Implement performance optimizations (object pooling, spatial partitioning)
16. Set up testing framework and write initial tests
17. Create documentation and examples for integration
18. Perform thorough testing and bug fixing
19. Optimize performance further if needed
20. Finalize API and documentation

This improved plan adds more detail to certain aspects, introduces new components like the event system and performance optimizations, and includes a testing phase. The implementation steps are also more detailed and logically ordered to ensure a smooth development process.
