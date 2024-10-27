import { FlyState } from './constants.js';
import { Fly } from './fly.js';
import { Shit } from './shit.js';

export class Renderer {
  constructor(container, world) {
    this.container = container;
    this.world = world;
    this.flyLayer = document.createElement('div');
    this.shitLayer = document.createElement('div');
    this.eggLayer = document.createElement('div');
    this.larvaLayer = document.createElement('div');
    
    this.detailsOverlay = this.createDetailsOverlay();
    this.container.appendChild(this.detailsOverlay);
    
    this.setupLayers();
    this.setupEventListeners();

    // Add an event listener for container resizing
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this.setupLayers();
  }

  setupLayers() {
    const layerStyle = `position: absolute; top: 0; left: 0; width: ${this.world.width}px; height: ${this.world.height}px; pointer-events: none;`;
    this.shitLayer.style.cssText = layerStyle + 'z-index: 10;';
    this.eggLayer.style.cssText = layerStyle + 'z-index: 20;';
    this.larvaLayer.style.cssText = layerStyle + 'z-index: 30;';
    this.flyLayer.style.cssText = layerStyle + 'z-index: 40;';

    this.container.appendChild(this.shitLayer);
    this.container.appendChild(this.eggLayer);
    this.container.appendChild(this.larvaLayer);
    this.container.appendChild(this.flyLayer);
  }

  setupEventListeners() {
    this.world.on('flyAdded', fly => this.addFlyElement(fly));
    this.world.on('shitAdded', shit => this.addShitElement(shit));
    this.world.on('eggLaid', egg => this.addEggElement(egg));
    this.world.on('larvaHatched', larva => this.addLarvaElement(larva));
    this.world.on('flyDied', fly => this.removeFlyElement(fly));
    this.world.on('shitRemoved', shit => this.removeShitElement(shit));
  }

