import * as React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const TextButton = ({children, onPress}: {children: string; onPress: any}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 120,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 90,
          borderColor: 'lightgrey',
          borderWidth: 1,
          backgroundColor: 'white',
        }}>
        <Text style={{color: 'grey', fontSize: 18}}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;
