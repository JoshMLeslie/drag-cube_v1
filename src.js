import Point3D from './point3d.js';
import dragVector from './drag.js';

const DEBUG = false;

var dragStartX = 0;
var dragStartY = 0;
/** in degrees */
const DRAG_CHANGE = 20;

var VERTICES = [
	new Point3D(-1, 1, -1),
	new Point3D(1, 1, -1),
	new Point3D(1, -1, -1),
	new Point3D(-1, -1, -1),
	new Point3D(-1, 1, 1),
	new Point3D(1, 1, 1),
	new Point3D(1, -1, 1),
	new Point3D(-1, -1, 1),
];

var FACES = [
	[0, 1, 2, 3],
	[1, 5, 6, 2],
	[5, 4, 7, 6],
	[4, 0, 3, 7],
	[0, 4, 5, 1],
	[3, 2, 6, 7],
];

var currentAngleX = 0;
var currentAngleY = 0;
var currentAngleZ = 0;

var SCREEN = {
	w: 64,
	h: 64,
};

var ctx;

const updateRender = () => {
	const points = [];

	ctx.fillRect(0, 0, SCREEN.h, SCREEN.w);

	VERTICES.map((vertex) => {
		points.push(
			vertex
				.rotateX(currentAngleX)
				.rotateY(currentAngleY)
				.rotateZ(currentAngleZ)
				.project(SCREEN.h, SCREEN.w, 128, 7)
		);
	});

	FACES.map((cubeFace) => {
		ctx.beginPath();
		ctx.moveTo(points[cubeFace[0]].x, points[cubeFace[0]].y);
		ctx.lineTo(points[cubeFace[1]].x, points[cubeFace[1]].y);
		ctx.lineTo(points[cubeFace[2]].x, points[cubeFace[2]].y);
		ctx.lineTo(points[cubeFace[3]].x, points[cubeFace[3]].y);
		ctx.closePath();
		ctx.stroke();
	});
};

const startRendering = () => {
	var canvas = document.getElementById('renderScreen');
	if (canvas?.getContext) {
		canvas.width = SCREEN.w;
		canvas.height = SCREEN.h;

		ctx = canvas.getContext('2d');

		ctx.strokeStyle = 'rgb(255,15,155)';

		requestAnimationFrame(updateRender);
	}
};

window.onload = startRendering;

const source = document.getElementById('draggable');
source.addEventListener('dragstart', ({offsetX, offsetY}) => {
	DEBUG && console.log('dragStart', event);

	dragStartX = offsetX;
	dragStartY = offsetY;
});
source.addEventListener('dragend', (event) => {
	DEBUG && console.log('dragEnd', event);
	
	const dir = dragVector(event, dragStartX, dragStartY);

	DEBUG && console.log(dir);

	// oh god.
	if (dir.x > 0) {
		currentAngleY -= DRAG_CHANGE;
	} else if (dir.x < 0) {
		currentAngleY += DRAG_CHANGE;
	}
	if (dir.y > 0) {
		currentAngleX -= DRAG_CHANGE;
	} else if (dir.y < 0) {
		currentAngleX += DRAG_CHANGE;
	}

	updateRender();
});
