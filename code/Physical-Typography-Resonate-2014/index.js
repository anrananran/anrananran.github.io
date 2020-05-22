/*

This is the first sketch I made for the title slide of my Resonate.io 2014 talk. I'm finishing up the interactive version that will let you make and send your own messages and will release the source for that soon (follow @soulwire for announcements).

People have been asking me how I did it though, so thought I'd give you the rough unedited source to deconstruct first.

*/

function Path( points, color ) {
 
  this.clock = 0;
  this.alive = true;
  this.progress = 0;
  this.color = color;
  this.points = points.concat();
  this.particles = [];
  this.nodes = [];

  // this.points = this.simplify( points, 8 );

  if ( Math.random() < 0.5 ) {
      this.reverse();
  }
}

Path.prototype = {

  addParticle: function( node ) {

      this.particles.push({
          vx: node.vx * random( 0.5, 1.5 ),
          vy: node.vy * random( 0.5, 1.5 ),
          x: node.x,
          y: node.y,
          t: node.t * random( 0.8, 1.1 )
      });
  },

  addNode: function( x, y ) {

      var p = this.nodes[ this.nodes.length - 1 ];
      var d = 1.0;
      var dx, dy;

      if ( p ) {

          dx = p.x - x;
          dy = p.y - y;
          d = sqrt( dx * dx + dy * dy );
      }

      var a = random( -PI, PI );

      this.nodes.push({
          stiffness: random( 0.65, 0.85 ), //0.3,
          length: d * random( 0.5, 4.0 ),
          wander: random( 0.2, 0.95 ),
          jitter: random( 0.05, 0.1 ),
          force: random( 0.05, 0.3 ),
          color: random( COLORS ),
          speed: random( 0.5, 0.8 ),
          // theta: random( -TWO_PI, TWO_PI ),
          theta: a + ( atan2( dy, dx ) || 0 ),
          turn: random( 0.1, 0.68 ),
          snap: random( 0.33 ),
          dragEase: random( 0.02, 0.03 ),
          dragMax: random( 0.82, 0.95 ),
          drag: 0.0,
          age: 0,
          vx: 0,
          vy: 0,
          t: 1,
          x: x,
          y: y
      });
  },

  step: function( dt ) {

      this.clock += dt;

      if ( this.progress < 1.0 ) {

          var min = this.nodes.length;
          var max = this.points.length;

          for ( var p, i = min; i < max; i++ ) {

              p = this.points[i];

              if ( p.t <= this.clock )

                  this.addNode( p.x, p.y );

              else break;
          }

          this.progress = min / max;

      } else {

          if ( this.nodes.length > 3 ) {

              if ( random() < 0.25 )

                  // this.nodes.shift();
                  if ( random() < 0.8 ) this.nodes.shift();
                  else this.nodes.splice( ~~random( this.nodes.length ), 1 );

          } else {

              this.nodes.length = 0;
              this.alive = false;
          }
      }
  },

  move: function() {

      if ( this.nodes.length < 1 ) return;

      var dx, dy, ds, d, f, p, i, n, o = this.nodes[0];

      for ( i = 1, n = this.nodes.length; i < n; i++ ) {

          p = this.nodes[i];

          dx = o.x - p.x;
          dy = o.y - p.y;
          ds = dx * dx + dy * dy + 1e-10;

          d = sqrt( ds );
          f = ( d - p.length ) / d * p.stiffness;

          // velocity

          o.vx += dx * -f * o.force;
          o.vy += dy * -f * o.force;

          o.theta += random( -o.turn, o.turn );
          o.vx += cos( o.theta ) * o.wander;
          o.vy += sin( o.theta ) * o.wander;

          o.vx += random( -o.jitter, o.jitter );
          o.vy += random( -o.jitter, o.jitter );

          if ( d > 100 ) { // stops things getting out of control

              o.vx *= 0.1;
              o.vy *= 0.1;
              o.x -= dx * 0.25;
              o.y -= dy * 0.25;
              p.x += dx * 0.25;
              p.y += dy * 0.25;

          } else {

              o.x -= dx * o.snap;
              o.y -= dy * o.snap;
          }

          // integrate

          o.drag += ( o.dragMax - o.drag ) * o.dragEase;

          o.vx *= o.drag;
          o.vy *= o.drag;

          o.x += o.vx * o.speed;
          o.y += o.vy * o.speed;

          o.age++;

          if ( i == n - 1 ) {

              p.vx += dx * -f * p.force;
              p.vy += dy * -f * p.force;

              p.theta += random( -p.turn, p.turn );
              p.vx += cos( p.theta ) * p.wander;
              p.vy += sin( p.theta ) * p.wander;

              p.vx += random( -p.jitter, p.jitter );
              p.vy += random( -p.jitter, p.jitter );

              p.drag += ( p.dragMax - p.drag ) * p.dragEase;

              p.t = pow( sin( (i / n) * PI ), 2 ) || 0.1;
              p.t *= min( 1, max( 0.1, n / 40 ) ) || 0.1;

              p.vx *= p.drag;
              p.vy *= p.drag;

              p.x += p.vx * p.speed;
              p.y += p.vy * p.speed;

              p.age++;
          }

          if ( this.particles.length < 100 && random() < 0.1 ) {
              this.addParticle( o );
          }

          // perpendicular unit vector

          o.t = pow( sin( (i / n) * PI ), 2 ) || 0.1;
          o.t *= min( 1, max( 0.1, n / 40 ) ) || 0.1;

          // dx = o.x - p.x;
          // dy = o.y - p.y;
          // d = sqrt( dx * dx + dy * dy );

          // px = dy / d;
          // py = -dx / d;

          // o.ax = o.x + px * o.t;
          // o.ay = o.y + py * o.t;

          // o.bx = o.x - px * o.t;
          // o.by = o.y - py * o.t;

          // shift

          o = p;
      }

      for ( i = this.particles.length - 1; i >= 0; i-- ) {

          p = this.particles[i];

          p.t *= 0.95;

          p.vx += random( -1, 1 ) * 0.3;
          p.vy += random( -1, 1 ) * 0.3;

          p.vx *= 0.9;
          p.vy *= 0.9;

          p.x += p.vx;
          p.y += p.vy;

          if ( p.t < 0.1 ) this.particles.splice( i, 1 );
      }
  },

  simplify: function( points, dist ) {

      dist = pow( dist || 10, 2 );

      var dx, dy, point, prev = points[0], out = [ prev ];

      if ( points.length > 0 ) {

          for ( var i = 1, n = points.length - 1; i < n; i++ ) {

              point = points[i];
              dx = point.x - prev.x;
              dy = point.y - prev.y;

              if ( dx * dx + dy * dy >= dist )

                  out.push( prev = point );
          }

      }

      out.push( points[ points.length - 1 ] );

      return out;
  },

  drawCurve: function( ctx, thickness ) {

      var points = this.nodes;

      if ( points.length < 3 ) return;

      // Bezier

      // var cx, cy, ocx = points[0].x, ocy = points[0].y;

      // for ( var i = 1, n = points.length - 2; i < n; i++ ) {

      //     cx = ( points[i].x + points[i + 1].x ) / 2;
      //     cy = ( points[i].y + points[i + 1].y ) / 2;

      //     ctx.beginPath();
      //     ctx.moveTo( ocx, ocy );
      //     ctx.quadraticCurveTo( points[i].x, points[i].y, ocx = cx, ocy = cy );
      //     ctx.lineWidth = ( points[i].t || 1 ) * thickness;
      //     ctx.stroke();
      // }

      // ctx.beginPath();
      // ctx.moveTo( ocx, ocy );
      // ctx.quadraticCurveTo( points[i].x, points[i].y, points[i + 1].x, points[i + 1].y );
      // ctx.lineWidth = ( points[i].t || 1 ) * thickness;
      // ctx.stroke();

      // Catmull

      var p0, p1, p2, p3, i6 = 1.0 / 6.0, ox = points[0].x, oy = points[0].y;

      for ( var i = 3, n = points.length; i < n; i++ ) {

          p0 = points[i - 3];
          p1 = points[i - 2];
          p2 = points[i - 1];
          p3 = points[i];

          ctx.beginPath();
          ctx.moveTo( ox, oy );
          ctx.bezierCurveTo(
              p2.x * i6 + p1.x - p0.x * i6,
              p2.y * i6 + p1.y - p0.y * i6,
              p3.x * -i6 + p2.x + p1.x * i6,
              p3.y * -i6 + p2.y + p1.y * i6,
              ox = p2.x,
              oy = p2.y
          );
          ctx.lineWidth = ( points[i].t || 1 ) * thickness;
          ctx.stroke();
      }
  },

  drawPoints: function( ctx ) {

      ctx.beginPath();

      this.nodes.forEach(function(p,i) {
          ctx.moveTo( p.x + p.t, p.y );
          ctx.arc( p.x, p.y, p.t * 18, 0, TWO_PI );
      });

      this.particles.forEach(function(p,i) {
          ctx.moveTo( p.x + p.t, p.y );
          ctx.arc( p.x, p.y, p.t * 12, 0, TWO_PI );
      });

      ctx.fill();
  },

  draw: function( ctx ) {

      this.drawPoints( ctx );
      this.drawCurve( ctx, 4 );
  },

  reverse: function() {

      var times = [], n = this.points.length - 1;
      this.points.forEach(function( p ) { times.push( p.t ); });
      this.points.forEach(function( p, i ) { p.t = times[ n - i ]; });
      this.points.reverse();
  },

  reset: function() {

      if ( Math.random() < 0.5 ) {
          this.reverse();
      }

      this.nodes = [];
      this.particles = [];
      this.progress = 0;
      this.clock = 0;
      this.alive = true;
  }
};
function Shape( data ) {

  this.paths = [];
  this.alive = true;
  this.count = 0;
  this.color;

  data.groups.forEach( function( group ) {
      this.paths.push( new Path( group ) );
      this.count += group.length;
  }, this);
}

