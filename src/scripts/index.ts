import * as t from 'three'
import { controls } from './controls'

const info = document.querySelector('.info')
const canvas = document.querySelector('canvas')!

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const renderer = new t.WebGLRenderer({ canvas })
const scene = new t.Scene()
export const camera = new t.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 1000)

renderer.setSize(sizes.width, sizes.height)

const landGeometryRaw = new t.BoxGeometry(10, 2, 10)
const vertGeometryRaw = new t.BoxGeometry(10, 10, 2)
const bigLandGeometryRaw = new t.BoxGeometry(20, 2, 20)

const landGeometry = new t.EdgesGeometry(landGeometryRaw)
const bigLandGeometry = new t.EdgesGeometry(bigLandGeometryRaw)
const vertGeometry = new t.EdgesGeometry(vertGeometryRaw)

const landMaterial = new t.LineBasicMaterial({ color: 0x00ff00 })
const bigLandMaterial = new t.LineBasicMaterial({ color: 0xff00ff })
const vertMaterial = new t.LineBasicMaterial({ color: 0xff0000 })

const land = new t.LineSegments(landGeometry, landMaterial)
const bigLand = new t.LineSegments(bigLandGeometry, bigLandMaterial)
const wall = new t.LineSegments(vertGeometry, vertMaterial)
const axesHelper = new t.AxesHelper(4)

axesHelper.position.set(8, 4, -10)

land.position.set(-6, -4, -20)
bigLand.position.set(6, -4, 20)
wall.position.set(6, 0, -28)

scene.add(land, bigLand, wall, axesHelper)

function animate() {
  const { position: camPos, rotation: camRot } = camera
  const { position: ctrlPos, rotation: ctrlRot } = controls
  camPos.x += ctrlPos.x
  camPos.y += ctrlPos.y
  camPos.z += ctrlPos.z
  camRot.set(...(Array.from(ctrlRot) as [number, number, number]))

  renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)

if (info) {
  info.innerHTML = `
    <div>
      x: ${Math.floor(camera.position.x)} 
      y: ${Math.floor(camera.position.y)} 
      z: ${Math.floor(camera.position.z)}
    </div>
    <div>
      angle: ${Math.ceil((camera.rotation.y * 60) % 360)}
    </div>
  `
}

window.addEventListener('resize', () => {
  ;(sizes.width = window.innerWidth), (sizes.height = window.innerHeight)

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
})
