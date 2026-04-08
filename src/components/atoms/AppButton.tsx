import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../core/theme/colors';
import { Spacing } from '../../core/theme/spacing';
import { AppText } from './AppText';
import * as HapticsUtility from '../../core/utils/haptics';

interface AppButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const getVariantStyles = (variant: string): ViewStyle => {
  const styles: Record<string, ViewStyle> = {
    primary: { backgroundColor: Colors.primary },
    secondary: { backgroundColor: Colors.secondary },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.primary },
    ghost: { backgroundColor: 'transparent' },
  };
  return styles[variant] || styles.primary;
};

const getLabelColor = (variant: string): string => {
  const colors: Record<string, string> = {
    primary: Colors.white,
    secondary: Colors.primary,
    outline: Colors.primary,
    ghost: Colors.primary,
  };
  return colors[variant] || colors.primary;
};

const getSizeStyles = (size: string): ViewStyle => {
  const styles: Record<string, ViewStyle> = {
    small: { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, minHeight: 32 },
    large: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xxl, minHeight: 56 },
    medium: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, minHeight: 44 },
  };
  return styles[size] || styles.medium;
};

export const AppButton: React.FC<AppButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  style,
  disabled,
  onPress,
  ...rest
}) => {
  const handlePress = (event: any) => {
    if (!onPress) return;

    if (variant === 'primary' || variant === 'outline') {
      HapticsUtility.impactMedium();
    } else {
      HapticsUtility.impactLight();
    }
    onPress(event);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(variant),
        getSizeStyles(size),
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="button"
      testID={rest.testID || 'app-button'}
      {...rest}
    >
      <AppText
        variant={size === 'small' ? 'sm' : 'md'}
        weight="medium"
        color={getLabelColor(variant)}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Spacing.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
