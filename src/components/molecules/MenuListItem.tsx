import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Colors } from '../../core/theme/colors';
import { Spacing } from '../../core/theme/spacing';
import { AppText } from '../atoms/AppText';
import { AppIcon } from '../atoms/AppIcon';

interface MenuListItemProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}

const getMenuIcon = (title: string): any => {
  switch (title.toLowerCase()) {
    case 'home':
      return 'home';
    case 'messages':
      return 'mail-outline';
    case 'appointments':
      return 'calendar-today';
    case 'prescriptions':
      return 'medical-services';
    case 'lab results':
      return 'science';
    case 'documents':
      return 'description';
    default:
      return 'more-horiz';
  }
};

export const MenuListItem: React.FC<MenuListItemProps> = ({ title, isActive = false, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconCircle, isActive && styles.activeIconCircle]}>
        <AppIcon
          name={getMenuIcon(title)}
          size={24}
          color={isActive ? Colors.white : Colors.primary}
        />
      </View>
      <AppText
        variant="sm"
        weight={isActive ? 'medium' : 'regular'}
        color={isActive ? Colors.primary : Colors.text.secondary}
        style={styles.text}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: Spacing.xl,
    paddingVertical: Spacing.sm,
  },
  activeContainer: {
    // Add any container indicator if needed
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeIconCircle: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  text: {
    textAlign: 'center',
  },
});
