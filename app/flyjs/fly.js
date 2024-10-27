import { FlyState } from './constants.js';
import { Vector2D, Vector3D, randomGaussian } from './utils.js';
import { Shit } from './shit.js';
import { Egg } from './egg.js';

console.debug = () => {};
console.log = () => {};

export class Fly {
  constructor(x, y, genetics) {
    console.log('FLY constructor', x, y, genetics);
    this.position = new Vector3D(x, y, 0);
    this.velocity = new Vector3D(0, 0, 0);
    this.acceleration = new Vector3D(0, 0, 0);
    this.state = FlyState.FLYING;
    this.genetics = genetics || this.generateRandomGenetics();
    this.energy = 70;
    this.satiety = 20;
    this.size = 0.5 + Math.random() * 0.5;
    this.shitCarried = 0;
    this.maxSpeed = 200 * this.genetics.speedFactor;
    this.sex = Math.random() < 0.5 ? 'male' : 'female';
    this.hasMated = false;
    this.age = 0;
    this.id = Math.random().toString(36).substr(2, 9);
    this.eatingTime = 0;
  }

  generateRandomGenetics() {
    return {
      speedFactor: randomGaussian(1.5, 0.5),
      energyEfficiency: randomGaussian(1, 0.2),
      shitAttraction: randomGaussian(1, 0.3),
      matingDrive: randomGaussian(1, 0.3),
      eggLayingRate: randomGaussian(1, 0.2),
      maxSize: randomGaussian(1.2, 0.2),
      flightHeight: randomGaussian(150, 50),
      stickiness: randomGaussian(0.5, 0.2),
      aggressiveness: randomGaussian(0.5, 0.2),
    };
  }

  update(world, deltaTime) {
    this.age += deltaTime;
    this.updateState(world);
    this.move(world, deltaTime);
    this.avoidMouse(world, deltaTime);
    this.updateEnergy(deltaTime);
    this.updateSatiety(deltaTime);
    this.leaveTraceShit(world, deltaTime);
    this.tryMating(world, deltaTime);
    this.layEggs(world, deltaTime);
    this.grow(deltaTime);
    this.checkDeath(world);

    console.log(
      'FLY update',
      'ID:', this.id,
      'State:', this.state,
      'Position:', this.position,
      'Velocity:', this.velocity,
      'Energy:', this.energy,
      'Satiety:', this.satiety,
      'Size:', this.size
    );
  }

