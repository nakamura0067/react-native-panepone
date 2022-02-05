import React from "react";
import { GameEngine } from "react-native-game-engine";
import { CreateBox, MoveBox, CleanBoxes } from "./systems";
import { Dimensions } from "react-native";
import { Box } from "./renderers";

const {height,width} = Dimensions.get("window");
const boxSize = Math.trunc(Math.max(width, height*0.85)/12);
const top = Math.trunc(height*0.85 - boxSize);
const left = (width - boxSize*6) / 2;
const columns = 6;
const rows = 12;
const initRows = 8;
const colors = ['','red','yellow','blue','green','purple'];

/* 
-1: 削除, 0：パネル無し, 1: 赤, 2: 黄, 3: 青, 4: 緑, 5:紫
*/ 
let panelStates = Array(rows).fill(0).map(row => new Array(columns).fill(0));

function initPanelStates(){
  for (let i = 0; i<rows; i++) {
    for (let j = 0; j<columns; j++) {
      if (i <= initRows) {
        panelStates[i][j] = Math.floor(Math.random() * 5) + 1;
      }
    }
  }
}

function createPanel(boxSize, y, x, color,box) {
  return {
    size: [boxSize, boxSize], pos: [y, x], color: color, renderer: box
  };
}

const GameArea = () => {
  initPanelStates();

  const panels = {
    panel_1_1:createPanel(boxSize, top, left, colors[panelStates[0][0]], Box),
    panel_1_2:createPanel(boxSize, top, left + boxSize, colors[panelStates[0][1]], Box),
    panel_1_3:createPanel(boxSize, top, left + boxSize*2, colors[panelStates[0][2]], Box),
    panel_1_4:createPanel(boxSize, top, left + boxSize*3, colors[panelStates[0][3]], Box),
    panel_1_5:createPanel(boxSize, top, left + boxSize*4, colors[panelStates[0][4]], Box),
    panel_1_6:createPanel(boxSize, top, left + boxSize*5, colors[panelStates[0][5]], Box),
    
    panel_2_1:createPanel(boxSize, top - boxSize, left, colors[panelStates[1][0]], Box),
    panel_2_2:createPanel(boxSize, top - boxSize, left + boxSize, colors[panelStates[1][1]], Box),
    panel_2_3:createPanel(boxSize, top - boxSize, left + boxSize*2, colors[panelStates[1][2]], Box),
    panel_2_4:createPanel(boxSize, top - boxSize, left + boxSize*3, colors[panelStates[1][3]], Box),
    panel_2_5:createPanel(boxSize, top - boxSize, left + boxSize*4, colors[panelStates[1][4]], Box),
    panel_2_6:createPanel(boxSize, top - boxSize, left + boxSize*5, colors[panelStates[1][5]], Box),
    
    panel_3_1:createPanel(boxSize, top - boxSize*2, left, colors[panelStates[2][0]], Box),
    panel_3_2:createPanel(boxSize, top - boxSize*2, left + boxSize, colors[panelStates[2][1]], Box),
    panel_3_3:createPanel(boxSize, top - boxSize*2, left + boxSize*2, colors[panelStates[2][2]], Box),
    panel_3_4:createPanel(boxSize, top - boxSize*2, left + boxSize*3, colors[panelStates[2][3]], Box),
    panel_3_5:createPanel(boxSize, top - boxSize*2, left + boxSize*4, colors[panelStates[2][4]], Box),
    panel_3_6:createPanel(boxSize, top - boxSize*2, left + boxSize*5, colors[panelStates[2][5]], Box),
    
    panel_4_1:createPanel(boxSize, top - boxSize*3, left, colors[panelStates[3][0]], Box),
    panel_4_2:createPanel(boxSize, top - boxSize*3, left + boxSize, colors[panelStates[3][1]], Box),
    panel_4_3:createPanel(boxSize, top - boxSize*3, left + boxSize*2, colors[panelStates[3][2]], Box),
    panel_4_4:createPanel(boxSize, top - boxSize*3, left + boxSize*3, colors[panelStates[3][3]], Box),
    panel_4_5:createPanel(boxSize, top - boxSize*3, left + boxSize*4, colors[panelStates[3][4]], Box),
    panel_4_6:createPanel(boxSize, top - boxSize*3, left + boxSize*5, colors[panelStates[3][5]], Box),
    
    panel_5_1:createPanel(boxSize, top - boxSize*4, left, colors[panelStates[4][0]], Box),
    panel_5_2:createPanel(boxSize, top - boxSize*4, left + boxSize, colors[panelStates[4][1]], Box),
    panel_5_3:createPanel(boxSize, top - boxSize*4, left + boxSize*2, colors[panelStates[4][2]], Box),
    panel_5_4:createPanel(boxSize, top - boxSize*4, left + boxSize*3, colors[panelStates[4][3]], Box),
    panel_5_5:createPanel(boxSize, top - boxSize*4, left + boxSize*4, colors[panelStates[4][4]], Box),
    panel_5_6:createPanel(boxSize, top - boxSize*4, left + boxSize*5, colors[panelStates[4][5]], Box),
    
    panel_6_1:createPanel(boxSize, top - boxSize*5, left, colors[panelStates[5][0]], Box),
    panel_6_2:createPanel(boxSize, top - boxSize*5, left + boxSize, colors[panelStates[5][1]], Box),
    panel_6_3:createPanel(boxSize, top - boxSize*5, left + boxSize*2, colors[panelStates[5][2]], Box),
    panel_6_4:createPanel(boxSize, top - boxSize*5, left + boxSize*3, colors[panelStates[5][3]], Box),
    panel_6_5:createPanel(boxSize, top - boxSize*5, left + boxSize*4, colors[panelStates[5][4]], Box),
    panel_6_6:createPanel(boxSize, top - boxSize*5, left + boxSize*5, colors[panelStates[5][5]], Box),

    panel_7_1:createPanel(boxSize, top - boxSize*6, left, colors[panelStates[6][0]], Box),
    panel_7_2:createPanel(boxSize, top - boxSize*6, left + boxSize, colors[panelStates[6][1]], Box),
    panel_7_3:createPanel(boxSize, top - boxSize*6, left + boxSize*2, colors[panelStates[6][2]], Box),
    panel_7_4:createPanel(boxSize, top - boxSize*6, left + boxSize*3, colors[panelStates[6][3]], Box),
    panel_7_5:createPanel(boxSize, top - boxSize*6, left + boxSize*4, colors[panelStates[6][4]], Box),
    panel_7_6:createPanel(boxSize, top - boxSize*6, left + boxSize*5, colors[panelStates[6][5]], Box),
    
    panel_8_1:createPanel(boxSize, top - boxSize*7, left, colors[panelStates[7][0]], Box),
    panel_8_2:createPanel(boxSize, top - boxSize*7, left + boxSize, colors[panelStates[7][1]], Box),
    panel_8_3:createPanel(boxSize, top - boxSize*7, left + boxSize*2, colors[panelStates[7][2]], Box),
    panel_8_4:createPanel(boxSize, top - boxSize*7, left + boxSize*3, colors[panelStates[7][3]], Box),
    panel_8_5:createPanel(boxSize, top - boxSize*7, left + boxSize*4, colors[panelStates[7][4]], Box),
    panel_8_6:createPanel(boxSize, top - boxSize*7, left + boxSize*5, colors[panelStates[7][5]], Box),
};

  return (
    <GameEngine
      systems={[CreateBox, MoveBox, CleanBoxes]}
      entities={panels}
    >
    </GameEngine>
  );
};

export default GameArea;