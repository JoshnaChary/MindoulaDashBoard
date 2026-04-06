import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';

interface BillingCardProps {
  item: {
    title: string;
    amount: string;
    invoiceId: string;
    dueDate: string;
    status: string;
    statusColor: string;
    indicatorColor: string;
  };
  onViewDetails: () => void;
}

const BillingCard: React.FC<BillingCardProps> = ({ item, onViewDetails }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.indicator, { backgroundColor: item.indicatorColor }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText variant="md" weight="medium" style={{ flex: 1 }}>
            {item.title}
          </AppText>
          <AppText variant="md" weight="bold">
            {item.amount}
          </AppText>
        </View>
        <AppText variant="xs" color={Colors.text.secondary}>
          Invoice ID: {item.invoiceId} • Due: {item.dueDate}
        </AppText>
        <View style={styles.footer}>
          <AppText variant="xs" weight="medium" color={item.statusColor}>
            {item.status}
          </AppText>
          <TouchableOpacity onPress={onViewDetails} activeOpacity={0.7}>
            <AppText variant="sm" weight="medium" color={Colors.primary}>
              View Details
            </AppText>
          </TouchableOpacity>
        </View>
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
    height: 100,
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
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default BillingCard;