Shape.prototype = {

  step: function( dt ) {

      var alive = this.paths.length;

      this.paths.forEach( function( path ) {

          if ( !path.alive ) --alive;
          path.step( dt );
          path.move();

      }, this);

      if ( !alive ) this.alive = false;
  },

  draw: function( ctx ) {

      this.count = 0;

      if ( DARK ) ctx.globalAlpha = 0.5;
      ctx.fillStyle = this.color;

      this.paths.forEach( function( path ) {
          this.count += path.progress < 1 ? path.points.length : path.nodes.length;
          path.drawPoints( ctx );
      }, this);

      ctx.strokeStyle = DARK ? this.color : '#222';
      ctx.globalAlpha = 1;

      this.paths.forEach( function( path ) {
          path.drawCurve( ctx, 4 );
      }, this);
  },

  reset: function( color ) {

      this.color = color;

      this.paths.forEach( function( path ) {
          path.color = color;
          path.reset();
      });

      this.alive = true;
  }
};
var DARK = true;
var COLORS = [
  '#FF1B79',
  '#00B6AD',
  '#FAC51C',
  '#6CC1ED',
  '#C6F98B'
];

var playbackRate = 5.0;
var rotation = 0;
var active = [];
var words = [];
var index = 0;
var scale = 1;
var color;

