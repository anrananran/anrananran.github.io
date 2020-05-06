/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", () => {
    reset();
    draw();
  });
  canvas.addEventListener("click", draw);
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function draw() {
  ctx.fillRect(0, 0, w, h);
  drawCircles();
}

function drawCircles() {
  let baseHue = Math.random() * 360;
  setColor(baseHue);
  let step = Math.min(w, h) * 0.03;
  let positions = [];
  let margin = 0.2;
  for(let x = w * margin; x < w * (1 - margin); x += step) {
    for(let y = h * margin; y < h * (1 - margin); y += step) {
      positions.push([x, y]);
    }
  }
  
  let i = positions.length;
  while (i--) {
    let randomIndex = Math.floor(Math.random() * positions.length);
    let [x, y] = positions[randomIndex];
    drawCircle(x, y);
    positions.splice(randomIndex, 1);
  }
}

function setColor(hue) {
  let color = `hsl(${hue}, 90%, 60%)`;
  ctx.strokeStyle = color;
}

function drawCircle(x, y) {
  let radii = [];
  let aLittleExtra = Math.random() > 0.9 ? 1.8 : 1;
  let R = Math.min(w, h) * 0.045 * aLittleExtra + 4;
  let maxRandomR = Math.random() * R;
  let nrOfCircles = Math.random() * maxRandomR * 0.3 + 3;
  for(let i = 0; i < nrOfCircles; i++) {
    let r = Math.random() * maxRandomR;
    radii.push(r);
  }
  
  let maxR = Math.max(...radii);
  ctx.beginPath();
  ctx.arc(x, y, maxR, 0, Math.PI * 2);
  ctx.fill();
  
  radii.forEach(r => {
    let maxWidth = w * h * 0.000002;
    let width = Math.random() * maxWidth + 1;
    ctx.lineWidth = width;    
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  });
}

setup();
draw();
