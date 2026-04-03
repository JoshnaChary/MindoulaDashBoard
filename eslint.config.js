// eslint.config.js — ESLint v9 flat config
// Replaces .eslintrc.js for ESLint v9 compatibility.
// Uses eslint-config-universe v14's built-in flat config (flat/native)
// so all existing rules are preserved without the @eslint/eslintrc shim.
//
// NOTE: ESLint v9 no longer reads .eslintignore — ignores must live here.

const universeNative = require('eslint-config-universe/flat/native');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  // Global ignores (replaces .eslintignore for ESLint v9)
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.expo/**',
      'coverage/**',
      'web-build/**',
      'ios/**',
      'android/**',
      '*.orig.*',
      '**/*.tsbuildinfo',
    ],
  },

  // Spread the universe/native flat config (handles JS, TS, React, React Native)
  ...universeNative,

  // Project-specific rule overrides — mirrors the old .eslintrc.js rules block
  {
    rules: {
      'import/order': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': 'warn',
    },
  },
];
