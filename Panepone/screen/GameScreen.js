import React from 'react';
import {Text, View, Button} from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export function GameScreen({route}){
  const {gameSpeed} = route.params;
  const {switching} = route.params;
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>ゲーム画面
        {JSON.stringify(gameSpeed)},
        {JSON.stringify(switching)}
      </Text>
    </View>
  );
}
