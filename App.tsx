import React, {useState, useRef} from 'react';
import {SafeAreaView, Dimensions, View, Text} from 'react-native';
import {Hive, TextButton, RefreshButton, SolvedWords} from 'components';
import * as Animatable from 'react-native-animatable';
import {shuffle} from 'helpers';
const {width, height} = Dimensions.get('window');

import SpellingBee from 'SpellingBee';

const sb = SpellingBee.createGame(
  require('./src/de.json'),
  ['s', 'p', 'i', 'e', 'l', 'r', 'n'],
  'e',
  4,
);

declare var global: {HermesInternal: true | {}};

const App = () => {
  const [guess, setGuess] = useState('');
  const [letters, setLetters] = useState(
    sb.letters.filter(
      (letter: string) => letter.toUpperCase() !== sb.pivotLetter.toUpperCase(),
    ),
  );
  const textInputRef = useRef(null);
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fafafa'}}>
        <View
          style={{
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Animatable.Text
            style={{fontSize: 36, fontWeight: 'bold', color: 'black'}}
            ref={textInputRef}>
            {[...guess.toUpperCase()].map((letter, index) => {
              if (letter === sb.pivotLetter.toUpperCase()) {
                return (
                  <Text
                    style={{color: 'orange'}}
                    key={'guess' + letter + index}>
                    {letter}
                  </Text>
                );
              }
              return letter;
            })}
          </Animatable.Text>
        </View>
        <Hive
          space={height > width ? width : height}
          padding={5}
          pivotLetter={sb.pivotLetter}
          letters={letters}
          onPress={(element: string) => setGuess(guess + element)}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <TextButton
            onPress={() => {
              setGuess(guess.slice(0, guess.length - 1));
            }}>
            Delete
          </TextButton>
          <RefreshButton
            onPress={() => {
              setLetters(shuffle(letters));
            }}
          />
          <TextButton
            onPress={() => {
              if (textInputRef !== null && textInputRef.current !== null) {
                if (SpellingBee.makeGuess(guess, sb)) {
                  setGuess('');
                } else {
                  textInputRef.current.shake(800).then(() => {
                    setGuess('');
                  });
                }
              }
            }}>
            Enter
          </TextButton>
        </View>
        <View style={{height: 40}} />
        <SolvedWords data={sb.getGuessedWords()} />
      </SafeAreaView>
    </>
  );
};

export default App;
