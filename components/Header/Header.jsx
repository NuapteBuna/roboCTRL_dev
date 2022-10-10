import * as React from 'react';
import {Appbar, Text} from 'react-native-paper';

const Header = props => {
  return (
    <>
      <Text
        style={{
          fontSize: 36,
          fontWeight: '400',
          marginLeft: 20,
          marginTop: 100,
        }}>
        {props.title}
      </Text>
    </>
  );
};

export default Header;