Sketch.create({

  retina: 'auto',

  setup: function() {

      words.push(
          new Shape( data.hao ),
          new Shape( data.hola ),
          new Shape( data.hello ),
          new Shape( data.resonate ),
          new Shape( data.year ),
          new Shape( data.love )
      );

      if ( DARK ) this.globalCompositeOperation = 'lighter';
      this.lineJoin = 'round';
      this.lineCap = 'round';

      this.next();
  },

  next: function() {

      var c = random( COLORS );
      while ( c === color ) c = random( COLORS );
      color = c;

      words[ index ].reset( color );
      active.push( words[ index ] );
      index = (index + 1) % words.length;
  },

  draw: function() {

      var t = this.millis;

      rotation = map( sin( t * 0.0012 ), -1, 1, -PI, PI ) * 0.025;
      scale = map( cos( t * 0.00081 ), -1, 1, 0.95, 1.5 );

      this.save();
      this.translate( this.width / 2, this.height / 2 );
      this.rotate( rotation );
      this.scale( scale, scale );

      var secs = this.dt / 1000;

      for ( var word, i = active.length - 1; i >= 0; i-- ) {

          word = active[i];
          word.step( secs * playbackRate );
          word.draw( this );

          if ( !word.ignore && word.count < 60 ) {
              word.ignore = true;
              this.next();
          }

          if ( !word.alive ) {
              active.splice( i, 1 );
              word.ignore = false;
              // word.reset();
          }
      };

      this.restore();

      // Show colors
      // COLORS.forEach(function( c, i ) {
      //     this.beginPath();
      //     this.arc( 50 + i * 50, 50, 20, 0, TWO_PI );
      //     this.fillStyle = c;
      //     this.fill();
      // }, this);
  }
});
