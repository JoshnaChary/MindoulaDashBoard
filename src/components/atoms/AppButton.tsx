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
    if (onPress) {
      if (variant === 'primary' || variant === 'outline') {
        HapticsUtility.impactMedium();
      } else {
        HapticsUtility.impactLight();
      }
      onPress(event);
    }
  };

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: Colors.primary };
      case 'secondary':
        return { backgroundColor: Colors.secondary };
      case 'outline':
        return { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.primary };
      case 'ghost':
        return { backgroundColor: 'transparent' };
      default:
        return { backgroundColor: Colors.primary };
    }
  };

  const getLabelColor = (): string => {
    switch (variant) {
      case 'primary':
        return Colors.white;
      case 'secondary':
      case 'outline':
      case 'ghost':
        return Colors.primary;
      default:
        return Colors.white;
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, minHeight: 32 };
      case 'large':
        return { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xxl, minHeight: 56 };
      default:
        return { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, minHeight: 44 }; // 44px min for mobile touch target
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={0.7}
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
    borderRadius: Spacing.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
