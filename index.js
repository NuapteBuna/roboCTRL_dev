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
import {Appearance} from 'react-native';

export default function Main() {
  const palette = getPaletteSync();

  let theme = {
    ...DefaultTheme,
  };
  let dark = false;
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark') {
    dark = true;
  } else {
    dark = false;
  }
  if (palette.system_accent1[1] != '#FAFAFA') {
    if (!dark) {
      theme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: palette.system_accent1[8],
          onPrimary: palette.system_accent1[0],
          primaryContainer: palette.system_accent1[3],
          onPrimaryContainer: palette.system_accent1[11],

          secondary: palette.system_accent2[8],
          onSecondary: palette.system_accent2[0],
          secondaryContainer: palette.system_accent2[3],
          onSecondaryContainer: palette.system_accent2[11],

          tertiary: palette.system_accent3[8],
          onTertiary: palette.system_accent3[0],
          tertiaryContainer: palette.system_accent3[3],
          onTertiaryContainer: palette.system_accent3[11],

          background: palette.system_neutral1[2],
          onBackground: palette.system_neutral1[11],
          surface: palette.system_neutral1[1],
          onSurface: palette.system_neutral1[11],

          surfaceVariant: palette.system_neutral2[3],
          onSurfaceVariant: palette.system_neutral2[9],
          outline: palette.system_neutral2[7],
          outlineVariant: palette.system_neutral2[4],

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
    } else {
      theme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: palette.system_accent1[4],
          onPrimary: palette.system_accent1[10],
          primaryContainer: palette.system_accent1[9],
          onPrimaryContainer: palette.system_accent1[3],

          secondary: palette.system_accent2[4],
          onSecondary: palette.system_accent2[10],
          secondaryContainer: palette.system_accent2[9],
          onSecondaryContainer: palette.system_accent2[3],

          tertiary: palette.system_accent3[4],
          onTertiary: palette.system_accent3[10],
          tertiaryContainer: palette.system_accent3[9],
          onTertiaryContainer: palette.system_accent3[3],

          background: palette.system_neutral1[11],
          onBackground: palette.system_neutral1[3],
          surface: palette.system_neutral1[11],
          onSurface: palette.system_neutral1[3],

          surfaceVariant: palette.system_neutral2[10],
          onSurfaceVariant: palette.system_neutral2[4],
          outline: palette.system_neutral2[6],
          outlineVariant: palette.system_neutral2[9],

          surfaceDisabled: palette.system_accent1[12],
          onSurfaceDisabled: palette.system_accent1[12],
        },
        elevation: {
          level0: palette.system_accent1[12],
          level1: palette.system_accent1[11],
          level2: palette.system_accent1[10],
          level3: palette.system_accent1[9],
          level4: palette.system_accent1[8],
          level5: palette.system_accent1[7],
        },
      };
    }
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
