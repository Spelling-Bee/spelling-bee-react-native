import React from 'react';
import {Dimensions} from 'react-native';
import {SpellingBeeHive} from 'components';
import {useStore, useDispatch} from '../Provider';
const {width, height} = Dimensions.get('window');

const GameHive = () => {
  const {
    game: {state},
    guess,
  } = useStore();
  const dispatch = useDispatch();
  return (
    <SpellingBeeHive
      space={height > width ? width : height}
      padding={5}
      pivotLetter={state.pivotLetter}
      letters={state.letters.filter(letter => letter !== state.pivotLetter)}
      onPress={(element: string) =>
        dispatch({type: 'UPDATE_GUESS', guess: guess + element})
      }
    />
  );
};

export default GameHive;
