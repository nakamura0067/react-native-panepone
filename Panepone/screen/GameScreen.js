import React from 'react';
import {Text, View, Button} from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export function GameScreen({route}){
  const {gameSpeed} = route.params;
  const {switching} = route.params;
  return (
    <View style={commonStyles.container}>
      <View id="info_area" style={commonStyles.container,{justifyContent:'flex-start'}}>
        <View id="time_area" style={commonStyles.container,{flexDirection:'row'}}>
          <Text style={commonStyles.text}>Time</Text>
          <Text style={commonStyles.text}>00:00</Text>
        </View>
        <View id="speed_level_area" style={commonStyles.container,{flexDirection:'row'}}>
          <Text style={commonStyles.text}>SpeedLv</Text>
          <Text style={commonStyles.text}>
            {JSON.stringify(gameSpeed)}
          </Text>
        </View>
        <View id="score_area" style={commonStyles.container,{flexDirection:'row'}}>
          <Text style={commonStyles.text}>Score</Text>
          <Text style={commonStyles.text}>0000000000</Text>
        </View>
      </View>
      <View id="game_area" style={commonStyles.container}>
        <View id="ojama_area" style={commonStyles.container}>
        </View>
        <View id="field_area" style={commonStyles.container}>
        </View>
      </View>
    </View>
  );
}
