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

var c = document.getElementById("canv");
var $ = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var i, j, p, _p, dx, dy, ang,
  z = 0,
  num = 330,
  sc = 450,
  arr = [];

var rnd = function(min, max) {
  return Math.random() * (max - min) + min;
}
for (i = 0; i < num; i++)
  arr.push({
    x: i * Math.random(),
    y: i * Math.random(),
    col: "rgba(" + Math.floor(Math.random() * 255) + ",230,255, .7)",
    sz: rnd(2, 15)
  });

var run = function() {
  $.clearRect(0, 0, w, h);
  z += 0.008;
  for (i = 0; i < num;) {
    p = arr[i++];
    p.x += n(p.x / sc + z, p.y / sc) * 5;
    p.y += n(p.x / sc - z, p.y / sc) * 5;
    p.x += (w / 2 - p.x) / 30;
    p.y += (h / 2 - p.y) / 30;

    for (j = i + 1; j < num;) {
      _p = arr[j++];
      dx = _p.x - p.x;
      dy = _p.y - p.y;
      if (Math.sqrt(dx * dx + dy * dy) < 40) {
        ang = Math.atan2(dy, dx);
        _p.x += ((p.x + Math.cos(ang) * 40) - _p.x) / 6;
        _p.y += ((p.y + Math.sin(ang) * 40) - _p.y) / 6;
      }
    }
    $.fillStyle = p.col;
    $.beginPath();
    $.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
    $.fill();
  }
  window.requestAnimationFrame(run);
};
/*** SIMPLEX PERLIN NOISE ***
Based on Sean McCullough's port
of Stefan Gustavson's java 2D SimplexNoise: https://gist.github.com/304522
********************************/
grd = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [0, 1],
  [0, -1]
];

var n = function(_x, _y) {
  var s, i, j, t, x1, y1, i1, _i, _j;

  s = (_x + _y) * 0.366;
  i = Math.floor(_x + s);
  j = Math.floor(_y + s);
  t = (i + j) * 0.21;
  x1 = _x - (i - t);
  y1 = _y - (j - t);

  i1 = x1 > y1;

  _i = i & 255;
  _j = j & 255;

  return 65 * (_grd(x1, y1, (_i + _j) % 12) +
    _grd(x1 - i1 + 0.21, y1 - !i1 + 0.21, (_i + i1 + _j + !i1) % 12) +
    _grd(x1 - 1 + 0.42, y1 - 1 +
      0.42, (_i + 1 + _j + 1) % 12));
};

var _grd = function(x, y, g) {
  var t = 0.5 - x * x - y * y;
  if (t < 0) return 0;
  return t * t * t * (grd[g][0] * x + grd[g][1] * y);
}
run();

window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);
