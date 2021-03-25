import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useStore, useDispatch} from '../Provider';
function GameInput() {
  const dispatch = useDispatch();
  const {
    game: {
      state: {pivotLetter},
    },
    guess,
    error,
  } = useStore();
  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch({type: 'FINISHED_ERROR_ANIMATION'});
      }, 1000);
    }
  }, [dispatch, error]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginBottom: 5}}>
        <Animatable.Text
          duration={1000}
          style={{fontSize: 14, color: 'grey'}}
          animation={error !== null ? 'tada' : undefined}>
          {error}
        </Animatable.Text>
      </View>
      <Animatable.Text
        duration={800}
        animation={error !== null ? 'shake' : undefined}
        style={{fontSize: 36, fontWeight: 'bold', color: 'black'}}>
        {[...guess.toUpperCase()].map((letter, index) => {
          if (letter === pivotLetter.toUpperCase()) {
            return (
              <Text style={{color: 'orange'}} key={'guess' + letter + index}>
                {letter}
              </Text>
            );
          }
          return letter;
        })}
      </Animatable.Text>
    </View>
  );
}

export default GameInput;
