/*
* Referenced / Generative Art - written by sir Matt Pearson.
* File Name / fractal.js
* Created Date / Aug 27, 2020
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

/*
  Common Tool.
*/

class Tool {
  // random number.
  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // random color rgb.
  static randomColorRGB() {
    return (
      "rgb(" +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ")"
    );
  }
  // random color hsl.
  static randomColorHSL(hue, saturation, lightness) {
    return (
      "hsl(" +
      hue +
      ", " +
      saturation +
      "%, " +
      lightness +
      "%)"
    );
  }
  // gradient color.
  static gradientColor(ctx, cr, cg, cb, ca, x, y, r) {
    const col = cr + "," + cg + "," + cb;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(" + col + ", " + (ca * 1) + ")");
    g.addColorStop(0.5, "rgba(" + col + ", " + (ca * 0.5) + ")");
    g.addColorStop(1, "rgba(" + col + ", " + (ca * 0) + ")");
    return g;
  }
}

class Angle {
  constructor(angle) {
    this.a = angle;
    this.rad = this.a * Math.PI / 180;
  }

  incDec(num) {
    this.a += num;
    this.rad = this.a * Math.PI / 180;
    return this.rad;
  }
}

/*
  variable for canvas.
*/

let canvas;

class Canvas {
  constructor(bool) {
    // create canvas.
    this.canvas = document.createElement("canvas");
    // if on screen.
    if (bool === true) {
      this.canvas.style.position = 'relative';
      this.canvas.style.display = 'block';
      this.canvas.style.top = 0;
      this.canvas.style.left = 0;
      document.getElementsByTagName("body")[0].appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    // mouse infomation.
    this.mouseX = null;
    this.mouseY = null;
    // sprite array and quantity.
    this.numChildren = 7;
    this.maxLevels = 5;
    this.trunk = [];
  }

  init() {
    this.trunk.push(new Branch(this.ctx, 1, 0, this.width / 2, this.height / 2));
  }

  render() {
    //this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = "darken";
    this.ctx.globalAlpha = 0.1;
    this.ctx.fillStyle = "rgb(0,0,0)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.globalAlpha = 1;
    for (let i = 0; i < this.trunk.length; i++) {
      this.trunk[i].render();
    }
  }

  resize() {
    this.trunk = [];
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.numX = Math.floor(this.width / this.cellSize) + 2;
    this.numY = Math.floor(this.height / this.cellSize) + 2;
    this.init();
  }
}

class Branch {
  constructor(ctx, lev, ind, ex, why) {
    this.ctx = ctx;
    this.level = lev;
    this.index = ind;
    this.x = ex;
    this.y = why;
    this.endX;
    this.endY;
    this.c = 'white';
    this.a = new Angle(Tool.randomNumber(0, 360));
    this.children = [];
    this.len = Tool.randomNumber(10, 100);
    if (this.level < canvas.maxLevels) {
      for (let i = 0; i < canvas.numChildren; i++) {
        this.children[i] = new Branch(this.ctx, this.level + 1, i, this.endX, this.endY);
      }
    }
    this.random = Tool.randomNumber(-1, 1) * Math.random();
  }

  updateMe(ex, why) {
    this.x = ex;
    this.y = why;
    const rad = this.a.rad;
    this.endX = this.x + (this.len * Math.cos(rad));
    this.endY = this.y + (this.len * Math.sin(rad));
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].updateMe(this.endX, this.endY);
    }
    this.a.incDec(this.random);
  }

  drawMe(ex, why) {
    if (this.level > 1) {
      const ctx = this.ctx;
      ctx.save();
      ctx.lineWidth = 0.05;
      ctx.strokeStyle = this.c;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.endX, this.endY);
      ctx.stroke();
      ctx.restore();
    }
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].drawMe();
    }
  }

  render() {
    this.updateMe(canvas.width / 2, canvas.height / 2);
    this.drawMe();
  }
}

(function () {
  "use strict";
  window.addEventListener("load", function () {
    canvas = new Canvas(true);
    canvas.init();
    
    function render() {
      window.requestAnimationFrame(function () {
        canvas.render();
        render();
      });
    }
    
    render();

    // event
    window.addEventListener("resize", function () {
      canvas.resize();
    }, false);
  });
})();