  updateState(world) {
    const nearbyEntities = world.getNearbyEntities(this.position.x, this.position.y, 200); // Increased detection range
    const nearbyShit = nearbyEntities.find(entity => entity instanceof Shit);
    const nearbyFlies = nearbyEntities.filter(entity => entity instanceof Fly && entity !== this);

    console.debug('updateState', this.state, this.position, this.velocity);

    console.debug('FLY updateState nearbyShit', nearbyShit, nearbyFlies);

    // Log the current state in a human-readable format
    const stateDescriptions = {
      [FlyState.FLYING]: "Flying",
      [FlyState.LANDING]: "Landing",
      [FlyState.WALKING]: "Walking",
      [FlyState.SAMPLING_SHIT]: "Sampling shit",
      [FlyState.EATING_SHIT]: "Eating shit",
      [FlyState.TAKING_OFF]: "Taking off",
      [FlyState.FOLLOWING]: "Following another fly",
      [FlyState.STUCK]: "Stuck"
    };

    if (this.state !== this.previousState) {
      console.log(`Fly ${this.id} state changed to: ${stateDescriptions[this.state] || "Unknown"}`);
      console.log("Position", this.position);
      this.previousState = this.state;
    }

    

    switch (this.state) {
      case FlyState.FLYING:
        if (nearbyShit) {
          const distanceToShit = new Vector2D(this.position.x, this.position.y).subtract(nearbyShit.position).magnitude();
          console.debug('FLY updateState distanceToShit', distanceToShit);
          if (distanceToShit < 20) { // If very close to shit, always land
            this.state = FlyState.LANDING;
            this.targetShit = nearbyShit;
            /*if (Math.random() < 0.1) { // 10% chance to decide to land when shit is nearby
              this.state = FlyState.LANDING;
              this.targetShit = nearbyShit;
            }*/
          }
        } else if (nearbyFlies.length > 0 && Math.random() < 0.05) {
          this.state = FlyState.FOLLOWING;
        } else if (Math.random() < 0.005) {
          this.state = FlyState.LANDING;
        }
        break;
      case FlyState.LANDING:
        console.debug('FLY updateState LANDING', this.position.z);
        if (this.position.z <= 1000) { // Changed from 0 to 1 to ensure the fly actually reaches the ground
          this.position.z = 0;
          this.state = FlyState.WALKING;
        }
        break;
      case FlyState.WALKING:
        if (!this.walkStartTime) {
          this.walkStartTime = Date.now();
          this.walkDurationTarget = Math.random() * 5 + 1; // Random duration between 2 and 5 seconds
        }
        const walkDuration = (Date.now() - this.walkStartTime) / 1000; // Convert to seconds
        
        // Check if directly on shit
        const directlyOnShit = nearbyShit && 
            Math.abs(this.position.x - nearbyShit.position.x) < 1 && 
            Math.abs(this.position.y - nearbyShit.position.y) < 1;
        
        if (directlyOnShit && this.satiety < 20) {
          console.debug('FLY updateState directlyOnShit', this.position, nearbyShit.position);
          this.state = FlyState.SAMPLING_SHIT;
          this.targetShit = nearbyShit;
          this.walkStartTime = null;
          this.walkDurationTarget = null;
          console.debug(`Fly ${this.id} is directly on shit. Changing state to SAMPLING_SHIT.`);
        } else if (walkDuration >= this.walkDurationTarget) {
          if (this.energy > 90 || this.satiety > 90) {
            this.state = FlyState.TAKING_OFF;
            this.walkStartTime = null;
            this.walkDurationTarget = null;
          }
        }
        break;
      case FlyState.SAMPLING_SHIT:
        //throw "SAMPLING_SHIT";
        if (Math.random() < 0.1 && this.satiety < 20) {
          this.state = FlyState.EATING_SHIT;
        }
        break;
      case FlyState.EATING_SHIT:
        if (this.satiety > 90 || !this.targetShit || this.targetShit.isGone()) {
          this.state = FlyState.WALKING;
          this.targetShit = null;
        }
        break;
    }
  }

