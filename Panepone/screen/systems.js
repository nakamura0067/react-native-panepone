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
let fallFlg = false;
let upCount = 0;
let downCount = 0;
/**
 * 2点間の距離を求める
 * @param {int} x1
 * @param {int} y1
 * @param {int} x2
 * @param {int} y2
 * @returns 2点間の距離
 */
const distance = ([x1, y1], [x2, y2]) => {
	return Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
)};

/**
 * 行で同色の数をカウント
 * @param {Object} state 
 * @param {String} key パネルID
 * @param {int} count 同色の数
 * @param {Boolean} chainFlg カウントした色を消すかどうか
 * @returns 同色の数
 */
const countRowSameColor = (state, key, count, chainFlg) => {
	panelState = state[key].panelState;
	state[key].panelState = -1;
	count++;

	// 一マス右のパネルの色を判定
	if(key % COLS != 0 && state[key+1]){
		if (state[key + 1].panelState > 0 && state[key + 1].panelState === panelState) {
			count = countRowSameColor(state, key + 1, count, chainFlg);
		}
	}
	
	// 一マス左のパネルの色を判定
	if(key % COLS != 1 && state[key-1]) {
		if (state[key - 1].panelState > 0 && state[key - 1].panelState === panelState) {
			count = countRowSameColor(state, key - 1, count, chainFlg);
		}
	}
	
	if (!chainFlg) state[key].panelState = panelState;
	return count;
}

/**
 * 列で同色の数をカウント
 * @param {Object} state 
 * @param {String} key パネルID
 * @param {int} count 同色の数
 * @param {Boolean} chainFlg カウントした色を消すかどうか
 * @returns 同色の数
 */
const countColSameColor = (state, key, count, chainFlg) => {
	panelState = state[key].panelState;
	state[key].panelState = -1;
	count++;
	// 一マス下のパネルの色を判定
	if(key <= (ROWS - 2) * COLS && state[key+COLS]) {
		if (state[key + COLS].panelState > 0 && state[key + COLS].panelState === panelState) {
			count = countColSameColor(state, key + COLS, count, chainFlg);
		}
	}

	// 一マス上のパネルの色を判定
	if(key > COLS && state[key-COLS]) {
		if (state[key - COLS].panelState > 0 && state[key - COLS].panelState === panelState) {
			count = countColSameColor(state, key - COLS, count, chainFlg);
		}
	}
	
	if (!chainFlg) state[key].panelState = panelState;
	return count;
}

/**
 * 初期生成
 * @param {*} state 
 * @returns state
 */
