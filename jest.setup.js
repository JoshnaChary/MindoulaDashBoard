import 'react-native-gesture-handler/jestSetup';

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock Safe Area Context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
  };
});

// Mock Navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(() => () => {}),
    }),
    useRoute: () => ({
      params: {},
    }),
    DrawerActions: {
      toggleDrawer: jest.fn(),
      openDrawer: jest.fn(),
      closeDrawer: jest.fn(),
    },
  };
});

// Mock Vector Icons
jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Ionicons: 'Ionicons',
  MaterialIcons: 'MaterialIcons',
}));

// Mock Expo Font
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
  useFonts: () => [true, null],
}));

// Mock Platform for web/ios/android testing
jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
  Object.defineProperty(Platform, 'OS', {
    value: 'ios',
    writable: true,
  });
  Platform.select = jest.fn((objs) => objs[Platform.OS] || objs.default);
  return Platform;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// We don't direct mock NativeAnimatedHelper here as it moved in newer RN versions
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
