import React, {useState} from 'react';
import {Text, View} from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { GameEngine } from "react-native-game-engine";
import { CreatePanel, MovePanel, RiseUpPanel, FallPanel } from "./systems";

export function GameScreen({route}){
  const {gameSpeed} = route.params;
  const {switching} = route.params;
  const WIDTH = 300;
  const HEIGHT = 600;
  const [isGameRunning, setIsGameRunning] = useState(true);

  let time = "00:00";
  let score = "0000000000";

  return (
    <View style={{ backgroundColor:'blue' , padding: 10, flex:1}}>
      <View id="info_area" style={{backgroundColor:'lightblue', flex:1, flexDirection: 'column',justifyContent:'flex-start',zIndex:4}}>
        <View id="time_area" style={{flex:1, flexDirection:'row'}}>
          <Text style={commonStyles.text}>Time: </Text>
          <Text style={commonStyles.text}>{time}</Text>
        </View>
        <View id="speed_level_area" style={{flex:1, flexDirection:'row'}}>
          <Text style={commonStyles.text}>SpeedLv: </Text>
          <Text style={commonStyles.text}>
            {JSON.stringify(gameSpeed)}
          </Text>
        </View>
        <View id="score_area" style={{flex:1, flexDirection:'row'}}>
          <Text style={commonStyles.text}>Score: </Text>
          <Text style={commonStyles.text}>{score}</Text>
        </View>
      </View>
      <View style={{backgroundColor:'darkblue',flex:9,alignItems:"center",justifyContent:"flex-end",zIndex:3}}>
        <GameEngine
          style={{
            backgroundColor:'white',
            position:"absolute",
            width:WIDTH,
            height:HEIGHT
          }}
          systems={[CreatePanel, MovePanel, RiseUpPanel, FallPanel]}
          entities={{}}
          running={isGameRunning}
          onEvent={(e) => {
            switch (e) {
              case "game-over":
                setIsGameRunning(false);
                return;
            }
          }}
        />
      </View>
    </View>
  );
}
