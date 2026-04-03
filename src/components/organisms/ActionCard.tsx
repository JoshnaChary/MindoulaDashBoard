import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../core/theme/colors';
import { Spacing } from '../../core/theme/spacing';
import { AppText } from '../atoms/AppText';
import { AppIcon } from '../atoms/AppIcon';

interface ActionCardProps {
  title: string;
  onPress?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <AppText variant="md" weight="medium" style={styles.title}>
        {title}
      </AppText>
      <View style={styles.iconCircle}>
        <AppIcon name="chevron-right" size={20} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background.paper,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    borderRadius: Spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    flex: 1,
    marginRight: Spacing.md,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
