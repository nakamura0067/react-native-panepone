import { Box } from "./renderers";

let boxIds = 0;

const distance = ([x1, y1], [x2, y2]) =>
	Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

const CreateBox = (state, { touches, screen }) => {
	let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);

	//touches.filter(t => t.type === "press").forEach(t => {

		//state[++boxIds] = {
		//	position: [boxSize*boxIds,boxSize*boxIds],
		//	size: [boxSize, boxSize],
		//	color: boxIds % 2 == 0 ? "pink" : "#B8E986",
		//	renderer: Box
		//};
	//});

	return state;
};

const MoveBox = (state, { touches }) => {
	let start = touches.find(x => x.type === "start");

	if (start) {
		let startPos = [start.event.pageX, start.event.pageY];

		let boxId = Object.keys(state).find(key => {

			return //(
null;
				//distance([body.position.x, body.position.y], startPos) < 25
			//);
		});

		if (boxId) {
			//constraint.pointA = { x: startPos[0], y: startPos[1] };
			//constraint.bodyB = state[boxId].body;
			//constraint.pointB = { x: 0, y: 0 };
			//constraint.angleB = state[boxId].body.angle;
		}
	}

	//-- Handle move touch
	let move = touches.find(x => x.type === "move");

	if (move) {
		//constraint.pointA = { x: move.event.pageX, y: move.event.pageY };
	}

	//-- Handle end touch
	let end = touches.find(x => x.type === "end");

	if (end) {
		//constraint.pointA = null;
		//constraint.bodyB = null;
		//constraint.pointB = null;
	}

	return state;
};

 const CleanBoxes = (state, { touches, screen }) => {
//	Object.keys(state)
//		.filter(key => state[key].body && state[key].body.position.y > screen.height * 2)
//		.forEach(key => {
//			Matter.Composite.remove(world, state[key].body);
//			delete state[key];
//		});
//
	return state;
};

export {CreateBox, MoveBox, CleanBoxes};