const CreatePanel = (state) => {
	if (gameState == "START") {
		for (let row = 1; row<=ROWS; row++){
			for (let col = 1; col<=COLS; col++){
				if(ROWS - INIT_ROWS <= row) {
					state[++panelIds] = {
						id:panelIds,
						pos: [
							(row - 1) * BOX_SIZE,
							(col - 1) * BOX_SIZE
						],
						panelState: 0,
						renderer: Panel
					}
	        
					// 縦横3マスが同色になっていないか確認
	     	  let rowCount;
	        let colCount;
	        do {
						state[panelIds].panelState = Math.floor(Math.random() * 5) + 1,
          	rowCount = 0;
          	colCount = 0;
          	rowCount = countRowSameColor(state, panelIds, rowCount, false);
          	colCount = countColSameColor(state, panelIds, colCount, false);
	        } while(rowCount > 2 || colCount > 2);
				
			} else {
					state[++panelIds] = {
						id:panelIds,
    				pos: [
							(row - 1) * BOX_SIZE,
							(col - 1) * BOX_SIZE
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

/**
 * パネル移動処理
 * @param {*} state 
 * @param {*} touches
 * @returns 
 */
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
				distance(
					[
						panel.pos[1] + BOX_SIZE / 2,
						panel.pos[0] + BOX_SIZE / 2
					],
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
			if ((deltaX > BOX_SIZE/2) && panel.id % ROWS != 0){
				let panelState = panel.panelState;
				panel.panelState = state[panel.id+1].panelState;
				state[panel.id+1].panelState = panelState;
				chain(state,[panel.id,panel.id+1]);
			}

			if (deltaX < -BOX_SIZE/2 && panel.id % ROWS != 1){
				let panelState = panel.panelState;
				panel.panelState = state[panel.id-1].panelState;
				state[panel.id-1].panelState = panelState;
				chain(state,[panel.id,panel.id-1]);
			}
			
			startPos = [0,0];
			panel.press = false;
		}
	}
	return state;
};

/**
 * 自動上昇処理
 * @param {*} state 
 * @param {*} dispatch
 * @returns 
 */
const RiseUpPanel = (state, { dispatch }) => {
	
	upCount++;

	if (upCount === 100) {
		Object.keys(state).forEach(key=> {
			let panel = state[key];
			if (panel.id <= (ROWS-1)*COLS) {
				panel.panelState = state[panel.id + COLS].panelState;
			}
			
			if (panel.id > (ROWS - 1) * COLS) {
				let rowCount;
				do {
					panel.panelState = Math.floor(Math.random() * 5) + 1;
					rowCount = 0;
					rowCount = countRowSameColor(state, key, rowCount,false);
				} while(rowCount > 2);
			}
		});

		chain(state, [
			(ROWS-2)*COLS+1,
			(ROWS-2)*COLS+2,
			(ROWS-2)*COLS+3,
			(ROWS-2)*COLS+4,
			(ROWS-2)*COLS+5,
			(ROWS-2)*COLS+6
		]);

		for (let i = 1; i <= COLS; i++){
			let panel = state[i];
			if (panel.panelState > 0){
				// ゲームオーバ
				dispatch("game-over");
			}
		}
	
		upCount = 0;
	}
	return state;
}

const FallPanel = (state) => {

	if (fallFlg) downCount++;
	let movePanels=[];

	Object.keys(state).sort((a,b) => (Number(a) > Number(b) ? -1:1)).forEach(key =>{
		let panel = state[key];
		if (panel.id > COLS){
			if (panel.panelState <= 0 && state[panel.id - COLS].panelState > 0){
				fallFlg = true;
			}
		}

		if (downCount === 10) {
			if (panel.id > COLS && panel.id < (ROWS-1)*COLS) {
				if (panel.panelState <= 0) {
					let tmp = panel.panelState;
					panel.panelState = state[panel.id - COLS].panelState;
					state[panel.id - COLS].panelState = tmp;
					movePanels.push(panel.id);
				}
			} else if (panel.id <= COLS) {
				panel.panelState = 0;
				fallFlg = false;
			}
		}
	});

	if (Object.keys(movePanels).length>0){
		chain(state,movePanels);
		movePanels=[];
	}
	if (!fallFlg) downCount = 0;
	return state;
}

/**
 * 連鎖処理
 * @param {*} state 
 * @param {*} movePanels 
 */
const chain = (state, movePanels) => {
	movePanels.forEach(key => {
		let chainFlg = false;
		let rowCount = countRowSameColor(state, key, 0, chainFlg);
		let colCount = countColSameColor(state, key, 0, chainFlg);
		if (rowCount > 2 && colCount > 2) {
			chainFlg = true;
			let panelState = state[key].panelState;
			countRowSameColor(state, key, 0, chainFlg);
			state[key].panelState = panelState;
			countColSameColor(state, key, 0, chainFlg);
		} else if(rowCount > 2) {
			chainFlg = true;
			countRowSameColor(state, key, 0, chainFlg);
		} else if(colCount > 2) {
			chainFlg = true;
			countColSameColor(state, key, 0, chainFlg);
		}
		rowCount = 0;
		colCount = 0;
	});
}

export { CreatePanel, MovePanel, RiseUpPanel, FallPanel};
