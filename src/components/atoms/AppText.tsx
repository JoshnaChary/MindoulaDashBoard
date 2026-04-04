import React from 'react';
import { TextProps, TextStyle } from 'react-native';
import { Text as RNText } from '../../presentation/components/Common/Text';
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
  const textStyle: TextStyle = {
    fontSize: Typography.fontSize[variant],
    color,
    fontWeight: Typography.fontWeight[weight] as any,
    textAlign: align,
  };

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};
