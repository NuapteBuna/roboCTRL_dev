import {Text} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {View} from 'react-native';
import {useState} from 'react';

const Testing = () => {
  return (
    <>
      <Text>eu sunt zeu</Text>
      <Button
        mode="contained"
        onPress={() => {
          console.log('pressed');
        }}>
        testing
      </Button>
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          margin: 100,
        }}></View>
    </>
  );
};
export default Testing;
