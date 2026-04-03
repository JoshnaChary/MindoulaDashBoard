import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../core/theme/colors';
import { Spacing } from '../../core/theme/spacing';
import { AppText } from '../atoms/AppText';
import { AppIcon } from '../atoms/AppIcon';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  onProfilePress?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText variant="h1" weight="bold" color={Colors.text.primary}>
          {title}
        </AppText>
        <AppText variant="md" color={Colors.text.secondary} style={styles.subtitle}>
          {subtitle}
        </AppText>
      </View>
      <TouchableOpacity style={styles.profileButton} onPress={onProfilePress} activeOpacity={0.7}>
        <View style={styles.profileCircle}>
          <AppIcon name="person" size={28} color={Colors.primary} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.background.default,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  profileButton: {
    marginLeft: Spacing.lg,
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