  move(world, deltaTime) {
    console.debug('FLY move', this.state, this.position, this.velocity);

    if (this.state === FlyState.STUCK) {
      this.updateStuckState(deltaTime);
      return;
    }

    switch (this.state) {
      case FlyState.FLYING:
        this.flyErratically(world, deltaTime);
        break;
      case FlyState.WALKING:
        this.walk(world, deltaTime);
        break;
      case FlyState.LANDING:
        this.land(world, deltaTime);
        break;
      case FlyState.TAKING_OFF:
        this.takeOff(deltaTime);
        break;
      case FlyState.FOLLOWING:
        this.followOtherFly(world, deltaTime);
        break;
      case FlyState.SAMPLING_SHIT:
        this.sampleShit(world, deltaTime);
        break;
      case FlyState.EATING_SHIT:
        this.eatShit(world, deltaTime);
        break;
    }

    console.debug('FLY move middle', this.position, this.velocity);

    // Update position based on velocity
    this.position = this.position.add(this.velocity.multiply(deltaTime));

    // Constrain the fly's position considering its size
    const flySize = this.size * 10; // Assuming the fly's visual size is 10 times its logical size
    this.position.x = Math.max(flySize / 2, Math.min(this.position.x, world.width - flySize / 2));
    this.position.y = Math.max(flySize / 2, Math.min(this.position.y, world.height - flySize / 2));
    this.position.z = Math.max(0, Math.min(this.position.z, world.height));

    console.debug('FLY move after position update', this.position, this.velocity);

    // Bounce off the boundaries if the fly hits them
    const bounceCoefficient = -0.8; // Adjust this value to control the bounciness

    if (this.position.x <= flySize / 2 || this.position.x >= world.width - flySize / 2) {
      this.velocity.x *= bounceCoefficient;
    }

    if (this.position.y <= flySize / 2 || this.position.y >= world.height - flySize / 2) {
      this.velocity.y *= bounceCoefficient;
    }

    if (this.position.z <= 0 || this.position.z >= world.height) {
      this.velocity.z *= bounceCoefficient;
    }

    console.debug('FLY move after bounce', this.position, this.velocity);

    // Add mouse avoidance behavior
    const mouseSpeed = world.getMouseSpeed();
    const distToMouse = new Vector2D(this.position.x, this.position.y).subtract(world.mousePosition).magnitude();
    const detectionRadius = 100 + mouseSpeed * 5; // Increase detection radius based on mouse speed
    if (distToMouse < detectionRadius) {
      const avoidance = new Vector2D(this.position.x, this.position.y).subtract(world.mousePosition).normalize().multiply(1 / distToMouse * 10);
      this.acceleration = this.acceleration.add(new Vector3D(avoidance.x, avoidance.y, 0).multiply(mouseSpeed));
    }

    console.debug('FLY move end', this.position, this.velocity);

    if (isNaN(this.position.z)) {
      throw "nan!!"
    }
  }

  avoidMouse(world, deltaTime) {
    const mouseSpeed = world.getMouseSpeed();
    const distToMouse = new Vector2D(this.position.x, this.position.y).subtract(world.mousePosition).magnitude();
    const detectionRadius = 100 + mouseSpeed * 5; // Increase detection radius based on mouse speed

    if (distToMouse < detectionRadius) {
      const avoidance = new Vector2D(this.position.x, this.position.y).subtract(world.mousePosition).normalize().multiply(1 / distToMouse * 10);
      this.acceleration = this.acceleration.add(new Vector3D(avoidance.x, avoidance.y, 0).multiply(mouseSpeed));

      // Check if the fly is in a state that requires immediate take off
      if (this.state === FlyState.WALKING ||
        this.state === FlyState.EATING_SHIT ||
        this.state === FlyState.SAMPLING_SHIT) {

        console.log(`Fly ${this.id} detected mouse nearby. Switching to take off state.`);
        this.state = FlyState.TAKING_OFF;

        // Add an upward acceleration to simulate take off
        const takeOffForce = new Vector3D(0, 0, 50); // Adjust this value as needed
        this.acceleration = this.acceleration.add(takeOffForce);

        // Reset horizontal velocity to simulate sudden direction change
        this.velocity.x = 0;
        this.velocity.y = 0;
      }
    }
  }

