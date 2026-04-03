import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Badge from '../Common/Badge';
import { Colors } from '../../../core/theme/colors';

interface PaymentMethodCardProps {
  cardType: string;
  cardNumber: string;
  expiryDate: string;
  addedDate: string;
  isDefault?: boolean;
  onRemove?: () => void;
  onSetDefault?: () => void;
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
  return (
    <View style={styles.card}>
      {/* LEFT SECTION (flex: 1) */}
      <View style={styles.leftSection}>
        <Text style={styles.cardType}>{cardType}</Text>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
        {isDefault && <Badge label="Default" color={Colors.primary} />}
      </View>

      {/* MIDDLE SECTION (flexWidth) */}
      <View style={styles.middleSection}>
        <View style={styles.divider} />
        <View>
          <Text style={styles.caption}>Expires: {expiryDate}</Text>
          <Text style={styles.caption}>Added: {addedDate}</Text>
        </View>
      </View>

      {/* RIGHT SECTION (auto width) */}
      <View style={styles.rightSection}>
        {!isDefault && (
          <TouchableOpacity style={styles.btnOutlineBlue} onPress={onSetDefault}>
            <Text style={styles.btnTextBlue}>Set as Default</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.btnOutlineRed} onPress={onRemove}>
          <Text style={styles.btnTextRed}>Remove</Text>
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
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  leftSection: {
    width: 200,
    gap: 4,
  },
  middleSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  divider: {
    width: 1,
    height: 44,
    backgroundColor: Colors.border,
  },
  rightSection: {
    flexDirection: 'row',
    gap: 12,
  },
  cardType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'Inter',
  },
  cardNumber: {
    fontSize: 14,
    color: Colors.text.primary,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    color: '#718096',
    fontFamily: 'Inter',
  },
  btnOutlineBlue: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnTextBlue: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  btnOutlineRed: {
    borderWidth: 1,
    borderColor: '#E53E3E',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnTextRed: {
    color: '#E53E3E',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
});

export default PaymentMethodCard;
