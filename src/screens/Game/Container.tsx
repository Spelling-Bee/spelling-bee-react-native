import React from 'react';
import Provider from './Provider';

export default WrapperComponent => props => {
  return (
    <Provider>
      <WrapperComponent {...props} />
    </Provider>
  );
};
