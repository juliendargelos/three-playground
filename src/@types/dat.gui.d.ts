declare module 'three-dat.gui' {
  export default function (dat: typeof import('dat.gui')): void
}

declare module 'dat.gui' {
  import {
    Material,
    Light,
    Vector,
    Scene,
    Object3D,
    Mesh,
    Fog,
    FogExp2
  } from 'three'

  export class GUI extends dat.GUI {
    __controllers: dat.Controller[]
    __folders: dat.GUI[]

    addMaterial (name: string, material: Material): this
    addLight (name: string, light: Light): this
    addVector (name: string, vector: Vector): this
    addScene (name: string, scene: Scene): this
    addObject3D (name: string, object: Object3D): this
    addMesh (name: string, mesh: Mesh): this
    addFog (name: string, fog: Fog): this
    addFogExp2 (name: string, fog: FogExp2): this
  }
}
