var w = c.width =
    h = c.height = 400,
    ctx = c.getContext('2d'),
    
    total = 50,
    particlesParRow = 10,
    minValue = 30,
    updatesBeforeStart = 500,
    repaintColor = 'rgba(0, 0, 0, .04)',
    templateColor = 'hsl(hue, 80%, 50%)',
    
    particles = [],
    colors = [],
    radiants = [],
    colorPart = 360/total,
    radiantPart = Math.PI*2/total,
    alphaValue = true;

for(var i = 0; i < total; ++i){
  
  var array = [];
  particles.push(array);
  colors.push(templateColor.replace('hue', colorPart * i));
  radiants.push(radiantPart * i);
  
  for(var j = 0; j < particlesParRow; ++j){
    array.push(i * minValue);
  }
}

for(var i = 0; i < updatesBeforeStart; ++i) update();

function anim(){
  window.requestAnimationFrame(anim);
  
  ctx.fillStyle = repaintColor;
  ctx.beginPath();
  ctx.arc(w/2, h/2, w/2 + 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  
  ctx.translate(w/2, h/2);
  ctx.rotate(.006);
  ctx.translate(-w/2, -h/2);
  
  for(var i = 0; i < total; ++i){
    ctx.fillStyle = colors[i];
    
    for(var j = 0; j < particlesParRow; ++j){
      var particle = particles[i][j];
      
      particles[i][j] -= particle/70;
      
      ctx.beginPath();
      ctx.arc(w/2, h/2, particle, radiants[i], radiants[i] + radiantPart);
      ctx.arc(w/2, h/2, particles[i][j], radiants[i] + radiantPart, radiants[i], true);
      ctx.closePath();
      ctx.fill();
      
      if(particles[i][j] <= minValue && Math.random() < .1){
        particles[i][j] = w/2;
      }
    }
  }
}

anim();

function update(){
  for(var i = 0; i < total; ++i){
    for(var j = 0; j < particlesParRow; ++j){
      var particle = particles[i][j];
      
      particles[i][j] -= particle/70;
      
      if(particles[i][j] <= minValue && Math.random() < .1){
        particles[i][j] = w/2;
      }
    }
  }
}

alpha.addEventListener('click', function(){
  if(alphaValue){
    alphaValue = false;
    repaintColor = 'black';
    alpha.textContent = 'solid';
  } else {
    alphaValue = true;
    repaintColor = 'rgba(0, 0, 0, .04)';
    alpha.textContent = 'alpha';
  }
})
