// set the scene size
var TAU = Math.PI * 2,
  WIDTH = window.innerWidth,
  HEIGHT = 400,
  //center = new THREE.Vector3(WIDTH * 0.5, HEIGHT * 0.5, 0),
  center = new THREE.Vector3(0, 0, 0),
  particleDestination = new THREE.Vector3(0, 0, 200)

// set some camera attributes
var VIEW_ANGLE = 100,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.01,
  FAR = 4000

var spawnRate = 50

// get the DOM element to attach to
// - assume we've got jQuery to hand
var container = document.querySelector('#container')

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true })
renderer.autoClear = true
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)

var scene = new THREE.Scene()

// add the camera to the scene
scene.add(camera)

// the camera starts at 0,0,0
// so pull it back
camera.position.x = 0
camera.position.y = 0
camera.position.z = 500
camera.lookAt(new THREE.Vector3(0, 0, 0))
camera.rotation.z = Math.PI

// start the renderer
renderer.setSize(WIDTH, HEIGHT)

// attach the render-supplied DOM element
container.appendChild(renderer.domElement)

// create the sphere's material
var standardMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  transparent: true,
  //blending: THREE.AdditiveBlending,
  opacity: 0.15,
})

var standardGeometry = new THREE.CylinderGeometry(
  (WIDTH + HEIGHT) * 0.045, // upper radius
  (WIDTH + HEIGHT) * 0.045, // lower radius
  0.01, // height
  4 // segments
)
standardGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2))

// create a point light
var pointLight = new THREE.PointLight(0xffffff)

// set its position
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 500

// add to the scene
scene.add(pointLight)

// ------------------------------------
// Grouping

var numGroups = 32
var groups = _.map(new Array(numGroups), function() {
  return []
})
var groupAngle = TAU / numGroups
var highlightedGroups = []

function highlightGroup(groupId, solo) {
  var group = groups[groupId]
  if (!group) return groupId
  var index = highlightedGroups.indexOf(group)
  if (index !== -1) return groupId

  if (solo) {
    var otherGroupIds = _.range(numGroups)
    otherGroupIds.splice(groupId, 1)
    do {
      unhighlightGroup(otherGroupIds[0])
    } while (otherGroupIds.shift() !== undefined)
  }

  highlightedGroups.push(group)
  _.each(group, function(particle) {
    particle.material.__color = particle.material.color
    particle.material.color = new THREE.Color(0xffffff)
  })
  return groupId
}

function unhighlightGroup(groupId) {
  var group = groups[groupId]
  if (!group) return groupId
  var index = highlightedGroups.indexOf(group)
  if (index === -1) return groupId
  highlightedGroups.splice(index, 1)
  _.each(group, function(particle) {
    if (!particle.material.__color) return
    particle.material.color = particle.material.__color
  })
  return groupId
}

// ------------------------------------

// create object pool
var availableParticles = []
var activeParticles = []

// ------------------------------------

function getParticles(quantity, options) {
  quantity = quantity || 1
  while (availableParticles.length < quantity) {
    availableParticles.push(spawnParticle())
  }
  var newParticles = availableParticles.splice(0, quantity)
  newParticles.forEach(function(p) {
    setupParticle(p, options)
    groups[p.groupId].push(p)
    scene.add(p)
  })
  activeParticles = activeParticles.concat(newParticles)
  return newParticles
}

// ------------------------------------

function setupParticle(particle, options) {
  particle = _.extend(particle, options)
  particle.geometry.dynamic = true

  // changes to the vertices
  particle.geometry.verticesNeedUpdate = true

  // changes to the normals
  particle.geometry.normalsNeedUpdate = true
  var rX = Math.random()
  var rY = Math.random()
  var x = rX * WIDTH - WIDTH * 0.5
  var y = rY * HEIGHT - HEIGHT * 0.5
  particle.position.x = x
  particle.position.y = y
  particle.angle = Math.atan2(y, x)
  particle.speed = -1
  //	particle.lookAt(camera.position)

  particle.groupId = (Math.floor(particle.angle / groupAngle) + numGroups) % numGroups

  var color = getRGB(colorMap, colorMapData, x + WIDTH * 0.5, HEIGHT - (y + HEIGHT * 0.5))
  particle.material.color = new THREE.Color(color)
}

// ------------------------------------

