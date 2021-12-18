import React from 'react';
import {Text, View, Button} from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export function GameScreen(){
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>ゲーム画面</Text>
    </View>
  );
}
