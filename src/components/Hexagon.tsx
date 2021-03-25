import React from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import Svg, {Polygon, PolygonProps} from 'react-native-svg';

export interface HexagonProps extends PolygonProps, ViewProps {
  length: number;
  active?: boolean;
  style?: ViewStyle;
  primaryColor?: string;
  secondaryColor?: string;
}

const Hexagon = (props: HexagonProps) => {
  const {
    length,
    active,
    style,
    primaryColor = 'orange',
    secondaryColor = 'lightgrey',
  } = props;

  const opposite = Math.sin(Math.PI / 3) * length;
  const adjacent = Math.cos(Math.PI / 3) * length;
  const points = [
    [0, opposite],
    [adjacent, 0],
    [adjacent + length, 0],
    [2 * adjacent + length, opposite],
    [adjacent + length, opposite * 2],
    [adjacent, opposite * 2],
  ];
  const pointsString = points.reduce((accumulation, currentPoint) => {
    if (accumulation !== '') {
      accumulation += ' ';
    }
    accumulation += currentPoint[0] + ',' + currentPoint[1];
    return accumulation;
  }, '');

  return (
    <View style={style}>
      <Svg height={opposite * 2} width={2 * adjacent + length}>
        <Polygon
          points={pointsString}
          fill={active ? primaryColor : secondaryColor}
          {...props}
        />
      </Svg>
    </View>
  );
};

export default Hexagon;
