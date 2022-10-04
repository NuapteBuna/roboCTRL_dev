import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';

import Testing from '../../pages/Testing';
import Home from '../../pages/Home';

const MusicRoute = () => <Home />;

const AlbumsRoute = () => <Testing />;

const RecentsRoute = () => <Home />;

const NotificationsRoute = () => <Text>Notifications</Text>;

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'music',
      title: 'Connection',
      focusedIcon: 'bluetooth-connect',
      unfocusedIcon: 'bluetooth-connect',
    },
    {key: 'albums', title: 'Albums', focusedIcon: 'album'},
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
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;
