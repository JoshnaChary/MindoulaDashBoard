import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../Common/Text';
import { Colors } from '../../../core/theme/colors';

interface BillingTabsProps {
  options: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeColor: string;
}

const BillingTabs: React.FC<BillingTabsProps> = ({
  options,
  activeTab,
  onTabChange,
  activeColor,
}) => {
  return (
    <View style={styles.container}>
      {options.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab)}
            style={[styles.tab, isActive && { borderBottomColor: activeColor }]}
          >
            <Text style={[styles.tabText, isActive && { color: activeColor, fontWeight: 'bold' }]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 32,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
});

export default BillingTabs;
