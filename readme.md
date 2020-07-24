# three-playground

[![test](https://github.com/juliendargelos/three-playground/workflows/test/badge.svg?branch=master)](https://github.com/juliendargelos/three-playground/actions?workflow=test)
[![build](https://github.com/juliendargelos/three-playground/workflows/build/badge.svg?branch=master)](https://github.com/juliendargelos/three-playground/actions?workflow=build)
[![version](https://img.shields.io/github/package-json/v/juliendargelos/three-playground)](https://github.com/juliendargelos/three-playground)

*Three helper for quick prototyping, get rid of common initialization routines*

**Featuring**

- [camera-controls](https://github.com/yomotsu/camera-controls)
- [postprocessing](https://github.com/vanruesc/postprocessing)
- [stats.js](https://github.com/mrdoob/stats.js)
- [dat.gui](https://github.com/dataarts/dat.gui) and [three-dat.gui](https://github.com/SolalDR/three-dat.gui)

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
<script src="https://unpkg.com/three-playground"></script>

<!-- The playground class is globally available as THREE.Playground !-->
```

### Usage

Basic example:

```typescript
import { Playground } from 'three-playground'

Playground.play({
  async initialize () {
    this.model = (await this.loadGLTF('model.gltf')).scene
    this.gui.addObject3D ('model', this.model)
    this.scene.add(this.model)
  },

  update () {
    this.model.rotation.y += this.delta / 1000
  }
})
```

All available parameters:

```typescript
import { Playground } from 'three-playground'

Playground.play({
  // All parameters are optional, these are the default values

  background: 0x000000, // Renderer clear color
  controls: true, // Enable orbit controls
  ambientLight: true, // Add ambient light to the scene
  pointLight: true, // Add point light to the scene
  play: true, // Start the render loop at initialization
  fps: Infinity, // Number of frames per second while playing
  stats: true, // Display performance monitor
  gui: true, // Display gui controller
  width: 1024, // Width of the canvas (ignored if autosize or fullscreen are se to true)
  height: 512, // Height of the canvas (ignored if autosize or fullscreen are se to true)
  dracoPath: '', // Path to draco decoder (used in DRACOLoader and GLTFLoader if provided)
  dracoConfig: {}, // Config of draco decoder
  autosize: true, // Autosize the canvas to fill the container on window resize (ignored if fullscreen is set to true)
  fullscreen: true, // Autosize the canvas to fill the screen on window resize
  container: document.body, // Element where the canvas is appended
  renderer: new WebGLRenderer({ antialias: true }), // Renderer to use
  composer: new EffectComposer(/* renderer */), // Composer to use
  camera: new PerspectiveCamera(), // Camera to use

  async initialize () {
    // Initialize and add objects to scene
    // optionnaly asynchronous so you can load assets before rendering starts
  },
  
  update () {
    // Update objects at each loop iteration
  },

  resize () {
    // Do stuff on resize
  }
})
```

Each of `initialize`, `update` and `resize` hooks are binded to a `Playground` instance (the instance is also passed as parameter):

```typescript
class Playground<PlaygroundCamera extends PerspectiveCamera | OrthographicCamera> {
    readonly renderer: WebGLRenderer
    readonly composer: EffectComposer
    readonly controls: Cameracontrols
    readonly camera: PlaygroundCamera
    readonly scene: Scene
    readonly ambientLight: AmbientLight
    readonly pointLight: PointLight
    readonly gui: dat.GUI
    readonly stats: Stats
    
    playing: boolean // Equals true when the playground is playing
    elapsed: number // Elapsed time since initialization or last reset() call
    delta: number // Delta time from last loop iteration
    time: number // Time returned by last Date.now() call
    fps: number // Number of frames per second while playing

    resize (width: number, height: number): void // Resize the renderer and set camera aspect (if perspective) or boundaries (if orthographic)
    reset (): void // Reset elapsed time to 0
    play (): void // Start playing
    pause (): void // Stop playing

    // Async helper methods for asset loading
    loadTexture (src: string, onProgress?: (event: ProgressEvent) => void): Promise<Texture>
    loadOBJ (src: string, onProgress?: (event: ProgressEvent) => void): Promise<Object3D>
    loadGLTF (src: string, onProgress?: (event: ProgressEvent) => void): Promise<GLTF>
    loadFBX (src: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>
    loadDRACO (src: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>
}
```
