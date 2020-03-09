# three-playground

[![test](https://github.com/juliendargelos/three-playground/workflows/test/badge.svg?branch=master)](https://github.com/juliendargelos/three-playground/actions?workflow=test)
[![build](https://github.com/juliendargelos/three-playground/workflows/build/badge.svg?branch=master)](https://github.com/juliendargelos/three-playground/actions?workflow=build)
[![version](https://img.shields.io/github/package-json/v/juliendargelos/three-playground)](https://github.com/juliendargelos/three-playground)

*Three helper for quick prototyping*

[Demo](https://juliendargelos.com/three-playground) ([Source code](https://github.com/juliendargelos/three-playground/blob/master/demo/index.ts))

### Install

**With yarn or npm:**

```bash
yarn add three three-playground
npm install three three-playground --save
```

**Include from unpkg:**

```html
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/three/examples/js/controls/OrbitControls"></script>
<script src="https://unpkg.com/three-playground"></script>

<!-- The playground class is globally available from THREE.Playground !-->
```

### Usage

```javascript
import { Playground } from 'three-playground'

Playground.play({
  // All parameters are optional, these are the default values

  controls: true, // Enable orbit controls
  ambientLight: true, // Add ambient light to the scene
  pointLight: true, // Add point light to the scene
  play: true, // Start the render loop at initialization
  width: 1024, // Width of the canvas (ignored if autosize or fullscreen are se to true)
  height: 512, // Height of the canvas (ignored if autosize or fullscreen are se to true)
  autosize: true, // Autosize the canvas to fill the container on window resize (ignored if fullscreen is set to true)
  fullscreen: true, // Autosize the canvas to fill the screen on window resize
  container: document.body, // Element where the canvas is appended
  renderer: new WebGLRenderer({ antialias: true }), // Renderer to use
  camera: new PerspectiveCamera(), // Camera to use

  initialize() {
    // Initialize and add objects to scene
  },
  
  update() {
    // Update objects at each loop iteration
  },

  resize() {
    // Do stuff on resize
  }
})
```

Each of `initialize`, `update` and `resize` hooks are binded to a `Playground` instance. The playground instance is also passed as parameter:

```typescript
class Playground {
    readonly renderer: WebGLRenderer
    readonly controls: OrbitControls
    readonly camera: Camera
    readonly scene: Scene
    readonly ambientLight: AmbientLight
    readonly pointLight: PointLight
    
    playing: boolean // Equals true when the playground is playing
    elapsed: number // Elapsed time since initialization or last reset() call
    delta: number // Delta time from last loop iteration
    time: number // Time returned by last Date.now() call

    resize(width: number, height: number): void // Resize the renderer and set camera aspect (if perspective camera)
    reset(): void // Reset elapsed time to 0
    play(): void // Start playing
    pause(): void // Stop playing
}
```
