import React from "react";
import { GameEngine } from "react-native-game-engine";
import { CreatePanel, MovePanel, CleanBoxes } from "./systems";

const GameArea = () => {
  return (
    <GameEngine
      systems={[CreatePanel,MovePanel]}
      entities={{}}
    >
    </GameEngine>
  );
};

export default GameArea;