import {StateContext} from '../App';
import {useCallback, useContext, useState} from 'react';
import {
  Constants,
  Colors,
  View,
  Text,
  Button,
  Icon,
  Slider,
  GradientSlider,
  ColorSliderGroup,
} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';
import {Appearance} from 'react-native';

const ArmControl = props => {
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
  return (
    <View>
      <Slider
        onValueChange={() => console.log('value changed')}
        minimumValue={-100}
        maximumValue={100}
        value={-30}
        minimumTrackTintColor={colors.primary}
        thumbTintColor={colors.primary}
        containerStyle={styles.slider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ltr: {
    flexDirection: 'row-reverse',
  },
  image: {
    tintColor: Colors.$iconNeutral,
  },
  text: {
    width: 40,
  },
  slider: {
    marginVertical: 6,
  },
  sliderContainer: {
    flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!
    marginHorizontal: 8,
  },
  gradientSliderContainer: {
    flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!
    marginHorizontal: 20,
    marginVertical: 10,
  },
  track: {
    height: 2,
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: Colors.violet40,
    borderWidth: 1,
    shadowColor: Colors.white,
  },
  activeThumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: Colors.yellow30,
    borderWidth: 2,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.$outlineDefault,
  },
  group: {
    backgroundColor: Colors.$backgroundNeutralMedium,
    padding: 10,
    borderRadius: 6,
  },
});

export default withTheme(ArmControl);
