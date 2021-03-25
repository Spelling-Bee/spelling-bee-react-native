import React from 'react';
import SpellingBeeHexagon from './SpellingBeeHexagon';
import Hive, {HiveProps} from './Hive';

interface SpellingBeeHiveProps extends HiveProps {
  pivotLetter: string;
  letters: Array<string>;
  onPress: (letter: string) => void;
}

const SpellingBeeHive = (props: SpellingBeeHiveProps) => {
  const {pivotLetter, letters, onPress} = props;
  const hiveProps = letters.map(letter => ({
    onPress: () => onPress(letter),
    children: letter,
  }));
  return (
    <Hive
      {...props}
      HiveElement={SpellingBeeHexagon}
      hiveProps={hiveProps}
      pivotProps={{onPress: () => onPress(pivotLetter), children: pivotLetter}}
    />
  );
};

export default SpellingBeeHive;
