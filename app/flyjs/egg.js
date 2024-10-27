import { Vector2D } from './utils.js';

export class Egg {
  constructor(x, y, genetics, world) {
    this.position = world.constrainPosition(new Vector2D(x, y));
    this.genetics = genetics;
    this.age = 0;
    this.hatchTime = 100 + Math.random() * 50;
    this.health = 100;
    this.id = Math.random().toString(36).substr(2, 9);
  }

  update(world) {
    this.age++;
    this.updateHealth(world);
  }

  updateHealth(world) {
    const nearbyShit = world.getNearbyShit(this.position, 20);
    if (nearbyShit.length > 0) {
      this.health += 0.1; // Eggs in shit are healthier
    } else {
      this.health -= 0.05; // Eggs not in shit slowly lose health
    }
    this.health = Math.max(0, Math.min(this.health, 100));
  }

  isHatched() {
    return this.age >= this.hatchTime && this.health > 50;
  }

  isDead() {
    return this.health <= 0;
  }
}
