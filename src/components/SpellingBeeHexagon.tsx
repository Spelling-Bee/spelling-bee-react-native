import React, {useState, useEffect} from 'react';
import {View, Animated, Easing, GestureResponderEvent} from 'react-native';
import { HexagonProps } from './Hexagon';
import HexagonPressInFeedback from './HexagonPressInFeedback';

interface SpellingBeeHexagonProps extends HexagonProps{
  style?: any;
  children?: string;
  active?: boolean;
  onPress: (event: GestureResponderEvent) => void;

}

const SpellingBeeHexagon = (props: SpellingBeeHexagonProps) => {
  const {style, children, active} = props;
  const [opacity] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      easing: Easing.ease,
      duration: 700,
    }).start();
  });

  return (
    <>
      <HexagonPressInFeedback {...props} />
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        pointerEvents={'none'}>
        <Animated.Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: active ? 'white' : 'black',
            opacity: active ? 1 : opacity,
          }}>
          {children?.toUpperCase()}
        </Animated.Text>
      </View>
    </>
  );
};

export default SpellingBeeHexagon;
