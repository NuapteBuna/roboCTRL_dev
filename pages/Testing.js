import {Text} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {View} from 'react-native';
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

let prevDir = '';

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
      }, 0.1);
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

  const [dir, setDir] = useState('');

  const inInterval = (x, a, b) => {
    if (x >= a && x <= b) return true;
    return false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (front) {
        BluetoothSerial.write('w').then(res => console.log(res));
      }
    }, 100);
  }, []);

  let eroare = 10;

  useEffect(() => {
    //setPosX(x);
    //setPosY(y);
    let output = parseInt(x).toString() + parseInt(y).toString();
    if (x > 50 + eroare && y > 50 + eroare) {
      if (inInterval(x, 50, 65)) setDir('w');
      else setDir('e');
    } else if (x < 50 && y > 50) {
      if (inInterval(x, 35, 50)) setDir('w');
      else setDir('q');
    } else if (x < 50 && y < 50) {
      setDir('a');
    } else if (x > 50 && y < 50) {
      setDir('d');
    }
    if (x == 0 && y == 0) {
      setDir('s');
    }
    if (prevDir != dir) {
      //BluetoothSerial.write(dir).then(res => console.log(res));
      prevDir = dir;
    }
  }, [x, y]);

  const [checked, setChecked] = useState(false);

  const [front, setFront] = useState(false);
  const timer = useRef(null);
  const [counter, setCounter] = useState(0);

  const addOne = () => {
    setDir('w');
    timer.current = setTimeout(addOne, 200);
  };

  useEffect(() => {
    BluetoothSerial.write(dir).then(res => console.log(res));
  }, [dir]);

  const stopTimer = () => {
    setDir('s');
    clearTimeout(timer.current);
  };
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
          <Button
            size={20}
            mode="contained"
            onPressIn={addOne}
            onPress={() => {
              addOne;
            }}
            onPressOut={stopTimer}>
            Press
          </Button>
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
        <Text>{parseInt(x)}</Text>
        <Text>{parseInt(y)}</Text>
        <Text>{dir}</Text>
        <Text>{counter}</Text>
      </GestureHandlerRootView>
    </>
  );
};
export default withTheme(Testing);
