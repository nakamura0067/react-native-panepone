import { Panel } from "./renderers";
import { Dimensions } from "react-native";

const ROWS = 13;
const INIT_ROWS = 8;
const COLS = 6;
const boxSize = 50;
const width = Math.trunc(Dimensions.get("window").width);
const height = Math.trunc(Dimensions.get("window").height);
const top = height - 105 - boxSize;
const left = (width - (boxSize * COLS)) / 2;
const distance = ([x1, y1], [x2, y2]) => {
	return Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
)};

let panelIds = 0;
let gameState = "START";

/* 
-1: 削除, 0：パネル無し, 1: 赤, 2: 黄, 3: 青, 4: 緑, 5:紫
*/ 

function rowCountSameColor(state, panelState, id, count) {
  count = count + 1;
  if (id > 5 && panelState === state[id-6].panelState) {
    count = rowCountSameColor(state, state[id-6].panelState, id-6, count);
  }
  return count;
}

function colCountSameColor(state, panelState, id, count) {
  count = count + 1;
  if ((id % 6) > 0 && panelState === state[id-1].panelState) {
    count = colCountSameColor(state, state[id-1].panelState,id-1,count);
  }
  return count;
}

const CreatePanel = (state) => {
	if (gameState == "START"){
	for (let row = 0; row<ROWS; row++){
		for (let col = 0; col<COLS;col++){
			if (row == 0){
				state[++panelIds] = {
					id:panelIds,
					queue:[row, col],
    			body:{
    				size: boxSize,
						pos: [top - (row * boxSize), left + (col * boxSize)]
					},
					startPos: [0,0],
					press: false,
    			panelState: 0,
    			renderer: Panel
				}
			} else if(row <= INIT_ROWS) {
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
    			body:{
						size: boxSize,
    				pos: [top - ((row) * boxSize), left + ((col) *boxSize)]
					},
					startPos: [0,0],
					press: false,
    			panelState: panelState,
    			renderer: Panel
				}
			} else {
				state[++panelIds] = {
					id:panelIds,
			    queue:[row, col],
					body:{
						size: boxSize,
    				pos: [top - ((row) * boxSize), left + ((col) *boxSize)]
					},
					startPos:[0,0],
					press: false,
    			panelState: 0,
    			renderer: Panel
				}				
			}
		}
		gameState = "GAMEING";
		}
	}
	return state;
};

const MovePanel = (state, { touches }) => {
	let panel;
	let start = touches.find(x => x.type === "start");

	if (start) {
		let startPos = [start.event.pageX, start.event.pageY];
		let panelId = Object.keys(state).find(key => {
			let body = state[key].body;
			return (
				body &&
				distance([body.pos[1]+boxSize/2-10,body.pos[0]+boxSize/2+65], startPos) < boxSize/2*Math.sqrt(2)
			);
		});
		if (panelId) {
			panel = state[panelId];
			panel.startPos = startPos;
			panel.press = true;
		}
	}

	let end = touches.find(x=> x.type === "end");

	if (end) {
		let endPos = [end.event.pageX, end.event.pageY];
		let panelId = Object.keys(state).filter(key => state[key].press);
		let panel = state[panelId];

		if (panel) {
			let deltaX = endPos[0] - panel.startPos[0];

			if ((deltaX > boxSize/2) && (panel.id-1)%6 != 5){
				let panelState = panel.panelState;
				panel.panelState = state[panel.id+1].panelState;
				state[panel.id+1].panelState = panelState;
			}

			if (deltaX < -boxSize/2 && (panel.id-1)%6 != 0){
				let panelState = panel.panelState;
				panel.panelState = state[panel.id-1].panelState;
				state[panel.id-1].panelState = panelState;
			}
			
			panel.startPos = [0,0];
			panel.press = false;
		}
	}

	return state;
};

const CleanPanels = (state, { touches, screen }) => {
	return state;
};

export { CreatePanel, MovePanel, CleanPanels };
