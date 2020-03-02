import {
  Mesh,
  Fog,
  PointLight,
  TorusKnotBufferGeometry,
  IcosahedronBufferGeometry,
  CircleBufferGeometry,
  MeshStandardMaterial,
  TextureLoader,
  Color,
  Vector3,
  RepeatWrapping
} from 'three'

import { Water } from 'three/examples/jsm/objects/Water'
import { Playground } from '~/index'

Playground.play({
  pointLight: false,

  initialize() {
    this.scene.background = new Color(0x090909)
    this.scene.fog = new Fog(0x090909, 10, 22)
    this.camera.position.y = 1
    this.camera.position.z = 7

    this.redLight = new PointLight(0xff0066, 3)
    this.blueLight = new PointLight(0x4400ff, 3)

    this.torusKnot = new Mesh(
      new TorusKnotBufferGeometry(0.5, 0.2, 256, 64),
      new MeshStandardMaterial({
        metalness: 0.95,
        roughness: 0.8,
        color: 0x89abcd,
        transparent: true
      })
    )

    this.redSphere = new Mesh(
      new IcosahedronBufferGeometry(0.06),
      new MeshStandardMaterial({ color: this.blueLight.color, metalness: 0.95, roughness: 1 })
    )

    this.blueSphere = new Mesh(
      new IcosahedronBufferGeometry(0.06),
      new MeshStandardMaterial({ color: this.redLight.color, metalness: 0.95, roughness: 1 })
    )

    this.water = new Water(new CircleBufferGeometry(22), {
      textureWidth: 1024,
      textureHeight: 1024,
      distortionScale: 2,
      waterColor: 0x000000,
      sunColor: 0xffffff,
      sunDirection: new Vector3(0, 0, -1),
      fog: true,
      waterNormals: new TextureLoader().load(
        'https://raw.githubusercontent.com/mrdoob/three.js/b1653ec7628008e4b4be87526b3e670cd7e3b2ea/examples/textures/waternormals.jpg',
        (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping }
      )
    })

    this.water.material.uniforms.size.value = 3

    this.water.position.y = -1.2
    this.water.rotation.x = -Math.PI / 2

    this.scene.add(
      this.torusKnot,
      this.redLight,
      this.blueLight,
      this.redSphere,
      this.blueSphere,
      this.water
    )
  },

  update({ elapsed }) {
    this.torusKnot.rotation.set(elapsed / 1000, elapsed / 2000, elapsed / 3000)

    this.redLight.position.set(
      Math.sin(elapsed / 500),
      Math.sin(elapsed / 2000),
      Math.cos(elapsed / 500)
    )

    this.blueLight.position.set(
      Math.sin(elapsed / 500 + Math.PI),
      Math.cos(elapsed / 500 + Math.PI),
      Math.sin(elapsed / 2000 + Math.PI)
    )

    this.redSphere.rotation.set(
      elapsed / 1000,
      elapsed / 2000,
      elapsed / 3000
    )

    this.blueSphere.rotation.set(
      elapsed / 1000,
      elapsed / 2000,
      elapsed / 3000
    )

    this.redSphere.position.copy(this.redLight.position)
    this.blueSphere.position.copy(this.blueLight.position)

    this.water.material.uniforms.time.value = elapsed / 6000
  }
})
