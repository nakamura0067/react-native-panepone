import React,{useState} from 'react';
import {Text, View, Button, Slider, Switch} from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export function StartScreen({navigation}){

  const [value, setValue] = useState(1);
  const [switching, setSwitching] = useState(false)
  const changeValue = (value) => {
    setValue(value);
  }
  const switchValue = (value) => {
    setSwitching(value);

  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>パネルでポン</Text>
      <Button
        title="Start"
        onPress={() => {
          navigation.navigate('Game',{
            gameSpeed: value,
            switching: switching
          });
        }}
      />
      <Text style={commonStyles.text}>ゲームスピード {value}</Text>
      <Slider
        step={1}
        maximumValue={100}
        onValueChange={changeValue}
        value={value}
      />
      <Text style={commonStyles.text}>おじゃまパネル {switching ? "有":"無"}</Text>
      <Switch
        onValueChange = {switchValue}
        value = {switching}
      />
    </View>
  );
}
