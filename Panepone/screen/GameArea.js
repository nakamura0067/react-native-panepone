import React from "react";
import { Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { CreateBox, MoveBox, CleanBoxes } from "./systems";
import { Box } from "./renderers";

const GameArea = (props) => {
  const { width, height } = Dimensions.get("window");
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);

  return (
    <GameEngine
      systems={[CreateBox, MoveBox, CleanBoxes]}
      entities={{
        box: { size: [boxSize, boxSize], color: "pink", renderer: Box },
        floor: { size: [width, boxSize], color: "#86E9BE", renderer: Box },
      }}
    >
    </GameEngine>
  );
};

export default GameArea;