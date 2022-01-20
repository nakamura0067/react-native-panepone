import React from 'react';
import {Dimensions} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import {CreateBox, MoveBox, CleanBoxes} from "./systems";
import {Box} from "./renderers"
import { commonStyles } from '../styles/commonStyles';
import { floor } from 'react-native-reanimated';

export function GameArea(){
  const {height,width} = Dimensions.get("window");
  const boxSize = Math.trunc(Math.max(width)/8);
  return (
    <GameEngine
      style={commonStyles.border}
      systems={[CreateBox, MoveBox, CleanBoxes]}
      entities={{
        box1: {position: [0, height*0.85-2*boxSize], size: [boxSize, boxSize], color: "pink", renderer: Box},
        box2: {position: [boxSize, height*0.85-2*boxSize], size: [boxSize, boxSize], color: "yellow", renderer: Box},
        box3: {position: [2*boxSize, height*0.85-2*boxSize], size: [boxSize, boxSize], color: "blue", renderer: Box},
        box4: {position: [3*boxSize, height*0.85-2*boxSize], size: [boxSize, boxSize], color: "green", renderer: Box},
        box5: {position: [4*boxSize, height*0.85-2*boxSize], size: [boxSize, boxSize], color: "red", renderer: Box},
        box6: {position: [6*boxSize, height*0.85-2*boxSize], size: [boxSize, boxSize], color: "black", renderer: Box},
        box7: {position: [0, height*0.85-3*boxSize], size: [boxSize, boxSize], color: "black", renderer: Box},
        box8: {position: [boxSize, height*0.85-3*boxSize], size: [boxSize, boxSize], color: "pink", renderer: Box},
        box9: {position: [2*boxSize, height*0.85-3*boxSize], size: [boxSize, boxSize], color: "yellow", renderer: Box},
        box10: {position: [3*boxSize, height*0.85-3*boxSize], size: [boxSize, boxSize], color: "blue", renderer: Box},
        box11: {position: [4*boxSize, height*0.85-3*boxSize], size: [boxSize, boxSize], color: "green", renderer: Box},
        box12: {position: [7*boxSize, height*0.85-2*boxSize], size: [boxSize, boxSize], color: "red", renderer: Box},


      }}
    >
    </GameEngine>
  );
}
