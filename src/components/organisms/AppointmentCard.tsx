import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../core/theme/colors';
import { Spacing } from '../../core/theme/spacing';
import { AppText } from '../atoms/AppText';
import { AppIcon } from '../atoms/AppIcon';
import { AppButton } from '../atoms/AppButton';

interface AppointmentCardProps {
  date: string;
  doctor: string;
  time: string;
  cta: string;
  onCtaPress?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  date,
  doctor,
  time,
  cta,
  onCtaPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateBadge}>
        <AppIcon name="event" size={20} color={Colors.primary} />
        <AppText weight="medium" color={Colors.primary} style={styles.dateText}>
          {date}
        </AppText>
      </View>

      <View style={styles.content}>
        <AppText variant="lg" weight="bold">
          {doctor}
        </AppText>
        <AppText variant="sm" color={Colors.text.secondary} style={styles.timeText}>
          {time}
        </AppText>
      </View>

      <AppButton
        label={cta}
        variant="primary"
        onPress={onCtaPress}
        style={styles.ctaButton}
        size="medium"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.paper,
    borderRadius: Spacing.borderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  dateText: {
    marginLeft: Spacing.sm,
  },
  content: {
    marginBottom: Spacing.xl,
  },
  timeText: {
    marginTop: Spacing.xs,
  },
  ctaButton: {
    width: '100%',
  },
});
