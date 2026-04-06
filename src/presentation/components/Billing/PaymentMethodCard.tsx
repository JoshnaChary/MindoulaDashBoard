import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { useResponsive } from '../../../core/utils/useResponsive';

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
    <View style={styles.container}>
      <View style={[styles.mainRow, isPhone && styles.column]}>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <AppText variant="md" weight="bold">
              {cardType} ending in {cardNumber.slice(-4)}
            </AppText>
            {isDefault && (
              <View style={styles.defaultBadge}>
                <AppText variant="xs" weight="medium" color={Colors.white}>
                  DEFAULT
                </AppText>
              </View>
            )}
          </View>
          <AppText variant="sm" color={Colors.text.secondary}>
            Expires {expiryDate} • Added {addedDate}
          </AppText>
        </View>

        <View style={[styles.actions, isPhone && { marginTop: Spacing.md, width: '100%' }]}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.radius.md,
    padding: Spacing.lg,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.md,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
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
    justifyContent: Platform.OS === 'web' ? 'flex-end' : 'space-between',
  },
  actionButton: {
    paddingVertical: Spacing.xs,
  },
});

export default PaymentMethodCard;
