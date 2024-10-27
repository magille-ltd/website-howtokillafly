import { World } from './world.js';
import { Renderer } from './renderer.js';
import { Fly } from './fly.js';
import { Shit } from './shit.js';
import { CONFIG } from './constants.js';

export class FlyJS {
  constructor(container, options = {}) {
    this.container = container;
    this.options = { ...CONFIG, ...options };
    this.world = null;
    this.renderer = null;
    this.isRunning = false;
    this.lastUpdateTime = 0;
    this.debugOverlay = null;
    this.fixedTimeStep = 1 / 30; // 30 fps
    this.accumulator = 0;
    this.uiContainer = null;
    
    this.init();
  }

  init() {
    if (!this.world) {
      this.world = new World(this.container, this.options);
    }
    if (!this.renderer) {
      this.renderer = new Renderer(this.container, this.world, { Fly, Shit });
    }
    this.world.setRenderer(this.renderer); // Set the renderer for the world
    this.addInitialEntities();
    this.createUI();
    this.createDebugOverlay();
  }

  createDebugOverlay() {
    this.debugOverlay = document.createElement('div');
    this.debugOverlay.style.cssText = `
      display: none;
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      max-height: 80vh;
      overflow-y: auto;
    `;
    this.container.appendChild(this.debugOverlay);
  }

  addInitialEntities() {
    for (let i = 0; i < this.options.INITIAL_FLIES; i++) {
      const x = Math.random() * this.world.width;
      const y = Math.random() * this.world.height;
      this.world.addFly(new Fly(x, y, null, this.world));
    }

    for (let i = 0; i < this.options.INITIAL_SHIT; i++) {
      const x = Math.random() * this.world.width;
      const y = Math.random() * this.world.height;
      const size = Math.random() * 0.5 + 0.5;
      this.world.addShit(new Shit(x, y, size, this.world));
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastUpdateTime = performance.now();
      this.gameLoop(this.lastUpdateTime);
    }
  }

  stop() {
    this.isRunning = false;
  }

  gameLoop(currentTime) {
    if (!this.isRunning) return;

    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convert to seconds
    this.accumulator += deltaTime;

    while (this.accumulator >= this.fixedTimeStep) {
      this.update(this.fixedTimeStep);
      this.accumulator -= this.fixedTimeStep;
    }

    this.render();

    this.lastUpdateTime = currentTime;
    //setTimeout(() => {
      requestAnimationFrame(this.gameLoop.bind(this));
    //}, 1000 / 10); // Aim for 60 FPS, adjust as needed
  }

  update(deltaTime) {
    this.world.update(deltaTime);
    this.updateDebugOverlay();
  }

  render() {
    this.renderer.render();
  }

  addFly(x, y) {
    this.world.addFly(new Fly(x, y, null, this.world));
  }

  addShit(x, y, size) {
    const validSize = Math.max(0.1, Math.min(size, 2)); // Ensure size is between 0.1 and 2
    this.world.addShit(new Shit(x, y, validSize, this.world));
  }

  on(event, callback) {
    this.world.on(event, callback);
  }

  off(event, callback) {
    this.world.off(event, callback);
  }

  createUI() {
    if (this.uiContainer) {
      return; // UI already created, skip
    }

    this.uiContainer = document.createElement('div');
    this.uiContainer.className = 'flyjs-ui';
    this.uiContainer.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px;
      border-radius: 5px;
      z-index: 1000;
    `;

    const addFlyButton = document.createElement('button');
    addFlyButton.textContent = 'Add Fly';
    addFlyButton.addEventListener('click', () => {
      const x = Math.random() * this.container.clientWidth;
      const y = Math.random() * this.container.clientHeight;
      this.addFly(x, y);
    });

    const addShitButton = document.createElement('button');
    addShitButton.textContent = 'Add Shit';
    addShitButton.addEventListener('click', () => {
      const x = Math.random() * this.container.clientWidth;
      const y = Math.random() * this.container.clientHeight;
      this.addShit(x, y, Math.random() * 0.8 + 0.2);
    });

    const togglePauseButton = document.createElement('button');
    togglePauseButton.textContent = 'Pause';
    togglePauseButton.addEventListener('click', () => {
      if (this.isRunning) {
        this.stop();
        togglePauseButton.textContent = 'Resume';
      } else {
        this.start();
        togglePauseButton.textContent = 'Pause';
      }
    });

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', () => {
      this.reset();
    });

    this.uiContainer.appendChild(addFlyButton);
    const spacer1 = document.createElement('span');
    spacer1.style.marginRight = '10px';
    this.uiContainer.appendChild(spacer1);
    this.uiContainer.appendChild(addShitButton);
    const spacer2 = document.createElement('span');
    spacer2.style.marginRight = '10px';
    this.uiContainer.appendChild(spacer2);
    this.uiContainer.appendChild(togglePauseButton);
    const spacer3 = document.createElement('span');
    spacer3.style.marginRight = '10px';
    this.uiContainer.appendChild(spacer3);
    this.uiContainer.appendChild(resetButton);

    this.container.appendChild(this.uiContainer);
  }

  reset() {
    this.world.reset();
    this.renderer.reset();
    this.addInitialEntities();
  }

  updateDebugOverlay() {
    let debugInfo = `
      <h3>Debug Info</h3>
      <p>Flies: ${this.world.flies.length}/${this.options.MAX_FLIES}</p>
      <p>Shits: ${this.world.shits.length}/${this.options.MAX_SHIT}</p>
      <p>Eggs: ${this.world.eggs.length}</p>
      <p>Larvae: ${this.world.larvae.length}</p>
      <h4>Flies:</h4>
    `;

    this.world.flies.forEach((fly, index) => {
      debugInfo += `
        <details>
          <summary>Fly ${index + 1}</summary>
          <p>Position: (${fly.position.x.toFixed(2)}, ${fly.position.y.toFixed(2)}, ${fly.position.z.toFixed(2)})</p>
          <p>State: ${fly.state}</p>
          <p>Energy: ${fly.energy.toFixed(2)}</p>
          <p>Satiety: ${fly.satiety.toFixed(2)}</p>
          <p>Size: ${fly.size.toFixed(2)}</p>
          <p>Sex: ${fly.sex}</p>
          <p>Age: ${fly.age.toFixed(2)}</p>
        </details>
      `;
    });

    debugInfo += '<h4>Shits:</h4>';
    this.world.shits.forEach((shit, index) => {
      debugInfo += `
        <details>
          <summary>Shit ${index + 1}</summary>
          <p>Position: (${shit.position.x.toFixed(2)}, ${shit.position.y.toFixed(2)})</p>
          <p>Size: ${shit.size.toFixed(2)}</p>
          <p>Smell Intensity: ${shit.smellIntensity.toFixed(2)}</p>
        </details>
      `;
    });

    this.debugOverlay.innerHTML = debugInfo;
  }
}
