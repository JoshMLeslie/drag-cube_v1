// referenced from https://gist.github.com/thomasdarimont/8c694b4522c6cb10d85c

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
export default class Point3D {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	rotateX(currentAngle) {
		var rad = (currentAngle * Math.PI) / 180;
		var cosa = Math.cos(rad);
		var sina = Math.sin(rad);
		var y = this.y * cosa - this.z * sina;
		var z = this.y * sina + this.z * cosa;

		return new Point3D(this.x, y, z);
	}

	rotateY(currentAngle) {
		var rad = (currentAngle * Math.PI) / 180;
		var cosa = Math.cos(rad);
		var sina = Math.sin(rad);
		var z = this.z * cosa - this.x * sina;
		var x = this.z * sina + this.x * cosa;

		return new Point3D(x, this.y, z);
	}

	rotateZ(currentAngle) {
		var rad = (currentAngle * Math.PI) / 180;
		var cosa = Math.cos(rad);
		var sina = Math.sin(rad);
		var x = this.x * cosa - this.y * sina;
		var y = this.x * sina + this.y * cosa;

		return new Point3D(x, y, this.z);
	}

	project(viewWidth, viewHeight, fieldOfView, viewDistance) {
		var factor = fieldOfView / (viewDistance + this.z);
		var x = this.x * factor + viewWidth / 2;
		var y = this.y * factor + viewHeight / 2;
		return new Point3D(x, y, this.z);
	}
}