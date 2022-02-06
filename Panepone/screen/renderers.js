import React from "react";
import {View} from "react-native";

const Box = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        top: props.pos[0],
        left: props.pos[1],
        width: props.size[0],
        height: props.size[1],
        backgroundColor: props.color,
        borderColor:'black',
        borderWidth:1,
      }}
    />
  );
};

export { Box };
