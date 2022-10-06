/**
 * @format
 */

import * as React from 'react';
import {AppRegistry, PlatformColor} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './App';

import {
  MaterialYouService,
  useMaterialYouPalette,
  defaultPalette,
} from '@assembless/react-native-material-you';
import {getPaletteSync} from '@assembless/react-native-material-you';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function Main() {
  const palette = getPaletteSync();

  let theme = {
    ...DefaultTheme,
  };

  if (palette.system_accent1[1] != '#FAFAFA') {
    theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: palette.system_accent1[6],
        primaryContainer: palette.system_accent1[3],

        secondary: palette.system_accent2[6],
        secondaryContainer: palette.system_accent2[3],

        tertiary: palette.system_accent3[6],
        tertiaryContainer: palette.system_accent3[3],

        background: palette.system_neutral1[2],

        surface: palette.system_neutral2[2],
        surfaceVariant: palette.system_neutral2[1],
        surfaceDisabled: palette.system_accent1[6],
        onSurfaceDisabled: palette.system_accent1[6],

        elevation: {
          level0: palette.system_accent2[0],
          level1: palette.system_accent2[1],
          level2: palette.system_accent2[2],
          level3: palette.system_accent2[3],
          level4: palette.system_accent2[4],
          level5: palette.system_accent2[5],
        },
      },
    };
  }

  return (
    <MaterialYouService fallbackPalette={defaultPalette}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <App theme={theme} />
        </GestureHandlerRootView>
      </PaperProvider>
    </MaterialYouService>
  );
}

AppRegistry.registerComponent(appName, () => Main);
