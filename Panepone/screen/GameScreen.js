import React from 'react';
import {Text, View, Button, Dimensions} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import {Physics, CreateBox, MoveBox, CleanBoxes} from "./systems";
import {Box} from "./renderers"
import Matter from "matter-js";
import { commonStyles } from '../styles/commonStyles';
import { floor } from 'react-native-reanimated';

Matter.Common.isElement = () => false;

export function GameScreen({route}){
  const {gameSpeed} = route.params;
  const {switching} = route.params;

  const {width,height} = Dimensions.get("window");
  const boxSize = Math.trunc(Math.max(width,height)*0.075);

  const engine = Matter.Engine.create({enableSleeping: false});
  const world = engine.world;
  const body = Matter.Bodies.rectangle(width/2, -1000, boxSize, boxSize, {frictionAir: 0.021});
  const floor = Matter.Bodies.rectangle(width/2, height- boxSize/2, width, boxSize, {isStatic: true});
  const constraint = Matter.Constraint.create({
    label: "Drag Constraint",
    pointA: {x:0,y:0},
    pointB: {x:0, y:0},
    length: 0.01,
    stiffness: 0.1,
    angularStiffness: 1,
  });

  Matter.World.add(world, [body, floor]);
  Matter.World.addConstraint(world, constraint);

  return (
    /*<View style={{backgroundColor:"black"}}>
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
      </View>*/
      <GameEngine
        systems={[Physics, CreateBox, MoveBox, CleanBoxes]}
        entities={{
          physics: {engine: engine, world: world, constraint: constraint},
          box: {body:body, size: [boxSize, boxSize], color: "pink", renderer: Box},
          floor: {body:floor, size: [width, boxSize], color: "#86E9BE", renderer: Box}
        }}
        style={{backgroundColor: "#ffffff"}}
      >
      </GameEngine>
    /*</View>*/
  );
}
