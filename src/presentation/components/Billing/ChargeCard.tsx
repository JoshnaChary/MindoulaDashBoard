import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import DashboardCard from '../Common/DashboardCard';

interface ChargeCardProps {
  title: string;
  amount: string;
  quantity: number;
  serviceDate: string;
  note?: string;
}

const ChargeCard: React.FC<ChargeCardProps> = ({ title, amount, quantity, serviceDate, note }) => {
  return (
    <DashboardCard
      title={title}
      amount={amount}
      subtext={`Date: ${serviceDate} • Qty: ${quantity}`}
      containerStyle={styles.cardContainer}
    >
      {note && (
        <AppText variant="xs" color={Colors.text.muted} style={styles.note}>
          {note}
        </AppText>
      )}
    </DashboardCard>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    minHeight: 0,
    paddingHorizontal: 0,
  },
  note: {
    fontStyle: 'italic',
    marginTop: Spacing.xs,
  },
});

export default ChargeCard;
