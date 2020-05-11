
class Calc {

  /*
            ------------------------------------------
            | rand:float - returns random float
            |
            | min:number - minimum value
            | max:number - maximum value
            | ease:function - easing function to apply to the random value
            |
            | Get a random float between two values,
            | with the option of easing bias.
            ------------------------------------------ */
  static rand(min, max, ease) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    let random = Math.random();
    if (ease) {
      random = ease(Math.random(), 0, 1, 1);
    }
    return random * (max - min) + min;
  }

  /*
    ------------------------------------------
    | randInt:integer - returns random integer
    |
    | min:number - minimum value
    | max:number - maximum value
    | ease:function - easing function to apply to the random value
    |
    | Get a random integer between two values,
    | with the option of easing bias.
    ------------------------------------------ */
  static randInt(min, max, ease) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    let random = Math.random();
    if (ease) {
      random = ease(Math.random(), 0, 1, 1);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /*
    ------------------------------------------
    | randArr:item - returns random iem from array
    |
    | arr:array - the array to randomly pull from
    |
    | Get a random item from an array.
    ------------------------------------------ */
  static randArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /*
    ------------------------------------------
    | map:number - returns a mapped value
    |
    | val:number - input value
    | inputMin:number - minimum of input range
    | inputMax:number - maximum of input range
    | outputMin:number - minimum of output range
    | outputMax:number - maximum of output range
    |
    | Get a mapped value from and input min/max
    | to an output min/max.
    ------------------------------------------ */
  static map(val, inputMin, inputMax, outputMin, outputMax) {
    return (outputMax - outputMin) * ((val - inputMin) / (inputMax - inputMin)) + outputMin;
  }

  /*
    ------------------------------------------
    | clamp:number - returns clamped value
    |
    | val:number - value to be clamped
    | min:number - minimum of clamped range
    | max:number - maximum of clamped range
    |
    | Clamp a value to a min/max range.
    ------------------------------------------ */
  static clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
  }

  /*
    ------------------------------------------
    | roundToUpperInterval:number - returns rounded up value
    |
    | value:number - value to be rounded
    | interval:number - interval
    |
    | Round up a value to the next highest interval.
    ------------------------------------------ */
  static roundToUpperInterval(value, interval) {
    if (value % interval === 0) {
      value += 0.0001;
    }
    return Math.ceil(value / interval) * interval;
  }

  /*
    ------------------------------------------
    | roundDownToInterval:number - returns rounded down value
    |
    | value:number - value to be rounded
    | interval:number - interval
    |
    | Round down a value to the next lowest interval.
    ------------------------------------------ */
  static roundToLowerInterval(value, interval) {
    if (value % interval === 0) {
      value -= 0.0001;
    }
    return Math.floor(value / interval) * interval;
  }

  /*
    ------------------------------------------
    | roundToNearestInterval:number - returns rounded value
    |
    | value:number - value to be rounded
    | interval:number - interval
    |
    | Round a value to the nearest interval.
    ------------------------------------------ */
  static roundToNearestInterval(value, interval) {
    return Math.round(value / interval) * interval;
  }

  /*
    ------------------------------------------
    | intersectSphere:boolean - returns if intersecting or not
    |
    | a:object - sphere 1 with radius, x, y, and z
    | b:object - sphere 2 with radius, x, y, and z
    |
    | Check if two sphere are intersecting
    | in 3D space.
    ------------------------------------------ */
  static intersectSphere(a, b) {
    let distance = Math.sqrt(
    (a.x - b.x) * (a.x - b.x) +
    (a.y - b.y) * (a.y - b.y) +
    (a.z - b.z) * (a.z - b.z));

    return distance < a.radius + b.radius;
  }

  /*
    ------------------------------------------
    | getIndexFromCoords:number - returns index
    |
    | x:number - x value (column)
    | y:number - y value (row)
    | w:number - width of grid
    |
    | Convert from grid coords to index.
    ------------------------------------------ */
  static getIndexFromCoords(x, y, w) {
    return x + y * w;
  }

  /*
    ------------------------------------------
    | getCoordsFromIndex:object - returns coords
    |
    | i:number - index
    | w:number - width of grid
    |
    | Convert from index to grid coords.
    ------------------------------------------ */
  static getCoordsFromIndex(i, w) {
    return {
      x: i % w,
      y: Math.floor(i / w) };

  }}


