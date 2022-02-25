import React from "react";
import { GameEngine } from "react-native-game-engine";
import { CreatePanel, MovePanel, RiseUpPanel } from "./systems";

const GameArea = (props) => {


  return (
    <GameEngine
      style={{
        width:WIDTH,
        height:HEIGHT,
        backgroundColor:"white"
      }}
      systems={[CreatePanel]}
      entities={{}}
    >
    </GameEngine>
  );
};

export default GameArea;