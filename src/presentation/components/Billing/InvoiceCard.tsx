import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../Common/Text';
import { Colors } from '../../../core/theme/colors';

interface InvoiceCardProps {
  title: string;
  amount: string;
  invoiceId: string;
  dueDate: string;
  status: string;
  statusColor: string;
  onViewDetails?: () => void;
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
    <View style={styles.card}>
      {/* LEFT SECTION */}
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>

      {/* MIDDLE SECTION */}
      <View style={styles.middleSection}>
        <Text style={styles.caption}>Invoice ID: {invoiceId}</Text>
        <Text style={styles.caption}>Due date: {dueDate}</Text>
        <Text style={[styles.caption, { color: statusColor, marginTop: 4 }]}>Status: {status}</Text>
      </View>

      {/* RIGHT SECTION */}
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>Download PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onViewDetails && onViewDetails()}>
          <Text style={styles.actionText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
  },
  leftSection: {
    flex: 1,
  },
  middleSection: {
    flex: 1,
    marginHorizontal: 16,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1.5,
    gap: 12,
  },
  actionBtn: {
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.white,
  },
  actionText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  caption: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
});

export default InvoiceCard;
