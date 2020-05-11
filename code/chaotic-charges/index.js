(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback/*, element*/) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                                 timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
})();

/**
* Generate a neon ball
* @param {Number} w width
* @param {Number} h height
* @param {Number} r red
* @param {Number} g green
* @param {Number} b blue
* @param {Number} a alpha
* @returns {HTMLCanvasElement}
*/
function generateNeonBall(w, h, r, g, b, a) {

  var tempCanvas = document.createElement("canvas");

  tempCanvas.width = w;
  tempCanvas.height = h;

  var imgCtx = tempCanvas.getContext("2d");
  var gradient = imgCtx.createRadialGradient( w/2, h/2, 0, w/2, h/2, w/2 );

  gradient.addColorStop( 0, 'rgba(255,255,255,' + a + ')' );
  gradient.addColorStop( 0.3, 'rgba(' + [r, g, b, a * .5] + ')' );
  gradient.addColorStop( 1, 'rgba(' + [r, g, b, 0] + ')' ); //0,0,64

  imgCtx.fillStyle = gradient;
  imgCtx.fillRect( 0, 0, w, h);

  return tempCanvas;
}

var div = document.querySelector('#canvas')
    , canvas = document.querySelector('canvas')
    , ctx = canvas.getContext('2d')
    ;

function rand(max, min) {
  min = min || 0;
  return (Math.random() * (max - min)) + min;
}

function sig() {
  return (Math.floor(Math.random() * 3 % 3) ? 1 : -1);
}

var colorPoints = {}
    , red = [
        Math.floor(rand(255, 100))
        , Math.floor(rand(255, 100))
        , Math.floor(rand(255, 100))
    ]
    , green = [
        Math.floor(rand(255, 100))
        , Math.floor(rand(255, 100))
        , Math.floor(rand(255, 100))
    ]
    , blue = [
        Math.floor(rand(255, 100))
        , Math.floor(rand(255, 100))
        , Math.floor(rand(255, 100))
    ]
    ;

function Point() {
  var obj = {
        x : 0
        , y : rand(div.clientHeight)
        , w : (sig() + sig()) || sig()
        , h : (sig() - sig()) || sig()
        , r : false ? red[Math.floor(rand(3))] : 255
        , g : true ?  green[Math.floor(rand(3))] : 255
        , b : false ? blue[Math.floor(rand(3))] : 255
        , a : Math.floor(rand(100)) * .01
      }
      , colorKey = 'rgb(' + [obj.r, obj.g, obj.b] + ')'
      ;
  if (!colorPoints.hasOwnProperty(colorKey))
    colorPoints[colorKey] = [];
  colorPoints[colorKey].push(obj);
  colorPoints[colorKey].neon = generateNeonBall(32, 32, obj.r, obj.g, obj.b, 1); 
  return obj;
}

var valid = false
    , w = 1
    , h = 1
    , points = []
    , max = 1000
    ;

!function drawwing() {
  requestAnimationFrame(drawwing);
  
  if (valid)
    return;
  
  valid = true;
  
  if (div.clientWidth != canvas.width) {
    canvas.width = div.clientWidth;
  }
  
  if (div.clientHeight != canvas.height) {
    canvas.height = div.clientHeight;
  }
  
  if (max > points.length)
    points.push(Point());
  
  ctx.save();
  
  ctx.globalCompositeOperation = 'destination-out';
  //ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillStyle = 'rgba(0, 0, 0, .2)';
  //ctx.globalAlpha = .2;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'lighter';
  
  ctx.fillStyle = "none";
  var arr, l, x, y, xo, yo;
  
  for(var key in colorPoints) {
    if (!colorPoints.hasOwnProperty(key))
      continue;
    
    ctx.beginPath();
  
    ctx.strokeStyle = key;

    arr = colorPoints[key];
    l = arr.length;
    
    while(l--) {
      point = arr[l];
      
      x = point.x;
      y = point.y;

      ctx.moveTo(point.x, point.y);

      point.x += rand(rand(5)) * point.w;
      point.y += rand(rand(5)) * point.h;
      
      point.x = (xo = point.x > canvas.width)
        ? canvas.width
        : (xo = point.x < 0)
          ? 0
          : point.x
      ;
      xo && (point.w *= -1)

      point.y = (yo = point.y > canvas.height)
        ? canvas.height
        : (yo = point.y < 0)
          ? 0
          : point.y
      ;
      yo && (point.h *= -1);

      ctx.lineTo(point.x, point.y);
      
      if (xo || yo)
        ctx.drawImage(arr.neon, x - 16, y - 16, 32, 32);
    }

    ctx.stroke();
    ctx.fill();
    
  }
  ctx.restore();
  
  valid = false;
}();
