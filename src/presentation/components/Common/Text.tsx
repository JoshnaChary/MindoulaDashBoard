import React from 'react';
import { Text as RNText, TextProps, StyleSheet, TextStyle } from 'react-native';

export const Text: React.FC<TextProps> = (props) => {
  const { style, ...rest } = props;
  const flatStyle = StyleSheet.flatten(style || {}) as TextStyle;

  // Determine the correct Inter font family based on fontWeight
  let fontFamily = 'Inter_400Regular';
  const weight = flatStyle.fontWeight;

  if (weight === 'bold' || weight === '700' || weight === '800' || weight === '900') {
    fontFamily = 'Inter_700Bold';
  } else if (weight === '600') {
    fontFamily = 'Inter_600SemiBold';
  } else if (weight === '500') {
    fontFamily = 'Inter_500Medium';
  } else if (weight === '300' || weight === '200' || weight === '100') {
    fontFamily = 'Inter_300Light';
  }

  // Remove fontWeight to avoid conflicts on Android where fontWeight crashes with custom fonts.
  // And remove inline fontFamily
  const customStyle: TextStyle = {
    ...flatStyle,
    fontFamily,
    fontWeight: undefined,
  };

  return <RNText style={customStyle} {...rest} />;
};
