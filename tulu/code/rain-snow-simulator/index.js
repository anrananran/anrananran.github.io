// credit to https://codepen.io/Sheepeuh/pen/cFazd  for the base of this codepen

//SOME SETTINGS TO PLAY WITH

var INTENSITY = 1000;
var RAINRATIO = 0.5;


(function(ns) {
  ns = ns || window;
  
  function ParticleSystem(ctx, width, height, intensity, rainRatio) {
    this.particles = [];
    this.drops = [];
    intensity  = intensity || 100;
    this.rainRatio = rainRatio || 1;
    this.addParticle = function() {
       if (Math.random() < this.rainRatio) {
        this.particles.push(new Rain(ctx, width));
      } else {
        this.particles.push(new Snow(ctx, width));
      }
    }
    while(intensity--) {
     this.addParticle();
    }
    this.render = function() {
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fillRect(0, 0, width, height);
      for (var i = 0, particle; particle = this.particles[i]; i++) {
        particle.render();
      }
      for (var i = 0, drop; drop = this.drops[i]; i++) {
        ctx.globalAlpha = drop.alpha;
        ctx.fillStyle = drop.color;
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    this.update = function() {
       for (var i = 0, particle; particle = this.particles[i]; i++) {
        particle.x += particle.vx;
        particle.y += particle.vy+5;
        if (particle.y > height-1) {
          if ( particle.explode) {
            this.explosion(particle.x, particle.y, particle.color);
            this.particles.splice(i--,1);
            this.addParticle();
          } else {
            particle.vx = 0;
            particle.vy = 0;
            particle.y = height;
            if (particle.killAt && particle.killAt < +new Date) this.particles.splice(i--,1);
            else if ( ! particle.killAt) {
              particle.killAt = +new Date + 5000;
             this.addParticle();
            }
          }
        }
        
      }
      for (var i = 0, drop; drop = this.drops[i]; i++) {
        drop.x += drop.vx;
        drop.y += drop.vy;
        drop.radius -= 0.075;
        if (drop.alpha > 0) {
          drop.alpha -= 0.005;
        } else {
          drop.alpha = 0;
        }
        if (drop.radius < 0) {
          this.drops.splice(i--, 1);
        }
      }

    }
    this.explosion = function(x, y, color, amount) {
      amount = amount || 15;
      while (amount--) {
        this.drops.push( 
        {
          vx : (Math.random() * 4-2	),
          vy : (Math.random() * -4 ),
          x : x,
          y : y,
          radius : 0.65 + Math.floor(Math.random() *1.6),
          alpha : 1,
          color : color
        })
      }
    }

  }
  
  function Rain(ctx,width) {
    this.vx = (Math.random() * 0.25);
    this.vy = (Math.random() * 9) + 1;
    this.x = Math.floor((Math.random()*width));
    this.y = -Math.random() * 30;
    this.alpha = 1;
    this.color = "hsla(200,100%,50%, 1)";
    this.render = function() {
       ctx.globalAlpha = this.alpha;
       ctx.fillStyle = this.color;
       ctx.fillRect(this.x, this.y, this.vy/4, this.vy);
    }
    this.explode = true;
  }
  
  function Snow(ctx,width) {
    this.vx = ((Math.random() - 0.5) * 5);
    this.vy = (Math.random() * 9) + 1;
    this.x = Math.floor((Math.random()*width));
    this.y = -Math.random() * 30;
    this.alpha = 1;
    this.radius = Math.random() * 4;
    this.color = "hsla(200,100%,80%, 1)";
    this.render = function() {
       ctx.globalAlpha = this.alpha;
       ctx.fillStyle = this.color;
       ctx.beginPath();
       ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
       ctx.fill();
    }
    this.explode = false;
  }
    
  
  ns.precCanvas = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');  
    var 	width = canvas.width = window.innerWidth;
	    var height = canvas.height = window.innerHeight;
    var particleSystem = new ParticleSystem(ctx, width, height, INTENSITY, RAINRATIO);
    (function draw() {
      requestAnimationFrame(draw);
      particleSystem.update();
      particleSystem.render();
    })();

  }
  
  
})(window);

precCanvas();
