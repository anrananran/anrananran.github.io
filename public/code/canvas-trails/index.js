(function() {
  'use strict';
  // Declare us some global vars
  var canvas, ctx, width, height, mouseParticles, followingParticles, mouse, numParticles, colors;

  // Generic Particle constructor
  function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = 0.01 + Math.random() * 0.02;
    this.offset = -25 + Math.random() * 50;
    this.angle = Math.random() * 360;
    this.targetX = null;
    this.targetY = null;
    this.vx = null;
    this.vy = null;
    this.compositeOperation = 'source-over';
  }

  Particle.prototype = {
    constructor: Particle,
    draw: function(ctx) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = this.color;
      ctx.translate(this.x, this.y);
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  init(); // Start the program
  function init() {
    // Assign global vars accordingly
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    // Get mouse positions
    mouse = getMousePos(canvas);
    // Two arrays to hold our rotating and 'following' particles
    mouseParticles = [];
    followingParticles = [];
    numParticles = 120;
    colors = ['#f1c40f', '#f39c12', '#e67e22', '#d35400', '#e74c3c', '#c0392b'];

    // Generate particles to rotate our mouse
    generateParticles(mouseParticles, numParticles, 0, 0);

    // Generate particles, which follow the mouse particles
    generateParticles(followingParticles, numParticles, Math.random() * width, Math.random() * height);

    drawFrame();

  }

  // Generic function for generating particles
  function generateParticles(particlesArray, count, x, y) {
    var i, particle;
    for (i = 0; i < count; i++) {
      if (particlesArray === followingParticles) {
        particle = new Particle(x, y, 3, colors[Math.floor(Math.random() * colors.length)]);
      } else {
        particle = new Particle(x, y, 3);
      }
      particlesArray.push(particle);
    }
  }

  function drawFrame() {
    // Update & Redraw the entire screen on each frame
    window.requestAnimationFrame(drawFrame, canvas);
    ctx.fillStyle = 'rgba(23, 41, 58, 0.12)';
    ctx.fillRect(0, 0, width, height);
    mouseParticles.forEach(rotateParticle);
    followingParticles.forEach(updateParticle)
  }

  // Update each of our following particles to follow the corresponding rotating one
  function updateParticle(particle, index) {
    var rotParticle, speed, gravity,
        dx, dy, dist;

    rotParticle = mouseParticles[index];
    speed = 0.0045;
    gravity = 0.8;


    particle.targetX = rotParticle.x;
    particle.targetY = rotParticle.y;

    dx = particle.targetX - particle.x;
    dy = particle.targetY - particle.y;
    dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 50) {
      particle.targetX = rotParticle.x;
      particle.targetY = rotParticle.y;
    } else {
      particle.targetX = mouseParticles[Math.round(index / 2)];
      particle.targetX = mouseParticles[Math.round(index / 2)];
    }

    particle.vx += dx * speed;
    particle.vy += dy * speed;
    particle.vx *= gravity;
    particle.vy *= gravity;
    particle.x += particle.vx;
    particle.y += particle.vy;

    particle.draw(ctx);
  }

  // Rotate our particles around the mouse one by one
  function rotateParticle(particle)  {
    var vr, radius, centerX, centerY;

    vr = 0.1;
    radius = width / 10;
    centerX = mouse.x;
    centerY = mouse.y;

    // Rotate the particles
    particle.x = centerX + particle.offset + Math.cos(particle.angle) * radius;
    particle.y = centerY + particle.offset + Math.sin(particle.angle) * radius;
    particle.angle += particle.speed;


    // Reposition a particle if it goes out of screen
    if (particle.x - particle.radius / 2 <= -radius / 2) {
      particle.x = 5;
    } else if (particle.x + particle.radius / 2 >= width - radius / 2) {
      particle.x = width - 5;
    } else if (particle.y - particle.radius / 2 <= -radius / 2) {
      particle.y = 5;
    } else if (particle.y + particle.radius / 2 >= height - radius / 2) {
      particle.y = height - 5;
    }

    //particle.draw(ctx);
  }

  // Util function for getting the mouse coordinates
  function getMousePos(element) {
    var mouse = {x: width / 2, y: height / 2};
    element.addEventListener('mousemove', function(e) {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    }, false);
    return mouse;
  }

}());