class Ease {

  /*
            ------------------------------------------
            | constructor:void
            |
            | Construct
            ------------------------------------------ */
  constructor() {
  }

  /*
    ------------------------------------------
    | inQuad:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inQuad.
    ------------------------------------------ */
  static linear(t, b, c, d) {
    return t / d * (b + c);
  }

  /*
    ------------------------------------------
    | inQuad:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inQuad.
    ------------------------------------------ */
  static inQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
  }

  /*
    ------------------------------------------
    | outQuad:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outQuad.
    ------------------------------------------ */
  static outQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  }

  /*
    ------------------------------------------
    | inOutQuad:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutQuad.
    ------------------------------------------ */
  static inOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * (--t * (t - 2) - 1) + b;
  }

  /*
    ------------------------------------------
    | inCubic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inCubic.
    ------------------------------------------ */
  static inCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  }

  /*
    ------------------------------------------
    | outCubic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outCubic.
    ------------------------------------------ */
  static outCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }

  /*
    ------------------------------------------
    | inOutCubic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutCubic.
    ------------------------------------------ */
  static inOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  }

  /*
    ------------------------------------------
    | inQuart:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inQuart.
    ------------------------------------------ */
  static inQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  }

  /*
    ------------------------------------------
    | outQuart:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outQuart.
    ------------------------------------------ */
  static outQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  }

  /*
    ------------------------------------------
    | inOutQuart:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutQuart.
    ------------------------------------------ */
  static inOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  }

  /*
    ------------------------------------------
    | inQuint:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inQuint.
    ------------------------------------------ */
  static inQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  }

  /*
    ------------------------------------------
    | outQuint:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outQuint.
    ------------------------------------------ */
  static outQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  }

  /*
    ------------------------------------------
    | inOutQuint:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutQuint.
    ------------------------------------------ */
  static inOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  }

  /*
    ------------------------------------------
    | inSine:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inSine.
    ------------------------------------------ */
  static inSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  }

  /*
    ------------------------------------------
    | outSine:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outSine.
    ------------------------------------------ */
  static outSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }

  /*
    ------------------------------------------
    | inOutSine:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutSine.
    ------------------------------------------ */
  static inOutSine(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  }

  /*
    ------------------------------------------
    | inExpo:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inExpo.
    ------------------------------------------ */
  static inExpo(t, b, c, d) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  }

  /*
    ------------------------------------------
    | outExpo:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outExpo.
    ------------------------------------------ */
  static outExpo(t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  }

  /*
    ------------------------------------------
    | inOutExpo:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutExpo.
    ------------------------------------------ */
  static inOutExpo(t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }

  /*
    ------------------------------------------
    | inCirc:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inCirc.
    ------------------------------------------ */
  static inCirc(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  }

  /*
    ------------------------------------------
    | outCirc:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outCirc.
    ------------------------------------------ */
  static outCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  }

  /*
    ------------------------------------------
    | inOutCirc:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutCirc.
    ------------------------------------------ */
  static inOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  }

  /*
    ------------------------------------------
    | inElastic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inElastic.
    ------------------------------------------ */
  static inElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
    if (a < Math.abs(c)) {a = c;var s = p / 4;} else
    var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  }

  /*
    ------------------------------------------
    | outElastic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outElastic.
    ------------------------------------------ */
  static outElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
    if (a < Math.abs(c)) {a = c;var s = p / 4;} else
    var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  }

  /*
    ------------------------------------------
    | inOutElastic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutElastic.
    ------------------------------------------ */
  static inOutElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {a = c;var s = p / 4;} else
    var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  }

  /*
    ------------------------------------------
    | inBack:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    | s:number - strength
    |
    | Get an eased float value based on inBack.
    ------------------------------------------ */
  static inBack(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  }

  /*
    ------------------------------------------
    | outBack:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    | s:number - strength
    |
    | Get an eased float value based on outBack.
    ------------------------------------------ */
  static outBack(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  }

  /*
    ------------------------------------------
    | inOutBack:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    | s:number - strength
    |
    | Get an eased float value based on inOutBack.
    ------------------------------------------ */
  static inOutBack(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  }

  /*
    ------------------------------------------
    | inBounce:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outBounce.
    ------------------------------------------ */
  static inBounce(t, b, c, d) {
    return c - this.outBounce(d - t, 0, c, d) + b;
  }

  /*
    ------------------------------------------
    | outBounce:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outBounce.
    ------------------------------------------ */
  static outBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
    }
  }

  /*
    ------------------------------------------
    | inOutBounce:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutBounce.
    ------------------------------------------ */
  static inOutBounce(t, b, c, d) {
    if (t < d / 2) return this.inBounce(t * 2, 0, c, d) * .5 + b;
    return this.outBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
  }}


