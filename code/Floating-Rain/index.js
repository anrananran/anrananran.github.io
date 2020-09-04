console.clear();

////////////
// CONFIG //
////////////

// Affects number of cubes generated
const DENSITY = 1;
const LAYERS = 5;
// Colors are in rgb format
const COLORS = [
	[1.000, 0.655, 0.231],
	[1.000, 0.365, 0.114],
	[0.898, 0.078, 0.392],
	[0.424, 0.5, 0.114]
];
const GAMMA = 1.8;
const CLEAR_COLOR = [0, 0, 0, 0];
// Time in seconds for all cubes to wrap around once.
const SCROLL_TIME = 10;
// Radians per second
const ROTATE_MIN = 0.5;
const ROTATE_MAX = 4.2;
// Meters
const SIZE_MIN = 0.032;
const SIZE_MAX = 0.064;
// Randomize placement (meters)
const OFFSET_JITTER = 0.025;
// Camera controls
const CAMERA_DISTANCE = 3.5;
const CAMERA_FOV = 0.7;
const CAMERA_NEAR = 1;
const CAMERA_FAR = 100;


////////////////////////
// COMPUTED CONSTANTS //
////////////////////////

// Number of cubes on each axis
const COUNT_X = Math.floor(32 * DENSITY);
const COUNT_Y = Math.floor(16 * DENSITY);
const COUNT_Z = Math.floor(LAYERS);
const COUNT_TOTAL = COUNT_X * COUNT_Y * COUNT_Z;
// Bounding volume dimensions (meters)
const BOUND_WIDTH = 2;
const BOUND_HEIGHT = COUNT_Y / COUNT_X * BOUND_WIDTH;
const BOUND_DEPTH = COUNT_Z / COUNT_X * BOUND_WIDTH;


//////////////////
// MATH HELPERS //
//////////////////

const TAU = Math.PI * 2;
const random = (min, max) => Math.random() * (max - min) + min;
const interpolate = (a, b, mix) => (b - a) * mix + a;


/////////////////
// APPLICATION //
/////////////////

const regl = createREGL({ extensions: ['angle_instanced_arrays'] });

const textTexture = regl.texture({
	format: 'rgb',
	data: document.querySelector('img'),
	mag: 'linear',
	min: 'linear'
});

const viewMatrix = mat4.fromTranslation([], [0, 0.25, -CAMERA_DISTANCE]);
const projectionMatrix = [];
const projectionViewMatrix = [];

// Gamma correct colors
COLORS.forEach(c => {
	c[0] = Math.pow(c[0], GAMMA);
	c[1] = Math.pow(c[1], GAMMA);
	c[2] = Math.pow(c[2], GAMMA);
});

// Color of each cube
const colors = new Float32Array(3 * COUNT_TOTAL);
// Position of each cube
const offsets = new Float32Array(3 * COUNT_TOTAL);
// Base scale of each cube
const scales = new Float32Array(COUNT_TOTAL);
// Axis of rotation for each cube
const rotationAxes = new Float32Array(3 * COUNT_TOTAL);
// Rotation angle for each cube
const angles = new Float32Array(COUNT_TOTAL);
// Rotation speed for each cube (radians/s)
const rotationSpeeds = new Float32Array(COUNT_TOTAL);

// `angleBuffer` will be updated each frame, to animate rotations
const angleBuffer = regl.buffer({
	data: angles,
	type: 'float',
	usage: 'dynamic'
});

// Generate all data.
// Some buffers have a stride of 1, others have a stride of 3.
let i = 0;
let i3 = 0;
for (let x=0; x<COUNT_X; x++) {
	const xPercent = x / COUNT_X;
	for (let y=0; y<COUNT_Y; y++) {
		const yPercent = y / COUNT_Y;
		for (let z=0; z<COUNT_Z; z++) {
			const zPercent = z / COUNT_Z;
			const color = COLORS[Math.random() * COLORS.length | 0];
			const axis = vec3.random([]);
			colors[i3] = color[0];
			colors[i3+1] = color[1];
			colors[i3+2] = color[2];
			offsets[i3] = xPercent*BOUND_WIDTH - 0.5*BOUND_WIDTH + random(-OFFSET_JITTER, OFFSET_JITTER);
			offsets[i3+1] = yPercent*BOUND_HEIGHT - 0.5*BOUND_HEIGHT + random(-OFFSET_JITTER, OFFSET_JITTER);
			offsets[i3+2] = zPercent*BOUND_DEPTH - 0.5*BOUND_DEPTH + random(-OFFSET_JITTER, OFFSET_JITTER);
			scales[i] = 0.5 * random(SIZE_MIN, SIZE_MAX);
			rotationAxes[i3] = axis[0];
			rotationAxes[i3+1] = axis[1];
			rotationAxes[i3+2] = axis[2];
			angles[i] = Math.random() * TAU;
			rotationSpeeds[i] = random(ROTATE_MIN, ROTATE_MAX);
			i++;
			i3 += 3;
		}
	}	
}