  flyErratically(world, deltaTime) {
    console.debug('FLY flyErratically', this.position, this.velocity, this.acceleration);

    const nearbyShit = world.getNearbyShit(this.position, 2000);
    console.debug('FLY flyErratically nearbyShit', nearbyShit, this.position, this.velocity, this.acceleration);
    const mousePosition = new Vector3D(world.mousePosition.x, world.mousePosition.y, 0);
    const distanceToMouse = this.position.subtract(mousePosition).magnitude();

    let closestShitDistance = Infinity;
    let closestShitDirection = null;
    if (nearbyShit.length > 0) {
      const closestShit = nearbyShit[0];
      const closestShitPosition = new Vector3D(closestShit.position.x, closestShit.position.y, 0);
      console.debug('FLY flyErratically closestShit', closestShit);
      console.debug('FLY flyErratically this.position', this.position);
      closestShitDistance = this.position.subtract(closestShitPosition).magnitude();
      console.debug('FLY flyErratically closestShitDistance', closestShitDistance);
      closestShitDirection = closestShitPosition.subtract(this.position).normalize();
      console.debug('FLY flyErratically closestShitDirection', closestShitDirection);
    }

    const currentDirection = this.velocity.normalize();
    const mouseDirection = mousePosition.subtract(this.position).normalize();

    // Calculate dot products to determine if fly is moving towards shit or mouse
    const dotProductShit = closestShitDirection ? currentDirection.dot(closestShitDirection) : -1;
    const dotProductMouse = currentDirection.dot(mouseDirection);

    // Use dot products to adjust behavior
    if (dotProductShit > 0.7) {
        // Fly is moving towards shit, increase speed
        this.velocity = this.velocity.multiply(1.1);
    }
    if (dotProductMouse > 0.5) {
        // Fly is moving towards mouse, increase avoidance
        const avoidanceForce = mouseDirection.multiply(-1).normalize().multiply(5);
        this.acceleration = this.acceleration.add(avoidanceForce);
    }

    // Calculate change direction probability
    let changeDirectionProbability = 0.05; // Base probability

    // Adjust probability based on proximity to shit or mouse
    //const proximityFactor = Math.min(1, 1 / Math.min(closestShitDistance, distanceToMouse) * 100);
    //changeDirectionProbability += proximityFactor * 0.2;

    // Increase probability of changing direction towards shit
    if (closestShitDirection) {
      changeDirectionProbability *= 1.5;
    }

    console.debug('FLY flyErratically before change direction', this.position, this.velocity, this.acceleration);

    // Chance to change direction
    if (Math.random() < changeDirectionProbability) {
      console.debug('closestShitDirection', closestShitDirection);
      let newDirection;
      if (closestShitDirection && Math.random() < 0.7) { // 70% chance to turn towards shit if it's nearby
        newDirection = closestShitDirection.add(new Vector3D(randomGaussian(0, 0.2), randomGaussian(0, 0.2), randomGaussian(0, 0.1))).normalize();
      } else {
        newDirection = new Vector3D(randomGaussian(0, 1), randomGaussian(0, 1), randomGaussian(0, 0.5)).normalize();
      }
      console.debug('newDirection', newDirection);
      this.velocity = newDirection.multiply(this.velocity.magnitude());
    }

    console.debug('FLY flyErratically after change direction', this.position, this.velocity, this.acceleration);

    // Add a small random acceleration
    const randomAcceleration = new Vector3D(
      randomGaussian(0, 0.1),
      randomGaussian(0, 0.1),
      randomGaussian(0, 0.05)
    );
    //const multiplier = Math.max(0, Math.min(this.genetics.aggressiveness * (1 + proximityFactor), 10));
    //const safeRandomAcceleration = randomAcceleration.multiply(multiplier);
    this.acceleration = this.acceleration.add(randomAcceleration);
    if (isNaN(this.acceleration.x) || isNaN(this.acceleration.y) || isNaN(this.acceleration.z)) {
      throw "nan!!"
    }
    
    console.debug('FLY flyErratically after random acceleration', this.position, this.velocity, this.acceleration);

    // Always add a forward thrust
    const forwardThrust = 2 // * (1 + proximityFactor); // Increase thrust when close to shit or mouse
    this.acceleration = this.acceleration.add(currentDirection.multiply(forwardThrust));

    console.debug('FLY flyErratically after forward thrust', this.position, this.velocity, this.acceleration);

    // Adjust preferred flight height based on container height
    const preferredHeight = Math.min(this.genetics.flightHeight, world.height * 0.8);
    const heightDifference = preferredHeight - this.position.z;
    this.acceleration.z += heightDifference * 0.01;

    console.debug('FLY flyErratically after height difference', this.position, this.velocity, this.acceleration);

    // Attract to shit based on shitAttraction gene
    if (closestShitDirection) {
      const shitAttractionForce = 0.1 * this.genetics.shitAttraction; // Increased base attraction
      this.acceleration = this.acceleration.add(closestShitDirection.multiply(shitAttractionForce));
    }

    console.debug('FLY flyErratically after shit attraction', this.position, this.velocity, this.acceleration);

    // Apply avoidance force for obstacles
    const avoidanceForce = this.calculateAvoidanceForce(world);
    this.acceleration = this.acceleration.add(avoidanceForce);

    console.debug('FLY flyErratically after avoidance force', this.position, this.velocity, this.acceleration);

    // Log acceleration
    console.debug('FLY flyErratically acceleration:', this.acceleration);

    // Ensure acceleration components are finite
    this.acceleration.x = isFinite(this.acceleration.x) ? this.acceleration.x : 0;
    this.acceleration.y = isFinite(this.acceleration.y) ? this.acceleration.y : 0;
    this.acceleration.z = isFinite(this.acceleration.z) ? this.acceleration.z : 0;

    // Update velocity
    this.velocity = this.velocity.add(this.acceleration.multiply(deltaTime));

    console.debug('FLY flyErratically after velocity update', this.position, this.velocity, this.acceleration, deltaTime);

    // Limit speed
    const currentSpeed = this.velocity.magnitude();
    if (currentSpeed > this.maxSpeed) {
      this.velocity = this.velocity.normalize().multiply(this.maxSpeed);
    } else if (currentSpeed < this.maxSpeed * 0.2) {
      // Ensure a minimum speed
      this.velocity = this.velocity.normalize().multiply(this.maxSpeed * 0.2);
    }

    console.debug('FLY flyErratically after speed limit', this.position, this.velocity, this.acceleration);

    // Reset acceleration
    this.acceleration = new Vector3D(0, 0, 0);
  }

