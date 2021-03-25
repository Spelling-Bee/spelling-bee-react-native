import React, {useState, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RefreshButton = ({onPress}: {onPress: any}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          margin: 20,
          width: 50,
          height: 50,
          borderRadius: 50,
          borderColor: 'lightgrey',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Icon
          name={'ios-sync'}
          size={24}
          color={'grey'}
          style={{paddingLeft: 2}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RefreshButton;
