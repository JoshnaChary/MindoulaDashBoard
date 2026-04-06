import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export const impactLight = async () => {
  if (Platform.OS !== 'web') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};

export const impactMedium = async () => {
  if (Platform.OS !== 'web') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
};

export const selection = async () => {
  if (Platform.OS !== 'web') {
    await Haptics.selectionAsync();
  }
};

export const success = async () => {
  if (Platform.OS !== 'web') {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
};