  calculateAvoidanceForce(world) {
    const avoidanceRadius = 50; // Adjust this value as needed
    const maxAvoidanceForce = 5; // Adjust this value as needed
    let avoidanceForce = new Vector3D(0, 0, 0);

    // Avoid other flies
    const nearbyFlies = world.flies.filter(fly => 
      fly !== this && fly.position.subtract(this.position).magnitude() < avoidanceRadius
    );
    for (const fly of nearbyFlies) {
      const distance = this.position.subtract(fly.position);
      const length = distance.magnitude();
      if (length < avoidanceRadius) {
        const force = distance.normalize().multiply(maxAvoidanceForce * (1 - length / avoidanceRadius));
        avoidanceForce = avoidanceForce.add(force);
      }
    }

    // Avoid walls
    const distanceToWall = {
      left: this.position.x,
      right: world.width - this.position.x,
      top: this.position.y,
      bottom: world.height - this.position.y,
      front: this.position.z,
      back: world.height - this.position.z
    };

    for (const [direction, distance] of Object.entries(distanceToWall)) {
      if (distance < avoidanceRadius) {
        let force;
        switch (direction) {
          case 'left':
            force = new Vector3D(1, 0, 0);
            break;
          case 'right':
            force = new Vector3D(-1, 0, 0);
            break;
          case 'top':
            force = new Vector3D(0, 1, 0);
            break;
          case 'bottom':
            force = new Vector3D(0, -1, 0);
            break;
          case 'front':
            force = new Vector3D(0, 0, 1);
            break;
          case 'back':
            force = new Vector3D(0, 0, -1);
            break;
        }
        force = force.multiply(maxAvoidanceForce * (1 - distance / avoidanceRadius));
        avoidanceForce = avoidanceForce.add(force);
      }
    }

    return avoidanceForce;
  }

