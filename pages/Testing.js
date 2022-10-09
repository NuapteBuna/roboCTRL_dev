import {Text} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {View} from 'react-native';
import {useCallback, useContext, useState} from 'react';
import {KorolJoystick} from 'korol-joystick-custom';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {withTheme} from 'react-native-paper';
import Header from '../components/Header/Header';
import {useEffect} from 'react';

import {Checkbox} from 'react-native-paper';
import {StateContext} from '../App';

const Testing = props => {
  const {colors} = props.theme;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const {posX, setPosX, posY, setPosY, move, setMove} =
    useContext(StateContext);

  const debounce = func => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 0.3);
    };
  };

  const handleChangeX = input => {
    if (input != x) {
      setX(input);
      //setPosX(input);
    }
  };
  const optimizedX = useCallback(debounce(handleChangeX));

  const handleChangeY = input => {
    if (input != y) {
      setY(input);
      //posY = input;
      //setPosY(input);
    }
  };
  const optimizedY = useCallback(debounce(handleChangeY));

  useEffect(() => {
    setPosX(x);
    setPosY(y);
  }, [x, y]);

  const [checked, setChecked] = useState(false);

  return (
    <>
      <Header title="Navigation" />
      <GestureHandlerRootView style={{flex: 1}}>
        <View
          style={{
            display: 'flex',
            flex: 1,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: '60%',
          }}>
          <Text>hello world</Text>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
              setMove(!checked);
            }}></Checkbox>
          <KorolJoystick
            //color={colors.secondary}
            radius={75}
            onMove={data => (
              optimizedX(data.position.x), optimizedY(data.position.y)
            )}
            onStop={data => (
              optimizedX(data.position.x), optimizedY(data.position.y)
            )}
          />
        </View>
      </GestureHandlerRootView>
    </>
  );
};
export default withTheme(Testing);
