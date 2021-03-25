import React from 'react';
import {useStore} from '../Game/Provider';
import {Dimensions, Text, View} from 'react-native';
import {Hive, SpellingBeeHive} from 'components';
const {width, height} = Dimensions.get('window');

const GuessedWords = () => {
  const {
    game: {state},
  } = useStore();

  return (
    <View style={{width, padding: 20}}>
      <Text style={{fontSize: 36, fontWeight: 'bold'}}>Guessed Words</Text>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Hive space={207} padding={1} secondaryColor={'orange'} />
      </View>
      {state.guessedWords.map(word => {
        return (
          <View
            style={{padding: 20, height: 90, flexDirection: 'row'}}
            key={word}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{word}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginRight: 10}}>
                <Hive space={50} padding={0.5} secondaryColor={'orange'} />
              </View>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>500</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default GuessedWords;
