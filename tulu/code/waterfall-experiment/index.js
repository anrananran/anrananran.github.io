
// August 2013
// Zachary Johnson
// www.zachstronaut.com

//
// See larger version here: https://www.zachstronaut.com/lab/waterfall-experiment.html
//

var ctx,
	emitter,
	settings = {
		width: 400,
		height: 500
	};

setTimeout(start, 0);

function start() {
	ctx = document.getElementById('canvas').getContext('2d');

	emitter = new Emitter(ctx, settings);

	ctx.globalAlpha = 0.5;

	animate();
}

function animate() {
	ctx.clearRect(0, 0, settings.width, settings.height);

	emitter.spawn(1);
	emitter.spawn(1);
	emitter.spawn(1);
	emitter.spawn(1);
	emitter.spawn(3);
	emitter.spawn(3);
	emitter.spawn(6);

	emitter.spawn(1);
	emitter.spawn(1);
	emitter.spawn(1);
	emitter.spawn(1);
	emitter.spawn(3);
	emitter.spawn(3);
	emitter.spawn(6);

	emitter.animate();

	requestAnimationFrame(animate);
}

function Emitter(_ctx, _settings) {
	var _p = 0,
		_twoPi = Math.PI * 2,
		_lastx = 0;

	this.n = 0;

	this.head = null;

	this.pool = [];

	this.spawn = function (yvDelta) {
		var drop;

		if (this.pool.length) {
			drop = this.pool.pop();

		} else {
			drop = {};

			// So we can check on the console to verify that our total drops is stable and we are recycling from the pool
			this.n++;
		}

		// Instead of picking a completely random x-axis start position for every new drop, we jump a random offset from our last x-axis drop position.  This helps give us a better distribution.  With true random positioning you can have lots of stacking of drops by random chance.
		drop.x = (_settings.width / 4) + (_lastx + 24 + Math.floor(Math.random() * (_settings.width / 4))) % (_settings.width / 2);
		_lastx = drop.x;
		
		drop.y = 48;

		// Start with slight rise -- adds to pouring-over-edge effect
		drop.yv = -2 + Math.random() * (yvDelta || 0);

		drop.yvDelta = yvDelta || 0;

		drop.next = this.head;
		drop.prev = null;

		if (this.head) {
			this.head.prev = drop;
		}

		this.head = drop;
	};

	this.animate = function () {
		var next,
			drop = this.head;

		while (drop) {
			// Acceleration
			drop.yv += 0.1 + (drop.yvDelta / 50);

			// Max velocity
			if (drop.yv > 15) {
				drop.yv = 15;
			}

			drop.y += drop.yv;

			next = drop.next;

			if (drop.y >= _settings.height) {
				this.prune(drop);

			} else {
				_p += 0.01;

				// We use Perlin noise and the drop's x-axis position in order to break up the color divisions along a moving wave line to enhance the waterfall effect
				if (drop.yv < (5 + 2 * noise(drop.x / 100, _p / 1000, 0)) && drop.yvDelta < 2) {
					_ctx.fillStyle = '#006';

				} else if (drop.yv < (9 + 2 * noise(drop.x / 100, _p / 1000, 0, 0)) && drop.yvDelta < 4) {
					_ctx.fillStyle = '#00f';

				} else {
					_ctx.fillStyle = '#39f';
				}

				ctx.beginPath();
	            ctx.arc(Math.floor(drop.x), Math.floor(drop.y), 4, 0, _twoPi, 'clockwise');
	            ctx.fill();
			}

			drop = next;
		}
	};

	this.prune = function (drop) {
		var prev;

		if (drop.prev) {
			drop.prev.next = drop.next;
			prev = drop.prev;

		} else {
			this.head = drop.next;
			prev = null;
		}

		if (drop.next) {
			drop.next.prev = prev;
		}

		drop.prev = null;
		drop.next = null;

		this.pool.push(drop);
	};
}


if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = window.webkitRequestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function (callback, element) {
			window.setTimeout(callback, 1000 / 60);
		};
}


// http://zreference.com/canvas-perlin-noise/
// Based on Java reference implementation of improved noise - Copyright 2002 Ken Perlin.
(function(){
   var p = [];
   var permutation = [ 151,160,137,91,90,15,
   131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
   190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
   88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
   77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
   102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
   135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
   5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
   223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
   129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
   251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
   49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
   138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
 
   for (var i=0; i < 256 ; i++) 
     p[256+i] = p[i] = permutation[i]; 
 
   function noise(x, y, z) {
      var X = Math.floor(x) & 255,                  
          Y = Math.floor(y) & 255,                  
          Z = Math.floor(z) & 255;
      x -= Math.floor(x);                                
      y -= Math.floor(y);                               
      z -= Math.floor(z);
 
      var u = fade(x),                               
          v = fade(y),                                
          w = fade(z);
      var A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,      
          B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;      
 
      return lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ),  
                                     grad(p[BA  ], x-1, y  , z   )), 
                             lerp(u, grad(p[AB  ], x  , y-1, z   ),   
                                     grad(p[BB  ], x-1, y-1, z   ))), 
                     lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),   
                                     grad(p[BA+1], x-1, y  , z-1 )),  
                             lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
                                     grad(p[BB+1], x-1, y-1, z-1 ))));
   }
   function fade(t) { 
     return t * t * t * (t * (t * 6 - 15) + 10); 
   }
   function lerp(t, a, b) { 
     return a + t * (b - a); 
   }
   function grad(hash, x, y, z) {
      var h = hash & 15;                      
      var u = h<8 ? x : y,                 
          v = h<4 ? y : h==12||h==14 ? x : z;
      return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
   }
 
   window.noise = noise;
})();
