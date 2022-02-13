import React from 'react';
import {Text, View} from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import GameArea from './GameArea';

export function GameScreen({route}){
  const {gameSpeed} = route.params;
  const {switching} = route.params;
  return (
    //<View style={{ padding: 10, flex: 1 }}>
    //  <View id="info_area" style={{flex:1, flexDirection: 'column',justifyContent:'flex-start'}}>
    //    <View id="time_area" style={{flex:1, flexDirection:'row'}}>
    //      <Text style={commonStyles.text}>Time</Text>
    //      <Text style={commonStyles.text}>00:00</Text>
    //    </View>
    //    <View id="speed_level_area" style={{flex:1, flexDirection:'row'}}>
    //      <Text style={commonStyles.text}>SpeedLv</Text>
    //      <Text style={commonStyles.text}>
    //        {JSON.stringify(gameSpeed)}
    //      </Text>
    //    </View>
    //    <View id="score_area" style={{flex:1, flexDirection:'row'}}>
    //      <Text style={commonStyles.text}>Score</Text>
    //      <Text style={commonStyles.text}>0000000000</Text>
    //    </View>
    //  </View>
      <View style={{flex:1}}>
        <GameArea/>
      </View>
    //</View>
  );
}
