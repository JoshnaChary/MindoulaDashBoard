import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../Common/Text';
import { Colors } from '../../../core/theme/colors';

const BASE_X = 9;
const BASE_Y = 254;

interface Props {
  item: any;
  index: number;
  onViewDetails: () => void;
  onRequestRefill: () => void;
}

const PrescriptionCard: React.FC<Props> = ({ item, index, onViewDetails, onRequestRefill }) => {
  const topOffset = 440 + index * 124; // Based on gap + 60px overlap correction
  return (
    <View
      key={item.id}
      style={[styles.absolute, styles.prescCard, { left: 358 - BASE_X, top: topOffset - BASE_Y }]}
    >
      <View style={styles.prescRow}>
        {/* Left Side: Name & Badge */}
        <View style={styles.prescLeft}>
          <Text style={styles.prescName}>{item.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.refills} refills remaining</Text>
          </View>
        </View>

        {/* Vertical Divider */}
        <View style={styles.prescDivider} />

        {/* Center: Dosage/Freq */}
        <View style={styles.prescCenter}>
          <Text style={styles.prescSub}>Dosage: {item.dosage}</Text>
          <Text style={styles.prescSub}>Frequency: {item.frequency}</Text>
        </View>

        {/* Right: Buttons */}
        <View style={styles.prescRight}>
          <TouchableOpacity style={styles.smallOutlinedBtn} onPress={onViewDetails}>
            <Text style={styles.buttonTextSmallBlue}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallBlueBtn} onPress={onRequestRefill}>
            <Text style={styles.buttonTextSmall}>Request Refill</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
  prescCard: {
    width: 653,
    height: 104,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  prescRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  prescLeft: { flex: 1 },
  prescDivider: { width: 1, height: 60, backgroundColor: Colors.border, marginHorizontal: 16 },
  prescCenter: { flex: 1, justifyContent: 'center', marginRight: 24 },
  prescRight: { flexDirection: 'row', alignItems: 'center', flexShrink: 0 },
  prescName: { fontSize: 18, fontWeight: '500', color: Colors.text.dark },
  prescSub: { fontSize: 13, fontWeight: '300', color: Colors.text.dark },
  badge: {
    backgroundColor: '#E9F6EF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  badgeText: { fontSize: 13, fontWeight: '500', color: Colors.accent },
  smallOutlinedBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 15,
    backgroundColor: Colors.white,
  },
  buttonTextSmallBlue: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  smallBlueBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  buttonTextSmall: { color: Colors.white, fontSize: 16, fontWeight: '500' },
});

export default PrescriptionCard;