// Shader setup, using instancing to draw many copies of one cube.
// Note most animation and math is done in the vertex shader on the GPU,
// including generating rotation matrices. Many common instancing approaches
// upload a tranform matrix for each instance each frame, but here we only
// upload a single float each frame (the angle) and a rotation matrix is built
// from that and a static rotation axis.
const draw = regl({
	cull: { enable: true },
	frontFace: 'cw',
	vert: `
		precision highp float;

		attribute vec3 a_position;
		attribute vec3 a_normal;
		attribute vec3 a_color;
		attribute vec3 a_offset;
		attribute float a_scale;
		attribute vec3 a_rotationAxis;
		attribute float a_angle;
		uniform sampler2D u_tex;
		uniform float u_scrollOffset;
		uniform mat4 u_projectionViewMatrix;
		varying vec3 v_color;

		mat4 rotationMatrix(vec3 axis, float angle) {
			float s = sin(angle);
			float c = cos(angle);
			float oc = 1.0 - c;
			return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
									oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
									oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
									0.0,                                0.0,                                0.0,                                1.0);
		}

		void main() {
			vec3 offset = a_offset;
			offset.x = mod(offset.x + u_scrollOffset + 1.0, 2.0) - 1.0;
			vec2 texCoord = vec2(
				(offset.x + 1.0) * 0.5,
				1.0 - (offset.y + 0.5)
			);
			float texScale = texture2D(u_tex, texCoord).r;
			mat4 rotation = rotationMatrix(a_rotationAxis, a_angle);
			vec3 position = (rotation * vec4(a_position, 1.0)).xyz;
			vec3 normal = (rotation * vec4(a_normal, 1.0)).xyz;
			gl_Position = u_projectionViewMatrix * vec4(position * a_scale * texScale + offset, 1.0);
			v_color = a_color * min(1.0, normal.z + 0.1);
		}
	`,
	frag: `
		precision highp float;

		varying vec3 v_color;

		void main() {
			gl_FragColor = vec4(v_color, 1.0);
		}
	`,
	attributes: {
		// unit cube triangle vertices
		a_position: getCubeVertices(),
		a_normal: getCubeNormals(),
		a_color: {
			buffer: regl.buffer(colors),
			divisor: 1 // one per cube
		},
		a_offset: {
			buffer: regl.buffer(offsets),
			divisor: 1 // one per cube
		},
		a_scale: {
			buffer: regl.buffer(scales),
			divisor: 1 // one per cube
		},
		a_rotationAxis: {
			buffer: regl.buffer(rotationAxes),
			divisor: 1 // one per cube
		},
		a_angle: {
			buffer: angleBuffer,
			divisor: 1 // one per cube
		}
	},
	uniforms: {
		u_tex: textTexture,
		u_scrollOffset: ({ time }) => {
			return time % SCROLL_TIME / SCROLL_TIME * BOUND_WIDTH;
		},
		u_projectionViewMatrix: ({ viewportWidth, viewportHeight }) => {
			const aspectRatio = viewportWidth / viewportHeight;
			let finalFovY = CAMERA_FOV;
			// On narrow screens, widen FOV (zoom out)
			if (aspectRatio < 1) {
				finalFovY = interpolate(CAMERA_FOV / aspectRatio, CAMERA_FOV, 0.5);
				// Prevent FOV from getting too wide and approaching 180 degrees
				finalFovY = Math.min(finalFovY, 0.8*Math.PI);
			}
			mat4.perspective(projectionMatrix, finalFovY, aspectRatio, CAMERA_NEAR, CAMERA_FAR);
			mat4.multiply(projectionViewMatrix, projectionMatrix, viewMatrix);
			return projectionViewMatrix;
		}
	},
	count: 36,
	instances: COUNT_TOTAL
});

// Animation loop
let lastTime = -1;
regl.frame(({ time }) => {
	const timeDelta = lastTime === -1 ? 0 : time - lastTime;
	lastTime = time;
	
	regl.clear({ color: CLEAR_COLOR });
	
	for (let i=0; i<COUNT_TOTAL; i++) {
		const speed = rotationSpeeds[i];
		let angle = angles[i] + speed*timeDelta;
		if (angle > TAU) {
			angle -= TAU;
		}
		angles[i] = angle;
	}
	
	angleBuffer.subdata(angles);
	
	draw();
});



//////////////////
// DATA HELPERS //
//////////////////

function getCubeVertices() {
	const ltf = [-1, 1, 1];
	const ltb = [-1, 1, -1];
	const lbf = [-1, -1, 1];
	const lbb = [-1, -1, -1];
	const rtf = [1, 1, 1];
	const rtb = [1, 1, -1];
	const rbf = [1, -1, 1];
	const rbb = [1, -1, -1];
	return [
		// top
		ltf, ltb, rtb,
		rtb, rtf, ltf,
		// bottom
		lbb, lbf, rbf,
		rbf, rbb, lbb,
		// left
		ltb, ltf, lbb,
		lbb, ltf, lbf,
		// right
		rbf, rtf, rtb,
		rtb, rbb, rbf,
		// front
		lbf, ltf, rtf,
		rtf, rbf, lbf,
		// back
		rtb, ltb, lbb,
		lbb, rbb, rtb
	];
}

function getCubeNormals() {
	const up = [0, 1, 0];
	const down = [0, -1, 0];
	const left = [-1, 0, 0];
	const right = [1, 0, 0];
	const front = [0, 0, 1];
	const back = [0, 0, -1];
	return [
		// top
		up, up, up, up, up, up,
		// bottom
		down, down, down, down, down, down,
		// left
		left, left, left, left, left, left,
		// right
		right, right, right, right, right, right,
		// front
		front, front, front, front, front, front,
		// back
		back, back, back, back, back, back
	];
}
