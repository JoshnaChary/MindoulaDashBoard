import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';
import DashboardCard from '../Common/DashboardCard';

interface PaymentMethodCardProps {
  cardType: string;
  cardNumber: string;
  expiryDate: string;
  addedDate: string;
  isDefault: boolean;
  onRemove: () => void;
  onSetDefault: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  cardType,
  cardNumber,
  expiryDate,
  addedDate,
  isDefault,
  onRemove,
  onSetDefault,
}) => {
  const { isPhone } = useResponsive();

  return (
    <DashboardCard
      title={`${cardType} ending in ${cardNumber.slice(-4)}`}
      subtext={`Expires ${expiryDate} • Added ${addedDate}`}
    >
      <View style={[styles.cardHeader, { marginTop: Spacing.xs }]}>
        {isDefault && (
          <View style={styles.defaultBadge}>
            <AppText variant="xs" weight="medium" color={Colors.white}>
              DEFAULT
            </AppText>
          </View>
        )}
      </View>

      <View
        style={[
          styles.actions,
          isPhone && { marginTop: Spacing.md, width: '100%' },
          { justifyContent: Platform.OS === 'web' ? 'flex-end' : 'space-between' },
        ]}
      >
        {!isDefault && (
          <TouchableOpacity onPress={onSetDefault} style={styles.actionButton}>
            <AppText variant="sm" weight="medium" color={Colors.primary}>
              Set Default
            </AppText>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onRemove} style={styles.actionButton}>
          <AppText variant="sm" weight="medium" color={Colors.error}>
            Remove
          </AppText>
        </TouchableOpacity>
      </View>
    </DashboardCard>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  defaultBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.md,
  },
  actionButton: {
    paddingVertical: Spacing.xs,
  },
});

export default PaymentMethodCard;
