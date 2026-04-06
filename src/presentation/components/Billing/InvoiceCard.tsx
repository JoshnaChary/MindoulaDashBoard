import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';

interface InvoiceCardProps {
  title: string;
  amount: string;
  invoiceId: string;
  dueDate: string;
  status: string;
  statusColor: string;
  onViewDetails: () => void;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({
  title,
  amount,
  invoiceId,
  dueDate,
  status,
  statusColor,
  onViewDetails,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText variant="md" weight="medium" style={{ flex: 1 }}>
            {title}
          </AppText>
          <AppText variant="md" weight="bold">
            {amount}
          </AppText>
        </View>
        <AppText variant="xs" color={Colors.text.secondary}>
          Invoice ID: {invoiceId} • Paid: {dueDate}
        </AppText>
        <View style={styles.footer}>
          <AppText variant="xs" weight="medium" color={statusColor}>
            {status}
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
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.radius.md,
    padding: Spacing.md,
    height: 100,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
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
  },
});

export default InvoiceCard;
