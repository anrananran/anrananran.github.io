var canvas = document.createElement("canvas"),
  c = canvas.getContext("2d");
var w = canvas.width = window.innerWidth*2,
  h = canvas.height = window.innerHeight*2;

particles = {},
  particleIndex = 0,
  particleNum = 30;

  c.fillStyle = "black";
  c.fillRect(0, 0, w, h);

document.body.appendChild(canvas);

function particle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.vx = 1;
  this.vy = 1;
  this.gravity = 0.3;
  particleIndex++;
  particles[particleIndex] = this;
  this.id = particleIndex;
  this.life = 0;
  this.maxLife = Math.random() * 200;
  this.shadeR = Math.floor(Math.random() * 90+60);
  this.shadeG = Math.floor(Math.random() * 100+150);
  this.shadeB = Math.floor(Math.random() * 60+10);
 this.alp = Math.random()*1;
  this.color = 'hsla(' + this.shadeR + ',100%,' + this.shadeB + '%,' + this.alp + ')';
  this.size = Math.random() *20;
  this.rad = Math.round(Math.random()*(20)-(10));
}
particle.prototype.draw = function() {
  this.x += (this.vx/this.rad)*Math.sin(this.vx);
  this.y += (this.vy/this.rad)*Math.cos(this.vy);
  
  this.vx += this.rad/10;
  this.vy += this.rad/10;
  
  

  this.life++;
  if (this.life >= this.maxLife) {
    delete particles[this.id];
  }

  c.beginPath();
  c.moveTo(this.x, this.y);
  c.lineTo(this.x-(this.vx/this.rad)*Math.sin(this.vx), this.y-(this.vy/this.rad)*Math.cos(this.vy));
  c.strokeStyle = this.color;
  c.lineWidth = 1;
  c.stroke();
};

function drawParticle() {
  c.fillStyle = "rgba(0,0,0,0)";
  c.fillRect(0, 0, w, h);
  for (var i = 0; i < particleNum; i++) {
    new particle();
  }
  for (var i in particles) {
    particles[i].draw();
  }
}

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function loop() {

  window.requestAnimFrame(loop);

  drawParticle();
}

loop();
