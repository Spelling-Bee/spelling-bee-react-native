import React, {useState} from 'react';
import {View} from 'react-native';
import {TextButton, RefreshButton} from 'components';
//import {shuffle} from 'lodash';
import {useStore, useDispatch} from '../Provider';
import SpellingBee from '../../../SpellingBee';

const GameActions = () => {
  let {
    guess,
    game: {state},
  } = useStore();
  const dispatch = useDispatch();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <TextButton
          onPress={() => {
            dispatch({
              type: 'UPDATE_GUESS',
              guess: guess.slice(0, guess.length - 1),
            });
          }}>
          Delete
        </TextButton>
        <RefreshButton
          onPress={() => {
            dispatch({
              type: 'SHUFFLE_LETTERS',
            });
          }}
        />
        <TextButton
          onPress={() => {
            try {
              if (guess !== '') {
                if (SpellingBee.checkGuess(guess, state)) {
                  dispatch({type: 'ADD_GUESS', guess});
                }
              }
            } catch (error) {
              dispatch({type: 'WRONG_GUESS', message: error});
            }
          }}>
          Enter
        </TextButton>
      </View>
    </>
  );
};

export default GameActions;
