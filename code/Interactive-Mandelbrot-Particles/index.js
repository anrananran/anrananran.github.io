// Interactive Mandelbrot Particles - An Interactive Fractal Particle Simulation
// - Move mouse to set spawn point
// - Any key to reset

// Created by Frank Force 2020
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

randomness     = .005; // how much randomness for each point
trailAlpha     = 5;    // controls trail length
life           = 400;  // how long to keep particles alive
maxCount       = 2e4;  // maximum number of particles
scale          = 1;    // size of mandelbrot set
offset         = .1;   // x position of mandelbrot set
spawnCount     = 100;    // how many particles to spawn each frame
updateCount    = 1;    // how many updates each frame
juliaMode      = 0;    // juia set mode
warmUp         = 1;    // some random points on start so it's not blank
testMode       = 1;    // fully random mode for testing
onlyMandelbrot = 0;    // only use mandelbrot points
aspect         = 1;    // auto calculated aspect ratio
aspectScale    = 1;    // auto calculated aspect scale

t = 0;
a = [];
A = B = 0;
x = c.getContext`2d`;
x.fillRect(0, 0, c.width, c.height);

requestAnimationFrame( u=_=>{

if (warmUp == 1)
{
    warmUp = 2;
    for(k = 100; k--; ) u();
    warmUp = 0;
}

if (!warmUp)
    requestAnimationFrame(u);

if (c.width != innerWidth || c.height != innerHeight)
{
    // match canvas to inner size
    c.width = innerWidth;
    c.height = innerHeight;
    x.fillRect(0, 0, c.width, c.height);
}

// background fill - make trails that dont leave trails!
for(i=3; i--;)
{
    x.globalCompositeOperation = i%2? 'lighter' : 'difference';
    x.fillStyle = i%2? `rgb(${trailAlpha},${trailAlpha},${trailAlpha})` : '#FFF';
    x.fillRect(0, 0, c.width, c.height);
}

// aspect ration correction
aspect = c.height / c.width;
aspectScale = aspect<1 ? scale*c.height/c.width : scale;

// add points
for(i = spawnCount; i--;)
{
    o = testMode || warmUp ?
    {
        X:Math.random()*3 - 2.5,
        Y:Math.random()*4 - 2
    } : juliaMode ? 
    {
        X:A+Math.random()*4 - 2,
        Y:B+Math.random()*4 - 2
    } : onlyMandelbrot ? 
        GetMandelbrotStart() :
    {
        X:A+Math.random()*randomness*2 - randomness,
        Y:B+Math.random()*randomness*2 - randomness
    }
    
    if (!juliaMode)
    {
        o.A = o.X;
        o.B = o.Y;
    }
    
    o.T = 0;
    a.push(o);
}

// prevent going over max
if (a.length>maxCount)
    a.splice(0,a.length-maxCount)
 
// update and render the points
x.globalCompositeOperation = 'screen'
for(i = updateCount; i--;)
    a.map((o,i)=>{ with(o)
    {
        if (T < life && X)
        {
            r = Math.hypot(A, B);
            L = ++T / life;
            x.fillStyle=`hsl(${ r*360 - L*199 - t*9}, 89%, ${ 50 - L*50 }%)`;
            x.fillRect( 
                (X*aspectScale + 1 + offset) * c.width/2,
                (Y*aspectScale / aspect + 1) * c.height/2, 3, 3);
            X = X*X-Y*Y+(Y=2*Y*X+B,A);
        }
    }})

t += 1/60 // update time
})

// input
onkeydown =e=> {a=[]; x.fillRect(0, 0, c.width|=0, 2e3)}
onmousemove =e=>
{
    A = e.x / c.width;
    B = e.y / c.height;
    A = (A*2-1 - offset) / aspectScale;
    B = aspect * (B*2-1) / aspectScale;
}
ontouchmove = function(e) 
{ 
    if (!e.touches.length)
        return;
    
    rect = c.getBoundingClientRect();
    A = (e.touches[0].clientX- rect.left) / rect.width; 
    B = (e.touches[0].clientY- rect.top) / rect.height;
    A = (A*2-1 - offset) / aspectScale;
    B = aspect * (B*2-1) / aspectScale;
}

if (typeof ontouchend != 'undefined')
{
    let ProcessTouch = e =>
    {
        e.preventDefault();
        if (!e.touches || !e.touches.length)
            return;
            
        let touch = e.touches[0];
        A = touch.clientX;
        B = touch.clientY;
        A = (A*2-1 - offset) / aspectScale;
        B = aspect * (B*2-1) / aspectScale;
    }

    c.addEventListener('touchstart',  ProcessTouch, false);
    c.addEventListener('touchmove',   ProcessTouch, false);
    c.addEventListener('touchcancel', ProcessTouch, false);
    c.addEventListener('touchend',    ProcessTouch, false);
}

GetMandelbrotStart=_=>
{
    while(1)
    {
        // find a point in the mandelbrot set
        X = A = Math.random()*4-2;
        Y = B = Math.random()*4-2;
        for(k=1e3; Math.hypot(X,Y) < 3 && k--;)
          X = X*X - Y*Y + (Y = 2*X*Y + B, A);

        if (Math.hypot(X,Y) < 3)
          break;
    }
    return {X:A, Y:B};
} //FF2020
