import {Text} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {View} from 'react-native';
import {useState} from 'react';
import {KorolJoystick} from 'korol-joystick-custom';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Testing = () => {
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <KorolJoystick color="#06b6d4" onMove={data => console.log(data)} />
      </GestureHandlerRootView>
    </>
  );
};
export default Testing;
