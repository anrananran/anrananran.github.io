"use strict";

const { PI, cos, sin, abs, random, atan2 } = Math;
const TAU = 2 * PI;
const rand = n => n * random();
const randIn = (min, max) => rand(max - min) + min;
const fadeInOut = (t, m) => {
	let hm = 0.5 * m;
	return abs((t + hm) % m - hm) / (hm);
};
const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1);
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

const particleCount = 300;

let canvas;
let ctx;
let hover;
let mouse;
let origin;
let particles;

function getParticle() {
	const particle = {
		get alpha() {
			return fadeInOut(this.life, this.ttl);
		},
		init() {
			const { innerWidth, innerHeight } = window;
			const direction = rand(TAU);
			const speed = randIn(20, 40);
			
			this.life = 0;
			this.ttl = randIn(100,300);
			this.size = randIn(2, 8);
			this.hue = randIn(80, 150);
			this.size = randIn(2, 8);
			this.hue = randIn(80, 150);
			this.position = [
				origin[0] + rand(200) * cos(direction),
				origin[1] + rand(200) * sin(direction)
			]; 
			this.velocity = [
				cos(direction) * speed,
				sin(direction) * speed
			];
		},
		checkBounds() {
			const [x, y] = this.position;
			
			return (
				x > canvas.a.width + this.size ||
				x < -this.size ||
				y > canvas.a.height + this.size ||
				y < -this.size
			);
		},
		update() {
			const [x, y] = this.position;
			const [vX, vY] = this.velocity;
			const mDirection = angle(...mouse, ...this.position);
			this.position[0] = lerp(x, x + vX, 0.05);
			this.position[1] = lerp(y, y + vY, 0.05);
			this.velocity[0] = lerp(vX, hover ? cos(mDirection) * 30 : 0, hover ? 0.1 : 0.01);
			this.velocity[1] = lerp(vY, hover ? sin(mDirection) * 30 : 0, hover ? 0.1 : 0.01);
			(this.checkBounds() || this.life++ > this.ttl) && this.init();
			
			return this;
		},
		draw() {
			ctx.a.save();
			ctx.a.beginPath();
			ctx.a.fillStyle = `hsla(${this.hue},50%,50%,${this.alpha})`;
			ctx.a.arc(...this.position, this.size, 0, TAU);
			ctx.a.fill();
			ctx.a.closePath();
			ctx.a.restore();
			
			return this;
		}
	};
	
	particle.init();
	
	return particle;
}

function initParticles() {
	particles = [];
	
	for (let i = 0; i < particleCount; i++) {
		particles.push(getParticle());
	}
}

function setup() {
	canvas = {
		a: document.createElement("canvas"),
		b: document.createElement("canvas")
	};
	canvas.b.style = `
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	`;
	document.body.appendChild(canvas.b);
	
	ctx = {
		a: canvas.a.getContext("2d"),
		b: canvas.b.getContext("2d")
	};
	
	mouse = [0,0];
	origin = [];
	
	resize();
	initParticles();
	draw();
}

function resize() {
	const { innerWidth, innerHeight } = window;
	
	canvas.a.width = canvas.b.width = innerWidth;
	canvas.a.height = canvas.b.height = innerHeight;
	
	origin[0] = 0.5 * innerWidth;
	origin[1] = 0.5 * innerHeight;
}

function mouseHandler(event) {
	const { type, clientX, clientY } = event;
	
	hover = type === 'mousemove';
	
	mouse[0] = clientX;
	mouse[1] = clientY ;
}

function draw() {
	ctx.a.clearRect(0, 0, canvas.a.width,canvas.a.height);
	ctx.b.fillStyle = 'rgba(20,20,20,0.8)'
	ctx.b.fillRect(0, 0, canvas.a.width,canvas.a.height);
	
	for(let i = 0; i < particles.length; i++) {
		particles[i].draw().update();
	}
	
	let i, amt;
	
	for (i = 20; i >= 1; i--) {
		amt = i * 0.05;
		ctx.b.save();
		ctx.b.filter = `blur(${amt * 5}px)`;
		ctx.b.globalAlpha = 1 - amt;
		ctx.b.setTransform(1 - amt, 0, 0, 1 - amt, origin[0] * amt, origin[1] * amt);
		ctx.b.translate(...origin);
		ctx.b.rotate(amt * 8);
		ctx.b.translate(-origin[0], -origin[1]);
		ctx.b.drawImage(canvas.a, 0, 0, canvas.b.width, canvas.b.height);
		ctx.b.restore();
	}
	
	ctx.b.save();
	ctx.b.filter = "blur(8px) brightness(200%)";
	ctx.b.drawImage(canvas.a, 0, 0);
	ctx.b.restore();

	ctx.b.save();
	ctx.b.globalCompositeOperation = "lighter";
	ctx.b.drawImage(canvas.a, 0, 0);
	ctx.b.restore();
	
	window.requestAnimationFrame(draw);
}

window.addEventListener("load", setup);
window.addEventListener("mousemove", mouseHandler);
window.addEventListener("mouseout", mouseHandler);
window.addEventListener("resize", resize);
