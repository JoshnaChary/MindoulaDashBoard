import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { AppButton } from '../../../components/atoms/AppButton';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';
import DashboardCard from '../Common/DashboardCard';

interface Props {
  item: any;
  onViewDetails: () => void;
  onRequestRefill: () => void;
}

const PrescriptionCard: React.FC<Props> = ({ item, onViewDetails, onRequestRefill }) => {
  const { isPhone } = useResponsive();

  return (
    <DashboardCard title={item.name}>
      <View style={[styles.mainRow, isPhone && styles.column]}>
        <View style={styles.leftContent}>
          <View style={styles.badge}>
            <AppText variant="xs" weight="medium" color={Colors.accent}>
              {item.refills} refills remaining
            </AppText>
          </View>
        </View>

        {!isPhone && <View style={styles.divider} />}

        <View style={styles.centerContent}>
          <AppText variant="xs" color={Colors.text.secondary}>
            Dosage: {item.dosage}
          </AppText>
          <AppText variant="xs" color={Colors.text.secondary}>
            Frequency: {item.frequency}
          </AppText>
        </View>

        <View style={[styles.rightContent, isPhone && styles.fullWidthActions]}>
          <AppButton
            label="View Details"
            variant="outline"
            size="small"
            onPress={onViewDetails}
            style={isPhone ? styles.flex1 : undefined}
          />
          <AppButton
            label="Request Refill"
            variant="primary"
            size="small"
            onPress={onRequestRefill}
            style={isPhone ? styles.flex1 : undefined}
          />
        </View>
      </View>
    </DashboardCard>
  );
};

const styles = StyleSheet.create({
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: Spacing.lg,
  },
  leftContent: {
    flex: 1.5,
  },
  centerContent: {
    flex: 1,
    gap: 4,
  },
  rightContent: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  fullWidthActions: {
    width: '100%',
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.sm,
  },
  badge: {
    backgroundColor: '#E9F6EF',
    borderRadius: Spacing.radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
});

export default PrescriptionCard;
