import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';

interface BillingTabsProps {
  options: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeColor?: string;
}

const BillingTabs: React.FC<BillingTabsProps> = ({
  options,
  activeTab,
  onTabChange,
  activeColor = Colors.primary,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {options.map((option) => {
          const isActive = activeTab === option;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.tab, isActive && { borderBottomColor: activeColor }]}
              onPress={() => onTabChange(option)}
            >
              <AppText
                variant="md"
                weight={isActive ? 'medium' : 'regular'}
                color={isActive ? activeColor : Colors.text.secondary}
              >
                {option}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  scrollContent: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
});

export default BillingTabs;
