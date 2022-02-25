import React,{ PureComponent} from "react";
import {View} from "react-native";

// -1: 削除, 0：パネル無し, 1: 赤, 2: 黄, 3: 青, 4: 緑, 5:紫
const colors = ['','red','yellow','blue','green','purple'];
const BOX_SIZE=50;

class Panel extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={[{
          position:"absolute",
          top:this.props.pos[0],
          left:this.props.pos[1],
          zIndex:1,
          width: BOX_SIZE,
          height: BOX_SIZE,
          backgroundColor: colors[this.props.panelState],
          borderColor:'black',
          borderWidth:1
        }]}
      >
      </View>
    )
  };
};

export { Panel};
