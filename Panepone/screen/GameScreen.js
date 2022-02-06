import React from 'react';
import {Text, View, Button} from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import GameArea from './GameArea';

export function GameScreen({route}){
  const {gameSpeed} = route.params;
  const {switching} = route.params;
  return (
    <View>
      <View id="info_area" style={{height:'30%',borderColor:'black',borderWidth:1,justifyContent:'flex-start'}}>
        <View id="time_area" style={{flexDirection:'row'}}>
          <Text style={commonStyles.text}>Time</Text>
          <Text style={commonStyles.text}>00:00</Text>
        </View>
        <View id="speed_level_area" style={{flexDirection:'row'}}>
          <Text style={commonStyles.text}>SpeedLv</Text>
          <Text style={commonStyles.text}>
            {JSON.stringify(gameSpeed)}
          </Text>
        </View>
        <View id="score_area" style={{flexDirection:'row'}}>
          <Text style={commonStyles.text}>Score</Text>
          <Text style={commonStyles.text}>0000000000</Text>
        </View>
      </View>
      <GameArea style={{height:'70%'}}/>
    </View>
  );
}
