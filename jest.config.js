module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@exponent/.*|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', './jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'App.tsx',
    'index.ts',
    '!src/**/*.d.ts',
    '!src/**/*.styles.ts',
    '!src/data/mock/**',
    '!src/tests/**',
    '!**/__tests__/**',
    '!src/data/models/**',
    '!src/core/navigation/types.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 80,
      lines: 100,
      statements: 100,
    },
  },
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'html'],
};
