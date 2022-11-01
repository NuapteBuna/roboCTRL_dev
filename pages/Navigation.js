import {Text} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {addons, View} from 'react-native';
import {useCallback, useContext, useState} from 'react';
import {KorolJoystick} from 'korol-joystick-custom';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {withTheme} from 'react-native-paper';
import Header from '../components/Header/Header';
import {useEffect, useRef} from 'react';

import {Checkbox} from 'react-native-paper';
import {StateContext} from '../App';

import BluetoothSerial from 'react-native-bluetooth-serial-speedy';

import {IconButton, MD3Colors} from 'react-native-paper';

const Navigation = props => {
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
      }, 0.1);
    };
  };

  const handleChangeX = input => {
    if (input != x) {
      setX(input);
    }
  };
  const optimizedX = useCallback(debounce(handleChangeX));

  const handleChangeY = input => {
    if (input != y) {
      setY(input);
    }
  };
  const optimizedY = useCallback(debounce(handleChangeY));

  const [dir, setDir] = useState('');

  let error = 30;
  let center = 70;

  useEffect(() => {
    if (x > center && y > center) {
      if (x > center + error && y > center + error) {
        setDir('e');
      } else if (x > center + error) {
        setDir('d');
      } else if (y > center + error) {
        setDir('w');
      }
    }

    if (x < center && y > center) {
      if (x < center - error && y > center + error) {
        setDir('q');
      } else if (x < center - error) {
        setDir('a');
      } else if (y > center + error) {
        setDir('w');
      }
    }

    if (x < center && y < center) {
      if (x < center - error && y < center - error) {
        setDir('z');
      } else if (x < center - error) {
        setDir('a');
      } else if (y < center - error) {
        setDir('x');
      }
    }

    if (x > center && y < center) {
      if (x > center + error && y < center - error) {
        setDir('c');
      } else if (x > center + error) {
        setDir('d');
      } else if (y < center - error) {
        setDir('x');
      }
    }

    if (x == 0 && y == 0) {
      setDir('s');
    }
  }, [x, y]);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    BluetoothSerial.write(dir).then(res => console.log(res));
  }, [dir]);

  let buttonSize = 36;

  return (
    <>
      <Header title="Navigation" />
      <View
        style={{
          display: 'flex',
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: '40%',
        }}>
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <IconButton
            icon="arrow-top-left"
            size={buttonSize}
            mode="contained"
            onPressIn={() => setDir('q')}
            onPress={() => setDir('s')}
          />
          <IconButton
            icon="arrow-up"
            size={buttonSize}
            mode="contained"
            onPressIn={() => setDir('w')}
            onPress={() => setDir('s')}
          />
          <IconButton
            icon="arrow-top-right"
            size={buttonSize}
            mode="contained"
            onPressIn={() => setDir('e')}
            onPress={() => setDir('s')}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <IconButton
            icon="arrow-left"
            size={buttonSize}
            mode="contained"
            onPressIn={() => setDir('a')}
            onPress={() => setDir('s')}
          />
          <IconButton
            icon="rotate-left"
            size={buttonSize / 2}
            style={{
              margin: 0,
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
            mode="contained"
            onPressIn={() => setDir('h')}
            onPress={() => setDir('s')}
          />
          <IconButton
            icon="rotate-right"
            size={buttonSize / 2}
            style={{
              margin: 0,
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
            mode="contained"
            onPressIn={() => setDir('j')}
            onPress={() => setDir('s')}
          />
          <IconButton
            icon="arrow-right"
            size={buttonSize}
            mode="contained"
            onPressIn={() => setDir('d')}
            onPress={() => setDir('s')}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <IconButton
            icon="arrow-bottom-left"
            size={buttonSize}
            mode="contained"
            onPressIn={() => setDir('z')}
            onPress={() => setDir('s')}
          />
          <IconButton
            icon="arrow-down"
            size={buttonSize}
            mode="contained"
            onPressIn={() => setDir('x')}
            onPress={() => setDir('s')}
          />
          <IconButton
            icon="arrow-bottom-right"
            size={buttonSize}
            mode="contained"
            onPressIn={() => setDir('c')}
            onPress={() => setDir('s')}
          />
        </View>
      </View>
      <GestureHandlerRootView style={{flex: 1}}>
        <View
          style={{
            display: 'flex',
            flex: 1,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text>hello world</Text>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
              setMove(!checked);
            }}></Checkbox>
          <KorolJoystick
            color={colors.primary}
            radius={100}
            onMove={data => (
              optimizedX(data.position.x), optimizedY(data.position.y)
            )}
            onStop={data => (
              optimizedX(data.position.x), optimizedY(data.position.y)
            )}
          />
        </View>
        <Text>{parseInt(x)}</Text>
        <Text>{parseInt(y)}</Text>
        <Text>{dir}</Text>
      </GestureHandlerRootView>
    </>
  );
};
export default withTheme(Navigation);
