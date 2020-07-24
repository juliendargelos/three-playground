import {
  Vector2,
  PerspectiveCamera,
  OrthographicCamera,
  WebGLRenderer,
  Scene,
  AmbientLight,
  PointLight,
  BufferGeometry,
  Texture,
  TextureLoader,
  Object3D,
  Group
} from 'three'

import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import CameraControls from 'camera-controls'
import dat from 'dat.gui'
import Stats from 'stats.js'
import installTHREEDatGUI from 'three-dat.gui'
import { EffectComposer, RenderPass } from 'postprocessing'
import { asyncLoad } from '~/utils'

installTHREEDatGUI(dat)
CameraControls.install({ THREE })

type PlaygroundCamera = PerspectiveCamera | OrthographicCamera

type PlaygroundHook<
  Camera extends PlaygroundCamera = PerspectiveCamera,
  Return = void
> = (
  this: Playground<Camera> & { [property: string]: any },
  playground: Playground<Camera> & { [property: string]: any }
) => Return

export interface PlaygroundParameters<
  Camera extends PlaygroundCamera = PerspectiveCamera
> {
  background?: number
  ambientLight?: boolean
  pointLight?: boolean
  controls?: boolean
  play?: boolean
  fps?: number
  gui?: boolean
  stats?: boolean
  width?: number
  height?: number
  autosize?: boolean
  fullscreen?: boolean
  dracoPath?: string
  dracoConfig?: object
  container?: HTMLElement
  camera?: PlaygroundCamera
  renderer?: WebGLRenderer
  composer?: EffectComposer
  initialize?: PlaygroundHook<Camera, Promise<void> | void>
  update?: PlaygroundHook<Camera>
  resize?: PlaygroundHook<Camera>
}

function isPerspectiveCamera(
  camera: PlaygroundCamera
): camera is PerspectiveCamera {
  return (camera as PerspectiveCamera).isPerspectiveCamera
}

function isOthographicCamera(
  camera: PlaygroundCamera
): camera is OrthographicCamera {
  return (camera as OrthographicCamera).isOrthographicCamera
}

export class Playground<Camera extends PlaygroundCamera = PerspectiveCamera>  {
  private frameRequest!: number
  public readonly composer: EffectComposer
  public readonly controls: CameraControls
  public readonly camera: PlaygroundCamera
  public readonly scene = new Scene()
  public readonly ambientLight = new AmbientLight()
  public readonly pointLight = new PointLight()
  public readonly size = new Vector2()
  public readonly hookUpdate: PlaygroundHook<Camera>
  public readonly hookResize: PlaygroundHook<Camera>
  public readonly gui = new dat.GUI()
  public readonly stats = new Stats()
  public readonly textureLoader = new TextureLoader()
  public readonly objLoader = new OBJLoader()
  public readonly gltfLoader = new GLTFLoader()
  public readonly fbxLoader = new FBXLoader()
  public readonly dracoLoader = new DRACOLoader()
  public interval!: number
  public playing: boolean = false
  public elapsed: number = 0
  public delta: number = 0
  public time: number = 0

