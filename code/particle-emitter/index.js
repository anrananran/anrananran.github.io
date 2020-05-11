// Inspired by Pixi particles
// https://github.com/pixijs/pixi-particles


var total = 2000;
var spawnWave = 3;
var spawnFreq = 0.0013;
var colorStep = 0.15;
var fade = "rgba(0,0,0,0.4)";

var canvas  = document.querySelector("canvas");
var context = canvas.getContext("2d");
var ticker  = TweenLite.ticker;

var vw = canvas.width  = window.innerWidth;
var vh = canvas.height = window.innerHeight;

var xPos  = vw / 2;
var yPos  = vh / 2;
var prevX = xPos;
var prevY = yPos;
var emitX = 0;
var emitY = 0;

var hue = 0;
var lastTime = 0;
var spawnTimer = 0;

var particles = new LinkedList();
var pool = new LinkedList();

var prevTime = 0;
var frames = 0;

function init() {
  
  var i = total;
  while (i--) {    
    pool.add(new Particle());
  }
    
  lastTime = ticker.time;
  
  document.addEventListener("mouseenter", enterAction);
  window.addEventListener("resize", resizeAction);
  window.addEventListener("mousemove", mouseAction);
  window.addEventListener("touchmove", touchAction);
  ticker.addEventListener("tick", update);  
}

//
// PARTICLE
// ===========================================================================
class Particle {
  
  constructor() {
       
    this.prev = null;
    this.next = null;
        
    this.alpha = random(0.8, 1);     
    this.brightness = random(70, 80);
    this.friction = random(0.98, 1);
    this.gravity = random(0.03, 0.07);    
    this.hue = 0;   
    this.size = 2;
    this.time = random(0.7, 1.1);     
    this.vx = this._vx = random(-1.75, 1.75);
    this.vy = this._vy = random(-1.5, 1.5);
    this.x = 0;
    this.y = 0;
    
    this.animation = new TimelineLite({
      paused: true,
      onComplete: () => {
        pool.add(particles.remove(this));
      }
    });
      
    this.animation.to(this, this.time, {      
      alpha: 0.5,      
      brightness: 50,
      x: random(-5, 5),   
      y: random(-50, 50),     
      ease: Linear.easeNone,      
      modifiers: {
        x: x => {
          this.spawnX += this.vx;
          return this.spawnX + x;          
        },
        y: y => {
          this.vy += this.gravity;            
          this.spawnY += this.vy;
          return this.spawnY + y;
        }
      }
    });    
  }
  
  spawn(x, y, hue, startTime) {
    
    var norm = 1 - startTime / this.time;
    
    this.vx = this._vx;
    this.vy = this._vy;
    this.vy += this.gravity * norm;
    
    this.spawnX = x + this.vx;
    this.spawnY = y + this.vy;  
    
    this.hue = hue;
    this.animation.play(startTime);
  }  
}

//
// UPDATE
// ===========================================================================
function update() {
   
  context.fillStyle = fade;
  context.fillRect(0, 0, vw, vh);
  
  var p = particles.first;
  while (p) {
    context.fillStyle = `hsla(${p.hue}, 100%, ${p.brightness}%, ${p.alpha})`;
    context.fillRect(p.x, p.y, p.size, p.size);
    p = p.next;
  }
  
  var current = ticker.time;
  var delta = current - lastTime;
  spawnTimer -= delta;
    
  // Spawn particles based on frequency and amount of time
  // that has passed since the last update
  while (spawnTimer <= 0) {
    
    spawnTimer += spawnFreq;        
    hue += colorStep;
    
    // Interpolate position
    var norm = 1 + spawnTimer / delta;
    emitX = prevX + (xPos - prevX) * norm;
    emitY = prevY + (yPos - prevY) * norm; 
            
    var i = spawnWave;    
    while (i--) {
      
      if (!pool.size) continue;
      
      var color = random(hue, hue + 30) % 360;    
      
      var particle = particles.add(pool.remove(pool.first));
      particle.spawn(emitX, emitY, color >> 0, -spawnTimer);      
    }
  }
    
  frames++;
  
  // Update stats every second
  if (current > prevTime + 1) {
    prevTime = current;
    frames = 0;
  }
    
  lastTime = current;
  prevX = xPos;
  prevY = yPos;
}

function touchAction(event) {
  event.preventDefault();
  xPos = event.targetTouches[0].clientX;
  yPos = event.targetTouches[0].clientY;
}

function mouseAction(event) {
  xPos = event.clientX;
  yPos = event.clientY;
}

function resizeAction() {
  vw = canvas.width  = window.innerWidth;
  vh = canvas.height = window.innerHeight;
}

function enterAction(event) {
  prevX = event.clientX;
  prevY = event.clientY;
}

function random(min, max) {
  if (max == null) { max = min; min = 0; }
  return Math.random() * (max - min) + min;
}

init();


