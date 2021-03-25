import React from 'react';
import GameHive from './components/GameHive';
import GameInput from './components/GameInput';
import GameActions from './components/GameActions';
import {Dimensions, View} from 'react-native';
const {width} = Dimensions.get('window');

const Game = () => {
  return (
    <View style={{width}}>
      <GameInput />
      <GameHive />
      <GameActions />
    </View>
  );
};

export default Game;
