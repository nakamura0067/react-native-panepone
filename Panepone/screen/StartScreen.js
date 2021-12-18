import React from 'react';
import {Text, View, Button} from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export function StartScreen({navigation}){
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>スタート画面</Text>
      <Button
        title="Start"
        onPress={() => navigation.navigate('Game')}
      />
    </View>
  );
}
