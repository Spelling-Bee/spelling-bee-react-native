import React from 'react';
import {Easing, Animated} from 'react-native';
import Hexagon, {HexagonProps} from './Hexagon';

class HexagonPressInFeedback extends React.Component<HexagonProps> {
  scaleAnimatedValue = new Animated.Value(0);

  scale = this.scaleAnimatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  render() {
    return (
      <Animated.View style={{transform: [{scale: this.scale}]}}>
        <Hexagon
          onPressIn={() => {
            Animated.timing(this.scaleAnimatedValue, {
              toValue: 1,
              duration: 100,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.timing(this.scaleAnimatedValue, {
              toValue: 2,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start(finished => {
              if (finished) {
                this.scaleAnimatedValue.setValue(0);
              }
            });
          }}
          {...this.props}
        />
      </Animated.View>
    );
  }
}

export default HexagonPressInFeedback;
