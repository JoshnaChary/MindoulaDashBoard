import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../../core/theme/colors';
import { Spacing } from '../../core/theme/spacing';
import { AppText } from './AppText';

interface AppButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  style,
  disabled,
  ...rest
}) => {
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: Colors.primary };
      case 'secondary':
        return { backgroundColor: Colors.secondary };
      case 'ghost':
        return { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.primary };
      default:
        return { backgroundColor: Colors.primary };
    }
  };

  const getLabelColor = (): string => {
    switch (variant) {
      case 'primary':
        return Colors.white;
      case 'secondary':
        return Colors.primary;
      case 'ghost':
        return Colors.primary;
      default:
        return Colors.white;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getVariantStyles(), disabled && styles.disabled, style]}
      disabled={disabled}
      {...rest}
    >
      <AppText variant={size === 'small' ? 'sm' : 'md'} weight="medium" color={getLabelColor()}>
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Spacing.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
