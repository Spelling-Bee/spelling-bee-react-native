import React from 'react';
import {View, ViewStyle} from 'react-native';
import Hexagon, {HexagonProps} from './Hexagon';

export interface HiveProps {
  space: number;
  padding?: number;
  hiveProps?: Partial<HexagonProps>[] | any;
  pivotProps?: Partial<HexagonProps> | any;
  HiveElement?: React.ComponentType<HexagonProps | any>;
  primaryColor?: string;
  secondaryColor?: string;
}

const Hive = ({
  space,
  padding = 0,
  hiveProps = [],
  pivotProps = {},
  HiveElement = Hexagon,
  primaryColor,
  secondaryColor,
}: HiveProps) => {
  const length = space / 5 - padding;
  const position = Math.sin(Math.PI / 3) * length + padding;
  const styles: ViewStyle[] = [
    {
      left: padding,
      transform: [{translateY: position}],
    },
    {
      left: padding,
      transform: [{translateY: -position}],
    },
    {
      transform: [{translateY: position * 2}],
    },
    {
      transform: [{translateY: -position * 2}],
    },
    {
      right: padding,
      transform: [{translateY: position}],
    },
    {
      right: padding,
      transform: [{translateY: -position}],
    },
  ];
  return (
    <View style={{width: space, height: space}}>
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {styles.map((style, index) => {
          return (
            <View
              style={[{position: 'absolute'}, style]}
              key={'hive-' + index.toString()}>
              <HiveElement
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                {...hiveProps[index] || {}}
                length={length}
              />
            </View>
          );
        })}
        <View style={[{position: 'absolute'}]}>
          <HiveElement
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            {...pivotProps}
            length={length}
            active
          />
        </View>
      </View>
    </View>
  );
};

export default Hive;
