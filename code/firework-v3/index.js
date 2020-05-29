(function () {

  /*text = new createjs.Text(stage.numChildren, "20px Arial", "#ff7700");
              stage.addChild(text)*/
  /*stage = new createjs.SpriteStage(canvas)*/
  var Anim, Fireworks, GRAVITY, K, SPEED, ToRadian, canvas, context, ctx, fireworks, handleTick, stage;

  canvas = document.getElementById("canvas");

  context = canvas.getContext("2d");

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

  stage = new createjs.Stage(canvas);

  stage.autoClear = false;

  ctx = canvas.getContext("2d");

  ctx.fillStyle = "rgba(0, 0, 0, 0)";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  createjs.Ticker.setFPS(60);

  createjs.Touch.enable(stage);

  stage.update();

  // 重力
  GRAVITY = 2;

  // 抵抗
  K = 0.9;

  // スピード
  SPEED = 12;

  // 角度(degree)からラジアン(radian)に変換
  ToRadian = function (degree) {
    return degree * Math.PI / 180.0;
  };


  // 花火を作り上げるクラス
  Fireworks = class Fireworks {
    constructor(sx = 100, sy = 100, particles = 70) {
      var circle, i, j, rad, ref, speed;
      this.setUp = this.setUp.bind(this);
      this.buildParticle = this.buildParticle.bind(this);
      this.sx = sx;
      this.sy = sy;
      this.particles = particles;
      this.sky = new createjs.Container();
      this.sky.setBounds(this.sx - 130, this.sy - 100, 250, 250);
      this.sprite = new createjs.SpriteSheetBuilder();
      this.r = 0;
      this.h = Math.random() * 360 | 0;
      this.s = 100;
      this.l = 50;
      this.size = 3;
      this.index;
      for (i = j = 0, ref = this.particles; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        speed = Math.random() * 12 + 2;
        circle = new createjs.Shape();
        circle.graphics.f(`hsla(${this.h}, ${this.s}%, ${this.l}%, 1)`).dc(0, 0, this.size);
        circle.snapToPixel = true;
        circle.compositeOperation = "lighter";
        rad = ToRadian(Math.random() * 360 | 0);
        circle.set({
          x: this.sx,
          y: this.sy,
          vx: Math.cos(rad) * speed,
          vy: Math.sin(rad) * speed,
          rad: rad });

        this.sky.addChild(circle);
      }
    }

    setUp(target) {
      var circle, j, p, ref, results;
      ++this.h;
      results = [];
      for (p = j = 0, ref = target.getNumChildren(); 0 <= ref ? j < ref : j > ref; p = 0 <= ref ? ++j : --j) {
        circle = target.getChildAt(p);
        // 加速度
        circle.vx = circle.vx * K;
        circle.vy = circle.vy * K;
        // 位置計算
        circle.x += circle.vx;
        circle.y += circle.vy + GRAVITY;
        // 色
        this.l = Math.random() * 100;
        // パーティクルのサイズ
        this.size = this.size - 0.001;
        if (this.size > 0) {
          results.push(circle.graphics.c().f(`hsla(${this.h}, 100%, ${this.l}%, 1)`).dc(0, 0, this.size));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }

    buildParticle() {
      if (this.sky.alpha > 0.1) {
        this.sky.alpha -= K / 50;
        this.skyBounds = this.sky.getBounds();
        this.sprite.addFrame(this.sky, this.skyBounds, 1, this.setUp);
        this.buildParticle();
      } else {
        // addAnimation で アニメーションを登録する "アニメーション名",再生するフレーム番号,
        // 再生終了後に再生するアニメーション
        this.sprite.addAnimation("anim", function () {
          var results = [];
          for (var j = 0; j < 70; j++) {results.push(j);}
          return results;
        }.apply(this), false);
        this.sprite.addEventListener("complete", e => {
          this.buildSpriteSheet = e.currentTarget.spriteSheet;
          return this.sky = null;
        });

        // SpriteSheet クラスを作成
        this.sprite.buildAsync();
      }
    }};



  Anim = class Anim {
    constructor(buildSpriteSheet, x, y) {
      this.explode = this.explode.bind(this);
      this.buildSpriteSheet = buildSpriteSheet;
      this.x = x;
      this.y = y;
      this.explode(this.x, this.y);
    }

    explode(x, y) {
      this.anim = new createjs.Sprite(this.buildSpriteSheet, "anim");
      this.anim.compositeOperation = "lighter";
      this.anim.set({
        x: x,
        y: y,
        regX: 300 / 2,
        regY: 300 / 2,
        rotation: Math.random() * 360 >> 0 });

      this.anim.addEventListener("animationend", () => {
        return stage.removeChild(this.anim);
      });
      stage.addChild(this.anim);
    }};



  handleTick = function () {
    //   text.text = stage.numChildren
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return stage.update();
  };

  createjs.Ticker.addEventListener("tick", handleTick);

  fireworks = new Fireworks();

  fireworks.buildParticle();

  setInterval(function () {
    if (fireworks.buildSpriteSheet != null) {
      return new Anim(fireworks.buildSpriteSheet, Math.random() * canvas.width, Math.random() * canvas.height);
    }
  }, 10);

}).call(this);