class Walker {
  
  constructor(config) {
    this.simplex = config.simplex;
    this.total = config.total;
    this.x = config.x;
    this.y = config.y;
    this.dir = config.dir;
    this.speed = config.speed;
    this.delta = config.delta;
    this.time = config.time;
    this.angleRange = config.angleRange;
    this.away = config.away;
    this.depth = config.depth;

    this.position = new THREE.Vector3(this.x, this.y, 0);
    this.path = [];
    
    this.build();
  }
  
  build() {
    for(let i = 0; i < this.total; i++) {
      this.step(i / this.total);
    }
  }
  
  step(p) {
    // progress the time for noise
    this.time += this.delta;
    
    // get noise values for angle and speed
    this.angle = Calc.map(this.simplex.noise2D(this.time, 0), -1, 1, -this.angleRange, this.angleRange);
    this.speed = Calc.map(this.simplex.noise2D(this.time, 1000), -1, 1, 0, 0.01);

    // apply noise values
    this.dir += this.angle;
    this.position.x += Math.cos(this.dir) * this.speed;
    this.position.y += Math.sin(this.dir) * this.speed;

    // grow away or toward the camera
    if(this.away) {
      this.position.z = Calc.map(p, 0, 1, this.depth / 2, -this.depth / 2);
    } else {
      this.position.z = Calc.map(p, 0, 1, -this.depth / 2, this.depth / 2);
    }
    
    // push new position into the path array
    this.path.push({
      x: this.position.x,
      y: this.position.y,
      z: this.position.z
    });
  } 
  
}

class Generator {
  
  constructor() {
    this.setupCamera();
    this.setupScene();
    this.setupRenderer(); 
    this.setupLines();
    this.setupOrbit();
    this.setupControls();
    
    this.listen();
    this.onResize();
    this.reset();    
    this.loop();
  }
  
  setupCamera() {
    this.fov = 75;
    this.camera = new THREE.PerspectiveCamera(this.fov, 0, 0.01, 1000);
    this.camera.position.z = 10;
  }
  
