/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
} from 'react-native';

import {Button} from 'react-native-paper';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useTheme} from 'react-native-paper';

import BottomNav from './components/BottomNav/BottomNav';

import Header from './components/Header/Header';

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

import {useContext} from 'react';
import {State} from 'react-native-gesture-handler';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const StateContext = React.createContext();

const App = props => {
  const isDarkMode = useColorScheme() === 'dark';

  const {colors} = props.theme;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [hasPermissions, setPermissions] = useState(false);

  const requestBluetoothPermission = async () => {
    requestMultiple([
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
    ]).then(statuses => {
      console.log(
        'Bluetooth connect',
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT],
      );
      console.log(
        'Bluetooth scan',
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN],
      );
      console.log(
        'Bluetooth advertise',
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE],
      );
    });
  };

  useEffect(() => {
    requestMultiple([
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
    ]).then(statuses => {
      console.log(
        'Bluetooth connect',
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT],
      );
      console.log(
        'Bluetooth scan',
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN],
      );
      console.log(
        'Bluetooth advertise',
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE],
      );
    });
  }, []);

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const [move, setMove] = useState(false);

  return (
    <>
      <>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
        />
        <StateContext.Provider
          value={{posX, setPosX, posY, setPosY, move, setMove}}>
          <BottomNav />
        </StateContext.Provider>
      </>
    </>

    /*<SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">Hello World!</Section>
          <Button mode="contained" style={styles.button}>
            Print
          </Button>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>*/
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
export {StateContext};
