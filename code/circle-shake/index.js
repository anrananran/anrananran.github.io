var cw, ch;
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var config = {
  nums: 400 //数量
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function color() {
  var cr = random(0, 255);
  var cg = random(0, 255);
  var cb = random(0, 255);
  var ca = random(0, 1);

  return 'rgba(' + cr + ',' + cg + ',' + cb + ',' + ca + ')';
}

function resize() {
  cw = document.body.clientWidth;
  ch = document.body.clientHeight;

  canvas.width = cw;
  canvas.height = ch;
}

function impact(x1, y1, r1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) < r1;
}

var Circle = function (x, y, r, b, c, p) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.b = b;
  this.c = c;
  this.p = p;

  this.draw = function () {
    ctx.lineWidth = this.b;
    ctx.strokeStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, this.p);
    ctx.stroke();
  }
}

var Particles = function () {
  var me = this;

  this.circles = [];

  this.create = function () {
    for (var i = 0; i < config.nums; i++) {
      var circle = new Circle(
        random(0, cw),
        random(0, ch),
        random(0, 50),
        random(0.1, 1),
        color(),
        2 * Math.PI
      )

      this.circles.push(circle);
    }
  }

  this.clear = function () {
    this.circles = [];
  }

  this.draw = function () {
    ctx.clearRect(0, 0, cw, ch);

    for (var i = 0; i < this.circles.length; i++) {
      var circle = this.circles[i];
      circle.x = circle.x + random(-0.5, 0.5);
      circle.y = circle.y + random(-0.5, 0.5);
      // circle.r = Math.min(Math.max(circle.r + random(-4,4), 1), 80);
      // circle.b = random(0,1);
      // circle.c = color();
      circle.draw();
    }

    requestAnimFrame(function () {
      me.draw();
    });
  }

  this.init = function () {
    resize();
    this.clear();
    this.create();
    this.draw();
  }
}

var pt = new Particles();

window.onresize = function () {
  pt.init();
}

window.addEventListener('mousemove', function (event) {
  var mx = event.pageX;
  var my = event.pageY;

  pt.circles.forEach(function (circle) {
    if (impact(circle.x, circle.y, circle.r, mx, my)) {
      circle.r = Math.min(circle.r + 1, 200);
    } else {
      circle.r = Math.max(circle.r - 0.1, 10);
    }
  })

})

pt.init();