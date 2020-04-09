var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
w = ctx.canvas.width = window.innerWidth
h = ctx.canvas.height = window.innerHeight
window.onresize = function() {
  w = ctx.canvas.width = window.innerWidth
  h = ctx.canvas.height = window.innerHeight
  cx = w / 2
  cy = h / 2
}
dots = []
cx = w / 2
cy = h / 2

var controls = new (function() {
  this.maxDots = 500
  this.maxSpeed = 3
  this.minSpeed = 1
  this.emitRate = 10
  this.emitNum = 2
  this.radius = 2
  this.trail = 0.2
  this.maxTime = 3000
  this.minTime = 1000
  this.glow = 0

  this.redraw = function() {
    clearInterval(emitter)
    emitter = setInterval(emitDots, controls.emitRate)
  }
})()

var gui = new dat.GUI({ resizable: false })
var f1 = gui.addFolder('Emitter')
var f2 = gui.addFolder('Particles')
f1.add(controls, 'maxDots', 50, 1000)
  .step(10)
  .onChange(controls.redraw)
f1.add(controls, 'emitNum', 1, 20)
  .step(1)
  .onChange(controls.redraw)
f1.add(controls, 'emitRate', 10, 1000)
  .step(10)
  .onChange(controls.redraw)
f2.add(controls, 'maxSpeed', 2, 3).onChange(controls.redraw)
f2.add(controls, 'minSpeed', 1, 2).onChange(controls.redraw)
f2.add(controls, 'maxTime', 3000, 6000)
  .step(50)
  .onChange(controls.redraw)
f2.add(controls, 'minTime', 1000, 3000)
  .step(50)
  .onChange(controls.redraw)
f2.add(controls, 'radius', 1, 3).onChange(controls.redraw)
f2.add(controls, 'trail', 0.05, 0.4).onChange(controls.redraw)
f2.add(controls, 'glow', 0, 30)
  .step(1)
  .onChange(controls.redraw)

function emitDots(x, y) {
  if (dots.length < controls.maxDots) {
    for (var i = 0; i < controls.emitNum; i++) {
      var col = Math.random() >= 0.5
      col ? (color = 35) : (color = 180)
      dots.push({
        x: cx,
        y: cy,
        v: Math.random() * (controls.maxSpeed - controls.minSpeed) + controls.minSpeed,
        d: Math.random() * 360,
        c: Math.random() * (5 - -5) + -5,
        h: color,
        st: Date.now(),
        lt: Math.random() * (controls.maxTime - controls.minTime) + controls.minTime,
      })
    }
  }
}

function draw() {
  ctx.fillStyle = 'rgba(0,0,0,' + controls.trail + ')'
  ctx.fillRect(0, 0, w, h)
  ctx.fill()
  for (var i = 0; i < dots.length; i++) {
    var pct = (Date.now() - dots[i].st) / dots[i].lt

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = 'hsla(' + dots[i].h + ', 100%, 50%, ' + (1 - pct) + ')'
    ctx.shadowColor = 'hsla(' + dots[i].h + ', 100%, 50%, 1)'
    ctx.shadowBlur = controls.glow
    ctx.arc(dots[i].x, dots[i].y, Math.pow(controls.radius, 2) / dots[i].v, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    ctx.restore()

    dots[i].x += dots[i].v * Math.cos((dots[i].d * Math.PI) / 180)
    dots[i].y += dots[i].v * Math.sin((dots[i].d * Math.PI) / 180)
    dots[i].d += dots[i].c

    if (dots[i].x > w || dots[i].x < 0 || dots[i].y > h || dots[i].y < 0 || dots[i].st + dots[i].lt < Date.now()) {
      dots.splice(i, 1)
    }
  }
  requestAnimationFrame(draw)
}

emitter = setInterval(emitDots, controls.emitRate)
draw()

canvas.onmousemove = function(e) {
  cx = e.clientX
  cy = e.clientY
}
canvas.ontouchmove = function(e) {
  cx = e.changedTouches[0].pageX
  cy = e.changedTouches[0].pageY
}
canvas.onmouseleave = function() {
  cx = w / 2
  cy = h / 2
}
canvas.ontouchend = function() {
  cx = w / 2
  cy = h / 2
}
