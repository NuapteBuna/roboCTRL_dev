import { Text } from "react-native-paper";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { useCallback, useContext, useState } from "react";
import { KorolJoystick } from "korol-joystick-custom";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { withTheme } from "react-native-paper";
import Header from "../components/Header/Header";
import { useEffect, useRef } from "react";

import { Checkbox } from "react-native-paper";
import { StateContext } from "../App";

import BluetoothSerial from "react-native-bluetooth-serial-speedy";

import { IconButton, MD3Colors } from "react-native-paper";

const Testing = (props) => {
  const { colors } = props.theme;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const { posX, setPosX, posY, setPosY, move, setMove } =
    useContext(StateContext);

  const debounce = (func) => {
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

  const handleChangeX = (input) => {
    if (input != x) {
      setX(input);
    }
  };
  const optimizedX = useCallback(debounce(handleChangeX));

  const handleChangeY = (input) => {
    if (input != y) {
      setY(input);
    }
  };
  const optimizedY = useCallback(debounce(handleChangeY));

  const [dir, setDir] = useState("");

  const inInterval = (x, a, b) => {
    if (x >= a && x <= b) return true;
    return false;
  };

  let eroare = 10;

  useEffect(() => {
    //TODO: CHANGE THIS (ONENOTE)
    /*if (x > 50 + eroare && y > 50 + eroare) {
      if (inInterval(x, 50, 65)) setDir("w");
      else setDir("e");
    } else if (x < 50 && y > 50) {
      if (inInterval(x, 35, 50)) setDir("w");
      else setDir("q");
    } else if (x < 50 && y < 50) {
      setDir("a");
    } else if (x > 50 && y < 50) {
      setDir("d");
    }*/
    if (x == 0 && y == 0) {
      setDir("s");
    }
  }, [x, y]);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    BluetoothSerial.write(dir).then((res) => console.log(res));
  }, [dir]);

  return (
    <>
      <Header title="Navigation" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            display: "flex",
            flex: 1,
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: "60%",
          }}
        >
          <IconButton
            icon="arrow-up"
            size={20}
            mode="contained"
            onPressIn={() => setDir("w")}
            onPress={() => setDir("w")}
            onPressOut={() => setDir("s")}
          ></IconButton>

          <IconButton
            icon="arrow-down"
            size={20}
            mode="contained"
            onPressIn={() => setDir("x")}
            onPress={() => setDir("x")}
            onPressOut={() => setDir("s")}
          ></IconButton>

          <IconButton
            icon="arrow-top-right"
            size={20}
            mode="contained"
            onPressIn={() => setDir("e")}
            onPress={() => setDir("e")}
            onPressOut={() => setDir("s")}
          ></IconButton>

          <IconButton
            icon="arrow-top-left"
            size={20}
            mode="contained"
            onPressIn={() => setDir("q")}
            onPress={() => setDir("q")}
            onPressOut={() => setDir("s")}
          ></IconButton>

          <IconButton
            icon="arrow-bottom-left"
            size={20}
            mode="contained"
            onPressIn={() => setDir("z")}
            onPress={() => setDir("z")}
            onPressOut={() => setDir("s")}
          ></IconButton>

          <IconButton
            icon="arrow-bottom-right"
            size={20}
            mode="contained"
            onPressIn={() => setDir("c")}
            onPress={() => setDir("c")}
            onPressOut={() => setDir("s")}
          ></IconButton>

          <IconButton
            icon="arrow-left"
            size={20}
            mode="contained"
            onPressIn={() => setDir("a")}
            onPress={() => setDir("a")}
            onPressOut={() => setDir("s")}
          ></IconButton>

          <IconButton
            icon="arrow-right"
            size={20}
            mode="contained"
            onPressIn={() => setDir("d")}
            onPress={() => setDir("d")}
            onPressOut={() => setDir("s")}
          ></IconButton>

          <Text>hello world</Text>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
              setMove(!checked);
            }}
          ></Checkbox>
          <KorolJoystick
            //color={colors.secondary}
            radius={75}
            onMove={(data) => (
              optimizedX(data.position.x), optimizedY(data.position.y)
            )}
            onStop={(data) => (
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