  walk(world, deltaTime) {
    const baseWalkSpeed = 30;
    const maxTurnAngle = Math.PI / 3;
    
    // Find the nearest shit
    const nearbyShit = world.getNearbyShit(this.position, 200);
    let shitDirection = null;
    if (nearbyShit.length > 0) {
      const closestShit = nearbyShit[0];
      console.debug('FLY walk closestShit', closestShit.position);
      shitDirection = new Vector2D(closestShit.position.x - this.position.x, closestShit.position.y - this.position.y).normalize();
      console.debug('FLY walk shitDirection', shitDirection);
    }

    // Implement smoother, more controlled movement
    if (Math.random() < 0.02) { // 2% chance to stop briefly
      this.velocity = new Vector3D(0, 0, 0);
    } else {
      // Gradually change direction
      if (Math.random() < 0.8) { // 10% chance to adjust direction
        let newDirection;
        let shitDirectionChance = 0.05;
        if (this.satiety < 20) {
          shitDirectionChance = 1 - (this.satiety / 100) * 1; // Ranges from 0.1 (full) to 0.9 (empty)
        }
        if (shitDirection && Math.random() < shitDirectionChance) { // 70% chance to turn towards shit if it's nearby
          newDirection = shitDirection.add(new Vector2D(randomGaussian(0, 0.2), randomGaussian(0, 0.2))).normalize();
        } else {
          const turnAngle = (Math.random() - 0.5) * maxTurnAngle;
          const currentDirection = new Vector2D(this.velocity.x, this.velocity.y);
          const cosAngle = Math.cos(turnAngle);
          const sinAngle = Math.sin(turnAngle);
          const newX = currentDirection.x * cosAngle - currentDirection.y * sinAngle;
          const newY = currentDirection.x * sinAngle + currentDirection.y * cosAngle;
          newDirection = new Vector2D(newX, newY).normalize();
        }
        this.velocity = new Vector3D(newDirection.x, newDirection.y, 0).multiply(baseWalkSpeed);
      }
      
      // Add slight speed variation
      const speedVariation = Math.random() * 20 - 10; // Speed varies between -10 and +10 of base speed
      const currentSpeed = this.velocity.magnitude();
      this.velocity = this.velocity.normalize().multiply(currentSpeed + speedVariation);
    }
    
    // Ensure the fly stays on the ground
    this.position.z = 0;
    
    // Add very small random movements to simulate subtle jittery behavior
    const jitter = new Vector3D(randomGaussian(0, 1), randomGaussian(0, 1), 0);
    this.velocity = this.velocity.add(jitter);
    
    // Move the fly based on its velocity
    this.position = this.position.add(this.velocity.multiply(deltaTime));
    
    // Constrain the fly to the world boundaries
    this.position = world.constrainPosition(this.position);
  }

  land(world, deltaTime) {
    console.debug('FLY land', world, deltaTime, this.position);

    if (this.targetShit) {
      console.debug('FLY land targetShit', this.targetShit);

      console.debug('FLY land targetShit position', this.targetShit.position);

      const targetPosition = new Vector3D(this.targetShit.position.x, this.targetShit.position.y, 0);
      const direction = targetPosition.subtract(this.position).normalize();
      this.acceleration = direction.multiply(20); // Increased landing speed
      this.velocity = this.velocity.add(this.acceleration.multiply(deltaTime));
      
      console.debug('FLY land velocity', this.velocity);

      // Ensure the fly descends
      if (this.velocity.z > -50) {
        this.velocity.z = -50;
      }
      
      const distanceToShit = new Vector2D(this.position.x, this.position.y).subtract(this.targetShit.position).magnitude();
      if (distanceToShit < 5 && this.position.z <= 1) {
        this.position.z = 0;
        this.velocity = new Vector3D(0, 0, 0);
        this.state = FlyState.WALKING;
      }
    } else {
      // If no target shit, just descend
      this.velocity.z = -10; // Increased descent speed
    }

    console.debug('FLY land end', this.position, this.velocity);

    if (isNaN(this.position.z)) {
      throw "nan!!"
    }
  }

  takeOff(deltaTime) {
    if (!this.takeOffDuration) {
      this.takeOffDuration = 0;
      this.velocity = new Vector3D(0, 0, 0);
    }

    this.takeOffDuration += deltaTime;

    if (this.takeOffDuration >= 0.1) { // 100ms = 0.1 seconds
      this.state = FlyState.FLYING;
      this.takeOffDuration = null;
      const initialSpeed = Math.min(20, this.maxSpeed);
      this.velocity = new Vector3D(
        randomGaussian(0, 1),
        randomGaussian(0, 1),
        randomGaussian(0, 1)
      ).normalize().multiply(initialSpeed);
    } else {
      // Gradually increase vertical velocity during take-off
      this.velocity.z += deltaTime * 200; // Adjust this value to control take-off speed
      this.velocity.z = Math.min(this.velocity.z, 20);
    }
  }

