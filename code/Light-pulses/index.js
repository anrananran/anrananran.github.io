var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),
    
    opts = {
      
      circleCount: 5,
      lightCount: 30,
      
      cenX: w/2,
      cenY: h/2,
      startLen: 2,
      endLen: Math.sqrt( w*w/4 + h*h/4 ),
      // this may need a bit of explanation:
      // it's the distance corner-center,
      // the max radius of the circle.
      // sqrt( c1*c1 + c2*c2 ) = hypothenuse
      // c1 = w/2, c2 = h/2
      
      lenIncrement: 2,
      circleJitter: 10,
      lightJitter: 3,
      lightLifeMultiplier: .06,
      
      circleHueVariation: 60,
      circleHueMultiplier: 1,
      circleTemplateColor: 'hsl( hue, 80%, light% )',
      circleShadowBlur: 10,
      lightShadowMultiplier: .01,
      
      repaintAlpha: .05
    },
    
    tick = ( Math.random() * 360 ) |0,
    circles = [],
    
    gui = new dat.GUI,
    first = true;

function init() {
  
  circles.length = 0;
  for( var i = 0; i < opts.circleCount; ++i )
    circles.push( 
      new Circle( 
        i * ( opts.endLen - opts.startLen ) / opts.circleCount
      ) );
  
  ctx.fillStyle = '#222';
  ctx.fillRect( 0, 0, w, h );
  
  if( first ) {
    
    first = false;
    
    // hacky lazy way
    for( var name in opts ) {
      
      gui.add( opts, name );
    }
    gui.close();
    
    loop();
  }
}

function loop() {
  
  window.requestAnimationFrame( loop );
  step();
  draw();
}

function step() {
  
  ++tick;
  
  circles.map( circle => circle.step() );
}

function draw() {
  
  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', opts.repaintAlpha );
  ctx.fillRect( 0, 0, w, h );
  ctx.globalCompositeOperation = 'lighter';
  
  circles.map( circle => circle.draw() );
}

function Circle( len ) {
  
  this.lights = [];
  for( var l = 0; l < opts.lightCount; ++l )
    this.lights.push( new Light( this ) );
  
  this.reset();
  this.len = len;
}
Circle.prototype.reset = function() {
  
  this.len = opts.startLen;
  this.hue = ( ( opts.circleHueMultiplier * tick ) % 360 ) |0;
  
  this.lights.map( light => light.reset() );
}

Circle.prototype.step = function() {
  
  this.len += opts.lenIncrement;
  
  if( this.len >= opts.endLen )
    this.reset();
  
  this.lights.map( light => light.step() );
}
Circle.prototype.draw = function() {
  
  ctx.fillStyle = ctx.shadowColor = opts.circleTemplateColor
    .replace( 'hue', this.hue + ( Math.random() * opts.circleHueVariation ) |0 )
    .replace( 'light', 25 + ( 35 * Math.random() ) |0  );
  
  ctx.shadowBlur = opts.circleShadowBlur;
  
  ctx.beginPath();
  ctx.arc( opts.cenX + Math.random() * opts.circleJitter - opts.circleJitter / 2,
           opts.cenY + Math.random() * opts.circleJitter - opts.circleJitter / 2,
           this.len - opts.lenIncrement, 0, Math.PI * 2, true );
  ctx.arc( opts.cenX + Math.random() * opts.circleJitter - opts.circleJitter / 2,
           opts.cenY + Math.random() * opts.circleJitter - opts.circleJitter / 2,
           this.len, 0, Math.PI * 2 );
  ctx.fill();
  
  this.lights.map( light => light.draw() );
}

function Light( circle ) {
  
  this.circle = circle;
  this.reset();
}
Light.prototype.reset = function() {
  
  var rad = Math.random() * Math.PI * 2;
  
  this.x = opts.cenX + ( Math.cos( rad ) * this.circle.len + Math.random() * opts.lightJitter - opts.lightJitter / 2 ) |0;
  this.y = opts.cenY + ( Math.sin( rad ) * this.circle.len + Math.random() * opts.lightJitter - opts.lightJitter / 2 ) |0;
  
  this.life = 0;
  this.maxLife = ( Math.random() * this.circle.len * opts.lightLifeMultiplier ) |0;
}
Light.prototype.step = function() {
  
  ++this.life;
  if( this.life >= this.maxLife )
    this.reset();
}
Light.prototype.draw = function() {
  
  ctx.shadowBlur = this.life * opts.lightShadowMultiplier;
  ctx.fillRect( this.x - this.life / 2, this.y - this.life / 2, this.life, this.life );
}

init();
