import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';

interface BadgeProps {
  label: string;
  color?: string;
}

const Badge: React.FC<BadgeProps> = ({ label, color = '#3182CE' }) => {
  return (
    <View style={[styles.badge, { backgroundColor: `${color}1A` }]}>
      <AppText variant="xs" weight="bold" style={[styles.badgeText, { color }]}>
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Badge;