  followOtherFly(world, deltaTime) {
    const nearbyFlies = world.getNearbyEntities(this.position.x, this.position.y, 50)
      .filter(entity => entity instanceof Fly && entity !== this);
    
    if (nearbyFlies.length > 0) {
      const closestFly = nearbyFlies.reduce((closest, current) => 
        this.position.subtract(current.position).magnitude() < this.position.subtract(closest.position).magnitude() ? current : closest
      );
      const direction = closestFly.position.subtract(this.position).normalize();
      this.acceleration = this.acceleration.add(direction.multiply(0.5));
    } else {
      this.state = FlyState.FLYING;
    }
  }

  updateEnergy(deltaTime) {
    console.debug('FLY updateEnergy', this.energy, this.satiety);

    const energyConsumption = (this.state === FlyState.FLYING ? 2 : 0.5) * deltaTime;
    this.energy -= energyConsumption / this.genetics.energyEfficiency;

    if (this.satiety > 0 && this.energy < 100) {
      this.energy += 5;
      this.satiety -= 5;
    }

    // Ensure energy stays within bounds
    if (this.energy > 100) {
      this.energy = 100;
    }
    if (this.energy < 0) this.energy = 0;

    // And satiety
    if (this.satiety < 0) this.satiety = 0;

    console.debug('FLY updateEnergy end', this.energy, this.satiety);
  }

  updateSatiety(deltaTime) {
    this.satiety -= 0.025 * deltaTime;
    if (this.satiety < 0) this.satiety = 0;
  }

  leaveTraceShit(world, deltaTime) {
    if (this.shitCarried > 0 && Math.random() < 0.005 * deltaTime) {
      const shitAmount = Math.min(this.shitCarried, 0.1);
      world.addShit(new Shit(this.position.x, this.position.y, shitAmount, world));
      this.shitCarried -= shitAmount;
    }
  }

  tryMating(world, deltaTime) {
    if (this.hasMated || this.age < 1000) return;

    const nearbyFlies = world.getNearbyEntities(this.position.x, this.position.y, 20)
      .filter(entity => entity instanceof Fly && entity !== this && entity.sex !== this.sex && !entity.hasMated);

    if (nearbyFlies.length > 0 && Math.random() < 0.05 * this.genetics.matingDrive * deltaTime) {
      this.hasMated = true;
      nearbyFlies[0].hasMated = true;
    }
  }

  layEggs(world, deltaTime) {
    if (this.sex === 'female' && this.hasMated && Math.random() < 0.0005 * this.genetics.eggLayingRate * deltaTime) {
      const eggCount = Math.min(Math.floor(randomGaussian(10, 3)), world.options.MAX_FLIES - world.flies.length);
      for (let i = 0; i < eggCount; i++) {
        const offset = new Vector3D(randomGaussian(0, 5), randomGaussian(0, 5), 0);
        const eggPosition = world.constrainPosition(this.position.add(offset));
        const eggGenetics = this.combineGenetics(this.genetics, this.genetics);
        world.addEgg(new Egg(eggPosition.x, eggPosition.y, eggGenetics));
      }
    }
  }

  combineGenetics(genetics1, genetics2) {
    const combinedGenetics = {};
    for (const [key, value] of Object.entries(genetics1)) {
      combinedGenetics[key] = (value + genetics2[key]) / 2 + randomGaussian(0, 0.1);
    }
    return combinedGenetics;
  }

  grow(deltaTime) {
    if (this.size < this.genetics.maxSize) {
      this.size += 0.00005 * deltaTime;
    }
  }

