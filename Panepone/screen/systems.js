import { Dimensions } from "react-native";
import { Panel } from "./renderers";

const ROWS = 13;
const INIT_ROWS = 8;
const COLS = 6;
const BOX_SIZE = 50;
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const PADDING_SIZE = 10;
const HEDDER_SIZE = 22;
const offset = [
	(WINDOW_WIDTH - (BOX_SIZE * COLS)) / 2,
	(WINDOW_HEIGHT - (BOX_SIZE * (ROWS - 1)) - PADDING_SIZE - HEDDER_SIZE)
];
let panelIds = 0;
let gameState = "START";
let startPos = [0, 0];
let previousTime = 0;
let upCount = 0;

const distance = ([x1, y1], [x2, y2]) => {
	return Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
)};

const rowCountSameColor = (state, panelState, id, count) => {
  count = count + 1;
  if (id > 5 && panelState === state[id-6].panelState) {
    count = rowCountSameColor(state, state[id-6].panelState, id-6, count);
  }
  return count;
}

const colCountSameColor = (state, panelState, id, count) => {
  count = count + 1;
  if ((id % 6) > 0 && panelState === state[id-1].panelState) {
    count = colCountSameColor(state, state[id-1].panelState,id-1,count);
  }
  return count;
}

const CreatePanel = (state) => {

	if (gameState == "START") {
		for (let row = 0; row<ROWS; row++){
			for (let col = 0; col<COLS; col++){
				if(ROWS - INIT_ROWS -1 <= row && row <= ROWS) {
        	// 縦横3マスが同色になっていないか確認
	     	  let rowCount;
	        let colCount;
					let panelState;
	        do {
          	panelState = Math.floor(Math.random() * 5) + 1;
          	rowCount = 0;
          	colCount = 0;
          	rowCount = rowCountSameColor(state, panelState, panelIds+1, rowCount);
          	colCount = colCountSameColor(state, panelState, panelIds+1, colCount);
	        } while(rowCount > 2 || colCount > 2);
				
					state[++panelIds] = {
						id:panelIds,
			    	queue:[row, col],
    				pos: [
							row * BOX_SIZE,
							col * BOX_SIZE
						],
    				panelState: panelState,
    				renderer: Panel
					}
				} else {
					state[++panelIds] = {
						id:panelIds,
			    	queue:[row, col],
    				pos: [
							row * BOX_SIZE,
							col * BOX_SIZE
						],
    				panelState: 0,
    				renderer: Panel
					}
				}
			}
		}
		gameState = "GAMING";
	}

	return state;
};

const MovePanel = (state, { touches }) => {
	let panel;
	let start = touches.find(x => x.type === "start");
	
	if (start) {
		let eventPos = [
			start.event.pageX - offset[0],
			start.event.pageY - offset[1]
		];
		let panelId = Object.keys(state).find(key => {
			let panel = state[key];
			return (
				panel &&
				distance([
					panel.pos[1] + BOX_SIZE / 2,
					panel.pos[0] + BOX_SIZE / 2],
					eventPos
				) < BOX_SIZE / Math.sqrt(2)
			);
		});
		if (panelId) {
			panel = state[panelId];
			startPos = [start.event.pageX, start.event.pageX];
			panel.press = true;
		}
	}

	let end = touches.find(x=> x.type === "end");

	if (end) {
		let panelId = Object.keys(state).filter(key => state[key].press);
		let panel = state[panelId];
		let deltaX = end.event.pageX - startPos[0];
		if (panel) {
			if ((deltaX > BOX_SIZE/2) && (panel.id-1)%6 != 5){
				let panelState = panel.panelState;
				panel.panelState = state[panel.id+1].panelState;
				state[panel.id+1].panelState = panelState;
			}

			if (deltaX < -BOX_SIZE/2 && (panel.id-1)%6 != 0){
				let panelState = panel.panelState;
				panel.panelState = state[panel.id-1].panelState;
				state[panel.id-1].panelState = panelState;
			}
			
			startPos = [0,0];
			panel.press = false;
		}
	}
	return state;
};

const CleanPanels = (state, { touches }) => {
	return state;
};


const RiseUpPanel = (state, { time, dispatch }) => {
	
	if (previousTime === 0 ){
		previousTime = time.current;
	}

	if (time.current - previousTime > 1) {
		previousTime = time.current;
		Object.keys(state).forEach(key=> {
			let panel = state[key];
			panel.pos = [
				panel.pos[0]-1,
				panel.pos[1]
			]
		});
		upCount++;

		if (upCount % 50 == 0) {
			Object.keys(state).forEach(key=> {
				let panel = state[key];
				panel.pos = [
					panel.pos[0]+50,
					panel.pos[1]
				]

				if (Object.keys(state).length > panel.id + 5) {
					panel.panelState = state[panel.id+6].panelState;
				} else {
          panel.panelState = Math.floor(Math.random() * 5) + 1;
				}

				if (panel.id < 6 && panel.panelState > 0){
					// ゲームオーバ
					dispatch("game-over");
				}
			});
		}
	}
	
	return state;
}

export { CreatePanel, MovePanel, RiseUpPanel };
