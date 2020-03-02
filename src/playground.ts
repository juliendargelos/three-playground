import {
  Camera,
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  AmbientLight,
  PointLight
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type PlaygroundHook = (
  this: Playground & { [property: string]: any },
  playground: Playground & { [property: string]: any }
) => void

export interface PlaygroundParameters {
  controls?: boolean
  ambientLight?: boolean
  pointLight?: boolean
  play?: boolean
  autosize?: boolean
  fullscreen?: boolean
  width?: number
  height?: number
  container?: HTMLElement
  camera?: Camera
  renderer?: WebGLRenderer
  initialize?: PlaygroundHook
  update?: PlaygroundHook
  resize?: PlaygroundHook
}

function isPerspectiveCamera(camera: Camera): camera is PerspectiveCamera {
  return (camera as PerspectiveCamera).isPerspectiveCamera
}

export class Playground {
  private frameRequest!: number
  public readonly renderer: WebGLRenderer
  public readonly controls: OrbitControls
  public readonly camera: Camera
  public readonly scene: Scene = new Scene()
  public readonly ambientLight: AmbientLight = new AmbientLight()
  public readonly pointLight: PointLight = new PointLight()
  public readonly onupdate: PlaygroundHook
  public readonly onresize: PlaygroundHook
  public playing: boolean = false
  public elapsed: number = 0
  public delta: number = 0
  public time: number = 0

  public constructor(parameters: PlaygroundParameters)
  public constructor({
    controls = true,
    ambientLight = true,
    pointLight = true,
    play = true,
    width = 1024,
    height = 512,
    autosize = true,
    fullscreen = true,
    container = document.body,
    renderer = new WebGLRenderer({ antialias: true }),
    camera = new PerspectiveCamera(),
    initialize = undefined,
    update = () => {},
    resize = () => {}
  }: PlaygroundParameters = {}) {
    this.renderer = renderer
    this.camera = camera
    this.camera.position.set(0, 2, -4)

    this.controls = new OrbitControls(camera, renderer.domElement)
    this.controls.enabled = controls
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.1
    this.controls.zoomSpeed = 0.5

    this.onupdate = update
    this.onresize = resize

    ambientLight && this.scene.add(this.ambientLight)
    pointLight && this.scene.add(this.pointLight)
    this.pointLight.position.set(2, 2, -4)

    initialize && initialize.call(this, this)
    container && container.appendChild(renderer.domElement)

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
      } else if (container) {
        this.resize(container.offsetWidth, container.offsetHeight)
        addEventListener('resize', () => this.resize(
          container.offsetWidth,
          container.offsetHeight,
        ), { passive: true })
      }
    } else {
      this.resize(width, height)
    }

    play && this.play()
  }

  private tick = (): void => {
    const time = Date.now()
    const delta = time - this.time

    if (delta) {
      this.delta = delta
      this.elapsed += delta
      this.time = time
      this.controls.enabled && this.controls.update()
      this.onupdate(this)
      this.renderer.render(this.scene, this.camera)
    }

    this.frameRequest = requestAnimationFrame(this.tick)
  }

  public resize(width: number, height: number): void {
    this.renderer.setSize(width, height)

    if (isPerspectiveCamera(this.camera)) {
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
    }

    this.onresize(this)
  }

  public reset(): void {
    this.elapsed = 0
  }

  public play(): void {
    if (this.playing) return
    this.playing = true
    this.time = Date.now()
    this.tick()
  }

  public pause(): void {
    if (!this.playing) return
    this.playing = true
    cancelAnimationFrame(this.frameRequest)
  }

  public static play(parameters: PlaygroundParameters): Playground {
    return new Playground(parameters)
  }
}
