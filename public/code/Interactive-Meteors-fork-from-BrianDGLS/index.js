// *********************************
// * Set up
// *********************************

// Select Canvas
const canvas = document.getElementById('canvas');
// Get Canvas's context
const context = canvas.getContext('2d');

// Make width and height equal to tha of the browser window
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Placeholder for mouse co-ords
let mouseX;
let mouseY;

// *********************************
// * Utility Functions
// *********************************

// Get random number between min and max, inclusive
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generates a specified color
function color(hue, sat, light, alpha) {
    return `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
}

// Creates fade effect on canvas
function colorFade(alpha) {
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = color(0, 0, 0, alpha);
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'lighter';
}

// *********************************
// * Particle Class
// *********************************

class Particle {
    constructor() {
        this.reset();
    }

    render() {
        // Begin stroke
        context.beginPath();
        // Draw circular particle
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        // Set fill and stroke colors
        var col = color( this.x / width * 360, 80, 50, .5);
        context.fillStyle = col;
        context.strokeStyle = col;
        // Apply fill and stroke colors
        context.fill();
        //context.stroke();
        // reset values if particle outside of screen
        if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
            this.reset();
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    // Reset values to original state
    reset() {
        // Position of x axis
        this.x = Math.random() * width;
        // Position on y axis
        this.y = Math.random() * height;
        // stands for velocity of x and velocity of y
        this.vx = 0;
        this.vy = 0;
        // Set radius to random number for varying sized particles
        this.radius = randomNumber(1, 6);
        // Mass for gravity pull
        this.mass = this.radius / 3;
    }

    // Define as static so it can be called without creating an instance of the particle
    static createArray(numberOf) {
        // Placeholder for particles
        let array = [];
        // Create as many as given in the argument
        while (numberOf--) {
            // Push new particle to the array
            array.push(new Particle());
        }
        // return the populated array
        return array;
    }
}

// Create array of particles
let particleArr = Particle.createArray(70);


function gravitate(partA, partB) {
    let dx = partB.x - partA.x;
    let dy = partB.y - partA.y;
    let distSQ = dx * dx + dy * dy;
    let dist = Math.sqrt(distSQ) + 40;
    let force = partA.mass * partB.mass / distSQ;
    let ax = force * dx / dist * 2;
    let ay = force * dy / dist * 2;

    partA.vx += ax / partA.mass;
    partA.vy += ay / partA.mass;
    partB.vx -= ax / partB.mass;
    partB.vy -= ay / partB.mass;
}

function move(partA, index) {
    partA.x += partA.vx + 2;
    partA.y += partA.vy + 2;

    let pullX = mouseX ? (mouseX + partA.radius) : 0;
    let pullY = mouseY ? (mouseY + partA.radius) : 0;
    let mass = mouseY ? 9 : 2;

    for (let partB, k = index + 1; k < particleArr.length; k++) {
        partB = {
            x: pullX,
            y: pullY,
            mass: mass
        };
        gravitate(partA, partB);
    }
}

context.fillStyle = '#222';
context.fillRect( 0, 0, width, height );

// Self calling function
(function draw() {
    // Continuosly calls itself to create animation frames
    window.requestAnimationFrame(draw);
    // Apply color fade to create nice vis effect
    colorFade(0.07);

    particleArr.forEach((_, index) => {
        move(_, index);
        // _.update();
        _.render();
    });
}());

// Listens for the resizing of the canvas
window.addEventListener('resize', () => {
    // Update width and height of canvas on resize
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    // Reset particle array to update width and height
    context.fillStyle = '#222';
    context.fillRect( 0, 0, width, height );
    
    particleArr = Particle.createArray(50);
});

// Listens for mousemove
window.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});
