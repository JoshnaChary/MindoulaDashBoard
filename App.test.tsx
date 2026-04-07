import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

// Mock Expo components/modules if necessary
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

// Mock navigation
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: any) => <>{children}</>,
    Screen: ({ children }: any) => <>{children}</>,
  }),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: any) => <>{children}</>,
}));

// Mock fonts
jest.mock('@expo-google-fonts/inter', () => ({
  useFonts: jest.fn(() => [true, null]),
  Inter_300Light: 'Inter_300Light',
  Inter_400Regular: 'Inter_400Regular',
  Inter_500Medium: 'Inter_500Medium',
  Inter_600SemiBold: 'Inter_600SemiBold',
  Inter_700Bold: 'Inter_700Bold',
}));

jest.mock('expo-font', () => ({
  isLoaded: jest.fn(() => true),
  loadAsync: jest.fn(() => Promise.resolve()),
}));

// Mock the root navigator to avoid deep rendering everything
jest.mock('./src/core/navigation/RootNavigator', () => ({
  RootNavigator: () => null,
}));

describe('App Entry Point', () => {
  it('renders without crashing when fonts are loaded', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toBeDefined();
  });

  it('renders null when fonts are not loaded', () => {
    const { useFonts } = require('@expo-google-fonts/inter');
    (useFonts as jest.Mock).mockReturnValueOnce([false, null]);

    const { toJSON } = render(<App />);
    expect(toJSON()).toBeNull();
  });
});
