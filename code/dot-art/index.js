window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

var canvas = document.getElementById('tutorial')
var winW = window.innerWidth
var winH = window.innerHeight
canvas.setAttribute('width', winW)
canvas.setAttribute('height', winH)

var pen = canvas.getContext('2d')

var w = canvas.width
var h = canvas.height
var img = new Image()
var _data = []
img.onload = () => {
  pen.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h)

  var imgData = pen.getImageData(0, 0, w, h).data

  for (var i = 0; i < imgData.length; i += 4) {
    let r = imgData[i]
    let g = imgData[i + 1]
    let b = imgData[i + 2]
    let a = imgData[i + 3] / 255

    _data.push({
      c: 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')',
      a: a,
    })
  }

  for (var j = 0, n = _data.length; j < n; j++) {
    _data[j].x = j % w
    _data[j].y = Math.ceil(j / w)
  }

  pen.clearRect(0, 0, w, h)
  anime()
}

img.src = './1.jpg'

function anime() {
  var len = _data.length
  for (var i = 0; i < 500; i++) {
    draw(_data[Math.floor(range(0, len))])
  }
  requestAnimFrame(anime)
}

function draw(data) {
  pen.beginPath()
  pen.lineWidth = range(0,0.6);
  // pen.fillStyle = data.c
  pen.strokeStyle = data.c;
  pen.arc(data.x, data.y, range(0, 5), 0, Math.PI * 2)
  // pen.fillRect(data.x,data.y,range(0,4),range(0,2));

  // var r1 = range(0,10);
  // var r2 = range(0,10);
  // pen.moveTo(data.x,data.y);
  // pen.lineTo(data.x + r1,data.y + r2);
  // pen.closePath();
  // pen.fill()
  pen.stroke();
}

function range(m, n) {
  return parseFloat((Math.random() * (n - m) + m).toFixed(2))
}
