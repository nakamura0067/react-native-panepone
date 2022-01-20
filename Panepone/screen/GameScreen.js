import React from 'react';
import {Text, View} from 'react-native';
import { GameArea } from './GameArea';
import { commonStyles } from '../styles/commonStyles';

export function GameScreen({route}){
  const {gameSpeed} = route.params;
  const {switching} = route.params;

  return (
    <View>
      <View id="info_area" style={commonStyles.container,{justifyContent:'flex-start',height:'15%'}}>
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
      <View style={commonStyles.border, {justifyContent:'flex-start',height:'85%'}}>
        <GameArea/>
      </View>
    </View>
  );
}
