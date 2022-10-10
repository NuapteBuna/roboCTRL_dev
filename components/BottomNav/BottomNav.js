import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';

import Testing from '../../pages/Testing';
import Home from '../../pages/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useContext} from 'react';
import {StateContext} from '../../App';
import {useMemo} from 'react';
import {withTheme} from 'react-native-paper';
import {Appearance} from 'react-native';

const MusicRoute = () => {
  const {posX, setPosX, posY, setPosY, move, setMove} =
    useContext(StateContext);
  return (
    <StateContext.Provider
      value={{posX, setPosX, posY, setPosY, move, setMove}}>
      <Home />
    </StateContext.Provider>
  );
};

const NavigationRoute = () => {
  const {posX, setPosX, posY, setPosY, move, setMove} =
    useContext(StateContext);
  return (
    <StateContext.Provider
      value={{posX, setPosX, posY, setPosY, move, setMove}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Testing />
      </GestureHandlerRootView>
    </StateContext.Provider>
  );
};

const RecentsRoute = () => <Home />;

const NotificationsRoute = () => <Text>Notifications</Text>;

const BottomNav = props => {
  const {colors} = props.theme;
  let dark = false;
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark') {
    dark = true;
  } else {
    dark = false;
  }
  const {posX, setPosX, posY, setPosY, move, setMove} =
    useContext(StateContext);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'music',
      title: 'Connection',
      focusedIcon: 'bluetooth-connect',
      unfocusedIcon: 'bluetooth-connect',
    },
    {
      key: 'navigation',
      title: 'Navigation',
      focusedIcon: 'navigation',
      unfocusedIcon: 'navigation-outline',
    },
    {key: 'recents', title: 'Recents', focusedIcon: 'history'},
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    navigation: NavigationRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
      barStyle={{
        backgroundColor: dark ? colors.surfaceVariant : colors.primaryVariant,
      }}
    />
  );
};

export default withTheme(BottomNav);
