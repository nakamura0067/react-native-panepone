import React from "react";
import {Dimensions, View} from "react-native";

const Box = (props) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.position[0];
  const y = props.position[1];

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: props.color,
      }}
    />
  );
};

export { Box };
