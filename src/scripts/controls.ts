export const controls = {
  position: {
    x: 0,
    y: 0,
    z: 0,

    reset() {
      this.x = 0
      this.y = 0
      this.z = 0
    },

    [Symbol.iterator]: function* (): Generator<number> {
      yield this.x
      yield this.y
      yield this.z
    }
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,

    reset() {
      this.x = 0
      this.y = 0
      this.z = 0
    },

    [Symbol.iterator]: function* () {
      yield this.x
      yield this.y
      yield this.z
    }
  },
  cursor: {
    active: false
  }
}

const step = 0.2

document.addEventListener('keydown', (event) => {
  const { key } = event
  const { position, cursor } = controls

  if (key === 'w' && position.z > -step) position.z -= step
  if (key === 's' && position.z < step) position.z += step
  if (key === 'd' && position.x > -step && position.x < step) position.x += step
  if (key === 'a' && position.x > -step && position.x < step) position.x -= step
  if (key === 'Escape') {
    cursor.active = false
    document.exitPointerLock()
  }
})

document.addEventListener('keyup', (event) => {
  const { key } = event
  const { position } = controls

  if (key === 'w' && position.z === -step) position.z += step
  if (key === 's' && position.z === step) position.z -= step
  if (key === 'd' && position.x === step) position.x -= step
  if (key === 'a' && position.x === -step) position.x += step
})

document.addEventListener('mousemove', (event) => {
  const { movementX, movementY } = event
  const { rotation, cursor } = controls
  const xAngle = Math.sin(rotation.y + 1.5)
  const zAngle = Math.cos(rotation.y)

  if (cursor.active) {
    rotation.x += -movementY * 0.001 * xAngle
    rotation.z += -movementY * 0.001 * zAngle
    rotation.y += -movementX * 0.001
  }
})

document.addEventListener('click', () => {
  controls.cursor.active = true
  document.body.requestPointerLock()
})