  createDetailsOverlay() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: absolute;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: Arial, sans-serif;
      font-size: 12px;
      pointer-events: none;
      display: none;
      z-index: 1000;
    `;
    return overlay;
  }

  showDetailsOverlay(entity, x, y) {
    let details = '';
    if (entity instanceof Fly) {
      details = `
        <h3>Fly Details</h3>
        <p>State: ${entity.state}</p>
        <p>Energy: ${entity.energy.toFixed(2)}</p>
        <p>Satiety: ${entity.satiety.toFixed(2)}</p>
        <p>Size: ${entity.size.toFixed(2)}</p>
        <p>Sex: ${entity.sex}</p>
        <p>Age: ${entity.age.toFixed(2)}</p>
      `;
    } else if (entity instanceof Shit) {
      details = `
        <h3>Shit Details</h3>
        <p>Size: ${entity.size.toFixed(2)}</p>
        <p>Smell Intensity: ${entity.smellIntensity.toFixed(2)}</p>
      `;
    }

    this.detailsOverlay.innerHTML = details;
    this.detailsOverlay.style.display = 'block';
    this.detailsOverlay.style.left = `${x + 10}px`;
    this.detailsOverlay.style.top = `${y + 10}px`;
  }

  hideDetailsOverlay() {
    this.detailsOverlay.style.display = 'none';
  }

  addFlyElement(fly) {
    const flyContainer = document.createElement('div');
    flyContainer.className = 'fly-container';
    flyContainer.dataset.id = fly.id;
    flyContainer.style.cssText = `
      position: absolute;
      transform-origin: center;
      pointer-events: none;
      z-index: 50;
    `;

    const flyElement = document.createElement('div');
    flyElement.textContent = '🪰';
    flyElement.className = 'fly';
    flyElement.style.cssText = `
      position: absolute;
      transform-origin: center;
      transition: transform 0.1s ease-out;
    `;
    
    flyContainer.appendChild(flyElement);
    
    flyContainer.addEventListener('mouseover', (e) => {
      this.showDetailsOverlay(fly, e.clientX, e.clientY);
    });
    
    flyContainer.addEventListener('mouseout', () => {
      this.hideDetailsOverlay();
    });
    
    this.flyLayer.appendChild(flyContainer);
  }

  addShitElement(shit) {
    const shitElement = document.createElement('div');
    shitElement.textContent = '💩';
    shitElement.className = 'shit';
    shitElement.dataset.id = shit.id;
    shitElement.style.cssText = `
      position: absolute;
      transform-origin: center;
      pointer-events: none;
    `;
    
    shitElement.addEventListener('mouseover', (e) => {
      this.showDetailsOverlay(shit, e.clientX, e.clientY);
    });
    
    shitElement.addEventListener('mouseout', () => {
      this.hideDetailsOverlay();
    });
    
    this.shitLayer.appendChild(shitElement);
    
    // Immediately update the shit's position and appearance
    this.updateShitElement(shit, shitElement);
  }

  addEggElement(egg) {
    const eggElement = document.createElement('div');
    eggElement.textContent = '🥚';
    eggElement.className = 'egg';
    eggElement.dataset.id = egg.id;
    this.eggLayer.appendChild(eggElement);
  }

  addLarvaElement(larva) {
    const larvaElement = document.createElement('div');
    larvaElement.textContent = '🐛';
    larvaElement.className = 'larva';
    larvaElement.dataset.id = larva.id;
    this.larvaLayer.appendChild(larvaElement);
  }

  removeFlyElement(fly) {
    const flyElement = this.flyLayer.querySelector(`[data-id="${fly.id}"]`);
    if (flyElement) {
      flyElement.remove();
    }
  }

  removeShitElement(shit) {
    const shitElement = this.shitLayer.querySelector(`[data-id="${shit.id}"]`);
    if (shitElement) {
      shitElement.remove();
    }
  }

  render() {
    this.updateFlies();
    this.updateShit();
    this.updateEggs();
    this.updateLarvae();
  }

  updateFlies() {
    for (const fly of this.world.flies) {
      const flyContainer = this.flyLayer.querySelector(`[data-id="${fly.id}"]`);
      if (flyContainer) {
        const flyElement = flyContainer.querySelector('.fly');
        
        // Calculate scale based on z-position, but limit the range
        const minScale = 0.5;  // Minimum scale to ensure visibility
        const maxScale = 1.5;  // Maximum scale to prevent flies from becoming too large
        const scale = Math.max(minScale, Math.min(maxScale, 1 - (fly.position.z / this.world.height) * 0.5));
        
        // Update container position
        flyContainer.style.left = `${(fly.position.x / this.world.width) * 100}%`;
        flyContainer.style.top = `${(fly.position.y / this.world.height) * 100}%`;
        
        // Update fly rotation and scale
        let angle = Math.atan2(fly.velocity.y, fly.velocity.x);
        // Adjust angle to make the fly face its movement direction
        angle += Math.PI / 2;
        
        flyElement.style.transform = `rotate(${angle}rad) scale(${scale})`;
        
        // Adjust base size and limit the range
        const minSize = 10;  // Minimum size in pixels
        const maxSize = 30;  // Maximum size in pixels
        const baseSize = 20;  // Base size in pixels
        const size = Math.max(minSize, Math.min(maxSize, fly.size * baseSize));
        flyElement.style.fontSize = `${size}px`;
        
        // Adjust opacity based on z-position, but ensure it never becomes fully transparent
        flyElement.style.opacity = Math.max(0.5, 1 - fly.position.z / this.world.height);

        // Add visual effect for stuck flies
        if (fly.state === FlyState.STUCK) {
          flyElement.style.filter = 'grayscale(100%)';
        } else {
          flyElement.style.filter = 'none';
        }
      }
    }
  }

  updateShit() {
    for (const shit of this.world.shits) {
      const shitElement = this.shitLayer.querySelector(`[data-id="${shit.id}"]`);
      if (shitElement) {
        this.updateShitElement(shit, shitElement);
      }
    }
  }

  updateEggs() {
    for (const egg of this.world.eggs) {
      const eggElement = this.eggLayer.querySelector(`[data-id="${egg.id}"]`);
      if (eggElement) {
        eggElement.style.transform = `translate(${egg.position.x}px, ${egg.position.y}px)`;
      }
    }
  }

  updateLarvae() {
    for (const larva of this.world.larvae) {
      const larvaElement = this.larvaLayer.querySelector(`[data-id="${larva.id}"]`);
      if (larvaElement) {
        larvaElement.style.transform = `translate(${larva.position.x}px, ${larva.position.y}px)`;
        larvaElement.style.fontSize = `${larva.size * 15}px`;
      }
    }
  }

  addCollisionEffect(position) {
    const effectElement = document.createElement('div');
    effectElement.className = 'collision-effect';
    effectElement.style.cssText = `
      position: absolute;
      left: ${position.x}px;
      top: ${position.y}px;
      width: 10px;
      height: 10px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
    `;
    this.container.appendChild(effectElement);

    setTimeout(() => {
      effectElement.remove();
    }, 500);
  }

  // New helper method to update a single shit element
  updateShitElement(shit, shitElement) {
    shitElement.style.left = `${(shit.position.x / this.world.width) * 100}%`;
    shitElement.style.top = `${(shit.position.y / this.world.height) * 100}%`;

    const minSize = 10;
    const maxSize = 100;
    const baseSize = 100;
    const size = Math.max(minSize, Math.min(maxSize, shit.size * baseSize));
    //console.log('updateShitElement', shit.size, size);
    shitElement.style.fontSize = `${size}px`;

    // Update transform to rotate around the center
    shitElement.style.transformOrigin = 'center center';
    shitElement.style.transform = `translate(-50%, -50%) rotate(${shit.angle}rad)`;
  }

  reset() {
    this.shitLayer.innerHTML = '';
    this.eggLayer.innerHTML = '';
    this.larvaLayer.innerHTML = '';
    this.flyLayer.innerHTML = '';
  }
}
