//Based on
//http://petewerner.blogspot.co.uk/2015/02/intro-to-curl-noise.html

var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var TWO_PI = 2 * Math.PI;
var mobile = false;
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    mobile = true;
  }
 else {
    mobile = false;
  }

var discCount;
if(mobile){
	discCount = 100;
}else{
	discCount = 1000;
}
//Colours from:
//https://krazydad.com/tutorials/makecolors.php
var red = [];
var grn = [];
var blu = [];

center = 128;
width = 127;
frequency1 = 0.3;
frequency2 = 0.3;
frequency3 = 0.3;

phase1 = 0;
phase2 = 2;
phase3 = 4;

for (s = 0; s < discCount; s++) {
	red[s] = Math.round(Math.sin(frequency1*s + phase1) * width + center);
	grn[s] = Math.round(Math.sin(frequency2*s + phase2) * width + center);
	blu[s] = Math.round(Math.sin(frequency3*s + phase3) * width + center);
}
var discs = [];

for(i = 0; i < discCount; i++){
	var style = 'rgba('+red[i]+','+grn[i]+','+blu[i]+', 1)';
	var disc = {
		x: Math.random()*canvas.width,
		y: Math.random()*canvas.height,
		x_vel: 0,
		y_vel: 0,
		radius: 1,
		colour: style
	};
	discs.push(disc);
}
function move() {
	for(i = 0; i < discCount; i++){
		if(discs[i].x < discs[i].radius){
			discs[i].x = Math.random()*canvas.width;
			discs[i].y = Math.random()*canvas.height;
		}  
		if(discs[i].y < discs[i].radius){
			discs[i].x = Math.random()*canvas.width;
			discs[i].y = Math.random()*canvas.height;
		}
		if(discs[i].x > canvas.width-discs[i].radius){
			discs[i].x = Math.random()*canvas.width;
			discs[i].y = Math.random()*canvas.height;
		}  
		if(discs[i].y > canvas.height-discs[i].radius){
			discs[i].x = Math.random()*canvas.width;
			discs[i].y = Math.random()*canvas.height;
		}
		discs[i].x += discs[i].x_vel;
		discs[i].y += discs[i].y_vel;
	}
}

var dx = 4;
var dy = 4;

var width = (window.innerWidth/dx) << 0;
var height = (window.innerHeight/dy) << 0;
var size = width * height;

var noise_ = [];

var ellipse_width = dx/3;
var ellipse_height = dy/3;

var offset_start = Math.PI/2;
var offset_end = 1.5*Math.PI;

var target_x = canvas.width/2;
var target_y = canvas.height/2;

//Use noise.js library to generate a grid of 2D simplex noise values
try {
	noise.seed(Math.random());
}
catch(err) {
	console.log(err.message);
}

function computeCurl(x, y){
	var eps = 0.001;
	var n1 = noise.simplex2(x, y + eps); 
	var n2 = noise.simplex2(x, y - eps); 
	var a = (n1 - n2)/(2 * eps);

	var n1 = noise.simplex2(x + eps, y);
	var n2 = noise.simplex2(x - eps, y); 
	var b = (n1 - n2)/(2 * eps);

	return [a, -b];
}

window.onresize = function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.fillStyle = "rgb(17,27,68)";
	ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
}
var variables = {
	speed: 0.2,
	fade: 0.1,
	step: 250,
	particle_size: 0.5, 
	rainbow: true,
	lighten: false,
	colour: '#ff9500'
}
var reset_button = { reset:function(){ 
	variables.speed = 0.3
	variables.step = 250;
	variables.particle_size = 0.5;
	variables.rainbow = true;
	variables.lighten = false;
	variables.fade = 0.0;
	ctx.fillStyle = "rgb(17,27,68)";
	ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
}};
var clear_button = { clear:function(){ 
	ctx.fillStyle = "rgb(17,27,68)";
	ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
}};

//dat.gui library controls
var gui = new dat.GUI();
gui.add(variables, 'step').min(10).max(1000).step(10).listen();
gui.add(variables, 'speed').min(0.0).max(1.0).step(0.01).listen();
gui.add(variables, 'particle_size').min(0.1).max(5).step(0.1).listen();
gui.add(variables, 'fade').min(0.0).max(1.0).step(0.01).listen();
gui.addColor(variables, 'colour').listen().onChange(function(value) { variables.rainbow = false;} );
if(!mobile){
	gui.add(variables, 'lighten');
}
gui.add(reset_button,'reset');
gui.add(clear_button,'clear');
gui.close();
variables.fade = 0.0;

//DRAW//
ctx.fillStyle = "rgb(17,27,68)";
ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
function draw() {

	ctx.fillStyle = "rgba(17,27,68, "+variables.fade+")";
	ctx.fillRect(0,0,window.innerWidth, window.innerHeight);

	move();

	ctx.save();
	if(variables.lighten && !mobile){	
		ctx.globalCompositeOperation = "lighten";
	}
	for(i = 0; i < discs.length; i++){
		if(variables.rainbow){ 
			ctx.fillStyle = discs[i].colour;
		}else{
			ctx.fillStyle = variables.colour;
		}

		var curl = computeCurl(discs[i].x/variables.step, discs[i].y/variables.step);
		discs[i].x_vel = variables.speed*curl[0];
		discs[i].y_vel = variables.speed*curl[1];
		ctx.beginPath();
		ctx.arc(discs[i].x, discs[i].y, variables.particle_size, 0, TWO_PI);
		ctx.fill();
	}
	ctx.restore();
	window.requestAnimationFrame(draw);
}
draw();
