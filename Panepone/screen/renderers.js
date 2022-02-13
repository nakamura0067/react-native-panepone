import React,{ PureComponent} from "react";
import {View} from "react-native";

const colors = ['grey','red','yellow','blue','green','purple'];

class Panel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPress: false
    };
  }
  
  onPress = ()=> {
    console.log("isPress:"+this.state.isPress);
    this.setState({
      isPress: this.state.isPress? false:true
    });
  };

  render() {
    const isPress = this.state.isPress;
    return (
      <View
        style={[{
          position: "absolute",
          top: this.props.body.pos[0],
          left: this.props.body.pos[1],
          width: this.props.body.size,
          height: this.props.body.size,
          backgroundColor: colors[this.props.panelState],
          borderColor:'black',
          borderWidth:1}
        ]}
      >
      </View>
    )
  };
};

export { Panel };
