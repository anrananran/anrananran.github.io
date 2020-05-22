var c = document.getElementById('canv');
var $ = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var num = w * h / 1010;
var arr = [];

while (arr.length < num) {
  arr.push({
    x: (Math.random() * w) | 0,
    y: (Math.random() * h) | 0,
    vx: 0,
    vy: 0
  });
}

function _X(foo) {
  return Math.sin(foo.y/ 55) / .5;
}

function _Y(foo) {
  return Math.cos(foo.x / 105 ) / .3;
}

function upd(bar) {
  var n = arr[i];
  n.x += n.vx;
  n.y += n.vy;
  if (n.x < 0) {
    n.x = w + n.x;
  } else if (n.x >= w) {
    n.x -= w;
  }

  if (n.y < 0) {
    n.y = h + n.y;
  } else if (n.y >= h) {
    n.y -= h;
  }

  n.vy = _Y(n);
  n.vx = _X(n);
}

function draw(bar) {
  var n = arr[i];
  var col = 'hsla(' +  i % 200 +',75%, 50%, 1)';
  $.globalCompositeOperation =' ';
  $.beginPath();
  $.fillStyle = col;
  $.arc(n.x, n.y, 25 / Math.max((n.vx * n.vx + n.vy * n.vy),9), 0, 2*Math.PI);
  $.closePath();
  $.fill();
}

function go() {
  $.fillStyle = 'hsla(0, 0%, 0%, .05)';
  $.fillRect(0, 0, w, h);
  
  
  for (i = 0; i < num; i++) {
    upd(i);
    draw(i);
  }
};

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

run();

function run() {
  window.requestAnimFrame(run);
  go();
}
