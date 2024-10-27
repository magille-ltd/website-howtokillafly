import { Fly } from './fly.js';
import { Shit } from './shit.js';
import { Egg } from './egg.js';
import { Larva } from './larva.js';
import { QuadTree } from './quadtree.js';
import { Vector2D, Vector3D, randomGaussian } from './utils.js';
import { EventEmitter } from './events.js';

export class World extends EventEmitter {
  constructor(container, options) {
    super();
    this.container = container;
    this.options = options;
    this.safetyBoundary = 40;
    this.width = container.clientWidth - this.safetyBoundary;
    this.height = container.clientHeight - this.safetyBoundary;
    this.flies = [];
    this.shits = [];
    this.eggs = [];
    this.larvae = [];
    this.domElements = [];
    this.quadtree = new QuadTree(0, 0, this.width, this.height);
    this.mousePosition = new Vector2D(0, 0);
    this.mouseVelocity = new Vector2D(0, 0);
    this.lastMousePosition = new Vector2D(0, 0);
    this.lastUpdateTime = performance.now();
    this.lastDebugTime = 0;
    this.renderer = null; // Initialize renderer as null

    this.updateDimensions();
    this.setupMouseTracking();
    this.parseDOMElements();

    // Add an event listener for container resizing
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  setRenderer(renderer) {
    this.renderer = renderer;
  }

  updateDimensions() {
    this.width = this.container.clientWidth - this.safetyBoundary;
    this.height = this.container.clientHeight - this.safetyBoundary;
    this.quadtree = new QuadTree(0, 0, this.width, this.height);
    this.updateQuadtree();
  }

  setupMouseTracking() {
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.lastMousePosition = new Vector2D(this.mousePosition.x, this.mousePosition.y);
      this.mousePosition.x = e.clientX - rect.left;
      this.mousePosition.y = e.clientY - rect.top;
      this.mouseVelocity = this.mousePosition.subtract(this.lastMousePosition);
    });
  }

  parseDOMElements() {
    const elements = this.container.querySelectorAll('*');
    elements.forEach(element => {
      if (element !== this.container && !this.container.contains(element)) return;
      const rect = element.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();
      this.domElements.push({
        element: element,
        position: new Vector2D(rect.left - containerRect.left, rect.top - containerRect.top),
        width: rect.width,
        height: rect.height,
        isSticky: element.dataset.sticky === 'true'
      });
    });
  }

  addFly(fly) {
    console.log('WORLD addFly', fly);
    if (this.flies.length < this.options.MAX_FLIES) {
      fly.position = this.constrainPosition(fly.position);
      this.flies.push(fly);
      this.quadtree.insert(fly);
      this.emit('flyAdded', fly);
      /*if (this.renderer) {
        this.renderer.addFlyElement(fly);
      }*/
    }
  }

  addShit(shit) {
    if (this.shits.length < this.options.MAX_SHIT) {
      shit.position = this.constrainPosition(shit.position);
      this.shits.push(shit);
      this.quadtree.insert(shit);
      this.emit('shitAdded', shit);
      /*if (this.renderer) {
        this.renderer.addShitElement(shit);
      }*/
    }
  }

  addEgg(egg) {
    egg.position = this.constrainPosition(egg.position);
    this.eggs.push(egg);
    this.quadtree.insert(egg);
    this.emit('eggLaid', egg);
  }

  addLarva(larva) {
    larva.position = this.constrainPosition(larva.position);
    this.larvae.push(larva);
    this.quadtree.insert(larva);
    this.emit('larvaHatched', larva);
  }

  update() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convert to seconds
    this.lastUpdateTime = currentTime;

    this.updateFlies(deltaTime);
    this.updateShits(deltaTime);
    this.updateEggs(deltaTime);
    this.updateLarvae(deltaTime);
    this.shitRain(deltaTime);

    // Debug logging
    if (currentTime - this.lastDebugTime > 5000) { // Every 5 seconds
      this.debugLog();
      this.lastDebugTime = currentTime;
    }
  }

  updateFlies(deltaTime) {
    for (const fly of this.flies) {
      fly.update(this, deltaTime);
      fly.checkCollisions(this);
    }
    this.flies = this.flies.filter(fly => !fly.isDead());
  }

  updateShits(deltaTime) {
    for (const shit of this.shits) {
      shit.update(deltaTime);
    }
    
    const removedShits = this.shits.filter(shit => shit.isGone());
    this.shits = this.shits.filter(shit => !shit.isGone());
    removedShits.forEach(shit => {
      this.emit('shitRemoved', shit);
    });

    // Rebuild the quadtree after removing shits
    this.updateQuadtree();
  }

  updateEggs(deltaTime) {
    for (const egg of this.eggs) {
      egg.update(this, deltaTime);
      if (egg.isHatched()) {
        this.addLarva(new Larva(egg.position.x, egg.position.y, egg.genetics));
        this.eggs = this.eggs.filter(e => e !== egg);
      }
    }
  }

  updateLarvae(deltaTime) {
    for (const larva of this.larvae) {
      larva.update(this, deltaTime);
      if (larva.isMetamorphosed()) {
        this.addFly(new Fly(larva.position.x, larva.position.y, larva.genetics));
        this.larvae = this.larvae.filter(l => l !== larva);
      }
    }
  }

  updateQuadtree() {
    this.quadtree.clear();
    for (const entity of [...this.flies, ...this.shits, ...this.eggs, ...this.larvae]) {
      if (entity.position && typeof entity.position.x === 'number' && typeof entity.position.y === 'number') {
        this.quadtree.insert(entity);
      } else {
        console.warn('Invalid entity position:', entity);
      }
    }
  }

  getNearbyElements(x, y, radius) {
    const range = {
      x: x - radius,
      y: y - radius,
      width: radius * 2,
      height: radius * 2
    };
    return this.quadtree.query(range).filter(entity => entity.element);
  }

  getNearbyShit(position, radius) {
    return this.getNearbyEntities(position.x, position.y, radius)
      .filter(entity => entity instanceof Shit);
  }

  getNearbyEntities(x, y, radius) {
    const range = {
      x: x - radius,
      y: y - radius,
      width: radius * 2,
      height: radius * 2
    };
    //console.log('Querying quadtree with range:', range);
    const potentialNearbyEntities = this.quadtree.query(range);
    //console.log('Quadtree query returned:', potentialNearbyEntities.length, 'entities', potentialNearbyEntities);
    
    // Filter entities within the circular radius
    const nearbyEntities = potentialNearbyEntities.filter(entity => {
      const distance = Math.sqrt(
        Math.pow(entity.position.x - x, 2) + 
        Math.pow(entity.position.y - y, 2)
      );
      return distance <= radius;
    });

    //console.log(`Found ${nearbyEntities.length} entities near (${x}, ${y}) within radius ${radius}`);
    
    return nearbyEntities;
  }

  shitRain(deltaTime) {
    if (Math.random() < 0.001 * deltaTime && this.shits.length < this.options.MAX_SHIT) {
      const x = Math.random() * this.width;
      const y = 0;
      const size = Math.random() * 19.5 + 0.5; // Random size between 0.5 and 20 (this is a factor, shit object can decide the actual size)
      const shit = new Shit(x, y, size, this);
      this.addShit(shit);
    }
  }

  getRandomLandingSpot() {
    const element = this.domElements[Math.floor(Math.random() * this.domElements.length)];
    return new Vector2D(
      Math.min(element.position.x + Math.random() * element.width, this.width),
      Math.min(element.position.y + Math.random() * element.height, this.height)
    );
  }

  getMouseSpeed() {
    return this.mouseVelocity.magnitude();
  }

  constrainPosition(position) {
    return new Vector3D(
      Math.max(0, Math.min(position.x, this.width)),
      Math.max(0, Math.min(position.y, this.height)),
      Math.max(0, Math.min(position.z, this.height))
    );
  }

  debugLog() {
    console.log('World State:');
    console.log('Flies:', this.flies.map(fly => ({
      id: fly.id,
      position: fly.position,
      state: fly.state,
      energy: fly.energy,
      satiety: fly.satiety,
      size: fly.size,
      sex: fly.sex,
      age: fly.age
    })));
    console.log('Shits:', this.shits.map(shit => ({
      id: shit.id,
      position: shit.position,
      size: shit.size,
      smellIntensity: shit.smellIntensity
    })));
    console.log('Eggs:', this.eggs.map(egg => ({
      id: egg.id,
      position: egg.position,
      age: egg.age,
      health: egg.health
    })));
    console.log('Larvae:', this.larvae.map(larva => ({
      id: larva.id,
      position: larva.position,
      size: larva.size,
      age: larva.age,
      energy: larva.energy,
      satiety: larva.satiety
    })));
    console.log('Mouse Position:', this.mousePosition);
    console.log('Mouse Velocity:', this.mouseVelocity);
  }

  reset() {
    this.flies = [];
    this.shits = [];
    this.eggs = [];
    this.larvae = [];
    this.updateQuadtree();
  }
}
