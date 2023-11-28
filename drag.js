/**
 * @const {number} MOVE_THRESHOLD # of px offset from initial grab x,y on target element
 */
const MOVE_THRESHOLD = 50;

/**
 * Find normalized direction of drag event
 *
 * where the coord system looks alike
 * [-x,  y ] [ x,  y ]
 * [-x, -y ] [ x, -y ]
 */
export default ({offsetX, offsetY}, dragStartX, dragStartY) => {
	// invert X from JS/Chromium_v8 to be pedantic about coordinates and match above
	let x = offsetX - dragStartX;
	let y = dragStartY - offsetY;

	const mag = Math.sqrt(x ** 2 + y ** 2);

	if (Math.abs(x) > MOVE_THRESHOLD) {
		x = mag === 0 ? 0 : x / mag;
		if (x === -0) {
			// i hate js
			x = 0;
		} else if (x > 0) {
			x = 1;
		} else if (x < -0) {
			x = -1;
		} else {
			x = 0;
		}
	} else {
		x = 0;
	}

	if (Math.abs(y) > MOVE_THRESHOLD) {
		y = mag === 0 ? 0 : y / mag;
		if (y === -0) {
			y = 0;
		} else if (y > 0) {
			y = 1;
		} else if (y < -0) {
			y = -1;
		} else {
			y = 0;
		}
	} else {
		y = 0;
	}

	return {x, y};
};