  public constructor (parameters?: PlaygroundParameters<Camera>)
  public constructor ({
    background = 0x000000,
    ambientLight = true,
    pointLight = true,
    controls = true,
    play = true,
    fps = Infinity,
    gui = true,
    stats =  true,
    width = 1024,
    height = 512,
    autosize = true,
    fullscreen = true,
    dracoPath = '',
    dracoConfig = {},
    container = document.body,
    renderer = new WebGLRenderer({ antialias: true }),
    composer = new EffectComposer(renderer),
    camera = new PerspectiveCamera() as unknown as PlaygroundCamera,
    initialize = () => {},
    update = () => {},
    resize = () => {}
  }: PlaygroundParameters<Camera> = {}) {
    this.gui.hide()
    ;(this.gui.domElement.parentNode! as HTMLElement).style.zIndex = '2'

    this.composer = composer
    this.camera = camera
    this.camera.position.set(0, 2, 4)
    this.fps = fps

    this.dracoLoader.setDecoderPath(dracoPath)
    this.dracoLoader.setDecoderConfig(dracoConfig)
    this.gltfLoader.setDRACOLoader(this.dracoLoader)

    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.renderer.setClearColor(background, 1)
    this.renderer.domElement.style.opacity = '0'
    this.renderer.domElement.style.transition = 'opacity .6s .2s'

    this.controls = new CameraControls(camera, renderer.domElement)
    this.controls.enabled = controls
    this.controls.dollySpeed = 0.2
    this.controls.draggingDampingFactor = 0.1

    this.hookUpdate = update
    this.hookResize = resize

    this.pointLight.position.set(2, 2, 4)
    ambientLight && this.scene.add(this.ambientLight)
    pointLight && this.scene.add(this.pointLight)

    container.style.cursor = 'progress'

    Promise.resolve(initialize.call(this, this)).then(() => {
      if (autosize || fullscreen) {
        this.renderer.domElement.style.width =
        this.renderer.domElement.style.height = '100%'

        if (fullscreen) {
          this.renderer.domElement.style.top =
          this.renderer.domElement.style.left = '0'
          this.renderer.domElement.style.position = 'fixed'
          this.resize(window.innerWidth, window.innerHeight)
          addEventListener('resize', () => this.resize(
            window.innerWidth,
            window.innerHeight
          ), { passive: true })
        } else {
          this.resize(container.offsetWidth, container.offsetHeight)
          addEventListener('resize', () => this.resize(
            container.offsetWidth,
            container.offsetHeight
          ), { passive: true })
        }
      } else {
        this.resize(width, height)
      }

      this.controls.saveState()

      gui = gui && (
        this.gui.__controllers.length ||
        Object.keys(this.gui.__folders).length
      ) as unknown as boolean

      container.appendChild(this.renderer.domElement)
      stats && container.appendChild(this.stats.dom)
      gui && this.gui.show()
      play && this.play()

      container.style.cursor = ''
      this.renderer.domElement.style.opacity = '1'
    })
  }

  public get fps (): number {
    return 1000 / this.interval
  }

  public set fps (fps: number) {
    this.interval = 1000 / fps
  }

  public get renderer (): WebGLRenderer {
    return this.composer.getRenderer()
  }

  public set renderer (renderer: WebGLRenderer) {
    this.composer.replaceRenderer(renderer)
  }

  private tick = (): void => {
    const time = Date.now()
    const delta = time - this.time

    if (delta >= this.interval) {
      this.stats.begin()
      this.delta = delta
      this.elapsed += delta
      this.time = time
      this.controls.update(delta / 1000)
      this.hookUpdate(this)
      this.composer.render(delta)
      this.stats.end()
    }

    this.frameRequest = requestAnimationFrame(this.tick)
  }

  public loadTexture (
    src: string,
    onProgress?: (event: ProgressEvent) => void
  ): Promise<Texture> {
    return asyncLoad(this.textureLoader, src, onProgress)
  }

  public loadOBJ (
    src: string,
    onProgress?: (event: ProgressEvent) => void
  ): Promise<Object3D> {
    return asyncLoad(this.objLoader, src, onProgress)
  }

  public loadGLTF (
    src: string,
    onProgress?: (event: ProgressEvent) => void
  ): Promise<GLTF> {
    return asyncLoad(this.gltfLoader, src, onProgress)
  }

  public loadFBX (
    src: string,
    onProgress?: (event: ProgressEvent) => void
  ): Promise<Group> {
    return asyncLoad(this.fbxLoader, src, onProgress)
  }

  public loadDRACO (
    src: string,
    onProgress?: (event: ProgressEvent) => void
  ): Promise<BufferGeometry> {
    return asyncLoad(this.dracoLoader, src, onProgress)
  }

  public resize(width: number, height: number): void {
    this.size.set(width, height)
    this.composer.setSize(width, height)

    if (isPerspectiveCamera(this.camera)) {
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
    }  else if (isOthographicCamera(this.camera)) {
      this.camera.left = -width / 2
      this.camera.right = width / 2
      this.camera.top = height / 2
      this.camera.bottom = -height / 2
      this.camera.updateProjectionMatrix()
    }

    this.hookResize(this)
  }

  public reset (): void {
    this.elapsed = 0
  }

  public play (): void {
    if (this.playing) return
    this.playing = true
    this.time = Date.now()
    this.tick()
  }

  public pause (): void {
    if (!this.playing) return
    this.playing = true
    cancelAnimationFrame(this.frameRequest)
  }

  public static play<Camera extends PlaygroundCamera = PerspectiveCamera>(
    parameters: PlaygroundParameters<Camera>
  ): Playground<Camera> {
    return new Playground<Camera>(parameters)
  }
}
