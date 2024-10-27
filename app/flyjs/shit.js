import { Vector2D } from './utils.js';

export class Shit {
  constructor(x, y, size, world) {
    console.log('SHIT.js constructor', x, y, size, world);
    this.position = new Vector2D(
      Math.max(0, Math.min(x, world.width)),
      Math.max(0, Math.min(y, world.height))
    );
    this.size = Math.max(0.1, Math.min(size, 1)); // Ensure size is in bounds
    this.smellIntensity = this.size * 10;
    this.decayRate = 0.0001;
    this.angle = Math.random() * Math.PI * 2;
    this.id = Math.random().toString(36).substr(2, 9);
  }

  update(deltaTime) {
    //console.log('SHIT.js update', deltaTime);
    this.decay(deltaTime);
    this.updateSmellIntensity();
  }

  decay(deltaTime) {
    //console.log('SHIT.js decay', this.size, deltaTime);
    this.size *= Math.pow(1 - this.decayRate * 0.1, deltaTime);
    this.size = Math.max(0.1, this.size); // Ensure size doesn't go below 0.1
    //console.log('SHIT.js decay done', this.size);
  }

  updateSmellIntensity() {
    this.smellIntensity = this.size * 10;
    //console.log('SHIT.js updateSmellIntensity', this.size, this.smellIntensity);
    //assert(!isNaN(this.size));
  }

  reduceSize(amount) {
    //console.log('SHIT.js reduceSize', amount);
    this.size = Math.max(0.1, this.size - amount);
    this.updateSmellIntensity();
  }

  isGone() {
    return this.size <= 0.101; // Slightly above 0.1 to account for floating-point precision
  }
}
