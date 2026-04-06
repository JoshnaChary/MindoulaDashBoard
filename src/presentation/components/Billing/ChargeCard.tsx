import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';

interface ChargeCardProps {
  title: string;
  amount: string;
  quantity: number;
  serviceDate: string;
  note?: string;
}

const ChargeCard: React.FC<ChargeCardProps> = ({ title, amount, quantity, serviceDate, note }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="md" weight="medium" style={{ flex: 1 }}>
          {title}
        </AppText>
        <AppText variant="md" weight="bold">
          {amount}
        </AppText>
      </View>
      <View style={styles.details}>
        <AppText variant="xs" color={Colors.text.secondary}>
          Date: {serviceDate} • Qty: {quantity}
        </AppText>
        {note && (
          <AppText variant="xs" color={Colors.text.muted} style={styles.note}>
            {note}
          </AppText>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  details: {
    gap: Spacing.xs,
  },
  note: {
    fontStyle: 'italic',
  },
});

export default ChargeCard;
