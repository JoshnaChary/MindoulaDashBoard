import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../../../components/atoms/AppText';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import { MessageThread } from '../../../data/models/DomainModels';

interface ThreadItemProps {
  thread: MessageThread;
  isSelected: boolean;
  onPress: () => void;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ thread, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <AppText variant="md" weight={thread.unread ? 'bold' : 'medium'} style={{ flex: 1 }}>
          {thread.title}
        </AppText>
        <AppText variant="xs" color={Colors.text.secondary}>
          {thread.time}
        </AppText>
      </View>

      <View style={styles.footer}>
        <AppText variant="sm" color={Colors.text.secondary} numberOfLines={1} style={{ flex: 1 }}>
          {thread.subtitle}
        </AppText>
        {thread.unread && <View style={styles.unreadDot} />}
      </View>

      {isSelected && <View style={styles.selectionIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  selected: {
    backgroundColor: Colors.bubbles.inboundBg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  selectionIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: Colors.primaryDark,
  },
});

export default ThreadItem;
