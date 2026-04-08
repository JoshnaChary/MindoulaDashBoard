import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';

interface DashboardCardProps {
  indicatorColor?: string;
  title: string;
  amount?: string;
  subtext?: string;
  status?: string;
  statusColor?: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  indicatorColor,
  title,
  amount,
  subtext,
  status,
  statusColor = Colors.text.primary,
  actionLabel,
  onAction,
  children,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {indicatorColor && <View style={[styles.indicator, { backgroundColor: indicatorColor }]} />}
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText variant="md" weight="medium" style={{ flex: 1 }}>
            {title}
          </AppText>
          {amount && (
            <AppText variant="md" weight="bold">
              {amount}
            </AppText>
          )}
        </View>

        {subtext && (
          <AppText variant="xs" color={Colors.text.secondary}>
            {subtext}
          </AppText>
        )}

        {children}

        {(status || (actionLabel && onAction)) && (
          <View style={styles.footer}>
            {status && (
              <AppText variant="xs" weight="medium" color={statusColor}>
                {status}
              </AppText>
            )}
            {actionLabel && onAction && (
              <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
                <AppText variant="sm" weight="medium" color={Colors.primary}>
                  {actionLabel}
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.radius.md,
    overflow: 'hidden',
    minHeight: 100,
  },
  indicator: {
    width: 6,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
});

export default DashboardCard;
