import * as React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const {height} = Dimensions.get('window');

class Example extends React.Component<{data: Array<string>}> {
  state = {open: false};
  animatedValue = new Animated.Value(1);
  bottomSheetRef = React.createRef();

  renderWord = ({word, last}: {word: string; last: boolean}) => {
    return (
      <View
        style={{
          height: 50,
          padding: 10,
          marginHorizontal: 20,
          justifyContent: 'center',
          borderBottomWidth: last ? 0 : 4,
          borderBottomColor: 'lightgrey',
        }}
        key={word}>
        <Text style={{fontSize: 18, color: 'grey'}}>{word.toUpperCase()}</Text>
      </View>
    );
  };

  renderContent = () => (
    <View style={{height: height - 50, backgroundColor: 'white'}}>
      {this.props.data.map((element, index) =>
        this.renderWord({
          word: element,
          last: index === this.props.data.length - 1,
        }),
      )}
    </View>
  );

  renderHeaderIcon = ({name, active}: {name: string; active: boolean}) => {
    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          backgroundColor: 'white',
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: interpolate(this.animatedValue, {
            inputRange: [0, 1],
            outputRange: [active ? 1 : 0, active ? 0 : 1],
            extrapolate: Extrapolate.CLAMP,
          }),
        }}>
        <Icon
          name={name}
          size={30}
          color={this.props.data.length > 0 ? 'orange' : 'lightgrey'}
        />
      </Animated.View>
    );
  };

  renderHeader = () => (
    <View
      style={{
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <TouchableOpacity
        onPress={() => {
          this.bottomSheetRef.current.snapTo(this.state.open ? 0 : 1);
        }}>
        <View
          style={{
            flex: 1,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {this.renderHeaderIcon({name: 'ios-arrow-down', active: true})}
          {this.renderHeaderIcon({
            name: 'ios-arrow-up',
            active: false,
          })}
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    if (this.props.data.length === 0) {
      return null;
    }
    return (
      <Animatable.View
        animation={'slideInUp'}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        pointerEvents={'box-none'}>
        <BottomSheet
          snapPoints={[60, height - 100]}
          initialSnap={0}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          callbackNode={this.animatedValue}
          ref={this.bottomSheetRef}
          onOpenStart={() => {
            this.setState({open: true});
          }}
          onOpenEnd={() => {
            this.setState({open: true});
          }}
          onCloseStart={() => {
            this.setState({open: false});
          }}
          onCloseEnd={() => {
            this.setState({open: false});
          }}
        />
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'black',
            opacity: interpolate(this.animatedValue, {
              inputRange: [0, 1],
              outputRange: [0.5, 0],
              extrapolate: Extrapolate.CLAMP,
            }),
          }}
          pointerEvents={'none'}
        />
      </Animatable.View>
    );
  }
}

export default Example;
