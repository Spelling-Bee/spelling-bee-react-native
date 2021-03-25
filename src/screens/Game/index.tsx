import React, {useEffect} from 'react';
import {useDispatch} from './Provider';
import Container from './Container';
import {SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import GameScreen from './GameScreen';
import GuessedWords from '../GuessedWords';

const Game = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'CREATE_GAME',
      setting: {
        dictionary: require('../../de.json'),
        letters: ['s', 'p', 'i', 'e', 'l', 'r', 'n'],
        pivotLetter: 'e',
        min: 4,
      },
    });
  }, [dispatch]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}>
          <GameScreen />
          <GuessedWords />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Container(Game);
