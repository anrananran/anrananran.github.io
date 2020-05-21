/*

By: @everblind

Use it!, for FREE ;D
Help?, Questions?, Message me!
Do you want to use the Mouse?, Fork it and make your mod!

Cheers :)

*/

var canvas;
var context;
var width;
var height;
var particles = [];
var doublePI = Math.PI * 2;
var influencerCurrentPos;
var influencerPrevPos;
var mouseForce;
var forceRadius = 80;
var tickStep = 0;

window.onload = function()
{
	canvas = document.getElementById('canvas');
  canvas.style.width = window.innerWidth + "px";
  setTimeout(function() {
  canvas.style.height = window.innerHeight + "px";
}, 0);
  
	context = canvas.getContext('2d');
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;

mouseSetup();
generateParticles();
  
	loop();
};

function mouseSetup()
{
	influencerCurrentPos = vec2d.create(0, 0);
	influencerPrevPos = vec2d.create(0, 0);
	mouseForce = vec2d.create(0, 0);
}

function generateParticles()
{
	var i = 499;

	for(i; i > -1; --i)
	{
		var p = particle.create((Math.random() * 12 + 2) >> 0);
		p.getPos().setXY(Math.random() * width, Math.random() * height);
		p.getVel().setXY(1 - Math.random() * 2, 1 - Math.random() * 2);

		particles[particles.length] = p;
	}
}

function loop()
{
	updateInfluencer();
	updateMouseForce();
	updateParticles();
	renderParticles();
	renderForce();

	tickStep += 0.01;

	requestAnimationFrame(loop);
}

function updateInfluencer()
{
	forceRadius = Math.cos(tickStep) * 40 + 80;

	influencerPrevPos.setXY(influencerCurrentPos.getX(), influencerCurrentPos.getY());
	influencerCurrentPos.setXY(Math.cos(tickStep) * (Math.sin(tickStep * 2) * (width * 0.4)) + (width >> 1), Math.sin(tickStep) * (Math.sin(tickStep * 2) * (height * 0.4)) + (height >> 1));
}

function updateMouseForce()
{
	var vx = influencerCurrentPos.getX() - influencerPrevPos.getX();
	var vy = influencerCurrentPos.getY() - influencerPrevPos.getY();

	mouseForce.setLength(1);
	mouseForce.setAngle(Math.atan2(vy, vx));
}

function updateParticles()
{
	var i = particles.length - 1;

	for(i; i > -1; --i)
	{
		var p = particles[i];
		var vx = p.getPos().getX() - influencerCurrentPos.getX();
		var vy = p.getPos().getY() - influencerCurrentPos.getY();
		var distVec = vec2d.create(vx, vy);

		if(distVec.getLength() < forceRadius)
		{
			p.getPos().setXY(influencerCurrentPos.getX() + Math.cos(distVec.getAngle()) * forceRadius, influencerCurrentPos.getY() + Math.sin(distVec.getAngle()) * forceRadius);
			p.getVel().add(mouseForce);
		}

		p.update();
	}
}

function renderParticles()
{
	context.globalAlpha = 0.3;
	context.fillStyle = '#233239';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 0.4;

	var i = particles.length - 1;

	for(i; i > -1; --i)
	{
		var p = particles[i];

		context.strokeStyle = '#85B0BD';
		context.beginPath();
		context.arc(p.getPos().getX(), p.getPos().getY(), p.getRadius(), 0, doublePI);
		context.stroke();
		context.closePath();
	}

	context.globalAlpha = 1;
}

function renderForce()
{
	context.fillStyle = '#9CCFDE';
	context.beginPath();
	context.arc(influencerCurrentPos.getX(), influencerCurrentPos.getY(), forceRadius, 0, doublePI);
	context.fill();
	context.closePath();
}

//vec2d definition:

var vec2d =
{
	_x: 1,
	_y: 0,

	create: function(x, y)
	{
		var obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);

		return obj;
	},

	getX: function()
	{
		return this._x;
	},

	setX: function(value)
	{
		this._x = value;
	},

	getY: function()
	{
		return this._y;
	},

	setY: function(value)
	{
		this._y = value;
	},

	setXY: function(x, y)
	{
		this._x = x;
		this._y = y;
	},

	getLength: function()
	{
		return Math.sqrt(this._x * this._x + this._y * this._y);
	},

	setLength: function(length)
	{
		var angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getAngle: function()
	{
		return Math.atan2(this._y, this._x);
	},

	setAngle: function(angle)
	{
		var length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	add: function(vector)
	{
		this._x += vector.getX();
		this._y += vector.getY();
	},

	substract: function(vector)
	{
		this._x -= vector.getX();
		this._y -= vector.getY();
	},

	multiply: function(value)
	{
		this._x *= value;
		this._y *= value;
	},

	divide: function(value)
	{
		this._x *= value;
		this._y *= value;
	}
};

//particle definition:

var particle =
{
	_pos: null,
	_vel: null,
	_radius: null,
	_mouseForce: null,

	create: function(radius)
	{
		var obj = Object.create(this);
		obj.setPos(vec2d.create(0, 0));
		obj.setVel(vec2d.create(0, 0));
		obj.setMouseForce(vec2d.create(0, 0));
		obj.setRadius(radius);

		return obj;
	},

	update: function()
	{
		this._pos.add(this._vel);
		this.checkBounds();

		this._vel.multiply(0.98);

		if(this._vel.getLength() < 0.3) this._vel.setLength(0.3);
	},

	checkBounds: function()
	{
		if(this._pos.getX() > width)
		{
			this._pos.setX(width);
			this._vel.setX(this._vel.getX() * -1);
		}
		else if(this._pos.getX() < 0)
		{
			this._pos.setX(0);
			this._vel.setX(this._vel.getX() * -1);
		}

		if(this._pos.getY() > height)
		{
			this._pos.setY(height);
			this._vel.setY(this._vel.getY() * -1);
		}
		else if(this._pos.getY() < 0)
		{
			this._pos.setY(0);
			this._vel.setY(this._vel.getY() * -1);
		}
	},

	getPos: function()
	{
		return this._pos;
	},

	setPos: function(vector)
	{
		this._pos = vector;
	},

	getVel: function()
	{
		return this._vel;
	},

	setVel: function(vector)
	{
		this._vel = vector;
	},

	getRadius: function()
	{
		return this._radius;
	},

	setRadius: function(radius)
	{
		this._radius = radius;
	},

	setMouseForce: function(vector)
	{
		this._mouseForce = vector;
	}
};
