import { Box } from "./renderers";
import { Dimensions } from "react-native";

let boxIds = 0;

const CreateBox = (state) => {
//  const {height,width} = Dimensions.get("window");
//  const colmuns = 6;
//	const boxSize = Math.trunc(Math.max(width, height*0.7)/12);
//  const top = Math.trunc(height*0.7 - boxSize);
//
//	if(boxIds < 12) {
//
//		for (let i = 0; i<colmuns; i++){
//			state[++boxIds] = {
//				size: [boxSize, boxSize],
//				pos: [i * boxSize, top - (boxSize * Math.floor(boxIds / colmuns))],
//				color: boxIds % 2 == 0 ? "pink" : "#B8E986",
//				renderer: Box
//			};
//		}
//	}
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
