// https://stackoverflow.com/questions/47102946/prevent-double-tap-in-react-native
import * as React from 'react';
import _ from 'lodash'; // 4.0.8

const withPreventDoubleClick = WrappedComponent => {
  class PreventDoubleClick extends React.PureComponent {
    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    };

    onPress = _.debounce(this.debouncedOnPress, 300, {
      leading: true,
      trailing: false,
    });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName ||
    WrappedComponent.name})`;
  return PreventDoubleClick;
};

export default withPreventDoubleClick;
