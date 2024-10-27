import { Vector2D, randomGaussian } from './utils.js';

export class Larva {
  constructor(x, y, genetics) {
    this.position = new Vector2D(x, y);
    this.velocity = new Vector2D(0, 0);
    this.genetics = genetics;
    this.genetics.growthRate = this.genetics.growthRate || randomGaussian(1, 0.2); // Add default if not present
    this.age = 0;
    this.size = 0.1;
    this.energy = 100;
    this.satiety = 50;
    this.metamorphosisTime = 500 + Math.random() * 200;
    this.id = Math.random().toString(36).substr(2, 9);
  }

  update(world, deltaTime) {
    this.age += deltaTime;
    this.move(world, deltaTime);
    this.grow(deltaTime);
    this.updateEnergy(deltaTime);
    this.updateSatiety(deltaTime);
    this.eatShit(world);
  }

  move(world, deltaTime) {
    const moveSpeed = 0.1 * this.size;
    const noise = new Vector2D(randomGaussian(0, 1), randomGaussian(0, 1));
    this.velocity = noise.normalize().multiply(moveSpeed);
    this.position = this.position.add(this.velocity);

    // Constrain the larva's position to the world bounds
    this.position = world.constrainPosition(this.position);
  }

  grow(deltaTime) {
    if (this.satiety > 50) {
      this.size += 0.0005 * this.genetics.growthRate;
      this.satiety -= 0.1;
    }
    if (this.size > 1) this.size = 1;
  }

  updateEnergy(deltaTime) {
    this.energy -= 0.05;
    if (this.energy < 0) this.energy = 0;
    if (this.satiety > 0 && this.energy < 50) {
      this.energy += 0.1;
      this.satiety -= 0.1;
    }
  }

  updateSatiety(deltaTime) {
    this.satiety -= 0.02;
    if (this.satiety < 0) this.satiety = 0;
  }

  eatShit(world) {
    const nearbyShit = world.getNearbyShit(this.position, 10);
    if (nearbyShit.length > 0 && this.satiety < 80) {
      const closestShit = nearbyShit[0];
      const amountEaten = Math.min(closestShit.size, 0.05);
      closestShit.reduceSize(amountEaten);
      this.satiety += amountEaten * 100;
      if (this.satiety > 100) this.satiety = 100;
    }
  }

  isMetamorphosed() {
    return this.age >= this.metamorphosisTime && this.size >= 0.8;
  }

  isDead() {
    return this.energy <= 0;
  }
}
