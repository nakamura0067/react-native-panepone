import { Box } from "./renderers";

let boxIds = 0;

const CreateBox = (state, { touches, screen }) => {
	let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);

	touches.filter(t => t.type === "press").forEach(t => {
		state[++boxIds] = {
			size: [boxSize, boxSize],
			color: boxIds % 2 == 0 ? "pink" : "#B8E986",
			renderer: Box
		};
	});

	return state;
};

const MoveBox = (state, { touches }) => {
	//-- Handle start touch
	let start = touches.find(x => x.type === "start");

	//-- Handle move touch
	let move = touches.find(x => x.type === "move");

	//-- Handle end touch
	let end = touches.find(x => x.type === "end");

	return state;
};

const CleanBoxes = (state, { touches, screen }) => {
	return state;
};

export { CreateBox, MoveBox, CleanBoxes };
