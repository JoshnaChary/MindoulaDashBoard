import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';

interface SettingCardProps {
  label: string;
  value: string;
  actionLabel?: string;
  onAction?: () => void;
}

const SettingCard: React.FC<SettingCardProps> = ({ label, value, actionLabel, onAction }) => {
  const { isPhone } = useResponsive();

  return (
    <View style={styles.container}>
      <View style={[styles.row, isPhone && styles.column]}>
        <View style={styles.content}>
          <AppText variant="sm" color={Colors.text.secondary} style={styles.label}>
            {label}
          </AppText>
          <AppText variant="md" weight="medium" color={Colors.text.primary}>
            {value}
          </AppText>
        </View>

        {actionLabel && (
          <TouchableOpacity
            onPress={onAction}
            style={[styles.action, isPhone && styles.actionPhone]}
            activeOpacity={0.7}
          >
            <AppText variant="sm" weight="medium" color={Colors.primary}>
              {actionLabel}
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.md,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  content: {
    flex: 1,
  },
  label: {
    marginBottom: 4,
  },
  action: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  actionPhone: {
    paddingLeft: 0,
  },
});

export default SettingCard;
