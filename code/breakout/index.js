var c = document.getElementById('canv');
var $ = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var grav = 0.00095;
var s = [20, 15, 10, 5];
var gravX = w / 2;
var gravY = h / 2;
var nodes;
var num = 55;
var minDist = 155;
var spr = 0.0000009;
part();
run();

//random size function
function S() {
  var curr = s.length;
  var cur_ = Math.floor(Math.random() * curr);
  return s[cur_];
}

function part() {
  nodes = [];
  for (var i = 0; i < num; i++) {
    var node = {
      hue: Math.random()*360,
      rad: S(),
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.random() * 8 - 4,
      vy: Math.random() * 8 - 4,
      upd: function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > w) this.x = 0;
        else if (this.x < 0) this.x = w;
        if (this.y > h) this.y = 0;
        else if (this.y < 0) this.y = h;  
      },
      draw: function() {
        //outer ring
        var g = $.createRadialGradient(this.x, this.y, this.rad * 2, this.x, this.y, this.rad);
        g.addColorStop(0,'hsla(242, 55%, 15%,.7)');
        g.addColorStop(.5, 'hsla(242, 50%, 10%,.5)');
        g.addColorStop(1,'hsla(242, 30%, 5%,.5)');
        $.fillStyle = g;
        $.beginPath();
        $.arc(this.x, this.y, this.rad * 2, 0, Math.PI * 2, true);
        $.fill();
        $.closePath();
        //inner particle
        var g2 = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.rad);
        g2.addColorStop(0, 'hsla('+this.hue+', 85%, 40%, 1)');
        g2.addColorStop(.5, 'hsla('+this.hue+',95%, 50%,1)');
        g2.addColorStop(1,'hsla(0,0%,0%,0)');
        $.fillStyle = g2;
        $.beginPath();
        $.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        $.fill();
        $.closePath();
      }
    };
    nodes.push(node);
  }
}

function run() {
  $.globalCompositeOperation = 'source-over';
  $.fillStyle = 'hsla(242, 40%, 5%,.85)';
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = 'lighter';
  for (i = 0; i < num; i++) {
    nodes[i].upd();
    nodes[i].draw();
  }
  for (i = 0; i < num - 1; i++) {
    var n1 = nodes[i];
    for (var j = i + 1; j < num; j++) {
      var n2 = nodes[j];
      Spr(n1, n2);
    }
    Grav(n1);
  }
   window.requestAnimationFrame(run);
}
function Spr(na, nb) {
  var dx = nb.x - na.x;
  var dy = nb.y - na.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < minDist) {
    $.lineWidth = 1;
    $.beginPath();
    $.strokeStyle = "hsla(217, 95%, 55%, .15)";
    $.moveTo(na.x, na.y);
    $.lineTo(nb.x, nb.y);
    $.stroke();
    $.closePath();
    var ax = dx * spr;
    var ay = dy * spr;
    na.vx += ax;
    na.vy += ay;
    nb.vx -= ax;
    nb.vy -= ay;
  }
}

function Grav(n) {
  n.vx += (gravX - n.x) * grav;
  n.vy += (gravY - n.y) * grav;
};
window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
});
