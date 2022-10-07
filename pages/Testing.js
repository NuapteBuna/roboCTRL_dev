import {Text} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {View} from 'react-native';
import {useCallback, useState} from 'react';
import {KorolJoystick} from 'korol-joystick-custom';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {withTheme} from 'react-native-paper';

const Testing = props => {
  const {colors} = props.theme;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

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
    setX(input);
  };
  const optimizedX = useCallback(debounce(handleChangeX));

  const handleChangeY = async input => {
    setY(input);
  };
  const optimizedY = useCallback(debounce(handleChangeY));

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <View
          style={{
            display: 'flex',
            flex: 1,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: '100%',
          }}>
          <KorolJoystick
            color={colors.primary}
            onMove={data => (
              optimizedX(data.position.x), optimizedY(data.position.y)
            )}
            onStop={data => (
              optimizedX(data.position.x), optimizedY(data.position.y)
            )}
          />
          <Text>{x.toFixed(2)}</Text>
          <Text>{y.toFixed(2)}</Text>
        </View>
      </GestureHandlerRootView>
    </>
  );
};
export default withTheme(Testing);
