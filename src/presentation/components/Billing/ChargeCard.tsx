import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../core/theme/colors';

interface ChargeCardProps {
  title: string;
  amount: string;
  quantity: number;
  serviceDate: string;
  note: string;
}

const ChargeCard: React.FC<ChargeCardProps> = ({ title, amount, quantity, serviceDate, note }) => {
  return (
    <View style={styles.card}>
      {/* LEFT SECTION */}
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>Service date: {serviceDate}</Text>
        <Text style={styles.note}>{note}</Text>
      </View>

      {/* RIGHT SECTION */}
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={styles.caption}>Qty: {quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
    width: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  caption: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontFamily: 'Inter',
    marginBottom: 2,
  },
  note: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontFamily: 'Inter',
    fontStyle: 'italic',
    marginTop: 4,
  },
});

export default ChargeCard;