function recycleParticle(particle) {
  scene.remove(particle)
  // remove from active list
  var index = activeParticles.indexOf(particle)
  activeParticles.splice(index, 1)
  // remove from group
  index = groups[particle.groupId].indexOf(particle)
  groups[particle.groupId].splice(index, 1)
  // return to pool
  availableParticles.push(particle)
}

// ------------------------------------

function spawnParticle(options) {
  var particle = _.extend(
    new THREE.Mesh(standardGeometry, standardMaterial.clone()),
    {
      age: 0,
      lifespan: 2000,
      birthday: startTime,
    },
    options
  )
  particle.endTime = particle.birthday + particle.lifespan
  return particle
}

// ------------------------------------

function updateParticle(p, time) {
  p.age = (time - p.birthday) / p.lifespan
  if (p.age > 1) {
    recycleParticle(p)
    return
  }
  p.position.x += Math.cos(p.angle) * p.speed
  p.position.y += Math.sin(p.angle) * p.speed
  p.position.z = particleDestination.z * p.age
  p.material.opacity = 0.3 + p.age * p.age
  p.scale.x = 1 - p.age
  p.scale.y = 1 - p.age
  p.scale.z = 1 - p.age

  //p.lookAt(camera.position)
}

// ------------------------------------

var startTime = Date.now()
var ticksPerSecond = 60
var millisPerTick = 1000 / ticksPerSecond
var now = startTime
var afID

function play() {
  if (afID) return
  onAnimationFrame()
}

function stop() {
  cancelAnimationFrame(afID)
  afID = null
}

function onAnimationFrame() {
  update(Date.now() - startTime)
  afID = requestAnimationFrame(onAnimationFrame)
  renderer.render(scene, camera)
}

// ------------------------------------

function setup() {
  loadColorMap()
}

// ------------------------------------

var tick = 0
var prevTick = -1
var activeGroupId = -1

function update(time) {
  tick = time / millisPerTick
  if (prevTick != tick) {
    getParticles(spawnRate, { birthday: time })
  }
  activeParticles.forEach(function(p) {
    updateParticle(p, time)
  })

  // update highlights
  //var highlightDuration = 1;
  //activeGroupId = Math.floor(tick / highlightDuration) % numGroups;
  //highlightGroup(activeGroupId, true);

  // Update Camera
  var cameraTick = TAU * ((tick % 1080) / 1080)
  camera.rotation.z = cameraTick
  camera.position.x = Math.cos(cameraTick) * WIDTH * 0.025
  camera.position.y = Math.sin(cameraTick) * HEIGHT * 0.025
  camera.lookAt(center)
  prevTick = tick
}

// ----------------------

var colorMap
var colorMapCanvas
var colorMapCtx
var colorMapData
function loadColorMap() {
  //	var imgSrc = "http://www.theorigin.net/experiments/FirstFridayFoodtruckFun/img/scene1.png";
  var imgSrc = 'http://www.theorigin.net/silkbrush/img/colormap.png'
  //var imgSrc = "https://scontent-lax3-1.xx.fbcdn.net/hphotos-xtf1/v/t1.0-9/11049578_10101885156149034_3791560155492479655_n.jpg?oh=20f2a8913950448f1a949e06a21554bb&oe=56C22952";
  //var imgSrc = "http://www.theorigin.net/participlejs/img/colormap0.jpg";
  //	var imgSrc = "http://www.theorigin.net/silkbrush/img/capsecone.jpg";
  colorMap = new Image()
  colorMap.crossOrigin = 'anonymous'
  colorMap.src = imgSrc
  colorMap.onload = postColorMapLoad
}

function postColorMapLoad() {
  var colorMapCanvas = document.createElement('canvas')
  colorMapCanvas.attributes.height = colorMapCanvas.attributes.width = 100
  colorMapCtx = colorMapCanvas.getContext('2d')
  colorMapCtx.drawImage(colorMap, 0, 0, 100, 100)
  colorMapData = colorMapCtx.getImageData(0, 0, 100, 100)
  play()
}

function getRGB(colorMap, colorMapData, x, y) {
  var data = colorMapData.data
  var propX = x / WIDTH
  var propY = y / HEIGHT
  var col = (propX * colorMapData.width) << 2
  var row = (propY * colorMapData.height) >> 0
  var rowWidth = colorMapData.width << 2
  return (data[col + row * rowWidth + 0] << 16) | (data[col + row * rowWidth + 1] << 8) | data[col + row * rowWidth + 2]
}

setup()
