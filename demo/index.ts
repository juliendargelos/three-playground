import {
  Mesh,
  PointLight,
  TorusKnotBufferGeometry,
  IcosahedronBufferGeometry,
  MeshStandardMaterial
} from 'three'

import { Playground } from '~/index'

Playground.play({
  pointLight: false,

  initialize() {
    this.redLight = new PointLight(0xff0066, 2)
    this.blueLight = new PointLight(0x4400ff, 2)

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

    this.scene.add(
      this.torusKnot,
      this.redLight,
      this.blueLight,
      this.redSphere,
      this.blueSphere
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
  }
})
