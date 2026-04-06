import React from 'react';
import { Text as RNText, TextProps, TextStyle, StyleSheet } from 'react-native';
import { Colors } from '../../core/theme/colors';
import { Typography } from '../../core/theme/typography';

interface AppTextProps extends TextProps {
  variant?: keyof typeof Typography.fontSize;
  color?: string;
  weight?: keyof typeof Typography.fontWeight;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body1',
  color = Colors.text.primary,
  weight = 'regular',
  align = 'left',
  style,
  children,
  ...rest
}) => {
  const flatStyle = StyleSheet.flatten(style || {}) as TextStyle;

  // Determine FontFamily based on weight
  let fontFamily = Typography.fontFamily.regular;
  if (weight === 'bold' || flatStyle.fontWeight === 'bold' || flatStyle.fontWeight === '700') {
    fontFamily = Typography.fontFamily.bold;
  } else if (weight === 'medium' || flatStyle.fontWeight === '500') {
    fontFamily = Typography.fontFamily.medium;
  }

  const textStyle: TextStyle = {
    fontSize: Typography.fontSize[variant],
    color,
    fontFamily,
    textAlign: align,
    lineHeight: Typography.lineHeight[variant as keyof typeof Typography.lineHeight] || undefined,
  };

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};
