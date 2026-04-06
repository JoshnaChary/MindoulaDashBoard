import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { impactLight, impactMedium, selection, success } from '../haptics';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  selectionAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium' },
  NotificationFeedbackType: { Success: 'success' },
}));

describe('haptics util', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Non-web platforms', () => {
    it('should call impactLight on ios', async () => {
      Object.defineProperty(Platform, 'OS', { value: 'ios', writable: true });
      await impactLight();
      expect(Haptics.impactAsync).toHaveBeenCalledWith('light');
    });

    it('should call impactMedium on android', async () => {
      Object.defineProperty(Platform, 'OS', { value: 'android', writable: true });
      await impactMedium();
      expect(Haptics.impactAsync).toHaveBeenCalledWith('medium');
    });

    it('should call selection', async () => {
      Object.defineProperty(Platform, 'OS', { value: 'ios', writable: true });
      await selection();
      expect(Haptics.selectionAsync).toHaveBeenCalled();
    });

    it('should call success', async () => {
      Object.defineProperty(Platform, 'OS', { value: 'ios', writable: true });
      await success();
      expect(Haptics.notificationAsync).toHaveBeenCalledWith('success');
    });
  });

  describe('Web platform', () => {
    it('should not call haptics on web', async () => {
      Object.defineProperty(Platform, 'OS', { value: 'web', writable: true });
      await impactLight();
      await impactMedium();
      await selection();
      await success();
      expect(Haptics.impactAsync).not.toHaveBeenCalled();
      expect(Haptics.selectionAsync).not.toHaveBeenCalled();
      expect(Haptics.notificationAsync).not.toHaveBeenCalled();
    });
  });
});