  sampleShit(world, deltaTime) {
    if (this.targetShit) {
      // Move towards the center of the shit
      const direction = this.targetShit.position.subtract(this.position);
      const distance = direction.magnitude();
      
      if (distance > 0) {
        const normalizedDirection = direction.divide(distance);
        this.velocity = normalizedDirection.multiply(10);
      } else {
        // If the fly is already at the center of the shit, set velocity to zero
        this.velocity = new Vector3D(0, 0, 0);
      }
      // Ensure the fly stays on the ground
      this.position.z = 0;
      
      // Sampling takes time
      this.samplingTime += deltaTime;
      if (this.samplingTime > 2) { // 2 seconds of sampling
        this.samplingTime = 0;
        this.state = FlyState.EATING_SHIT;
      }
    } else {
      this.state = FlyState.WALKING;
    }
  }

  eatShit(world, deltaTime) {
    console.debug('FLY eatShit', this.targetShit, this.energy, this.satiety, deltaTime, world);

    if (this.targetShit) {
      // Stay in place while eating
      this.velocity = new Vector3D(0, 0, 0);
      
      // Eating takes time
      this.eatingTime += deltaTime;
      console.debug('FLY eatShit eatingTime', this.eatingTime);
      if (this.eatingTime > 0.2) { // 0.5 seconds per bite
        this.eatingTime = 0;
        const amountEaten = Math.min(this.targetShit.size, 0.1);
        console.debug('FLY eatShit amountEaten', amountEaten);
        console.debug('FLY eatShit targetShit size', this.targetShit.size);
        this.targetShit.reduceSize(amountEaten);
        this.satiety += amountEaten * 100;
        this.shitCarried += amountEaten * 0.1;
        if (this.satiety > 100) this.satiety = 100;
        console.debug('FLY eatShit satiety', this.satiety);
        console.debug('FLY eatShit shitCarried', this.shitCarried);
        console.debug('FLY eatShit targetShit size after', this.targetShit.size);
        
        /*if (this.targetShit.size <= 0.1) {
          world.removeShit(this.targetShit);
          this.targetShit = null;
          this.state = FlyState.WALKING;
        }*/
      }
    } else {
      this.state = FlyState.WALKING;
    }

    console.debug('FLY eatShit end', this.targetShit, this.energy, this.satiety);
  }

  checkDeath(world) {
    if (this.energy <= 0 || this.age > 10000) {
      world.emit('flyDied', this);
    }
  }

  isDead() {
    return this.energy <= 0 || this.age > 10000;
  }

  checkCollisions(world) {
    const nearbyElements = world.getNearbyElements(this.position.x, this.position.y, 10);
    for (const element of nearbyElements) {
      if (this.position.z < element.height && this.isCollidingWith(element)) {
        this.handleCollision(element);
      }
    }
  }

  isCollidingWith(element) {
    return (
      this.position.x >= element.position.x &&
      this.position.x <= element.position.x + element.width &&
      this.position.y >= element.position.y &&
      this.position.y <= element.position.y + element.height
    );
  }

  handleCollision(element) {
    if (this.state === FlyState.FLYING) {
      // Bounce off the element
      this.velocity = this.velocity.multiply(-0.5);
      this.position.z = Math.max(this.position.z, element.height);
      this.state = FlyState.LANDING;
    } else if (this.state === FlyState.WALKING) {
      // Stay on the element
      this.position.z = element.height;
    }

    // Check if the element is sticky
    if (element.isSticky) {
      this.handleStickyElement(element);
    }
  }

  handleStickyElement(element) {
    if (Math.random() < 0.1) {
      this.state = FlyState.STUCK;
      this.stuckTime = 0;
      this.stuckElement = element;
    }
  }

  updateStuckState(deltaTime) {
    if (this.state === FlyState.STUCK) {
      this.stuckTime += deltaTime;
      if (this.stuckTime > 5 || Math.random() < 0.01) {
        this.state = FlyState.TAKING_OFF;
        this.stuckElement = null;
      }
    }
  }
}