  setupScene() {
    this.scene = new THREE.Scene();
  }
  
  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    document.body.appendChild(this.renderer.domElement);
  }
  
  setupOrbit() {
    this.orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.enableDamping = true;
    this.orbit.dampingFactor = 0.2;
    this.orbit.enableKeys = false;
  }

  setupControls() {
    this.vb = new VariaBoard({
      container: document.body,
      title: 'Simplex Flower Generator',
      changeCallback: () => {
        this.reset();
      }
    });
    
    this.vb.addRange({
      id: 'lines',
      title: 'Lines',
      description: 'Amount of lines per stem',
      min: 1,
      max: 6,
      step: 1,
      default: 3,
      eased: false
    });
    
    this.vb.addRange({
      id: 'stems',
      title: 'Stems',
      description: 'Amount of stems (reflections of lines)',
      min: 1,
      max: 10,
      step: 1,
      default: 5,
      eased: false
    });
    
    this.vb.addRange({
      id: 'angle-range',
      title: 'Angle Range',
      description: 'Amount that the angle can change per noise step',
      min: 0.002,
      max: 0.018,
      step: 0.001,
      default: 0.01,
      eased: false
    });
    
    this.vb.addRange({
      id: 'depth',
      title: 'Depth',
      description: 'Depth of the flower in Z space',
      min: 0,
      max: 10,
      step: 0.1,
      default: 5,
      eased: false
    });
    
    this.vb.addRange({
      id: 'noise-speed',
      title: 'Noise Speed',
      description: 'How fast the noise values change over time',
      min: 0.000001,
      max: 0.0005,
      step: 0.000001,
      default: 0.0003,
      eased: false
    });
    
    this.vb.addRange({
      id: 'iterations',
      title: 'Iterations',
      description: 'Amount of growth iterations per stem',
      min: 500,
      max: 8000,
      step: 1,
      default: 3000,
      eased: false
    });
    
    this.vb.addRange({
      id: 'hue',
      title: 'Hue',
      description: 'Base hue of the flower',
      min: 0,
      max: 360,
      step: 1,
      default: 300,
      eased: false
    });
    
    this.vb.addRange({
      id: 'hue-range',
      title: 'Hue Range',
      description: 'Hue variance from the base hue per line',
      min: 0,
      max: 90,
      step: 1,
      default: 90,
      eased: false
    });
        
    this.vb.addRange({
      id: 'lightness',
      title: 'Lightness',
      description: 'Overall lightness of lines',
      min: 0,
      max: 100,
      step: 1,
      default: 60,
      eased: false
    });
    
    this.vb.addBoolean({
      id: 'invert',
      title: 'Invert',
      description: 'Flip the background color',
      default: false
    });
    
    this.vb.addButton({
      id: 'randomize',
      title: 'Randomize',
      description: 'Set all controls to random values',
      callback: () => {
        this.vb.randomize();
      }
    });
    
    this.vb.addButton({
      id: 'save-image',
      title: 'Save Image',
      description: 'Save flower snapshot as an image file',
      callback: (e, button, variaboard) => {
        this.renderer.render(this.scene, this.camera);
        button.dom.button.setAttribute('href', this.renderer.domElement.toDataURL('image/png'));
        button.dom.button.setAttribute('download', `simplex-flower-${Date.now()}.png`);
      }
    });
    
    this.vb.addButton({
      id: 'generate',
      title: 'Generate',
      description: 'Generate a new flower',
      callback: () => {
        this.reset();
      }
    });
  }
  
  setupLines() {
    this.meshes = [];
    this.meshGroup = new THREE.Object3D();
    this.meshGroupScale = 1;
    this.meshGroupScaleTarget = 1;
    this.scene.add(this.meshGroup);
  }
  
  generate() {
    this.simplex = new SimplexNoise();
    this.count = this.vb.get('lines');
    this.stems = this.vb.get('stems');
    this.edge = 0;
    
    this.scene.background = this.vb.get('invert') ? new THREE.Color('#fff') : new THREE.Color('#000')
    
    for(let i = 0; i < this.count; i++) {
      // setup a new walker/wanderer
      let centered = Math.random() > 0.5;
      let walker = new Walker({
        simplex: this.simplex,
        total: this.vb.get('iterations'),
        x: centered ? 0 : Calc.rand(-1, 1),
        y: centered ? 0 : Calc.rand(-1, 1),
        dir: (i / (this.count)) * ((Math.PI * 2) / this.stems),
        speed: 0,
        delta: this.vb.get('noise-speed'),
        angleRange: this.vb.get('angle-range'),
        away: 0,
        depth: this.vb.get('depth'),
        time: i * 1000
      });
      let geometry = new THREE.Geometry();
      let line = new MeshLine();

      // grab each path point and push it to the geometry
      for(let j = 0, len = walker.path.length; j < len; j++) {
        let p = walker.path[j];
        let x = p.x;
        let y = p.y;
        let z = p.z;
        this.edge = Math.max(this.edge, Math.abs(x), Math.abs(y));
        geometry.vertices.push(new THREE.Vector3(x, y, z));
      }

      // set the thickness of the line and assign the geometry
      line.setGeometry(geometry, (p) => {
        let size = 1;
        let n = size - Math.abs(Calc.map(p, 0, 1, -size, size)) + 0.1;
        return n;
      });

      // create new material based on the controls
      let material = new MeshLineMaterial({
        blending: this.vb.get('invert') ? THREE.NormalBlending : THREE.AdditiveBlending,
        color: new THREE.Color(`hsl(${360 + this.vb.get('hue') + Calc.map(i, 0, this.count, -this.vb.get('hue-range'), this.vb.get('hue-range'))}, 100%, ${this.vb.get('lightness')}%)`),
        depthTest: false,
        opacity: 1,
        transparent: true,
        lineWidth: 0.04,
        resolution: this.resolution
      });

      // create meshes for all of the stems/reflections
      for(let k = 0; k < this.stems; k++) {
        let mesh = new THREE.Mesh(line.geometry, material);
        mesh.rotation.z = Calc.map(k, 0, this.stems, 0, Math.PI * 2);
        this.meshes.push(mesh);
        this.meshGroup.add(mesh);
      }
    }     
  }
  
  worldToScreen(vector, camera) {
    vector.project(camera);
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    vector.x = (vector.x * cx) + cx;
    vector.y = -(vector.y * cy) + cy;
    return vector;
  }
  
  reset() {
    // empty out meshes array
    if(this.meshes) {
      this.meshes.length = 0;
    }

    // remove all children from mesh group
    if(this.meshGroup) {
      while(this.meshGroup.children.length) {
        this.meshGroup.remove(this.meshGroup.children[0]);
      }
    }
    
    // reset the camera
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 10;
    this.camera.lookAt(new THREE.Vector3());
    
    // initialize progres values
    this.progress = 0; // overall progress ticker
    this.progressed = false; // has run once
    this.progressModulo = 0; // resets progress on modulus
    this.progressEffective = 0; // progress amount to use
    this.progressEased = 0; // eased progress
    
    this.generate();
    
    requestAnimationFrame(() => {
      // scale until the flower roughly fits within the viewport
      let tick = 0;
      let exit = 50;
      let scale = 1;
      this.meshGroup.scale.set(scale, scale, scale);
      let scr = this.worldToScreen(new THREE.Vector3(0, this.edge, 0), this.camera);
      while(scr.y < window.innerHeight * 0.2 && tick <= exit) {
        scale -= 0.05;
        scr = this.worldToScreen(new THREE.Vector3(0, this.edge * scale, 0), this.camera);
        tick++;
      }
      this.meshGroupScaleTarget = scale;
    });
  }
  
  listen() {
    window.addEventListener('resize', () => this.onResize());
  }
  
  onResize() {
    this.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;
    
    this.camera.aspect = this.resolution.x / this.resolution.y;
		this.camera.updateProjectionMatrix();

		this.renderer.setPixelRatio(this.dpr);
		this.renderer.setSize(this.resolution.x, this.resolution.y);
  }
  
  loop() {
    // subtly rotate the mesh
    this.meshGroup.rotation.x = Math.cos(Date.now() * 0.001) * 0.1;
    this.meshGroup.rotation.y = Math.sin(Date.now() * 0.001) * -0.1;
    
    // handle all the funky progress math
    // there is a cleaner way of doing this, I'll find it
    this.progress += 0.005;
    if(this.progress > 1) {
      this.progressed = true;
    }
    this.progressModulo = this.progress % 2;
    this.progressEffective = this.progressModulo < 1 ? this.progressModulo : 1 - (this.progressModulo - 1);
    this.progressEased = this.progressed ? Ease.inOutExpo(this.progressEffective, 0, 1, 1) : Ease.outExpo(this.progressEffective, 0, 1, 1) ;
    
    // loop over all meshes and update their opacity and visibility
    let i = this.meshes.length;
    while(i--) {
      let mesh = this.meshes[i];
      mesh.material.uniforms.opacity.value = Calc.clamp(this.progressEffective * 2, 0, 1);
      mesh.material.uniforms.visibility.value = this.progressEased;
    }
    
    // ease the scale of the mesh
    this.meshGroupScale += (this.meshGroupScaleTarget - this.meshGroupScale) * 0.3;
    this.meshGroup.scale.set(this.meshGroupScale, this.meshGroupScale, this.meshGroupScale);
    
    // update orbit controls
    this.orbit.update();
    
    // render the scene and queue up another frame
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(() => this.loop());
  }
  
}

setTimeout(() => {
  let generator = new Generator();
}, 250);
