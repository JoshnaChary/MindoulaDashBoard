import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from '../Common/Text';
import { Colors } from '../../../core/theme/colors';

interface BillingItem {
  id: string;
  title: string;
  amount: string;
  invoiceId: string;
  dueDate: string;
  status: string;
  statusColor: string;
  indicatorColor: string;
}

interface Props {
  item: BillingItem;
  onViewDetails?: () => void;
}

const BillingCard: React.FC<Props> = ({ item, onViewDetails }) => {
  return (
    <View style={[styles.card, { borderLeftColor: item.indicatorColor }]}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.caption}>Invoice ID: {item.invoiceId}</Text>
        <Text style={styles.caption}>Due date: {item.dueDate}</Text>
        <Text style={[styles.caption, { color: item.statusColor, marginTop: 4 }]}>
          Status: {item.status}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() =>
            onViewDetails
              ? onViewDetails()
              : Alert.alert('View Details', `Viewing Invoice: ${item.invoiceId}`)
          }
        >
          <Text style={styles.btnOutlineText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnFilled}
          onPress={() =>
            onViewDetails ? onViewDetails() : Alert.alert('Payment', `Paying ${item.amount}`)
          }
        >
          <Text style={styles.btnFilledText}>Pay Now</Text>
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
    borderLeftWidth: 4,
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
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  amount: { fontSize: 16, color: Colors.text.secondary },
  caption: { fontSize: 12, color: Colors.text.secondary, marginBottom: 2 },
  btnOutline: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  btnOutlineText: { color: Colors.primary, fontSize: 14, fontWeight: '500' },
  btnFilled: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 8,
  },
  btnFilledText: {
    color: Colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default BillingCard;
