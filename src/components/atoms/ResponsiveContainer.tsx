import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useResponsive } from '../../core/utils/useResponsive';
import { Spacing } from '../../core/theme/spacing';

interface ResponsiveContainerProps extends ViewProps {
  maxWidth?: number;
  children: React.ReactNode;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  fluid?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  maxWidth = 1200,
  children,
  padding = 'lg',
  fluid = false,
  style,
  ...props
}) => {
  const { isPhone, isDesktop } = useResponsive();

  const containerStyle: ViewStyle = {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: fluid ? 0 : Spacing[padding],
    borderRadius: Spacing.radius.md,
    maxWidth: isPhone ? undefined : maxWidth,
  };

  return (
    <View style={[containerStyle, style]} {...props}>
      {children}
    </View>
  );
};
