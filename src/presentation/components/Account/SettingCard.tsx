import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../core/theme/colors';

interface SettingCardProps {
  label: string;
  value: string;
  note?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const SettingCard: React.FC<SettingCardProps> = ({ label, value, note, actionLabel, onAction }) => {
  return (
    <View style={styles.card}>
      {/* LEFT SECTION (flex: 1) */}
      <View style={styles.leftSection}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
        {note && (
          <View style={styles.noteContainer}>
            <Text style={styles.note}>
              <Text style={{ fontWeight: 'bold' }}>Note: </Text>
              {note}
            </Text>
          </View>
        )}
      </View>

      {/* RIGHT SECTION (auto width) */}
      <View style={styles.rightSection}>
        {actionLabel && (
          <TouchableOpacity style={styles.actionBtn} onPress={onAction}>
            <Text style={styles.actionText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
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
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  label: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'Inter',
  },
  noteContainer: {
    marginTop: 8,
  },
  note: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontFamily: 'Inter',
  },
  actionBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});

export default SettingCard;
